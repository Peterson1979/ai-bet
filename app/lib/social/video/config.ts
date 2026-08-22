import { resolveVideoTargets } from "./targets";
import {
  VIDEO_SOCIAL_PLATFORMS,
  type SocialTarget,
  type VideoAsset,
  type VideoSocialMode,
} from "./types";

export const VIDEO_SOCIAL_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

export type VideoSocialModeConfig = {
  mode: VideoSocialMode;
  configured: boolean;
  valid: boolean;
  error?: string;
};

export function parseVideoSocialMode(
  rawValue: string | undefined
): VideoSocialModeConfig {
  if (rawValue === undefined || rawValue.trim() === "") {
    return { mode: "disabled", configured: false, valid: true };
  }

  const normalized = rawValue.trim().toLowerCase();
  if (
    normalized === "disabled" ||
    normalized === "dry-run" ||
    normalized === "live"
  ) {
    return {
      mode: normalized,
      configured: true,
      valid: true,
    };
  }

  return {
    mode: "disabled",
    configured: true,
    valid: false,
    error: "invalid VIDEO_SOCIAL_MODE; video social publishing is disabled",
  };
}

export function getVideoSocialMode(): VideoSocialModeConfig {
  return parseVideoSocialMode(process.env.VIDEO_SOCIAL_MODE);
}

export function buildDryRunPublicationPlan(
  asset: VideoAsset,
  targets: readonly SocialTarget[]
) {
  const resolvedTargets = resolveVideoTargets(asset, targets);
  const eligiblePlatforms = VIDEO_SOCIAL_PLATFORMS.filter(
    (platform) => resolvedTargets[platform].length > 0
  );

  return {
    videoId: asset.id,
    sourceUrl: asset.sourceUrl,
    eligiblePlatforms,
    resolvedTargetIds: {
      instagram: resolvedTargets.instagram.map((target) => target.id),
      facebook: resolvedTargets.facebook.map((target) => target.id),
      youtube: resolvedTargets.youtube.map((target) => target.id),
    },
    targetContent: {
      instagram: asset.platforms.instagram.targets.map((content) => ({
        ...content,
      })),
      facebook: asset.platforms.facebook.targets.map((content) => ({
        ...content,
      })),
      youtube: asset.platforms.youtube.targets.map((content) => ({
        ...content,
        tags: content.tags ?? [],
      })),
    },
  };
}
