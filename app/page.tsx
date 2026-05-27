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

const sports: MatchCardData["sport"][] = [
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

        {/* HERO */}
        <Hero />

        {/* NAV */}
        <div className="mt-6">
          <SportNav />
        </div>

        {/* MAIN LAYOUT */}
        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[1.8fr_1.1fr]">

          {/* LEFT CONTENT */}
          <div className="space-y-10 md:space-y-8">

            {sports.map((sport) => {
              const sportPredictions = predictions
                .filter((p) => p.sport === sport)
                .slice(0, 3);

              return (
                <section key={sport} id={sport.toLowerCase()}>

                  {/* HEADER */}
                  <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                    <h2 className="text-xl font-bold text-white md:text-2xl">
                      {sport}
                    </h2>

                    <div className="h-[1px] flex-1 bg-[#1E293B]" />
                  </div>

                  {/* CARDS */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                    {sportPredictions.map((prediction) => (
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
          <aside className="h-fit space-y-6 xl:sticky xl:top-6">

            <div className="rounded-[22px] border border-[#1E293B] bg-[#0F172A] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">
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

        {/* FOOTER */}
        <div className="mt-14">
          <Footer />
        </div>

      </div>
    </main>
  );
}