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
  reasoningTranslations?: Partial<Record<string, string>>;
  riskTier: RiskTier;

  bestOdds?: number;
  impliedProbability?: number;
  consensusImpliedProb?: number | null;
  valueDiff?: number | null;

  bookmakerCount: number;

  bookmaker: string;
  bookmakerUrl: string;
  ctaLabel: string;
  status: MatchStatus;

  partnerOdds?: number | null;
  partnerBookmaker?: string | null;
  partnerRating?: number | null;
  marketAverageOdds?: number | null;
  fairProbability?: number | null;
  fairOdds?: number | null;
  estimatedValuePct?: number | null;
  bookmakerSpreadPct?: number | null;
  whySignal?: string[];
};