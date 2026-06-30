import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

type Prediction = {
  id: string;
  league: string;
  eventId: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  preview: string;
  bestOdds: number;
  impliedProbability: number;
  bookmakerCount: number;
  bookmaker: string;
  bookmakerUrl: string;
  ctaLabel: string;
  status: "scheduled" | "live" | "finished";
};

type PredictionsData = {
  date: string;
  generatedAt: string;
  sports: {
    sport: string;
    hasMatches: boolean;
    message?: string;
    topPicks: Prediction[];
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
      const CACHE_KEY = `predictions:${dateKey}`;
      const data = await redis.get<PredictionsData>(CACHE_KEY);
      if (data) {
        if (offset > 0) {
          console.warn(
            `[getPredictions] Mai (${getDateKey(0)}) kulcs hiányzik, visszaesés: ${CACHE_KEY}`
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