import {
  META_GRAPH_BASE,
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
  ProviderProgressHook,
  SocialTarget,
  VideoAsset,
  VideoTargetPublicationState,
} from "./types";

type FacebookStartResponse = { video_id?: string; upload_url?: string };
type FacebookFinishResponse = { success?: boolean; video_id?: string };
type FacebookVideoStatusResponse = {
  status?:
    | string
    | {
        video_status?: string;
        uploading_phase?: { status?: string; errors?: unknown[] };
        processing_phase?: { status?: string; errors?: unknown[] };
        publishing_phase?: { status?: string; errors?: unknown[] };
      };
};

export type FacebookReelUploadSource =
  | { kind: "hosted-url" }
  | { kind: "stream"; body: BodyInit; fileSize: number; offset?: number };

export type FacebookReelPublisherOptions = {
  runId: string;
  asset: VideoAsset;
  target: SocialTarget;
  resumeState?: VideoTargetPublicationState | null;
  /** Required only when resuming a container_created upload session. */
  resumeUploadUrl?: string;
  uploadSource?: FacebookReelUploadSource;
  environment?: EnvironmentSource;
  fetchFn?: FetchLike;
  sleep?: SleepFunction;
  onProgress?: ProviderProgressHook;
  maxPollAttempts?: number;
  pollIntervalMs?: number;
  requestTimeoutMs?: number;
};

export type FacebookReelPublishResult = {
  videoId: string;
  resumed: boolean;
  state: VideoTargetPublicationState;
};

function contractError(operation: string, message: string) {
  return new SafeProviderRequestError({
    provider: "facebook",
    operation,
    message,
    retryable: false,
  });
}

function validateResumeIdentity(
  state: VideoTargetPublicationState,
  options: FacebookReelPublisherOptions
) {
  if (
    state.runId !== options.runId ||
    state.videoId !== options.asset.id ||
    state.platform !== "facebook" ||
    state.targetId !== options.target.id
  ) {
    throw new TypeError("Facebook resume state does not match this publication");
  }
}

