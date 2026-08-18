import {
  MatchCardData,
  SportType,
  RiskTier,
  MatchStatus,
} from "@/app/types/match";
import { injectAffiliateOffer } from "@/app/lib/affiliateInject";

type PredictionInput = {
  id: string;
  eventId?: string;
  sport?: string;
  league?: string;
  leagueSlug?: string;
  homeTeam?: string;
  awayTeam?: string;
  matchSlug?: string;
  startTime?: string;
  status?: MatchStatus;
  generatedAt?: string;

  market?: string;
  prediction?: string;
  reasoning?: string;
  reasoningTranslations?: Partial<Record<string, string>>;
  riskTier?: RiskTier | string;

  bestOdds?: number | null;
  impliedProbability?: number | null;
  consensusImpliedProb?: number | null;
  valueDiff?: number | null;
  bookmakerCount?: number | null;

  bookmaker?: string;
  bookmakerUrl?: string;
  ctaLabel?: string;

  partnerOdds?: number | null;
  partnerBookmaker?: string | null;
  partnerRating?: number | null;
  marketAverageOdds?: number | null;
  fairProbability?: number | null;
  fairOdds?: number | null;
  estimatedValuePct?: number | null;
  bookmakerSpreadPct?: number | null;
  whySignal?: string[] | null;

  disclaimer?: string;
};

function normalizeText(value?: string | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function safeText(value?: string | null, fallback = ""): string {
  const normalized = normalizeText(value);
  return normalized.length > 0 ? normalized : fallback;
}

function safeNumber(value?: number | null): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function safeNonNegativeInt(value?: number | null): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? Math.round(value)
    : 0;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function normalizeSport(value?: string | null): SportType {
  const normalized = normalizeText(value).toLowerCase();

  if (
    normalized === "football" ||
    normalized === "soccer"
  ) {
    return "Football";
  }

  if (normalized === "nba" || normalized === "basketball") {
    return "NBA";
  }

  if (normalized === "nfl" || normalized === "american football") {
    return "NFL";
  }

  if (
    normalized === "hockey" ||
    normalized === "ice hockey" ||
    normalized === "nhl"
  ) {
    return "Hockey";
  }

  if (normalized === "tennis") {
    return "Tennis";
  }

  if (
    normalized === "mlb" ||
    normalized === "baseball"
  ) {
    return "MLB";
  }

  return "MMA";
}

function normalizeRiskTier(value?: string | null): RiskTier {
  const normalized = normalizeText(value).toLowerCase();

  if (normalized === "low") return "Low";
  if (normalized === "medium") return "Medium";
  return "High";
}

function normalizeStatus(value?: string | null): MatchStatus {
  const normalized = normalizeText(value).toLowerCase();

  if (normalized === "live") return "live";
  if (normalized === "finished" || normalized === "final") return "finished";
  return "scheduled";
}

function impliedProbabilityFromDecimalOdds(odds?: number | null): number | null {
  if (typeof odds !== "number" || !Number.isFinite(odds) || odds <= 1) {
    return null;
  }

  return (1 / odds) * 100;
}

function fairOddsFromProbability(probability?: number | null): number | null {
  if (
    typeof probability !== "number" ||
    !Number.isFinite(probability) ||
    probability <= 0 ||
    probability >= 100
  ) {
    return null;
  }

  return 100 / probability;
}

function estimatedValueFromFairProbabilityAndOdds(
  fairProbability?: number | null,
  offeredOdds?: number | null
): number | null {
  if (
    typeof fairProbability !== "number" ||
    !Number.isFinite(fairProbability) ||
    typeof offeredOdds !== "number" ||
    !Number.isFinite(offeredOdds) ||
    offeredOdds <= 1
  ) {
    return null;
  }

  return (offeredOdds * (fairProbability / 100) - 1) * 100;
}

function spreadPctFromOdds(
  offeredOdds?: number | null,
  marketAverageOdds?: number | null
): number | null {
  if (
    typeof offeredOdds !== "number" ||
    !Number.isFinite(offeredOdds) ||
    offeredOdds <= 0 ||
    typeof marketAverageOdds !== "number" ||
    !Number.isFinite(marketAverageOdds) ||
    marketAverageOdds <= 0
  ) {
    return null;
  }

  return ((offeredOdds - marketAverageOdds) / marketAverageOdds) * 100;
}

function normalizeWhySignal(value?: string[] | null): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
    .slice(0, 3);
}

export function toMatchCardData(
  input: PredictionInput,
  forcedSport?: SportType
): MatchCardData {
  const sport = forcedSport ?? normalizeSport(input.sport);

  const bestOdds = safeNumber(input.bestOdds);
  const partnerOdds = safeNumber(input.partnerOdds) ?? bestOdds;
  const marketAverageOdds = safeNumber(input.marketAverageOdds);
  const impliedProbability =
    safeNumber(input.impliedProbability) ??
    impliedProbabilityFromDecimalOdds(partnerOdds);

  const consensusImpliedProb = safeNumber(input.consensusImpliedProb);
  const fairProbability =
    safeNumber(input.fairProbability) ?? consensusImpliedProb ?? impliedProbability;

  const fairOdds =
    safeNumber(input.fairOdds) ?? fairOddsFromProbability(fairProbability);

  const estimatedValuePct =
    safeNumber(input.estimatedValuePct) ??
    estimatedValueFromFairProbabilityAndOdds(fairProbability, partnerOdds);

  const bookmakerSpreadPct =
    safeNumber(input.bookmakerSpreadPct) ??
    spreadPctFromOdds(partnerOdds, marketAverageOdds);

  const valueDiff =
    safeNumber(input.valueDiff) ??
    (typeof fairProbability === "number" && typeof impliedProbability === "number"
      ? fairProbability - impliedProbability
      : null);

  const base: MatchCardData = {
    id: safeText(input.id, `match-${Date.now()}`),
    eventId: safeText(input.eventId) || undefined,

    sport,
    league: safeText(input.league, "Unknown League"),
    leagueSlug: safeText(input.leagueSlug) || undefined,

    homeTeam: safeText(input.homeTeam, "Unknown Home"),
    awayTeam: safeText(input.awayTeam, "Unknown Away"),
    matchSlug: safeText(input.matchSlug) || undefined,

    startTime: safeText(input.startTime, new Date().toISOString()),
    status: normalizeStatus(input.status),
    generatedAt: safeText(input.generatedAt) || undefined,

    market: safeText(input.market, "Moneyline"),
    prediction: safeText(input.prediction, "No prediction"),
    reasoning: safeText(input.reasoning),
    reasoningTranslations: input.reasoningTranslations,
    riskTier: normalizeRiskTier(input.riskTier),

    bestOdds,
    impliedProbability,
    consensusImpliedProb,
    valueDiff,
    bookmakerCount: safeNonNegativeInt(input.bookmakerCount),

    bookmaker: safeText(input.bookmaker, "Unknown"),
    bookmakerUrl: safeText(input.bookmakerUrl, "#"),
    ctaLabel: safeText(input.ctaLabel, "View Offer"),

    partnerOffer: undefined,
    partnerOdds,
    partnerBookmaker: safeText(input.partnerBookmaker) || undefined,
    partnerRating: safeNumber(input.partnerRating),
    marketAverageOdds,
    fairProbability:
      typeof fairProbability === "number"
        ? clamp(fairProbability, 0, 100)
        : null,
    fairOdds,
    estimatedValuePct,
    bookmakerSpreadPct,
    whySignal: normalizeWhySignal(input.whySignal),

    disclaimer: safeText(input.disclaimer) || undefined,
  };

  return injectAffiliateOffer(base);
}