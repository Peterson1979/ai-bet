import type {
  SocialTarget,
  VideoAsset,
  VideoSocialPlatform,
} from "./types";
import { getVideoTargetContent } from "./targets";

export type EnvironmentSource = Readonly<Record<string, string | undefined>>;

export type MetaVideoPreflightResult = {
  targetId: string;
  platform: "instagram" | "facebook";
  targetEnabled: boolean;
  assetEnabled: boolean;
  destinationEnabled: boolean;
  accountIdPresent: boolean;
  accountIdMatchesExpected: boolean;
  accessTokenPresent: boolean;
  sourceHttps: boolean;
  sourceCloudinaryVideo: boolean;
  sourceMp4Path: boolean;
  copyUsable: boolean;
  valid: boolean;
  errors: string[];
  unverifiedMediaConstraints: string[];
  unverifiedProviderChecks: string[];
};

export type YouTubeVideoPreflightResult = {
  targetId: string;
  platform: "youtube";
  targetEnabled: boolean;
  assetEnabled: boolean;
  destinationEnabled: boolean;
  clientIdPresent: boolean;
  clientSecretPresent: boolean;
  refreshTokenPresent: boolean;
  channelIdPresent: boolean;
  channelIdMatchesExpected: boolean;
  sourceHttps: boolean;
  sourceCloudinaryVideo: boolean;
  sourceMp4Path: boolean;
  copyUsable: boolean;
  titlePresent: boolean;
  descriptionPresent: boolean;
  valid: boolean;
  errors: string[];
  unverifiedMediaConstraints: string[];
  unverifiedProviderChecks: string[];
};

export type SocialVideoPreflightResult =
  | MetaVideoPreflightResult
  | YouTubeVideoPreflightResult;

export class MetaVideoPreflightError extends Error {
  readonly result: MetaVideoPreflightResult;

  constructor(result: MetaVideoPreflightResult) {
    super(`${result.platform} target ${result.targetId} failed video preflight`);
    this.name = "MetaVideoPreflightError";
    this.result = result;
  }
}

export class YouTubeVideoPreflightError extends Error {
  readonly result: YouTubeVideoPreflightResult;

  constructor(result: YouTubeVideoPreflightResult) {
    super(`YouTube target ${result.targetId} failed video preflight`);
    this.name = "YouTubeVideoPreflightError";
    this.result = result;
  }
}

function configuredValuePresent(
  environment: EnvironmentSource,
  envName: string | undefined
): boolean {
  return Boolean(envName && environment[envName]?.trim());
}

function inspectSourceUrl(sourceUrl: string) {
  try {
    const url = new URL(sourceUrl);
    return {
      sourceHttps: url.protocol === "https:",
      sourceCloudinaryVideo:
        url.hostname === "res.cloudinary.com" &&
        url.pathname.includes("/video/upload/"),
      sourceMp4Path: url.pathname.toLowerCase().endsWith(".mp4"),
    };
  } catch {
    return {
      sourceHttps: false,
      sourceCloudinaryVideo: false,
      sourceMp4Path: false,
    };
  }
}

function isMetaPlatform(
  platform: VideoSocialPlatform
): platform is "instagram" | "facebook" {
  return platform === "instagram" || platform === "facebook";
}

