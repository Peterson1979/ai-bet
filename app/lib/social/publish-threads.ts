import { env } from "../env";

const THREADS_GRAPH_BASE = "https://graph.threads.net/v1.0";

export type ThreadsPublishOptions = {
  fetchFn?: typeof globalThis.fetch;
  sleep?: (ms: number) => Promise<void>;
  userId?: string;
  accessToken?: string;
  pollIntervalMs?: number;
  maxPollAttempts?: number;
};

export type ThreadsMediaContainerResponse = {
  id?: string;
  error?: {
    message?: string;
    type?: string;
    code?: number;
    error_subcode?: number;
  };
};

export type ThreadsMediaStatusResponse = {
  id?: string;
  status?: string;
  error_message?: string;
  error?: {
    message?: string;
    type?: string;
    code?: number;
  };
};

export type ThreadsMediaPublishResponse = {
  id?: string;
  error?: {
    message?: string;
    type?: string;
    code?: number;
  };
};

function redactSecret(value: string, secret?: string): string {
  if (!value) return value;
  if (!secret) return value;
  return value.split(secret).join("[REDACTED]");
}

async function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatMetaError(
  context: string,
  res: Response,
  rawText: string,
  json: Record<string, any> | null,
  secret?: string
): string {
  const metaError = json?.error;
  const parts: string[] = [`HTTP ${res.status}`];

  if (metaError && typeof metaError === "object") {
    if (metaError.message) parts.push(`message: "${metaError.message}"`);
    if (metaError.type) parts.push(`type: "${metaError.type}"`);
    if (typeof metaError.code === "number") parts.push(`code: ${metaError.code}`);
    if (typeof metaError.error_subcode === "number") parts.push(`error_subcode: ${metaError.error_subcode}`);
    if (metaError.is_transient !== undefined) parts.push(`is_transient: ${metaError.is_transient}`);
    if (metaError.error_user_title) parts.push(`error_user_title: "${metaError.error_user_title}"`);
    if (metaError.error_user_msg) parts.push(`error_user_msg: "${metaError.error_user_msg}"`);
    if (metaError.fbtrace_id) parts.push(`fbtrace_id: "${metaError.fbtrace_id}"`);
  } else if (rawText) {
    parts.push(`body: "${rawText.slice(0, 500)}"`);
  }

  const rawFull = `${context}: ${parts.join(" | ")}`;
  return redactSecret(rawFull, secret);
}

async function createThreadsImageContainer(
  imageUrl: string,
  caption: string,
  userId: string,
  accessToken: string,
  fetchFn: typeof globalThis.fetch
): Promise<string> {
  const body = new URLSearchParams({
    media_type: "IMAGE",
    image_url: imageUrl,
    text: caption,
    access_token: accessToken,
  });

  const res = await fetchFn(`${THREADS_GRAPH_BASE}/${userId}/threads`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const text = await res.text();
  let json: ThreadsMediaContainerResponse;
  try {
    json = JSON.parse(text);
  } catch {
    json = { error: { message: text } };
  }

  if (!res.ok || !json.id) {
    const safeErrorMsg = formatMetaError("Threads container creation failed", res, text, json as any, accessToken);
    throw new Error(safeErrorMsg);
  }

  return json.id;
}

async function waitForThreadsContainerReady(
  containerId: string,
  accessToken: string,
  fetchFn: typeof globalThis.fetch,
  sleepFn: (ms: number) => Promise<void>,
  pollIntervalMs = 2000,
  maxPollAttempts = 5
): Promise<ThreadsMediaStatusResponse> {
  let statusJson: ThreadsMediaStatusResponse | null = null;

  for (let attempt = 1; attempt <= maxPollAttempts; attempt++) {
    if (attempt > 1) {
      await sleepFn(pollIntervalMs);
    }

    const res = await fetchFn(
      `${THREADS_GRAPH_BASE}/${containerId}?fields=status,error_message&access_token=${encodeURIComponent(
        accessToken
      )}`
    );

    const text = await res.text();
    try {
      statusJson = JSON.parse(text);
    } catch {
      statusJson = { error: { message: text } };
    }

    if (!res.ok) {
      const safeErrorMsg = formatMetaError("Threads status check failed", res, text, statusJson as any, accessToken);
      throw new Error(safeErrorMsg);
    }

    const status = (statusJson?.status ?? "").trim().toUpperCase();

    if (status === "FINISHED" || status === "PUBLISHED") {
      return statusJson!;
    }

    if (status === "ERROR" || status === "EXPIRED") {
      const errorDetail = statusJson?.error_message || status;
      throw new Error(
        `Threads container processing failed: ${redactSecret(errorDetail, accessToken)}`
      );
    }
  }

  return statusJson ?? { status: "TIMEOUT" };
}

async function publishThreadsContainer(
  containerId: string,
  userId: string,
  accessToken: string,
  fetchFn: typeof globalThis.fetch
): Promise<{ id: string }> {
  const body = new URLSearchParams({
    creation_id: containerId,
    access_token: accessToken,
  });

  const res = await fetchFn(`${THREADS_GRAPH_BASE}/${userId}/threads_publish`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const text = await res.text();
  let json: ThreadsMediaPublishResponse;
  try {
    json = JSON.parse(text);
  } catch {
    json = { error: { message: text } };
  }

  if (!res.ok || !json.id) {
    const safeErrorMsg = formatMetaError("Threads publish failed", res, text, json as any, accessToken);
    throw new Error(safeErrorMsg);
  }

  return { id: json.id };
}

/**
 * Publishes an image card and text to Threads using the official Meta Threads Graph API.
 */
export async function publishThreads(
  imageUrl: string,
  caption: string,
  options: ThreadsPublishOptions = {}
): Promise<{ id: string; containerId: string }> {
  const userId = options.userId || env.THREADS_USER_ID;
  const accessToken = options.accessToken || env.THREADS_ACCESS_TOKEN;
  const fetchFn = options.fetchFn || globalThis.fetch;
  const sleepFn = options.sleep || defaultSleep;
  const pollIntervalMs = options.pollIntervalMs ?? 2000;
  const maxPollAttempts = options.maxPollAttempts ?? 5;

  if (!userId || !accessToken) {
    throw new Error(
      "Threads publishing failed: THREADS_USER_ID or THREADS_ACCESS_TOKEN is missing"
    );
  }

  if (!imageUrl || !caption) {
    throw new Error("Threads publishing failed: image URL and caption are required");
  }

  const containerId = await createThreadsImageContainer(
    imageUrl,
    caption,
    userId,
    accessToken,
    fetchFn
  );

  const status = await waitForThreadsContainerReady(
    containerId,
    accessToken,
    fetchFn,
    sleepFn,
    pollIntervalMs,
    maxPollAttempts
  );

  const normalizedStatus = (status.status ?? "").trim().toUpperCase();
  if (
    normalizedStatus !== "FINISHED" &&
    normalizedStatus !== "PUBLISHED" &&
    normalizedStatus !== ""
  ) {
    throw new Error(
      `Threads container not ready for publishing (status: ${normalizedStatus})`
    );
  }

  const result = await publishThreadsContainer(
    containerId,
    userId,
    accessToken,
    fetchFn
  );

  return {
    id: result.id,
    containerId,
  };
}
