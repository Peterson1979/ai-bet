import { env } from "../../lib/env";
import { redis } from "../../lib/redis";
import { selectPick } from "../../lib/social/select-pick";
import { calculateSocialScore } from "../../lib/social/score";
import { publishInstagramCarousel } from "../../lib/social/publish-instagram";
import { publishFacebook } from "../../lib/social/publish-facebook";
import { generateFacebookCarouselCaption } from "../../lib/social/caption-facebook";
import {
  getPublicationId,
  getPublicationState,
  updatePublicationChannel,
  isLegacyPosted,
  savePostedResult,
} from "../../lib/social/persist-result";
import type { Candidate, PredictionFile, TopPick } from "../../lib/social/types";
import { uploadBufferToBlob } from "../../lib/social/upload-image";
import { renderCardToJpeg } from "../../lib/social/render-card-to-jpeg";
import { buildInstagramCarouselCaption } from "../../lib/social/build-instagram-carousel";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

const MIN_BOOKMAKERS = 3;
const MIN_START_BUFFER_MINUTES = 90;
const MAX_CAROUSEL_PICKS = 3;
const LOCK_TTL_SECONDS = 15 * 60;

const RELEASE_LOCK_LUA = `
if redis.call("get", KEYS[1]) == ARGV[1] then
  return redis.call("del", KEYS[1])
else
  return 0
end
`;

type CarouselPick = Candidate;

function getPrimaryOdds(pick: TopPick): number | null {
  if (typeof pick.bestOdds === "number") return pick.bestOdds;
  if (typeof pick.partnerOffer?.odds === "number") return pick.partnerOffer.odds;
  if (typeof pick.partnerOdds === "number") return pick.partnerOdds;
  return null;
}

function getPrimaryValue(pick: TopPick): number | null {
  if (typeof pick.estimatedValuePct === "number") return pick.estimatedValuePct;
  if (typeof pick.valueDiff === "number") return pick.valueDiff;
  return null;
}

function getPriorityKey(pick: TopPick & { sport: string }): string {
  return `${pick.sport}::${pick.league}`;
}

function isEligibleForCarouselPick(
  pick: TopPick & { sport: string },
  now: Date
): boolean {
  if (pick.status !== "scheduled") return false;
  if (!pick.prediction || !pick.market) return false;
  if (pick.bookmakerCount < MIN_BOOKMAKERS) return false;

  const primaryValue = getPrimaryValue(pick);
  if (typeof primaryValue !== "number" || primaryValue <= 0) return false;

  const start = new Date(pick.startTime);
  if (Number.isNaN(start.getTime())) return false;

  const minStart = new Date(now.getTime() + MIN_START_BUFFER_MINUTES * 60 * 1000);
  if (start < minStart) return false;

  return true;
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
    .map((pick) => ({
      ...pick,
      priorityKey: getPriorityKey(pick),
      socialScore: calculateSocialScore({
        ...pick,
        priorityKey: getPriorityKey(pick),
        socialScore: 0,
      }),
    }))
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

    if (selected.length >= MAX_CAROUSEL_PICKS) return selected;
  }

  for (const pick of eligible) {
    const alreadySelected = selected.some((item) => item.id === pick.id);
    if (alreadySelected) continue;
    if (hasTeamConflict(pick, usedTeams)) continue;

    selected.push(pick);
    markTeamsAsUsed(pick, usedTeams);

    if (selected.length >= MAX_CAROUSEL_PICKS) break;
  }

  return selected;
}

function formatStartTimeUtc(startTime: string): string {
  const date = new Date(startTime);
  return `${date.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" })} UTC`;
}

function formatNumber(value: number | null | undefined, digits = 2): string {
  if (typeof value !== "number" || Number.isNaN(value)) return "";
  return value.toFixed(digits);
}

