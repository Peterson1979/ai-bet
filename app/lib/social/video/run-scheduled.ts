import { VIDEO_SOCIAL_COOLDOWN_MS, parseVideoSocialMode } from "./config";
import { VIDEO_MANIFEST } from "./manifest";
import { toSafeProviderError } from "./meta-request";
import { preflightMetaVideoTarget, type EnvironmentSource } from "./preflight";
import { publishFacebookReel } from "./publish-facebook-reel";
import { publishInstagramReel } from "./publish-instagram-reel";
import { selectLeastRecentlyUsedVideo } from "./select-video";
import {
  acquireVideoSocialLock,
  advanceTargetPublicationState,
  createPendingTargetPublicationState,
  getProviderReconciliationDecision,
  getTargetPublicationState,
  getVideoRun,
  readVideoLastSuccessHistory,
  recordSuccessfulTargetUse,
  recordSuccessfulVideoUse,
  saveTargetPublicationState,
  saveVideoRun,
} from "./state";
import { resolveVideoTargets, VIDEO_SOCIAL_TARGETS } from "./targets";
import type {
  SafeProviderError,
  SocialTarget,
  VideoAsset,
  VideoLastSuccessHistory,
  VideoRunRecord,
  VideoTargetPublicationState,
} from "./types";
import { validateVideoSocialConfiguration } from "./validate";

type MetaPlatform = "instagram" | "facebook";
type MetaTarget = SocialTarget & { platform: MetaPlatform };

export type ScheduledVideoSocialDependencies = {
  manifest?: readonly VideoAsset[];
  targets?: readonly SocialTarget[];
  environment?: EnvironmentSource;
  now?: () => number;
  readHistory?: (videoIds: readonly string[]) => Promise<VideoLastSuccessHistory>;
  acquireLock?: (slot: string, owner: string) => Promise<boolean>;
  getRun?: (slot: string) => Promise<VideoRunRecord | null>;
  saveRun?: (record: VideoRunRecord) => Promise<unknown>;
  getPublicationState?: (
    runId: string,
    platform: MetaPlatform,
    targetId: string
  ) => Promise<VideoTargetPublicationState | null>;
  savePublicationState?: (state: VideoTargetPublicationState) => Promise<unknown>;
  recordTargetSuccess?: (
    platform: MetaPlatform,
    targetId: string,
    videoId: string,
    successfulAtMs: number
  ) => Promise<unknown>;
  recordGlobalSuccess?: (videoId: string, successfulAtMs: number) => Promise<unknown>;
  publishInstagram?: typeof publishInstagramReel;
  publishFacebook?: typeof publishFacebookReel;
};

export type ScheduledVideoSocialResult = {
  status: number;
  body: Record<string, unknown>;
};

const ACTIVE_RUN_SLOT = "scheduled:active";

function metaTargetsForAsset(
  asset: VideoAsset,
  targets: readonly SocialTarget[]
): MetaTarget[] {
  const resolved = resolveVideoTargets(asset, targets);
  return [...resolved.instagram, ...resolved.facebook] as MetaTarget[];
}

function summary(state: VideoTargetPublicationState) {
  return {
    targetId: state.targetId,
    platform: state.platform,
    status: state.status,
    providerContainerId: state.providerContainerId ?? null,
    providerUploadId: state.providerUploadId ?? null,
    providerMediaId: state.providerMediaId ?? null,
    publishedAt: state.publishedAt ?? null,
    error: state.error ?? null,
  };
}

