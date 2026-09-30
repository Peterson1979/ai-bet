import assert from "node:assert/strict";

import { handleVideoSocialRun } from "../app/api/video-social-run/route";
import {
  evaluateVideoSocialCanaryGate,
  expectedCanaryAuthorization,
  VIDEO_SOCIAL_CANARY_SOURCE_ENABLED,
} from "../app/lib/social/video/canary-gate";
import {
  buildDryRunPublicationPlan,
  parseVideoSocialMode,
} from "../app/lib/social/video/config";
import {
  assertThreadsVideoPreflight,
  preflightSocialVideoTarget,
  preflightThreadsVideoTarget,
  readThreadsTargetCredentials,
  ThreadsVideoPreflightError,
} from "../app/lib/social/video/preflight";
import {
  publishThreadsVideo,
  type ThreadsVideoPublisherOptions,
} from "../app/lib/social/video/publish-threads-video";
import {
  runLiveVideoSocialCanary,
  getVideoSocialCanaryRunId,
  getVideoSocialCanarySlot,
} from "../app/lib/social/video/run-live";
import {
  runScheduledVideoSocial,
  type ScheduledVideoSocialDependencies,
  type ScheduledVideoSocialFailureLog,
} from "../app/lib/social/video/run-scheduled";
import {
  advanceTargetPublicationState,
  createPendingTargetPublicationState,
  hasConfirmedProviderPublication,
  VIDEO_SOCIAL_KEYS,
} from "../app/lib/social/video/state";
import {
  getVideoTargetContent,
  resolveTargetsForPlatform,
  resolveVideoTargets,
  VIDEO_SOCIAL_TARGETS,
} from "../app/lib/social/video/targets";
import {
  formatThreadsVideoCaption,
  THREADS_CAPTION_MAX_LENGTH,
  validateThreadsCaption,
} from "../app/lib/social/video/threads-caption";
import type {
  SocialTarget,
  VideoAsset,
  VideoRunRecord,
  VideoTargetPublicationState,
} from "../app/lib/social/video/types";
import {
  assertValidVideoSocialConfiguration,
  validateVideoSocialConfiguration,
} from "../app/lib/social/video/validate";

type RecordedCall = { url: string; init: RequestInit };
type MockReply =
  | { body: unknown; status?: number }
  | { error: Error }
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
    if (!next) throw new Error(`unexpected mocked provider request: ${call.url}`);
    if (typeof next !== "function" && "error" in next) throw next.error;
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

function createMockAsset(overrides: Partial<VideoAsset> = {}): VideoAsset {
  return {
    id: "0817",
    sourceUrl:
      "https://res.cloudinary.com/u4u07qyb/video/upload/v1787392866/0817.mp4",
    enabled: true,
    platforms: {
      instagram: {
        targets: [
          {
            targetId: "instagram-main",
            enabled: true,
            caption: "Instagram caption for 0817",
          },
        ],
      },
      facebook: {
        targets: [
          {
            targetId: "facebook-main",
            enabled: true,
            message: "Facebook message for 0817",
          },
        ],
      },
      youtube: {
        targets: [
          {
            targetId: "youtube-main",
            enabled: true,
            title: "How Bookmakers Set Odds",
            description: "Detailed description of sports odds comparison.",
            tags: ["MatchSignal", "SportsBetting", "Odds"],
          },
        ],
      },
      threads: {
        targets: [
          {
            targetId: "threads-main",
            enabled: true,
            caption:
              "AI odds comparison: compare prices side by side.\n\nhttps://www.matchsignal.pro\n\n18+ | Gamble responsibly | Analysis, not guarantees.",
          },
        ],
      },
    },
    ...overrides,
  };
}

const mockThreadsTarget: SocialTarget = {
  id: "threads-main",
  platform: "threads",
  enabled: true,
  accountIdEnv: "THREADS_USER_ID",
  accessTokenEnv: "THREADS_ACCESS_TOKEN",
};

const mockEnvironment = {
  VIDEO_SOCIAL_MODE: "live",
  THREADS_USER_ID: "9988776655",
  THREADS_ACCESS_TOKEN: "TH_SECRET_ACCESS_TOKEN_XYZ",
  INSTAGRAM_BUSINESS_ID: "12345",
  INSTAGRAM_ACCESS_TOKEN: "ig_token_123",
  FACEBOOK_PAGE_ID: "67890",
  FACEBOOK_ACCESS_TOKEN: "fb_token_456",
  YOUTUBE_CHANNEL_ID: "UC9KtEuEsKg4WYdWYZeyokXQ",
  YOUTUBE_CLIENT_ID: "mock_client_id.apps.googleusercontent.com",
  YOUTUBE_CLIENT_SECRET: "mock_client_secret_xyz",
  YOUTUBE_REFRESH_TOKEN: "mock_refresh_token_abc",
};

