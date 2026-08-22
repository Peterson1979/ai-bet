import assert from "node:assert/strict";
import { handleVideoSocialRun } from "../app/api/video-social-run/route";
import {
  VIDEO_SOCIAL_CANARY_SOURCE_ENABLED,
  expectedCanaryAuthorization,
} from "../app/lib/social/video/canary-gate";
import { VIDEO_MANIFEST } from "../app/lib/social/video/manifest";
import { preflightMetaVideoTarget } from "../app/lib/social/video/preflight";
import {
  getVideoSocialCanaryRunId,
  getVideoSocialCanarySlot,
  runLiveVideoSocialCanary,
  type LiveVideoSocialDependencies,
} from "../app/lib/social/video/run-live";
import {
  advanceTargetPublicationState,
  createPendingTargetPublicationState,
} from "../app/lib/social/video/state";
import type {
  SocialTarget,
  VideoAsset,
  VideoRunRecord,
  VideoTargetPublicationState,
} from "../app/lib/social/video/types";

const TOKEN = "unit-secret-token-never-persist";
const instagramTarget: SocialTarget = {
  id: "instagram-main",
  platform: "instagram",
  enabled: true,
  accountIdEnv: "TEST_IG_ID",
  accessTokenEnv: "TEST_IG_TOKEN",
};
const facebookTarget: SocialTarget = {
  id: "facebook-main",
  platform: "facebook",
  enabled: true,
  accountIdEnv: "TEST_FB_ID",
  accessTokenEnv: "TEST_FB_TOKEN",
};

function fixtureAsset(platform: "instagram" | "facebook" = "instagram"): VideoAsset {
  return {
    id: "0817",
    sourceUrl:
      "https://res.cloudinary.com/unit/video/upload/f_mp4/v1/0817.mp4",
    enabled: true,
    platforms: {
      instagram: {
        targets: [
          {
            targetId: "instagram-main",
            enabled: platform === "instagram",
            caption: platform === "instagram" ? "Mock canary caption" : "",
          },
        ],
      },
      facebook: {
        targets: [
          {
            targetId: "facebook-main",
            enabled: platform === "facebook",
            message: platform === "facebook" ? "Mock canary description" : "",
          },
        ],
      },
      youtube: { targets: [] },
    },
  };
}

function environment(platform: "instagram" | "facebook" = "instagram") {
  const targetId = platform === "instagram" ? "instagram-main" : "facebook-main";
  return {
    VIDEO_SOCIAL_MODE: "live",
    VIDEO_SOCIAL_CANARY: expectedCanaryAuthorization({ platform, targetId }),
    TEST_IG_ID: "ig-id",
    TEST_IG_TOKEN: TOKEN,
    TEST_FB_ID: "fb-id",
    TEST_FB_TOKEN: TOKEN,
  };
}

function intent(platform: "instagram" | "facebook" = "instagram") {
  return {
    intent: "canary",
    assetId: "0817",
    platform,
    targetId: platform === "instagram" ? "instagram-main" : "facebook-main",
  };
}

function existingRun(platform: "instagram" | "facebook"): VideoRunRecord {
  const targetId = platform === "instagram" ? "instagram-main" : "facebook-main";
  const values = { platform, assetId: "0817", targetId };
  return {
    runId: getVideoSocialCanaryRunId(values),
    slot: getVideoSocialCanarySlot(values),
    videoId: "0817",
    intent: "canary",
    platform,
    targetIds: [targetId],
    status: "publishing",
    createdAt: "2026-08-22T00:00:00.000Z",
    updatedAt: "2026-08-22T00:00:00.000Z",
  };
}

