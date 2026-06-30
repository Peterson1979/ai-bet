import { MatchCardData } from "../types/match";

export function rankMatches(matches: MatchCardData[]) {
  return [...matches].sort((a, b) => {
    const scoreA = computeScore(a);
    const scoreB = computeScore(b);
    return scoreB - scoreA;
  });
}

function riskTierScore(tier: string): number {
  if (tier === "Low") return 2;
  if (tier === "Medium") return 1;
  return 0;
}

function computeScore(m: MatchCardData) {
  const bookmakerCount = m.bookmakerCount ?? 0;
  const tierScore = riskTierScore(m.riskTier ?? "High");

  return tierScore * 100 + bookmakerCount;
}