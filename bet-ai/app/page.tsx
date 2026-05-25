import fs from "fs";
import path from "path";
import Image from "next/image";
import TrackLink from "./components/TrackLink";
import AnimatedGrid from "./components/AnimatedGrid";

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
  const implied = 100 / odds;
  return confidence - implied >= 6;
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
    .filter((p) => isValueBet(p.confidence, p.odds))
    .sort((a, b) => b.confidence - a.confidence)[0];

  return (
    <main
      style={{
        background: "#070b14",
        color: "#e5e7eb",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* HERO */}
      <div style={{ position: "relative" }}>
        <Image
          src="/hero.jpg"
          alt="AI Betting Tips"
          width={1600}
          height={500}
          style={{
            width: "100%",
            height: "340px",
            objectFit: "cover",
            filter: "contrast(1.15) saturate(1.1)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(7,11,20,1), rgba(7,11,20,0.1))",
            display: "flex",
            alignItems: "flex-end",
            padding: 28,
          }}
        >
          <div>
            <h1 style={{ fontSize: 40, margin: 0 }}>
              AI Betting Tips
            </h1>
            <p style={{ opacity: 0.7, marginTop: 6 }}>
              Data-driven football predictions with odds edge detection
            </p>
          </div>
        </div>
      </div>

      {/* FEATURED */}
      {bestBet && (
        <div style={{ padding: 28 }}>
          <div
            style={{
              background:
                "linear-gradient(145deg, #111827, #0f172a)",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: 18,
              padding: 22,
              boxShadow:
                "0 15px 40px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{ fontSize: 11, opacity: 0.6 }}>
              FEATURED VALUE PICK
            </div>

            <h2 style={{ marginTop: 8 }}>
              {bestBet.slug}
            </h2>

            <div style={{ opacity: 0.7 }}>
              {bestBet.league}
            </div>

            <div style={{ marginTop: 10 }}>
              <b>{bestBet.prediction}</b>{" "}
              <span style={{ opacity: 0.7 }}>
                ({bestBet.confidence}%)
              </span>
            </div>

            {bestBet.odds && (
              <div style={{ marginTop: 6, opacity: 0.7 }}>
                Odds: {bestBet.odds}
              </div>
            )}

            <div style={{ marginTop: 10, fontSize: 12 }}>
              {getBadge(bestBet.confidence)}
            </div>

            {isValueBet(bestBet.confidence, bestBet.odds) && (
              <div
                style={{
                  marginTop: 10,
                  color: "#22c55e",
                  fontWeight: 600,
                }}
              >
                VALUE EDGE DETECTED
              </div>
            )}

            <div style={{ marginTop: 16 }}>
              <TrackLink
                league={bestBet.league}
                slug={bestBet.slug}
              >
                Get Best Odds
              </TrackLink>
            </div>
          </div>
        </div>
      )}

      {/* GRID (ANIMATED CLIENT COMPONENT) */}
      <AnimatedGrid>
        {predictions.map((p, i) => (
          <div
            key={i}
            style={{
              background: "#0f172a",
              borderRadius: 14,
              padding: 16,
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ fontWeight: 600 }}>
              {p.slug}
            </div>

            <div style={{ opacity: 0.6, fontSize: 13 }}>
              {p.league}
            </div>

            <div style={{ marginTop: 8 }}>
              <b>{p.prediction}</b>{" "}
              <span style={{ opacity: 0.6 }}>
                ({p.confidence}%)
              </span>
            </div>

            {p.odds && (
              <div style={{ fontSize: 12, opacity: 0.6 }}>
                Odds: {p.odds}
              </div>
            )}

            <div style={{ marginTop: 8, fontSize: 11 }}>
              {getBadge(p.confidence)}
            </div>

            <div style={{ marginTop: 12 }}>
              <TrackLink
                league={p.league}
                slug={p.slug}
              >
                Open Analysis
              </TrackLink>
            </div>
          </div>
        ))}
      </AnimatedGrid>
    </main>
  );
}