async function testTargetResolution() {
  console.log("-> Testing Threads target resolution...");
  const asset = createMockAsset();
  const resolved = resolveVideoTargets(asset, VIDEO_SOCIAL_TARGETS);

  assert.equal(resolved.threads.length, 1);
  assert.equal(resolved.threads[0].id, "threads-main");
  assert.equal(resolved.threads[0].platform, "threads");

  const threadsContent = getVideoTargetContent(asset, "threads", "threads-main");
  assert.ok(threadsContent);
  assert.equal(threadsContent.targetId, "threads-main");
  assert.ok(threadsContent.caption.includes("https://www.matchsignal.pro"));

  // When disabled in target registry:
  const disabledTargetRegistry: SocialTarget[] = VIDEO_SOCIAL_TARGETS.map(
    (target) =>
      target.id === "threads-main" ? { ...target, enabled: false } : target
  );
  const resolvedDisabled = resolveTargetsForPlatform(
    asset,
    "threads",
    disabledTargetRegistry
  );
  assert.equal(resolvedDisabled.length, 0);

  // When disabled in asset:
  const assetWithDisabledThreads = createMockAsset({
    platforms: {
      ...asset.platforms,
      threads: {
        targets: [{ targetId: "threads-main", enabled: false, caption: "test" }],
      },
    },
  });
  const resolvedDisabledAsset = resolveTargetsForPlatform(
    assetWithDisabledThreads,
    "threads",
    VIDEO_SOCIAL_TARGETS
  );
  assert.equal(resolvedDisabledAsset.length, 0);
  console.log("   ✓ Target resolution passed");
}

async function testThreadsPreflight() {
  console.log("-> Testing Threads preflight (missing & valid credentials)...");
  const asset = createMockAsset();

  // Missing THREADS_USER_ID
  const missingUserIdEnv = {
    ...mockEnvironment,
    THREADS_USER_ID: "",
  };
  const preflightNoUser = preflightThreadsVideoTarget({
    asset,
    target: mockThreadsTarget,
    environment: missingUserIdEnv,
  });
  assert.equal(preflightNoUser.valid, false);
  assert.equal(preflightNoUser.accountIdPresent, false);
  assert.ok(preflightNoUser.errors.includes("THREADS_USER_ID is not configured"));

  // Missing THREADS_ACCESS_TOKEN
  const missingTokenEnv = {
    ...mockEnvironment,
    THREADS_ACCESS_TOKEN: "",
  };
  const preflightNoToken = preflightThreadsVideoTarget({
    asset,
    target: mockThreadsTarget,
    environment: missingTokenEnv,
  });
  assert.equal(preflightNoToken.valid, false);
  assert.equal(preflightNoToken.accessTokenPresent, false);
  assert.ok(
    preflightNoToken.errors.includes("THREADS_ACCESS_TOKEN is not configured")
  );

  // Assert throws on failure
  assert.throws(
    () => assertThreadsVideoPreflight(preflightNoToken),
    ThreadsVideoPreflightError
  );

  // Valid credentials
  const validPreflight = preflightThreadsVideoTarget({
    asset,
    target: mockThreadsTarget,
    environment: mockEnvironment,
  });
  assert.equal(validPreflight.valid, true);
  assert.equal(validPreflight.errors.length, 0);
  assert.equal(validPreflight.platform, "threads");
  assert.doesNotThrow(() => assertThreadsVideoPreflight(validPreflight));

  // Credential reading
  const credentials = readThreadsTargetCredentials(
    mockThreadsTarget,
    mockEnvironment
  );
  assert.equal(credentials.accountId, "9988776655");
  assert.equal(credentials.accessToken, "TH_SECRET_ACCESS_TOKEN_XYZ");

  console.log("   ✓ Preflight checks passed");
}

