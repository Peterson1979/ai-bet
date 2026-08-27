import {
  META_GRAPH_BASE,
  INSTAGRAM_LOGIN_GRAPH_BASE,
  ProviderPollingTimeoutError,
  requestMetaJson,
  SafeProviderRequestError,
  toSafeProviderError,
  type FetchLike,
  type SleepFunction,
  defaultSleep,
} from "./meta-request";
import {
  assertMetaVideoPreflight,
  preflightMetaVideoTarget,
  readMetaTargetCredentials,
  type EnvironmentSource,
} from "./preflight";
import {
  advanceTargetPublicationState,
  createPendingTargetPublicationState,
  getProviderReconciliationDecision,
} from "./state";
import { getVideoTargetContent } from "./targets";
import type {
  InstagramContainerStatus,
  ProviderProgressHook,
  SocialTarget,
  VideoAsset,
  VideoTargetPublicationState,
} from "./types";

type InstagramContainerResponse = { id?: string };
type InstagramStatusResponse = {
  status_code?: string;
  status?: string;
};
type InstagramPublishResponse = { id?: string };
type InstagramRecentMediaResponse = {
  data?: Array<{
    id?: string;
    caption?: string;
    timestamp?: string;
    media_type?: string;
    media_product_type?: string;
  }>;
};

/**
 * Meta recommends checking an Instagram container about once per minute for no
 * more than five minutes. Four checks (the first immediately, then three at
 * 60-second intervals) leave headroom inside this route's 300-second runtime
 * for bounded provider requests and the final publish call.
 */
export const INSTAGRAM_REEL_DEFAULT_MAX_POLL_ATTEMPTS = 4;
export const INSTAGRAM_REEL_DEFAULT_POLL_INTERVAL_MS = 60_000;
export const INSTAGRAM_REEL_DEFAULT_RECONCILIATION_POLL_ATTEMPTS = 2;
const INSTAGRAM_REEL_MAX_POLL_ATTEMPTS = 4;
const INSTAGRAM_REEL_MAX_RECONCILIATION_POLL_ATTEMPTS = 5;
const INSTAGRAM_REEL_MAX_POLL_INTERVAL_MS = 60_000;
const INSTAGRAM_REEL_MAX_REQUEST_TIMEOUT_MS = 10_000;
const INSTAGRAM_REEL_RECENT_MEDIA_LIMIT = 25;
const INSTAGRAM_REEL_RECONCILIATION_CLOCK_SKEW_MS = 5 * 60 * 1000;

function boundedInteger(
  value: number | undefined,
  fallback: number,
  maximum: number
): number {
  if (value === undefined) return fallback;
  if (!Number.isFinite(value)) return fallback;
  return Math.min(maximum, Math.max(1, Math.trunc(value)));
}

function boundedDelay(
  value: number | undefined,
  fallback: number,
  maximum: number
): number {
  if (value === undefined) return fallback;
  if (!Number.isFinite(value)) return fallback;
  return Math.min(maximum, Math.max(0, Math.trunc(value)));
}

export type InstagramReelPublisherOptions = {
  runId: string;
  asset: VideoAsset;
  target: SocialTarget;
  resumeState?: VideoTargetPublicationState | null;
  environment?: EnvironmentSource;
  fetchFn?: FetchLike;
  sleep?: SleepFunction;
  onProgress?: ProviderProgressHook;
  maxPollAttempts?: number;
  pollIntervalMs?: number;
  reconciliationMaxPollAttempts?: number;
  requestTimeoutMs?: number;
};

export type InstagramReelPublishResult = {
  containerId: string;
  mediaId: string | null;
  resumed: boolean;
  state: VideoTargetPublicationState;
};

export function getInstagramGraphBase(target: SocialTarget): string {
  return target.instagramApiMode === "instagram-login"
    ? INSTAGRAM_LOGIN_GRAPH_BASE
    : META_GRAPH_BASE;
}

function contractError(operation: string, message: string) {
  return new SafeProviderRequestError({
    provider: "instagram",
    operation,
    message,
    retryable: false,
  });
}

function normalizeContainerStatus(
  response: InstagramStatusResponse
): InstagramContainerStatus {
  const status = (response.status_code ?? "UNKNOWN").toUpperCase();
  return status === "PUBLISHED" ||
    status === "FINISHED" ||
    status === "IN_PROGRESS" ||
    status === "ERROR" ||
    status === "EXPIRED"
    ? status
    : "UNKNOWN";
}

function reconciliationError(status: InstagramContainerStatus) {
  return new SafeProviderRequestError({
    provider: "instagram",
    operation: "reconcile_publication",
    message: `Instagram container reconciliation returned ${status}`,
    retryable: status === "IN_PROGRESS" || status === "FINISHED",
  });
}

