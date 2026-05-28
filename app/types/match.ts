export type SportType =
  | "Football"
  | "NBA"
  | "NFL"
  | "Hockey"
  | "Tennis";

export type BetCode =
  | "HOME_WIN"
  | "AWAY_WIN"
  | "DRAW"
  | "DOUBLE_CHANCE_1X"
  | "DOUBLE_CHANCE_X2"
  | "DRAW_NO_BET_HOME"
  | "DRAW_NO_BET_AWAY"
  | "OVER_1_5"
  | "UNDER_4_5";

export type MarketType =
  | "h2h"
  | "totals"
  | "spreads"
  | "double_chance";

export type MatchStatus =
  | "scheduled"
  | "live"
  | "finished";

export type MatchCardData = {
  /*
   * INTERNAL IDS
   */
  id: string;

  eventId?: string;

  /*
   * SPORT INFO
   */
  sport: SportType;

  league: string;

  leagueSlug?: string;

  /*
   * TEAMS
   */
  homeTeam: string;

  awayTeam: string;

  matchSlug?: string;

  /*
   * TIMING
   */
  startTime: string;

  status: MatchStatus;

  generatedAt: string;

  /*
   * AI PICK
   */
  recommendedBet: string;

  betCode: BetCode;

  explanation: string;

  confidence: number;

  risk: number;

  /*
   * ODDS DATA
   */
  marketType: MarketType;

  selectionKey: string;

  odds: number;

  oddsLabel: string;

  /*
   * BOOKMAKER
   */
  bookmaker: string;

  bookmakerUrl: string;

  /*
   * CTA
   */
  ctaLabel: string;

  /*
   * UI FLAGS
   */
  isTopPick?: boolean;

  /*
   * OPTIONAL
   */
  disclaimer?: string;
};