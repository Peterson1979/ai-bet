import { OddsEvent } from "./odds";

export function buildPredictionPrompt(events: OddsEvent[]) {
  return `
You are an AI sports betting analyst.

Analyze the following events and return predictions for each one.

EVENTS:
${events
  .map(
    (event, index) => `
${index + 1}.
SPORT: ${event.sport}
LEAGUE: ${event.league}
MATCH: ${event.homeTeam} vs ${event.awayTeam}
START: ${event.commenceTime}
BOOKMAKER: ${event.bookmaker}
ODDS: ${event.odds}
`
  )
  .join("\n")}

Return ONLY valid JSON array:

[
  {
    "recommendedBet": "string",
    "betCode": "string",
    "explanation": "string",
    "confidence": number,
    "risk": number
  }
]

Rules:
- explanation max 25 words
- confidence 1-100
- risk 1-100
- no markdown
- no extra text
`;
}