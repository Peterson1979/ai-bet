import fs from "fs";
import path from "path";

type Prediction = {
  slug: string;
  league: string;
  prediction: string;
  confidence: number;
  analysis: string;
  odds?: number;
};

function getPrediction(slug: string): Prediction | null {
  try {
    const filePath = path.join(process.cwd(), "data", "predictions.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const all: Prediction[] = JSON.parse(data);
    return all.find((p) => p.slug === slug) || null;
  } catch {
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug } = await params;
  const p = getPrediction(slug);

  if (!p) {
    return (
      <main style={{ color: "#fff", padding: 24 }}>
        <h1>Prediction not found</h1>
      </main>
    );
  }

  const implied = p.odds ? 100 / p.odds : null;
  const edge = implied !== null ? p.confidence - implied : null;
  const isValue = edge !== null && edge >= 6;

  return (
    <main style={{ padding: 24, background: "#0b0f14", color: "#fff", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 28 }}>{p.slug}</h1>
      <p style={{ opacity: 0.7 }}>{p.league}</p>
      <div style={{ marginTop: 20, padding: 16, background: "#111827", borderRadius: 12 }}>
        <h3>Match Insight</h3>
        <p>{p.prediction}</p>
        <p>Confidence: {p.confidence}%</p>
      </div>
      {p.odds && (
        <div style={{ marginTop: 16, padding: 16, background: "#0f172a", borderRadius: 12 }}>
          <h3>Market Edge</h3>
          <p>Odds: {p.odds}</p>
          {implied && <p>Implied probability: {implied.toFixed(1)}%</p>}
          {edge !== null && <p>Edge: {edge.toFixed(1)}%</p>}
          {isValue && <p style={{ color: "#22c55e" }}>VALUE BET DETECTED</p>}
        </div>
      )}
      <div style={{ marginTop: 20 }}>
        <h3>AI Analysis</h3>
        <p style={{ opacity: 0.9 }}>{p.analysis}</p>
      </div>
      <div style={{ marginTop: 30 }}>
        <a href="https://example-bookmaker.com" target="_blank" style={{ display: "inline-block", padding: "12px 16px", background: "#22c55e", color: "#000", fontWeight: 700, borderRadius: 8, textDecoration: "none" }}>
          Get Best Odds
        </a>
      </div>
    </main>
  );
}