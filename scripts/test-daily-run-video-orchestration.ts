import assert from "node:assert/strict";
import { runScheduledVideoSocial } from "../app/lib/social/video/run-scheduled";
import type { VideoAsset, SocialTarget } from "../app/lib/social/video/types";

async function main() {
  console.log("==================================================");
  console.log("RUNNING DAILY-RUN VIDEO ORCHESTRATION TEST SUITE");
  console.log("==================================================");

  const mockAsset: VideoAsset = {
    id: "1",
    sourceUrl: "https://res.cloudinary.com/test/video/upload/1.mp4",
    enabled: true,
    platforms: {
      instagram: {
        targets: [
          { targetId: "instagram-main", enabled: true, caption: "Test IG Caption" },
        ],
      },
      facebook: {
        targets: [
          { targetId: "facebook-main", enabled: true, message: "Test FB Message" },
        ],
      },
      youtube: {
        targets: [
          { targetId: "youtube-main", enabled: true, title: "Test Title", description: "Test Desc" },
        ],
      },
      threads: {
        targets: [
          { targetId: "threads-main", enabled: true, caption: "Test Threads Caption" },
        ],
      },
    },
  };

  const mockTargets: SocialTarget[] = [
    { id: "instagram-main", platform: "instagram", enabled: true, accountIdEnv: "IG_ID", accessTokenEnv: "IG_TOKEN" },
    { id: "facebook-main", platform: "facebook", enabled: true, accountIdEnv: "FB_ID", accessTokenEnv: "FB_TOKEN" },
    { id: "youtube-main", platform: "youtube", enabled: true, accountIdEnv: "YT_ID", clientIdEnv: "YT_CLIENT_ID", clientSecretEnv: "YT_SECRET", refreshTokenEnv: "YT_REFRESH" },
    { id: "threads-main", platform: "threads", enabled: true, accountIdEnv: "TH_ID", accessTokenEnv: "TH_TOKEN" },
  ];

  const mockEnv = {
    VIDEO_SOCIAL_MODE: "live",
    IG_ID: "ig-123",
    IG_TOKEN: "ig-token",
    FB_ID: "fb-123",
    FB_TOKEN: "fb-token",
    YT_ID: "yt-123",
    YT_CLIENT_ID: "yt-client",
    YT_SECRET: "yt-secret",
    YT_REFRESH: "yt-refresh",
    TH_ID: "th-123",
    TH_TOKEN: "th-token",
  };

  // Test 1: Mode guard check when disabled
  console.log("-> Testing video runner mode guard when disabled...");
  const disabledResult = await runScheduledVideoSocial({
    environment: { ...mockEnv, VIDEO_SOCIAL_MODE: "disabled" },
    manifest: [mockAsset],
    targets: mockTargets,
  });
  assert.equal(disabledResult.status, 503);
  assert.equal(disabledResult.body.ok, false);
  console.log("   ✓ Mode guard correctly prevents execution when not live");

  // Test 2: Orchestration execution with full mock providers
  console.log("-> Testing scheduled video publishing orchestration with mock providers...");
  const publishedTargets: string[] = [];
  const activeRuns: any[] = [];
  const publishedStates = new Map<string, any>();

  const successfulResult = await runScheduledVideoSocial({
    environment: mockEnv,
    manifest: [mockAsset],
    targets: mockTargets,
    acquireLock: async () => true,
    getRun: async () => null,
    saveRun: async (record) => { activeRuns.push(record); },
    getPublicationState: async (_runId, _platform, targetId) => publishedStates.get(targetId) ?? null,
    savePublicationState: async (state) => { publishedStates.set(state.targetId, state); },
    recordTargetSuccess: async (_platform, targetId) => { publishedTargets.push(targetId); },
    recordGlobalSuccess: async () => {},
    readHistory: async () => ({}),
    publishInstagram: async ({ target, onProgress }) => {
      const state = { runId: "r1", videoId: "1", platform: "instagram" as const, targetId: target.id, status: "published" as const, postId: "ig_post_1", attempts: 1, providerResourceId: null, providerContainerId: null, providerUploadId: null, providerUploadUrl: null, providerMediaId: "ig_post_1", publishedAt: new Date().toISOString(), reconciliation: null, error: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      await onProgress?.(state);
      return { containerId: "c1", mediaId: "ig_post_1", resumed: false, state };
    },
    publishFacebook: async ({ target, onProgress }) => {
      const state = { runId: "r1", videoId: "1", platform: "facebook" as const, targetId: target.id, status: "published" as const, postId: "fb_post_1", attempts: 1, providerResourceId: null, providerContainerId: null, providerUploadId: null, providerUploadUrl: null, providerMediaId: "fb_post_1", publishedAt: new Date().toISOString(), reconciliation: null, error: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      await onProgress?.(state);
      return { videoId: "fb_post_1", resumed: false, state };
    },
    publishYouTube: async ({ target, onProgress }) => {
      const state = { runId: "r1", videoId: "1", platform: "youtube" as const, targetId: target.id, status: "published" as const, postId: "yt_post_1", attempts: 1, providerResourceId: null, providerContainerId: null, providerUploadId: null, providerUploadUrl: null, providerMediaId: "yt_post_1", publishedAt: new Date().toISOString(), reconciliation: null, error: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      await onProgress?.(state);
      return { videoId: "yt_post_1", resumed: false, state };
    },
    publishThreads: async ({ target, onProgress }) => {
      const state = { runId: "r1", videoId: "1", platform: "threads" as const, targetId: target.id, status: "published" as const, postId: "th_post_1", attempts: 1, providerResourceId: null, providerContainerId: null, providerUploadId: null, providerUploadUrl: null, providerMediaId: "th_post_1", publishedAt: new Date().toISOString(), reconciliation: null, error: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      await onProgress?.(state);
      return { videoId: "th_post_1", resumed: false, state };
    },
  });

  assert.equal(successfulResult.status, 200);
  assert.equal(successfulResult.body.ok, true);
  assert.equal(successfulResult.body.status, "published");
  assert.deepEqual(
    new Set(publishedTargets),
    new Set(["instagram-main", "facebook-main", "youtube-main", "threads-main"])
  );
  console.log("   ✓ All 4 platforms published and confirmed successfully");

  // Test 3: Duplicate run protection via Day Lock
  console.log("-> Testing duplicate run protection when lock is already held...");
  const lockedResult = await runScheduledVideoSocial({
    environment: mockEnv,
    manifest: [mockAsset],
    targets: mockTargets,
    acquireLock: async () => false, // simulate already locked
  });
  assert.equal(lockedResult.status, 409);
  assert.equal(lockedResult.body.ok, false);
  assert.equal(lockedResult.body.error, "scheduled video social run is already locked");
  console.log("   ✓ Duplicate execution blocked cleanly with 409 status");

  // Test 4: Failure isolation across individual platforms
  console.log("-> Testing partial failure isolation (3 pass, 1 fails)...");
  const partialTargets: string[] = [];
  const partialResult = await runScheduledVideoSocial({
    environment: mockEnv,
    manifest: [mockAsset],
    targets: mockTargets,
    acquireLock: async () => true,
    getRun: async () => null,
    saveRun: async () => {},
    getPublicationState: async () => null,
    savePublicationState: async () => {},
    recordTargetSuccess: async (_platform, targetId) => { partialTargets.push(targetId); },
    recordGlobalSuccess: async () => {},
    readHistory: async () => ({}),
    publishInstagram: async ({ target, onProgress }) => {
      const state = { runId: "r2", videoId: "1", platform: "instagram" as const, targetId: target.id, status: "published" as const, postId: "ig_post_2", attempts: 1, providerResourceId: null, providerContainerId: null, providerUploadId: null, providerUploadUrl: null, providerMediaId: "ig_post_2", publishedAt: new Date().toISOString(), reconciliation: null, error: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      await onProgress?.(state);
      return { containerId: "c2", mediaId: "ig_post_2", resumed: false, state };
    },
    publishFacebook: async () => {
      throw new Error("Simulated Facebook Graph API outage");
    },
    publishYouTube: async ({ target, onProgress }) => {
      const state = { runId: "r2", videoId: "1", platform: "youtube" as const, targetId: target.id, status: "published" as const, postId: "yt_post_2", attempts: 1, providerResourceId: null, providerContainerId: null, providerUploadId: null, providerUploadUrl: null, providerMediaId: "yt_post_2", publishedAt: new Date().toISOString(), reconciliation: null, error: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      await onProgress?.(state);
      return { videoId: "yt_post_2", resumed: false, state };
    },
    publishThreads: async ({ target, onProgress }) => {
      const state = { runId: "r2", videoId: "1", platform: "threads" as const, targetId: target.id, status: "published" as const, postId: "th_post_2", attempts: 1, providerResourceId: null, providerContainerId: null, providerUploadId: null, providerUploadUrl: null, providerMediaId: "th_post_2", publishedAt: new Date().toISOString(), reconciliation: null, error: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      await onProgress?.(state);
      return { videoId: "th_post_2", resumed: false, state };
    },
  });

  assert.equal(partialResult.status, 207);
  assert.equal(partialResult.body.status, "partially_published");
  assert.deepEqual(
    new Set(partialTargets),
    new Set(["instagram-main", "youtube-main", "threads-main"])
  );
  console.log("   ✓ Failure in one platform does not abort other platforms");

  console.log("==================================================");
  console.log("ALL DAILY-RUN VIDEO ORCHESTRATION TESTS PASSED!");
  console.log("==================================================");
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
