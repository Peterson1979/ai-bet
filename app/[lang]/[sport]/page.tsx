import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SportSection from "@/app/components/SportSection";
import AffiliateSlider from "@/app/components/AffiliateSlider";
import TopRatedSportsbooksList from "@/app/components/TopRatedSportsbooksList";

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

  const t = translations[lang] ?? translations.en;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://matchsignal.pro";


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


  const sportKey =
    sportKeyMap[sport.toLowerCase()] ?? "football";


  const sportName =
    t.sports[sportKey];


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
      `${t.sportPageTitle.replace("{SPORT}", sportName)} | MatchSignal`,

    description:
      t.sportPageDescription.replace("{SPORT}", sportName),

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

  const predictions: PredictionsData | null =
    await getPredictions();

  const t = translations[lang] ?? translations.en;
console.log("CURRENT LANG:", lang);
console.log("TITLE TEMPLATE:", t.sportPageTitle);
console.log("DESCRIPTION TEMPLATE:", t.sportPageDescription);

  const sportBlock = predictions?.sports.find(
    (item) =>
      item.sport.toLowerCase() === sport.toLowerCase()
  );


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


  const sportKey =
    sportKeyMap[sport.toLowerCase()] ?? "football";


  const sportName =
    t.sports[sportKey];


  const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name":
        t.faqPredictionQuestion.replace("{SPORT}", sportName),
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          t.faqPredictionAnswer,
      },
    },
    {
      "@type": "Question",
      "name":
        t.faqFreeQuestion.replace("{SPORT}", sportName),
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          t.faqFreeAnswer,
      },
    },
  ],
};

  // A 12 kártyát 6+6-ra vágjuk, hogy a kompakt "Top Betting Sites" sáv
  // pontosan a két csoport közé kerülhessen.
  const HALF = Math.ceil(SPORTPAGE_MATCH_LIMIT / 2); // 6

  const now = new Date();
  const futurePicks = sportBlock
    ? sportBlock.topPicks
        .filter((p) => new Date(p.startTime) > now)
        .slice(0, SPORTPAGE_MATCH_LIMIT)
    : [];

  const firstHalfBlock: SportBlock | undefined = sportBlock
    ? { ...sportBlock, topPicks: futurePicks.slice(0, HALF) }
    : undefined;

  const secondHalfBlock: SportBlock | undefined = sportBlock
    ? { ...sportBlock, topPicks: futurePicks.slice(HALF) }
    : undefined;

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#060B14] via-[#070D18] to-[#050A12]">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />


      <Header />


      <div className="pt-[90px] relative z-10">

        <div className="mx-auto max-w-[1500px] px-4 pb-10 md:px-6">


          <AffiliateSlider />


          {sportBlock && futurePicks.length > 0 ? (
            <>
              <SportSection
                sportBlock={firstHalfBlock!}
                lang={lang}
                limit={HALF}
              />

              <TopRatedSportsbooksList
                lang={lang}
                variant="inline"
                title={t.recommendedSites}
              />

              {secondHalfBlock!.topPicks.length > 0 && (
                <SportSection
                  sportBlock={secondHalfBlock!}
                  lang={lang}
                  limit={HALF}
                />
              )}
            </>
          ) : (

            <div className="rounded-[24px] border-2 border-cyan-300/20 bg-[#0B1220] p-6">

              <p className="text-slate-300">
                {sportBlock?.message ?? t.noMatches}
              </p>

            </div>

          )}


          <div className="mt-16">

            <Footer />

          </div>


        </div>

      </div>

    </main>
  );
}