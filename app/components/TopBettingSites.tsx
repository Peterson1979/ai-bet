const bettingSites = [
  {
    name: "bet365",
    bonus: "Up to $150 Bonus",
    rating: "9.8",
  },
  {
    name: "Stake",
    bonus: "Crypto Welcome Bonus",
    rating: "9.6",
  },
  {
    name: "1xBet",
    bonus: "100% First Deposit",
    rating: "9.4",
  },
  {
    name: "Betano",
    bonus: "Top Football Odds",
    rating: "9.2",
  },
  {
    name: "Pinnacle",
    bonus: "Low Margin Odds",
    rating: "9.1",
  },
];

export default function TopBettingSites() {
  return (
    <div className="space-y-4">
      {bettingSites.map((site) => (
        <div
          key={site.name}
          className="rounded-[22px] border border-[#1E293B] bg-[#111827] p-5 transition duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_24px_rgba(56,189,248,0.14)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-white">
                  {site.name}
                </h3>

                <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-semibold text-green-400">
                  {site.rating}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {site.bonus}
              </p>
            </div>

            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-300 font-bold">
              AI
            </div>
          </div>

          <div className="mt-5">
            <a
              href="#"
              className="flex w-full items-center justify-center rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-bold text-black transition hover:bg-cyan-300 hover:shadow-[0_0_24px_rgba(56,189,248,0.45)]"
            >
              Visit Site
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}