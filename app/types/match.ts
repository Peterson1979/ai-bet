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

export type BookmakerOffer = {
  bookmaker: string;
  bookmakerRank: number;
  homeOdds: number | null;
  awayOdds: number | null;
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

  preview: string;

  bestOdds?: number | null;
  impliedProbability?: number | null;
  bookmakerCount: number;

  bookmaker: string;
  bookmakerUrl: string;
  ctaLabel: string;

  disclaimer?: string;
};