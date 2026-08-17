import { redirect } from "next/navigation";
import type { Lang } from "@/app/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.matchsignal.pro";
  return {
    title: "Privacy Policy | MatchSignal",
    description:
      "Privacy policy and data protection information for users of the MatchSignal sports betting analysis platform.",
    alternates: {
      canonical: `${baseUrl}/en/legal/privacy-policy`,
    },
  };
}

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
        Data Controller
      </h2>

      <div className="mt-4 text-slate-300">
        <p className="font-bold text-white">Data Controller (Website, Commercial &amp; Affiliate Activity):</p>
        <p>Forray Gyöngyi</p>
        <p>Legal status: Sole proprietor / individual entrepreneur</p>
        <p>Address: 7633 Pécs, Esztergár Lajos utca 9/B, Hungary</p>
        <p>Hungarian Tax Number: 74264166-1-22</p>
        <p>Hungarian Sole Proprietor Registration Number: 57756666</p>
        <p className="mt-2">
          Data Protection Contact:{" "}
          <a href="mailto:privacy@matchsignal.pro" className="text-cyan-400 underline">
            privacy@matchsignal.pro
          </a>
        </p>
      </div>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Information We Process
      </h2>

      <div className="mt-4 space-y-4 text-slate-300">
        <div>
          <p className="font-bold text-white">1. Strictly Necessary Data &amp; Preferences</p>
          <p className="mt-1">
            We store your chosen language and consent choices in local browser storage to respect your privacy preferences across sessions.
          </p>
        </div>

        <div>
          <p className="font-bold text-white">2. Contact Form Submissions</p>
          <p className="mt-1">
            When you send a message through our contact form, we collect your name, email address, and message solely to respond to your inquiry. We do not sell or share this information for commercial marketing.
          </p>
        </div>

        <div>
          <p className="font-bold text-white">3. Google Analytics 4 (Consent-Gated)</p>
          <p className="mt-1">
            With your explicit consent, we use Google Analytics 4 to collect aggregated, pseudonymous telemetry (such as page views, device type, and referring sources) with IP anonymization enabled. We implement Google Consent Mode v2 to ensure no analytics cookies or tracking storage are activated unless you grant permission.
          </p>
        </div>

        <div>
          <p className="font-bold text-white">4. Google AdSense (Consent-Gated)</p>
          <p className="mt-1">
            Advertising partners (including Google AdSense, publisher ID ca-pub-6847785471613763) may process device telemetry and cookies to serve contextual or personalized advertisements in accordance with your consent preferences.
          </p>
        </div>

        <div>
          <p className="font-bold text-white">5. Commercial Affiliate Links</p>
          <p className="mt-1">
            When you click outbound sportsbook links, referral tracking tokens may be appended to the destination URL by the respective affiliate network. MatchSignal does not transmit your personal details or account information to sportsbooks.
          </p>
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Legal Bases for Processing (GDPR)
      </h2>

      <ul className="mt-4 list-disc pl-6 space-y-2 text-slate-300">
        <li><strong>Consent (Art. 6(1)(a) GDPR):</strong> For Google Analytics 4 measurement and personalized advertising cookies.</li>
        <li><strong>Legitimate Interests (Art. 6(1)(f) GDPR):</strong> For platform security, technical operation, and essential communication.</li>
      </ul>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Data Storage, Retention &amp; Security
      </h2>

      <p className="mt-4 text-slate-300">
        We implement industry-standard technical and operational measures to protect data against unauthorized access, loss, or alteration. Inquiries submitted via the contact form are retained only for the duration necessary to resolve the inquiry.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-white">
        Your Rights &amp; Privacy Inquiries
      </h2>

      <p className="mt-4 text-slate-300">
        Under GDPR, you have the right to access, rectify, erase, or restrict processing of your personal data, and to withdraw consent at any time. For any data protection inquiries or to exercise your rights, please email:{" "}
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