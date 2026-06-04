"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        backgroundColor: "rgba(6,11,20,0.75)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "18px 24px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          color: "white",
        }}
      >
        <nav
          style={{
            display: "flex",
            gap: 22,
            flexWrap: "nowrap",
            overflowX: "auto",
            whiteSpace: "nowrap",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <Link href="/" style={linkStyle}>
            Home
          </Link>

          <Link href="/#top-picks" style={linkStyle}>
            Top Picks
          </Link>

          <Link href="/en/betting" style={linkStyle}>
            Betting
          </Link>

          <Link href="/en/sport-news" style={linkStyle}>
            News
          </Link>

          <Link href="/en/betting-tools" style={linkStyle}>
            Tools
          </Link>
        </nav>
      </div>
    </header>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 14,
};