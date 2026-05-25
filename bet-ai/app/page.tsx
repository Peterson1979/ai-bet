import fs from "fs";
import path from "path";
import { getAffiliateLink } from "./lib/affiliates";
import { trackClick } from "./lib/tracking";

type Prediction = {
  slug: string;
  league: string;
  prediction: string;
  confidence: number;
  analysis: string;
};

function getBadge(confidence: number) {
  if (confidence >= 85) return "HIGH CONFIDENCE";
  if (confidence >= 75) return "MEDIUM CONFIDENCE";
  return "RISKY";
}

async function getPredictions(): Promise<Prediction[]> {
  try {
    const filePath = path.join(process.cwd(), "data", "predictions.json");
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const predictions = await getPredictions();

  const bestBet = predictions
    .filter((p) => p.confidence >= 80)
    .sort((a, b) => b.confidence - a.confidence)[0];

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif", background: "#0b0f14", color: "#fff" }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>
        AI Betting Tips
      </h1>

      {bestBet && (
        <div
          style={{
            padding: 20,
            marginBottom: 20,
            border: "2px solid #22c55e",
            borderRadius: 12,
            background: "#0f172a",
          }}
        >
          <h2>🔥 Best Bet of the Day</h2>

          <div style={{ fontSize: 18, marginTop: 8 }}>
            {bestBet.slug}
          </div>

          <div style={{ marginTop: 4 }}>
            {bestBet.prediction} ({bestBet.confidence}%)
          </div>

          <a
            href={getAffiliateLink(bestBet.league)}
            target="_blank"
            onClick={() => trackClick(bestBet.league, bestBet.slug)}
            style={{
              display: "inline-block",
              marginTop: 12,
              padding: "10px 14px",
              background: "#22c55e",
              color: "#000",
              borderRadius: 8,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Get Best Odds
          </a>
        </div>
      )}

      {predictions.length === 0 && <p>No predictions yet.</p>}

      <div style={{ display: "grid", gap: 16 }}>
        {predictions.map((p, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #222",
              borderRadius: 12,
              padding: 16,
              background: "#111827",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 600 }}>
              {p.slug}
            </div>

            <div style={{ opacity: 0.8 }}>{p.league}</div>

            <div style={{ marginTop: 8 }}>
              <b>Prediction:</b> {p.prediction}
            </div>

            <div>
              <b>Confidence:</b> {p.confidence}%
            </div>

            <div style={{ marginTop: 6, fontSize: 12, color: "#94a3b8" }}>
              {getBadge(p.confidence)}
            </div>

            <p style={{ marginTop: 10, opacity: 0.9 }}>
              {p.analysis}
            </p>

            <a
              href={getAffiliateLink(p.league)}
              target="_blank"
              onClick={() => trackClick(p.league, p.slug)}
              style={{
                display: "inline-block",
                marginTop: 12,
                padding: "10px 14px",
                background: "#3b82f6",
                color: "#fff",
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Get Best Odds
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}