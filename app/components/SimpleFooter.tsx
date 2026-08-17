import { translations, Lang } from "@/app/lib/i18n";

type Props = {
  lang?: Lang;
};

export default function SimpleFooter({ lang = "en" }: Props) {
  const t = translations[lang] ?? translations.en;

  const links = [
    { href: `/${lang}/legal/privacy-policy`, label: t.footer.navPrivacy },
    { href: `/${lang}/legal/terms-of-use`, label: t.footer.navTerms },
    { href: `/${lang}/legal/affiliate-disclosure`, label: t.footer.navAffiliate },
    { href: `/${lang}/legal/responsible-gambling`, label: t.footer.navResponsible },
    { href: `/${lang}/legal/cookie-policy`, label: t.footer.navCookie },
  ];

  return (
    <footer className="mt-20 border-t border-[#1E293B] bg-[#060B14]">
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

          <div className="flex flex-wrap gap-5 text-sm text-slate-400">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition hover:text-cyan-300"
              >
                {l.label}
              </a>
            ))}
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