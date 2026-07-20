// app/lib/groq.ts
import { z } from "zod";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

// A meta-llama/llama-4-scout-17b-16e-instruct modellt a Groq 2026.06.17-én
// deprecate-elte és elérhetetlenné tette. Hivatalos migrációs ajánlásuk:
// openai/gpt-oss-120b (alternatíva: qwen/qwen3.6-27b).
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

export async function generatePrediction(
  prompt: string
): Promise<PickResult[] | null> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.warn("[groq] No GROQ_API_KEY — returning null");
    return null;
  }

  try {
    const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
      method: "POST",
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
      const err = await response.text();
      console.error("[groq] API error:", response.status, err);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content || typeof content !== "string") {
      console.error("[groq] Empty content in response");
      return null;
    }

    const extracted = extractJsonArray(content);

    if (!extracted) {
      console.error("[groq] Could not extract JSON array");
      return null;
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(extracted);
    } catch {
      console.error("[groq] JSON parse failed. Raw:", extracted.slice(0, 500));
      return null;
    }

    if (!Array.isArray(parsed)) {
      console.error("[groq] Response is not an array");
      return null;
    }

    const results: PickResult[] = [];

    for (const item of parsed) {
      try {
        const normalized = normalizePick(item);
        results.push(PickSchema.parse(normalized));
      } catch {
        console.warn("[groq] Invalid pick item skipped:", JSON.stringify(item));
      }
    }

    if (results.length === 0) {
      console.error("[groq] No valid picks in response. Full content:", extracted);
      return null;
    }

    return results;
  } catch (error) {
    console.error("[groq] generatePrediction failed:", error);
    return null;
  }
}