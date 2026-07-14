import path from "path";
import fs from "fs/promises";
import { env } from "../../lib/env";
import { redis } from "../../lib/redis";
import { selectPick } from "../../lib/social/select-pick";
import { generateCaption } from "../../lib/social/caption";
import { renderCard } from "../../lib/social/render-card";
import { uploadImageToBlob } from "../../lib/social/upload-image";
import { publishInstagram } from "../../lib/social/publish-instagram";
import { publishFacebook } from "../../lib/social/publish-facebook";
import { isAlreadyPosted, savePostedResult } from "../../lib/social/persist-result";
import type { PredictionFile } from "../../lib/social/types";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${env.SOCIAL_CRON_SECRET}`) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const dateKey = now.toISOString().slice(0, 10);
  const redisKey = `predictions:${dateKey}`;

  const predictions = await redis.get<PredictionFile>(redisKey);
  if (!predictions) {
    return Response.json({ ok: false, error: `missing redis key ${redisKey}` }, { status: 404 });
  }

  const pick = selectPick(predictions, now);
  if (!pick) {
    return Response.json({ ok: true, skipped: true, reason: "no eligible pick" });
  }

  if (await isAlreadyPosted(pick.id)) {
    return Response.json({ ok: true, skipped: true, reason: "already posted", pickId: pick.id });
  }

  const caption = await generateCaption(pick);

  const tmpDir = path.join(process.cwd(), "tmp");
  await fs.mkdir(tmpDir, { recursive: true });
  const fileName = `${pick.id}.jpg`;
  const localPath = path.join(tmpDir, fileName);

  await renderCard(pick, localPath);
const imageUrl = await uploadImageToBlob(localPath, fileName);

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