export function preflightMetaVideoTarget(params: {
  asset: VideoAsset;
  target: SocialTarget;
  environment?: EnvironmentSource;
  allowDisabled?: boolean;
}): MetaVideoPreflightResult {
  const { asset, target } = params;
  if (!isMetaPlatform(target.platform)) {
    throw new TypeError("Meta video preflight only supports Instagram and Facebook");
  }

  const environment = params.environment ?? process.env;
  const targetContent =
    target.platform === "instagram"
      ? getVideoTargetContent(asset, "instagram", target.id)
      : getVideoTargetContent(asset, "facebook", target.id);
  const accountIdPresent = configuredValuePresent(
    environment,
    target.accountIdEnv
  );
  const configuredAccountId = target.accountIdEnv
    ? environment[target.accountIdEnv]?.trim()
    : undefined;
  const accountIdMatchesExpected =
    !target.expectedAccountId || configuredAccountId === target.expectedAccountId;
  const accessTokenPresent = configuredValuePresent(
    environment,
    target.accessTokenEnv
  );
  const source = inspectSourceUrl(asset.sourceUrl);
  const copyUsable =
    target.platform === "instagram"
      ? Boolean(
          targetContent &&
            "caption" in targetContent &&
            targetContent.caption.trim()
        )
      : Boolean(
          targetContent &&
            "message" in targetContent &&
            targetContent.message.trim()
        );
  const errors: string[] = [];

  if (!params.allowDisabled) {
    if (!target.enabled) errors.push("target is disabled");
    if (!asset.enabled) errors.push("asset is disabled");
    if (!targetContent) {
      errors.push(`exact ${target.platform} target content is not configured`);
    } else if (!targetContent.enabled) {
      errors.push(`${target.platform} destination is disabled for target`);
    }
  } else {
    if (!targetContent) {
      errors.push(`exact ${target.platform} target content is not configured`);
    }
  }
  if (!accountIdPresent) errors.push("account or Page ID is not configured");
  if (accountIdPresent && !accountIdMatchesExpected) {
    errors.push("configured account or Page ID does not match the target registry");
  }
  if (!accessTokenPresent) errors.push("access token is not configured");
  if (!source.sourceHttps) errors.push("source URL must use HTTPS");
  if (!source.sourceCloudinaryVideo) {
    errors.push("source URL must be a public Cloudinary video delivery URL");
  }
  if (!source.sourceMp4Path) errors.push("source URL must use an MP4-style path");
  if (!copyUsable) {
    errors.push(
      target.platform === "instagram"
        ? "Instagram caption is required"
        : "Facebook message is required"
    );
  }

  return {
    targetId: target.id,
    platform: target.platform,
    targetEnabled: target.enabled,
    assetEnabled: asset.enabled,
    destinationEnabled: targetContent?.enabled ?? false,
    accountIdPresent,
    accountIdMatchesExpected,
    accessTokenPresent,
    ...source,
    copyUsable,
    valid: errors.length === 0,
    errors,
    unverifiedMediaConstraints: [
      "codec and audio codec",
      "duration and file size",
      "pixel dimensions and aspect ratio",
      "frame rate and bitrate",
    ],
    unverifiedProviderChecks: [
      "token validity, expiry, and granted scopes",
      "account or Page eligibility for Reels publishing",
      "Instagram business account and Facebook Page linkage",
    ],
  };
}

