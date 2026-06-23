import Header from "../components/Header";
import Hero from "../components/Hero";
import MatchCard from "../components/MatchCard";
import TopBettingSites from "../components/TopBettingSites";
import Footer from "../components/Footer";
import { getPredictions } from "../lib/getPredictions";
import { translations, Lang } from "@/app/lib/i18n";
import type { SportType } from "../types/match";
import type { PredictionCard } from "@/app/types/prediction";
import { toMatchCardData } from "@/app/lib/domain/matchMapper";
import type { Metadata } from "next";
import AffiliateSlider from "../components/AffiliateSlider";



const SUPPORTED_LANGS = ["en", "hu", "es", "de", "fr", "pt", "it", "hi", "ar", "zh", "ja"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://matchsignal.pro";

  const languages: Record<string, string> = {};
  SUPPORTED_LANGS.forEach((l) => {
    languages[l] = `${baseUrl}/${l}`;
  });

  return {
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages,
    },
  };
}

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

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;

  const predictions: PredictionsData | null = await getPredictions();

  const t = translations[lang] ?? translations.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.seoTitle,
    description: t.seoDescription,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  };

  const sportKeyMap: Record<string, keyof typeof t.sports> = {
    football: "football",
    soccer: "football",
    nba: "nba",
    nfl: "nfl",
    hockey: "hockey",
    tennis: "tennis",
    mlb: "mlb",
    mma: "mma",
  };

  const sportLinks = [
    { id: "football", label: t.sports.football },
    { id: "nba", label: t.sports.nba },
    { id: "nfl", label: t.sports.nfl },
    { id: "hockey", label: t.sports.hockey },
    { id: "tennis", label: t.sports.tennis },
    { id: "mlb", label: t.sports.mlb },
    { id: "mma", label: t.sports.mma },
  ];

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#060B14] via-[#070D18] to-[#050A12]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute top-[-140px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[130px]" />
        <div className="absolute bottom-[-140px] right-10 h-[500px] w-[500px] rounded-full bg-purple-500/15 blur-[130px]" />
      </div>

      <div className="pt-[70px] relative z-10">
        <div className="mx-auto max-w-[1500px] px-4 pb-10 md:px-6">

          <Hero lang={lang} />



          {/* SPORT NAV */}
          <div className="-mt-12 mb-14 flex flex-wrap justify-center gap-3 relative z-20">
            {sportLinks.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group relative rounded-full border-2 border-cyan-300/40 bg-[#0A1220]/80 px-6 py-2 text-sm font-extrabold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-2 hover:scale-[1.06] hover:border-cyan-200 hover:shadow-[0_0_35px_rgba(34,211,238,0.55)] hover:text-cyan-100"
              >
                {s.label}
                <span className="absolute left-1/2 bottom-0 h-[3px] w-0 -translate-x-1/2 bg-cyan-300 transition-all duration-300 group-hover:w-3/4" />
              </a>
            ))}
          </div>
<AffiliateSlider />
          {/* MAIN GRID */}
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.6fr)_420px] mt-16">
            <div className="min-w-0">

              {/* TOP PICKS */}
              <section id="top-picks" className="mb-16 scroll-mt-28">
                <div className="mb-6 flex flex-col items-center">
                  <h2 className="text-3xl font-black tracking-tight text-center">
                    {t.topPicks}
                  </h2>

                  <div className="mt-3 h-[3px] w-64 bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
                </div>
              </section>

              {predictions?.sports?.map((sportBlock) => {
                const activePicks = sportBlock.topPicks.filter(
                  (p) => new Date(p.startTime) > new Date()
                );

                return (
                  <section
                    key={sportBlock.sport}
                    id={sportBlock.sport.toLowerCase()}
                    className="mb-16 scroll-mt-28"
                  >
                    <div className="mb-6 flex items-center gap-4">
                      <h2 className="text-3xl font-black tracking-tight">
                        {
                          t.sports[
                            sportKeyMap[
                              sportBlock.sport.toLowerCase()
                            ] ?? "football"
                          ]
                        }
                      </h2>

                      <div className="h-[3px] flex-1 bg-gradient-to-r from-cyan-300/80 to-transparent" />
                    </div>

                    {!sportBlock.hasMatches || activePicks.length === 0 ? (
                      <div className="rounded-[24px] border-2 border-cyan-300/20 bg-[#0B1220] p-6">
                        <p className="text-slate-300">
                          {sportBlock.message ?? t.noMatches}
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
                        {activePicks.map((p) => {
                          const uiData = toMatchCardData(
                            p,
                            sportBlock.sport as SportType
                          );

                          return (
                            <div
                              key={p.id}
                              className="transition-all duration-200 hover:-translate-y-3 hover:scale-[1.05] hover:shadow-[0_35px_90px_rgba(34,211,238,0.25)]"
                            >
                              <MatchCard
                                data={uiData}
                                lang={lang}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            <aside className="h-fit xl:sticky xl:top-5">
              <div className="rounded-[28px] border-2 border-cyan-300/50 bg-gradient-to-b from-[#0A1220] via-[#0E1626] to-[#0A1220] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
                <h2 className="text-2xl font-black text-white">
                  {t.recommendedSites}
                </h2>

                <p className="mt-1 text-sm text-slate-300 mb-5">
                  {t.recommendedSitesDesc ?? ""}
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