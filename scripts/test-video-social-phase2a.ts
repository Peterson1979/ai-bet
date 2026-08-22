import assert from "node:assert/strict";

import { handleVideoSocialRun } from "../app/api/video-social-run/route";
import {
  evaluateVideoSocialCanaryGate,
  expectedCanaryAuthorization,
  VIDEO_SOCIAL_CANARY_SOURCE_ENABLED,
} from "../app/lib/social/video/canary-gate";
import { diagnoseMetaVideoTarget } from "../app/lib/social/video/meta-readiness";
import {
  INSTAGRAM_LOGIN_GRAPH_BASE,
  META_GRAPH_BASE,
  ProviderPollingTimeoutError,
  SafeProviderRequestError,
} from "../app/lib/social/video/meta-request";
import { preflightMetaVideoTarget } from "../app/lib/social/video/preflight";
import { publishFacebookReel } from "../app/lib/social/video/publish-facebook-reel";
import {
  INSTAGRAM_REEL_DEFAULT_MAX_POLL_ATTEMPTS,
  INSTAGRAM_REEL_DEFAULT_POLL_INTERVAL_MS,
  publishInstagramReel,
} from "../app/lib/social/video/publish-instagram-reel";
import { selectLeastRecentlyUsedVideo } from "../app/lib/social/video/select-video";
import {
  advanceTargetPublicationState,
  createPendingTargetPublicationState,
  getProviderReconciliationDecision,
} from "../app/lib/social/video/state";
import type {
  SafeProviderError,
  SocialTarget,
  VideoAsset,
  VideoTargetPublicationState,
} from "../app/lib/social/video/types";

type RecordedCall = { url: string; init: RequestInit };
type MockReply =
  | { body: unknown; status?: number }
  | ((call: RecordedCall) => { body: unknown; status?: number });

