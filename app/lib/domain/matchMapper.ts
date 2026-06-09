import type { PredictionCard } from "@/app/types/prediction";
import type { MatchCardData, SportType } from "@/app/types/match";
import { getBookmakerAffiliateUrl } from "@/app/lib/affiliates";

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
    edge: p.edge ?? 0,
    bestOdds: p.bestOdds ?? p.odds ?? 0,
    impliedProbability: p.impliedProbability ?? 0,
    marketType: p.marketType,
    selectionKey: p.selectionKey,
    odds: p.odds,
    oddsLabel: p.oddsLabel,
    bookmaker: p.bookmaker,
    bookmakerUrl: getBookmakerAffiliateUrl(p.bookmaker || "", sport),
    ctaLabel: p.ctaLabel,
    isTopPick: p.isTopPick,
    disclaimer: "Odds may change before match start.",
  };
}