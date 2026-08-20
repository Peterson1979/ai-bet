"use client";

import { GUIDES_LABEL, PRIVACY_COPY } from "@/app/lib/localizedUiCopy";
import Link from "next/link";
import { useParams } from "next/navigation";
import { translations, Lang } from "@/app/lib/i18n";
import { triggerReopenConsent } from "@/app/lib/consent";

export default function Footer() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "en";
  const t = translations[lang] ?? translations.en;
  const privacyCopy = PRIVACY_COPY[lang] ?? PRIVACY_COPY.en;

  const fieldKeys = [
    "prediction",
    "market",
    "bestPartnerOdds",
    "sportsbook",
    "estimatedValue",
    "marketAverage",
    "fairProbability",
    "bookmakersTracked",
    "riskTier",
    "aiAnalysis",
  ] as const;

  const navLinks = [
    { href: `/${lang}/about`, label: t.footer.navAbout },
    { href: `/${lang}/guides`, label: GUIDES_LABEL[lang] ?? GUIDES_LABEL.en },
    { href: `/${lang}/contact`, label: t.footer.navContact },
    { href: `/${lang}/legal/privacy-policy`, label: t.footer.navPrivacy },
    { href: `/${lang}/legal/terms-of-use`, label: t.footer.navTerms },
    { href: `/${lang}/legal/affiliate-disclosure`, label: t.footer.navAffiliate },
    { href: `/${lang}/legal/responsible-gambling`, label: t.footer.navResponsible },
    { href: `/${lang}/legal/cookie-policy`, label: t.footer.navCookie },
  ];

  return (
    <footer className="mt-20 border-t border-[#1E293B] bg-[#060B14]">
      <div className="border-b border-[#1E293B]">
        <div className="mx-auto max-w-[1500px] px-4 py-14 md:px-6">
          <div className="mb-10">
            <h3 className="text-3xl font-black text-white">
              {t.footer.betIntelligence}
            </h3>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
              {t.footer.betIntelligenceDesc}
            </p>
          </div>

          <div className="mb-8">
            <h4 className="text-2xl font-black text-white">
              {t.footer.matchCardGuideTitle}
            </h4>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
              {t.footer.matchCardGuideDesc}
            </p>
          </div>

          <div className="space-y-3 md:hidden">
            {fieldKeys.map((key) => {
              const item = t.footer.matchCardFields[key];

              return (
                <details
                  key={key}
                  className="group rounded-2xl border border-cyan-400/20 bg-[#0F172A]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 font-black text-cyan-300">
                    <span>{item.title}</span>
                    <span
                      aria-hidden="true"
                      className="text-slate-400 transition group-open:rotate-180"
                    >
                      ⌄
                    </span>
                  </summary>

                  <div className="px-4 pb-4">
                    <p className="text-sm leading-6 text-slate-300">
                      {item.desc}
                    </p>
                  </div>
                </details>
              );
            })}
          </div>

          <div className="hidden gap-5 md:grid md:grid-cols-2">
            {fieldKeys.map((key) => {
              const item = t.footer.matchCardFields[key];

              return (
                <div
                  key={key}
                  className="rounded-2xl border border-cyan-400/20 bg-[#0F172A] p-5"
                >
                  <h5 className="font-black text-cyan-300">
                    {item.title}
                  </h5>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-4 py-10 md:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h4 className="text-lg font-black text-white">
              {t.footer.aiBettingInsights}
            </h4>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              {t.footer.aiBettingInsightsDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-cyan-300"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => triggerReopenConsent()}
              className="transition hover:text-cyan-300 cursor-pointer text-sm text-slate-400"
            >{privacyCopy.cookieSettings}</button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[#1E293B] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] text-slate-500">
            © {new Date().getFullYear()} {t.footer.platformName}
          </p>

          <div className="text-[12px] text-slate-500">
            {t.footer.builtWithAi}
          </div>
        </div>
      </div>
    </footer>
  );
}