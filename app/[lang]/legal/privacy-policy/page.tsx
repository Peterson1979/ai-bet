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
        This Privacy Policy explains how MatchSignal collects, uses and protects
        information when you visit our website.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Information We Collect
      </h2>

      <ul className="mt-4 list-disc pl-6 space-y-2">
        <li>Email addresses submitted through newsletter subscriptions.</li>
        <li>Anonymous analytics information.</li>
        <li>Cookies and similar technologies.</li>
        <li>Technical information such as browser type and device information.</li>
      </ul>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Google Analytics
      </h2>

      <p className="mt-4">
        We use Google Analytics to understand website usage and improve our
        services. Google Analytics may collect anonymized information about
        your visit.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Google AdSense
      </h2>

      <p className="mt-4">
        We use Google AdSense to display advertisements. AdSense may use
        cookies and other technologies to provide personalized advertising.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Newsletter
      </h2>

      <p className="mt-4">
        If you subscribe to our newsletter, we may store your email address
        for communication related to MatchSignal.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Data Security
      </h2>

      <p className="mt-4">
        We take reasonable measures to protect information but cannot
        guarantee absolute security.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Contact
      </h2>

      <p className="mt-4">
        Operator: MatchSignal
        <br />
        Country: Hungary
        <br />
        Email: kicksignalhq@gmail.com
      </p>

      <p className="mt-8 text-sm text-slate-400">
        Last updated: June 2026
      </p>
    </>
  );
}