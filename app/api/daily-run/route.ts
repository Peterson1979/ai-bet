import { Redis } from "@upstash/redis";
import { getDailyEvents } from "@/app/lib/odds";
import { buildPredictionPrompt } from "@/app/lib/prompts";
import { rankMatches } from "@/app/lib/ranking";
import { getBookmakerAffiliateUrl } from "@/app/lib/affiliates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const CACHE_TTL = 60 * 60 * 25; // 25 óra – szándékosan több mint 1 nap

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

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0]; // pl. "2026-06-10"
    const CACHE_KEY = `predictions:${today}`;

    // CACHE CHECK
    const cached = await redis.get(CACHE_KEY);
    if (cached) {
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

        topPicks.push({
          id: eventKey,
          league: event.league,
          eventId: event.id,
          homeTeam: event.homeTeam,
          awayTeam: event.awayTeam,
          startTime: event.commenceTime,
          recommendedBet: ai.recommendedBet,
          betCode: ai.betCode,
          explanation: ai.explanation,
          confidence: ai.confidence,
          risk: ai.risk,
          odds: event.odds || 0,
          bestOdds: event.bestOdds || 0,
          edge: event.edge ?? 0,
          impliedProbability: event.impliedProbability ?? 0,
          oddsLabel: `${ai.recommendedBet} @ ${event.odds}`,
          bookmaker: event.bookmaker || "Unknown",
          bookmakerUrl,
          ctaLabel: "View Odds",
          isTopPick: true,
          status: "scheduled",
          marketType: "h2h",
          selectionKey: ai.betCode,
        });
      }

      const rankedTopPicks = rankMatches(topPicks);

      result.sports.push({
        sport: sportBlock.sport,
        hasMatches: rankedTopPicks.length > 0,
        topPicks: rankedTopPicks,
      });
    }

    // CACHE WRITE - 25 óráig tárolja (garantáltan lejár a következő napi futás előtt)
    await redis.set(CACHE_KEY, result, { ex: CACHE_TTL });

    return Response.json({
      success: true,
      data: result,
      message: "Predictions generated successfully.",
      generatedSports: result.sports.length,
    });

  } catch (error) {
    console.error("[daily-run] Error:", error);
    return Response.json(
      { success: false, error: "Prediction generation failed." },
      { status: 500 }
    );
  }
}