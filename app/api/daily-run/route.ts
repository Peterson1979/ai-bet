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
    // DEDUPE + PROMPT CACHE
    // =========================
    const seenEvents = new Set<string>();
    const promptCache = new Map<string, string>();

    for (const sportBlock of sportsData) {
      const topPicks: any[] = [];

      for (const event of sportBlock.events.slice(0, 3)) {
        const eventKey = `${event.id}-${event.homeTeam}-${event.awayTeam}`;

        if (seenEvents.has(eventKey)) continue;
        seenEvents.add(eventKey);

        let prompt = promptCache.get(eventKey);

        if (!prompt) {
          prompt = buildPredictionPrompt(event);
          promptCache.set(eventKey, prompt);
        }

        const aiPrediction = await generatePrediction(prompt);

        if (!aiPrediction) continue;

        topPicks.push({
          id: eventKey,

          league: event.league,
          eventId: event.id,

          homeTeam: event.homeTeam,
          awayTeam: event.awayTeam,

          startTime: event.commenceTime,

          recommendedBet: aiPrediction.recommendedBet,
          betCode: aiPrediction.betCode,

          marketType: "h2h",
          selectionKey: "home",

          explanation: aiPrediction.explanation,
          confidence: aiPrediction.confidence,
          risk: aiPrediction.risk,

          odds: event.odds || 0,
          oddsLabel: `${aiPrediction.recommendedBet} @ ${event.odds}`,

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
        message:
          topPicks.length === 0
            ? `No ${sportBlock.sport} events available today.`
            : undefined,
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