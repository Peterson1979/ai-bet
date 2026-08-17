import { ImageResponse } from "next/og";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#060B14",
          color: "white",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 60,
          fontWeight: 900,
          letterSpacing: "-0.02em",
        }}
      >
        <div style={{ color: "#22D3EE", marginBottom: 12 }}>MatchSignal</div>
        <div style={{ fontSize: 32, fontWeight: 600, color: "#94A3B8" }}>
          Free AI Sports Betting Tips &amp; Market Analysis
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}