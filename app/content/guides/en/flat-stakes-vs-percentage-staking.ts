import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "flat-stakes-vs-percentage-staking",
  locale: "en",
  title: "Flat Stakes vs Percentage Staking",
  category: "bankroll-risk",
  status: "published",
  description:
    "Compare flat staking and percentage staking in sports betting, understand how each method affects bankroll volatility, drawdowns, record keeping, and risk, and learn when each approach may be easier to manage.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Flat staking and percentage staking are two common ways to decide how much of a betting bankroll to risk on each wager. Flat staking uses the same stake amount repeatedly, while percentage staking uses a fixed percentage of the current bankroll, causing stake size to rise or fall as the bankroll changes. Neither approach creates an edge by itself. Their purpose is risk control and consistency. The better choice depends on how much simplicity, stability, and automatic bankroll adjustment the bettor wants.",
  keyTakeaways: [
    "Flat staking uses the same stake amount across bets, while percentage staking uses a fixed percentage of the current bankroll.",
    "Flat staking is simple and makes strategy performance easy to evaluate.",
    "Percentage staking automatically reduces exposure during drawdowns and increases exposure after bankroll growth.",
    "Neither staking method can make a negative-expected-value strategy profitable.",
    "Large stake percentages can create severe volatility even when the staking rule itself is consistent.",
    "The quality of the underlying probability and price decision matters more than the staking formula.",
    "A staking plan should be chosen before betting begins and should not change impulsively after wins or losses.",
  ],
  sections: [
    {
      id: "flat-staking",
      heading: "What Is Flat Staking?",
      paragraphs: [
        "Flat staking means risking the same fixed amount on each bet regardless of recent results or changes in bankroll size.",
        "For example, a bettor might decide that one unit equals 10 units of currency and stake one unit on every selection. Whether the bankroll rises from 1,000 to 1,100 or falls to 900, the next stake remains 10.",
        "The main advantage is simplicity. Performance is easy to track because large stake changes do not distort the record. If a strategy wins or loses, the result is driven primarily by the selections and prices rather than by aggressive changes in position size."
      ],
      callout: {
        title: "Flat does not mean risk-free",
        body:
          "A fixed stake can still become too large relative to the bankroll after a major drawdown.",
        tone: "warning",
      },
    },
    {
      id: "percentage-staking",
      heading: "What Is Percentage Staking?",
      paragraphs: [
        "Percentage staking risks a fixed percentage of the current bankroll on each bet. If the bankroll changes, the stake changes with it.",
        "Suppose the bankroll is 1,000 and the staking rule is 1%. The first stake is 10. If the bankroll later falls to 800, the next 1% stake becomes 8. If the bankroll grows to 1,200, the next stake becomes 12.",
        "This creates an automatic adjustment mechanism. Exposure falls during losing periods and rises gradually during winning periods."
      ],
      bullets: [
        "1,000 bankroll at 1% → 10-unit stake.",
        "800 bankroll at 1% → 8-unit stake.",
        "1,200 bankroll at 1% → 12-unit stake.",
      ],
    },
    {
      id: "main-difference",
      heading: "The Core Difference Between the Two Methods",
      paragraphs: [
        "The central difference is whether the stake remains fixed in currency terms or fixed relative to bankroll size.",
        "Flat staking keeps the wager size constant. Percentage staking keeps the proportion of bankroll at risk approximately constant.",
        "That distinction changes how each method behaves during drawdowns. With flat staking, the same stake becomes a larger percentage of the remaining bankroll as losses accumulate. With percentage staking, the stake automatically becomes smaller.",
        "During bankroll growth, the opposite happens. Flat stakes become a smaller percentage of the bankroll over time, while percentage stakes increase."
      ],
      callout: {
        title: "Constant amount vs constant proportion",
        body:
          "Flat staking stabilizes the stake amount. Percentage staking stabilizes the proportion of bankroll at risk.",
        tone: "info",
      },
    },
    {
      id: "drawdowns",
      heading: "How Each Method Behaves During Drawdowns",
      paragraphs: [
        "Drawdowns are periods when the bankroll falls from a previous peak. They are normal in sports betting because variance can produce losing streaks even when the underlying process is reasonable.",
        "Flat staking does not automatically react to a drawdown. If the bettor continues risking 10 units while the bankroll falls from 1,000 to 700, the stake rises from 1% to about 1.43% of the bankroll.",
        "Percentage staking reacts automatically. A 1% stake on a 700 bankroll is 7 units, reducing the size of further losses in currency terms.",
        "This defensive feature is one of the strongest arguments for percentage staking, especially when bankroll preservation is the main goal."
      ],
    },
    {
      id: "growth",
      heading: "How Each Method Behaves During Bankroll Growth",
      paragraphs: [
        "When a bankroll grows, flat staking becomes progressively more conservative because the fixed stake represents a smaller percentage of total capital.",
        "If a 10-unit stake was originally 1% of a 1,000 bankroll, it becomes only 0.67% of a 1,500 bankroll.",
        "Percentage staking increases the stake with the bankroll. At 1%, a 1,500 bankroll produces a 15-unit stake. This allows position size to compound as capital grows.",
        "Compounding can accelerate gains during favorable periods, but it also increases the absolute size of losses when larger stakes eventually lose."
      ],
      callout: {
        title: "Compounding works in both directions",
        body:
          "Percentage staking increases stake size as the bankroll grows, but future losses are also larger in absolute terms.",
        tone: "warning",
      },
    },
    {
      id: "record-keeping",
      heading: "Which Method Is Easier to Evaluate?",
      paragraphs: [
        "Flat staking is usually easier for evaluating the quality of a betting strategy because each selection carries the same nominal weight.",
        "If 100 bets are all one unit, the profit-and-loss record reflects the performance of the selection process without large stake variation dominating the result.",
        "Percentage staking creates changing stake sizes. A later bet can have a larger financial effect than an earlier one simply because the bankroll grew.",
        "For research, model testing, or strategy comparison, flat units can therefore provide a cleaner performance record. Percentage staking may be more suitable when the primary concern is controlling exposure relative to current bankroll."
      ],
    },
    {
      id: "variance",
      heading: "Variance Under Flat and Percentage Staking",
      paragraphs: [
        "Neither staking method removes variance from sports outcomes. Both will experience winning and losing streaks.",
        "The difference is how those outcomes translate into bankroll movement. With percentage staking, the monetary size of the swings adjusts automatically with bankroll size. With flat staking, the same monetary swing continues regardless of recent gains or losses.",
        "At conservative stake sizes, both approaches can produce manageable volatility. At aggressive stake sizes, both can become dangerous.",
        "The percentage itself matters more than whether the method is called flat or percentage staking. A consistent 10% stake can be far more dangerous than a conservative 1% flat unit."
      ],
      callout: {
        title: "Consistency is not enough",
        body:
          "A staking rule can be perfectly consistent and still be too aggressive. The size of the stake relative to bankroll remains critical.",
        tone: "warning",
      },
    },
    {
      id: "expected-value",
      heading: "Staking Does Not Create Expected Value",
      paragraphs: [
        "A staking system cannot transform a bad price into a good one. Expected value comes from the relationship between probability and odds.",
        "If a bet has negative expected value, staking 1%, 2%, or a flat 10 units does not change the underlying economics. It only changes the size of the expected loss and the volatility around it.",
        "Similarly, a positive-expected-value strategy can be damaged by excessive stake sizing. A real edge does not protect a bankroll from ruin if exposure is too aggressive.",
        "The correct order is therefore: evaluate the market and price first, then apply a risk-controlled staking rule."
      ],
      bullets: [
        "Probability and price determine EV.",
        "Stake size determines exposure.",
        "Staking changes the size of outcomes, not the quality of the underlying bet.",
        "No staking system guarantees profit.",
      ],
    },
    {
      id: "percentage-example",
      heading: "A Percentage Staking Example",
      paragraphs: [
        "Consider a bankroll of 1,000 units using a 2% percentage stake. The first stake is 20.",
        "If the bet loses, the bankroll becomes 980 and the next 2% stake becomes 19.60. Another loss leaves 960.40, and the following stake becomes 19.21.",
        "The stake contracts as the bankroll falls. This slows the absolute rate of loss compared with continuing to stake a fixed 20 units.",
        "If the bankroll later grows, the process reverses and stakes gradually increase."
      ],
      callout: {
        title: "Automatic scaling",
        body:
          "Percentage staking reduces absolute exposure during losses without requiring the bettor to make a new discretionary decision.",
        tone: "example",
      },
    },
    {
      id: "flat-example",
      heading: "A Flat Staking Example",
      paragraphs: [
        "Now consider the same 1,000-unit bankroll using a fixed 20-unit stake.",
        "After one loss, the bankroll is 980 but the next stake remains 20. After two losses, the bankroll is 960 and the third stake is still 20.",
        "The fixed amount makes tracking simple, but the stake now represents about 2.08% of the smaller bankroll rather than the original 2%.",
        "If the bankroll falls substantially, a flat stake should be reviewed rather than allowed to become an increasingly large percentage of remaining capital."
      ],
    },
    {
      id: "rebalancing",
      heading: "A Hybrid Approach: Periodic Rebalancing",
      paragraphs: [
        "Some bettors use a hybrid approach: flat staking for a period, followed by occasional recalculation of unit size.",
        "For example, one unit might be set to 1% of bankroll at the start of each month or after the bankroll changes by a predefined amount.",
        "This preserves much of the simplicity of flat staking while preventing a fixed unit from becoming too large or too small relative to bankroll.",
        "The key is that rebalancing rules should be predetermined. Constantly changing stake size after emotional wins or losses defeats the purpose of having a staking framework."
      ],
    },
    {
      id: "confidence-staking",
      heading: "Should Stakes Change With Confidence?",
      paragraphs: [
        "Some bettors vary stake size based on perceived edge or confidence. In theory, stronger positive expected value can justify greater exposure.",
        "The practical problem is estimation error. If a bettor is overconfident about which selections have the largest edge, variable staking can magnify mistakes.",
        "For that reason, flat or simple percentage staking is often easier to audit and control. More advanced variable staking should only be considered when probability estimates are well calibrated and strict maximum exposure limits are in place.",
        "A label such as 'high confidence' should never be treated as certainty."
      ],
      callout: {
        title: "Confidence can be miscalibrated",
        body:
          "Variable stakes magnify both correct and incorrect confidence assessments.",
        tone: "warning",
      },
    },
    {
      id: "kelly",
      heading: "How the Kelly Criterion Differs",
      paragraphs: [
        "The Kelly Criterion is neither flat staking nor simple fixed-percentage staking. It calculates a recommended fraction of bankroll based on estimated edge and odds.",
        "In theory, Kelly adapts stake size to the strength of the estimated opportunity. In practice, it is highly sensitive to probability error.",
        "If the probability estimate is too optimistic, full Kelly can recommend an excessively large stake. This is why fractional Kelly approaches are often used to reduce volatility.",
        "For most users, the important lesson is not that one formula is superior. It is that more complex staking requires more reliable probability estimates and stronger risk controls."
      ],
    },
    {
      id: "psychology",
      heading: "Which Method Is Easier to Follow Emotionally?",
      paragraphs: [
        "Flat staking can feel easier because the amount does not change after wins or losses. This reduces the temptation to interpret stake changes as emotional reactions.",
        "Percentage staking can also support discipline because the adjustment is automatic and rule-based. A smaller stake after losses is not a punishment; it is simply the result of a smaller bankroll.",
        "Problems arise when bettors abandon either method after a streak. Increasing stakes after losses to recover money or increasing them after wins because of overconfidence introduces discretionary risk.",
        "The best staking method is often the one that can be followed consistently without encouraging impulsive changes."
      ],
    },
    {
      id: "matchsignal",
      heading: "How Staking Relates to MatchSignal",
      paragraphs: [
        "MatchSignal provides analytical context including Best Odds, Market Avg, Fair Probability, Value Edge, Books Sampled, and Risk Tier.",
        "These fields are not staking instructions. A Low Risk classification or larger Value Edge should not automatically cause a larger stake.",
        "Stake size should be determined by a separate personal bankroll framework that accounts for affordability, uncertainty, variance, and responsible gambling limits.",
        "MatchSignal analysis is informational and does not guarantee outcomes or recommend a specific financial exposure."
      ],
      callout: {
        title: "Analysis and stake sizing are separate decisions",
        body:
          "A strong analytical signal does not remove uncertainty and should not override conservative bankroll rules.",
        tone: "warning",
      },
    },
    {
      id: "comparison",
      heading: "Flat Stakes vs Percentage Staking: Side-by-Side",
      paragraphs: [
        "Both methods can be sensible when stakes are conservative and the rules are followed consistently. Their strengths are different."
      ],
      bullets: [
        "Flat staking: simplest to understand and track.",
        "Flat staking: useful for evaluating strategy performance.",
        "Flat staking: can become too large relative to bankroll after a deep drawdown.",
        "Percentage staking: automatically reduces exposure during drawdowns.",
        "Percentage staking: automatically compounds during bankroll growth.",
        "Percentage staking: produces changing stake sizes that can make evaluation less intuitive.",
        "Both methods: require conservative stake levels and cannot create an edge.",
      ],
    },
    {
      id: "checklist",
      heading: "A Practical Staking Checklist",
      paragraphs: [
        "Whichever method is chosen, the staking rule should be simple enough to follow under both winning and losing conditions."
      ],
      bullets: [
        "Separate the betting bankroll from essential money.",
        "Choose flat or percentage staking before betting begins.",
        "Keep the stake conservative relative to bankroll.",
        "Do not increase stakes to recover losses.",
        "Review whether a flat stake has become too large after a drawdown.",
        "If using percentage staking, calculate from the current bankroll consistently.",
        "Avoid frequent discretionary changes based on recent results.",
        "Track stakes and bankroll changes accurately.",
        "Treat advanced variable staking cautiously when probability estimates are uncertain.",
        "Stop or reduce betting if financial or emotional pressure increases.",
      ],
    },
  ],
  relatedGuides: [
    "bankroll-management",
    "variance-sports-betting",
    "expected-value-sports-betting",
    "why-chasing-losses-is-dangerous",
    "winning-streaks-misleading",
  ],
  responsibleGamblingNote:
    "Flat staking and percentage staking are risk-management methods, not profit guarantees. Any betting strategy can lose money. Keep stakes within amounts you can afford to lose, separate betting funds from essential money, avoid increasing stakes to chase losses, and stop if betting causes financial or emotional harm.",
};

export default guide;
