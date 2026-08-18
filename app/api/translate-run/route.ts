import { redis } from "@/app/lib/redis";
import { translateReasonings } from "@/app/lib/translation";
import type { PredictionsData } from "@/app/lib/getPredictions";

export const maxDuration = 300;

function getUtcDateKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const date = getUtcDateKey();
  const cacheKey = `predictions:${date}`;

  try {
    const data = await redis.get<PredictionsData>(cacheKey);

    if (!data) {
      return Response.json({
        success: true,
        stored: false,
        date,
        reason: "no_predictions_cache",
      });
    }

    const items: Array<{ id: string; reasoning: string }> = [];

    for (const sport of data.sports) {
      if (!Array.isArray(sport.topPicks)) continue;

      for (const pick of sport.topPicks) {
        const translationCount = pick.reasoningTranslations
          ? Object.keys(pick.reasoningTranslations).length
          : 0;

        if (pick.id && pick.reasoning && translationCount < 10) {
          items.push({ id: pick.id, reasoning: pick.reasoning });
        }
      }
    }

    if (items.length === 0) {
      return Response.json({
        success: true,
        stored: false,
        date,
        reason: "translations_complete",
      });
    }

    const translationResult = await translateReasonings(items);
    let applied = 0;

    for (const sport of data.sports) {
      if (!Array.isArray(sport.topPicks)) continue;

      for (const pick of sport.topPicks) {
        const translations = translationResult.translations.get(pick.id);

        if (translations && Object.keys(translations).length > 0) {
          pick.reasoningTranslations = translations;
          applied += 1;
        }
      }
    }

    if (applied > 0) {
      const ttl = await redis.ttl(cacheKey);

      if (typeof ttl === "number" && ttl > 0) {
        await redis.set(cacheKey, data, { ex: ttl });
      } else {
        await redis.set(cacheKey, data);
      }
    }

    return Response.json({
      success: true,
      stored: applied > 0,
      date,
      totalItems: items.length,
      translatedCount: translationResult.translations.size,
      applied,
      usage: translationResult.usage,
    });
  } catch (error) {
    console.error("[translate-run] Failed", error);

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Translation run failed",
      },
      { status: 500 }
    );
  }
}
