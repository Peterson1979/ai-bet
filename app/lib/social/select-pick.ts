import { DAY_PRIORITY, getPriorityKey } from "./priority";
import { calculateSocialScore } from "./score";
import type { Candidate, PredictionFile } from "./types";

export function selectPick(predictions: PredictionFile, now = new Date()) {
  const weekday = now
    .toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" })
    .toLowerCase();

  const priorityList = DAY_PRIORITY[weekday] || [];
  const nowMs = now.getTime();
  const plus48h = nowMs + 48 * 60 * 60 * 1000;

  const candidates: Candidate[] = predictions.sports.flatMap((block) =>
    (block.topPicks || [])
      .filter((pick) => block.hasMatches)
      .map((pick) => ({
        ...pick,
        sport: block.sport,
        priorityKey: getPriorityKey(block.sport, pick.league),
        socialScore: 0,
      }))
  );

  const filtered = candidates
    .filter((pick) => pick.status === "scheduled")
    .filter((pick) => {
      const t = new Date(pick.startTime).getTime();
      return t >= nowMs && t <= plus48h;
    })
    .filter((pick) => !!pick.prediction && !!pick.market && !!pick.bookmakerUrl)
    .filter((pick) => pick.bookmakerCount >= 3)
    .filter((pick) => pick.valueDiff > 0)
    .map((pick) => ({
      ...pick,
      socialScore: calculateSocialScore(pick),
    }));

  for (const key of priorityList) {
    const matches = filtered
      .filter((pick) => pick.priorityKey === key)
      .sort((a, b) => b.socialScore - a.socialScore);

    if (matches.length > 0) return matches[0];
  }

  return filtered.sort((a, b) => b.socialScore - a.socialScore)[0] || null;
}