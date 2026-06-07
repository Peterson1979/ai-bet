export type SportType =
  | "Football"
  | "NBA"
  | "NFL"
  | "Hockey"
  | "Tennis"
  | "MLB"
  | "MMA";

export type BetCode =
  // Soccer
  | "HOME_WIN"
  | "AWAY_WIN"
  | "DRAW"
  | "DOUBLE_CHANCE_1X"
  | "DOUBLE_CHANCE_X2"
  | "DRAW_NO_BET_HOME"
  | "DRAW_NO_BET_AWAY"
  | "OVER_1_5"
  | "UNDER_4_5"
  // Basketball
  | "MONEYLINE_HOME"
  | "MONEYLINE_AWAY"
  | "OVER_149_5"
  | "UNDER_179_5"
  | "TEAM_TOTAL_OVER"
  | "TEAM_TOTAL_UNDER"
  // Ice Hockey
  | "OVER_4_5"
  | "UNDER_7_5"
  | "TEAM_TOTAL_OVER_1_5"
  // American Football
  | "OVER_33_5"
  | "UNDER_54_5"
  // Tennis
  | "OVER_18_5_GAMES"
  | "UNDER_30_5_GAMES"
  | "HANDICAP_3_5"
  | "PLAYER_WIN_SET"
  // MLB / MMA
  | "MONEYLINE"
  | "OVER"
  | "UNDER"
  | string;

export type MarketType =
  | "h2h"
  | "totals"
  | "spreads"
  | "double_chance"
  | "moneyline"
  | "handicap";

export type MatchStatus =
  | "scheduled"
  | "live"
  | "finished";

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

  recommendedBet: string;
  betCode: BetCode;
  explanation: string;

  confidence: number;
  risk: number;

  marketType: MarketType;
  selectionKey: string;

  odds: number;
  oddsLabel: string;

  bookmaker: string;
  bookmakerUrl: string;

  bookmakerRank?: number;
  bestOdds?: number | null;

  impliedProbability?: number | null;
  edge?: number | null;

  isValueBet?: boolean;
  isTopPick?: boolean;

  disclaimer?: string;

  ctaLabel: string;
};