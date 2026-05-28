import fs from "fs";
import path from "path";

import Hero from "./components/Hero";
import SportNav from "./components/SportNav";
import MatchCard from "./components/MatchCard";
import TopBettingSites from "./components/TopBettingSites";
import Footer from "./components/Footer";

import { MatchCardData, SportType } from "./types/match";

type SportSection = {
  sport: SportType;
  hasMatches: boolean;
  message?: string;
  topPicks: MatchCardData[];
};

type PredictionsFile = {
  date: string;
  generatedAt: string;
  sports: SportSection[];
};

async function getPredictions(): Promise<PredictionsFile | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "predictions.json"
    );

    const data = fs.readFileSync(filePath, "utf-8");

    return JSON.parse(data);
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const predictions = await getPredictions();

  return (
    <main className="min-h-screen bg-[#060B14] text-white">
      <div className="mx-auto max-w-[1600px] px-4 py-5 md:px-6">

        {/* HERO */}
        <Hero />

        {/* SPORT NAV */}
        <div className="mt-5 flex justify-center">
          <SportNav />
        </div>

        {/* MAIN GRID */}
        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.45fr_0.7fr]">

          {/* LEFT SIDE */}
          <div className="space-y-10">

            {predictions?.sports.map((section) => (
              <section
                key={section.sport}
                id={section.sport.toLowerCase()}
              >
                {/* SECTION HEADER */}
                <div className="mb-5 flex items-center gap-4">
                  <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                    {section.sport}
                  </h2>

                  <div className="h-px flex-1 bg-[#1E293B]" />
                </div>

                {/* EMPTY STATE */}
                {!section.hasMatches && (
                  <div
                    className="
                      rounded-2xl
                      border border-[#1E293B]
                      bg-[#0F172A]
                      p-6

                      text-slate-400
                    "
                  >
                    {section.message || "No events today"}
                  </div>
                )}

                {/* MATCH GRID */}
                {section.hasMatches && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
                    {section.topPicks.map((pick) => (
                      <MatchCard
                        key={pick.id}
                        data={pick}
                      />
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="xl:sticky xl:top-5 h-fit">

            <div
              className="
                rounded-2xl
                border border-[#1E293B]
                bg-[#0F172A]
                p-5

                shadow-[0_10px_30px_rgba(0,0,0,0.5)]
              "
            >
              {/* HEADER */}
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-black text-white">
                  Top Betting Sites
                </h2>

                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-[10px] uppercase tracking-wider text-cyan-300">
                  Sponsored
                </span>
              </div>

              {/* CARDS */}
              <TopBettingSites />
            </div>
          </aside>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </main>
  );
}