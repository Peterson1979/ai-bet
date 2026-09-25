import {
  VIDEO_COPY_MODEL,
} from "./content-types";
import { VIDEO_COPY_SYSTEM_PROMPT } from "./copy-prompt";
import { VIDEO_COPY_JSON_SCHEMA } from "./copy-validate";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const REQUEST_TIMEOUT_MS = 90_000;
const MAX_RATE_LIMIT_WAIT_MS = 60_000;

export type GroqVideoCopyResult = {
  copy: unknown;
  model: string;
};

async function parseGroqErrorDetails(response: Response): Promise<string> {
  const status = response.status;
  let bodyText = "";
  try {
    bodyText = await response.text();
  } catch {
    return `HTTP ${status}`;
  }

  try {
    const errorJson = JSON.parse(bodyText);
    if (errorJson && typeof errorJson === "object") {
      const err = (errorJson as Record<string, unknown>).error;
      if (err && typeof err === "object") {
        const message = (err as Record<string, unknown>).message;
        const type = (err as Record<string, unknown>).type;
        const code = (err as Record<string, unknown>).code;
        const details: string[] = [];
        if (typeof message === "string" && message) details.push(message);
        if (typeof type === "string" && type) details.push(`type: ${type}`);
        if (typeof code === "string" && code) details.push(`code: ${code}`);
        if (details.length > 0) return `HTTP ${status}: ${details.join(" | ")}`;
      }
    }
  } catch {
    // Non-JSON body, fallback to truncated text snippet
  }

  const cleanSnippet = bodyText.replace(/[\r\n]+/g, " ").trim().slice(0, 300);
  return `HTTP ${status}${cleanSnippet ? `: ${cleanSnippet}` : ""}`;
}

function getRateLimitHeaderSummary(headers: Headers): string {
  const headerKeys = [
    "retry-after",
    "x-ratelimit-reset-tokens",
    "x-ratelimit-reset-requests",
    "x-ratelimit-remaining-tokens",
    "x-ratelimit-remaining-requests",
    "x-ratelimit-limit-tokens",
    "x-ratelimit-limit-requests",
  ];
  const items: string[] = [];
  for (const key of headerKeys) {
    const val = headers.get(key);
    if (val) items.push(`${key}: ${val}`);
  }
  return items.length > 0 ? ` [headers: ${items.join(", ")}]` : "";
}

export async function generateVideoCopyWithGroq(params: {
  prompt: string;
  apiKey?: string;
  fetchFn?: typeof fetch;
  sleep?: (delayMs: number) => Promise<void>;
  retryRateLimitOnce?: boolean;
  onRequest?: () => void;
}): Promise<GroqVideoCopyResult> {
  const apiKey = params.apiKey ?? process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is unavailable");

  const fetchFn = params.fetchFn ?? globalThis.fetch;
  const sleep = params.sleep ?? ((delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs)));

  for (let attempt = 0; attempt < (params.retryRateLimitOnce ? 2 : 1); attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      params.onRequest?.();
      const response = await fetchFn(
      `${GROQ_BASE_URL}/chat/completions`,
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: VIDEO_COPY_MODEL,
          temperature: 0.7,
          max_completion_tokens: 2_000,
          reasoning_effort: "low",
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "matchsignal_video_social_copy",
              strict: true,
              schema: VIDEO_COPY_JSON_SCHEMA,
            },
          },
          messages: [
            { role: "system", content: VIDEO_COPY_SYSTEM_PROMPT },
            { role: "user", content: params.prompt },
          ],
        }),
      }
      );

      if (response.status === 429 && attempt === 0 && params.retryRateLimitOnce) {
        const retryAfter = response.headers.get("retry-after");
        const secondsMatch = retryAfter?.trim().match(/^(\d+(?:\.\d+)?)s?$/i);
        const seconds = secondsMatch ? Number(secondsMatch[1]) : Number.NaN;
        const dateDelay = retryAfter ? Date.parse(retryAfter) - Date.now() : Number.NaN;
        const delayMs = Number.isFinite(seconds)
          ? Math.max(0, seconds * 1_000)
          : Number.isFinite(dateDelay)
            ? Math.max(0, dateDelay)
            : Number.NaN;
        if (Number.isFinite(delayMs) && delayMs <= MAX_RATE_LIMIT_WAIT_MS) {
          await sleep(delayMs);
          continue;
        }
      }

      if (!response.ok) {
        const errorDetails = await parseGroqErrorDetails(response);
        const headerSummary = getRateLimitHeaderSummary(response.headers);
        throw new Error(`Groq video-copy request failed with ${errorDetails}${headerSummary}`);
      }
      const payload = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const content = payload.choices?.[0]?.message?.content;
      if (!content) throw new Error("Groq video-copy response was empty");

      let parsed: unknown;
      try {
        parsed = JSON.parse(content);
      } catch {
        throw new Error("Groq video-copy response was not valid JSON");
      }

      return { copy: parsed, model: VIDEO_COPY_MODEL };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Groq video-copy request timed out");
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error("Groq video-copy request failed after one rate-limit retry");
}
