import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "expected-value-sports-betting",
  locale: "en",
  title: "Expected Value in Sports Betting Explained",
  category: "value-analysis",
  status: "published",
  description:
    "Understand expected value in sports betting, how probability and price combine to create positive or negative EV, why a positive edge does not guarantee a win, and how to evaluate value more carefully.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Expected value, usually shortened to EV, is a way to describe the theoretical average outcome of a decision when the same type of decision is repeated many times. In sports betting, EV connects two things: your estimate of how often an outcome should occur and the price being offered by the market. A bet can be likely to win and still have negative expected value if the odds are too short. A bet can also lose today while still having positive expected value under a reasonable probability estimate. The concept is useful because it shifts attention away from simply picking winners and toward the relationship between probability, price, and uncertainty.",
  keyTakeaways: [
    "Expected value combines probability and payout into one long-run mathematical measure.",
    "Positive EV means the estimated probability is high enough relative to the offered odds to create a positive theoretical average return.",
    "Negative EV means the offered price requires a higher success rate than your probability estimate supports.",
    "A positive-EV bet can lose, and a negative-EV bet can win; EV is about repeated decisions, not certainty on one event.",
    "The quality of any EV calculation depends heavily on the quality and calibration of the probability estimate.",
    "Better odds improve expected value for the same underlying selection because they reduce the break-even probability.",
  ],
  sections: [
    {
      id: "definition",
      heading: "What Expected Value Means",
      paragraphs: [
        "Expected value is the probability-weighted average of all possible outcomes. In a simple win-or-lose betting example, there are two main financial outcomes: the bet wins and produces a profit, or the bet loses and the stake is lost. EV combines the probability of each outcome with its financial result.",
        "Suppose a selection is offered at decimal odds of 2.00 and you estimate that it has a 55% chance of winning. A one-unit stake returns two units if successful, meaning one unit of profit plus the original stake. The losing outcome costs one unit. The expected value is therefore 0.55 × 1 unit of profit plus 0.45 × negative 1 unit, which equals +0.10 units. Relative to a one-unit stake, that is a theoretical expected return of +10%.",
        "This does not mean the next bet will physically return 1.10 units. The actual outcome of one bet is discrete: it either wins or loses according to the market's settlement rules. EV is an average across repeated comparable decisions under the assumed probability."
      ],
      callout: {
        title: "The core idea",
        body:
          "Expected value measures the quality of a price relative to a probability estimate. It does not predict the result of the next match.",
        tone: "info",
      },
    },
    {
      id: "formula",
      heading: "The Basic Expected Value Formula",
      paragraphs: [
        "For a simple win-or-lose bet using decimal odds, EV per unit staked can be written as: EV = (win probability × decimal odds) − 1.",
        "If the probability is 50% and the odds are 2.20, the calculation is 0.50 × 2.20 − 1 = +0.10, or +10%. If the same 50% probability is paired with odds of 1.80, the result is 0.50 × 1.80 − 1 = −0.10, or −10%.",
        "The same prediction can therefore have very different expected value depending on the available price. This is one of the most important distinctions in betting analysis: the sporting opinion and the economic quality of the bet are not the same thing.",
        "The formula is simple, but it can create false confidence if the probability input is treated as exact. EV arithmetic can be correct while the underlying probability estimate is wrong."
      ],
      bullets: [
        "EV per unit = (win probability × decimal odds) − 1.",
        "50% probability at 2.20 odds: +10% EV.",
        "50% probability at 2.00 odds: 0% EV.",
        "50% probability at 1.80 odds: −10% EV.",
      ],
      callout: {
        title: "Same selection, different EV",
        body:
          "If your probability estimate stays the same, changing the odds changes the expected value immediately.",
        tone: "example",
      },
    },
    {
      id: "break-even",
      heading: "Break-Even Probability and Expected Value",
      paragraphs: [
        "Every quoted price has a break-even probability. For decimal odds, break-even probability equals 1 divided by the odds. At 2.00, the break-even rate is 50%. At 1.80, it is about 55.6%. At 2.50, it is 40%.",
        "The connection to EV is direct. If your probability estimate is above the break-even probability implied by the available price, the bet has positive expected value under that estimate. If your estimate is below the break-even threshold, the expected value is negative. If the two are equal, the theoretical EV is zero before considering practical frictions.",
        "This framework is more useful than simply asking whether an outcome is likely. A team assessed at 70% can still be badly priced if the available odds require a 75% break-even rate. An outcome assessed at only 35% can theoretically offer value if the price requires a break-even rate below 35%."
      ],
      callout: {
        title: "Likely is not the same as valuable",
        body:
          "Probability tells you how often you think something may happen. Expected value asks whether the offered price compensates you appropriately for that probability.",
        tone: "warning",
      },
    },
    {
      id: "positive-negative",
      heading: "Positive EV vs Negative EV",
      paragraphs: [
        "Positive expected value means the estimated average return is above the amount staked. Negative expected value means the estimated average return is below the amount staked. The sign of the EV depends on the relationship between probability and price, not on whether the next individual bet wins.",
        "Consider two people evaluating the same selection. One can only obtain odds of 1.80, while the other finds 2.05. If both use the same 52% probability estimate, the first price produces 0.52 × 1.80 − 1 = −6.4% EV. The second produces 0.52 × 2.05 − 1 = +6.6% EV.",
        "The prediction is identical, but the economic quality of the two bets is different. This is why price comparison matters. A bettor cannot control the final score, but can often control whether they accept an inferior price when a better equivalent price is available elsewhere."
      ],
      bullets: [
        "Positive EV: estimated probability exceeds the price's break-even requirement.",
        "Negative EV: estimated probability falls below the price's break-even requirement.",
        "Zero EV: estimated probability approximately matches the break-even requirement.",
        "Changing the odds changes EV even if the underlying probability estimate does not change.",
      ],
    },
    {
      id: "not-guarantee",
      heading: "Why Positive Expected Value Does Not Guarantee Profit",
      paragraphs: [
        "A positive-EV estimate describes a long-run mathematical expectation, not a guaranteed short-run outcome. Sports contain randomness, incomplete information, officiating decisions, injuries, tactical changes, weather effects, execution errors, and many other sources of variance. Even a strong probability estimate cannot remove these factors.",
        "Imagine a series of bets each assessed at a 60% win probability. Losing four or five in a row is entirely possible. Conversely, a sequence of negative-EV bets can win several times in succession. Short-term results therefore do not reliably reveal whether the underlying process was good.",
        "The second source of uncertainty is the probability estimate itself. A calculation can appear strongly positive because the estimated probability is too optimistic. If a model says 60% when the true chance is closer to 50%, the EV calculation will be misleading even if the arithmetic is flawless.",
        "For that reason, expected value should be treated as an analytical framework rather than a promise. The more uncertain the probability estimate, the less confidence should be placed in a small apparent edge."
      ],
      callout: {
        title: "Arithmetic can be correct while the estimate is wrong",
        body:
          "EV calculations are only as reliable as the probabilities supplied to them. Model calibration and uncertainty matter as much as the formula.",
        tone: "warning",
      },
    },
    {
      id: "probability-quality",
      heading: "Why Probability Quality Matters More Than the Formula",
      paragraphs: [
        "The expected-value formula is easy. Estimating probability well is the difficult part. A useful probability model should be calibrated: outcomes assigned around 60% should, over a sufficiently large and appropriate sample, occur around 60% of the time.",
        "Sports probabilities can be estimated from market data, statistical models, team and player information, contextual variables, or combinations of these sources. Every approach contains assumptions. Historical data may not fully represent current teams. Injuries may be uncertain. A model may underweight tactical changes. Market prices may incorporate information that the model does not.",
        "This means a 2% apparent edge should not automatically be treated the same way as a 10% edge. The uncertainty around the probability estimate may be larger than the difference being measured.",
        "A disciplined process asks not only 'What is my estimate?' but also 'How uncertain is this estimate, and how sensitive is the EV to small changes?'"
      ],
      bullets: [
        "Check calibration over large samples rather than judging a model from a few results.",
        "Treat small edges cautiously when the underlying probability estimate is uncertain.",
        "Update estimates when relevant information changes.",
        "Avoid adding confidence simply because a model produces many decimal places.",
      ],
    },
    {
      id: "bookmaker-margin",
      heading: "How Bookmaker Margin Affects EV Analysis",
      paragraphs: [
        "Sportsbook prices commonly include a bookmaker margin or overround. In a simple two-way market, both sides might be offered at 1.91. Each price implies about 52.36%, so the two raw probabilities total about 104.72% rather than 100%.",
        "This matters because a raw bookmaker implied probability is not automatically a fair probability estimate. The quoted prices include the structure of the market and the operator's margin. Analysts can normalize implied probabilities to create a simple no-margin market benchmark.",
        "For EV analysis, however, the actual price available to the bettor remains the price that determines the break-even threshold. Even if a no-margin model estimates an outcome at 52%, a sportsbook price of 1.85 requires about 54.1% to break even. The execution price is therefore central to the final EV calculation."
      ],
      callout: {
        title: "Fair probability and available price are different inputs",
        body:
          "A no-margin estimate can help describe market expectations, while the actual offered odds determine the break-even probability of the bet you can place.",
        tone: "info",
      },
    },
    {
      id: "odds-comparison",
      heading: "Why Comparing Odds Improves Expected Value",
      paragraphs: [
        "For the same selection and probability estimate, higher odds always improve expected value. Suppose your estimate is 48%. At 1.95, EV is 0.48 × 1.95 − 1 = −6.4%. At 2.10, EV is +0.8%. At 2.20, EV is +5.6%.",
        "Nothing about the sporting outcome changed between these examples. Only the price changed. That is why comparing equivalent markets across sportsbooks is an important part of value analysis.",
        "The comparison must be genuinely like-for-like. Different settlement rules, handicaps, totals, overtime treatment, void conditions, or market definitions can make superficially similar prices non-equivalent. Price comparison is useful only when the underlying bet is the same."
      ],
      bullets: [
        "Confirm the event, selection, line, and settlement rules match.",
        "Compare current prices rather than stale screenshots or historical quotes.",
        "Remember that market prices can move before the bet is placed.",
        "Higher equivalent odds lower the break-even probability.",
      ],
    },
    {
      id: "variance",
      heading: "Expected Value, Variance, and Sample Size",
      paragraphs: [
        "Variance describes how widely short-term results can move around their long-run expectation. Sports betting has substantial variance because each event produces a discrete outcome and many markets involve probabilities far from certainty.",
        "A process with genuine positive expected value can experience extended losing periods. The size and duration of those swings depend on the type of bets, the odds, the true probabilities, correlation between positions, and stake sizing. A small sample can therefore be dominated by randomness.",
        "This creates a major evaluation problem. A bettor may mistake a winning streak for evidence of skill or abandon a sound process during an ordinary downswing. EV analysis is most meaningful when combined with disciplined record keeping, realistic sample sizes, and attention to calibration rather than short-term profit alone."
      ],
      callout: {
        title: "Results and process are not identical",
        body:
          "A win does not prove a bet had positive EV, and a loss does not prove it had negative EV. Evaluate the quality of the probability and price decision separately from the final score.",
        tone: "warning",
      },
    },
    {
      id: "worked-example",
      heading: "A Worked Expected Value Example",
      paragraphs: [
        "Assume a sportsbook offers decimal odds of 2.30 on a selection. The break-even probability is 1 ÷ 2.30, or about 43.48%. Your independent analysis estimates the selection at 47%.",
        "The EV per unit is 0.47 × 2.30 − 1 = +0.081, or +8.1%. Under the 47% estimate, repeated bets at the same probability-price relationship would theoretically return 1.081 units for each unit staked on average.",
        "Now test the sensitivity. If the true probability were only 44%, EV would be 0.44 × 2.30 − 1 = +1.2%. At 43%, EV becomes −1.1%. The conclusion changes with a relatively small adjustment to the probability.",
        "This sensitivity illustrates why responsible interpretation matters. The headline +8.1% number is not enough. You also need to understand how confident you are in the 47% estimate and whether the quoted price is still available."
      ],
      bullets: [
        "Odds: 2.30",
        "Break-even probability: approximately 43.48%",
        "Estimated probability: 47%",
        "Estimated EV: +8.1%",
        "At 44% probability: +1.2% EV",
        "At 43% probability: −1.1% EV",
      ],
    },
    {
      id: "matchsignal",
      heading: "How Expected Value Relates to MatchSignal Value Edge",
      paragraphs: [
        "MatchSignal uses market prices, bookmaker samples, and probability-based analysis to provide context around a selection. The platform's Value Edge field is designed to highlight a positive difference between the available market price and the probability-based assessment used by MatchSignal.",
        "This should be interpreted as an analytical signal rather than a guaranteed expected return. Market prices can move, probability estimates contain uncertainty, and the displayed signal reflects the data and model assumptions available at the time of analysis.",
        "Best Odds shows the strongest available partner price identified for the displayed selection, Market Avg summarizes sampled market pricing, Fair Probability is an analytical estimate, and Books Sampled indicates how many bookmaker sources contributed to the relevant market sample.",
        "The correct interpretation of a Value Edge is therefore not 'this bet will win.' It is closer to 'under the current probability and price assumptions, this selection may be priced more favorably than the model's estimate would suggest.'"
      ],
      callout: {
        title: "A signal is not a guarantee",
        body:
          "MatchSignal's Value Edge describes a model-based relationship between probability and price. It does not guarantee a positive result or eliminate sports variance.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "A Practical EV Checklist",
      paragraphs: [
        "Before describing a bet as positive expected value, verify each component of the calculation. This helps prevent a mathematically correct formula from being fed unreliable inputs."
      ],
      bullets: [
        "Identify the exact market and selection.",
        "Use the current available odds, not an outdated price.",
        "Convert the price to its break-even implied probability.",
        "Estimate the outcome probability independently or with a clearly defined model.",
        "Check whether bookmaker margin affects the market comparison.",
        "Calculate EV from probability and price.",
        "Test how the result changes if the probability estimate is slightly lower.",
        "Compare equivalent prices across sportsbooks where available.",
        "Account for uncertainty and variance.",
        "Use disciplined stake sizing and never treat EV as a guarantee.",
      ],
    },
  ],
  relatedGuides: [
    "how-betting-odds-work",
    "implied-probability",
    "bookmaker-margin-overround",
    "how-to-compare-betting-odds",
    "matchsignal-value-edge",
    "variance-sports-betting",
  ],
  responsibleGamblingNote:
    "Expected value is a mathematical framework, not a guarantee of profit. Probability estimates can be wrong, market prices change, and short-term results can vary substantially from theoretical expectations. Only bet amounts you can afford to lose, use predetermined limits, avoid chasing losses, and treat betting analysis as information rather than certainty.",
};

export default guide;
