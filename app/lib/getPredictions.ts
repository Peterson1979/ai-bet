import type { MarketType } from "@/app/types/match";

type Prediction = {
  id: string;
  league: string;
  eventId: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  recommendedBet: string;
  betCode: string;
  marketType: MarketType;
  selectionKey: string;
  explanation: string;
  confidence: number;
  risk: number;
  odds: number;
  oddsLabel: string;
  bookmaker: string;
  bookmakerUrl: string;
  ctaLabel: string;
  isTopPick: boolean;
  status: "scheduled" | "live" | "finished";
};

type PredictionsData = {
  date: string;
  generatedAt: string;
  sports: {
    sport: string;
    hasMatches: boolean;
    message?: string;
    topPicks: Prediction[];
  }[];
};

export async function getPredictions(): Promise<PredictionsData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/daily-run`, {
  cache: "no-store",
});

    if (!res.ok) return null;

    const json = await res.json();
    if (!json.success || !json.data) return null;

    return json.data as PredictionsData;
  } catch {
    return null;
  }
}