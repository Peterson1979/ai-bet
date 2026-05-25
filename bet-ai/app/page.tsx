import fs from "fs";
import path from "path";

type Prediction = {
  slug: string;
  league: string;
  prediction: string;
  confidence: number;
  analysis: string;
};

async function getPredictions(): Promise<Prediction[]> {
  try {
    const filePath = path.join(process.cwd(), "data", "predictions.json");
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

export default async function HomePage() {
  const predictions = await getPredictions();

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Daily Betting Tips</h1>

      {predictions.length === 0 && (
        <p>No predictions yet. Run /api/daily-run first.</p>
      )}

      <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
        {predictions.map((p, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <h2>{p.slug}</h2>
            <p><b>League:</b> {p.league}</p>
            <p><b>Prediction:</b> {p.prediction}</p>
            <p><b>Confidence:</b> {p.confidence}%</p>
            <p>{p.analysis}</p>
          </div>
        ))}
      </div>
    </main>
  );
}