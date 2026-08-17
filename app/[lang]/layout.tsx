import "../globals.css";
import { notFound } from "next/navigation";
import { LANGS, Lang } from "@/app/lib/i18n";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const viewport: Viewport = {
  themeColor: "#060B14",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.matchsignal.pro"),
  title: {
    default: "MatchSignal – Free AI Sports Betting Tips & Market Analysis",
    template: "%s | MatchSignal",
  },
  description:
    "Free AI-powered sports betting tips, market analysis, and value odds across Football, NBA, NFL, NHL, Tennis, MLB, and MMA.",
  keywords: [
    "betting tips",
    "sports predictions",
    "football betting tips",
    "AI betting",
    "value bets",
    "odds analysis",
  ],
  openGraph: {
    siteName: "MatchSignal",
    type: "website",
    url: "https://www.matchsignal.pro",
  },
  twitter: {
    card: "summary_large_image",
  },
};

import CookieBanner from "@/app/components/CookieBanner";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!LANGS.includes(lang as Lang)) notFound();

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <head>
        {/* Google Consent Mode v2 Default State Initialization (All denied on fresh load) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.googlefc = window.googlefc || {};
              window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });
            `,
          }}
        />

        <meta
          name="verify-admitad"
          content="ab993ad49e"
        />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6847785471613763"
          crossOrigin="anonymous"
        />
      </head>

      <body className="min-h-screen bg-[#060B14] text-white antialiased">
        <GoogleAnalytics />
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
        <CookieBanner />
      </body>
    </html>
  );
}