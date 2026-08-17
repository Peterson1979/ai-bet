import { Redis } from "@upstash/redis";

import { buildPredictionPrompt } from "@/app/lib/prompts";
import { rankMatches } from "@/app/lib/ranking";
import { getBookmakerAffiliateUrl } from "@/app/lib/affiliates";
import { calculateRiskTier } from "@/app/lib/sportsConfig";
import {
  getDailyEvents,
  getBestOddsForMarket,
  getConsensusForMarket,
  getPartnerOddsForMarket,
  getAverageOddsForMarket,
  decimalOddsToImpliedProbability,
  impliedProbabilityToDecimalOdds,
  calculateEstimatedValuePct,
  calculateBookmakerSpreadPct,
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
};

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

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function normalizeBookmakerName(value: string | null | undefined): string {
  return (value ?? "").toLowerCase().trim().replace(/\s+/g, "");
}

function resolveFairProbability(params: {
  aiFairProbability?: number | null;
  marketConsensus?: number | null;
  impliedProbability?: number | null;
  bookmakerCount?: number | null;
}): number | null {
  const aiFairProbability = safeNumber(params.aiFairProbability);
  const marketConsensus = safeNumber(params.marketConsensus);
  const impliedProbability = safeNumber(params.impliedProbability);
  const bookmakerCount = safeNumber(params.bookmakerCount) ?? 0;

  if (aiFairProbability != null) {
    return clamp(aiFairProbability, 1, 99);
  }

  if (marketConsensus == null && impliedProbability == null) {
    return null;
  }

  if (marketConsensus != null && impliedProbability != null) {
    const marketWeight =
      bookmakerCount >= 20 ? 0.75 : bookmakerCount >= 10 ? 0.68 : 0.6;
    const impliedWeight = 1 - marketWeight;

    return clamp(
      marketConsensus * marketWeight + impliedProbability * impliedWeight,
      1,
      99
    );
  }

  if (marketConsensus != null) {
    return clamp(marketConsensus, 1, 99);
  }

  return impliedProbability != null ? clamp(impliedProbability, 1, 99) : null;
}

