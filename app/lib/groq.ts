import { z } from "zod";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const MODEL = "openai/gpt-oss-120b";

const NullableNumber = z.union([z.number().finite(), z.null()]);

const PickSchema = z.object({
  candidateId: z.string().min(1),
  reasoning: z.string().min(1),
  fairProbability: NullableNumber,
});

const ResponseSchema = z.object({
  items: z.array(PickSchema),
});

const PREDICTION_JSON_SCHEMA = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          candidateId: { type: "string" },
          reasoning: { type: "string" },
          fairProbability: { type: ["number", "null"] },
        },
        required: ["candidateId", "reasoning", "fairProbability"],
        additionalProperties: false,
      },
    },
  },
  required: ["items"],
  additionalProperties: false,
} as const;

export type PickResult = z.infer<typeof PickSchema>;

const MAX_RETRIES = 2;
const REQUEST_TIMEOUT_MS = 45_000;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRetryDelayMs(attempt: number): number {
  return 1200 * attempt + Math.floor(Math.random() * 300);
}

function extractRetryDelayMs(response: Response, bodyText: string): number | null {
  if (response.status !== 429) return null;

  const retryAfter = response.headers.get("retry-after");
  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds) && seconds > 0) {
      return Math.ceil(seconds * 1000);
    }
  }

  const secondsMatch = bodyText.match(/Please try again in\s+([\d.]+)s/i);
  if (secondsMatch) {
    const seconds = Number(secondsMatch[1]);
    if (Number.isFinite(seconds) && seconds > 0) {
      return Math.ceil(seconds * 1000);
    }
  }

  return null;
}

async function callGroq(prompt: string, attempt: number): Promise<PickResult[] | null> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.warn("[groq] No GROQ_API_KEY - returning null");
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.1,
        max_completion_tokens: 1536,
        reasoning_effort: "low",
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "matchsignal_predictions",
            strict: true,
            schema: PREDICTION_JSON_SCHEMA,
          },
        },
        messages: [
          {
            role: "system",
            content:
              "You are a sports analyst producing concise structured predictions. Follow the supplied JSON schema exactly.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("[groq] API error", {
        attempt,
        status: response.status,
        bodyPreview: errText.slice(0, 1200),
      });

      if (response.status === 429 && attempt < MAX_RETRIES) {
        const delayMs = extractRetryDelayMs(response, errText) ?? getRetryDelayMs(attempt);
        console.warn("[groq] Retrying after rate limit", { attempt, delayMs });
        await sleep(delayMs + 250);
        return callGroq(prompt, attempt + 1);
      }

      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content || typeof content !== "string") {
      console.error("[groq] Empty content in response", { attempt });
      return null;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      console.error("[groq] Structured response JSON parse failed", { attempt });
      return null;
    }

    const validated = ResponseSchema.safeParse(parsed);
    if (!validated.success) {
      console.error("[groq] Structured response validation failed", {
        attempt,
        error: validated.error.message,
      });
      return null;
    }

    const results = validated.data.items.map((item) => ({
      candidateId: item.candidateId.trim(),
      reasoning: item.reasoning.trim(),
      fairProbability: item.fairProbability,
    }));

    console.log("[groq] Parsed response summary", {
      attempt,
      validResults: results.length,
      usage: data.usage,
    });

    return results.length > 0 ? results : null;
  } catch (error) {
    const isAbortError =
      error instanceof Error &&
      (error.name === "AbortError" || error.message.toLowerCase().includes("aborted"));

    console.error("[groq] generatePrediction failed", {
      attempt,
      error: error instanceof Error ? error.message : String(error),
      isAbortError,
    });

    if (!isAbortError && attempt < MAX_RETRIES) {
      await sleep(getRetryDelayMs(attempt));
      return callGroq(prompt, attempt + 1);
    }

    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function generatePrediction(
  prompt: string
): Promise<PickResult[] | null> {
  return callGroq(prompt, 1);
}
