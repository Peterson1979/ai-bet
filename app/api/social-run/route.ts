import { env } from "../../lib/env";
import { redis } from "../../lib/redis";
import { selectPick } from "../../lib/social/select-pick";
import { publishInstagramCarousel } from "../../lib/social/publish-instagram";
import { publishFacebook } from "../../lib/social/publish-facebook";
import { generateFacebookCarouselCaption } from "../../lib/social/caption-facebook";
import { isAlreadyPosted, savePostedResult } from "../../lib/social/persist-result";
import type { Candidate, PredictionFile, TopPick } from "../../lib/social/types";
import { uploadBufferToBlob } from "../../lib/social/upload-image";
import { renderCardToJpeg } from "../../lib/social/render-card-to-jpeg";
import { buildInstagramCarouselCaption } from "../../lib/social/build-instagram-carousel";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

const MIN_BOOKMAKERS = 3;
const MIN_START_BUFFER_MINUTES = 90;
const MAX_CAROUSEL_PICKS = 5;
const DEFAULT_LEAGUE_PRIORITY = 60;
const LOCK_TTL_SECONDS = 15 * 60;

const LEAGUE_PRIORITY: Record<string, number> = {
  "FIFA World Cup": 100,
  "UEFA Champions League": 100,
  "Premier League": 98,
  "La Liga": 96,
  "Serie A": 94,
  "Bundesliga": 94,
  "Ligue 1": 90,
  "UEFA Europa League": 88,
  "UEFA Conference League": 84,
  "Copa Libertadores": 86,
  "MLS": 78,
  "Liga MX": 80,
  "Brazil Série A": 82,
  "Brazil Serie A": 82,
  Championship: 72,
  "J League": 70,
  "K League": 70,
  NBA: 100,
  NFL: 100,
  MLB: 95,
  NHL: 95,
  ATP: 88,
  WTA: 86,
  "ATP 1000": 96,
  "WTA 1000": 94,
  "Grand Slam": 100,
  MMA: 82,
  Boxing: 84,
};

type CarouselPick = Candidate;

function getLeaguePriority(league: string): number {
  return LEAGUE_PRIORITY[league] ?? DEFAULT_LEAGUE_PRIORITY;
}

function getOddsScore(bestOdds: number): number {
  if (bestOdds >= 1.7 && bestOdds <= 2.5) return 10;
  if (bestOdds >= 1.5 && bestOdds < 1.7) return 6;
  if (bestOdds > 2.5 && bestOdds <= 3.2) return 5;
  return 0;
}

function getBookmakerScore(bookmakerCount: number): number {
  if (bookmakerCount >= 12) return 8;
  if (bookmakerCount >= 8) return 5;
  if (bookmakerCount >= 5) return 3;
  return 0;
}

function getRiskTierScore(riskTier: TopPick["riskTier"]): number {
  switch (riskTier) {
    case "Low":
      return 10;
    case "Medium":
      return 6;
    case "High":
      return 2;
    default:
      return 4;
  }
}

function getPriorityKey(pick: TopPick & { sport: string }): string {
  return `${pick.sport}::${pick.league}`;
}

function isEligibleForCarouselPick(
  pick: TopPick & { sport: string },
  now: Date
): boolean {
  if (pick.status !== "scheduled") return false;
  if (!pick.prediction || !pick.market || !pick.bookmakerUrl) return false;
  if (pick.bookmakerCount < MIN_BOOKMAKERS) return false;
  if (pick.valueDiff <= 0) return false;

  const start = new Date(pick.startTime);
  if (Number.isNaN(start.getTime())) return false;

  const minStart = new Date(now.getTime() + MIN_START_BUFFER_MINUTES * 60 * 1000);
  if (start < minStart) return false;

  return true;
}

