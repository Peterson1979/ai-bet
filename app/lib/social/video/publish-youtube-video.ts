import type { YouTubePrivacyStatus } from "./config";
import {
  assertYouTubeVideoPreflight,
  preflightYouTubeVideoTarget,
  readYouTubeTargetCredentials,
  type EnvironmentSource,
} from "./preflight";
import {
  advanceTargetPublicationState,
  createPendingTargetPublicationState,
} from "./state";
import { getVideoTargetContent } from "./targets";
import type {
  ProviderProgressHook,
  SocialTarget,
  VideoAsset,
  VideoTargetPublicationState,
} from "./types";
import type { FetchLike } from "./youtube-auth";
import {
  initiateYouTubeResumableUpload,
  refreshYouTubeAccessToken,
  SafeYouTubeRequestError,
  toSafeYouTubeProviderError,
  uploadYouTubeVideoBody,
  type SleepFunction,
} from "./youtube-request";

export type YouTubeVideoUploadSource =
  | { kind: "hosted-url" }
  | { kind: "stream"; body: BodyInit; fileSize?: number };

export type YouTubeVideoPublisherOptions = {
  runId: string;
  asset: VideoAsset;
  target: SocialTarget;
  resumeState?: VideoTargetPublicationState | null;
  uploadSource?: YouTubeVideoUploadSource;
  environment?: EnvironmentSource;
  fetchFn?: FetchLike;
  sleep?: SleepFunction;
  onProgress?: ProviderProgressHook;
  privacyStatus?: YouTubePrivacyStatus;
  categoryId?: string;
  timeoutMs?: number;
  allowDisabled?: boolean;
};

export type YouTubeVideoPublishResult = {
  videoId: string;
  resumed: boolean;
  state: VideoTargetPublicationState;
};

function validateResumeIdentity(
  state: VideoTargetPublicationState,
  options: YouTubeVideoPublisherOptions
) {
  if (
    state.runId !== options.runId ||
    state.videoId !== options.asset.id ||
    state.platform !== "youtube" ||
    state.targetId !== options.target.id
  ) {
    throw new TypeError("YouTube resume state does not match this publication");
  }
}

export async function publishYouTubeVideo(
  options: YouTubeVideoPublisherOptions
): Promise<YouTubeVideoPublishResult> {
  const environment = options.environment ?? process.env;
  const preflight = preflightYouTubeVideoTarget({
    asset: options.asset,
    target: options.target,
    environment,
    allowDisabled: options.allowDisabled,
  });
  assertYouTubeVideoPreflight(preflight);

  const credentials = readYouTubeTargetCredentials(options.target, environment);
  const targetContent = getVideoTargetContent(
    options.asset,
    "youtube",
    options.target.id
  );
  if (!targetContent) {
    throw new TypeError("YouTube target content is missing");
  }

  const secrets = [
    credentials.clientSecret,
    credentials.refreshToken,
  ];

  const onProgress = options.onProgress ?? (() => {});
  const fetchFn = options.fetchFn ?? globalThis.fetch;

  let state =
    options.resumeState ??
    createPendingTargetPublicationState({
      runId: options.runId,
      videoId: options.asset.id,
      platform: "youtube",
      targetId: options.target.id,
    });

  validateResumeIdentity(state, options);

  if (state.status === "published" && state.postId) {
    return {
      videoId: state.postId,
      resumed: true,
      state,
    };
  }

  try {
    // 1. Obtain a fresh access token using the refresh token
    const tokenResponse = await refreshYouTubeAccessToken({
      clientId: credentials.clientId,
      clientSecret: credentials.clientSecret,
      refreshToken: credentials.refreshToken,
      fetchFn,
    });
    const accessToken = tokenResponse.access_token;
    secrets.push(accessToken);

    // 2. Initiate resumable upload session if not already created
    let uploadUrl = state.providerUploadUrl;
    if (!uploadUrl) {
      state = advanceTargetPublicationState(state, {
        status: "container_created",
        attempts: state.attempts + 1,
      });
      await onProgress(state);

      const session = await initiateYouTubeResumableUpload({
        accessToken,
        metadata: {
          snippet: {
            title: targetContent.title,
            description: targetContent.description,
            tags: targetContent.tags ?? [],
            categoryId: options.categoryId ?? "17", // Default 17 = Sports
          },
          status: {
            privacyStatus: options.privacyStatus ?? "private",
            selfDeclaredMadeForKids: false,
          },
        },
        fetchFn,
        secrets,
        timeoutMs: options.timeoutMs,
      });

      uploadUrl = session.uploadUrl;
      state = advanceTargetPublicationState(state, {
        status: "container_created",
        providerUploadUrl: uploadUrl,
      });
      await onProgress(state);
    }

    // 3. Acquire video binary payload
    let videoBody: BodyInit;
    let videoSize: number | undefined;

    if (options.uploadSource?.kind === "stream") {
      videoBody = options.uploadSource.body;
      videoSize = options.uploadSource.fileSize;
    } else {
      const sourceResponse = await fetchFn(options.asset.sourceUrl);
      if (!sourceResponse.ok) {
        throw new SafeYouTubeRequestError({
          provider: "youtube",
          operation: "fetch_source_video",
          message: `Failed to fetch video source from ${options.asset.sourceUrl} (HTTP ${sourceResponse.status})`,
          retryable: false,
        });
      }

      const contentLengthHeader = sourceResponse.headers.get("content-length");
      if (contentLengthHeader) {
        const parsed = parseInt(contentLengthHeader, 10);
        if (Number.isFinite(parsed) && parsed > 0) {
          videoSize = parsed;
        }
      }

      // Read arrayBuffer for reliable transmission
      const buffer = await sourceResponse.arrayBuffer();
      videoBody = buffer;
      if (!videoSize) {
        videoSize = buffer.byteLength;
      }
    }

    // 4. Upload video body to YouTube resumable upload URL
    state = advanceTargetPublicationState(state, {
      status: "publishing",
    });
    await onProgress(state);

    const uploadResult = await uploadYouTubeVideoBody({
      uploadUrl,
      videoBody,
      videoSize,
      fetchFn,
      secrets,
      timeoutMs: options.timeoutMs,
    });

    const videoId = uploadResult.id!;
    const publishedAt =
      uploadResult.snippet?.publishedAt || new Date().toISOString();

    state = advanceTargetPublicationState(state, {
      status: "published",
      postId: videoId,
      providerResourceId: videoId,
      providerMediaId: videoId,
      publishedAt,
      error: null,
    });
    await onProgress(state);

    return {
      videoId,
      resumed: false,
      state,
    };
  } catch (error) {
    const safeError = toSafeYouTubeProviderError(
      error,
      "publish_youtube_video",
      secrets
    );

    state = advanceTargetPublicationState(state, {
      status: "failed",
      error: safeError,
    });
    await onProgress(state);

    if (error instanceof SafeYouTubeRequestError) {
      throw error;
    }
    throw new SafeYouTubeRequestError(safeError);
  }
}
