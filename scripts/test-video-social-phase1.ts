import assert from "node:assert/strict";

import {
  buildDryRunPublicationPlan,
  parseVideoSocialMode,
} from "../app/lib/social/video/config";
import { VIDEO_MANIFEST } from "../app/lib/social/video/manifest";
import { selectLeastRecentlyUsedVideo } from "../app/lib/social/video/select-video";
import {
  readVideoLastSuccessHistory,
  recordSuccessfulVideoUse,
  VIDEO_SOCIAL_KEYS,
} from "../app/lib/social/video/state";
import {
  resolveTargetsForPlatform,
  VIDEO_SOCIAL_TARGETS,
} from "../app/lib/social/video/targets";
import type {
  SocialTarget,
  VideoAsset,
} from "../app/lib/social/video/types";
import { validateVideoSocialConfiguration } from "../app/lib/social/video/validate";

function cloneManifest(): VideoAsset[] {
  return structuredClone(VIDEO_MANIFEST);
}

function video(id: string, enabled = true): VideoAsset {
  return {
    id,
    sourceUrl: `https://res.cloudinary.com/demo/video/upload/${id}.mp4`,
    enabled,
    platforms: {
      instagram: { targets: [] },
      facebook: { targets: [] },
      youtube: { targets: [] },
    },
  };
}

function hasError(result: ReturnType<typeof validateVideoSocialConfiguration>, text: string) {
  return !result.valid && result.errors.some((error) => error.message.includes(text));
}

// 1. The checked-in draft manifest and target registry are valid.
const validResult = validateVideoSocialConfiguration(
  VIDEO_MANIFEST,
  VIDEO_SOCIAL_TARGETS
);
assert.equal(validResult.valid, true);
assert.equal(VIDEO_MANIFEST[0].id, "0817");
assert.equal(VIDEO_MANIFEST[0].enabled, true);
assert.deepEqual(
  Object.values(VIDEO_MANIFEST[0].platforms).flatMap((platform) =>
    platform.targets.map((target) => target.enabled)
  ),
  [true, false, false, false, false, false, false]
);

// 2. Duplicate video IDs are rejected.
const duplicateVideos = cloneManifest();
duplicateVideos.push(structuredClone(duplicateVideos[0]));
assert.equal(
  hasError(
    validateVideoSocialConfiguration(duplicateVideos, VIDEO_SOCIAL_TARGETS),
    "duplicate video ID"
  ),
  true
);

// Duplicate target IDs are also rejected.
const duplicateTargets = structuredClone(VIDEO_SOCIAL_TARGETS) as SocialTarget[];
duplicateTargets.push(structuredClone(duplicateTargets[0]));
assert.equal(
  hasError(
    validateVideoSocialConfiguration(VIDEO_MANIFEST, duplicateTargets),
    "duplicate target ID"
  ),
  true
);

// 3. Invalid and non-Cloudinary source URLs are rejected.
const invalidUrl = cloneManifest();
invalidUrl[0].sourceUrl = "http://example.com/video.mp4";
const invalidUrlResult = validateVideoSocialConfiguration(
  invalidUrl,
  VIDEO_SOCIAL_TARGETS
);
assert.equal(hasError(invalidUrlResult, "must use HTTPS"), true);
assert.equal(hasError(invalidUrlResult, "res.cloudinary.com"), true);

// 4. Unknown target references are rejected.
const unknownTarget = cloneManifest();
unknownTarget[0].platforms.instagram.targets.push({
  targetId: "instagram-missing",
  enabled: false,
  caption: "",
});
assert.equal(
  hasError(
    validateVideoSocialConfiguration(unknownTarget, VIDEO_SOCIAL_TARGETS),
    "unknown target ID"
  ),
  true
);

// 5. Enabled platforms require usable platform-specific copy.
const missingInstagramCopy = cloneManifest();
missingInstagramCopy[0].platforms.instagram.targets[0].enabled = true;
missingInstagramCopy[0].platforms.instagram.targets[0].caption = "";
assert.equal(
  hasError(
    validateVideoSocialConfiguration(
      missingInstagramCopy,
      VIDEO_SOCIAL_TARGETS
    ),
    "required when Instagram destination is enabled"
  ),
  true
);

const missingYouTubeCopy = cloneManifest();
missingYouTubeCopy[0].platforms.youtube.targets[0].enabled = true;
missingYouTubeCopy[0].platforms.youtube.targets[0].title = "";
assert.equal(
  hasError(
    validateVideoSocialConfiguration(missingYouTubeCopy, VIDEO_SOCIAL_TARGETS),
    "required when YouTube destination is enabled"
  ),
  true
);

// 6. Disabled platforms may retain empty draft copy.
assert.equal(
  validateVideoSocialConfiguration(cloneManifest(), VIDEO_SOCIAL_TARGETS).valid,
  true
);

// Invalid structures fail validation rather than reaching planning.
assert.equal(
  validateVideoSocialConfiguration([{ id: "broken" }], VIDEO_SOCIAL_TARGETS)
    .valid,
  false
);

const nowMs = 1_000_000;

// 7. Never-used videos are preferred, preserving manifest order.
const neverUsedSelection = selectLeastRecentlyUsedVideo(
  [video("used"), video("new-first"), video("new-second")],
  { used: 100 },
  { nowMs, cooldownMs: 0 }
);
assert.equal(neverUsedSelection.status, "selected");
assert.equal(
  neverUsedSelection.status === "selected" && neverUsedSelection.asset.id,
  "new-first"
);

