export const LANGS = [
  "en",
  "hu",
  "de",
  "fr",
  "es",
  "it",
  "pt",
  "ar",
  "zh",
  "ja",
  "hi",
] as const;

export type Lang = (typeof LANGS)[number];

type Translation = {
  heroTitle: string;
  heroSubtitle: string;
  heroDesc: string;
  heroImageAlt: string;

  topPicks: string;
  premiumOffers: string;
  premiumOffersDesc: string;
  recommendedSites: string;
  recommendedSitesDesc: string;

  noMatches: string;
  tbd: string;
  noExplanation: string;

  aiTips: string;
  odds: string;
  confidence: string;
  edge: string;
  risk: string;
  ev: string;

  valueBet: string;
  okBet: string;
  riskyBet: string;

  positiveEV: string;
  negativeEV: string;

  showExplanation: string;
  hideExplanation: string;

  viewOdds: string;

  seoTitle: string;
  seoDescription: string;

  sports: {
    topPicks: string;
    football: string;
    nba: string;
    nfl: string;
    hockey: string;
    tennis: string;
    mlb: string;
    mma: string;
  };
};

/* =========================
   BASE (ENGLISH MASTER)
========================= */

const en: Translation = {
  heroTitle: "AI Tips",
  heroSubtitle: "AI-Powered Betting Insights",
  heroDesc: "AI-powered predictions across multiple sports.",
  heroImageAlt: "AI betting predictions hero background",

  topPicks: "Top Picks",
  premiumOffers: "Premium Betting Offers",
  premiumOffersDesc:
    "Place your affiliate banners, sportsbook promos or rotating offers here.",
  recommendedSites: "Recommended sportsbooks & offers",
  recommendedSitesDesc:
    "Recommended sportsbooks and affiliate offers curated for users.",

  noMatches: "No matches available",
  tbd: "TBD",
  noExplanation: "No explanation available",

  aiTips: "AI TIPS",
  odds: "Odds",
  confidence: "Confidence",
  edge: "Edge",
  risk: "Risk",
  ev: "Expected Value (EV)",

  valueBet: "🟢 VALUE BET",
  okBet: "🟡 OK BET",
  riskyBet: "🔴 RISKY",

  positiveEV: "Positive expected value signal",
  negativeEV: "Negative expected value signal",

  showExplanation: "Show explanation ▼",
  hideExplanation: "Hide explanation ▲",

  viewOdds: "View Odds",

  seoTitle: "AI Betting Predictions",
  seoDescription:
    "AI-generated betting predictions and value bets across multiple sports.",

  sports: {
    topPicks: "Top Picks",
    football: "Football",
    nba: "NBA",
    nfl: "NFL",
    hockey: "Hockey",
    tennis: "Tennis",
    mlb: "MLB",
    mma: "MMA",
  },
};

/* =========================
   TRANSLATIONS
========================= */

export const translations: Record<Lang, Translation> = {
  en,

  hu: {
    ...en,

    heroTitle: "AI tippek",
    heroSubtitle: "AI-alapú fogadási elemzések",
    heroDesc: "AI által generált sport előrejelzések több sportágra.",
    heroImageAlt: "AI fogadási előrejelzések hero háttér",

    topPicks: "Top tippek",
    premiumOffers: "Prémium ajánlatok",
    premiumOffersDesc:
      "Ide kerülnek az affiliate bannerek és sportsbook ajánlatok.",
    recommendedSites: "Ajánlott fogadóirodák",
    recommendedSitesDesc:
      "Ajánlott fogadóirodák és affiliate ajánlatok.",

    noMatches: "Nincs elérhető mérkőzés",
    tbd: "Időpont nincs megadva",
    noExplanation: "Nincs elérhető magyarázat",

    valueBet: "🟢 VALUE BET",
    okBet: "🟡 OK BET",
    riskyBet: "🔴 KOCKÁZATOS",

    positiveEV: "Pozitív várható érték jelzés",
    negativeEV: "Negatív várható érték jelzés",

    showExplanation: "Magyarázat ▼",
    hideExplanation: "Magyarázat ▲",

    viewOdds: "Szorzók megtekintése",

    sports: {
      topPicks: "Top tippek",
      football: "Foci",
      nba: "NBA",
      nfl: "NFL",
      hockey: "Jégkorong",
      tennis: "Tenisz",
      mlb: "Baseball",
      mma: "MMA",
    },
  },

  de: en,
  fr: en,
  es: en,
  it: en,
  pt: en,
  ar: en,
  zh: en,
  ja: en,
  hi: en,
};