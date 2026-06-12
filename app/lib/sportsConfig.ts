export type SportConfig = {
  minOdds: number;
  maxOdds: number;
  minEdge: number;
  maxHoursAhead: number;
  minBookmakerRank: number;
  maxEvents: number;
};

export const SPORT_CONFIG: Record<string, SportConfig> = {
  Football: {
    minOdds: 1.4,
    maxOdds: 6.0,
    minEdge: 4,
    maxHoursAhead: 48,
    minBookmakerRank: 3, // FIX: 5→3, hogy több bookmaker átmenjen a szűrőn
    maxEvents: 3,
  },
  NBA: {
    minOdds: 1.5,
    maxOdds: 4.0,
    minEdge: 5,
    maxHoursAhead: 36,
    minBookmakerRank: 3, // FIX: 5→3
    maxEvents: 3,
  },
  NFL: {
    minOdds: 1.5,
    maxOdds: 5.0,
    minEdge: 5,
    maxHoursAhead: 72,
    minBookmakerRank: 3, // FIX: 5→3
    maxEvents: 3,
  },
  Hockey: {
    minOdds: 1.4,
    maxOdds: 5.0,
    minEdge: 4,
    maxHoursAhead: 36,
    minBookmakerRank: 3, // FIX: 4→3
    maxEvents: 3,
  },
  Tennis: {
    minOdds: 1.3,
    maxOdds: 4.0,
    minEdge: 3,
    maxHoursAhead: 24,
    minBookmakerRank: 3, // FIX: 4→3
    maxEvents: 3,
  },
  MLB: {
    minOdds: 1.5,
    maxOdds: 4.5,
    minEdge: 5,
    maxHoursAhead: 24,
    minBookmakerRank: 3, // FIX: 5→3
    maxEvents: 3,
  },
  MMA: {
    minOdds: 1.4,
    maxOdds: 8.0,
    minEdge: 6,
    maxHoursAhead: 72,
    minBookmakerRank: 3, // FIX: 4→3
    maxEvents: 3,
  },
};

export const DEFAULT_CONFIG: SportConfig = {
  minOdds: 1.4,
  maxOdds: 6.0,
  minEdge: 5,
  maxHoursAhead: 48,
  minBookmakerRank: 3, // FIX: 4→3
  maxEvents: 3,
};