function calculateSocialScore(pick: TopPick & { sport: string }): CarouselPick {
  const leaguePriority = getLeaguePriority(pick.league);
  const riskTierScore = getRiskTierScore(pick.riskTier);
  const oddsScore = getOddsScore(pick.bestOdds);
  const bookmakerScore = getBookmakerScore(pick.bookmakerCount);

  const socialScore =
    pick.valueDiff * 0.35 +
    leaguePriority * 0.25 +
    riskTierScore * 0.2 +
    oddsScore * 0.1 +
    bookmakerScore * 0.1;

  return {
    ...pick,
    priorityKey: getPriorityKey(pick),
    socialScore,
  };
}

function getTeamKeys(pick: Pick<TopPick, "homeTeam" | "awayTeam">): string[] {
  return [pick.homeTeam, pick.awayTeam].map((team) => team.trim().toLowerCase());
}

function hasTeamConflict(
  pick: Pick<TopPick, "homeTeam" | "awayTeam">,
  usedTeams: Set<string>
): boolean {
  return getTeamKeys(pick).some((team) => usedTeams.has(team));
}

function markTeamsAsUsed(
  pick: Pick<TopPick, "homeTeam" | "awayTeam">,
  usedTeams: Set<string>
): void {
  for (const team of getTeamKeys(pick)) {
    usedTeams.add(team);
  }
}

function getTopPicks(predictions: PredictionFile, now: Date): CarouselPick[] {
  const eligible = predictions.sports
    .filter((block) => block.hasMatches)
    .flatMap((block) =>
      block.topPicks.map((pick) => ({
        ...pick,
        sport: block.sport,
      }))
    )
    .filter((pick) => isEligibleForCarouselPick(pick, now))
    .map((pick) => calculateSocialScore(pick))
    .sort((a, b) => b.socialScore - a.socialScore);

  const selected: CarouselPick[] = [];
  const usedSports = new Set<string>();
  const usedTeams = new Set<string>();

  for (const pick of eligible) {
    const sportKey = pick.sport.trim().toLowerCase();

    if (usedSports.has(sportKey)) continue;
    if (hasTeamConflict(pick, usedTeams)) continue;

    selected.push(pick);
    usedSports.add(sportKey);
    markTeamsAsUsed(pick, usedTeams);

    if (selected.length >= MAX_CAROUSEL_PICKS) {
      return selected;
    }
  }

  for (const pick of eligible) {
    const alreadySelected = selected.some((item) => item.id === pick.id);

    if (alreadySelected) continue;
    if (hasTeamConflict(pick, usedTeams)) continue;

    selected.push(pick);
    markTeamsAsUsed(pick, usedTeams);

    if (selected.length >= MAX_CAROUSEL_PICKS) {
      break;
    }
  }

  return selected;
}

function formatStartTimeUtc(startTime: string): string {
  const date = new Date(startTime);

  return date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });
}

function formatValueDiff(valueDiff: number): string {
  return valueDiff.toFixed(2);
}

function buildCardUrl(
  origin: string,
  slidePick: Pick<
    TopPick,
    | "league"
    | "homeTeam"
    | "awayTeam"
    | "prediction"
    | "market"
    | "valueDiff"
    | "riskTier"
    | "bookmakerCount"
    | "startTime"
  >
): string {
  const cardUrl = new URL("/api/social-card", origin);

  cardUrl.searchParams.set("template", "v2");
  cardUrl.searchParams.set("league", slidePick.league);
  cardUrl.searchParams.set("homeTeam", slidePick.homeTeam);
  cardUrl.searchParams.set("awayTeam", slidePick.awayTeam);
  cardUrl.searchParams.set("prediction", slidePick.prediction);
  cardUrl.searchParams.set("market", slidePick.market);
  cardUrl.searchParams.set("valueDiff", formatValueDiff(slidePick.valueDiff));
  cardUrl.searchParams.set("riskTier", slidePick.riskTier);
  cardUrl.searchParams.set("bookmakerCount", String(slidePick.bookmakerCount));
  cardUrl.searchParams.set("startTime", formatStartTimeUtc(slidePick.startTime));

  return cardUrl.toString();
}

