import { OddsEvent } from "./odds";

export function buildPredictionPrompt(
  event: OddsEvent
) {
  return `
You are an AI sports betting analyst.

Analyze the following sports event and return a concise betting prediction.

SPORT:
${event.sport}

LEAGUE:
${event.league}

MATCH:
${event.homeTeam} vs ${event.awayTeam}

START TIME:
${event.commenceTime}

BOOKMAKER:
${event.bookmaker}

CURRENT HOME ODDS:
${event.odds}

Return ONLY valid JSON.

Allowed betCode values:
- HOME_WIN
- AWAY_WIN
- DRAW
- DOUBLE_CHANCE_1X
- DOUBLE_CHANCE_X2
- DRAW_NO_BET_HOME
- DRAW_NO_BET_AWAY
- OVER_1_5
- UNDER_4_5

Required JSON structure:

{
  "recommendedBet": "string",
  "betCode": "string",
  "explanation": "string",
  "confidence": number,
  "risk": number
}

Rules:
- explanation max 25 words
- confidence between 1 and 100
- risk between 1 and 100
- concise professional tone
- no markdown
- no extra text
`;
}