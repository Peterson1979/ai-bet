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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function getAI(home: string, away: string, league: string): Promise<AIResponse> {
  try {
    const res = await fetch(`${BASE_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ home, away, league }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error("API error");

    return await res.json();
  } catch {
    return {
      home,
      away,
      league,
      prediction: "No prediction",
      analysis: "AI temporarily unavailable",
      confidence: 50,
    };
  }
}

function mapRisk(confidence: number): "Low" | "Medium" | "High" {
  if (confidence >= 75) return "Low";
  if (confidence >= 60) return "Medium";
  return "High";
}

export default async function HomePage() {
  const matches = [
    { home: "Arsenal", away: "Chelsea", league: "Premier League" },
    { home: "Inter", away: "Milan", league: "Serie A" },
    { home: "Barcelona", away: "Sevilla", league: "La Liga" },
  ];

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
      {/* HERO - FULL IMAGE FIX */}
      <div style={{ width: "100%", background: "#050814" }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Image
            src="/hero.jpg"
            alt="AI Betting"
            width={1600}
            height={900}
            priority
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          padding: 28,
          alignItems: "flex-start",
        }}
      >
        {/* LEFT SIDE */}
        <div style={{ flex: "2 1 600px" }}>
          {/* FEATURED */}
          {featured && (
            <div style={{ marginBottom: 20 }}>
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

          {/* MATCH LIST */}
          <div style={{ display: "grid", gap: 14 }}>
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
        </div>

        {/* RIGHT SIDE */}
        <div style={{ flex: "1 1 280px" }}>
          <TopBettingSites />
        </div>
      </div>
    </main>
  );
}