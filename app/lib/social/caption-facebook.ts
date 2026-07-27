import type { TopPick } from "./types";

function getSportHashtag(league: string) {
  const l = league.toLowerCase();

  if (l.includes("nba") || l.includes("basketball") || l.includes("euroleague")) return "#Basketball";
  if (l.includes("tennis") || l.includes("atp") || l.includes("wta") || l.includes("wimbledon")) return "#Tennis";
  if (l.includes("mlb") || l.includes("baseball")) return "#Baseball";
  if (l.includes("nhl") || l.includes("hockey")) return "#Hockey";
  if (l.includes("ufc") || l.includes("mma") || l.includes("boxing") || l.includes("fight")) return "#MMA";
  if (
    l.includes("soccer") ||
    l.includes("football") ||
    l.includes("fifa") ||
    l.includes("premier league") ||
    l.includes("champions league") ||
    l.includes("la liga") ||
    l.includes("serie a") ||
    l.includes("bundesliga")
  ) return "#Football";

  return "#Sports";
}

function formatPercent(value: number | null | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function getPrimaryValue(pick: TopPick) {
  if (typeof pick.estimatedValuePct === "number") return pick.estimatedValuePct;
  if (typeof pick.valueDiff === "number") return pick.valueDiff;
  return null;
}

export async function generateFacebookCaption(pick: TopPick) {
  const url = "https://www.matchsignal.pro";
  const value = formatPercent(getPrimaryValue(pick));

  return [
    "Free AI pick on MatchSignal 🎯",
    "",
    `${pick.homeTeam} vs ${pick.awayTeam}`,
    `${pick.prediction}`,
    ...(value ? [`Estimated value: ${value}`] : []),
    "",
    "More free picks and match analysis:",
    url,
    "",
    `#MatchSignal ${getSportHashtag(pick.league ?? "")} #BettingTips #SportsPredictions #SportsBetting`,
  ].join("\n");
}

export async function generateFacebookCarouselCaption(picks: TopPick[]) {
  const url = "https://www.matchsignal.pro";

  const validPicks = picks
    .filter((pick) => !!pick?.homeTeam && !!pick?.awayTeam && !!pick?.prediction)
    .slice(0, 3);

  const hashtags = Array.from(
    new Set(validPicks.map((pick) => getSportHashtag(pick.league ?? "")))
  ).slice(0, 3);

  const pickCount = validPicks.length;

  return [
    `Today’s ${pickCount} free AI picks 🎯`,
    "",
    `We’re only showing ${pickCount} picks in this post.`,
    "More free picks, value signals, and match analysis are available right now on MatchSignal.",
    "",
    "Everything is free:",
    url,
    "",
    `#MatchSignal ${hashtags.join(" ")} #BettingTips #SportsPredictions #SportsBetting #ValueBet`,
  ].join("\n");
}