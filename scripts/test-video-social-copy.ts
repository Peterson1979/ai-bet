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

const instagramBodyMain =
  "Small differences between available prices can matter when you are comparing a market. MatchSignal brings odds from multiple sportsbooks into one clear view, adds market-based probability analysis, and explains potential value so you can research the selection with useful context before deciding.";
const instagramBodySecond =
  "Racing between bookmaker tabs makes it harder to see how prices differ. MatchSignal organizes available odds, estimated fair probability, risk tiers, and concise AI-assisted explanations in one place so you can compare the market efficiently and understand what the numbers may mean.";
const facebookBodies = [
  "The fastest price is not automatically the most useful one without context. MatchSignal compares available odds from multiple sportsbooks, evaluates market-based probability, and presents a concise explanation of potential value. That gives you a clearer way to research the same selection across the market before making your own decision.",
  "Checking one bookmaker can leave useful pricing context out of view. MatchSignal brings sportsbook coverage together with market-average pricing, estimated fair probability, and a clear risk tier. You can spend less time moving between tabs and more time understanding why an available price may deserve closer analysis.",
  "A wall of changing numbers can make odds comparison feel unnecessarily difficult. MatchSignal turns that problem into a cleaner research workflow by organizing available prices, highlighting potential value, and explaining the analysis in plain English. The result is a more informed view of the market without pretending any outcome is certain.",
  "Small pricing differences are easier to evaluate when the important context sits together. MatchSignal combines available sportsbook odds with probability estimates, bookmaker coverage, and concise AI-assisted explanations. Use the comparison to identify a potentially stronger price faster while keeping the final decision and its risks in perspective.",
] as const;
const youtubeBody =
  "Small differences in available odds can affect the potential value of a selection, but scanning many changing price panels takes time. This video shows an AI scanning wave organizing that information into one clear comparison card. MatchSignal helps you compare sportsbook prices alongside market-based probability analysis, estimated fair probability, risk tiers, and concise explanations. It is a faster research workflow designed to add context to the numbers, not to predict the future or guarantee a result.";

const validCopy: GeneratedVideoCopy = {
  id: "0818",
  platforms: {
    instagram: {
      targets: [
        {
          targetId: "instagram-main",
          caption: `${instagramBodyMain}\n\nLink in bio\n\n18+ | Gamble responsibly | Informational purposes only.\n\n#MatchSignal #OddsComparison #SportsAnalysis #BettingTools #ResponsibleGambling`,
        },
        {
          targetId: "instagram-2",
          caption: `${instagramBodySecond}\n\nLink in bio\n\n18+ | Responsible gambling | Odds can change; no prediction guarantees an outcome.\n\n#SportsAnalytics #AvailableOdds #ValueAnalysis #MatchSignalPro #GambleResponsibly`,
        },
      ],
    },
    facebook: {
      targets: [
        {
          targetId: "facebook-main",
          message: `${facebookBodies[0]}\n\nhttps://www.matchsignal.pro\n\n18+ | Gamble responsibly | Informational analysis only.`,
        },
        {
          targetId: "facebook-2",
          message: `${facebookBodies[1]}\n\nhttps://www.matchsignal.pro\n\n18+ | Responsible gambling | Odds can change and no outcome is guaranteed.`,
        },
        {
          targetId: "facebook-3",
          message: `${facebookBodies[2]}\n\nhttps://www.matchsignal.pro\n\n18+ | Gamble responsibly | No prediction guarantees an outcome.`,
        },
        {
          targetId: "facebook-4",
          message: `${facebookBodies[3]}\n\nhttps://www.matchsignal.pro\n\n18+ | Responsible gambling | No guarantee of profit.`,
        },
      ],
    },
    youtube: {
      targets: [
        {
          targetId: "youtube-main",
          title: "Find Better Odds Faster with Smarter Comparison",
          description: `${youtubeBody}\n\nhttps://www.matchsignal.pro\n\n18+ | Gamble responsibly | Informational purposes only; odds can change.`,
          tags: [
            "MatchSignal",
            "odds comparison",
            "sports analysis",
            "available prices",
            "responsible gambling",
          ],
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

  const noInstagramDisclaimer = cloneCopy();
  noInstagramDisclaimer.platforms.instagram.targets[1].caption = `${instagramBodySecond}\n\nLink in bio\n\n#SportsAnalytics #AvailableOdds #ValueAnalysis #MatchSignalPro #GambleResponsibly`;
  expectInvalid(noInstagramDisclaimer, "Instagram disclaimer is required");

  const noInstagramHashtags = cloneCopy();
  noInstagramHashtags.platforms.instagram.targets[0].caption = `${instagramBodyMain}\n\nLink in bio\n\n18+ | Gamble responsibly | Informational purposes only.`;
  expectInvalid(noInstagramHashtags, "Instagram hashtags are required");
  const noYoutubeUrl = cloneCopy();
  noYoutubeUrl.platforms.youtube.targets[0].description = noYoutubeUrl.platforms.youtube.targets[0].description.replace(
    "https://www.matchsignal.pro",
    "MatchSignal"
  );
  expectInvalid(noYoutubeUrl, "YouTube URL is required");
  const longTitle = cloneCopy();
  longTitle.platforms.youtube.targets[0].title = "x".repeat(101);
  expectInvalid(longTitle, "YouTube title over 100 characters must fail");

  const facebookUrlDisclaimerOnly = cloneCopy();
  facebookUrlDisclaimerOnly.platforms.facebook.targets[2].message =
    "https://www.matchsignal.pro\n\n18+ | Gamble responsibly | Informational purposes only.";
  expectInvalid(facebookUrlDisclaimerOnly, "Facebook URL and disclaimer only must fail");

  const shortFacebookBody = cloneCopy();
  shortFacebookBody.platforms.facebook.targets[3].message =
    "MatchSignal compares available odds so you can review prices.\n\nhttps://www.matchsignal.pro\n\n18+ | Responsible gambling | No guarantee of profit.";
  expectInvalid(shortFacebookBody, "Facebook substantive body below 220 characters must fail");

  const shortYoutubeDescription = cloneCopy();
  shortYoutubeDescription.platforms.youtube.targets[0].description =
    "MatchSignal compares available odds with useful analysis.\n\nhttps://www.matchsignal.pro\n\n18+ | Gamble responsibly | Informational purposes only.";
  expectInvalid(shortYoutubeDescription, "YouTube substantive description below 300 characters must fail");

  const contentEmpty = cloneCopy();
  contentEmpty.platforms.instagram.targets[0].caption = "";
  contentEmpty.platforms.facebook.targets[0].message = "";
  contentEmpty.platforms.youtube.targets[0].description = "";
  contentEmpty.platforms.youtube.targets[0].tags = [];
  expectInvalid(contentEmpty, "structurally shaped but content-empty copy must fail");

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
    "Video social copy generator tests: PASS (26 requirements; no provider or Redis calls)"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
