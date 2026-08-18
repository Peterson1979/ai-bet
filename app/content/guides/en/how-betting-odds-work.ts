import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "how-betting-odds-work",
  locale: "en",
  title: "How Betting Odds Actually Work",
  category: "odds-probability",
  status: "published",
  description:
    "Learn what betting odds represent, how they relate to probability, why bookmaker prices include a margin, and how to compare odds without confusing price with prediction.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Betting odds are prices. They tell you how much a successful bet can return, but they also encode the market's view of how likely an outcome is. Understanding both sides of that relationship is essential: odds are not a guarantee, and the shortest price is not automatically the best bet. This guide explains decimal odds, implied probability, bookmaker margin, market movement, and why comparing prices matters.",
  keyTakeaways: [
    "Decimal odds show total return per unit staked, including the original stake.",
    "Implied probability is calculated from decimal odds as 1 divided by the odds.",
    "Bookmaker prices usually include a margin, so the implied probabilities across all outcomes can add to more than 100%.",
    "A shorter price means a higher implied probability, not a certain outcome.",
    "The same selection can have different odds at different sportsbooks, so price comparison directly affects potential return.",
    "Odds can move as new information, market activity, and bookmaker risk management change the price.",
  ],
  sections: [
    {
      id: "odds-are-prices",
      heading: "Betting Odds Are Prices, Not Predictions",
      paragraphs: [
        "The simplest way to understand betting odds is to treat them as the price of a possible outcome. In a football match, a bookmaker may quote one price for the home team, another for the draw, and another for the away team. Those prices determine the return if the selected outcome wins.",
        "Odds also contain probability information. A lower decimal price corresponds to a higher implied probability, while a higher price corresponds to a lower implied probability. That does not mean the bookmaker knows what will happen. It means the market is assigning different prices to uncertain outcomes.",
        "This distinction matters because a prediction and a price answer different questions. A prediction asks which outcome is more likely. A price asks what return is being offered for taking that risk. A team can be the most likely winner and still be unattractive at a sufficiently short price."
      ],
      callout: {
        title: "Core idea",
        body:
          "A strong favorite can still lose. Odds express a market price for uncertainty; they do not remove the uncertainty.",
        tone: "info",
      },
    },
    {
      id: "decimal-odds",
      heading: "How Decimal Odds Work",
      paragraphs: [
        "MatchSignal uses decimal odds because they make returns and probability conversion straightforward. Decimal odds show the total amount returned for each unit staked when the bet wins. The total return includes the original stake.",
        "For example, at decimal odds of 2.00, a stake of 10 units returns 20 units if successful: 10 units of profit plus the original 10-unit stake. At odds of 1.50, the same 10-unit stake returns 15 units in total. At odds of 3.00, it returns 30 units.",
        "The basic relationship is simple: total return equals stake multiplied by decimal odds. Profit equals total return minus the original stake."
      ],
      bullets: [
        "10 units at 1.50 → 15 units total return, 5 units profit.",
        "10 units at 2.00 → 20 units total return, 10 units profit.",
        "10 units at 3.00 → 30 units total return, 20 units profit.",
      ],
      callout: {
        title: "Example",
        body:
          "Higher odds increase the potential return, but they normally correspond to outcomes the market considers less likely.",
        tone: "example",
      },
    },
    {
      id: "implied-probability",
      heading: "Turning Odds Into Implied Probability",
      paragraphs: [
        "Decimal odds can be converted into implied probability with a simple formula: implied probability = 1 ÷ decimal odds. Multiply the result by 100 to express it as a percentage.",
        "Odds of 2.00 imply 50%. Odds of 1.50 imply about 66.7%. Odds of 4.00 imply 25%. This gives you a common probability scale for comparing prices that may initially look very different.",
        "However, bookmaker implied probability is not the same thing as a precise objective probability. The price may include a bookmaker margin, react to market demand, or change as information becomes available. It is better understood as the probability embedded in the quoted price."
      ],
      bullets: [
        "1.50 → 1 ÷ 1.50 = 66.7%",
        "2.00 → 1 ÷ 2.00 = 50.0%",
        "2.50 → 1 ÷ 2.50 = 40.0%",
        "4.00 → 1 ÷ 4.00 = 25.0%",
      ],
      callout: {
        title: "Do not read 66.7% as certainty",
        body:
          "An implied probability is a translation of a price. Real-world sports outcomes remain uncertain, even when the market assigns a high probability.",
        tone: "warning",
      },
    },
    {
      id: "bookmaker-margin",
      heading: "Why the Probabilities Can Add Up to More Than 100%",
      paragraphs: [
        "If you convert every outcome in a bookmaker market into implied probability and add them together, the total will often exceed 100%. The amount above 100% is commonly called the bookmaker margin or overround.",
        "Consider a simplified two-outcome market where both sides are priced at 1.91. Each price implies about 52.36%. Added together, the market totals about 104.72%. The difference between 104.72% and 100% represents the overround in that simplified market.",
        "The margin means the raw implied probabilities are not automatically fair probabilities. Analysts can estimate a no-margin probability by normalizing the probabilities across the market, but this remains an estimate based on the available prices rather than a guarantee of the true chance of each outcome."
      ],
      callout: {
        title: "Why this matters",
        body:
          "Two markets can express similar expectations while offering different margins. A lower-margin market generally gives bettors more competitive pricing, all else equal.",
        tone: "info",
      },
    },
    {
      id: "favorite-underdog",
      heading: "Favorites, Underdogs, and What the Price Really Says",
      paragraphs: [
        "A favorite is simply the outcome with the shorter price in the relevant market. An underdog has a longer price. These labels describe relative market expectations, not guaranteed quality or eventual results.",
        "Suppose Team A is offered at 1.40 and Team B at 7.00 in a market that also includes a draw. Team A is the favorite because its price implies a much higher probability than Team B's price. But whether either price is attractive depends on how the quoted odds compare with a reasonable probability estimate.",
        "This is where value analysis differs from winner selection. Choosing the team most likely to win is not necessarily the same as finding the most favorable price. A 75% chance offered at odds that require an 80% break-even rate would not represent positive expected value under that probability estimate."
      ],
    },
    {
      id: "compare-odds",
      heading: "Why Comparing Odds Matters",
      paragraphs: [
        "Sportsbooks do not always offer identical prices. One operator may quote 1.85 while another quotes 1.95 for the same selection and market. The underlying event has not changed, but your potential return has.",
        "For a 100-unit stake, 1.85 returns 185 units if successful, while 1.95 returns 195 units. Over a large number of bets, repeatedly accepting worse prices can materially reduce returns even when the selections themselves are identical.",
        "Price comparison is therefore one of the few aspects of betting that does not require predicting the match more accurately. If the market, selection, settlement rules, and timing are genuinely comparable, the higher available price gives a better potential return for the same stake."
      ],
      callout: {
        title: "Compare like with like",
        body:
          "Check that the market definition, line, settlement rules, and event are the same before treating two quoted odds as directly comparable.",
        tone: "warning",
      },
    },
    {
      id: "why-odds-move",
      heading: "Why Odds Move Before a Match",
      paragraphs: [
        "Odds are not fixed assessments. They can change from the moment a market opens until betting closes. New team information, injuries, confirmed lineups, weather, scheduling changes, market activity, and broader price discovery can all contribute to movement.",
        "Bookmakers may also adjust prices as part of risk management or in response to movement elsewhere in the market. As a result, an odds move does not always reveal one simple cause. A shortening price can reflect meaningful new information, market pressure, or a combination of factors.",
        "This is why historical screenshots of a price should not be confused with current availability. A useful analysis should identify the actual price being evaluated and, where possible, compare it with current market alternatives."
      ],
    },
    {
      id: "value-and-break-even",
      heading: "Odds, Break-Even Probability, and Value",
      paragraphs: [
        "Every price implies a break-even probability before considering transaction details or model uncertainty. At decimal odds of 2.00, the implied break-even rate is 50%. At 1.80, it is about 55.6%. At 2.50, it is 40%.",
        "If your probability estimate is meaningfully higher than the probability implied by the offered price, the bet may have positive expected value under that estimate. If your estimate is lower, the price may be unfavorable. The quality of the conclusion depends entirely on the quality and calibration of the probability estimate.",
        "For example, if odds of 2.20 imply about 45.5% and an analysis estimates the outcome at 50%, there is a theoretical positive difference between estimated probability and market-implied probability. That difference is not a promise of profit. Even a correctly identified positive-expectation opportunity can lose, and model estimates can be wrong."
      ],
      callout: {
        title: "Value is probabilistic",
        body:
          "Positive expected value describes an estimated long-run relationship between probability and price. It does not mean an individual bet is expected to win with certainty.",
        tone: "warning",
      },
    },
    {
      id: "matchsignal-context",
      heading: "How MatchSignal Uses Odds",
      paragraphs: [
        "MatchSignal compares available bookmaker prices and market data, then combines that information with AI-generated match context. On a MatchSignal card, Best Odds refers to the strongest available partner price identified for the displayed selection, while Market Avg summarizes the sampled market prices used in the comparison.",
        "Fair Probability is an analytical estimate rather than a bookmaker quote. Value Edge is used to describe the difference between the offered market price and MatchSignal's probability-based assessment. Books Sampled indicates how many bookmaker sources contributed to the relevant market sample.",
        "These fields are designed to make the pricing context easier to inspect. They should not be treated as guarantees, financial advice, or certainty about a sporting result. Model assumptions, market changes, data quality, and ordinary sports variance can all affect the outcome."
      ],
    },
    {
      id: "practical-checklist",
      heading: "A Practical Checklist for Reading Any Betting Market",
      paragraphs: [
        "When you open a betting market, separate the analysis into price, probability, and uncertainty. Doing so prevents several common mistakes, such as assuming the favorite must win or treating a high potential payout as evidence that a bet is attractive."
      ],
      bullets: [
        "Identify the exact market and selection.",
        "Read the decimal odds as a price and calculate the implied probability.",
        "Check whether the market contains bookmaker margin.",
        "Compare the same selection across multiple sportsbooks where available.",
        "Separate your probability estimate from the bookmaker's quoted probability.",
        "Do not treat an odds move as proof that one side will win.",
        "Consider uncertainty, variance, and stake size before making any decision."
      ],
    },
  ],
  relatedGuides: [
    "implied-probability",
    "bookmaker-margin-overround",
    "how-to-compare-betting-odds",
    "expected-value-sports-betting"
  ],
  responsibleGamblingNote:
    "Betting involves financial risk and outcomes are uncertain. Odds and probability estimates cannot guarantee a result. Use stakes you can afford to lose, avoid chasing losses, and treat betting analysis as information rather than a promise of profit.",
};

export default guide;
