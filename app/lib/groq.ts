import { z } from "zod";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const MODEL = "openai/gpt-oss-120b";

const NullableNumber = z.union([z.number().finite(), z.null()]);

const PickSchema = z.object({
  market: z.string().min(1),
  prediction: z.string().min(1),
  reasoning: z.string().min(1),
  riskTier: z.enum(["Low", "Medium", "High"]),
  fairProbability: NullableNumber,
  estimatedValuePct: NullableNumber,
  valueDiff: NullableNumber,
  whySignal: z.array(z.string().min(1)).length(3),
});

export type PickResult = z.infer<typeof PickSchema>;

const MAX_RETRIES = 3;
const REQUEST_TIMEOUT_MS = 45_000;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRetryDelayMs(attempt: number): number {
  const base = 1500 * attempt;
  const jitter = Math.floor(Math.random() * 400);
  return base + jitter;
}

function extractRetryDelayMs(status: number, bodyText: string): number | null {
  if (status !== 429) return null;

  const secondsMatch = bodyText.match(/Please try again in\s+([\d.]+)s/i);
  if (secondsMatch) {
    const seconds = Number(secondsMatch[1]);
    if (Number.isFinite(seconds) && seconds > 0) {
      return Math.ceil(seconds * 1000);
    }
  }

  return null;
}

function extractJsonArray(raw: string): string | null {
  const cleaned = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const firstBracket = cleaned.indexOf("[");
  const lastBracket = cleaned.lastIndexOf("]");

  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    return cleaned.slice(firstBracket, lastBracket + 1);
  }

  return cleaned || null;
}

function normalizePick(item: unknown): unknown {
  if (!item || typeof item !== "object") return item;

  const obj = item as Record<string, unknown>;

  const normalizedWhySignal = Array.isArray(obj.whySignal)
    ? obj.whySignal
        .map((v) => (typeof v === "string" ? v.trim() : ""))
        .filter(Boolean)
        .slice(0, 3)
    : [];

  while (normalizedWhySignal.length < 3) {
    normalizedWhySignal.push("Signal confidence is moderate.");
  }

  return {
    market: typeof obj.market === "string" ? obj.market.trim() : "",
    prediction: typeof obj.prediction === "string" ? obj.prediction.trim() : "",
    reasoning: typeof obj.reasoning === "string" ? obj.reasoning.trim() : "",
    riskTier:
      obj.riskTier === "Low" || obj.riskTier === "Medium" || obj.riskTier === "High"
        ? obj.riskTier
        : "Medium",
    fairProbability:
      typeof obj.fairProbability === "number" && Number.isFinite(obj.fairProbability)
        ? Number(obj.fairProbability.toFixed(2))
        : null,
    estimatedValuePct:
      typeof obj.estimatedValuePct === "number" &&
      Number.isFinite(obj.estimatedValuePct)
        ? Number(obj.estimatedValuePct.toFixed(2))
        : null,
    valueDiff:
      typeof obj.valueDiff === "number" && Number.isFinite(obj.valueDiff)
        ? Number(obj.valueDiff.toFixed(2))
        : null,
    whySignal: normalizedWhySignal,
  };
}

async function callGroq(prompt: string, attempt: number): Promise<PickResult[] | null> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.warn("[groq] No GROQ_API_KEY — returning null");
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
        temperature: 0.2,
        max_tokens: 2048,
        reasoning_effort: "low",
        messages: [
          {
            role: "system",
            content:
              "You are a sports betting analyst returning structured data for a prediction platform. " +
              "Always respond with ONLY a valid JSON array. No markdown. No prose outside JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      const retryDelayMs = extractRetryDelayMs(response.status, errText);

      console.error("[groq] API error", {
        attempt,
        status: response.status,
        bodyPreview: errText.slice(0, 1200),
      });

      if (response.status === 429 && attempt < MAX_RETRIES) {
        const delayMs = retryDelayMs ?? getRetryDelayMs(attempt);
        console.warn("[groq] Retrying after rate limit", {
          attempt,
          delayMs,
        });
        await sleep(delayMs);
        return callGroq(prompt, attempt + 1);
      }

      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content || typeof content !== "string") {
      console.error("[groq] Empty content in response", { attempt });

      if (attempt < MAX_RETRIES) {
        const delayMs = getRetryDelayMs(attempt);
        console.warn("[groq] Retrying after empty content", {
          attempt,
          delayMs,
        });
        await sleep(delayMs);
        return callGroq(prompt, attempt + 1);
      }

      return null;
    }

    const extracted = extractJsonArray(content);

    if (!extracted) {
      console.error("[groq] Could not extract JSON array", {
        attempt,
        rawPreview: content.slice(0, 1000),
      });

      if (attempt < MAX_RETRIES) {
        const delayMs = getRetryDelayMs(attempt);
        console.warn("[groq] Retrying after failed JSON extraction", {
          attempt,
          delayMs,
        });
        await sleep(delayMs);
        return callGroq(prompt, attempt + 1);
      }

      return null;
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(extracted);
    } catch {
      console.error("[groq] JSON parse failed", {
        attempt,
        rawPreview: extracted.slice(0, 1200),
        rawLength: extracted.length,
      });

      if (attempt < MAX_RETRIES) {
        const delayMs = getRetryDelayMs(attempt);
        console.warn("[groq] Retrying after JSON parse failure", {
          attempt,
          delayMs,
        });
        await sleep(delayMs);
        return callGroq(prompt, attempt + 1);
      }

      return null;
    }

    if (!Array.isArray(parsed)) {
      console.error("[groq] Response is not an array", {
        attempt,
        rawPreview: extracted.slice(0, 1000),
      });

      if (attempt < MAX_RETRIES) {
        const delayMs = getRetryDelayMs(attempt);
        console.warn("[groq] Retrying after non-array response", {
          attempt,
          delayMs,
        });
        await sleep(delayMs);
        return callGroq(prompt, attempt + 1);
      }

      return null;
    }

    const results: PickResult[] = [];
    let invalidCount = 0;

    for (const item of parsed) {
      try {
        const normalized = normalizePick(item);
        results.push(PickSchema.parse(normalized));
      } catch (error) {
        invalidCount += 1;
        console.warn("[groq] Invalid pick item skipped", {
          attempt,
          error: error instanceof Error ? error.message : String(error),
          item,
        });
      }
    }

    console.log("[groq] Parsed response summary", {
      attempt,
      rawArrayLength: parsed.length,
      validResults: results.length,
      invalidResults: invalidCount,
    });

    if (results.length === 0) {
      console.error("[groq] No valid picks in response", {
        attempt,
        rawPreview: extracted.slice(0, 1500),
      });

      if (attempt < MAX_RETRIES) {
        const delayMs = getRetryDelayMs(attempt);
        console.warn("[groq] Retrying after zero valid picks", {
          attempt,
          delayMs,
        });
        await sleep(delayMs);
        return callGroq(prompt, attempt + 1);
      }

      return null;
    }

    return results;
  } catch (error) {
    const isAbortError =
      error instanceof Error &&
      (error.name === "AbortError" || error.message.toLowerCase().includes("aborted"));

    console.error("[groq] generatePrediction failed", {
      attempt,
      error: error instanceof Error ? error.message : String(error),
      isAbortError,
    });

    if (attempt < MAX_RETRIES) {
      const delayMs = getRetryDelayMs(attempt);
      console.warn("[groq] Retrying after request failure", {
        attempt,
        delayMs,
        isAbortError,
      });
      await sleep(delayMs);
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