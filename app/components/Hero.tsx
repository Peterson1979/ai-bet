export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-cyan-400/20 shadow-[0_0_50px_rgba(56,189,248,0.10)] min-h-[520px]">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="hero background"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* GLOW */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col justify-center h-full px-4 py-20 md:px-8 md:py-28 text-center">

        <h1 className="text-4xl md:text-6xl font-black text-white">
          AI Tips
        </h1>

        <h2 className="mt-4 text-xl md:text-3xl font-bold text-cyan-300">
          AI-Powered Betting Insights
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-sm md:text-lg text-white">
          AI-powered predictions, analytics and betting insights across Football, NBA, NFL, Hockey and Tennis.
        </p>

        {/* SPORT NAV OVERLAY (BOTTOM OF HERO IMAGE) */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-5">
          <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-white bg-black/40 px-6 py-3 rounded-full backdrop-blur-md border border-white/10">

            <span>⚽ Football</span>
            <span>🏀 NBA</span>
            <span>🏈 NFL</span>
            <span>🏒 Hockey</span>
            <span>🎾 Tennis</span>
            <span>⚾ MLB</span>
            <span>🥊 MMA</span>

          </div>
        </div>

      </div>
    </section>
  );
}