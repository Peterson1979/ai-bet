import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-slate-800 min-h-[520px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-[#060B14]/45" />

      <div className="relative z-20 flex min-h-[520px] flex-col justify-between p-8 md:p-12">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-3">
            <Link
              href="#top-picks"
              className="rounded-full border border-slate-700 bg-[#0F172A]/90 px-5 py-2 text-sm text-white transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Top Picks
            </Link>

            <Link
              href="#betting-sites"
              className="rounded-full border border-slate-700 bg-[#0F172A]/90 px-5 py-2 text-sm text-white transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Betting
            </Link>

            <Link
              href="/sport-news"
              className="rounded-full border border-slate-700 bg-[#0F172A]/90 px-5 py-2 text-sm text-white transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Sport News
            </Link>

            <Link
              href="/betting-tools"
              className="rounded-full border border-slate-700 bg-[#0F172A]/90 px-5 py-2 text-sm text-white transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Betting Tools
            </Link>
          </div>
        </header>

        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 glow-cyan">
            AI Powered Betting Intelligence
          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white md:text-6xl">
            Smarter Sports Betting Insights Powered By AI
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Daily football, NBA, NFL, hockey and tennis predictions with AI-driven analysis, confidence scores and betting insights.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#top-picks"
              className="rounded-2xl bg-cyan-400 px-7 py-4 font-semibold text-black transition hover:scale-[1.03] glow-cyan"
            >
              Explore Picks
            </a>

            <a
              href="#betting-sites"
              className="rounded-2xl border border-slate-600 bg-[#0F172A]/80 px-7 py-4 font-semibold text-white transition hover:border-cyan-400"
            >
              Betting Sites
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}