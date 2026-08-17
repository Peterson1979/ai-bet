import { redirect } from "next/navigation";
import type { Lang } from "@/app/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.matchsignal.pro";
  return {
    title: "AI Disclaimer | MatchSignal",
    description:
      "Artificial intelligence limitations, methodology, and informational disclaimer for MatchSignal sports analysis.",
    alternates: {
      canonical: `${baseUrl}/en/legal/ai-disclaimer`,
    },
  };
}

export default async function AIDisclaimerPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  if (lang !== "en") {
    redirect("/en/legal/ai-disclaimer");
  }
  return (
    <>
      <h1 className="text-4xl font-black text-white">AI Disclaimer</h1>

      <p className="mt-6">
        MatchSignal uses artificial intelligence algorithms and statistical models to
        generate sports analysis, probability estimations, and market value insights.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Website Operator
      </h2>

      <div className="mt-4 text-slate-300">
        <p>Forray Gyöngyi (Sole proprietor / individual entrepreneur)</p>
        <p>Address: 7633 Pécs, Esztergár Lajos utca 9/B, Hungary</p>
        <p>Hungarian Tax Number: 74264166-1-22</p>
        <p>Hungarian Sole Proprietor Registration Number: 57756666</p>
      </div>

      <h2 className="mt-8 text-2xl font-bold text-white">
        No Guarantee of Accuracy or Performance
      </h2>

      <p className="mt-4">
        AI-generated models operate on probabilistic calculations, public odds feeds,
        and statistical approximations. Outputs may contain anomalies, inaccuracies, or
        omissions. Machine-generated predictions must never be considered guaranteed outcomes.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Informational and Analytical Purposes Only
      </h2>

      <p className="mt-4">
        All AI-generated analysis is provided strictly for educational, informational,
        and entertainment purposes. It does not replace independent research or professional judgment.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        User Responsibility
      </h2>

      <p className="mt-4">
        Users bear complete and sole responsibility for any actions or decisions made
        based on the AI insights displayed on this website.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Contact Information
      </h2>

      <p className="mt-4 text-slate-300">
        For technical and legal inquiries regarding AI models:{" "}
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
