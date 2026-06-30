// app/lib/groq.ts
import { z } from "zod";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

const PickSchema = z.object({
  market: z.string(),
  prediction: z.string(),
  reasoning: z.string(),
});

export type PickResult = z.infer<typeof PickSchema>;

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
        temperature: 0.3,
        max_tokens: 1024,
        messages: [
          {
            role: "system",
            content:
              "You are a sports betting analyst writing concise, professional match notes based strictly on the provided market data. " +
              "Always respond with ONLY a valid JSON array. No markdown, no explanation outside JSON.",
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

    if (!content) {
      console.error("[groq] Empty content in response");
      return null;
    }

    const cleaned = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("[groq] JSON parse failed. Raw:", cleaned.slice(0, 300));
      return null;
    }

    const arr = Array.isArray(parsed) ? parsed : [parsed];

    const results: PickResult[] = [];
    for (const item of arr) {
      try {
        results.push(PickSchema.parse(item));
      } catch (e) {
        console.warn("[groq] Invalid pick item skipped:", JSON.stringify(item));
      }
    }

    if (results.length === 0) {
      console.error("[groq] No valid picks in response. Full content:", cleaned);
      return null;
    }

    return results;
  } catch (error) {
    console.error("[groq] generatePrediction failed:", error);
    return null;
  }
}