import type { PredictionCard } from "@/app/types/prediction";
import type { MatchCardData, SportType } from "@/app/types/match";

export function toMatchCardData(
  p: PredictionCard,
  sport: string
): MatchCardData {
  return {
    id: p.id,
    eventId: p.eventId,

    sport: sport as SportType,

    league: p.league,
    homeTeam: p.homeTeam,
    awayTeam: p.awayTeam,

    startTime: p.startTime,
    status: p.status,

    generatedAt: new Date().toISOString(),

    recommendedBet: p.recommendedBet,
    betCode: p.betCode,

    explanation: p.explanation,
    confidence: p.confidence,
    risk: p.risk,

    marketType: p.marketType,
    selectionKey: p.selectionKey,

    odds: p.odds,
    oddsLabel: p.oddsLabel,

    bookmaker: p.bookmaker,
    bookmakerUrl: p.bookmakerUrl,

    ctaLabel: p.ctaLabel,

    isTopPick: p.isTopPick,

    disclaimer: "Odds may change before match start.",
  };
}