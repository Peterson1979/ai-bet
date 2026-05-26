const sports = [
  {
    label: "Football",
    target: "#football",
  },
  {
    label: "NBA",
    target: "#nba",
  },
  {
    label: "NFL",
    target: "#nfl",
  },
  {
    label: "Hockey",
    target: "#hockey",
  },
  {
    label: "Tennis",
    target: "#tennis",
  },
];

export default function SportNav() {
  return (
    <section
      style={{
        maxWidth: 1300,
        margin: "0 auto",
        padding: "32px 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        {sports.map((sport) => (
          <a
            key={sport.label}
            href={sport.target}
            style={{
              background: "#111827",
              color: "#fff",
              padding: "14px 20px",
              borderRadius: 14,
              textDecoration: "none",
              fontWeight: 800,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {sport.label}
          </a>
        ))}
      </div>
    </section>
  );
}