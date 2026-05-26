export type SportType =
  | "Football"
  | "NBA"
  | "NFL"
  | "Hockey"
  | "Tennis";

export type MatchCardData = {
  id: string;

  sport: SportType;

  league: string;

  eventName: string;

  startTimeUtc: string;

  status: "upcoming" | "live" | "finished";

  verdict: string;

  recommendedBet: string;

  confidence: number;

  riskScore: number;

  shortAnalysis: string;

  ctaLabel: string;

  ctaUrl: string;

  bookmakerName?: string;

  disclaimer?: string;

  updatedAt: string;
};