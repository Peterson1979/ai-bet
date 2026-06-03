import Header from "./components/Header";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import TopBettingSites from "./components/TopBettingSites";
import Footer from "./components/Footer";

import { getPredictions } from "@/app/lib/getPredictions";

import type { SportType } from "./types/match";
import type { PredictionCard } from "@/app/types/prediction";
import { toMatchCardData } from "@/app/lib/domain/matchMapper";

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

const sportLinks = [
  { id: "football", label: "⚽ Football" },
  { id: "nba", label: "🏀 NBA" },
  { id: "nfl", label: "🏈 NFL" },
  { id: "hockey", label: "🏒 Hockey" },
  { id: "tennis", label: "🎾 Tennis" },
  { id: "mlb", label: "⚾ MLB" },
  { id: "mma", label: "🥊 MMA" },
];

export default async function HomePage() {
  const predictions: PredictionsData | null = await getPredictions();

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#060B14] via-[#070D18] to-[#050A12]">

      <Header />

      {/* GLOBAL GLOW LAYER */}
      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute top-[-140px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[130px]" />
        <div className="absolute bottom-[-140px] right-10 h-[500px] w-[500px] rounded-full bg-purple-500/15 blur-[130px]" />
      </div>

      <div className="pt-[70px] relative z-10">
        <div className="mx-auto max-w-[1500px] px-4 pb-10 md:px-6">

          <Hero />

          {/* SPORT NAV (STRONGER 3D + BORDER) */}
          <div className="-mt-12 mb-14 flex flex-wrap justify-center gap-3 relative z-20">
            {sportLinks.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="
                  group relative
                  rounded-full
                  border-2 border-cyan-400/30
                  bg-[#0B1220]/70
                  px-5 py-2
                  text-sm font-bold
                  text-white
                  backdrop-blur-md
                  transition-all duration-300

                  hover:-translate-y-1
                  hover:scale-[1.03]

                  hover:border-cyan-200/80
                  hover:shadow-[0_0_25px_rgba(56,189,248,0.35)]
                  hover:text-cyan-200
                "
              >
                {s.label}

                <span className="absolute left-1/2 bottom-0 h-[2px] w-0 -translate-x-1/2 bg-cyan-300 transition-all duration-300 group-hover:w-2/3" />
              </a>
            ))}
          </div>

          {/* AFFILIATE BLOCK */}
          <section className="mt-6 rounded-[28px] border-2 border-cyan-400/30 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-10 min-h-[260px] flex items-center justify-center text-center shadow-[0_25px_70px_rgba(0,0,0,0.45)]">

            <div>
              <h3 className="text-2xl font-black text-white">
                Premium Betting Offers
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                Place your affiliate banners, sportsbook promos or rotating offers here.
              </p>
            </div>

          </section>

          {/* MAIN GRID */}
          <div className="mt-12 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.6fr)_420px]">

            <div className="min-w-0">

              {predictions?.sports?.map((sportBlock) => (
                <section
                  key={sportBlock.sport}
                  id={sportBlock.sport.toLowerCase()}
                  className="mb-16 scroll-mt-28"
                >

                  <div className="mb-6 flex items-center gap-4">
                    <h2 className="text-2xl font-black md:text-3xl">
                      {sportBlock.sport}
                    </h2>

                    <div className="h-[2px] flex-1 bg-gradient-to-r from-cyan-400/60 to-transparent" />
                  </div>

                  {!sportBlock.hasMatches ? (
                    <div className="rounded-[24px] border-2 border-[#334155] bg-[#0F172A] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
                      <p className="text-slate-300">{sportBlock.message}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">

                      {sportBlock.topPicks.map((p) => {
                        const uiData = toMatchCardData(
                          p,
                          sportBlock.sport as SportType
                        );

                        return (
                          <div
                            key={p.id}
                            className="
                              transition-all duration-300
                              hover:-translate-y-2
                              hover:scale-[1.02]
                              hover:shadow-[0_25px_60px_rgba(56,189,248,0.15)]
                            "
                          >
                            <MatchCard data={uiData} />
                          </div>
                        );
                      })}

                    </div>
                  )}

                </section>
              ))}
            </div>

            <aside className="h-fit xl:sticky xl:top-5">

              <div className="rounded-[28px] border-2 border-cyan-400/30 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-5 shadow-[0_25px_70px_rgba(0,0,0,0.5)]">

                <h2 className="text-2xl font-black text-white">
                  Top Betting Sites
                </h2>

                <p className="mt-1 text-sm text-slate-300 mb-5">
                  Recommended sportsbooks & offers
                </p>

                <TopBettingSites />
              </div>

            </aside>

          </div>

          <div className="mt-16">
            <Footer />
          </div>

        </div>
      </div>

    </main>
  );
}