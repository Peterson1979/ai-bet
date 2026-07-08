// app/components/BettingSidebar.tsx

import { getSidebarSites } from "@/app/lib/affiliates";
import { translations, Lang } from "@/app/lib/i18n";

type Props = {
  lang: Lang;
};

export default function BettingSidebar({ lang }: Props) {
  const t = translations[lang] ?? translations.en;
  const sites = getSidebarSites();

  return (
    <aside className="h-fit xl:sticky xl:top-24 space-y-5">

      <h2 className="text-xl font-black text-white">
        {t.sportNews?.sidebarTitle ?? "Top Betting Sites"}
      </h2>

      {sites.map((site) => (
        <a
          key={site.id}
          href={site.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="
            group block rounded-2xl
            border border-cyan-400/20
            bg-gradient-to-b from-[#0B1220] to-[#0F172A]
            p-5
            transition-all duration-200
            hover:border-cyan-300/60
            hover:-translate-y-0.5
          "
        >

          <div className="flex items-center justify-between">

            <div>
              <p className="font-black text-white">
                {site.name}
              </p>

              <p className="mt-1 text-sm text-cyan-300">
                {site.bonus}
              </p>
            </div>


            <div
              className="
                rounded-xl
                border border-emerald-400/40
                bg-emerald-500/10
                px-3 py-2
                text-center
              "
            >
              <div className="text-[10px] text-slate-400">
                {t.common.rating}
              </div>

              <div className="font-black text-emerald-300">
                {site.rating}
              </div>

            </div>

          </div>


          <div
            className="
              mt-4 rounded-full
              border border-cyan-400/30
              bg-cyan-500/10
              py-2
              text-center
              text-xs font-bold
              text-cyan-300
              group-hover:bg-cyan-400/20
            "
          >
            {t.common.visitSite}
          </div>

        </a>
      ))}

    </aside>
  );
}