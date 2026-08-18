import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "bookmaker-margin-overround",
  locale: "en",
  title: "What Is Bookmaker Margin / Overround?",
  category: "odds-probability",
  status: "published",
  description:
    "Learn what bookmaker margin and overround mean, how to calculate them from betting odds, why implied probabilities often add to more than 100%, and how margin affects price comparison and value analysis.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Bookmaker margin, often called overround or vig, is the pricing cushion built into many betting markets. If every outcome in a perfectly fair market were converted into probability, the probabilities would add to 100%. In real sportsbook markets, the implied probabilities derived from quoted odds often add to more than 100%. That excess is the overround. Understanding it matters because raw bookmaker probabilities are not automatically fair probabilities, and two sportsbooks can express similar views of an event while offering materially different prices.",
  keyTakeaways: [
    "Overround is the amount by which the raw implied probabilities of all mutually exclusive outcomes exceed 100%.",
    "A two-way market priced at 1.91 on both sides implies about 104.72% in total, corresponding to an overround of about 4.72 percentage points.",
    "Raw bookmaker implied probability is a price-derived number, not automatically a fair probability estimate.",
    "Lower overround generally means more competitive pricing, all else equal.",
    "Margin may not be distributed evenly across all outcomes, so simple proportional normalization is only an approximation.",
    "The actual odds available to the user determine break-even probability and therefore remain central to expected-value analysis.",
  ],
  sections: [
    {
      id: "definition",
      heading: "What Bookmaker Margin Means",
      paragraphs: [
        "A bookmaker does not normally create a market by simply publishing perfectly fair probabilities. Instead, prices are typically set so that the combined implied probabilities exceed 100%. The excess above 100% is commonly called the overround, bookmaker margin, or vig.",
        "For example, imagine a theoretical two-outcome event in which both sides are offered at decimal odds of 1.91. Each price implies a probability of approximately 52.36%. Adding the two gives about 104.72%. The amount above 100%, approximately 4.72 percentage points, is the market's overround.",
        "This does not mean the bookmaker is guaranteed to earn exactly 4.72% on every market. Real outcomes, bet distribution, price movement, promotional activity, limits, trading decisions, and customer behavior all affect realized results. Overround is best understood as a property of the quoted price structure rather than a guaranteed profit rate."
      ],
      callout: {
        title: "Price structure, not guaranteed profit",
        body:
          "Overround describes how a market is priced. It should not be interpreted as the bookmaker's guaranteed profit on an individual event.",
        tone: "warning",
      },
    },
    {
      id: "calculation",
      heading: "How to Calculate Overround From Decimal Odds",
      paragraphs: [
        "The calculation starts by converting each outcome's decimal odds into implied probability. For decimal odds, implied probability equals 1 divided by the odds. Add the implied probabilities for all mutually exclusive outcomes in the market.",
        "If the total is 100%, the market is mathematically margin-free before considering any other practical factors. If the total is 105%, the overround is 5 percentage points. If the total is 108%, the overround is 8 percentage points.",
        "The formula can be written as: overround = sum of all raw implied probabilities − 100%."
      ],
      bullets: [
        "Convert each decimal price using 1 ÷ odds.",
        "Add the implied probabilities for all mutually exclusive outcomes.",
        "Subtract 100 percentage points from the total.",
        "The remaining amount is the quoted market overround.",
      ],
      callout: {
        title: "Simple example",
        body:
          "At 1.91 and 1.91, each side implies about 52.36%. The total is about 104.72%, so the overround is about 4.72 percentage points.",
        tone: "example",
      },
    },
    {
      id: "three-way",
      heading: "Overround in a Three-Way Football Market",
      paragraphs: [
        "Three-way football markets provide a useful example because home win, draw, and away win are mutually exclusive outcomes. Suppose the prices are 2.10 for the home team, 3.40 for the draw, and 3.60 for the away team.",
        "The implied probabilities are approximately 47.62%, 29.41%, and 27.78%. Added together, they total about 104.81%. The resulting overround is therefore approximately 4.81 percentage points.",
        "The three prices do not imply that the event somehow has 104.81% total probability in reality. The excess appears because the quoted prices include margin and other trading considerations."
      ],
      bullets: [
        "Home 2.10 → approximately 47.62%",
        "Draw 3.40 → approximately 29.41%",
        "Away 3.60 → approximately 27.78%",
        "Total → approximately 104.81%",
        "Overround → approximately 4.81 percentage points",
      ],
    },
    {
      id: "raw-vs-fair",
      heading: "Raw Implied Probability vs Fair Probability",
      paragraphs: [
        "A raw implied probability comes directly from a quoted price. If a sportsbook offers decimal odds of 2.00, the raw implied probability is 50%. That number describes the break-even threshold embedded in the available price.",
        "A fair or no-margin probability estimate is different. It attempts to remove the effect of the market's overround so that the probabilities across mutually exclusive outcomes add to 100%.",
        "This distinction is important because calling every raw sportsbook probability a fair probability can exaggerate the market's apparent confidence. In a market totaling 105%, the bookmaker's raw implied probabilities collectively describe more than 100% probability, which is impossible for mutually exclusive exhaustive outcomes."
      ],
      callout: {
        title: "Do not mix the two concepts",
        body:
          "Raw implied probability comes from the price you can actually take. Fair probability is an analytical estimate after adjusting for margin.",
        tone: "warning",
      },
    },
    {
      id: "normalization",
      heading: "A Simple Way to Remove the Overround",
      paragraphs: [
        "One common way to estimate no-margin probabilities is proportional normalization. Divide each raw implied probability by the sum of all raw implied probabilities. The adjusted probabilities will then add to 100%.",
        "Suppose a two-way market has raw implied probabilities of 55% and 50%, for a total of 105%. Proportional normalization gives approximately 52.38% for the first side and 47.62% for the second.",
        "This method is simple and useful for market comparison, but it assumes the margin is distributed proportionally across outcomes. In real markets, that assumption may be imperfect. Bookmakers can shade prices differently depending on expected demand, information, liability, market depth, or the characteristics of individual outcomes.",
        "For that reason, a normalized probability should be described as a no-margin market estimate rather than the objectively true probability of the event."
      ],
      bullets: [
        "Raw probabilities: 55% and 50%.",
        "Market total: 105%.",
        "Normalized first side: 55 ÷ 105 ≈ 52.38%.",
        "Normalized second side: 50 ÷ 105 ≈ 47.62%.",
        "Normalized total: 100%.",
      ],
      callout: {
        title: "Normalization is an estimate",
        body:
          "Removing the overround mathematically does not reveal a perfect true probability. It creates a cleaner market-based benchmark.",
        tone: "info",
      },
    },
    {
      id: "uneven-margin",
      heading: "Why Margin Is Not Always Distributed Evenly",
      paragraphs: [
        "It is tempting to imagine that a sportsbook simply adds the same percentage of margin to every selection. Real market making is often more complex. Some outcomes may attract more public demand, some may be more difficult to price, and some markets may have lower liquidity or higher uncertainty.",
        "A bookmaker can therefore shade one side more aggressively than another. In longshot markets, the relationship can become especially uneven: high-odds outcomes may carry a different effective margin than short-priced favorites.",
        "This is one reason why proportional no-vig calculations should not be treated as exact fair probabilities. More advanced margin-removal methods exist, but all rely on assumptions about how the overround is distributed."
      ],
      callout: {
        title: "The overround is not necessarily symmetrical",
        body:
          "Two outcomes can contribute differently to a bookmaker's total margin. A simple proportional adjustment is useful, but it is still a model.",
        tone: "warning",
      },
    },
    {
      id: "price-comparison",
      heading: "Why Lower Margin Usually Means Better Prices",
      paragraphs: [
        "If two sportsbooks have similar assessments of an event but one operates with a lower overround, the lower-margin market will generally offer more competitive prices to the bettor.",
        "Consider two simple two-way markets. Sportsbook A prices both sides at 1.91, producing an overround of about 4.72%. Sportsbook B prices both sides at 1.96, producing a total implied probability of about 102.04% and an overround of about 2.04%.",
        "For a winning one-unit bet, 1.96 returns more than 1.91. More importantly, the higher price reduces the break-even probability from about 52.36% to about 51.02%. That difference can materially affect expected value over repeated bets.",
        "This is why comparing current odds across equivalent markets can be useful even without making a better prediction. The underlying event is unchanged, but the available price can improve."
      ],
      bullets: [
        "1.91 / 1.91 → approximately 4.72% overround.",
        "1.96 / 1.96 → approximately 2.04% overround.",
        "Higher equivalent odds reduce the required break-even probability.",
        "Always confirm that market rules and settlement conditions are comparable.",
      ],
    },
    {
      id: "margin-and-ev",
      heading: "How Bookmaker Margin Affects Expected Value",
      paragraphs: [
        "Expected value depends on the probability of an outcome and the actual price available. Because bookmaker margin generally shortens prices relative to a theoretical no-margin market, margin raises the success rate required to break even.",
        "Suppose you estimate an outcome at 52%. At decimal odds of 2.00, the theoretical EV is 0.52 × 2.00 − 1 = +4%. At 1.90, the EV becomes 0.52 × 1.90 − 1 = −1.2%. The probability estimate is unchanged, but the shorter price changes the conclusion.",
        "This illustrates why a good prediction is not sufficient by itself. Price determines whether the probability estimate translates into positive, neutral, or negative expected value."
      ],
      callout: {
        title: "Margin changes the threshold",
        body:
          "A shorter price requires a higher win rate to break even. That is why price quality matters independently of prediction quality.",
        tone: "info",
      },
    },
    {
      id: "market-types",
      heading: "Margin Can Differ Across Sports and Market Types",
      paragraphs: [
        "Bookmaker margin is not fixed across every sport or market. Major high-liquidity events may have relatively competitive pricing, while niche leagues, derivative markets, props, or low-liquidity events can have wider margins.",
        "Even within the same match, the main moneyline or match-winner market may have a different overround from totals, handicaps, player props, or correct-score markets. Markets with many possible outcomes can also accumulate substantial total overround.",
        "For that reason, comparing a single margin number across unrelated market types can be misleading. The most useful comparison is usually between sportsbooks quoting the same market on the same event at approximately the same time."
      ],
    },
    {
      id: "changing-margin",
      heading: "Why Overround Can Change Before a Match",
      paragraphs: [
        "Markets are dynamic. As a match approaches, new information may arrive, liquidity may increase, competing sportsbooks may move prices, and bookmakers may alter their risk exposure. The total market overround can therefore change over time.",
        "In some high-profile events, pricing may become more competitive as the market matures. In other situations, uncertainty or operational decisions can lead to wider prices. There is no universal rule that margin must always fall as kickoff approaches.",
        "A margin calculation is therefore a snapshot based on the prices used at that moment. Historical overround and current overround should not be treated as interchangeable."
      ],
    },
    {
      id: "common-mistakes",
      heading: "Common Mistakes When Interpreting Bookmaker Margin",
      paragraphs: [
        "One common mistake is to treat overround as the bookmaker's guaranteed percentage profit. It is not. Another is to assume raw implied probabilities are fair probabilities. They are price-derived break-even thresholds and commonly include margin.",
        "A third mistake is to compare overround between markets with different outcome structures without context. A three-way match market, a two-way totals market, and a correct-score market are not directly comparable simply because each produces a single margin percentage.",
        "Finally, removing the margin does not remove uncertainty. A no-vig market estimate can still be wrong, stale, or incomplete. It is a useful analytical benchmark, not a guarantee of the event's true probability distribution."
      ],
      bullets: [
        "Do not interpret overround as guaranteed bookmaker profit.",
        "Do not call raw implied probabilities automatically fair.",
        "Do not assume margin is distributed evenly across outcomes.",
        "Do not compare unrelated market types without context.",
        "Do not treat no-margin probabilities as certain or objectively true.",
      ],
    },
    {
      id: "matchsignal",
      heading: "How Margin Fits Into MatchSignal Analysis",
      paragraphs: [
        "MatchSignal compares bookmaker prices and market data to provide context around current selections. Market Avg summarizes sampled market pricing, while Fair Probability is an analytical probability estimate rather than a raw sportsbook implied percentage.",
        "Value Edge is intended to describe the relationship between the available market price and MatchSignal's probability-based assessment. Because bookmaker prices can include margin, a useful analysis should distinguish between the raw price available to the user and any no-margin or model-based probability estimate.",
        "Books Sampled indicates how many bookmaker sources contributed to the relevant market sample. A broader sample can provide more context around market pricing, but it does not remove uncertainty or guarantee that the resulting estimate is correct.",
        "Best Odds reflects the strongest available partner price identified for the displayed selection. Since the actual execution price determines break-even probability, even a modest difference between sportsbooks can affect the value calculation."
      ],
      callout: {
        title: "Market price and analytical probability are different",
        body:
          "MatchSignal separates available pricing from probability-based analysis so users can inspect the relationship rather than treating sportsbook odds as certainty.",
        tone: "info",
      },
    },
    {
      id: "checklist",
      heading: "A Practical Overround Checklist",
      paragraphs: [
        "When reviewing bookmaker margin, use the following sequence to avoid the most common interpretation errors."
      ],
      bullets: [
        "Identify all mutually exclusive outcomes in the exact market.",
        "Convert every quoted decimal price to implied probability.",
        "Add the raw implied probabilities.",
        "Subtract 100% to calculate the market overround.",
        "If needed, normalize the probabilities to create a simple no-margin benchmark.",
        "Remember that proportional normalization is an assumption, not a perfect truth.",
        "Compare equivalent markets across sportsbooks at similar times.",
        "Use the actual available odds when calculating break-even probability and EV.",
        "Treat lower overround as a pricing advantage, not as a guarantee of better predictions.",
      ],
    },
  ],
  relatedGuides: [
    "how-betting-odds-work",
    "implied-probability",
    "expected-value-sports-betting",
    "how-to-compare-betting-odds",
    "why-betting-odds-move",
  ],
  responsibleGamblingNote:
    "Understanding bookmaker margin can help you evaluate prices more clearly, but lower margin or better odds do not remove the financial risk of betting. Outcomes remain uncertain, probability estimates can be wrong, and losses can occur even when a price appears favorable. Only bet amounts you can afford to lose, use predetermined limits, and never chase losses.",
};

export default guide;
