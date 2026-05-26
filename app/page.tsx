import fs from "fs";
import path from "path";

import Hero from "./components/Hero";
import SportsNav from "./components/SportNav";
import MatchCard from "./components/MatchCard";
import TopBettingSites from "./components/TopBettingSites";
import Footer from "./components/Footer";

import { MatchCardData } from "./types/match";

async function getPredictions(): Promise<MatchCardData[]> {
  try {
    const filePath = path.join(process.cwd(), "data", "predictions.json");

    const data = fs.readFileSync(filePath, "utf-8");

    return JSON.parse(data);
  } catch {
    return [];
  }
}

const sports = [
  "Football",
  "NBA",
  "NFL",
  "Hockey",
  "Tennis",
];

export default async function HomePage() {
  const predictions = await getPredictions();

  return (
    <main
      style={{
        background: "#070b14",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Hero />

      <SportsNav />

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          gap: 28,
          alignItems: "flex-start",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            flex: 1,
          }}
        >
          {sports.map((sport) => {
            const sportPredictions = predictions.filter(
              (p) => p.sport === sport
            );

            return (
              <section
                key={sport}
                id={sport.toLowerCase()}
                style={{
                  marginBottom: 60,
                }}
              >
                <h2
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    marginBottom: 24,
                  }}
                >
                  {sport}
                </h2>

                <div
                  style={{
                    display: "grid",
                    gap: 18,
                  }}
                >
                  {sportPredictions.slice(0, 3).map((prediction) => (
                    <MatchCard
                      key={prediction.id}
                      data={prediction}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* RIGHT */}
        <aside
          style={{
            width: 340,
            position: "sticky",
            top: 24,
          }}
        >
          <TopBettingSites />
        </aside>
      </div>

      <Footer />
    </main>
  );
}