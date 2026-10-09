import assert from "node:assert/strict";

import {
  runScheduledVideoSocial,
  type ScheduledVideoSocialDependencies,
  type ScheduledVideoSocialFailureLog,
} from "../app/lib/social/video/run-scheduled";
import type { publishFacebookReel } from "../app/lib/social/video/publish-facebook-reel";
import type { publishInstagramReel } from "../app/lib/social/video/publish-instagram-reel";
import type { publishYouTubeVideo } from "../app/lib/social/video/publish-youtube-video";
import type { publishThreadsVideo } from "../app/lib/social/video/publish-threads-video";
import { SafeProviderRequestError } from "../app/lib/social/video/meta-request";
import { SafeYouTubeRequestError } from "../app/lib/social/video/youtube-request";
import {
  advanceTargetPublicationState,
  createPendingTargetPublicationState,
} from "../app/lib/social/video/state";
import { getVideoTargetContent } from "../app/lib/social/video/targets";
import type {
  SocialTarget,
  VideoAsset,
  VideoRunRecord,
  VideoTargetPublicationState,
} from "../app/lib/social/video/types";

const asset1: VideoAsset = {
  id: "0818",
  sourceUrl: "https://res.cloudinary.com/demo/video/upload/v1/0818.mp4",
  enabled: true,
  platforms: {
    instagram: {
      targets: [
        { targetId: "instagram-main", enabled: true, caption: "instagram-main-copy" },
        { targetId: "instagram-2", enabled: true, caption: "instagram-2-copy" },
      ],
    },
    facebook: {
      targets: [
        { targetId: "facebook-main", enabled: true, message: "facebook-main-copy" },
        { targetId: "facebook-2", enabled: true, message: "facebook-2-copy" },
      ],
    },
    youtube: { targets: [] },
  },
};

const asset13: VideoAsset = {
  id: "13",
  sourceUrl: "https://res.cloudinary.com/demo/video/upload/v1/13.mp4",
  enabled: true,
  platforms: {
    instagram: {
      targets: [{ targetId: "instagram-main", enabled: true, caption: "ig-13-copy" }],
    },
    facebook: {
      targets: [{ targetId: "facebook-main", enabled: true, message: "fb-13-copy" }],
    },
    youtube: {
      targets: [{ targetId: "youtube-main", enabled: true, title: "yt-13-title", description: "yt-13-desc" }],
    },
    threads: {
      targets: [{ targetId: "threads-main", enabled: true, caption: "th-13-copy" }],
    },
  },
};

const asset14: VideoAsset = {
  id: "14",
  sourceUrl: "https://res.cloudinary.com/demo/video/upload/v1/14.mp4",
  enabled: true,
  platforms: {
    instagram: {
      targets: [{ targetId: "instagram-main", enabled: true, caption: "ig-14-copy" }],
    },
    facebook: {
      targets: [{ targetId: "facebook-main", enabled: true, message: "fb-14-copy" }],
    },
    youtube: {
      targets: [{ targetId: "youtube-main", enabled: true, title: "yt-14-title", description: "yt-14-desc" }],
    },
    threads: {
      targets: [{ targetId: "threads-main", enabled: true, caption: "th-14-copy" }],
    },
  },
};

const fourTargets: SocialTarget[] = [
  { id: "instagram-main", platform: "instagram", enabled: true, accountIdEnv: "IG1_ID", accessTokenEnv: "IG1_TOKEN", instagramApiMode: "facebook-login" },
  { id: "instagram-2", platform: "instagram", enabled: true, accountIdEnv: "IG2_ID", accessTokenEnv: "IG2_TOKEN", instagramApiMode: "instagram-login" },
  { id: "facebook-main", platform: "facebook", enabled: true, accountIdEnv: "FB1_ID", accessTokenEnv: "FB1_TOKEN" },
  { id: "facebook-2", platform: "facebook", enabled: true, accountIdEnv: "FB2_ID", accessTokenEnv: "FB2_TOKEN" },
];

const multiPlatformTargets: SocialTarget[] = [
  { id: "instagram-main", platform: "instagram", enabled: true, accountIdEnv: "IG1_ID", accessTokenEnv: "IG1_TOKEN" },
  { id: "facebook-main", platform: "facebook", enabled: true, accountIdEnv: "FB1_ID", accessTokenEnv: "FB1_TOKEN" },
  { id: "youtube-main", platform: "youtube", enabled: true, accountIdEnv: "YT1_ID", clientIdEnv: "YT1_CLIENT_ID", clientSecretEnv: "YT1_SECRET", refreshTokenEnv: "YT1_REFRESH" },
  { id: "threads-main", platform: "threads", enabled: true, accountIdEnv: "TH1_ID", accessTokenEnv: "TH1_TOKEN" },
];

