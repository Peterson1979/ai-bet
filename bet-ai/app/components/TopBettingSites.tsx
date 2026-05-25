type Site = {
  name: string;
  description: string;
  bonus: string;
  link: string;
  rating: number;
};

const sites: Site[] = [
  {
    name: "Bet365",
    description: "Fast odds, strong live betting coverage",
    bonus: "Up to €100 free bet",
    link: "#",
    rating: 5,
  },
  {
    name: "1xBet",
    description: "High odds margins, wide market coverage",
    bonus: "100% deposit bonus",
    link: "#",
    rating: 4,
  },
  {
    name: "William Hill",
    description: "Trusted UK bookmaker, stable odds",
    bonus: "€20 risk-free bet",
    link: "#",
    rating: 4,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ color: "#fbbf24", fontSize: 12 }}>
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </div>
  );
}

export default function TopBettingSites() {
  return (
    <section
      style={{
        marginTop: 40,
        padding: 28,
      }}
    >
      <div
        style={{
          fontSize: 14,
          opacity: 0.7,
          marginBottom: 12,
        }}
      >
        TOP BETTING SITES
      </div>

      <div
        style={{
          display: "grid",
          gap: 12,
        }}
      >
        {sites.map((site, i) => (
          <div
            key={i}
            style={{
              background: "#0b1220",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14,
              padding: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* LEFT */}
            <div>
              <div style={{ fontWeight: 700 }}>
                {site.name}
              </div>

              <div style={{ fontSize: 12, opacity: 0.7 }}>
                {site.description}
              </div>

              <div style={{ fontSize: 12, marginTop: 6 }}>
                🎁 {site.bonus}
              </div>

              <Stars rating={site.rating} />
            </div>

            {/* RIGHT CTA */}
            <a
              href={site.link}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                background: "#22c55e",
                color: "#000",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 13,
                whiteSpace: "nowrap",
              }}
            >
              Visit
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}