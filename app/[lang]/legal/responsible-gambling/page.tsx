import { redirect } from "next/navigation";
import type { Lang } from "@/app/lib/i18n";

export default async function ResponsibleGamblingPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  if (lang !== "en") {
    redirect("/en/legal/responsible-gambling");
  }
  return (
    <>
      <h1 className="text-4xl font-black text-white">
        Responsible Gambling
      </h1>

      <p className="mt-6">
        MatchSignal is committed to supporting responsible gambling practices.
      </p>

      <p className="mt-4">
        Sports betting should be approached strictly as a form of leisure and entertainment,
        never as a financial plan, employment alternative, or method to recover debt.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Key Guidelines for Safe Play
      </h2>

      <ul className="mt-4 list-disc pl-6 space-y-2 text-slate-300">
        <li>Wager only funds you can comfortably afford to lose.</li>
        <li>Set strict time and monetary budgets before placing bets.</li>
        <li>Never chase losses or increase stakes impulsively.</li>
        <li>Take regular, scheduled breaks from gambling activities.</li>
        <li>Never gamble under the influence of alcohol, drugs, or emotional stress.</li>
        <li>Recognize that no system, model, or AI prediction guarantees a winning bet.</li>
      </ul>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Age Restrictions (18+)
      </h2>

      <p className="mt-4">
        MatchSignal is intended exclusively for adults aged 18 and older, or the applicable legal
        gambling age in your jurisdiction. Underage gambling is strictly prohibited by law.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Independent Support &amp; Assistance
      </h2>

      <p className="mt-4">
        MatchSignal is not a gambling operator, bookmaker, or mental health treatment provider.
        If gambling is impacting your personal life, health, or finances, we strongly encourage
        seeking immediate, confidential support from recognized international and local organizations
        such as Gamblers Anonymous, GamCare, Gambling Therapy, or your national helpline services.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Contact Information
      </h2>

      <p className="mt-4 text-slate-300">
        For user support and responsible gambling inquiries:{" "}
        <a href="mailto:support@matchsignal.pro" className="text-cyan-400 underline">
          support@matchsignal.pro
        </a>
      </p>

      <p className="mt-8 text-sm text-slate-400">
        Last updated: August 2026
      </p>
    </>
  );
}