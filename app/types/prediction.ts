// app/types/prediction.ts
import type { BetCode, MarketType, MatchStatus } from "./match";

export type PredictionCard = {
  id: string;
  league: string;
  eventId: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  recommendedBet: string;
  betCode: BetCode;
  marketType: MarketType;
  selectionKey: string;
  explanation: string;
  confidence: number;
  risk: number;
  edge?: number;
  bestOdds?: number;
  impliedProbability?: number;
  odds: number;
  oddsLabel: string;
  bookmaker: string;
  bookmakerUrl: string;
  ctaLabel: string;
  isTopPick: boolean;
  status: MatchStatus;
};