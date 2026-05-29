// app/components/Hero.tsx

import Link from "next/link";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Football", href: "#football" },
  { label: "NBA", href: "#nba" },
  { label: "NFL", href: "#nfl" },
  { label: "Hockey", href: "#hockey" },
  { label: "Tennis", href: "#tennis" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-cyan-400/20 shadow-[0_0_50px_rgba(56,189,248,0.10)]">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="hero background"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* NAVBAR (INTEGRATED) */}
      <div className="relative z-20 flex items-center justify-between px-6 py-4 md:px-10">
        <div className="text-white font-black tracking-wide">
          AI Betting
        </div>

        <nav className="flex flex-wrap gap-4 text-sm text-slate-200">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-cyan-300 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 px-4 py-20 md:px-8 md:py-28 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white">
          AI Tips
        </h1>

        <h2 className="mt-4 text-xl md:text-3xl font-bold text-cyan-300">
          AI-Powered Betting Insights
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-sm md:text-lg leading-7 text-white">
          AI-powered predictions, analytics and betting insights across Football, NBA, NFL, Hockey and Tennis.
        </p>
      </div>

    </section>
  );
}