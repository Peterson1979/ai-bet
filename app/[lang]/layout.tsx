import "../globals.css";
import { notFound } from "next/navigation";
import { LANGS, Lang } from "@/app/lib/i18n";
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
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}