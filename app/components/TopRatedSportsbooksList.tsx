import Image from "next/image";
import { getTopRatedList } from "@/app/lib/affiliates";
import { translations, Lang } from "@/app/lib/i18n";

type Props = {
  lang?: Lang;
  bettingPageHref?: string;
  variant?: "footer" | "inline";
  showDisclosure?: boolean;
};

export default function TopRatedSportsbooksList({
  lang = "en",
  bettingPageHref,
  variant = "footer",
  showDisclosure = true,
}: Props) {
  const sites = getTopRatedList(3);
  const href = bettingPageHref ?? `/${lang}/betting`;
  const t = translations[lang] ?? translations.en;

  if (!sites.length) return null;

  const isInline = variant === "inline";

  return (
    <section className={`w-full ${isInline ? "py-4" : "py-8"} px-4`}>
      {!isInline && (
        <h3 className="text-center text-base font-black text-white mb-4">
          {t.topRatedSportsbooks.title}
        </h3>
      )}

      <div
        className={`flex ${isInline ? "flex-row overflow-x-auto gap-3" : "flex-col gap-2"} max-w-2xl mx-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {sites.map((site) => (
          <a
            key={site.id}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`flex items-center justify-between gap-3 rounded-xl border-2 border-cyan-300/30 bg-[#0B1220] px-3 py-2 hover:border-cyan-200 transition ${isInline ? "shrink-0 min-w-[220px] snap-start" : ""}`}
          >
            <div className="flex items-center gap-3">
              {site.logoUrl ? (
                <span className="flex items-center justify-center bg-[#1a2744] rounded-md px-2 py-1 border border-cyan-300/20">
                  <Image
                    src={site.logoUrl}
                    alt={site.name}
                    width={60}
                    height={18}
                    className="max-h-[18px] max-w-[60px] w-auto h-auto object-contain"
                  />
                </span>
              ) : (
                <span className="text-sm font-bold text-white">{site.name}</span>
              )}
              {site.logoUrl && (
                <span className="text-xs font-semibold text-slate-300">{site.name}</span>
              )}
            </div>

            <span className="text-[11px] font-bold text-cyan-300 whitespace-nowrap">
              {t.topRatedSportsbooks.viewOffer}
            </span>
          </a>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <a
          href={href}
          className="text-sm font-bold text-cyan-300 hover:text-cyan-100 underline underline-offset-4"
        >
          {t.topRatedSportsbooks.compareAll}
        </a>
      </div>

      {showDisclosure && (
        <p className="text-[11px] text-slate-400 text-center max-w-lg mx-auto mt-3 leading-relaxed">
          {t.affiliateDisclaimer}
        </p>
      )}
    </section>
  );
}
