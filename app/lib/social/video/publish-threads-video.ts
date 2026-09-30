import {
  ProviderPollingTimeoutError,
  requestMetaJson,
  SafeProviderRequestError,
  THREADS_GRAPH_BASE,
  toSafeProviderError,
  type FetchLike,
  type SleepFunction,
  defaultSleep,
} from "./meta-request";
import {
  assertThreadsVideoPreflight,
  preflightThreadsVideoTarget,
  readThreadsTargetCredentials,
  type EnvironmentSource,
} from "./preflight";
import {
  advanceTargetPublicationState,
  createPendingTargetPublicationState,
} from "./state";
import { getVideoTargetContent } from "./targets";
import { formatThreadsVideoCaption, validateThreadsCaption } from "./threads-caption";
import type {
  ProviderProgressHook,
  SocialTarget,
  ThreadsContainerStatus,
  VideoAsset,
  VideoTargetPublicationState,
} from "./types";

export type ThreadsContainerResponse = { id?: string };
export type ThreadsStatusResponse = {
  id?: string;
  status?: string;
  error_message?: string;
};
export type ThreadsPublishResponse = { id?: string };

export const THREADS_DEFAULT_MAX_POLL_ATTEMPTS = 5;
export const THREADS_DEFAULT_POLL_INTERVAL_MS = 30_000;
export const THREADS_MAX_POLL_ATTEMPTS = 6;
export const THREADS_MAX_POLL_INTERVAL_MS = 60_000;
export const THREADS_MAX_REQUEST_TIMEOUT_MS = 15_000;

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

export type ThreadsVideoPublisherOptions = {
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
  requestTimeoutMs?: number;
  allowDisabled?: boolean;
};

export type ThreadsVideoPublishResult = {
  videoId: string;
  resumed: boolean;
  state: VideoTargetPublicationState;
};

function validateResumeIdentity(
  state: VideoTargetPublicationState,
  options: ThreadsVideoPublisherOptions
) {
  if (
    state.runId !== options.runId ||
    state.videoId !== options.asset.id ||
    state.platform !== "threads" ||
    state.targetId !== options.target.id
  ) {
    throw new TypeError("Threads resume state does not match this publication");
  }
}

function normalizeStatus(value: string | undefined): ThreadsContainerStatus {
  const status = (value ?? "").trim().toUpperCase();
  if (
    status === "PUBLISHED" ||
    status === "FINISHED" ||
    status === "IN_PROGRESS" ||
    status === "ERROR" ||
    status === "EXPIRED"
  ) {
    return status;
  }
  return "UNKNOWN";
}

