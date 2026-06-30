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

    market: p.market,
    prediction: p.prediction,
    reasoning: p.reasoning,
    riskTier: p.riskTier,

    bestOdds: p.bestOdds ?? 0,
    impliedProbability: p.impliedProbability ?? 0,
    bookmakerCount: p.bookmakerCount ?? 0,

    bookmaker: p.bookmaker,
    bookmakerUrl: getBookmakerAffiliateUrl(p.bookmaker || "", sport),
    ctaLabel: p.ctaLabel,
    disclaimer: "Odds may change before match start.",
  };
}