function buildCardUrl(origin: string, slidePick: TopPick) {
  const cardUrl = new URL("/api/social-card", origin);

  cardUrl.searchParams.set("template", "v4");
  cardUrl.searchParams.set("league", slidePick.league);
  cardUrl.searchParams.set("homeTeam", slidePick.homeTeam);
  cardUrl.searchParams.set("awayTeam", slidePick.awayTeam);
  cardUrl.searchParams.set("prediction", slidePick.prediction);
  cardUrl.searchParams.set("market", slidePick.market);
  cardUrl.searchParams.set("riskTier", slidePick.riskTier);
  cardUrl.searchParams.set("startTime", formatStartTimeUtc(slidePick.startTime));

  const primaryOdds = getPrimaryOdds(slidePick);
  const estimatedValue = getPrimaryValue(slidePick);

  if (primaryOdds !== null) {
    cardUrl.searchParams.set("bestOdds", formatNumber(primaryOdds));
  }
  const actualPartnerOdds =
    typeof slidePick.partnerOffer?.odds === "number"
      ? slidePick.partnerOffer.odds
      : slidePick.partnerOdds;
  if (typeof actualPartnerOdds === "number") {
    cardUrl.searchParams.set("partnerOdds", formatNumber(actualPartnerOdds));
  }
  if (typeof slidePick.marketAverageOdds === "number") {
    cardUrl.searchParams.set("marketAverageOdds", formatNumber(slidePick.marketAverageOdds));
  }
  if (estimatedValue !== null) {
    cardUrl.searchParams.set("valueEdge", estimatedValue.toFixed(1));
    cardUrl.searchParams.set("estimatedValuePct", estimatedValue.toFixed(1));
  }
  if (typeof slidePick.bookmakerCount === "number") {
    cardUrl.searchParams.set("booksSampled", String(slidePick.bookmakerCount));
  }
  if (slidePick.reasoning) {
    cardUrl.searchParams.set("reasoning", slidePick.reasoning);
  }

  const whySignal =
    Array.isArray(slidePick.whySignal) && slidePick.whySignal.length > 0
      ? slidePick.whySignal.slice(0, 2)
      : [];

  whySignal.forEach((item, idx) => {
    cardUrl.searchParams.set(`why${idx + 1}`, item);
  });

  return cardUrl.toString();
}