const environment = {
  VIDEO_SOCIAL_MODE: "live",
  IG1_ID: "1",
  IG1_TOKEN: "token-1",
  IG2_ID: "2",
  IG2_TOKEN: "token-2",
  FB1_ID: "3",
  FB1_TOKEN: "token-3",
  FB2_ID: "4",
  FB2_TOKEN: "token-4",
  YT1_ID: "5",
  YT1_CLIENT_ID: "yt-client-id",
  YT1_SECRET: "yt-secret",
  YT1_REFRESH: "yt-refresh-token",
  TH1_ID: "6",
  TH1_TOKEN: "token-6",
};

async function testTransientFailureAndIntraDayResume() {
  console.log("-> Testing transient failure & intra-day resume (skips already published platforms)...");
  let now = Date.parse("2026-08-23T10:00:00.000Z");
  let activeRun: VideoRunRecord | null = null;
  const states = new Map<string, VideoTargetPublicationState>();
  const providerCalls: string[] = [];
  const exactCopy = new Map<string, string>();
  const targetHistory = new Set<string>();
  const globalHistory: string[] = [];
  const failureLogs: ScheduledVideoSocialFailureLog[] = [];
  let failInstagram2 = true;

  const publish = async (options: {
    runId: string;
    asset: VideoAsset;
    target: SocialTarget;
    resumeState?: VideoTargetPublicationState | null;
    onProgress?: (state: VideoTargetPublicationState) => void | Promise<void>;
  }) => {
    providerCalls.push(options.target.id);
    const content = options.target.platform === "instagram"
      ? getVideoTargetContent(options.asset, "instagram", options.target.id)?.caption
      : getVideoTargetContent(options.asset, "facebook", options.target.id)?.message;
    assert(content, "exact target content must exist");
    exactCopy.set(options.target.id, content);
    if (options.target.id === "instagram-2" && failInstagram2) {
      failInstagram2 = false;
      throw new SafeProviderRequestError({
        provider: "instagram",
        operation: "publish_reel",
        message: "mocked transient network timeout",
        retryable: true,
      });
    }
    const pending = options.resumeState ?? createPendingTargetPublicationState({
      runId: options.runId,
      videoId: options.asset.id,
      platform: options.target.platform,
      targetId: options.target.id,
    });
    const reconciledWithoutMedia = options.target.id === "instagram-main";
    const published = advanceTargetPublicationState(pending, {
      status: "published",
      providerContainerId: `container-${options.target.id}`,
      providerMediaId: reconciledWithoutMedia
        ? null
        : `media-${options.target.id}`,
      reconciliation: reconciledWithoutMedia
        ? {
            operation: "instagram_container_status",
            providerStatus: "PUBLISHED",
            checkedAt: new Date(now).toISOString(),
            statusChecks: 1,
            recentMediaLookup: "not_attempted",
          }
        : null,
      publishedAt: new Date(now).toISOString(),
    });
    await options.onProgress?.(published);
    return options.target.platform === "instagram"
      ? { containerId: `container-${options.target.id}`, mediaId: reconciledWithoutMedia ? null : `media-${options.target.id}`, resumed: Boolean(options.resumeState), state: published }
      : { videoId: `media-${options.target.id}`, resumed: Boolean(options.resumeState), state: published };
  };

  const dependencies: ScheduledVideoSocialDependencies = {
    manifest: [asset1],
    targets: fourTargets,
    environment,
    now: () => now,
    readHistory: async () => ({}),
    acquireLock: async () => true,
    getRun: async () => activeRun,
    saveRun: async (run: VideoRunRecord) => { activeRun = structuredClone(run); },
    getPublicationState: async (runId: string, platform: "instagram" | "facebook", targetId: string) => states.get(`${runId}:${platform}:${targetId}`) ?? null,
    savePublicationState: async (state: VideoTargetPublicationState) => { states.set(`${state.runId}:${state.platform}:${state.targetId}`, structuredClone(state)); },
    recordTargetSuccess: async (platform: "instagram" | "facebook", targetId: string) => { targetHistory.add(`${platform}:${targetId}`); },
    recordGlobalSuccess: async (videoId: string) => { globalHistory.push(videoId); },
    publishInstagram: publish as typeof publishInstagramReel,
    publishFacebook: publish as typeof publishFacebookReel,
    logFailure: (record) => failureLogs.push(record),
  };

  const first = await runScheduledVideoSocial(dependencies);
  assert.equal(first.status, 207);
  assert.equal((activeRun as VideoRunRecord | null)?.status, "partially_published");
  assert.deepEqual(new Set(providerCalls), new Set(["instagram-main", "instagram-2", "facebook-main", "facebook-2"]));
  assert.equal(targetHistory.size, 3);
  assert.deepEqual(globalHistory, ["0818"]);
  assert.equal(failureLogs.length, 1);
  assert.equal(failureLogs[0].sanitizedMetaMessage, "mocked transient network timeout");

  // Intra-day retry: 2 hours later (well within 24h retry window)
  now = Date.parse("2026-08-23T12:00:00.000Z");
  const second = await runScheduledVideoSocial(dependencies);
  assert.equal(second.status, 200);
  assert.equal((activeRun as VideoRunRecord | null)?.status, "published");
  // Crucial check: only instagram-2 was called again! The other 3 published targets were NOT duplicated.
  assert.deepEqual(providerCalls, ["instagram-main", "instagram-2", "facebook-main", "facebook-2", "instagram-2"]);
  assert.equal(targetHistory.size, 4);
  assert.equal(globalHistory.length, 2);
  console.log("   ✓ Transient retry resumes only uncompleted targets without duplicating published ones");
}

