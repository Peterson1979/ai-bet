const sports = [
  {
    name: "Football",
    icon: "⚽",
    href: "#football",
  },
  {
    name: "NBA",
    icon: "🏀",
    href: "#nba",
  },
  {
    name: "NFL",
    icon: "🏈",
    href: "#nfl",
  },
  {
    name: "Hockey",
    icon: "🏒",
    href: "#hockey",
  },
  {
    name: "Tennis",
    icon: "🎾",
    href: "#tennis",
  },
];

export default function SportNav() {
  return (
    <section className="rounded-[26px] border border-[#1E293B] bg-[#0F172A] p-5">
      <div className="flex flex-wrap gap-4">
        {sports.map((sport) => (
          <a
            key={sport.name}
            href={sport.href}
            className="group flex min-w-[140px] flex-1 items-center gap-4 rounded-2xl border border-slate-800 bg-[#111827] px-5 py-4 transition duration-300 hover:border-cyan-400/50 hover:bg-[#162033] hover:shadow-[0_0_20px_rgba(56,189,248,0.18)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl transition duration-300 group-hover:bg-cyan-500/20">
              {sport.icon}
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                {sport.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                AI predictions
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}