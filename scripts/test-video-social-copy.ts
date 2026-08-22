import assert from "node:assert/strict";

import { generateVideoContentPackage } from "../app/lib/social/video/copy-generate";
import {
  buildVideoContentPackage,
  validateGeneratedVideoCopy,
  validateVideoContentInput,
  validateVideoContentPackage,
} from "../app/lib/social/video/copy-validate";
import type {
  GeneratedVideoCopy,
  VideoContentInput,
} from "../app/lib/social/video/content-types";
import { loadReadyVideoAssets } from "../app/lib/social/video/content-loader";
import { VIDEO_MANIFEST } from "../app/lib/social/video/manifest";
import { getVideoTargetContent } from "../app/lib/social/video/targets";
import type { VideoAsset } from "../app/lib/social/video/types";

const input: VideoContentInput = {
  id: "0818",
  topic: "Find Better Odds Faster",
  visual: "A runner moves through a tunnel of changing price panels.",
  voiceover: "Small differences in odds can matter. Compare available prices faster.",
  sourceUrl: null,
};

const validCopy: GeneratedVideoCopy = {
  id: "0818",
  platforms: {
    instagram: {
      targets: [
        {
          targetId: "instagram-main",
          caption:
            "One screen can make comparison simpler. See how MatchSignal organizes available prices and analysis before you decide. Link in bio. 18+ | Gamble responsibly | Informational purposes only. #MatchSignal #OddsComparison",
        },
        {
          targetId: "instagram-2",
          caption:
            "Stop racing between bookmaker tabs. Explore potential value with clear market context and AI-assisted explanations from MatchSignal. Link in bio. 18+ | Responsible gambling | Odds can change; no prediction guarantees an outcome. #SportsAnalytics #BetSmart",
        },
      ],
    },
    facebook: {
      targets: [
        {
          targetId: "facebook-main",
          message:
            "Small price differences can matter. MatchSignal helps you compare available odds and understand the analysis behind a selection. Explore https://www.matchsignal.pro. 18+ | Gamble responsibly | Informational analysis only.",
        },
        {
          targetId: "facebook-2",
          message:
            "Spend less time checking separate bookmaker pages. Review market comparisons and concise explanations at https://www.matchsignal.pro. 18+ | Responsible gambling | Odds can change and no outcome is guaranteed.",
        },
        {
          targetId: "facebook-3",
          message:
            "Too many prices, too little clarity? MatchSignal turns bookmaker coverage into a cleaner comparison with estimated fair probability. Visit https://www.matchsignal.pro. 18+ | Gamble responsibly | No prediction guarantees an outcome.",
        },
        {
          targetId: "facebook-4",
          message:
            "Find the available price that fits your research faster. Start with free AI-assisted analysis at https://www.matchsignal.pro. 18+ | Responsible gambling | No guarantee of profit.",
        },
      ],
    },
    youtube: {
      targets: [
        {
          targetId: "youtube-main",
          title: "Find Better Odds Faster with Smarter Comparison",
          description:
            "See why small differences in available prices can matter and how MatchSignal helps compare sportsbook odds with market-based analysis. Explore https://www.matchsignal.pro. 18+ | Gamble responsibly | Informational purposes only; odds can change.",
          tags: ["MatchSignal", "odds comparison", "sports analysis"],
        },
      ],
    },
  },
};

function cloneCopy(): GeneratedVideoCopy {
  return structuredClone(validCopy);
}

function expectInvalid(copy: GeneratedVideoCopy, message: string) {
  const validation = validateGeneratedVideoCopy("0818", copy);
  assert.equal(validation.valid, false, message);
  return validation;
}

