import { NextResponse } from "next/server";

type RequestBody = {
  home: string;
  away: string;
  league: string;
};

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();

    const prompt = `
You are a professional football betting analyst AI.

Return ONLY valid JSON.

Match:
Home: ${body.home}
Away: ${body.away}
League: ${body.league}

Rules:
- Do NOT mention odds or bookmakers
- Do NOT output explanations outside JSON
- Keep analysis short and factual
- Prediction must be one of: Home Win, Draw, Away Win, BTTS, Over 2.5, Under 2.5
- Confidence is 0-100 integer

Return format:

{
  "home": "...",
  "away": "...",
  "league": "...",
  "prediction": "...",
  "analysis": "...",
  "confidence": 0-100
}

Analysis should be 1–2 sentences max.
Prediction must be realistic based on team strength patterns.
`;

    // Example: OpenAI-compatible call (replace with Gemini if needed)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a strict JSON generator for betting predictions.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "No AI response" },
        { status: 500 }
      );
    }

    // safe parse
    const parsed = JSON.parse(content);

    return NextResponse.json(parsed);
  } catch (err) {
    return NextResponse.json(
      { error: "AI analysis failed", details: String(err) },
      { status: 500 }
    );
  import fs from "fs";
import path from "path";

import { getDailyEvents } from "@/app/lib/odds";
import { buildPredictionPrompt } from "@/app/lib/prompts";
import { generatePrediction } from "@/app/lib/openai";

export async function GET() {
  try {
    const sportsData = await getDailyEvents();

    const result = {
      date: new Date().toISOString().split("T")[0],
      generatedAt: new Date().toISOString(),
      sports: [],
    };

    for (const sportBlock of sportsData) {
      const topPicks = [];

      for (const event of sportBlock.events.slice(0, 3)) {
        const prompt = buildPredictionPrompt(event);

        const aiPrediction = await generatePrediction(prompt);

        if (!aiPrediction) continue;

        topPicks.push({
          id: `${event.sport
            .toLowerCase()
            .replace(/\s+/g, "-")}-${event.homeTeam}-${event.awayTeam}`,

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

    const filePath = path.join(process.cwd(), "data", "predictions.json");

    fs.writeFileSync(filePath, JSON.stringify(result, null, 2));

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