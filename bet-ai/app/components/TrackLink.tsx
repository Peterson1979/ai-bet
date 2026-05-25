"use client";

import { trackClick } from "../lib/tracking";
import { getAffiliateLink } from "../lib/affiliates";

type Props = {
  league: string;
  slug: string;
  children: React.ReactNode;
};

export default function TrackLink({ league, slug, children }: Props) {
  return (
    <a
      href={getAffiliateLink(league)}
      target="_blank"
      onClick={() => trackClick(league, slug)}
      style={{
        display: "inline-block",
        marginTop: 12,
        padding: "10px 14px",
        background: "#22c55e",
        color: "#000",
        borderRadius: 8,
        fontWeight: 700,
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}