function stateAt(
  platform: "instagram" | "facebook",
  status: VideoTargetPublicationState["status"]
) {
  const targetId = platform === "instagram" ? "instagram-main" : "facebook-main";
  let state = createPendingTargetPublicationState({
    runId: getVideoSocialCanaryRunId({ platform, assetId: "0817", targetId }),
    videoId: "0817",
    platform,
    targetId,
    now: "2026-08-22T00:00:00.000Z",
  });
  if (status === "pending") return state;
  state = advanceTargetPublicationState(state, {
    status,
    attempts: 1,
    providerResourceId: `${platform}-resource-existing`,
    providerContainerId:
      platform === "instagram" ? "ig-container-existing" : null,
    providerUploadId: platform === "facebook" ? "fb-video-existing" : null,
    providerUploadUrl:
      platform === "facebook" ? "https://rupload.facebook.com/existing" : null,
    providerMediaId: status === "published" ? `${platform}-media-existing` : null,
    postId: status === "published" ? `${platform}-media-existing` : null,
  });
  return state;
}

type Memory = {
  run: VideoRunRecord | null;
  state: VideoTargetPublicationState | null;
  savedRuns: VideoRunRecord[];
  savedStates: VideoTargetPublicationState[];
  targetHistory: string[];
  globalHistory: string[];
  lockCalls: number;
  providerCalls: number;
  initializations: number;
};

function harness(params: {
  platform?: "instagram" | "facebook";
  asset?: VideoAsset;
  targets?: SocialTarget[];
  env?: Record<string, string | undefined>;
  sourceEnabled?: boolean;
  lockAcquired?: boolean;
  run?: VideoRunRecord | null;
  state?: VideoTargetPublicationState | null;
  failProvider?: boolean;
} = {}): { dependencies: LiveVideoSocialDependencies; memory: Memory } {
  const platform = params.platform ?? "instagram";
  const asset = params.asset ?? fixtureAsset(platform);
  const memory: Memory = {
    run: params.run ?? null,
    state: params.state ?? null,
    savedRuns: [],
    savedStates: [],
    targetHistory: [],
    globalHistory: [],
    lockCalls: 0,
    providerCalls: 0,
    initializations: 0,
  };

  const publish = async (options: {
    resumeState?: VideoTargetPublicationState | null;
    onProgress?: (state: VideoTargetPublicationState) => void | Promise<void>;
  }) => {
    memory.providerCalls += 1;
    let state = options.resumeState!;
    const hasProviderId = Boolean(
      state.providerContainerId || state.providerUploadId || state.providerResourceId
    );
    if (!hasProviderId) {
      memory.initializations += 1;
      state = advanceTargetPublicationState(state, {
        status: "container_created",
        attempts: state.attempts + 1,
        providerResourceId: `${platform}-resource-new`,
        providerContainerId: platform === "instagram" ? "ig-container-new" : null,
        providerUploadId: platform === "facebook" ? "fb-video-new" : null,
      });
      await options.onProgress?.(state);
    }
    if (params.failProvider) throw new Error(`provider failed ${TOKEN}`);
    state = advanceTargetPublicationState(state, { status: "processing" });
    await options.onProgress?.(state);
    state = advanceTargetPublicationState(state, { status: "ready" });
    await options.onProgress?.(state);
    state = advanceTargetPublicationState(state, { status: "publishing" });
    await options.onProgress?.(state);
    state = advanceTargetPublicationState(state, {
      status: "published",
      providerMediaId: `${platform}-media-new`,
      postId: `${platform}-media-new`,
      publishedAt: "2026-08-22T00:01:00.000Z",
    });
    await options.onProgress?.(state);
    return platform === "instagram"
      ? {
          containerId: state.providerContainerId!,
          mediaId: state.providerMediaId!,
          resumed: hasProviderId,
          state,
        }
      : {
          videoId: state.providerUploadId!,
          resumed: hasProviderId,
          state,
        };
  };

  const dependencies: LiveVideoSocialDependencies = {
    manifest: [asset],
    targets:
      params.targets ??
      [instagramTarget, facebookTarget],
    environment: params.env ?? environment(platform),
    sourceCanaryEnabled: params.sourceEnabled ?? true,
    now: () => Date.parse("2026-08-22T00:02:00.000Z"),
    acquireLock: async () => {
      memory.lockCalls += 1;
      return params.lockAcquired ?? true;
    },
    getRun: async () => memory.run,
    saveRun: async (run) => {
      memory.run = structuredClone(run);
      memory.savedRuns.push(structuredClone(run));
    },
    getPublicationState: async () => memory.state,
    savePublicationState: async (state) => {
      memory.state = structuredClone(state);
      memory.savedStates.push(structuredClone(state));
    },
    recordTargetSuccess: async (p, targetId, videoId) => {
      memory.targetHistory.push(`${p}:${targetId}:${videoId}`);
    },
    recordGlobalSuccess: async (videoId) => {
      memory.globalHistory.push(videoId);
    },
    publishInstagram: publish as NonNullable<LiveVideoSocialDependencies["publishInstagram"]>,
    publishFacebook: publish as NonNullable<LiveVideoSocialDependencies["publishFacebook"]>,
  };
  return { dependencies, memory };
}

