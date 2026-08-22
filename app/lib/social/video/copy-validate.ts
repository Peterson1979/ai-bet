import { z } from "zod";

import {
  VIDEO_COPY_MODEL,
  VIDEO_COPY_PROMPT_VERSION,
  VIDEO_COPY_PROVIDER,
  VIDEO_COPY_TARGET_IDS,
  type CopyValidationIssue,
  type CopyValidationResult,
  type GeneratedVideoCopy,
  type VideoContentInput,
  type VideoContentPackage,
} from "./content-types";

const ID_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
const MATCHSIGNAL_URL = "https://www.matchsignal.pro";
const INSTAGRAM_LIMIT = 2_200;
const YOUTUBE_TITLE_LIMIT = 100;
const NEAR_DUPLICATE_THRESHOLD = 0.78;
const INSTAGRAM_MIN_SUBSTANTIVE_LENGTH = 180;
const FACEBOOK_MIN_SUBSTANTIVE_LENGTH = 220;
const YOUTUBE_MIN_SUBSTANTIVE_LENGTH = 300;
const MIN_HASHTAG_COUNT = 5;
const MIN_YOUTUBE_TAG_COUNT = 5;

const PRODUCT_BENEFIT_PATTERN =
  /\b(?:odds?|prices?|compare|comparison|analysis|probability|value|risk|bookmakers?|sportsbooks?|explanations?|selection|market|ai-assisted)\b/i;
const RELEVANT_TAG_PATTERN =
  /(?:matchsignal|sports?|bet(?:ting)?|odds?|prices?|comparison|analysis|analytics|probability|value|bookmaker|responsible|football|nba|nfl|hockey|tennis|mlb|mma|ai|tools?|guides?)/i;

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

const CloudinarySourceUrlSchema = z
  .string()
  .url()
  .refine((value) => {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "res.cloudinary.com" &&
      url.pathname.includes("/video/upload/") &&
      url.pathname.toLowerCase().endsWith(".mp4")
    );
  }, "must be a public HTTPS Cloudinary MP4 delivery URL");

export const VideoContentInputSchema = z
  .object({
    id: z.string().regex(ID_PATTERN),
    topic: z.string().trim().min(1),
    visual: z.string().trim().min(1),
    voiceover: z.string().trim().min(1),
    sourceUrl: z.union([CloudinarySourceUrlSchema, z.null()]),
  })
  .strict();

const GeneratedInstagramTargetSchema = z
  .object({ targetId: z.string(), caption: z.string() })
  .strict();
const GeneratedFacebookTargetSchema = z
  .object({ targetId: z.string(), message: z.string() })
  .strict();
const GeneratedYouTubeTargetSchema = z
  .object({
    targetId: z.string(),
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
  })
  .strict();

export const GeneratedVideoCopySchema = z
  .object({
    id: z.string(),
    platforms: z
      .object({
        instagram: z
          .object({ targets: z.array(GeneratedInstagramTargetSchema) })
          .strict(),
        facebook: z
          .object({ targets: z.array(GeneratedFacebookTargetSchema) })
          .strict(),
        youtube: z
          .object({ targets: z.array(GeneratedYouTubeTargetSchema) })
          .strict(),
      })
      .strict(),
  })
  .strict();

