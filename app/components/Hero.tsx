export default function Hero() {
  return (
    <section
      className="
        relative overflow-hidden

        rounded-[28px]
        border border-cyan-400/20

        shadow-[0_0_50px_rgba(56,189,248,0.10)]

        px-6 py-16 text-center
      "
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="hero background"
          className="
            h-full w-full object-cover
            opacity-40
            scale-105
          "
        />

        {/* DARK OVERLAY FOR READABILITY */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050A14]/80 via-[#0B1220]/70 to-[#050A14]/90" />
      </div>

      {/* GLOW EFFECT */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        <h1
          className="
            text-3xl md:text-5xl font-black
            text-white tracking-wide
          "
        >
          Smart Sports Betting Insights
        </h1>

        <p
          className="
            mx-auto mt-5 max-w-2xl
            text-base md:text-lg
            text-slate-300
          "
        >
          AI-powered predictions, analytics and betting insights across Football, NBA, NFL, Hockey and Tennis.
        </p>
      </div>
    </section>
  );
}