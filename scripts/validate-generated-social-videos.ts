import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";

import {
  copySimilarity,
  parseVideoContentPackage,
  validateVideoContentPackage,
} from "../app/lib/social/video/copy-validate";
import type { VideoContentPackage } from "../app/lib/social/video/content-types";

const OUTPUT_DIRECTORY = path.join(process.cwd(), "data", "social-videos");
const INPUT_DIRECTORY = path.join(process.cwd(), "data", "social-video-inputs");

const MATCHSIGNAL_URL = "https://www.matchsignal.pro";
const PROHIBITED_CLAIMS = [
  /\breal[- ]time odds\b/i,
  /\blive odds\b/i,
  /\bguaranteed win\b/i,
  /\bguaranteed profit\b/i,
  /\bguaranteed returns?\b/i,
  /\brisk[- ]free(?: betting)?\b/i,
  /\bsure bet\b/i,
  /\bcertain winner\b/i,
  /\bcannot lose\b/i,
  /\bguaranteed outcome\b/i,
] as const;

function checkProhibitedClaims(text: string, pathInfo: string): string[] {
  const errors: string[] = [];
  for (const claim of PROHIBITED_CLAIMS) {
    if (claim.test(text)) {
      errors.push(`${pathInfo} contains prohibited claim: ${claim.source}`);
    }
  }
  return errors;
}