// 8. The least-recently-used eligible video is selected.
const lruSelection = selectLeastRecentlyUsedVideo(
  [video("newer"), video("oldest"), video("middle")],
  { newer: 800, oldest: 100, middle: 500 },
  { nowMs, cooldownMs: 0 }
);
assert.equal(lruSelection.status, "selected");
assert.equal(lruSelection.status === "selected" && lruSelection.asset.id, "oldest");

// 9. Videos inside cooldown are excluded when another candidate is eligible.
const cooldownSelection = selectLeastRecentlyUsedVideo(
  [video("cooling"), video("ready")],
  { cooling: nowMs - 10, ready: nowMs - 1_000 },
  { nowMs, cooldownMs: 100 }
);
assert.equal(
  cooldownSelection.status === "selected" && cooldownSelection.asset.id,
  "ready"
);

const allCoolingSelection = selectLeastRecentlyUsedVideo(
  [video("cooling-a"), video("cooling-b")],
  { "cooling-a": nowMs - 10, "cooling-b": nowMs - 20 },
  { nowMs, cooldownMs: 100 }
);
assert.equal(allCoolingSelection.status, "cooldown_blocked");

// 10. Equal timestamps use manifest order as deterministic tie-breaking.
const tieSelection = selectLeastRecentlyUsedVideo(
  [video("first"), video("second")],
  { first: 100, second: 100 },
  { nowMs, cooldownMs: 0 }
);
assert.equal(tieSelection.status === "selected" && tieSelection.asset.id, "first");

// 11. A manifest with no globally enabled asset has a clear result.
assert.deepEqual(
  selectLeastRecentlyUsedVideo(
    [video("disabled-a", false), video("disabled-b", false)],
    {},
    { nowMs, cooldownMs: 0 }
  ),
  { status: "no_eligible_video", eligibleVideoIds: [] }
);

// 12. Missing and invalid VIDEO_SOCIAL_MODE values fail closed.
assert.deepEqual(parseVideoSocialMode(undefined), {
  mode: "disabled",
  configured: false,
  valid: true,
});
assert.equal(parseVideoSocialMode("unexpected").mode, "disabled");
assert.equal(parseVideoSocialMode("unexpected").valid, false);

const targetFixture: SocialTarget[] = [
  {
    id: "instagram-main",
    platform: "instagram",
    enabled: true,
    accountIdEnv: "INSTAGRAM_BUSINESS_ID",
    accessTokenEnv: "INSTAGRAM_ACCESS_TOKEN",
  },
  {
    id: "instagram-football",
    platform: "instagram",
    enabled: true,
    accountIdEnv: "INSTAGRAM_FOOTBALL_BUSINESS_ID",
    accessTokenEnv: "INSTAGRAM_FOOTBALL_ACCESS_TOKEN",
  },
  {
    id: "instagram-disabled",
    platform: "instagram",
    enabled: false,
    accountIdEnv: "INSTAGRAM_DISABLED_BUSINESS_ID",
    accessTokenEnv: "INSTAGRAM_DISABLED_ACCESS_TOKEN",
  },
];

const plannedVideo = video("planned");
plannedVideo.platforms.instagram = {
  targets: [
    {
      targetId: "instagram-football",
      enabled: true,
      caption: "Draft test copy",
    },
  ],
};

// 13. Dry-run plans expose IDs and copy, never credential fields or values.
const dryRunPlan = buildDryRunPublicationPlan(plannedVideo, targetFixture);
const serializedPlan = JSON.stringify(dryRunPlan);
assert.equal(serializedPlan.includes("accessTokenEnv"), false);
assert.equal(serializedPlan.includes("accountIdEnv"), false);
assert.equal(serializedPlan.includes("INSTAGRAM_FOOTBALL_ACCESS_TOKEN"), false);

// 14. Explicit target subsets are resolved in their declared order.
assert.deepEqual(dryRunPlan.resolvedTargetIds.instagram, ["instagram-football"]);

// 15. Disabled targets are excluded, including when explicitly requested.
plannedVideo.platforms.instagram.targets = [
  { targetId: "instagram-disabled", enabled: true, caption: "Disabled" },
  { targetId: "instagram-main", enabled: true, caption: "Main" },
];
assert.deepEqual(
  resolveTargetsForPlatform(plannedVideo, "instagram", targetFixture).map(
    (target) => target.id
  ),
  ["instagram-main"]
);

async function testRedisHelpersWithFakes() {
  // Redis helpers are exercised only through in-memory fakes.
  const readCalls: Array<[string, string]> = [];
  const history = await readVideoLastSuccessHistory(["0817", "other", "0817"], {
    async zscore(key, member) {
      readCalls.push([key, member]);
      return member === "0817" ? 1234 : null;
    },
  });
  assert.deepEqual(history, { "0817": 1234 });
  assert.deepEqual(readCalls, [
    [VIDEO_SOCIAL_KEYS.history, "0817"],
    [VIDEO_SOCIAL_KEYS.history, "other"],
  ]);

  const writes: Array<{ key: string; score: number; member: string }> = [];
  await recordSuccessfulVideoUse("0817", 5678, {
    async zadd(key, entry) {
      writes.push({ key, ...entry });
      return 1;
    },
  });
  assert.deepEqual(writes, [
    { key: "social:video:history", score: 5678, member: "0817" },
  ]);
  assert.equal(
    VIDEO_SOCIAL_KEYS.lock("2026-08-22"),
    "social:video:lock:2026-08-22"
  );
  assert.equal(
    VIDEO_SOCIAL_KEYS.publication("run-1", "instagram", "instagram-main"),
    "social:video:pub:run-1:instagram:instagram-main"
  );
}

testRedisHelpersWithFakes()
  .then(() => {
    console.log(
      "Video social Phase 1 tests: PASS (validation, rotation, targets, mode, state)"
    );
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
