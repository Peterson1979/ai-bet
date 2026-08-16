import { getFeaturedSites } from "@/app/lib/affiliates";
import { translations, Lang } from "@/app/lib/i18n";

type Props = {
  lang?: Lang;
  bettingPageHref?: string;
};

export default function FeaturedSportsbooks({ lang = "en", bettingPageHref }: Props) {
  const sites = getFeaturedSites(3);
  const href = bettingPageHref ?? `/${lang}/betting`;
  const t = translations[lang] ?? translations.en;

  if (!sites.length) return null;

  return (
    <section className="w-full py-8 px-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-black text-white">{t.featuredSportsbooks.title}</h2>
        <p className="text-sm text-slate-400 mt-1">{t.featuredSportsbooks.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {sites.map((site) => (
          <a
            key={site.id}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="relative flex flex-col items-center text-center gap-3 rounded-[26px] border-4 border-cyan-300/80 bg-gradient-to-b from-[#070D18] via-[#0B1220] to-[#050A12] p-6 shadow-[0_0_0_1px_rgba(34,211,238,0.25),0_18px_0_rgba(0,0,0,0.6),0_45px_120px_rgba(56,189,248,0.35)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-cyan-200"
          >
            {site.logoUrl ? (
              <span className="flex items-center justify-center bg-[#1a2744] rounded-xl px-4 py-3 mt-2 w-full max-w-[180px] border border-cyan-300/20">
                <img
                  src={site.logoUrl}
                  alt={site.name}
                  className="max-h-[40px] max-w-[150px] object-contain"
                />
              </span>
            ) : (
              <span className="text-lg font-black text-white mt-2">{site.name}</span>
            )}

            <span className="text-sm text-slate-200">{site.bonus}</span>

            <span className="mt-auto w-full rounded-xl border-2 border-cyan-300/40 bg-cyan-500/10 py-2 text-sm font-bold text-cyan-200">
              {t.topRatedSportsbooks.viewOffer}
            </span>
          </a>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <a
          href={href}
          className="text-sm font-bold text-cyan-300 hover:text-cyan-100 underline underline-offset-4"
        >
          {t.featuredSportsbooks.seeAll}
        </a>
      </div>

      <p className="text-[11px] text-slate-400 text-center max-w-xl mx-auto mt-4 leading-relaxed">
        {t.affiliateDisclaimer}
      </p>
    </section>
  );
}
