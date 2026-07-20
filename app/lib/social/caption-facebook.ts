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

function formatPercent(value: number | null | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function formatOdds(value: number | null | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  return value.toFixed(2);
}

function getPrimaryValue(pick: TopPick) {
  if (typeof pick.estimatedValuePct === "number") return pick.estimatedValuePct;
  if (typeof pick.valueDiff === "number") return pick.valueDiff;
  return null;
}

function getPrimaryOdds(pick: TopPick) {
  if (typeof pick.partnerOffer?.odds === "number") return pick.partnerOffer.odds;
  if (typeof pick.partnerOdds === "number") return pick.partnerOdds;
  if (typeof pick.bestOdds === "number") return pick.bestOdds;
  return null;
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

function buildPickSummary(pick: TopPick) {
  const emoji = getSportEmoji(pick.league ?? "");
  const sport = getSportLabel(pick.league ?? "");
  const value = formatPercent(getPrimaryValue(pick));
  const odds = formatOdds(getPrimaryOdds(pick));

  const parts = [
    `${emoji} ${sport}: ${pick.homeTeam} vs ${pick.awayTeam}`,
    `${pick.prediction} (${pick.market})`,
  ];

  if (value) parts.push(`Est. value ${value}`);
  if (odds) parts.push(`Odds ${odds}`);
  parts.push(`Risk ${pick.riskTier}`);
  parts.push(`${pick.bookmakerCount} books`);

  return `• ${parts.join(" — ")}`;
}

export async function generateFacebookCaption(pick: TopPick) {
  const url = "https://www.matchsignal.pro";
  const value = formatPercent(getPrimaryValue(pick));
  const odds = formatOdds(getPrimaryOdds(pick));
  const whySignal =
    Array.isArray(pick.whySignal) && pick.whySignal.length > 0
      ? pick.whySignal[0]
      : null;

  return [
    `${pick.homeTeam} vs ${pick.awayTeam} ${getSportEmoji(pick.league ?? "")}`,
    "",
    `AI pick: ${pick.prediction} (${pick.market})`,
    ...(odds ? [`Partner odds: ${odds}`] : []),
    ...(value ? [`Estimated value: ${value}`] : []),
    `Risk tier: ${pick.riskTier}`,
    `Bookmakers tracked: ${pick.bookmakerCount}`,
    ...(whySignal ? [`Why it stands out: ${whySignal}`] : []),
    "",
    "See more AI picks and match analysis at MatchSignal:",
    url,
    "",
    `#MatchSignal ${getSportHashtag(pick.league ?? "")} #BettingTips #SportsPredictions #SportsBetting`,
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
    "Today’s AI picks with market context 🎯",
    "Here are today’s top signals from the current MatchSignal board:",
    "",
    ...validPicks.map((pick) => buildPickSummary(pick)),
    "",
    "See more AI picks, value signals, and match analysis at MatchSignal:",
    url,
    "",
    `#MatchSignal ${hashtags.join(" ")} #BettingTips #SportsPredictions #SportsBetting #ValueBet`,
  ].join("\n");
}