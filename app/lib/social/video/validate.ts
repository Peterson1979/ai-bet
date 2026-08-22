import {
  VIDEO_SOCIAL_PLATFORMS,
  type SocialTarget,
  type VideoAsset,
  type VideoSocialPlatform,
} from "./types";

export type VideoSocialValidationIssue = {
  path: string;
  message: string;
};

export type VideoSocialValidationResult =
  | { valid: true; errors: [] }
  | { valid: false; errors: VideoSocialValidationIssue[] };

export class VideoSocialValidationError extends Error {
  readonly issues: VideoSocialValidationIssue[];

  constructor(issues: VideoSocialValidationIssue[]) {
    super("video social configuration validation failed");
    this.name = "VideoSocialValidationError";
    this.issues = issues;
  }
}

const ID_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
const ENV_NAME_PATTERN = /^[A-Z][A-Z0-9_]*$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPlatform(value: unknown): value is VideoSocialPlatform {
  return VIDEO_SOCIAL_PLATFORMS.includes(value as VideoSocialPlatform);
}

function validateEnvReference(
  target: Record<string, unknown>,
  field: string,
  path: string,
  errors: VideoSocialValidationIssue[]
) {
  const value = target[field];
  if (typeof value !== "string" || !ENV_NAME_PATTERN.test(value)) {
    errors.push({
      path: `${path}.${field}`,
      message: "must name an environment variable; credential values belong outside source",
    });
  }
}

function validateTargets(
  value: unknown,
  errors: VideoSocialValidationIssue[]
): Map<string, SocialTarget> {
  const byId = new Map<string, SocialTarget>();

  if (!Array.isArray(value)) {
    errors.push({ path: "targets", message: "must be an array" });
    return byId;
  }

  const seenIds = new Set<string>();

  value.forEach((candidate, index) => {
    const path = `targets[${index}]`;
    if (!isRecord(candidate)) {
      errors.push({ path, message: "must be an object" });
      return;
    }

    const { id, platform, enabled } = candidate;
    if (typeof id !== "string" || !ID_PATTERN.test(id)) {
      errors.push({ path: `${path}.id`, message: "must be a stable non-empty ID" });
    } else if (seenIds.has(id)) {
      errors.push({ path: `${path}.id`, message: `duplicate target ID: ${id}` });
    } else {
      seenIds.add(id);
    }

    if (!isPlatform(platform)) {
      errors.push({
        path: `${path}.platform`,
        message: "must be instagram, facebook, or youtube",
      });
    }
    if (typeof enabled !== "boolean") {
      errors.push({ path: `${path}.enabled`, message: "must be a boolean" });
    }

    if (platform === "instagram" || platform === "facebook") {
      validateEnvReference(candidate, "accountIdEnv", path, errors);
      validateEnvReference(candidate, "accessTokenEnv", path, errors);
    } else if (platform === "youtube") {
      validateEnvReference(candidate, "accountIdEnv", path, errors);
      validateEnvReference(candidate, "clientIdEnv", path, errors);
      validateEnvReference(candidate, "clientSecretEnv", path, errors);
      validateEnvReference(candidate, "refreshTokenEnv", path, errors);
    }

    if (
      typeof id === "string" &&
      ID_PATTERN.test(id) &&
      isPlatform(platform) &&
      typeof enabled === "boolean" &&
      !byId.has(id)
    ) {
      byId.set(id, candidate as SocialTarget);
    }
  });

  return byId;
}

function validateSourceUrl(
  value: unknown,
  path: string,
  errors: VideoSocialValidationIssue[]
) {
  if (typeof value !== "string") {
    errors.push({ path, message: "must be a public HTTPS Cloudinary URL" });
    return;
  }

  try {
    const sourceUrl = new URL(value);
    if (sourceUrl.protocol !== "https:") {
      errors.push({ path, message: "must use HTTPS" });
    }
    if (sourceUrl.hostname !== "res.cloudinary.com") {
      errors.push({ path, message: "must use the res.cloudinary.com delivery host" });
    }
    if (!sourceUrl.pathname.includes("/video/upload/")) {
      errors.push({ path, message: "must be a Cloudinary video delivery URL" });
    }
    if (!sourceUrl.pathname.toLowerCase().endsWith(".mp4")) {
      errors.push({ path, message: "must use an MP4-style source path" });
    }
  } catch {
    errors.push({ path, message: "must be a valid URL" });
  }
}