function normalizePhaseStatus(value: string | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

function inspectFacebookStatus(payload: FacebookVideoStatusResponse) {
  if (typeof payload.status === "string") {
    const status = normalizePhaseStatus(payload.status);
    return {
      published: status === "published" || status === "complete",
      failed: status === "error" || status === "failed",
    };
  }

  const status = payload.status;
  const uploading = normalizePhaseStatus(status?.uploading_phase?.status);
  const processing = normalizePhaseStatus(status?.processing_phase?.status);
  const publishing = normalizePhaseStatus(status?.publishing_phase?.status);
  const videoStatus = normalizePhaseStatus(status?.video_status);
  const phases = [uploading, processing, publishing, videoStatus];

  return {
    published:
      publishing === "complete" ||
      publishing === "published" ||
      videoStatus === "published",
    failed:
      phases.some((phase) => phase === "error" || phase === "failed") ||
      Boolean(
        status?.uploading_phase?.errors?.length ||
          status?.processing_phase?.errors?.length ||
          status?.publishing_phase?.errors?.length
      ),
  };
}

export async function publishFacebookReel(
  options: FacebookReelPublisherOptions
): Promise<FacebookReelPublishResult> {
  if (options.target.platform !== "facebook") {
    throw new TypeError("Facebook Reel publisher requires a Facebook target");
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
    "facebook",
    options.target.id
  );
  if (!targetContent) {
    throw new TypeError("exact Facebook target content is missing");
  }
  const { accountId, accessToken } = readMetaTargetCredentials(
    options.target,
    environment
  );

  const fetchFn = options.fetchFn ?? globalThis.fetch;
  const sleep = options.sleep ?? defaultSleep;
  const maxPollAttempts = Math.max(1, options.maxPollAttempts ?? 20);
  const pollIntervalMs = Math.max(0, options.pollIntervalMs ?? 3_000);
  const requestTimeoutMs = Math.max(1, options.requestTimeoutMs ?? 15_000);
  const graphAuthorization = { Authorization: `Bearer ${accessToken}` };
  const uploadAuthorization = { Authorization: `OAuth ${accessToken}` };

  let state =
    options.resumeState ??
    createPendingTargetPublicationState({
      runId: options.runId,
      videoId: options.asset.id,
      platform: "facebook",
      targetId: options.target.id,
    });
  if (options.resumeState) validateResumeIdentity(state, options);

  const reconciliation = getProviderReconciliationDecision(state);
  if (reconciliation === "already_published") {
    const videoId = state.providerMediaId ?? state.providerUploadId ?? state.postId;
    if (!videoId) {
      throw contractError(
        "reconcile_publication",
        "published Facebook state is missing its video ID"
      );
    }
    return { videoId, resumed: true, state };
  }

  const emit = async (
    update: Parameters<typeof advanceTargetPublicationState>[1]
  ) => {
    state = advanceTargetPublicationState(state, update);
    await options.onProgress?.(state);
  };

  let videoId =
    state.providerUploadId ?? state.providerMediaId ?? state.providerResourceId ?? null;
  let uploadUrl = options.resumeUploadUrl ?? state.providerUploadUrl ?? null;
  const resumed = Boolean(videoId);

  if (!videoId) {
    const startBody = new URLSearchParams({ upload_phase: "start" });
    const started = await requestMetaJson<FacebookStartResponse>({
      fetchFn,
      sleep,
      provider: "facebook",
      operation: "start_reel_upload",
      url: `${META_GRAPH_BASE}/${encodeURIComponent(accountId)}/video_reels`,
      init: {
        method: "POST",
        headers: {
          ...graphAuthorization,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: startBody.toString(),
      },
      secrets: [accessToken],
      timeoutMs: requestTimeoutMs,
      maxAttempts: 1,
    });
    if (!started.video_id || !started.upload_url) {
      throw contractError(
        "start_reel_upload",
        "Facebook Reel upload initialization returned incomplete session data"
      );
    }
    videoId = started.video_id;
    uploadUrl = started.upload_url;
    await emit({
      status: "container_created",
      attempts: state.attempts + 1,
      providerResourceId: videoId,
      providerUploadId: videoId,
      providerUploadUrl: uploadUrl,
      error: null,
    });
  }

  const needsUpload =
    state.status === "pending" ||
    state.status === "container_created" ||
    (state.status === "failed" && state.error?.operation === "upload_reel_video");
  if (needsUpload) {
    if (!uploadUrl) {
      throw contractError(
        "resume_reel_upload",
        "Facebook upload session exists but its upload URL is unavailable; do not initialize a duplicate"
      );
    }

    const uploadSource = options.uploadSource ?? { kind: "hosted-url" as const };
    const uploadHeaders: Record<string, string> = { ...uploadAuthorization };
    let uploadBody: BodyInit | undefined;

    if (uploadSource.kind === "hosted-url") {
      uploadHeaders.file_url = options.asset.sourceUrl;
    } else {
      if (!Number.isFinite(uploadSource.fileSize) || uploadSource.fileSize <= 0) {
        throw new TypeError("stream upload fileSize must be a positive number");
      }
      uploadHeaders.offset = String(uploadSource.offset ?? 0);
      uploadHeaders.file_size = String(uploadSource.fileSize);
      uploadBody = uploadSource.body;
    }

    const uploadInit: RequestInit & { duplex?: "half" } = {
      method: "POST",
      headers: uploadHeaders,
      ...(uploadBody !== undefined ? { body: uploadBody } : {}),
    };
    if (
      uploadSource.kind === "stream" &&
      typeof ReadableStream !== "undefined" &&
      uploadBody instanceof ReadableStream
    ) {
      uploadInit.duplex = "half";
    }

    try {
      await requestMetaJson<Record<string, unknown>>({
        fetchFn,
        sleep,
        provider: "facebook",
        operation: "upload_reel_video",
        url: uploadUrl,
        init: uploadInit,
        secrets: [accessToken, uploadUrl],
        timeoutMs: requestTimeoutMs,
        maxAttempts: 2,
      });
      await emit({
        status: "processing",
        attempts: state.attempts + 1,
        error: null,
      });
    } catch (error) {
      await emit({
        status: "failed",
        error: toSafeProviderError(error, "facebook", "upload_reel_video", [
          accessToken,
          uploadUrl,
        ]),
      });
      throw error;
    }
  }

  const finishAlreadyRequested =
    state.status === "publishing" ||
    (state.status === "failed" && state.error?.operation === "check_reel_status");
  if (!finishAlreadyRequested) {
    await emit({ status: "ready", error: null });
    await emit({ status: "publishing", error: null });
    const finishBody = new URLSearchParams({
      upload_phase: "finish",
      video_id: videoId,
      video_state: "PUBLISHED",
      description: targetContent.message,
    });

    try {
      const finished = await requestMetaJson<FacebookFinishResponse>({
        fetchFn,
        sleep,
        provider: "facebook",
        operation: "finish_reel_publish",
        url: `${META_GRAPH_BASE}/${encodeURIComponent(accountId)}/video_reels`,
        init: {
          method: "POST",
          headers: {
            ...graphAuthorization,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: finishBody.toString(),
        },
        secrets: [accessToken],
        timeoutMs: requestTimeoutMs,
        maxAttempts: 1,
      });
      if (finished.success === false) {
        throw contractError(
          "finish_reel_publish",
          "Facebook rejected Reel publication finalization"
        );
      }
      await emit({ attempts: state.attempts + 1, status: "publishing" });
    } catch (error) {
      const safeError = toSafeProviderError(
        error,
        "facebook",
        "finish_reel_publish",
        [accessToken]
      );
      await emit({ status: "publishing", error: safeError });
      throw error;
    }
  }

  for (let pollAttempt = 1; pollAttempt <= maxPollAttempts; pollAttempt++) {
    if (pollAttempt > 1 && pollIntervalMs > 0) await sleep(pollIntervalMs);

    try {
      const statusPayload = await requestMetaJson<FacebookVideoStatusResponse>({
        fetchFn,
        sleep,
        provider: "facebook",
        operation: "check_reel_status",
        url: `${META_GRAPH_BASE}/${encodeURIComponent(videoId)}?fields=status`,
        init: { method: "GET", headers: graphAuthorization },
        secrets: [accessToken],
        timeoutMs: requestTimeoutMs,
        maxAttempts: 2,
      });
      const inspected = inspectFacebookStatus(statusPayload);

      if (inspected.failed) {
        throw contractError(
          "check_reel_status",
          "Facebook Reel entered a failed processing or publishing state"
        );
      }
      if (inspected.published) {
        const publishedAt = new Date().toISOString();
        await emit({
          status: "published",
          attempts: state.attempts + 1,
          providerMediaId: videoId,
          postId: videoId,
          publishedAt,
          error: null,
        });
        return { videoId, resumed, state };
      }

      await emit({
        status: "publishing",
        attempts: state.attempts + 1,
        error: null,
      });
    } catch (error) {
      const safeError = toSafeProviderError(error, "facebook", "check_reel_status", [
        accessToken,
      ]);
      await emit({ status: "failed", attempts: state.attempts + 1, error: safeError });
      throw error;
    }
  }

  const timeoutError = new ProviderPollingTimeoutError(
    "facebook",
    "Reel publishing",
    maxPollAttempts
  );
  await emit({ status: "publishing", error: timeoutError.details });
  throw timeoutError;
}
