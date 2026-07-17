import { env } from "../../lib/env";
import { redis } from "../../lib/redis";
import { selectPick } from "../../lib/social/select-pick";
import { generateFacebookCaption } from "../../lib/social/caption-facebook";
import { publishInstagramCarousel } from "../../lib/social/publish-instagram";
import { publishFacebook } from "../../lib/social/publish-facebook";
import { isAlreadyPosted, savePostedResult } from "../../lib/social/persist-result";
import type { PredictionFile } from "../../lib/social/types";
import { uploadBufferToBlob } from "../../lib/social/upload-image";
import { renderCardToJpeg } from "../../lib/social/render-card-to-jpeg";
import { buildInstagramCarouselCaption } from "../../lib/social/build-instagram-carousel";

function getTopPicks(predictions: PredictionFile) {
  return predictions.sports
    .filter((block) => block.hasMatches)
    .flatMap((block) =>
      (block.topPicks || []).map((pick) => ({
        ...pick,
        sport: block.sport,
      }))
    )
    .filter((pick) => pick.status === "scheduled")
    .filter((pick) => !!pick.prediction && !!pick.market && !!pick.bookmakerUrl)
    .filter((pick) => (pick.bookmakerCount ?? 0) >= 3)
    .filter((pick) => pick.valueDiff > 0)
    .sort((a, b) => b.valueDiff - a.valueDiff)
    .slice(0, 5);
}

export async function GET(req: Request) {
  try {
    const auth = req.headers.get("authorization");

    if (auth !== `Bearer ${env.CRON_SECRET}`) {
      return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const force = new URL(req.url).searchParams.get("force") === "1";

    const now = new Date();
    const dateKey = now.toISOString().slice(0, 10);
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

    const topPicks = getTopPicks(predictions);

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

    const facebookCaption = await generateFacebookCaption(pick);
    const origin = env.NEXT_PUBLIC_SITE_URL;

    const uploadedCarouselImageUrls: string[] = [];

    for (let i = 0; i < topPicks.length; i++) {
      const slidePick = topPicks[i];

      const cardUrl = new URL("/api/social-card", origin);
      cardUrl.searchParams.set("league", slidePick.league);
      cardUrl.searchParams.set("homeTeam", slidePick.homeTeam);
      cardUrl.searchParams.set("awayTeam", slidePick.awayTeam);
      cardUrl.searchParams.set("prediction", slidePick.prediction);
      cardUrl.searchParams.set("market", slidePick.market);
      cardUrl.searchParams.set("valueDiff", slidePick.valueDiff.toFixed(2));
      cardUrl.searchParams.set("riskTier", slidePick.riskTier);
      cardUrl.searchParams.set("bookmakerCount", String(slidePick.bookmakerCount ?? 0));
      cardUrl.searchParams.set(
        "startTime",
        new Date(slidePick.startTime).toLocaleString("en-GB", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "UTC",
        })
      );

      const jpegBuffer = await renderCardToJpeg(cardUrl.toString());

      const imageUrl = await uploadBufferToBlob(
        jpegBuffer,
        `${pick.id}-carousel-${i + 1}.jpg`,
        "image/jpeg"
      );

      uploadedCarouselImageUrls.push(imageUrl);
    }

    const ig = await publishInstagramCarousel(
      uploadedCarouselImageUrls,
      instagramCaption
    );

    const facebookCardUrl = new URL("/api/social-card", origin);
    facebookCardUrl.searchParams.set("league", pick.league);
    facebookCardUrl.searchParams.set("homeTeam", pick.homeTeam);
    facebookCardUrl.searchParams.set("awayTeam", pick.awayTeam);
    facebookCardUrl.searchParams.set("prediction", pick.prediction);
    facebookCardUrl.searchParams.set("market", pick.market);
    facebookCardUrl.searchParams.set("valueDiff", pick.valueDiff.toFixed(2));
    facebookCardUrl.searchParams.set("riskTier", pick.riskTier);
    facebookCardUrl.searchParams.set("bookmakerCount", String(pick.bookmakerCount ?? 0));
    facebookCardUrl.searchParams.set(
      "startTime",
      new Date(pick.startTime).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC",
      })
    );

    const fbJpegBuffer = await renderCardToJpeg(facebookCardUrl.toString());

    const facebookImageUrl = await uploadBufferToBlob(
      fbJpegBuffer,
      `${pick.id}.jpg`,
      "image/jpeg"
    );

    let fb: unknown = null;
    let facebookError: string | null = null;

    try {
      fb = await publishFacebook(facebookImageUrl, facebookCaption);
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
  }
}