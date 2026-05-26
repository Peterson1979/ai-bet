import Header from "./Header";
import BannerAds from "./BannerAds";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: 760,
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(7,11,20,0.96))",
        }}
      />

      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth: 1300,
          margin: "0 auto",
          padding: "180px 24px 80px",
          color: "white",
        }}
      >
        {/* TEXT */}
        <div
          style={{
            maxWidth: 760,
          }}
        >
          <div
            style={{
              color: "#22c55e",
              fontWeight: 800,
              marginBottom: 18,
              letterSpacing: 1,
            }}
          >
            AI SPORTS BETTING ANALYTICS
          </div>

          <h1
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 900,
              marginBottom: 24,
            }}
          >
            Smarter Betting Decisions Powered by AI
          </h1>

          <p
            style={{
              fontSize: 20,
              lineHeight: 1.7,
              opacity: 0.88,
              maxWidth: 620,
            }}
          >
            AI-generated match analysis, confidence scoring and betting insights
            across Football, NBA, NFL, Hockey and Tennis.
          </p>

          {/* BUTTONS */}
          <div
            style={{
              marginTop: 34,
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <a href="#football" style={primaryBtn}>
              View Predictions
            </a>

            <a href="/betting" style={secondaryBtn}>
              Top Betting Sites
            </a>
          </div>
        </div>

        {/* BANNERS */}
        <BannerAds />
      </div>
    </section>
  );
}

const primaryBtn = {
  background: "#22c55e",
  color: "#000",
  padding: "14px 22px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 800,
};

const secondaryBtn = {
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  padding: "14px 22px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 800,
  border: "1px solid rgba(255,255,255,0.08)",
};