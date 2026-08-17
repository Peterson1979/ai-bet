import Header from "../components/Header";
import Hero from "../components/Hero";
import MatchCard from "../components/MatchCard";
import Footer from "../components/Footer";
import { getPredictions } from "../lib/getPredictions";
import { translations, Lang, LANGS } from "@/app/lib/i18n";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang] ?? translations.en;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.matchsignal.pro";

  const languages: Record<string, string> = {};
  LANGS.forEach((l) => {
    languages[l] = `${baseUrl}/${l}`;
  });
  languages["x-default"] = `${baseUrl}/en`;

  return {
    title: t.seoTitle,
    description: t.seoDescription,
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
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.matchsignal.pro";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.seoTitle,
    description: t.seoDescription,
    url: `${baseUrl}/${lang}`,
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

  const now = new Date();
  const hasActiveMatches = orderedSports.some(
    (s) =>
      s.hasMatches &&
      (s.topPicks || []).some((p) => new Date(p.startTime) > now)
  );

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

            {hasActiveMatches ? (
              orderedSports.map((sportBlock) => (
                <SportSection
                  key={sportBlock.sport}
                  sportBlock={sportBlock}
                  lang={lang}
                  limit={HOMEPAGE_MATCH_LIMIT}
                  mobileLimit={2}
                  desktopColumns={3}
                  showViewAll
                />
              ))
            ) : (
              <div className="rounded-[24px] border-2 border-cyan-400/20 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6 md:p-10 mb-12 text-center shadow-[0_0_30px_rgba(56,189,248,0.05)]">
                <div className="mx-auto w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-2xl mb-4">
                  📊
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {t.homepageNoPicksTitle}
                </h3>
                <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
                  {t.homepageNoPicksDesc}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`/${lang}/tools`}
                    className="px-5 py-2.5 rounded-xl border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 text-sm font-bold hover:bg-cyan-500/20 transition"
                  >
                    {t.system.navTools}
                  </a>
                  <a
                    href={`/${lang}/betting-glossary`}
                    className="px-5 py-2.5 rounded-xl border border-cyan-400/20 bg-[#060B14] text-slate-300 text-sm font-bold hover:text-white hover:border-cyan-400/40 transition"
                  >
                    {t.system.navGlossary}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* FEATURED SPORTSBOOKS — Editor's Picks (Top 3) */}
          <FeaturedSportsbooks lang={lang} />

          {/* AFFILIATE SLIDER — rotating partner logos */}
          <div className="my-8">
            <AffiliateSlider lang={lang} showDisclosure={false} />
          </div>

          {/* 🏆 TOP RATED SPORTSBOOKS — footer felett */}
          <TopRatedSportsbooksList lang={lang} variant="footer" showDisclosure={false} />

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