async function main() {
  // 1-2. Input accepts sourceUrl=null but rejects missing source context.
  assert.equal(validateVideoContentInput(input).valid, true);
  assert.equal(validateVideoContentInput({ ...input, topic: "" }).valid, false);

  // 3-4. Exactly seven outputs with the exact destination IDs are required.
  assert.equal(validateGeneratedVideoCopy("0818", validCopy).valid, true);
  const missingTarget = cloneCopy();
  missingTarget.platforms.facebook.targets.pop();
  expectInvalid(missingTarget, "missing seventh target must fail");
  const wrongTarget = cloneCopy();
  wrongTarget.platforms.instagram.targets[1].targetId = "instagram-other";
  expectInvalid(wrongTarget, "unknown target ID must fail");

  const contentPackage = buildVideoContentPackage({
    input,
    copy: validCopy,
    generatedAt: "2026-08-22T00:00:00.000Z",
  });
  const asset: VideoAsset = {
    id: contentPackage.id,
    sourceUrl:
      "https://res.cloudinary.com/example/video/upload/v1/0818.mp4",
    enabled: true,
    platforms: contentPackage.platforms,
  };

  // 5-6. Copy resolves by exact video+target and never falls back.
  assert.equal(
    getVideoTargetContent(asset, "instagram", "instagram-main")?.caption,
    validCopy.platforms.instagram.targets[0].caption
  );
  assert.equal(
    getVideoTargetContent(asset, "instagram", "instagram-2")?.caption,
    validCopy.platforms.instagram.targets[1].caption
  );
  assert.equal(getVideoTargetContent(asset, "instagram", "missing"), undefined);

  // 7-9. High-risk language is rejected case-insensitively.
  for (const phrase of ["real-time odds", "LIVE ODDS", "guaranteed profit"]) {
    const banned = cloneCopy();
    banned.platforms.facebook.targets[0].message += ` ${phrase}`;
    expectInvalid(banned, `${phrase} must fail`);
  }

  // 10-13. Platform CTAs and YouTube's title limit are deterministic.
  const noFacebookUrl = cloneCopy();
  noFacebookUrl.platforms.facebook.targets[0].message = noFacebookUrl.platforms.facebook.targets[0].message.replace(
    "https://www.matchsignal.pro",
    "MatchSignal"
  );
  expectInvalid(noFacebookUrl, "Facebook URL is required");
  const noInstagramCta = cloneCopy();
  noInstagramCta.platforms.instagram.targets[0].caption = noInstagramCta.platforms.instagram.targets[0].caption.replace(
    "Link in bio",
    "Visit us"
  );
  expectInvalid(noInstagramCta, "Instagram Link in bio is required");
  const noYoutubeUrl = cloneCopy();
  noYoutubeUrl.platforms.youtube.targets[0].description = noYoutubeUrl.platforms.youtube.targets[0].description.replace(
    "https://www.matchsignal.pro",
    "MatchSignal"
  );
  expectInvalid(noYoutubeUrl, "YouTube URL is required");
  const longTitle = cloneCopy();
  longTitle.platforms.youtube.targets[0].title = "x".repeat(101);
  expectInvalid(longTitle, "YouTube title over 100 characters must fail");

  // 14-15. Exact and obvious near-duplicates fail.
  const duplicate = cloneCopy();
  duplicate.platforms.facebook.targets[1].message =
    duplicate.platforms.facebook.targets[0].message;
  expectInvalid(duplicate, "duplicate Facebook copy must fail");
  const nearDuplicate = cloneCopy();
  nearDuplicate.platforms.instagram.targets[1].caption =
    `${nearDuplicate.platforms.instagram.targets[0].caption} Learn more today.`;
  expectInvalid(nearDuplicate, "near-identical Instagram copy must fail");

  // 16. Every destination requires responsible-gambling language.
  const noResponsible = cloneCopy();
  noResponsible.platforms.facebook.targets[2].message = noResponsible.platforms.facebook.targets[2].message.replace(
    "Gamble responsibly",
    "Be careful"
  );
  expectInvalid(noResponsible, "responsible-gambling text is required");

  // 17-19. Missing media forces draft, runtime exclusion, and disabled targets.
  assert.equal(contentPackage.status, "draft");
  assert.equal(contentPackage.source.sourceUrl, null);
  assert.equal(validateVideoContentPackage(contentPackage).valid, true);
  assert.deepEqual(loadReadyVideoAssets([contentPackage]), []);
  assert.equal(
    [
      ...contentPackage.platforms.instagram.targets,
      ...contentPackage.platforms.facebook.targets,
      ...contentPackage.platforms.youtube.targets,
    ].every((target) => target.enabled === false),
    true
  );
  const invalidReady = structuredClone(contentPackage);
  invalidReady.status = "ready";
  assert.equal(validateVideoContentPackage(invalidReady).valid, false);
  const readyPackage = buildVideoContentPackage({
    input: {
      ...input,
      sourceUrl:
        "https://res.cloudinary.com/example/video/upload/v1/0818.mp4",
    },
    copy: validCopy,
  });
  assert.equal(readyPackage.status, "ready");
  assert.deepEqual(
    loadReadyVideoAssets([readyPackage]).map((video) => video.id),
    ["0818"]
  );

  // Normal generation is one call for all seven outputs; one repair is bounded.
  let generationCalls = 0;
  const generated = await generateVideoContentPackage({
    input,
    generate: async () => {
      generationCalls += 1;
      return cloneCopy();
    },
    generatedAt: "2026-08-22T00:00:00.000Z",
  });
  assert.equal(generationCalls, 1);
  assert.equal(generated.generationCalls, 1);
  assert.equal(generated.contentPackage.status, "draft");

  let repairCalls = 0;
  const repaired = await generateVideoContentPackage({
    input,
    generate: async () => {
      repairCalls += 1;
      if (repairCalls === 1) {
        const invalid = cloneCopy();
        invalid.platforms.youtube.targets[0].title = "x".repeat(101);
        return invalid;
      }
      return cloneCopy();
    },
  });
  assert.equal(repairCalls, 2);
  assert.equal(repaired.repaired, true);
  assert.equal(repaired.contentPackage.status, "draft");

  // 20. Approved 0817 content and safety remain unchanged.
  const existing = VIDEO_MANIFEST.find((video) => video.id === "0817");
  assert(existing);
  assert.equal(existing.enabled, true);
  assert.equal(
    [
      ...existing.platforms.instagram.targets,
      ...existing.platforms.facebook.targets,
      ...existing.platforms.youtube.targets,
    ].every((target) => target.enabled === false),
    true
  );

  console.log(
    "Video social copy generator tests: PASS (20 requirements; no provider or Redis calls)"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
