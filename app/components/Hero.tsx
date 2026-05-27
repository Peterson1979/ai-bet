export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-[#1E293B]">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="hero"
          className="h-full w-full object-cover scale-105 opacity-90"
        />
        <div className="absolute inset-0 bg-[#060B14]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060B14]/40 to-[#060B14]" />
      </div>

      {/* NAV INSIDE HERO */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-6 text-sm text-white">
          <a href="#top-picks" className="hover:text-cyan-300 transition">
            Top Picks
          </a>
          <a href="#betting" className="hover:text-cyan-300 transition">
            Betting
          </a>
          <a href="#news" className="hover:text-cyan-300 transition">
            Sport News
          </a>
          <a href="#tools" className="hover:text-cyan-300 transition">
            Betting Tools
          </a>
        </div>

        <div className="text-xs text-slate-400">
          18+ | Gamble Responsibly
        </div>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 px-6 pb-16 pt-10 md:pt-16">
        
        {/* REMOVED TITLE (AI Bets removed) */}

        <h1 className="max-w-2xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
          AI Sports Betting Insights
        </h1>

        <p className="mt-4 max-w-xl text-sm text-slate-300 md:text-base">
          Real-time AI predictions, analytics and betting insights across Football, NBA, NFL, Hockey and Tennis.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#football"
            className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black shadow-[0_0_18px_rgba(56,189,248,0.25)] transition hover:bg-cyan-300"
          >
            View Predictions
          </a>

          <a
            href="#betting"
            className="rounded-xl border border-[#1E293B] bg-[#0F172A]/60 px-5 py-3 text-sm text-white backdrop-blur transition hover:border-cyan-400/40"
          >
            Top Sites
          </a>
        </div>
      </div>

    </section>
  );
}