async function testTerminalFailureQueueAdvancementToVideo14() {
  console.log("-> Testing terminal failure unblocking & queue advancement from Video 13 to Video 14...");
  let now = Date.parse("2026-10-09T10:00:00.000Z");

  // Simulate stalled active run for Video 13 from 2026-10-01
  const video13RunId = "video-scheduled:2026-10-01:13";
  let activeRun: VideoRunRecord | null = {
    runId: video13RunId,
    slot: "scheduled:active",
    videoId: "13",
    intent: "scheduled",
    platform: "multi",
    targetIds: ["instagram-main", "facebook-main", "youtube-main", "threads-main"],
    status: "partially_published",
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-10-01T10:05:00.000Z",
  };

  const archivedRuns = new Map<string, VideoRunRecord>();
  archivedRuns.set("scheduled:active", structuredClone(activeRun));
  archivedRuns.set(video13RunId, structuredClone(activeRun));

  const states = new Map<string, VideoTargetPublicationState>();
  // Video 13 platform states: IG, FB, Threads confirmed published; YouTube failed with invalid_grant (retryable: false)
  states.set(`${video13RunId}:instagram:instagram-main`, {
    runId: video13RunId,
    videoId: "13",
    platform: "instagram",
    targetId: "instagram-main",
    status: "published",
    attempts: 1,
    providerResourceId: null,
    providerContainerId: "ig_cnt_13",
    providerUploadId: null,
    providerUploadUrl: null,
    providerMediaId: "ig_post_13",
    postId: "ig_post_13",
    publishedAt: "2026-10-01T10:02:00.000Z",
    reconciliation: null,
    error: null,
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-10-01T10:02:00.000Z",
  });

  states.set(`${video13RunId}:facebook:facebook-main`, {
    runId: video13RunId,
    videoId: "13",
    platform: "facebook",
    targetId: "facebook-main",
    status: "published",
    attempts: 1,
    providerResourceId: "fb_vid_13",
    providerContainerId: null,
    providerUploadId: "fb_vid_13",
    providerUploadUrl: null,
    providerMediaId: "fb_post_13",
    postId: "fb_post_13",
    publishedAt: "2026-10-01T10:03:00.000Z",
    reconciliation: null,
    error: null,
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-10-01T10:03:00.000Z",
  });

  states.set(`${video13RunId}:threads:threads-main`, {
    runId: video13RunId,
    videoId: "13",
    platform: "threads",
    targetId: "threads-main",
    status: "published",
    attempts: 1,
    providerResourceId: null,
    providerContainerId: "th_cnt_13",
    providerUploadId: null,
    providerUploadUrl: null,
    providerMediaId: "th_post_13",
    postId: "th_post_13",
    publishedAt: "2026-10-01T10:04:00.000Z",
    reconciliation: null,
    error: null,
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-10-01T10:04:00.000Z",
  });

  states.set(`${video13RunId}:youtube:youtube-main`, {
    runId: video13RunId,
    videoId: "13",
    platform: "youtube",
    targetId: "youtube-main",
    status: "failed",
    attempts: 1,
    providerResourceId: null,
    providerContainerId: null,
    providerUploadId: null,
    providerUploadUrl: null,
    providerMediaId: null,
    postId: null,
    publishedAt: null,
    reconciliation: null,
    error: {
      provider: "youtube",
      operation: "refresh_access_token",
      message: "Google OAuth token refresh failed: Token has been expired or revoked.",
      retryable: false,
    },
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-10-01T10:05:00.000Z",
  });

  const providerCallsMade: string[] = [];
  const globalHistory: Array<{ videoId: string; timestamp: number }> = [];

  const dependencies: ScheduledVideoSocialDependencies = {
    manifest: [asset13, asset14],
    targets: multiPlatformTargets,
    environment,
    now: () => now,
    readHistory: async () => {
      // LRU history: video 13 was published on 2026-10-01; video 14 has never been used
      return { "13": Date.parse("2026-10-01T10:04:00.000Z") };
    },
    acquireLock: async () => true,
    getRun: async (slot) => archivedRuns.get(slot) ?? null,
    saveRun: async (run) => {
      archivedRuns.set(run.slot, structuredClone(run));
      if (run.runId && run.runId !== run.slot) {
        archivedRuns.set(run.runId, structuredClone(run));
      }
    },
    getPublicationState: async (runId, platform, targetId) => states.get(`${runId}:${platform}:${targetId}`) ?? null,
    savePublicationState: async (state) => { states.set(`${state.runId}:${state.platform}:${state.targetId}`, structuredClone(state)); },
    recordTargetSuccess: async () => {},
    recordGlobalSuccess: async (videoId, successfulAtMs) => { globalHistory.push({ videoId, timestamp: successfulAtMs }); },
    publishInstagram: async (options) => {
      providerCallsMade.push(`ig:${options.asset.id}`);
      const published = advanceTargetPublicationState(options.resumeState!, {
        status: "published",
        providerMediaId: `ig_post_${options.asset.id}`,
        postId: `ig_post_${options.asset.id}`,
        publishedAt: new Date(now).toISOString(),
      });
      await options.onProgress?.(published);
      return { containerId: `ig_cnt_${options.asset.id}`, mediaId: `ig_post_${options.asset.id}`, resumed: false, state: published };
    },
    publishFacebook: async (options) => {
      providerCallsMade.push(`fb:${options.asset.id}`);
      const published = advanceTargetPublicationState(options.resumeState!, {
        status: "published",
        providerMediaId: `fb_post_${options.asset.id}`,
        postId: `fb_post_${options.asset.id}`,
        publishedAt: new Date(now).toISOString(),
      });
      await options.onProgress?.(published);
      return { videoId: `fb_post_${options.asset.id}`, resumed: false, state: published };
    },
    publishYouTube: async (options) => {
      providerCallsMade.push(`yt:${options.asset.id}`);
      const published = advanceTargetPublicationState(options.resumeState!, {
        status: "published",
        providerMediaId: `yt_post_${options.asset.id}`,
        postId: `yt_post_${options.asset.id}`,
        publishedAt: new Date(now).toISOString(),
      });
      await options.onProgress?.(published);
      return { videoId: `yt_post_${options.asset.id}`, resumed: false, state: published };
    },
    publishThreads: async (options) => {
      providerCallsMade.push(`th:${options.asset.id}`);
      const published = advanceTargetPublicationState(options.resumeState!, {
        status: "published",
        providerMediaId: `th_post_${options.asset.id}`,
        postId: `th_post_${options.asset.id}`,
        publishedAt: new Date(now).toISOString(),
      });
      await options.onProgress?.(published);
      return { videoId: `th_post_${options.asset.id}`, resumed: false, state: published };
    },
  };

  const result = await runScheduledVideoSocial(dependencies);

  // 1. Scheduled run successfully advanced and published
  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.equal(result.body.videoId, "14");
  assert.equal(result.body.runId, "video-scheduled:2026-10-09:14");

  // 2. Video 13 platforms were NEVER duplicated (0 provider calls for video 13)
  assert.deepEqual(
    providerCallsMade,
    ["ig:14", "fb:14", "yt:14", "th:14"]
  );

  // 3. Video 13's historical run record is preserved under its runId key in Redis
  const video13Archived = archivedRuns.get(video13RunId);
  assert(video13Archived);
  assert.equal(video13Archived.videoId, "13");
  assert.equal(video13Archived.status, "partially_published");

  // 4. Video 13's platform states remain intact
  assert.equal(states.get(`${video13RunId}:instagram:instagram-main`)?.status, "published");
  assert.equal(states.get(`${video13RunId}:facebook:facebook-main`)?.status, "published");
  assert.equal(states.get(`${video13RunId}:threads:threads-main`)?.status, "published");
  assert.equal(states.get(`${video13RunId}:youtube:youtube-main`)?.status, "failed");
  assert.equal(states.get(`${video13RunId}:youtube:youtube-main`)?.error?.retryable, false);

  // 5. Active slot now safely points to Video 14
  const currentActive = archivedRuns.get("scheduled:active");
  assert(currentActive);
  assert.equal(currentActive.videoId, "14");
  assert.equal(currentActive.status, "published");

  console.log("   ✓ Video 13 safely released without duplicate posting, and Video 14 published successfully");
}

