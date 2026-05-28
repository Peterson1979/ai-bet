import fs from "fs";
import path from "path";

import { getDailyEvents } from "@/lib/odds";
import { buildPredictionPrompt } from "@/lib/prompts";
import { generatePrediction } from "@/lib/openai";

export async function GET() {
  try {
    const sportsData = await getDailyEvents();

    const result = {
      date: new Date()
        .toISOString()
        .split("T")[0],

      generatedAt: new Date().toISOString(),

      sports: [],
    };

    for (const sportBlock of sportsData) {
      const topPicks = [];

      for (const event of sportBlock.events.slice(0, 3)) {
        const prompt =
          buildPredictionPrompt(event);

        const aiPrediction =
          await generatePrediction(prompt);

        if (!aiPrediction) {
          continue;
        }

        topPicks.push({
          id: `${event.sport
            .toLowerCase()
            .replace(/\s+/g, "-")}-${
            event.homeTeam
          }-${event.awayTeam}`,

          league: event.league,

          eventId: event.id,

          homeTeam: event.homeTeam,

          awayTeam: event.awayTeam,

          startTime: event.commenceTime,

          recommendedBet:
            aiPrediction.recommendedBet,

          betCode:
            aiPrediction.betCode,

          marketType: "h2h",

          selectionKey: "home",

          explanation:
            aiPrediction.explanation,

          confidence:
            aiPrediction.confidence,

          risk:
            aiPrediction.risk,

          odds: event.odds || 0,

          oddsLabel: `${aiPrediction.recommendedBet} @ ${event.odds}`,

          bookmaker:
            event.bookmaker || "Unknown",

          bookmakerUrl:
            "https://example.com",

          ctaLabel: "View Odds",

          isTopPick: true,

          status: "scheduled",
        });
      }

      result.sports.push({
        sport: sportBlock.sport,

        hasMatches:
          topPicks.length > 0,

        message:
          topPicks.length === 0
            ? `No ${sportBlock.sport} events available today.`
            : undefined,

        topPicks,
      });
    }

    const filePath = path.join(
      process.cwd(),
      "data",
      "predictions.json"
    );

    fs.writeFileSync(
      filePath,
      JSON.stringify(result, null, 2)
    );

    return Response.json({
      success: true,

      message:
        "Predictions generated successfully.",

      generatedSports:
        result.sports.length,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,

        error:
          "Prediction generation failed.",
      },
      {
        status: 500,
      }
    );
  }
}