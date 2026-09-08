import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";

import MatchCard from "../app/components/MatchCard";
import { getExactBookmakerAffiliateUrl } from "../app/lib/affiliates";
import { toMatchCardData } from "../app/lib/domain/matchMapper";
import {
  getBestOddsForCandidate,
  getPartnerOddsForCandidate,
  type MarketCandidate,
  DEFAULT_ODDS_REGIONS,
  getOddsRegionMultiplier,
  calculateOddsCreditCost,
} from "../app/lib/odds";
import { evaluatePredictionEligibility } from "../app/lib/predictionEligibility";
import { selectPick } from "../app/lib/social/select-pick";
import { isEligibleForSocialCarousel } from "../app/lib/social/social-score";
import type { PredictionFile, TopPick } from "../app/lib/social/types";
import { LANGS, translations } from "../app/lib/i18n";

const candidate: MarketCandidate = {
  id: "event-1::h2h|Alpha|none",
  eventId: "event-1",
  apiMarketKey: "h2h",
  market: "Match Winner (1X2)",
  prediction: "Alpha",
  outcomeName: "Alpha",
  point: null,
  bookmakerCount: 3,
  consensusImpliedProb: 50,
};

function bookmaker(title: string, alphaOdds?: number, betaOdds = 1.8) {
  return {
    title,
    markets: [
      {
        key: "h2h",
        outcomes: [
          ...(typeof alphaOdds === "number" ? [{ name: "Alpha", price: alphaOdds }] : []),
          { name: "Beta", price: betaOdds },
        ],
      },
    ],
  };
}

function bookmakerWithLine(
  title: string,
  marketKey: string,
  outcomeName: string,
  price?: number,
  point?: number | null
) {
  return {
    title,
    markets: [
      {
        key: marketKey,
        outcomes: [
          ...(typeof price === "number"
            ? [{ name: outcomeName, price, ...(typeof point === "number" ? { point } : {}) }]
            : []),
        ],
      },
    ],
  };
}


function evaluate(bestOdds: number | null, bookmakerCount = 3, marketConsensus = 50) {
  return evaluatePredictionEligibility({
    bestOdds,
    marketAverageOdds: 1.95,
    marketConsensus,
    aiFairProbability: marketConsensus,
    bookmakerCount,
  });
}

