import fs from "fs";
import path from "path";

import { getDailyEvents } from "@/app/lib/odds";
import { buildPredictionPrompt } from "@/app/lib/prompts";
import { generatePrediction } from "@/app/lib/openai";

type SportResult = {
  sport: string;
  hasMatches: boolean;
  message?: string;
  topPicks: any[];
};

export async function GET() {
  try {
    const sportsData = await getDailyEvents();

    const cachePath = path.join(process.cwd(), "data", "cache.json");

    // =========================
    // DAILY CACHE CHECK
    // =========================
    if (fs.existsSync(cachePath)) {
      const cached = JSON.parse(fs.readFileSync(cachePath, "utf-8"));
      const today = new Date().toISOString().split("T")[0];

      if (cached.date === today) {
        return Response.json({
          success: true,
          cached: true,
          data: cached,
        });
      }
    }

    const result: {
      date: string;
      generatedAt: string;
      sports: SportResult[];
    } = {
      date: new Date().toISOString().split("T")[0],
      generatedAt: new Date().toISOString(),
      sports: [],
    };

    // =========================
    // GLOBAL HELPERS
    // =========================
    const seenEvents = new Set<string>();

    // =========================
    // MAIN LOOP (1 SPORT = 1 AI CALL)
    // =========================
    for (const sportBlock of sportsData) {
      const events = sportBlock.events?.slice(0, 3) ?? [];

      const topPicks: any[] = [];

      if (events.length === 0) {
        result.sports.push({
          sport: sportBlock.sport,
          hasMatches: false,
          message: `No ${sportBlock.sport} events available today.`,
          topPicks: [],
        });
        continue;
      }

      // =========================
      // SAFE PROMPT BUILD (TYPE SAFE)
      // =========================
      const prompt = buildPredictionPrompt({
  sport: sportBlock.sport,
  eventList: events.map((e) => ({
    id: e.id,
    league: e.league,
    homeTeam: e.homeTeam,
    awayTeam: e.awayTeam,
    commenceTime: e.commenceTime,
    odds: e.odds,
    bookmaker: e.bookmaker,
  })),
});

      // =========================
      // SINGLE AI CALL PER SPORT
      // =========================
      const aiResults = await generatePrediction(prompt);

      if (!aiResults || !Array.isArray(aiResults)) continue;

      // =========================
      // MERGE AI + EVENTS
      // =========================
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const ai = aiResults[i];

        if (!event || !ai) continue;

        const eventKey = `${event.id}-${event.homeTeam}-${event.awayTeam}`;

        if (seenEvents.has(eventKey)) continue;
        seenEvents.add(eventKey);

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
          oddsLabel: `${ai.recommendedBet} @ ${event.odds}`,

          bookmaker: event.bookmaker || "Unknown",
          bookmakerUrl: "https://example.com",

          ctaLabel: "View Odds",

          isTopPick: true,
          status: "scheduled",
        });
      }

      result.sports.push({
        sport: sportBlock.sport,
        hasMatches: topPicks.length > 0,
        topPicks,
      });
    }

    // =========================
    // WRITE CACHE
    // =========================
    fs.writeFileSync(cachePath, JSON.stringify(result, null, 2));

    fs.writeFileSync(
      path.join(process.cwd(), "data", "predictions.json"),
      JSON.stringify(result, null, 2)
    );

    return Response.json({
      success: true,
      message: "Predictions generated successfully.",
      generatedSports: result.sports.length,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Prediction generation failed.",
      },
      { status: 500 }
    );
  }
}