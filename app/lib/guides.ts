import type { Lang } from "@/app/lib/i18n";

export const GUIDE_LOCALE = "en" as const;
export type GuideLocale = Lang;
export const GUIDE_LOCALES: readonly GuideLocale[] = ["en","hu","de","fr","es","it","pt","ar","zh","ja","hi"];

export type GuideStatus = "draft" | "published";
export type GuideCategoryId =
  | "betting-fundamentals"
  | "odds-probability"
  | "value-analysis"
  | "bankroll-risk"
  | "betting-psychology"
  | "ai-data"
  | "responsible-betting";

export type GuideManifestEntry = {
  slug: string;
  locale: GuideLocale;
  title: string;
  category: GuideCategoryId;
  status: GuideStatus;
  description?: string;
  publishedAt?: string;
  updatedAt?: string;
};

export const GUIDE_CATEGORIES: Readonly<Record<GuideCategoryId, string>> = {
  "betting-fundamentals": "Betting Fundamentals",
  "odds-probability": "Odds & Probability",
  "value-analysis": "Value & Analysis",
  "bankroll-risk": "Bankroll & Risk",
  "betting-psychology": "Betting Psychology",
  "ai-data": "AI & Data",
  "responsible-betting": "Responsible Betting",
};

const GUIDE_SEEDS: readonly Omit<GuideManifestEntry, "locale">[] = [
  {
    slug: "how-betting-odds-work",
    title: "How Betting Odds Actually Work",
    category: "odds-probability",
    status: "published",
    description:
      "Learn what betting odds represent, how they relate to probability, why bookmaker prices include a margin, and how to compare odds without confusing price with prediction.",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
  },
    {
    slug: "implied-probability",
    title: "What Is Implied Probability?",
    category: "odds-probability",
    status: "published",
    description:
      "Learn how to convert betting odds into implied probability, why bookmaker margins make raw market probabilities exceed 100%, and how to interpret implied probability without confusing price with certainty.",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
  },
    {
    slug: "expected-value-sports-betting",
    title: "Expected Value in Sports Betting Explained",
    category: "value-analysis",
    status: "published",
    description:
      "Understand expected value in sports betting, how probability and price combine to create positive or negative EV, why a positive edge does not guarantee a win, and how to evaluate value more carefully.",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
  },
    {
    slug: "bookmaker-margin-overround",
    title: "What Is Bookmaker Margin / Overround?",
    category: "odds-probability",
    status: "published",
    description:
      "Learn what bookmaker margin and overround mean, how to calculate them from betting odds, why implied probabilities often add to more than 100%, and how margin affects price comparison and value analysis.",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
  },
    {
    slug: "how-to-compare-betting-odds",
    title: "How to Compare Odds Correctly",
    category: "odds-probability",
    status: "published",
    description:
      "Learn how to compare betting odds correctly across sportsbooks, why market definitions and settlement rules must match, how small price differences affect break-even probability and expected value, and how to avoid false comparisons.",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
  },
    {
    slug: "why-betting-odds-move",
    title: "Why Odds Move Before a Match",
    category: "value-analysis",
    status: "published",
    description:
      "Learn why betting odds move before a match, how new information, market activity, bookmaker risk management, liquidity, and competing prices can affect the market, and why an odds move does not guarantee the final result.",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
  },
    {
    slug: "variance-sports-betting",
    title: "Understanding Variance in Sports Betting",
    category: "bankroll-risk",
    status: "published",
    description:
      "Learn what variance means in sports betting, why short-term results can differ sharply from long-run expectations, how sample size and odds affect swings, and why winning or losing streaks can mislead decision-making.",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
  },
    {
    slug: "bankroll-management",
    title: "Bankroll Management Explained",
    category: "bankroll-risk",
    status: "published",
    description:
      "Learn how bankroll management works in sports betting, why stake size and risk limits matter, how drawdowns and variance affect a bankroll, and how disciplined staking can reduce the risk of ruin.",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
  },
    {
    slug: "flat-stakes-vs-percentage-staking",
    title: "Flat Stakes vs Percentage Staking",
    category: "bankroll-risk",
    status: "published",
    description:
      "Compare flat staking and percentage staking in sports betting, understand how each method affects bankroll volatility, drawdowns, record keeping, and risk, and learn when each approach may be easier to manage.",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
  },
    {
    slug: "why-chasing-losses-is-dangerous",
    title: "Why Chasing Losses Is Dangerous",
    category: "responsible-betting",
    status: "published",
    description:
      "Learn why chasing losses is dangerous in sports betting, how emotional stake escalation increases financial risk, why previous losses do not improve the next bet's probability, and how predefined limits can reduce harmful decision-making.",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
  },
    {
    slug: "cognitive-biases-sports-betting",
    title: "Cognitive Biases in Sports Betting",
    category: "betting-psychology",
    status: "published",
    description:
      "Learn how cognitive biases can distort sports betting decisions, including confirmation bias, recency bias, anchoring, overconfidence, gambler's fallacy, and outcome bias, and how structured decision rules can reduce their influence.",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
  },
    {
    slug: "confirmation-bias-betting",
    title: "Confirmation Bias and Betting Decisions",
    category: "betting-psychology",
    status: "published",
    description:
      "Learn how confirmation bias affects sports betting decisions, why bettors may search for evidence that supports an existing opinion, how models and narratives can reinforce bias, and how structured analysis can reduce its influence.",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
  },
    {
    slug: "winning-streaks-misleading",
    title: "Why Winning Streaks Can Be Misleading",
    category: "betting-psychology",
    status: "published",
    description:
      "Learn why winning streaks can be misleading in sports betting, how variance and the hot-hand effect can create false confidence, why short-term profit does not prove a strategy has an edge, and how to evaluate performance more carefully.",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
  },
    {
    slug: "matchsignal-value-edge",
    title: "How MatchSignal Calculates Value Edge",
    category: "value-analysis",
    status: "published",
    description:
      "Learn how MatchSignal calculates and interprets Value Edge, how Fair Probability and offered decimal odds combine into estimated value, why Value Edge differs from probability-point valueDiff, and why a positive signal is not a guarantee of profit.",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
  },
    {
    slug: "ai-sports-betting-predictions",
    title: "AI in Sports Betting: What It Can and Cannot Predict",
    category: "ai-data",
    status: "published",
    description:
      "Learn what AI can realistically do in sports betting analysis, where prediction models help, why data quality and calibration matter, what AI cannot know with certainty, and how to use AI-generated insights without treating them as guaranteed outcomes.",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
  },
];

export const GUIDE_MANIFEST: readonly GuideManifestEntry[] = GUIDE_SEEDS.map(
  (entry) => ({
    ...entry,
    locale: GUIDE_LOCALE,
  })
);

export function getGuideManifestEntry(
  slug: string
): GuideManifestEntry | undefined {
  return GUIDE_MANIFEST.find((guide) => guide.slug === slug);
}

export function getPublishedGuideManifest(): GuideManifestEntry[] {
  return GUIDE_MANIFEST.filter((guide) => guide.status === "published");
}

export function hasPublishedGuides(): boolean {
  return getPublishedGuideManifest().length > 0;
}

export function isGuideLocale(value: string): value is GuideLocale {
  return GUIDE_LOCALES.includes(value as GuideLocale);
}
