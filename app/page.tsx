import fs from "fs";
import path from "path";

import Hero from "./components/Hero";
import SportNav from "./components/SportNav";
import MatchCard from "./components/MatchCard";
import TopBettingSites from "./components/TopBettingSites";
import Footer from "./components/Footer";

type PredictionCard = {
  id: string;

  league: string;

  eventId: string;

  homeTeam: string;

  awayTeam: string;

  startTime: string;

  recommendedBet: string;

  betCode: string;

  marketType: string;

  selectionKey: string;

  explanation: string;

  confidence: number;

  risk: number;

  odds: number;

  oddsLabel: string;

  bookmaker: string;

  bookmakerUrl: string;

  ctaLabel: string;

  isTopPick: boolean;

  status: string;
};

type SportBlock = {
  sport: string;

  hasMatches: boolean;

  message?: string;

  topPicks: PredictionCard[];
};

type PredictionsData = {
  date: string;

  generatedAt: string;

  sports: SportBlock[];
};

async function getPredictions(): Promise<PredictionsData | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "predictions.json"
    );

    const data = fs.readFileSync(
      filePath,
      "utf-8"
    );

    return JSON.parse(data);
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const predictions =
    await getPredictions();

  return (
<main className="min-h-screen bg-[#060B14] text-white overflow-x-hidden">
      <div className="mx-auto max-w-[1500px] px-4 py-5 md:px-6">
        <Hero />

        <div className="mt-6 flex justify-center">
          <SportNav />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[1.6fr_420px] items-start">
          {/* LEFT */}
          <div>
            {predictions?.sports.map(
              (sportBlock) => (
                <section
                  key={sportBlock.sport}
                  id={sportBlock.sport.toLowerCase()}
                  className="mb-12"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                      {sportBlock.sport}
                    </h2>

                    <div className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-cyan-400/40 to-transparent" />
                  </div>

                  {!sportBlock.hasMatches ? (
                    <div className="rounded-[24px] border border-[#334155] bg-[#0F172A] p-6 shadow-[0_0_25px_rgba(15,23,42,0.9)]">
                      <p className="text-base text-slate-300">
                        {sportBlock.message}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
                      {sportBlock.topPicks.map(
                        (prediction) => (
                          <MatchCard
                            key={prediction.id}
                            data={{
                              ...prediction,

                              eventName: `${prediction.homeTeam} vs ${prediction.awayTeam}`,

                              shortAnalysis:
                                prediction.explanation,

                              riskScore:
                                prediction.risk,

                              startTimeUtc:
                                prediction.startTime,

                              disclaimer:
                                "Odds may change before match start.",

                              ctaUrl:
                                prediction.bookmakerUrl,
                            }}
                          />
                        )
                      )}
                    </div>
                  )}
                </section>
              )
            )}
          </div>

          {/* RIGHT */}
          <aside className="h-fit xl:sticky xl:top-5">
            <div className="rounded-[28px] border border-cyan-400/30 bg-gradient-to-b from-[#111827] to-[#0F172A] p-5 shadow-[0_0_40px_rgba(56,189,248,0.15)]">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-black tracking-tight text-white">
                  Top Betting Sites
                </h2>

                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
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