import type { Lang } from "@/app/lib/i18n";

export type SportMarketGuide = {
  name: string;
  badge: string;
  description: string;
  example: string;
};

export type SportEditorialGuide = {
  title: string;
  subtitle: string;
  overview: string;
  marketDynamicsTitle: string;
  marketDynamicsText: string;
  keyMarkets: SportMarketGuide[];
  evaluationTitle: string;
  evaluationPoints: string[];
  varianceAndPitfallsTitle: string;
  varianceAndPitfalls: string[];
  recommendedToolsTitle: string;
  recommendedGuides: Array<{ slug: string; title: string }>;
};

const SPORT_GUIDES_EN: Record<string, SportEditorialGuide> = {
  football: {
    title: "Football (Soccer) Betting Analysis & Market Mechanics",
    subtitle: "Understanding 3-way regulation markets, goal line distributions, and how MatchSignal identifies value in football odds.",
    overview:
      "Football is the highest-volume sports betting market in the world, characterized by high bookmaker liquidity and tight margins on elite leagues (such as the Premier League, UEFA Champions League, and La Liga). Because regulation football matches allow for draws (1X2), betting markets exhibit fundamentally different statistical properties compared to two-way sports like basketball or tennis.",
    marketDynamicsTitle: "Football Market Dynamics & Low-Scoring Poisson Characteristics",
    marketDynamicsText:
      "Unlike high-scoring sports, football outcomes are heavily influenced by the low-frequency nature of goals. A typical football match averages between 2.4 and 2.8 total goals, meaning a single goal, penalty, or red card produces an outsized impact on the final outcome. Bookmakers model these outcomes using bivariate Poisson distributions or advanced expected goals (xG) frameworks.",
    keyMarkets: [
      {
        name: "Full-Time Result (1X2 / 3-Way Moneyline)",
        badge: "1X2",
        description:
          "Predicts Home Win (1), Draw (X), or Away Win (2) at the end of standard 90-minute regulation time plus referee stoppage time. Extra time and penalty shootouts are not included in standard settlement.",
        example: "Arsenal (1.80), Draw (3.60), Chelsea (4.50). If the match ends 1-1, only the Draw selection wins.",
      },
      {
        name: "Draw No Bet (DNB)",
        badge: "DNB",
        description:
          "Eliminates the draw outcome from the market. If your selected team wins, your bet pays out; if the match ends in a draw, the entire stake is refunded (push).",
        example: "Arsenal DNB (1.33). A 1-0 win pays profit; a 1-1 draw returns your original stake.",
      },
      {
        name: "Double Chance",
        badge: "1X / X2 / 12",
        description:
          "Combines two of the three possible outcomes into a single wager: 1X (Home Win or Draw), X2 (Away Win or Draw), or 12 (Home Win or Away Win). Offers higher probability at lower odds.",
        example: "Everton 1X (1.65) wins if Everton either wins or draws against Manchester City.",
      },
      {
        name: "Total Goals (Over / Under 1.5, 2.5, 3.5)",
        badge: "Totals",
        description:
          "A two-way market on whether the combined goals scored by both teams will be above or below a specified threshold across 90 minutes.",
        example: "Over 2.5 Goals (1.95) wins if 3 or more total goals are scored (e.g., 2-1, 3-0, 2-2).",
      },
    ],
    evaluationTitle: "How MatchSignal Evaluates Football Odds",
    evaluationPoints: [
      "Multi-Bookmaker Consensus: MatchSignal tracks live odds across leading European and American sportsbooks, sampling at least 3 to 15+ books per match to calculate market-wide implied probability.",
      "Vig Removal & Fair Odds: We strip the bookmaker margin (overround) from market consensus to determine the true un-vigged probability of each outcome.",
      "Value Signal Threshold: A prediction is only generated if the best available sportsbook odds exceed the calculated fair price, creating a strictly positive Value Edge (EV > 0%).",
      "Disciplined Risk Tiers: Matches are categorized into Low, Medium, or High risk based on odds volatility, consensus dispersion, and market depth.",
    ],
    varianceAndPitfallsTitle: "Key Football Betting Pitfalls & Variance Factors",
    varianceAndPitfalls: [
      "The Draw Trap: Bettors frequently underestimate the frequency of draws in competitive league matchups, where draw rates often exceed 25% to 30%.",
      "Late Game Fatigue & Substitutions: High-scoring bursts in the final 15 minutes of regulation create sharp variance in Over/Under goal markets.",
      "Cup & Knockout Settlement Rules: Cup ties that proceed to extra time are settled on the 90-minute regulation score, a frequent source of settlement confusion.",
    ],
    recommendedToolsTitle: "Recommended Tools for Football Bettors",
    recommendedGuides: [
      { slug: "how-betting-odds-work", title: "How Betting Odds Actually Work" },
      { slug: "bookmaker-margin-overround", title: "What Is Bookmaker Margin / Overround?" },
      { slug: "expected-value-sports-betting", title: "Expected Value in Sports Betting Explained" },
    ],
  },
  nba: {
    title: "NBA & Basketball Betting Analysis & Market Mechanics",
    subtitle: "Understanding point spreads, pace of play, possession efficiency, and high-volume basketball betting markets.",
    overview:
      "Basketball is a high-possession, high-scoring sport where each team receives approximately 95 to 105 possessions per 48-minute game. Because individual scoring events (2-point and 3-point baskets, free throws) occur dozens of times per game, the Law of Large Numbers makes point spread efficiency exceptionally high in NBA betting markets.",
    marketDynamicsTitle: "Possession Volume, Pace, and Spread Efficiency",
    marketDynamicsText:
      "NBA point spreads reflect the expected margin of victory between two teams after accounting for offensive/defensive efficiency ratings, rest advantages (back-to-back schedules), and injury designations. Total points markets fluctuate based on team pace (possessions per 48 minutes) and three-point shooting variance.",
    keyMarkets: [
      {
        name: "Point Spread (Handicap)",
        badge: "Spread",
        description:
          "The favored team must win by more than the specified point margin, while the underdog can lose by less than the margin (or win outright) for the wager to succeed.",
        example: "Boston Celtics -6.5 (1.91). Boston must win by 7 or more points for the bet to cash.",
      },
      {
        name: "Moneyline (Head-to-Head)",
        badge: "Moneyline",
        description:
          "A direct two-way bet on which team will win the game outright, including all overtime periods. There are no ties in basketball betting.",
        example: "Golden State Warriors (2.15) vs. LA Lakers (1.75). The wager wins if Golden State wins the game.",
      },
      {
        name: "Game Totals (Over / Under Points)",
        badge: "Totals",
        description:
          "Wagering on whether the combined score of both teams in full time (including overtime) will be over or under the bookmaker's projected line.",
        example: "Over 224.5 Points (1.90) wins if the final score combines to 225 points or more (e.g., 115-110).",
      },
    ],
    evaluationTitle: "How MatchSignal Evaluates Basketball Odds",
    evaluationPoints: [
      "Consensus Spread Anchoring: MatchSignal evaluates consensus lines across top bookmakers to detect line discrepancies and pricing premiums.",
      "Overtime Inclusion: Full-game models calculate the probability of overtime to ensure expected value calculations account for potential extra periods.",
      "Strict Positive EV Filtering: Selections are only presented when the offered sportsbook price delivers a quantifiable edge over fair market probability.",
      "Sample Depth Requirement: Every NBA signal requires multiple competing sportsbook feeds to confirm market consensus before publication.",
    ],
    varianceAndPitfallsTitle: "Key Basketball Betting Pitfalls & Variance",
    varianceAndPitfalls: [
      "Late-Game Intentional Fouling: Trailing teams intentionally fouling in the final minute can rapidly add 8 to 15 points, swinging total and spread outcomes unexpectedly.",
      "Load Management & Late Scratches: Player rotations and late injury designations can shift point spreads by multiple points within minutes.",
      "Garbage Time Scoring: Blowout games where bench units play the fourth quarter often lead to meaningless back-door covers against the closing spread.",
    ],
    recommendedToolsTitle: "Recommended Tools for Basketball Bettors",
    recommendedGuides: [
      { slug: "implied-probability", title: "What Is Implied Probability?" },
      { slug: "matchsignal-value-edge", title: "How MatchSignal Calculates Value Edge" },
      { slug: "variance-sports-betting", title: "Understanding Variance in Sports Betting" },
    ],
  },
  nfl: {
    title: "NFL & American Football Betting Analysis & Market Mechanics",
    subtitle: "Understanding key scoring numbers (3, 7, 10), field goal margins, and line movement in American football.",
    overview:
      "American Football is one of the most heavily analyzed sports betting markets in the world. Due to the structured nature of scoring (touchdowns = 6 points + 1 extra point, field goals = 3 points), NFL margin of victory distributions cluster around specific 'key numbers', making point spread evaluation uniquely quantitative.",
    marketDynamicsTitle: "The Critical Role of Key Numbers in NFL Spreads",
    marketDynamicsText:
      "Historically, approximately 15% of all NFL games finish with a margin of victory of exactly 3 points, and roughly 9% finish with a margin of exactly 7 points. Secondary key numbers include 6, 10, 14, and 4. Moving a point spread across the key number 3 (e.g., from -2.5 to -3.5) represents a substantial change in true probability that is far larger than moving from -8.5 to -9.5.",
    keyMarkets: [
      {
        name: "Point Spread",
        badge: "Spread",
        description:
          "The primary market in NFL betting. The favorite is assigned a negative handicap (e.g., -3.5) and must win by 4+ points; the underdog can lose by up to 3 or win outright.",
        example: "Kansas City Chiefs -3.5 (1.91). Kansas City must win by 4 or more points.",
      },
      {
        name: "Moneyline",
        badge: "Moneyline",
        description:
          "Straight-up winner market. If the game goes to overtime, the final result (including overtime) decides the wager. In regular season ties, moneyline wagers are settled as pushes.",
        example: "Buffalo Bills (1.60) vs. Miami Dolphins (2.45). Buffalo must win outright.",
      },
      {
        name: "Over / Under Points (Totals)",
        badge: "Totals",
        description:
          "Total points scored by both offenses, defenses, and special teams throughout regulation and any overtime periods played.",
        example: "Over 47.5 Points (1.90) wins if the final combined score is 48 points or higher (e.g., 27-24).",
      },
    ],
    evaluationTitle: "How MatchSignal Evaluates NFL Odds",
    evaluationPoints: [
      "Key Number Accounting: Our consensus analysis evaluates whether offered point spreads sit on the advantageous side of critical margins like 3 and 7.",
      "Multi-Bookmaker Line Aggregation: We compare prices across US and global sportsbooks to identify pricing disparities before closing line convergence.",
      "Strict Positive Value Threshold: Predictions require a mathematically positive Value Edge against our un-vigged fair market model.",
      "Robust Risk Stratification: High-spread underdogs and volatile weather-impacted matchups receive appropriate risk tiering.",
    ],
    varianceAndPitfallsTitle: "Key NFL Betting Pitfalls & Variance",
    varianceAndPitfalls: [
      "Overvaluing Small Sample Sizes: With only 17 regular-season games per team, early-season statistics can be heavily skewed by schedule difficulty and turnover luck.",
      "Hook Vulnerability (-3.5 / -7.5): Placing bets on -3.5 or -7.5 without considering alternative lines often results in 1-point losses on the most common NFL victory margins.",
      "Weather Impacts on Totals: High winds (over 15-20 mph) have a far greater depressing effect on scoring and passing efficiency than extreme cold or rain.",
    ],
    recommendedToolsTitle: "Recommended Tools for NFL Bettors",
    recommendedGuides: [
      { slug: "how-to-compare-betting-odds", title: "How to Compare Odds Correctly" },
      { slug: "why-betting-odds-move", title: "Why Odds Move Before a Match" },
      { slug: "bankroll-management", title: "Bankroll Management Explained" },
    ],
  },
  hockey: {
    title: "NHL & Ice Hockey Betting Analysis & Market Mechanics",
    subtitle: "Understanding Puck Lines (-1.5), 3-way regulation vs overtime moneylines, and goalie variance in hockey.",
    overview:
      "Ice hockey is a fast-paced, high-variance sport played on ice where goals are relatively rare (typically 5.5 to 6.5 goals per game). The presence of overtime and shootouts in modern hockey creates distinct market variations between 60-minute regulation wagering and full-game inclusive betting.",
    marketDynamicsTitle: "Puck Line Dynamics & The Empty-Net Effect",
    marketDynamicsText:
      "Because hockey games frequently finish with 1-goal margins (e.g., 3-2, 2-1), the standard hockey spread—known as the Puck Line—is almost universally set at -1.5 / +1.5. A critical factor in hockey spread betting is the 'empty-net goal', where trailing teams pull their goaltender in the final minutes, dramatically inflating the frequency of 2-goal final victory margins.",
    keyMarkets: [
      {
        name: "Moneyline (Including Overtime & Shootout)",
        badge: "2-Way ML",
        description:
          "The standard ice hockey moneyline. Backs a team to win the game outright, including sudden-death 3-on-3 overtime and shootouts if necessary.",
        example: "Edmonton Oilers (1.80) vs. Vancouver Canucks (2.05). If Edmonton wins in a shootout, the bet wins.",
      },
      {
        name: "60-Minute Regulation (3-Way 1X2)",
        badge: "3-Way / 60 Min",
        description:
          "Wagers strictly on the score at the end of the three 20-minute periods. If the game goes to overtime, the 'Draw / Tie' selection is graded as the winner.",
        example: "Edmonton 60-Min Win (2.25), Tie (4.10), Vancouver 60-Min (2.80).",
      },
      {
        name: "Puck Line (-1.5 / +1.5)",
        badge: "Puck Line",
        description:
          "The standard hockey handicap. The favorite must win by 2 or more goals (-1.5); the underdog can lose by 1 goal or win outright (+1.5).",
        example: "Toronto Maple Leafs -1.5 (2.50). Toronto must win by at least 2 goals (e.g., 4-2, 5-3).",
      },
      {
        name: "Total Goals (Over / Under 5.5, 6.5)",
        badge: "Totals",
        description:
          "Wagering on the combined goals scored by both teams across the entire game, including overtime and a single counted shootout goal.",
        example: "Over 6.0 Goals (1.90). 7+ goals wins, exactly 6 pushes/refunds, 5 or fewer loses.",
      },
    ],
    evaluationTitle: "How MatchSignal Evaluates NHL Odds",
    evaluationPoints: [
      "Starting Goaltender Ingestion: Goaltender save percentages and workload variance are factored into market consensus evaluations.",
      "Market Discrepancy Identification: We compare 2-way vs 3-way regulation lines to find pricing inefficiencies across sportsbooks.",
      "Fair Probability Derivation: Margins are mathematically stripped to calculate the un-vigged true probability of puck lines and totals.",
      "Strict EV Verification: Predictions are published only when the top tracked bookmaker price exceeds the fair probability threshold.",
    ],
    varianceAndPitfallsTitle: "Key Hockey Betting Pitfalls & Variance",
    varianceAndPitfalls: [
      "Goaltender Backup Risk: Backup goaltenders start roughly 20-30% of games in condensed schedules, significantly shifting true win probabilities.",
      "Shootout Volatility: Shootouts represent individual skill competitions with substantial randomness, making heavy moneyline favorites vulnerable in tied games.",
      "Special Teams Disparities: Power play efficiency and penalty-killing statistics frequently outweigh 5-on-5 play in decisive moments.",
    ],
    recommendedToolsTitle: "Recommended Tools for Hockey Bettors",
    recommendedGuides: [
      { slug: "variance-sports-betting", title: "Understanding Variance in Sports Betting" },
      { slug: "flat-stakes-vs-percentage-staking", title: "Flat Stakes vs Percentage Staking" },
      { slug: "expected-value-sports-betting", title: "Expected Value in Sports Betting Explained" },
    ],
  },
  tennis: {
    title: "Tennis (ATP & WTA) Betting Analysis & Market Mechanics",
    subtitle: "Understanding match winner odds, game handicaps, set totals, surface speed, and retirement rules in tennis.",
    overview:
      "Tennis is an individual sport where two athletes compete directly with no possibility of a draw. Matches are played to a best-of-three (or best-of-five in Men's Grand Slams) sets. Because individual match dynamics depend heavily on court surface (clay, hard, grass) and server hold rates, tennis offers rich market depth across games, sets, and match outcomes.",
    marketDynamicsTitle: "Surface Dynamics, Server Dominance, and Game Handicaps",
    marketDynamicsText:
      "Tennis betting is deeply rooted in server hold percentages. On fast grass courts (like Wimbledon), dominant servers frequently hold service over 85-90% of the time, leading to tiebreaks and high total game counts. On slow clay courts (like Roland Garros), break frequencies rise, favoring elite returners and baseline endurance.",
    keyMarkets: [
      {
        name: "Match Winner (Moneyline)",
        badge: "Match Winner",
        description:
          "Wagering on which player will win the match outright. Bookmaker retirement rules (e.g., must complete 1 set vs must finish match) can vary by operator.",
        example: "Carlos Alcaraz (1.45) vs. Daniil Medvedev (2.85). Alcaraz must win the match.",
      },
      {
        name: "Game Handicap (Spread)",
        badge: "Game Spread",
        description:
          "The favored player is assigned a negative game handicap (e.g., -3.5 games). At the end of the match, total games won by each player are summed.",
        example: "Alcaraz -3.5 Games (1.85). If Alcaraz wins 6-4, 6-4 (12-8 total games), the margin is +4, winning the bet.",
      },
      {
        name: "Total Games (Over / Under 21.5, 22.5)",
        badge: "Total Games",
        description:
          "Predicting whether the total number of games played across all sets will exceed or stay below the bookmaker's line.",
        example: "Over 22.5 Games (1.90) wins in a three-set match (e.g., 6-4, 4-6, 6-3 = 29 games).",
      },
      {
        name: "Set Betting / Player to Win a Set",
        badge: "Set Markets",
        description:
          "Predicting the exact set score (e.g., 2-0 or 2-1) or wagering on an underdog to win at least one set during the match.",
        example: "Medvedev to Win a Set (1.55) wins if Medvedev wins at least one set, even if he loses the match 1-2.",
      },
    ],
    evaluationTitle: "How MatchSignal Evaluates Tennis Odds",
    evaluationPoints: [
      "Multi-Bookmaker Surface Consensus: MatchSignal tracks prices across leading bookmakers to measure market sentiment across ATP and WTA events.",
      "Un-Vigged Probability Modeling: Multi-market prices are normalized to establish accurate fair probabilities for match winner, set, and game lines.",
      "Strict Positive Edge Requirement: Value Signals are generated only when the best available bookmaker price provides a clear positive mathematical edge.",
      "Risk Stratification: Volatile matchups between inconsistent players or lower-tier tournaments receive appropriate risk classification.",
    ],
    varianceAndPitfallsTitle: "Key Tennis Betting Pitfalls & Variance",
    varianceAndPitfalls: [
      "Operator Retirement Rules: Different sportsbooks have different rules for mid-match player retirements (void vs loss vs 1st set completion). Always check operator terms.",
      "Winning the Match While Losing the Game Spread: A player can win a match in three sets (e.g., 1-6, 7-6, 7-6 = 15 games to 18) while losing the overall game handicap.",
      "Physical Fatigue in Back-to-Back Tournaments: Players advancing deep into consecutive weekly tournaments frequently suffer physical letdowns in opening rounds.",
    ],
    recommendedToolsTitle: "Recommended Tools for Tennis Bettors",
    recommendedGuides: [
      { slug: "how-betting-odds-work", title: "How Betting Odds Actually Work" },
      { slug: "matchsignal-value-edge", title: "How MatchSignal Calculates Value Edge" },
      { slug: "cognitive-biases-sports-betting", title: "Cognitive Biases in Sports Betting" },
    ],
  },
  mlb: {
    title: "MLB & Baseball Betting Analysis & Market Mechanics",
    subtitle: "Understanding Run Lines (-1.5), Starting Pitcher matchups, bullpen depth, and run totals in baseball.",
    overview:
      "Baseball is a 162-game marathon sport where team win percentages rarely exceed 65% or fall below 35%. Because starting pitchers have a massive influence on early scoring and bullpen performance dictates late innings, baseball is one of the most mathematically rigorous and data-driven betting markets in sports.",
    marketDynamicsTitle: "Starting Pitchers, Bullpen Workload, and 1-Run Game Variance",
    marketDynamicsText:
      "Roughly 28% to 30% of all Major League Baseball games are decided by exactly one run. Because of this high frequency of 1-run games, standard baseball handicap betting centers on the 'Run Line' of -1.5 for favorites and +1.5 for underdogs, creating sharp odds inversions compared to standard moneylines.",
    keyMarkets: [
      {
        name: "Moneyline",
        badge: "Moneyline",
        description:
          "A direct bet on which team will win the game outright after 9+ innings (including extra innings). Most sportsbooks require listed starting pitchers to start for action.",
        example: "New York Yankees (1.70) vs. Boston Red Sox (2.20). The Yankees must win the game.",
      },
      {
        name: "Run Line (-1.5 / +1.5)",
        badge: "Run Line",
        description:
          "The baseball point spread. The favorite must win by 2 or more runs (-1.5); the underdog can lose by 1 run or win outright (+1.5).",
        example: "Yankees -1.5 (2.35). If the Yankees win 5-3, the wager wins.",
      },
      {
        name: "Total Runs (Over / Under 7.5, 8.5)",
        badge: "Total Runs",
        description:
          "Predicting whether the combined runs scored by both teams across the entire game (including extra innings) will exceed or stay below the line.",
        example: "Over 8.5 Runs (1.90) wins if 9 or more total runs are scored (e.g., 6-4, 5-4).",
      },
    ],
    evaluationTitle: "How MatchSignal Evaluates Baseball Odds",
    evaluationPoints: [
      "Multi-Bookmaker Price Sampling: MatchSignal monitors live lines across sportsbooks to identify pricing discrepancies across moneylines and run lines.",
      "Vig Removal on Baseball Margins: True market implied probabilities are calculated by stripping out the bookmaker's theoretical hold.",
      "Positive Value Edge Filtering: Every recommendation requires the top tracked sportsbook odds to exceed the fair calculated price.",
      "Consistent Sample Requirements: Minimum bookmaker depth thresholds must be satisfied before any MLB match signal is published.",
    ],
    varianceAndPitfallsTitle: "Key Baseball Betting Pitfalls & Variance",
    varianceAndPitfalls: [
      "Bullpen Volatility: Even dominant starting pitchers can see leads erased in the 7th through 9th innings by overworked or volatile relief pitching.",
      "Home Team Bottom of the 9th Run Line Trap: If the home team leads by 1 run going into the 9th inning, the bottom of the 9th is not played, capping victory at 1 run and losing the -1.5 run line.",
      "Wind and Ballpark Factors: Ballpark dimensions and wind direction (blowing out vs blowing in) heavily impact total run scoring.",
    ],
    recommendedToolsTitle: "Recommended Tools for Baseball Bettors",
    recommendedGuides: [
      { slug: "expected-value-sports-betting", title: "Expected Value in Sports Betting Explained" },
      { slug: "winning-streaks-misleading", title: "Why Winning Streaks Can Be Misleading" },
      { slug: "bankroll-management", title: "Bankroll Management Explained" },
    ],
  },
  mma: {
    title: "MMA & Combat Sports Betting Analysis & Market Mechanics",
    subtitle: "Understanding fight winner moneylines, round totals, method of victory props, and stoppage variance in UFC and boxing.",
    overview:
      "Mixed Martial Arts (MMA) and combat sports represent high-volatility betting markets where a single strike, submission hold, or judge's decision can instantaneously end an event. Unlike team sports with dozens of scoring events, MMA bouts are decided across 3 or 5 rounds (or early stoppage), leading to wide moneyline price ranges and high prop market interest.",
    marketDynamicsTitle: "Stoppage Volatility, Style Matchups, and Judge Scorecards",
    marketDynamicsText:
      "Fighter stylistics (e.g., striker vs grappler, southpaw vs orthodox) heavily dictate the expected duration and finish method of a bout. Heavily favored fighters can carry steep moneyline odds (-300 to -800 or 1.15 to 1.30), making round totals (Over/Under 1.5, 2.5 rounds) and Method of Victory markets essential for value evaluation.",
    keyMarkets: [
      {
        name: "Fight Winner (Moneyline)",
        badge: "Moneyline",
        description:
          "Wagering on which fighter will have their hand raised, regardless of whether the win occurs by KO/TKO, submission, disqualification, or judges' decision.",
        example: "Islam Makhachev (1.30) vs. Dustin Poirier (3.60). Makhachev must win the bout.",
      },
      {
        name: "Total Rounds (Over / Under 1.5, 2.5 Rounds)",
        badge: "Round Totals",
        description:
          "Predicting whether the fight will surpass a specific time threshold. For example, Over 2.5 rounds requires the fight to reach the 2 minute and 30 second mark of Round 3.",
        example: "Over 2.5 Rounds (1.85) wins if the fight lasts past 2:30 of the 3rd round.",
      },
      {
        name: "Method of Victory (Prop)",
        badge: "Finish Method",
        description:
          "Predicting both the winner and how the fight will end: KO/TKO/DQ, Submission, or Decision / Technical Decision.",
        example: "Makhachev by Submission (1.90) wins only if Makhachev wins via submission.",
      },
    ],
    evaluationTitle: "How MatchSignal Evaluates Combat Sports Odds",
    evaluationPoints: [
      "Consensus Aggregation: MatchSignal compares moneylines and round props across leading sportsbooks to measure true consensus implied probabilities.",
      "Margin Removal: We calculate un-vigged fair probabilities across wide moneyline splits to identify mispriced underdog or favorite value.",
      "Strict Positive EV Criteria: Combat sports picks are generated only when the offered price exceeds our model's fair probability threshold.",
      "High-Risk Tiering: Due to high stoppage variance and judge subjectivity, combat sports selections are appropriately tagged with disciplined risk classifications.",
    ],
    varianceAndPitfallsTitle: "Key MMA Betting Pitfalls & Variance",
    varianceAndPitfalls: [
      "Judging Subjectivity: 3-round split decisions create substantial variance; judges frequently value control time vs effective damage differently.",
      "Weight Cut Depletion: Extreme weight cuts in the 24 hours before a fight can cause sudden cardio collapses in later rounds.",
      "Short-Notice Replacements: Last-minute opponent changes disrupt training camps and stylistic preparations, introducing sharp unquantified uncertainty.",
    ],
    recommendedToolsTitle: "Recommended Tools for Combat Sports Bettors",
    recommendedGuides: [
      { slug: "implied-probability", title: "What Is Implied Probability?" },
      { slug: "why-chasing-losses-is-dangerous", title: "Why Chasing Losses Is Dangerous" },
      { slug: "matchsignal-value-edge", title: "How MatchSignal Calculates Value Edge" },
    ],
  },
};

export function getSportEditorialGuide(sportKey: string, lang: Lang = "en"): SportEditorialGuide {
  const normalizedKey = sportKey.toLowerCase().trim();
  const enGuide = SPORT_GUIDES_EN[normalizedKey] ?? SPORT_GUIDES_EN.football;
  return enGuide;
}
