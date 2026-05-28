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
      <body className="min-h-screen bg-[#060B14] text-white antialiased">
        {/* GLOBAL APP WRAPPER */}
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}