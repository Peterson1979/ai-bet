// app/types/prediction.ts
import type { MatchStatus } from "./match";

export type PredictionCard = {
  id: string;
  league: string;
  eventId: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;

  preview: string;

  bestOdds?: number;
  impliedProbability?: number;
  bookmakerCount: number;

  bookmaker: string;
  bookmakerUrl: string;
  ctaLabel: string;
  status: MatchStatus;
};