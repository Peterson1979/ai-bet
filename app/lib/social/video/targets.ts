import type {
  ResolvedVideoTarget,
  ResolvedVideoTargets,
  SocialTarget,
  VideoAsset,
  VideoSocialPlatform,
} from "./types";

export const VIDEO_SOCIAL_TARGETS = [
  {
    id: "instagram-main",
    platform: "instagram",
    enabled: true,
    accountIdEnv: "INSTAGRAM_BUSINESS_ID",
    accessTokenEnv: "INSTAGRAM_ACCESS_TOKEN",
  },
  {
    id: "instagram-2",
    platform: "instagram",
    enabled: true,
    accountIdEnv: "INSTAGRAM_BUSINESS_ID_2",
    accessTokenEnv: "INSTAGRAM_ACCESS_TOKEN_2",
  },
  {
    id: "facebook-main",
    platform: "facebook",
    enabled: true,
    accountIdEnv: "FACEBOOK_PAGE_ID",
    accessTokenEnv: "FACEBOOK_ACCESS_TOKEN",
  },
  {
    id: "facebook-2",
    platform: "facebook",
    enabled: true,
    accountIdEnv: "FACEBOOK_PAGE_ID_2",
    accessTokenEnv: "FACEBOOK_ACCESS_TOKEN_2",
  },
  {
    id: "facebook-3",
    platform: "facebook",
    enabled: true,
    accountIdEnv: "FACEBOOK_PAGE_ID_3",
    accessTokenEnv: "FACEBOOK_ACCESS_TOKEN_3",
  },
  {
    id: "facebook-4",
    platform: "facebook",
    enabled: true,
    accountIdEnv: "FACEBOOK_PAGE_ID_4",
    accessTokenEnv: "FACEBOOK_ACCESS_TOKEN_4",
  },
  {
    id: "youtube-main",
    platform: "youtube",
    enabled: true,
    accountIdEnv: "YOUTUBE_CHANNEL_ID",
    clientIdEnv: "YOUTUBE_CLIENT_ID",
    clientSecretEnv: "YOUTUBE_CLIENT_SECRET",
    refreshTokenEnv: "YOUTUBE_REFRESH_TOKEN",
  },
] satisfies SocialTarget[];

export function getVideoTargetContent(
  asset: VideoAsset,
  platform: "instagram",
  targetId: string
): VideoAsset["platforms"]["instagram"]["targets"][number] | undefined;
export function getVideoTargetContent(
  asset: VideoAsset,
  platform: "facebook",
  targetId: string
): VideoAsset["platforms"]["facebook"]["targets"][number] | undefined;
export function getVideoTargetContent(
  asset: VideoAsset,
  platform: "youtube",
  targetId: string
): VideoAsset["platforms"]["youtube"]["targets"][number] | undefined;
export function getVideoTargetContent(
  asset: VideoAsset,
  platform: VideoSocialPlatform,
  targetId: string
) {
  return asset.platforms[platform].targets.find(
    (content) => content.targetId === targetId
  );
}

/**
 * Destinations resolve in manifest order. A destination must be enabled in
 * both the video's exact target-content entry and the credential registry.
 * There is deliberately no platform-wide or cross-target copy fallback.
 */
export function resolveTargetsForPlatform(
  asset: VideoAsset,
  platform: VideoSocialPlatform,
  targets: readonly SocialTarget[]
): ResolvedVideoTarget[] {
  const enabledTargets = new Map(
    targets
      .filter((target) => target.enabled && target.platform === platform)
      .map((target) => [target.id, target])
  );

  return asset.platforms[platform].targets.flatMap((content) => {
    if (!content.enabled) return [];
    const target = enabledTargets.get(content.targetId);
    return target ? [target] : [];
  });
}

export function resolveVideoTargets(
  asset: VideoAsset,
  targets: readonly SocialTarget[]
): ResolvedVideoTargets {
  return {
    instagram: resolveTargetsForPlatform(asset, "instagram", targets),
    facebook: resolveTargetsForPlatform(asset, "facebook", targets),
    youtube: resolveTargetsForPlatform(asset, "youtube", targets),
  };
}
