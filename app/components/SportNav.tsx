const sports = ["Football", "NBA", "NFL", "Hockey", "Tennis"];

export default function SportNav() {
  return (
    <nav
      className="
        flex flex-wrap items-center justify-center gap-3

        px-2 py-3
      "
    >
      {sports.map((sport) => (
        <a
          key={sport}
          href={`#${sport.toLowerCase()}`}
          className="
            relative overflow-hidden

            rounded-full

            border border-cyan-400/20
            bg-gradient-to-b from-[#0B1220] to-[#0F172A]

            px-5 py-2

            text-sm font-semibold text-slate-300

            shadow-[0_0_15px_rgba(56,189,248,0.05)]

            transition-all duration-300

            hover:border-cyan-400/60
            hover:text-cyan-300
            hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]
            hover:-translate-y-0.5

            active:scale-95
          "
        >
          {/* subtle inner glow */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -top-6 left-2 h-10 w-10 rounded-full bg-cyan-400/10 blur-xl" />
          </div>

          <span className="relative z-10">{sport}</span>
        </a>
      ))}
    </nav>
  );
}