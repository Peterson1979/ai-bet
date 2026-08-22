import type {
  SafeProviderError,
  VideoLastSuccessHistory,
  VideoRunRecord,
  VideoSocialPlatform,
  VideoTargetPublicationStatus,
  VideoTargetPublicationState,
} from "./types";

const DETAIL_RECORD_TTL_SECONDS = 90 * 24 * 60 * 60;
export const VIDEO_SOCIAL_LOCK_TTL_SECONDS = 6 * 60;

async function getSharedRedis() {
  return (await import("../../redis")).redis;
}

function keyPart(value: string, label: string): string {
  if (!value) throw new TypeError(`${label} must not be empty`);
  return encodeURIComponent(value);
}

export const VIDEO_SOCIAL_KEYS = {
  history: "social:video:history",
  lock(slot: string) {
    return `social:video:lock:${keyPart(slot, "slot")}`;
  },
  run(slot: string) {
    return `social:video:run:${keyPart(slot, "slot")}`;
  },
  targetHistory(platform: VideoSocialPlatform, targetId: string) {
    return `social:video:target-history:${platform}:${keyPart(targetId, "targetId")}`;
  },
  publication(
    runId: string,
    platform: VideoSocialPlatform,
    targetId: string
  ) {
    return `social:video:pub:${keyPart(runId, "runId")}:${platform}:${keyPart(
      targetId,
      "targetId"
    )}`;
  },
} as const;

export type VideoHistoryReadClient = {
  zscore(key: string, member: string): Promise<number | null>;
};

export type VideoHistoryWriteClient = {
  zadd(
    key: string,
    entry: { score: number; member: string }
  ): Promise<unknown>;
};

export type VideoLockClient = {
  set(
    key: string,
    value: string,
    options: { nx: true; ex: number }
  ): Promise<unknown>;
};

export type ProviderReconciliationDecision =
  | "initialize"
  | "resume_existing"
  | "reconcile_ambiguous_publish"
  | "already_published";

export function createPendingTargetPublicationState(params: {
  runId: string;
  videoId: string;
  platform: VideoSocialPlatform;
  targetId: string;
  now?: string;
}): VideoTargetPublicationState {
  const now = params.now ?? new Date().toISOString();
  return {
    runId: params.runId,
    videoId: params.videoId,
    platform: params.platform,
    targetId: params.targetId,
    status: "pending",
    attempts: 0,
    providerResourceId: null,
    providerContainerId: null,
    providerUploadId: null,
    providerUploadUrl: null,
    providerMediaId: null,
    postId: null,
    publishedAt: null,
    error: null,
    createdAt: now,
    updatedAt: now,
  };
}

export function advanceTargetPublicationState(
  current: VideoTargetPublicationState,
  update: {
    status: VideoTargetPublicationStatus;
    attempts?: number;
    providerResourceId?: string | null;
    providerContainerId?: string | null;
    providerUploadId?: string | null;
    providerUploadUrl?: string | null;
    providerMediaId?: string | null;
    postId?: string | null;
    publishedAt?: string | null;
    error?: SafeProviderError | null;
    updatedAt?: string;
  }
): VideoTargetPublicationState {
  const attempts = update.attempts ?? current.attempts;
  if (!Number.isInteger(attempts) || attempts < current.attempts) {
    throw new RangeError("provider attempts must be a non-decreasing integer");
  }

  return {
    ...current,
    ...update,
    attempts,
    updatedAt: update.updatedAt ?? new Date().toISOString(),
  };
}

export function getProviderReconciliationDecision(
  state: VideoTargetPublicationState | null | undefined
): ProviderReconciliationDecision {
  if (!state) return "initialize";
  if (state.status === "published") return "already_published";
  if (state.status === "publishing") {
    // Facebook's provider video ID can be polled without repeating finish.
    // Instagram media_publish has no idempotency key, so its outcome is
    // deliberately treated as ambiguous until a separate reconciliation exists.
    if (
      state.platform === "facebook" &&
      (state.providerUploadId || state.providerMediaId || state.providerResourceId)
    ) {
      return "resume_existing";
    }
    return "reconcile_ambiguous_publish";
  }

  const hasProviderResource = Boolean(
    state.providerResourceId ||
      state.providerContainerId ||
      state.providerUploadId ||
      state.providerUploadUrl ||
      state.providerMediaId
  );

  return hasProviderResource ? "resume_existing" : "initialize";
}

