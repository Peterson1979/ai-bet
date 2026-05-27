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

const sports = ["Football", "NBA", "NFL", "Hockey", "Tennis"];

// MOCK kiegészítés (ha kevés adat van)
function fillToThree(items: MatchCardData[], sport: string): MatchCardData[] {
  const base = items.filter((p) => p.sport === sport);

  while (base.length < 3) {
    base.push({
      id: `${sport}-mock-${base.length}`,
      sport: sport as any,
      league: `${sport} League`,
      eventName: `Mock Match ${base.length + 1}`,
      startTimeUtc: "2026-01-01 18:00 UTC",
      status: "upcoming",
      verdict: "Value Bet",
      recommendedBet: "Home Win",
      confidence: 72,
      riskScore: 35,
      shortAnalysis: "AI-generated sample prediction for layout testing.",
      ctaLabel: "Check Odds",
      ctaUrl: "#",
      bookmakerName: "MockBook",
      disclaimer: "18+ | Gamble responsibly",
      updatedAt: "now",
    });
  }

  return base.slice(0, 3);
}

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

          {/* LEFT */}
          <div>
            {sports.map((sport) => {
              const sportPredictions = fillToThree(predictions, sport);

              return (
                <section key={sport} id={sport.toLowerCase()} className="mb-10">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{sport}</h2>
                    <div className="h-[1px] flex-1 bg-slate-800 ml-5" />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {sportPredictions.map((prediction) => (
                      <MatchCard key={prediction.id} data={prediction} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* RIGHT */}
          <aside className="xl:sticky xl:top-5 h-fit">
            <div className="rounded-[22px] border border-[#1E293B] bg-[#0F172A] p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold">
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