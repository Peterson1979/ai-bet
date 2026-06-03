import predictions from "@/data/predictions.json";
import type { MarketType } from "@/app/types/match";

export async function getPredictions() {
  return predictions as {
    date: string;
    generatedAt: string;
    sports: {
      sport: string;
      hasMatches: boolean;
      message?: string;
      topPicks: {
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
      }[];
    }[];
  };
}