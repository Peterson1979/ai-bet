import fs from "fs";
import path from "path";
import Image from "next/image";
import TopBettingSites from "./components/TopBettingSites";

type Prediction = {
  slug: string;
  league: string;
  home: string;
  away: string;
  prediction: string;
  confidence: number;
  odds?: number;
  analysis?: string;
};

function getRisk(conf: number, odds?: number) {
  if (!odds) return "Unknown";

  const implied = 100 / odds;
  const edge = conf - implied;

  if (edge >= 8) return "Low risk";
  if (edge >= 0) return "Medium risk";
  return "High risk";
}

function getTip(conf: number) {
  if (conf >= 80) return "Strong pick";
  if (conf >= 65) return "Moderate pick";
  return "Speculative pick";
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
      {/* HERO - FIXED (NO CROPPING) */}
      <div
        style={{
          width: "100%",
          background: "#050814",
          display: "flex",
          justifyContent: "center",
          padding: "12px 0",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "min(1200px, 100%)",
            height: "auto",
          }}
        >
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
            }}
          />
        </div>
      </div>

      {/* CONTENT WRAPPER */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          padding: 28,
          alignItems: "flex-start",
        }}
      >
        {/* LEFT */}
        <div style={{ flex: "2 1 600px" }}>
          {/* FEATURED */}
          {featured && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ opacity: 0.7, marginBottom: 10 }}>
                FEATURED MATCH
              </div>

              <div
                style={{
                  background: "#0f172a",
                  borderRadius: 14,
                  padding: 16,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ fontWeight: 700 }}>
                  {featured.home} vs {featured.away}
                </div>

                <div style={{ opacity: 0.6, fontSize: 13 }}>
                  {featured.league}
                </div>

                <div style={{ marginTop: 10, fontSize: 13 }}>
                  <b>Short analysis:</b>{" "}
                  {featured.analysis ||
                    `${featured.home} shows stronger form than ${featured.away}.`}
                </div>

                <div style={{ marginTop: 8 }}>
                  <b>Safest betting tip:</b> {featured.prediction}
                </div>

                <div style={{ marginTop: 6, opacity: 0.8 }}>
                  Risk level: {getRisk(featured.confidence, featured.odds)}
                </div>

                <div style={{ marginTop: 6, opacity: 0.7 }}>
                  {getTip(featured.confidence)}
                </div>

                {featured.odds && (
                  <div style={{ marginTop: 6, fontSize: 12 }}>
                    Odds: {featured.odds}
                  </div>
                )}

                <a
                  href={`#affiliate-${featured.slug}`}
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
                  BET NOW
                </a>
              </div>
            </div>
          )}

          {/* ALL MATCHES */}
          <div>
            <div style={{ opacity: 0.7, marginBottom: 10 }}>
              ALL MATCHES
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              {sorted.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: "#0f172a",
                    borderRadius: 14,
                    padding: 16,
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>
                    {p.home} vs {p.away}
                  </div>

                  <div style={{ opacity: 0.6, fontSize: 13 }}>
                    {p.league}
                  </div>

                  <div style={{ marginTop: 10, fontSize: 13 }}>
                    <b>Short analysis:</b>{" "}
                    {p.analysis ||
                      `${p.home} has statistical edge over ${p.away}.`}
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <b>Safest betting tip:</b> {p.prediction}
                  </div>

                  <div style={{ marginTop: 6, opacity: 0.8 }}>
                    Risk level: {getRisk(p.confidence, p.odds)}
                  </div>

                  <div style={{ marginTop: 6, opacity: 0.7 }}>
                    {getTip(p.confidence)}
                  </div>

                  {p.odds && (
                    <div style={{ marginTop: 6, fontSize: 12 }}>
                      Odds: {p.odds}
                    </div>
                  )}

                  <a
                    href={`#affiliate-${p.slug}`}
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
                    BET NOW
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ flex: "1 1 280px" }}>
          <TopBettingSites />
        </div>
      </div>
    </main>
  );
}