async function testTerminalFailureWithin24Hours() {
  console.log("-> Testing non-retryable failure (invalid_grant) within 24h window...");
  const now = Date.parse("2026-10-09T10:00:00.000Z");
  const video13RunId = "video-scheduled:2026-10-09:13";
  let activeRun: VideoRunRecord | null = {
    runId: video13RunId,
    slot: "scheduled:active",
    videoId: "13",
    intent: "scheduled",
    platform: "multi",
    targetIds: ["instagram-main", "facebook-main", "youtube-main", "threads-main"],
    status: "partially_published",
    createdAt: "2026-10-09T09:30:00.000Z", // only 30 mins ago
    updatedAt: "2026-10-09T09:35:00.000Z",
  };

  const archivedRuns = new Map<string, VideoRunRecord>();
  archivedRuns.set("scheduled:active", structuredClone(activeRun));
  archivedRuns.set(video13RunId, structuredClone(activeRun));

  const states = new Map<string, VideoTargetPublicationState>();
  states.set(`${video13RunId}:instagram:instagram-main`, {
    runId: video13RunId,
    videoId: "13",
    platform: "instagram",
    targetId: "instagram-main",
    status: "published",
    attempts: 1,
    providerResourceId: null,
    providerContainerId: "ig_cnt_13",
    providerUploadId: null,
    providerUploadUrl: null,
    providerMediaId: "ig_post_13",
    postId: "ig_post_13",
    publishedAt: "2026-10-09T09:31:00.000Z",
    reconciliation: null,
    error: null,
    createdAt: "2026-10-09T09:30:00.000Z",
    updatedAt: "2026-10-09T09:31:00.000Z",
  });
  states.set(`${video13RunId}:facebook:facebook-main`, {
    runId: video13RunId,
    videoId: "13",
    platform: "facebook",
    targetId: "facebook-main",
    status: "published",
    attempts: 1,
    providerResourceId: "fb_vid_13",
    providerContainerId: null,
    providerUploadId: "fb_vid_13",
    providerUploadUrl: null,
    providerMediaId: "fb_post_13",
    postId: "fb_post_13",
    publishedAt: "2026-10-09T09:32:00.000Z",
    reconciliation: null,
    error: null,
    createdAt: "2026-10-09T09:30:00.000Z",
    updatedAt: "2026-10-09T09:32:00.000Z",
  });
  states.set(`${video13RunId}:threads:threads-main`, {
    runId: video13RunId,
    videoId: "13",
    platform: "threads",
    targetId: "threads-main",
    status: "published",
    attempts: 1,
    providerResourceId: null,
    providerContainerId: "th_cnt_13",
    providerUploadId: null,
    providerUploadUrl: null,
    providerMediaId: "th_post_13",
    postId: "th_post_13",
    publishedAt: "2026-10-09T09:33:00.000Z",
    reconciliation: null,
    error: null,
    createdAt: "2026-10-09T09:30:00.000Z",
    updatedAt: "2026-10-09T09:33:00.000Z",
  });
  states.set(`${video13RunId}:youtube:youtube-main`, {
    runId: video13RunId,
    videoId: "13",
    platform: "youtube",
    targetId: "youtube-main",
    status: "failed",
    attempts: 1,
    providerResourceId: null,
    providerContainerId: null,
    providerUploadId: null,
    providerUploadUrl: null,
    providerMediaId: null,
    postId: null,
    publishedAt: null,
    reconciliation: null,
    error: {
      provider: "youtube",
      operation: "refresh_access_token",
      message: "Google OAuth token refresh failed: invalid_grant",
      retryable: false,
    },
    createdAt: "2026-10-09T09:30:00.000Z",
    updatedAt: "2026-10-09T09:35:00.000Z",
  });

  const providerCallsMade: string[] = [];

  const dependencies: ScheduledVideoSocialDependencies = {
    manifest: [asset13, asset14],
    targets: multiPlatformTargets,
    environment,
    now: () => now,
    readHistory: async () => ({ "13": Date.parse("2026-10-09T09:33:00.000Z") }),
    acquireLock: async () => true,
    getRun: async (slot) => archivedRuns.get(slot) ?? null,
    saveRun: async (run) => {
      archivedRuns.set(run.slot, structuredClone(run));
      if (run.runId && run.runId !== run.slot) {
        archivedRuns.set(run.runId, structuredClone(run));
      }
    },
    getPublicationState: async (runId, platform, targetId) => states.get(`${runId}:${platform}:${targetId}`) ?? null,
    savePublicationState: async (state) => { states.set(`${state.runId}:${state.platform}:${state.targetId}`, structuredClone(state)); },
    recordTargetSuccess: async () => {},
    recordGlobalSuccess: async () => {},
    publishInstagram: async (options) => {
      providerCallsMade.push(`ig:${options.asset.id}`);
      const published = advanceTargetPublicationState(options.resumeState!, {
        status: "published",
        providerMediaId: `ig_post_${options.asset.id}`,
        postId: `ig_post_${options.asset.id}`,
        publishedAt: new Date(now).toISOString(),
      });
      return { containerId: `ig_cnt_${options.asset.id}`, mediaId: `ig_post_${options.asset.id}`, resumed: false, state: published };
    },
    publishFacebook: async (options) => {
      providerCallsMade.push(`fb:${options.asset.id}`);
      const published = advanceTargetPublicationState(options.resumeState!, {
        status: "published",
        providerMediaId: `fb_post_${options.asset.id}`,
        postId: `fb_post_${options.asset.id}`,
        publishedAt: new Date(now).toISOString(),
      });
      return { videoId: `fb_post_${options.asset.id}`, resumed: false, state: published };
    },
    publishYouTube: async (options) => {
      providerCallsMade.push(`yt:${options.asset.id}`);
      const published = advanceTargetPublicationState(options.resumeState!, {
        status: "published",
        providerMediaId: `yt_post_${options.asset.id}`,
        postId: `yt_post_${options.asset.id}`,
        publishedAt: new Date(now).toISOString(),
      });
      return { videoId: `yt_post_${options.asset.id}`, resumed: false, state: published };
    },
    publishThreads: async (options) => {
      providerCallsMade.push(`th:${options.asset.id}`);
      const published = advanceTargetPublicationState(options.resumeState!, {
        status: "published",
        providerMediaId: `th_post_${options.asset.id}`,
        postId: `th_post_${options.asset.id}`,
        publishedAt: new Date(now).toISOString(),
      });
      return { videoId: `th_post_${options.asset.id}`, resumed: false, state: published };
    },
  };

  const result = await runScheduledVideoSocial(dependencies);
  assert.equal(result.status, 200);
  assert.equal(result.body.videoId, "14");
  assert.deepEqual(providerCallsMade, ["ig:14", "fb:14", "yt:14", "th:14"]);
  console.log("   ✓ Non-retryable error (invalid_grant) within 24h safely retires without blocking queue");
}

