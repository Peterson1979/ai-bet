import { Redis } from "@upstash/redis";

import { buildPredictionPrompt } from "@/app/lib/prompts";
import { rankMatches } from "@/app/lib/ranking";
import { getExactBookmakerAffiliateUrl } from "@/app/lib/affiliates";
import {
  evaluatePredictionEligibility,
  MIN_PRODUCTION_BOOKMAKERS,
  type PublicationRejection,
} from "@/app/lib/predictionEligibility";
import {
  getDailyEvents,
  buildMarketCandidates,
  getBestOddsForCandidate,
  getConsensusForCandidate,
  getPartnerOddsForCandidate,
  getAverageOddsForCandidate,
  buildWhySignalSummary,
} from "@/app/lib/odds";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const CACHE_TTL = 60 * 60 * 25;
const MAX_EVENTS_PER_SPORT = 12;
const LOCK_TTL_SECONDS = 360;

const RELEASE_LOCK_LUA = `
if redis.call("get", KEYS[1]) == ARGV[1] then
  return redis.call("del", KEYS[1])
else
  return 0
end
`;

export type SportStatus = "success" | "no_events" | "failed";

type SportResult = {
  sport: string;
  status: SportStatus;
  hasMatches: boolean;
  message?: string;
  topPicks: any[];
  diagnostics: SportDiagnostics;
};

type SportDiagnostics = {
  eventsProcessed: number;
  candidatesAvailable: number;
  rejectedCandidateMissing: number;
  rejectedBookmakerDepth: number;
  rejectedMissingMarketOdds: number;
  rejectedMissingProbability: number;
  rejectedNonPositiveValue: number;
  affiliateMatchAvailable: number;
  affiliateMatchMissing: number;
  publishedPicks: number;
};

function createSportDiagnostics(): SportDiagnostics {
  return {
    eventsProcessed: 0,
    candidatesAvailable: 0,
    rejectedCandidateMissing: 0,
    rejectedBookmakerDepth: 0,
    rejectedMissingMarketOdds: 0,
    rejectedMissingProbability: 0,
    rejectedNonPositiveValue: 0,
    affiliateMatchAvailable: 0,
    affiliateMatchMissing: 0,
    publishedPicks: 0,
  };
}

function countEligibilityRejection(
  diagnostics: SportDiagnostics,
  reason: PublicationRejection
): void {
  if (reason === "bookmaker_depth") diagnostics.rejectedBookmakerDepth += 1;
  if (reason === "missing_market_odds") diagnostics.rejectedMissingMarketOdds += 1;
  if (reason === "missing_probability") diagnostics.rejectedMissingProbability += 1;
  if (reason === "non_positive_value") diagnostics.rejectedNonPositiveValue += 1;
}

function isSportFailed(sport?: { status?: string; message?: string }): boolean {
  if (!sport) return false;
  if (sport.status) {
    return sport.status === "failed";
  }
  if (typeof sport.message === "string") {
    const msg = sport.message.toLowerCase();
    if (
      msg.includes("ai generation failed") ||
      msg.includes("upstream data fetch failed") ||
      msg.includes("fetch failed")
    ) {
      return true;
    }
  }
  return false;
}

function countFailedSports(sports?: Array<{ status?: string; message?: string }>): number {
  if (!Array.isArray(sports)) return 0;
  return sports.filter(isSportFailed).length;
}

async function generateAI(prompt: string) {
  const { generatePrediction } = await import("@/app/lib/groq");
  return generatePrediction(prompt);
}

function safeNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function normalizeBookmakerName(value: string | null | undefined): string {
  return (value ?? "").toLowerCase().trim().replace(/\s+/g, "");
}

function resolveValueDiff(params: {
  explicitValueDiff?: number | null;
  fairProbability?: number | null;
  impliedProbability?: number | null;
}): number | null {
  const explicitValueDiff = safeNumber(params.explicitValueDiff);

  if (explicitValueDiff != null) {
    return Number(explicitValueDiff.toFixed(2));
  }

  const fairProbability = safeNumber(params.fairProbability);
  const impliedProbability = safeNumber(params.impliedProbability);

  if (fairProbability == null || impliedProbability == null) {
    return null;
  }

  return Number((fairProbability - impliedProbability).toFixed(2));
}


