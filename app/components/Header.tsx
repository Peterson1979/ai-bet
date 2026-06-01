"use client";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/#top-picks",   label: "Top Picks" },
  { href: "/betting",      label: "Betting"   },
  { href: "/sport-news",   label: "Sport News"},
  { href: "/betting-tools",label: "Tools"     },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-[rgba(6,11,20,0.85)] backdrop-blur-md border-b border-white/5">
      <div className="mx-auto max-w-[1500px] px-4 md:px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-2xl font-black text-white tracking-tight hover:text-cyan-300 transition-colors">
          AI<span className="text-cyan-400">Bet</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full text-sm font-semibold text-slate-300 hover:text-white hover:bg-cyan-400/10 hover:border-cyan-400/30 border border-transparent transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-[#0B1220] border-t border-white/5 px-4 py-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-cyan-400/10 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