async function expectBlocked(
  overrides: Parameters<typeof harness>[0],
  request = intent("instagram")
) {
  const { dependencies, memory } = harness(overrides);
  const result = await runLiveVideoSocialCanary(request, dependencies);
  assert.equal(result.body.ok, false);
  assert.equal(memory.providerCalls, 0);
  return { result, memory };
}

async function testStaticGates() {
  // 1. Live mode alone and a generic route invocation cannot publish.
  let routeProviderCalls = 0;
  const generic = await handleVideoSocialRun(
    new Request("https://unit.invalid/api/video-social-run", {
      headers: { authorization: "Bearer cron" },
    }),
    {
      environment: { CRON_SECRET: "cron", VIDEO_SOCIAL_MODE: "live" },
      runLiveCanary: async () => {
        routeProviderCalls += 1;
        throw new Error("generic live route entered canary");
      },
    }
  );
  assert.equal(generic.status, 501);
  assert.equal(routeProviderCalls, 0);
  const notLive = await expectBlocked({
    env: { ...environment(), VIDEO_SOCIAL_MODE: "dry-run" },
  });
  assert.equal(notLive.memory.lockCalls, 0);

  // 2-3. Missing or non-exact authorization is blocked before Redis.
  const missingAuth = await expectBlocked({ env: { ...environment(), VIDEO_SOCIAL_CANARY: undefined } });
  assert.equal(missingAuth.memory.lockCalls, 0);
  const wrongAuth = await expectBlocked({ env: { ...environment(), VIDEO_SOCIAL_CANARY: "true" } });
  assert.equal(wrongAuth.memory.lockCalls, 0);

  // 4-6. Every bound request dimension must match exactly.
  await expectBlocked({}, { ...intent(), assetId: "other" });
  await expectBlocked({}, { ...intent(), targetId: "instagram-other" });
  await expectBlocked({}, { ...intent(), platform: "facebook" });

  // 7. Canary resolution is exactly one target.
  const multipleAsset = fixtureAsset();
  multipleAsset.platforms.instagram.targets.push({
    targetId: "instagram-football",
    enabled: true,
    caption: "Second mock caption",
  });
  await expectBlocked({
    asset: multipleAsset,
    targets: [
      instagramTarget,
      { ...instagramTarget, id: "instagram-football" },
      facebookTarget,
    ],
  });

  // 8. The temporary, explicitly authorized source-level canary switch is open.
  assert.equal(VIDEO_SOCIAL_CANARY_SOURCE_ENABLED, true);
  const closed = await expectBlocked({ sourceEnabled: false });
  assert.equal(closed.memory.lockCalls, 0);

  // 9-10. Disabled platform and empty copy are independent hard stops.
  const disabled = fixtureAsset();
  disabled.platforms.instagram.targets[0].enabled = false;
  await expectBlocked({ asset: disabled });
  const empty = fixtureAsset();
  empty.platforms.instagram.targets[0].caption = "";
  await expectBlocked({ asset: empty });

  // 11. Static credential preflight failure blocks before Redis.
  const preflightFail = await expectBlocked({ env: { ...environment(), TEST_IG_TOKEN: undefined } });
  assert.equal(preflightFail.memory.lockCalls, 0);

  // 12. Redis lock contention blocks before provider creation.
  const lockFail = await expectBlocked({ lockAcquired: false });
  assert.equal(lockFail.memory.lockCalls, 1);
}

