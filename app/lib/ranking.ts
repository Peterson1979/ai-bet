import { MatchCardData } from "../types/match";

export function rankMatches(matches: MatchCardData[]) {
  return [...matches].sort((a, b) => {
    const scoreA = computeScore(a);
    const scoreB = computeScore(b);
    return scoreB - scoreA;
  });
}

function computeScore(m: MatchCardData) {
  const edge = m.edge ?? 0;
  const confidence = m.confidence ?? 0;
  const risk = m.risk ?? 100;

  // core betting logic
  const edgeWeight = edge * 1.6;
  const confidenceWeight = confidence * 1.2;
  const riskPenalty = risk * 1.4;

  return edgeWeight + confidenceWeight - riskPenalty;
}