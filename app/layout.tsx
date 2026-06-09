import "./globals.css";
import type { Metadata } from "next";
import AnalyticsProvider from "./components/AnalyticsProvider";
import AdSense from "./components/AdSense";
import CookieBanner from "./components/CookieBanner";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "MatchSignal",
    template: "%s | MatchSignal",
  },
  description: "AI-powered sports betting predictions, value bets, and analytics platform.",
  keywords: "AI betting, sports predictions, betting tips, value bets, odds analysis",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: "MatchSignal",
    description: "AI-powered betting prediction platform",
    url: siteUrl,
    siteName: "MatchSignal",
    type: "website",
    images: [{ url: "/logo.jpeg" }],
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
        <AnalyticsProvider />
        <AdSense />
        <CookieBanner />
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}