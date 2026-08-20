"use client";

import { RECOMMENDATION_LABEL } from "@/app/lib/localizedUiCopy";
import { useId, useState } from "react";
import Image from "next/image";
import { MatchCardData } from "../types/match";
import { translations, Lang } from "@/app/lib/i18n";
import { getSiteByBookmakerName } from "@/app/lib/affiliates";
import { canRenderAffiliate } from "@/app/lib/compliance/engine";
import { trackAffiliateClick } from "@/app/lib/analytics";

type Props = {
  data: MatchCardData;
  lang?: Lang;
  countryCode?: string;
};

const BET_TYPE_TO_KEY: Record<string, string> = {
  "home win": "homeWin",
  "away win": "awayWin",
  "draw no bet": "drawNoBet",
  "double chance": "doubleChance",
  "match winner": "matchWinner",
  moneyline: "moneyline",
  "moneyline (fight winner)": "moneyline",
  "over 1.5 goals": "over15",
  "under 4.5 goals": "under45",
  "over 4.5 goals": "over45",
  "under 7.5 goals": "under75",
  "over 18.5 games": "over185Games",
  "under 30.5 games": "under305Games",
  "player to win a set": "playerToWinSet",
  "handicap games (+3.5)": "handicapGames",
  "over 149.5 points": "over1495Points",
  "under 179.5 points": "under1795Points",
  "over 33.5 points": "over335Points",
  "under 54.5 points": "under545Points",
  "over 7.5 runs": "over75Runs",
  "under 9.5 runs": "under95Runs",
  "team total over": "teamTotalOver",
  "team total under": "teamTotalUnder",
  "team total over 1.5": "teamTotalOver15",
  "run line (-1.5)": "runLine",
  "method of victory (ko/tko or decision)": "methodOfVictory",
  "method of victory": "methodOfVictory",
  "over 2.5 rounds": "over25Rounds",
  "under 2.5 rounds": "under25Rounds",
};

function formatDecimal(value?: number | null): string {
  return typeof value === "number" && Number.isFinite(value)
    ? value.toFixed(2)
    : "—";
}