function resolveEstimatedValuePct(params: {
  explicitEstimatedValuePct?: number | null;
  fairProbability?: number | null;
  partnerOdds?: number | null;
}): number | null {
  const explicitEstimatedValuePct = safeNumber(params.explicitEstimatedValuePct);

  if (explicitEstimatedValuePct != null) {
    return Number(explicitEstimatedValuePct.toFixed(2));
  }

  const fairProbability = safeNumber(params.fairProbability);
  const partnerOdds = safeNumber(params.partnerOdds);

  if (fairProbability == null || partnerOdds == null || partnerOdds <= 1) {
    return null;
  }

  const calculated = calculateEstimatedValuePct(fairProbability, partnerOdds);
  return calculated == null ? null : Number(calculated.toFixed(2));
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

function deriveRiskTier(params: {
  partnerOdds: number;
  bookmakerCount: number;
  estimatedValuePct?: number | null;
  bookmakerSpreadPct?: number | null;
}) {
  const baseTier = calculateRiskTier(params.partnerOdds, params.bookmakerCount);
  const estimatedValuePct = safeNumber(params.estimatedValuePct);
  const bookmakerSpreadPct = safeNumber(params.bookmakerSpreadPct);

  if (baseTier === "High") return "High";

  const hasWeakValueSignal =
    estimatedValuePct != null && estimatedValuePct < 0.75;
  const hasLargePriceDislocation =
    bookmakerSpreadPct != null && Math.abs(bookmakerSpreadPct) >= 6;

  if (baseTier === "Low" && !hasWeakValueSignal && !hasLargePriceDislocation) {
    return "Low";
  }

  if (baseTier === "Low" && (hasWeakValueSignal || hasLargePriceDislocation)) {
    return "Medium";
  }

  if (baseTier === "Medium" && hasLargePriceDislocation && hasWeakValueSignal) {
    return "High";
  }

  return baseTier;
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
      if (sportBlock.fetchFailed) {
        result.sports.push({
          sport: sportBlock.sport,
          status: "failed",
          hasMatches: false,
          message:
            sportBlock.error ?? `Upstream data fetch failed for ${sportBlock.sport}.`,
          topPicks: [],
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
        });
        continue;
      }

      const topPicks: any[] = [];

      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const ai = aiResults[i] ?? aiResults[0];

        if (!event || !ai) continue;

        const eventKey = `${event.id}-${event.homeTeam}-${event.awayTeam}`;
        if (seenEvents.has(eventKey)) continue;
        seenEvents.add(eventKey);

        const selectedMarket = ai.market ?? "";
        const selectedPrediction = ai.prediction ?? "";

        const marketOdds = event.rawBookmakers
          ? getBestOddsForMarket(
              event.rawBookmakers,
              selectedMarket,
              event.homeTeam,
              event.awayTeam
            )
          : {
              bestOdds: event.bestOdds ?? 0,
              bestBookmaker: event.bookmaker ?? "Unknown",
              bookmakerRank: event.bookmakerRank ?? 0,
            };

        const partnerOffer = event.rawBookmakers
          ? getPartnerOddsForMarket(
              event.rawBookmakers,
              selectedMarket,
              event.homeTeam,
              event.awayTeam,
              event.sport
            )
          : {
              odds: null,
              bookmaker: null,
              rating: null,
            };

        const marketAverageOdds = event.rawBookmakers
          ? getAverageOddsForMarket(
              event.rawBookmakers,
              selectedMarket,
              event.homeTeam,
              event.awayTeam
            )
          : null;

        const marketConsensus = event.rawBookmakers
          ? getConsensusForMarket(
              event.rawBookmakers,
              selectedMarket,
              event.homeTeam,
              event.awayTeam
            )
          : event.consensusImpliedProb ?? null;

        const marketBestOdds = safeNumber(marketOdds.bestOdds) ?? safeNumber(event.bestOdds);
        const partnerOdds =
          safeNumber(partnerOffer.odds) ??
          marketBestOdds ??
          null;

        if (partnerOdds == null || partnerOdds <= 1) {
          continue;
        }

        const partnerBookmaker =
          partnerOffer.bookmaker ??
          marketOdds.bestBookmaker ??
          event.bookmaker ??
          "Partner offer";

        const bookmakerUrl = getBookmakerAffiliateUrl(
          normalizeBookmakerName(partnerBookmaker),
          event.sport
        );

        const impliedProbability =
          decimalOddsToImpliedProbability(partnerOdds) ??
          safeNumber(event.impliedProbability) ??
          null;

        if (impliedProbability == null) {
          continue;
        }

        const aiFairProbability = safeNumber(ai.fairProbability);
        const fairProbability = resolveFairProbability({
          aiFairProbability,
          marketConsensus,
          impliedProbability,
          bookmakerCount: event.bookmakerCount ?? 0,
        });

        const fairOdds =
          fairProbability != null
            ? impliedProbabilityToDecimalOdds(fairProbability)
            : null;

        const bookmakerSpreadPct = calculateBookmakerSpreadPct(
          partnerOdds,
          marketAverageOdds
        );

        const estimatedValuePct = resolveEstimatedValuePct({
          explicitEstimatedValuePct: safeNumber(ai.estimatedValuePct),
          fairProbability,
          partnerOdds,
        });

        const valueDiff = resolveValueDiff({
          explicitValueDiff: safeNumber(ai.valueDiff),
          fairProbability,
          impliedProbability,
        });

        const riskTier = deriveRiskTier({
          partnerOdds,
          bookmakerCount: event.bookmakerCount ?? 0,
          estimatedValuePct,
          bookmakerSpreadPct,
        });

        const whySignal = buildWhySignalSummary({
          estimatedValuePct,
          consensusImpliedProb: marketConsensus,
          partnerImpliedProbability: impliedProbability,
          bookmakerCount: event.bookmakerCount ?? 0,
          riskTier,
          partnerBookmaker,
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
          riskTier,
          bestOdds: partnerOdds,
          impliedProbability,
          consensusImpliedProb: marketConsensus,
          valueDiff,
          bookmakerCount: event.bookmakerCount ?? 0,
          bookmaker: partnerBookmaker,
          bookmakerUrl,
          ctaLabel: "View Offer",
          status: "scheduled",

          partnerOdds,
          partnerBookmaker,
          partnerRating: partnerOffer.rating ?? null,
          marketAverageOdds,
          fairProbability,
          fairOdds,
          estimatedValuePct,
          bookmakerSpreadPct,
          whySignal,
        });
      }

      const rankedTopPicks = rankMatches(topPicks);

      result.sports.push({
        sport: sportBlock.sport,
        status: "success",
        hasMatches: rankedTopPicks.length > 0,
        topPicks: rankedTopPicks,
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
