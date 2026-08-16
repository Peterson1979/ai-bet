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
        By using MatchSignal, you agree to these Terms of Use.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Informational Content Only
      </h2>

      <p className="mt-4">
        MatchSignal provides informational sports analysis, statistics,
        predictions and betting-related content for educational and
        entertainment purposes only.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        No Betting Services
      </h2>

      <p className="mt-4">
        MatchSignal does not accept bets, process gambling transactions,
        hold player funds or operate as a sportsbook.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        User Responsibility
      </h2>

      <p className="mt-4">
        Any decisions made based on information provided on this website
        are entirely the responsibility of the user.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Accuracy of Information
      </h2>

      <p className="mt-4">
        We strive to provide accurate information but do not guarantee
        completeness, reliability or accuracy.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Limitation of Liability
      </h2>

      <p className="mt-4">
        MatchSignal shall not be liable for any losses, damages or costs arising
        from the use of this website.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Contact
      </h2>

      <p className="mt-4">
        kicksignalhq@gmail.com
      </p>

      <p className="mt-8 text-sm text-slate-400">
        Last updated: June 2026
      </p>
    </>
  );
}