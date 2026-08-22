import {
  VIDEO_COPY_MODEL,
} from "./content-types";
import { VIDEO_COPY_SYSTEM_PROMPT } from "./copy-prompt";
import { VIDEO_COPY_JSON_SCHEMA } from "./copy-validate";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const REQUEST_TIMEOUT_MS = 90_000;

export type GroqVideoCopyResult = {
  copy: unknown;
  model: string;
};

export async function generateVideoCopyWithGroq(params: {
  prompt: string;
  apiKey?: string;
  fetchFn?: typeof fetch;
}): Promise<GroqVideoCopyResult> {
  const apiKey = params.apiKey ?? process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is unavailable");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await (params.fetchFn ?? globalThis.fetch)(
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
          // Keep the full prompt + completion comfortably below Groq's base
          // 8K TPM envelope while retaining room for seven concise outputs.
          max_completion_tokens: 2_500,
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

    if (!response.ok) {
      throw new Error(`Groq video-copy request failed with HTTP ${response.status}`);
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

    return {
      copy: parsed,
      model: VIDEO_COPY_MODEL,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Groq video-copy request timed out");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
