import { getProviderReconciliationDecision } from "./state";
import type { MetaVideoPreflightResult } from "./preflight";
import type {
  SocialTarget,
  VideoAsset,
  VideoRunRecord,
  VideoSocialMode,
  VideoTargetPublicationState,
} from "./types";
import { getVideoTargetContent } from "./targets";

export type MetaCanaryPlatform = "instagram" | "facebook";

/**
 * A later, explicitly authorized canary must deliberately change this one
 * source-level switch. Environment configuration alone cannot open the gate.
 */
export const VIDEO_SOCIAL_CANARY_SOURCE_ENABLED = true;
export const VIDEO_SOCIAL_CANARY_ASSET_ID = "0817";
export const VIDEO_SOCIAL_CANARY_AUTHORIZATION_ENV = "VIDEO_SOCIAL_CANARY";

export function expectedCanaryAuthorization(params: {
  platform: MetaCanaryPlatform;
  targetId: string;
}): string {
  return `${params.platform}:${VIDEO_SOCIAL_CANARY_ASSET_ID}:${params.targetId}`;
}

export type VideoSocialCanaryGateResult = {
  allowed: boolean;
  checks: {
    sourceEnabled: boolean;
    liveMode: boolean;
    explicitRequestIntent: boolean;
    explicitAuthorization: boolean;
    exactAsset: boolean;
    exactPlatform: boolean;
    exactTarget: boolean;
    singleResolvedTarget: boolean;
    assetAndPlatformEnabled: boolean;
    staticPreflightPassed: boolean;
    redisLockAcquired: boolean;
    redisRunIdentityMatches: boolean;
    redisReconciliationChecked: boolean;
    redisStateIdentityMatches: boolean;
    noExistingPublishedState: boolean;
    reconciliationSafe: boolean;
  };
  errors: string[];
};

/**
 * Pure, closed Phase 2B gate. It never reads Redis or credentials itself: the
 * future live orchestrator must supply the exact resolved target, static
 * preflight, and Redis-backed reconciliation result before calling it.
 */
export function evaluateVideoSocialCanaryGate(params: {
  sourceEnabled?: boolean;
  mode: VideoSocialMode;
  requestIntent: string | undefined;
  authorizationValue: string | undefined;
  requestedAssetId: string;
  requestedPlatform: MetaCanaryPlatform;
  requestedTargetId: string;
  asset: VideoAsset;
  target: SocialTarget;
  resolvedTargets: readonly SocialTarget[];
  staticPreflight: MetaVideoPreflightResult;
  redisLockAcquired: boolean;
  expectedRunId: string;
  expectedSlot: string;
  existingRun?: VideoRunRecord | null;
  redisReconciliationChecked: boolean;
  existingPublicationState?: VideoTargetPublicationState | null;
}): VideoSocialCanaryGateResult {
  const state = params.existingPublicationState;
  const reconciliation = getProviderReconciliationDecision(state);
  const sourceEnabled =
    params.sourceEnabled ?? VIDEO_SOCIAL_CANARY_SOURCE_ENABLED;
  const targetContent =
    params.requestedPlatform === "instagram"
      ? getVideoTargetContent(params.asset, "instagram", params.requestedTargetId)
      : getVideoTargetContent(params.asset, "facebook", params.requestedTargetId);
  const stateIdentityMatches =
    !state ||
    (state.runId === params.expectedRunId &&
      state.videoId === params.asset.id &&
      state.platform === params.requestedPlatform &&
      state.targetId === params.requestedTargetId);
  const checks = {
    sourceEnabled,
    liveMode: params.mode === "live",
    explicitRequestIntent: params.requestIntent === "canary",
    explicitAuthorization:
      params.authorizationValue ===
      expectedCanaryAuthorization({
        platform: params.requestedPlatform,
        targetId: params.requestedTargetId,
      }),
    exactAsset:
      params.requestedAssetId === VIDEO_SOCIAL_CANARY_ASSET_ID &&
      params.asset.id === VIDEO_SOCIAL_CANARY_ASSET_ID,
    exactPlatform:
      params.target.platform === params.requestedPlatform &&
      params.staticPreflight.platform === params.requestedPlatform,
    exactTarget:
      params.target.id === params.requestedTargetId &&
      params.staticPreflight.targetId === params.requestedTargetId,
    singleResolvedTarget:
      params.resolvedTargets.length === 1 &&
      params.resolvedTargets[0]?.id === params.requestedTargetId,
    assetAndPlatformEnabled:
      params.asset.enabled && Boolean(targetContent?.enabled),
    staticPreflightPassed: params.staticPreflight.valid,
    redisLockAcquired: params.redisLockAcquired,
    redisRunIdentityMatches:
      !params.existingRun ||
      (params.existingRun.runId === params.expectedRunId &&
        params.existingRun.slot === params.expectedSlot &&
        params.existingRun.videoId === params.asset.id &&
        params.existingRun.intent === "canary" &&
        params.existingRun.platform === params.requestedPlatform &&
        params.existingRun.targetIds.length === 1 &&
        params.existingRun.targetIds[0] === params.requestedTargetId),
    redisReconciliationChecked: params.redisReconciliationChecked,
    redisStateIdentityMatches: stateIdentityMatches,
    noExistingPublishedState: state?.status !== "published",
    reconciliationSafe: reconciliation !== "reconcile_ambiguous_publish",
  };

  const labels: Record<keyof typeof checks, string> = {
    sourceEnabled: "Phase 2B canary execution is closed in source",
    liveMode: "VIDEO_SOCIAL_MODE must be live",
    explicitRequestIntent: "an explicit canary request is required",
    explicitAuthorization: "exact canary authorization is missing",
    exactAsset: "canary asset must be exactly 0817",
    exactPlatform: "requested platform must match the Meta target and preflight",
    exactTarget: "requested target must match the resolved target and preflight",
    singleResolvedTarget: "exactly one resolved target is required",
    assetAndPlatformEnabled: "asset and selected platform must be explicitly enabled",
    staticPreflightPassed: "static Meta preflight must pass",
    redisLockAcquired: "the Redis canary lock was not acquired",
    redisRunIdentityMatches: "the Redis run does not match this canary request",
    redisReconciliationChecked: "Redis reconciliation state must be checked",
    redisStateIdentityMatches: "Redis publication state does not match the canary",
    noExistingPublishedState: "the target is already published",
    reconciliationSafe: "provider state requires reconciliation or is already published",
  };

  const errors = (Object.keys(checks) as Array<keyof typeof checks>)
    .filter((key) => !checks[key])
    .map((key) => labels[key]);

  return {
    allowed: errors.length === 0,
    checks,
    errors,
  };
}
