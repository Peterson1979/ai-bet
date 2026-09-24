import {
  refreshYouTubeAccessToken as authRefreshYouTubeAccessToken,
  redactYouTubeSecrets,
  GOOGLE_OAUTH_TOKEN_URL,
  YOUTUBE_CHANNELS_API_URL,
  type FetchLike,
  type YouTubeTokenResponse,
} from "./youtube-auth";
import type { SafeProviderError } from "./types";

export const YOUTUBE_DATA_API_BASE = "https://www.googleapis.com/youtube/v3";
export const YOUTUBE_UPLOAD_API_BASE =
  "https://www.googleapis.com/upload/youtube/v3";

export type SleepFunction = (delayMs: number) => Promise<void>;
export const defaultSleep: SleepFunction = (delayMs) =>
  new Promise((resolve) => setTimeout(resolve, delayMs));

export class SafeYouTubeRequestError extends Error {
  readonly details: SafeProviderError;

  constructor(details: SafeProviderError) {
    super(details.message);
    this.name = "SafeYouTubeRequestError";
    this.details = details;
  }
}

export type YouTubeVideoSnippet = {
  title: string;
  description: string;
  tags?: string[];
  categoryId?: string;
  defaultLanguage?: string;
  defaultAudioLanguage?: string;
};

export type YouTubeVideoStatus = {
  privacyStatus: "private" | "unlisted" | "public";
  selfDeclaredMadeForKids?: boolean;
  publishAt?: string;
};

export type YouTubeVideoInsertMetadata = {
  snippet: YouTubeVideoSnippet;
  status: YouTubeVideoStatus;
};

export type YouTubeVideoInsertResponse = {
  kind?: string;
  etag?: string;
  id?: string;
  snippet?: {
    publishedAt?: string;
    channelId?: string;
    title?: string;
    description?: string;
    thumbnails?: Record<string, { url: string; width: number; height: number }>;
    channelTitle?: string;
    tags?: string[];
    categoryId?: string;
  };
  status?: {
    uploadStatus?: string;
    privacyStatus?: string;
    license?: string;
    embeddable?: boolean;
    publicStatsViewable?: boolean;
    madeForKids?: boolean;
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function toSafeYouTubeProviderError(
  error: unknown,
  operation: string,
  secrets: readonly string[] = []
): SafeProviderError {
  if (error instanceof SafeYouTubeRequestError) {
    return error.details;
  }

  const rawMessage =
    error instanceof Error ? error.message : "YouTube provider request failed";

  return {
    provider: "youtube",
    operation,
    message: redactYouTubeSecrets(rawMessage, secrets),
    retryable: false,
  };
}

function normalizeYouTubeErrorPayload(params: {
  operation: string;
  httpStatus: number;
  payload: unknown;
  secrets: readonly string[];
}): SafeProviderError {
  const { operation, httpStatus, payload, secrets } = params;

  let rawMessage = `YouTube request failed with HTTP ${httpStatus}`;
  let code: string | number | undefined;

  if (isRecord(payload)) {
    if (isRecord(payload.error)) {
      if (typeof payload.error.message === "string") {
        rawMessage = payload.error.message;
      }
      if (
        typeof payload.error.code === "string" ||
        typeof payload.error.code === "number"
      ) {
        code = payload.error.code;
      }
    } else if (typeof payload.error_description === "string") {
      rawMessage = payload.error_description;
    } else if (typeof payload.error === "string") {
      rawMessage = payload.error;
    } else if (typeof payload.message === "string") {
      rawMessage = payload.message;
    }
  }

  return {
    provider: "youtube",
    operation,
    message: redactYouTubeSecrets(rawMessage, secrets),
    httpStatus,
    ...(code ? { code } : {}),
    retryable: httpStatus === 429 || httpStatus >= 500,
  };
}

export async function refreshYouTubeAccessToken(params: {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  fetchFn?: FetchLike;
}): Promise<YouTubeTokenResponse> {
  try {
    return await authRefreshYouTubeAccessToken({
      clientId: params.clientId,
      clientSecret: params.clientSecret,
      refreshToken: params.refreshToken,
      fetchFn: params.fetchFn,
    });
  } catch (error) {
    const secrets = [params.clientSecret, params.refreshToken];
    throw new SafeYouTubeRequestError(
      toSafeYouTubeProviderError(error, "refresh_access_token", secrets)
    );
  }
}

export type YouTubeRequestOptions = {
  fetchFn?: FetchLike;
  sleep?: SleepFunction;
  operation: string;
  url: string;
  init: RequestInit;
  secrets?: readonly string[];
  timeoutMs?: number;
  maxAttempts?: number;
  retryDelayMs?: number;
};

export async function requestYouTubeJson<T>(
  options: YouTubeRequestOptions
): Promise<T> {
  const fetchFn = options.fetchFn ?? globalThis.fetch;
  const sleep = options.sleep ?? defaultSleep;
  const maxAttempts = Math.max(1, options.maxAttempts ?? 1);
  const timeoutMs = Math.max(1, options.timeoutMs ?? 20_000);
  const retryDelayMs = Math.max(0, options.retryDelayMs ?? 500);
  const secrets = options.secrets ?? [];

  let finalError: SafeYouTubeRequestError | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetchFn(options.url, {
        ...options.init,
        signal: controller.signal,
      });

      const text = await response.text();
      let payload: unknown;
      try {
        payload = text ? JSON.parse(text) : {};
      } catch {
        payload = { message: text };
      }

      if (response.ok) {
        return payload as T;
      }

      finalError = new SafeYouTubeRequestError(
        normalizeYouTubeErrorPayload({
          operation: options.operation,
          httpStatus: response.status,
          payload,
          secrets,
        })
      );
    } catch (error) {
      if (error instanceof SafeYouTubeRequestError) {
        finalError = error;
      } else {
        const timedOut = controller.signal.aborted;
        finalError = new SafeYouTubeRequestError({
          provider: "youtube",
          operation: options.operation,
          message: timedOut
            ? `YouTube ${options.operation} request timed out`
            : redactYouTubeSecrets(
                error instanceof Error ? error.message : "YouTube request failed",
                secrets
              ),
          retryable: true,
        });
      }
    } finally {
      clearTimeout(timeout);
    }

    if (!finalError.details.retryable || attempt === maxAttempts) {
      throw finalError;
    }
    await sleep(retryDelayMs * attempt);
  }

  throw (
    finalError ??
    new SafeYouTubeRequestError({
      provider: "youtube",
      operation: options.operation,
      message: `YouTube ${options.operation} request failed`,
      retryable: false,
    })
  );
}

