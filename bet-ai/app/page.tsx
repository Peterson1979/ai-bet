import Image from "next/image";
import TopBettingSites from "./components/TopBettingSites";
import MatchCard from "./components/MatchCard";

type AIResponse = {
  home: string;
  away: string;
  league: string;
  prediction: string;
  analysis: string;
  confidence: number;
};

async function getAI(home: string, away: string, league: string): Promise<AIResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ home, away, league }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("AI analysis failed");
  }

  return res.json();
}

function mapRisk(confidence: number): "Low" | "Medium" | "High" {
  if (confidence >= 75) return "Low";
  if (confidence >= 60) return "Medium";
  return "High";
}

export default async function HomePage() {
  // TEMP FIXED MATCH LIST (később DB-ből jön majd)
  const matches = [
    { home: "Arsenal", away: "Chelsea", league: "Premier League" },
    { home: "Inter", away: "Milan", league: "Serie A" },
    { home: "Barcelona", away: "Sevilla", league: "La Liga" },
  ];

  // AI CALLS (REAL ENGINE)
  const results = await Promise.all(
    matches.map((m) => getAI(m.home, m.away, m.league))
  );

  const featured = results[0];

  return (
    <main
      style={{
        background: "#070b14",
        color: "#e5e7eb",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* HERO (FULL IMAGE, NO CROPPING) */}
      <div
        style={{
          width: "100%",
          background: "#050814",
          display: "flex",
          justifyContent: "center",
          padding: "10px 0",
        }}
      >
        <div style={{ width: "min(1200px, 100%)" }}>
          <Image
            src="/hero.jpg"
            alt="AI Betting Predictions"
            width={1600}
            height={900}
            priority
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* FEATURED */}
      {featured && (
        <div style={{ padding: 28 }}>
          <div style={{ opacity: 0.7, marginBottom: 10 }}>
            FEATURED AI PREDICTION
          </div>

          <MatchCard
            home={featured.home}
            away={featured.away}
            league={featured.league}
            prediction={featured.prediction}
            analysis={featured.analysis}
            risk={mapRisk(featured.confidence)}
            slug={`${featured.home}-${featured.away}`}
          />
        </div>
      )}

      {/* ALL MATCHES */}
      <div
        style={{
          padding: 28,
          display: "grid",
          gap: 14,
        }}
      >
        {results.map((r, i) => (
          <MatchCard
            key={i}
            home={r.home}
            away={r.away}
            league={r.league}
            prediction={r.prediction}
            analysis={r.analysis}
            risk={mapRisk(r.confidence)}
            slug={`${r.home}-${r.away}`}
          />
        ))}
      </div>

      {/* SIDEBAR */}
      <div style={{ padding: 28 }}>
        <TopBettingSites />
      </div>
    </main>
  );
}