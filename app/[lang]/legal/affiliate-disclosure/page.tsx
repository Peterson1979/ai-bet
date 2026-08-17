import { redirect } from "next/navigation";
import type { Lang } from "@/app/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.matchsignal.pro";
  return {
    title: "Affiliate Disclosure | MatchSignal",
    description:
      "Commercial affiliate disclosure and advertising transparency for MatchSignal.",
    alternates: {
      canonical: `${baseUrl}/en/legal/affiliate-disclosure`,
    },
  };
}

export default async function AffiliateDisclosurePage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  if (lang !== "en") {
    redirect("/en/legal/affiliate-disclosure");
  }
  return (
    <>
      <h1 className="text-4xl font-black text-white">Affiliate Disclosure</h1>

      <p className="mt-6">
        MatchSignal participates in affiliate marketing programs.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Commercial Operator Information
      </h2>

      <div className="mt-4 text-slate-300">
        <p className="font-bold text-white">Commercial &amp; Affiliate Activity Operator:</p>
        <p>Forray Gyöngyi</p>
        <p>Legal status: Sole proprietor (individual entrepreneur)</p>
        <p>Address: 7633 Pécs, Esztergár Lajos utca 9/B, Hungary</p>
        <p>Hungarian Tax Number: 74264166-1-22</p>
        <p>Hungarian Sole Proprietor Registration Number: 57756666</p>
      </div>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Affiliate Relationships &amp; Compensation
      </h2>

      <p className="mt-4">
        Some outbound links on this website are affiliate tracking links. If you click on
        an affiliate link and subsequently register, deposit, or place bets with a partner
        sportsbook, we may receive compensation or commission at no extra cost to you.
      </p>

      <p className="mt-4">
        Our editorial analysis, algorithmic probability modeling, fair odds calculations,
        and value bet detections are generated independently from our commercial relationships.
        Affiliate compensation does not determine or distort mathematical model outputs.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Third-Party Services &amp; User Responsibility
      </h2>

      <p className="mt-4">
        MatchSignal does not operate sportsbooks, betting platforms, or payment gateways.
        Any transactions occur exclusively between users and the respective third-party operators.
        Users are responsible for reviewing third-party terms and verifying legal eligibility in
        their local jurisdiction.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Contact Information
      </h2>

      <p className="mt-4 text-slate-300">
        For commercial, affiliate, or legal inquiries:{" "}
        <a href="mailto:legal@matchsignal.pro" className="text-cyan-400 underline">
          legal@matchsignal.pro
        </a>
      </p>

      <p className="mt-8 text-sm text-slate-400">
        Last updated: August 2026
      </p>
    </>
  );
}