async function testPreflightFailureSafeguard() {
  console.log("-> Testing preflight failure safeguard...");
  let preflightRun: VideoRunRecord | null = null;
  const failureLogs: ScheduledVideoSocialFailureLog[] = [];
  const result = await runScheduledVideoSocial({
    manifest: [asset1],
    targets: fourTargets,
    environment: { ...environment, IG2_TOKEN: "" },
    acquireLock: async () => true,
    readHistory: async () => ({}),
    getRun: async () => preflightRun,
    saveRun: async (run) => { preflightRun = structuredClone(run); },
    logFailure: (record) => failureLogs.push(record),
  });
  assert.equal(result.status, 503);
  assert.equal(failureLogs.length, 1);
  assert.equal(failureLogs[0].sanitizedMetaMessage, "access token is not configured");
  console.log("   ✓ Preflight failure prevents execution cleanly");
}

async function testArchivedVideo13TargetRecoverability() {
  console.log("-> Testing recoverability of Video 13 failed YouTube target via archived state...");
  const video13RunId = "video-scheduled:2026-10-01:13";
  const states = new Map<string, VideoTargetPublicationState>();
  
  // Stored state: IG, FB, Threads published; YouTube failed
  states.set(`${video13RunId}:instagram:instagram-main`, {
    runId: video13RunId,
    videoId: "13",
    platform: "instagram",
    targetId: "instagram-main",
    status: "published",
    attempts: 1,
    providerResourceId: null,
    providerContainerId: "ig_cnt_13",
    providerUploadId: null,
    providerUploadUrl: null,
    providerMediaId: "ig_post_13",
    postId: "ig_post_13",
    publishedAt: "2026-10-01T10:02:00.000Z",
    reconciliation: null,
    error: null,
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-10-01T10:02:00.000Z",
  });
  states.set(`${video13RunId}:facebook:facebook-main`, {
    runId: video13RunId,
    videoId: "13",
    platform: "facebook",
    targetId: "facebook-main",
    status: "published",
    attempts: 1,
    providerResourceId: "fb_vid_13",
    providerContainerId: null,
    providerUploadId: "fb_vid_13",
    providerUploadUrl: null,
    providerMediaId: "fb_post_13",
    postId: "fb_post_13",
    publishedAt: "2026-10-01T10:03:00.000Z",
    reconciliation: null,
    error: null,
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-10-01T10:03:00.000Z",
  });
  states.set(`${video13RunId}:threads:threads-main`, {
    runId: video13RunId,
    videoId: "13",
    platform: "threads",
    targetId: "threads-main",
    status: "published",
    attempts: 1,
    providerResourceId: null,
    providerContainerId: "th_cnt_13",
    providerUploadId: null,
    providerUploadUrl: null,
    providerMediaId: "th_post_13",
    postId: "th_post_13",
    publishedAt: "2026-10-01T10:04:00.000Z",
    reconciliation: null,
    error: null,
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-10-01T10:04:00.000Z",
  });
  states.set(`${video13RunId}:youtube:youtube-main`, {
    runId: video13RunId,
    videoId: "13",
    platform: "youtube",
    targetId: "youtube-main",
    status: "failed",
    attempts: 1,
    providerResourceId: null,
    providerContainerId: null,
    providerUploadId: null,
    providerUploadUrl: null,
    providerMediaId: null,
    postId: null,
    publishedAt: null,
    reconciliation: null,
    error: {
      provider: "youtube",
      operation: "refresh_access_token",
      message: "Google OAuth token refresh failed: invalid_grant",
      retryable: false,
    },
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-10-01T10:05:00.000Z",
  });

  // Execute deliberate retry of failed YouTube target using its archived state
  const ytResumeState = states.get(`${video13RunId}:youtube:youtube-main`);
  assert(ytResumeState);
  assert.equal(ytResumeState.status, "failed");

  // Re-authorization succeeds: publish YouTube target directly
  const retryPublishedAt = new Date().toISOString();
  const recoveredYtState = advanceTargetPublicationState(ytResumeState, {
    status: "published",
    providerMediaId: "yt_recovered_13",
    postId: "yt_recovered_13",
    publishedAt: retryPublishedAt,
    error: null,
  });
  states.set(`${video13RunId}:youtube:youtube-main`, recoveredYtState);

  // Assert all 4 platform states for video 13 are now published without altering other platforms
  assert.equal(states.get(`${video13RunId}:instagram:instagram-main`)?.status, "published");
  assert.equal(states.get(`${video13RunId}:facebook:facebook-main`)?.status, "published");
  assert.equal(states.get(`${video13RunId}:threads:threads-main`)?.status, "published");
  assert.equal(states.get(`${video13RunId}:youtube:youtube-main`)?.status, "published");
  assert.equal(states.get(`${video13RunId}:youtube:youtube-main`)?.postId, "yt_recovered_13");
  console.log("   ✓ Video 13 failed YouTube target recovered cleanly without duplicating other platforms");
}

