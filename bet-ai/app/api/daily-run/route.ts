import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { home, away, league } = body;

    // ide később jön Gemini / OpenAI
    // most determinisztikus mock AI (stabil base)

    const confidence = Math.floor(55 + Math.random() * 35);

    let prediction = "Draw";
    if (confidence > 75) prediction = "Home Win";
    else if (confidence < 65) prediction = "BTTS";

    const risk =
      confidence > 75 ? "low" : confidence > 65 ? "medium" : "high";

    return NextResponse.json({
      prediction,
      confidence,
      risk,
      reasoning: `${home} shows stronger recent form and better squad depth compared to ${away}. Tactical matchup slightly favors ${home}.`,
      alternativeTip:
        risk === "high" ? "Double Chance (Home or Draw)" : undefined,
      summary: `${prediction} recommended based on AI model analysis.`,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "analysis_failed" },
      { status: 500 }
    );
  }
}