export async function runScheduledVideoSocial(
  dependencies: ScheduledVideoSocialDependencies = {}
): Promise<ScheduledVideoSocialResult> {
  const environment = dependencies.environment ?? process.env;
  const manifest = dependencies.manifest ?? VIDEO_MANIFEST;
  const targets = dependencies.targets ?? VIDEO_SOCIAL_TARGETS;
  const mode = parseVideoSocialMode(environment.VIDEO_SOCIAL_MODE);
  if (!mode.valid || mode.mode !== "live") {
    return { status: 503, body: { ok: false, mode: "live", error: "VIDEO_SOCIAL_MODE must be live", providerCallsMade: false } };
  }

  const validation = validateVideoSocialConfiguration(manifest, targets);
  if (!validation.valid) {
    return { status: 500, body: { ok: false, mode: "live", error: "video social configuration is invalid", providerCallsMade: false } };
  }

  const nowMs = dependencies.now?.() ?? Date.now();
  const day = new Date(nowMs).toISOString().slice(0, 10);
  const lockSlot = `scheduled:${day}`;
  const acquireLock = dependencies.acquireLock ?? acquireVideoSocialLock;
  const lockOwner = `video-scheduled:${day}`;
  if (!(await acquireLock(lockSlot, lockOwner))) {
    return { status: 409, body: { ok: false, mode: "live", intent: "scheduled", error: "scheduled video social run is already locked", providerCallsMade: false } };
  }

  const getRun = dependencies.getRun ?? getVideoRun;
  const saveRun = dependencies.saveRun ?? saveVideoRun;
  let run = await getRun(ACTIVE_RUN_SLOT);
  let asset: VideoAsset | undefined;
  let selectedTargets: MetaTarget[] = [];

  if (run && run.intent === "scheduled" && run.status !== "published") {
    asset = manifest.find((candidate) => candidate.id === run!.videoId);
    if (asset) {
      const enabled = new Map(metaTargetsForAsset(asset, targets).map((target) => [target.id, target]));
      selectedTargets = run.targetIds.flatMap((targetId) => {
        const target = enabled.get(targetId);
        return target ? [target] : [];
      });
    }
    if (!asset || selectedTargets.length !== run.targetIds.length) {
      return { status: 409, body: { ok: false, mode: "live", intent: "scheduled", error: "incomplete scheduled run no longer matches enabled targets", providerCallsMade: false } };
    }
  } else {
    const eligibleManifest = manifest.filter(
      (candidate) => candidate.enabled && metaTargetsForAsset(candidate, targets).length > 0
    );
    const readHistory = dependencies.readHistory ?? readVideoLastSuccessHistory;
    const history = await readHistory(eligibleManifest.map((candidate) => candidate.id));
    const selection = selectLeastRecentlyUsedVideo(eligibleManifest, history, {
      nowMs,
      cooldownMs: VIDEO_SOCIAL_COOLDOWN_MS,
    });
    if (selection.status !== "selected") {
      return { status: 200, body: { ok: true, mode: "live", intent: "scheduled", selection: selection.status, providerCallsMade: false } };
    }
    asset = selection.asset;
    selectedTargets = metaTargetsForAsset(asset, targets);
    const runId = `video-scheduled:${day}:${asset.id}`;
    const nowIso = new Date(nowMs).toISOString();
    run = {
      runId,
      slot: ACTIVE_RUN_SLOT,
      videoId: asset.id,
      intent: "scheduled",
      platform: "multi",
      targetIds: selectedTargets.map((target) => target.id),
      status: "planned",
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    await saveRun(run);
  }

  // Re-run fail-closed credential/copy preflight on both new runs and resumes.
  const invalidPreflight = selectedTargets
    .map((target) => preflightMetaVideoTarget({ asset: asset!, target, environment }))
    .filter((result) => !result.valid);
  if (invalidPreflight.length) {
    return { status: 503, body: { ok: false, mode: "live", intent: "scheduled", error: "scheduled Meta target preflight failed", preflight: invalidPreflight, providerCallsMade: false } };
  }

  const getPublicationState = dependencies.getPublicationState ?? getTargetPublicationState;
  const savePublicationState = dependencies.savePublicationState ?? saveTargetPublicationState;
  const recordTargetSuccess = dependencies.recordTargetSuccess ?? recordSuccessfulTargetUse;
  const nowIso = new Date(nowMs).toISOString();
  run = { ...run, status: "publishing", updatedAt: nowIso };
  await saveRun(run);

  const results = await Promise.all(
    selectedTargets.map(async (target) => {
      let state = await getPublicationState(run!.runId, target.platform, target.id);
      if (state?.status === "published") {
        const timestamp = state.publishedAt ? Date.parse(state.publishedAt) : nowMs;
        await recordTargetSuccess(target.platform, target.id, asset!.id, Number.isFinite(timestamp) ? timestamp : nowMs);
        return { ok: true as const, state, providerCalled: false };
      }
      if (!state) {
        state = createPendingTargetPublicationState({
          runId: run!.runId,
          videoId: asset!.id,
          platform: target.platform,
          targetId: target.id,
          now: nowIso,
        });
        await savePublicationState(state);
      }
      let latest = state;
      const onProgress = async (next: VideoTargetPublicationState) => {
        latest = next;
        await savePublicationState(next);
      };
      try {
        const published = target.platform === "instagram"
          ? await (dependencies.publishInstagram ?? publishInstagramReel)({ runId: run!.runId, asset: asset!, target, resumeState: latest, environment, onProgress })
          : await (dependencies.publishFacebook ?? publishFacebookReel)({ runId: run!.runId, asset: asset!, target, resumeState: latest, environment, onProgress });
        latest = published.state;
        if (latest.status !== "published" || !latest.providerMediaId) {
          throw new TypeError("Meta publisher returned without a published provider ID");
        }
        await savePublicationState(latest);
        const timestamp = latest.publishedAt ? Date.parse(latest.publishedAt) : nowMs;
        await recordTargetSuccess(target.platform, target.id, asset!.id, Number.isFinite(timestamp) ? timestamp : nowMs);
        return { ok: true as const, state: latest, providerCalled: true };
      } catch (error) {
        const token = target.accessTokenEnv ? environment[target.accessTokenEnv] ?? "" : "";
        const safeError: SafeProviderError = toSafeProviderError(error, target.platform, "publish_reel", [token]);
        if (!latest.error && getProviderReconciliationDecision(latest) !== "reconcile_ambiguous_publish") {
          latest = advanceTargetPublicationState(latest, { status: "failed", error: safeError, updatedAt: nowIso });
          await savePublicationState(latest);
        }
        return { ok: false as const, state: latest, providerCalled: true };
      }
    })
  );

  const successful = results.filter((result) => result.ok);
  if (successful.length > 0) {
    const timestamps = successful.map((result) => {
      const parsed = result.state.publishedAt ? Date.parse(result.state.publishedAt) : nowMs;
      return Number.isFinite(parsed) ? parsed : nowMs;
    });
    await (dependencies.recordGlobalSuccess ?? recordSuccessfulVideoUse)(asset.id, Math.max(...timestamps));
  }
  const status = successful.length === results.length
    ? "published"
    : successful.length > 0
      ? "partially_published"
      : "failed";
  run = { ...run, status, updatedAt: new Date(dependencies.now?.() ?? Date.now()).toISOString() };
  await saveRun(run);

  return {
    status: status === "published" ? 200 : status === "partially_published" ? 207 : 502,
    body: {
      ok: status === "published",
      mode: "live",
      intent: "scheduled",
      runId: run.runId,
      videoId: asset.id,
      status,
      publications: results.map((result) => summary(result.state)),
      providerCallsMade: results.some((result) => result.providerCalled),
      publicationStateMutated: true,
    },
  };
}