async function testThreadsCaptionConstraints() {
  console.log("-> Testing Threads caption validation and transformation...");

  // Valid caption
  const validCaption =
    "AI odds analysis by MatchSignal helps spot market value.\n\nhttps://www.matchsignal.pro\n\n18+ | Gamble responsibly | Analysis, not guarantees.";
  const validation = validateThreadsCaption(validCaption);
  assert.equal(validation.valid, true);
  assert.ok(validation.length <= THREADS_CAPTION_MAX_LENGTH);

  // Caption over 500 characters
  const longCaption = "A".repeat(501);
  const overLengthValidation = validateThreadsCaption(longCaption);
  assert.equal(overLengthValidation.valid, false);
  assert.ok(
    overLengthValidation.errors.some((err) =>
      err.includes(`exceeds maximum length of ${THREADS_CAPTION_MAX_LENGTH}`)
    )
  );

  // Prohibited claim check
  const prohibitedCaption =
    "MatchSignal gives you a guaranteed win on every bet! https://www.matchsignal.pro 18+ gamble responsibly";
  const prohibitedValidation = validateThreadsCaption(prohibitedCaption);
  assert.equal(prohibitedValidation.valid, false);
  assert.ok(
    prohibitedValidation.errors.some((err) =>
      err.includes("prohibited claim")
    )
  );

  // Caption transformation from long text with hashtags
  const rawInstagramPost = `⚡️ Speed meets insight! Watch as our AI scans a flood of odds and surfaces the strongest price right to your phone. With MatchSignal you get instant, side-by-side comparisons so you never miss a value edge. Ready to upgrade your betting game? Link in bio. 18+ | Gamble responsibly. MatchSignal provides analysis, not guarantees. Odds can change. #SportsBetting #BettingTips #OddsComparison #AIAnalytics #BetSmart #ValueBetting #SmartBetting #FootballOdds #NBAOdds`;
  const transformed = formatThreadsVideoCaption({ caption: rawInstagramPost });

  assert.ok(
    transformed.length <= THREADS_CAPTION_MAX_LENGTH,
    `Transformed length ${transformed.length} must be <= 500`
  );
  assert.ok(transformed.includes("https://www.matchsignal.pro"));
  assert.ok(transformed.includes("18+ | Gamble responsibly"));
  assert.ok(!transformed.includes("#SportsBetting"));
  assert.ok(!transformed.includes("Link in bio"));

  // Extremely long input truncation test (1000 characters)
  const hugeInput =
    "MatchSignal odds analysis. " +
    "Every sportsbook sets different odds based on proprietary algorithms and market movements. ".repeat(
      15
    );
  const truncatedTransformed = formatThreadsVideoCaption({ caption: hugeInput });
  assert.ok(
    truncatedTransformed.length <= THREADS_CAPTION_MAX_LENGTH,
    `Truncated length ${truncatedTransformed.length} must be <= 500`
  );
  assert.ok(truncatedTransformed.includes("…\n\nCompare odds: https://www.matchsignal.pro"));
  assert.ok(truncatedTransformed.includes("18+ | Gamble responsibly"));

  console.log("   ✓ Caption constraints passed");
}

async function testThreadsPublishingHappyPath() {
  console.log("-> Testing Threads publishing happy path (create -> poll -> publish)...");
  const asset = createMockAsset();
  const mock = createMockFetch([
    // Step A: Create container
    { body: { id: "threads_container_12345" } },
    // Step B: Poll container status -> FINISHED
    { body: { id: "threads_container_12345", status: "FINISHED" } },
    // Step C: Publish container
    { body: { id: "threads_post_67890" } },
  ]);

  const progressStates: VideoTargetPublicationState[] = [];
  const result = await publishThreadsVideo({
    runId: "run_threads_001",
    asset,
    target: mockThreadsTarget,
    environment: mockEnvironment,
    fetchFn: mock.fetchFn,
    sleep: async () => {},
    onProgress: (state) => {
      progressStates.push(state);
    },
  });

  assert.equal(result.videoId, "0817");
  assert.equal(result.resumed, false);
  assert.equal(result.state.status, "published");
  assert.equal(result.state.postId, "threads_post_67890");
  assert.equal(result.state.providerMediaId, "threads_post_67890");
  assert.equal(result.state.providerContainerId, "threads_container_12345");
  assert.ok(result.state.publishedAt);
  assert.ok(hasConfirmedProviderPublication(result.state));

  // Verify API calls
  assert.equal(mock.calls.length, 3);

  // Call 1: POST /threads
  assert.equal(
    mock.calls[0].url,
    "https://graph.threads.net/v1.0/9988776655/threads"
  );
  assert.equal(mock.calls[0].init.method, "POST");
  const createBody = formBody(mock.calls[0]);
  assert.equal(createBody.get("media_type"), "VIDEO");
  assert.equal(createBody.get("video_url"), asset.sourceUrl);
  assert.equal(createBody.get("access_token"), "TH_SECRET_ACCESS_TOKEN_XYZ");

  // Call 2: GET /threads_container_12345
  assert.ok(
    mock.calls[1].url.startsWith(
      "https://graph.threads.net/v1.0/threads_container_12345?fields=status,error_message"
    )
  );
  assert.equal(mock.calls[1].init.method, "GET");

  // Call 3: POST /threads_publish
  assert.equal(
    mock.calls[2].url,
    "https://graph.threads.net/v1.0/9988776655/threads_publish"
  );
  assert.equal(mock.calls[2].init.method, "POST");
  const publishBody = formBody(mock.calls[2]);
  assert.equal(publishBody.get("creation_id"), "threads_container_12345");
  assert.equal(publishBody.get("access_token"), "TH_SECRET_ACCESS_TOKEN_XYZ");

  // Verify progress states progression
  const statuses = progressStates.map((s) => s.status);
  assert.deepEqual(statuses, [
    "container_created",
    "processing",
    "ready",
    "publishing",
    "published",
  ]);

  console.log("   ✓ Happy path publishing passed");
}

