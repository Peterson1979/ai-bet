// app/lib/groq.ts
// Replaces openai.ts — uses Groq API (OpenAI-compatible)
// Model: meta-llama/llama-4-scout-17b-16e-instruct (free tier)

import { z } from "zod";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

const PredictionSchema = z.object({
  recommendedBet: z.string(),
  betCode: z.string(),
  explanation: z.string(),
  confidence: z.number().min(1).max(100),
  risk: z.number().min(1).max(100),
});

export type PredictionResult = z.infer<typeof PredictionSchema>;

export async function generatePrediction(
  prompt: string
): Promise<PredictionResult[] | null> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.warn("[groq] No GROQ_API_KEY — returning fallback");
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
        temperature: 0.4,
        max_tokens: 1024,
        messages: [
          {
            role: "system",
            content:
              "You are a professional sports betting analyst. " +
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

    if (!content) return null;

    // Strip markdown fences if model adds them
    const cleaned = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    // Accept both array and single object
    const arr = Array.isArray(parsed) ? parsed : [parsed];

    return arr.map((item: unknown) => PredictionSchema.parse(item));
  } catch (error) {
    console.error("[groq] generatePrediction failed:", error);
    return null;
  }
}