export const VIDEO_COPY_JSON_SCHEMA = {
  type: "object",
  properties: {
    id: { type: "string" },
    platforms: {
      type: "object",
      properties: {
        instagram: {
          type: "object",
          properties: {
            targets: {
              type: "array",
              minItems: 2,
              maxItems: 2,
              items: {
                type: "object",
                properties: {
                  targetId: { type: "string", enum: [...VIDEO_COPY_TARGET_IDS.instagram] },
                  caption: { type: "string" },
                },
                required: ["targetId", "caption"],
                additionalProperties: false,
              },
            },
          },
          required: ["targets"],
          additionalProperties: false,
        },
        facebook: {
          type: "object",
          properties: {
            targets: {
              type: "array",
              minItems: 4,
              maxItems: 4,
              items: {
                type: "object",
                properties: {
                  targetId: { type: "string", enum: [...VIDEO_COPY_TARGET_IDS.facebook] },
                  message: { type: "string" },
                },
                required: ["targetId", "message"],
                additionalProperties: false,
              },
            },
          },
          required: ["targets"],
          additionalProperties: false,
        },
        youtube: {
          type: "object",
          properties: {
            targets: {
              type: "array",
              minItems: 1,
              maxItems: 1,
              items: {
                type: "object",
                properties: {
                  targetId: { type: "string", enum: [...VIDEO_COPY_TARGET_IDS.youtube] },
                  title: { type: "string" },
                  description: { type: "string" },
                  tags: { type: "array", items: { type: "string" } },
                },
                required: ["targetId", "title", "description", "tags"],
                additionalProperties: false,
              },
            },
          },
          required: ["targets"],
          additionalProperties: false,
        },
      },
      required: ["instagram", "facebook", "youtube"],
      additionalProperties: false,
    },
  },
  required: ["id", "platforms"],
  additionalProperties: false,
} as const;

const PackageSchema = z
  .object({
    id: z.string(),
    status: z.enum(["draft", "ready", "rejected"]),
    source: VideoContentInputSchema,
    platforms: z
      .object({
        instagram: z.object({
          targets: z.array(GeneratedInstagramTargetSchema.extend({ enabled: z.boolean() })),
        }).strict(),
        facebook: z.object({
          targets: z.array(GeneratedFacebookTargetSchema.extend({ enabled: z.boolean() })),
        }).strict(),
        youtube: z.object({
          targets: z.array(GeneratedYouTubeTargetSchema.extend({ enabled: z.boolean() })),
        }).strict(),
      })
      .strict(),
    generation: z
      .object({
        provider: z.literal(VIDEO_COPY_PROVIDER),
        model: z.string().min(1),
        generatedAt: z.string().datetime(),
        // Older draft packages remain parseable during an explicit regeneration;
        // only newly generated packages use the current prompt version.
        promptVersion: z.enum(["matchsignal-video-copy-v1", VIDEO_COPY_PROMPT_VERSION]),
      })
      .strict(),
  })
  .strict();

function issue(path: string, message: string): CopyValidationIssue {
  return { path, message };
}

function result(errors: CopyValidationIssue[]): CopyValidationResult {
  return errors.length === 0
    ? { valid: true, errors: [] }
    : { valid: false, errors };
}

function zodIssues(error: z.ZodError): CopyValidationIssue[] {
  return error.issues.map((value) =>
    issue(value.path.length ? value.path.join(".") : "value", value.message)
  );
}

export function validateVideoContentInput(value: unknown): CopyValidationResult {
  const parsed = VideoContentInputSchema.safeParse(value);
  return parsed.success ? { valid: true, errors: [] } : result(zodIssues(parsed.error));
}

export function parseVideoContentInput(value: unknown): VideoContentInput {
  return VideoContentInputSchema.parse(value);
}

function normalizedTokens(value: string): Set<string> {
  return new Set(
    value
      .toLowerCase()
      .replace(/https?:\/\/\S+/g, " ")
      .replace(/[^a-z0-9+]+/g, " ")
      .split(/\s+/)
      .filter((token) => token.length > 2)
  );
}

export function copySimilarity(left: string, right: string): number {
  const leftTokens = normalizedTokens(left);
  const rightTokens = normalizedTokens(right);
  const union = new Set([...leftTokens, ...rightTokens]);
  if (union.size === 0) return left.trim() === right.trim() ? 1 : 0;
  let intersection = 0;
  for (const token of leftTokens) if (rightTokens.has(token)) intersection += 1;
  return intersection / union.size;
}

