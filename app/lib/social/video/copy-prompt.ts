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
Return exactly two meaningfully distinct captions for ${VIDEO_COPY_TARGET_IDS.instagram.join(" and ")}. Each must strongly relate to the supplied topic/script, use a different hook and structure, explain useful MatchSignal value, drive website visits, contain the exact phrase "Link in bio", include relevant English hashtags, and remain under 2,200 characters. Do not merely paraphrase one caption sentence-by-sentence into the other.

FACEBOOK
Return exactly four meaningfully distinct posts for ${VIDEO_COPY_TARGET_IDS.facebook.join(", ")}. Give each its own hook and angle, base it on the supplied video, explain MatchSignal naturally, drive traffic, contain the exact URL https://www.matchsignal.pro, and include responsible/informational language. Aim for differentiated explanatory, practical-benefit, problem/solution, and concise conversion-oriented angles when suitable; do not output minor rewrites.

YOUTUBE
Return one package for youtube-main. The title must be compelling but not clickbait, directly related to the video, and no more than 100 characters. The description must explain the topic and relevant MatchSignal value, contain https://www.matchsignal.pro, and include responsible/informational language. Tags must be relevant and not misleading.

TARGET OWNERSHIP
Copy belongs only to its exact video + platform + target ID. Never provide shared platform copy or fallback copy. Return all seven destinations in one JSON response and follow the supplied schema exactly.
`.trim();

export function buildVideoCopyPrompt(params: {
  input: VideoContentInput;
  repairIssues?: readonly CopyValidationIssue[];
  previousOutput?: unknown;
}): string {
  const repair = params.repairIssues?.length
    ? `\n\nREPAIR REQUEST\nThe prior output failed deterministic validation. Correct every issue while preserving exact target IDs and meaningful variation.\n${params.repairIssues
        .map((issue) => `- ${issue.path}: ${issue.message}`)
        .join("\n")}\n\nPRIOR OUTPUT\n${JSON.stringify(params.previousOutput)}`
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
