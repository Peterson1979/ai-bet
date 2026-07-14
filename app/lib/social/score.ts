import type { Candidate } from "./types";

export function calculateSocialScore(pick: Candidate) {
  const riskScore =
    pick.riskTier === "Low" ? 2 : pick.riskTier === "Medium" ? 0.5 : -1.5;

  const oddsScore = pick.bestOdds >= 1.7 && pick.bestOdds <= 2.8 ? 1 : 0;

  const eventBoost = /World Cup|Champions League|Europa League|Conference League/i.test(
    pick.league
  )
    ? 2
    : 0;

  const bookmakerPenalty = pick.bookmaker === "Unknown" ? -0.5 : 0;

  return (
    pick.valueDiff * 3 +
    pick.bookmakerCount * 0.15 +
    riskScore +
    oddsScore +
    eventBoost +
    bookmakerPenalty
  );
}