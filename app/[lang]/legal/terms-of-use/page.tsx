import { redirect } from "next/navigation";
import type { Lang } from "@/app/lib/i18n";

export default async function TermsOfUsePage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  if (lang !== "en") {
    redirect("/en/legal/terms-of-use");
  }
  return (
    <>
      <h1 className="text-4xl font-black text-white">Terms of Use</h1>

      <p className="mt-6">
        By accessing or using MatchSignal, you agree to be bound by these Terms of Use.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Website Operator
      </h2>

      <div className="mt-4 text-slate-300">
        <p className="font-bold text-white">Operator (Website, Commercial &amp; Affiliate Activity):</p>
        <p>Forray Gyöngyi</p>
        <p>Legal status: Sole proprietor (individual entrepreneur)</p>
        <p>Address: 7633 Pécs, Esztergár Lajos utca 9/B, Hungary</p>
        <p>Hungarian Tax Number: 74264166-1-22</p>
        <p>Hungarian Sole Proprietor Registration Number: 57756666</p>
      </div>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Informational Content Only
      </h2>

      <p className="mt-4">
        MatchSignal provides informational sports analysis, statistics,
        data comparisons and betting-related content for educational and
        entertainment purposes only.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        No Betting or Gambling Services
      </h2>

      <p className="mt-4">
        MatchSignal is not a bookmaker, betting platform, or gambling operator.
        We do not accept bets, facilitate gambling transactions, hold customer funds,
        or provide financial services.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        User Responsibility &amp; Jurisdictional Compliance
      </h2>

      <p className="mt-4">
        Users are solely responsible for ensuring that any betting or gambling activities
        they participate in comply with the laws and regulations of their jurisdiction.
        Any decisions made based on information found on MatchSignal are made entirely
        at the user&apos;s own risk.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Accuracy of Information
      </h2>

      <p className="mt-4">
        While we endeavor to provide accurate and timely information, we make no warranties
        or representations regarding the completeness, accuracy, or reliability of any data,
        odds, predictions, or analyses displayed on this website.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Limitation of Liability
      </h2>

      <p className="mt-4">
        MatchSignal, its operator, and contributors shall not be liable for any direct,
        indirect, incidental, consequential, or pecuniary losses arising from the use of
        or reliance on this website.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Contact Information
      </h2>

      <p className="mt-4 text-slate-300">
        Legal and formal inquiries:{" "}
        <a href="mailto:legal@matchsignal.pro" className="text-cyan-400 underline">
          legal@matchsignal.pro
        </a>
        <br />
        General inquiries:{" "}
        <a href="mailto:contact@matchsignal.pro" className="text-cyan-400 underline">
          contact@matchsignal.pro
        </a>
      </p>

      <p className="mt-8 text-sm text-slate-400">
        Last updated: August 2026
      </p>
    </>
  );
}