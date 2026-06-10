import { translations, Lang } from "@/app/lib/i18n";

type Props = {
  lang?: Lang;
};

export default function Hero({ lang = "en" }: Props) {
  const t = translations[lang] ?? translations.en;

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-cyan-400/20 shadow-[0_0_50px_rgba(56,189,248,0.10)] min-h-[520px]">
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt={t.heroImageAlt ?? "hero background"}
          className="h-full w-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/20" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="absolute top-0 left-0 right-0 z-10 flex flex-col px-0 md:px-0 pt-0 md:pt-3 text-center">
        <div className="flex justify-center -mt-24">
          <img
            src="/title.png"
            alt="MatchSignal"
            className="h-64 md:h-96 object-contain -ml-8"
          />
        </div>

        <h2 className="mt-4 text-xl md:text-3xl font-bold text-cyan-300">
          {t.heroSubtitle}
        </h2>
      </div>
    </section>
  );
}