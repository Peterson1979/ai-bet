import { Redis } from "@upstash/redis";

import { buildPredictionPrompt } from "@/app/lib/prompts";
import { rankMatches } from "@/app/lib/ranking";
import { getBookmakerAffiliateUrl } from "@/app/lib/affiliates";
import { calculateRiskTier } from "@/app/lib/sportsConfig";
import {
  getDailyEvents,
  getBestOddsForMarket,
  getConsensusForMarket,
} from "@/app/lib/odds";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const CACHE_TTL = 60 * 60 * 25;
const SOCIAL_DELAY_MS = 5 * 60 * 1000;

type SportResult = {
  sport: string;
  hasMatches: boolean;
  message?: string;
  topPicks: any[];
};

async function generateAI(prompt: string) {
  const { generatePrediction } = await import("@/app/lib/groq");
  return generatePrediction(prompt);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function triggerSocialRun(request: Request) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.warn("[daily-run] CRON_SECRET missing, social-run skipped.");
    return { ok: false, skipped: true, reason: "missing_cron_secret" };
  }

  const currentUrl = new URL(request.url);
  const origin = currentUrl.origin;

  const socialUrl = `${origin}/api/social-run?force=1`;

  console.log("[daily-run] Waiting before social-run trigger...", {
    delayMs: SOCIAL_DELAY_MS,
    socialUrl,
  });

  await delay(SOCIAL_DELAY_MS);

  const socialRes = await fetch(socialUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cronSecret}`,
    },
    cache: "no-store",
  });

  const socialText = await socialRes.text();
  let socialJson: unknown;

  try {
    socialJson = JSON.parse(socialText);
  } catch {
    socialJson = { raw: socialText };
  }

  console.log("[daily-run] social-run response", {
    status: socialRes.status,
    ok: socialRes.ok,
    body: socialJson,
  });

  if (!socialRes.ok) {
    throw new Error(
      `social-run failed: ${JSON.stringify({
        status: socialRes.status,
        body: socialJson,
      })}`
    );
  }

  return { ok: true, skipped: false, response: socialJson };
}

export async function GET(request: Request) {
  try {
    const today = new Date().toISOString().split("T")[0];
    const CACHE_KEY = `predictions:${today}`;

    const url = new URL(request.url);
    const force = url.searchParams.get("force") === "1";

    const cached = await redis.get(CACHE_KEY);
    if (cached && !force) {
      return Response.json({ success: true, cached: true, data: cached });
    }

    const sportsData = await getDailyEvents();

    const result: {
      date: string;
      generatedAt: string;
      sports: SportResult[];
    } = {
      date: new Date().toISOString().split("T")[0],
      generatedAt: new Date().toISOString(),
      sports: [],
    };

    const seenEvents = new Set<string>();

    for (const sportBlock of sportsData) {
      const events = sportBlock.events?.slice(0, 12) ?? [];

      if (events.length === 0) {
        result.sports.push({
          sport: sportBlock.sport,
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

        const marketOdds = event.rawBookmakers
          ? getBestOddsForMarket(
              event.rawBookmakers,
              ai.market ?? "",
              event.homeTeam,
              event.awayTeam
            )
          : {
              bestOdds: event.bestOdds ?? 0,
              bestBookmaker: event.bookmaker ?? "Unknown",
              bookmakerRank: event.bookmakerRank ?? 0,
            };

        const finalOdds = marketOdds.bestOdds || event.bestOdds || 0;
        const finalBookmaker = marketOdds.bestBookmaker || event.bookmaker || "Unknown";

        const bookmakerUrl = getBookmakerAffiliateUrl(
          finalBookmaker.toLowerCase().replace(/\s/g, ""),
          event.sport
        );

        const riskTier = calculateRiskTier(
          finalOdds,
          event.bookmakerCount ?? 0
        );

        const impliedProbability =
          finalOdds > 0
            ? Number((100 / finalOdds).toFixed(2))
            : event.impliedProbability ?? 0;

        const marketConsensus = event.rawBookmakers
          ? getConsensusForMarket(
              event.rawBookmakers,
              ai.market ?? "",
              event.homeTeam,
              event.awayTeam
            )
          : event.consensusImpliedProb ?? null;

        const valueDiff =
          marketConsensus != null && impliedProbability > 0
            ? Number((marketConsensus - impliedProbability).toFixed(2))
            : null;

        topPicks.push({
          id: eventKey,
          league: event.league,
          eventId: event.id,
          homeTeam: event.homeTeam,
          awayTeam: event.awayTeam,
          startTime: event.commenceTime,
          market: ai.market ?? "",
          prediction: ai.prediction ?? "",
          reasoning: ai.reasoning ?? "",
          riskTier,
          bestOdds: finalOdds,
          impliedProbability,
          consensusImpliedProb: event.consensusImpliedProb ?? null,
          valueDiff,
          bookmakerCount: event.bookmakerCount ?? 0,
          bookmaker: finalBookmaker,
          bookmakerUrl,
          ctaLabel: "View Odds",
          status: "scheduled",
        });
      }

      const rankedTopPicks = rankMatches(topPicks);

      result.sports.push({
        sport: sportBlock.sport,
        hasMatches: rankedTopPicks.length > 0,
        topPicks: rankedTopPicks,
      });
    }

    await redis.set(CACHE_KEY, result, { ex: CACHE_TTL });

    let socialRunResult:
      | { ok: boolean; skipped?: boolean; reason?: string; response?: unknown }
      | null = null;

    try {
      socialRunResult = await triggerSocialRun(request);
    } catch (socialError) {
      console.error("[daily-run] social-run trigger error:", socialError);
      socialRunResult = {
        ok: false,
        skipped: false,
        reason: "social_run_failed",
      };
    }

    return Response.json({
      success: true,
      cached: false,
      data: result,
      message: "Picks generated successfully.",
      generatedSports: result.sports.length,
      socialRun: socialRunResult,
    });
  } catch (error) {
    console.error("[daily-run] Error:", error);
    return Response.json(
      { success: false, error: "Generation failed." },
      { status: 500 }
    );
  }
}