"use client";
import { trackClick } from "../lib/tracking";
import { getMatchCardUrl } from "../lib/affiliates";

type Props = {
  league: string;
  sport?: string;
  slug: string;
  children?: React.ReactNode;
};

function getLabel(league: string) {
  const map: Record<string, string[]> = {
    "FIFA World Cup 2026": ["Best World Cup Odds", "Claim WC Bonus"],
    "Premier League": ["Best EPL Odds", "Claim EPL Bonus"],
    "Serie A": ["Best Serie A Odds", "Check Italy Odds"],
    "La Liga": ["Best La Liga Odds", "Spain Value Odds"],
    "NBA": ["Best NBA Odds", "Claim NBA Bonus"],
    "NFL": ["Best NFL Odds", "Claim NFL Bonus"],
    "NHL": ["Best NHL Odds", "Claim NHL Bonus"],
    "Roland Garros": ["Best Tennis Odds", "Claim Tennis Bonus"],
    "MLB": ["Best MLB Odds", "Claim MLB Bonus"],
    "MMA": ["Best MMA Odds", "Claim MMA Bonus"],
  };
  const options = map[league] || ["Get Best Odds", "Check Odds"];
  return options[Math.floor(Math.random() * options.length)];
}

export default function TrackLink({ league, sport = "", slug, children }: Props) {
  const label = getLabel(league);
  const url = getMatchCardUrl(sport, league);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={() => trackClick(league, slug)}
      className="
        inline-block mt-3 px-4 py-2
        rounded-xl border border-cyan-400/30
        bg-cyan-500/10 text-cyan-300
        text-sm font-bold
        transition-all duration-200
        hover:bg-cyan-400/20 hover:border-cyan-300/60
      "
    >
      {children ?? label}
    </a>
  );
}
