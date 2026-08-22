import Image from "next/image";
import Header from "@/app/components/Header";
import SimpleFooter from "@/app/components/SimpleFooter";
import { getSidebarSites } from "@/app/lib/affiliates";
import { BETTING_CONTENT } from "@/app/lib/bettingContent";
import type { Lang } from "@/app/lib/i18n";
import { localizedAlternates, SITE_URL } from "@/app/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const copy = BETTING_CONTENT[lang];
  return { title: copy.metaTitle, description: copy.metaDescription, alternates: localizedAlternates(lang, "/betting") };
}

export default async function BettingPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const copy = BETTING_CONTENT[lang];
  const countryCode = lang === "hu" ? "HU" : undefined;
  const sites = getSidebarSites(countryCode);
  const jsonLd = { "@context": "https://schema.org", "@type": "WebPage", name: copy.metaTitle, description: copy.metaDescription, url: `${SITE_URL}/${lang}/betting` };

  return (
    <main className="min-h-screen bg-[#060B14] text-white">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-[1300px] px-4 pb-16 pt-28 md:px-6">
        <header><h1 className="text-4xl font-black md:text-5xl">{copy.title}</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{copy.intro}</p></header>

        <p className="mt-8 max-w-4xl text-sm leading-7 text-slate-300">{copy.shortIntro}</p>

        <section className="mt-8 scroll-mt-28" id="sportsbook-offers">
          <h2 className="mb-6 text-2xl font-black">{copy.directoryTitle}</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sites.map((site) => (
              <article key={site.id} className="rounded-[24px] border border-cyan-400/20 bg-gradient-to-b from-[#0B1220] to-[#070B14] p-6">
                <span className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-200">{copy.partnerBadge}</span>
                {site.logoUrl ? <div className="mt-5 flex max-w-[200px] items-center justify-center rounded-xl bg-slate-300 px-4 py-3"><Image src={site.logoUrl} alt={site.name} width={160} height={36} className="max-h-[36px] w-auto object-contain" /></div> : null}
                <h3 className="mt-4 text-xl font-black">{site.name}</h3>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">{copy.offerLabel}</p>
                <p className="mt-1 text-lg font-semibold text-cyan-300">{site.bonus}</p>
                <a href={site.url} target="_blank" rel="noopener noreferrer sponsored" className="mt-6 inline-flex rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 text-sm font-bold text-cyan-200">{copy.visitLabel}</a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-cyan-400/20 bg-[#0B1220] p-6 md:p-8">
          <h2 className="text-2xl font-black">{copy.compareTitle}</h2>
          <ul className="mt-5 grid list-disc gap-3 ps-6 text-slate-300 md:grid-cols-2">{copy.compareItems.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <section className="rounded-2xl border border-cyan-400/20 bg-[#0B1220] p-6"><h2 className="text-xl font-black">{copy.linksTitle}</h2><p className="mt-3 text-sm leading-7 text-slate-300">{copy.linksBody}</p></section>
          <section className="rounded-2xl border border-cyan-400/20 bg-[#0B1220] p-6"><h2 className="text-xl font-black">{copy.notVerifyTitle}</h2><p className="mt-3 text-sm leading-7 text-slate-300">{copy.notVerifyBody}</p></section>
          <section className="rounded-2xl border border-cyan-400/20 bg-[#0B1220] p-6"><h2 className="text-xl font-black">{copy.offersTitle}</h2><p className="mt-3 text-sm leading-7 text-slate-300">{copy.offersBody}</p></section>
        </div>

        <aside className="mt-8 rounded-2xl border border-yellow-400/30 bg-yellow-500/5 p-6">
          <h2 className="font-black text-yellow-300">{copy.disclosureTitle}</h2><p className="mt-2 text-sm leading-6 text-slate-300">{copy.disclosureBody}</p>
        </aside>

      </div>
      <SimpleFooter lang={lang} />
    </main>
  );
}
