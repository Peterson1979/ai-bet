import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Betting Tips - Daily Value Bets",
  description:
    "AI-powered football predictions with odds comparison and value bet detection.",
  keywords: [
    "betting tips",
    "football predictions",
    "AI betting",
    "value bets",
    "odds analysis",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#0b0f14",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}