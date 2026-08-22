import {
  VIDEO_COPY_PROMPT_VERSION,
  VIDEO_COPY_TARGET_IDS,
  type CopyValidationIssue,
  type VideoContentInput,
} from "./content-types";

const MATCHSIGNAL_PERMANENT_CONTEXT = `
PRODUCT: MatchSignal is a free, no-registration AI-assisted sports betting analysis platform, not a sportsbook and does not accept bets. It compares regularly refreshed odds from multiple sportsbooks with market-based probability analysis and concise AI explanations. It may show selections/markets, partner odds, estimated value and fair probability, market averages, bookmaker coverage, and Low/Medium/High Risk tiers. A Value Signal estimates potential positive expected value; it never guarantees a win, profit, or outcome. Supported sports: Football, NBA, NFL, Hockey, Tennis, MLB, MMA. It also offers Betting Guides, free calculators/tools, and a Betting Glossary.

OBJECTIVE: Drive qualified traffic to https://www.matchsignal.pro and exploration of its comparison/analysis; never include direct sportsbook affiliate URLs. Write English only.

COMPLIANCE: Never use "real-time odds", "real time odds", or "live odds". Never imply guaranteed win/profit/returns/outcome, risk-free betting, sure bet, certain winner, cannot lose, future knowledge, infallible AI, fixed odds, that MatchSignal is a bookmaker, or that bets are placed on MatchSignal. Use may, compare, estimate, analysis, potential value, available odds/prices. Every post needs a natural, varied disclaimer containing 18+, Gamble responsibly/Responsible gambling, and an informational/no-guarantee/odds-can-change qualifier.

INSTAGRAM (${VIDEO_COPY_TARGET_IDS.instagram.join(", ")}): exactly two meaningfully distinct captions. Each needs a unique hook/structure, at least 180 substantive body characters excluding CTA/disclaimer/hashtags, a video-specific MatchSignal benefit, exact "Link in bio", its own disclaimer, at least five relevant English hashtags, and at most 2,200 total characters.

FACEBOOK (${VIDEO_COPY_TARGET_IDS.facebook.join(", ")}): exactly two meaningfully distinct, fully developed posts. Each needs at least 220 substantive body characters excluding URL/disclaimer, a unique video-specific angle, clear MatchSignal benefit, exact https://www.matchsignal.pro, and its own disclaimer. No fragments, placeholders, or URL/disclaimer-only copy.

OWNERSHIP: Copy belongs only to its exact video+platform+target. No shared or fallback copy. Return exactly these four Meta destinations in one schema-valid JSON object.
`.trim();

export function buildVideoCopyPrompt(params: {
  input: VideoContentInput;
  repairIssues?: readonly CopyValidationIssue[];
}): string {
  const repair = params.repairIssues?.length
    ? `\n\nREPAIR REQUEST\nThe prior output failed deterministic validation. Correct every issue while preserving exact target IDs and meaningful variation.\n${params.repairIssues
        .map((issue) => `- ${issue.path}: ${issue.message}`)
        .join("\n")}`
    : "";

  return `${MATCHSIGNAL_PERMANENT_CONTEXT}

PROMPT VERSION
${VIDEO_COPY_PROMPT_VERSION}

VIDEO INPUT
ID: ${params.input.id}
TOPIC: ${params.input.topic}
VISUAL: ${params.input.visual}
VOICEOVER: ${params.input.voiceover}
SOURCE URL: ${params.input.sourceUrl ?? "not provided yet"}

Generate all four target-specific Meta outputs now in one JSON object.${repair}`;
}

export const VIDEO_COPY_SYSTEM_PROMPT =
  "You are MatchSignal's compliance-aware social copywriter. Produce English marketing copy as strict JSON only, follow the schema exactly, and never invent product capabilities or guaranteed outcomes.";
