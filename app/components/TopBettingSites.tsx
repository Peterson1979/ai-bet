type BettingSite = {
  name: string;
  rating: number;
  bonus: string;
  url: string;
};

const sites: BettingSite[] = [
  {
    name: "Bet365",
    rating: 9.8,
    bonus: "Up to $150 Bonus",
    url: "#",
  },
  {
    name: "1xBet",
    rating: 9.5,
    bonus: "Up to $200 Bonus",
    url: "#",
  },
  {
    name: "Bwin",
    rating: 9.2,
    bonus: "Up to $100 Bonus",
    url: "#",
  },
];

function getRatingColor(rating: number) {
  if (rating >= 9.7) {
    return "text-emerald-300 border-emerald-400/40 bg-emerald-500/10";
  }

  if (rating >= 9.4) {
    return "text-cyan-300 border-cyan-400/40 bg-cyan-500/10";
  }

  return "text-yellow-300 border-yellow-400/40 bg-yellow-500/10";
}

export default function TopBettingSites() {
  return (
    <div className="space-y-4">
      {sites.map((site, index) => {
        const ratingStyle = getRatingColor(site.rating);

        return (
          <a
            key={site.name}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="
              group
              relative block overflow-hidden

              rounded-2xl

              border border-cyan-400/20
              bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#070B14]

              p-5

              shadow-[0_0_35px_rgba(56,189,248,0.08)]
              ring-1 ring-white/5

              transition-all duration-300 ease-out

              hover:-translate-y-1
              hover:border-cyan-300/60
              hover:shadow-[0_0_60px_rgba(56,189,248,0.18)]
              hover:ring-cyan-400/20
            "
          >
            {/* BACKGROUND GLOW */}
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute -top-16 left-6 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            {/* TOP STRIP */}
            <div className="relative flex items-center justify-between mb-4">

              {/* sponsored label */}
              <div className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-200">
                Featured Sportsbook
              </div>

              {/* ranking */}
              <div className="text-[11px] font-semibold text-slate-300">
                Rank #{index + 1}
              </div>
            </div>

            {/* MAIN */}
            <div className="relative flex items-center justify-between gap-4">

              {/* LEFT */}
              <div className="flex items-center gap-4">

                {/* logo placeholder */}
                <div
                  className="
                    relative

                    flex h-12 w-12 items-center justify-center

                    rounded-xl

                    border border-cyan-400/25
                    bg-[#111C31]

                    shadow-[inset_0_0_20px_rgba(0,0,0,0.7)]
                  "
                >
                  <div className="h-5 w-5 rounded-full bg-cyan-400/70 blur-[2px]" />
                </div>

                {/* text */}
                <div>

                  <p className="text-base font-black tracking-wide text-white">
                    {site.name}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-200">
                    {site.bonus}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-300">
                    Trusted sportsbook with competitive odds
                  </p>
                </div>
              </div>

              {/* RATING */}
              <div
                className={`
                  rounded-xl border px-3 py-2
                  ${ratingStyle}
                `}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider">
                  Rating
                </div>

                <div className="mt-1 text-xl font-black">
                  {site.rating}
                </div>
              </div>
            </div>

            {/* BOTTOM CTA */}
            <div className="relative mt-5">

              <div className="flex items-center justify-between">

                <div className="text-[12px] font-medium text-slate-200">
                  Claim latest bonus offer
                </div>

                <div
                  className="
                    rounded-full
                    border border-cyan-400/30
                    bg-cyan-500/10

                    px-4 py-2

                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-cyan-300

                    transition-all duration-300

                    group-hover:bg-cyan-400/20
                    group-hover:border-cyan-300/60
                    group-hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]
                  "
                >
                  Visit Site
                </div>
              </div>
            </div>

            {/* BORDER FX */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 shadow-inner" />
          </a>
        );
      })}
    </div>
  );
}