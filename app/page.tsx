import fs from "fs";
import path from "path";

import Hero from "./components/Hero";
import SportNav from "./components/SportNav";
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
    <main className="min-h-screen bg-[#060B14] text-white">
      <div className="mx-auto max-w-[1500px] px-4 py-5 md:px-6">
        <Hero />

        <div className="mt-6">
          <SportNav />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
          {/* LEFT CONTENT */}
          <div>
            {sports.map((sport) => {
              const sportPredictions = predictions.filter(
                (p) => p.sport === sport
              );

              return (
                <section
                  key={sport}
                  id={sport.toLowerCase()}
                  className="mb-10"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                      {sport}
                    </h2>

                    <div className="h-[1px] flex-1 bg-slate-800 ml-5" />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
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

          {/* RIGHT SIDEBAR */}
          <aside className="xl:sticky xl:top-5 h-fit">
            <div className="rounded-[22px] border border-[#1E293B] bg-[#0F172A] p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  Top Betting Sites
                </h2>

                <span className="text-xs text-slate-500">
                  Sponsored
                </span>
              </div>

              <TopBettingSites />
            </div>
          </aside>
        </div>

        <Footer />
      </div>
    </main>
  );
}