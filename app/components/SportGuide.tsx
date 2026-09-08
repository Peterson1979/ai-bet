import Link from "next/link";
import { translations, Lang } from "@/app/lib/i18n";
import { SPORT_EMOJIS } from "@/app/lib/sportsConfig";
import { getSportEditorialGuide } from "@/app/lib/sportGuideContent";

type SportGuideProps = {
  sportKey: string;
  lang: Lang;
};

export default function SportGuide({ sportKey, lang }: SportGuideProps) {
  const t = translations[lang] ?? translations.en;
  const emoji = SPORT_EMOJIS[sportKey] ?? "🏆";
  const guide = getSportEditorialGuide(sportKey, lang);

  return (
    <section aria-labelledby="sport-guide-heading" className="mt-12 mb-8">
      <div className="rounded-[28px] border-2 border-cyan-400/20 bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#070B14] p-6 md:p-10 shadow-[0_0_40px_rgba(56,189,248,0.06)]">
        
        {/* SECTION 1: HEADER & EDITORIAL OVERVIEW */}
        <div className="mb-10 border-b border-cyan-400/10 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{emoji}</span>
            <h2 id="sport-guide-heading" className="text-2xl md:text-3xl font-black text-white">
              {guide.title}
            </h2>
          </div>
          <p className="text-base text-cyan-300 font-semibold mb-4">
            {guide.subtitle}
          </p>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-5xl">
            {guide.overview}
          </p>
        </div>

        {/* SECTION 2: MARKET DYNAMICS & STATISTICAL FOUNDATIONS */}
        <div className="mb-10 rounded-2xl border border-cyan-400/15 bg-[#060B14]/80 p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-black text-white mb-3 flex items-center gap-2">
            <span>📈</span>
            {guide.marketDynamicsTitle}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {guide.marketDynamicsText}
          </p>
        </div>

        {/* SECTION 3: KEY BETTING MARKETS EXPLAINED */}
        <div className="mb-10">
          <h3 className="text-lg md:text-xl font-black text-cyan-300 mb-5 flex items-center gap-2">
            <span>📊</span>
            Key Analyzed Betting Markets
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guide.keyMarkets.map((market) => (
              <div
                key={market.name}
                className="rounded-2xl border border-cyan-400/15 bg-[#060B14]/60 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-bold text-white">{market.name}</h4>
                    <span className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-2 py-0.5 text-xs font-semibold text-cyan-200">
                      {market.badge}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-3">
                    {market.description}
                  </p>
                </div>
                <div className="rounded-xl border border-cyan-400/10 bg-[#0B1220] p-3 text-xs text-slate-400">
                  <span className="font-bold text-cyan-300">Example: </span>
                  {market.example}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: HOW MATCHSIGNAL EVALUATES VALUE & PITFALLS (2 COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          
          {/* METHODOLOGY EVALUATION */}
          <div className="rounded-2xl border border-cyan-400/15 bg-[#060B14]/70 p-6">
            <h3 className="text-base md:text-lg font-black text-cyan-300 mb-4 flex items-center gap-2">
              <span>⚡</span>
              {guide.evaluationTitle}
            </h3>
            <ul className="space-y-3 text-xs md:text-sm text-slate-300">
              {guide.evaluationPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold text-base leading-none">✓</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* VARIANCE & PITFALLS */}
          <div className="rounded-2xl border border-amber-400/20 bg-amber-950/10 p-6">
            <h3 className="text-base md:text-lg font-black text-amber-300 mb-4 flex items-center gap-2">
              <span>⚠️</span>
              {guide.varianceAndPitfallsTitle}
            </h3>
            <ul className="space-y-3 text-xs md:text-sm text-slate-300">
              {guide.varianceAndPitfalls.map((pitfall, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold text-base leading-none">!</span>
                  <span className="leading-relaxed">{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SECTION 5: RECOMMENDED GUIDES & TOOLS */}
        <div className="border-t border-cyan-400/10 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Related Educational Guides & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {guide.recommendedGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/${lang}/guides/${g.slug}`}
                  className="rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-500/20 transition"
                >
                  {g.title} →
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/${lang}/tools`}
              className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 transition"
            >
              {t.system.navTools}
            </Link>
            <Link
              href={`/${lang}/betting-glossary`}
              className="rounded-xl border border-cyan-400/20 bg-[#0B1220] px-4 py-2 text-xs font-bold text-slate-300 hover:text-white hover:border-cyan-400/40 transition"
            >
              {t.system.navGlossary}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