/**
 * Initiates a resumable upload session for a YouTube video.
 * Endpoint: POST https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status
 * Returns the resumable upload URL from the Location response header.
 */
export async function initiateYouTubeResumableUpload(params: {
  accessToken: string;
  metadata: YouTubeVideoInsertMetadata;
  fetchFn?: FetchLike;
  secrets?: readonly string[];
  timeoutMs?: number;
}): Promise<{ uploadUrl: string }> {
  const fetchFn = params.fetchFn ?? globalThis.fetch;
  const secrets = params.secrets ?? [params.accessToken];
  const url = `${YOUTUBE_UPLOAD_API_BASE}/videos?uploadType=resumable&part=snippet,status`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), params.timeoutMs ?? 15_000);

  try {
    const response = await fetchFn(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${params.accessToken.trim()}`,
        "Content-Type": "application/json; charset=UTF-8",
        "X-Upload-Content-Type": "video/mp4",
        Accept: "application/json",
      },
      body: JSON.stringify(params.metadata),
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text();
      let payload: unknown;
      try {
        payload = text ? JSON.parse(text) : {};
      } catch {
        payload = { message: text };
      }

      throw new SafeYouTubeRequestError(
        normalizeYouTubeErrorPayload({
          operation: "initiate_resumable_upload",
          httpStatus: response.status,
          payload,
          secrets,
        })
      );
    }

    const uploadUrl = response.headers.get("Location") || response.headers.get("location");
    if (!uploadUrl || !uploadUrl.trim()) {
      throw new SafeYouTubeRequestError({
        provider: "youtube",
        operation: "initiate_resumable_upload",
        message: "YouTube upload session creation returned no Location header",
        retryable: false,
      });
    }

    return { uploadUrl: uploadUrl.trim() };
  } catch (error) {
    if (error instanceof SafeYouTubeRequestError) throw error;
    throw new SafeYouTubeRequestError(
      toSafeYouTubeProviderError(error, "initiate_resumable_upload", secrets)
    );
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Uploads MP4 video bytes to the YouTube resumable upload URL.
 * Endpoint: PUT <uploadUrl>
 * Returns the created YouTubeVideoInsertResponse.
 */
export async function uploadYouTubeVideoBody(params: {
  uploadUrl: string;
  videoBody: BodyInit;
  videoSize?: number;
  fetchFn?: FetchLike;
  secrets?: readonly string[];
  timeoutMs?: number;
}): Promise<YouTubeVideoInsertResponse> {
  const fetchFn = params.fetchFn ?? globalThis.fetch;
  const secrets = params.secrets ?? [];

  const headers: Record<string, string> = {
    "Content-Type": "video/mp4",
    Accept: "application/json",
  };
  if (params.videoSize && params.videoSize > 0) {
    headers["Content-Length"] = String(params.videoSize);
  }

  const controller = new AbortController();
  // Video uploads can take longer; allow up to 120s by default
  const timeout = setTimeout(() => controller.abort(), params.timeoutMs ?? 120_000);

  try {
    const response = await fetchFn(params.uploadUrl, {
      method: "PUT",
      headers,
      body: params.videoBody,
      signal: controller.signal,
    });

    const text = await response.text();
    let payload: unknown;
    try {
      payload = text ? JSON.parse(text) : {};
    } catch {
      payload = { message: text };
    }

    if (!response.ok && response.status !== 201) {
      throw new SafeYouTubeRequestError(
        normalizeYouTubeErrorPayload({
          operation: "upload_video_content",
          httpStatus: response.status,
          payload,
          secrets,
        })
      );
    }

    const data = payload as YouTubeVideoInsertResponse;
    if (!data || typeof data !== "object" || !data.id) {
      throw new SafeYouTubeRequestError({
        provider: "youtube",
        operation: "upload_video_content",
        message: "YouTube upload completed but response contained no video ID",
        retryable: false,
      });
    }

    return data;
  } catch (error) {
    if (error instanceof SafeYouTubeRequestError) throw error;
    throw new SafeYouTubeRequestError(
      toSafeYouTubeProviderError(error, "upload_video_content", secrets)
    );
  } finally {
    clearTimeout(timeout);
  }
}
