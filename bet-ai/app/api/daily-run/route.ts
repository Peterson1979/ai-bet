import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

import { getMatches } from "@/app/lib/fixtures";
import { getOdds } from "@/app/lib/odds";

type Match = {
  slug: string;
  league: string;
};

type Prediction = {
  slug: string;
  league: string;
  prediction: string;
  confidence: number;
  analysis: string;
  odds: number;
};

function getBaseProbability(league: string, odds: number) {
  const leagueBias: Record<string, number> = {
    "Premier League": 52,
    "La Liga": 51,
    "Serie A": 50,
    "Bundesliga": 53,
    "Ligue 1": 54,
    "Champions League": 50,
  };

  const base = leagueBias[league] || 50;

  const oddsPressure = 100 / odds;

  return base * 0.4 + oddsPressure * 0.6;
}

function getPredictionType(odds: number) {
  if (odds < 1.6) return "Home Win";
  if (odds < 2.2) return "Draw or Home";
  if (odds < 2.8) return "BTTS";
  return "Over 2.5 Goals";
}

function clamp(num: number, min: number, max: number) {
  return Math.max(min, Math.min(max, num));
}

async function generatePrediction(match: Match): Promise<Prediction> {
  const [homeRaw, awayRaw] = match.slug.split("-vs-");

  const home = homeRaw.replace(/-/g, " ");
  const away = awayRaw.replace(/-/g, " ");

  const oddsData = await getOdds(home, away);

  const odds =
    oddsData?.home ||
    Number((1.8 + (home.length % 10) * 0.1).toFixed(2));

  const impliedProb = 100 / odds;

  let confidence = getBaseProbability(match.league, odds);

  const edge = confidence - impliedProb;

  confidence = clamp(confidence, 45, 85);

  const prediction = getPredictionType(odds);

  const analysis = `Odds ${odds} → implied ${impliedProb.toFixed(
    1
  )}% → model ${confidence.toFixed(
    1
  )}% → edge ${edge.toFixed(1)}%`;

  return {
    slug: match.slug,
    league: match.league,
    prediction,
    confidence: Math.round(confidence),
    odds,
    analysis,
  };
}

export async function GET() {
  try {
    const predictionsPath = path.join(
      process.cwd(),
      "data",
      "predictions.json"
    );

    const matches = await getMatches();

    if (!matches.length) {
      return NextResponse.json({
        success: false,
        message: "No matches found",
        count: 0,
      });
    }

    const predictions: Prediction[] = [];

    for (const match of matches) {
      const p = await generatePrediction(match);
      predictions.push(p);
    }

    fs.writeFileSync(
      predictionsPath,
      JSON.stringify(predictions, null, 2)
    );

    return NextResponse.json({
      success: true,
      count: predictions.length,
      message: "Real model pipeline executed",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Pipeline failed",
      },
      { status: 500 }
    );
  }
}