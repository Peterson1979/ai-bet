import type {
  FacebookTargetVideoContent,
  InstagramTargetVideoContent,
  YouTubeTargetVideoContent,
} from "./types";

export const VIDEO_COPY_PROMPT_VERSION = "matchsignal-video-copy-v2";
export const VIDEO_COPY_PROVIDER = "groq";
export const VIDEO_COPY_MODEL = "openai/gpt-oss-120b";

export const VIDEO_COPY_TARGET_IDS = {
  instagram: ["instagram-main", "instagram-2"],
  facebook: ["facebook-main", "facebook-2", "facebook-3", "facebook-4"],
  youtube: ["youtube-main"],
} as const;

export type VideoContentInput = {
  id: string;
  topic: string;
  visual: string;
  voiceover: string;
  sourceUrl: string | null;
};

export type GeneratedInstagramCopy = {
  targetId: string;
  caption: string;
};

export type GeneratedFacebookCopy = {
  targetId: string;
  message: string;
};

export type GeneratedYouTubeCopy = {
  targetId: string;
  title: string;
  description: string;
  tags: string[];
};

export type GeneratedVideoCopy = {
  id: string;
  platforms: {
    instagram: { targets: GeneratedInstagramCopy[] };
    facebook: { targets: GeneratedFacebookCopy[] };
    youtube: { targets: GeneratedYouTubeCopy[] };
  };
};

export type VideoContentPackageStatus = "draft" | "ready" | "rejected";

export type VideoContentPackage = {
  id: string;
  status: VideoContentPackageStatus;
  source: VideoContentInput;
  platforms: {
    instagram: { targets: InstagramTargetVideoContent[] };
    facebook: { targets: FacebookTargetVideoContent[] };
    youtube: { targets: YouTubeTargetVideoContent[] };
  };
  generation: {
    provider: typeof VIDEO_COPY_PROVIDER;
    model: string;
    generatedAt: string;
    promptVersion: typeof VIDEO_COPY_PROMPT_VERSION;
  };
};

export type CopyValidationIssue = {
  path: string;
  message: string;
};

export type CopyValidationResult =
  | { valid: true; errors: [] }
  | { valid: false; errors: CopyValidationIssue[] };
