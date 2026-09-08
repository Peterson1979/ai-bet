import { buildMarketCandidates, OddsEvent } from "./odds";

function formatPercent(value: unknown): string {
  return typeof value === "number" && Number.isFinite(value)
    ? `${value.toFixed(1)}%`
    : "N/A";
}

export function buildPredictionPrompt(events: OddsEvent[]): string {
  const sport = events[0]?.sport?.trim() || "Unknown";
  const count = events.length;

  const eventText = events
    .map((event, index) => {
      const candidates = buildMarketCandidates(event);
      const candidateText =
        candidates.length > 0
          ? candidates
              .map(
                (candidate) =>
                  `  - ${candidate.id} | market: ${candidate.market} | selection: ${candidate.prediction} | depth: ${candidate.bookmakerCount} books | consensus: ${formatPercent(candidate.consensusImpliedProb)}`
              )
              .join("\n")
          : "  - NONE";

      return `EVENT ${index + 1}: ${event.homeTeam} vs ${event.awayTeam} | ${event.league}
CANDIDATES:
${candidateText}`;
    })
    .join("\n\n");

  return `Analyze these ${count} ${sport} events using the provided market candidate data.

For EACH event, in the SAME ORDER:
- choose candidateId EXACTLY from that event's CANDIDATES list;
- never invent, alter, abbreviate, or copy a candidateId from another event;
- if the event has no eligible candidate, return candidateId exactly as NONE;
- write a concise 1-2 sentence analytical reasoning (maximum 35 words);
- ground the reasoning strictly in the market selection, matchup structure, and consensus probability;
- estimate fairProbability from 1 to 99 for the selected candidate, or use null if it cannot be justified responsibly.

Strict data integrity rules:
- Do NOT invent or assume unprovided facts such as player injuries, squad strength, recent form, pitching rotations, weather, or news.
- Do NOT use generic clichés like "strong squad", "recent form", "clear favorite", or "attacking style".
- Do NOT mention exact numeric odds or promise winning results.
- Focus strictly on the statistical balance indicated by the market candidate and consensus level.

EVENTS:
${eventText}

Return exactly ${count} items in the structured response. Never skip an event.`;
}