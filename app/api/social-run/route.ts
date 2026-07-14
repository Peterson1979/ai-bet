import { env } from "../../lib/env";
import { redis } from "../../lib/redis";
import { selectPick } from "../../lib/social/select-pick";
import { generateCaption } from "../../lib/social/caption";
import { publishInstagram } from "../../lib/social/publish-instagram";
import { publishFacebook } from "../../lib/social/publish-facebook";
import { isAlreadyPosted, savePostedResult } from "../../lib/social/persist-result";
import type { PredictionFile } from "../../lib/social/types";
import { uploadBufferToBlob } from "../../lib/social/upload-image";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");

 if (auth !== `Bearer ${env.CRON_SECRET}`) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

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

  if (await isAlreadyPosted(pick.id)) {
    return Response.json({
      ok: true,
      skipped: true,
      reason: "already posted",
      pickId: pick.id,
    });
  }

  const caption = await generateCaption(pick);

  const cardUrl = new URL("/api/social-card", req.url);
  cardUrl.searchParams.set("league", pick.league);
  cardUrl.searchParams.set("homeTeam", pick.homeTeam);
  cardUrl.searchParams.set("awayTeam", pick.awayTeam);
  cardUrl.searchParams.set("prediction", pick.prediction);
  cardUrl.searchParams.set("market", pick.market);
  cardUrl.searchParams.set("odds", pick.bestOdds.toFixed(2));
  cardUrl.searchParams.set("valueDiff", pick.valueDiff.toFixed(2));
  cardUrl.searchParams.set("riskTier", pick.riskTier);
  cardUrl.searchParams.set(
    "startTime",
    new Date(pick.startTime).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    })
  );

  const imageRes = await fetch(cardUrl.toString(), { method: "GET" });

  if (!imageRes.ok) {
    throw new Error(`social-card failed: ${imageRes.status}`);
  }

  const imageBuffer = await imageRes.arrayBuffer();

  const imageUrl = await uploadBufferToBlob(
    imageBuffer,
    `${pick.id}.png`,
    "image/png"
  );

  const ig = await publishInstagram(imageUrl, caption);
  const fb = await publishFacebook(imageUrl, caption);

  await savePostedResult(pick, { imageUrl, caption, ig, fb });

  return Response.json({
    ok: true,
    pickId: pick.id,
    imageUrl,
    instagram: ig,
    facebook: fb,
  });
}