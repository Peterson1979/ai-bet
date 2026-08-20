import "../globals.css";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { LANGS, Lang } from "@/app/lib/i18n";
import { CONSENT_PATH_HEADER, isConsentFreePolicyPath } from "@/app/lib/consentRoutes";
import { ADSENSE_SCRIPT_ID, ADSENSE_SCRIPT_SRC } from "@/app/lib/googleConfig";
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

import ConsentRuntime from "@/app/components/ConsentRuntime";

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!LANGS.includes(lang as Lang)) notFound();
  const pathname = (await headers()).get(CONSENT_PATH_HEADER) ?? "";
  const googleServicesEnabled = !isConsentFreePolicyPath(pathname);

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <head>
        {googleServicesEnabled ? (
          <>
            {/* Privacy-safe defaults execute before the top-level AdSense/CMP bootstrap. */}
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
                  window.__matchsignalConsentDefaultsInitialized = true;
                `,
              }}
            />

            <script
              id={ADSENSE_SCRIPT_ID}
              async
              src={ADSENSE_SCRIPT_SRC}
              crossOrigin="anonymous"
            />
          </>
        ) : null}

        <meta
          name="verify-admitad"
          content="ab993ad49e"
        />

      </head>

      <body className="min-h-screen bg-[#060B14] text-white antialiased">
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
        <ConsentRuntime initialGoogleServicesEnabled={googleServicesEnabled} />
      </body>
    </html>
  );
}