async function testThreadsPublishingPollingAndErrorHandling() {
  console.log("-> Testing Threads polling progression, timeout, and error handling...");
  const asset = createMockAsset();

  // Test: Polling IN_PROGRESS -> IN_PROGRESS -> FINISHED
  {
    const mock = createMockFetch([
      { body: { id: "c1" } },
      { body: { id: "c1", status: "IN_PROGRESS" } },
      { body: { id: "c1", status: "IN_PROGRESS" } },
      { body: { id: "c1", status: "FINISHED" } },
      { body: { id: "p1" } },
    ]);
    const result = await publishThreadsVideo({
      runId: "run_poll",
      asset,
      target: mockThreadsTarget,
      environment: mockEnvironment,
      fetchFn: mock.fetchFn,
      sleep: async () => {},
      maxPollAttempts: 4,
      pollIntervalMs: 10,
    });
    assert.equal(result.state.status, "published");
    assert.equal(result.state.postId, "p1");
  }

  // Test: Polling ERROR
  {
    const mock = createMockFetch([
      { body: { id: "c2" } },
      { body: { id: "c2", status: "ERROR", error_message: "Video codec unsupported" } },
    ]);
    await assert.rejects(
      async () => {
        await publishThreadsVideo({
          runId: "run_err",
          asset,
          target: mockThreadsTarget,
          environment: mockEnvironment,
          fetchFn: mock.fetchFn,
          sleep: async () => {},
        });
      },
      (err: any) => {
        assert.ok(err.message.includes("Video codec unsupported"));
        return true;
      }
    );
  }

  // Test: Polling Timeout
  {
    const mock = createMockFetch([
      { body: { id: "c3" } },
      { body: { id: "c3", status: "IN_PROGRESS" } },
      { body: { id: "c3", status: "IN_PROGRESS" } },
      { body: { id: "c3", status: "IN_PROGRESS" } },
    ]);
    await assert.rejects(
      async () => {
        await publishThreadsVideo({
          runId: "run_timeout",
          asset,
          target: mockThreadsTarget,
          environment: mockEnvironment,
          fetchFn: mock.fetchFn,
          sleep: async () => {},
          maxPollAttempts: 3,
          pollIntervalMs: 10,
        });
      },
      (err: any) => {
        assert.ok(err.message.includes("timed out after 3 status checks"));
        return true;
      }
    );
  }

  // Test: Token Redaction
  {
    const mock = createMockFetch([
      {
        body: {
          error: {
            message:
              "Invalid parameter access_token=TH_SECRET_ACCESS_TOKEN_XYZ provided",
          },
        },
        status: 400,
      },
    ]);
    await assert.rejects(
      async () => {
        await publishThreadsVideo({
          runId: "run_redact",
          asset,
          target: mockThreadsTarget,
          environment: mockEnvironment,
          fetchFn: mock.fetchFn,
          sleep: async () => {},
        });
      },
      (err: any) => {
        assert.ok(!err.message.includes("TH_SECRET_ACCESS_TOKEN_XYZ"));
        assert.ok(err.message.includes("[REDACTED]"));
        return true;
      }
    );
  }

  console.log("   ✓ Polling and error handling passed");
}