export async function acquireVideoSocialLock(
  slot: string,
  owner: string,
  ttlSeconds = VIDEO_SOCIAL_LOCK_TTL_SECONDS,
  client?: VideoLockClient
): Promise<boolean> {
  if (!Number.isInteger(ttlSeconds) || ttlSeconds < 1 || ttlSeconds > 15 * 60) {
    throw new RangeError("video social lock TTL must be between 1 and 900 seconds");
  }
  const lockClient = client ?? (await getSharedRedis());
  const result = await lockClient.set(VIDEO_SOCIAL_KEYS.lock(slot), owner, {
    nx: true,
    ex: ttlSeconds,
  });
  return result === "OK" || result === true;
}

export async function readVideoLastSuccessHistory(
  videoIds: readonly string[],
  client?: VideoHistoryReadClient
): Promise<VideoLastSuccessHistory> {
  const historyClient = client ?? (await getSharedRedis());
  const uniqueVideoIds = Array.from(new Set(videoIds));
  const scores = await Promise.all(
    uniqueVideoIds.map((videoId) =>
      historyClient.zscore(VIDEO_SOCIAL_KEYS.history, videoId)
    )
  );

  return uniqueVideoIds.reduce<VideoLastSuccessHistory>((history, videoId, index) => {
    const score = scores[index];
    if (typeof score === "number" && Number.isFinite(score)) {
      history[videoId] = score;
    }
    return history;
  }, {});
}

export async function recordSuccessfulVideoUse(
  videoId: string,
  successfulAtMs = Date.now(),
  client?: VideoHistoryWriteClient
) {
  if (!Number.isFinite(successfulAtMs)) {
    throw new TypeError("successfulAtMs must be a finite timestamp");
  }
  const historyClient = client ?? (await getSharedRedis());
  return historyClient.zadd(VIDEO_SOCIAL_KEYS.history, {
    score: successfulAtMs,
    member: videoId,
  });
}

export async function recordSuccessfulTargetUse(
  platform: VideoSocialPlatform,
  targetId: string,
  videoId: string,
  successfulAtMs = Date.now(),
  client?: VideoHistoryWriteClient
) {
  if (!Number.isFinite(successfulAtMs)) {
    throw new TypeError("successfulAtMs must be a finite timestamp");
  }
  const historyClient = client ?? (await getSharedRedis());
  return historyClient.zadd(VIDEO_SOCIAL_KEYS.targetHistory(platform, targetId), {
    score: successfulAtMs,
    member: videoId,
  });
}

export async function getVideoRun(slot: string) {
  const redis = await getSharedRedis();
  return redis.get<VideoRunRecord>(VIDEO_SOCIAL_KEYS.run(slot));
}

export async function saveVideoRun(record: VideoRunRecord) {
  const redis = await getSharedRedis();
  return redis.set(VIDEO_SOCIAL_KEYS.run(record.slot), record, {
    ex: DETAIL_RECORD_TTL_SECONDS,
  });
}

export async function getTargetPublicationState(
  runId: string,
  platform: VideoSocialPlatform,
  targetId: string
) {
  const redis = await getSharedRedis();
  return redis.get<VideoTargetPublicationState>(
    VIDEO_SOCIAL_KEYS.publication(runId, platform, targetId)
  );
}

export async function saveTargetPublicationState(
  state: VideoTargetPublicationState
) {
  const redis = await getSharedRedis();
  return redis.set(
    VIDEO_SOCIAL_KEYS.publication(state.runId, state.platform, state.targetId),
    state,
    { ex: DETAIL_RECORD_TTL_SECONDS }
  );
}
