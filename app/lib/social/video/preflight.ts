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

export class MetaVideoPreflightError extends Error {
  readonly result: MetaVideoPreflightResult;

  constructor(result: MetaVideoPreflightResult) {
    super(`${result.platform} target ${result.targetId} failed video preflight`);
    this.name = "MetaVideoPreflightError";
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

  if (!target.enabled) errors.push("target is disabled");
  if (!asset.enabled) errors.push("asset is disabled");
  if (!targetContent) {
    errors.push(`exact ${target.platform} target content is not configured`);
  } else if (!targetContent.enabled) {
    errors.push(`${target.platform} destination is disabled for target`);
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

export function assertMetaVideoPreflight(
  result: MetaVideoPreflightResult
): asserts result is MetaVideoPreflightResult & { valid: true } {
  if (!result.valid) throw new MetaVideoPreflightError(result);
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
