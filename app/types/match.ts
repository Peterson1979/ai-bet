export type SportType =
  | "Football"
  | "NBA"
  | "NFL"
  | "Hockey"
  | "Tennis"
  | "MLB"
  | "MMA";

export type MatchStatus =
  | "scheduled"
  | "live"
  | "finished";

export type RiskTier = "Low" | "Medium" | "High";

export type BookmakerOffer = {
  bookmaker: string;
  bookmakerRank: number;
  homeOdds: number | null;
  awayOdds: number | null;
};

export type MatchSignalReason = string;

export type AffiliateOffer = {
  bookmakerKey: string;
  bookmakerName: string;
  trackingUrl: string;
  logoUrl?: string;
  rating?: number | null;
  odds?: number | null;
  badgeLabel?: string | null;
};

export type MatchCardData = {
  id: string;
  eventId?: string;

  sport: SportType;
  league: string;
  leagueSlug?: string;

  homeTeam: string;
  awayTeam: string;
  matchSlug?: string;

  startTime: string;
  status: MatchStatus;
  generatedAt?: string;

  market: string;
  prediction: string;
  reasoning: string;
  reasoningTranslations?: Partial<Record<string, string>>;
  riskTier: RiskTier;

  bestOdds?: number | null;
  impliedProbability?: number | null;
  consensusImpliedProb?: number | null;
  valueDiff?: number | null;
  bookmakerCount: number;

  bookmaker: string;
  bookmakerUrl: string;
  ctaLabel: string;

  partnerOffer?: AffiliateOffer;
  partnerOdds?: number | null;
  partnerBookmaker?: string | null;
  partnerRating?: number | null;

  marketAverageOdds?: number | null;
  fairProbability?: number | null;
  fairOdds?: number | null;
  estimatedValuePct?: number | null;
  bookmakerSpreadPct?: number | null;

  whySignal?: MatchSignalReason[];

  disclaimer?: string;
};