import { MatchCardData } from "../types/match";

export function rankMatches(matches: MatchCardData[]) {
  return [...matches].sort((a, b) => {
    const scoreA = computeScore(a);
    const scoreB = computeScore(b);
    return scoreB - scoreA;
  });
}

function computeScore(m: MatchCardData) {
  const bookmakerCount = m.bookmakerCount ?? 0;
  const odds = m.bestOdds ?? 0;

  // More bookmakers offering odds = more relevant / liquid market.
  // Higher odds among comparable markets get a slight boost as a tiebreaker.
  return bookmakerCount * 10 + odds;
}