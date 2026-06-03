// app/sport-news/page.tsx
import { getLatestNews } from "@/app/lib/news";
import { getSidebarSites } from "@/app/lib/affiliates";
import Header from "@/app/components/Header";
import SimpleFooter from "@/app/components/SimpleFooter";

const SPORT_EMOJI: Record<string, string> = {
  Football: "⚽",
  NBA: "🏀",
  NFL: "🏈",
  Hockey: "🏒",
  Tennis: "🎾",
  MLB: "⚾",
  MMA: "🥊",
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
  } catch {
    return "";
  }
}

export default async function SportNewsPage() {
  const [news, sites] = await Promise.all([
    getLatestNews(),
    Promise.resolve(getSidebarSites()),
  ]);

  const bySport = news.reduce<Record<string, typeof news>>((acc, item) => {
    if (!acc[item.sport]) acc[item.sport] = [];
    acc[item.sport].push(item);
    return acc;
  }, {});

  // ✅ STRUCTURED DATA (SPORT NEWS PAGE)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Sport News",
    description:
      "Latest sports news across Football, NBA, NFL, Hockey, Tennis, MLB and MMA",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/sport-news`,
  };

  return (
    <main className="min-h-screen bg-[#060B14] text-white">
      <Header />

      {/* SEO STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="pt-[70px]">
        <div className="mx-auto max-w-[1500px] px-4 md:px-6 pb-16">

          {/* PAGE HEADER */}
          <div className="py-12">
            <h1 className="text-4xl font-black text-white md:text-5xl">
              Sport <span className="text-cyan-400">News</span>
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Latest sports news across Football, NBA, NFL, Hockey, Tennis, MLB and MMA — updated every 30 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_380px] items-start">

            {/* NEWS GRID */}
            <div className="space-y-10">
              {Object.entries(bySport).map(([sport, items]) => (
                <section key={sport}>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-2xl">{SPORT_EMOJI[sport] ?? "🏆"}</span>
                    <h2 className="text-xl font-black text-white">{sport}</h2>
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
                        <p className="text-sm font-semibold leading-6 text-slate-200 group-hover:text-white line-clamp-3">
                          {item.title}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                            {item.source}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {timeAgo(item.pubDate)}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* SIDEBAR */}
            <aside className="h-fit xl:sticky xl:top-24 space-y-5">
              <h2 className="text-xl font-black text-white">Top Betting Sites</h2>

              {sites.map((site) => (
                <a
                  key={site.id}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="group block rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-5 transition-all duration-200 hover:border-cyan-300/60 hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-white">{site.name}</p>
                      <p className="mt-1 text-sm text-cyan-300">{site.bonus}</p>
                    </div>
                    <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-center">
                      <div className="text-[10px] text-slate-400">Rating</div>
                      <div className="font-black text-emerald-300">
                        {site.rating}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-full border border-cyan-400/30 bg-cyan-500/10 py-2 text-center text-xs font-bold text-cyan-300 group-hover:bg-cyan-400/20">
                    Visit Site →
                  </div>
                </a>
              ))}
            </aside>
          </div>
        </div>

        <SimpleFooter />
      </div>
    </main>
  );
}