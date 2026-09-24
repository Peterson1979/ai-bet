import { loadEnvConfig } from "@next/env";

import { VIDEO_MANIFEST } from "../app/lib/social/video/manifest";
import {
  preflightYouTubeVideoTarget,
  assertYouTubeVideoPreflight,
} from "../app/lib/social/video/preflight";
import { publishYouTubeVideo } from "../app/lib/social/video/publish-youtube-video";
import { VIDEO_SOCIAL_TARGETS } from "../app/lib/social/video/targets";
import type { SocialTarget } from "../app/lib/social/video/types";
import { maskSecret } from "../app/lib/social/video/youtube-auth";

function parseArgs(argv: string[]) {
  const assetIdIndex = argv.indexOf("--assetId");
  const assetId = assetIdIndex >= 0 ? argv[assetIdIndex + 1] : "0817";

  const targetIdIndex = argv.indexOf("--targetId");
  const targetId = targetIdIndex >= 0 ? argv[targetIdIndex + 1] : "youtube-main";

  const privacyIndex = argv.indexOf("--privacy");
  const privacy = (
    privacyIndex >= 0 ? argv[privacyIndex + 1] : "private"
  ) as "private" | "unlisted" | "public";

  return { assetId, targetId, privacy };
}

async function main() {
  loadEnvConfig(process.cwd(), true);
  const args = parseArgs(process.argv.slice(2));

  console.log("\n================================================================================");
  console.log("MATCHSIGNAL YOUTUBE MANUAL TEST UPLOAD (ISOLATED / SAFE)");
  console.log("================================================================================");
  console.log(`Asset ID:        ${args.assetId}`);
  console.log(`Target ID:       ${args.targetId}`);
  console.log(`Privacy Status:  ${args.privacy} (SAFE)`);
  console.log(`Daily Run State: DISABLED (Daily Social Run is NOT affected)`);
  console.log("--------------------------------------------------------------------------------");

  const asset = VIDEO_MANIFEST.find((candidate) => candidate.id === args.assetId);
  if (!asset) {
    console.error(`\n[ERROR] Asset ID ${args.assetId} was not found in VIDEO_MANIFEST.`);
    process.exit(1);
  }

  const baseTarget = VIDEO_SOCIAL_TARGETS.find(
    (candidate) => candidate.id === args.targetId
  );
  if (!baseTarget || baseTarget.platform !== "youtube") {
    console.error(`\n[ERROR] Target ID ${args.targetId} is not a valid YouTube target.`);
    process.exit(1);
  }

  console.log("1. Running YouTube target preflight checks (manual test mode)...");
  const preflight = preflightYouTubeVideoTarget({
    asset,
    target: baseTarget,
    environment: process.env,
    allowDisabled: true,
  });

  if (!preflight.valid) {
    console.error("\n[ERROR] Preflight validation failed:");
    preflight.errors.forEach((err) => console.error(`  - ${err}`));
    console.error("\nPlease check your .env.local credentials and video metadata.\n");
    process.exit(1);
  }

  console.log("   -> Preflight checks PASSED.");
  console.log(`   -> Video Source: ${asset.sourceUrl}`);
  console.log(
    `   -> Video Title:  ${asset.platforms.youtube.targets.find((t) => t.targetId === args.targetId)?.title}`
  );

  console.log("\n2. Executing YouTube resumable upload (insert)...");
  const runId = `manual-test-upload:${Date.now()}:${asset.id}`;

  const result = await publishYouTubeVideo({
    runId,
    asset,
    target: baseTarget,
    environment: process.env,
    privacyStatus: args.privacy,
    allowDisabled: true,
    onProgress: (state) => {
      console.log(`   [PROGRESS] State: ${state.status} (attempts: ${state.attempts})`);
    },
  });

  const videoId = result.videoId;
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const shortUrl = `https://youtu.be/${videoId}`;

  console.log("\n================================================================================");
  console.log("YOUTUBE TEST UPLOAD COMPLETED SUCCESSFULLY");
  console.log("================================================================================");
  console.log(`YouTube Video ID:   ${videoId}`);
  console.log(`Watch URL:          ${youtubeUrl}`);
  console.log(`Short Link:         ${shortUrl}`);
  console.log(`Privacy Setting:    ${args.privacy}`);
  console.log(`Published At:       ${result.state.publishedAt}`);
  console.log("--------------------------------------------------------------------------------");
  console.log("NOTE: Daily Social Run remains unchanged and youtube-main remains disabled.");
  console.log("================================================================================\n");
}

main().catch((error) => {
  console.error(
    `\n[ERROR] YouTube test upload failed: ${error instanceof Error ? error.message : "Unknown error"}\n`
  );
  process.exit(1);
});
