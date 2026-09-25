import { loadEnvConfig } from "@next/env";
import { promises as fs } from "node:fs";
import path from "node:path";

import { generateVideoContentPackage } from "../app/lib/social/video/copy-generate";
import { generateVideoCopyWithGroq } from "../app/lib/social/video/copy-groq";
import {
  parseGeneratedVideoCopy,
  parseVideoContentInput,
  validateGeneratedVideoCopy,
  validateVideoContentPackage,
} from "../app/lib/social/video/copy-validate";
import type {
  GeneratedVideoCopy,
  VideoContentInput,
  VideoContentPackage,
} from "../app/lib/social/video/content-types";

loadEnvConfig(process.cwd(), true);

const INPUT_DIRECTORY = path.join(process.cwd(), "data", "social-video-inputs");
const OUTPUT_DIRECTORY = path.join(process.cwd(), "data", "social-videos");

function toTitleCase(str: string): string {
  const smallWords = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "in", "nor", "of", "on", "or", "so", "the", "to", "up", "yet", "vs"]);
  return str
    .replace(/[.“”"']/g, "")
    .trim()
    .split(/\s+/)
    .map((word, index, arr) => {
      const lower = word.toLowerCase();
      if (index > 0 && index < arr.length - 1 && smallWords.has(lower)) {
        return lower;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function cleanSubstantiveText(rawMessage: string): string {
  const disclaimerIdx = rawMessage.search(/(?:\n\s*)?(?:[⚠️🔞🛑ℹ️•-]\s*)?18\s*\+/iu);
  let body = disclaimerIdx >= 0 ? rawMessage.slice(0, disclaimerIdx) : rawMessage;
  body = body.replace(/[\s⚠️🔞🛑ℹ️]+$/u, "").trim();
  if (body && !/[.!?]["'’”)]?$/u.test(body)) {
    body += ".";
  }
  return body;
}

function buildYouTubeTarget(params: {
  input: VideoContentInput;
  copy: GeneratedVideoCopy;
}) {
  const fbMain =
    params.copy.platforms.facebook.targets.find(
      (t) => t.targetId === "facebook-main"
    ) ?? params.copy.platforms.facebook.targets[0];

  const igMain =
    params.copy.platforms.instagram.targets.find(
      (t) => t.targetId === "instagram-main"
    ) ?? params.copy.platforms.instagram.targets[0];

  let body = cleanSubstantiveText(fbMain.message);
  if (!body.includes("https://www.matchsignal.pro")) {
    body += "\n\nExplore MatchSignal: https://www.matchsignal.pro";
  }

  const description = `${body}\n\n18+ | Gamble responsibly | MatchSignal provides informational analysis only; odds can change and no prediction guarantees an outcome.`;

  const cleanTopic = toTitleCase(params.input.topic);
  const title = `${cleanTopic}: Sports Odds & Probability Analysis`.slice(0, 95);

  const rawTags = (igMain.caption.match(/#[\p{L}\p{N}_]+/gu) || []).map((t) =>
    t.replace(/^#/, "")
  );
  const defaultTags = [
    "MatchSignal",
    "OddsComparison",
    "SportsAnalytics",
    "BettingTips",
    "ValueBetting",
    "ResponsibleGambling",
    "SportsData",
    "BetSmart",
  ];
  const tagSet = new Set([...defaultTags, ...rawTags]);
  const tags = Array.from(tagSet).slice(0, 15);

  return {
    targetId: "youtube-main",
    enabled: false,
    title,
    description,
    tags,
  };
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGroqWithRetry(prompt: string, maxRetries = 6): Promise<unknown> {
  let lastErrMsg = "";
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await generateVideoCopyWithGroq({
        prompt,
        retryRateLimitOnce: true,
      });
      return res.copy;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      lastErrMsg = msg;
      if (
        msg.includes("429") ||
        msg.includes("rate-limit") ||
        msg.includes("rate_limit") ||
        msg.includes("timed out") ||
        msg.includes("503") ||
        msg.includes("500")
      ) {
        const waitMs = (attempt + 1) * 8000;
        console.log(`  [Groq backoff] attempt ${attempt + 1}/${maxRetries} (${msg}), waiting ${waitMs}ms...`);
        await sleep(waitMs);
        continue;
      }
      throw err;
    }
  }
  throw new Error(`Groq call failed after ${maxRetries} rate-limit retries: ${lastErrMsg}`);
}

async function generateSingleId(id: string): Promise<{
  id: string;
  status: string;
  generationCalls: number;
  repaired: boolean;
  timeMs: number;
  validationErrors: string[];
}> {
  const startTime = Date.now();
  const inputPath = path.join(INPUT_DIRECTORY, `${id}.json`);
  const outputPath = path.join(OUTPUT_DIRECTORY, `${id}.json`);

  const inputRaw = JSON.parse(await fs.readFile(inputPath, "utf8"));
  const input = parseVideoContentInput(inputRaw);
  if (input.id !== id) {
    throw new Error(`Input ID ${input.id} mismatch with expected ${id}`);
  }

  let totalCalls = 0;
  const outcome = await generateVideoContentPackage({
    input,
    generate: async (prompt) => {
      totalCalls += 1;
      return await callGroqWithRetry(prompt);
    },
  });

  if (outcome.contentPackage.status === "rejected") {
    return {
      id,
      status: "rejected",
      generationCalls: totalCalls,
      repaired: outcome.repaired,
      timeMs: Date.now() - startTime,
      validationErrors: outcome.validationErrors.map((e) => `${e.path}: ${e.message}`),
    };
  }

  const copy = parseGeneratedVideoCopy({
    id: outcome.contentPackage.id,
    platforms: {
      instagram: {
        targets: outcome.contentPackage.platforms.instagram.targets.map((t) => ({
          targetId: t.targetId,
          caption: t.caption,
        })),
      },
      facebook: {
        targets: outcome.contentPackage.platforms.facebook.targets.map((t) => ({
          targetId: t.targetId,
          message: t.message,
        })),
      },
    },
  });

  const ytTarget = buildYouTubeTarget({ input, copy });

  const finalPackage: VideoContentPackage = {
    ...outcome.contentPackage,
    platforms: {
      ...outcome.contentPackage.platforms,
      youtube: {
        targets: [ytTarget],
      },
    },
  };

  const packageValidation = validateVideoContentPackage(finalPackage);
  if (!packageValidation.valid) {
    return {
      id,
      status: "rejected",
      generationCalls: totalCalls,
      repaired: outcome.repaired,
      timeMs: Date.now() - startTime,
      validationErrors: packageValidation.errors.map((e) => `${e.path}: ${e.message}`),
    };
  }

  await fs.writeFile(
    outputPath,
    `${JSON.stringify(finalPackage, null, 2)}\n`,
    "utf8"
  );

  return {
    id,
    status: finalPackage.status,
    generationCalls: totalCalls,
    repaired: outcome.repaired,
    timeMs: Date.now() - startTime,
    validationErrors: [],
  };
}

async function isAlreadyValid(id: string): Promise<boolean> {
  const outputPath = path.join(OUTPUT_DIRECTORY, `${id}.json`);
  try {
    const raw = await fs.readFile(outputPath, "utf8");
    const json = JSON.parse(raw);
    const validation = validateVideoContentPackage(json);
    return validation.valid && json.status === "ready" && json.platforms?.youtube?.targets?.length === 1;
  } catch {
    return false;
  }
}

async function main() {
  if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY is not available in environment.");
    process.exit(1);
  }

  await fs.mkdir(OUTPUT_DIRECTORY, { recursive: true });

  const totalIds = 54;
  const NORMAL_PACING_MS = 6000;
  const CIRCUIT_BREAKER_LIMIT = 2;
  let consecutive429Failures = 0;

  console.log(`Starting Layer C generation for ${totalIds} social videos (IDs 1 through ${totalIds})...`);
  console.log(`Model: openai/gpt-oss-120b on Groq`);
  console.log(`Pacing: ${NORMAL_PACING_MS}ms sequential inter-request delay`);
  console.log(`Circuit breaker: stops after ${CIRCUIT_BREAKER_LIMIT} consecutive HTTP 429 failures`);
  console.log(`Output directory: ${OUTPUT_DIRECTORY}\n`);

  const results: Array<{
    id: string;
    status: string;
    generationCalls: number;
    repaired: boolean;
    timeMs: number;
    validationErrors: string[];
  }> = [];

  const startTime = Date.now();

  for (let i = 1; i <= totalIds; i++) {
    const id = String(i);
    const idStart = Date.now();

    // Check if ID is already generated and valid
    if (await isAlreadyValid(id)) {
      console.log(`[${i}/${totalIds}] ID ${id.padStart(2)}: ALREADY VALID (PASS) - skipping`);
      consecutive429Failures = 0;
      results.push({
        id,
        status: "ready",
        generationCalls: 0,
        repaired: false,
        timeMs: 0,
        validationErrors: [],
      });
      continue;
    }

    try {
      const result = await generateSingleId(id);
      results.push(result);

      if (result.status === "ready") {
        consecutive429Failures = 0;
        console.log(
          `[${i}/${totalIds}] ID ${id.padStart(2)}: PASS | Status: ${result.status} | Calls: ${result.generationCalls}${result.repaired ? " (repaired)" : ""} | Time: ${result.timeMs}ms`
        );
      } else {
        const is429 = result.validationErrors.some(
          (e) =>
            e.includes("429") ||
            e.includes("rate-limit") ||
            e.includes("rate_limit") ||
            e.includes("TPM") ||
            e.includes("RPM") ||
            e.includes("RPD") ||
            e.includes("TPD")
        );
        if (is429) {
          consecutive429Failures += 1;
        } else {
          consecutive429Failures = 0;
        }
        console.error(
          `[${i}/${totalIds}] ID ${id.padStart(2)}: FAIL | Status: ${result.status} | Errors: ${result.validationErrors.join("; ")}`
        );
        if (consecutive429Failures >= CIRCUIT_BREAKER_LIMIT) {
          console.error(
            `\n[CIRCUIT BREAKER TRIGGERED] ${consecutive429Failures} consecutive IDs failed due to HTTP 429 rate limits. Stopping batch to avoid redundant requests.\n`
          );
          break;
        }
      }
    } catch (error) {
      const timeMs = Date.now() - idStart;
      const msg = error instanceof Error ? error.message : String(error);
      const is429 =
        msg.includes("429") ||
        msg.includes("rate-limit") ||
        msg.includes("rate_limit") ||
        msg.includes("TPM") ||
        msg.includes("RPM") ||
        msg.includes("RPD") ||
        msg.includes("TPD");

      if (is429) {
        consecutive429Failures += 1;
      } else {
        consecutive429Failures = 0;
      }

      console.error(
        `[${i}/${totalIds}] ID ${id.padStart(2)}: ERROR | Time: ${timeMs}ms | ${msg}`
      );
      results.push({
        id,
        status: "error",
        generationCalls: 0,
        repaired: false,
        timeMs,
        validationErrors: [msg],
      });

      if (consecutive429Failures >= CIRCUIT_BREAKER_LIMIT) {
        console.error(
          `\n[CIRCUIT BREAKER TRIGGERED] ${consecutive429Failures} consecutive IDs exhausted all retries due to HTTP 429 rate limits. Stopping batch to avoid redundant requests.\n`
        );
        break;
      }
    }

    // Inter-request pacing to stay well below Groq rate limits
    if (i < totalIds) {
      await sleep(NORMAL_PACING_MS);
    }
  }

  const totalTimeSec = ((Date.now() - startTime) / 1000).toFixed(1);
  const readyCount = results.filter((r) => r.status === "ready").length;
  const failedResults = results.filter((r) => r.status !== "ready");

  console.log(`\n======================================================`);
  console.log(`Generation completed in ${totalTimeSec}s`);
  console.log(`Success: ${readyCount}/${totalIds}`);
  if (failedResults.length > 0) {
    console.log(`Failed IDs (${failedResults.length}):`, failedResults.map((r) => r.id).join(", "));
  }
  console.log(`======================================================\n`);

  if (readyCount !== totalIds) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Batch generation failed:", error);
  process.exit(1);
});
