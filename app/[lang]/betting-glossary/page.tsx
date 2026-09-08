import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PartnerSportsbooksList from "@/app/components/PartnerSportsbooksList";
import { translations, Lang, LANGS } from "@/app/lib/i18n";
import { GLOSSARY_ITEMS } from "@/app/lib/glossaryContent";
import type { Metadata } from "next";

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
    languages[l] = `${baseUrl}/${l}/betting-glossary`;
  });
  languages["x-default"] = `${baseUrl}/en/betting-glossary`;

  return {
    title: `Sports Betting Glossary & Theory Guide | MatchSignal`,
    description: "Comprehensive sports betting glossary and mathematical guide covering Expected Value (+EV), Implied Probability, Overround, Kelly Criterion, and key betting markets.",
    alternates: {
      canonical: `${baseUrl}/${lang}/betting-glossary`,
      languages,
    },
  };
}

export default async function BettingGlossaryPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const t = translations[lang] ?? translations.en;
  const countryCode = lang === "hu" ? "HU" : undefined;

  const conceptItems = GLOSSARY_ITEMS.filter((item) => item.category === "concept");
  const marketItems = GLOSSARY_ITEMS.filter((item) => item.category === "market");

  const definedTermJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Sports Betting & Mathematical Analysis Glossary",
    description: "Comprehensive terminology and mathematical principles used in sports betting analysis, expected value modeling, and market probability estimation.",
    hasDefinedTerm: GLOSSARY_ITEMS.map((item) => ({
      "@type": "DefinedTerm",
      name: item.term,
      description: item.definition,
    })),
  };

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#060B14] via-[#070D18] to-[#050A12]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }}
      />
      <Header />

      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute top-[-140px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[130px]" />
        <div className="absolute bottom-[-140px] right-10 h-[500px] w-[500px] rounded-full bg-purple-500/15 blur-[130px]" />
      </div>

      <div className="pt-[100px] pb-20 relative z-10">
        <div className="mx-auto max-w-[1500px] px-4 md:px-6">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 items-start">

            {/* LEFT EDITORIAL CONTENT */}
            <div>
              {/* PAGE HEADER */}
              <div className="mb-12 text-left">
                <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3">
                  MatchSignal Knowledge Base
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                  Sports Betting Glossary & Mathematical Principles
                </h1>
                <p className="mt-4 text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
                  A definitive guide to betting mathematics, probability theory, bookmaker mechanics, and market types. Learn how concepts like Expected Value (+EV), Implied Probability, Overround, and Closing Line Value drive disciplined sports analysis.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#concepts"
                    className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 transition"
                  >
                    1. Probability & Betting Theory →
                  </a>
                  <a
                    href="#markets"
                    className="rounded-xl border border-cyan-400/20 bg-[#0B1220] px-4 py-2 text-xs font-bold text-slate-300 hover:text-white hover:border-cyan-400/40 transition"
                  >
                    2. Betting Markets Explained →
                  </a>
                </div>
              </div>

              {/* SECTION 1: PROBABILITY & BETTING THEORY */}
              <section id="concepts" className="mb-14 scroll-mt-28">
                <div className="mb-6 border-b border-cyan-400/15 pb-4">
                  <h2 className="text-2xl font-black text-cyan-300 flex items-center gap-2.5">
                    <span>📐</span>
                    1. Probability & Betting Theory Fundamentals
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 mt-1">
                    The core mathematical formulas and principles governing fair odds, edge estimation, and risk management.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {conceptItems.map((item) => (
                    <article
                      key={item.term}
                      className="rounded-[22px] border-2 border-cyan-400/20 bg-[#0B1220] p-6 hover:border-cyan-400/40 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-black text-white mb-2">
                          {item.term}
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed mb-4">
                          {item.definition}
                        </p>
                      </div>

                      <div className="space-y-2 mt-auto">
                        {item.formula && (
                          <div className="rounded-xl border border-cyan-400/20 bg-[#060B14] p-3 text-xs font-mono text-cyan-300">
                            <span className="font-bold text-slate-400 block mb-1">Formula:</span>
                            {item.formula}
                          </div>
                        )}
                        {item.example && (
                          <div className="rounded-xl border border-cyan-400/10 bg-[#060B14]/60 p-3 text-xs text-slate-400 leading-relaxed">
                            <span className="font-bold text-cyan-200">Example: </span>
                            {item.example}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* SECTION 2: BETTING MARKETS EXPLAINED */}
              <section id="markets" className="mb-14 scroll-mt-28">
                <div className="mb-6 border-b border-cyan-400/15 pb-4">
                  <h2 className="text-2xl font-black text-cyan-300 flex items-center gap-2.5">
                    <span>📊</span>
                    2. Betting Markets & Wager Types
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 mt-1">
                    How various market structures work across football, basketball, American football, tennis, hockey, baseball, and MMA.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {marketItems.map((item) => (
                    <article
                      key={item.term}
                      className="rounded-[22px] border-2 border-cyan-400/20 bg-[#0B1220] p-6 hover:border-cyan-400/40 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-black text-white mb-2">
                          {item.term}
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed mb-4">
                          {item.definition}
                        </p>
                      </div>

                      {item.example && (
                        <div className="rounded-xl border border-cyan-400/10 bg-[#060B14]/60 p-3 text-xs text-slate-400 leading-relaxed mt-auto">
                          <span className="font-bold text-cyan-200">Example: </span>
                          {item.example}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>

              {/* BOTTOM CALLOUT & INTERNAL LINKS */}
              <div className="rounded-[24px] border-2 border-cyan-400/30 bg-gradient-to-r from-[#0B1220] via-[#0E1A2B] to-[#070B14] p-8">
                <h3 className="text-lg font-black text-cyan-300 mb-2">
                  Put Betting Mathematics into Practice
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-3xl">
                  Use our free interactive calculators to convert odds into implied probabilities, calculate Expected Value (+EV), test Kelly Criterion bankroll sizing, and compare bookmaker prices.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/${lang}/tools`}
                    className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-5 py-2.5 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 transition"
                  >
                    Explore Betting Tools & Calculators →
                  </Link>
                  <Link
                    href={`/${lang}/guides`}
                    className="rounded-xl border border-cyan-400/20 bg-[#060B14] px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white hover:border-cyan-400/40 transition"
                  >
                    Read Educational Betting Guides →
                  </Link>
                </div>
              </div>

            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="h-fit xl:sticky xl:top-24">
              <PartnerSportsbooksList lang={lang} countryCode={countryCode} variant="footer" />
            </aside>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-4 md:px-6">
        <Footer />
      </div>
    </main>
  );
}
