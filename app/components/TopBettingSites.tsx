const sites = [
  {
    name: "bet365",
    bonus: "Up to $150 Bonus",
    rating: 9.8,
  },
  {
    name: "William Hill",
    bonus: "Up to $100 Bonus",
    rating: 9.5,
  },
  {
    name: "Betfair",
    bonus: "Up to $200 Bonus",
    rating: 9.4,
  },
];

export default function TopBettingSites() {
  return (
    <div className="space-y-3">

      {sites.map((site) => (
        <div
          key={site.name}
          className="flex items-center justify-between rounded-xl border border-[#1E293B] bg-[#0B1220] p-4"
        >

          {/* LOGO PLACEHOLDER */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-xs">
              LOGO
            </div>

            <div>
              <p className="text-base font-semibold">
                {site.name}
              </p>
              <p className="text-sm text-slate-400">
                {site.bonus}
              </p>
            </div>
          </div>

          {/* RATING */}
          <div className="text-right">
            <p className="text-lg font-bold text-cyan-400">
              {site.rating}
            </p>
          </div>

        </div>
      ))}

    </div>
  );
}