function validateTargetIds(
  actual: readonly string[],
  expected: readonly string[],
  path: string,
  errors: CopyValidationIssue[]
) {
  if (actual.length !== expected.length) {
    errors.push(issue(path, `must contain exactly ${expected.length} destinations`));
  }
  const seen = new Set<string>();
  actual.forEach((targetId, index) => {
    if (seen.has(targetId)) {
      errors.push(issue(`${path}[${index}].targetId`, `duplicate target ID: ${targetId}`));
    }
    seen.add(targetId);
    if (!expected.includes(targetId)) {
      errors.push(issue(`${path}[${index}].targetId`, `unknown target ID: ${targetId}`));
    }
  });
  for (const targetId of expected) {
    if (!seen.has(targetId)) errors.push(issue(path, `missing target ID: ${targetId}`));
  }
}

function validateText(
  value: string,
  path: string,
  errors: CopyValidationIssue[],
  requirements: { instagram?: boolean; website?: boolean } = {}
) {
  const text = value.trim();
  if (!text) errors.push(issue(path, "must not be empty"));
  for (const prohibited of PROHIBITED_CLAIMS) {
    if (prohibited.test(text)) {
      errors.push(issue(path, `contains prohibited claim: ${prohibited.source}`));
    }
  }
  if (requirements.instagram && !/link in bio/i.test(text)) {
    errors.push(issue(path, 'must include "Link in bio"'));
  }
  if (requirements.website && !text.includes(MATCHSIGNAL_URL)) {
    errors.push(issue(path, `must include ${MATCHSIGNAL_URL}`));
  }
  if (!/18\s*\+/i.test(text)) {
    errors.push(issue(path, "must include an 18+ notice"));
  }
  if (!/(gamble responsibly|responsible gambling)/i.test(text)) {
    errors.push(issue(path, "must include responsible-gambling language"));
  }
  if (!/(informational|no (?:prediction|outcome|guarantee)|not a guarantee|odds can change|prices can change|no guarantee of profit)/i.test(text)) {
    errors.push(issue(path, "must include an informational or no-guarantee qualifier"));
  }
}