export function preflightYouTubeVideoTarget(params: {
  asset: VideoAsset;
  target: SocialTarget;
  environment?: EnvironmentSource;
  allowDisabled?: boolean;
}): YouTubeVideoPreflightResult {
  const { asset, target } = params;
  if (target.platform !== "youtube") {
    throw new TypeError("YouTube video preflight only supports YouTube targets");
  }

  const environment = params.environment ?? process.env;
  const targetContent = getVideoTargetContent(asset, "youtube", target.id);

  const clientIdPresent = configuredValuePresent(environment, target.clientIdEnv);
  const clientSecretPresent = configuredValuePresent(
    environment,
    target.clientSecretEnv
  );
  const refreshTokenPresent = configuredValuePresent(
    environment,
    target.refreshTokenEnv
  );
  const channelIdPresent = configuredValuePresent(
    environment,
    target.accountIdEnv
  );
  const configuredChannelId = target.accountIdEnv
    ? environment[target.accountIdEnv]?.trim()
    : undefined;
  const channelIdMatchesExpected =
    !target.expectedAccountId || configuredChannelId === target.expectedAccountId;

  const source = inspectSourceUrl(asset.sourceUrl);

  const titlePresent = Boolean(
    targetContent &&
      "title" in targetContent &&
      typeof targetContent.title === "string" &&
      targetContent.title.trim()
  );
  const descriptionPresent = Boolean(
    targetContent &&
      "description" in targetContent &&
      typeof targetContent.description === "string" &&
      targetContent.description.trim()
  );
  const copyUsable = titlePresent && descriptionPresent;

  const errors: string[] = [];

  if (!params.allowDisabled) {
    if (!target.enabled) errors.push("target is disabled");
    if (!asset.enabled) errors.push("asset is disabled");
    if (!targetContent) {
      errors.push("exact youtube target content is not configured");
    } else if (!targetContent.enabled) {
      errors.push("youtube destination is disabled for target");
    }
  } else {
    if (!targetContent) {
      errors.push("exact youtube target content is not configured");
    }
  }

  if (!clientIdPresent) errors.push("YOUTUBE_CLIENT_ID is not configured");
  if (!clientSecretPresent) errors.push("YOUTUBE_CLIENT_SECRET is not configured");
  if (!refreshTokenPresent) errors.push("YOUTUBE_REFRESH_TOKEN is not configured");
  if (!channelIdPresent) errors.push("YOUTUBE_CHANNEL_ID is not configured");
  if (channelIdPresent && !channelIdMatchesExpected) {
    errors.push("configured Channel ID does not match the target registry");
  }

  if (!source.sourceHttps) errors.push("source URL must use HTTPS");
  if (!source.sourceCloudinaryVideo) {
    errors.push("source URL must be a public Cloudinary video delivery URL");
  }
  if (!source.sourceMp4Path) errors.push("source URL must use an MP4-style path");

  if (!titlePresent) errors.push("YouTube title is required");
  if (!descriptionPresent) errors.push("YouTube description is required");

  return {
    targetId: target.id,
    platform: "youtube",
    targetEnabled: target.enabled,
    assetEnabled: asset.enabled,
    destinationEnabled: targetContent?.enabled ?? false,
    clientIdPresent,
    clientSecretPresent,
    refreshTokenPresent,
    channelIdPresent,
    channelIdMatchesExpected,
    ...source,
    copyUsable,
    titlePresent,
    descriptionPresent,
    valid: errors.length === 0,
    errors,
    unverifiedMediaConstraints: [
      "codec and audio codec",
      "duration and file size",
      "pixel dimensions and aspect ratio",
      "frame rate and bitrate",
    ],
    unverifiedProviderChecks: [
      "OAuth token refresh validity and expiry",
      "YouTube channel ownership and upload quota",
      "YouTube upload API scope (https://www.googleapis.com/auth/youtube.upload)",
    ],
  };
}

export function preflightSocialVideoTarget(params: {
  asset: VideoAsset;
  target: SocialTarget;
  environment?: EnvironmentSource;
  allowDisabled?: boolean;
}): SocialVideoPreflightResult {
  return params.target.platform === "youtube"
    ? preflightYouTubeVideoTarget(params)
    : preflightMetaVideoTarget(params);
}

export function assertMetaVideoPreflight(
  result: MetaVideoPreflightResult
): asserts result is MetaVideoPreflightResult & { valid: true } {
  if (!result.valid) throw new MetaVideoPreflightError(result);
}

export function assertYouTubeVideoPreflight(
  result: YouTubeVideoPreflightResult
): asserts result is YouTubeVideoPreflightResult & { valid: true } {
  if (!result.valid) throw new YouTubeVideoPreflightError(result);
}

export function readMetaTargetCredentials(
  target: SocialTarget,
  environment: EnvironmentSource
): { accountId: string; accessToken: string } {
  const accountId = target.accountIdEnv
    ? environment[target.accountIdEnv]?.trim()
    : undefined;
  const accessToken = target.accessTokenEnv
    ? environment[target.accessTokenEnv]?.trim()
    : undefined;

  if (!accountId || !accessToken) {
    throw new TypeError("Meta target credentials are incomplete; run preflight first");
  }

  return { accountId, accessToken };
}

export function readYouTubeTargetCredentials(
  target: SocialTarget,
  environment: EnvironmentSource
): {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  channelId?: string;
} {
  const clientId = target.clientIdEnv
    ? environment[target.clientIdEnv]?.trim()
    : undefined;
  const clientSecret = target.clientSecretEnv
    ? environment[target.clientSecretEnv]?.trim()
    : undefined;
  const refreshToken = target.refreshTokenEnv
    ? environment[target.refreshTokenEnv]?.trim()
    : undefined;
  const channelId = target.accountIdEnv
    ? environment[target.accountIdEnv]?.trim()
    : undefined;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new TypeError(
      "YouTube target credentials are incomplete (clientId, clientSecret, or refreshToken missing); run preflight first"
    );
  }

  return { clientId, clientSecret, refreshToken, channelId };
}
