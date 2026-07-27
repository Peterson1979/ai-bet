import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

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
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7714565858088235"
          crossOrigin="anonymous"
        />
      </head>

      <body className="min-h-screen bg-[#060B14] text-white antialiased">
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}