async function testReconciliationAndPersistence() {
  // 13. A published target returns its stored result without provider creation.
  let h = harness({ run: existingRun("instagram"), state: stateAt("instagram", "published") });
  let result = await runLiveVideoSocialCanary(intent(), h.dependencies);
  assert.equal(result.body.alreadyPublished, true);
  assert.equal(h.memory.providerCalls, 0);

  // 14. An existing Instagram container resumes without another initialization.
  h = harness({ run: existingRun("instagram"), state: stateAt("instagram", "processing") });
  result = await runLiveVideoSocialCanary(intent(), h.dependencies);
  assert.equal(result.body.ok, true);
  assert.equal(h.memory.providerCalls, 1);
  assert.equal(h.memory.initializations, 0);

  // 15. Ambiguous Instagram publishing is never repeated.
  const ambiguous = await expectBlocked({
    run: existingRun("instagram"),
    state: stateAt("instagram", "publishing"),
  });
  assert.equal(ambiguous.result.status, 409);

  // 16. Facebook upload sessions resume without initialization.
  h = harness({
    platform: "facebook",
    run: existingRun("facebook"),
    state: stateAt("facebook", "container_created"),
  });
  result = await runLiveVideoSocialCanary(intent("facebook"), h.dependencies);
  assert.equal(result.body.ok, true);
  assert.equal(h.memory.initializations, 0);

  // 17. Facebook publishing reconciles its existing video ID by polling it.
  h = harness({
    platform: "facebook",
    run: existingRun("facebook"),
    state: stateAt("facebook", "publishing"),
  });
  result = await runLiveVideoSocialCanary(intent("facebook"), h.dependencies);
  assert.equal(result.body.ok, true);
  assert.equal(h.memory.initializations, 0);

  // 18-20. Progress is persisted, credentials are absent, and both histories advance.
  h = harness();
  result = await runLiveVideoSocialCanary(intent(), h.dependencies);
  assert.equal(result.body.ok, true);
  assert.equal(h.memory.savedStates.some((state) => state.status === "processing"), true);
  assert.equal(
    JSON.stringify([h.memory.savedStates, h.memory.savedRuns]).includes(TOKEN),
    false
  );
  assert.deepEqual(h.memory.targetHistory, ["instagram:instagram-main:0817"]);
  assert.deepEqual(h.memory.globalHistory, ["0817"]);

  // 22. Provider failure is safely persisted and never advances success history.
  h = harness({ failProvider: true });
  result = await runLiveVideoSocialCanary(intent(), h.dependencies);
  assert.equal(result.body.ok, false);
  assert.equal(h.memory.state?.status, "failed");
  assert.equal(JSON.stringify(h.memory.state).includes(TOKEN), false);
  assert.equal(h.memory.targetHistory.length, 0);
  assert.equal(h.memory.globalHistory.length, 0);

  // 23. Atomic lock semantics prevent a duplicate invocation/provider creation.
  h = harness();
  let held = false;
  h.dependencies.acquireLock = async () => {
    if (held) return false;
    held = true;
    return true;
  };
  const first = await runLiveVideoSocialCanary(intent(), h.dependencies);
  const second = await runLiveVideoSocialCanary(intent(), h.dependencies);
  assert.equal(first.body.ok, true);
  assert.equal(second.status, 409);
  assert.equal(h.memory.providerCalls, 1);
}

