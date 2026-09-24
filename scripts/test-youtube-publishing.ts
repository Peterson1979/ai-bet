import assert from "node:assert/strict";

import {
  parseYouTubePrivacyStatus,
} from "../app/lib/social/video/config";
import {
  preflightYouTubeVideoTarget,
  readYouTubeTargetCredentials,
  assertYouTubeVideoPreflight,
} from "../app/lib/social/video/preflight";
import {
  publishYouTubeVideo,
  type YouTubeVideoPublisherOptions,
} from "../app/lib/social/video/publish-youtube-video";
import {
  runScheduledVideoSocial,
  type ScheduledVideoSocialDependencies,
} from "../app/lib/social/video/run-scheduled";
import {
  createPendingTargetPublicationState,
  VIDEO_SOCIAL_KEYS,
} from "../app/lib/social/video/state";
import {
  resolveTargetsForPlatform,
  resolveVideoTargets,
  VIDEO_SOCIAL_TARGETS,
} from "../app/lib/social/video/targets";
import type {
  SocialTarget,
  VideoAsset,
  VideoRunRecord,
  VideoTargetPublicationState,
} from "../app/lib/social/video/types";
import {
  initiateYouTubeResumableUpload,
  refreshYouTubeAccessToken,
  uploadYouTubeVideoBody,
  YOUTUBE_UPLOAD_API_BASE,
} from "../app/lib/social/video/youtube-request";

