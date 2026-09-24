export const GOOGLE_OAUTH_AUTH_URL =
  "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
export const GOOGLE_TOKENINFO_URL = "https://oauth2.googleapis.com/tokeninfo";
export const YOUTUBE_CHANNELS_API_URL =
  "https://www.googleapis.com/youtube/v3/channels";

export const YOUTUBE_UPLOAD_SCOPE =
  "https://www.googleapis.com/auth/youtube.upload";
export const YOUTUBE_READONLY_SCOPE =
  "https://www.googleapis.com/auth/youtube.readonly";

export const DEFAULT_YOUTUBE_SCOPES = [
  YOUTUBE_UPLOAD_SCOPE,
  YOUTUBE_READONLY_SCOPE,
] as const;

export type FetchLike = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>;

export type YouTubeTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
  token_type: string;
  id_token?: string;
};

export type YouTubeTokenInfoResponse = {
  azp?: string;
  aud?: string;
  scope?: string;
  exp?: string;
  expires_in?: string;
  email?: string;
  access_type?: string;
  error_description?: string;
};

export type YouTubeChannelInfo = {
  id: string;
  title: string;
  description?: string;
  customUrl?: string;
  publishedAt?: string;
};

export type YouTubeChannelsApiResponse = {
  kind?: string;
  etag?: string;
  pageInfo?: { totalResults: number; resultsPerPage: number };
  items?: Array<{
    kind?: string;
    id?: string;
    snippet?: {
      title?: string;
      description?: string;
      customUrl?: string;
      publishedAt?: string;
    };
  }>;
  error?: {
    code?: number;
    message?: string;
    errors?: Array<{ message?: string; domain?: string; reason?: string }>;
  };
};

export class YouTubeAuthError extends Error {
  readonly httpStatus?: number;
  readonly code?: string | number;
  readonly sanitizedMessage: string;

  constructor(params: {
    message: string;
    httpStatus?: number;
    code?: string | number;
    secrets?: readonly string[];
  }) {
    const sanitized = redactYouTubeSecrets(params.message, params.secrets ?? []);
    super(sanitized);
    this.name = "YouTubeAuthError";
    this.httpStatus = params.httpStatus;
    this.code = params.code;
    this.sanitizedMessage = sanitized;
  }
}

export function redactYouTubeSecrets(
  value: unknown,
  secrets: readonly string[] = []
): string {
  let text =
    typeof value === "string"
      ? value
      : value instanceof Error
        ? value.message
        : "YouTube OAuth request failed";

  for (const secret of secrets) {
    if (secret && secret.trim()) {
      text = text.split(secret).join("[REDACTED]");
    }
  }

  return text
    .replace(/(client_secret=)[^&\s]+/gi, "$1[REDACTED]")
    .replace(/(refresh_token=)[^&\s]+/gi, "$1[REDACTED]")
    .replace(/(access_token=)[^&\s]+/gi, "$1[REDACTED]")
    .replace(/(code=)[^&\s]+/gi, "$1[REDACTED]")
    .replace(/(authorization\s*:\s*(?:bearer|oauth)\s+)[^\s,]+/gi, "$1[REDACTED]")
    .replace(/((?:bearer|oauth)\s+)[A-Za-z0-9._~+/=-]{8,}/gi, "$1[REDACTED]")
    .slice(0, 800);
}

export function maskSecret(secret: string | undefined, visibleTail = 4): string {
  if (!secret || secret.trim().length === 0) return "[NOT_SET]";
  const trimmed = secret.trim();
  if (trimmed.length <= visibleTail * 2) return "[REDACTED]";
  const start = trimmed.slice(0, 4);
  const end = trimmed.slice(-visibleTail);
  return `${start}...${end}`;
}

export function buildYouTubeAuthUrl(params: {
  clientId: string;
  redirectUri: string;
  scopes?: readonly string[];
  state?: string;
  accessType?: "offline" | "online";
  prompt?: "consent" | "select_account" | "none";
}): string {
  if (!params.clientId?.trim()) {
    throw new YouTubeAuthError({ message: "clientId is required to generate auth URL" });
  }
  if (!params.redirectUri?.trim()) {
    throw new YouTubeAuthError({
      message: "redirectUri is required to generate auth URL",
    });
  }

  const scopes = params.scopes?.length
    ? params.scopes
    : DEFAULT_YOUTUBE_SCOPES;

  const searchParams = new URLSearchParams({
    client_id: params.clientId.trim(),
    redirect_uri: params.redirectUri.trim(),
    response_type: "code",
    scope: scopes.join(" "),
    access_type: params.accessType ?? "offline",
    prompt: params.prompt ?? "consent",
  });

  if (params.state?.trim()) {
    searchParams.set("state", params.state.trim());
  }

  return `${GOOGLE_OAUTH_AUTH_URL}?${searchParams.toString()}`;
}

