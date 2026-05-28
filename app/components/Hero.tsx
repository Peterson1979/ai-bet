export default function Hero() {
  return (
    <section
      className="
        relative overflow-hidden
        rounded-2xl
        border border-[#1E293B]
        bg-[#060B14]
        p-6 md:p-10
      "
    >
      {/* BACKGROUND IMAGE LAYER */}
      <div
        className="
          absolute inset-0
          bg-[url('/hero.jpg')]
          bg-cover bg-center
          opacity-40
        "
      />

      {/* DARK OVERLAY (fix readability + depth) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060B14]/95 via-[#060B14]/70 to-[#060B14]/40" />

      {/* CONTENT */}
      <div className="relative max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-black leading-tight text-white">
          Smart Sports Betting Insights
        </h1>

        <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed">
          AI-driven sports analysis across Football, NBA, NFL, Hockey and Tennis.
          Structured predictions, clear insights, and data-backed betting signals.
        </p>

        {/* optional CTA area placeholder */}
        <div className="mt-6 flex gap-3">
          <a
            href="#football"
            className="
              rounded-xl
              bg-cyan-400
              px-5 py-3
              text-sm font-semibold text-black

              shadow-[0_10px_25px_rgba(56,189,248,0.25)]
              hover:bg-cyan-300
              transition
            "
          >
            View Picks
          </a>

          <a
            href="#"
            className="
              rounded-xl
              border border-slate-700
              bg-[#0F172A]
              px-5 py-3
              text-sm text-white

              hover:border-cyan-400/40
              transition
            "
          >
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}