async function testThreadsResumeState() {
  console.log("-> Testing Threads resume and idempotency state...");
  const asset = createMockAsset();

  // Resume already published
  {
    const existingState = createPendingTargetPublicationState({
      runId: "run_resume_1",
      videoId: "0817",
      platform: "threads",
      targetId: "threads-main",
    });
    const publishedState = advanceTargetPublicationState(existingState, {
      status: "published",
      postId: "existing_post_111",
      providerMediaId: "existing_post_111",
      publishedAt: new Date().toISOString(),
    });

    const mock = createMockFetch([]);
    const result = await publishThreadsVideo({
      runId: "run_resume_1",
      asset,
      target: mockThreadsTarget,
      resumeState: publishedState,
      environment: mockEnvironment,
      fetchFn: mock.fetchFn,
    });
    assert.equal(result.resumed, true);
    assert.equal(result.state.status, "published");
    assert.equal(result.state.postId, "existing_post_111");
    assert.equal(mock.calls.length, 0); // No API calls made
  }

  // Resume from processing
  {
    const pending = createPendingTargetPublicationState({
      runId: "run_resume_2",
      videoId: "0817",
      platform: "threads",
      targetId: "threads-main",
    });
    const processingState = advanceTargetPublicationState(pending, {
      status: "processing",
      providerContainerId: "resumed_container_222",
      attempts: 1,
    });

    const mock = createMockFetch([
      // Container creation is skipped!
      { body: { id: "resumed_container_222", status: "FINISHED" } },
      { body: { id: "resumed_post_222" } },
    ]);

    const result = await publishThreadsVideo({
      runId: "run_resume_2",
      asset,
      target: mockThreadsTarget,
      resumeState: processingState,
      environment: mockEnvironment,
      fetchFn: mock.fetchFn,
      sleep: async () => {},
    });

    assert.equal(result.resumed, true);
    assert.equal(result.state.status, "published");
    assert.equal(result.state.postId, "resumed_post_222");
    assert.equal(mock.calls.length, 2); // only poll + publish
  }

  console.log("   ✓ Resume state handling passed");
}

async function testScheduledMultiTargetExecutionWithThreads() {
  console.log("-> Testing scheduled orchestrator with Threads target...");
  const asset = createMockAsset();
  const targetHistory = new Set<string>();
  const publishedTargets: string[] = [];
  const publicationStates = new Map<string, VideoTargetPublicationState>();
  let savedRun: VideoRunRecord | null = null;

  const mockPublishInstagram = async (opts: any) => {
    publishedTargets.push("instagram");
    return {
      videoId: opts.asset.id,
      resumed: false,
      state: advanceTargetPublicationState(opts.resumeState, {
        status: "published",
        postId: "ig_post_1",
        providerMediaId: "ig_post_1",
        publishedAt: new Date().toISOString(),
      }),
    };
  };

  const mockPublishFacebook = async (opts: any) => {
    publishedTargets.push("facebook");
    return {
      videoId: opts.asset.id,
      resumed: false,
      state: advanceTargetPublicationState(opts.resumeState, {
        status: "published",
        postId: "fb_post_1",
        providerMediaId: "fb_post_1",
        publishedAt: new Date().toISOString(),
      }),
    };
  };

  const mockPublishYouTube = async (opts: any) => {
    publishedTargets.push("youtube");
    return {
      videoId: opts.asset.id,
      resumed: false,
      state: advanceTargetPublicationState(opts.resumeState, {
        status: "published",
        postId: "yt_video_1",
        providerMediaId: "yt_video_1",
        publishedAt: new Date().toISOString(),
      }),
    };
  };

  const mockPublishThreads = async (opts: any) => {
    publishedTargets.push("threads");
    return {
      videoId: opts.asset.id,
      resumed: false,
      state: advanceTargetPublicationState(opts.resumeState, {
        status: "published",
        postId: "th_post_1",
        providerMediaId: "th_post_1",
        publishedAt: new Date().toISOString(),
      }),
    };
  };

  const scheduledResult = await runScheduledVideoSocial({
    manifest: [asset],
    targets: VIDEO_SOCIAL_TARGETS,
    environment: mockEnvironment,
    readHistory: async () => ({}),
    acquireLock: async () => true,
    getRun: async () => null,
    saveRun: async (run) => {
      savedRun = run;
    },
    getPublicationState: async (runId, platform, targetId) =>
      publicationStates.get(`${platform}:${targetId}`) ?? null,
    savePublicationState: async (state) => {
      publicationStates.set(`${state.platform}:${state.targetId}`, state);
    },
    recordTargetSuccess: async (platform, targetId) => {
      targetHistory.add(`${platform}:${targetId}`);
    },
    recordGlobalSuccess: async () => {},
    publishInstagram: mockPublishInstagram as any,
    publishFacebook: mockPublishFacebook as any,
    publishYouTube: mockPublishYouTube as any,
    publishThreads: mockPublishThreads as any,
  });

  assert.equal(scheduledResult.status, 200);
  assert.equal(scheduledResult.body.ok, true);
  assert.deepEqual(publishedTargets.sort(), [
    "facebook",
    "instagram",
    "threads",
    "youtube",
  ]);
  assert.ok(targetHistory.has("threads:threads-main"));
  assert.ok(targetHistory.has("instagram:instagram-main"));
  assert.ok(targetHistory.has("facebook:facebook-main"));
  assert.ok(targetHistory.has("youtube:youtube-main"));

  console.log("   ✓ Scheduled multi-target execution passed");
}

