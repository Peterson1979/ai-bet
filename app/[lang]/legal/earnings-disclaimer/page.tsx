import { redirect } from "next/navigation";
import type { Lang } from "@/app/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.matchsignal.pro";
  return {
    title: "Earnings Disclaimer | MatchSignal",
    description:
      "Earnings and financial risk disclaimer for MatchSignal sports betting analysis and tools.",
    alternates: {
      canonical: `${baseUrl}/en/legal/earnings-disclaimer`,
    },
  };
}

export default async function EarningsDisclaimerPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  if (lang !== "en") {
    redirect("/en/legal/earnings-disclaimer");
  }
  return (
    <>
      <h1 className="text-4xl font-black text-white">Earnings Disclaimer</h1>

      <p className="mt-6">
        MatchSignal does not guarantee profits, winnings, or financial returns of any kind.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Commercial Operator Information
      </h2>

      <div className="mt-4 text-slate-300">
        <p className="font-bold text-white">Commercial &amp; Affiliate Activity Operator:</p>
        <p>Forray Gyöngyi (Sole proprietor / individual entrepreneur)</p>
        <p>Address: 7633 Pécs, Esztergár Lajos utca 9/B, Hungary</p>
        <p>Hungarian Tax Number: 74264166-1-22</p>
        <p>Hungarian Sole Proprietor Registration Number: 57756666</p>
      </div>

      <h2 className="mt-8 text-2xl font-bold text-white">
        No Guaranteed Results
      </h2>

      <p className="mt-4">
        Sports betting involves inherent financial risk. Historical statistical trends,
        past results, and AI-assisted probability estimates do not guarantee future outcomes.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Financial Risk &amp; Independent Decisions
      </h2>

      <p className="mt-4">
        Users may lose part or all of the funds wagered. All betting decisions are made
        independently and voluntarily by the user. Any betting activity is undertaken entirely
        at the user&apos;s own risk.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        No Financial or Investment Advice
      </h2>

      <p className="mt-4">
        Nothing published on MatchSignal constitutes financial, investment, legal, or professional
        gambling advice.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Contact Information
      </h2>

      <p className="mt-4 text-slate-300">
        Formal and legal inquiries:{" "}
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
