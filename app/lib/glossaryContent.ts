import type { Lang } from "@/app/lib/i18n";

export type GlossaryItem = {
  term: string;
  category: "market" | "concept";
  definition: string;
  formula?: string;
  example?: string;
};

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  // --- FOUNDATIONAL BETTING SCIENCE & CONCEPTS ---
  {
    term: "Expected Value (+EV)",
    category: "concept",
    definition:
      "A mathematical calculation of the anticipated average profit or loss per bet if the exact same wager were placed thousands of times at the same odds. A Positive Expected Value (+EV) bet occurs when the probability of winning multiplied by the payout exceeds the probability of losing multiplied by the stake.",
    formula: "EV = (P_win × (Decimal Odds - 1)) - (P_lose × 1)",
    example:
      "If a coin toss pays 2.10 on Heads (fair probability = 50%), EV = (0.50 × 1.10) - (0.50 × 1) = +0.05 (+5% edge). Over time, placing +EV bets yields positive mathematical expectation.",
  },
  {
    term: "Implied Probability & Break-Even Rate",
    category: "concept",
    definition:
      "The conversion of betting odds into a percentage chance of an outcome occurring. It represents the exact win rate required for a bettor to break even in the long run at those odds before factoring in fees or margins.",
    formula: "Implied Probability (%) = (1 / Decimal Odds) × 100",
    example: "Decimal odds of 2.00 represent a 50.0% break-even rate; odds of 1.50 represent 66.7%; odds of 3.00 represent 33.3%.",
  },
  {
    term: "Bookmaker Margin / Overround / Vig",
    category: "concept",
    definition:
      "The theoretical fee or 'juice' built into betting odds by sportsbooks to guarantee their profit margin regardless of the match outcome. Because bookmakers add margin, the sum of implied probabilities across all outcomes in a market always exceeds 100%.",
    formula: "Overround (%) = (Σ (1 / Decimal Odds_i) - 1) × 100",
    example:
      "In a two-way tennis match with odds of 1.90 on both players: (1/1.90) + (1/1.90) = 52.63% + 52.63% = 105.26%. The bookmaker's overround is 5.26%.",
  },
  {
    term: "Vig Removal & True Fair Probability",
    category: "concept",
    definition:
      "The mathematical process of removing the bookmaker's overround from observed market prices to reveal the true un-vigged market consensus probability. MatchSignal applies proportional normalization across multi-bookmaker datasets to estimate true fair odds.",
    formula: "P_fair_i = (1 / Odds_i) / Σ (1 / Odds_k)",
    example:
      "If two sides show 1.90 and 1.90 (sum = 1.0526), each true fair probability is 0.5263 / 1.0526 = 50.0% (Fair Odds = 2.00).",
  },
  {
    term: "Closing Line Value (CLV)",
    category: "concept",
    definition:
      "The comparison between the odds you placed on a bet and the final odds available right before the event starts (the 'closing line'). Because the closing line incorporates all market liquidity and public/sharp information, consistently beating the closing line is widely considered the strongest statistical proof of long-term betting skill.",
    example:
      "If you bet Arsenal at 2.10 in the morning and the odds close at 1.85 at kickoff, you achieved positive Closing Line Value (+13.5% price advantage).",
  },
  {
    term: "Market Efficiency",
    category: "concept",
    definition:
      "The economic hypothesis that in high-liquidity betting markets (like the Premier League or NFL), prices quickly reflect all publicly available information (injuries, tactics, market sentiment). Overcoming efficient markets requires identifying specific bookmaker pricing lag or structural overreactions.",
  },
  {
    term: "Kelly Criterion",
    category: "concept",
    definition:
      "A mathematical formula for determining optimal bet sizing as a fraction of total bankroll based on estimated edge and odds. In practice, disciplined analysts use 'Fractional Kelly' (such as 0.25x or 0.50x Kelly) to protect against model uncertainty and deep drawdowns.",
    formula: "f* = (b × p - q) / b, where b = Odds - 1, p = Fair Probability, q = 1 - p",
    example:
      "With a 55% win probability at 2.00 odds, full Kelly suggests staking 10% of bankroll; a conservative 0.25x Kelly stakes 2.5% of bankroll.",
  },
  {
    term: "Variance & Bankroll Drawdowns",
    category: "concept",
    definition:
      "The natural statistical fluctuation in short-term results caused by randomness. Even a highly profitable betting model with a verified 5% long-term edge can experience consecutive losing streaks of 10 to 15 bets due to normal variance.",
  },
  {
    term: "MatchSignal Value Edge",
    category: "concept",
    definition:
      "The percentage advantage of an offered sportsbook price relative to MatchSignal's calculated un-vigged fair price. A Value Edge exists only when the offered decimal odds are higher than the fair odds.",
    formula: "Value Edge (%) = ((Offered Odds / Fair Odds) - 1) × 100",
    example: "If MatchSignal calculates fair odds of 2.00 (50% true chance) and a sportsbook offers 2.15, the Value Edge is ((2.15 / 2.00) - 1) × 100 = +7.5%.",
  },

  // --- BETTING MARKETS ---
  {
    term: "1X2 (Full-Time Result / 3-Way Moneyline)",
    category: "market",
    definition:
      "The primary football/soccer market predicting Home Win (1), Draw (X), or Away Win (2) at the end of 90 minutes regulation time plus stoppage time.",
    example: "Arsenal (1.80), Draw (3.60), Chelsea (4.50). Only 90 minutes count; extra time is excluded.",
  },
  {
    term: "Draw No Bet (DNB)",
    category: "market",
    definition:
      "Eliminates the draw outcome. If your chosen team wins, the bet pays out in full; if the match finishes in a draw, the stake is refunded (push).",
    example: "Arsenal DNB (1.35). A 2-1 win pays full profit; a 1-1 draw refunds your stake.",
  },
  {
    term: "Double Chance",
    category: "market",
    definition:
      "Combines two possible outcomes into one bet: 1X (Home or Draw), X2 (Away or Draw), or 12 (Home or Away). Provides higher probability of winning at lower odds.",
    example: "1X on Everton (1.70) wins if Everton wins or ties the match.",
  },
  {
    term: "Moneyline (Head-to-Head / 2-Way)",
    category: "market",
    definition:
      "A straight bet on which team, player, or fighter will win the event outright, including overtime/shootouts in basketball, hockey, baseball, and combat sports.",
    example: "Boston Celtics (1.75) vs. Dallas Mavericks (2.15). The bet wins if your selected team wins the game.",
  },
  {
    term: "Point Spread (Handicap / Asian Handicap)",
    category: "market",
    definition:
      "A virtual handicap applied to teams to equalize odds. The favorite must win by more than the spread line; the underdog can lose by less than the spread line or win outright.",
    example: "Kansas City Chiefs -3.5 (1.91). Kansas City must win by 4 or more points for the bet to cash.",
  },
  {
    term: "Over / Under Totals (Goals, Points, Runs, Rounds)",
    category: "market",
    definition:
      "A two-way market wagering on whether the combined score of both teams/fighters will be over or under a specified line set by the sportsbook.",
    example: "Over 2.5 Goals in soccer (1.95) wins if 3 or more total goals are scored.",
  },
  {
    term: "Run Line (Baseball Handicap -1.5 / +1.5)",
    category: "market",
    definition:
      "The baseball version of the point spread. The favorite is handicapped at -1.5 runs and must win by 2+ runs; the underdog is given +1.5 runs.",
    example: "New York Yankees -1.5 (2.30). A 6-4 win cashes; a 5-4 win loses the run line.",
  },
  {
    term: "Puck Line (Ice Hockey Handicap -1.5 / +1.5)",
    category: "market",
    definition:
      "The standard ice hockey spread. The favorite must win by 2 or more goals (-1.5), which is frequently influenced by late empty-net goals.",
    example: "Colorado Avalanche -1.5 (2.40). A 4-2 win cashes the puck line.",
  },
  {
    term: "Method of Victory (Combat Sports Prop)",
    category: "market",
    definition:
      "A specialized MMA or boxing prop bet predicting both the winning fighter and the manner of stoppage: KO/TKO, Submission, or Decision.",
    example: "Fighter A by KO/TKO (2.50) pays only if Fighter A wins by knockout or referee stoppage.",
  },
  {
    term: "Player to Win a Set / Set Betting (Tennis)",
    category: "market",
    definition:
      "In tennis, backing a player to win at least one set during a match, or predicting the exact final set score (e.g., 2-0, 2-1).",
    example: "Underdog to Win a Set (1.65) cashes as long as the underdog wins any single set.",
  },
];
