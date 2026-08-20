import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { ABOUT_CONTENT } from "@/app/lib/aboutContent";
import type { Lang } from "@/app/lib/i18n";
import { localizedAlternates, SITE_URL } from "@/app/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const copy = ABOUT_CONTENT[lang];
  return { title: copy.metaTitle, description: copy.metaDescription, alternates: localizedAlternates(lang, "/about") };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const copy = ABOUT_CONTENT[lang];
  const jsonLd = { "@context": "https://schema.org", "@type": "AboutPage", name: copy.title, url: `${SITE_URL}/${lang}/about`, description: copy.metaDescription, isPartOf: { "@type": "WebSite", name: "MatchSignal", url: SITE_URL } };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#060B14] via-[#070D18] to-[#050A12] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <div className="mx-auto max-w-5xl space-y-10 px-4 pb-16 pt-28 md:px-6">
        <header>
          <div className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">{copy.eyebrow}</div>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">{copy.title}</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">{copy.intro}</p>
        </header>

        <section>
          <h2 className="text-2xl font-black">{copy.processTitle}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {copy.steps.map((step) => <article key={step.title} className="rounded-2xl border border-cyan-400/20 bg-[#0B1220] p-5"><h3 className="font-bold text-cyan-300">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{step.body}</p></article>)}
          </div>
        </section>

        <section className="rounded-2xl border border-amber-400/20 bg-amber-950/10 p-6">
          <h2 className="text-2xl font-black">{copy.limitsTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 ps-6 text-slate-300">{copy.limits.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="rounded-2xl border border-rose-400/20 bg-rose-950/10 p-6">
          <h2 className="text-xl font-black">{copy.responsibleTitle}</h2><p className="mt-3 text-sm leading-7 text-slate-300">{copy.responsibleBody}</p>
        </section>

        <nav aria-label={copy.legalLinksTitle} className="border-t border-slate-700 pt-6">
          <h2 className="text-lg font-black">{copy.legalLinksTitle}</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
            <Link className="rounded-lg border border-cyan-400/20 px-4 py-2 text-cyan-300" href={`/${lang}/legal/ai-disclaimer`}>{copy.aiLink}</Link>
            <Link className="rounded-lg border border-cyan-400/20 px-4 py-2 text-cyan-300" href={`/${lang}/legal/affiliate-disclosure`}>{copy.affiliateLink}</Link>
            <Link className="rounded-lg border border-cyan-400/20 px-4 py-2 text-cyan-300" href={`/${lang}/legal/responsible-gambling`}>{copy.responsibleLink}</Link>
            <Link className="rounded-lg border border-cyan-400/20 px-4 py-2 text-cyan-300" href={`/${lang}/contact`}>{copy.contactLink}</Link>
          </div>
        </nav>
      </div>
      <Footer />
    </main>
  );
}
