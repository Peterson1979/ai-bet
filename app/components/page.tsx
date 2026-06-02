// app/sport-news/page.tsx
import { getLatestNews } from "@/app/lib/news";
import { getSidebarSites } from "@/app/lib/affiliates";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const SPORT_EMOJI: Record<string, string> = {
  Football: "⚽", NBA: "🏀", NFL: "🏈",
  Hockey: "🏒", Tennis: "🎾", MLB: "⚾", MMA: "🥊",
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

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#060B14] via-[#070D1A] to-[#050A12]">

      <Header />

      {/* LIGHT GLOW BACKGROUND LAYER */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute top-[-120px] left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-[-120px] right-20 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="pt-[70px] relative z-10">
        <div className="mx-auto max-w-[1500px] px-4 md:px-6 pb-16">

          {/* PAGE HEADER */}
          <div className="py-12">
            <h1 className="text-5xl font-black tracking-tight">
              Sport <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">News</span>
            </h1>

            <p className="mt-4 max-w-2xl text-slate-300">
              Latest sports news across Football, NBA, NFL, Hockey, Tennis, MLB and MMA — updated every 30 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_380px] items-start">

            {/* NEWS GRID */}
            <div className="space-y-12">

              {Object.entries(bySport).map(([sport, items]) => (
                <section key={sport}>

                  {/* SPORT HEADER */}
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-3xl drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                      {SPORT_EMOJI[sport] ?? "🏆"}
                    </span>

                    <h2 className="text-2xl font-black">{sport}</h2>

                    <div className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-cyan-400/60 to-transparent" />
                  </div>

                  {/* CARDS */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {items.map((item, i) => (
                      <a
                        key={i}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          group relative block rounded-2xl
                          border border-cyan-400/20
                          bg-gradient-to-b from-[#0B1220] via-[#0C1526] to-[#0F172A]
                          p-5
                          shadow-[0_10px_30px_rgba(0,0,0,0.45)]
                          transition-all duration-300
                          hover:-translate-y-1
                          hover:border-cyan-300/60
                          hover:shadow-[0_20px_60px_rgba(56,189,248,0.15)]
                        "
                      >
                        {/* glow overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-cyan-500/5 rounded-2xl" />

                        <p className="relative text-sm font-semibold leading-6 text-slate-200 group-hover:text-white line-clamp-3">
                          {item.title}
                        </p>

                        <div className="relative mt-4 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
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
            <aside className="h-fit xl:sticky xl:top-24 space-y-6">

              <h2 className="text-xl font-black text-white">
                Top Betting Sites
              </h2>

              {sites.map((site) => (
                <a
                  key={site.id}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="
                    group block rounded-2xl
                    border border-cyan-400/20
                    bg-gradient-to-b from-[#0B1220] via-[#0C1526] to-[#0F172A]
                    p-5
                    shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                    transition
                    hover:-translate-y-1
                    hover:border-cyan-300/60
                    hover:shadow-[0_25px_60px_rgba(34,211,238,0.15)]
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-white">{site.name}</p>
                      <p className="mt-1 text-sm text-cyan-300">{site.bonus}</p>
                    </div>

                    <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-2">
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

        <Footer />
      </div>
    </main>
  );
}