export async function GET(req: Request) {
  const now = new Date();
  const dateKey = now.toISOString().slice(0, 10);
  const lockKey = `social-run-lock:${dateKey}`;

  try {
    const auth = req.headers.get("authorization");

    if (auth !== `Bearer ${env.CRON_SECRET}`) {
      return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const force = new URL(req.url).searchParams.get("force") === "1";

    if (!force) {
      const acquired = await redis.set(lockKey, "1", { nx: true, ex: LOCK_TTL_SECONDS });

      if (!acquired) {
        return Response.json({
          ok: true,
          skipped: true,
          reason: "publish already in progress",
        });
      }
    }

    const redisKey = `predictions:${dateKey}`;
    const predictions = await redis.get<PredictionFile>(redisKey);

    if (!predictions) {
      return Response.json(
        { ok: false, error: `missing redis key ${redisKey}` },
        { status: 404 }
      );
    }

    const pick = selectPick(predictions, now);

    if (!pick) {
      return Response.json({
        ok: true,
        skipped: true,
        reason: "no eligible pick",
      });
    }

    if (!force && (await isAlreadyPosted(pick.id))) {
      return Response.json({
        ok: true,
        skipped: true,
        reason: "already posted",
        pickId: pick.id,
      });
    }

    const topPicks = getTopPicks(predictions, now);

    if (topPicks.length < 2) {
      return Response.json({
        ok: true,
        skipped: true,
        reason: "not enough picks for carousel",
        pickId: pick.id,
      });
    }

    const instagramCaption = buildInstagramCarouselCaption(
      topPicks.map((p) => ({
        type: "sport-pick" as const,
        sport: p.sport,
        league: p.league,
        homeTeam: p.homeTeam,
        awayTeam: p.awayTeam,
        market: p.market,
        pick: p.prediction,
        odds: p.bestOdds,
        confidence: p.riskTier,
        startTime: p.startTime,
        valueDiff: p.valueDiff,
      }))
    );

   const facebookCaption = await generateFacebookCarouselCaption(topPicks);

    const origin = env.NEXT_PUBLIC_SITE_URL;
    const uploadedCarouselImageUrls: string[] = [];

    for (let i = 0; i < topPicks.length; i++) {
      const slidePick = topPicks[i];
      const cardUrl = buildCardUrl(origin, slidePick);
      const jpegBuffer = await renderCardToJpeg(cardUrl);

      const imageUrl = await uploadBufferToBlob(
        jpegBuffer,
        `${pick.id}-carousel-${i + 1}.jpg`,
        "image/jpeg"
      );

      uploadedCarouselImageUrls.push(imageUrl);
    }

    if (!force && (await isAlreadyPosted(pick.id))) {
      return Response.json({
        ok: true,
        skipped: true,
        reason: "already posted after render",
        pickId: pick.id,
        instagramSlidesCount: uploadedCarouselImageUrls.length,
        instagramSlideImageUrls: uploadedCarouselImageUrls,
      });
    }

    const ig = await publishInstagramCarousel(
      uploadedCarouselImageUrls,
      instagramCaption
    );

    let fb: unknown = null;
    let facebookError: string | null = null;

    try {
      fb = await publishFacebook(uploadedCarouselImageUrls, facebookCaption);
    } catch (error) {
      facebookError =
        error instanceof Error ? error.message : "unknown facebook publish error";
    }

    await savePostedResult(pick, {
      imageUrl: uploadedCarouselImageUrls[0] ?? null,
      caption: instagramCaption,
      ig,
      fb,
    });

    return Response.json({
      ok: true,
      pickId: pick.id,
      instagramSlidesCount: uploadedCarouselImageUrls.length,
      instagramSlideImageUrls: uploadedCarouselImageUrls,
      instagram: ig,
      facebook: fb,
      instagramCaption,
      facebookCaption,
      facebookError,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "unknown route error",
      },
      { status: 500 }
    );
  } finally {
    await redis.del(lockKey);
  }
}