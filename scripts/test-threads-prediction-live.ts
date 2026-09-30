import fs from "node:fs";
import { loadEnvConfig } from "@next/env";
import { Redis } from "@upstash/redis";

import {
  generateThreadsPredictionCaption,
  validateThreadsPredictionCaption,
} from "../app/lib/social/caption-threads";
import { publishThreads } from "../app/lib/social/publish-threads";
import { renderCardToJpeg } from "../app/lib/social/render-card-to-jpeg";
import { uploadBufferToBlob } from "../app/lib/social/upload-image";
import type { Candidate, PredictionFile, TopPick } from "../app/lib/social/types";

function maskSecret(secret?: string, visibleChars = 4): string {
  if (!secret) return "[NOT SET]";
  if (secret.length <= visibleChars * 2) return "[REDACTED]";
  return `${secret.slice(0, visibleChars)}...${secret.slice(-visibleChars)}`;
}

function parseArgs(argv: string[]) {
  const imageUrlIdx = argv.indexOf("--image-url");
  const imageUrlAltIdx = argv.indexOf("--imageUrl");
  const directImageUrl =
    imageUrlIdx >= 0
      ? argv[imageUrlIdx + 1]
      : imageUrlAltIdx >= 0
      ? argv[imageUrlAltIdx + 1]
      : undefined;

  const envFileIdx = argv.indexOf("--env-file");
  const envFilePath = envFileIdx >= 0 ? argv[envFileIdx + 1] : undefined;

  const jsonMode = argv.includes("--json");
  const helpMode = argv.includes("--help") || argv.includes("-h");

  return { directImageUrl, envFilePath, jsonMode, helpMode };
}

function buildCardUrl(origin: string, slidePick: TopPick): string {
  const cardUrl = new URL("/api/social-card", origin);
  cardUrl.searchParams.set("template", "v4");
  cardUrl.searchParams.set("league", slidePick.league);
  cardUrl.searchParams.set("homeTeam", slidePick.homeTeam);
  cardUrl.searchParams.set("awayTeam", slidePick.awayTeam);
  cardUrl.searchParams.set("prediction", slidePick.prediction);
  cardUrl.searchParams.set("market", slidePick.market);
  cardUrl.searchParams.set("riskTier", slidePick.riskTier);
  cardUrl.searchParams.set("startTime", slidePick.startTime);

  if (typeof slidePick.bestOdds === "number") {
    cardUrl.searchParams.set("bestOdds", slidePick.bestOdds.toFixed(2));
  }
  const estimatedValue = slidePick.estimatedValuePct ?? slidePick.valueDiff;
  if (typeof estimatedValue === "number") {
    cardUrl.searchParams.set("valueEdge", estimatedValue.toFixed(1));
    cardUrl.searchParams.set("estimatedValuePct", estimatedValue.toFixed(1));
  }
  if (typeof slidePick.bookmakerCount === "number") {
    cardUrl.searchParams.set("booksSampled", String(slidePick.bookmakerCount));
  }
  if (slidePick.reasoning) {
    cardUrl.searchParams.set("reasoning", slidePick.reasoning);
  }
  if (Array.isArray(slidePick.whySignal)) {
    slidePick.whySignal.slice(0, 2).forEach((item, idx) => {
      cardUrl.searchParams.set(`why${idx + 1}`, item);
    });
  }

  return cardUrl.toString();
}