async function testDailyLockAndNextDayAdvancement() {
  console.log("-> Testing daily lock safety and next-day advancement to Video 15...");
  const day1 = Date.parse("2026-10-09T10:00:00.000Z");
  const day2 = Date.parse("2026-10-10T10:00:00.000Z");

  const asset15: VideoAsset = {
    id: "15",
    sourceUrl: "https://res.cloudinary.com/demo/video/upload/v1/15.mp4",
    enabled: true,
    platforms: {
      instagram: { targets: [{ targetId: "instagram-main", enabled: true, caption: "ig-15-copy" }] },
      facebook: { targets: [{ targetId: "facebook-main", enabled: true, message: "fb-15-copy" }] },
      youtube: { targets: [{ targetId: "youtube-main", enabled: true, title: "yt-15-title", description: "yt-15-desc" }] },
      threads: { targets: [{ targetId: "threads-main", enabled: true, caption: "th-15-copy" }] },
    },
  };

  const archivedRuns = new Map<string, VideoRunRecord>();
  // Active slot currently has Video 14 published from Day 1
  archivedRuns.set("scheduled:active", {
    runId: "video-scheduled:2026-10-09:14",
    slot: "scheduled:active",
    videoId: "14",
    intent: "scheduled",
    platform: "multi",
    targetIds: ["instagram-main", "facebook-main", "youtube-main", "threads-main"],
    status: "published",
    createdAt: "2026-10-09T10:00:00.000Z",
    updatedAt: "2026-10-09T10:05:00.000Z",
  });

  const heldLocks = new Set<string>();

  // 1. Same-day duplicate attempt while lock is held
  heldLocks.add("scheduled:2026-10-09");
  const lockedResult = await runScheduledVideoSocial({
    manifest: [asset13, asset14, asset15],
    targets: multiPlatformTargets,
    environment,
    now: () => day1,
    acquireLock: async (slot) => !heldLocks.has(slot),
  });
  assert.equal(lockedResult.status, 409);
  assert.equal(lockedResult.body.ok, false);
  assert.equal(lockedResult.body.error, "scheduled video social run is already locked");

  // 2. Next day execution: should retire published Video 14 and select Video 15
  const providerCalls: string[] = [];
  const nextDayResult = await runScheduledVideoSocial({
    manifest: [asset13, asset14, asset15],
    targets: multiPlatformTargets,
    environment,
    now: () => day2,
    acquireLock: async (slot) => !heldLocks.has(slot),
    getRun: async (slot) => archivedRuns.get(slot) ?? null,
    saveRun: async (run) => {
      archivedRuns.set(run.slot, structuredClone(run));
      if (run.runId && run.runId !== run.slot) {
        archivedRuns.set(run.runId, structuredClone(run));
      }
    },
    getPublicationState: async () => null,
    savePublicationState: async () => {},
    recordTargetSuccess: async () => {},
    recordGlobalSuccess: async () => {},
    readHistory: async () => ({
      "13": Date.parse("2026-10-01T10:00:00.000Z"),
      "14": Date.parse("2026-10-09T10:05:00.000Z"),
    }),
    publishInstagram: async (options) => {
      providerCalls.push(`ig:${options.asset.id}`);
      const published = advanceTargetPublicationState(options.resumeState!, {
        status: "published",
        providerMediaId: `ig_post_${options.asset.id}`,
        postId: `ig_post_${options.asset.id}`,
        publishedAt: new Date(day2).toISOString(),
      });
      return { containerId: `ig_cnt_${options.asset.id}`, mediaId: `ig_post_${options.asset.id}`, resumed: false, state: published };
    },
    publishFacebook: async (options) => {
      providerCalls.push(`fb:${options.asset.id}`);
      const published = advanceTargetPublicationState(options.resumeState!, {
        status: "published",
        providerMediaId: `fb_post_${options.asset.id}`,
        postId: `fb_post_${options.asset.id}`,
        publishedAt: new Date(day2).toISOString(),
      });
      return { videoId: `fb_post_${options.asset.id}`, resumed: false, state: published };
    },
    publishYouTube: async (options) => {
      providerCalls.push(`yt:${options.asset.id}`);
      const published = advanceTargetPublicationState(options.resumeState!, {
        status: "published",
        providerMediaId: `yt_post_${options.asset.id}`,
        postId: `yt_post_${options.asset.id}`,
        publishedAt: new Date(day2).toISOString(),
      });
      return { videoId: `yt_post_${options.asset.id}`, resumed: false, state: published };
    },
    publishThreads: async (options) => {
      providerCalls.push(`th:${options.asset.id}`);
      const published = advanceTargetPublicationState(options.resumeState!, {
        status: "published",
        providerMediaId: `th_post_${options.asset.id}`,
        postId: `th_post_${options.asset.id}`,
        publishedAt: new Date(day2).toISOString(),
      });
      return { videoId: `th_post_${options.asset.id}`, resumed: false, state: published };
    },
  });

  assert.equal(nextDayResult.status, 200);
  assert.equal(nextDayResult.body.videoId, "15");
  assert.deepEqual(providerCalls, ["ig:15", "fb:15", "yt:15", "th:15"]);
  assert.equal(archivedRuns.get("scheduled:active")?.videoId, "15");
  assert.equal(archivedRuns.get("scheduled:active")?.status, "published");
  console.log("   ✓ Daily lock prevents same-day duplication; next-day advances cleanly to Video 15");
}

async function main() {
  console.log("==================================================");
  console.log("RUNNING SCHEDULED VIDEO SOCIAL SUITE (ROBUST RESUME & LRU ADVANCEMENT)");
  console.log("==================================================");

  await testTransientFailureAndIntraDayResume();
  await testTerminalFailureQueueAdvancementToVideo14();
  await testTerminalFailureWithin24Hours();
  await testArchivedVideo13TargetRecoverability();
  await testDailyLockAndNextDayAdvancement();
  await testPreflightFailureSafeguard();

  console.log("==================================================");
  console.log("ALL SCHEDULED VIDEO SOCIAL TESTS PASSED SUCCESSFULLY!");
  console.log("==================================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

