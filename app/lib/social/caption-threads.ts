import type { TopPick } from "./types";

export const THREADS_PREDICTION_MAX_LENGTH = 500;
export const MATCHSIGNAL_URL = "https://www.matchsignal.pro";
export const THREADS_DISCLAIMER = "18+ | Gamble responsibly | Analysis, not guarantees.";

const PROHIBITED_CLAIMS = [
  /\breal[- ]time odds\b/i,
  /\blive odds\b/i,
  /\bguaranteed win\b/i,
  /\bguaranteed profit\b/i,
  /\bguaranteed returns?\b/i,
  /\brisk[- ]free(?: betting)?\b/i,
  /\bsure bet\b/i,
  /\bcertain winner\b/i,
  /\bcannot lose\b/i,
  /\bguaranteed outcome\b/i,
  /\b100%\s*(?:win|guarantee)\b/i,
  /\block of the day\b/i,
  /\bcan't lose\b/i,
] as const;

export type ThreadsPredictionCaptionValidationResult = {
  valid: boolean;
  length: number;
  errors: string[];
};

/**
 * Validates that a Threads prediction caption strictly satisfies all constraints:
 * - Length between 1 and 500 characters
 * - Contains MatchSignal branding and website CTA URL
 * - Contains 18+ and responsible gambling disclaimers
 * - Free of prohibited guaranteed-win or real-time odds claims
 */
export function validateThreadsPredictionCaption(
  caption: unknown
): ThreadsPredictionCaptionValidationResult {
  const errors: string[] = [];

  if (typeof caption !== "string") {
    return {
      valid: false,
      length: 0,
      errors: ["Threads caption must be a string"],
    };
  }

  const trimmed = caption.trim();
  const length = trimmed.length;

  if (length === 0) {
    errors.push("Threads caption is required and cannot be empty");
  }

  if (length > THREADS_PREDICTION_MAX_LENGTH) {
    errors.push(
      `Threads caption exceeds maximum length of ${THREADS_PREDICTION_MAX_LENGTH} characters (current: ${length})`
    );
  }

  if (!/matchsignal(?:\.pro)?/i.test(trimmed)) {
    errors.push("Threads caption must mention MatchSignal or include a matchsignal.pro link");
  }

  if (!/(?:^|\D)18\+/i.test(trimmed) || !/gamble responsibly/i.test(trimmed)) {
    errors.push("Threads caption must include '18+' and 'Gamble responsibly' disclaimers");
  }

  for (const pattern of PROHIBITED_CLAIMS) {
    if (pattern.test(trimmed)) {
      errors.push(`Threads caption contains prohibited claim matching ${pattern}`);
    }
  }

  return {
    valid: errors.length === 0,
    length,
    errors,
  };
}

/**
 * Formats top prediction picks into a concise, readable Threads post caption
 * strictly within 500 characters with MatchSignal CTA and 18+ disclaimers.
 */
export function generateThreadsPredictionCaption(picks: TopPick[]): string {
  const validPicks = (Array.isArray(picks) ? picks : [])
    .filter((p) => Boolean(p && p.homeTeam && p.awayTeam && p.prediction))
    .slice(0, 3);

  const header = "MatchSignal AI Sports Betting Picks 🎯";
  const cta = `\n\nCompare odds across sportsbooks with MatchSignal AI probability analysis:\n${MATCHSIGNAL_URL}\n\n${THREADS_DISCLAIMER}`;

  const availableLengthForPicks =
    THREADS_PREDICTION_MAX_LENGTH - header.length - cta.length - 2;

  const pickLines: string[] = [];
  for (let i = 0; i < validPicks.length; i++) {
    const pick = validPicks[i];
    const odds = pick.bestOdds ?? pick.partnerOdds;
    const valueEdge = pick.estimatedValuePct ?? pick.valueDiff;
    const edgeStr =
      typeof valueEdge === "number" && valueEdge > 0
        ? ` +${valueEdge.toFixed(1)}% edge`
        : "";
    const oddsStr =
      typeof odds === "number"
        ? ` (@ ${odds.toFixed(2)}${edgeStr ? `,${edgeStr}` : ""})`
        : edgeStr
        ? ` (${edgeStr.trim()})`
        : "";

    const line = `${i + 1}. ${pick.homeTeam} vs ${pick.awayTeam}\nPick: ${pick.prediction}${oddsStr}`;
    pickLines.push(line);
  }

  let picksText = pickLines.join("\n\n");

  if (picksText.length > availableLengthForPicks) {
    // If multiple picks exceed character limit, fallback to primary pick summary with CTA
    const primary = validPicks[0];
    if (primary) {
      const odds = primary.bestOdds ?? primary.partnerOdds;
      const oddsStr = typeof odds === "number" ? ` | Odds: ${odds.toFixed(2)}` : "";
      picksText = `${primary.homeTeam} vs ${primary.awayTeam}\nAI Pick: ${primary.prediction}${oddsStr}`;
      if (validPicks.length > 1) {
        picksText += `\n+ ${validPicks.length - 1} more top value picks on site`;
      }
    }
  }

  const finalCaption = `${header}\n\n${picksText}${cta}`;
  return finalCaption.trim();
}
