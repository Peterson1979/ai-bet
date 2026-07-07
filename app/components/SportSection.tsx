import MatchCard from "./MatchCard";
import { toMatchCardData } from "@/app/lib/domain/matchMapper";
import type { SportType } from "@/app/types/match";
import type { PredictionCard } from "@/app/types/prediction";
import { translations, Lang } from "@/app/lib/i18n";
import { getSportSlug } from "@/app/lib/sportSlug";

type SportBlock = {
  sport: string;
  hasMatches: boolean;
  message?: string;
  topPicks: PredictionCard[];
};


type SportSectionProps = {
  sportBlock: SportBlock;
  lang: Lang;
  limit: number;
  showViewAll?: boolean;
};


const sportKeyMap: Record<string, keyof typeof translations.en.sports> = {
  football: "football",
  soccer: "football",
  nba: "nba",
  nfl: "nfl",
  hockey: "hockey",
  tennis: "tennis",
  mlb: "mlb",
  mma: "mma",
};


export default function SportSection({
  sportBlock,
  lang,
  limit,
  showViewAll = false,
}: SportSectionProps) {

  const t = translations[lang] ?? translations.en;


  const activePicks = sportBlock.topPicks
    .filter((p) => new Date(p.startTime) > new Date())
    .slice(0, limit);


  const sportName =
    t.sports[
      sportKeyMap[sportBlock.sport.toLowerCase()] ?? "football"
    ];


  return (
    <section
      id={sportBlock.sport.toLowerCase()}
      className="mb-16 scroll-mt-28"
    >

      <div className="mb-6 flex items-center gap-4">

        <h2 className="text-3xl font-black tracking-tight">
          {sportName}
        </h2>

        <div className="h-[3px] flex-1 bg-gradient-to-r from-cyan-300/80 to-transparent" />

      </div>


      {!sportBlock.hasMatches || activePicks.length === 0 ? (

        <div className="rounded-[24px] border-2 border-cyan-300/20 bg-[#0B1220] p-6">

          <p className="text-slate-300">
            {sportBlock.message ?? t.noMatches}
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">

          {activePicks.map((p) => {

            const uiData = toMatchCardData(
              p,
              sportBlock.sport as SportType
            );


            return (

              <div
                key={p.id}
                className="transition-all duration-200 hover:-translate-y-3 hover:scale-[1.05] hover:shadow-[0_35px_90px_rgba(34,211,238,0.25)]"
              >

                <MatchCard
                  data={uiData}
                  lang={lang}
                />

              </div>

            );

          })}

        </div>

      )}


      {showViewAll && (

        <div className="mt-8 flex justify-center">

          <a
            href={`/${lang}/${getSportSlug(sportBlock.sport)}`}
            className="rounded-full border-2 border-cyan-300/40 bg-[#0A1220]/80 px-8 py-3 text-sm font-black text-white transition-all hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-400/10 hover:shadow-[0_0_35px_rgba(34,211,238,0.45)]"
          >
            {t.viewAllPredictions ?? "View all predictions"} →
          </a>

        </div>

      )}

    </section>
  );
}