async function validateAllPackages() {
  const totalIds = 54;
  console.log(`\nValidating generated Layer C social video packages (IDs 1 through ${totalIds})...\n`);

  let instagramValidCount = 0;
  let facebookValidCount = 0;
  let youtubeValidCount = 0;
  let fullPackageValidCount = 0;
  const failedIds: string[] = [];

  for (let i = 1; i <= totalIds; i++) {
    const id = String(i);
    const filePath = path.join(OUTPUT_DIRECTORY, `${id}.json`);
    const inputPath = path.join(INPUT_DIRECTORY, `${id}.json`);
    const errors: string[] = [];

    // 1. File existence
    let fileContent: string;
    try {
      fileContent = await fs.readFile(filePath, "utf8");
    } catch {
      console.error(`[ID ${id}] FAIL: Output file does not exist: ${filePath}`);
      failedIds.push(id);
      continue;
    }

    // 2. JSON parse
    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(fileContent);
    } catch {
      console.error(`[ID ${id}] FAIL: Invalid JSON in ${filePath}`);
      failedIds.push(id);
      continue;
    }

    // 3. Package validation using repository validator
    const repoValidation = validateVideoContentPackage(parsedJson);
    if (!repoValidation.valid) {
      errors.push(...repoValidation.errors.map((e) => `Repo validator: ${e.path} - ${e.message}`));
    }

    const pkg = parseVideoContentPackage(parsedJson);

    // 4. Identity & Source validation
    if (pkg.id !== id) {
      errors.push(`Package ID ${pkg.id} does not match expected ${id}`);
    }
    if (pkg.source.id !== id) {
      errors.push(`Source ID ${pkg.source.id} does not match expected ${id}`);
    }
    if (pkg.status !== "ready") {
      errors.push(`Status is '${pkg.status}', expected 'ready'`);
    }
    if (!pkg.source.sourceUrl || !pkg.source.sourceUrl.startsWith("https://res.cloudinary.com/")) {
      errors.push(`Invalid sourceUrl: ${pkg.source.sourceUrl}`);
    }

    // 5. Instagram validation
    let igValid = true;
    const igTargets = pkg.platforms.instagram.targets;
    if (igTargets.length !== 2) {
      errors.push(`Instagram targets count is ${igTargets.length}, expected 2`);
      igValid = false;
    } else {
      const targetIds = igTargets.map((t) => t.targetId);
      if (!targetIds.includes("instagram-main") || !targetIds.includes("instagram-2")) {
        errors.push(`Instagram target IDs missing expected: ${targetIds.join(", ")}`);
        igValid = false;
      }
      for (const target of igTargets) {
        const prohibited = checkProhibitedClaims(target.caption, `Instagram (${target.targetId})`);
        if (prohibited.length > 0) {
          errors.push(...prohibited);
          igValid = false;
        }
        if (!/link in bio/i.test(target.caption)) {
          errors.push(`Instagram (${target.targetId}) missing 'Link in bio'`);
          igValid = false;
        }
        if (!/18\s*\+/i.test(target.caption)) {
          errors.push(`Instagram (${target.targetId}) missing 18+ notice`);
          igValid = false;
        }
        if (!/(gamble responsibly|responsible gambling)/i.test(target.caption)) {
          errors.push(`Instagram (${target.targetId}) missing responsible gambling text`);
          igValid = false;
        }
        const hashtags = target.caption.match(/#[\p{L}\p{N}_]+/gu) || [];
        if (hashtags.length < 5) {
          errors.push(`Instagram (${target.targetId}) has only ${hashtags.length} hashtags (min 5)`);
          igValid = false;
        }
      }
      const igSimilarity = copySimilarity(igTargets[0].caption, igTargets[1].caption);
      if (igSimilarity >= 0.78) {
        errors.push(`Instagram captions too similar (${igSimilarity.toFixed(2)})`);
        igValid = false;
      }
    }
    if (igValid) instagramValidCount++;

    // 6. Facebook validation
    let fbValid = true;
    const fbTargets = pkg.platforms.facebook.targets;
    if (fbTargets.length !== 2) {
      errors.push(`Facebook targets count is ${fbTargets.length}, expected 2`);
      fbValid = false;
    } else {
      const targetIds = fbTargets.map((t) => t.targetId);
      if (!targetIds.includes("facebook-main") || !targetIds.includes("facebook-2")) {
        errors.push(`Facebook target IDs missing expected: ${targetIds.join(", ")}`);
        fbValid = false;
      }
      for (const target of fbTargets) {
        const prohibited = checkProhibitedClaims(target.message, `Facebook (${target.targetId})`);
        if (prohibited.length > 0) {
          errors.push(...prohibited);
          fbValid = false;
        }
        if (!target.message.includes(MATCHSIGNAL_URL)) {
          errors.push(`Facebook (${target.targetId}) missing ${MATCHSIGNAL_URL}`);
          fbValid = false;
        }
        if (!/18\s*\+/i.test(target.message)) {
          errors.push(`Facebook (${target.targetId}) missing 18+ notice`);
          fbValid = false;
        }
        if (!/(gamble responsibly|responsible gambling)/i.test(target.message)) {
          errors.push(`Facebook (${target.targetId}) missing responsible gambling text`);
          fbValid = false;
        }
      }
      const fbSimilarity = copySimilarity(fbTargets[0].message, fbTargets[1].message);
      if (fbSimilarity >= 0.78) {
        errors.push(`Facebook messages too similar (${fbSimilarity.toFixed(2)})`);
        fbValid = false;
      }
    }
    if (fbValid) facebookValidCount++;

    // 7. YouTube validation
    let ytValid = true;
    const ytTargets = pkg.platforms.youtube.targets;
    if (ytTargets.length !== 1) {
      errors.push(`YouTube targets count is ${ytTargets.length}, expected 1`);
      ytValid = false;
    } else {
      const yt = ytTargets[0];
      if (yt.targetId !== "youtube-main") {
        errors.push(`YouTube targetId is '${yt.targetId}', expected 'youtube-main'`);
        ytValid = false;
      }
      if (!yt.title || yt.title.trim().length === 0) {
        errors.push(`YouTube title is empty`);
        ytValid = false;
      } else if (yt.title.length > 100) {
        errors.push(`YouTube title exceeds 100 chars: ${yt.title.length}`);
        ytValid = false;
      }
      const prohibitedTitle = checkProhibitedClaims(yt.title, "YouTube title");
      if (prohibitedTitle.length > 0) {
        errors.push(...prohibitedTitle);
        ytValid = false;
      }

      if (!yt.description || yt.description.trim().length === 0) {
        errors.push(`YouTube description is empty`);
        ytValid = false;
      } else {
        if (!yt.description.includes(MATCHSIGNAL_URL)) {
          errors.push(`YouTube description missing ${MATCHSIGNAL_URL}`);
          ytValid = false;
        }
        if (!/18\s*\+/i.test(yt.description)) {
          errors.push(`YouTube description missing 18+ notice`);
          ytValid = false;
        }
        if (!/(gamble responsibly|responsible gambling)/i.test(yt.description)) {
          errors.push(`YouTube description missing responsible gambling text`);
          ytValid = false;
        }
        const prohibitedDesc = checkProhibitedClaims(yt.description, "YouTube description");
        if (prohibitedDesc.length > 0) {
          errors.push(...prohibitedDesc);
          ytValid = false;
        }
      }

      if (!Array.isArray(yt.tags) || yt.tags.length < 5) {
        errors.push(`YouTube tags count is ${yt.tags?.length ?? 0}, expected at least 5`);
        ytValid = false;
      } else if (yt.tags.some((t) => t.startsWith("#"))) {
        errors.push(`YouTube tags must not include '#' prefix`);
        ytValid = false;
      }
    }
    if (ytValid) youtubeValidCount++;

    if (errors.length === 0) {
      fullPackageValidCount++;
    } else {
      console.error(`[ID ${id.padStart(2)}] FAIL: ${errors.join("; ")}`);
      failedIds.push(id);
    }
  }

  console.log(`\n================ VALIDATION REPORT ================`);
  console.log(`Layer C packages verified:  ${fullPackageValidCount}/${totalIds}`);
  console.log(`Instagram valid:            ${instagramValidCount}/${totalIds}`);
  console.log(`Facebook valid:             ${facebookValidCount}/${totalIds}`);
  console.log(`YouTube valid:              ${youtubeValidCount}/${totalIds}`);
  console.log(`Failed IDs:                 ${failedIds.length === 0 ? "none" : failedIds.join(", ")}`);
  console.log(`====================================================\n`);

  if (fullPackageValidCount !== totalIds) {
    process.exit(1);
  }
}

validateAllPackages().catch((error) => {
  console.error("Validation script failed:", error);
  process.exit(1);
});
