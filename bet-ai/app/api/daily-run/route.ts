import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { generateAI } from "@/app/lib/ai";

export async function GET() {
  const matches = [
    {
      slug: "arsenal-vs-chelsea",
      league: "Premier League",
    },
    {
      slug: "inter-vs-milan",
      league: "Serie A",
    },
    {
      slug: "barcelona-vs-sevilla",
      league: "La Liga",
    },
  ];

  const enriched = [];

  for (const match of matches) {
    const ai = await generateAI(match);

    enriched.push({
      ...match,
      prediction: ai.prediction,
      confidence: ai.confidence,
      analysis: ai.analysis,
    });
  }

  const filePath = path.join(process.cwd(), "data", "predictions.json");

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(enriched, null, 2));

  return NextResponse.json({
    success: true,
    count: enriched.length,
    message: "Daily pipeline executed",
  });
}