function findMatchingRecentReel(
  response: InstagramRecentMediaResponse,
  caption: string,
  createdAt: string
) {
  const createdAtMs = Date.parse(createdAt);
  const earliestMatchMs = Number.isFinite(createdAtMs)
    ? createdAtMs - INSTAGRAM_REEL_RECONCILIATION_CLOCK_SKEW_MS
    : Number.POSITIVE_INFINITY;

  return (response.data ?? [])
    .flatMap((media) => {
      const timestampMs = media.timestamp ? Date.parse(media.timestamp) : NaN;
      const isReel =
        (!media.media_type || media.media_type.toUpperCase() === "VIDEO") &&
        (!media.media_product_type ||
          media.media_product_type.toUpperCase() === "REELS");
      return media.id &&
        media.caption?.trim() === caption.trim() &&
        Number.isFinite(timestampMs) &&
        timestampMs >= earliestMatchMs &&
        isReel
        ? [{ id: media.id, timestamp: media.timestamp!, timestampMs }]
        : [];
    })
    .sort((left, right) => right.timestampMs - left.timestampMs)[0];
}

function validateResumeIdentity(
  state: VideoTargetPublicationState,
  options: InstagramReelPublisherOptions
) {
  if (
    state.runId !== options.runId ||
    state.videoId !== options.asset.id ||
    state.platform !== "instagram" ||
    state.targetId !== options.target.id
  ) {
    throw new TypeError("Instagram resume state does not match this publication");
  }
}

