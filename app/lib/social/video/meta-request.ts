import type { SafeProviderError } from "./types";

export const META_GRAPH_API_VERSION = "v25.0";
export const META_GRAPH_BASE = `https://graph.facebook.com/${META_GRAPH_API_VERSION}`;
export const INSTAGRAM_LOGIN_GRAPH_BASE = `https://graph.instagram.com/${META_GRAPH_API_VERSION}`;

export type MetaProvider = "instagram" | "facebook";
export type FetchLike = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>;
export type SleepFunction = (delayMs: number) => Promise<void>;

export const defaultSleep: SleepFunction = (delayMs) =>
  new Promise((resolve) => setTimeout(resolve, delayMs));

export class SafeProviderRequestError extends Error {
  readonly details: SafeProviderError;

  constructor(details: SafeProviderError) {
    super(details.message);
    this.name = "SafeProviderRequestError";
    this.details = details;
  }
}

export class ProviderPollingTimeoutError extends SafeProviderRequestError {
  constructor(provider: MetaProvider, operation: string, attempts: number) {
    super({
      provider,
      operation,
      message: `${provider} ${operation} timed out after ${attempts} status checks`,
      retryable: true,
    });
    this.name = "ProviderPollingTimeoutError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function redactSensitiveText(
  value: unknown,
  secrets: readonly string[] = []
): string {
  let text = typeof value === "string" ? value : "provider request failed";

  for (const secret of secrets) {
    if (secret) text = text.split(secret).join("[REDACTED]");
  }

  return text
    .replace(/(access_token=)[^&\s]+/gi, "$1[REDACTED]")
    .replace(/(authorization\s*:\s*(?:bearer|oauth)\s+)[^\s,]+/gi, "$1[REDACTED]")
    .replace(/((?:bearer|oauth)\s+)[A-Za-z0-9._~+/=-]{8,}/gi, "$1[REDACTED]")
    .slice(0, 500);
}

function normalizeProviderPayload(params: {
  provider: MetaProvider;
  operation: string;
  httpStatus: number;
  payload: unknown;
  secrets: readonly string[];
}): SafeProviderError {
  const { provider, operation, httpStatus, payload, secrets } = params;
  const errorValue = isRecord(payload) && isRecord(payload.error) ? payload.error : null;
  const rawMessage =
    (errorValue && typeof errorValue.message === "string" && errorValue.message) ||
    (isRecord(payload) && typeof payload.message === "string" && payload.message) ||
    `${provider} request failed with HTTP ${httpStatus}`;

  return {
    provider,
    operation,
    message: redactSensitiveText(rawMessage, secrets),
    httpStatus,
    ...(errorValue &&
    (typeof errorValue.code === "string" || typeof errorValue.code === "number")
      ? { code: errorValue.code }
      : {}),
    ...(errorValue &&
    (typeof errorValue.error_subcode === "string" ||
      typeof errorValue.error_subcode === "number")
      ? { subcode: errorValue.error_subcode }
      : {}),
    retryable: httpStatus === 429 || httpStatus >= 500,
  };
}

export function toSafeProviderError(
  error: unknown,
  provider: MetaProvider,
  operation: string,
  secrets: readonly string[] = []
): SafeProviderError {
  if (error instanceof SafeProviderRequestError) return error.details;

  return {
    provider,
    operation,
    message: redactSensitiveText(
      error instanceof Error ? error.message : "provider request failed",
      secrets
    ),
    retryable: false,
  };
}

async function parseResponsePayload(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { message: text };
  }
}

export type MetaRequestOptions = {
  fetchFn?: FetchLike;
  sleep?: SleepFunction;
  provider: MetaProvider;
  operation: string;
  url: string;
  init: RequestInit;
  secrets?: readonly string[];
  timeoutMs?: number;
  maxAttempts?: number;
  retryDelayMs?: number;
};

export async function requestMetaJson<T>(
  options: MetaRequestOptions
): Promise<T> {
  const fetchFn = options.fetchFn ?? globalThis.fetch;
  const sleep = options.sleep ?? defaultSleep;
  const maxAttempts = Math.max(1, options.maxAttempts ?? 1);
  const timeoutMs = Math.max(1, options.timeoutMs ?? 15_000);
  const retryDelayMs = Math.max(0, options.retryDelayMs ?? 500);
  const secrets = options.secrets ?? [];

  let finalError: SafeProviderRequestError | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetchFn(options.url, {
        ...options.init,
        signal: controller.signal,
      });
      const payload = await parseResponsePayload(response);

      if (response.ok) return payload as T;

      finalError = new SafeProviderRequestError(
        normalizeProviderPayload({
          provider: options.provider,
          operation: options.operation,
          httpStatus: response.status,
          payload,
          secrets,
        })
      );
    } catch (error) {
      if (error instanceof SafeProviderRequestError) {
        finalError = error;
      } else {
        const timedOut = controller.signal.aborted;
        finalError = new SafeProviderRequestError({
          provider: options.provider,
          operation: options.operation,
          message: timedOut
            ? `${options.provider} ${options.operation} request timed out`
            : redactSensitiveText(
                error instanceof Error ? error.message : "provider request failed",
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

  throw finalError ??
    new SafeProviderRequestError({
      provider: options.provider,
      operation: options.operation,
      message: `${options.provider} request failed`,
      retryable: false,
    });
}
