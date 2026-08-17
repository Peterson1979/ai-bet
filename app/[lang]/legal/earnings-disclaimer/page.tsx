import { redirect } from "next/navigation";
import type { Lang } from "@/app/lib/i18n";

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
<> <h1 className="text-4xl font-black text-white">
Earnings Disclaimer </h1>

```
  <p className="mt-6">
    MatchSignal does not guarantee profits, winnings or financial success.
  </p>

  <h2 className="mt-8 text-2xl font-bold text-white">
    No Guaranteed Results
  </h2>

  <p className="mt-4">
    Sports betting involves risk. Past performance, historical statistics
    or AI predictions are not guarantees of future outcomes.
  </p>

  <h2 className="mt-8 text-2xl font-bold text-white">
    Financial Risk
  </h2>

  <p className="mt-4">
    Users may lose some or all money wagered. Any betting activity is
    undertaken entirely at the user&apos;s own risk.
  </p>

  <h2 className="mt-8 text-2xl font-bold text-white">
    Independent Decisions
  </h2>

  <p className="mt-4">
    All betting decisions are made independently by users. MatchSignal is not
    responsible for losses resulting from reliance on website content.
  </p>

  <h2 className="mt-8 text-2xl font-bold text-white">
    No Financial Advice
  </h2>

  <p className="mt-4">
    Nothing on this website constitutes investment, financial or legal
    advice.
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
