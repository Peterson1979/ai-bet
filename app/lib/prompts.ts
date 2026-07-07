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

  return `You are a professional sports analyst with deep knowledge of ${sport} teams, competitions, playing styles and historical context.

Analyze the following ${count} ${sport} events and return exactly ${count} picks (one per event, same order).

${sportRules}

IMPORTANT: Your reasoning MUST primarily focus on the match context — who these teams are, what this competition means, what makes this matchup interesting or predictable. The market data (odds, risk tier) is secondary context that supports your pick, not the main subject.

EVENTS:
${events
  .map((e, i) => {
    const riskTier = calculateRiskTier(e.bestOdds ?? 0, e.bookmakerCount ?? 0);
    const impliedProb = e.impliedProbability
      ? `${e.impliedProbability.toFixed(1)}%`
      : "N/A";
    return `
EVENT ${i + 1}:
MATCH: ${e.homeTeam} vs ${e.awayTeam}
LEAGUE/COMPETITION: ${e.league}
KICK-OFF: ${e.commenceTime}
HOME WIN ODDS: ${e.bestOdds ?? "N/A"} (implied: ${impliedProb})
BOOKMAKERS OFFERING ODDS: ${e.bookmakerCount ?? 0}
RISK TIER: ${riskTier}`;
  })
  .join("\n---")}

Return ONLY a valid JSON array with EXACTLY ${count} objects (one per event, same order):
[
  {
    "market": "<one market type from the allowed list above>",
    "prediction": "<specific pick, e.g. 'Home Win', 'Over 1.5 Goals'>",
    "reasoning": "<3-4 sentences, max 70 words. LEAD with match context: who are these teams, what is the competition stage, what makes this matchup notable. Then briefly mention one market data point (odds or risk tier) to justify the pick. Do NOT only talk about odds. Do NOT cite specific unverifiable stats like exact win streaks.>"
  }
]

STRICT RULES:
- Return EXACTLY ${count} objects
- No markdown, no code fences, no extra text
- Use ONLY the market types listed above for this sport
- The reasoning must START with team/match context, not with odds
- Do NOT state a numeric confidence or edge value`;
}