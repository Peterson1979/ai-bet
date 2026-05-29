// app/components/Hero.tsx

export default function Hero() {
  return (
    <section
      className="
        relative overflow-hidden
        rounded-[28px]
        border border-cyan-400/20
        shadow-[0_0_50px_rgba(56,189,248,0.10)]
        px-4 py-16 md:px-8 md:py-24
        text-center
      "
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="hero background"
          className="
            h-full w-full object-cover
            opacity-95
            scale-100
          "
        />

        {/* LIGHT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050A14]/45 via-[#0B1220]/35 to-[#050A14]/55" />
      </div>

      {/* GLOW */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300 backdrop-blur-sm">
          AI SPORTS ANALYTICS
        </div>

        <h1
          className="
            mt-5
            text-4xl md:text-6xl
            font-black
            text-white
            tracking-wide
            drop-shadow-[0_0_25px_rgba(0,0,0,0.8)]
          "
        >
          AI Tips
        </h1>

        <h2
          className="
            mt-4
            text-xl md:text-3xl
            font-bold
            text-cyan-300
            drop-shadow-[0_0_20px_rgba(0,0,0,0.7)]
          "
        >
          AI-Powered Betting Insights
        </h2>

        <p
          className="
            mx-auto mt-6 max-w-3xl
            text-sm md:text-lg
            leading-7
            text-slate-100
            drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]
          "
        >
          AI-powered predictions, analytics and betting insights across Football, NBA, NFL, Hockey and Tennis.
        </p>
      </div>
    </section>
  );
}