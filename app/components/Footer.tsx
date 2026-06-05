"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { translations, Lang } from "@/app/lib/i18n";

export default function Footer() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "en";

  const t = translations[lang] ?? translations.en;

  const valueBetTypes = [
    { label: t.footer.valueBet, color: "emerald-300", emoji: "🟢", desc: t.footer.valueBetDesc },
    { label: t.footer.okBet, color: "yellow-300", emoji: "🟡", desc: t.footer.okBetDesc },
    { label: t.footer.riskyBet, color: "red-300", emoji: "🔴", desc: t.footer.riskyBetDesc },
    { label: t.footer.aiEvScore, color: "cyan-300", emoji: "✔️", desc: t.footer.aiEvScoreDesc },
  ];

  const metrics = [
    { label: t.footer.aiEdge, desc: t.footer.aiEdgeDesc },
    { label: t.footer.confidence, desc: t.footer.confidenceDesc },
    { label: t.footer.impliedProb, desc: t.footer.impliedProbDesc },
    { label: t.footer.risk, desc: t.footer.riskDesc },
  ];

  const navLinks = [
    { href: "/about", label: t.footer.navAbout },
    { href: "/contact", label: t.footer.navContact },
    { href: "/legal/privacy-policy", label: t.footer.navPrivacy },
    { href: "/legal/terms-of-use", label: t.footer.navTerms },
    { href: "/legal/affiliate-disclosure", label: t.footer.navAffiliate },
    { href: "/legal/responsible-gambling", label: t.footer.navResponsible },
    { href: "/legal/cookie-policy", label: t.footer.navCookie },
  ];

  return (
    <footer className="mt-20 border-t border-[#1E293B] bg-[#060B14]">

      {/* BETTING INTELLIGENCE */}
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

          {/* VALUE BET TYPES */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 mb-8">
            {valueBetTypes.map((type) => (
              <div key={type.label} className={`rounded-2xl border border-${type.color}/20 bg-[#0F172A] p-5`}>
                <h4 className={`font-black text-${type.color}`}>
                  {type.emoji} {type.label}
                </h4>
                <p className="mt-3 text-sm text-slate-300 leading-6">
                  {type.desc}
                </p>
              </div>
            ))}
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-cyan-400/10 bg-[#0F172A] p-5">
                <h4 className="text-sm font-black text-cyan-300">{metric.label}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-300">{metric.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* BOTTOM SECTION */}
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

          {/* NAVIGATION LINKS */}
          <div className="flex flex-wrap gap-5 text-sm text-slate-400">
            {navLinks.map((link) => {
              const isInternal = link.href.startsWith("/");
              if (isInternal) {
                return (
                  <Link
                    key={link.href}
                    href={`/${lang}${link.href}`}
                    className="transition hover:text-cyan-300"
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-cyan-300"
                >
                  {link.label}
                </a>
              );
            })}
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