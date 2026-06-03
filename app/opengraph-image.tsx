import { ImageResponse } from "next/og";

export const runtime = "edge";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#050A12",
          color: "white",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
          fontWeight: 800,
        }}
      >
        AI Betting Predictions
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}