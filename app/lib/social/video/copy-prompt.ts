import {
  VIDEO_COPY_PROMPT_VERSION,
  VIDEO_COPY_TARGET_IDS,
  type CopyValidationIssue,
  type VideoContentInput,
} from "./content-types";

const MATCHSIGNAL_PERMANENT_CONTEXT = `
MATCHSIGNAL FACTS
MatchSignal is a free, AI-assisted sports betting analysis platform. It combines regularly refreshed odds from multiple sportsbooks with market-based probability analysis, bookmaker/market comparison, and AI-generated explanations. MatchSignal is not a sportsbook and does not accept bets.

Supported sports: Football, NBA, NFL, Hockey, Tennis, MLB, and MMA.

MatchSignal may show a recommended selection and betting market, available partner odds, estimated value, market-average pricing, estimated fair probability, bookmaker coverage, a Low/Medium/High Risk Tier, and a concise AI-generated explanation.

A Value Signal estimates that an available price may represent positive expected value based on MatchSignal's probability estimate. It is not a guarantee of profit, a guarantee of a winning bet, or certainty about an outcome.

MatchSignal also provides Betting Guides, free calculators/tools, and a Betting Glossary. No subscription or registration is required for the analysis.

MARKETING OBJECTIVE
The primary objective is qualified traffic to https://www.matchsignal.pro, helping interested users explore MatchSignal's odds comparison and analysis and indirectly improving conversion on sportsbook partner links found on MatchSignal. Do not include direct sportsbook affiliate URLs. Do not optimize primarily for views, likes, followers, or engagement for its own sake. Every CTA should direct users to MatchSignal.

LANGUAGE AND CLAIM RULES
Write only in English. Never use "real-time odds", "real time odds", or "live odds". Prefer "odds", "available odds", "prices", or "available prices".

Never claim or imply: guaranteed win, guaranteed profit, guaranteed returns, risk-free betting, sure bet, certain winner, cannot lose, guaranteed outcome, knowledge of future outcomes, that MatchSignal is a bookmaker, that bets can be placed directly on MatchSignal, that odds never change, or that AI is infallible. Use compliant terms such as may, can help, compare, estimate, analysis, potential value, available price, and informational analysis.

RESPONSIBLE GAMBLING
Every destination must include natural responsible-gambling and informational language containing 18+ and Gamble responsibly (or Responsible gambling), plus a qualifier such as informational purposes only, no prediction guarantees an outcome, no guarantee of profit, or odds can change. Vary the seven disclaimers naturally; do not make them all identical.

INSTAGRAM
Return exactly two meaningfully distinct captions for ${VIDEO_COPY_TARGET_IDS.instagram.join(" and ")}. Each needs at least 180 characters of developed body copy before its separate CTA, disclaimer, and hashtag block; a different hook and structure; a clear MatchSignal benefit tied to the supplied topic/script; the exact phrase "Link in bio"; its own 18+/responsible/informational disclaimer; at least five relevant English hashtags; and no more than 2,200 total characters. Do not merely paraphrase one caption sentence-by-sentence into the other.

FACEBOOK
Return exactly four fully developed, meaningfully distinct posts for ${VIDEO_COPY_TARGET_IDS.facebook.join(", ")}. Each needs at least 220 characters of complete body prose excluding its URL and disclaimer, its own hook and angle based on the supplied video, a clear MatchSignal benefit, the exact URL https://www.matchsignal.pro, and its own 18+/responsible/informational disclaimer. Never return placeholder copy, fragments, or a URL/disclaimer-only post. Use differentiated explanatory, practical-benefit, problem/solution, and conversion-oriented angles when suitable.

YOUTUBE
Return one package for youtube-main. The non-clickbait title must relate directly to the video and be no more than 100 characters. The description needs at least 300 characters of developed topic/product prose excluding its URL and disclaimer, the exact URL https://www.matchsignal.pro, and an 18+/responsible/informational disclaimer. Return at least five relevant, non-misleading tags.

TARGET OWNERSHIP
Copy belongs only to its exact video + platform + target ID. Never provide shared platform copy or fallback copy. Return all seven destinations in one JSON response and follow the supplied schema exactly.
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

Generate all seven target-specific outputs now in one JSON object.${repair}`;
}

export const VIDEO_COPY_SYSTEM_PROMPT =
  "You are MatchSignal's compliance-aware social copywriter. Produce English marketing copy as strict JSON only, follow the schema exactly, and never invent product capabilities or guaranteed outcomes.";
