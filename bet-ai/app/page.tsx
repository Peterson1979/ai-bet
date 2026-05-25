import fs from "fs";
import path from "path";
import Image from "next/image";
import MatchCard from "./components/MatchCard";
import TopBettingSites from "./components/TopBettingSites";

type Prediction = {
  slug: string;
  league: string;
  home: string;
  away: string;
  prediction: string;
  confidence: number;
  odds?: number;
};

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

  const sorted = [...predictions].sort(
    (a, b) => b.confidence - a.confidence
  );

  const featured = sorted[0];

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
            height: "320px",
            objectFit: "cover",
            filter: "contrast(1.1) saturate(1.1)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(7,11,20,1), rgba(7,11,20,0.2))",
            display: "flex",
            alignItems: "flex-end",
            padding: 28,
          }}
        >
          <div>
            <h1 style={{ fontSize: 38, margin: 0 }}>
              AI Betting Dashboard
            </h1>
            <p style={{ opacity: 0.7, marginTop: 6 }}>
              Structured AI predictions with bookmaker odds comparison
            </p>
          </div>
        </div>
      </div>

      {/* FEATURED */}
      {featured && (
        <div style={{ padding: 28 }}>
          <div style={{ marginBottom: 10, opacity: 0.7 }}>
            FEATURED MATCH
          </div>

          <MatchCard
            slug={featured.slug}
            league={featured.league}
            home={featured.home}
            away={featured.away}
            prediction={featured.prediction}
            confidence={featured.confidence}
            odds={featured.odds}
          />
        </div>
      )}

      {/* ALL MATCHES */}
      <div style={{ padding: 28 }}>
        <div style={{ marginBottom: 12, opacity: 0.7 }}>
          ALL MATCHES
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          {sorted.map((p, i) => (
            <MatchCard
              key={i}
              slug={p.slug}
              league={p.league}
              home={p.home}
              away={p.away}
              prediction={p.prediction}
              confidence={p.confidence}
              odds={p.odds}
            />
          ))}
        </div>
      </div>

      {/* TOP BETTING SITES MODULE */}
      <TopBettingSites />
    </main>
  );
}