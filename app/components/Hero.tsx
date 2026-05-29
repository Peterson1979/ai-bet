// app/components/Hero.tsx

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-cyan-400/20 shadow-[0_0_50px_rgba(56,189,248,0.10)]">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="hero background"
          className="h-full w-full object-cover object-center"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* GLOW */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* CONTENT - REDUCED TOP SPACE */}
      <div className="relative z-10 flex flex-col justify-start px-4 pt-10 pb-20 md:px-8 md:pt-14">

        <h1 className="text-4xl md:text-6xl font-black text-white tracking-wide">
          AI Tips
        </h1>

        <h2 className="mt-3 text-xl md:text-3xl font-bold text-cyan-300">
          AI-Powered Betting Insights
        </h2>

        <p className="mt-4 max-w-3xl text-sm md:text-lg leading-7 text-white">
          AI-powered predictions, analytics and betting insights across Football, NBA, NFL, Hockey and Tennis.
        </p>

      </div>
    </section>
  );
}