function createMockFetch(replies: MockReply[]) {
  const calls: RecordedCall[] = [];
  const fetchFn = async (
    input: string | URL | Request,
    init: RequestInit = {}
  ) => {
    const call = { url: String(input), init };
    calls.push(call);
    const next = replies.shift();
    if (!next) throw new Error("unexpected mocked provider request");
    const reply = typeof next === "function" ? next(call) : next;
    return new Response(JSON.stringify(reply.body), {
      status: reply.status ?? 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  return { fetchFn, calls, remaining: replies };
}

function formBody(call: RecordedCall): URLSearchParams {
  assert.equal(typeof call.init.body, "string");
  return new URLSearchParams(call.init.body as string);
}

function createAsset(): VideoAsset {
  return {
    id: "0817-test",
    sourceUrl:
      "https://res.cloudinary.com/u4u07qyb/video/upload/v1787392866/0817.mp4",
    enabled: true,
    platforms: {
      instagram: {
        targets: [
          {
            targetId: "instagram-main",
            enabled: true,
            caption: "Test Instagram caption",
          },
        ],
      },
      facebook: {
        targets: [
          {
            targetId: "facebook-main",
            enabled: true,
            message: "Test Facebook message",
          },
        ],
      },
      youtube: { targets: [] },
    },
  };
}

const instagramTarget: SocialTarget = {
  id: "instagram-main",
  platform: "instagram",
  enabled: true,
  accountIdEnv: "TEST_INSTAGRAM_ID",
  accessTokenEnv: "TEST_INSTAGRAM_TOKEN",
  instagramApiMode: "facebook-login",
};

const instagramLoginTarget: SocialTarget = {
  id: "instagram-2",
  platform: "instagram",
  enabled: true,
  accountIdEnv: "TEST_INSTAGRAM_ID_2",
  accessTokenEnv: "TEST_INSTAGRAM_TOKEN_2",
  instagramApiMode: "instagram-login",
};

const facebookTarget: SocialTarget = {
  id: "facebook-main",
  platform: "facebook",
  enabled: true,
  accountIdEnv: "TEST_FACEBOOK_PAGE_ID",
  accessTokenEnv: "TEST_FACEBOOK_TOKEN",
};

const TEST_INSTAGRAM_TOKEN = "unit-test-instagram-token-should-never-leak";
const TEST_INSTAGRAM_TOKEN_2 = "unit-test-instagram-login-token-should-never-leak";
const TEST_FACEBOOK_TOKEN = "unit-test-facebook-token-should-never-leak";
const environment = {
  TEST_INSTAGRAM_ID: "ig-unit-account",
  TEST_INSTAGRAM_TOKEN,
  TEST_INSTAGRAM_ID_2: "ig-unit-account-2",
  TEST_INSTAGRAM_TOKEN_2,
  TEST_FACEBOOK_PAGE_ID: "fb-unit-page",
  TEST_FACEBOOK_TOKEN,
};
const noSleep = async () => {};

async function expectRejects(
  promise: Promise<unknown>,
  verify: (error: unknown) => void
) {
  try {
    await promise;
    assert.fail("expected promise to reject");
  } catch (error) {
    verify(error);
  }
}

async function testInstagramFlow() {
  const mock = createMockFetch([
    { body: { id: "ig-container-1" } },
    { body: { status_code: "IN_PROGRESS" } },
    { body: { status_code: "FINISHED" } },
    { body: { id: "ig-media-1" } },
  ]);
  const progress: VideoTargetPublicationState[] = [];
  const result = await publishInstagramReel({
    runId: "run-ig-success",
    asset: createAsset(),
    target: instagramTarget,
    environment,
    fetchFn: mock.fetchFn,
    sleep: noSleep,
    maxPollAttempts: 3,
    pollIntervalMs: 0,
    onProgress: (state) => {
      progress.push(structuredClone(state));
    },
  });

  // 1-3. Correct container construction, Cloudinary URL, and caption.
  assert.equal(mock.calls[0].url, `${META_GRAPH_BASE}/ig-unit-account/media`);
  assert.equal(mock.calls[0].init.method, "POST");
  const createBody = formBody(mock.calls[0]);
  assert.equal(createBody.get("media_type"), "REELS");
  assert.equal(createBody.get("video_url"), createAsset().sourceUrl);
  assert.equal(createBody.get("caption"), "Test Instagram caption");
  assert.equal(createBody.has("access_token"), false);

  // 4 and 7. Processing and publication succeed with provider IDs retained.
  assert.equal(result.containerId, "ig-container-1");
  assert.equal(result.mediaId, "ig-media-1");
  assert.equal(result.state.status, "published");
  assert.equal(result.state.providerContainerId, "ig-container-1");
  assert.equal(result.state.providerMediaId, "ig-media-1");
  assert.equal(progress.some((state) => state.status === "ready"), true);
  assert.equal(progress.at(-1)?.status, "published");

  // 10. media_publish occurs only after a FINISHED status response.
  assert.equal(mock.calls[3].url.endsWith("/media_publish"), true);
  assert.equal(formBody(mock.calls[3]).get("creation_id"), "ig-container-1");
  assert.equal(
    mock.calls.slice(0, 3).some((call) => call.url.endsWith("/media_publish")),
    false
  );

  // Target-specific API mode, credentials, and copy remain isolated.
  const instagramLoginAsset = createAsset();
  instagramLoginAsset.platforms.instagram.targets = [
    { targetId: "instagram-2", enabled: true, caption: "LifeModeHQ exact caption" },
  ];
  const instagramLogin = createMockFetch([
    { body: { id: "ig-login-container" } },
    { body: { status_code: "FINISHED" } },
    { body: { id: "ig-login-media" } },
  ]);
  await publishInstagramReel({
    runId: "run-instagram-login",
    asset: instagramLoginAsset,
    target: instagramLoginTarget,
    environment,
    fetchFn: instagramLogin.fetchFn,
    sleep: noSleep,
    maxPollAttempts: 1,
    pollIntervalMs: 0,
  });
  assert.equal(
    instagramLogin.calls[0].url,
    `${INSTAGRAM_LOGIN_GRAPH_BASE}/ig-unit-account-2/media`
  );
  assert.equal(
    new Headers(instagramLogin.calls[0].init.headers).get("Authorization"),
    `Bearer ${TEST_INSTAGRAM_TOKEN_2}`
  );
  assert.equal(formBody(instagramLogin.calls[0]).get("caption"), "LifeModeHQ exact caption");
  assert.notEqual(formBody(instagramLogin.calls[0]).get("caption"), "Test Instagram caption");

  // 5. Provider processing failure never calls media_publish.
  const failed = createMockFetch([
    { body: { id: "ig-container-failed" } },
    { body: { status_code: "ERROR" } },
  ]);
  await expectRejects(
    publishInstagramReel({
      runId: "run-ig-failed",
      asset: createAsset(),
      target: instagramTarget,
      environment,
      fetchFn: failed.fetchFn,
      sleep: noSleep,
      maxPollAttempts: 2,
    }),
    (error) => assert.equal(error instanceof SafeProviderRequestError, true)
  );
  assert.equal(failed.calls.some((call) => call.url.endsWith("/media_publish")), false);

  // 6. Processing timeout is bounded and also never publishes.
  const timedOut = createMockFetch([
    { body: { id: "ig-container-timeout" } },
    { body: { status_code: "IN_PROGRESS" } },
    { body: { status_code: "IN_PROGRESS" } },
  ]);
  await expectRejects(
    publishInstagramReel({
      runId: "run-ig-timeout",
      asset: createAsset(),
      target: instagramTarget,
      environment,
      fetchFn: timedOut.fetchFn,
      sleep: noSleep,
      maxPollAttempts: 2,
      pollIntervalMs: 0,
    }),
    (error) => assert.equal(error instanceof ProviderPollingTimeoutError, true)
  );
  assert.equal(timedOut.calls.length, 3);
  assert.equal(timedOut.calls.some((call) => call.url.endsWith("/media_publish")), false);

  // Meta-aligned production defaults poll immediately, then about once per minute.
  assert.equal(INSTAGRAM_REEL_DEFAULT_MAX_POLL_ATTEMPTS, 4);
  assert.equal(INSTAGRAM_REEL_DEFAULT_POLL_INTERVAL_MS, 60_000);
  const observedSleeps: number[] = [];
  const defaultPolling = createMockFetch([
    { body: { id: "ig-container-default-poll" } },
    { body: { status_code: "IN_PROGRESS" } },
    { body: { status_code: "FINISHED" } },
    { body: { id: "ig-media-default-poll" } },
  ]);
  await publishInstagramReel({
    runId: "run-ig-default-poll",
    asset: createAsset(),
    target: instagramTarget,
    environment,
    fetchFn: defaultPolling.fetchFn,
    sleep: async (delayMs) => {
      observedSleeps.push(delayMs);
    },
  });
  assert.equal(observedSleeps.includes(60_000), true);

  // 8-9. Provider errors are normalized and redact tokens.
  const rejected = createMockFetch([
    {
      status: 400,
      body: {
        error: {
          message: `bad token ${TEST_INSTAGRAM_TOKEN}`,
          code: 190,
          error_subcode: 463,
        },
      },
    },
  ]);
  await expectRejects(
    publishInstagramReel({
      runId: "run-ig-error",
      asset: createAsset(),
      target: instagramTarget,
      environment,
      fetchFn: rejected.fetchFn,
      sleep: noSleep,
    }),
    (error) => {
      assert.equal(error instanceof SafeProviderRequestError, true);
      const serialized = JSON.stringify(error);
      assert.equal(serialized.includes(TEST_INSTAGRAM_TOKEN), false);
      assert.equal(String(error).includes(TEST_INSTAGRAM_TOKEN), false);
      if (error instanceof SafeProviderRequestError) {
        assert.equal(error.details.code, 190);
        assert.equal(error.details.subcode, 463);
      }
    }
  );
}

async function testFacebookFlow() {
  const mock = createMockFetch([
    {
      body: {
        video_id: "fb-video-1",
        upload_url: "https://rupload.facebook.com/video-upload-session-1",
      },
    },
    { body: { success: true } },
    { body: { success: true, video_id: "fb-video-1" } },
    {
      body: {
        status: {
          processing_phase: { status: "in_progress" },
          publishing_phase: { status: "not_started" },
        },
      },
    },
    {
      body: {
        status: {
          processing_phase: { status: "complete" },
          publishing_phase: { status: "complete" },
        },
      },
    },
  ]);
  const progress: VideoTargetPublicationState[] = [];
  const result = await publishFacebookReel({
    runId: "run-fb-success",
    asset: createAsset(),
    target: facebookTarget,
    environment,
    fetchFn: mock.fetchFn,
    sleep: noSleep,
    maxPollAttempts: 3,
    pollIntervalMs: 0,
    onProgress: (state) => {
      progress.push(structuredClone(state));
    },
  });

  // 11. Initialization uses the dedicated Page video_reels workflow.
  assert.equal(mock.calls[0].url, `${META_GRAPH_BASE}/fb-unit-page/video_reels`);
  assert.equal(formBody(mock.calls[0]).get("upload_phase"), "start");
  assert.equal(formBody(mock.calls[0]).has("access_token"), false);

  // 12. Hosted upload passes the Cloudinary URL directly to the upload session.
  assert.equal(
    mock.calls[1].url,
    "https://rupload.facebook.com/video-upload-session-1"
  );
  assert.equal(
    new Headers(mock.calls[1].init.headers).get("file_url"),
    createAsset().sourceUrl
  );
  assert.equal(mock.calls[1].init.body, undefined);

  const finishBody = formBody(mock.calls[2]);
  assert.equal(finishBody.get("upload_phase"), "finish");
  assert.equal(finishBody.get("video_state"), "PUBLISHED");
  assert.equal(finishBody.get("description"), "Test Facebook message");
  assert.equal(finishBody.has("message"), false);

  // 13. Processing/publishing polling reaches a persisted published state.
  assert.equal(result.videoId, "fb-video-1");
  assert.equal(result.state.status, "published");
  assert.equal(result.state.providerUploadId, "fb-video-1");
  assert.equal(result.state.providerMediaId, "fb-video-1");
  assert.equal(progress.some((state) => state.status === "processing"), true);
  assert.equal(progress.at(-1)?.status, "published");

  // Streaming uploads preserve the supplied body and use size/offset headers.
  const streamBody = new ReadableStream<Uint8Array>();
  const streamed = createMockFetch([
    {
      body: {
        video_id: "fb-video-stream",
        upload_url: "https://rupload.facebook.com/video-upload-stream",
      },
    },
    (call) => {
      assert.equal(call.init.body, streamBody);
      const headers = new Headers(call.init.headers);
      assert.equal(headers.get("file_size"), "12345");
      assert.equal(headers.get("offset"), "0");
      return { body: { success: true } };
    },
    { body: { success: true } },
    { body: { status: { publishing_phase: { status: "complete" } } } },
  ]);
  await publishFacebookReel({
    runId: "run-fb-stream",
    asset: createAsset(),
    target: facebookTarget,
    environment,
    fetchFn: streamed.fetchFn,
    sleep: noSleep,
    uploadSource: { kind: "stream", body: streamBody, fileSize: 12_345 },
    pollIntervalMs: 0,
  });

  // 14. Processing failure is normalized.
  const failed = createMockFetch([
    {
      body: {
        video_id: "fb-video-failed",
        upload_url: "https://rupload.facebook.com/video-upload-failed",
      },
    },
    { body: { success: true } },
    { body: { success: true } },
    { body: { status: { processing_phase: { status: "error" } } } },
  ]);
  await expectRejects(
    publishFacebookReel({
      runId: "run-fb-failed",
      asset: createAsset(),
      target: facebookTarget,
      environment,
      fetchFn: failed.fetchFn,
      sleep: noSleep,
      pollIntervalMs: 0,
    }),
    (error) => assert.equal(error instanceof SafeProviderRequestError, true)
  );

  // 15. Publishing timeout is bounded.
  const timedOut = createMockFetch([
    {
      body: {
        video_id: "fb-video-timeout",
        upload_url: "https://rupload.facebook.com/video-upload-timeout",
      },
    },
    { body: { success: true } },
    { body: { success: true } },
    { body: { status: { publishing_phase: { status: "in_progress" } } } },
    { body: { status: { publishing_phase: { status: "in_progress" } } } },
  ]);
  await expectRejects(
    publishFacebookReel({
      runId: "run-fb-timeout",
      asset: createAsset(),
      target: facebookTarget,
      environment,
      fetchFn: timedOut.fetchFn,
      sleep: noSleep,
      maxPollAttempts: 2,
      pollIntervalMs: 0,
    }),
    (error) => assert.equal(error instanceof ProviderPollingTimeoutError, true)
  );
  assert.equal(timedOut.calls.length, 5);

  // 16-17. Facebook errors are normalized and token-safe.
  const rejected = createMockFetch([
    {
      status: 401,
      body: { error: { message: `expired ${TEST_FACEBOOK_TOKEN}`, code: 190 } },
    },
  ]);
  await expectRejects(
    publishFacebookReel({
      runId: "run-fb-error",
      asset: createAsset(),
      target: facebookTarget,
      environment,
      fetchFn: rejected.fetchFn,
      sleep: noSleep,
    }),
    (error) => {
      assert.equal(error instanceof SafeProviderRequestError, true);
      assert.equal(JSON.stringify(error).includes(TEST_FACEBOOK_TOKEN), false);
      assert.equal(String(error).includes(TEST_FACEBOOK_TOKEN), false);
    }
  );

  // 18. A resumable provider video skips duplicate initialization and upload.
  let resumeState = createPendingTargetPublicationState({
    runId: "run-fb-resume",
    videoId: "0817-test",
    platform: "facebook",
    targetId: "facebook-main",
    now: "2026-01-01T00:00:00.000Z",
  });
  resumeState = advanceTargetPublicationState(resumeState, {
    status: "container_created",
    providerResourceId: "fb-video-existing",
    providerUploadId: "fb-video-existing",
    providerUploadUrl: "https://rupload.facebook.com/video-upload-existing",
    attempts: 1,
  });
  const resumed = createMockFetch([
    { body: { success: true } },
    { body: { success: true } },
    { body: { status: { publishing_phase: { status: "complete" } } } },
  ]);
  const resumedResult = await publishFacebookReel({
    runId: "run-fb-resume",
    asset: createAsset(),
    target: facebookTarget,
    environment,
    fetchFn: resumed.fetchFn,
    sleep: noSleep,
    resumeState,
    pollIntervalMs: 0,
  });
  assert.equal(resumedResult.resumed, true);
  assert.equal(resumed.calls.length, 3);
  assert.equal(
    resumed.calls[0].url,
    "https://rupload.facebook.com/video-upload-existing"
  );
  assert.equal(
    resumed.calls.some(
      (call) =>
        typeof call.init.body === "string" &&
        new URLSearchParams(call.init.body).get("upload_phase") === "start"
    ),
    false
  );
}

function testPreflight() {
  const asset = createAsset();

  // 19-22. Missing IDs and tokens are rejected independently.
  const missingInstagramId = preflightMetaVideoTarget({
    asset,
    target: instagramTarget,
    environment: { TEST_INSTAGRAM_TOKEN },
  });
  assert.equal(missingInstagramId.accountIdPresent, false);
  assert.equal(missingInstagramId.valid, false);

  const missingInstagramToken = preflightMetaVideoTarget({
    asset,
    target: instagramTarget,
    environment: { TEST_INSTAGRAM_ID: "id" },
  });
  assert.equal(missingInstagramToken.accessTokenPresent, false);
  assert.equal(missingInstagramToken.valid, false);

  const missingFacebookId = preflightMetaVideoTarget({
    asset,
    target: facebookTarget,
    environment: { TEST_FACEBOOK_TOKEN },
  });
  assert.equal(missingFacebookId.accountIdPresent, false);
  assert.equal(missingFacebookId.valid, false);

  const missingFacebookToken = preflightMetaVideoTarget({
    asset,
    target: facebookTarget,
    environment: { TEST_FACEBOOK_PAGE_ID: "page" },
  });
  assert.equal(missingFacebookToken.accessTokenPresent, false);
  assert.equal(missingFacebookToken.valid, false);

  // 23. Fully configured static preflight passes.
  const instagramPass = preflightMetaVideoTarget({
    asset,
    target: instagramTarget,
    environment,
  });
  const facebookPass = preflightMetaVideoTarget({
    asset,
    target: facebookTarget,
    environment,
  });
  assert.equal(instagramPass.valid, true);
  assert.equal(facebookPass.valid, true);

  // 24. Results contain booleans and safe errors, not runtime values.
  const serialized = JSON.stringify([instagramPass, facebookPass]);
  assert.equal(serialized.includes(TEST_INSTAGRAM_TOKEN), false);
  assert.equal(serialized.includes(TEST_FACEBOOK_TOKEN), false);
  assert.equal(serialized.includes("ig-unit-account"), false);
  assert.equal(serialized.includes("fb-unit-page"), false);

  // 25. A disabled platform cannot pass preflight even with credentials.
  const disabledAsset = createAsset();
  disabledAsset.platforms.instagram.targets[0].enabled = false;
  assert.equal(
    preflightMetaVideoTarget({
      asset: disabledAsset,
      target: instagramTarget,
      environment,
    }).valid,
    false
  );
}

async function testRouteSafety() {
  const originalFetch = globalThis.fetch;
  let providerCalls = 0;
  globalThis.fetch = async () => {
    providerCalls += 1;
    throw new Error("route must never call a provider in Phase 2A tests");
  };

  try {
    const request = new Request("https://unit.invalid/api/video-social-run", {
      headers: { Authorization: "Bearer route-test-secret" },
    });

    // 26. Dry-run reads fake history and performs zero provider calls.
    const dryResponse = await handleVideoSocialRun(request, {
      environment: {
        CRON_SECRET: "route-test-secret",
        VIDEO_SOCIAL_MODE: "dry-run",
      },
      readHistory: async () => ({}),
      now: () => 1_000_000,
    });
    const dryBody = await dryResponse.json();
    assert.equal(dryResponse.status, 200);
    assert.equal(dryBody.providerCallsMade, false);
    assert.equal(dryBody.publicationStateMutated, false);
    assert.equal(providerCalls, 0);

    // 27-28. Normal live mode delegates only to the injected scheduled runner.
    let scheduledRuns = 0;
    const liveResponse = await handleVideoSocialRun(request, {
      environment: {
        CRON_SECRET: "route-test-secret",
        VIDEO_SOCIAL_MODE: "live",
      },
      runLiveScheduled: async () => {
        scheduledRuns += 1;
        return {
          status: 200,
          body: {
            ok: true,
            mode: "live",
            providerCallsMade: false,
            publicationStateMutated: false,
          },
        };
      },
    });
    const liveBody = await liveResponse.json();
    assert.equal(liveResponse.status, 200);
    assert.equal(liveBody.providerCallsMade, false);
    assert.equal(scheduledRuns, 1);
    assert.equal(providerCalls, 0);

    // 29. Disabled mode performs no provider or history work.
    const disabledResponse = await handleVideoSocialRun(request, {
      environment: {
        CRON_SECRET: "route-test-secret",
        VIDEO_SOCIAL_MODE: "disabled",
      },
      readHistory: async () => {
        throw new Error("disabled mode must not read history");
      },
    });
    const disabledBody = await disabledResponse.json();
    assert.equal(disabledBody.mode, "disabled");
    assert.equal(disabledBody.providerCallsMade, false);
    assert.equal(providerCalls, 0);

    // 30. Existing deterministic rotation semantics remain unchanged.
    const a = createAsset();
    a.id = "a";
    const b = createAsset();
    b.id = "b";
    const selection = selectLeastRecentlyUsedVideo(
      [a, b],
      { a: 200, b: 100 },
      { nowMs: 1_000, cooldownMs: 0 }
    );
    assert.equal(selection.status === "selected" && selection.asset.id, "b");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function testProviderState() {
  const pending = createPendingTargetPublicationState({
    runId: "state-run",
    videoId: "0817",
    platform: "instagram",
    targetId: "instagram-main",
    now: "2026-01-01T00:00:00.000Z",
  });

  // 31. Provider progress is serializable with IDs, attempts, and timestamps.
  const processing = advanceTargetPublicationState(pending, {
    status: "processing",
    attempts: 2,
    providerResourceId: "container-1",
    providerContainerId: "container-1",
    updatedAt: "2026-01-01T00:01:00.000Z",
  });
  const roundTripped = JSON.parse(
    JSON.stringify(processing)
  ) as VideoTargetPublicationState;
  assert.equal(roundTripped.providerContainerId, "container-1");
  assert.equal(roundTripped.attempts, 2);

  // 32. Existing IDs resume; ambiguous publishing never initializes blindly.
  assert.equal(getProviderReconciliationDecision(processing), "resume_existing");
  const publishing = advanceTargetPublicationState(processing, {
    status: "publishing",
  });
  assert.equal(
    getProviderReconciliationDecision(publishing),
    "reconcile_ambiguous_publish"
  );

  // 33. Failed state retains only normalized, token-free error data.
  const safeError: SafeProviderError = {
    provider: "instagram",
    operation: "check_reel_container",
    message: "provider rejected request [REDACTED]",
    code: 190,
    retryable: false,
  };
  const failed = advanceTargetPublicationState(processing, {
    status: "failed",
    error: safeError,
  });
  const serialized = JSON.stringify(failed);
  assert.equal(serialized.includes(TEST_INSTAGRAM_TOKEN), false);
  assert.equal(failed.error?.code, 190);
}

async function testReadOnlyMetaDiagnostics() {
  const instagramMock = createMockFetch([
    { body: { id: "ig-unit-account", username: "unit", account_type: "BUSINESS" } },
    {
      body: {
        data: [
          { permission: "instagram_basic", status: "granted" },
          { permission: "instagram_content_publish", status: "granted" },
          { permission: "pages_read_engagement", status: "granted" },
        ],
      },
    },
  ]);
  const instagram = await diagnoseMetaVideoTarget({
    target: instagramTarget,
    environment,
    fetchFn: instagramMock.fetchFn,
    sleep: noSleep,
  });
  assert.equal(instagram.valid, true);
  assert.deepEqual(instagram.requestMethods, ["GET", "GET"]);
  assert.equal(
    instagramMock.calls.every((call) => call.init.method === "GET"),
    true
  );
  assert.equal(instagramMock.calls[0].url.includes("/ig-unit-account?"), true);
  assert.equal(instagramMock.calls[1].url.includes("/me/permissions?"), true);

  const facebookMock = createMockFetch([
    {
      body: {
        id: "fb-unit-page",
        name: "Unit Page",
        instagram_business_account: { id: "ig-unit-account" },
      },
    },
    {
      body: {
        data: [
          { permission: "pages_manage_posts", status: "granted" },
          { permission: "pages_read_engagement", status: "granted" },
        ],
      },
    },
  ]);
  const facebook = await diagnoseMetaVideoTarget({
    target: facebookTarget,
    environment,
    expectedInstagramAccountIdEnv: "TEST_INSTAGRAM_ID",
    fetchFn: facebookMock.fetchFn,
    sleep: noSleep,
  });
  assert.equal(facebook.valid, true);
  assert.equal(facebook.pageInstagramRelationship, "matches");
  assert.equal(facebookMock.calls.every((call) => call.init.method === "GET"), true);

  const serialized = JSON.stringify([instagram, facebook]);
  assert.equal(serialized.includes(TEST_INSTAGRAM_TOKEN), false);
  assert.equal(serialized.includes(TEST_FACEBOOK_TOKEN), false);
  assert.equal(serialized.includes("ig-unit-account"), false);
  assert.equal(serialized.includes("fb-unit-page"), false);
}

function testClosedCanaryGate() {
  const asset = createAsset();
  asset.id = "0817";
  const staticPreflight = preflightMetaVideoTarget({
    asset,
    target: instagramTarget,
    environment,
  });
  const gate = evaluateVideoSocialCanaryGate({
    mode: "live",
    requestIntent: "canary",
    authorizationValue: expectedCanaryAuthorization({
      platform: "instagram",
      targetId: instagramTarget.id,
    }),
    requestedAssetId: "0817",
    requestedPlatform: "instagram",
    requestedTargetId: instagramTarget.id,
    asset,
    target: instagramTarget,
    resolvedTargets: [instagramTarget],
    staticPreflight,
    redisLockAcquired: true,
    expectedRunId: "phase2a-closed-gate",
    expectedSlot: "phase2a-closed-slot",
    redisReconciliationChecked: true,
    existingPublicationState: null,
  });

  assert.equal(VIDEO_SOCIAL_CANARY_SOURCE_ENABLED, false);
  assert.equal(gate.allowed, false);
  assert.equal(gate.checks.sourceEnabled, false);
  assert.equal(
    Object.entries(gate.checks)
      .filter(([key]) => key !== "sourceEnabled")
      .every(([, passed]) => passed),
    true
  );
}

async function main() {
  await testInstagramFlow();
  await testFacebookFlow();
  testPreflight();
  await testRouteSafety();
  testProviderState();
  await testReadOnlyMetaDiagnostics();
  testClosedCanaryGate();
  console.log(
    "Video social Phase 2A/spec-alignment tests: PASS (42 cases; provider requests fully mocked)"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
