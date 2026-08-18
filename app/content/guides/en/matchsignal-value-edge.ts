import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "matchsignal-value-edge",
  locale: "en",
  title: "How MatchSignal Calculates Value Edge",
  category: "value-analysis",
  status: "published",
  description:
    "Learn how MatchSignal calculates and interprets Value Edge, how Fair Probability and offered decimal odds combine into estimated value, why Value Edge differs from probability-point valueDiff, and why a positive signal is not a guarantee of profit.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "MatchSignal's Value Edge is designed to show how favorable an available price appears relative to the platform's probability-based assessment. On the MatchCard, Value Edge is represented by the estimatedValuePct field. When MatchSignal has a Fair Probability and an available partner price, the mathematical relationship is the same expected-value formula used throughout betting analysis: estimated value percentage equals Fair Probability as a decimal multiplied by offered decimal odds, minus one, then multiplied by 100. The production pipeline can also accept an explicit AI-generated estimatedValuePct when that field is returned by the analysis layer; otherwise it falls back to calculating the value from Fair Probability and the available partner odds. This makes Value Edge a model-and-price signal, not a promise about the result of the next match.",
  keyTakeaways: [
    "The MatchCard's Value Edge display uses the estimatedValuePct field.",
    "The calculation path from probability and price is: ((Fair Probability / 100) × offered decimal odds − 1) × 100.",
    "A positive Value Edge means the price is favorable relative to the Fair Probability estimate used by MatchSignal.",
    "A zero Value Edge means the offered odds approximately match the break-even price implied by the Fair Probability.",
    "A negative Value Edge means the offered price is shorter than the probability estimate would require for break-even.",
    "MatchSignal's valueDiff is a different metric: it is a probability-point gap, not the same thing as estimated return percentage.",
    "The daily analysis pipeline can preserve an explicit AI estimatedValuePct; if it is absent, MatchSignal can calculate the value from Fair Probability and partner odds.",
    "A positive Value Edge is an analytical estimate and does not guarantee a winning bet or realized profit.",
  ],
  sections: [
    {
      id: "what-value-edge-is",
      heading: "What MatchSignal Means by Value Edge",
      paragraphs: [
        "On a MatchSignal MatchCard, the label Value Edge is the user-facing presentation of estimatedValuePct. The number is intended to describe the relationship between MatchSignal's Fair Probability for the displayed selection and the price available for that selection.",
        "The basic question is not simply whether MatchSignal thinks an outcome is likely. It is whether the offered odds are high enough relative to that probability estimate.",
        "This distinction matters because the same prediction can be attractive at one price and unattractive at another. A selection assessed at 55% is not automatically valuable. At 2.00 odds it has a positive theoretical value; at 1.70 it does not.",
        "Value Edge therefore belongs to the pricing layer of the analysis. It combines a probability judgment with the price that can be observed in the market."
      ],
      callout: {
        title: "Value Edge is a price-and-probability metric",
        body:
          "It should not be interpreted as MatchSignal saying that a team is a certain winner. The same selection can have different Value Edge at different odds.",
        tone: "info",
      },
    },
    {
      id: "formula",
      heading: "The Core Value Edge Formula",
      paragraphs: [
        "When MatchSignal calculates estimated value from Fair Probability and offered odds, the formula is: Value Edge % = ((Fair Probability / 100) × Offered Decimal Odds − 1) × 100.",
        "This is the standard expected-return relationship for a simple win-or-lose outcome expressed as a percentage of one unit staked.",
        "The code converts Fair Probability from a percentage into a decimal, multiplies it by the offered decimal odds, subtracts 1, and converts the result back into percentage terms.",
        "The resulting number answers a theoretical question: if the Fair Probability estimate were correct and the same probability-price relationship could be repeated many times, what average return relative to stake would that relationship imply?"
      ],
      bullets: [
        "Convert Fair Probability from percent to decimal.",
        "Multiply by the offered decimal odds.",
        "Subtract 1.",
        "Multiply by 100 to express the result as a percentage.",
      ],
      callout: {
        title: "Formula",
        body:
          "Value Edge % = ((Fair Probability / 100) × Offered Odds − 1) × 100.",
        tone: "example",
      },
    },
    {
      id: "worked-example",
      heading: "A Worked MatchSignal Value Edge Example",
      paragraphs: [
        "Suppose MatchSignal assigns a Fair Probability of 55% to a selection and the offered partner odds are 2.00.",
        "Convert 55% to 0.55. Multiply 0.55 by 2.00 to get 1.10. Subtract 1 to get 0.10. Multiply by 100 and the estimated Value Edge is +10%.",
        "Now keep the same Fair Probability but change the offered price to 1.80. The calculation becomes 0.55 × 1.80 − 1 = −0.01, or approximately −1%.",
        "Nothing about the Fair Probability changed. Only the available price changed. That is why price comparison can materially change the displayed value relationship."
      ],
      bullets: [
        "Fair Probability: 55%.",
        "Offered Odds: 2.00.",
        "Calculation: 0.55 × 2.00 − 1 = 0.10.",
        "Value Edge: +10%.",
        "At 1.80 odds with the same 55% probability: approximately −1%.",
      ],
    },
    {
      id: "break-even",
      heading: "Value Edge and Break-Even Probability",
      paragraphs: [
        "The same relationship can be understood through break-even probability. Decimal odds of 2.00 require a 50% win rate to break even before practical frictions. Odds of 1.80 require about 55.56%.",
        "If MatchSignal's Fair Probability is above the break-even probability implied by the available price, the calculated Value Edge is positive. If Fair Probability is below that threshold, Value Edge is negative.",
        "This is why a positive Value Edge does not simply mean 'MatchSignal likes the team.' It means the probability estimate is high enough relative to the offered price to imply positive theoretical value.",
        "A selection can have a high Fair Probability and still have negative Value Edge if the market price is too short."
      ],
      callout: {
        title: "Probability alone is not value",
        body:
          "Value appears only when the probability estimate is compared with the price actually offered.",
        tone: "warning",
      },
    },
    {
      id: "fair-probability",
      heading: "Where Fair Probability Fits Into the Calculation",
      paragraphs: [
        "Fair Probability is the probability input used in the value relationship. In the daily prediction pipeline, an AI-provided Fair Probability can be used directly after numeric validation and bounding.",
        "If an explicit AI Fair Probability is unavailable, the pipeline contains fallback logic that can derive a probability estimate from market information such as market consensus and the implied probability associated with the price.",
        "This means Fair Probability is not simply another label for the raw implied probability of one bookmaker's odds. It is an analytical input used to evaluate the price.",
        "Because the probability estimate can be wrong or uncertain, the Value Edge derived from it also inherits that uncertainty."
      ],
      callout: {
        title: "The probability input matters more than decimal precision",
        body:
          "A perfectly calculated Value Edge can still be misleading if the Fair Probability estimate is inaccurate.",
        tone: "warning",
      },
    },
    {
      id: "explicit-ai-value",
      heading: "Why the Pipeline Can Use an Explicit AI Value Estimate",
      paragraphs: [
        "MatchSignal's daily analysis layer can return an explicit estimatedValuePct together with Fair Probability and other analytical fields.",
        "When a valid explicit estimatedValuePct is present, the daily pipeline preserves that value rather than automatically replacing it with a newly calculated value. When the explicit field is absent, the pipeline can calculate estimated value from Fair Probability and partner odds.",
        "This is important when interpreting the platform technically: Value Edge is not always produced by only one code path. It is a normalized analytical field with an AI-supplied path and a mathematical fallback path.",
        "The prompt layer also instructs the analysis to be conservative with Fair Probability and estimated value and to return null when the edge is unclear. That design is intended to avoid manufacturing numerical confidence when the available evidence does not support it."
      ],
      callout: {
        title: "Two paths, one displayed field",
        body:
          "The MatchCard displays estimatedValuePct as Value Edge whether the valid value came from the analysis layer or from the probability-and-odds fallback calculation.",
        tone: "info",
      },
    },
    {
      id: "value-diff",
      heading: "Value Edge Is Not the Same as valueDiff",
      paragraphs: [
        "MatchSignal also contains a valueDiff field. This is easy to confuse with Value Edge because both describe a gap between a probability assessment and a market price.",
        "The two metrics use different units. estimatedValuePct is an expected-return-style percentage based on probability multiplied by decimal odds. valueDiff is a difference in percentage points between Fair Probability and the implied probability associated with the relevant price.",
        "For example, if Fair Probability is 55% and the partner price implies 50%, valueDiff is +5 percentage points. At odds of 2.00, estimatedValuePct is +10%. Those numbers describe related concepts but they are not interchangeable.",
        "The MatchCard's Value Edge display uses estimatedValuePct. Treating valueDiff as if it were expected return would therefore misstate the meaning of the number."
      ],
      bullets: [
        "estimatedValuePct: return-style value percentage.",
        "valueDiff: probability-point difference.",
        "Both can be positive at the same time.",
        "Their numerical values do not need to match.",
      ],
      callout: {
        title: "Do not mix percentages and percentage points",
        body:
          "A +5 percentage-point probability gap is not the same metric as +5% estimated return.",
        tone: "warning",
      },
    },
    {
      id: "best-odds",
      heading: "Why Best Odds Matters to Value Edge",
      paragraphs: [
        "The price used in a value calculation directly changes the result. For the same Fair Probability, higher equivalent decimal odds produce a larger Value Edge.",
        "If Fair Probability is 52%, odds of 1.90 imply approximately −1.2% value, odds of 2.00 imply +4%, and odds of 2.10 imply +9.2%.",
        "This is why MatchSignal presents Best Odds alongside Value Edge. The strongest genuinely equivalent available price can materially improve the value relationship.",
        "The comparison still has to be like-for-like. A higher price on a different handicap, total, settlement rule, or market is not a valid replacement for the displayed selection."
      ],
      bullets: [
        "52% at 1.90 → approximately −1.2%.",
        "52% at 2.00 → approximately +4.0%.",
        "52% at 2.10 → approximately +9.2%.",
      ],
    },
    {
      id: "market-average",
      heading: "How Market Avg and Books Sampled Add Context",
      paragraphs: [
        "Value Edge is most useful when it is viewed with the other MatchCard fields rather than in isolation.",
        "Market Avg summarizes sampled bookmaker pricing, helping show whether the displayed offer differs from the wider market. Books Sampled provides context about how many bookmaker sources contributed to the relevant market sample.",
        "A stronger partner price relative to the sampled market can improve the user's available economics, but the number of books sampled does not itself prove that the Fair Probability is correct.",
        "These fields describe market context. They do not remove model error, bookmaker margin, stale prices, or ordinary sports variance."
      ],
    },
    {
      id: "fair-odds",
      heading: "Fair Odds Are the Price Version of Fair Probability",
      paragraphs: [
        "MatchSignal can also convert Fair Probability into Fair Odds. Conceptually, fair decimal odds equal 1 divided by the Fair Probability expressed as a decimal.",
        "A 50% Fair Probability corresponds to fair odds of 2.00. A 40% Fair Probability corresponds to 2.50. A 60% Fair Probability corresponds to about 1.67.",
        "This provides another way to read the Value Edge relationship. If the offered odds are meaningfully higher than the fair odds implied by the analytical probability, the price may represent positive estimated value.",
        "If the offered odds are lower than the fair odds, the price is demanding more probability than the estimate supports."
      ],
      bullets: [
        "50% Fair Probability → 2.00 Fair Odds.",
        "40% → 2.50.",
        "60% → approximately 1.67.",
      ],
    },
    {
      id: "positive-zero-negative",
      heading: "How to Read Positive, Zero, and Negative Value Edge",
      paragraphs: [
        "A positive Value Edge means the probability-and-price relationship implies a theoretical return above zero under the probability estimate being used.",
        "A Value Edge near zero means the offered price is close to the break-even price implied by Fair Probability.",
        "A negative Value Edge means the current offered price is shorter than the probability estimate supports.",
        "The sign is useful, but magnitude should not be treated as certainty. A displayed +6% signal can disappear if the Fair Probability was overestimated or if the available odds shorten."
      ],
      callout: {
        title: "Edge can disappear",
        body:
          "Value Edge is time-sensitive because odds move, and model-sensitive because Fair Probability is an estimate.",
        tone: "warning",
      },
    },
    {
      id: "rounding",
      heading: "Rounding and Display Precision",
      paragraphs: [
        "The value calculation is normalized for display precision rather than presented with unlimited decimals. This keeps MatchCards readable and avoids suggesting more precision than the interface can use.",
        "Users should not interpret a tenth or hundredth of a percentage point as a meaningful guarantee of superior forecasting accuracy.",
        "When the underlying uncertainty around Fair Probability is several percentage points, a tiny difference in displayed Value Edge may be economically less important than the model uncertainty itself."
      ],
    },
    {
      id: "ranking",
      heading: "Value Edge Is Also Used as a Quality Signal",
      paragraphs: [
        "Inside MatchSignal, estimatedValuePct is not only displayed to the user. The ranking logic also evaluates the value number alongside other information such as Fair Probability, bookmaker coverage, spread, consensus, and Risk Tier.",
        "This prevents the platform from treating a raw value number as the only quality criterion. A large apparent edge from a thin or inconsistent market deserves more caution than a similarly sized edge supported by broader market context.",
        "The exact quality decision is therefore multi-factor even though the Value Edge calculation itself has a clear probability-and-price interpretation."
      ],
      callout: {
        title: "Value Edge is one signal, not the whole ranking",
        body:
          "MatchSignal also considers market depth, probability context, spread, and risk rather than ranking selections solely by the largest displayed edge.",
        tone: "info",
      },
    },
    {
      id: "not-guarantee",
      heading: "Why a Positive Value Edge Does Not Guarantee Profit",
      paragraphs: [
        "The formula describes expectation under an estimated probability. It does not determine what happens in one sporting event.",
        "A +8% Value Edge can lose immediately. A negative-value selection can win. The difference becomes meaningful only as part of repeated decision-making under sufficiently accurate probability estimates.",
        "Model error is another source of risk. If MatchSignal estimates an outcome at 55% but the true chance is lower, the displayed edge can be overstated.",
        "Market movement also matters. If the odds that produced a positive edge are no longer available, the value should be recalculated using the current price."
      ],
      callout: {
        title: "Value Edge is not a profit forecast",
        body:
          "It is a model-based estimate of price quality under uncertainty, not a promise about the next bet or future bankroll growth.",
        tone: "warning",
      },
    },
    {
      id: "example-sensitivity",
      heading: "Sensitivity: Small Probability Changes Can Matter",
      paragraphs: [
        "Suppose the offered odds are 2.10. At a 50% Fair Probability, Value Edge is +5%. At 48%, it is approximately +0.8%. At 47%, it becomes approximately −1.3%.",
        "Only a three-percentage-point change in the probability estimate moves the same price from a positive signal to a negative one.",
        "This demonstrates why model uncertainty should be considered alongside the headline Value Edge. The smaller the edge, the easier it is for normal estimation error to reverse the conclusion.",
        "For practical interpretation, a user should ask not only 'What is the Value Edge?' but also 'How robust is this edge if the Fair Probability is slightly wrong?'"
      ],
      bullets: [
        "Odds 2.10, Fair Probability 50% → +5.0%.",
        "Odds 2.10, Fair Probability 48% → approximately +0.8%.",
        "Odds 2.10, Fair Probability 47% → approximately −1.3%.",
      ],
    },
    {
      id: "checklist",
      heading: "How to Read a MatchSignal Value Edge",
      paragraphs: [
        "A Value Edge should be read together with the rest of the MatchCard and with the limitations of probabilistic analysis in mind."
      ],
      bullets: [
        "Confirm the exact market and selection.",
        "Read Fair Probability as an estimate, not certainty.",
        "Check the Best Odds currently displayed.",
        "Use the probability-and-price relationship to understand the Value Edge.",
        "Do not confuse Value Edge with the valueDiff probability-point gap.",
        "Review Market Avg and Books Sampled for market context.",
        "Remember that odds can change after the card is generated.",
        "Treat small edges cautiously when probability uncertainty is high.",
        "Do not use a larger Value Edge as automatic stake-sizing advice.",
        "Do not interpret a positive Value Edge as a guaranteed winning outcome.",
      ],
    },
  ],
  relatedGuides: [
    "expected-value-sports-betting",
    "implied-probability",
    "how-to-compare-betting-odds",
    "bookmaker-margin-overround",
    "why-betting-odds-move",
    "ai-sports-betting-predictions",
  ],
  responsibleGamblingNote:
    "MatchSignal Value Edge is an analytical estimate based on probability and price, not a guarantee of profit or a recommendation to increase stakes. Probability estimates can be wrong, odds can move, and any bet can lose. Keep stakes within predetermined limits, only bet amounts you can afford to lose, and never chase losses.",
};

export default guide;
