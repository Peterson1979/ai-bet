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
    maxEvents: 6,
  },
  NBA: {
    minOdds: 1.5,
    maxOdds: 4.0,
    maxHoursAhead: 48,
    minBookmakerRank: 3,
    maxEvents: 6,
  },
  NFL: {
    minOdds: 1.5,
    maxOdds: 5.0,
    maxHoursAhead: 48,
    minBookmakerRank: 3,
    maxEvents: 6,
  },
  Hockey: {
    minOdds: 1.4,
    maxOdds: 5.0,
    maxHoursAhead: 48,
    minBookmakerRank: 3,
    maxEvents: 6,
  },
  Tennis: {
    minOdds: 1.3,
    maxOdds: 4.0,
    maxHoursAhead: 48,
    minBookmakerRank: 3,
    maxEvents: 6,
  },
  MLB: {
    minOdds: 1.5,
    maxOdds: 4.5,
    maxHoursAhead: 48,
    minBookmakerRank: 3,
    maxEvents: 6,
  },
  MMA: {
    minOdds: 1.4,
    maxOdds: 8.0,
    maxHoursAhead: 48,
    minBookmakerRank: 3,
    maxEvents: 6,
  },
};

export const DEFAULT_CONFIG: SportConfig = {
  minOdds: 1.4,
  maxOdds: 6.0,
  maxHoursAhead: 48,
  minBookmakerRank: 3,
  maxEvents: 6,
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