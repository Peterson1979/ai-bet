import { Redis } from "@upstash/redis";
import type { MarketType } from "@/app/types/match";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

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
    const today = new Date().toISOString().split("T")[0];
    const CACHE_KEY = `predictions:${today}`;
    const data = await redis.get<PredictionsData>(CACHE_KEY);
    return data ?? null;
  } catch {
    return null;
  }
}