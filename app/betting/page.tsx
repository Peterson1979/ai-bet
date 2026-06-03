// app/betting/page.tsx
import { getSidebarSites } from "@/app/lib/affiliates";
import Header from "@/app/components/Header";
import SimpleFooter from "@/app/components/SimpleFooter";

export default function BettingPage() {
  const sites = getSidebarSites();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Betting Predictions",
    description: "AI-powered betting predictions for multiple sports",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/betting`,
  };

  return (
    <main className="min-h-screen bg-[#060B14] text-white">
      <Header />

      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="pt-[70px]">
        <div className="mx-auto max-w-[1500px] px-4 md:px-6 pb-16">

          {/* PAGE HEADER */}
          <div className="py-12">
            <h1 className="text-4xl font-black text-white md:text-5xl">
              Top <span className="text-cyan-400">Betting Sites</span>
            </h1>

            <p className="mt-4 max-w-2xl text-slate-300">
              Handpicked sportsbooks with the best bonuses, competitive odds and reliable payouts.
              All sites are licensed and regulated.
            </p>
          </div>

          {/* SITES GRID */}
          <div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
            id="top-betting-sites"
          >
            {sites.map((site, index) => (
              <a
                key={site.id}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group relative block overflow-hidden rounded-[24px] border border-cyan-400/20 bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#070B14] p-6 shadow-[0_0_35px_rgba(56,189,248,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:shadow-[0_0_60px_rgba(56,189,248,0.18)]"
              >
                {/* Rank badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-200">
                    #{index + 1} Recommended
                  </span>

                  <span className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-sm font-black text-emerald-300">
                    {site.rating}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white">{site.name}</h3>
                <p className="mt-2 text-lg font-semibold text-cyan-300">
                  {site.bonus}
                </p>

                <p className="mt-3 text-sm text-slate-300">
                  Trusted sportsbook with competitive odds, fast payouts and excellent customer support.
                </p>

                <div className="mt-6 flex items-center justify-between rounded-2xl border border-cyan-400/15 bg-[#060B14] p-4">
                  <div className="text-sm text-slate-300">Claim bonus offer</div>

                  <div className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-cyan-300 transition-all group-hover:bg-cyan-400/20 group-hover:border-cyan-300/60">
                    Visit Site →
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* DISCLAIMER */}
          <div className="mt-12 rounded-2xl border border-yellow-400/20 bg-yellow-500/5 p-6">
            <p className="text-sm text-slate-300 leading-6">
              <strong className="text-yellow-300">Affiliate Disclosure:</strong>{" "}
              This page contains affiliate links. We may receive a commission when
              you sign up through our links, at no extra cost to you. Always
              gamble responsibly. 18+ only.
            </p>
          </div>
        </div>

        <SimpleFooter />
      </div>
    </main>
  );
}