const FALLBACK_TEST_PICKS: Candidate[] = [
  {
    id: "live-test-pick-1",
    eventId: "event-threads-1",
    sport: "Football",
    league: "Premier League",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    prediction: "Arsenal to Win",
    market: "Match Winner",
    reasoning: "Strong home form and favorable match dynamic with positive EV.",
    riskTier: "Medium",
    startTime: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
    bookmaker: "Bet365",
    bookmakerCount: 10,
    bestOdds: 1.85,
    marketAverageOdds: 1.74,
    fairOdds: 1.68,
    fairProbability: 0.595,
    estimatedValuePct: 7.5,
    valueDiff: 7.5,
    whySignal: ["Arsenal won last 5 home matches", "Chelsea key defender sidelined"],
    status: "scheduled",
    priorityKey: "Football::Premier League",
    socialScore: 88,
  },
  {
    id: "live-test-pick-2",
    eventId: "event-threads-2",
    sport: "Basketball",
    league: "EuroLeague",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    prediction: "Over 162.5 Points",
    market: "Total Points",
    reasoning: "High-tempo offensive efficiency favors points total above market average.",
    riskTier: "Low",
    startTime: new Date(Date.now() + 5 * 3600 * 1000).toISOString(),
    bookmaker: "Pinnacle",
    bookmakerCount: 8,
    bestOdds: 1.92,
    marketAverageOdds: 1.84,
    fairOdds: 1.82,
    fairProbability: 0.549,
    estimatedValuePct: 5.2,
    valueDiff: 5.2,
    whySignal: ["Pace matchup favors high score", "Combined offensive rating > 115"],
    status: "scheduled",
    priorityKey: "Basketball::EuroLeague",
    socialScore: 82,
  },
];

async function loadPicksFromRedis(): Promise<{ picks: Candidate[]; source: string }> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return { picks: FALLBACK_TEST_PICKS, source: "fallback_fixtures (Redis credentials not configured)" };
  }

  try {
    const redis = new Redis({ url: redisUrl, token: redisToken });
    const today = new Date().toISOString().slice(0, 10);
    const predictions = await redis.get<PredictionFile>(`predictions:${today}`);

    if (!predictions || !Array.isArray(predictions.sports)) {
      return { picks: FALLBACK_TEST_PICKS, source: `fallback_fixtures (No predictions:${today} key found in Redis)` };
    }

    const availablePicks = predictions.sports
      .filter((s) => s.hasMatches && Array.isArray(s.topPicks))
      .flatMap((s) =>
        s.topPicks.map((p) => ({
          ...p,
          sport: s.sport,
          priorityKey: `${s.sport}::${p.league}`,
          socialScore: 80,
        }))
      )
      .filter((p) => Boolean(p.homeTeam && p.awayTeam && p.prediction));

    if (availablePicks.length === 0) {
      return { picks: FALLBACK_TEST_PICKS, source: "fallback_fixtures (Redis sports blocks contained 0 picks)" };
    }

    return { picks: availablePicks.slice(0, 2), source: `redis:predictions:${today}` };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown redis error";
    return { picks: FALLBACK_TEST_PICKS, source: `fallback_fixtures (Redis read error: ${msg})` };
  }
}

