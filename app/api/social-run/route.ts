import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";

import { env } from "../../lib/env";
import { redis } from "../../lib/redis";
import { selectPick } from "../../lib/social/select-pick";
import { generateFacebookCaption } from "../../lib/social/caption-facebook";
import { publishInstagramCarousel } from "../../lib/social/publish-instagram";
import { publishFacebook } from "../../lib/social/publish-facebook";
import { isAlreadyPosted, savePostedResult } from "../../lib/social/persist-result";
import type { PredictionFile } from "../../lib/social/types";
import { uploadBufferToBlob } from "../../lib/social/upload-image";
import {
  buildInstagramCarouselCaption,
  buildInstagramCarouselPlan,
} from "../../lib/social/build-instagram-carousel";
import { renderInstagramCarouselCard } from "../../lib/social/render-instagram-carousel-card";
import { renderCardToJpeg } from "../../lib/social/render-card-to-jpeg";

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

    const instagramSlides = buildInstagramCarouselPlan(predictions);
    const instagramCaption = buildInstagramCarouselCaption(instagramSlides);
    const facebookCaption = await generateFacebookCaption(pick);

    const uploadedCarouselImageUrls: string[] = [];
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "ig-carousel-"));

    try {
      for (let i = 0; i < instagramSlides.length; i++) {
        const slide = instagramSlides[i];
        const outputPath = path.join(tmpDir, `slide-${i + 1}.jpg`);

        await renderInstagramCarouselCard(
          slide,
          outputPath,
          i + 1,
          instagramSlides.length
        );

        const buffer = await fs.readFile(outputPath);

        const imageUrl = await uploadBufferToBlob(
          buffer,
          `${pick.id}-carousel-${i + 1}.jpg`,
          "image/jpeg"
        );

        uploadedCarouselImageUrls.push(imageUrl);
      }
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }

    const ig = await publishInstagramCarousel(
      uploadedCarouselImageUrls,
      instagramCaption
    );

    const origin = env.NEXT_PUBLIC_SITE_URL;

    const cardUrl = new URL("/api/social-card", origin);
    cardUrl.searchParams.set("league", pick.league);
    cardUrl.searchParams.set("homeTeam", pick.homeTeam);
    cardUrl.searchParams.set("awayTeam", pick.awayTeam);
    cardUrl.searchParams.set("prediction", pick.prediction);
    cardUrl.searchParams.set("market", pick.market);
    cardUrl.searchParams.set("odds", pick.bestOdds.toFixed(2));
    cardUrl.searchParams.set("valueDiff", pick.valueDiff.toFixed(2));
    cardUrl.searchParams.set("riskTier", pick.riskTier);
    cardUrl.searchParams.set("bookmakerCount", String(pick.bookmakerCount ?? 0));
    cardUrl.searchParams.set(
      "startTime",
      new Date(pick.startTime).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC",
      })
    );

    const jpegBuffer = await renderCardToJpeg(cardUrl.toString());

    const facebookImageUrl = await uploadBufferToBlob(
      jpegBuffer,
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
      instagramSlidesCount: instagramSlides.length,
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