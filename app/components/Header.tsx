"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 1,
          }}
        >
         <header className="relative z-50">
        </div>

        <nav
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={linkStyle}>
            Top Picks
          </Link>

          <Link href="/betting" style={linkStyle}>
            Betting
          </Link>

          <Link href="/sport-news" style={linkStyle}>
            Sport News
          </Link>

          <Link href="/betting-tools" style={linkStyle}>
            Betting Tools
          </Link>
        </nav>
      </div>
    </header>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 15,
};