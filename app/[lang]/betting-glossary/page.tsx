import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PartnerSportsbooksList from "@/app/components/PartnerSportsbooksList";
import { translations, Lang, LANGS } from "@/app/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang] ?? translations.en;
  const g = t.glossary;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.matchsignal.pro";

  const languages: Record<string, string> = {};
  LANGS.forEach((l) => {
    languages[l] = `${baseUrl}/${l}/betting-glossary`;
  });
  languages["x-default"] = `${baseUrl}/en/betting-glossary`;

  return {
    title: `${g.pageTitle} | MatchSignal`,
    description: g.pageSubtitle,
    alternates: {
      canonical: `${baseUrl}/${lang}/betting-glossary`,
      languages,
    },
  };
}

export default async function BettingGlossaryPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const t = translations[lang] ?? translations.en;
  const g = t.glossary;

  const markets = Object.values(
    g.markets as Record<string, { term: string; definition: string }>
  );

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#060B14] via-[#070D18] to-[#050A12]">
      <Header />

      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute top-[-140px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[130px]" />
        <div className="absolute bottom-[-140px] right-10 h-[500px] w-[500px] rounded-full bg-purple-500/15 blur-[130px]" />
      </div>

      <div className="pt-[100px] pb-20 relative z-10">
        <div className="mx-auto max-w-[1500px] px-4 md:px-6">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 items-start">

            {/* LEFT CONTENT */}
            <div>
              <div className="mb-12 text-center">
                <h1 className="text-4xl font-black tracking-tight text-white">
                  {g.pageTitle}
                </h1>
                <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto">
                  {g.pageSubtitle}
                </p>
                <div className="mt-4 h-[3px] w-48 mx-auto bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {markets.map((market) => (
                  <div
                    key={market.term}
                    className="rounded-[20px] border-2 border-cyan-300/20 bg-[#0B1220] p-5 hover:border-cyan-300/50 transition-all duration-200"
                  >
                    <h2 className="text-base font-black text-cyan-300 mb-2">
                      {market.term}
                    </h2>
                    <p className="text-sm text-slate-300 leading-6">
                      {market.definition}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-[20px] border-2 border-cyan-300/30 bg-gradient-to-r from-[#0B1220] to-[#0E1A2B] p-6">
                <h3 className="text-sm font-black text-cyan-300 uppercase tracking-wider mb-2">
                  {g.quickNote.title}
                </h3>
                <p className="text-sm text-slate-300 leading-6">
                  {g.quickNote.text}
                </p>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="h-fit xl:sticky xl:top-24">
              <PartnerSportsbooksList lang={lang} countryCode={lang === "hu" ? "HU" : undefined} variant="footer" />
            </aside>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-4 md:px-6">
        <Footer />
      </div>
    </main>
  );
}
