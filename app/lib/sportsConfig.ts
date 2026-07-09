export type SportConfig = {
  minOdds: number;
  maxOdds: number;
  maxHoursAhead: number;
  minBookmakerRank: number;
  maxEvents: number;
};

export const SPORT_CONFIG: Record<string, SportConfig> = {
  Football: {
    minOdds: 1.4,
    maxOdds: 6.0,
    maxHoursAhead: 48,
    minBookmakerRank: 3,
    maxEvents: 12,
  },
  NBA: {
    minOdds: 1.5,
    maxOdds: 4.0,
    maxHoursAhead: 48,
    minBookmakerRank: 3,
    maxEvents: 12,
  },
  NFL: {
    minOdds: 1.5,
    maxOdds: 5.0,
    maxHoursAhead: 48,
    minBookmakerRank: 3,
    maxEvents: 12,
  },
  Hockey: {
    minOdds: 1.4,
    maxOdds: 5.0,
    maxHoursAhead: 48,
    minBookmakerRank: 3,
    maxEvents: 12,
  },
  Tennis: {
    minOdds: 1.3,
    maxOdds: 4.0,
    maxHoursAhead: 48,
    minBookmakerRank: 3,
    maxEvents: 12,
  },
  MLB: {
    minOdds: 1.5,
    maxOdds: 4.5,
    maxHoursAhead: 48,
    minBookmakerRank: 3,
    maxEvents: 12,
  },
  MMA: {
    minOdds: 1.4,
    maxOdds: 8.0,
    maxHoursAhead: 48,
    minBookmakerRank: 3,
    maxEvents: 12,
  },
};

export const DEFAULT_CONFIG: SportConfig = {
  minOdds: 1.4,
  maxOdds: 6.0,
  maxHoursAhead: 48,
  minBookmakerRank: 3,
  maxEvents: 12,
};

/**
 * Risk tier derived from real market data (odds + market depth),
 * NOT from AI guesswork. Lower odds + more bookmakers = lower risk.
 */
export type RiskTier = "Low" | "Medium" | "High";

export function calculateRiskTier(odds: number, bookmakerCount: number): RiskTier {
  if (odds <= 1.8 && bookmakerCount >= 5) return "Low";
  if (odds <= 3.0 && bookmakerCount >= 3) return "Medium";
  return "High";
}

export const DEFAULT_SPORT_ORDER: string[] = [
  "football",
  "nba",
  "nfl",
  "hockey",
  "tennis",
  "mlb",
  "mma",
];

type MinimalSportBlock = {
  sport: string;
  hasMatches: boolean;
  topPicks: { startTime: string }[];
};

/**
 * A homepage "Top Picks" sportág-blokkjait rendezi:
 * - előre kerülnek azok a sportágak, amikben van jövőbeli (még el nem
 *   kezdődött) esemény, a DEFAULT_SPORT_ORDER sorrendje szerint
 * - utánuk a többi, szintén DEFAULT_SPORT_ORDER szerint
 * - ismeretlen sportág a végére kerül, a saját relatív csoportján belül
 */
export function sortSportBlocks<T extends MinimalSportBlock>(blocks: T[]): T[] {
  const now = new Date();

  const hasFutureMatch = (block: T) =>
    block.hasMatches &&
    block.topPicks.some((p) => new Date(p.startTime) > now);

  const rank = (sport: string) => {
    const idx = DEFAULT_SPORT_ORDER.indexOf(sport.toLowerCase());
    return idx === -1 ? DEFAULT_SPORT_ORDER.length : idx;
  };

  return [...blocks].sort((a, b) => {
    const aHas = hasFutureMatch(a) ? 0 : 1;
    const bHas = hasFutureMatch(b) ? 0 : 1;
    if (aHas !== bHas) return aHas - bHas;
    return rank(a.sport) - rank(b.sport);
  });
}