export async function publishInstagramReel(
  options: InstagramReelPublisherOptions
): Promise<InstagramReelPublishResult> {
  if (options.target.platform !== "instagram") {
    throw new TypeError("Instagram Reel publisher requires an Instagram target");
  }

  const environment = options.environment ?? process.env;
  const preflight = preflightMetaVideoTarget({
    asset: options.asset,
    target: options.target,
    environment,
  });
  assertMetaVideoPreflight(preflight);
  const targetContent = getVideoTargetContent(
    options.asset,
    "instagram",
    options.target.id
  );
  if (!targetContent) {
    throw new TypeError("exact Instagram target content is missing");
  }

  const { accountId, accessToken } = readMetaTargetCredentials(
    options.target,
    environment
  );
  const fetchFn = options.fetchFn ?? globalThis.fetch;
  const sleep = options.sleep ?? defaultSleep;
  const maxPollAttempts = boundedInteger(
    options.maxPollAttempts,
    INSTAGRAM_REEL_DEFAULT_MAX_POLL_ATTEMPTS,
    INSTAGRAM_REEL_MAX_POLL_ATTEMPTS
  );
  const reconciliationMaxPollAttempts = boundedInteger(
    options.reconciliationMaxPollAttempts,
    INSTAGRAM_REEL_DEFAULT_RECONCILIATION_POLL_ATTEMPTS,
    INSTAGRAM_REEL_MAX_RECONCILIATION_POLL_ATTEMPTS
  );
  const pollIntervalMs = boundedDelay(
    options.pollIntervalMs,
    INSTAGRAM_REEL_DEFAULT_POLL_INTERVAL_MS,
    INSTAGRAM_REEL_MAX_POLL_INTERVAL_MS
  );
  const requestTimeoutMs = boundedInteger(
    options.requestTimeoutMs,
    INSTAGRAM_REEL_MAX_REQUEST_TIMEOUT_MS,
    INSTAGRAM_REEL_MAX_REQUEST_TIMEOUT_MS
  );
  const authorization = { Authorization: `Bearer ${accessToken}` };
  const graphBase = getInstagramGraphBase(options.target);

  let state =
    options.resumeState ??
    createPendingTargetPublicationState({
      runId: options.runId,
      videoId: options.asset.id,
      platform: "instagram",
      targetId: options.target.id,
    });
  if (options.resumeState) validateResumeIdentity(state, options);

  const emit = async (
    update: Parameters<typeof advanceTargetPublicationState>[1]
  ) => {
    state = advanceTargetPublicationState(state, update);
    await options.onProgress?.(state);
  };

  let containerId = state.providerContainerId ?? state.providerResourceId ?? null;
  const resumed = Boolean(containerId);

  const reconcileSubmittedPublication = async (): Promise<InstagramReelPublishResult> => {
    if (!containerId) {
      throw contractError(
        "reconcile_publication",
        "ambiguous Instagram publish state is missing its container ID"
      );
    }

    for (
      let checkAttempt = 1;
      checkAttempt <= reconciliationMaxPollAttempts;
      checkAttempt++
    ) {
      if (checkAttempt > 1 && pollIntervalMs > 0) await sleep(pollIntervalMs);

      let statusCode: InstagramContainerStatus;
      try {
        const status = await requestMetaJson<InstagramStatusResponse>({
          fetchFn,
          sleep,
          provider: "instagram",
          operation: "reconcile_reel_publication",
          url: `${graphBase}/${encodeURIComponent(
            containerId
          )}?fields=status_code,status`,
          init: { method: "GET", headers: authorization },
          secrets: [accessToken],
          timeoutMs: requestTimeoutMs,
          maxAttempts: 1,
        });
        statusCode = normalizeContainerStatus(status);
      } catch (error) {
        const safeError = toSafeProviderError(
          error,
          "instagram",
          "reconcile_reel_publication",
          [accessToken]
        );
        await emit({
          status: "publishing",
          attempts: state.attempts + 1,
          reconciliation: {
            operation: "instagram_container_status",
            providerStatus: "UNKNOWN",
            checkedAt: new Date().toISOString(),
            statusChecks: checkAttempt,
            recentMediaLookup: "not_attempted",
          },
          error: safeError,
        });
        throw error;
      }

      const checkedAt = new Date().toISOString();
      const reconciliation = {
        operation: "instagram_container_status" as const,
        providerStatus: statusCode,
        checkedAt,
        statusChecks: checkAttempt,
        recentMediaLookup: "not_attempted" as const,
      };
      if (statusCode === "PUBLISHED") {
        const publishedAt = state.publishedAt ?? checkedAt;
        await emit({
          status: "published",
          attempts: state.attempts + 1,
          publishedAt,
          reconciliation,
          error: null,
        });
        return {
          containerId,
          mediaId: state.providerMediaId ?? state.postId ?? null,
          resumed: true,
          state,
        };
      }

      if (statusCode === "FINISHED") {
        const recentMediaUrl = new URL(
          `${graphBase}/${encodeURIComponent(accountId)}/media`
        );
        recentMediaUrl.searchParams.set(
          "fields",
          "id,caption,timestamp,media_type,media_product_type"
        );
        recentMediaUrl.searchParams.set(
          "limit",
          String(INSTAGRAM_REEL_RECENT_MEDIA_LIMIT)
        );

        let recentMedia: InstagramRecentMediaResponse;
        try {
          recentMedia = await requestMetaJson<InstagramRecentMediaResponse>({
            fetchFn,
            sleep,
            provider: "instagram",
            operation: "reconcile_recent_media",
            url: recentMediaUrl.toString(),
            init: { method: "GET", headers: authorization },
            secrets: [accessToken],
            timeoutMs: requestTimeoutMs,
            maxAttempts: 1,
          });
        } catch (error) {
          const safeError = toSafeProviderError(
            error,
            "instagram",
            "reconcile_recent_media",
            [accessToken]
          );
          await emit({
            status: "publishing",
            attempts: state.attempts + 1,
            reconciliation: {
              ...reconciliation,
              recentMediaLookup: "failed",
            },
            error: safeError,
          });
          throw error;
        }

        const matchedMedia = findMatchingRecentReel(
          recentMedia,
          targetContent.caption,
          state.createdAt
        );
        const recentMediaLookup = matchedMedia ? "matched" : "not_found";
        const reconciled = { ...reconciliation, recentMediaLookup } as const;
        if (matchedMedia) {
          await emit({
            status: "published",
            attempts: state.attempts + 1,
            providerMediaId: matchedMedia.id,
            postId: matchedMedia.id,
            publishedAt: matchedMedia.timestamp,
            reconciliation: reconciled,
            error: null,
          });
          return {
            containerId,
            mediaId: matchedMedia.id,
            resumed: true,
            state,
          };
        }

        const error = reconciliationError(statusCode);
        await emit({
          status: "publishing",
          attempts: state.attempts + 1,
          reconciliation: reconciled,
          error: error.details,
        });
        throw error;
      }

      if (
        statusCode === "IN_PROGRESS" &&
        checkAttempt < reconciliationMaxPollAttempts
      ) {
        await emit({
          status: "publishing",
          attempts: state.attempts + 1,
          reconciliation,
          error: null,
        });
        continue;
      }

      const error = reconciliationError(statusCode);
      await emit({
        status: "publishing",
        attempts: state.attempts + 1,
        reconciliation,
        error: error.details,
      });
      throw error;
    }

    throw reconciliationError("UNKNOWN");
  };

  const reconciliation = getProviderReconciliationDecision(state);
  if (reconciliation === "already_published") {
    const mediaId = state.providerMediaId ?? state.postId;
    if (
      !containerId ||
      (!mediaId && state.reconciliation?.providerStatus !== "PUBLISHED")
    ) {
      throw contractError(
        "reconcile_publication",
        "published Instagram state is missing provider IDs"
      );
    }
    return { containerId, mediaId: mediaId ?? null, resumed: true, state };
  }
  if (reconciliation === "reconcile_ambiguous_publish") {
    return reconcileSubmittedPublication();
  }

  if (!containerId) {
    const body = new URLSearchParams({
      media_type: "REELS",
      video_url: options.asset.sourceUrl,
      caption: targetContent.caption,
    });
    const created = await requestMetaJson<InstagramContainerResponse>({
      fetchFn,
      sleep,
      provider: "instagram",
      operation: "create_reel_container",
      url: `${graphBase}/${encodeURIComponent(accountId)}/media`,
      init: {
        method: "POST",
        headers: {
          ...authorization,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      },
      secrets: [accessToken],
      timeoutMs: requestTimeoutMs,
      maxAttempts: 1,
    });
    if (!created.id) {
      throw contractError(
        "create_reel_container",
        "Instagram container creation returned no ID"
      );
    }
    containerId = created.id;
    await emit({
      status: "container_created",
      attempts: state.attempts + 1,
      providerResourceId: containerId,
      providerContainerId: containerId,
      error: null,
    });
  }

  let ready = state.status === "ready";
  if (!ready) {
    for (let pollAttempt = 1; pollAttempt <= maxPollAttempts; pollAttempt++) {
      if (pollAttempt > 1 && pollIntervalMs > 0) await sleep(pollIntervalMs);

      try {
        const status = await requestMetaJson<InstagramStatusResponse>({
          fetchFn,
          sleep,
          provider: "instagram",
          operation: "check_reel_container",
          url: `${graphBase}/${encodeURIComponent(
            containerId
          )}?fields=status_code,status`,
          init: { method: "GET", headers: authorization },
          secrets: [accessToken],
          timeoutMs: requestTimeoutMs,
          maxAttempts: 2,
        });
        const statusCode = (status.status_code ?? status.status ?? "").toUpperCase();

        if (statusCode === "FINISHED") {
          await emit({
            status: "ready",
            attempts: state.attempts + 1,
            error: null,
          });
          ready = true;
          break;
        }
        if (statusCode === "PUBLISHED") {
          throw contractError(
            "reconcile_publication",
            "Instagram container is already published but its media ID is unknown"
          );
        }
        if (statusCode === "ERROR" || statusCode === "EXPIRED") {
          throw contractError(
            "check_reel_container",
            `Instagram Reel container entered ${statusCode.toLowerCase()} state`
          );
        }

        await emit({
          status: "processing",
          attempts: state.attempts + 1,
          error: null,
        });
      } catch (error) {
        const safeError = toSafeProviderError(
          error,
          "instagram",
          "check_reel_container",
          [accessToken]
        );
        await emit({
          status: safeError.operation === "reconcile_publication" ? "publishing" : "failed",
          attempts: state.attempts + 1,
          error: safeError,
        });
        throw error;
      }
    }
  }

  if (!ready) {
    const timeoutError = new ProviderPollingTimeoutError(
      "instagram",
      "Reel processing",
      maxPollAttempts
    );
    await emit({
      status: "processing",
      error: timeoutError.details,
    });
    throw timeoutError;
  }

  await emit({ status: "publishing", error: null });
  try {
    const body = new URLSearchParams({ creation_id: containerId });
    const published = await requestMetaJson<InstagramPublishResponse>({
      fetchFn,
      sleep,
      provider: "instagram",
      operation: "publish_reel",
      url: `${graphBase}/${encodeURIComponent(accountId)}/media_publish`,
      init: {
        method: "POST",
        headers: {
          ...authorization,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      },
      secrets: [accessToken],
      timeoutMs: requestTimeoutMs,
      maxAttempts: 1,
    });
    if (!published.id) {
      throw contractError("publish_reel", "Instagram Reel publish returned no media ID");
    }

    const publishedAt = new Date().toISOString();
    await emit({
      status: "published",
      attempts: state.attempts + 1,
      providerMediaId: published.id,
      postId: published.id,
      publishedAt,
      error: null,
    });
    return { containerId, mediaId: published.id, resumed, state };
  } catch (error) {
    const safeError = toSafeProviderError(error, "instagram", "publish_reel", [
      accessToken,
    ]);
    await emit({ status: "publishing", error: safeError });
    if (safeError.httpStatus === undefined) {
      return reconcileSubmittedPublication();
    }
    throw error;
  }
}
