"use client";

import { useId, useState } from "react";
import { MatchCardData } from "../types/match";
import { translations, Lang } from "@/app/lib/i18n";
import { getSiteByBookmakerName } from "@/app/lib/affiliates";

type Props = {
  data: MatchCardData;
  lang?: Lang;
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
    <div className="relative inline-flex items-center ml-1">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setVisible((prev) => !prev);
        }}
        className="text-cyan-400 hover:text-cyan-200 transition text-[14px] leading-none"
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
          className="fixed left-4 right-4 z-[100] max-w-[320px] mx-auto rounded-[14px] border-2 border-cyan-300/40 bg-[#0B1220] p-3 shadow-[0_8px_40px_rgba(34,211,238,0.3)] text-left"
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

          <p className="text-[12px] text-slate-300 leading-5">
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

function StatRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <span
        className={`text-sm font-black ${
          accent ? "text-cyan-200" : "text-slate-200"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function MatchCard({ data, lang = "en" }: Props) {
  const t = translations[lang] ?? translations.en;

  const tier = data.riskTier ?? "High";
  const riskLabel =
    tier === "Low"
      ? (t.riskLow ?? "Low Risk")
      : tier === "Medium"
      ? (t.riskMedium ?? "Medium Risk")
      : (t.riskHigh ?? "High Risk");

  const riskEmoji = tier === "Low" ? "🟢" : tier === "Medium" ? "🟡" : "🔴";

  const riskColor =
    tier === "Low"
      ? "text-emerald-300 border-emerald-400/40 bg-emerald-500/10"
      : tier === "Medium"
      ? "text-yellow-300 border-yellow-400/40 bg-yellow-500/10"
      : "text-red-300 border-red-400/40 bg-red-500/10";

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
    data.bookmaker;

  const partnerLogoUrl = partnerOffer?.logoUrl || fallbackSite?.logoUrl;
  const partnerRating =
    typeof partnerOffer?.rating === "number"
      ? partnerOffer.rating
      : data.partnerRating;

  const partnerOdds =
    typeof partnerOffer?.odds === "number"
      ? partnerOffer.odds
      : data.partnerOdds;

  const primaryCtaHref = partnerOffer?.trackingUrl || data.bookmakerUrl || "#";

  const primaryCtaLabel = partnerName
    ? (t.claimOfferAt ?? "Claim offer at {partner}").replace(
        "{partner}",
        partnerName
      )
    : data.ctaLabel || t.viewOdds || "View odds";

  

  const valueTone =
    typeof data.estimatedValuePct === "number"
      ? data.estimatedValuePct >= 2
        ? "text-emerald-300"
        : data.estimatedValuePct >= 0
        ? "text-cyan-200"
        : "text-red-300"
      : "text-slate-200";

  const partnerOddsLabel = formatDecimal(partnerOdds);
  const marketAverageLabel = formatDecimal(data.marketAverageOdds);
  const fairOddsLabel = formatDecimal(data.fairOdds);
  const fairProbLabel = formatPercent(data.fairProbability);
  const estimatedValueLabel = formatPercent(data.estimatedValuePct, true);
  const spreadLabel = formatPercent(data.bookmakerSpreadPct, true);
  const consensusLabel = formatPercent(data.consensusImpliedProb);

  const bettingPageHref = `/${lang}/betting`;

  return (
    <article className="relative overflow-visible rounded-[26px] border-4 border-cyan-300/80 bg-gradient-to-b from-[#070D18] via-[#0B1220] to-[#050A12] p-5 shadow-[0_0_0_1px_rgba(34,211,238,0.25),0_18px_0_rgba(0,0,0,0.6),0_45px_120px_rgba(56,189,248,0.35)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-cyan-200 hover:shadow-[0_0_0_2px_rgba(34,211,238,0.6),0_25px_0_rgba(0,0,0,0.7),0_70px_160px_rgba(56,189,248,0.5)]">
      <div className="flex items-start justify-between mb-4 gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-cyan-300">
            {t.matchSignal}
          </span>
          <span className="inline-block text-[11px] text-cyan-300 truncate">
            {data.league}
          </span>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[11px] font-medium text-slate-300 whitespace-nowrap">
            {data.startTime ? formatMatchDateTime(data.startTime) : t.tbd}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-black text-white leading-tight mb-4">
        {data.homeTeam} vs {data.awayTeam}
      </h3>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span
          className={`text-sm font-black px-3 py-1 rounded-full border w-fit ${riskColor}`}
        >
          {riskEmoji} {riskLabel}
        </span>

        <span className="text-sm font-black text-white">
          {translatedPrediction}
        </span>
      </div>

      <div className="mb-4">
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
          {t.matchMarket ?? "Market"}
        </span>

        <div className="flex items-center mt-1">
          <p className="text-sm text-cyan-300 font-bold">{translatedMarket}</p>
          <MarketTooltip market={data.market} t={t} lang={lang} />
        </div>
      </div>

      <div className="rounded-xl border-2 border-cyan-300/40 bg-[#0B1220] p-4 mb-4 shadow-inner">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              {t.bestPartnerOdds ?? "Best partner odds"}
            </p>
            <p className={`text-xl font-black mt-1 ${valueTone}`}>
              {partnerOddsLabel}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
              {t.sportsbookLabel ?? "Sportsbook"}
            </p>
            <p className="text-sm font-black text-slate-100 mt-1">
              {partnerName}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <StatRow
            label={t.estimatedValue ?? "Estimated value"}
            value={estimatedValueLabel}
            accent={true}
          />
          <StatRow
            label={t.marketAverage ?? "Market average"}
            value={marketAverageLabel}
          />
          <StatRow
            label={t.tools?.fairOdds ?? "Fair odds"}
            value={fairOddsLabel}
          />
          <StatRow
            label={t.fairProbability ?? "Fair probability"}
            value={fairProbLabel}
          />
          <StatRow
            label={t.vsMarketAverage ?? "Vs market average"}
            value={spreadLabel}
          />
          <StatRow
            label={t.consensusProb ?? "Market consensus"}
            value={consensusLabel}
          />
          <StatRow
            label={t.bookmakersTracked ?? "Bookmakers tracked"}
            value={String(data.bookmakerCount ?? 0)}
          />
        </div>
      </div>

      

      <details className="rounded-xl border-2 border-cyan-300/20 bg-[#0B1220] p-4 mb-4 group">
        <summary className="cursor-pointer list-none flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold">
            {t.aiAnalysisLabel ?? "AI Analysis"}
          </span>
          <span className="text-slate-400 group-open:rotate-180 transition">
            ⌄
          </span>
        </summary>

        <p className="mt-3 text-sm text-slate-200 leading-6">
          {data.reasoning || t.noExplanation}
        </p>
      </details>

      <div className="mt-2 flex flex-col gap-2">
        <a
          href={primaryCtaHref}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex items-center justify-center gap-2 flex-wrap rounded-xl border-2 border-cyan-300/40 bg-cyan-500/10 py-2.5 px-3 text-sm font-bold text-cyan-200 hover:bg-cyan-400/20 transition"
        >
          {partnerLogoUrl && (
            <span className="flex items-center justify-center bg-white rounded-md px-2 py-1">
              <img
                loading="lazy"
                src={partnerLogoUrl}
                alt={partnerName}
                className="h-4 max-w-[60px] object-contain"
              />
            </span>
          )}

          <span>{primaryCtaLabel}</span>
        </a>

        <a
          href={bettingPageHref}
          className="text-center text-sm font-bold text-cyan-300 hover:text-cyan-100 transition underline underline-offset-4"
        >
          {t.compareAllOffers ?? "Compare all offers →"}
        </a>

        {data.disclaimer && (
          <p className="text-[10px] text-slate-500 text-center mt-1">
            {data.disclaimer}
          </p>
        )}
      </div>
    </article>
  );
}