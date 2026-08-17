import { translations, Lang } from "@/app/lib/i18n";

type Props = {
  lang?: Lang;
  bettingPageHref?: string;
};

export default function StickyBottomCTA({ lang = "en", bettingPageHref }: Props) {
  const href = bettingPageHref ?? `/${lang}/betting`;
  const t = translations[lang] ?? translations.en;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t-2 border-cyan-300/40 bg-gradient-to-t from-[#050A12] via-[#0B1220] to-[#0B1220]/95 backdrop-blur px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.6)]"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
    >
      <a
        href={href}
        className="flex items-center justify-center gap-2 rounded-xl border-2 border-cyan-300/60 bg-cyan-500/15 py-3 text-sm font-black text-cyan-200 uppercase tracking-wide active:scale-[0.98] transition"
      >
        {t.stickyCta.text}
      </a>
    </div>
  );
}
