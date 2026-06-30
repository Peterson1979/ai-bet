import { Redis } from "@upstash/redis";
import { getDailyEvents } from "@/app/lib/odds";
import { buildPredictionPrompt } from "@/app/lib/prompts";
import { rankMatches } from "@/app/lib/ranking";
import { getBookmakerAffiliateUrl } from "@/app/lib/affiliates";
import { calculateRiskTier } from "@/app/lib/sportsConfig";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const CACHE_TTL = 60 * 60 * 25;

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
      const events = sportBlock.events?.slice(0, 3) ?? [];

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

        const bookmakerUrl = getBookmakerAffiliateUrl(
          (event.bookmaker || "").toLowerCase().replace(/\s/g, ""),
          event.sport
        );

        const riskTier = calculateRiskTier(
          event.bestOdds ?? 0,
          event.bookmakerCount ?? 0
        );

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
          bestOdds: event.bestOdds || 0,
          impliedProbability: event.impliedProbability ?? 0,
          bookmakerCount: event.bookmakerCount ?? 0,
          bookmaker: event.bookmaker || "Unknown",
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

    return Response.json({
      success: true,
      cached: false,
      data: result,
      message: "Picks generated successfully.",
      generatedSports: result.sports.length,
    });

  } catch (error) {
    console.error("[daily-run] Error:", error);
    return Response.json(
      { success: false, error: "Generation failed." },
      { status: 500 }
    );
  }
}