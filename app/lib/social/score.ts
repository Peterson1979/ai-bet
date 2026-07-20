import type { Candidate } from "./types";

function getPrimaryValue(pick: Candidate): number {
  if (typeof pick.estimatedValuePct === "number" && Number.isFinite(pick.estimatedValuePct)) {
    return pick.estimatedValuePct;
  }

  if (typeof pick.valueDiff === "number" && Number.isFinite(pick.valueDiff)) {
    return pick.valueDiff;
  }

  return 0;
}

function getPrimaryOdds(pick: Candidate): number | null {
  if (typeof pick.partnerOffer?.odds === "number" && Number.isFinite(pick.partnerOffer.odds)) {
    return pick.partnerOffer.odds;
  }

  if (typeof pick.partnerOdds === "number" && Number.isFinite(pick.partnerOdds)) {
    return pick.partnerOdds;
  }

  if (typeof pick.bestOdds === "number" && Number.isFinite(pick.bestOdds)) {
    return pick.bestOdds;
  }

  return null;
}

function getRiskScore(riskTier: Candidate["riskTier"]): number {
  switch (riskTier) {
    case "Low":
      return 2.5;
    case "Medium":
      return 0.75;
    case "High":
      return -1.5;
    default:
      return 0;
  }
}

function getOddsScore(odds: number | null): number {
  if (typeof odds !== "number") return 0;

  if (odds >= 1.7 && odds <= 2.6) return 1.2;
  if (odds >= 1.5 && odds < 1.7) return 0.7;
  if (odds > 2.6 && odds <= 3.2) return 0.35;

  return 0;
}

function getBookmakerDepthScore(bookmakerCount: number): number {
  if (bookmakerCount >= 12) return 1.6;
  if (bookmakerCount >= 8) return 1.0;
  if (bookmakerCount >= 5) return 0.5;
  return 0;
}

function getEventBoost(league: string): number {
  return /World Cup|Champions League|Europa League|Conference League|Grand Slam|NBA|NFL/i.test(
    league
  )
    ? 1.5
    : 0;
}

function getBookmakerPenalty(bookmaker: string): number {
  return bookmaker === "Unknown" ? -0.4 : 0;
}

function getMarketContextScore(pick: Candidate): number {
  let score = 0;

  if (
    typeof pick.partnerOdds === "number" &&
    typeof pick.marketAverageOdds === "number" &&
    pick.partnerOdds > pick.marketAverageOdds
  ) {
    score += 0.5;
  }

  if (
    typeof pick.bookmakerSpreadPct === "number" &&
    Number.isFinite(pick.bookmakerSpreadPct) &&
    pick.bookmakerSpreadPct > 0
  ) {
    score += Math.min(pick.bookmakerSpreadPct * 0.08, 0.8);
  }

  if (
    typeof pick.consensusImpliedProb === "number" &&
    typeof pick.fairProbability === "number" &&
    Number.isFinite(pick.consensusImpliedProb) &&
    Number.isFinite(pick.fairProbability)
  ) {
    const gap = pick.fairProbability - pick.consensusImpliedProb;
    score += Math.max(Math.min(gap * 0.05, 0.6), -0.3);
  }

  return score;
}

export function calculateSocialScore(pick: Candidate) {
  const primaryValue = getPrimaryValue(pick);
  const primaryOdds = getPrimaryOdds(pick);

  return (
    primaryValue * 3 +
    getBookmakerDepthScore(pick.bookmakerCount) +
    getRiskScore(pick.riskTier) +
    getOddsScore(primaryOdds) +
    getEventBoost(pick.league) +
    getBookmakerPenalty(pick.bookmaker) +
    getMarketContextScore(pick)
  );
}