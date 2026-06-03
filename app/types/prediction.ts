import type { MarketType } from "@/app/types/match";

export type PredictionCard = {
  id: string;
  league: string;
  eventId: string;

  homeTeam: string;
  awayTeam: string;

  startTime: string;

  recommendedBet: string;

  betCode:
    | "HOME_WIN"
    | "AWAY_WIN"
    | "DRAW"
    | "DOUBLE_CHANCE_1X"
    | "DOUBLE_CHANCE_X2"
    | "DRAW_NO_BET_HOME"
    | "DRAW_NO_BET_AWAY"
    | "OVER_1_5"
    | "UNDER_4_5";

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