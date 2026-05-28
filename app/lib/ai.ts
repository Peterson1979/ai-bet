type Match = {
  slug: string;
  league: string;
};

type AIResult = {
  prediction: string;
  confidence: number;
  analysis: string;
};

function buildPrompt(match: Match) {
  return `
You are a football betting analyst.

Match:
- Teams: ${match.slug}
- League: ${match.league}

Task:
Generate:
1. Betting prediction (1 short line)
2. Confidence score (0-100)
3. Short analytical reasoning (2-3 sentences)

Rules:
- Be conservative (prefer lower risk bets)
- Avoid gambling hype
- Focus on probability-based reasoning
`;
}

export async function generateAI(match: Match): Promise<AIResult> {
  const prompt = buildPrompt(match);

  // TEMP fallback if no API key yet
  const apiKey = process.env.GROK_API_KEY;

  if (!apiKey) {
    return {
      prediction: "Home Win (simulated)",
      confidence: 70,
      analysis:
        "No AI key configured. This is a fallback analytical placeholder based on general team strength assumptions.",
    };
  }

  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-3",
        messages: [
          {
            role: "system",
            content:
              "You are a professional football betting analyst. Be precise and conservative.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.4,
      }),
    });

    if (!res.ok) {
      throw new Error("AI request failed");
    }

    const data = await res.json();

    const text = data.choices?.[0]?.message?.content || "";

    return {
      prediction: extractSection(text, "prediction") || "No prediction",
      confidence: extractConfidence(text),
      analysis: extractSection(text, "analysis") || text,
    };
  } catch (err) {
    return {
      prediction: "Fallback prediction",
      confidence: 65,
      analysis: "AI error fallback mode activated.",
    };
  }
}

function extractConfidence(text: string): number {
  const match = text.match(/(\d{1,3})/);
  if (!match) return 70;
  const val = Number(match[1]);
  return Math.min(100, Math.max(0, val));
}

function extractSection(text: string, key: string): string | null {
  const regex = new RegExp(`${key}[:\\-]?\\s*(.+)`, "i");
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}