import { getFeaturedSites } from "@/app/lib/affiliates";

type Props = {
  lang?: string;
  bettingPageHref?: string;
  title?: string;
  subtitle?: string;
};

export default function FeaturedSportsbooks({
  lang = "en",
  bettingPageHref,
  title = "Editor's Picks",
  subtitle = "Our top-rated, trusted sportsbooks",
}: Props) {
  const sites = getFeaturedSites(3);
  const href = bettingPageHref ?? `/${lang}/betting`;

  if (!sites.length) return null;

  return (
    <section className="w-full py-8 px-4">
      <div className="text-center mb-6">
        <span className="text-cyan-300 text-lg tracking-widest">★★★★★</span>
        <h2 className="text-xl font-black text-white mt-1">{title}</h2>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {sites.map((site, i) => (
          <a
            key={site.id}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="relative flex flex-col items-center text-center gap-3 rounded-[26px] border-4 border-cyan-300/80 bg-gradient-to-b from-[#070D18] via-[#0B1220] to-[#050A12] p-6 shadow-[0_0_0_1px_rgba(34,211,238,0.25),0_18px_0_rgba(0,0,0,0.6),0_45px_120px_rgba(56,189,248,0.35)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-cyan-200"
          >
            {i === 0 && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-400 text-[#050A12] text-[10px] font-black uppercase tracking-wider px-3 py-1">
                #1 Rated
              </span>
            )}

            {site.logoUrl ? (
              <span className="flex items-center justify-center bg-white rounded-xl px-4 py-3 mt-2 w-full max-w-[180px]">
                <img
                  src={site.logoUrl}
                  alt={site.name}
                  className="max-h-[40px] max-w-[150px] object-contain"
                />
              </span>
            ) : (
              <span className="text-lg font-black text-white mt-2">{site.name}</span>
            )}

            <span className="text-cyan-300 font-black text-sm">
              {site.rating.toFixed(1)} / 10
            </span>

            <span className="text-sm text-slate-200">{site.bonus}</span>

            <span className="mt-2 w-full rounded-xl border-2 border-cyan-300/40 bg-cyan-500/10 py-2 text-sm font-bold text-cyan-200">
              Claim Bonus →
            </span>
          </a>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <a
          href={href}
          className="text-sm font-bold text-cyan-300 hover:text-cyan-100 underline underline-offset-4"
        >
          See all trusted sportsbooks →
        </a>
      </div>
    </section>
  );
}
