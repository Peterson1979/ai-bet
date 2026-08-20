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

// Case A: a valid analytical candidate publishes without an affiliate offer.
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

const noPartnerCard = toMatchCardData(cardInput(), "Football");
assert.equal(noPartnerCard.partnerOffer, undefined);
assert.equal(noPartnerCard.partnerOdds, null);
assert.equal(noPartnerCard.bookmakerUrl, null);
const noPartnerMarkup = renderToStaticMarkup(<MatchCard data={noPartnerCard} lang="en" />);
assert.match(noPartnerMarkup, /Best tracked odds/i);
assert.doesNotMatch(noPartnerMarkup, /Partner Sportsbook/i);
assert.doesNotMatch(noPartnerMarkup, /target="_blank"/i);

// Case B: an exact matching partner offer remains available as an optional CTA.
const exactPartnerBooks = [
  bookmaker("Pinnacle", 2.1),
  bookmaker("Unibet", 2.02),
  bookmaker("BetOnline", 1.95),
];
const exactPartnerOffer = getPartnerOddsForCandidate(
  exactPartnerBooks,
  candidate,
  "Football"
);
assert.equal(exactPartnerOffer.bookmaker, "BetOnline");
assert.equal(exactPartnerOffer.odds, 1.95);

const partnerCard = toMatchCardData(
  cardInput({
    partnerOdds: exactPartnerOffer.odds,
    partnerBookmaker: exactPartnerOffer.bookmaker,
    partnerRating: exactPartnerOffer.rating,
    bookmakerUrl: getExactBookmakerAffiliateUrl("BetOnline"),
    ctaLabel: "View Offer",
  }),
  "Football"
);
assert.equal(partnerCard.bestOdds, 2.1);
assert.equal(partnerCard.partnerOdds, 1.95);
assert.equal(partnerCard.partnerOffer?.bookmakerName, "BetOnline");
const partnerMarkup = renderToStaticMarkup(<MatchCard data={partnerCard} lang="en" />);
assert.match(partnerMarkup, /BetOnline/i);
assert.match(partnerMarkup, /1\.95/);
assert.match(partnerMarkup, /target="_blank"/i);
const hungarianPartnerMarkup = renderToStaticMarkup(
  <MatchCard data={partnerCard} lang="hu" countryCode="HU" />
);
assert.doesNotMatch(hungarianPartnerMarkup, /target="_blank"/i);

// Case C: a partner on the event but not the selected outcome creates no CTA.
const wrongSelectionBooks = [
  bookmaker("Pinnacle", 2.1),
  bookmaker("Unibet", 2.02),
  bookmaker("Betfair", 2.0),
  bookmaker("BetOnline", undefined, 1.9),
];
const wrongSelectionOffer = getPartnerOddsForCandidate(
  wrongSelectionBooks,
  candidate,
  "Football"
);
assert.equal(evaluate(getBestOddsForCandidate(wrongSelectionBooks, candidate).bestOdds).eligible, true);
assert.equal(wrongSelectionOffer.bookmaker, null);
assert.equal(wrongSelectionOffer.odds, null);

// Case D: bookmaker depth remains a hard production gate.
assert.deepEqual(evaluate(2.1, 2), { eligible: false, reason: "bookmaker_depth" });

// Case E: non-positive EV at the best tracked price remains a hard gate.
assert.deepEqual(evaluate(2.0, 3, 40), {
  eligible: false,
  reason: "non_positive_value",
});

// Case F: worse partner odds do not alter analytical EV or eligibility.
const bestPriceDecision = evaluate(2.1, 3, 52);
assert.equal(bestPriceDecision.eligible, true);
if (!bestPriceDecision.eligible) throw new Error("Expected positive best-price decision");
assert.equal(bestPriceDecision.bestOdds, 2.1);
assert.ok(bestPriceDecision.estimatedValuePct > 0);
assert.ok(52 * 1.8 - 100 <= 0, "The separate partner price is deliberately worse");

// Social selection accepts an analytical pick without a sportsbook URL.
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

// Focused static guards cover the route wiring that cannot be invoked without paid data.
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

console.log("Prediction/affiliate decoupling tests: PASS (Cases A-F + social no-link eligibility)");
