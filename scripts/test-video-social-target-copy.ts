import assert from "node:assert/strict";

import { expectedCanaryAuthorization } from "../app/lib/social/video/canary-gate";
import { VIDEO_MANIFEST } from "../app/lib/social/video/manifest";
import { preflightMetaVideoTarget } from "../app/lib/social/video/preflight";
import { publishFacebookReel } from "../app/lib/social/video/publish-facebook-reel";
import { publishInstagramReel } from "../app/lib/social/video/publish-instagram-reel";
import { runLiveVideoSocialCanary } from "../app/lib/social/video/run-live";
import {
  advanceTargetPublicationState,
  createPendingTargetPublicationState,
  getProviderReconciliationDecision,
} from "../app/lib/social/video/state";
import {
  getVideoTargetContent,
  resolveTargetsForPlatform,
  VIDEO_SOCIAL_TARGETS,
} from "../app/lib/social/video/targets";
import type {
  SocialTarget,
  VideoAsset,
  VideoRunRecord,
  VideoTargetPublicationState,
} from "../app/lib/social/video/types";
import { validateVideoSocialConfiguration } from "../app/lib/social/video/validate";

type RecordedCall = { url: string; init: RequestInit };

function cloneManifest(): VideoAsset[] {
  return structuredClone(VIDEO_MANIFEST) as VideoAsset[];
}

function target(targetId: string): SocialTarget {
  const value = VIDEO_SOCIAL_TARGETS.find((candidate) => candidate.id === targetId);
  assert(value, `missing target fixture ${targetId}`);
  return value;
}

function environmentFor(targetValue: SocialTarget) {
  assert(targetValue.accountIdEnv);
  const environment: Record<string, string> = {
    [targetValue.accountIdEnv]: `unit-${targetValue.id}-account`,
  };
  if (targetValue.accessTokenEnv) {
    environment[targetValue.accessTokenEnv] = `unit-${targetValue.id}-token`;
  }
  return environment;
}

