import {
  getGuideManifestEntry,
  getPublishedGuideManifest,
} from "@/app/lib/guides";
import type {
  GuideContent,
  GuideContentRegistry,
} from "@/app/lib/guideContent";
import howBettingOddsWork from "@/app/content/guides/en/how-betting-odds-work";
import impliedProbability from "@/app/content/guides/en/implied-probability";
import expectedValue from "@/app/content/guides/en/expected-value-sports-betting";
import bookmakerMargin from "@/app/content/guides/en/bookmaker-margin-overround";
import compareOdds from "@/app/content/guides/en/how-to-compare-betting-odds";
import oddsMove from "@/app/content/guides/en/why-betting-odds-move";
import varianceSportsBetting from "@/app/content/guides/en/variance-sports-betting";
import bankrollManagement from "@/app/content/guides/en/bankroll-management";
import flatStakes from "@/app/content/guides/en/flat-stakes-vs-percentage-staking";
import chasingLosses from "@/app/content/guides/en/why-chasing-losses-is-dangerous";
import cognitiveBiases from "@/app/content/guides/en/cognitive-biases-sports-betting";
import confirmationBias from "@/app/content/guides/en/confirmation-bias-betting";
import winningStreaks from "@/app/content/guides/en/winning-streaks-misleading";
import matchsignalValueEdge from "@/app/content/guides/en/matchsignal-value-edge";
import aiSportsBetting from "@/app/content/guides/en/ai-sports-betting-predictions";

export const GUIDE_CONTENT: GuideContentRegistry = {
  [howBettingOddsWork.slug]: howBettingOddsWork,
  [impliedProbability.slug]: impliedProbability,
  [expectedValue.slug]: expectedValue,
  [bookmakerMargin.slug]: bookmakerMargin,
  [compareOdds.slug]: compareOdds,
  [oddsMove.slug]: oddsMove,
  [varianceSportsBetting.slug]: varianceSportsBetting,
  [bankrollManagement.slug]: bankrollManagement,
  [flatStakes.slug]: flatStakes,
  [chasingLosses.slug]: chasingLosses,
  [cognitiveBiases.slug]: cognitiveBiases,
  [confirmationBias.slug]: confirmationBias,
  [winningStreaks.slug]: winningStreaks,
  [matchsignalValueEdge.slug]: matchsignalValueEdge,
  [aiSportsBetting.slug]: aiSportsBetting,
};

export function getPublishedGuides(): GuideContent[] {
  return getPublishedGuideManifest()
    .map((entry) => GUIDE_CONTENT[entry.slug])
    .filter((guide): guide is GuideContent => Boolean(guide));
}

export function getPublishedGuide(slug: string): GuideContent | undefined {
  const manifestEntry = getGuideManifestEntry(slug);
  if (!manifestEntry || manifestEntry.status !== "published") return undefined;

  const content = GUIDE_CONTENT[slug];
  if (!content || content.status !== "published") return undefined;

  return content;
}

export function hasPublicGuideContent(): boolean {
  return getPublishedGuides().length > 0;
}
