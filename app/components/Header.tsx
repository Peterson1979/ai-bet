"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        bg-[#060B14]/75 backdrop-blur-md
        border-b border-cyan-400/10
      "
    >
      <div
        className="
          max-w-[1400px] mx-auto
          px-4 py-4
          flex items-center justify-between
        "
      >

        {/* NAV LEFT (desktop: nav, mobile: hidden Home handled in right) */}
        <nav
          className="
            flex items-center gap-5
            text-sm font-bold
          "
        >
          <Link href="/" className={linkClass}>
            Top Picks
          </Link>
          <Link href="/betting" className={linkClass}>
            Betting
          </Link>
          <Link href="/sport-news" className={linkClass}>
            Sport News
          </Link>
          <Link href="/betting-tools" className={linkClass}>
            Tools
          </Link>
        </nav>

        {/* RIGHT SIDE (Home moved here + fixes mobile crowding) */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="
              text-cyan-300 font-black text-sm
              hover:text-cyan-200
              transition
            "
          >
            Home
          </Link>
        </div>

      </div>
    </header>
  );
}

const linkClass =
  "text-white font-bold text-sm transition hover:text-cyan-300";