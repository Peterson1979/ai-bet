export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 80,
        padding: "40px 24px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "#050814",
        color: "rgba(255,255,255,0.7)",
      }}
    >
      <div
        style={{
          maxWidth: 1300,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
            marginBottom: 18,
          }}
        >
          <a href="#" style={link}>
            Privacy Policy
          </a>

          <a href="#" style={link}>
            Terms & Conditions
          </a>

          <a href="#" style={link}>
            Affiliate Disclosure
          </a>

          <a href="#" style={link}>
            Responsible Gambling
          </a>

          <a href="#" style={link}>
            Contact
          </a>
        </div>

        <div
          style={{
            fontSize: 13,
            lineHeight: 1.7,
            opacity: 0.7,
          }}
        >
          18+ only. Gambling can be addictive. Please gamble responsibly.
          Affiliate links may generate commission.
        </div>

        <div
          style={{
            marginTop: 14,
            fontSize: 12,
            opacity: 0.5,
          }}
        >
          © 2026 AI BETS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

const link = {
  color: "rgba(255,255,255,0.8)",
  textDecoration: "none",
};