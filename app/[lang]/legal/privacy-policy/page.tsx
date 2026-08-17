import { redirect } from "next/navigation";
import type { Lang } from "@/app/lib/i18n";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  if (lang !== "en") {
    redirect("/en/legal/privacy-policy");
  }
  return (
    <>
      <h1 className="text-4xl font-black text-white">Privacy Policy</h1>

      <p className="mt-6">
        This Privacy Policy explains how information is collected, used, and protected
        when you access and navigate the MatchSignal website.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Website Operator
      </h2>

      <div className="mt-4 text-slate-300">
        <p className="font-bold text-white">Operator:</p>
        <p>Forray Gyöngyi</p>
        <p>Legal status: Sole proprietor (individual entrepreneur)</p>
        <p>Address: 7633 Pécs, Esztergár Lajos utca 9/B, Hungary</p>
        <p>Hungarian Tax Number: 74264166-1-22</p>
        <p>Hungarian Sole Proprietor Registration Number: 57756666</p>
      </div>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Information We Collect
      </h2>

      <ul className="mt-4 list-disc pl-6 space-y-2 text-slate-300">
        <li>Contact information submitted voluntarily via our contact form.</li>
        <li>Aggregated, anonymized website analytics data (e.g., page views, referring paths).</li>
        <li>Browser configuration, operating system, and general device telemetry.</li>
        <li>Locally stored cookie and consent preferences.</li>
      </ul>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Third-Party Services &amp; Telemetry
      </h2>

      <div className="mt-4 space-y-4 text-slate-300">
        <div>
          <p className="font-bold text-white">Analytics</p>
          <p>
            We may use privacy-conscious analytics services to understand audience engagement
            and improve site performance.
          </p>
        </div>

        <div>
          <p className="font-bold text-white">Advertising</p>
          <p>
            Advertising networks (such as Google AdSense) may process device identifiers and
            cookies to serve non-personalized or personalized advertisements in accordance with
            your consent preferences.
          </p>
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Data Storage &amp; Security
      </h2>

      <p className="mt-4 text-slate-300">
        We implement industry-standard technical and operational measures to protect data
        against unauthorized access, alteration, or disclosure.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Your Rights &amp; Privacy Inquiries
      </h2>

      <p className="mt-4 text-slate-300">
        You may request access to, correction of, or deletion of personal data you have
        submitted to us by contacting:{" "}
        <a href="mailto:privacy@matchsignal.pro" className="text-cyan-400 underline">
          privacy@matchsignal.pro
        </a>
      </p>

      <p className="mt-8 text-sm text-slate-400">
        Last updated: August 2026
      </p>
    </>
  );
}