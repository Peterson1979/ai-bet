import {
  evaluateVideoSocialCanaryGate,
  VIDEO_SOCIAL_CANARY_AUTHORIZATION_ENV,
  VIDEO_SOCIAL_CANARY_SOURCE_ENABLED,
  type MetaCanaryPlatform,
  type VideoSocialCanaryGateResult,
} from "./canary-gate";
import { parseVideoSocialMode } from "./config";
import { VIDEO_MANIFEST } from "./manifest";
import { toSafeProviderError } from "./meta-request";
import {
  preflightMetaVideoTarget,
  type EnvironmentSource,
} from "./preflight";
import {
  publishFacebookReel,
  type FacebookReelPublisherOptions,
  type FacebookReelPublishResult,
} from "./publish-facebook-reel";
import {
  publishInstagramReel,
  type InstagramReelPublisherOptions,
  type InstagramReelPublishResult,
} from "./publish-instagram-reel";
import {
  acquireVideoSocialLock,
  advanceTargetPublicationState,
  createPendingTargetPublicationState,
  getProviderReconciliationDecision,
  hasConfirmedProviderPublication,
  getTargetPublicationState,
  getVideoRun,
  recordSuccessfulTargetUse,
  recordSuccessfulVideoUse,
  saveTargetPublicationState,
  saveVideoRun,
} from "./state";
import { resolveTargetsForPlatform, VIDEO_SOCIAL_TARGETS } from "./targets";
import type {
  SafeProviderError,
  SocialTarget,
  VideoAsset,
  VideoRunRecord,
  VideoTargetPublicationState,
} from "./types";
import { validateVideoSocialConfiguration } from "./validate";

export type VideoSocialCanaryIntent = {
  intent: string | undefined;
  assetId: string | undefined;
  platform: string | undefined;
  targetId: string | undefined;
};

type InstagramPublisher = (
  options: InstagramReelPublisherOptions
) => Promise<InstagramReelPublishResult>;
type FacebookPublisher = (
  options: FacebookReelPublisherOptions
) => Promise<FacebookReelPublishResult>;

export type LiveVideoSocialDependencies = {
  manifest?: readonly VideoAsset[];
  targets?: readonly SocialTarget[];
  environment?: EnvironmentSource;
  sourceCanaryEnabled?: boolean;
  now?: () => number;
  acquireLock?: (slot: string, owner: string) => Promise<boolean>;
  getRun?: (slot: string) => Promise<VideoRunRecord | null>;
  saveRun?: (record: VideoRunRecord) => Promise<unknown>;
  getPublicationState?: (
    runId: string,
    platform: MetaCanaryPlatform,
    targetId: string
  ) => Promise<VideoTargetPublicationState | null>;
  savePublicationState?: (
    state: VideoTargetPublicationState
  ) => Promise<unknown>;
  recordTargetSuccess?: (
    platform: MetaCanaryPlatform,
    targetId: string,
    videoId: string,
    successfulAtMs: number
  ) => Promise<unknown>;
  recordGlobalSuccess?: (
    videoId: string,
    successfulAtMs: number
  ) => Promise<unknown>;
  publishInstagram?: InstagramPublisher;
  publishFacebook?: FacebookPublisher;
};

export type LiveVideoSocialResult = {
  status: number;
  body: Record<string, unknown>;
};

function isMetaCanaryPlatform(value: string | undefined): value is MetaCanaryPlatform {
  return value === "instagram" || value === "facebook";
}

export function getVideoSocialCanarySlot(params: {
  platform: MetaCanaryPlatform;
  assetId: string;
  targetId: string;
}): string {
  return `canary:${params.platform}:${params.assetId}:${params.targetId}`;
}

export function getVideoSocialCanaryRunId(params: {
  platform: MetaCanaryPlatform;
  assetId: string;
  targetId: string;
}): string {
  return `video-canary:${params.platform}:${params.assetId}:${params.targetId}`;
}

function blocked(
  error: string,
  gate?: VideoSocialCanaryGateResult,
  status = 403,
  stateMutated = false
): LiveVideoSocialResult {
  return {
    status,
    body: {
      ok: false,
      mode: "live",
      intent: "canary",
      error,
      ...(gate ? { gate } : {}),
      providerCallsMade: false,
      publicationStateMutated: stateMutated,
    },
  };
}

function safePublicationSummary(state: VideoTargetPublicationState) {
  return {
    runId: state.runId,
    videoId: state.videoId,
    platform: state.platform,
    targetId: state.targetId,
    status: state.status,
    attempts: state.attempts,
    providerContainerId: state.providerContainerId ?? null,
    providerUploadId: state.providerUploadId ?? null,
    providerMediaId: state.providerMediaId ?? null,
    postId: state.postId ?? null,
    publishedAt: state.publishedAt ?? null,
    reconciliation: state.reconciliation ?? null,
    error: state.error ?? null,
  };
}