export async function publishThreadsVideo(
  options: ThreadsVideoPublisherOptions
): Promise<ThreadsVideoPublishResult> {
  const environment = options.environment ?? process.env;
  const preflight = preflightThreadsVideoTarget({
    asset: options.asset,
    target: options.target,
    environment,
    allowDisabled: options.allowDisabled,
  });
  assertThreadsVideoPreflight(preflight);

  const credentials = readThreadsTargetCredentials(options.target, environment);
  const targetContent = getVideoTargetContent(
    options.asset,
    "threads",
    options.target.id
  );

  let caption = targetContent?.caption ?? "";
  if (!caption.trim()) {
    caption = formatThreadsVideoCaption({
      caption: options.asset.platforms.instagram?.targets[0]?.caption,
      message: options.asset.platforms.facebook?.targets[0]?.message,
    });
  }

  const captionValidation = validateThreadsCaption(caption);
  if (!captionValidation.valid) {
    throw new TypeError(
      `Threads caption validation failed: ${captionValidation.errors.join("; ")}`
    );
  }

  const secrets = [credentials.accessToken];
  const onProgress = options.onProgress ?? (() => {});
  const fetchFn = options.fetchFn ?? globalThis.fetch;
  const sleep = options.sleep ?? defaultSleep;
  const maxPollAttempts = boundedInteger(
    options.maxPollAttempts,
    THREADS_DEFAULT_MAX_POLL_ATTEMPTS,
    THREADS_MAX_POLL_ATTEMPTS
  );
  const pollIntervalMs = boundedDelay(
    options.pollIntervalMs,
    THREADS_DEFAULT_POLL_INTERVAL_MS,
    THREADS_MAX_POLL_INTERVAL_MS
  );
  const requestTimeoutMs = boundedDelay(
    options.requestTimeoutMs,
    THREADS_MAX_REQUEST_TIMEOUT_MS,
    THREADS_MAX_REQUEST_TIMEOUT_MS
  );

  let state =
    options.resumeState ??
    createPendingTargetPublicationState({
      runId: options.runId,
      videoId: options.asset.id,
      platform: "threads",
      targetId: options.target.id,
    });

  if (options.resumeState) {
    validateResumeIdentity(options.resumeState, options);
  }

  if (state.status === "published") {
    return { videoId: options.asset.id, resumed: true, state };
  }

  const commit = async (
    update: Parameters<typeof advanceTargetPublicationState>[1]
  ) => {
    state = advanceTargetPublicationState(state, update);
    await onProgress(state);
    return state;
  };

  try {
    let containerId = state.providerContainerId ?? null;

    // STEP A: Create Threads media container
    if (!containerId) {
      await commit({ status: "container_created", attempts: state.attempts + 1 });

      const body = new URLSearchParams({
        media_type: "VIDEO",
        video_url: options.asset.sourceUrl,
        text: caption,
        access_token: credentials.accessToken,
      });

      const response = await requestMetaJson<ThreadsContainerResponse>({
        provider: "threads",
        operation: "create_container",
        url: `${THREADS_GRAPH_BASE}/${credentials.accountId}/threads`,
        init: {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        },
        secrets,
        timeoutMs: requestTimeoutMs,
        fetchFn,
        sleep,
      });

      if (!response.id || typeof response.id !== "string") {
        throw new SafeProviderRequestError({
          provider: "threads",
          operation: "create_container",
          message: "Threads create container returned without a container ID",
          retryable: false,
        });
      }

      containerId = response.id;
      await commit({
        status: "processing",
        providerContainerId: containerId,
        providerResourceId: containerId,
      });
    }

    // STEP B: Poll container processing status
    if (state.status === "processing" || state.status === "container_created") {
      let isReady = false;

      for (let attempt = 1; attempt <= maxPollAttempts; attempt++) {
        if (attempt > 1 && pollIntervalMs > 0) {
          await sleep(pollIntervalMs);
        }

        const statusResponse = await requestMetaJson<ThreadsStatusResponse>({
          provider: "threads",
          operation: "container_status",
          url: `${THREADS_GRAPH_BASE}/${containerId}?fields=status,error_message&access_token=${encodeURIComponent(
            credentials.accessToken
          )}`,
          init: { method: "GET" },
          secrets,
          timeoutMs: requestTimeoutMs,
          fetchFn,
          sleep,
        });

        const providerStatus = normalizeStatus(statusResponse.status);

        if (providerStatus === "FINISHED" || providerStatus === "PUBLISHED") {
          isReady = true;
          await commit({
            status: "ready",
            providerContainerId: containerId,
          });
          break;
        }

        if (providerStatus === "ERROR" || providerStatus === "EXPIRED") {
          throw new SafeProviderRequestError({
            provider: "threads",
            operation: "container_status",
            message: `Threads video processing failed: ${statusResponse.error_message || providerStatus}`,
            retryable: false,
          });
        }
      }

      if (!isReady) {
        throw new ProviderPollingTimeoutError(
          "threads",
          "container_status",
          maxPollAttempts
        );
      }
    }

    // STEP C: Publish Threads media container
    await commit({ status: "publishing" });

    const publishBody = new URLSearchParams({
      creation_id: containerId!,
      access_token: credentials.accessToken,
    });

    const publishResponse = await requestMetaJson<ThreadsPublishResponse>({
      provider: "threads",
      operation: "publish_container",
      url: `${THREADS_GRAPH_BASE}/${credentials.accountId}/threads_publish`,
      init: {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: publishBody.toString(),
      },
      secrets,
      timeoutMs: requestTimeoutMs,
      fetchFn,
      sleep,
    });

    if (!publishResponse.id || typeof publishResponse.id !== "string") {
      throw new SafeProviderRequestError({
        provider: "threads",
        operation: "publish_container",
        message: "Threads publish returned without a media ID",
        retryable: false,
      });
    }

    const postId = publishResponse.id;
    const nowIso = new Date().toISOString();

    state = await commit({
      status: "published",
      providerMediaId: postId,
      postId,
      publishedAt: nowIso,
      error: null,
    });

    return {
      videoId: options.asset.id,
      resumed: Boolean(options.resumeState),
      state,
    };
  } catch (error) {
    const safeError = toSafeProviderError(error, "threads", state.status, secrets);
    state = await commit({
      status: "failed",
      error: safeError,
    });
    throw error instanceof SafeProviderRequestError
      ? error
      : new SafeProviderRequestError(safeError);
  }
}