function formatPercent(value?: number | null, withPlus = false): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  const prefix = withPlus && value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(1)}%`;
}

function formatMatchDateTime(startTime?: string): string {
  if (!startTime) return "";
  try {
    const d = new Date(startTime);
    if (Number.isNaN(d.getTime())) return "";
    return (
      d.toLocaleString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      }) + " UTC"
    );
  } catch {
    return "";
  }
}

function MarketTooltip({
  market,
  t,
  lang,
}: {
  market: string;
  t: any;
  lang: string;
}) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();
  const glossary = t.glossary?.markets ?? {};
  const key = BET_TYPE_TO_KEY[market?.toLowerCase() ?? ""];
  const entry = key
    ? (glossary as Record<string, { term: string; definition: string }>)?.[key]
    : undefined;

  if (!entry) return null;

  return (
    <div className="relative inline-flex items-center ml-1.5">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setVisible((prev) => !prev);
        }}
        className="text-cyan-400 hover:text-cyan-200 transition text-[13px] leading-none"
        aria-label={t.marketInfoAriaLabel ?? "Market info"}
        aria-expanded={visible}
        aria-describedby={visible ? tooltipId : undefined}
      >
        ⓘ
      </button>

      {visible && (
        <div
          id={tooltipId}
          role="tooltip"
          className="fixed left-4 right-4 z-[100] max-w-[320px] mx-auto rounded-xl border border-cyan-400/40 bg-[#0B1220] p-3 shadow-2xl text-left"
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] font-black text-cyan-300 uppercase tracking-wider">
              {entry.term}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setVisible(false);
              }}
              className="text-slate-400 hover:text-white text-[14px] ml-2"
              aria-label={t.closeMarketInfoAriaLabel ?? "Close market info"}
            >
              ✕
            </button>
          </div>

          <p className="text-[12px] text-slate-300 leading-relaxed">
            {entry.definition}
          </p>

          <a
            href={`/${lang}/betting-glossary`}
            className="mt-2 inline-block text-[11px] text-cyan-400 hover:text-cyan-200 font-bold"
          >
            {t.glossary?.learnMore ?? "Learn more →"}
          </a>
        </div>
      )}
    </div>
  );
}

export default function MatchCard({ data, lang = "en", countryCode }: Props) {
  const t = translations[lang] ?? translations.en;
  const recommendationLabel = RECOMMENDATION_LABEL[lang] ?? RECOMMENDATION_LABEL.en;

  const tier = data.riskTier ?? "High";
  const riskLabel =
    tier === "Low"
      ? (t.riskLow ?? "Low Risk")
      : tier === "Medium"
      ? (t.riskMedium ?? "Medium Risk")
      : (t.riskHigh ?? "High Risk");

  const riskEmoji = tier === "Low" ? "🟢" : tier === "Medium" ? "🟡" : "🔴";

  const riskBadgeClass =
    tier === "Low"
      ? "text-emerald-300 border-emerald-500/40 bg-emerald-500/10"
      : tier === "Medium"
      ? "text-amber-300 border-amber-500/40 bg-amber-500/10"
      : "text-rose-300 border-rose-500/40 bg-rose-500/10";

  const predKey = BET_TYPE_TO_KEY[data.prediction?.toLowerCase() ?? ""];
  const glossaryMarkets =
    (t.glossary?.markets as Record<string, { term: string; definition: string }>) ??
    {};

  const translatedPrediction =
    predKey && glossaryMarkets[predKey]
      ? glossaryMarkets[predKey].term
      : data.prediction;

  const marketKey = BET_TYPE_TO_KEY[data.market?.toLowerCase() ?? ""];
  const translatedMarket =
    marketKey && glossaryMarkets[marketKey]
      ? glossaryMarkets[marketKey].term
      : data.market;

  const fallbackSite = getSiteByBookmakerName(
    data.partnerBookmaker || data.bookmaker || ""
  );

  const partnerOffer = data.partnerOffer;
  const partnerName =
    partnerOffer?.bookmakerName ||
    data.partnerBookmaker ||
    fallbackSite?.name ||
    data.bookmaker ||
    "Partner Sportsbook";

  const affiliateSite = getSiteByBookmakerName(partnerName);
  const canShowAffiliateCta = affiliateSite
    ? canRenderAffiliate(affiliateSite.id, countryCode)
    : false;

  const partnerLogoUrl = partnerOffer?.logoUrl || fallbackSite?.logoUrl;
  const partnerOdds =
    typeof partnerOffer?.odds === "number"
      ? partnerOffer.odds
      : data.partnerOdds ?? data.bestOdds;

  const primaryCtaHref = canShowAffiliateCta
    ? partnerOffer?.trackingUrl || data.bookmakerUrl || null
    : null;

  const primaryCtaLabel = partnerName
    ? `${t.viewOdds ?? "View odds"} — ${partnerName}`
    : data.ctaLabel || t.viewOdds || "View odds";

  const valueTone =
    typeof data.estimatedValuePct === "number"
      ? data.estimatedValuePct >= 2
        ? "text-emerald-400"
        : data.estimatedValuePct >= 0
        ? "text-cyan-300"
        : "text-slate-300"
      : "text-slate-300";

  const partnerOddsLabel = formatDecimal(partnerOdds);
  const marketAverageLabel = formatDecimal(data.marketAverageOdds);
  const fairOddsLabel = formatDecimal(data.fairOdds);
  const fairProbLabel = formatPercent(data.fairProbability);
  const estimatedValueLabel = formatPercent(data.estimatedValuePct, true);
  const consensusLabel = formatPercent(data.consensusImpliedProb);

  const bettingPageHref = `/${lang}/betting`;

  return (
    <article className="relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-b from-[#0B132B]/90 via-[#0A1020]/95 to-[#060B14] p-5 shadow-xl transition-all duration-300 hover:border-cyan-400/60 hover:shadow-2xl">
      {/* 1. Header: Sport / League & UTC Timestamp */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
            {t.matchSignal}
          </span>
          <span className="text-[12px] font-bold text-slate-300 truncate">
            {data.league}
          </span>
        </div>

        <div className="shrink-0 text-right">
          <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
            {data.startTime ? formatMatchDateTime(data.startTime) : t.tbd}
          </span>
        </div>
      </div>

      {/* 2. Match Title: Home vs Away */}
      <h3 className="text-lg font-black text-white leading-snug mb-3">
        {data.homeTeam} <span className="text-cyan-400/80 font-normal">vs</span> {data.awayTeam}
      </h3>

      {/* 3. Decision Hero: Pick & Risk Tier */}
      <div className="mb-4 rounded-xl border border-cyan-400/20 bg-[#091122]/90 p-3.5 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {t.matchMarket ?? "Market"}:
            </span>
            <span className="text-xs font-bold text-cyan-300">
              {translatedMarket}
            </span>
            <MarketTooltip market={data.market} t={t} lang={lang} />
          </div>

          <span
            className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${riskBadgeClass}`}
          >
            {riskEmoji} {riskLabel}
          </span>
        </div>

        <div className="pt-1 flex items-baseline justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              {recommendationLabel}
            </span>
            <p className="text-base font-black text-white">
              {translatedPrediction}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              {t.bestPartnerOdds ?? "Best Odds"}
            </span>
            <p className={`text-xl md:text-2xl font-black ${valueTone}`}>
              {partnerOddsLabel}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Decision Intelligence Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="rounded-lg border border-white/5 bg-[#050A14] p-2.5">
          <p className="text-[10px] uppercase font-bold text-slate-400">
            {t.estimatedValue ?? "Value Edge"}
          </p>
          <p className={`text-sm md:text-base font-black mt-0.5 ${valueTone}`}>
            {estimatedValueLabel}
          </p>
        </div>

        <div className="rounded-lg border border-white/5 bg-[#050A14] p-2.5">
          <p className="text-[10px] uppercase font-bold text-slate-400">
            {t.marketAverage ?? "Market Avg"}
          </p>
          <p className="text-sm md:text-base font-black text-slate-200 mt-0.5">
            {marketAverageLabel}
          </p>
        </div>

        <div className="rounded-lg border border-white/5 bg-[#050A14] p-2.5">
          <p className="text-[10px] uppercase font-bold text-slate-400">
            {t.fairProbability ?? "Fair Prob"}
          </p>
          <p className="text-sm md:text-base font-black text-slate-200 mt-0.5">
            {fairProbLabel}
          </p>
        </div>

        <div className="rounded-lg border border-white/5 bg-[#050A14] p-2.5">
          <p className="text-[10px] uppercase font-bold text-slate-400">
            {t.bookmakersTracked ?? "Books Sampled"}
          </p>
          <p className="text-sm md:text-base font-black text-slate-200 mt-0.5">
            {data.bookmakerCount ?? 0}
          </p>
        </div>
      </div>

      {/* 5. AI Rationale & Context */}
      <details className="rounded-xl border border-white/10 bg-[#060D1A] p-3 mb-4 group text-slate-300">
        <summary className="cursor-pointer list-none flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-cyan-300">
          <span>{t.aiAnalysisLabel ?? "AI Analysis"}</span>
          <span className="text-slate-400 group-open:rotate-180 transition">
            ⌄
          </span>
        </summary>

        <p className="mt-2 text-xs text-slate-300 leading-relaxed">
          {data.reasoningTranslations?.[lang] || data.reasoning || t.noExplanation}
        </p>
      </details>

      {/* 6. Commercial Action Area */}
      <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
        {primaryCtaHref && (
          <a
            href={primaryCtaHref}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() => {
            trackAffiliateClick({
              bookmaker_name: partnerName,
              sport: data.sport,
              market: data.market,
              placement: "matchcard_cta",
            });
          }}
          className="flex items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/15 py-2.5 px-3 text-sm font-bold text-cyan-200 hover:bg-cyan-500/25 transition shadow-md"
        >
          {partnerLogoUrl && (
            <span className="flex items-center justify-center bg-white rounded px-1.5 py-0.5 shrink-0">
              <Image
                src={partnerLogoUrl}
                alt={partnerName}
                width={50}
                height={14}
                className="h-3.5 w-auto max-w-[50px] object-contain"
              />
            </span>
          )}
          <span>{primaryCtaLabel}</span>
          </a>
        )}

        <a
          href={bettingPageHref}
          className="text-center text-xs font-semibold text-slate-400 hover:text-cyan-300 transition"
        >
          {t.compareAllOffers ?? "Compare all offers →"}
        </a>

        {data.disclaimer && (
          <p className="text-[9px] text-slate-500 text-center mt-1">
            {data.disclaimer}
          </p>
        )}
      </div>
    </article>
  );
}