import { GUIDES_LABEL } from "@/app/lib/localizedUiCopy";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SportSection from "@/app/components/SportSection";
import SportGuide from "@/app/components/SportGuide";
import AffiliateSlider from "@/app/components/AffiliateSlider";
import PartnerSportsbooksList from "@/app/components/PartnerSportsbooksList";

import { getPredictions } from "@/app/lib/getPredictions";
import { translations, Lang } from "@/app/lib/i18n";
import { SPORTPAGE_MATCH_LIMIT } from "@/app/lib/displayConfig";
import { SPORT_EMOJIS } from "@/app/lib/sportsConfig";

import type { PredictionCard } from "@/app/types/prediction";
import type { Metadata } from "next";

const SPORT_KEY_MAP: Record<
  string,
  "football" | "nba" | "nfl" | "hockey" | "tennis" | "mlb" | "mma"
> = {
  football: "football",
  nba: "nba",
  nfl: "nfl",
  hockey: "hockey",
  tennis: "tennis",
  mlb: "mlb",
  mma: "mma",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    lang: Lang;
    sport: string;
  }>;
}): Promise<Metadata> {
  const { lang, sport } = await params;

  const sportKey = SPORT_KEY_MAP[sport.toLowerCase()];

  if (!sportKey) {
    notFound();
  }

  const t = translations[lang] ?? translations.en;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.matchsignal.pro";

  const sportName = t.sports[sportKey];

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
    languages[l] = `${baseUrl}/${l}/${sport}`;
  });
  languages["x-default"] = `${baseUrl}/en/${sport}`;

  return {
    title: `${t.sportPageTitle.replace("{SPORT}", sportName)} | MatchSignal`,
    description: t.sportPageDescription.replace("{SPORT}", sportName),
    alternates: {
      canonical: `${baseUrl}/${lang}/${sport}`,
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

  const sportKey = SPORT_KEY_MAP[sport.toLowerCase()];

  if (!sportKey) {
    notFound();
  }

  const countryCode = lang === "hu" ? "HU" : undefined;
  const predictions: PredictionsData | null = await getPredictions();

  const t = translations[lang] ?? translations.en;

  const sportBlock = predictions?.sports.find(
    (item) => item.sport.toLowerCase() === sportKey
  );

  const sportName = t.sports[sportKey];
  const emoji = SPORT_EMOJIS[sportKey] ?? "🏆";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t.faqPredictionQuestion.replace("{SPORT}", sportName),
        acceptedAnswer: {
          "@type": "Answer",
          text: t.faqPredictionAnswer,
        },
      },
      {
        "@type": "Question",
        name: t.faqFreeQuestion.replace("{SPORT}", sportName),
        acceptedAnswer: {
          "@type": "Answer",
          text: t.faqFreeAnswer,
        },
      },
    ],
  };

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
          {/* PRIMARY SPORT HEADING (GUARANTEED SINGLE H1) */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{emoji}</span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                {t.sportPageTitle.replace("{SPORT}", sportName)}
              </h1>
            </div>
            <p className="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
              {t.sportPageDescription.replace("{SPORT}", sportName)}
            </p>
          </div>

          {/* DYNAMIC MATCH CARDS OR INFORMATIVE EMPTY STATE */}
          {sportBlock && futurePicks.length > 0 ? (
            <>
              <SportSection
                sportBlock={firstHalfBlock!}
                lang={lang}
                  countryCode={countryCode}
                limit={HALF}
                hideHeading={true}
              />

              <PartnerSportsbooksList lang={lang} countryCode={countryCode} variant="inline" showDisclosure={false} />

              {secondHalfBlock!.topPicks.length > 0 && (
                <SportSection
                  sportBlock={secondHalfBlock!}
                  lang={lang}
                  countryCode={countryCode}
                  limit={HALF}
                  hideHeading={true}
                />
              )}
            </>
          ) : (
            <div className="rounded-[24px] border-2 border-cyan-400/20 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6 md:p-10 mb-8 text-center shadow-[0_0_30px_rgba(56,189,248,0.05)]">
              <div className="mx-auto w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-2xl mb-4">
                {emoji}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                {t.sportGuide?.noMatchesTitle?.replace("{SPORT}", sportName) ??
                  t.noMatches}
              </h2>
              <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
                {t.sportGuide?.noMatchesDesc?.replace("{SPORT}", sportName) ??
                  t.noMatches}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                    href={`/${lang}/guides`}
                    className="px-5 py-2.5 rounded-xl border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 text-sm font-bold hover:bg-cyan-500/20 transition"
                  >{GUIDES_LABEL[lang] ?? GUIDES_LABEL.en}</Link>
                <Link
                  href={`/${lang}/tools`}
                  className="px-5 py-2.5 rounded-xl border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 text-sm font-bold hover:bg-cyan-500/20 transition"
                >
                  {t.system.navTools}
                </Link>
                <Link
                  href={`/${lang}/betting-glossary`}
                  className="px-5 py-2.5 rounded-xl border border-cyan-400/20 bg-[#060B14] text-slate-300 text-sm font-bold hover:text-white hover:border-cyan-400/40 transition"
                >
                  {t.system.navGlossary}
                </Link>
                <Link
                  href={`/${lang}`}
                  className="px-5 py-2.5 rounded-xl border border-cyan-400/20 bg-[#060B14] text-slate-300 text-sm font-bold hover:text-white hover:border-cyan-400/40 transition"
                >
                  {t.system.navHome}
                </Link>
              </div>
            </div>
          )}

          {/* PERSISTENT SPORT METHODOLOGY & MARKETS GUIDE */}
          <SportGuide sportKey={sportKey} lang={lang} />

          {/* COMMERCIAL AFFILIATE SLIDER (POSITIONED AFTER FIRST-PARTY CONTENT) */}
          <div className="my-10">
            <AffiliateSlider lang={lang} countryCode={countryCode} showDisclosure={true} />
          </div>

          <div className="mt-16">
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
