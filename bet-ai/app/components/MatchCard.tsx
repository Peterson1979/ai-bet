<div style={{ background: "#0f172a", padding: 16, borderRadius: 14 }}>
  
  <div style={{ fontSize: 18, fontWeight: 800 }}>
    {home} vs {away}
  </div>

  <div style={{ opacity: 0.6 }}>{league}</div>

  <div style={{ marginTop: 10 }}>
    <div style={{ fontSize: 12, opacity: 0.6 }}>AI PREDICTION</div>
    <div style={{ fontWeight: 800 }}>{prediction}</div>
  </div>

  <div style={{ marginTop: 10 }}>
    <div style={{ fontSize: 12, opacity: 0.6 }}>SHORT EXPLANATION</div>
    <div>{analysis}</div>
  </div>

  <div style={{ marginTop: 10 }}>
    <b>Risk:</b> {risk}
  </div>

  {alternativeTip && (
    <div style={{ marginTop: 6, opacity: 0.8 }}>
      Safer option: {alternativeTip}
    </div>
  )}

  <a
    href={`/affiliate/${slug}`}
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
    BET NOW
  </a>
</div>