import assert from "node:assert/strict";

import {
  runScheduledVideoSocial,
  type ScheduledVideoSocialDependencies,
  type ScheduledVideoSocialFailureLog,
} from "../app/lib/social/video/run-scheduled";
import type { publishFacebookReel } from "../app/lib/social/video/publish-facebook-reel";
import type { publishInstagramReel } from "../app/lib/social/video/publish-instagram-reel";
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

const asset: VideoAsset = {
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

const targets: SocialTarget[] = [
  { id: "instagram-main", platform: "instagram", enabled: true, accountIdEnv: "IG1_ID", accessTokenEnv: "IG1_TOKEN", instagramApiMode: "facebook-login" },
  { id: "instagram-2", platform: "instagram", enabled: true, accountIdEnv: "IG2_ID", accessTokenEnv: "IG2_TOKEN", instagramApiMode: "instagram-login" },
  { id: "facebook-main", platform: "facebook", enabled: true, accountIdEnv: "FB1_ID", accessTokenEnv: "FB1_TOKEN" },
  { id: "facebook-2", platform: "facebook", enabled: true, accountIdEnv: "FB2_ID", accessTokenEnv: "FB2_TOKEN" },
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
};

async function main() {
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
      throw new Error("mocked transient failure");
    }
    const pending = options.resumeState ?? createPendingTargetPublicationState({
      runId: options.runId,
      videoId: options.asset.id,
      platform: options.target.platform,
      targetId: options.target.id,
    });
    const published = advanceTargetPublicationState(pending, {
      status: "published",
      providerMediaId: `media-${options.target.id}`,
      publishedAt: new Date(now).toISOString(),
    });
    await options.onProgress?.(published);
    return options.target.platform === "instagram"
      ? { containerId: `container-${options.target.id}`, mediaId: `media-${options.target.id}`, resumed: Boolean(options.resumeState), state: published }
      : { videoId: `media-${options.target.id}`, resumed: Boolean(options.resumeState), state: published };
  };

  const dependencies: ScheduledVideoSocialDependencies = {
    manifest: [asset],
    targets,
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
  assert.deepEqual(failureLogs, [
    {
      event: "video_social_target_failure",
      runId: "video-scheduled:2026-08-23:0818",
      contentId: "0818",
      targetId: "instagram-2",
      platform: "instagram",
      apiOperation: "publish_reel",
      providerHttpStatus: null,
      metaErrorCode: null,
      metaErrorSubcode: null,
      sanitizedMetaMessage: "mocked transient failure",
      resultingTargetState: "failed",
    },
  ]);

  now = Date.parse("2026-08-24T10:00:00.000Z");
  const second = await runScheduledVideoSocial(dependencies);
  assert.equal(second.status, 200);
  assert.equal((activeRun as VideoRunRecord | null)?.status, "published");
  assert.deepEqual(providerCalls, ["instagram-main", "instagram-2", "facebook-main", "facebook-2", "instagram-2"]);
  assert.equal(targetHistory.size, 4);
  assert.equal(globalHistory.length, 2);
  assert.deepEqual(exactCopy, new Map([
    ["instagram-main", "instagram-main-copy"],
    ["instagram-2", "instagram-2-copy"],
    ["facebook-main", "facebook-main-copy"],
    ["facebook-2", "facebook-2-copy"],
  ]));

  let preflightRun: VideoRunRecord | null = null;
  const providerCallsBeforePreflight = providerCalls.length;
  const preflightResult = await runScheduledVideoSocial({
    ...dependencies,
    environment: { ...environment, IG2_TOKEN: "" },
    getRun: async () => preflightRun,
    saveRun: async (run) => {
      preflightRun = structuredClone(run);
    },
  });
  assert.equal(preflightResult.status, 503);
  assert.equal(providerCalls.length, providerCallsBeforePreflight);
  assert.deepEqual(failureLogs.at(-1), {
    event: "video_social_target_failure",
    runId: "video-scheduled:2026-08-24:0818",
    contentId: "0818",
    targetId: "instagram-2",
    platform: "instagram",
    apiOperation: "preflight",
    providerHttpStatus: null,
    metaErrorCode: null,
    metaErrorSubcode: null,
    sanitizedMetaMessage: "access token is not configured",
    resultingTargetState: "not_created",
  });

  console.log("Video social scheduled multi-target tests: PASS (four targets, retry/resume, sanitized failure logs, no provider network or Redis)");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