export async function exchangeYouTubeAuthCode(params: {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  fetchFn?: FetchLike;
}): Promise<YouTubeTokenResponse> {
  const secrets = [params.clientSecret, params.code];
  if (!params.code?.trim()) {
    throw new YouTubeAuthError({
      message: "authorization code is required",
      secrets,
    });
  }
  if (!params.clientId?.trim()) {
    throw new YouTubeAuthError({ message: "clientId is required", secrets });
  }
  if (!params.clientSecret?.trim()) {
    throw new YouTubeAuthError({ message: "clientSecret is required", secrets });
  }
  if (!params.redirectUri?.trim()) {
    throw new YouTubeAuthError({ message: "redirectUri is required", secrets });
  }

  const fetchFn = params.fetchFn ?? fetch;
  const body = new URLSearchParams({
    code: params.code.trim(),
    client_id: params.clientId.trim(),
    client_secret: params.clientSecret.trim(),
    redirect_uri: params.redirectUri.trim(),
    grant_type: "authorization_code",
  });

  let response: Response;
  try {
    response = await fetchFn(GOOGLE_OAUTH_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: body.toString(),
    });
  } catch (error) {
    throw new YouTubeAuthError({
      message: `network request to Google OAuth token endpoint failed: ${error instanceof Error ? error.message : "unknown error"}`,
      secrets,
    });
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new YouTubeAuthError({
      message: `Google OAuth token endpoint returned invalid JSON (HTTP ${response.status})`,
      httpStatus: response.status,
      secrets,
    });
  }

  if (!response.ok || typeof payload !== "object" || payload === null) {
    const errorMsg =
      typeof payload === "object" &&
      payload !== null &&
      "error_description" in payload &&
      typeof (payload as { error_description: unknown }).error_description ===
        "string"
        ? (payload as { error_description: string }).error_description
        : typeof payload === "object" &&
            payload !== null &&
            "error" in payload &&
            typeof (payload as { error: unknown }).error === "string"
          ? (payload as { error: string }).error
          : `HTTP ${response.status}`;

    throw new YouTubeAuthError({
      message: `Google OAuth code exchange failed: ${errorMsg}`,
      httpStatus: response.status,
      secrets,
    });
  }

  const data = payload as Record<string, unknown>;
  if (typeof data.access_token !== "string" || !data.access_token.trim()) {
    throw new YouTubeAuthError({
      message: "Google OAuth response did not contain an access_token",
      httpStatus: response.status,
      secrets,
    });
  }

  return {
    access_token: data.access_token,
    expires_in: typeof data.expires_in === "number" ? data.expires_in : 3600,
    refresh_token:
      typeof data.refresh_token === "string" && data.refresh_token.trim()
        ? data.refresh_token
        : undefined,
    scope: typeof data.scope === "string" ? data.scope : undefined,
    token_type: typeof data.token_type === "string" ? data.token_type : "Bearer",
    id_token: typeof data.id_token === "string" ? data.id_token : undefined,
  };
}

export async function refreshYouTubeAccessToken(params: {
  refreshToken: string;
  clientId: string;
  clientSecret: string;
  fetchFn?: FetchLike;
}): Promise<YouTubeTokenResponse> {
  const secrets = [params.clientSecret, params.refreshToken];
  if (!params.refreshToken?.trim()) {
    throw new YouTubeAuthError({ message: "refreshToken is required", secrets });
  }
  if (!params.clientId?.trim()) {
    throw new YouTubeAuthError({ message: "clientId is required", secrets });
  }
  if (!params.clientSecret?.trim()) {
    throw new YouTubeAuthError({ message: "clientSecret is required", secrets });
  }

  const fetchFn = params.fetchFn ?? fetch;
  const body = new URLSearchParams({
    refresh_token: params.refreshToken.trim(),
    client_id: params.clientId.trim(),
    client_secret: params.clientSecret.trim(),
    grant_type: "refresh_token",
  });

  let response: Response;
  try {
    response = await fetchFn(GOOGLE_OAUTH_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: body.toString(),
    });
  } catch (error) {
    throw new YouTubeAuthError({
      message: `network request to Google OAuth token refresh failed: ${error instanceof Error ? error.message : "unknown error"}`,
      secrets,
    });
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new YouTubeAuthError({
      message: `Google OAuth token endpoint returned invalid JSON (HTTP ${response.status})`,
      httpStatus: response.status,
      secrets,
    });
  }

  if (!response.ok || typeof payload !== "object" || payload === null) {
    const errorMsg =
      typeof payload === "object" &&
      payload !== null &&
      "error_description" in payload &&
      typeof (payload as { error_description: unknown }).error_description ===
        "string"
        ? (payload as { error_description: string }).error_description
        : typeof payload === "object" &&
            payload !== null &&
            "error" in payload &&
            typeof (payload as { error: unknown }).error === "string"
          ? (payload as { error: string }).error
          : `HTTP ${response.status}`;

    throw new YouTubeAuthError({
      message: `Google OAuth token refresh failed: ${errorMsg}`,
      httpStatus: response.status,
      secrets,
    });
  }

  const data = payload as Record<string, unknown>;
  if (typeof data.access_token !== "string" || !data.access_token.trim()) {
    throw new YouTubeAuthError({
      message: "Google OAuth refresh response did not contain an access_token",
      httpStatus: response.status,
      secrets,
    });
  }

  return {
    access_token: data.access_token,
    expires_in: typeof data.expires_in === "number" ? data.expires_in : 3600,
    refresh_token:
      typeof data.refresh_token === "string" && data.refresh_token.trim()
        ? data.refresh_token
        : params.refreshToken,
    scope: typeof data.scope === "string" ? data.scope : undefined,
    token_type: typeof data.token_type === "string" ? data.token_type : "Bearer",
    id_token: typeof data.id_token === "string" ? data.id_token : undefined,
  };
}

