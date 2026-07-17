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

function getSportLabel(league: string) {
  const l = league.toLowerCase();

  if (l.includes("nba") || l.includes("basketball") || l.includes("euroleague")) return "Basketball";
  if (l.includes("tennis") || l.includes("atp") || l.includes("wta") || l.includes("wimbledon")) return "Tennis";
  if (l.includes("mlb") || l.includes("baseball")) return "MLB";
  if (l.includes("nhl") || l.includes("hockey")) return "Hockey";
  if (l.includes("ufc") || l.includes("mma") || l.includes("boxing") || l.includes("fight")) return "MMA";
  if (
    l.includes("soccer") ||
    l.includes("football") ||
    l.includes("fifa") ||
    l.includes("premier league") ||
    l.includes("champions league") ||
    l.includes("la liga") ||
    l.includes("serie a") ||
    l.includes("bundesliga")
  ) return "Football";

  return "Sports";
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
    `Want more high-value AI picks, match insights, and daily betting opportunities? Visit MatchSignal now:`,
    url,
    "",
    `#MatchSignal ${sportTag} #BettingTips #SportsPredictions`,
  ].join("\n");
}

export async function generateFacebookCarouselCaption(picks: TopPick[]) {
  const url = "https://www.matchsignal.pro";

  const validPicks = picks
    .filter((pick) => !!pick?.homeTeam && !!pick?.awayTeam && !!pick?.prediction)
    .slice(0, 5);

  const hashtags = Array.from(
    new Set(validPicks.map((pick) => getSportHashtag(pick.league ?? "")))
  ).slice(0, 3);

  return [
    "Today’s AI-powered sports picks 🎯",
    "",
    ...validPicks.map((pick) => {
      const sport = getSportLabel(pick.league ?? "");
      return `${sport}: ${pick.homeTeam} vs ${pick.awayTeam} — ${pick.prediction}`;
    }),
    "",
    "Want more high-value AI picks, match insights, and daily betting opportunities? Visit MatchSignal now:",
    url,
    "",
    `#MatchSignal ${hashtags.join(" ")} #BettingTips #SportsPredictions #SportsBetting`,
  ].join("\n");
}