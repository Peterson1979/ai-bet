// app/lib/prompts.ts
import { OddsEvent } from "./odds";

const SPORT_RULES: Record<string, string> = {
  Football: `Sport-specific markets (use ONLY these):
- Double Chance
- Draw No Bet
- Over 1.5 Goals
- Home Win
- Away Win
- Under 4.5 Goals`,

  Tennis: `Sport-specific markets (use ONLY these):
- Match Winner
- Over 18.5 Games
- Under 30.5 Games
- Player to Win a Set
- Handicap Games (+3.5)`,

  NBA: `Sport-specific markets (use ONLY these):
- Moneyline
- Over 149.5 Points
- Under 179.5 Points
- Team Total Over
- Team Total Under`,

  Hockey: `Sport-specific markets (use ONLY these):
- Moneyline
- Over 4.5 Goals
- Under 7.5 Goals
- Double Chance
- Team Total Over 1.5`,

  NFL: `Sport-specific markets (use ONLY these):
- Moneyline
- Over 33.5 Points
- Under 54.5 Points
- Team Total Over
- Team Total Under`,

  MLB: `Sport-specific markets (use ONLY these):
- Moneyline
- Over 7.5 Runs
- Under 9.5 Runs
- Run Line (-1.5)
- Team Total Over`,

  MMA: `Sport-specific markets (use ONLY these):
- Moneyline (Fight Winner)
- Method of Victory (KO/TKO or Decision)
- Over 2.5 Rounds
- Under 2.5 Rounds`,
};

export function buildPredictionPrompt(events: OddsEvent[]): string {
  const sport = events[0]?.sport ?? "Unknown";
  const count = events.length;
  const sportRules = SPORT_RULES[sport] ?? `- Moneyline\n- Over/Under`;

  return `You are a professional sports betting analyst.
Analyze the following ${count} ${sport} events and return exactly ${count} predictions.

${sportRules}

EVENTS:
${events
  .map(
    (e, i) => `
EVENT ${i + 1}:
MATCH: ${e.homeTeam} vs ${e.awayTeam}
LEAGUE: ${e.league}
START: ${e.commenceTime}
BOOKMAKER: ${e.bookmaker}
DECIMAL ODDS: ${e.odds}
IMPLIED PROBABILITY: ${e.impliedProbability ?? "N/A"}%
EDGE: ${e.edge ?? "N/A"}%`
  )
  .join("\n---")}

Return ONLY a valid JSON array with EXACTLY ${count} objects (one per event, same order):
[
  {
    "recommendedBet": "<market type from the list above>",
    "betCode": "<short code e.g. HOME_WIN, OVER_1_5, MONEYLINE_HOME>",
    "explanation": "<max 20 words why this is a good bet>",
    "confidence": <integer 1-100>,
    "risk": <integer 1-100, lower = safer>
  }
]

STRICT RULES:
- Return EXACTLY ${count} objects
- No markdown, no code fences, no extra text
- confidence and risk must be plain integers
- Choose the SAFEST, most conservative picks
- Do NOT invent statistics not present in the input`;
}
