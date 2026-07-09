import Header from "../components/Header";
import Hero from "../components/Hero";
import MatchCard from "../components/MatchCard";
import Footer from "../components/Footer";
import { getPredictions } from "../lib/getPredictions";
import { translations, Lang } from "@/app/lib/i18n";
import type { SportType } from "../types/match";
import type { PredictionCard } from "@/app/types/prediction";
import { toMatchCardData } from "@/app/lib/domain/matchMapper";
import type { Metadata } from "next";
import AffiliateSlider from "../components/AffiliateSlider";
import FeaturedSportsbooks from "../components/FeaturedSportsbooks";
import TopRatedSportsbooksList from "../components/TopRatedSportsbooksList";
import StickyBottomCTA from "../components/StickyBottomCTA";
import { HOMEPAGE_MATCH_LIMIT } from "@/app/lib/displayConfig";
import { sortSportBlocks } from "@/app/lib/sportsConfig";
import SportSection from "@/app/components/SportSection";

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

  const sportLinks = [
    { id: "football", label: t.sports.football },
    { id: "nba", label: t.sports.nba },
    { id: "nfl", label: t.sports.nfl },
    { id: "hockey", label: t.sports.hockey },
    { id: "tennis", label: t.sports.tennis },
    { id: "mlb", label: t.sports.mlb },
    { id: "mma", label: t.sports.mma },
  ];

  // Dinamikus sorrend: azok a sportágak elöl, amikben ma van jövőbeli esemény
  const orderedSports = predictions?.sports
    ? sortSportBlocks(predictions.sports)
    : [];

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#060B14] via-[#070D18] to-[#050A12] pb-24 md:pb-0">
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
                href={`/${lang}/${s.id}`}
                className="group relative rounded-full border-2 border-cyan-300/40 bg-[#0A1220]/80 px-6 py-2 text-sm font-extrabold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-2 hover:scale-[1.06] hover:border-cyan-200 hover:shadow-[0_0_35px_rgba(34,211,238,0.55)] hover:text-cyan-100"
              >
                {s.label}
                <span className="absolute left-1/2 bottom-0 h-[3px] w-0 -translate-x-1/2 bg-cyan-300 transition-all duration-300 group-hover:w-3/4" />
              </a>
            ))}
          </div>

          {/* AFFILIATE SLIDER — 3 mp alatt fogadóirodához juttat */}
          <AffiliateSlider />

          {/* FEATURED SPORTSBOOKS — Editor's Picks (Top 3) */}
          <FeaturedSportsbooks lang={lang} />

          {/* TOP PICKS — sportágankénti blokkok, dinamikus sorrendben */}
          <div className="mt-4">
            <section id="top-picks" className="mb-16 scroll-mt-28">
              <div className="mb-6 flex flex-col items-center">
                <h2 className="text-3xl font-black tracking-tight text-center">
                  {t.topPicks}
                </h2>
                <div className="mt-3 h-[3px] w-64 bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
              </div>
            </section>

            {orderedSports.map((sportBlock) => (
              <SportSection
                key={sportBlock.sport}
                sportBlock={sportBlock}
                lang={lang}
                limit={HOMEPAGE_MATCH_LIMIT}
                showViewAll
              />
            ))}
          </div>

          {/* 🏆 TOP RATED SPORTSBOOKS — footer felett */}
          <TopRatedSportsbooksList lang={lang} variant="footer" />

          <div className="mt-16">
            <Footer />
          </div>

        </div>
      </div>

      {/* Sticky bottom CTA — mobil only */}
      <StickyBottomCTA lang={lang} />
    </main>
  );
}