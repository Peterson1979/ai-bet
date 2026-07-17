import type { PredictionFile, RiskTier, SportBlock, TopPick } from "./types";

export type CarouselSlide =
  | {
      type: "cover";
      title: string;
      subtitle: string;
      date: string;
    }
  | {
      type: "sport-pick";
      sport: string;
      league: string;
      match: string;
      market: string;
      pick: string;
      odds: number;
      confidence: RiskTier;
      startTime: string;
      valueDiff: number;
    }
  | {
      type: "best-overall";
      title: string;
      match: string;
      pick: string;
      odds: number;
      confidence: RiskTier;
      reason: string;
    }
  | {
      type: "summary";
      title: string;
      bullets: string[];
    }
  | {
      type: "cta";
      title: string;
      subtitle: string;
      handle: string;
    };

type SportCandidate = {
  sport: string;
  pick: TopPick;
};

function getTopPickPerSport(sports: SportBlock[]): SportCandidate[] {
  return sports
    .filter((block) => block.hasMatches && Array.isArray(block.topPicks) && block.topPicks.length > 0)
    .map((block) => ({
      sport: block.sport,
      pick: [...block.topPicks]
        .filter((pick) => pick.status === "scheduled")
        .filter((pick) => !!pick.prediction && !!pick.market)
        .filter((pick) => (pick.bookmakerCount ?? 0) >= 3)
        .sort((a, b) => (b.valueDiff ?? 0) - (a.valueDiff ?? 0))[0],
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

export function buildInstagramCarouselPlan(predictions: PredictionFile): CarouselSlide[] {
  const sportCandidates = getTopPickPerSport(predictions.sports);

  const slides: CarouselSlide[] = [];

  slides.push({
    type: "cover",
    title: "Today’s Best Picks",
    subtitle:
      sportCandidates.length > 0
        ? `${sportCandidates.length} sports on today’s board`
        : "AI sports picks for today",
    date: formatBoardDate(predictions.date),
  });

  const sportSlides = sportCandidates.slice(0, 5).map(({ sport, pick }) => ({
    type: "sport-pick" as const,
    sport,
    league: pick.league,
    match: `${pick.homeTeam} vs ${pick.awayTeam}`,
    market: pick.market,
    pick: pick.prediction,
    odds: pick.bestOdds,
    confidence: pick.riskTier,
    startTime: pick.startTime,
    valueDiff: pick.valueDiff,
  }));

  slides.push(...sportSlides);

  const allPicks = predictions.sports
    .flatMap((block) => block.topPicks || [])
    .filter((pick) => pick.status === "scheduled")
    .filter((pick) => !!pick.prediction && !!pick.market)
    .sort((a, b) => (b.valueDiff ?? 0) - (a.valueDiff ?? 0));

  const best = allPicks[0];

  if (slides.length < 5 && best) {
    slides.push({
      type: "best-overall",
      title: "Best Value Pick",
      match: `${best.homeTeam} vs ${best.awayTeam}`,
      pick: best.prediction,
      odds: best.bestOdds,
      confidence: best.riskTier,
      reason: (best.reasoning || "").slice(0, 150),
    });
  }

  if (slides.length < 5) {
    slides.push({
      type: "summary",
      title: "Today’s Board",
      bullets: [
        `${sportCandidates.length} sports covered`,
        `${allPicks.length} active picks generated`,
        best ? `Top value signal: +${best.valueDiff.toFixed(2)}%` : "Fresh AI picks available today",
      ],
    });
  }

  while (slides.length < 4) {
    slides.push({
      type: "summary",
      title: "Daily Edge",
      bullets: [
        "AI-ranked betting opportunities",
        "Built from today’s available board",
        "Updated from current prediction set",
      ],
    });
  }

  slides.push({
    type: "cta",
    title: "Follow MatchSignal",
    subtitle: "Daily AI-powered picks across top sports",
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
    "Today’s AI-powered sports picks 🎯",
    "",
    ...sportSlides.slice(0, 4).map(
      (slide) => `${slide.sport}: ${slide.match} — ${slide.pick} @ ${slide.odds.toFixed(2)}`
    ),
    "",
    "Follow MatchSignal for daily betting picks, matchup edges, and AI-ranked value spots.",
    "",
    "#MatchSignal #BettingTips #SportsPredictions #SportsBetting",
  ];

  return lines.join("\n").slice(0, 2200);
}