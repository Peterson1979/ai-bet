import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "bankroll-management",
  locale: "en",
  title: "Bankroll Management Explained",
  category: "bankroll-risk",
  status: "published",
  description:
    "Learn how bankroll management works in sports betting, why stake size and risk limits matter, how drawdowns and variance affect a bankroll, and how disciplined staking can reduce the risk of ruin.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Bankroll management is the process of deciding how much money is set aside for betting and how much of that bankroll is risked on each wager. It does not improve the probability of a selection winning, but it can reduce the damage caused by losing streaks, variance, and incorrect estimates. Good bankroll management is primarily about survival, consistency, and limiting financial harm. It helps prevent one bad sequence from wiping out the entire bankroll and reduces the temptation to make impulsive decisions after wins or losses.",
  keyTakeaways: [
    "A betting bankroll should be separate from money needed for living expenses, bills, savings, or emergencies.",
    "Stake size controls how strongly each result affects the bankroll.",
    "Smaller percentage stakes generally reduce volatility and the risk of ruin.",
    "No staking system can turn a negative-expectation strategy into a positive one.",
    "Bankroll rules should be decided before emotional pressure from wins or losses appears.",
    "Drawdowns are normal in uncertain processes and should be planned for.",
    "Chasing losses by increasing stakes can rapidly increase financial risk.",
  ],
  sections: [
    {
      id: "definition",
      heading: "What a Betting Bankroll Is",
      paragraphs: [
        "A betting bankroll is a dedicated amount of money set aside specifically for betting activity. It should be financially separate from rent, mortgage payments, food, debt repayments, emergency savings, and other essential funds.",
        "This separation creates a clear limit. If the bankroll falls, the loss remains within an amount that was already designated as affordable to lose.",
        "A bankroll should therefore be viewed as risk capital rather than as income. Betting returns are uncertain, and even a process with positive expected value can experience long losing periods."
      ],
      callout: {
        title: "The bankroll is a limit, not a target",
        body:
          "A dedicated bankroll helps define how much financial risk is acceptable. It should never be funded with money needed for essential expenses.",
        tone: "warning",
      },
    },
    {
      id: "why-management-matters",
      heading: "Why Bankroll Management Matters",
      paragraphs: [
        "Sports betting outcomes are uncertain. Even good probability estimates can be wrong on individual events, and ordinary variance can create losing streaks.",
        "Without a structured staking approach, a bettor can risk too much on one selection, increase stakes after losses, or let a short winning run create overconfidence.",
        "Bankroll management reduces these behavioral and mathematical risks by defining stake sizes and loss limits before the result is known.",
        "It cannot remove the possibility of loss, but it can make the financial impact of normal variance more manageable."
      ],
    },
    {
      id: "unit-size",
      heading: "What Is a Betting Unit?",
      paragraphs: [
        "A unit is a standardized way to express stake size. Instead of discussing every wager in currency terms, a bettor can define one unit as a fixed percentage or fixed amount of the bankroll.",
        "For example, if a bankroll is 1,000 units of currency and one betting unit is defined as 1% of the bankroll, one unit equals 10 units of currency.",
        "Using units makes performance easier to compare over time because it separates the analysis from the bettor's personal bankroll size."
      ],
      bullets: [
        "Bankroll: 1,000.",
        "1% unit: 10.",
        "0.5% unit: 5.",
        "2% unit: 20.",
      ],
      callout: {
        title: "Units standardize risk",
        body:
          "A unit is not a recommended stake by itself. It is simply a consistent measurement of exposure.",
        tone: "info",
      },
    },
    {
      id: "fixed-vs-percentage",
      heading: "Fixed Stakes vs Percentage Stakes",
      paragraphs: [
        "A fixed-stake approach risks the same currency amount on each bet. A percentage-stake approach risks a fixed percentage of the current bankroll.",
        "With flat fixed stakes, a 10-unit bet remains 10 units even if the bankroll rises or falls. With percentage staking, the stake automatically becomes smaller after losses and larger after gains.",
        "Percentage staking can therefore reduce risk during drawdowns because exposure shrinks with the bankroll. Fixed staking is simpler and can make performance tracking easier.",
        "Neither method creates an edge. The underlying probability and price still determine whether the betting decision has positive or negative expected value."
      ],
      bullets: [
        "Fixed stake: same currency amount each time.",
        "Percentage stake: same percentage of current bankroll.",
        "Fixed staking is simple and stable.",
        "Percentage staking automatically adjusts exposure as bankroll changes.",
      ],
    },
    {
      id: "stake-size",
      heading: "Why Stake Size Is the Core Risk Decision",
      paragraphs: [
        "Stake size determines how much damage one loss can cause and how quickly a sequence of losses can compound.",
        "If a bettor risks 1% of bankroll on each wager, ten consecutive full losses do not reduce the bankroll by 100%. If the same bettor risks 10% per wager, a normal losing sequence can create a severe drawdown.",
        "Large stakes increase both upside and downside. They do not increase the probability of being correct.",
        "Because probability estimates are uncertain, conservative stake sizes can provide a margin of safety against both variance and model error."
      ],
      callout: {
        title: "Confidence is not certainty",
        body:
          "A high-confidence estimate can still be wrong. Stake sizing should reflect uncertainty rather than assuming any bet is safe.",
        tone: "warning",
      },
    },
    {
      id: "risk-of-ruin",
      heading: "What Is Risk of Ruin?",
      paragraphs: [
        "Risk of ruin is the possibility that a bankroll falls so far that betting can no longer continue under the intended strategy.",
        "The risk increases when stakes are large relative to bankroll, when the underlying strategy has little or no edge, when outcomes are highly volatile, or when multiple bets are strongly correlated.",
        "Even a positive-expectation strategy can have a meaningful risk of ruin if stake sizes are too aggressive. This is one reason bankroll management cannot be separated from expected value and variance.",
        "Reducing stake size generally lowers risk of ruin, although it also reduces the speed at which gains accumulate during favorable periods."
      ],
    },
    {
      id: "drawdowns",
      heading: "Planning for Drawdowns",
      paragraphs: [
        "A drawdown is the decline from a previous bankroll peak to a later low point. Drawdowns are unavoidable in uncertain processes.",
        "Suppose a bankroll rises from 100 units to 130 units and later falls to 110. The drawdown from the peak is 20 units, or about 15.4% of the 130-unit peak.",
        "Planning for drawdowns means accepting in advance that losing periods will occur and ensuring that the staking method can survive them without forcing emotional or financial decisions.",
        "A bettor who assumes the bankroll should rise smoothly is more likely to panic, increase risk, or abandon rules when normal variance appears."
      ],
      callout: {
        title: "Plan before the downswing",
        body:
          "Risk rules are most useful when they are created before losses create emotional pressure.",
        tone: "info",
      },
    },
    {
      id: "chasing",
      heading: "Why Chasing Losses Is Dangerous",
      paragraphs: [
        "Chasing losses means increasing stakes primarily to recover money lost on previous bets. This changes the purpose of the next decision from evaluating its own price and probability to repairing an earlier result.",
        "The approach is dangerous because losses can continue. If stakes increase after each loss, exposure can escalate rapidly while the underlying probability of the next bet remains unchanged.",
        "Martingale-style systems illustrate this problem. Doubling after losses may appear to guarantee recovery if a win eventually occurs, but real bankrolls, sportsbook limits, losing streaks, and finite capital make the system vulnerable to catastrophic loss.",
        "A disciplined bankroll process keeps the next stake based on predefined rules rather than on the amount lost previously."
      ],
      callout: {
        title: "The next bet does not owe you the previous loss",
        body:
          "Past outcomes do not make the next wager more likely to win. Increasing stakes to recover losses increases exposure, not probability.",
        tone: "warning",
      },
    },
    {
      id: "kelly",
      heading: "What About the Kelly Criterion?",
      paragraphs: [
        "The Kelly Criterion is a mathematical framework for sizing bets based on estimated edge and odds. In theory, it aims to maximize long-run logarithmic bankroll growth when probabilities are known accurately.",
        "The practical problem is that betting probabilities are not known with certainty. A small error in the estimated edge can lead to a stake that is too large.",
        "For this reason, some bettors use fractional Kelly, such as half-Kelly or quarter-Kelly, to reduce volatility and the consequences of estimation error.",
        "Kelly is not a guarantee and should not be treated as a reason to make large bets. Its output is only as reliable as the probability estimate used."
      ],
      bullets: [
        "Full Kelly can be highly volatile.",
        "Fractional Kelly reduces exposure.",
        "Incorrect probability estimates can lead to excessive Kelly stakes.",
        "Kelly cannot create positive expected value where none exists.",
      ],
    },
    {
      id: "flat-staking",
      heading: "Why Flat Staking Is Often Useful for Evaluation",
      paragraphs: [
        "Flat staking means using the same unit size across bets. It is simple and makes it easier to evaluate whether the selections themselves performed well.",
        "If stake size changes dramatically from one bet to another, a few large wagers can dominate the profit-and-loss record and hide the quality of the underlying selection process.",
        "Flat staking does not optimize theoretical bankroll growth, but its simplicity can improve discipline and make model evaluation more transparent.",
        "For users learning how a strategy behaves, consistency can be more valuable than complex stake optimization."
      ],
    },
    {
      id: "percentage-staking",
      heading: "How Percentage Staking Responds to Bankroll Changes",
      paragraphs: [
        "Percentage staking uses a fixed fraction of the current bankroll. If the bankroll decreases, the stake decreases automatically. If the bankroll increases, the stake gradually increases.",
        "For example, at a 1% staking rate, a 1,000-unit bankroll produces a 10-unit stake. If the bankroll falls to 800, the next 1% stake becomes 8 units.",
        "This creates a natural defensive mechanism during losing periods. However, it also means stake sizes are continuously changing, which can make performance analysis less intuitive.",
        "The choice between flat and percentage staking depends on the purpose of the bankroll system, but both require conservative assumptions and disciplined limits."
      ],
    },
    {
      id: "correlation",
      heading: "Correlated Bets Can Increase Bankroll Risk",
      paragraphs: [
        "A bankroll can be exposed to more risk than the individual stake sizes suggest if multiple bets depend on the same underlying event.",
        "For example, betting a football team to win, its striker to score, and the match to go over 2.5 goals can create overlapping exposure to the same game script.",
        "If all three bets are treated as independent 1% positions, the true concentration of risk may be much higher than 1%.",
        "Bankroll management should therefore consider total exposure to related outcomes, not only the stake shown on each individual ticket."
      ],
      callout: {
        title: "Count exposure, not just tickets",
        body:
          "Several correlated bets can behave like one much larger position.",
        tone: "warning",
      },
    },
    {
      id: "limits",
      heading: "Set Spending, Loss, and Time Limits",
      paragraphs: [
        "Bankroll management is not only a mathematical exercise. Responsible betting also requires limits on spending, losses, and time.",
        "A loss limit defines how much of the bankroll can be lost over a chosen period before betting stops. A deposit or spending limit restricts how much money can enter the betting account. A time limit prevents betting from expanding into an uncontrolled activity.",
        "These limits are most effective when set before betting begins and when they are difficult to change impulsively during a losing or winning streak.",
        "If betting is causing financial stress, hiding losses, borrowing money, or interfering with everyday life, the correct response is to stop rather than to optimize the staking formula."
      ],
      callout: {
        title: "Risk management includes knowing when not to bet",
        body:
          "No bankroll strategy is a substitute for stopping when betting causes financial or emotional harm.",
        tone: "warning",
      },
    },
    {
      id: "records",
      heading: "Why Record Keeping Matters",
      paragraphs: [
        "A bankroll process is difficult to evaluate without records. Useful records include date, sport, market, selection, odds, stake, result, profit or loss, and the bankroll after settlement.",
        "Recording the probability estimate and market price can also help evaluate whether the analysis was well calibrated and whether the bettor consistently obtained competitive odds.",
        "Records reduce reliance on memory, which is often biased toward large wins, painful losses, and recent events.",
        "A clean record makes it easier to distinguish a genuine problem in the strategy from ordinary variance."
      ],
      bullets: [
        "Date and event.",
        "Market and selection.",
        "Odds taken.",
        "Stake size.",
        "Result and profit/loss.",
        "Bankroll after settlement.",
        "Optional probability estimate and market benchmark.",
      ],
    },
    {
      id: "matchsignal",
      heading: "How Bankroll Management Relates to MatchSignal",
      paragraphs: [
        "MatchSignal provides analytical context such as Best Odds, Market Avg, Fair Probability, Value Edge, Books Sampled, and Risk Tier. These fields are designed to help users understand the relationship between market prices and probability-based analysis.",
        "They do not determine how much money a user should stake. A Low Risk signal is not a guarantee of success, and a larger Value Edge should not automatically be interpreted as permission to increase stakes aggressively.",
        "Stake size should remain part of a separate personal risk framework based on affordability, uncertainty, bankroll size, and responsible gambling limits.",
        "MatchSignal analysis is informational and should not replace personal financial judgment or disciplined bankroll controls."
      ],
      callout: {
        title: "Signal strength is not stake advice",
        body:
          "MatchSignal does not guarantee outcomes, and its analytical fields should not be used as automatic instructions for stake sizing.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "A Practical Bankroll Management Checklist",
      paragraphs: [
        "A simple bankroll framework can be more effective than a complicated system that is difficult to follow consistently."
      ],
      bullets: [
        "Separate the betting bankroll from essential money.",
        "Choose a conservative base stake before betting begins.",
        "Use flat or percentage staking consistently.",
        "Avoid increasing stakes because of recent losses.",
        "Consider correlated exposure across multiple bets.",
        "Plan for normal drawdowns and losing streaks.",
        "Track every bet and update the bankroll accurately.",
        "Set spending, loss, and time limits.",
        "Reduce or stop betting if financial or emotional pressure increases.",
        "Never assume any staking system can guarantee profit.",
      ],
    },
  ],
  relatedGuides: [
    "variance-sports-betting",
    "flat-stakes-vs-percentage-staking",
    "why-chasing-losses-is-dangerous",
    "expected-value-sports-betting",
    "winning-streaks-misleading",
  ],
  responsibleGamblingNote:
    "Bankroll management can reduce financial exposure, but it cannot make betting safe or guarantee profit. Keep betting money separate from essential funds, set strict spending and loss limits, avoid borrowing or chasing losses, and stop if betting causes financial or emotional harm.",
};

export default guide;
