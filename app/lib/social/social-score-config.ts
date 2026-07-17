export const LEAGUE_PRIORITY: Record<string, number> = {
  // Football
  "FIFA World Cup": 100,
  "UEFA Champions League": 100,
  "Premier League": 98,
  "La Liga": 96,
  "Serie A": 94,
  "Bundesliga": 94,
  "Ligue 1": 90,
  "UEFA Europa League": 88,
  "UEFA Conference League": 84,
  "Copa Libertadores": 86,
  "MLS": 78,
  "Liga MX": 80,
  "Brazil Série A": 82,
  "Brazil Serie A": 82,
  "Championship": 72,
  "J League": 70,
  "K League": 70,

  // US sports
  "NBA": 100,
  "NFL": 100,
  "MLB": 95,
  "NHL": 95,

  // Tennis
  "ATP": 88,
  "WTA": 86,
  "ATP 1000": 96,
  "WTA 1000": 94,
  "Grand Slam": 100,

  // Combat
  "MMA": 82,
  "Boxing": 84,
};

export const DEFAULT_LEAGUE_PRIORITY = 60;

export const SOCIAL_SCORE_WEIGHTS = {
  valueDiff: 0.35,
  leaguePriority: 0.25,
  riskTier: 0.20,
  oddsScore: 0.10,
  bookmakerScore: 0.10,
} as const;

export const MIN_BOOKMAKERS = 3;
export const MIN_START_BUFFER_MINUTES = 90;
export const MAX_CAROUSEL_PICKS = 5;

export function getOddsScore(bestOdds?: number | null): number {
  if (!bestOdds || Number.isNaN(bestOdds)) return 0;

  if (bestOdds >= 1.7 && bestOdds <= 2.5) return 10;
  if (bestOdds >= 1.5 && bestOdds < 1.7) return 6;
  if (bestOdds > 2.5 && bestOdds <= 3.2) return 5;

  return 0;
}

export function getBookmakerScore(bookmakerCount?: number | null): number {
  if (!bookmakerCount || Number.isNaN(bookmakerCount)) return 0;
  if (bookmakerCount >= 12) return 8;
  if (bookmakerCount >= 8) return 5;
  if (bookmakerCount >= 5) return 3;
  return 0;
}

export function getRiskTierScore(riskTier?: string | null): number {
  switch ((riskTier ?? "").toLowerCase()) {
    case "low":
      return 10;
    case "medium":
      return 6;
    case "high":
      return 2;
    default:
      return 4;
  }
}

export function getLeaguePriority(league?: string | null): number {
  if (!league) return DEFAULT_LEAGUE_PRIORITY;
  return LEAGUE_PRIORITY[league] ?? DEFAULT_LEAGUE_PRIORITY;
}