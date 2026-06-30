// app/lib/prompts.ts
import { OddsEvent } from "./odds";

export function buildPredictionPrompt(events: OddsEvent[]): string {
  const sport = events[0]?.sport ?? "Unknown";
  const count = events.length;

  return `You are a neutral sports journalist writing short, factual match previews.
Analyze the following ${count} ${sport} events and return exactly ${count} previews.

EVENTS:
${events
  .map(
    (e, i) => `
EVENT ${i + 1}:
MATCH: ${e.homeTeam} vs ${e.awayTeam}
LEAGUE: ${e.league}
START: ${e.commenceTime}
BEST AVAILABLE ODDS (home side): ${e.bestOdds ?? "N/A"}
MARKET DEPTH: ${e.bookmakerCount ?? 0} bookmakers offering odds on this match`
  )
  .join("\n---")}

Return ONLY a valid JSON array with EXACTLY ${count} objects (one per event, same order):
[
  {
    "preview": "<exactly one neutral sentence, max 30 words: context about the match, league, or matchup. Do NOT predict a winner, do NOT recommend a bet, do NOT mention odds as a justification for a pick. Pure context only.>"
  }
]

STRICT RULES:
- Return EXACTLY ${count} objects
- No markdown, no code fences, no extra text
- The preview must be neutral and informational, NOT a betting recommendation
- Do NOT use words like "value bet", "edge", "should bet", "best pick"
- Do NOT invent statistics, scores, or facts not present in the input
- If you have no meaningful context, write a simple factual sentence about the fixture (e.g. league stage, competition importance)`;
}