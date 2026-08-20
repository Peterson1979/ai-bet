import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {
  GUIDE_CATEGORIES,
  GUIDE_LOCALES,
  getPublishedGuideManifest,
  isGuideLocale,
} from "@/app/lib/guides";
import {
  getPublishedGuide,
  getPublishedGuides,
} from "@/app/lib/guideRegistry";
import { estimateReadingTime } from "@/app/lib/guideContent";
import { GUIDE_PAGE_COPY } from "@/app/lib/localizedUiCopy";

const baseUrl = "https://www.matchsignal.pro";

function languageAlternates(slug: string): Record<string, string> {
  return {
    ...Object.fromEntries(
      GUIDE_LOCALES.map((locale) => [
        locale,
        `${baseUrl}/${locale}/guides/${slug}`,
      ])
    ),
    "x-default": `${baseUrl}/en/guides/${slug}`,
  };
}

export function generateStaticParams() {
  return GUIDE_LOCALES.flatMap((lang) =>
    getPublishedGuideManifest().map((guide) => ({ lang, slug: guide.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isGuideLocale(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const guide = getPublishedGuide(slug, lang);
  if (!guide) {
    return { robots: { index: false, follow: false } };
  }

  const canonical = `${baseUrl}/${lang}/guides/${guide.slug}`;

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical,
      languages: languageAlternates(guide.slug),
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: canonical,
      type: "article",
    },
  };
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isGuideLocale(lang)) notFound();

  const guide = getPublishedGuide(slug, lang);
  if (!guide) notFound();

  const copy = GUIDE_PAGE_COPY[lang];
  const categoryLabel =
    copy.categories[guide.category] ?? GUIDE_CATEGORIES[guide.category];
  const readingTime = estimateReadingTime(guide);
  const related = getPublishedGuides(lang).filter((item) =>
    (guide.relatedGuides ?? []).includes(item.slug)
  );

  const canonical = `${baseUrl}/${lang}/guides/${guide.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    inLanguage: lang,
    mainEntityOfPage: canonical,
    author: {
      "@type": "Organization",
      name: "MatchSignal Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "MatchSignal",
      url: baseUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: copy.home,
        item: `${baseUrl}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: copy.pageTitle,
        item: `${baseUrl}/${lang}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060B14] px-4 pb-20 pt-28 text-white md:px-6">
        <article className="mx-auto max-w-3xl">
          <nav className="text-sm text-slate-400" aria-label="Breadcrumb">
            <Link href={`/${lang}`} className="hover:text-cyan-300">
              {copy.home}
            </Link>
            <span className="px-2">/</span>
            <Link href={`/${lang}/guides`} className="hover:text-cyan-300">
              {copy.pageTitle}
            </Link>
          </nav>

          <header className="mt-8 border-b border-white/10 pb-8">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">
              {categoryLabel}
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight md:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              {guide.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
              <span>{readingTime} {copy.minRead}</span>
              {guide.updatedAt && <span>{copy.updated} {guide.updatedAt}</span>}
              <span>{copy.editorialTeam}</span>
            </div>
          </header>

          {guide.keyTakeaways?.length ? (
            <aside className="my-8 rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6">
              <h2 className="text-lg font-black text-cyan-300">{copy.keyTakeaways}</h2>
              <ul className="mt-4 space-y-3 text-base leading-7 text-slate-200">
                {guide.keyTakeaways.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="text-cyan-400">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          <p className="my-8 text-lg leading-8 text-slate-200">{guide.intro}</p>

          <div className="space-y-10">
            {guide.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-2xl font-black leading-tight md:text-3xl">
                  {section.heading}
                </h2>

                <div className="mt-4 space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-8 text-slate-300 md:text-[17px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets?.length ? (
                  <ul className="mt-5 space-y-3 pl-5 text-base leading-8 text-slate-300">
                    {section.bullets.map((item) => (
                      <li key={item} className="list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.callout ? (
                  <aside className="mt-6 rounded-2xl border border-white/10 bg-[#0B1220] p-5">
                    <h3 className="font-black text-cyan-300">
                      {section.callout.title}
                    </h3>
                    <p className="mt-2 leading-7 text-slate-300">
                      {section.callout.body}
                    </p>
                  </aside>
                ) : null}
              </section>
            ))}
          </div>

          {guide.responsibleGamblingNote ? (
            <aside className="mt-10 rounded-2xl border border-amber-400/20 bg-amber-500/5 p-6">
              <h2 className="text-lg font-black text-amber-200">
                {copy.responsibleBetting}
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                {guide.responsibleGamblingNote}
              </p>
              <Link
                href={`/${lang}/legal/responsible-gambling`}
                className="mt-4 inline-block font-bold text-cyan-300 hover:text-cyan-200"
              >
                {copy.responsibleLink}
              </Link>
            </aside>
          ) : null}

          {related.length ? (
            <section className="mt-12 border-t border-white/10 pt-8">
              <h2 className="text-2xl font-black">{copy.relatedGuides}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${lang}/guides/${item.slug}`}
                    className="rounded-xl border border-cyan-400/15 bg-[#0B1220] p-4 font-bold hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-12 rounded-2xl border border-cyan-400/20 bg-[#0B1220] p-6">
            <h2 className="text-xl font-black">{copy.exploreTitle}</h2>
            <p className="mt-3 leading-7 text-slate-300">
              {copy.exploreText}
            </p>
            <Link
              href={`/${lang}`}
              className="mt-5 inline-flex rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 font-bold text-cyan-200 hover:bg-cyan-500/20"
            >
              {copy.viewAnalysis}
            </Link>
          </section>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