async function testRouteAndCurrentManifestSafety() {
  // 21. Dry-run remains read-only and never invokes the live runner.
  let liveCalls = 0;
  const dry = await handleVideoSocialRun(
    new Request("https://unit.invalid/api/video-social-run", {
      headers: { "x-cron-secret": "cron" },
    }),
    {
      environment: { CRON_SECRET: "cron", VIDEO_SOCIAL_MODE: "dry-run" },
      readHistory: async () => ({}),
      runLiveCanary: async () => {
        liveCalls += 1;
        throw new Error("dry-run entered live orchestrator");
      },
    }
  );
  const dryBody = await dry.json();
  assert.equal(dryBody.publicationStateMutated, false);
  assert.equal(dryBody.providerCallsMade, false);
  assert.equal(liveCalls, 0);

  // 24. Only intent=canary enters the canary runner; all dimensions are forwarded.
  const canaryRequest = new Request(
    "https://unit.invalid/api/video-social-run?intent=canary&assetId=0817&platform=instagram&targetId=instagram-main",
    { headers: { authorization: "Bearer cron" } }
  );
  const canaryRoute = await handleVideoSocialRun(canaryRequest, {
    environment: { CRON_SECRET: "cron", VIDEO_SOCIAL_MODE: "live" },
    runLiveCanary: async (received) => {
      liveCalls += 1;
      assert.deepEqual(received, intent());
      return { status: 403, body: { ok: false, sourceGateClosed: true } };
    },
  });
  assert.equal(canaryRoute.status, 403);
  assert.equal(liveCalls, 1);

  // Temporary authentication is exact, canary-only, and cannot authenticate
  // ordinary video-social requests when CRON_SECRET is unavailable.
  const temporarySecret = "unit-temporary-canary-secret";
  const temporaryEnvironment = {
    VIDEO_SOCIAL_MODE: "live",
    VIDEO_SOCIAL_CANARY_REQUEST_SECRET: temporarySecret,
  };
  const temporaryRequest = new Request(
    "https://unit.invalid/api/video-social-run?intent=canary&assetId=0817&platform=instagram&targetId=instagram-main",
    { headers: { "x-video-social-canary-secret": temporarySecret } }
  );
  const temporaryRoute = await handleVideoSocialRun(temporaryRequest, {
    environment: temporaryEnvironment,
    runLiveCanary: async (received) => {
      liveCalls += 1;
      assert.deepEqual(received, intent());
      return { status: 403, body: { ok: false, downstreamGateChecked: true } };
    },
  });
  assert.equal(temporaryRoute.status, 403);
  assert.equal(liveCalls, 2);

  for (const request of [
    new Request(
      "https://unit.invalid/api/video-social-run?intent=canary&assetId=0817&platform=instagram&targetId=instagram-main",
      { headers: { "x-video-social-canary-secret": "wrong" } }
    ),
    new Request(
      "https://unit.invalid/api/video-social-run?intent=canary&assetId=0817&platform=instagram&targetId=instagram-main"
    ),
    new Request("https://unit.invalid/api/video-social-run", {
      headers: { "x-video-social-canary-secret": temporarySecret },
    }),
  ]) {
    const unauthorized = await handleVideoSocialRun(request, {
      environment: temporaryEnvironment,
      runLiveCanary: async () => {
        liveCalls += 1;
        throw new Error("unauthorized request entered canary runner");
      },
    });
    assert.equal(unauthorized.status, 401);
  }
  assert.equal(liveCalls, 2);

  // 25. The actual 0817 manifest exposes only the authorized Instagram target.
  const actual = VIDEO_MANIFEST.find((asset) => asset.id === "0817")!;
  assert.equal(actual.enabled, true);
  assert.deepEqual(
    [
      ...actual.platforms.instagram.targets,
      ...actual.platforms.facebook.targets,
      ...actual.platforms.youtube.targets,
    ]
      .filter((destination) => destination.enabled)
      .map((destination) => destination.targetId),
    ["instagram-main"]
  );
  const actualPreflight = preflightMetaVideoTarget({
    asset: actual,
    target: instagramTarget,
    environment: environment(),
  });
  assert.equal(actualPreflight.valid, true);
}

async function main() {
  await testStaticGates();
  await testReconciliationAndPersistence();
  await testRouteAndCurrentManifestSafety();
  console.log(
    "Video social Phase 2B orchestration tests: PASS (25 cases; Redis and providers fully mocked)"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
