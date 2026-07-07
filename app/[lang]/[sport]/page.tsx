import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import TopBettingSites from "@/app/components/TopBettingSites";
import SportSection from "@/app/components/SportSection";
import AffiliateSlider from "@/app/components/AffiliateSlider";

import { getPredictions } from "@/app/lib/getPredictions";
import { translations, Lang } from "@/app/lib/i18n";
import { SPORTPAGE_MATCH_LIMIT } from "@/app/lib/displayConfig";

import type { PredictionCard } from "@/app/types/prediction";
import type { Metadata } from "next";


export async function generateMetadata({
  params,
}: {
  params: Promise<{
    lang: Lang;
    sport: string;
  }>;
}): Promise<Metadata> {

  const { lang, sport } = await params;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://matchsignal.pro";


  const sportNames: Record<string, string> = {
    football: "Football",
    nba: "NBA",
    nfl: "NFL",
    hockey: "Hockey",
    tennis: "Tennis",
    mlb: "MLB",
    mma: "MMA",
  };


  const sportName =
    sportNames[sport.toLowerCase()] ?? sport;


  const languages: Record<string, string> = {};

  const supportedLangs = [
    "en",
    "hu",
    "es",
    "de",
    "fr",
    "pt",
    "it",
    "hi",
    "ar",
    "zh",
    "ja",
  ];


  supportedLangs.forEach((l) => {
    languages[l] =
      `${baseUrl}/${l}/${sport}`;
  });


  return {
    title:
      `${sportName} Predictions & AI Betting Analysis | MatchSignal`,

    description:
      `${sportName} AI betting predictions, match analysis, odds comparison and value betting insights.`,

    alternates: {
      canonical:
        `${baseUrl}/${lang}/${sport}`,

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


export default async function SportPage({
  params,
}: {
  params: Promise<{
    lang: Lang;
    sport: string;
  }>;
}) {

  const { lang, sport } = await params;

  const predictions: PredictionsData | null = await getPredictions();

  const t = translations[lang] ?? translations.en;


  const sportBlock = predictions?.sports.find(
    (item) =>
      item.sport.toLowerCase() === sport.toLowerCase()
  );


  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#060B14] via-[#070D18] to-[#050A12]">

      <Header />

      <div className="pt-[90px] relative z-10">

        <div className="mx-auto max-w-[1500px] px-4 pb-10 md:px-6">

          <AffiliateSlider />


          {sportBlock ? (

            <SportSection
              sportBlock={sportBlock}
              lang={lang}
              limit={SPORTPAGE_MATCH_LIMIT}
            />

          ) : (

            <div className="rounded-[24px] border-2 border-cyan-300/20 bg-[#0B1220] p-6">

              <p className="text-slate-300">
                {t.noMatches}
              </p>

            </div>

          )}


          <aside className="mt-16">

            <div className="rounded-[28px] border-2 border-cyan-300/50 bg-gradient-to-b from-[#0A1220] via-[#0E1626] to-[#0A1220] p-5">

              <h2 className="text-2xl font-black text-white">
                {t.recommendedSites}
              </h2>


              <p className="mt-1 text-sm text-slate-300 mb-5">
                {t.recommendedSitesDesc ?? ""}
              </p>


              <TopBettingSites />

            </div>

          </aside>


          <div className="mt-16">

            <Footer />

          </div>


        </div>

      </div>

    </main>
  );
}