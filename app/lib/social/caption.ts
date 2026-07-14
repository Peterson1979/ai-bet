const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

type Candidate = {
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  market: string;
  prediction: string;
  bestOdds: number;
  valueDiff: number;
  riskTier: string;
  bookmaker: string;
};

export async function generateCaption(pick: Candidate): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("Missing GROQ_API_KEY");

  const prompt = `
Write one concise social caption for MatchSignal.

Rules:
- Tone: sharp, neutral, professional.
- No hype, no promises, no "guaranteed win".
- Mention matchup, pick, odds, value signal, and risk tier.
- Max 350 characters.
- Plain text only.
- End with: View odds on MatchSignal.

Data:
Sport: ${pick.sport}
League: ${pick.league}
Match: ${pick.homeTeam} vs ${pick.awayTeam}
Start time: ${pick.startTime}
Market: ${pick.market}
Prediction: ${pick.prediction}
Best odds: ${pick.bestOdds}
Value diff: ${pick.valueDiff}
Risk tier: ${pick.riskTier}
Bookmaker: ${pick.bookmaker}
`;

  const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.4,
      max_tokens: 220,
      messages: [
        {
          role: "system",
          content:
            "You write short social media captions for a sports betting analysis brand. Output plain text only.",
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
    throw new Error(`[groq caption] ${response.status} ${err}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) throw new Error("Empty caption response from Groq");
  return content;
}