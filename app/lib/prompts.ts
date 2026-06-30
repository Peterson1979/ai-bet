// app/lib/prompts.ts
import { OddsEvent } from "./odds";
import { calculateRiskTier } from "./sportsConfig";

const SPORT_RULES: Record<string, string> = {
  Football: `Allowed market types (use ONLY these):
- Double Chance
- Draw No Bet
- Over 1.5 Goals
- Home Win
- Away Win
- Under 4.5 Goals`,
  Tennis: `Allowed market types (use ONLY these):
- Match Winner
- Over 18.5 Games
- Under 30.5 Games
- Player to Win a Set
- Handicap Games (+3.5)`,
  NBA: `Allowed market types (use ONLY these):
- Moneyline
- Over 149.5 Points
- Under 179.5 Points
- Team Total Over
- Team Total Under`,
  Hockey: `Allowed market types (use ONLY these):
- Moneyline
- Over 4.5 Goals
- Under 7.5 Goals
- Double Chance
- Team Total Over 1.5`,
  NFL: `Allowed market types (use ONLY these):
- Moneyline
- Over 33.5 Points
- Under 54.5 Points
- Team Total Over
- Team Total Under`,
  MLB: `Allowed market types (use ONLY these):
- Moneyline
- Over 7.5 Runs
- Under 9.5 Runs
- Run Line (-1.5)
- Team Total Over`,
  MMA: `Allowed market types (use ONLY these):
- Moneyline (Fight Winner)
- Method of Victory (KO/TKO or Decision)
- Over 2.5 Rounds
- Under 2.5 Rounds`,
};

export function buildPredictionPrompt(events: OddsEvent[]): string {
  const sport = events[0]?.sport ?? "Unknown";
  const count = events.length;
  const sportRules = SPORT_RULES[sport] ?? `- Moneyline\n- Over/Under`;

  return `You are a sports betting analyst writing concise, professional match notes.
Analyze the following ${count} ${sport} events and return exactly ${count} picks (one per event, same order).

${sportRules}

For each event, you are given a pre-calculated RISK TIER based on real market data (odds value and number of bookmakers offering it). This tier is NOT something you calculate — treat it as a given fact and write your reasoning consistent with it.

EVENTS:
${events
  .map((e, i) => {
    const riskTier = calculateRiskTier(e.bestOdds ?? 0, e.bookmakerCount ?? 0);
    return `
EVENT ${i + 1}:
MATCH: ${e.homeTeam} vs ${e.awayTeam}
LEAGUE: ${e.league}
START: ${e.commenceTime}
BEST ODDS (home side): ${e.bestOdds ?? "N/A"}
MARKET DEPTH: ${e.bookmakerCount ?? 0} bookmakers offering odds
PRE-CALCULATED RISK TIER: ${riskTier}`;
  })
  .join("\n---")}

Return ONLY a valid JSON array with EXACTLY ${count} objects (one per event, same order):
[
  {
    "market": "<one market type from the allowed list above>",
    "prediction": "<specific pick, e.g. 'Home Win', 'Over 1.5 Goals'>",
    "reasoning": "<exactly 1-2 sentences, max 35 words: explain the pick referencing the odds value, market depth, or risk tier. Do NOT invent statistics, form, or injury data not present in the input.>"
  }
]

STRICT RULES:
- Return EXACTLY ${count} objects
- No markdown, no code fences, no extra text
- Use ONLY the market types listed above for this sport
- The reasoning must reference the given odds, market depth, or risk tier — do NOT invent any other data
- Prefer conservative, lower-risk reasoning where the risk tier is Low or Medium
- Do NOT state a numeric confidence or edge value`;
}