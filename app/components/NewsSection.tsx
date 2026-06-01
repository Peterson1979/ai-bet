// app/components/NewsSection.tsx
import { getLatestNews } from "@/app/lib/news";

const SPORT_EMOJI: Record<string, string> = {
  Football: "⚽",
  NBA:      "🏀",
  NFL:      "🏈",
  Hockey:   "🏒",
  Tennis:   "🎾",
  MLB:      "⚾",
  MMA:      "🥊",
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

export default async function NewsSection() {
  const news = await getLatestNews();

  if (!news || news.length === 0) return null;

  // Sport-onként csoportosítás
  const bySport = news.reduce<Record<string, typeof news>>((acc, item) => {
    if (!acc[item.sport]) acc[item.sport] = [];
    acc[item.sport].push(item);
    return acc;
  }, {});

  const sports = Object.keys(bySport);

  return (
    <section className="mt-16">
      {/* SECTION HEADER */}
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
          Latest Sports News
        </h2>
        <div className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-cyan-400/40 to-transparent" />
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-300">
          ESPN
        </span>
      </div>

      {/* GRID — sport-onként */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {sports.map((sport) => (
          <div
            key={sport}
            className="
              rounded-[24px]
              border border-cyan-400/20
              bg-gradient-to-b from-[#0B1220] to-[#0F172A]
              p-5
              shadow-[0_0_25px_rgba(56,189,248,0.06)]
            "
          >
            {/* SPORT HEADER */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xl">{SPORT_EMOJI[sport] ?? "🏆"}</span>
              <h3 className="text-base font-black text-white">{sport}</h3>
            </div>

            {/* NEWS ITEMS */}
            <div className="space-y-3">
              {bySport[sport].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group block
                    rounded-xl
                    border border-white/5
                    bg-[#060B14]
                    p-3
                    transition-all duration-200
                    hover:border-cyan-400/30
                    hover:bg-cyan-500/5
                  "
                >
                  <p className="text-sm font-semibold leading-5 text-slate-200 group-hover:text-white line-clamp-2">
                    {item.title}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400/70">
                      {item.source}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {timeAgo(item.pubDate)}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* DISCLAIMER */}
      <p className="mt-6 text-center text-[11px] text-slate-500">
        News sourced from ESPN via RSS. Content belongs to respective owners.
      </p>
    </section>
  );
}