function createMockAsset(overrides: Partial<VideoAsset> = {}): VideoAsset {
  return {
    id: "0817",
    sourceUrl: "https://res.cloudinary.com/u4u07qyb/video/upload/v12345/0817.mp4",
    enabled: true,
    platforms: {
      instagram: {
        targets: [
          {
            targetId: "instagram-main",
            enabled: true,
            caption: "Instagram test caption",
          },
        ],
      },
      facebook: {
        targets: [
          {
            targetId: "facebook-main",
            enabled: true,
            message: "Facebook test message",
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
    },
    ...overrides,
  };
}

function createMockTarget(overrides: Partial<SocialTarget> = {}): SocialTarget {
  return {
    id: "youtube-main",
    platform: "youtube",
    enabled: true,
    accountIdEnv: "YOUTUBE_CHANNEL_ID",
    clientIdEnv: "YOUTUBE_CLIENT_ID",
    clientSecretEnv: "YOUTUBE_CLIENT_SECRET",
    refreshTokenEnv: "YOUTUBE_REFRESH_TOKEN",
    ...overrides,
  };
}

const mockEnvironment = {
  VIDEO_SOCIAL_MODE: "live",
  YOUTUBE_CLIENT_ID: "mock_client_id.apps.googleusercontent.com",
  YOUTUBE_CLIENT_SECRET: "mock_client_secret_xyz123",
  YOUTUBE_REFRESH_TOKEN: "1//04mock_refresh_token_abc789",
  YOUTUBE_CHANNEL_ID: "UC9KtEuEsKg4WYdWYZeyokXQ",
  INSTAGRAM_BUSINESS_ID: "12345",
  INSTAGRAM_ACCESS_TOKEN: "mock_ig_token",
  FACEBOOK_PAGE_ID: "67890",
  FACEBOOK_ACCESS_TOKEN: "mock_fb_token",
};

async function runTests() {
  console.log("Running YouTube Publishing & Multi-Target Integration Tests...");

  // ===========================================================================
  // 1. YouTube Preflight Validation Tests
  // ===========================================================================
  {
    const asset = createMockAsset();
    const target = createMockTarget();

    // Valid preflight
    const validResult = preflightYouTubeVideoTarget({
      asset,
      target,
      environment: mockEnvironment,
    });
    assert.equal(validResult.valid, true);
    assert.equal(validResult.clientIdPresent, true);
    assert.equal(validResult.clientSecretPresent, true);
    assert.equal(validResult.refreshTokenPresent, true);
    assert.equal(validResult.channelIdPresent, true);
    assert.equal(validResult.titlePresent, true);
    assert.equal(validResult.descriptionPresent, true);
    assert.equal(validResult.sourceCloudinaryVideo, true);
    assert.equal(validResult.sourceMp4Path, true);
    assert.doesNotThrow(() => assertYouTubeVideoPreflight(validResult));

    // Missing client secret
    const missingSecret = preflightYouTubeVideoTarget({
      asset,
      target,
      environment: { ...mockEnvironment, YOUTUBE_CLIENT_SECRET: undefined },
    });
    assert.equal(missingSecret.valid, false);
    assert(missingSecret.errors.some((e) => e.includes("YOUTUBE_CLIENT_SECRET")));

    // Missing refresh token
    const missingRefresh = preflightYouTubeVideoTarget({
      asset,
      target,
      environment: { ...mockEnvironment, YOUTUBE_REFRESH_TOKEN: "" },
    });
    assert.equal(missingRefresh.valid, false);
    assert(missingRefresh.errors.some((e) => e.includes("YOUTUBE_REFRESH_TOKEN")));

    // Missing title
    const assetNoTitle = createMockAsset({
      platforms: {
        ...asset.platforms,
        youtube: {
          targets: [{ targetId: "youtube-main", enabled: true, title: "", description: "desc" }],
        },
      },
    });
    const missingTitle = preflightYouTubeVideoTarget({
      asset: assetNoTitle,
      target,
      environment: mockEnvironment,
    });
    assert.equal(missingTitle.valid, false);
    assert(missingTitle.errors.some((e) => e.includes("title")));

    // Disabled target and destination preflight behavior
    const disabledTarget = createMockTarget({ enabled: false });
    const assetDisabledContent = createMockAsset({
      platforms: {
        ...asset.platforms,
        youtube: {
          targets: [{ targetId: "youtube-main", enabled: false, title: "Title", description: "Desc" }],
        },
      },
    });

    // Default: fail-closed when disabled
    const disabledFailResult = preflightYouTubeVideoTarget({
      asset: assetDisabledContent,
      target: disabledTarget,
      environment: mockEnvironment,
    });
    assert.equal(disabledFailResult.valid, false);
    assert(disabledFailResult.errors.some((e) => e.includes("target is disabled")));
    assert(disabledFailResult.errors.some((e) => e.includes("youtube destination is disabled")));

    // Manual test mode: allowDisabled: true allows valid upload preflight without enabling production targets
    const allowDisabledPassResult = preflightYouTubeVideoTarget({
      asset: assetDisabledContent,
      target: disabledTarget,
      environment: mockEnvironment,
      allowDisabled: true,
    });
    assert.equal(allowDisabledPassResult.valid, true);

    // Credentials reading
    const credentials = readYouTubeTargetCredentials(target, mockEnvironment);
    assert.equal(credentials.clientId, mockEnvironment.YOUTUBE_CLIENT_ID);
    assert.equal(credentials.clientSecret, mockEnvironment.YOUTUBE_CLIENT_SECRET);
    assert.equal(credentials.refreshToken, mockEnvironment.YOUTUBE_REFRESH_TOKEN);
    assert.equal(credentials.channelId, mockEnvironment.YOUTUBE_CHANNEL_ID);
  }

  // ===========================================================================
  // 2. YouTube Resumable Upload Helper Tests
  // ===========================================================================
  {
    // initiateYouTubeResumableUpload
    let capturedSessionInit: RequestInit | undefined;
    const mockSessionFetch = async (input: string | URL | Request, init?: RequestInit) => {
      capturedSessionInit = init;
      return new Response("", {
        status: 200,
        headers: {
          Location: "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&upload_id=mock_upload_session_id_456",
        },
      });
    };

    const session = await initiateYouTubeResumableUpload({
      accessToken: "mock_yt_access_token_123",
      metadata: {
        snippet: {
          title: "Test Title",
          description: "Test Desc",
          tags: ["Tag1", "Tag2"],
          categoryId: "17",
        },
        status: {
          privacyStatus: "private",
          selfDeclaredMadeForKids: false,
        },
      },
      fetchFn: mockSessionFetch,
    });

    assert.equal(
      session.uploadUrl,
      "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&upload_id=mock_upload_session_id_456"
    );
    assert.equal(capturedSessionInit?.method, "POST");
    const headers = new Headers(capturedSessionInit?.headers);
    assert.equal(headers.get("Authorization"), "Bearer mock_yt_access_token_123");
    assert.equal(headers.get("X-Upload-Content-Type"), "video/mp4");
    assert.equal(headers.get("Content-Type"), "application/json; charset=UTF-8");

    // uploadYouTubeVideoBody
    let capturedUploadInit: RequestInit | undefined;
    const mockUploadFetch = async (input: string | URL | Request, init?: RequestInit) => {
      capturedUploadInit = init;
      return new Response(
        JSON.stringify({
          kind: "youtube#video",
          id: "yt_video_id_999",
          snippet: {
            title: "Test Title",
            publishedAt: "2026-09-23T19:00:00Z",
          },
          status: {
            privacyStatus: "private",
            uploadStatus: "uploaded",
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    };

    const uploadResult = await uploadYouTubeVideoBody({
      uploadUrl: session.uploadUrl,
      videoBody: Buffer.from("mock-mp4-data"),
      videoSize: 13,
      fetchFn: mockUploadFetch,
    });

    assert.equal(uploadResult.id, "yt_video_id_999");
    assert.equal(capturedUploadInit?.method, "PUT");
  }

  // ===========================================================================
  // 3. publishYouTubeVideo Full Flow & State Progression Tests
  // ===========================================================================
  {
    const asset = createMockAsset();
    const target = createMockTarget();
    const progressHistory: string[] = [];

    const mockFetch = async (input: string | URL | Request, init?: RequestInit) => {
      const url = input.toString();

      // Token refresh endpoint
      if (url.includes("oauth2.googleapis.com/token")) {
        return new Response(
          JSON.stringify({
            access_token: "mock_fresh_access_token_abc",
            expires_in: 3600,
            token_type: "Bearer",
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }

      // Initiate session endpoint
      if (url.includes("upload/youtube/v3/videos?uploadType=resumable")) {
        return new Response("", {
          status: 200,
          headers: {
            Location: "https://upload.youtube.mock/session/12345",
          },
        });
      }

      // Source video download endpoint
      if (url.includes("cloudinary.com")) {
        return new Response(new Uint8Array([0, 1, 2, 3]), {
          status: 200,
          headers: { "Content-Length": "4", "Content-Type": "video/mp4" },
        });
      }

      // Resumable upload chunk PUT endpoint
      if (url.includes("upload.youtube.mock/session/12345")) {
        return new Response(
          JSON.stringify({
            kind: "youtube#video",
            id: "yt_published_video_777",
            snippet: {
              publishedAt: "2026-09-23T19:05:00.000Z",
              title: "How Bookmakers Set Odds",
            },
            status: {
              privacyStatus: "private",
              uploadStatus: "uploaded",
            },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }

      throw new Error(`Unexpected mock URL: ${url}`);
    };

    const result = await publishYouTubeVideo({
      runId: "run_test_yt_01",
      asset,
      target,
      environment: mockEnvironment,
      fetchFn: mockFetch,
      privacyStatus: "private",
      onProgress: (state) => {
        progressHistory.push(state.status);
      },
    });

    assert.equal(result.videoId, "yt_published_video_777");
    assert.equal(result.resumed, false);
    assert.equal(result.state.status, "published");
    assert.equal(result.state.postId, "yt_published_video_777");
    assert.equal(result.state.providerResourceId, "yt_published_video_777");
    assert.equal(result.state.publishedAt, "2026-09-23T19:05:00.000Z");
    assert.equal(result.state.error, null);

    // Verify progression
    assert.deepEqual(progressHistory, [
      "container_created",
      "container_created",
      "publishing",
      "published",
    ]);

    // Test resume when already published
    const alreadyPublishedResult = await publishYouTubeVideo({
      runId: "run_test_yt_01",
      asset,
      target,
      resumeState: result.state,
      environment: mockEnvironment,
      fetchFn: mockFetch,
    });
    assert.equal(alreadyPublishedResult.resumed, true);
    assert.equal(alreadyPublishedResult.videoId, "yt_published_video_777");
  }

  // ===========================================================================
  // 4. Target Resolution with YouTube
  // ===========================================================================
  {
    const asset = createMockAsset();

    // With youtube-main disabled in registry
    const disabledTargets: SocialTarget[] = [
      createMockTarget({ enabled: false }),
    ];
    const resolvedDisabled = resolveTargetsForPlatform(asset, "youtube", disabledTargets);
    assert.equal(resolvedDisabled.length, 0);

    // With youtube-main enabled in registry
    const enabledTargets: SocialTarget[] = [
      createMockTarget({ enabled: true }),
    ];
    const resolvedEnabled = resolveTargetsForPlatform(asset, "youtube", enabledTargets);
    assert.equal(resolvedEnabled.length, 1);
    assert.equal(resolvedEnabled[0].id, "youtube-main");

    const allResolved = resolveVideoTargets(asset, enabledTargets);
    assert.equal(allResolved.youtube.length, 1);
    assert.equal(allResolved.youtube[0].id, "youtube-main");
  }

  // ===========================================================================
  // 5. Scheduled Run Multi-Target Dispatch (Mocked with YouTube)
  // ===========================================================================
  {
    const asset = createMockAsset();
    const targets: SocialTarget[] = [
      {
        id: "instagram-main",
        platform: "instagram",
        enabled: true,
        accountIdEnv: "INSTAGRAM_BUSINESS_ID",
        accessTokenEnv: "INSTAGRAM_ACCESS_TOKEN",
      },
      {
        id: "facebook-main",
        platform: "facebook",
        enabled: true,
        accountIdEnv: "FACEBOOK_PAGE_ID",
        accessTokenEnv: "FACEBOOK_ACCESS_TOKEN",
      },
      {
        id: "youtube-main",
        platform: "youtube",
        enabled: true,
        accountIdEnv: "YOUTUBE_CHANNEL_ID",
        clientIdEnv: "YOUTUBE_CLIENT_ID",
        clientSecretEnv: "YOUTUBE_CLIENT_SECRET",
        refreshTokenEnv: "YOUTUBE_REFRESH_TOKEN",
      },
    ];

    const providerCalls: string[] = [];
    const publicationStates = new Map<string, VideoTargetPublicationState>();
    let savedRunRecord: VideoRunRecord | null = null;
    let globalSuccessId: string | null = null;

    const mockPublishInstagram = async (options: any) => {
      providerCalls.push(`instagram:${options.target.id}`);
      const state: VideoTargetPublicationState = {
        ...createPendingTargetPublicationState({
          runId: options.runId,
          videoId: options.asset.id,
          platform: "instagram",
          targetId: options.target.id,
        }),
        status: "published",
        postId: "ig_post_123",
        providerMediaId: "ig_post_123",
        publishedAt: new Date().toISOString(),
      };
      return { mediaId: "ig_post_123", resumed: false, state };
    };

    const mockPublishFacebook = async (options: any) => {
      providerCalls.push(`facebook:${options.target.id}`);
      const state: VideoTargetPublicationState = {
        ...createPendingTargetPublicationState({
          runId: options.runId,
          videoId: options.asset.id,
          platform: "facebook",
          targetId: options.target.id,
        }),
        status: "published",
        postId: "fb_post_456",
        providerResourceId: "fb_post_456",
        publishedAt: new Date().toISOString(),
      };
      return { videoId: "fb_post_456", resumed: false, state };
    };

    const mockPublishYouTube = async (options: any) => {
      providerCalls.push(`youtube:${options.target.id}`);
      const state: VideoTargetPublicationState = {
        ...createPendingTargetPublicationState({
          runId: options.runId,
          videoId: options.asset.id,
          platform: "youtube",
          targetId: options.target.id,
        }),
        status: "published",
        postId: "yt_video_789",
        providerResourceId: "yt_video_789",
        publishedAt: new Date().toISOString(),
      };
      return { videoId: "yt_video_789", resumed: false, state };
    };

    const dependencies: ScheduledVideoSocialDependencies = {
      manifest: [asset],
      targets,
      environment: mockEnvironment,
      now: () => 1710000000000,
      acquireLock: async () => true,
      getRun: async () => savedRunRecord,
      saveRun: async (rec) => {
        savedRunRecord = rec;
      },
      readHistory: async () => ({}),
      getPublicationState: async (runId, platform, targetId) =>
        publicationStates.get(`${runId}:${platform}:${targetId}`) || null,
      savePublicationState: async (state) => {
        publicationStates.set(
          `${state.runId}:${state.platform}:${state.targetId}`,
          state
        );
      },
      recordTargetSuccess: async () => {},
      recordGlobalSuccess: async (vid) => {
        globalSuccessId = vid;
      },
      publishInstagram: mockPublishInstagram as any,
      publishFacebook: mockPublishFacebook as any,
      publishYouTube: mockPublishYouTube as any,
    };

    const result = await runScheduledVideoSocial(dependencies);

    assert.equal(result.status, 200);
    assert.equal(result.body.ok, true);
    assert.equal(result.body.status, "published");
    assert.equal(globalSuccessId, "0817");

    // Verified all three platforms were dispatched in parallel
    assert.deepEqual(new Set(providerCalls), new Set([
      "instagram:instagram-main",
      "facebook:facebook-main",
      "youtube:youtube-main",
    ]));

    // Verified publication states in Redis map
    const ytState = publicationStates.get(
      "video-scheduled:2024-03-09:0817:youtube:youtube-main"
    );
    assert(ytState);
    assert.equal(ytState.status, "published");
    assert.equal(ytState.postId, "yt_video_789");
  }

  // ===========================================================================
  // 6. Verify default static targets maintain youtube-main as disabled
  // ===========================================================================
  {
    const defaultYouTubeTarget = VIDEO_SOCIAL_TARGETS.find(
      (t) => t.id === "youtube-main"
    );
    assert(defaultYouTubeTarget);
    assert.equal(
      defaultYouTubeTarget.enabled,
      false,
      "CRITICAL: youtube-main must remain disabled in production targets.ts!"
    );
  }

  // ===========================================================================
  // 7. Verify YouTube Privacy Status Validation & Scheduling Defaults
  // ===========================================================================
  {
    // Default fallbacks
    assert.deepEqual(parseYouTubePrivacyStatus(undefined, "public"), {
      status: "public",
      configured: false,
      valid: true,
    });
    assert.deepEqual(parseYouTubePrivacyStatus(undefined, "unlisted"), {
      status: "unlisted",
      configured: false,
      valid: true,
    });
    assert.deepEqual(parseYouTubePrivacyStatus(undefined, "private"), {
      status: "private",
      configured: false,
      valid: true,
    });

    // Valid explicit overrides
    assert.deepEqual(parseYouTubePrivacyStatus("PUBLIC", "private"), {
      status: "public",
      configured: true,
      valid: true,
    });
    assert.deepEqual(parseYouTubePrivacyStatus("unlisted", "public"), {
      status: "unlisted",
      configured: true,
      valid: true,
    });
    assert.deepEqual(parseYouTubePrivacyStatus("private", "public"), {
      status: "private",
      configured: true,
      valid: true,
    });

    // Invalid values fail safely
    const invalid = parseYouTubePrivacyStatus("invalid_status", "public");
    assert.equal(invalid.valid, false);
    assert(invalid.error?.includes("invalid YOUTUBE_PRIVACY_STATUS"));
  }

  console.log("All YouTube Publishing & Multi-Target Integration Tests PASSED successfully! (7 test suites)");
}

runTests().catch((error) => {
  console.error("Test failed:", error);
  process.exit(1);
});
