import fs from "node:fs";
import { loadEnvConfig } from "@next/env";

import { VIDEO_MANIFEST } from "../app/lib/social/video/manifest";
import {
  preflightThreadsVideoTarget,
  assertThreadsVideoPreflight,
} from "../app/lib/social/video/preflight";
import { publishThreadsVideo } from "../app/lib/social/video/publish-threads-video";
import { getVideoTargetContent, VIDEO_SOCIAL_TARGETS } from "../app/lib/social/video/targets";
import {
  formatThreadsVideoCaption,
  validateThreadsCaption,
} from "../app/lib/social/video/threads-caption";
import type { VideoAsset } from "../app/lib/social/video/types";

function maskSecret(secret?: string, visibleChars = 4): string {
  if (!secret) return "[NOT SET]";
  if (secret.length <= visibleChars * 2) return "[REDACTED]";
  return `${secret.slice(0, visibleChars)}...${secret.slice(-visibleChars)}`;
}

function parseArgs(argv: string[]) {
  const assetIdIdx = argv.indexOf("--assetId");
  const assetIdAltIdx = argv.indexOf("--asset-id");
  const assetId =
    assetIdIdx >= 0
      ? argv[assetIdIdx + 1]
      : assetIdAltIdx >= 0
      ? argv[assetIdAltIdx + 1]
      : "1"; // Default to asset "1" from the current 1-54 video set

  const targetIdIdx = argv.indexOf("--targetId");
  const targetId = targetIdIdx >= 0 ? argv[targetIdIdx + 1] : "threads-main";

  const envFileIdx = argv.indexOf("--env-file");
  const envFilePath = envFileIdx >= 0 ? argv[envFileIdx + 1] : undefined;

  const jsonMode = argv.includes("--json");
  const helpMode = argv.includes("--help") || argv.includes("-h");

  return { assetId, targetId, envFilePath, jsonMode, helpMode };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.helpMode) {
    console.log(`
MatchSignal Threads Video Live Test Script
==========================================
Usage:
  npm run test:threads-video-live
  THREADS_LIVE_VIDEO_TEST=true npm run test:threads-video-live

Options:
  --assetId <id>      Target video asset ID from current 1-54 series (default: 1)
  --targetId <id>     Target registry ID (default: threads-main)
  --env-file <path>   Load custom .env file
  --json              Output results in JSON format
  --help, -h          Show this help message

Guards:
  THREADS_LIVE_VIDEO_TEST=true is required to execute the live video publish to Threads.
  Without this variable, the script runs in guarded DRY-RUN mode.
`);
    process.exit(0);
  }

  // Load environment
  if (args.envFilePath && fs.existsSync(args.envFilePath)) {
    const content = fs.readFileSync(args.envFilePath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        process.env[key] = val;
      }
    }
  } else {
    loadEnvConfig(process.cwd(), true);
  }

  const userId = process.env.THREADS_USER_ID?.trim() || "";
  const accessToken = process.env.THREADS_ACCESS_TOKEN?.trim() || "";
  const isLiveGuardActive = process.env.THREADS_LIVE_VIDEO_TEST !== "true";

  // Prevent use of deprecated legacy 0817 asset
  if (args.assetId === "0817") {
    console.error("\n[ERROR] Asset 0817 is deprecated and not part of the active 1-54 social-video-new set. Please select a video from 1-54 (e.g. --assetId 1).");
    process.exit(1);
  }

  // Resolve raw asset from VIDEO_MANIFEST (statically imported ready packages)
  const rawAsset = VIDEO_MANIFEST.find((candidate) => candidate.id === args.assetId);
  if (!rawAsset) {
    console.error(`\n[ERROR] Asset ID "${args.assetId}" was not found in VIDEO_MANIFEST (available: 1 through 54).`);
    process.exit(1);
  }

  // Resolve target
  const target = VIDEO_SOCIAL_TARGETS.find((candidate) => candidate.id === args.targetId);
  if (!target || target.platform !== "threads") {
    console.error(`\n[ERROR] Target ID "${args.targetId}" is not a valid Threads target in VIDEO_SOCIAL_TARGETS.`);
    process.exit(1);
  }

  // Obtain or format the standard MatchSignal Threads caption
  const existingThreadsContent = getVideoTargetContent(rawAsset, "threads", target.id);
  const caption =
    existingThreadsContent?.caption?.trim() ||
    formatThreadsVideoCaption({
      message:
        rawAsset.platforms.facebook?.targets[0]?.message ||
        rawAsset.platforms.instagram?.targets[0]?.caption,
    });

  const captionValidation = validateThreadsCaption(caption);
  if (!captionValidation.valid) {
    console.error("\n[ERROR] Threads video caption validation failed:");
    captionValidation.errors.forEach((err) => console.error(`  - ${err}`));
    process.exit(1);
  }

  // Assemble the executable VideoAsset with compliant Threads destination content
  const asset: VideoAsset = {
    ...rawAsset,
    platforms: {
      ...rawAsset.platforms,
      threads: {
        targets: [
          {
            targetId: target.id,
            caption,
            enabled: true,
          },
        ],
      },
    },
  };

  // Preflight validation
  const preflight = preflightThreadsVideoTarget({
    asset,
    target,
    environment: process.env,
    allowDisabled: true,
  });

  if (!preflight.valid) {
    console.error("\n[ERROR] Threads video preflight validation failed:");
    preflight.errors.forEach((err) => console.error(`  - ${err}`));
    process.exit(1);
  }

  // Check if live execution guard is active
  if (isLiveGuardActive) {
    if (args.jsonMode) {
      console.log(
        JSON.stringify(
          {
            ok: true,
            mode: "dry_run",
            guardActive: true,
            message: "Refused to publish: THREADS_LIVE_VIDEO_TEST=true is required.",
            target: target.id,
            platform: "threads",
            assetId: asset.id,
            sourceUrl: asset.sourceUrl,
            credentialsConfigured: Boolean(userId && accessToken),
            userId: userId || "[NOT SET]",
            caption,
            captionLength: caption.length,
            captionValidation,
            isolatedChannels: ["instagram", "facebook", "youtube"],
          },
          null,
          2
        )
      );
      process.exit(0);
    }

    console.log("\n================================================================================");
    console.log("MATCHSIGNAL THREADS VIDEO LIVE TEST (GUARD ACTIVE - DRY RUN)");
    console.log("================================================================================");
    console.log("Target ID:               threads-main (ONLY)");
    console.log("Platform:                Threads (Meta Graph API)");
    console.log("Publish Mode:            DRY-RUN / GUARDED (NO external video publish sent)");
    console.log("Other Platforms:         Instagram, Facebook, YouTube are COMPLETELY UNTOUCHED");
    console.log("Video Series:            Current social-video-new set (1-54)");
    console.log("Scheduled Automation:    NOT affected (manifest enablement unchanged)");
    console.log("--------------------------------------------------------------------------------");
    console.log(`Threads User ID:         ${userId ? userId : "[MISSING: THREADS_USER_ID]"}`);
    console.log(`Threads Token Status:    ${accessToken ? `Present (${maskSecret(accessToken, 6)})` : "[MISSING: THREADS_ACCESS_TOKEN]"}`);
    console.log(`Selected Asset ID:       ${asset.id} (from active 1-54 video set)`);
    console.log(`Video Source URL:        ${asset.sourceUrl}`);
    console.log("--------------------------------------------------------------------------------");
    console.log("Target Caption for Threads:\n");
    console.log(caption);
    console.log("\n--------------------------------------------------------------------------------");
    console.log(`Caption Validation:      PASSED (${caption.length} / 500 characters)`);
    console.log("Preflight Status:        PASSED (allowDisabled=true)");
    console.log("--------------------------------------------------------------------------------");
    console.log("SAFETY GUARD STATUS:     PUBLISHING REFUSED / SAFELY PREVENTED");
    console.log("Reason:                  THREADS_LIVE_VIDEO_TEST=true was not set in the environment.");
    console.log("");
    console.log("To execute the REAL one-video live test to Threads, run:");
    console.log('  PowerShell:  $env:THREADS_LIVE_VIDEO_TEST="true"; npm run test:threads-video-live');
    console.log("  Bash:        THREADS_LIVE_VIDEO_TEST=true npm run test:threads-video-live");
    console.log("================================================================================\n");
    process.exit(0);
  }

  // --- LIVE EXECUTION MODE ---
  assertThreadsVideoPreflight(preflight);

  if (!args.jsonMode) {
    console.log("\n================================================================================");
    console.log("MATCHSIGNAL THREADS VIDEO LIVE TEST (ONE-SHOT EXECUTION)");
    console.log("================================================================================");
    console.log("Target ID:               threads-main (ONLY)");
    console.log(`Threads User ID:         ${userId}`);
    console.log(`Threads Token:           ${maskSecret(accessToken, 6)}`);
    console.log(`Selected Asset ID:       ${asset.id}`);
    console.log(`Video Source URL:        ${asset.sourceUrl}`);
    console.log("Other Platforms:         Instagram, Facebook, YouTube are COMPLETELY UNTOUCHED");
    console.log("Scheduled Automation:    NOT affected (manifest enablement unchanged)");
    console.log("--------------------------------------------------------------------------------");
    console.log("1. Executing Threads video publication pipeline...");
  }

  const runId = `manual-test-threads-video:${Date.now()}:${asset.id}`;

  try {
    const result = await publishThreadsVideo({
      runId,
      asset,
      target,
      environment: process.env,
      allowDisabled: true,
      onProgress: (state) => {
        if (!args.jsonMode) {
          console.log(`   [PROGRESS] State: ${state.status} (attempts: ${state.attempts})`);
        }
      },
    });

    const postId = result.state.postId || result.state.providerMediaId || "";
    const containerId = result.state.providerContainerId || "";
    const postUrl = `https://www.threads.net/@matchsignal.pro/post/${postId}`;

    if (args.jsonMode) {
      console.log(
        JSON.stringify(
          {
            ok: true,
            published: true,
            target: target.id,
            assetId: asset.id,
            containerId,
            postId,
            postUrl,
            publishedAt: result.state.publishedAt,
            captionLength: caption.length,
            caption,
          },
          null,
          2
        )
      );
    } else {
      console.log("\n================================================================================");
      console.log("THREADS LIVE VIDEO POST PUBLISHED SUCCESSFULLY");
      console.log("================================================================================");
      console.log(`Target:                  threads-main`);
      console.log(`Asset ID:                ${asset.id}`);
      console.log(`Threads User ID:         ${userId}`);
      console.log(`Threads Container ID:    ${containerId}`);
      console.log(`Threads Post ID:         ${postId}`);
      console.log(`Threads Post URL:        ${postUrl}`);
      console.log(`Published At:            ${result.state.publishedAt}`);
      console.log(`Video Source URL:        ${asset.sourceUrl}`);
      console.log(`Caption Length:          ${caption.length} characters`);
      console.log("--------------------------------------------------------------------------------");
      console.log("Instagram / Facebook / YouTube: NOT TOUCHED (Zero unintended calls)");
      console.log("================================================================================\n");
    }
  } catch (error) {
    const rawMessage = error instanceof Error ? error.message : "Unknown error during live Threads video publish";
    const safeMessage = accessToken ? rawMessage.split(accessToken).join("[REDACTED]") : rawMessage;

    if (args.jsonMode) {
      console.log(
        JSON.stringify(
          {
            ok: false,
            published: false,
            target: target.id,
            assetId: asset.id,
            error: safeMessage,
          },
          null,
          2
        )
      );
    } else {
      console.error("\n================================================================================");
      console.error("THREADS LIVE VIDEO POST FAILED");
      console.error("================================================================================");
      console.error(`[ERROR] ${safeMessage}`);
      console.error("================================================================================\n");
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("\n[FATAL ERROR]", err instanceof Error ? err.message : err);
  process.exit(1);
});
