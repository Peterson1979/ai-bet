import type { PredictionFile, RiskTier, SportBlock, TopPick } from "./types";

export type CarouselSlide =
  | {
      type: "cover";
      dateLabel: string;
    }
  | {
      type: "sport-pick";
      sport: string;
      league: string;
      homeTeam: string;
      awayTeam: string;
      market: string;
      pick: string;
      startTime: string;
      riskTier: RiskTier;
      bookmakerCount: number;
      partnerOdds?: number | null;
      marketAverageOdds?: number | null;
      fairOdds?: number | null;
      fairProbability?: number | null;
      estimatedValuePct?: number | null;
      whySignal?: string[];
    }
  | {
      type: "best-overall";
      title: string;
      match: string;
      pick: string;
      market: string;
      estimatedValuePct?: number | null;
      riskTier: RiskTier;
      reason: string;
    }
  | {
      type: "summary";
      title: string;
      bullets: string[];
    }
  | {
      type: "cta";
      handle: string;
    };

type SportCandidate = {
  sport: string;
  pick: TopPick;
};

function getPrimaryValue(pick: TopPick) {
  if (typeof pick.estimatedValuePct === "number") return pick.estimatedValuePct;
  if (typeof pick.valueDiff === "number") return pick.valueDiff;
  return Number.NEGATIVE_INFINITY;
}

function getTopPickPerSport(sports: SportBlock[]): SportCandidate[] {
  return sports
    .filter(
      (block) =>
        block.hasMatches &&
        Array.isArray(block.topPicks) &&
        block.topPicks.length > 0
    )
    .map((block) => ({
      sport: block.sport,
      pick: [...block.topPicks]
        .filter((pick) => pick.status === "scheduled")
        .filter((pick) => !!pick.prediction && !!pick.market)
        .filter((pick) => (pick.bookmakerCount ?? 0) >= 3)
        .sort((a, b) => getPrimaryValue(b) - getPrimaryValue(a))[0],
    }))
    .filter((item) => !!item.pick);
}

function formatBoardDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatPercent(value?: number | null) {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function formatOdds(value?: number | null) {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  return value.toFixed(2);
}

export function buildInstagramCarouselPlan(
  predictions: PredictionFile
): CarouselSlide[] {
  const sportCandidates = getTopPickPerSport(predictions.sports);

  const slides: CarouselSlide[] = [];

  slides.push({
    type: "cover",
    dateLabel: formatBoardDate(predictions.date),
  });

  const sportSlides = sportCandidates.slice(0, 4).map(({ sport, pick }) => ({
    type: "sport-pick" as const,
    sport,
    league: pick.league,
    homeTeam: pick.homeTeam,
    awayTeam: pick.awayTeam,
    market: pick.market,
    pick: pick.prediction,
    startTime: pick.startTime,
    riskTier: pick.riskTier,
    bookmakerCount: pick.bookmakerCount,
    partnerOdds:
      typeof pick.partnerOffer?.odds === "number"
        ? pick.partnerOffer.odds
        : pick.partnerOdds ?? pick.bestOdds ?? null,
    marketAverageOdds: pick.marketAverageOdds ?? null,
    fairOdds: pick.fairOdds ?? null,
    fairProbability: pick.fairProbability ?? null,
    estimatedValuePct:
      pick.estimatedValuePct ?? pick.valueDiff ?? null,
    whySignal: Array.isArray(pick.whySignal) ? pick.whySignal.slice(0, 2) : [],
  }));

  slides.push(...sportSlides);

  const allPicks = predictions.sports
    .flatMap((block) => block.topPicks || [])
    .filter((pick) => pick.status === "scheduled")
    .filter((pick) => !!pick.prediction && !!pick.market)
    .sort((a, b) => getPrimaryValue(b) - getPrimaryValue(a));

  const best = allPicks[0];

  if (slides.length < 5 && best) {
    slides.push({
      type: "best-overall",
      title: "Best Value Signal",
      match: `${best.homeTeam} vs ${best.awayTeam}`,
      pick: best.prediction,
      market: best.market,
      estimatedValuePct: best.estimatedValuePct ?? best.valueDiff ?? null,
      riskTier: best.riskTier,
      reason:
        Array.isArray(best.whySignal) && best.whySignal.length > 0
          ? best.whySignal[0]
          : (best.reasoning || "").slice(0, 150),
    });
  }

  if (slides.length < 5) {
    slides.push({
      type: "summary",
      title: "Today’s Board",
      bullets: [
        `${sportCandidates.length} sports covered`,
        `${allPicks.length} active picks generated`,
        best
          ? `Top estimated value: ${formatPercent(
              best.estimatedValuePct ?? best.valueDiff ?? null
            ) ?? "available"}`
          : "Fresh AI picks available today",
      ],
    });
  }

  while (slides.length < 4) {
    slides.push({
      type: "summary",
      title: "Daily Edge",
      bullets: [
        "AI-ranked betting opportunities",
        "Built from today’s active board",
        "Market context included on every pick",
      ],
    });
  }

  slides.push({
    type: "cta",
    handle: "@matchsignal",
  });

  return slides.slice(0, 7);
}

export function buildInstagramCarouselCaption(slides: CarouselSlide[]) {
  const sportSlides = slides.filter(
    (slide): slide is Extract<CarouselSlide, { type: "sport-pick" }> =>
      slide.type === "sport-pick"
  );

  const lines = [
    "Today’s AI picks, ranked with market context 🎯",
    "Swipe through today’s board for the top signals, estimated value, and risk view.",
    "",
    ...sportSlides.slice(0, 5).map((slide) => {
      const parts = [
        `${slide.sport}: ${slide.homeTeam} vs ${slide.awayTeam}`,
        `${slide.pick} (${slide.market})`,
      ];

      const valueLabel = formatPercent(slide.estimatedValuePct);
      const oddsLabel = formatOdds(slide.partnerOdds);

      if (valueLabel) parts.push(`Est. value ${valueLabel}`);
      if (oddsLabel) parts.push(`Odds ${oddsLabel}`);
      parts.push(`Risk ${slide.riskTier}`);

      return `• ${parts.join(" — ")}`;
    }),
    "",
    "More AI picks, match analysis, and daily betting signals at MatchSignal. Link in bio.",
    "",
    "#MatchSignal #BettingTips #SportsPredictions #SportsBetting #ValueBet",
  ];

  return lines.join("\n").slice(0, 2200);
}