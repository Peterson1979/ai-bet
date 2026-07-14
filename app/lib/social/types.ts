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
  bestOdds: number;
  impliedProbability: number;
  consensusImpliedProb: number;
  valueDiff: number;
  bookmakerCount: number;
  bookmaker: string;
  bookmakerUrl: string;
  ctaLabel: string;
  status: string;
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