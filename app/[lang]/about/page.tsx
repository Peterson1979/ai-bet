import Link from "next/link";
import { redirect } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { translations, Lang } from "@/app/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en") {
    redirect("/en/about");
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.matchsignal.pro";

  return {
    title: "About MatchSignal | Quantitative Sports Analytics & Methodology",
    description:
      "Learn how MatchSignal combines bookmaker odds data, quantitative probability modeling, and AI-generated match context to evaluate betting markets.",
    keywords:
      "sports analytics, betting methodology, expected value, fair odds, probability modeling, AI sports analysis",
    alternates: {
      canonical: `${baseUrl}/en/about`,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  if (lang !== "en") {
    redirect("/en/about");
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About MatchSignal",
    url: "https://www.matchsignal.pro/en/about",
    description:
      "MatchSignal is a sports betting analysis platform combining bookmaker market data, quantitative probability modeling, and AI-generated match context.",
    isPartOf: {
      "@type": "WebSite",
      name: "MatchSignal",
      url: "https://www.matchsignal.pro",
    },
  };

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#060B14] via-[#070D18] to-[#050A12]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <div className="pt-[110px] pb-16 px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* PRIMARY HEADER */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
              Platform & Methodology
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
              About MatchSignal
            </h1>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl">
              MatchSignal is an independent sports analytics platform combining
              regularly refreshed bookmaker odds data, quantitative probability
              modeling, and AI-generated contextual analysis to help users
              evaluate betting markets systematically.
            </p>
          </div>

          {/* SECTION 1: WHAT MATCHSIGNAL DOES */}
          <section className="rounded-2xl border border-cyan-400/20 bg-[#0B1220] p-6 md:p-8 space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> What MatchSignal Does
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Modern sports betting markets generate vast amounts of odds data
              across dozens of operators. MatchSignal simplifies market
              evaluation by ingesting current bookmaker lines, stripping out
              bookmaker margin to estimate market-based fair probabilities, and
              highlighting statistical value discrepancies (+EV).
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Collects current odds across major sports & leagues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Calculates estimated fair odds and market consensus depth</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Detects positive expected value (+EV) opportunities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Provides AI-generated contextual analysis and summaries</span>
              </li>
            </ul>
            <p className="text-xs text-slate-400 pt-2 border-t border-cyan-400/10">
              MatchSignal is an informational analytics tool. It is not a
              licensed sportsbook, does not accept wagers, and does not
              guarantee betting profit.
            </p>
          </section>

          {/* SECTION 2: HOW THE ANALYSIS WORKS */}
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚙️</span> How the Analysis Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-cyan-400/15 bg-[#060B14] p-5">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Step 1
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Odds Data Ingestion
                </h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  The automated pipeline ingests current bookmaker odds for
                  supported sports and competitions, capturing price lines
                  across home, away, draw, and secondary markets.
                </p>
              </div>

              <div className="rounded-xl border border-cyan-400/15 bg-[#060B14] p-5">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Step 2
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Fair Probability & De-Vigging
                </h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  Bookmaker prices include an overround (margin). MatchSignal
                  removes that margin to derive market-based fair probability
                  and fair odds estimates for each possible outcome.
                </p>
              </div>

              <div className="rounded-xl border border-cyan-400/15 bg-[#060B14] p-5">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Step 3
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Market Consensus & Coverage
                </h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  Probabilities across all tracked bookmakers are aggregated to
                  establish a market consensus percentage and measure the
                  breadth of bookmaker coverage for that fixture.
                </p>
              </div>

              <div className="rounded-xl border border-cyan-400/15 bg-[#060B14] p-5">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Step 4
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Expected Value (+EV) Detection
                </h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  When a bookmaker offers odds higher than the calculated fair
                  odds, the selection is flagged as having positive expected
                  value (+EV).
                </p>
              </div>
            </div>

            {/* EV FORMULA CALLOUT */}
            <div className="rounded-xl border border-cyan-400/20 bg-cyan-950/20 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                  Mathematical EV Formula
                </span>
                <span className="font-mono text-sm md:text-base text-white font-bold">
                  EV% = (Available Odds × Fair Probability − 1) × 100
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                Positive EV reflects a statistical edge against market fair
                probability; it does not eliminate variance or guarantee winning
                bets.
              </p>
            </div>
          </section>

          {/* SECTION 3: QUANTITATIVE ENGINE VS AI */}
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧠</span> Quantitative Engine vs. AI
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              MatchSignal uses a hybrid analysis pipeline. Deterministic market math handles bookmaker-derived calculations and fallback value math, while the AI layer can contribute contextual reasoning plus bounded Fair Probability and estimated-value inputs. AI-provided numeric fields are validated and normalized before use, and deterministic fallbacks are used when those fields are unavailable.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-emerald-500/20 bg-[#0B1220] p-5 md:p-6">
                <div className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2">
                  Deterministic Math Engine
                </div>
                <ul className="space-y-2 text-xs md:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Bookmaker margin removal (de-vigging)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>No-vig market probability & fair-odds benchmarks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Market consensus probability & coverage count</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Fallback EV calculation from Fair Probability & offered odds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Data-driven risk tier classification</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-purple-500/20 bg-[#0B1220] p-5 md:p-6">
                <div className="text-purple-400 font-bold text-sm uppercase tracking-wider mb-2">
                  AI Contextual Layer
                </div>
                <ul className="space-y-2 text-xs md:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">✓</span>
                    <span>Turns available match & market data into readable summaries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">✓</span>
                    <span>Generates explanatory match context bullets (Why Signal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">✓</span>
                    <span>Can contribute validated Fair Probability & estimated value inputs</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 4: DATA-DRIVEN RISK TIERS */}
          <section className="rounded-2xl border border-cyan-400/20 bg-[#0B1220] p-6 md:p-8 space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span>📊</span> Data-Driven Risk Tiers
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Risk Tiers are derived from objective market metrics, primarily
              odds magnitude and the depth of bookmaker coverage. They do not
              represent subjective AI confidence or guaranteed safety.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  Low Risk
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Lower-odds selections supported by broader bookmaker coverage.
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  Medium Risk
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Selections in a moderate odds range with sufficient bookmaker coverage.
                </p>
              </div>

              <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4">
                <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                  High Risk
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Selections with higher odds or lower bookmaker coverage under MatchSignal&apos;s current risk classification.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 pt-2 border-t border-cyan-400/10">
              Important: A &ldquo;Low Risk&rdquo; tier does not mean a bet is safe or
              guaranteed to win. All sporting events carry inherent unpredictability.
            </p>
          </section>

          {/* SECTION 5: ROLE AND LIMITATIONS OF AI */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚠️</span> Role and Limitations of AI
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              While AI assists in structuring qualitative match context, users
              should be aware of fundamental market realities:
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span>
                  <strong>Odds Fluctuations:</strong> Bookmaker lines change
                  continuously. Odds displayed reflect the time of ingestion and
                  may shift before match kickoff.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span>
                  <strong>Incomplete Information:</strong> Pre-match analysis
                  cannot account for unforeseen events such as late injuries,
                  referee decisions, or weather disruptions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span>
                  <strong>Variance:</strong> Sports outcomes are non-deterministic.
                  Even heavily favored selections lose regularly.
                </span>
              </li>
            </ul>
            <p className="text-xs text-slate-400">
              For complete details, please read our{" "}
              <Link
                href="/en/legal/ai-disclaimer"
                className="text-cyan-300 hover:underline"
              >
                AI Disclaimer
              </Link>
              .
            </p>
          </section>

          {/* SECTION 6: UPDATE PROCESS */}
          <section className="rounded-2xl border border-cyan-400/20 bg-[#0B1220] p-6 md:p-8 space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔄</span> Update Process & Freshness
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              MatchSignal refreshes its predictions and market analysis through
              an automated daily data pipeline. Pick availability varies based
              on event schedules, league calendars, and available market depth.
              During off-season periods or rest days, pages will display
              informative status notices and persistent sport guides.
            </p>
          </section>

          {/* SECTION 7: AFFILIATE & COMMERCIAL TRANSPARENCY */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span>🤝</span> Affiliate & Commercial Transparency
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              MatchSignal is completely free to access. To support server
              infrastructure and data pipeline costs, the platform participates
              in commercial affiliate partnerships with third-party sportsbooks.
            </p>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              When users register or deposit with a sportsbook via links on this
              site, MatchSignal may earn a referral commission at no additional
              cost to the user. Affiliate compensation is not an input to
              MatchSignal&apos;s fair-probability, estimated-value, or risk-tier
              calculations.
            </p>
            <p className="text-xs text-slate-400">
              Learn more in our full{" "}
              <Link
                href="/en/legal/affiliate-disclosure"
                className="text-cyan-300 hover:underline"
              >
                Affiliate Disclosure
              </Link>
              .
            </p>
          </section>

          {/* SECTION 8: RESPONSIBLE BETTING */}
          <section className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-6 md:p-8 space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span>🛡️</span> Responsible Betting Principles
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Sports betting carries inherent financial risk. MatchSignal
              strongly advocates for responsible betting practices:
            </p>
            <ul className="space-y-1.5 text-xs md:text-sm text-slate-300">
              <li>• Only bet amounts you can comfortably afford to lose.</li>
              <li>• Never treat betting as an income source or investment strategy.</li>
              <li>• Maintain disciplined bankroll limits and never chase losses.</li>
              <li>• Ensure betting is legal in your jurisdiction and you are of legal age (18+/21+).</li>
            </ul>
            <p className="text-xs text-slate-400 pt-2 border-t border-rose-500/10">
              If you or someone you know is struggling with gambling, please seek
              help through our{" "}
              <Link
                href="/en/legal/responsible-gambling"
                className="text-rose-300 hover:underline"
              >
                Responsible Gambling Resources
              </Link>
              .
            </p>
          </section>

          {/* SECTION 9: CONTACT & FEEDBACK */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span>📬</span> Contact & Feedback
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Have questions, feedback, or need to report a data discrepancy? We
              value user input and strive to keep our platform transparent and
              reliable.
            </p>
            <div>
              <Link
                href="/en/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 text-sm font-bold hover:bg-cyan-500/20 transition"
              >
                Visit Contact Page →
              </Link>
            </div>
          </section>

          {/* SECTION 10: INTERACTIVE TOOLS & GLOSSARY LINKS */}
          <section className="pt-6 border-t border-cyan-400/20">
            <h2 className="text-lg font-bold text-white mb-4">
              Explore MatchSignal Tools & Legal Information
            </h2>
            <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-300">
              <Link
                href="/en/tools"
                className="px-4 py-2 rounded-lg border border-cyan-400/20 bg-[#060B14] hover:text-white hover:border-cyan-400/40 transition"
              >
                🛠️ Betting Tools & Calculators
              </Link>
              <Link
                href="/en/betting-glossary"
                className="px-4 py-2 rounded-lg border border-cyan-400/20 bg-[#060B14] hover:text-white hover:border-cyan-400/40 transition"
              >
                📖 Betting Glossary
              </Link>
              <Link
                href="/en/legal/ai-disclaimer"
                className="px-4 py-2 rounded-lg border border-cyan-400/20 bg-[#060B14] hover:text-white hover:border-cyan-400/40 transition"
              >
                ⚠️ AI Disclaimer
              </Link>
              <Link
                href="/en/legal/affiliate-disclosure"
                className="px-4 py-2 rounded-lg border border-cyan-400/20 bg-[#060B14] hover:text-white hover:border-cyan-400/40 transition"
              >
                🤝 Affiliate Disclosure
              </Link>
              <Link
                href="/en/legal/responsible-gambling"
                className="px-4 py-2 rounded-lg border border-cyan-400/20 bg-[#060B14] hover:text-white hover:border-cyan-400/40 transition"
              >
                🛡️ Responsible Gambling
              </Link>
              <Link
                href="/en/legal/terms-of-use"
                className="px-4 py-2 rounded-lg border border-cyan-400/20 bg-[#060B14] hover:text-white hover:border-cyan-400/40 transition"
              >
                📄 Terms of Use
              </Link>
              <Link
                href="/en/legal/privacy-policy"
                className="px-4 py-2 rounded-lg border border-cyan-400/20 bg-[#060B14] hover:text-white hover:border-cyan-400/40 transition"
              >
                🔒 Privacy Policy
              </Link>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}