function mockFetch(responses: unknown[]) {
  const calls: RecordedCall[] = [];
  let index = 0;
  return {
    calls,
    fetchFn: async (input: string | URL | Request, init: RequestInit = {}) => {
      calls.push({ url: String(input), init });
      const body = responses[index++];
      assert.notEqual(body, undefined, "unexpected mocked provider request");
      return new Response(JSON.stringify(body), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
  };
}

function enableOnly(asset: VideoAsset, platform: "instagram" | "facebook", targetId: string) {
  for (const content of asset.platforms[platform].targets) {
    content.enabled = content.targetId === targetId;
  }
}

async function testInstagramCopies() {
  const actual = VIDEO_MANIFEST[0];
  const first = getVideoTargetContent(actual, "instagram", "instagram-main");
  const second = getVideoTargetContent(actual, "instagram", "instagram-2");
  assert(first && second);
  assert.notEqual(first.caption, second.caption);
  assert.equal(
    first.caption.startsWith(
      "Ever wondered what actually happens before a bookmaker sets a price?"
    ),
    true
  );
  assert.equal(
    second.caption.startsWith(
      "The odds you see aren't magic — they're the output of a system."
    ),
    true
  );

  // 1. Each Instagram adapter request receives only its exact destination copy.
  for (const targetId of ["instagram-main", "instagram-2"] as const) {
    const asset = cloneManifest()[0];
    enableOnly(asset, "instagram", targetId);
    const targetValue = target(targetId);
    const expected = getVideoTargetContent(asset, "instagram", targetId)!;
    const mock = mockFetch([
      { id: `container-${targetId}` },
      { status_code: "FINISHED" },
      { id: `media-${targetId}` },
    ]);
    await publishInstagramReel({
      runId: `run-${targetId}`,
      asset,
      target: targetValue,
      environment: environmentFor(targetValue),
      fetchFn: mock.fetchFn,
      sleep: async () => undefined,
      maxPollAttempts: 1,
      pollIntervalMs: 0,
    });
    const requestBody = new URLSearchParams(String(mock.calls[0].init.body));
    assert.equal(requestBody.get("caption"), expected.caption);
    const other = getVideoTargetContent(
      asset,
      "instagram",
      targetId === "instagram-main" ? "instagram-2" : "instagram-main"
    )!;
    assert.notEqual(requestBody.get("caption"), other.caption);
  }
}

async function testFacebookCopies() {
  const targetIds = [
    "facebook-main",
    "facebook-2",
    "facebook-3",
    "facebook-4",
  ] as const;
  const expectedStarts: Record<(typeof targetIds)[number], string> = {
    "facebook-main": "Ever wonder how bookmakers actually come up with their odds?",
    "facebook-2": "Behind every set of odds is a model working through match data",
    "facebook-3": "Most bettors check odds at one bookmaker and stop there.",
    "facebook-4": "The odds on your screen are the output of a calculation",
  };
  const observedMessages = new Set<string>();

  // 2. All four Page adapters map their own message to Meta description.
  for (const targetId of targetIds) {
    const asset = cloneManifest()[0];
    enableOnly(asset, "facebook", targetId);
    const targetValue = target(targetId);
    const expected = getVideoTargetContent(asset, "facebook", targetId)!;
    assert.equal(expected.message.startsWith(expectedStarts[targetId]), true);
    const mock = mockFetch([
      {
        video_id: `video-${targetId}`,
        upload_url: `https://rupload.facebook.com/${targetId}`,
      },
      { success: true },
      { success: true },
      { status: { publishing_phase: { status: "complete" } } },
    ]);
    await publishFacebookReel({
      runId: `run-${targetId}`,
      asset,
      target: targetValue,
      environment: environmentFor(targetValue),
      fetchFn: mock.fetchFn,
      sleep: async () => undefined,
      maxPollAttempts: 1,
      pollIntervalMs: 0,
    });
    const finishBody = new URLSearchParams(String(mock.calls[2].init.body));
    assert.equal(finishBody.get("description"), expected.message);
    assert.equal(finishBody.has("message"), false);
    observedMessages.add(expected.message);
  }
  assert.equal(observedMessages.size, 4);
}

function testResolutionAndValidation() {
  const actual = VIDEO_MANIFEST[0];
  assert.deepEqual(
    VIDEO_SOCIAL_TARGETS.map((value) => ({
      id: value.id,
      accountIdEnv: value.accountIdEnv,
      accessTokenEnv: value.accessTokenEnv,
      clientIdEnv: value.clientIdEnv,
      clientSecretEnv: value.clientSecretEnv,
      refreshTokenEnv: value.refreshTokenEnv,
    })),
    [
      {
        id: "instagram-main",
        accountIdEnv: "INSTAGRAM_BUSINESS_ID",
        accessTokenEnv: "INSTAGRAM_ACCESS_TOKEN",
        clientIdEnv: undefined,
        clientSecretEnv: undefined,
        refreshTokenEnv: undefined,
      },
      {
        id: "instagram-2",
        accountIdEnv: "INSTAGRAM_BUSINESS_ID_2",
        accessTokenEnv: "INSTAGRAM_ACCESS_TOKEN_2",
        clientIdEnv: undefined,
        clientSecretEnv: undefined,
        refreshTokenEnv: undefined,
      },
      {
        id: "facebook-main",
        accountIdEnv: "FACEBOOK_PAGE_ID",
        accessTokenEnv: "FACEBOOK_ACCESS_TOKEN",
        clientIdEnv: undefined,
        clientSecretEnv: undefined,
        refreshTokenEnv: undefined,
      },
      {
        id: "facebook-2",
        accountIdEnv: "FACEBOOK_PAGE_ID_2",
        accessTokenEnv: "FACEBOOK_ACCESS_TOKEN_2",
        clientIdEnv: undefined,
        clientSecretEnv: undefined,
        refreshTokenEnv: undefined,
      },
      {
        id: "facebook-3",
        accountIdEnv: "FACEBOOK_PAGE_ID_3",
        accessTokenEnv: "FACEBOOK_ACCESS_TOKEN_3",
        clientIdEnv: undefined,
        clientSecretEnv: undefined,
        refreshTokenEnv: undefined,
      },
      {
        id: "facebook-4",
        accountIdEnv: "FACEBOOK_PAGE_ID_4",
        accessTokenEnv: "FACEBOOK_ACCESS_TOKEN_4",
        clientIdEnv: undefined,
        clientSecretEnv: undefined,
        refreshTokenEnv: undefined,
      },
      {
        id: "youtube-main",
        accountIdEnv: "YOUTUBE_CHANNEL_ID",
        accessTokenEnv: undefined,
        clientIdEnv: "YOUTUBE_CLIENT_ID",
        clientSecretEnv: "YOUTUBE_CLIENT_SECRET",
        refreshTokenEnv: "YOUTUBE_REFRESH_TOKEN",
      },
    ]
  );

  // 3. YouTube metadata is owned by youtube-main.
  const youtube = getVideoTargetContent(actual, "youtube", "youtube-main");
  assert(youtube);
  assert.equal(
    youtube.title,
    "How Bookmakers Actually Create Their Odds (And Why You Should Compare Them)"
  );
  assert.equal(
    youtube.description.startsWith(
      "Ever wondered what's happening behind the scenes before a bookmaker sets a price?"
    ),
    true
  );

  // 4-5. No exact entry means no fallback, no resolution, and failed preflight.
  const missingExact = cloneManifest()[0];
  missingExact.platforms.instagram.targets = missingExact.platforms.instagram.targets.filter(
    (content) => content.targetId !== "instagram-2"
  );
  assert.equal(getVideoTargetContent(missingExact, "instagram", "instagram-2"), undefined);
  assert.deepEqual(
    resolveTargetsForPlatform(missingExact, "instagram", VIDEO_SOCIAL_TARGETS),
    []
  );
  const instagram2 = target("instagram-2");
  assert.equal(
    preflightMetaVideoTarget({
      asset: missingExact,
      target: instagram2,
      environment: environmentFor(instagram2),
    }).valid,
    false
  );

  // 6. Disabled destinations may retain finalized copy.
  assert.equal(
    validateVideoSocialConfiguration(VIDEO_MANIFEST, VIDEO_SOCIAL_TARGETS).valid,
    true
  );

  // 7. Unknown target content is rejected.
  const unknown = cloneManifest();
  unknown[0].platforms.instagram.targets.push({
    targetId: "instagram-unknown",
    enabled: false,
    caption: "Finalized but unknown",
  });
  let validation = validateVideoSocialConfiguration(unknown, VIDEO_SOCIAL_TARGETS);
  assert.equal(
    !validation.valid &&
      validation.errors.some((error) => error.message.includes("unknown target ID")),
    true
  );

  // 8. Cross-platform target content is rejected.
  const mismatch = cloneManifest();
  mismatch[0].platforms.instagram.targets[0].targetId = "facebook-main";
  validation = validateVideoSocialConfiguration(mismatch, VIDEO_SOCIAL_TARGETS);
  assert.equal(
    !validation.valid &&
      validation.errors.some((error) => error.message.includes("belongs to facebook")),
    true
  );

  // 9. Duplicate content for one destination is rejected.
  const duplicate = cloneManifest();
  duplicate[0].platforms.facebook.targets.push(
    structuredClone(duplicate[0].platforms.facebook.targets[0])
  );
  validation = validateVideoSocialConfiguration(duplicate, VIDEO_SOCIAL_TARGETS);
  assert.equal(
    !validation.valid &&
      validation.errors.some((error) => error.message.includes("duplicate target content")),
    true
  );

  // Missing runtime credentials do not invalidate metadata, but do fail preflight.
  const enabledSecondary = cloneManifest()[0];
  enableOnly(enabledSecondary, "instagram", "instagram-2");
  assert.equal(
    validateVideoSocialConfiguration([enabledSecondary], VIDEO_SOCIAL_TARGETS).valid,
    true
  );
  assert.equal(
    preflightMetaVideoTarget({
      asset: enabledSecondary,
      target: instagram2,
      environment: {},
    }).valid,
    false
  );
}

async function testCanaryExactCopyAndSafety() {
  // 10. A hypothetical authorized instagram-main canary receives Post #1 only.
  const asset = cloneManifest()[0];
  enableOnly(asset, "instagram", "instagram-main");
  const mainTarget = target("instagram-main");
  const post1 = getVideoTargetContent(asset, "instagram", "instagram-main")!;
  const post2 = getVideoTargetContent(asset, "instagram", "instagram-2")!;
  let run: VideoRunRecord | null = null;
  let state: VideoTargetPublicationState | null = null;
  let receivedCaption = "";

  const result = await runLiveVideoSocialCanary(
    {
      intent: "canary",
      assetId: "0817",
      platform: "instagram",
      targetId: "instagram-main",
    },
    {
      manifest: [asset],
      targets: VIDEO_SOCIAL_TARGETS,
      sourceCanaryEnabled: true,
      environment: {
        VIDEO_SOCIAL_MODE: "live",
        VIDEO_SOCIAL_CANARY: expectedCanaryAuthorization({
          platform: "instagram",
          targetId: "instagram-main",
        }),
        INSTAGRAM_BUSINESS_ID: "unit-id",
        INSTAGRAM_ACCESS_TOKEN: "unit-token",
      },
      acquireLock: async () => true,
      getRun: async () => run,
      saveRun: async (next) => {
        run = structuredClone(next);
      },
      getPublicationState: async () => state,
      savePublicationState: async (next) => {
        state = structuredClone(next);
      },
      recordTargetSuccess: async () => undefined,
      recordGlobalSuccess: async () => undefined,
      publishInstagram: async (options) => {
        receivedCaption = getVideoTargetContent(
          options.asset,
          "instagram",
          options.target.id
        )!.caption;
        let published = options.resumeState!;
        published = advanceTargetPublicationState(published, {
          status: "container_created",
          providerContainerId: "unit-container",
          providerResourceId: "unit-container",
        });
        await options.onProgress?.(published);
        published = advanceTargetPublicationState(published, {
          status: "published",
          providerMediaId: "unit-media",
          postId: "unit-media",
          publishedAt: "2026-08-22T00:00:00.000Z",
        });
        await options.onProgress?.(published);
        return {
          containerId: "unit-container",
          mediaId: "unit-media",
          resumed: false,
          state: published,
        };
      },
    }
  );
  assert.equal(result.body.ok, true);
  assert.equal(receivedCaption, post1.caption);
  assert.notEqual(receivedCaption, post2.caption);

  // 11. The real checked-in 0817 remains completely non-publishable.
  assert.equal(
    [
      ...VIDEO_MANIFEST[0].platforms.instagram.targets,
      ...VIDEO_MANIFEST[0].platforms.facebook.targets,
      ...VIDEO_MANIFEST[0].platforms.youtube.targets,
    ].every((destination) => destination.enabled === false),
    true
  );
  assert.deepEqual(
    resolveTargetsForPlatform(VIDEO_MANIFEST[0], "instagram", VIDEO_SOCIAL_TARGETS),
    []
  );
  assert.deepEqual(
    resolveTargetsForPlatform(VIDEO_MANIFEST[0], "facebook", VIDEO_SOCIAL_TARGETS),
    []
  );
  assert.deepEqual(
    resolveTargetsForPlatform(VIDEO_MANIFEST[0], "youtube", VIDEO_SOCIAL_TARGETS),
    []
  );

  // 12. Reconciliation decisions remain target-specific and duplicate-safe.
  const pending = createPendingTargetPublicationState({
    runId: "run",
    videoId: "0817",
    platform: "instagram",
    targetId: "instagram-main",
  });
  const processing = advanceTargetPublicationState(pending, {
    status: "processing",
    providerContainerId: "existing-container",
  });
  assert.equal(getProviderReconciliationDecision(processing), "resume_existing");
  assert.equal(
    getProviderReconciliationDecision(
      advanceTargetPublicationState(processing, { status: "publishing" })
    ),
    "reconcile_ambiguous_publish"
  );
}

async function main() {
  await testInstagramCopies();
  await testFacebookCopies();
  testResolutionAndValidation();
  await testCanaryExactCopyAndSafety();
  console.log(
    "Video social target-copy tests: PASS (12 cases; provider requests and Redis fully mocked)"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
