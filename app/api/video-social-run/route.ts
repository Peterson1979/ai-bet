import { timingSafeEqual } from "node:crypto";

import {
  buildDryRunPublicationPlan,
  parseVideoSocialMode,
  VIDEO_SOCIAL_COOLDOWN_MS,
} from "@/app/lib/social/video/config";
import {
  VIDEO_SOCIAL_CANARY_AUTHORIZATION_ENV,
  VIDEO_SOCIAL_CANARY_SOURCE_ENABLED,
} from "@/app/lib/social/video/canary-gate";
import { VIDEO_MANIFEST } from "@/app/lib/social/video/manifest";
import {
  preflightMetaVideoTarget,
  type EnvironmentSource,
} from "@/app/lib/social/video/preflight";
import { selectLeastRecentlyUsedVideo } from "@/app/lib/social/video/select-video";
import {
  runLiveVideoSocialCanary,
  type LiveVideoSocialResult,
  type VideoSocialCanaryIntent,
} from "@/app/lib/social/video/run-live";
import { readVideoLastSuccessHistory } from "@/app/lib/social/video/state";
import { VIDEO_SOCIAL_TARGETS } from "@/app/lib/social/video/targets";
import type { VideoLastSuccessHistory } from "@/app/lib/social/video/types";
import { validateVideoSocialConfiguration } from "@/app/lib/social/video/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Reserved for the bounded Meta polling workflow once the canary gate is opened.
export const maxDuration = 300;

const VIDEO_SOCIAL_CANARY_REQUEST_SECRET_ENV =
  "VIDEO_SOCIAL_CANARY_REQUEST_SECRET";
const VIDEO_SOCIAL_CANARY_REQUEST_SECRET_HEADER =
  "x-video-social-canary-secret";

function secretsMatch(candidate: string | null, expected: string | undefined) {
  if (!candidate || !expected) return false;
  const candidateBytes = Buffer.from(candidate);
  const expectedBytes = Buffer.from(expected);
  return (
    candidateBytes.length === expectedBytes.length &&
    timingSafeEqual(candidateBytes, expectedBytes)
  );
}

function isAuthorized(
  request: Request,
  environment: EnvironmentSource
): boolean {
  const cronSecret = environment.CRON_SECRET;
  const authorization = request.headers.get("authorization");
  const cronHeader = request.headers.get("x-cron-secret");
  const bearerToken = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : null;

  if (
    cronSecret &&
    (bearerToken === cronSecret || cronHeader === cronSecret)
  ) {
    return true;
  }

  const url = new URL(request.url);
  if (url.searchParams.get("intent") !== "canary") return false;

  return secretsMatch(
    request.headers.get(VIDEO_SOCIAL_CANARY_REQUEST_SECRET_HEADER),
    environment[VIDEO_SOCIAL_CANARY_REQUEST_SECRET_ENV]
  );
}

function safeIsoTimestamp(timestamp: number | null): string | null {
  return timestamp === null ? null : new Date(timestamp).toISOString();
}

export async function GET(request: Request) {
  return handleVideoSocialRun(request);
}

export type VideoSocialRouteDependencies = {
  environment?: EnvironmentSource;
  now?: () => number;
  readHistory?: (
    videoIds: readonly string[]
  ) => Promise<VideoLastSuccessHistory>;
  runLiveCanary?: (
    intent: VideoSocialCanaryIntent
  ) => Promise<LiveVideoSocialResult>;
};

