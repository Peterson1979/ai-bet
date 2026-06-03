import "./globals.css";
import type { Metadata } from "next";

import AnalyticsProvider from "./components/AnalyticsProvider";
import AdSense from "./components/AdSense";
import CookieBanner from "./components/CookieBanner";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "AI Betting Analytics",
    template: "%s | AI Betting Analytics",
  },
  description:
    "AI-powered sports betting predictions, value bets, and analytics platform.",
  keywords:
    "AI betting, sports predictions, betting tips, value bets, odds analysis",

  metadataBase: new URL(siteUrl),

  openGraph: {
    title: "AI Betting Analytics",
    description: "AI-powered betting prediction platform",
    url: siteUrl,
    siteName: "AI Betting Analytics",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#060B14] text-white antialiased">

        {/* ANALYTICS / ADS LAYER */}
        <AnalyticsProvider />
        <AdSense />
        <CookieBanner />

        {/* APP */}
        <div className="flex min-h-screen flex-col">
          {children}
        </div>

      </body>
    </html>
  );
}