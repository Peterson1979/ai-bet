export const VIDEO_SOCIAL_PLATFORMS = [
  "instagram",
  "facebook",
  "youtube",
] as const;

export type VideoSocialPlatform = (typeof VIDEO_SOCIAL_PLATFORMS)[number];

export type VideoSocialMode = "disabled" | "dry-run" | "live";
export type InstagramApiMode = "facebook-login" | "instagram-login";

type TargetVideoContent = {
  targetId: string;
  enabled: boolean;
};

export type InstagramTargetVideoContent = TargetVideoContent & {
  caption: string;
};

export type FacebookTargetVideoContent = TargetVideoContent & {
  message: string;
};

export type YouTubeTargetVideoContent = TargetVideoContent & {
  title: string;
  description: string;
  tags?: string[];
};

export type InstagramVideoConfig = {
  targets: InstagramTargetVideoContent[];
};

export type FacebookVideoConfig = {
  targets: FacebookTargetVideoContent[];
};

export type YouTubeVideoConfig = {
  targets: YouTubeTargetVideoContent[];
};

export type VideoAsset = {
  id: string;
  sourceUrl: string;
  enabled: boolean;
  platforms: {
    instagram: InstagramVideoConfig;
    facebook: FacebookVideoConfig;
    youtube: YouTubeVideoConfig;
  };
};

export type SocialTarget = {
  id: string;
  platform: VideoSocialPlatform;
  enabled: boolean;
  accountIdEnv?: string;
  accessTokenEnv?: string;
  clientIdEnv?: string;
  clientSecretEnv?: string;
  refreshTokenEnv?: string;
  expectedAccountId?: string;
  instagramApiMode?: InstagramApiMode;
};

export type ResolvedVideoTarget = SocialTarget;

export type ResolvedVideoTargets = Record<
  VideoSocialPlatform,
  ResolvedVideoTarget[]
>;

export type VideoLastSuccessHistory = Record<string, number>;

export type VideoSelection =
  | {
      status: "selected";
      asset: VideoAsset;
      hasEverBeenUsed: boolean;
      previousSuccessAt: number | null;
      cooldownUntil: number | null;
    }
  | {
      status: "cooldown_blocked";
      eligibleVideoIds: string[];
      earliestEligibleAt: number;
    }
  | {
      status: "no_eligible_video";
      eligibleVideoIds: [];
    };

export type VideoRunStatus =
  | "planned"
  | "publishing"
  | "partially_published"
  | "published"
  | "failed";

export type VideoRunRecord = {
  runId: string;
  slot: string;
  videoId: string;
  intent: "canary" | "scheduled";
  platform: "instagram" | "facebook" | "multi";
  targetIds: string[];
  status: VideoRunStatus;
  createdAt: string;
  updatedAt: string;
};

export type VideoTargetPublicationStatus =
  | "pending"
  | "container_created"
  | "processing"
  | "ready"
  | "publishing"
  | "published"
  | "failed";

export type SafeProviderError = {
  provider: "instagram" | "facebook";
  operation: string;
  message: string;
  httpStatus?: number;
  code?: string | number;
  subcode?: string | number;
  retryable: boolean;
};

export type VideoTargetPublicationState = {
  runId: string;
  videoId: string;
  platform: VideoSocialPlatform;
  targetId: string;
  status: VideoTargetPublicationStatus;
  attempts: number;
  providerResourceId?: string | null;
  providerContainerId?: string | null;
  providerUploadId?: string | null;
  /** Sensitive session metadata: persist for resume; never expose in API responses or logs. */
  providerUploadUrl?: string | null;
  providerMediaId?: string | null;
  postId?: string | null;
  publishedAt?: string | null;
  error?: SafeProviderError | null;
  createdAt: string;
  updatedAt: string;
};

export type ProviderProgressHook = (
  state: VideoTargetPublicationState
) => void | Promise<void>;