export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return Response.json(
      { ok: false, error: "unauthorized" },
      { status: 401 }
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const CACHE_KEY = `predictions:${today}`;
  const LOCK_KEY = `cron:daily-run:lock:${today}`;

  const url = new URL(request.url);
  const force = url.searchParams.get("force") === "1";

  let cached: any = null;

  try {
    cached = await redis.get(CACHE_KEY);
    if (cached && !force) {
      return Response.json({ success: true, cached: true, data: cached });
    }
  } catch (error) {
    console.error("[daily-run] Cache lookup error:", error);
    return Response.json(
      { success: false, error: "Cache lookup failed." },
      { status: 500 }
    );
  }

  const runId = crypto.randomUUID();
  let lockAcquired = false;

  try {
    const acquired = await redis.set(LOCK_KEY, runId, {
      nx: true,
      ex: LOCK_TTL_SECONDS,
    });

    if (!acquired) {
      console.log("[daily-run] skipped: generation already in progress", { today });
      return Response.json({
        success: true,
        skipped: true,
        reason: "generation_in_progress",
      });
    }

    lockAcquired = true;
  } catch (error) {
    console.error("[daily-run] Lock acquisition error:", error);
    return Response.json(
      { success: false, error: "Lock acquisition failed." },
      { status: 500 }
    );
  }

  try {
    const sportsData = await getDailyEvents();

    const result: {
      date: string;
      generatedAt: string;
      sports: SportResult[];
    } = {
      date: today,
      generatedAt: new Date().toISOString(),
      sports: [],
    };

    const seenEvents = new Set<string>();

    for (const sportBlock of sportsData) {
      const diagnostics = createSportDiagnostics();

      if (sportBlock.fetchFailed) {
        result.sports.push({
          sport: sportBlock.sport,
          status: "failed",
          hasMatches: false,
          message:
            sportBlock.error ?? `Upstream data fetch failed for ${sportBlock.sport}.`,
          topPicks: [],
          diagnostics,
        });
        continue;
      }

      const events = sportBlock.events?.slice(0, MAX_EVENTS_PER_SPORT) ?? [];

      if (events.length === 0) {
        result.sports.push({
          sport: sportBlock.sport,
          status: "no_events",
          hasMatches: false,
          message: `No ${sportBlock.sport} events available today.`,
          topPicks: [],
          diagnostics,
        });
        continue;
      }

      const prompt = buildPredictionPrompt(events);
      const aiResults = await generateAI(prompt);

      if (!aiResults || aiResults.length === 0) {
        result.sports.push({
          sport: sportBlock.sport,
          status: "failed",
          hasMatches: false,
          message: `AI generation failed for ${sportBlock.sport}.`,
          topPicks: [],
          diagnostics,
        });
        continue;
      }

      const topPicks: any[] = [];

      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const ai = aiResults[i];

        if (!event) continue;
        diagnostics.eventsProcessed += 1;
        if (!ai) {
          diagnostics.rejectedCandidateMissing += 1;
          continue;
        }

        const eventKey = `${event.id}-${event.homeTeam}-${event.awayTeam}`;
        if (seenEvents.has(eventKey)) continue;

        const candidates = buildMarketCandidates(event);
        diagnostics.candidatesAvailable += candidates.length;
        const selectedCandidate = candidates.find(
          (candidate) => candidate.id === ai.candidateId
        );
        if (!selectedCandidate) {
          diagnostics.rejectedCandidateMissing += 1;
          continue;
        }

        const bookmakerCount = selectedCandidate.bookmakerCount;
        if (bookmakerCount < MIN_PRODUCTION_BOOKMAKERS) {
          diagnostics.rejectedBookmakerDepth += 1;
          continue;
        }

        seenEvents.add(eventKey);

        const selectedMarket = selectedCandidate.market;
        const selectedPrediction = selectedCandidate.prediction;

        const marketOdds = event.rawBookmakers
          ? getBestOddsForCandidate(
              event.rawBookmakers,
              selectedCandidate
            )
          : {
              bestOdds: event.bestOdds ?? 0,
              bestBookmaker: event.bookmaker ?? "Unknown",
              bookmakerRank: event.bookmakerRank ?? 0,
            };

        const partnerOffer = event.rawBookmakers
          ? getPartnerOddsForCandidate(
              event.rawBookmakers,
              selectedCandidate,
              event.sport
            )
          : {
              odds: null,
              bookmaker: null,
              rating: null,
            };

        const marketAverageOdds = event.rawBookmakers
          ? getAverageOddsForCandidate(
              event.rawBookmakers,
              selectedCandidate
            )
          : null;

        const marketConsensus = event.rawBookmakers
          ? getConsensusForCandidate(
              event.rawBookmakers,
              selectedCandidate
            )
          : event.consensusImpliedProb ?? null;

        const marketBestOdds = event.rawBookmakers
          ? safeNumber(marketOdds.bestOdds)
          : safeNumber(marketOdds.bestOdds) ?? safeNumber(event.bestOdds);

        const partnerOdds = event.rawBookmakers
          ? safeNumber(partnerOffer.odds)
          : safeNumber(partnerOffer.odds);
        const partnerBookmaker = partnerOffer.bookmaker ?? null;
        const bookmakerUrl =
          partnerOdds != null && partnerOdds > 1 && partnerBookmaker
            ? getExactBookmakerAffiliateUrl(
                normalizeBookmakerName(partnerBookmaker)
              )
            : null;
        const hasAffiliateMatch = Boolean(
          partnerOdds != null &&
            partnerOdds > 1 &&
            partnerBookmaker &&
            bookmakerUrl
        );

        if (hasAffiliateMatch) diagnostics.affiliateMatchAvailable += 1;
        else diagnostics.affiliateMatchMissing += 1;

        const eligibility = evaluatePredictionEligibility({
          bestOdds: marketBestOdds,
          marketAverageOdds,
          marketConsensus,
          aiFairProbability: safeNumber(ai.fairProbability),
          bookmakerCount,
        });
        if (!eligibility.eligible) {
          countEligibilityRejection(diagnostics, eligibility.reason);
          continue;
        }

        const valueDiff = resolveValueDiff({
          fairProbability: eligibility.fairProbability,
          impliedProbability: eligibility.impliedProbability,
        });

        const whySignal = buildWhySignalSummary({
          estimatedValuePct: eligibility.estimatedValuePct,
          consensusImpliedProb: marketConsensus,
          marketImpliedProbability: eligibility.impliedProbability,
          bookmakerCount,
          riskTier: eligibility.riskTier,
          trackedBookmaker: marketOdds.bestBookmaker ?? event.bookmaker ?? null,
          partnerBookmaker: hasAffiliateMatch ? partnerBookmaker : null,
        });

        topPicks.push({
          id: eventKey,
          league: event.league,
          eventId: event.id,
          homeTeam: event.homeTeam,
          awayTeam: event.awayTeam,
          startTime: event.commenceTime,
          market: selectedMarket,
          prediction: selectedPrediction,
          reasoning: ai.reasoning ?? "",
          riskTier: eligibility.riskTier,
          bestOdds: eligibility.bestOdds,
          impliedProbability: eligibility.impliedProbability,
          consensusImpliedProb: marketConsensus,
          valueDiff,
          bookmakerCount,
          bookmaker: marketOdds.bestBookmaker ?? event.bookmaker ?? "Unknown",
          bookmakerUrl: hasAffiliateMatch ? bookmakerUrl : null,
          ctaLabel: hasAffiliateMatch ? "View Offer" : null,
          status: "scheduled",

          partnerOdds: hasAffiliateMatch ? partnerOdds : null,
          partnerBookmaker: hasAffiliateMatch ? partnerBookmaker : null,
          partnerRating: hasAffiliateMatch ? partnerOffer.rating ?? null : null,
          marketAverageOdds,
          fairProbability: eligibility.fairProbability,
          fairOdds: eligibility.fairOdds,
          estimatedValuePct: eligibility.estimatedValuePct,
          bookmakerSpreadPct: eligibility.bookmakerSpreadPct,
          whySignal,
        });
        diagnostics.publishedPicks += 1;
      }

      const rankedTopPicks = rankMatches(topPicks);

      result.sports.push({
        sport: sportBlock.sport,
        status: "success",
        hasMatches: rankedTopPicks.length > 0,
        topPicks: rankedTopPicks,
        diagnostics,
      });

      console.info("[daily-run] publication diagnostics", {
        sport: sportBlock.sport,
        ...diagnostics,
      });
    }

    const newFailedCount = countFailedSports(result.sports);
    const newHealthyCount = result.sports.length - newFailedCount;

    let shouldStore = false;
    let preserveReason: string | null = null;

    if (newFailedCount === 0) {
      // CASE A: 0 failures in new run -> STORE NEW
      shouldStore = true;
    } else if (!cached) {
      // CASE B: Failures present and no existing today's cache
      if (newHealthyCount > 0) {
        // At least one sport completed healthily -> STORE PARTIAL
        shouldStore = true;
      } else {
        // All attempted sports failed -> FAIL WITHOUT STORE
        console.error(
          "[daily-run] Initial generation completely failed on all sports. Not writing error shell to Redis."
        );
        return Response.json(
          {
            success: false,
            stored: false,
            error: "All sports failed during initial daily generation.",
            health: {
              attemptedSports: result.sports.length,
              failedSports: newFailedCount,
              healthySports: newHealthyCount,
            },
          },
          { status: 500 }
        );
      }
    } else {
      // CASE C: Failures present and existing today's cache exists
      const cachedFailedCount = countFailedSports(cached.sports);

      if (newFailedCount < cachedFailedCount) {
        // New run is demonstrably healthier than existing cache -> STORE NEW
        shouldStore = true;
      } else {
        // New run is as degraded or more degraded than existing cache -> PRESERVE OLD
        shouldStore = false;
        preserveReason = "degraded_result_preserved_existing";
      }
    }

    if (!shouldStore) {
      const cachedFailedCount = countFailedSports(cached?.sports);
      console.warn(
        "[daily-run] Degraded generation rejected. Preserving existing healthy dataset in Redis.",
        {
          newFailedSports: newFailedCount,
          cachedFailedSports: cachedFailedCount,
          attemptedSports: result.sports.length,
        }
      );

      return Response.json({
        success: true,
        stored: false,
        skipped: true,
        reason: preserveReason ?? "degraded_result_preserved_existing",
        data: cached,
        health: {
          newFailedSports: newFailedCount,
          cachedFailedSports: cachedFailedCount,
          attemptedSports: result.sports.length,
        },
        socialRun: {
          ok: true,
          skipped: true,
          reason: "generation_degraded_existing_preserved",
        },
      });
    }

    // Reasoning translations are generated by the separate translate-run job.


    await redis.set(CACHE_KEY, result, { ex: CACHE_TTL });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

    let socialRun: {
      ok: boolean;
      status: number;
      body: unknown;
    } | null = null;

    try {
      const socialRes = await fetch(`${siteUrl}/api/social-run`, {
        method: "GET",
        headers: {
          "x-cron-secret": process.env.CRON_SECRET ?? "",
        },
        cache: "no-store",
      });

      let socialBody: unknown = null;

      try {
        socialBody = await socialRes.json();
      } catch {
        socialBody = null;
      }

      socialRun = {
        ok: socialRes.ok,
        status: socialRes.status,
        body: socialBody,
      };
    } catch (error) {
      socialRun = {
        ok: false,
        status: 500,
        body: {
          error: error instanceof Error ? error.message : "social-run trigger failed",
        },
      };
    }

    return Response.json({
      success: true,
      stored: true,
      cached: false,
      data: result,
      message: "Picks generated successfully.",
      generatedSports: result.sports.length,
      health: {
        attemptedSports: result.sports.length,
        failedSports: newFailedCount,
        healthySports: newHealthyCount,
      },
      socialRun,
    });
  } catch (error) {
    console.error("[daily-run] Error:", error);
    return Response.json(
      { success: false, error: "Generation failed." },
      { status: 500 }
    );
  } finally {
    if (lockAcquired) {
      try {
        await redis.eval(RELEASE_LOCK_LUA, [LOCK_KEY], [runId]);
      } catch (releaseError) {
        console.error("[daily-run] Lock release error:", releaseError);
      }
    }
  }
}
