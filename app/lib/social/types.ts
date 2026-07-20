export type RiskTier = "Low" | "Medium" | "High";

export type TopPick = {
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

  bestOdds?: number | null;
  impliedProbability?: number | null;
  consensusImpliedProb?: number | null;
  valueDiff?: number | null;

  bookmakerCount: number;
  bookmaker: string;
  bookmakerUrl: string;
  ctaLabel: string;
  status: string;

  partnerBookmaker?: string | null;
  partnerOdds?: number | null;
  partnerRating?: number | null;
  marketAverageOdds?: number | null;
  fairOdds?: number | null;
  fairProbability?: number | null;
  estimatedValuePct?: number | null;
  bookmakerSpreadPct?: number | null;
  whySignal?: string[];
  partnerOffer?: {
    bookmakerName?: string | null;
    logoUrl?: string | null;
    rating?: number | null;
    odds?: number | null;
    trackingUrl?: string | null;
    badgeLabel?: string | null;
  } | null;
};

export type SportBlock = {
  sport: string;
  hasMatches: boolean;
  message?: string;
  topPicks: TopPick[];
};

export type PredictionFile = {
  date: string;
  generatedAt: string;
  sports: SportBlock[];
};

export type Candidate = TopPick & {
  sport: string;
  priorityKey: string;
  socialScore: number;
};