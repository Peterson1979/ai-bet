const sites = [
  {
    name: "bet365",
    bonus: "Up to $200 Bonus",
    url: "#",
  },
  {
    name: "Stake",
    bonus: "Crypto Betting Bonus",
    url: "#",
  },
  {
    name: "1xBet",
    bonus: "100% Welcome Offer",
    url: "#",
  },
  {
    name: "Betway",
    bonus: "Live Betting Specials",
    url: "#",
  },
];

export default function TopBettingSites() {
  return (
    <div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 900,
          marginBottom: 20,
        }}
      >
        Top Betting Sites
      </div>

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {sites.map((site) => (
          <div
            key={site.name}
            style={{
              background: "#111827",
              borderRadius: 20,
              padding: 20,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              {site.name}
            </div>

            <div
              style={{
                opacity: 0.7,
                marginBottom: 18,
              }}
            >
              {site.bonus}
            </div>

            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#22c55e",
                color: "#000",
                padding: "12px 16px",
                borderRadius: 12,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Visit Site
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}