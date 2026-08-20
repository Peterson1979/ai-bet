import {
  calculateBookmakerSpreadPct,
  calculateEstimatedValuePct,
  decimalOddsToImpliedProbability,
  impliedProbabilityToDecimalOdds,
} from "@/app/lib/odds";
import { calculateRiskTier } from "@/app/lib/sportsConfig";
import type { RiskTier } from "@/app/types/match";

export const MIN_PRODUCTION_BOOKMAKERS = 3;

export type PublicationRejection =
  | "bookmaker_depth"
  | "missing_market_odds"
  | "missing_probability"
  | "non_positive_value";

type EligibilityInput = {
  bestOdds?: number | null;
  marketAverageOdds?: number | null;
  marketConsensus?: number | null;
  aiFairProbability?: number | null;
  bookmakerCount: number;
};

export type EligiblePredictionMetrics = {
  eligible: true;
  bestOdds: number;
  impliedProbability: number;
  fairProbability: number;
  fairOdds: number | null;
  estimatedValuePct: number;
  bookmakerSpreadPct: number | null;
  riskTier: RiskTier;
};

export type PredictionEligibilityResult =
  | EligiblePredictionMetrics
  | { eligible: false; reason: PublicationRejection };

function safeNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function resolveFairProbability(params: {
  aiFairProbability?: number | null;
  marketConsensus?: number | null;
  impliedProbability?: number | null;
  bookmakerCount?: number | null;
}): number | null {
  const aiFairProbability = safeNumber(params.aiFairProbability);
  const marketConsensus = safeNumber(params.marketConsensus);
  const impliedProbability = safeNumber(params.impliedProbability);
  const bookmakerCount = safeNumber(params.bookmakerCount) ?? 0;

  const marketAnchor = marketConsensus ?? impliedProbability;
  if (marketAnchor == null) return null;

  const boundedAnchor = clamp(marketAnchor, 1, 99);
  if (aiFairProbability == null) return boundedAnchor;

  const maxAiDeviation = bookmakerCount >= 10 ? 5 : bookmakerCount >= 6 ? 4 : 3;
  const aiWeight = bookmakerCount >= 10 ? 0.2 : 0.15;
  const boundedAiProbability = clamp(
    aiFairProbability,
    boundedAnchor - maxAiDeviation,
    boundedAnchor + maxAiDeviation
  );

  return clamp(
    boundedAnchor * (1 - aiWeight) + boundedAiProbability * aiWeight,
    1,
    99
  );
}

function deriveRiskTier(params: {
  bestOdds: number;
  bookmakerCount: number;
  estimatedValuePct: number;
  bookmakerSpreadPct: number | null;
}): RiskTier {
  const baseTier = calculateRiskTier(params.bestOdds, params.bookmakerCount);
  const hasWeakValueSignal = params.estimatedValuePct < 0.75;
  const hasLargePriceDislocation =
    params.bookmakerSpreadPct != null && Math.abs(params.bookmakerSpreadPct) >= 6;

  if (baseTier === "High") return "High";
  if (baseTier === "Low" && !hasWeakValueSignal && !hasLargePriceDislocation) {
    return "Low";
  }
  if (baseTier === "Low") return "Medium";
  if (baseTier === "Medium" && hasLargePriceDislocation && hasWeakValueSignal) {
    return "High";
  }
  return baseTier;
}

export function evaluatePredictionEligibility(
  input: EligibilityInput
): PredictionEligibilityResult {
  if (input.bookmakerCount < MIN_PRODUCTION_BOOKMAKERS) {
    return { eligible: false, reason: "bookmaker_depth" };
  }

  const bestOdds = safeNumber(input.bestOdds);
  if (bestOdds == null || bestOdds <= 1) {
    return { eligible: false, reason: "missing_market_odds" };
  }

  const impliedProbability = decimalOddsToImpliedProbability(bestOdds);
  if (impliedProbability == null) {
    return { eligible: false, reason: "missing_probability" };
  }

  const fairProbability = resolveFairProbability({
    aiFairProbability: input.aiFairProbability,
    marketConsensus: input.marketConsensus,
    impliedProbability,
    bookmakerCount: input.bookmakerCount,
  });
  if (fairProbability == null) {
    return { eligible: false, reason: "missing_probability" };
  }

  const estimatedValue = calculateEstimatedValuePct(fairProbability, bestOdds);
  if (estimatedValue == null || estimatedValue <= 0) {
    return { eligible: false, reason: "non_positive_value" };
  }

  const estimatedValuePct = Number(estimatedValue.toFixed(2));
  const bookmakerSpreadPct = calculateBookmakerSpreadPct(
    bestOdds,
    safeNumber(input.marketAverageOdds)
  );

  return {
    eligible: true,
    bestOdds,
    impliedProbability,
    fairProbability,
    fairOdds: impliedProbabilityToDecimalOdds(fairProbability),
    estimatedValuePct,
    bookmakerSpreadPct,
    riskTier: deriveRiskTier({
      bestOdds,
      bookmakerCount: input.bookmakerCount,
      estimatedValuePct,
      bookmakerSpreadPct,
    }),
  };
}
