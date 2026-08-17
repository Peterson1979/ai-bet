import { redirect } from "next/navigation";
import type { Lang } from "@/app/lib/i18n";

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
        Categories of Cookies Used
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-slate-300">
        <li>
          <strong className="text-white">Strictly Necessary Cookies:</strong> Essential for core site
          navigation, language preferences, and security.
        </li>
        <li>
          <strong className="text-white">Analytics Cookies:</strong> Collect aggregated, non-personally
          identifiable information to measure audience trends and improve system speed.
        </li>
        <li>
          <strong className="text-white">Advertising Cookies:</strong> Used by advertising partners
          (such as Google AdSense) to deliver contextual or personalized ads based on user consent.
        </li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-2 text-white">
        Managing Your Cookie Preferences
      </h2>

      <p className="mb-4">
        You can customize or withdraw your consent for non-essential cookies at any time via the
        on-site consent banner or by adjusting your browser&apos;s cookie and tracking settings.
      </p>

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