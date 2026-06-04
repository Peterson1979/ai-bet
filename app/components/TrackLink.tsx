"use client";
import { trackClick } from "../lib/tracking";
import { getMatchCardUrl } from "../lib/affiliates";

type Props = {
  league: string;
  slug: string;
  children?: React.ReactNode;
};

function getLabel(league: string) {
  const map: Record<string, string[]> = {
    "Premier League": ["Best EPL Odds", "Claim EPL Bonus"],
    "Serie A": ["Best Serie A Odds", "Check Italy Odds"],
    "La Liga": ["Best La Liga Odds", "Spain Value Odds"],
  };
  const options = map[league] || ["Get Best Odds", "Check Odds"];
  return options[Math.floor(Math.random() * options.length)];
}

export default function TrackLink({ league, slug, children }: Props) {
  const label = getLabel(league);
  const url = getMatchCardUrl(league, league);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" onClick={() => trackClick(league, slug)} style={{ display: "inline-block", marginTop: 12, padding: "10px 14px", background: "#22c55e", color: "#000", borderRadius: 8, fontWeight: 700, textDecoration: "none" }}>
      {children ?? label}
    </a>
  );
}