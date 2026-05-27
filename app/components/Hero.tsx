export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#1E293B] bg-[#0F172A] p-8 md:p-12">

      {/* TEXT CONTENT */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
          Smart Betting Insights
        </h1>

        <p className="mt-4 text-slate-300 text-lg">
          AI-powered sports predictions and analytics across Football, NBA, NFL, Hockey and Tennis.
        </p>
      </div>

      {/* HERO IMAGE */}
      <div className="absolute right-0 top-0 h-full w-[55%] opacity-100">
        <img
          src="/hero.png"
          alt="hero"
          className="h-full w-full object-cover opacity-95"
        />

        {/* gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#0F172A] via-[#0F172A]/60 to-transparent" />
      </div>

    </section>
  );
}