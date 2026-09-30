export const THREADS_CAPTION_MAX_LENGTH = 500;
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
] as const;

export type ThreadsCaptionValidationResult = {
  valid: boolean;
  length: number;
  errors: string[];
};

/**
 * Validates that a Threads video caption strictly satisfies all constraints:
 * - Length is between 1 and 500 characters
 * - Contains a link/CTA to MatchSignal
 * - Contains an 18+ and responsible gambling disclaimer
 * - Does not make prohibited or guaranteed profit claims
 */
export function validateThreadsCaption(
  caption: unknown
): ThreadsCaptionValidationResult {
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

  if (length > THREADS_CAPTION_MAX_LENGTH) {
    errors.push(
      `Threads caption exceeds maximum length of ${THREADS_CAPTION_MAX_LENGTH} characters (current: ${length})`
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
 * Transforms an input text, Instagram caption, Facebook message, or topic/voiceover
 * into a compliant, concise Threads caption strictly <= 500 characters.
 */
export function formatThreadsVideoCaption(params: {
  caption?: string;
  message?: string;
  topic?: string;
  voiceover?: string;
}): string {
  const rawInput =
    params.caption?.trim() ||
    params.message?.trim() ||
    (params.topic ? `${params.topic}. ${params.voiceover ?? ""}` : "") ||
    "Compare sports betting odds across top bookmakers with AI-assisted probability analysis.";

  // Strip wall of hashtags or bio links that don't apply to Threads
  let cleaned = rawInput
    .replace(/#\w+/g, "")
    .replace(/Link in bio/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  // Strip existing disclaimers if we will re-append the standardized one
  cleaned = cleaned
    .replace(/18\+\s*\|?\s*gamble responsibly[^\n.]*/gi, "")
    .replace(/for informational (?:purposes|analysis) only[^\n.]*/gi, "")
    .replace(/no (?:prediction )?guarantees?[^\n.]*/gi, "")
    .replace(/https?:\/\/[^\s]+/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  // Remove trailing punctuation before appending
  cleaned = cleaned.replace(/[.,;:\s]+$/, "");

  const cta = `\n\nCompare odds: ${MATCHSIGNAL_URL}\n\n${THREADS_DISCLAIMER}`;
  const budgetForBody = THREADS_CAPTION_MAX_LENGTH - cta.length;

  let body = cleaned;
  if (body.length > budgetForBody) {
    // Truncate cleanly at word boundary
    const truncated = body.slice(0, budgetForBody - 1);
    const lastSpace = truncated.lastIndexOf(" ");
    body = (lastSpace > 50 ? truncated.slice(0, lastSpace) : truncated) + "…";
  }

  const finalCaption = `${body}${cta}`;
  return finalCaption.trim();
}
