import { Redis } from "@upstash/redis";
import type { MatchStatus, RiskTier } from "@/app/types/match";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export type PredictionCard = {
  id: string;
  league: string;
  eventId: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  market: string;
  prediction: string;
  reasoning: string;
  reasoningTranslations?: Partial<Record<string, string>>;
  riskTier: RiskTier;
  bestOdds: number;
  impliedProbability: number;
  bookmakerCount: number;
  bookmaker: string;
  bookmakerUrl: string;
  ctaLabel: string;
  status: MatchStatus;

  partnerOdds?: number | null;
  partnerBookmaker?: string | null;
  partnerRating?: number | null;
  marketAverageOdds?: number | null;
  consensusImpliedProb?: number | null;
  valueDiff?: number | null;
  fairProbability?: number | null;
  fairOdds?: number | null;
  estimatedValuePct?: number | null;
  bookmakerSpreadPct?: number | null;
  whySignal?: string[];
};

export type PredictionsData = {
  date: string;
  generatedAt: string;
  sports: {
    sport: string;
    hasMatches: boolean;
    message?: string;
    topPicks: PredictionCard[];
  }[];
};

const MAX_FALLBACK_DAYS = 3;

function getDateKey(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return d.toISOString().split("T")[0];
}

export async function getPredictions(): Promise<PredictionsData | null> {
  try {
    for (let offset = 0; offset <= MAX_FALLBACK_DAYS; offset++) {
      const dateKey = getDateKey(offset);
      const cacheKey = `predictions:${dateKey}`;
      const data = await redis.get<PredictionsData>(cacheKey);

      if (data) {
        if (offset > 0) {
          console.warn(
            `[getPredictions] Mai (${getDateKey(0)}) kulcs hiányzik, visszaesés: ${cacheKey}`
          );
        }
        return data;
      }
    }

    console.error(
      `[getPredictions] Nincs elérhető predictions adat az utóbbi ${MAX_FALLBACK_DAYS + 1} napra.`
    );
    return null;
  } catch (err) {
    console.error("[getPredictions] Redis hiba:", err);
    return null;
  }
}