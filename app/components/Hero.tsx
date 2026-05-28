export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-cyan-400/20 bg-gradient-to-b from-[#0F172A] to-[#060B14] px-6 py-14 text-center shadow-[0_0_40px_rgba(56,189,248,0.08)]">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <h1 className="text-3xl font-black leading-tight text-white md:text-5xl">
        Smart Sports Betting Insights
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300 md:text-lg">
        AI-powered predictions, analytics and betting insights across Football, NBA, NFL, Hockey and Tennis.
      </p>
    </section>
  );
}