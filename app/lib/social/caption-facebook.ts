import type { TopPick } from "./types";

function getSportEmoji(league: string) {
  const l = league.toLowerCase();

  if (l.includes("nba") || l.includes("basketball") || l.includes("euroleague")) return "🏀";
  if (l.includes("tennis") || l.includes("atp") || l.includes("wta") || l.includes("wimbledon")) return "🎾";
  if (l.includes("mlb") || l.includes("baseball")) return "⚾";
  if (l.includes("nhl") || l.includes("hockey")) return "🏒";
  if (l.includes("ufc") || l.includes("mma") || l.includes("boxing") || l.includes("fight")) return "🥊";
  if (
    l.includes("soccer") ||
    l.includes("football") ||
    l.includes("fifa") ||
    l.includes("premier league") ||
    l.includes("champions league") ||
    l.includes("la liga") ||
    l.includes("serie a") ||
    l.includes("bundesliga")
  ) return "⚽";

  return "🏆";
}

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

function formatValue(valueDiff: number | null | undefined) {
  if (typeof valueDiff !== "number") return null;
  return `${valueDiff >= 0 ? "+" : ""}${valueDiff.toFixed(2)}%`;
}

export async function generateFacebookCaption(pick: TopPick) {
  const emoji = getSportEmoji(pick.league ?? "");
  const sportTag = getSportHashtag(pick.league ?? "");
  const value = formatValue(pick.valueDiff);
  const url = "https://www.matchsignal.pro";

  return [
    `${pick.homeTeam} vs ${pick.awayTeam} ${emoji}`,
    "",
    `AI Pick: ${pick.prediction}`,
    `Risk Tier: ${pick.riskTier}`,
    ...(value ? [`Value Signal: ${value}`] : []),
    "",
    `Get more free AI betting tips at MatchSignal:`,
    url,
    "",
    `#MatchSignal ${sportTag} #BettingTips #SportsPredictions`,
  ].join("\n");
}