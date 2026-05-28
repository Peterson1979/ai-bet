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

export default function TopBettingSites() {
  return (
    <div className="space-y-3">
      {sites.map((site) => (
        <a
          key={site.name}
          href={site.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="
            relative block
            rounded-xl
            border border-[#1E293B]
            bg-[#0F172A]
            p-4

            transition-all duration-300
            hover:-translate-y-1
            hover:border-cyan-400/50
            hover:shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_20px_rgba(56,189,248,0.15)]
          "
        >
          {/* metallic overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-40" />

          <div className="relative flex items-center justify-between">
            {/* LOGO PLACEHOLDER */}
            <div className="flex items-center gap-3">
              <div
                className="
                  h-10 w-10 rounded-lg
                  border border-cyan-400/30
                  bg-[#111C31]
                  shadow-[inset_0_0_10px_rgba(0,0,0,0.7)]
                "
              />

              <div>
                <p className="text-sm font-semibold text-white">
                  {site.name}
                </p>

                <p className="text-[11px] text-slate-500">
                  {site.bonus}
                </p>
              </div>
            </div>

            {/* rating */}
            <div
              className="
                rounded-lg
                border border-green-400/20
                bg-[#111C31]
                px-2 py-1

                text-sm font-bold text-green-400
              "
            >
              {site.rating}
            </div>
          </div>

          {/* CTA hint */}
          <div className="mt-3 text-[11px] text-slate-500">
            Click to check latest offer
          </div>
        </a>
      ))}
    </div>
  );
}