function createRunRecord(params: {
  runId: string;
  slot: string;
  assetId: string;
  platform: MetaCanaryPlatform;
  targetId: string;
  nowIso: string;
}): VideoRunRecord {
  return {
    runId: params.runId,
    slot: params.slot,
    videoId: params.assetId,
    intent: "canary",
    platform: params.platform,
    targetIds: [params.targetId],
    status: "planned",
    createdAt: params.nowIso,
    updatedAt: params.nowIso,
  };
}

/**
 * Executes only an explicitly bound, single-target Meta canary. The production
 * source switch is closed by default; tests may inject an open switch and fake
 * state/provider dependencies without weakening production behavior.
 */
export async function runLiveVideoSocialCanary(
  request: VideoSocialCanaryIntent,
  dependencies: LiveVideoSocialDependencies = {}
): Promise<LiveVideoSocialResult> {
  const environment = dependencies.environment ?? process.env;
  const manifest = dependencies.manifest ?? VIDEO_MANIFEST;
  const targets = dependencies.targets ?? VIDEO_SOCIAL_TARGETS;
  const sourceEnabled =
    dependencies.sourceCanaryEnabled ?? VIDEO_SOCIAL_CANARY_SOURCE_ENABLED;
  const mode = parseVideoSocialMode(environment.VIDEO_SOCIAL_MODE);

  if (!mode.valid || mode.mode !== "live") {
    return blocked("VIDEO_SOCIAL_MODE must be live");
  }
  const validation = validateVideoSocialConfiguration(manifest, targets);
  if (!validation.valid) {
    return blocked("video social configuration is invalid");
  }

  if (request.intent !== "canary") {
    return blocked("an explicit canary request is required", undefined, 501);
  }
  if (!request.assetId || !isMetaCanaryPlatform(request.platform) || !request.targetId) {
    return blocked("exact asset, Meta platform, and target are required");
  }

  const asset = manifest.find((candidate) => candidate.id === request.assetId);
  const target = targets.find((candidate) => candidate.id === request.targetId);
  if (!asset) return blocked("requested canary asset was not found");
  if (!target || (target.platform !== "instagram" && target.platform !== "facebook")) {
    return blocked("requested canary target was not found or is not a Meta target");
  }

  const resolvedTargets = resolveTargetsForPlatform(asset, request.platform, targets);
  const staticPreflight = preflightMetaVideoTarget({ asset, target, environment });
  const slot = getVideoSocialCanarySlot({
    platform: request.platform,
    assetId: request.assetId,
    targetId: request.targetId,
  });
  const runId = getVideoSocialCanaryRunId({
    platform: request.platform,
    assetId: request.assetId,
    targetId: request.targetId,
  });

  // Evaluate every non-Redis gate before touching shared state.
  const staticGate = evaluateVideoSocialCanaryGate({
    sourceEnabled,
    mode: mode.mode,
    requestIntent: request.intent,
    authorizationValue: environment[VIDEO_SOCIAL_CANARY_AUTHORIZATION_ENV],
    requestedAssetId: request.assetId,
    requestedPlatform: request.platform,
    requestedTargetId: request.targetId,
    asset,
    target,
    resolvedTargets,
    staticPreflight,
    redisLockAcquired: true,
    expectedRunId: runId,
    expectedSlot: slot,
    existingRun: null,
    redisReconciliationChecked: true,
    existingPublicationState: null,
  });
  if (!staticGate.allowed) {
    return blocked("video social canary gate is closed", staticGate);
  }

  const acquireLock = dependencies.acquireLock ?? acquireVideoSocialLock;
  const lockAcquired = await acquireLock(slot, runId);
  if (!lockAcquired) {
    return blocked("video social canary is already locked", undefined, 409);
  }

  const getRun = dependencies.getRun ?? getVideoRun;
  const saveRun = dependencies.saveRun ?? saveVideoRun;
  const getPublicationState =
    dependencies.getPublicationState ?? getTargetPublicationState;
  const savePublicationState =
    dependencies.savePublicationState ?? saveTargetPublicationState;
  const nowMs = dependencies.now?.() ?? Date.now();
  const nowIso = new Date(nowMs).toISOString();
  let run = await getRun(slot);
  let stateMutated = false;

  if (!run) {
    run = createRunRecord({
      runId,
      slot,
      assetId: asset.id,
      platform: request.platform,
      targetId: target.id,
      nowIso,
    });
    await saveRun(run);
    stateMutated = true;
  }

  let publicationState = await getPublicationState(runId, request.platform, target.id);
  const fullGate = evaluateVideoSocialCanaryGate({
    sourceEnabled,
    mode: mode.mode,
    requestIntent: request.intent,
    authorizationValue: environment[VIDEO_SOCIAL_CANARY_AUTHORIZATION_ENV],
    requestedAssetId: request.assetId,
    requestedPlatform: request.platform,
    requestedTargetId: request.targetId,
    asset,
    target,
    resolvedTargets,
    staticPreflight,
    redisLockAcquired: lockAcquired,
    expectedRunId: runId,
    expectedSlot: slot,
    existingRun: run,
    redisReconciliationChecked: true,
    existingPublicationState: publicationState,
  });

  if (publicationState?.status === "published") {
    const publishedAtMs = publicationState.publishedAt
      ? Date.parse(publicationState.publishedAt)
      : Number.NaN;
    const successfulAtMs = Number.isFinite(publishedAtMs) ? publishedAtMs : nowMs;
    const recordTargetSuccess =
      dependencies.recordTargetSuccess ?? recordSuccessfulTargetUse;
    const recordGlobalSuccess =
      dependencies.recordGlobalSuccess ?? recordSuccessfulVideoUse;
    // Sorted-set writes are idempotent and repair a run where provider success
    // was persisted but history/run finalization was interrupted.
    await recordTargetSuccess(request.platform, target.id, asset.id, successfulAtMs);
    await recordGlobalSuccess(asset.id, successfulAtMs);
    run = { ...run, status: "published", updatedAt: nowIso };
    await saveRun(run);
    return {
      status: 200,
      body: {
        ok: true,
        mode: "live",
        intent: "canary",
        alreadyPublished: true,
        publication: safePublicationSummary(publicationState),
        providerCallsMade: false,
        publicationStateMutated: true,
      },
    };
  }
  if (!fullGate.allowed) {
    return blocked(
      "video social canary reconciliation is not safe to continue",
      fullGate,
      409,
      stateMutated
    );
  }

  if (!publicationState) {
    publicationState = createPendingTargetPublicationState({
      runId,
      videoId: asset.id,
      platform: request.platform,
      targetId: target.id,
      now: nowIso,
    });
    await savePublicationState(publicationState);
    stateMutated = true;
  }

  run = { ...run, status: "publishing", updatedAt: nowIso };
  await saveRun(run);
  stateMutated = true;
  let latestState = publicationState;
  const onProgress = async (next: VideoTargetPublicationState) => {
    latestState = next;
    await savePublicationState(next);
  };

  try {
    const result =
      request.platform === "instagram"
        ? await (dependencies.publishInstagram ?? publishInstagramReel)({
            runId,
            asset,
            target,
            resumeState: latestState,
            environment,
            onProgress,
          })
        : await (dependencies.publishFacebook ?? publishFacebookReel)({
            runId,
            asset,
            target,
            resumeState: latestState,
            environment,
            onProgress,
          });

    latestState = result.state;
    if (!hasConfirmedProviderPublication(latestState)) {
      throw new TypeError("Meta publisher returned without a persisted published result");
    }
    await savePublicationState(latestState);
    const recordTargetSuccess =
      dependencies.recordTargetSuccess ?? recordSuccessfulTargetUse;
    const recordGlobalSuccess =
      dependencies.recordGlobalSuccess ?? recordSuccessfulVideoUse;
    // Target history advances only for this published target. Global history
    // advances after the first successful authorized target publication.
    const publishedAtMs = latestState.publishedAt
      ? Date.parse(latestState.publishedAt)
      : Number.NaN;
    const successfulAtMs = Number.isFinite(publishedAtMs) ? publishedAtMs : nowMs;
    await recordTargetSuccess(request.platform, target.id, asset.id, successfulAtMs);
    await recordGlobalSuccess(asset.id, successfulAtMs);
    run = { ...run, status: "published", updatedAt: nowIso };
    await saveRun(run);

    return {
      status: 200,
      body: {
        ok: true,
        mode: "live",
        intent: "canary",
        publication: safePublicationSummary(latestState),
        providerCallsMade: true,
        publicationStateMutated: true,
      },
    };
  } catch (error) {
    const secret = target.accessTokenEnv
      ? environment[target.accessTokenEnv] ?? ""
      : "";
    const safeError: SafeProviderError = toSafeProviderError(
      error,
      request.platform,
      "publish_reel",
      [secret]
    );

    // Preserve an ambiguous publishing state so a retry cannot repeat the
    // non-idempotent Instagram media_publish call.
    if (
      !latestState.error &&
      getProviderReconciliationDecision(latestState) !== "reconcile_ambiguous_publish"
    ) {
      latestState = advanceTargetPublicationState(latestState, {
        status: "failed",
        error: safeError,
        updatedAt: nowIso,
      });
      await savePublicationState(latestState);
    }
    run = { ...run, status: "failed", updatedAt: nowIso };
    await saveRun(run);

    return {
      status: 502,
      body: {
        ok: false,
        mode: "live",
        intent: "canary",
        error: safeError,
        publication: safePublicationSummary(latestState),
        providerCallsMade: true,
        publicationStateMutated: true,
      },
    };
  }
}
