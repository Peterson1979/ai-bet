import Link from "next/link";
import { translations, Lang } from "@/app/lib/i18n";
import { SPORT_MARKETS, SPORT_EMOJIS } from "@/app/lib/sportsConfig";

type SportGuideProps = {
  sportKey: string;
  lang: Lang;
};

export default function SportGuide({ sportKey, lang }: SportGuideProps) {
  const t = translations[lang] ?? translations.en;
  const sportName = t.sports[sportKey as keyof typeof t.sports] ?? sportKey;
  const g = t.sportGuide;
  const markets = SPORT_MARKETS[sportKey] ?? [];
  const emoji = SPORT_EMOJIS[sportKey] ?? "🏆";

  return (
    <section aria-labelledby="sport-guide-heading" className="mt-12 mb-8">
      <div className="rounded-[28px] border-2 border-cyan-400/20 bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#070B14] p-6 md:p-10 shadow-[0_0_40px_rgba(56,189,248,0.06)]">
        {/* SECTION HEADER */}
        <div className="mb-8 border-b border-cyan-400/10 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{emoji}</span>
            <h2 id="sport-guide-heading" className="text-xl md:text-2xl font-black text-white">
              {g.overviewTitle.replace("{SPORT}", sportName)}
            </h2>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-4xl">
            {g.overviewDesc.replace("{SPORT}", sportName)}
          </p>
        </div>

        {/* 3-COLUMN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* COLUMN 1: MARKETS COVERED */}
          <div className="rounded-2xl border border-cyan-400/15 bg-[#060B14]/70 p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-cyan-300 mb-2 flex items-center gap-2">
                <span>📊</span>
                {g.marketsTitle.replace("{SPORT}", sportName)}
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                {g.marketsDesc}
              </p>
              <div className="flex flex-wrap gap-2">
                {markets.map((market) => (
                  <span
                    key={market}
                    className="inline-block rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-200"
                  >
                    {market}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2: KEY SIGNALS */}
          <div className="rounded-2xl border border-cyan-400/15 bg-[#060B14]/70 p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-cyan-300 mb-2 flex items-center gap-2">
                <span>⚡</span>
                {g.signalsTitle}
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>{t.positiveEV ?? "Positive Expected Value (+EV)"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{t.bookmakersTracked ?? "Books Sampled"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">✓</span>
                  <span>{t.risk} ({t.riskLow} / {t.riskMedium} / {t.riskHigh})</span>
                </li>
              </ul>
            </div>
          </div>

          {/* COLUMN 3: TOOLS & INTERNAL LINKS */}
          <div className="rounded-2xl border border-cyan-400/15 bg-[#060B14]/70 p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-cyan-300 mb-2 flex items-center gap-2">
                <span>🛠️</span>
                {g.toolsTitle}
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                {g.toolsDesc}
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <Link
                href={`/${lang}/tools`}
                className="inline-flex items-center justify-between rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>{t.system.navTools}</span>
                <span>→</span>
              </Link>
              <Link
                href={`/${lang}/betting-glossary`}
                className="inline-flex items-center justify-between rounded-xl border border-cyan-400/20 bg-[#0B1220] px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white hover:border-cyan-400/40 transition"
              >
                <span>{t.system.navGlossary}</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
