// app/lib/ranking.ts
import { MatchCardData } from "../types/match";

export function rankMatches(matches: MatchCardData[]) {
  return [...matches].sort((a, b) => computeScore(b) - computeScore(a));
}

function safe(value?: number | null): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function riskTierScore(tier: string): number {
  if (tier === "Low") return 16;
  if (tier === "Medium") return 7;
  return -6;
}

function computeBookmakerDepthScore(bookmakerCount: number): number {
  if (bookmakerCount >= 25) return 14;
  if (bookmakerCount >= 18) return 11;
  if (bookmakerCount >= 12) return 8;
  if (bookmakerCount >= 8) return 5;
  if (bookmakerCount >= 4) return 2;
  return -4;
}

function computePartnerScore(partnerRating: number): number {
  return clamp(partnerRating, 0, 10) * 1.1;
}

function computeConsensusConfidence(consensusImpliedProb: number): number {
  if (consensusImpliedProb >= 62) return 7;
  if (consensusImpliedProb >= 55) return 5;
  if (consensusImpliedProb >= 50) return 3;
  if (consensusImpliedProb >= 45) return 1;
  return 0;
}

function computeFairProbabilityScore(fairProbability: number): number {
  if (fairProbability >= 62) return 7;
  if (fairProbability >= 55) return 5;
  if (fairProbability >= 50) return 3;
  if (fairProbability >= 45) return 1;
  return 0;
}

function computeValueScore(estimatedValuePct: number): number {
  if (estimatedValuePct <= -2) return -18;
  if (estimatedValuePct < 0) return -8;
  if (estimatedValuePct < 1) return 4;
  if (estimatedValuePct < 2) return 12;
  if (estimatedValuePct < 3) return 20;
  if (estimatedValuePct < 5) return 28;
  if (estimatedValuePct < 7) return 34;
  return 38;
}

function computeSpreadScore(bookmakerSpreadPct: number): number {
  if (bookmakerSpreadPct <= -3) return -10;
  if (bookmakerSpreadPct < -1) return -4;
  if (bookmakerSpreadPct < 1) return 2;
  if (bookmakerSpreadPct < 3) return 6;
  if (bookmakerSpreadPct < 5) return 10;
  return 12;
}

function computeAlignmentScore(
  fairProbability: number,
  consensusImpliedProb: number,
  estimatedValuePct: number
): number {
  const gap = Math.abs(fairProbability - consensusImpliedProb);

  if (estimatedValuePct >= 2 && gap <= 2) return 8;
  if (estimatedValuePct >= 1 && gap <= 4) return 5;
  if (gap <= 6) return 2;
  if (gap <= 10) return -2;
  return -7;
}

function computeVolatilityPenalty(params: {
  estimatedValuePct: number;
  bookmakerSpreadPct: number;
  bookmakerCount: number;
  riskTier: string;
}) {
  const { estimatedValuePct, bookmakerSpreadPct, bookmakerCount, riskTier } = params;

  let penalty = 0;

  if (estimatedValuePct >= 4 && bookmakerCount < 8) {
    penalty -= 10;
  }

  if (estimatedValuePct >= 3 && bookmakerSpreadPct >= 6) {
    penalty -= 7;
  }

  if (riskTier === "High") {
    penalty -= 6;
  }

  if (bookmakerCount < 4) {
    penalty -= 6;
  }

  return penalty;
}

function computeScore(match: MatchCardData): number {
  const estimatedValuePct = safe(match.estimatedValuePct);
  const bookmakerSpreadPct = safe(match.bookmakerSpreadPct);
  const bookmakerCount = safe(match.bookmakerCount);
  const partnerRating =
    typeof match.partnerOffer?.rating === "number"
      ? match.partnerOffer.rating
      : safe(match.partnerRating);
  const consensusImpliedProb = safe(match.consensusImpliedProb);
  const fairProbability = safe(match.fairProbability);
  const riskTier = match.riskTier ?? "High";

  const valueScore = computeValueScore(estimatedValuePct);
  const spreadScore = computeSpreadScore(bookmakerSpreadPct);
  const bookmakerDepthScore = computeBookmakerDepthScore(bookmakerCount);
  const partnerScore = computePartnerScore(partnerRating);
  const consensusScore = computeConsensusConfidence(consensusImpliedProb);
  const fairProbabilityScore = computeFairProbabilityScore(fairProbability);
  const alignmentScore = computeAlignmentScore(
    fairProbability,
    consensusImpliedProb,
    estimatedValuePct
  );
  const riskScore = riskTierScore(riskTier);
  const volatilityPenalty = computeVolatilityPenalty({
    estimatedValuePct,
    bookmakerSpreadPct,
    bookmakerCount,
    riskTier,
  });

  return (
    valueScore +
    spreadScore +
    bookmakerDepthScore +
    partnerScore +
    consensusScore +
    fairProbabilityScore +
    alignmentScore +
    riskScore +
    volatilityPenalty
  );
}