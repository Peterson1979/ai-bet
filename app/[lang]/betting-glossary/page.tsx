import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { translations, Lang } from "@/app/lib/i18n";

export default async function BettingGlossaryPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const t = translations[lang] ?? translations.en;
  const g = t.glossary;
  const markets = Object.values(g.markets as Record<string, { term: string; definition: string }>);

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#060B14] via-[#070D18] to-[#050A12]">
      <Header />

      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute top-[-140px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[130px]" />
        <div className="absolute bottom-[-140px] right-10 h-[500px] w-[500px] rounded-full bg-purple-500/15 blur-[130px]" />
      </div>

      <div className="pt-[100px] pb-20 relative z-10">
        <div className="mx-auto max-w-[860px] px-4 md:px-6">

          {/* PAGE HEADER */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-black tracking-tight text-white">
              {g.pageTitle}
            </h1>
            <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto">
              {g.pageSubtitle}
            </p>
            <div className="mt-4 h-[3px] w-48 mx-auto bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
          </div>

          {/* GLOSSARY CARDS */}
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

          {/* QUICK NOTE */}
          <div className="mt-10 rounded-[20px] border-2 border-cyan-300/30 bg-gradient-to-r from-[#0B1220] to-[#0E1A2B] p-6">
            <h3 className="text-sm font-black text-cyan-300 uppercase tracking-wider mb-2">
              {g.quickNote.title}
            </h3>
            <p className="text-sm text-slate-300 leading-6">
              {g.quickNote.text}
            </p>
          </div>

        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-4 md:px-6">
        <Footer />
      </div>
    </main>
  );
}