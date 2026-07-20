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

function sanitizeSport(value?: string | null): string {
  return value?.trim() || "Unknown";
}

function safeNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function formatPercent(value: number | null | undefined): string {
  return typeof value === "number" && Number.isFinite(value)
    ? `${value.toFixed(1)}%`
    : "N/A";
}

function formatOdds(value: number | null | undefined): string {
  return typeof value === "number" && Number.isFinite(value)
    ? value.toFixed(2)
    : "N/A";
}

export function buildPredictionPrompt(events: OddsEvent[]): string {
  const sport = sanitizeSport(events[0]?.sport);
  const count = events.length;
  const sportRules =
    SPORT_RULES[sport] ??
    `Allowed market types (use ONLY these):
- Moneyline
- Over/Under`;

  return `You are a professional sports analyst with deep knowledge of ${sport} teams, competitions, playing styles and historical context.

Analyze the following ${count} ${sport} events and return exactly ${count} picks, one per event, in the same order as the input events.

${sportRules}

PRIMARY GOAL:
Return user-facing predictions that are useful for a betting insights platform.
The output must balance matchup context with practical market usefulness.

IMPORTANT ANALYSIS RULES:
- Match context should remain the core of the reasoning.
- Market context can support the pick, but should not dominate the explanation.
- Be specific, but avoid unverifiable injuries, fabricated records, or invented statistics.
- Be conservative with fairProbability and estimatedValuePct.
- Do not assume every event has positive value.
- If the edge is unclear, use null for fairProbability, estimatedValuePct, or valueDiff.
- If uncertain, still return one valid object for that event.

EVENTS:
${events
  .map((event, index) => {
    const riskTier = calculateRiskTier(event.bestOdds ?? 0, event.bookmakerCount ?? 0);
    const impliedProb = formatPercent(safeNumber(event.impliedProbability));
    const consensusProb = formatPercent(safeNumber(event.consensusImpliedProb));

    return `EVENT ${index + 1}:
MATCH: ${event.homeTeam} vs ${event.awayTeam}
LEAGUE/COMPETITION: ${event.league}
SPORT: ${event.sport}
KICK-OFF: ${event.commenceTime}
BEST AVAILABLE ODDS: ${formatOdds(safeNumber(event.bestOdds))}
BOOKMAKER: ${event.bookmaker ?? "N/A"}
BOOKMAKERS OFFERING ODDS: ${event.bookmakerCount ?? 0}
IMPLIED PROBABILITY: ${impliedProb}
MARKET CONSENSUS IMPLIED PROBABILITY: ${consensusProb}
BASE RISK TIER: ${riskTier}`;
  })
  .join("\n---\n")}

Return ONLY a valid JSON array with EXACTLY ${count} objects, in the same order as the events above.

Each object must match this exact structure:
[
  {
    "market": "<one market type from the allowed list above>",
    "prediction": "<specific pick, e.g. Home Win, Over 1.5 Goals, Match Winner>",
    "reasoning": "<2-4 sentences, max 80 words. Start with match context first. Then briefly connect the selection to a cautious betting rationale.>",
    "riskTier": "<Low or Medium or High>",
    "fairProbability": <number or null>,
    "estimatedValuePct": <number or null>,
    "valueDiff": <number or null>,
    "whySignal": [
      "<short user-facing reason 1>",
      "<short user-facing reason 2>",
      "<short user-facing reason 3>"
    ]
  }
]

FIELD RULES:
- market:
  - must be one of the allowed market types for this sport.
- prediction:
  - must be short and concrete.
- reasoning:
  - must start with matchup context, not odds.
  - must not mention exact odds numbers.
  - must not mention numeric confidence scores.
  - must not sound promotional.
- riskTier:
  - must be exactly one of: Low, Medium, High.
  - use the provided BASE RISK TIER as guidance, but you may raise the risk if the setup looks less reliable.
- fairProbability:
  - estimated true probability for the selected prediction, in percent.
  - use a number between 1 and 99 when you can justify it.
  - use null if you cannot estimate it responsibly.
- estimatedValuePct:
  - estimated value of the offered price versus your fair view, in percent.
  - positive means some value, near zero means fair, negative means overpriced.
  - use null if not confident.
- valueDiff:
  - difference in percentage points between your fairProbability and the market-implied probability.
  - positive means you rate the pick better than market.
  - negative means weaker than market.
  - use null if fairProbability is null.
- whySignal:
  - must contain EXACTLY 3 strings.
  - each string must be short, concrete, and card-friendly.
  - focus on matchup edge, market support, price quality, risk, lineup context, scheduling, or volatility.
  - do not repeat the same idea three times.
  - do not mention exact odds numbers.

STRICT RULES:
- Return EXACTLY ${count} objects.
- Preserve the exact input order.
- Return ONLY raw JSON.
- No markdown.
- No code fences.
- No commentary before or after the JSON.
- Do not omit fields.
- If a field is uncertain, use null instead of removing it.
- Use ONLY market types from the allowed list for this sport.
- Reasoning must START with match context, not with betting value.
- Do NOT state exact odds values in reasoning or whySignal.
- Do NOT fabricate injuries or unavailable facts.
- Never skip an event.

Example object:
{
  "market": "Home Win",
  "prediction": "Home Win",
  "reasoning": "The home side looks better positioned in this matchup because their style and game context are more stable for this spot. The opponent has more volatility around this setup, which makes the home selection more reasonable. The market angle is playable, but not strong enough for an aggressive label.",
  "riskTier": "Medium",
  "fairProbability": 54.2,
  "estimatedValuePct": 2.1,
  "valueDiff": 1.7,
  "whySignal": [
    "Matchup context slightly favors the selected side.",
    "Market support is decent without being unanimous.",
    "Risk remains manageable but not low."
  ]
}`;
}