function validatePlatformConfig(params: {
  platform: VideoSocialPlatform;
  value: unknown;
  path: string;
  targetsById: Map<string, SocialTarget>;
  errors: VideoSocialValidationIssue[];
}) {
  const { platform, value, path, targetsById, errors } = params;
  if (!isRecord(value)) {
    errors.push({ path, message: "must be an object" });
    return;
  }
  if (!Array.isArray(value.targets)) {
    errors.push({ path: `${path}.targets`, message: "must be an array" });
    return;
  }

  const seenTargetIds = new Set<string>();
  value.targets.forEach((candidate, index) => {
    const targetPath = `${path}.targets[${index}]`;
    if (!isRecord(candidate)) {
      errors.push({ path: targetPath, message: "must be an object" });
      return;
    }

    const targetId = candidate.targetId;
    if (typeof targetId !== "string" || !ID_PATTERN.test(targetId)) {
      errors.push({
        path: `${targetPath}.targetId`,
        message: "must be a stable non-empty target ID",
      });
    } else if (seenTargetIds.has(targetId)) {
      errors.push({
        path: `${targetPath}.targetId`,
        message: `duplicate target content: ${targetId}`,
      });
    } else {
      seenTargetIds.add(targetId);
      const target = targetsById.get(targetId);
      if (!target) {
        errors.push({
          path: `${targetPath}.targetId`,
          message: `unknown target ID: ${targetId}`,
        });
      } else if (target.platform !== platform) {
        errors.push({
          path: `${targetPath}.targetId`,
          message: `target ${targetId} belongs to ${target.platform}, not ${platform}`,
        });
      } else if (candidate.enabled === true && !target.enabled) {
        errors.push({
          path: targetPath,
          message: `enabled destination requires enabled target ${targetId}`,
        });
      }
    }

    if (typeof candidate.enabled !== "boolean") {
      errors.push({ path: `${targetPath}.enabled`, message: "must be a boolean" });
    }

    if (platform === "instagram") {
      if (typeof candidate.caption !== "string") {
        errors.push({ path: `${targetPath}.caption`, message: "must be a string" });
      } else if (candidate.enabled === true && candidate.caption.trim() === "") {
        errors.push({
          path: `${targetPath}.caption`,
          message: "is required when Instagram destination is enabled",
        });
      }
    } else if (platform === "facebook") {
      if (typeof candidate.message !== "string") {
        errors.push({ path: `${targetPath}.message`, message: "must be a string" });
      } else if (candidate.enabled === true && candidate.message.trim() === "") {
        errors.push({
          path: `${targetPath}.message`,
          message: "is required when Facebook destination is enabled",
        });
      }
    } else {
      if (typeof candidate.title !== "string") {
        errors.push({ path: `${targetPath}.title`, message: "must be a string" });
      } else if (candidate.enabled === true && candidate.title.trim() === "") {
        errors.push({
          path: `${targetPath}.title`,
          message: "is required when YouTube destination is enabled",
        });
      }
      if (typeof candidate.description !== "string") {
        errors.push({ path: `${targetPath}.description`, message: "must be a string" });
      } else if (
        candidate.enabled === true &&
        candidate.description.trim() === ""
      ) {
        errors.push({
          path: `${targetPath}.description`,
          message: "is required when YouTube destination is enabled",
        });
      }
      if (
        candidate.tags !== undefined &&
        (!Array.isArray(candidate.tags) ||
          candidate.tags.some((tag: unknown) => typeof tag !== "string"))
      ) {
        errors.push({
          path: `${targetPath}.tags`,
          message: "must be an array of strings",
        });
      }
    }
  });
}

export function validateVideoSocialConfiguration(
  manifestValue: unknown,
  targetsValue: unknown
): VideoSocialValidationResult {
  const errors: VideoSocialValidationIssue[] = [];
  const targetsById = validateTargets(targetsValue, errors);

  if (!Array.isArray(manifestValue)) {
    errors.push({ path: "manifest", message: "must be an array" });
    return { valid: false, errors };
  }

  const seenVideoIds = new Set<string>();

  manifestValue.forEach((candidate, index) => {
    const path = `manifest[${index}]`;
    if (!isRecord(candidate)) {
      errors.push({ path, message: "must be an object" });
      return;
    }

    if (typeof candidate.id !== "string" || !ID_PATTERN.test(candidate.id)) {
      errors.push({ path: `${path}.id`, message: "must be a stable non-empty ID" });
    } else if (seenVideoIds.has(candidate.id)) {
      errors.push({
        path: `${path}.id`,
        message: `duplicate video ID: ${candidate.id}`,
      });
    } else {
      seenVideoIds.add(candidate.id);
    }

    validateSourceUrl(candidate.sourceUrl, `${path}.sourceUrl`, errors);

    if (typeof candidate.enabled !== "boolean") {
      errors.push({ path: `${path}.enabled`, message: "must be a boolean" });
    }

    if (!isRecord(candidate.platforms)) {
      errors.push({ path: `${path}.platforms`, message: "must be an object" });
      return;
    }

    for (const platform of VIDEO_SOCIAL_PLATFORMS) {
      validatePlatformConfig({
        platform,
        value: candidate.platforms[platform],
        path: `${path}.platforms.${platform}`,
        targetsById,
        errors,
      });
    }
  });

  return errors.length === 0
    ? { valid: true, errors: [] }
    : { valid: false, errors };
}

export function assertValidVideoSocialConfiguration(
  manifest: unknown,
  targets: unknown
): asserts manifest is VideoAsset[] {
  const result = validateVideoSocialConfiguration(manifest, targets);
  if (!result.valid) throw new VideoSocialValidationError(result.errors);
}
