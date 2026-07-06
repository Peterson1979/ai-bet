// app/types/prediction.ts
import type { MatchStatus, RiskTier } from "./match";

export type PredictionCard = {
  id: string;
  league: string;
  eventId: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;

  market: string;
  prediction: string;
  reasoning: string;
  riskTier: RiskTier;

  bestOdds?: number;
  impliedProbability?: number;

  // added for mapper + UI consistency
  consensusImpliedProb?: number | null;
  valueDiff?: number | null;

  bookmakerCount: number;

  bookmaker: string;
  bookmakerUrl: string;
  ctaLabel: string;
  status: MatchStatus;
};