import { getLatestNews } from "@/app/lib/news";
import { getTopRatedList } from "@/app/lib/affiliates";
import Header from "@/app/components/Header";
import SimpleFooter from "@/app/components/SimpleFooter";
import { translations, Lang } from "@/app/lib/i18n";

const SPORT_EMOJI: Record<string, string> = {
  Football: "⚽", NBA: "🏀", NFL: "🏈", Hockey: "🏒", Tennis: "🎾", MLB: "⚾", MMA: "🥊",
};

function timeAgo(pubDate: string): string {
  if (!pubDate) return "";
  try {
    const diff = Date.now() - new Date(pubDate).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  } catch { return ""; }
}

export default async function SportNewsPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const t = translations[lang] ?? translations.en;

  const news = await getLatestNews();
  const sites = getTopRatedList(7);

  const bySport = news.reduce<Record<string, typeof news>>((acc, item) => {
    if (!acc[item.sport]) acc[item.sport] = [];
    acc[item.sport].push(item);
    return acc;
  }, {});

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.sportNews.title,
    description: t.sportNews.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/news`,
  };

  return (
    <main className="min-h-screen bg-[#060B14] text-white">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pt-[70px]">
        <div className="mx-auto max-w-[1500px] px-4 md:px-6 pb-16">
          <div className="py-12">
            <h1 className="text-4xl font-black text-white md:text-5xl">{t.sportNews.titleMain}</h1>
            <p className="mt-4 max-w-2xl text-slate-300">{t.sportNews.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_320px] items-start">
            <div className="space-y-10">
              {Object.entries(bySport).map(([sport, items]) => (
                <section key={sport}>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-2xl">{SPORT_EMOJI[sport] ?? "🏆"}</span>
                    <h2 className="text-xl font-black text-white">
                      {(t.sports as Record<string, string>)[sport.toLowerCase()] ?? sport}
                    </h2>
                    <div className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-cyan-400/40 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, i) => (
                      <a
                        key={i}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-5 transition-all duration-200 hover:border-cyan-400/50 hover:-translate-y-0.5"
                      >
                        <p className="text-sm font-semibold leading-6 text-slate-200 group-hover:text-white line-clamp-3">{item.title}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">{item.source}</span>
                          <span className="text-[10px] text-slate-400">{timeAgo(item.pubDate)}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Sidebar: Top Betting Sites kompakt, logókkal */}
            <aside className="h-fit xl:sticky xl:top-24 space-y-3">
              <h2 className="text-xl font-black text-white mb-4">{t.topRatedSportsbooks.title}</h2>
              {sites.map((site, i) => (
                <a
                  key={site.id}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="group flex items-center gap-3 rounded-xl border border-cyan-400/20 bg-gradient-to-b from-[#0B1220] to-[#0F172A] px-4 py-3 transition-all duration-200 hover:border-cyan-300/60 hover:-translate-y-0.5"
                >
                  <span className="text-cyan-300 font-black text-xs w-4 shrink-0">{i + 1}</span>

                  {site.logoUrl ? (
                    <span className="flex items-center justify-center bg-white rounded-md px-2 py-1 shrink-0">
                      <img
                        src={site.logoUrl}
                        alt={site.name}
                        className="max-h-[18px] max-w-[60px] object-contain"
                      />
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-white">{site.name}</span>
                  )}

                  <div className="flex-1 min-w-0">
                    {site.logoUrl && (
                      <p className="text-sm font-bold text-white truncate">{site.name}</p>
                    )}
                    <p className="text-[11px] text-cyan-300 truncate">{site.bonus}</p>
                  </div>

                  <span className="text-[11px] text-emerald-300 font-black shrink-0">{site.rating}★</span>
                </a>
              ))}

              <div className="pt-2 flex justify-center">
                <a
                  href={`/${lang}/betting`}
                  className="text-sm font-bold text-cyan-300 hover:text-cyan-100 underline underline-offset-4"
                >
                  {t.topRatedSportsbooks.compareAll}
                </a>
              </div>
            </aside>
          </div>
        </div>
        <SimpleFooter />
      </div>
    </main>
  );
}
