import fs from "fs";
import path from "path";
import TrackLink from "./components/TrackLink";

type Prediction = {
  slug: string;
  league: string;
  prediction: string;
  confidence: number;
  analysis: string;
  odds?: number;
};

function getBadge(confidence: number) {
  if (confidence >= 85) return "HIGH CONFIDENCE";
  if (confidence >= 75) return "MEDIUM CONFIDENCE";
  return "RISKY";
}

function isValueBet(confidence: number, odds?: number) {
  if (!odds) return false;

  const impliedProb = 100 / odds;
  const edge = confidence - impliedProb;

  return edge >= 8;
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

export async function generateMetadata() {
  const predictions = await getPredictions();
  const best = predictions[0];

  return {
    title: best
      ? `${best.slug} – AI Betting Tips`
      : "AI Betting Tips",
    description:
      best?.analysis ||
      "Daily AI-powered football predictions with value bet detection and odds comparison.",
  };
}

export default async function HomePage() {
  const predictions = await getPredictions();

  const valueBets = predictions.filter((p) =>
    isValueBet(p.confidence, p.odds)
  );

  const bestBet = valueBets.length
    ? valueBets.sort((a, b) => b.confidence - a.confidence)[0]
    : predictions
        .filter((p) => p.confidence >= 80)
        .sort((a, b) => b.confidence - a.confidence)[0];

  return (
    <main
      style={{
        padding: 24,
        fontFamily: "sans-serif",
        background: "#0b0f14",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>
        AI Betting Tips
      </h1>

      <p
        style={{
          opacity: 0.7,
          maxWidth: 600,
          marginBottom: 20,
        }}
      >
        Daily AI-powered football predictions with value bet detection and odds comparison.
      </p>

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

          {bestBet.odds && (
            <div style={{ marginTop: 6 }}>
              Odds: {bestBet.odds}
            </div>
          )}

          <div
            style={{
              marginTop: 6,
              fontSize: 12,
              color: "#94a3b8",
            }}
          >
            {getBadge(bestBet.confidence)}
          </div>

          {isValueBet(
            bestBet.confidence,
            bestBet.odds
          ) && (
            <div
              style={{
                color: "#22c55e",
                marginTop: 6,
              }}
            >
              VALUE BET DETECTED
            </div>
          )}

          <TrackLink
            league={bestBet.league}
            slug={bestBet.slug}
          />
        </div>
      )}

      {predictions.length === 0 && (
        <p>No predictions yet.</p>
      )}

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
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {p.slug}
            </div>

            <div style={{ opacity: 0.8 }}>
              {p.league}
            </div>

            <div style={{ marginTop: 8 }}>
              <b>Prediction:</b> {p.prediction}
            </div>

            <div>
              <b>Confidence:</b> {p.confidence}%
            </div>

            {p.odds && (
              <div>
                <b>Odds:</b> {p.odds}
              </div>
            )}

            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                color: "#94a3b8",
              }}
            >
              {getBadge(p.confidence)}
            </div>

            <p
              style={{
                marginTop: 10,
                opacity: 0.9,
              }}
            >
              {p.analysis}
            </p>

            <a
              href={`/predictions/${p.slug}`}
              style={{
                color: "#60a5fa",
                display: "inline-block",
                marginTop: 8,
              }}
            >
              Open Analysis
            </a>

            <TrackLink
              league={p.league}
              slug={p.slug}
            />
          </div>
        ))}
      </div>
    </main>
  );
}