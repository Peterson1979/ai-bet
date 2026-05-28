import OpenAI from "openai";

import { z } from "zod";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PredictionSchema = z.object({
  recommendedBet: z.string(),

  betCode: z.string(),

  explanation: z.string(),

  confidence: z.number(),

  risk: z.number(),
});

export type PredictionResult =
  z.infer<typeof PredictionSchema>;

export async function generatePrediction(
  prompt: string
): Promise<PredictionResult | null> {
  try {
    const response =
      await client.chat.completions.create({
        model: "gpt-5-mini",

        temperature: 0.4,

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        response_format: {
          type: "json_object",
        },
      });

    const content =
      response.choices[0]?.message?.content;

    if (!content) {
      return null;
    }

    const parsed = JSON.parse(content);

    return PredictionSchema.parse(parsed);
  } catch (error) {
    console.error(error);

    return null;
  }
}