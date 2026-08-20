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
                  `  - ${candidate.id} | market ${candidate.market} | selection ${candidate.prediction} | ${candidate.bookmakerCount} bookmakers | consensus ${formatPercent(candidate.consensusImpliedProb)}`
              )
              .join("\n")
          : "  - NONE";

      return `EVENT ${index + 1}: ${event.homeTeam} vs ${event.awayTeam} | ${event.league}
CANDIDATES:
${candidateText}`;
    })
    .join("\n\n");

  return `Analyze these ${count} ${sport} events.

For EACH event, in the SAME ORDER:
- choose candidateId EXACTLY from that event's CANDIDATES list;
- never invent, alter, abbreviate, or copy a candidateId from another event;
- if the event has no eligible candidate, return candidateId exactly as NONE;
- write a concise 1-2 sentence reasoning, maximum 40 words;
- start the reasoning with matchup context;
- estimate fairProbability from 1 to 99 for the selected candidate, or use null if it cannot be justified responsibly.

Do not invent injuries, records, statistics, lineup news, home/away advantages, or unavailable facts.
Do not mention exact odds, numeric confidence scores, guaranteed profit, or promotional claims.
Market information may support the analysis but must not dominate it.

EVENTS:
${eventText}

Return exactly ${count} items in the structured response. Never skip an event.`;
}