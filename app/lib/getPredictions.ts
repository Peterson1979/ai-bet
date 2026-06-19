import { Redis } from "@upstash/redis";
import type { MarketType } from "@/app/types/match";

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
  recommendedBet: string;
  betCode: string;
  marketType: MarketType;
  selectionKey: string;
  explanation: string;
  confidence: number;
  risk: number;
  odds: number;
  oddsLabel: string;
  bookmaker: string;
  bookmakerUrl: string;
  ctaLabel: string;
  isTopPick: boolean;
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

// Hány napra menjünk visszafelé, ha a mai (vagy egy adott napi) kulcs hiányzik
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
          // Jelezzük, ha nem a mai adatot szolgáltatjuk ki - hasznos logolásra,
          // illetve a UI-n megjeleníthető egy "utoljára frissítve" infóhoz
          console.warn(
            `[getPredictions] Mai (${getDateKey(0)}) kulcs hiányzik, visszaesés: ${CACHE_KEY}`
          );
        }
        return data;
      }
    }

    // Ha semelyik napra nincs adat, csak akkor adjunk vissza null-t
    console.error(
      `[getPredictions] Nincs elérhető predictions adat az utóbbi ${MAX_FALLBACK_DAYS + 1} napra.`
    );
    return null;
  } catch (err) {
    console.error("[getPredictions] Redis hiba:", err);
    return null;
  }
}