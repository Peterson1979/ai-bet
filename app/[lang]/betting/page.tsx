import Image from "next/image";
import { getSidebarSites } from "@/app/lib/affiliates";
import Header from "@/app/components/Header";
import SimpleFooter from "@/app/components/SimpleFooter";
import { translations, Lang, LANGS } from "@/app/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang] ?? translations.en;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.matchsignal.pro";

  const languages: Record<string, string> = {};
  LANGS.forEach((l) => {
    languages[l] = `${baseUrl}/${l}/betting`;
  });
  languages["x-default"] = `${baseUrl}/en/betting`;

  return {
    title: `${t.bettingPage.title} | MatchSignal`,
    description: t.bettingPage.description,
    alternates: {
      canonical: `${baseUrl}/${lang}/betting`,
      languages,
    },
  };
}

export default async function BettingPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const t = translations[lang] ?? translations.en;
  const countryCode = lang === "hu" ? "HU" : undefined;
  const sites = await Promise.resolve(getSidebarSites(countryCode));
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.matchsignal.pro";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.bettingPage.title,
    description: t.bettingPage.description,
    url: `${baseUrl}/${lang}/betting`,
  };

  return (
    <main className="min-h-screen bg-[#060B14] text-white">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pt-[70px]">
        <div className="mx-auto max-w-[1500px] px-4 md:px-6 pb-16">
          <div className="py-12">
            <h1 className="text-4xl font-black text-white md:text-5xl">
              {t.bettingPage.titleMainPrefix}{" "}
              <span className="text-cyan-400">{t.bettingPage.titleMainHighlight}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">{t.bettingPage.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3" id="top-betting-sites">
            {sites.map((site) => (
              <a
                key={site.id}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group relative block overflow-hidden rounded-[24px] border border-cyan-400/20 bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#070B14] p-6 shadow-[0_0_35px_rgba(56,189,248,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:shadow-[0_0_60px_rgba(56,189,248,0.18)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-200">
                    {t.bettingPage.partnerBadge ?? "Featured Partner"}
                  </span>
                </div>

                {/* Logo */}
                {site.logoUrl ? (
                  <div className="mb-4 flex items-center justify-center bg-slate-300 rounded-xl border border-slate-300/50 px-4 py-3 w-full max-w-[200px]">
                    <Image
                      src={site.logoUrl}
                      alt={site.name}
                      width={160}
                      height={36}
                      className="max-h-[36px] max-w-[160px] w-auto h-auto object-contain"
                    />
                  </div>
                ) : (
                  <h3 className="text-2xl font-black text-white mb-2">{site.name}</h3>
                )}

                {site.logoUrl && (
                  <h3 className="text-xl font-black text-white">{site.name}</h3>
                )}

                <p className="mt-2 text-lg font-semibold text-cyan-300">{site.bonus}</p>
                <p className="mt-3 text-sm text-slate-300">{t.bettingPage.siteDescription}</p>

                <div className="mt-6 flex items-center justify-between rounded-2xl border border-cyan-400/15 bg-[#060B14] p-4">
                  <div className="text-sm text-slate-300">{t.bettingPage.claimBonus}</div>
                  <div className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-cyan-300 transition-all group-hover:bg-cyan-400/20 group-hover:border-cyan-300/60">
                    {t.bettingPage.visitSite}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-yellow-400/20 bg-yellow-500/5 p-6">
            <p className="text-sm text-slate-300 leading-6">
              <strong className="text-yellow-300">{t.bettingPage.affiliateTitle}</strong>{" "}
              {t.bettingPage.affiliateText}
            </p>
          </div>
        </div>
        <SimpleFooter lang={lang} />
      </div>
    </main>
  );
}
