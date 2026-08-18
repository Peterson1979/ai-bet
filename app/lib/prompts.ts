import { OddsEvent } from "./odds";

const SPORT_RULES: Record<string, string> = {
  Football: "Double Chance, Draw No Bet, Over 1.5 Goals, Home Win, Away Win, Under 4.5 Goals",
  Tennis: "Match Winner, Over 18.5 Games, Under 30.5 Games, Player to Win a Set, Handicap Games (+3.5)",
  NBA: "Moneyline, Over 149.5 Points, Under 179.5 Points, Team Total Over, Team Total Under",
  Hockey: "Moneyline, Over 4.5 Goals, Under 7.5 Goals, Double Chance, Team Total Over 1.5",
  NFL: "Moneyline, Over 33.5 Points, Under 54.5 Points, Team Total Over, Team Total Under",
  MLB: "Moneyline, Over 7.5 Runs, Under 9.5 Runs, Run Line (-1.5), Team Total Over",
  MMA: "Moneyline (Fight Winner), Method of Victory (KO/TKO or Decision), Over 2.5 Rounds, Under 2.5 Rounds",
};

function formatPercent(value: unknown): string {
  return typeof value === "number" && Number.isFinite(value)
    ? `${value.toFixed(1)}%`
    : "N/A";
}

export function buildPredictionPrompt(events: OddsEvent[]): string {
  const sport = events[0]?.sport?.trim() || "Unknown";
  const count = events.length;
  const allowedMarkets = SPORT_RULES[sport] ?? "Moneyline, Over/Under";

  const eventText = events
    .map(
      (event, index) =>
        `EVENT ${index + 1}: ${event.homeTeam} vs ${event.awayTeam} | ${event.league} | market implied ${formatPercent(event.impliedProbability)} | consensus ${formatPercent(event.consensusImpliedProb)} | ${event.bookmakerCount ?? 0} bookmakers`
    )
    .join("\n");

  return `Analyze these ${count} ${sport} events.

Allowed markets: ${allowedMarkets}

For EACH event, in the SAME ORDER:
- choose exactly one allowed market and a specific prediction;
- write a concise 1-2 sentence reasoning, maximum 40 words;
- start the reasoning with matchup context;
- estimate fairProbability from 1 to 99, or use null if it cannot be justified responsibly.

Do not invent injuries, records, statistics, lineup news, or unavailable facts.
Do not mention exact odds, numeric confidence scores, guaranteed profit, or promotional claims.
Market information may support the analysis but must not dominate it.

EVENTS:
${eventText}

Return exactly ${count} items in the structured response. Never skip an event.`;
}
