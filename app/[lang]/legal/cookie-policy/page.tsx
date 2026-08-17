import { redirect } from "next/navigation";
import type { Lang } from "@/app/lib/i18n";
import type { Metadata } from "next";
import ManageCookieButton from "@/app/components/ManageCookieButton";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.matchsignal.pro";
  return {
    title: "Cookie Policy | MatchSignal",
    description:
      "Information about how cookies and tracking technologies are used on the MatchSignal sports betting platform.",
    alternates: {
      canonical: `${baseUrl}/en/legal/cookie-policy`,
    },
  };
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  if (lang !== "en") {
    redirect("/en/legal/cookie-policy");
  }
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-200">
      <h1 className="text-3xl font-black text-white mb-6">
        Cookie Policy
      </h1>

      <p className="mb-6">
        MatchSignal uses cookies and browser storage technologies to maintain essential
        platform functionality, analyze aggregated website traffic, and manage advertising delivery.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2 text-white">
        What Are Cookies
      </h2>

      <p className="mb-4">
        Cookies are small data files stored directly on your computer or mobile device by your
        web browser. They help web applications remember preferences and understand how visitors
        navigate through pages.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2 text-white">
        Categories of Storage &amp; Cookies Used
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-slate-300">
        <li>
          <strong className="text-white">Strictly Necessary:</strong> Essential for core site
          navigation, language preferences, security, and storing your consent choices in local storage.
        </li>
        <li>
          <strong className="text-white">Analytics (Google Analytics 4):</strong> With your consent,
          measures page traffic and usage trends. Under our privacy-safe basic mode, GA4 is not loaded until analytics consent is granted.
        </li>
        <li>
          <strong className="text-white">Advertising (Google AdSense):</strong> Used by Google AdSense
          (publisher ID ca-pub-6847785471613763) to deliver contextual or personalized advertisements in accordance with your consent preferences.
        </li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-2 text-white">
        Consent Management Architecture
      </h2>

      <p className="mb-4">
        For visitors in the European Economic Area (EEA), United Kingdom, and Switzerland, consent for advertising and measurement is governed via a Google-certified Consent Management Platform (CMP). Where Google CMP does not apply, MatchSignal provides an on-site consent banner allowing you to accept, reject, or customize non-essential storage. We support Google Consent Mode v2 to ensure your choices are respected across all integrated Google services.
      </p>

      <div className="my-6">
        <ManageCookieButton />
      </div>

      <h2 className="text-xl font-bold mt-8 mb-2 text-white">
        Contact Information
      </h2>

      <div className="mt-4 text-sm text-slate-400">
        <p>Operator: Forray Gyöngyi (Sole proprietor / individual entrepreneur)</p>
        <p>Address: 7633 Pécs, Esztergár Lajos utca 9/B, Hungary</p>
        <p>Hungarian Tax Number: 74264166-1-22</p>
        <p>Hungarian Sole Proprietor Registration Number: 57756666</p>
        <p className="mt-2">
          Privacy &amp; Cookie Inquiries:{" "}
          <a href="mailto:privacy@matchsignal.pro" className="text-cyan-400 underline">
            privacy@matchsignal.pro
          </a>
        </p>
      </div>

      <p className="mt-8 text-xs text-slate-500">
        Last updated: August 2026
      </p>
    </main>
  );
}