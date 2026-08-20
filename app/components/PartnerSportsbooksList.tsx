import Image from "next/image";
import { getPartnerList } from "@/app/lib/affiliates";
import { translations, type Lang } from "@/app/lib/i18n";

type Props = { lang?: Lang; bettingPageHref?: string; variant?: "footer" | "inline"; showDisclosure?: boolean; countryCode?: string };

export default function PartnerSportsbooksList({ lang = "en", bettingPageHref, variant = "footer", showDisclosure = true, countryCode }: Props) {
  const sites = getPartnerList(3, countryCode);
  const href = bettingPageHref ?? `/${lang}/betting`;
  const t = translations[lang] ?? translations.en;
  if (!sites.length) return null;
  const isInline = variant === "inline";
  return (
    <section className={`w-full ${isInline ? "py-4" : "py-8"} px-4`}>
      {!isInline && <h3 className="mb-4 text-center text-base font-black text-white">{t.partnerSportsbooks.title}</h3>}
      <div className={`flex ${isInline ? "flex-row overflow-x-auto gap-3" : "flex-col gap-2"} mx-auto max-w-2xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
        {sites.map((site) => <a key={site.id} href={site.url} target="_blank" rel="noopener noreferrer sponsored" className={`flex items-center justify-between gap-3 rounded-xl border-2 border-cyan-300/30 bg-[#0B1220] px-3 py-2 transition hover:border-cyan-200 ${isInline ? "shrink-0 min-w-[220px] snap-start" : ""}`}><div className="flex items-center gap-3">{site.logoUrl ? <span className="flex items-center justify-center rounded-md border border-cyan-300/20 bg-[#1a2744] px-2 py-1"><Image src={site.logoUrl} alt={site.name} width={60} height={18} className="max-h-[18px] max-w-[60px] object-contain" /></span> : <span className="text-sm font-bold text-white">{site.name}</span>}{site.logoUrl && <span className="text-xs font-semibold text-slate-300">{site.name}</span>}</div><span className="whitespace-nowrap text-[11px] font-bold text-cyan-300">{t.partnerSportsbooks.viewOffer}</span></a>)}
      </div>
      <div className="mt-4 flex justify-center"><a href={href} className="text-sm font-bold text-cyan-300 underline underline-offset-4 hover:text-cyan-100">{t.partnerSportsbooks.compareAll}</a></div>
      {showDisclosure && <p className="mx-auto mt-3 max-w-lg text-center text-[11px] leading-relaxed text-slate-400">{t.affiliateDisclaimer}</p>}
    </section>
  );
}