export async function fetchAuthenticatedYouTubeChannel(params: {
  accessToken: string;
  fetchFn?: FetchLike;
}): Promise<YouTubeChannelInfo | null> {
  const secrets = [params.accessToken];
  if (!params.accessToken?.trim()) {
    throw new YouTubeAuthError({ message: "accessToken is required", secrets });
  }

  const fetchFn = params.fetchFn ?? fetch;
  const url = `${YOUTUBE_CHANNELS_API_URL}?part=snippet,id&mine=true`;

  let response: Response;
  try {
    response = await fetchFn(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${params.accessToken.trim()}`,
        Accept: "application/json",
      },
    });
  } catch (error) {
    throw new YouTubeAuthError({
      message: `network request to YouTube Data API channels endpoint failed: ${error instanceof Error ? error.message : "unknown error"}`,
      secrets,
    });
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new YouTubeAuthError({
      message: `YouTube Data API channels endpoint returned invalid JSON (HTTP ${response.status})`,
      httpStatus: response.status,
      secrets,
    });
  }

  if (!response.ok) {
    const errorObj =
      typeof payload === "object" &&
      payload !== null &&
      "error" in payload &&
      typeof (payload as { error: unknown }).error === "object" &&
      (payload as { error: { message?: string } }).error !== null
        ? (payload as { error: { message?: string } }).error
        : null;

    const message = errorObj?.message || `HTTP ${response.status}`;
    throw new YouTubeAuthError({
      message: `YouTube Data API channels request failed: ${message}`,
      httpStatus: response.status,
      secrets,
    });
  }

  const data = payload as YouTubeChannelsApiResponse;
  if (!Array.isArray(data.items) || data.items.length === 0) {
    return null;
  }

  const firstItem = data.items[0];
  if (!firstItem.id || !firstItem.snippet?.title) {
    return null;
  }

  return {
    id: firstItem.id,
    title: firstItem.snippet.title,
    description: firstItem.snippet.description,
    customUrl: firstItem.snippet.customUrl,
    publishedAt: firstItem.snippet.publishedAt,
  };
}

export async function inspectGoogleAccessToken(params: {
  accessToken: string;
  fetchFn?: FetchLike;
}): Promise<YouTubeTokenInfoResponse> {
  const secrets = [params.accessToken];
  if (!params.accessToken?.trim()) {
    throw new YouTubeAuthError({ message: "accessToken is required", secrets });
  }

  const fetchFn = params.fetchFn ?? fetch;
  const url = `${GOOGLE_TOKENINFO_URL}?access_token=${encodeURIComponent(
    params.accessToken.trim()
  )}`;

  let response: Response;
  try {
    response = await fetchFn(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    throw new YouTubeAuthError({
      message: `network request to Google tokeninfo failed: ${error instanceof Error ? error.message : "unknown error"}`,
      secrets,
    });
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new YouTubeAuthError({
      message: `Google tokeninfo returned invalid JSON (HTTP ${response.status})`,
      httpStatus: response.status,
      secrets,
    });
  }

  if (!response.ok || typeof payload !== "object" || payload === null) {
    const errorMsg =
      typeof payload === "object" &&
      payload !== null &&
      "error_description" in payload &&
      typeof (payload as { error_description: unknown }).error_description ===
        "string"
        ? (payload as { error_description: string }).error_description
        : `HTTP ${response.status}`;

    throw new YouTubeAuthError({
      message: `Google tokeninfo inspection failed: ${errorMsg}`,
      httpStatus: response.status,
      secrets,
    });
  }

  return payload as YouTubeTokenInfoResponse;
}
