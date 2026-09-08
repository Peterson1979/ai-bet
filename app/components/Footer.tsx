"use client";

import { GUIDES_LABEL, PRIVACY_COPY } from "@/app/lib/localizedUiCopy";
import Link from "next/link";
import { useParams } from "next/navigation";
import { translations, Lang } from "@/app/lib/i18n";
import { triggerReopenConsent } from "@/app/lib/consent";
import { LEGAL_NAV_COPY } from "@/app/lib/legalNavCopy";

export default function Footer() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "en";
  const t = translations[lang] ?? translations.en;
  const privacyCopy = PRIVACY_COPY[lang] ?? PRIVACY_COPY.en;
  const legalCopy = LEGAL_NAV_COPY[lang];

  const fieldKeys = [
    "prediction",
    "market",
    "bestTrackedOdds",
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
    { href: `/${lang}/tools`, label: t.system.navTools },
    { href: `/${lang}/betting-glossary`, label: t.system.navGlossary },
    { href: `/${lang}/contact`, label: t.footer.navContact },
    { href: `/${lang}/legal/privacy-policy`, label: t.footer.navPrivacy },
    { href: `/${lang}/legal/terms-of-use`, label: t.footer.navTerms },
    { href: `/${lang}/legal/affiliate-disclosure`, label: t.footer.navAffiliate },
    { href: `/${lang}/legal/responsible-gambling`, label: t.footer.navResponsible },
    { href: `/${lang}/legal/cookie-policy`, label: t.footer.navCookie },
    { href: `/${lang}/legal/ai-disclaimer`, label: legalCopy.ai },
    { href: `/${lang}/legal/earnings-disclaimer`, label: legalCopy.earnings },
    { href: `/${lang}/legal/legal-notice`, label: legalCopy.notice },
  ];

  return (
    <footer className="mt-20 border-t border-[#1E293B] bg-[#060B14]">
      <div className="border-b border-[#1E293B]">
        <div className="mx-auto max-w-[1500px] px-4 py-12 md:px-6">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-white">
              {t.footer.betIntelligence}
            </h3>

            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-300">
              {t.footer.betIntelligenceDesc}
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg md:text-xl font-black text-cyan-300">
              {t.footer.matchCardGuideTitle}
            </h4>

            <p className="mt-1.5 max-w-4xl text-xs md:text-sm leading-6 text-slate-400">
              {t.footer.matchCardGuideDesc}
            </p>
          </div>

          {/* SINGLE AUTHORITATIVE RESPONSIVE GRID (REMOVES PREVIOUS MOBILE/DESKTOP DOM DUPLICATION) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {fieldKeys.map((key) => {
              const item = t.footer.matchCardFields[key];

              return (
                <div
                  key={key}
                  className="rounded-2xl border border-cyan-400/15 bg-[#0B1220] p-4 flex flex-col justify-start"
                >
                  <h5 className="font-bold text-xs text-cyan-200 uppercase tracking-wider">
                    {item.title}
                  </h5>

                  <p className="mt-1.5 text-xs leading-5 text-slate-300">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-4 py-8 md:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h4 className="text-base font-black text-white">
              {t.footer.aiBettingInsights}
            </h4>

            <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-400">
              {t.footer.aiBettingInsightsDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
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
              className="transition hover:text-cyan-300 cursor-pointer text-xs text-slate-400"
            >{privacyCopy.cookieSettings}</button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-[#1E293B] pt-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} {t.footer.platformName}
          </p>

          <div className="text-[11px] text-slate-500">
            {t.footer.builtWithAi}
          </div>
        </div>
      </div>
    </footer>
  );
}
