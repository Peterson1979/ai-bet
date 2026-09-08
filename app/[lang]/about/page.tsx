import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { ABOUT_CONTENT } from "@/app/lib/aboutContent";
import type { Lang } from "@/app/lib/i18n";
import { localizedAlternates, SITE_URL } from "@/app/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const copy = ABOUT_CONTENT[lang] ?? ABOUT_CONTENT.en;
  return {
    title: "About MatchSignal & Mathematical Methodology | AI Sports Analysis",
    description: "Learn how MatchSignal ingests live sportsbook markets, strips bookmaker margins, computes fair probabilities, and identifies positive expected value (+EV) signals.",
    alternates: localizedAlternates(lang, "/about"),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const copy = ABOUT_CONTENT[lang] ?? ABOUT_CONTENT.en;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About MatchSignal & Methodology",
    url: `${SITE_URL}/${lang}/about`,
    description: copy.metaDescription,
    isPartOf: { "@type": "WebSite", name: "MatchSignal", url: SITE_URL },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#060B14] via-[#070D18] to-[#050A12] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      
      <div className="mx-auto max-w-5xl space-y-12 px-4 pb-20 pt-28 md:px-6">
        
        {/* HERO SECTION */}
        <header>
          <div className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
            {copy.eyebrow}
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-4xl text-base md:text-lg leading-8 text-slate-300">
            {copy.intro}
          </p>
        </header>

        {/* SECTION 1: 6-STEP PROCESS OVERVIEW */}
        <section>
          <h2 className="text-2xl md:text-3xl font-black">{copy.processTitle}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {copy.steps.map((step) => (
              <article key={step.title} className="rounded-2xl border border-cyan-400/20 bg-[#0B1220] p-6 hover:border-cyan-400/40 transition">
                <h3 className="font-bold text-lg text-cyan-300">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 2: DEEP MATCHSIGNAL MATHEMATICAL ARCHITECTURE */}
        <section className="rounded-3xl border-2 border-cyan-400/25 bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#070B14] p-6 md:p-10 shadow-[0_0_40px_rgba(56,189,248,0.06)]">
          <div className="border-b border-cyan-400/15 pb-6 mb-8">
            <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-0.5 text-xs font-bold text-cyan-300 mb-2">
              Technical Documentation
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              The MatchSignal Mathematical & Analytical Pipeline
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-3xl">
              MatchSignal operates a deterministic mathematical pipeline designed to eliminate arbitrary AI hallucinations and ground every insight in live multi-bookmaker market data.
            </p>
          </div>

          <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
            
            {/* STAGE 1 */}
            <div className="rounded-2xl border border-cyan-400/15 bg-[#060B14]/70 p-5">
              <h3 className="text-base font-bold text-cyan-300 mb-2 flex items-center gap-2">
                <span>1.</span> Live Market Data Ingestion & Bookmaker Sampling
              </h3>
              <p>
                MatchSignal continuously tracks live odds across leading European and American sportsbooks (including BetOnline, Bovada, MyBookie, Pinnacle-tier market makers, and regional operators). Data is collected across 7 supported sports: Football, NBA, NFL, NHL, Tennis, MLB, and MMA.
              </p>
            </div>

            {/* STAGE 2 */}
            <div className="rounded-2xl border border-cyan-400/15 bg-[#060B14]/70 p-5">
              <h3 className="text-base font-bold text-cyan-300 mb-2 flex items-center gap-2">
                <span>2.</span> Market Candidate Construction & Normalization
              </h3>
              <p>
                Raw sportsbook feeds are standardized into structured market candidates (e.g. 1X2, Draw No Bet, Double Chance, Point Spreads, Totals, Method of Victory). Each candidate requires a minimum sample depth of at least 3 contributing bookmakers to ensure representative market liquidity.
              </p>
            </div>

            {/* STAGE 3 */}
            <div className="rounded-2xl border border-cyan-400/15 bg-[#060B14]/70 p-5">
              <h3 className="text-base font-bold text-cyan-300 mb-2 flex items-center gap-2">
                <span>3.</span> Overround (Vig) Removal & True Market Consensus
              </h3>
              <p className="mb-3">
                Sportsbooks build a theoretical margin into their prices, causing raw implied probabilities to exceed 100%. MatchSignal strips the margin across all valid outcomes in a market using proportional normalization:
              </p>
              <div className="rounded-xl border border-cyan-400/20 bg-[#0B1220] p-3 text-xs font-mono text-cyan-200">
                P_fair_i = (1 / Odds_i) / Σ (1 / Odds_k)
              </div>
            </div>

            {/* STAGE 4 */}
            <div className="rounded-2xl border border-cyan-400/15 bg-[#060B14]/70 p-5">
              <h3 className="text-base font-bold text-cyan-300 mb-2 flex items-center gap-2">
                <span>4.</span> Value Edge & Expected Value (+EV) Calculation
              </h3>
              <p className="mb-3">
                A Value Signal is triggered when the best tracked price across surveyed sportsbooks exceeds the calculated fair price:
              </p>
              <div className="rounded-xl border border-cyan-400/20 bg-[#0B1220] p-3 text-xs font-mono text-cyan-200">
                Value Edge (%) = ((Offered Odds / Fair Odds) - 1) × 100
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Strict Pre-Publication Filter: If a selection does not retain a strictly positive Value Edge (Value Edge &gt; 0%), it is disqualified from publication.
              </p>
            </div>

            {/* STAGE 5 */}
            <div className="rounded-2xl border border-cyan-400/15 bg-[#060B14]/70 p-5">
              <h3 className="text-base font-bold text-cyan-300 mb-2 flex items-center gap-2">
                <span>5.</span> Multi-Tier Risk Classification
              </h3>
              <p>
                Every published signal is categorized into a disciplined risk tier:
              </p>
              <ul className="mt-2 space-y-1.5 list-disc ps-5 text-xs text-slate-300">
                <li><strong className="text-emerald-300">Low Risk:</strong> Lower odds magnitude (&lt;1.80) with deep bookmaker consensus and narrow market dispersion.</li>
                <li><strong className="text-cyan-300">Medium Risk:</strong> Balanced risk-reward profiles (odds 1.80 to 2.40) with standard market depth.</li>
                <li><strong className="text-purple-300">High Risk:</strong> Underdog or high-volatility prop selections with higher variance.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* SECTION 3: LIMITATIONS */}
        <section className="rounded-2xl border border-amber-400/20 bg-amber-950/10 p-6">
          <h2 className="text-2xl font-black text-amber-300">{copy.limitsTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 ps-6 text-slate-300">
            {copy.limits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* SECTION 4: RESPONSIBLE GAMBLING */}
        <section className="rounded-2xl border border-rose-400/20 bg-rose-950/10 p-6">
          <h2 className="text-xl font-black text-rose-300">{copy.responsibleTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">{copy.responsibleBody}</p>
        </section>

        {/* NAVIGATION & LEGAL LINKS */}
        <nav aria-label={copy.legalLinksTitle} className="border-t border-slate-700 pt-6">
          <h2 className="text-lg font-black">{copy.legalLinksTitle}</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
            <Link className="rounded-lg border border-cyan-400/20 px-4 py-2 text-cyan-300 hover:bg-cyan-500/10 transition" href={`/${lang}/legal/ai-disclaimer`}>{copy.aiLink}</Link>
            <Link className="rounded-lg border border-cyan-400/20 px-4 py-2 text-cyan-300 hover:bg-cyan-500/10 transition" href={`/${lang}/legal/affiliate-disclosure`}>{copy.affiliateLink}</Link>
            <Link className="rounded-lg border border-cyan-400/20 px-4 py-2 text-cyan-300 hover:bg-cyan-500/10 transition" href={`/${lang}/legal/responsible-gambling`}>{copy.responsibleLink}</Link>
            <Link className="rounded-lg border border-cyan-400/20 px-4 py-2 text-cyan-300 hover:bg-cyan-500/10 transition" href={`/${lang}/contact`}>{copy.contactLink}</Link>
          </div>
        </nav>
      </div>
      
      <Footer />
    </main>
  );
}
