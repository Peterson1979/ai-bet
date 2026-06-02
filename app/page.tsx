import Header from "./components/Header";
import Hero from "./components/Hero";
import SportNav from "./components/SportNav";
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

export default async function HomePage() {
  const predictions: PredictionsData | null = await getPredictions();

  return (
    <main className="min-h-screen bg-[#060B14] text-white">

      <Header />

      <div className="pt-[70px]">
        <div className="mx-auto max-w-[1500px] px-4 pb-10 md:px-6">

          {/* HERO */}
          <Hero />

          {/* SPORT NAV (hero alatt) */}
          <div className="mt-6">
            <SportNav />
          </div>

          {/* AFFILIATE BLOCK (hero + nav alatt) */}
          <section className="mt-8 rounded-[28px] border border-cyan-400/20 bg-[#0B1220] p-8 min-h-[180px] flex items-center justify-center text-center">
            <div>
              <h3 className="text-xl font-black text-white">
                Premium Betting Offers
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                Place your affiliate banners, sportsbook promos or rotating offers here.
              </p>
            </div>
          </section>

          {/* LEFT + RIGHT LAYOUT */}
          <div
            className="
              mt-12
              grid
              grid-cols-1
              gap-8
              xl:grid-cols-[minmax(0,1.6fr)_420px]
              items-start
            "
          >

            {/* LEFT */}
            <div className="min-w-0">

              {predictions?.sports?.map((sportBlock) => (
                <section
                  key={sportBlock.sport}
                  id={sportBlock.sport.toLowerCase()}
                  className="mb-14 scroll-mt-28"
                >

                  {/* SECTION HEADER */}
                  <div className="mb-6 flex items-center gap-4">
                    <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                      {sportBlock.sport}
                    </h2>

                    <div className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-cyan-400/40 to-transparent" />
                  </div>

                  {/* EMPTY STATE */}
                  {!sportBlock.hasMatches ? (
                    <div className="rounded-[24px] border border-[#334155] bg-[#0F172A] p-6">
                      <p className="text-slate-300">
                        {sportBlock.message}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
                      {sportBlock.topPicks.map((p) => {
                        const uiData = toMatchCardData(
                          p,
                          sportBlock.sport as SportType
                        );

                        return (
                          <MatchCard
                            key={p.id}
                            data={uiData}
                          />
                        );
                      })}
                    </div>
                  )}

                </section>
              ))}
            </div>

            {/* SIDEBAR */}
            <aside className="h-fit xl:sticky xl:top-5">
              <div className="rounded-[28px] border border-cyan-400/30 bg-gradient-to-b from-[#111827] to-[#0F172A] p-5">

                <div className="mb-6">
                  <h2 className="text-2xl font-black text-white">
                    Top Betting Sites
                  </h2>

                  <p className="mt-1 text-sm text-slate-300">
                    Recommended sportsbooks & offers
                  </p>
                </div>

                <TopBettingSites />

                <div className="mt-6 rounded-2xl border border-cyan-400/15 bg-[#0B1220] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                    AI Insights
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Daily AI betting analysis across Football, NBA, NFL, Hockey and Tennis.
                  </p>
                </div>

              </div>
            </aside>

          </div>

          {/* UNIFIED METRICS (ONLY HERE, BOTTOM) */}
          <section className="mt-20 rounded-[28px] border border-cyan-400/20 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6 shadow-[0_0_40px_rgba(56,189,248,0.08)]">

            <h2 className="text-xl font-black text-white">
              Betting Intelligence System
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              AI evaluates each pick using confidence, expected value and market risk signals.
              This system highlights betting quality across all sports and markets.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4 text-sm font-bold">

              <div className="text-emerald-300">🟢 VALUE BET</div>
              <div className="text-yellow-300">🟡 OK BET</div>
              <div className="text-red-300">🔴 RISKY</div>
              <div className="text-cyan-300">✔️ AI EV SCORE</div>

            </div>

          </section>

          {/* FOOTER */}
          <div className="mt-16">
            <Footer />
          </div>

        </div>
      </div>

    </main>
  );
}