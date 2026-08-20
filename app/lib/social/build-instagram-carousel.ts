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

export function buildInstagramCarouselPlan(
  predictions: PredictionFile
): CarouselSlide[] {
  const sportCandidates = getTopPickPerSport(predictions.sports);

  const slides: CarouselSlide[] = [];

  slides.push({
    type: "cover",
    dateLabel: formatBoardDate(predictions.date),
  });

  const sportSlides = sportCandidates.slice(0, 3).map(({ sport, pick }) => ({
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
    partnerOdds: pick.bestOdds ?? null,
    marketAverageOdds: pick.marketAverageOdds ?? null,
    fairOdds: pick.fairOdds ?? null,
    fairProbability: pick.fairProbability ?? null,
    estimatedValuePct: pick.estimatedValuePct ?? pick.valueDiff ?? null,
    whySignal: Array.isArray(pick.whySignal) ? pick.whySignal.slice(0, 2) : [],
  }));

  slides.push(...sportSlides);

  slides.push({
    type: "cta",
    handle: "@matchsignal",
  });

  return slides.slice(0, 5);
}

export function buildInstagramCarouselCaption(slides: CarouselSlide[]) {
  const sportSlides = slides.filter(
    (slide): slide is Extract<CarouselSlide, { type: "sport-pick" }> =>
      slide.type === "sport-pick"
  );

  const sportCount = sportSlides.length;

  const lines = [
    `Today’s ${sportCount} free AI picks 🎯`,
    "",
    `We’re only showing ${sportCount} picks here.`,
    "More free picks, market context, and match analysis are live on MatchSignal.",
    "",
    "Everything is free — link in bio.",
    "",
    "#MatchSignal #BettingTips #SportsPredictions #SportsBetting #ValueBet",
  ];

  return lines.join("\n").slice(0, 2200);
}
