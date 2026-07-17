import {
  getBookmakerScore,
  getLeaguePriority,
  getOddsScore,
  getRiskTierScore,
  MAX_CAROUSEL_PICKS,
  MIN_BOOKMAKERS,
  MIN_START_BUFFER_MINUTES,
  SOCIAL_SCORE_WEIGHTS,
} from "./social-score-config";

type PredictionLike = {
  id?: string;
  eventId?: string;
  sport?: string;
  league?: string;
  homeTeam?: string;
  awayTeam?: string;
  startTime?: string;
  market?: string;
  prediction?: string;
  reasoning?: string;
  riskTier?: string;
  bestOdds?: number;
  valueDiff?: number;
  bookmakerCount?: number;
  bookmakerUrl?: string;
  status?: string;
};

export type ScoredPrediction<T extends PredictionLike = PredictionLike> = T & {
  socialScore: number;
  socialScoreBreakdown: {
    valueDiff: number;
    leaguePriority: number;
    riskTierScore: number;
    oddsScore: number;
    bookmakerScore: number;
  };
};

export function isEligibleForSocialCarousel(
  pick: PredictionLike,
  now = new Date()
): boolean {
  if (!pick) return false;
  if ((pick.status ?? "").toLowerCase() !== "scheduled") return false;
  if (!pick.prediction) return false;
  if (!pick.bookmakerUrl) return false;
  if ((pick.bookmakerCount ?? 0) < MIN_BOOKMAKERS) return false;
  if ((pick.valueDiff ?? 0) <= 0) return false;
  if (!pick.startTime) return false;

  const start = new Date(pick.startTime);
  if (Number.isNaN(start.getTime())) return false;

  const minStart = new Date(now.getTime() + MIN_START_BUFFER_MINUTES * 60 * 1000);
  if (start < minStart) return false;

  return true;
}

export function calculateSocialScore<T extends PredictionLike>(pick: T): ScoredPrediction<T> {
  const valueDiff = pick.valueDiff ?? 0;
  const leaguePriority = getLeaguePriority(pick.league);
  const riskTierScore = getRiskTierScore(pick.riskTier);
  const oddsScore = getOddsScore(pick.bestOdds);
  const bookmakerScore = getBookmakerScore(pick.bookmakerCount);

  const socialScore =
    valueDiff * SOCIAL_SCORE_WEIGHTS.valueDiff +
    leaguePriority * SOCIAL_SCORE_WEIGHTS.leaguePriority +
    riskTierScore * SOCIAL_SCORE_WEIGHTS.riskTier +
    oddsScore * SOCIAL_SCORE_WEIGHTS.oddsScore +
    bookmakerScore * SOCIAL_SCORE_WEIGHTS.bookmakerScore;

  return {
    ...pick,
    socialScore,
    socialScoreBreakdown: {
      valueDiff,
      leaguePriority,
      riskTierScore,
      oddsScore,
      bookmakerScore,
    },
  };
}

function getTeamKeys(pick: PredictionLike): string[] {
  return [pick.homeTeam, pick.awayTeam]
    .filter(Boolean)
    .map((team) => team!.trim().toLowerCase());
}

function hasTeamConflict(
  pick: PredictionLike,
  usedTeams: Set<string>
): boolean {
  return getTeamKeys(pick).some((team) => usedTeams.has(team));
}

function markTeamsAsUsed(
  pick: PredictionLike,
  usedTeams: Set<string>
): void {
  for (const team of getTeamKeys(pick)) {
    usedTeams.add(team);
  }
}

export function selectSocialCarouselPicks<T extends PredictionLike>(
  picks: T[],
  now = new Date()
): ScoredPrediction<T>[] {
  const eligible = picks
    .filter((pick) => isEligibleForSocialCarousel(pick, now))
    .map((pick) => calculateSocialScore(pick))
    .sort((a, b) => b.socialScore - a.socialScore);

  const selected: ScoredPrediction<T>[] = [];
  const usedSports = new Set<string>();
  const usedTeams = new Set<string>();

  for (const pick of eligible) {
    const sportKey = (pick.sport ?? "unknown").trim().toLowerCase();
    if (usedSports.has(sportKey)) continue;
    if (hasTeamConflict(pick, usedTeams)) continue;

    selected.push(pick);
    usedSports.add(sportKey);
    markTeamsAsUsed(pick, usedTeams);

    if (selected.length >= MAX_CAROUSEL_PICKS) {
      return selected;
    }
  }

  for (const pick of eligible) {
    const alreadySelected = selected.some((item) => {
      if (item.eventId && pick.eventId) return item.eventId === pick.eventId;
      if (item.id && pick.id) return item.id === pick.id;
      return false;
    });

    if (alreadySelected) continue;
    if (hasTeamConflict(pick, usedTeams)) continue;

    selected.push(pick);
    markTeamsAsUsed(pick, usedTeams);

    if (selected.length >= MAX_CAROUSEL_PICKS) {
      break;
    }
  }

  return selected;
}