export async function GET(req: Request) {
  const now = new Date();
  const dateKey = now.toISOString().slice(0, 10);
  const lockKey = `social-run-lock:${dateKey}`;
  const runId = crypto.randomUUID();

  let lockAcquired = false;
  let stage = "start";

  try {
    console.log("[social-run] start", { dateKey });

    const bearer = req.headers.get("authorization");
    const cronHeader = req.headers.get("x-cron-secret");

    const hasBearer = !!bearer;
    const hasCronHeader = !!cronHeader;

    const bearerToken = bearer?.startsWith("Bearer ")
      ? bearer.slice("Bearer ".length)
      : null;

    const isAuthorized =
      (bearerToken && bearerToken === env.CRON_SECRET) ||
      (cronHeader && cronHeader === env.CRON_SECRET);

    if (!isAuthorized) {
      console.warn("[social-run] unauthorized", {
        hasBearer,
        hasCronHeader,
      });

      return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const force = new URL(req.url).searchParams.get("force") === "1";
    console.log("[social-run] auth ok", { force });

    stage = "acquiring-lock";
    const acquired = await redis.set(lockKey, runId, {
      nx: true,
      ex: LOCK_TTL_SECONDS,
    });

    if (!acquired) {
      console.log("[social-run] skipped: publish already in progress");
      return Response.json({
        ok: true,
        skipped: true,
        reason: "publish_in_progress",
      });
    }

    lockAcquired = true;

    stage = "loading-predictions";
    const redisKey = `predictions:${dateKey}`;
    const predictions = await redis.get<PredictionFile>(redisKey);

    if (!predictions) {
      console.warn("[social-run] missing predictions", { redisKey });
      return Response.json(
        { ok: false, error: `missing redis key ${redisKey}` },
        { status: 404 }
      );
    }

    stage = "selecting-carousel-picks";
    const topPicks = getTopPicks(predictions, now);

    if (topPicks.length < 2) {
      console.log("[social-run] skipped: not enough picks for post", {
        topPicksCount: topPicks.length,
      });
      return Response.json({
        ok: true,
        skipped: true,
        reason: "not enough picks for post",
        topPicksCount: topPicks.length,
      });
    }

    const publicationId = getPublicationId(dateKey, topPicks);
    const pickIds = topPicks.map((p) => p.id);
    const primaryPick = selectPick(predictions, now) ?? topPicks[0];

    stage = "checking-publication-state";
    const pubState = await getPublicationState(publicationId);

    const igAlreadyPublished = pubState?.instagram?.status === "published";
    const fbAlreadyPublished = pubState?.facebook?.status === "published";

    if (igAlreadyPublished && fbAlreadyPublished) {
      console.log("[social-run] skipped: all channels already published", {
        publicationId,
      });
      return Response.json({
        ok: true,
        skipped: true,
        reason: "all_channels_already_published",
        publicationId,
        instagram: {
          status: "skipped",
          postId: pubState?.instagram?.postId ?? null,
        },
        facebook: {
          status: "skipped",
          postId: pubState?.facebook?.postId ?? null,
        },
      });
    }

    if (!pubState && primaryPick && (await isLegacyPosted(primaryPick.id))) {
      console.log("[social-run] skipped: legacy publication already recorded", {
        pickId: primaryPick.id,
        publicationId,
      });
      return Response.json({
        ok: true,
        skipped: true,
        reason: "legacy_publication_already_recorded",
        publicationId,
        pickId: primaryPick.id,
      });
    }

    stage = "building-captions";
    const instagramCaption = buildInstagramCarouselCaption(
      topPicks.map((p) => ({
        type: "sport-pick" as const,
        sport: p.sport,
        league: p.league,
        homeTeam: p.homeTeam,
        awayTeam: p.awayTeam,
        market: p.market,
        pick: p.prediction,
        startTime: p.startTime,
        riskTier: p.riskTier,
        bookmakerCount: p.bookmakerCount,
        partnerOdds: p.bestOdds ?? null,
        marketAverageOdds: p.marketAverageOdds ?? null,
        fairOdds: p.fairOdds ?? null,
        fairProbability: p.fairProbability ?? null,
        estimatedValuePct: p.estimatedValuePct ?? p.valueDiff ?? null,
        whySignal: Array.isArray(p.whySignal) ? p.whySignal.slice(0, 2) : [],
      }))
    );

    const facebookCaption = await generateFacebookCarouselCaption(topPicks);

    stage = "rendering-uploading";
    const origin = env.NEXT_PUBLIC_SITE_URL;
    const uploadedCarouselImageUrls: string[] = [];

    for (let i = 0; i < topPicks.length; i++) {
      const slidePick = topPicks[i];
      const cardUrl = buildCardUrl(origin, slidePick);

      console.log("[social-run] rendering slide", {
        index: i + 1,
        total: topPicks.length,
        pickId: slidePick.id,
      });

      const jpegBuffer = await renderCardToJpeg(cardUrl);
      const imageUrl = await uploadBufferToBlob(
        jpegBuffer,
        `${publicationId}-slide-${i + 1}.jpg`,
        "image/jpeg"
      );

      uploadedCarouselImageUrls.push(imageUrl);
    }

    stage = "publishing-instagram";
    let ig: unknown = null;
    let instagramError: string | null = null;
    let instagramResultStatus: "published" | "skipped" | "failed" = "skipped";
    let igPostId: string | null = pubState?.instagram?.postId ?? null;

    if (igAlreadyPublished) {
      console.log("[social-run] instagram already published, skipping", {
        publicationId,
      });
      instagramResultStatus = "skipped";
    } else {
      try {
        ig = await publishInstagramCarousel(uploadedCarouselImageUrls, instagramCaption);
        igPostId = (ig as any)?.id ? String((ig as any).id) : null;
        instagramResultStatus = "published";
        console.log("[social-run] instagram publish done", { igPostId });

        await updatePublicationChannel(publicationId, dateKey, pickIds, "instagram", {
          status: "published",
          postId: igPostId,
          publishedAt: new Date().toISOString(),
        });
      } catch (error) {
        instagramError =
          error instanceof Error ? error.message : "unknown instagram publish error";
        console.error("[social-run] instagram publish failed", { instagramError });
        instagramResultStatus = "failed";

        await updatePublicationChannel(publicationId, dateKey, pickIds, "instagram", {
          status: "failed",
          error: instagramError.slice(0, 300),
        });
      }
    }

    stage = "publishing-facebook";
    let fb: unknown = null;
    let facebookError: string | null = null;
    let facebookResultStatus: "published" | "skipped" | "failed" = "skipped";
    let fbPostId: string | null = pubState?.facebook?.postId ?? null;

    if (fbAlreadyPublished) {
      console.log("[social-run] facebook already published, skipping", {
        publicationId,
      });
      facebookResultStatus = "skipped";
    } else {
      try {
        fb = await publishFacebook(uploadedCarouselImageUrls, facebookCaption);
        fbPostId = (fb as any)?.post?.id ? String((fb as any).post.id) : null;
        facebookResultStatus = "published";
        console.log("[social-run] facebook publish done", { fbPostId });

        await updatePublicationChannel(publicationId, dateKey, pickIds, "facebook", {
          status: "published",
          postId: fbPostId,
          publishedAt: new Date().toISOString(),
        });
      } catch (error) {
        facebookError =
          error instanceof Error ? error.message : "unknown facebook publish error";
        console.error("[social-run] facebook publish failed", { facebookError });
        facebookResultStatus = "failed";

        await updatePublicationChannel(publicationId, dateKey, pickIds, "facebook", {
          status: "failed",
          error: facebookError.slice(0, 300),
        });
      }
    }

    const igFinalPublished =
      igAlreadyPublished || instagramResultStatus === "published";
    const fbFinalPublished =
      fbAlreadyPublished || facebookResultStatus === "published";

    if (igFinalPublished && fbFinalPublished && primaryPick) {
      try {
        await savePostedResult(primaryPick, {
          imageUrl:
            uploadedCarouselImageUrls[0] ?? pubState?.instagram?.postId ?? "",
          caption: instagramCaption,
          ig: ig ?? pubState?.instagram,
          fb: fb ?? pubState?.facebook,
        });
      } catch (legacyErr) {
        console.warn("[social-run] legacy savePostedResult error:", legacyErr);
      }
    }

    const isFullySuccessful = igFinalPublished && fbFinalPublished;

    return Response.json({
      ok: isFullySuccessful,
      publicationId,
      pickId: primaryPick?.id ?? null,
      instagram: {
        status: instagramResultStatus,
        postId: igPostId,
        error: instagramError,
      },
      facebook: {
        status: facebookResultStatus,
        postId: fbPostId,
        error: facebookError,
      },
      instagramSlidesCount: uploadedCarouselImageUrls.length,
      instagramSlideImageUrls: uploadedCarouselImageUrls,
      instagramCaption,
      facebookCaption,
      stage: "done",
    });
  } catch (error) {
    console.error("[social-run] fatal error", {
      stage,
      message: error instanceof Error ? error.message : "unknown route error",
      stack: error instanceof Error ? error.stack : null,
    });

    return Response.json(
      {
        ok: false,
        stage,
        error: error instanceof Error ? error.message : "unknown route error",
      },
      { status: 500 }
    );
  } finally {
    if (lockAcquired) {
      try {
        await redis.eval(RELEASE_LOCK_LUA, [lockKey], [runId]);
      } catch (releaseError) {
        console.error("[social-run] Lock release error:", releaseError);
      }
    }
  }
}
