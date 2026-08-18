import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "implied-probability",
  locale: "en",
  title: "What Is Implied Probability?",
  category: "odds-probability",
  status: "published",
  description:
    "Learn how to convert betting odds into implied probability, why bookmaker margins make raw market probabilities exceed 100%, and how to interpret implied probability without confusing price with certainty.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Implied probability is the probability encoded by a betting price. It translates odds into a percentage, making different prices easier to compare and helping you see the break-even rate associated with a bet. The calculation is simple, but interpreting it correctly requires care: bookmaker prices can include margin, market movement, and risk management, so implied probability should not be treated as an objective forecast or a guarantee.",
  keyTakeaways: [
    "For decimal odds, implied probability equals 1 divided by the odds, multiplied by 100.",
    "Decimal odds of 2.00 imply 50%; 1.50 implies about 66.7%; 4.00 implies 25%.",
    "Raw implied probabilities across a bookmaker market often add to more than 100% because prices can include bookmaker margin.",
    "Implied probability is a property of the quoted price, not proof of the true probability of an outcome.",
    "A probability estimate becomes useful for value analysis only when it is compared with the break-even probability implied by the available odds.",
    "Small differences in odds can materially change the break-even probability and long-run economics of repeated bets.",
  ],
  sections: [
    {
      id: "definition",
      heading: "What Implied Probability Means",
      paragraphs: [
        "Betting odds and probability are two ways of expressing the same pricing relationship. Odds show the potential return attached to an outcome. Implied probability converts that price into the percentage success rate that would correspond to the quoted odds before considering bookmaker margin, model uncertainty, or other market effects.",
        "For example, decimal odds of 2.00 imply a probability of 50%. That does not mean the outcome will happen half the time in any small sample, and it does not mean the bookmaker has discovered the true probability. It means that a price of 2.00 corresponds mathematically to a 50% break-even rate: ignoring other practical factors, a bettor winning exactly half of identical bets at 2.00 would return the amount staked over the long run.",
        "This percentage translation is useful because probabilities are often easier to reason about than raw odds. Comparing 1.62 with 1.75 may feel abstract. Converting them to approximately 61.7% and 57.1% immediately shows that the two prices demand meaningfully different success rates."
      ],
      callout: {
        title: "Price, not certainty",
        body:
          "An implied probability describes what a quoted price means mathematically. It is not a promise that the event will occur at that frequency.",
        tone: "warning",
      },
    },
    {
      id: "formula",
      heading: "How to Calculate Implied Probability From Decimal Odds",
      paragraphs: [
        "For decimal odds, the conversion formula is: implied probability = 1 ÷ decimal odds. Multiply the result by 100 to express it as a percentage.",
        "At odds of 2.00, the calculation is 1 ÷ 2.00 = 0.50, or 50%. At 1.50, it is 1 ÷ 1.50 = 0.6667, or about 66.7%. At 2.50, it is 40%. At 5.00, it is 20%.",
        "The relationship is inverse. Shorter odds imply a higher probability and a lower potential return. Longer odds imply a lower probability and a higher potential return. Because the relationship is not linear, a change of 0.10 in decimal odds does not represent the same probability change at every price level."
      ],
      bullets: [
        "1.25 ‒ 80.0% implied probability",
        "1.50 → 66.7%",
        "1.80 → 55.6%",
        "2.00 → 50.0%",
        "2.50 → 40.0%",
        "3.00 → 33.3%",
        "4.00 → 25.0%",
        "5.00 → 20.0%",
      ],
      callout: {
        title: "Example",
        body:
          "If a sportsbook offers 2.20, the implied probability is 1 ÷ 2.20 = 0.4545, or about 45.5%. A probability estimate above 45.5% would be required before that price could represent positive expected value under the estimate.",
        tone: "example",
      },
    },
    {
      id: "break-even",
      heading: "Why Implied Probability Is Also a Break-Even Probability",
      paragraphs: [
        "The implied probability from the available odds can be interpreted as a theoretical break-even threshold. Suppose you repeatedly take decimal odds of 2.00. A 50% win rate produces an average gross return of one unit per unit staked: half the bets return two units and half return zero. Before considering any other costs or limitations, 50% is therefore the break-even rate.",
        "At odds of 1.80, the implied probability is about 55.6%. If an outcome truly occurred only 50% of the time, repeatedly taking 1.80 would have negative expected value. At odds of 2.20, the break-even probability is about 45.5%; if a well-calibrated estimate placed the outcome at 50%, the quoted price would theoretically sit above the break-even requirement.",
        "This is the foundation of expected-value analysis. The important comparison is not simply whether an outcome is likely to happen. It is whether the estimated probability is high enough relative to the price being offered."
      ],
      callout: {
        title: "Likely does not automatically mean valuable",
        body:
          "An outcome can have a 70% chance of occurring and still be unattractive if the available odds require a break-even rate above 70%. Conversely, a lower-probability outcome can be attractive if the price more than compensates for the risk under a reliable estimate.",
        tone: "info",
      },
    },
    {
      id: "margin",
      heading: "Why Bookmaker Implied Probabilities Can Add Up to More Than 100%",
      paragraphs: [
        "If a market represented mutually exclusive outcomes with perfectly fair prices and no margin, the implied probabilities would add to 100%. Real bookmaker markets often exceed 100%. The excess is commonly called the overround or bookmaker margin.",
        "Consider a simplified two-outcome market with both sides priced at 1.91. Each price implies approximately 52.36%. Together they total about 104.72%. The 4.72 percentage points above 100% illustrate the overround in this simplified market.",
        "Because of this margin, the raw implied probability of one bookmaker selection should not automatically be described as its fair probability. Analysts can remove or normalize the margin to create a no-vig market estimate, but that requires an additional calculation."
      ],
      bullets: [
        "Convert each outcome's odds into raw implied probability.",
        "Add all mutually exclusive outcome probabilities.",
        "A total above 100% indicates an overround in the quoted market.",
        "Normalize the outcome probabilities if you need a simple no-margin market estimate.",
      ],
      callout: {
        title: "Important distinction",
        body:
          "Raw implied probability comes directly from a quoted price. A no-margin or fair-probability estimate requires an additional adjustment and should be labelled accordingly.",
        tone: "warning",
      },
    },
    {
      id: "normalization",
      heading: "A Simple Example of Removing the Overround",
      paragraphs: [
        "One basic way to create a no-margin estimate is proportional normalization. Suppose a two-outcome market has raw implied probabilities of 55% and 50%, for a total of 105%. Divide each probability by 105%. The normalized estimates become approximately 52.38% and 47.62%, which sum to 100%.",
        "This procedure is a useful way to understand the structure of a market, but it makes an assumption: that the bookmaker margin is distributed proportionally across outcomes. Real pricing can be more complicated. Margin may not be allocated evenly, different outcomes can attract different demand, and bookmakers can use distinct trading and risk-management strategies.",
        "Removing the overround is therefore not the same as discovering the true probability. It is better described as deriving a cleaner market-based estimate from the quoted prices."
      ],
      callout: {
        title: "No-vig does not mean perfect",
        body:
          "A normalized market can be a useful benchmark, but uncertainty, information gaps, market bias, and pricing differences can still remain.",
        tone: "info",
      },
    },
    {
      id: "formats",
      heading: "Implied Probability Across Different Odds Formats",
      paragraphs: [
        "Decimal, fractional, and American odds express the same economic relationship in different formats. MatchSignal uses decimal odds because they make both return calculations and probability conversion direct.",
        "Fractional odds such as 3/2 represent profit relative to stake. To convert them to decimal, add one: 3/2 becomes 2.50 decimal, which implies 40%. American odds use positive and negative numbers around a 100-unit reference point, so the conversion formula differs depending on whether the price is positive or negative.",
        "Once any format has been converted to decimal odds, the same 1 ÷ odds formula can be used. This makes decimal odds a convenient common language for comparing prices from multiple sources."
      ],
      bullets: [
        "Fractional 1/1 = decimal 2.00 = 50% implied probability.",
        "Fractional 3/2 = decimal 2.50 = 40%.",
        "American +100 = decimal 2.00 = 50%.",
        "American -200 = decimal 1.50 = about 66.7%.",
      ],
    },
    {
      id: "price-comparison",
      heading: "How Better Odds Change the Implied Probability",
      paragraphs: [
        "Price comparison matters because a better price reduces the success rate required to break even. Imagine the same selection is available at 1.80, 1.90, and 2.00. Those prices imply approximately 55.6%, 52.6%, and 50.0%, respectively.",
        "The underlying sporting event is identical, but the economics of the bet are not. If your probability assessment were 54%, the 1.80 price would sit above your estimate in an unfavorable way because it requires 55.6% to break even. The 1.90 and 2.00 prices would require lower break-even rates and could therefore produce positive expected value under the 54% estimate.",
        "This illustrates why odds comparison is not merely about maximizing a payout after a win. The price changes the mathematical threshold that your probability estimate must exceed."
      ],
      callout: {
        title: "Same pick, different value",
        body:
          "A selection does not have a fixed value independent of price. When the odds change, the implied probability and expected-value relationship change with them.",
        tone: "example",
      },
    },
    {
      id: "market-movement",
      heading: "What Happens to Implied Probability When Odds Move",
      paragraphs: [
        "When odds shorten, implied probability rises. When odds drift longer, implied probability falls. A move from 2.20 to 2.00 changes the implied probability from about 45.5% to 50%. A move from 2.00 to 1.80 raises it further to about 55.6%.",
        "Odds can move for many reasons: new information, injuries, confirmed lineups, weather, market activity, changes at competing sportsbooks, or a bookmaker's own risk-management decisions. An odds move therefore does not prove that the underlying true probability changed by exactly the same amount.",
        "Still, translating a price move into implied probability can make the scale of the move more intuitive. Saying a price shortened from 2.20 to 1.90 is less immediate than recognizing that the quoted break-even probability moved from roughly 45.5% to 52.6%."
      ],
    },
    {
      id: "common-mistakes",
      heading: "Common Mistakes When Reading Implied Probability",
      paragraphs: [
        "The arithmetic is simple enough that most errors come from interpretation rather than calculation. The most common mistake is treating implied probability as certainty or as the bookmaker's exact forecast. Another is comparing probabilities from different markets without checking whether the selections and settlement rules are genuinely equivalent.",
        "A third mistake is ignoring bookmaker margin. If the probabilities in a market add to 105%, quoting each raw percentage as a fair probability exaggerates the total probability available. Finally, bettors can overestimate small apparent edges. A one- or two-percentage-point difference may disappear when the underlying probability model is uncertain or poorly calibrated."
      ],
      bullets: [
        "Do not interpret implied probability as certainty.",
        "Do not call raw bookmaker probability 'fair probability' without addressing margin.",
        "Do not compare odds from different market definitions as if they were identical.",
        "Do not assume every difference between your estimate and the market is a genuine edge.",
        "Do not ignore that odds can change before a bet is placed.",
      ],
    },
    {
      id: "matchsignal",
      heading: "How Implied Probability Fits Into MatchSignal",
      paragraphs: [
        "MatchSignal uses bookmaker pricing as one part of its sports-analysis framework. Market prices can be translated into probability terms so that different bookmakers and market observations can be compared on a common scale.",
        "On MatchSignal cards, Market Avg summarizes sampled market pricing, while Fair Probability is an analytical estimate rather than a raw bookmaker percentage. Value Edge is intended to describe the difference between the available market price and MatchSignal's probability-based assessment. Books Sampled indicates how many bookmaker sources contributed to the relevant market sample.",
        "These fields are intended to make market pricing and model context easier to inspect. They are not guarantees of a sporting result or profit. Model assumptions, source-data quality, market movement, and ordinary sports variance can all affect the outcome."
      ],
      callout: {
        title: "Use probability as a framework",
        body:
          "Probability helps structure uncertainty. It does not eliminate uncertainty, and no model can guarantee the result of a sporting event.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "A Practical Implied-Probability Checklist",
      paragraphs: [
        "When evaluating a betting price, use implied probability as a starting point rather than a final answer. The following sequence helps keep price, market structure, and probability estimation separate."
      ],
      bullets: [
        "Identify the exact market and selection.",
        "Convert the available decimal odds into implied probability.",
        "Check whether the market contains bookmaker margin or overround.",
        "Compare equivalent prices across sportsbooks where available.",
        "If using a probability model, compare its estimate with the price's break-even probability.",
        "Allow for model uncertainty instead of treating small numerical differences as certain edges.",
        "Recheck the current odds before acting because market prices can move.",
        "Use disciplined stake sizing and never treat probability analysis as a guarantee."
      ],
    }
  ],
  relatedGuides: [
    "how-betting-odds-work",
    "bookmaker-margin-overround",
    "how-to-compare-betting-odds",
    "expected-value-sports-betting"
  ],
  responsibleGamblingNote:
    "Betting involves financial risk. Implied probability is a mathematical interpretation of a price, not a guarantee of an outcome or profit. Only stake amounts you can afford to lose, avoid chasing losses, and keep betting decisions within predetermined limits.",
};

export default guide;
