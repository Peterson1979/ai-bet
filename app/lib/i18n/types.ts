// app/i18n/types.ts

type MatchCardField = {
  title: string;
  desc: string;
};

type FooterTranslation = {
  betIntelligence: string;
  betIntelligenceDesc: string;
  matchCardGuideTitle: string;
  matchCardGuideDesc: string;
  matchCardFields: {
    prediction: MatchCardField;
    market: MatchCardField;
    bestPartnerOdds: MatchCardField;
    sportsbook: MatchCardField;
    estimatedValue: MatchCardField;
    marketAverage: MatchCardField;
    fairOdds: MatchCardField;
    fairProbability: MatchCardField;
    vsMarketAverage: MatchCardField;
    marketConsensus: MatchCardField;
    bookmakersTracked: MatchCardField;
    riskTier: MatchCardField;
    aiAnalysis: MatchCardField;
  };
  aiBettingInsights: string;
  aiBettingInsightsDesc: string;
  navAbout: string;
  navContact: string;
  navPrivacy: string;
  navTerms: string;
  navAffiliate: string;
  navResponsible: string;
  navCookie: string;
  platformName: string;
  builtWithAi: string;
};

type GlossaryEntry = {
  term: string;
  definition: string;
};
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
export type Translation = {
  heroTitle: string;
  heroSubtitle: string;
  heroDesc: string;
  faqPredictionQuestion: string;
  faqPredictionAnswer: string;
  faqFreeQuestion: string;
  faqFreeAnswer: string;

  heroImageAlt: string;
  sportPageTitle: string;
  sportPageDescription: string;

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
  compareAllOffers: string;
  affiliateDisclaimer: string;
  homepageNoPicksTitle: string;
  homepageNoPicksDesc: string;
  seoTitle: string;
  seoDescription: string;
  matchSignal: string;
  matchPreview: string;
  matchMarket: string;
  basedOnBookmakers: string;
  impliedProb: string;
  riskLow: string;
  riskMedium: string;
  riskHigh: string;
  valueSignalValue: string;
  valueSignalBelow: string;
  valueSignalFair: string;
  aiAnalysisLabel: string;
  contactTitle: string;
  contactSuccess: string;
  contactName: string;
  contactEmail: string;
  contactMessage: string;
  sending: string;
  send: string;
  contactError: string;
  consensusProb: string;
  consensusProbHint: string;
  viewAllPredictions: string;
  viewAllPredictionsSport: string;
  noEventsTodaySport: string;
  bestPartnerOdds: string;
  sportsbookLabel: string;
  marketAverage: string;
  fairProbability: string;
  vsMarketAverage: string;
  bookmakersTracked: string;
  whyThisSignal: string;
  marketInfoAriaLabel: string;
  closeMarketInfoAriaLabel: string;
  estimatedValue: string;

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

  system: {
    navHome: string;
    navTopPicks: string;
    navBetting: string;
    navNews: string;
    navTools: string;
    navGlossary: string;
  };

  common: {
    rating: string;
    visitSite: string;
    compareAllOffers: string;
  };

  featuredSportsbooks: {
    title: string;
    subtitle: string;
    seeAll: string;
  };

  topRatedSportsbooks: {
    title: string;
    compareAll: string;
    viewOffer: string;
  };

  stickyCta: {
    text: string;
  };

  bettingPage: {
    title: string;
    description: string;
    titleMainPrefix: string;
    titleMainHighlight: string;
    subtitle: string;
    recommended: string;
    partnerBadge?: string;
    siteDescription: string;
    claimBonus: string;
    visitSite: string;
    affiliateTitle: string;
    affiliateText: string;
  };

  sportNews: {
    title: string;
    description: string;
    titleMain: string;
    subtitle: string;
    sidebarTitle: string;
  };

  tools: {
    title: string;
    oddsConverter: string;
    oddsConverterDesc: string;
    fractional: string;
    american: string;
    implied: string;
    betCalculator: string;
    betCalculatorDesc: string;
    stake: string;
    odds: string;
    profit: string;
    return: string;
    bankroll: string;
    kelly: string;
    winPercent: string;
    recommendedStake: string;
    valueFinder: string;
    fairOdds: string;
    bookOdds: string;
  };

  footer: FooterTranslation;

  glossary: {
    pageTitle: string;
    pageSubtitle: string;
    learnMore: string;
    tooltipLearnMore: string;
    markets: {
      doubleChance: GlossaryEntry;
      drawNoBet: GlossaryEntry;
      homeWin: GlossaryEntry;
      awayWin: GlossaryEntry;
      matchWinner: GlossaryEntry;
      moneyline: GlossaryEntry;
      over15: GlossaryEntry;
      under45: GlossaryEntry;
      over45: GlossaryEntry;
      under75: GlossaryEntry;
      over185Games: GlossaryEntry;
      under305Games: GlossaryEntry;
      playerToWinSet: GlossaryEntry;
      handicapGames: GlossaryEntry;
      over1495Points: GlossaryEntry;
      under1795Points: GlossaryEntry;
      over335Points: GlossaryEntry;
      under545Points: GlossaryEntry;
      over75Runs: GlossaryEntry;
      under95Runs: GlossaryEntry;
      teamTotalOver: GlossaryEntry;
      teamTotalUnder: GlossaryEntry;
      teamTotalOver15: GlossaryEntry;
      runLine: GlossaryEntry;
      methodOfVictory: GlossaryEntry;
      over25Rounds: GlossaryEntry;
      under25Rounds: GlossaryEntry;
    };
    quickNote: {
      title: string;
      text: string;
    };
  };

  sportGuide: {
    overviewTitle: string;
    overviewDesc: string;
    marketsTitle: string;
    marketsDesc: string;
    signalsTitle: string;
    signalsDesc: string;
    toolsTitle: string;
    toolsDesc: string;
    noMatchesTitle: string;
    noMatchesDesc: string;
  };
};