function substantiveText(
  value: string,
  options: { instagram?: boolean; website?: boolean } = {}
): string {
  const disclaimerStart = value.search(/(?:🔞\s*)?18\s*\+/iu);
  const beforeDisclaimer = disclaimerStart >= 0 ? value.slice(0, disclaimerStart) : value;
  return beforeDisclaimer
    .replace(options.instagram ? /link in bio/giu : /$^/gu, " ")
    .replace(options.website ? /https:\/\/www\.matchsignal\.pro/giu : /$^/gu, " ")
    .replace(/#[\p{L}\p{N}_]+/gu, " ")
    .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function validateSubstantiveBody(
  value: string,
  path: string,
  minimumLength: number,
  errors: CopyValidationIssue[],
  options: { instagram?: boolean; website?: boolean } = {}
) {
  const body = substantiveText(value, options);
  if (body.length < minimumLength) {
    errors.push(
      issue(
        path,
        `must contain at least ${minimumLength} substantive body characters excluding CTA, URL, disclaimer, and hashtags (found ${body.length})`
      )
    );
  }
  if (!/\bmatchsignal\b/i.test(body) || !PRODUCT_BENEFIT_PATTERN.test(body)) {
    errors.push(issue(path, "must explain a MatchSignal product benefit relevant to the video"));
  }
  if (body && !/[.!?]["'’”)]?$/u.test(body)) {
    errors.push(issue(path, "substantive body must end with a complete sentence"));
  }
}

function validateDistinct(
  values: readonly { path: string; text: string }[],
  errors: CopyValidationIssue[]
) {
  for (let left = 0; left < values.length; left += 1) {
    for (let right = left + 1; right < values.length; right += 1) {
      const similarity = copySimilarity(values[left].text, values[right].text);
      if (similarity >= NEAR_DUPLICATE_THRESHOLD) {
        errors.push(
          issue(
            `${values[left].path},${values[right].path}`,
            `copy is too similar (${similarity.toFixed(2)})`
          )
        );
      }
    }
  }
}

export function validateGeneratedVideoCopy(
  expectedVideoId: string,
  value: unknown
): CopyValidationResult {
  const parsed = GeneratedVideoCopySchema.safeParse(value);
  if (!parsed.success) return result(zodIssues(parsed.error));
  const copy = parsed.data;
  const errors: CopyValidationIssue[] = [];
  if (copy.id !== expectedVideoId) {
    errors.push(issue("id", `must exactly match video ID ${expectedVideoId}`));
  }

  validateTargetIds(
    copy.platforms.instagram.targets.map((target) => target.targetId),
    VIDEO_COPY_TARGET_IDS.instagram,
    "platforms.instagram.targets",
    errors
  );
  validateTargetIds(
    copy.platforms.facebook.targets.map((target) => target.targetId),
    VIDEO_COPY_TARGET_IDS.facebook,
    "platforms.facebook.targets",
    errors
  );
  validateTargetIds(
    copy.platforms.youtube.targets.map((target) => target.targetId),
    VIDEO_COPY_TARGET_IDS.youtube,
    "platforms.youtube.targets",
    errors
  );

  copy.platforms.instagram.targets.forEach((target, index) => {
    const path = `platforms.instagram.targets[${index}].caption`;
    validateText(target.caption, path, errors, { instagram: true });
    validateSubstantiveBody(
      target.caption,
      path,
      INSTAGRAM_MIN_SUBSTANTIVE_LENGTH,
      errors,
      { instagram: true }
    );
    const hashtags = new Set(
      target.caption.match(/#[\p{L}\p{N}_]+/gu)?.map((tag) => tag.toLowerCase()) ?? []
    );
    if (hashtags.size < MIN_HASHTAG_COUNT) {
      errors.push(issue(path, `must include at least ${MIN_HASHTAG_COUNT} unique hashtags`));
    }
    if (target.caption.length > INSTAGRAM_LIMIT) {
      errors.push(issue(path, `must be at most ${INSTAGRAM_LIMIT} characters`));
    }
  });
  validateDistinct(
    copy.platforms.instagram.targets.map((target, index) => ({
      path: `platforms.instagram.targets[${index}].caption`,
      text: target.caption,
    })),
    errors
  );

  copy.platforms.facebook.targets.forEach((target, index) => {
    const path = `platforms.facebook.targets[${index}].message`;
    validateText(target.message, path, errors, {
      website: true,
    });
    validateSubstantiveBody(
      target.message,
      path,
      FACEBOOK_MIN_SUBSTANTIVE_LENGTH,
      errors,
      { website: true }
    );
  });
  validateDistinct(
    copy.platforms.facebook.targets.map((target, index) => ({
      path: `platforms.facebook.targets[${index}].message`,
      text: target.message,
    })),
    errors
  );

  const youtube = copy.platforms.youtube.targets[0];
  if (youtube) {
    if (!youtube.title.trim()) {
      errors.push(issue("platforms.youtube.targets[0].title", "must not be empty"));
    }
    if (youtube.title.length > YOUTUBE_TITLE_LIMIT) {
      errors.push(
        issue(
          "platforms.youtube.targets[0].title",
          `must be at most ${YOUTUBE_TITLE_LIMIT} characters`
        )
      );
    }
    for (const prohibited of PROHIBITED_CLAIMS) {
      if (prohibited.test(youtube.title)) {
        errors.push(issue("platforms.youtube.targets[0].title", "contains a prohibited claim"));
      }
    }
    validateText(
      youtube.description,
      "platforms.youtube.targets[0].description",
      errors,
      { website: true }
    );
    validateSubstantiveBody(
      youtube.description,
      "platforms.youtube.targets[0].description",
      YOUTUBE_MIN_SUBSTANTIVE_LENGTH,
      errors,
      { website: true }
    );
    const tags = youtube.tags.map((tag) => tag.trim()).filter(Boolean);
    const uniqueTags = new Set(tags.map((tag) => tag.toLowerCase()));
    if (uniqueTags.size < MIN_YOUTUBE_TAG_COUNT) {
      errors.push(
        issue(
          "platforms.youtube.targets[0].tags",
          `must include at least ${MIN_YOUTUBE_TAG_COUNT} unique non-empty tags`
        )
      );
    }
    if (tags.some((tag) => !RELEVANT_TAG_PATTERN.test(tag))) {
      errors.push(issue("platforms.youtube.targets[0].tags", "all tags must be product-relevant"));
    }
  }

  return result(errors);
}

export function parseGeneratedVideoCopy(value: unknown): GeneratedVideoCopy {
  return GeneratedVideoCopySchema.parse(value);
}

export function createRejectedVideoCopy(id: string): GeneratedVideoCopy {
  return {
    id,
    platforms: {
      instagram: {
        targets: VIDEO_COPY_TARGET_IDS.instagram.map((targetId) => ({ targetId, caption: "" })),
      },
      facebook: {
        targets: VIDEO_COPY_TARGET_IDS.facebook.map((targetId) => ({ targetId, message: "" })),
      },
      youtube: {
        targets: VIDEO_COPY_TARGET_IDS.youtube.map((targetId) => ({
          targetId,
          title: "",
          description: "",
          tags: [],
        })),
      },
    },
  };
}

export function buildVideoContentPackage(params: {
  input: VideoContentInput;
  copy: GeneratedVideoCopy;
  generatedAt?: string;
  forceRejected?: boolean;
}): VideoContentPackage {
  const validation = validateGeneratedVideoCopy(params.input.id, params.copy);
  const status =
    params.forceRejected || !validation.valid
      ? "rejected"
      : params.input.sourceUrl
        ? "ready"
        : "draft";
  return {
    id: params.input.id,
    status,
    source: params.input,
    platforms: {
      instagram: {
        targets: params.copy.platforms.instagram.targets.map((target) => ({
          ...target,
          enabled: false,
        })),
      },
      facebook: {
        targets: params.copy.platforms.facebook.targets.map((target) => ({
          ...target,
          enabled: false,
        })),
      },
      youtube: {
        targets: params.copy.platforms.youtube.targets.map((target) => ({
          ...target,
          enabled: false,
        })),
      },
    },
    generation: {
      provider: VIDEO_COPY_PROVIDER,
      model: VIDEO_COPY_MODEL,
      generatedAt: params.generatedAt ?? new Date().toISOString(),
      promptVersion: VIDEO_COPY_PROMPT_VERSION,
    },
  };
}

export function parseVideoContentPackage(value: unknown): VideoContentPackage {
  return PackageSchema.parse(value) as VideoContentPackage;
}

export function validateVideoContentPackage(value: unknown): CopyValidationResult {
  const parsed = PackageSchema.safeParse(value);
  if (!parsed.success) return result(zodIssues(parsed.error));
  const valuePackage = parsed.data as VideoContentPackage;
  const errors: CopyValidationIssue[] = [];
  if (valuePackage.id !== valuePackage.source.id) {
    errors.push(issue("id", "must match source.id"));
  }
  if (valuePackage.status === "ready" && valuePackage.source.sourceUrl === null) {
    errors.push(issue("status", "ready package requires a verified sourceUrl"));
  }
  if (valuePackage.source.sourceUrl === null && valuePackage.status === "ready") {
    errors.push(issue("source.sourceUrl", "missing sourceUrl forces draft or rejected status"));
  }
  if (valuePackage.status !== "rejected") {
    const copy: GeneratedVideoCopy = {
      id: valuePackage.id,
      platforms: {
        instagram: {
          targets: valuePackage.platforms.instagram.targets.map(({ targetId, caption }) => ({
            targetId,
            caption,
          })),
        },
        facebook: {
          targets: valuePackage.platforms.facebook.targets.map(({ targetId, message }) => ({
            targetId,
            message,
          })),
        },
        youtube: {
          targets: valuePackage.platforms.youtube.targets.map(
            ({ targetId, title, description, tags }) => ({
              targetId,
              title,
              description,
              tags: tags ?? [],
            })
          ),
        },
      },
    };
    const copyValidation = validateGeneratedVideoCopy(valuePackage.id, copy);
    if (!copyValidation.valid) errors.push(...copyValidation.errors);
  }
  return result(errors);
}