async function resolveImageUrl(
  primaryPick: TopPick,
  cliImageUrl?: string
): Promise<{ imageUrl: string; resolutionSource: string }> {
  // 1. Explicit CLI argument or env var override
  const directUrl = cliImageUrl || process.env.THREADS_TEST_IMAGE_URL;
  if (directUrl && directUrl.startsWith("https://")) {
    return { imageUrl: directUrl, resolutionSource: "cli_arg_or_env_override" };
  }

  const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://www.matchsignal.pro";

  // 2. If Vercel Blob token is available, attempt to render card and upload
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (blobToken) {
    try {
      const cardUrl = buildCardUrl(siteOrigin, primaryPick);
      const jpegBuffer = await renderCardToJpeg(cardUrl);
      const uploadedBlobUrl = await uploadBufferToBlob(
        jpegBuffer,
        `threads-live-test-${Date.now()}.jpg`,
        "image/jpeg"
      );
      if (uploadedBlobUrl && uploadedBlobUrl.startsWith("https://")) {
        return { imageUrl: uploadedBlobUrl, resolutionSource: "rendered_card_uploaded_to_blob" };
      }
    } catch {
      // Fallback below if blob rendering fails
    }
  }

  // 3. Fallback: Use MatchSignal edge-rendered card or verified public asset
  const edgeCardUrl = buildCardUrl("https://www.matchsignal.pro", primaryPick);
  return {
    imageUrl: edgeCardUrl,
    resolutionSource: "public_edge_card_url (https://www.matchsignal.pro/api/social-card)",
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.helpMode) {
    console.log(`
MatchSignal Threads Prediction Live Test Script
================================================
Usage:
  npm run test:threads-prediction-live
  THREADS_LIVE_TEST=true npm run test:threads-prediction-live

Options:
  --image-url <url>   Override the public HTTPS image URL to publish
  --env-file <path>   Load custom .env file
  --json              Output results in JSON format
  --help, -h          Show this help message

Guards:
  THREADS_LIVE_TEST=true is required to execute the live post to Threads.
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
  const isLiveGuardActive = process.env.THREADS_LIVE_TEST !== "true";

  // Load prediction picks and build caption
  const { picks, source: picksSource } = await loadPicksFromRedis();
  const caption = generateThreadsPredictionCaption(picks);
  const captionValidation = validateThreadsPredictionCaption(caption);

  if (!captionValidation.valid) {
    console.error("\n[ERROR] Generated Threads caption failed validation:");
    captionValidation.errors.forEach((err) => console.error(`  - ${err}`));
    process.exit(1);
  }

  const { imageUrl, resolutionSource } = await resolveImageUrl(picks[0], args.directImageUrl);

  if (!imageUrl || !imageUrl.startsWith("https://")) {
    console.error(`\n[ERROR] Image URL must be a valid public HTTPS URL (got: ${imageUrl || "empty"})`);
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
            message: "Refused to publish: THREADS_LIVE_TEST=true is required.",
            target: "threads-main",
            platform: "threads",
            credentialsConfigured: Boolean(userId && accessToken),
            userId: userId || "[NOT SET]",
            accessTokenConfigured: Boolean(accessToken),
            picksSource,
            picksCount: picks.length,
            imageUrl,
            imageResolutionSource: resolutionSource,
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
    console.log("MATCHSIGNAL THREADS PREDICTION LIVE TEST (GUARD ACTIVE - DRY RUN)");
    console.log("================================================================================");
    console.log("Target ID:               threads-main (ONLY)");
    console.log("Platform:                Threads (Meta Graph API)");
    console.log("Publish Mode:            DRY-RUN / GUARDED (NO external publish request sent)");
    console.log("Other Platforms:         Instagram, Facebook, YouTube are COMPLETELY UNTOUCHED");
    console.log("Redis Channel State:     Unrelated channel states will NOT be modified");
    console.log("--------------------------------------------------------------------------------");
    console.log(`Threads User ID:         ${userId ? userId : "[MISSING: THREADS_USER_ID]"}`);
    console.log(`Threads Token Status:    ${accessToken ? `Present (${maskSecret(accessToken, 6)})` : "[MISSING: THREADS_ACCESS_TOKEN]"}`);
    console.log(`Prediction Source:       ${picksSource}`);
    console.log(`Prediction Pick:         ${picks[0]?.homeTeam} vs ${picks[0]?.awayTeam} -> ${picks[0]?.prediction}`);
    console.log(`Image Source:            ${resolutionSource}`);
    console.log(`Image Asset URL:         ${imageUrl}`);
    console.log("--------------------------------------------------------------------------------");
    console.log("Generated Caption for Threads:\n");
    console.log(caption);
    console.log("\n--------------------------------------------------------------------------------");
    console.log(`Caption Validation:      PASSED (${caption.length} / 500 characters)`);
    console.log("--------------------------------------------------------------------------------");
    console.log("SAFETY GUARD STATUS:     PUBLISHING REFUSED / SAFELY PREVENTED");
    console.log("Reason:                  THREADS_LIVE_TEST=true was not set in the environment.");
    console.log("");
    console.log("To execute the REAL one-post live test to Threads, run:");
    console.log('  PowerShell:  $env:THREADS_LIVE_TEST="true"; npm run test:threads-prediction-live');
    console.log("  Bash:        THREADS_LIVE_TEST=true npm run test:threads-prediction-live");
    console.log("================================================================================\n");
    process.exit(0);
  }

  // --- LIVE EXECUTION MODE ---
  if (!userId || !accessToken) {
    console.error("\n[ERROR] Missing required Threads credentials:");
    if (!userId) console.error("  - THREADS_USER_ID is missing");
    if (!accessToken) console.error("  - THREADS_ACCESS_TOKEN is missing");
    console.error("\nPlease ensure THREADS_USER_ID and THREADS_ACCESS_TOKEN are configured in .env.local or environment.\n");
    process.exit(1);
  }

  if (!args.jsonMode) {
    console.log("\n================================================================================");
    console.log("MATCHSIGNAL THREADS PREDICTION LIVE TEST (ONE-SHOT EXECUTION)");
    console.log("================================================================================");
    console.log("Target ID:               threads-main (ONLY)");
    console.log(`Threads User ID:         ${userId}`);
    console.log(`Threads Token:           ${maskSecret(accessToken, 6)}`);
    console.log(`Prediction Pick:         ${picks[0]?.homeTeam} vs ${picks[0]?.awayTeam} -> ${picks[0]?.prediction}`);
    console.log(`Image Asset URL:         ${imageUrl}`);
    console.log("--------------------------------------------------------------------------------");
    console.log("1. Creating Threads media container on Meta Graph API...");
    console.log(`   Endpoint:             POST https://graph.threads.net/v1.0/${userId}/threads`);
    console.log("   Request Parameters:");
    console.log("     - media_type:       IMAGE");
    console.log(`     - image_url:        ${imageUrl}`);
    console.log(`     - text (length):    ${caption.length} characters`);
    console.log("     - access_token:     [REDACTED]");
    console.log("--------------------------------------------------------------------------------");
  }

  try {
    const result = await publishThreads(imageUrl, caption, {
      userId,
      accessToken,
    });

    const postUrl = `https://www.threads.net/@matchsignal.pro/post/${result.id}`;

    if (args.jsonMode) {
      console.log(
        JSON.stringify(
          {
            ok: true,
            published: true,
            target: "threads-main",
            containerId: result.containerId,
            postId: result.id,
            postUrl,
            imageUrl,
            captionLength: caption.length,
            caption,
          },
          null,
          2
        )
      );
    } else {
      console.log("   -> Threads media container created.");
      console.log("2. Waiting for container processing...");
      console.log("   -> Container ready.");
      console.log("3. Publishing container to @matchsignal.pro Threads feed...");
      console.log("   -> Published successfully!");
      console.log("\n================================================================================");
      console.log("THREADS LIVE PREDICTION POST PUBLISHED SUCCESSFULLY");
      console.log("================================================================================");
      console.log(`Target:                  threads-main`);
      console.log(`Threads Container ID:    ${result.containerId}`);
      console.log(`Threads Post ID:         ${result.id}`);
      console.log(`Threads Post URL:        ${postUrl}`);
      console.log(`Image Asset:             ${imageUrl}`);
      console.log(`Caption Length:          ${caption.length} / 500 characters`);
      console.log("--------------------------------------------------------------------------------");
      console.log("Instagram / Facebook / YouTube: NOT TOUCHED (Zero unintended calls)");
      console.log("================================================================================\n");
    }
  } catch (error) {
    const rawMessage = error instanceof Error ? error.message : "Unknown error during live Threads publish";
    // Ensure token is never printed even if raw error contains it
    const safeMessage = accessToken ? rawMessage.split(accessToken).join("[REDACTED]") : rawMessage;

    if (args.jsonMode) {
      console.log(
        JSON.stringify(
          {
            ok: false,
            published: false,
            target: "threads-main",
            error: safeMessage,
          },
          null,
          2
        )
      );
    } else {
      console.error("\n================================================================================");
      console.error("THREADS LIVE PREDICTION POST FAILED");
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
