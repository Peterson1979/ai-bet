import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {
  GUIDE_CATEGORIES,
  GUIDE_LOCALES,
  isGuideLocale,
  type GuideCategoryId,
} from "@/app/lib/guides";
import {
  getPublishedGuides,
  hasPublicGuideContent,
} from "@/app/lib/guideRegistry";
import { estimateReadingTime } from "@/app/lib/guideContent";
import { GUIDE_PAGE_COPY } from "@/app/lib/localizedUiCopy";

const baseUrl = "https://www.matchsignal.pro";

function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(
      GUIDE_LOCALES.map((locale) => [locale, `${baseUrl}/${locale}${path}`])
    ),
    "x-default": `${baseUrl}/en${path}`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!isGuideLocale(lang) || !hasPublicGuideContent(lang)) {
    return {
      title: "Betting Guides",
      robots: { index: false, follow: false },
    };
  }

  const copy = GUIDE_PAGE_COPY[lang];
  const canonical = `${baseUrl}/${lang}/guides`;

  return {
    title: copy.pageTitle,
    description: copy.pageDescription,
    alternates: {
      canonical,
      languages: languageAlternates("/guides"),
    },
    openGraph: {
      title: `${copy.pageTitle} | MatchSignal`,
      description: copy.pageDescription,
      url: canonical,
      type: "website",
    },
  };
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isGuideLocale(lang)) notFound();

  const guides = getPublishedGuides(lang);
  if (guides.length === 0) notFound();

  const copy = GUIDE_PAGE_COPY[lang];
  const grouped = guides.reduce(
    (acc, guide) => {
      (acc[guide.category] ??= []).push(guide);
      return acc;
    },
    {} as Partial<Record<GuideCategoryId, typeof guides>>
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060B14] px-4 pb-20 pt-28 text-white md:px-6">
        <section className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
              {copy.educationLabel}
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
              {copy.pageTitle}
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
              {copy.pageIntro}
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {Object.entries(GUIDE_CATEGORIES).map(([categoryId]) => {
              const categoryGuides = grouped[categoryId as GuideCategoryId];
              if (!categoryGuides?.length) return null;
              const categoryLabel =
                copy.categories[categoryId as GuideCategoryId] ??
                GUIDE_CATEGORIES[categoryId as GuideCategoryId];

              return (
                <section key={categoryId} aria-labelledby={`category-${categoryId}`}>
                  <h2
                    id={`category-${categoryId}`}
                    className="text-2xl font-black text-white md:text-3xl"
                  >
                    {categoryLabel}
                  </h2>

                  <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {categoryGuides.map((guide) => (
                      <article
                        key={guide.slug}
                        className="flex h-full flex-col rounded-2xl border border-cyan-400/15 bg-[#0B1220] p-6"
                      >
                        <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                          {categoryLabel}
                        </p>
                        <h3 className="mt-3 text-xl font-black leading-snug">
                          <Link
                            href={`/${lang}/guides/${guide.slug}`}
                            className="hover:text-cyan-300"
                          >
                            {guide.title}
                          </Link>
                        </h3>
                        <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">
                          {guide.description}
                        </p>
                        <div className="mt-5 flex items-center justify-between gap-4 text-xs text-slate-400">
                          <span>{estimateReadingTime(guide)} {copy.minRead}</span>
                          <Link
                            href={`/${lang}/guides/${guide.slug}`}
                            className="font-bold text-cyan-300 hover:text-cyan-200"
                          >
                            {copy.readGuide}
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