function cardInput(overrides: Record<string, unknown> = {}) {
  return {
    id: "event-1-Alpha-Beta",
    eventId: "event-1",
    sport: "Football",
    league: "Test League",
    homeTeam: "Alpha",
    awayTeam: "Beta",
    startTime: "2099-08-21T18:00:00.000Z",
    status: "scheduled" as const,
    market: candidate.market,
    prediction: candidate.prediction,
    reasoning: "Test reasoning",
    riskTier: "Medium" as const,
    bestOdds: 2.1,
    impliedProbability: 47.6,
    consensusImpliedProb: 50,
    valueDiff: 4.4,
    bookmakerCount: 3,
    bookmaker: "Pinnacle",
    fairProbability: 52,
    estimatedValuePct: 9.2,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// TEST 1: Real-world Odds API Title and Key Matching (Requirements A, B, C)
// ---------------------------------------------------------------------------

// A) BetOnline.ag in Odds API matches BetOnline affiliate site (both title & key)
const betOnlineOffer = getPartnerOddsForCandidate(
  [bookmaker("BetOnline.ag", 1.95)],
  candidate,
  "Football"
);
assert.equal(betOnlineOffer.bookmaker, "BetOnline");
assert.equal(betOnlineOffer.odds, 1.95);

const betOnlineKeyOffer = getPartnerOddsForCandidate(
  [{ key: "betonlineag", title: "Unrecognized Title", markets: [{ key: "h2h", outcomes: [{ name: "Alpha", price: 1.96 }] }] }],
  candidate,
  "Football"
);
assert.equal(betOnlineKeyOffer.bookmaker, "BetOnline");
assert.equal(betOnlineKeyOffer.odds, 1.96);

// B) MyBookie.ag in Odds API matches MyBookie affiliate site (both title & key)
const myBookieOffer = getPartnerOddsForCandidate(
  [bookmaker("MyBookie.ag", 1.92)],
  candidate,
  "Football"
);
assert.equal(myBookieOffer.bookmaker, "MyBookie");
assert.equal(myBookieOffer.odds, 1.92);

const myBookieKeyOffer = getPartnerOddsForCandidate(
  [{ key: "mybookieag", title: "Unrecognized Title", markets: [{ key: "h2h", outcomes: [{ name: "Alpha", price: 1.93 }] }] }],
  candidate,
  "Football"
);
assert.equal(myBookieKeyOffer.bookmaker, "MyBookie");
assert.equal(myBookieKeyOffer.odds, 1.93);

// C) SportsBetting.ag in Odds API matches SportsBetting.ag affiliate site (both title & key)
const sportsBettingOffer = getPartnerOddsForCandidate(
  [bookmaker("SportsBetting.ag", 1.94)],
  candidate,
  "Football"
);
assert.equal(sportsBettingOffer.bookmaker, "SportsBetting.ag");
assert.equal(sportsBettingOffer.odds, 1.94);

const sportsBettingKeyOffer = getPartnerOddsForCandidate(
  [{ key: "sportsbettingag", title: "Unrecognized Title", markets: [{ key: "h2h", outcomes: [{ name: "Alpha", price: 1.97 }] }] }],
  candidate,
  "Football"
);
assert.equal(sportsBettingKeyOffer.bookmaker, "SportsBetting.ag");
assert.equal(sportsBettingKeyOffer.odds, 1.97);

// ---------------------------------------------------------------------------
// TEST 2: Multiple Affiliate Bookmakers on Exact Selection (Requirement D)
// ---------------------------------------------------------------------------
// Case 1: BetOnline = 1.90, MyBookie = 2.05 -> MyBookie must be selected as best odds
const multiPartnerBooks = [
  bookmaker("Pinnacle", 2.2),
  bookmaker("BetOnline.ag", 1.9),
  bookmaker("MyBookie.ag", 2.05),
];
const multiPartnerOffer = getPartnerOddsForCandidate(
  multiPartnerBooks,
  candidate,
  "Football"
);
assert.equal(multiPartnerOffer.bookmaker, "MyBookie");
assert.equal(multiPartnerOffer.odds, 2.05);

// Case 2: BetOnline = 2.10, MyBookie = 1.95 -> BetOnline must be selected as best odds
const multiPartnerBooksInverted = [
  bookmaker("Pinnacle", 2.2),
  bookmaker("BetOnline.ag", 2.1),
  bookmaker("MyBookie.ag", 1.95),
];
const multiPartnerOfferInverted = getPartnerOddsForCandidate(
  multiPartnerBooksInverted,
  candidate,
  "Football"
);
assert.equal(multiPartnerOfferInverted.bookmaker, "BetOnline");
assert.equal(multiPartnerOfferInverted.odds, 2.1);

// ---------------------------------------------------------------------------
// TEST 3: Exact Line / Point Matching Requirement (Requirement E)
// ---------------------------------------------------------------------------
const candidateTotals: MarketCandidate = {
  id: "event-2::totals|Over|2.5",
  eventId: "event-2",
  apiMarketKey: "totals",
  market: "Over/Under Goals",
  prediction: "Over 2.5",
  outcomeName: "Over",
  point: 2.5,
  bookmakerCount: 3,
  consensusImpliedProb: 52,
};

// Line mismatch: candidate is Over 2.5, but affiliate offers Over 3.5 -> NO MATCH
const lineMismatchOffer = getPartnerOddsForCandidate(
  [bookmakerWithLine("BetOnline.ag", "totals", "Over", 2.4, 3.5)],
  candidateTotals,
  "Football"
);
assert.equal(lineMismatchOffer.bookmaker, null);
assert.equal(lineMismatchOffer.odds, null);

// Outcome name mismatch: candidate is Over, affiliate offers Under -> NO MATCH
const outcomeMismatchOffer = getPartnerOddsForCandidate(
  [bookmakerWithLine("BetOnline.ag", "totals", "Under", 1.95, 2.5)],
  candidateTotals,
  "Football"
);
assert.equal(outcomeMismatchOffer.bookmaker, null);
assert.equal(outcomeMismatchOffer.odds, null);

// Exact line match: candidate is Over 2.5, affiliate offers Over 2.5 -> MATCH
const lineMatchOffer = getPartnerOddsForCandidate(
  [bookmakerWithLine("BetOnline.ag", "totals", "Over", 1.88, 2.5)],
  candidateTotals,
  "Football"
);
assert.equal(lineMatchOffer.bookmaker, "BetOnline");
assert.equal(lineMatchOffer.odds, 1.88);

// Spread line mismatch: candidate is Spread Home +1.5, affiliate offers Spread Home +2.5 -> NO MATCH
const candidateSpread: MarketCandidate = {
  id: "event-3::spreads|Alpha|1.5",
  eventId: "event-3",
  apiMarketKey: "spreads",
  market: "Spread",
  prediction: "Alpha +1.5",
  outcomeName: "Alpha",
  point: 1.5,
  bookmakerCount: 3,
  consensusImpliedProb: 53,
};

const spreadMismatchOffer = getPartnerOddsForCandidate(
  [bookmakerWithLine("BetOnline.ag", "spreads", "Alpha", 1.95, 2.5)],
  candidateSpread,
  "NBA"
);
assert.equal(spreadMismatchOffer.bookmaker, null);
assert.equal(spreadMismatchOffer.odds, null);

const spreadMatchOffer = getPartnerOddsForCandidate(
  [bookmakerWithLine("BetOnline.ag", "spreads", "Alpha", 1.92, 1.5)],
  candidateSpread,
  "NBA"
);
assert.equal(spreadMatchOffer.bookmaker, "BetOnline");
assert.equal(spreadMatchOffer.odds, 1.92);

// ---------------------------------------------------------------------------
// TEST 4: Non-Affiliate Market Best vs Affiliate Best (Requirement F)
// ---------------------------------------------------------------------------
// Pinnacle = 2.20, BetOnline.ag = 2.00 -> Market Best = Pinnacle 2.20, Affiliate CTA = BetOnline 2.00
const marketBestVsAffiliateBooks = [
  bookmaker("Pinnacle", 2.2),
  bookmaker("Unibet", 2.05),
  bookmaker("BetOnline.ag", 2.0),
];
const marketBest = getBestOddsForCandidate(marketBestVsAffiliateBooks, candidate);
const affiliateBest = getPartnerOddsForCandidate(
  marketBestVsAffiliateBooks,
  candidate,
  "Football"
);
assert.equal(marketBest.bestOdds, 2.2);
assert.equal(marketBest.bestBookmaker, "Pinnacle");
assert.equal(affiliateBest.odds, 2.0);
assert.equal(affiliateBest.bookmaker, "BetOnline");

const splitCard = toMatchCardData(
  cardInput({
    bestOdds: marketBest.bestOdds,
    bookmaker: marketBest.bestBookmaker,
    partnerOdds: affiliateBest.odds,
    partnerBookmaker: affiliateBest.bookmaker,
    partnerRating: affiliateBest.rating,
    bookmakerUrl: getExactBookmakerAffiliateUrl("BetOnline"),
    ctaLabel: "View Offer",
  }),
  "Football"
);
assert.equal(splitCard.bestOdds, 2.2);
assert.equal(splitCard.partnerOdds, 2.0);
assert.equal(splitCard.partnerOffer?.bookmakerName, "BetOnline");
const splitMarkup = renderToStaticMarkup(<MatchCard data={splitCard} lang="en" />);
assert.match(splitMarkup, /Best Tracked Odds/i);
assert.match(splitMarkup, /2\.20/);
assert.match(splitMarkup, /View odds — BetOnline \(2\.00\)/i);
assert.match(splitMarkup, /target="_blank"/i);

// ---------------------------------------------------------------------------
// TEST 5: No Affiliate Bookmaker (Requirement G)
// ---------------------------------------------------------------------------
// Prediction remains publishable analytically, but NO affiliate CTA is rendered
const noPartnerBooks = [
  bookmaker("Pinnacle", 2.1),
  bookmaker("Unibet", 2.02),
  bookmaker("Betfair", 2.0),
];
const noPartnerBest = getBestOddsForCandidate(noPartnerBooks, candidate);
const noPartnerOffer = getPartnerOddsForCandidate(noPartnerBooks, candidate, "Football");
const noPartnerEligibility = evaluate(noPartnerBest.bestOdds);
assert.equal(noPartnerEligibility.eligible, true);
assert.equal(noPartnerOffer.bookmaker, null);
assert.equal(noPartnerOffer.odds, null);

const noPartnerCard = toMatchCardData(cardInput(), "Football");
assert.equal(noPartnerCard.partnerOffer, undefined);
assert.equal(noPartnerCard.partnerOdds, null);
assert.equal(noPartnerCard.bookmakerUrl, null);
const noPartnerMarkup = renderToStaticMarkup(<MatchCard data={noPartnerCard} lang="en" />);
assert.match(noPartnerMarkup, /Best Tracked Odds/i);
assert.match(noPartnerMarkup, /2\.10/);
assert.doesNotMatch(noPartnerMarkup, /target="_blank"/i);
assert.match(noPartnerMarkup, /Compare all offers →/i);

// ---------------------------------------------------------------------------
// TEST 6: Consistency Across Selected Partner Data (Requirement H)
// ---------------------------------------------------------------------------
// When MyBookie is chosen, name, odds, and tracking URL must strictly belong to MyBookie
const myBookieUrl = getExactBookmakerAffiliateUrl("MyBookie");
assert.ok(myBookieUrl !== null);
assert.match(myBookieUrl!, /webpartners\.co/);

const consistentCard = toMatchCardData(
  cardInput({
    bestOdds: 2.2,
    partnerOdds: multiPartnerOffer.odds,
    partnerBookmaker: multiPartnerOffer.bookmaker,
    partnerRating: multiPartnerOffer.rating,
    bookmakerUrl: myBookieUrl,
    ctaLabel: "View Offer",
  }),
  "Football"
);
assert.equal(consistentCard.partnerOffer?.bookmakerName, "MyBookie");
assert.equal(consistentCard.partnerOffer?.odds, 2.05);
assert.equal(consistentCard.partnerOffer?.trackingUrl, myBookieUrl);
const consistentMarkup = renderToStaticMarkup(<MatchCard data={consistentCard} lang="en" />);
assert.match(consistentMarkup, /View odds — MyBookie \(2\.05\)/i);
assert.match(consistentMarkup, /webpartners\.co/);
assert.doesNotMatch(consistentMarkup, /betonlineaffiliates/);

// ---------------------------------------------------------------------------
// TEST 7: Hard Analytical Gates Remain Active (Decoupling Invariants)
// ---------------------------------------------------------------------------
// Bookmaker depth gate (< 3)
assert.deepEqual(evaluate(2.1, 2), { eligible: false, reason: "bookmaker_depth" });

// Non-positive EV gate
assert.deepEqual(evaluate(2.0, 3, 40), {
  eligible: false,
  reason: "non_positive_value",
});

// Worse partner odds do not alter analytical eligibility or EV
const bestPriceDecision = evaluate(2.1, 3, 52);
assert.equal(bestPriceDecision.eligible, true);
if (!bestPriceDecision.eligible) throw new Error("Expected positive best-price decision");
assert.equal(bestPriceDecision.bestOdds, 2.1);
assert.ok(bestPriceDecision.estimatedValuePct > 0);

// ---------------------------------------------------------------------------
// TEST 8: Hungarian Locale Affiliate Suppression Invariant
// ---------------------------------------------------------------------------
const hungarianMarkup = renderToStaticMarkup(
  <MatchCard data={consistentCard} lang="hu" countryCode="HU" />
);
assert.doesNotMatch(hungarianMarkup, /target="_blank"/i);

// ---------------------------------------------------------------------------
// TEST 9: Social Selection Invariant
// ---------------------------------------------------------------------------
const socialPick: TopPick = {
  ...cardInput(),
  bookmakerUrl: null,
  ctaLabel: null,
} as TopPick;
const socialData: PredictionFile = {
  date: "2099-08-21",
  generatedAt: "2099-08-20T00:00:00.000Z",
  sports: [{ sport: "Football", hasMatches: true, topPicks: [socialPick] }],
};
const socialNow = new Date("2099-08-20T12:00:00.000Z");
assert.equal(selectPick(socialData, socialNow)?.id, socialPick.id);
assert.equal(isEligibleForSocialCarousel(socialPick, socialNow), true);

// ---------------------------------------------------------------------------
// TEST 10: Static Route Guards
// ---------------------------------------------------------------------------
const dailyRoute = readFileSync("app/api/daily-run/route.ts", "utf8");
const matchCardSource = readFileSync("app/components/MatchCard.tsx", "utf8");
const affiliateInjection = readFileSync("app/lib/affiliateInject.ts", "utf8");
const homePageSource = readFileSync("app/[lang]/page.tsx", "utf8");
assert.match(dailyRoute, /candidate\.id === ai\.candidateId/);
assert.match(dailyRoute, /bookmakerCount < MIN_PRODUCTION_BOOKMAKERS/);
assert.match(dailyRoute, /bestOdds: marketBestOdds/);
assert.match(dailyRoute, /partnerOdds: hasAffiliateMatch \? partnerOdds : null/);
assert.match(dailyRoute, /affiliateMatchMissing \+= 1/);
assert.doesNotMatch(dailyRoute, /bestOdds:\s*partnerOdds/);
assert.doesNotMatch(dailyRoute, /getBookmakerAffiliateUrl/);
assert.doesNotMatch(matchCardSource, /data\.partnerOdds \?\? data\.bestOdds/);
assert.doesNotMatch(affiliateInjection, /getMatchCardUrl/);
assert.match(homePageSource, /countryCode = lang === "hu" \? "HU" : undefined/);
assert.equal(LANGS.length, 11);
for (const lang of LANGS) {
  assert.ok(translations[lang].bestTrackedOdds.trim().length > 0);
}

// ---------------------------------------------------------------------------
// TEST 11: Multi-Region Credit Multiplier Invariants
// ---------------------------------------------------------------------------
assert.equal(DEFAULT_ODDS_REGIONS, "eu,us");
assert.equal(getOddsRegionMultiplier("eu,us"), 2);
assert.equal(getOddsRegionMultiplier("eu"), 1);
assert.equal(getOddsRegionMultiplier("us"), 1);
assert.equal(getOddsRegionMultiplier("eu,us,uk"), 3);
assert.equal(calculateOddsCreditCost(1, "eu,us"), 2);
assert.equal(calculateOddsCreditCost(2, "eu,us"), 4);
assert.equal(calculateOddsCreditCost(3, "eu,us"), 6);
assert.equal(calculateOddsCreditCost(1, "eu"), 1);

console.log(
  "Prediction/affiliate decoupling & affiliate-best-odds tests: ALL PASS (Tests 1-11)"
);