async function testCanaryAndDryRun() {
  console.log("-> Testing Canary & Dry Run validation for Threads...");

  // Canary Slot and Run ID
  const canarySlot = getVideoSocialCanarySlot({
    platform: "threads",
    assetId: "0817",
    targetId: "threads-main",
  });
  assert.equal(canarySlot, "canary:threads:0817:threads-main");

  const canaryRunId = getVideoSocialCanaryRunId({
    platform: "threads",
    assetId: "0817",
    targetId: "threads-main",
  });
  assert.equal(canaryRunId, "video-canary:threads:0817:threads-main");

  // Dry run plan
  const asset = createMockAsset();
  const plan = buildDryRunPublicationPlan(asset, VIDEO_SOCIAL_TARGETS);
  assert.ok(plan.eligiblePlatforms.includes("threads"));
  assert.deepEqual(plan.resolvedTargetIds.threads, ["threads-main"]);
  assert.equal(plan.targetContent.threads.length, 1);
  assert.equal(plan.targetContent.threads[0].targetId, "threads-main");

  // Validate configuration
  const validation = validateVideoSocialConfiguration(
    [asset],
    VIDEO_SOCIAL_TARGETS
  );
  assert.equal(validation.valid, true);
  assert.doesNotThrow(() =>
    assertValidVideoSocialConfiguration([asset], VIDEO_SOCIAL_TARGETS)
  );

  // Full dry run endpoint test via handleVideoSocialRun
  const request = new Request("http://localhost:3000/api/video-social-run", {
    headers: {
      authorization: "Bearer secret_test_cron",
    },
  });
  const routeResponse = await handleVideoSocialRun(request, {
    environment: {
      ...mockEnvironment,
      CRON_SECRET: "secret_test_cron",
      VIDEO_SOCIAL_MODE: "dry-run",
    },
    readHistory: async () => ({}),
  });
  const json: any = await routeResponse.json();

  assert.equal(routeResponse.status, 200);
  assert.equal(json.ok, true);
  assert.equal(json.mode, "dry-run");
  assert.ok(Array.isArray(json.resolvedTargetIds.threads));
  const threadsPreflight = json.targetPreflights.find(
    (tp: any) => tp.targetId === "threads-main"
  );
  assert.ok(threadsPreflight);
  assert.equal(threadsPreflight.platform, "threads");
  assert.equal(json.providerCallsMade, false);

  console.log("   ✓ Canary & Dry Run passed");
}

async function main() {
  console.log("==================================================");
  console.log("RUNNING THREADS VIDEO SOCIAL AUTOMATION TEST SUITE");
  console.log("==================================================");

  await testTargetResolution();
  await testThreadsPreflight();
  await testThreadsCaptionConstraints();
  await testThreadsPublishingHappyPath();
  await testThreadsPublishingPollingAndErrorHandling();
  await testThreadsResumeState();
  await testScheduledMultiTargetExecutionWithThreads();
  await testCanaryAndDryRun();

  console.log("==================================================");
  console.log("ALL THREADS PUBLISHING TESTS PASSED SUCCESSFULLY!");
  console.log("==================================================");
}

main().catch((err) => {
  console.error("Test failure:", err);
  process.exit(1);
});