export async function handleVideoSocialRun(
  request: Request,
  dependencies: VideoSocialRouteDependencies = {}
) {
  const environment = dependencies.environment ?? process.env;
  if (!isAuthorized(request, environment)) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const modeConfig = parseVideoSocialMode(environment.VIDEO_SOCIAL_MODE);
  const safety = {
    providerCallsMade: false,
    publicationStateMutated: false,
  } as const;

  if (!modeConfig.valid) {
    return Response.json(
      {
        ok: false,
        mode: "disabled",
        error: modeConfig.error,
        ...safety,
      },
      { status: 503 }
    );
  }

  if (modeConfig.mode === "disabled") {
    return Response.json({
      ok: true,
      mode: "disabled",
      disabled: true,
      reason: "video social publishing is disabled",
      ...safety,
    });
  }

  if (modeConfig.mode === "live") {
    const url = new URL(request.url);
    const intent: VideoSocialCanaryIntent = {
      intent: url.searchParams.get("intent") ?? undefined,
      assetId: url.searchParams.get("assetId") ?? undefined,
      platform: url.searchParams.get("platform") ?? undefined,
      targetId: url.searchParams.get("targetId") ?? undefined,
    };

    if (intent.intent === "canary") {
      const runLiveCanary =
        dependencies.runLiveCanary ??
        ((canaryIntent) =>
          runLiveVideoSocialCanary(canaryIntent, { environment }));
      const result = await runLiveCanary(intent);
      return Response.json(result.body, { status: result.status });
    }

    return Response.json(
      {
        ok: false,
        mode: "live",
        publisherAdaptersImplemented: true,
        canaryAuthorizationRequired: true,
        canaryExecutionEnabled: VIDEO_SOCIAL_CANARY_SOURCE_ENABLED,
        canaryAuthorizationEnv: VIDEO_SOCIAL_CANARY_AUTHORIZATION_ENV,
        error:
          "video social live publishing requires an explicit canary request",
        ...safety,
      },
      { status: 501 }
    );
  }

  const validation = validateVideoSocialConfiguration(
    VIDEO_MANIFEST,
    VIDEO_SOCIAL_TARGETS
  );

  if (!validation.valid) {
    return Response.json(
      {
        ok: false,
        mode: "dry-run",
        error: "video social configuration is invalid",
        validation,
        ...safety,
      },
      { status: 500 }
    );
  }

  try {
    const nowMs = dependencies.now?.() ?? Date.now();
    const readHistory =
      dependencies.readHistory ?? readVideoLastSuccessHistory;
    const history = await readHistory(
      VIDEO_MANIFEST.map((asset) => asset.id)
    );
    const selection = selectLeastRecentlyUsedVideo(VIDEO_MANIFEST, history, {
      nowMs,
      cooldownMs: VIDEO_SOCIAL_COOLDOWN_MS,
    });

    if (selection.status === "no_eligible_video") {
      return Response.json({
        ok: true,
        mode: "dry-run",
        selection: selection.status,
        selectedVideoId: null,
        validation,
        ...safety,
      });
    }

    if (selection.status === "cooldown_blocked") {
      return Response.json({
        ok: true,
        mode: "dry-run",
        selection: selection.status,
        selectedVideoId: null,
        eligibleVideoIds: selection.eligibleVideoIds,
        earliestEligibleAt: safeIsoTimestamp(selection.earliestEligibleAt),
        validation,
        ...safety,
      });
    }

    const plan = buildDryRunPublicationPlan(
      selection.asset,
      VIDEO_SOCIAL_TARGETS
    );
    const metaPreflight = VIDEO_SOCIAL_TARGETS.filter(
      (target) =>
        target.platform === "instagram" || target.platform === "facebook"
    ).map((target) =>
      preflightMetaVideoTarget({
        asset: selection.asset,
        target,
        environment,
      })
    );

    return Response.json({
      ok: true,
      mode: "dry-run",
      selection: selection.status,
      selectedVideoId: selection.asset.id,
      sourceUrl: selection.asset.sourceUrl,
      hasEverBeenUsed: selection.hasEverBeenUsed,
      previousSuccessfulUseAt: safeIsoTimestamp(selection.previousSuccessAt),
      cooldown: {
        durationMs: VIDEO_SOCIAL_COOLDOWN_MS,
        status: selection.hasEverBeenUsed ? "expired" : "never-used",
        eligibleAt: safeIsoTimestamp(selection.cooldownUntil),
      },
      eligiblePlatforms: plan.eligiblePlatforms,
      resolvedTargetIds: plan.resolvedTargetIds,
      targetContent: plan.targetContent,
      metaPreflight,
      validation,
      ...safety,
    });
  } catch {
    console.error("[video-social-run] dry-run planning failed");
    return Response.json(
      {
        ok: false,
        mode: "dry-run",
        error: "video social dry-run planning failed",
        ...safety,
      },
      { status: 503 }
    );
  }
}
