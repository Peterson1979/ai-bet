import type {
  VideoAsset,
  VideoLastSuccessHistory,
  VideoSelection,
} from "./types";

export type SelectVideoOptions = {
  nowMs: number;
  cooldownMs: number;
};

export function selectLeastRecentlyUsedVideo(
  manifest: readonly VideoAsset[],
  history: VideoLastSuccessHistory,
  options: SelectVideoOptions
): VideoSelection {
  if (!Number.isFinite(options.nowMs)) {
    throw new TypeError("nowMs must be a finite timestamp");
  }
  if (!Number.isFinite(options.cooldownMs) || options.cooldownMs < 0) {
    throw new RangeError("cooldownMs must be a non-negative finite number");
  }

  const eligible = manifest
    .map((asset, manifestIndex) => ({
      asset,
      manifestIndex,
      previousSuccessAt:
        typeof history[asset.id] === "number" &&
        Number.isFinite(history[asset.id])
          ? history[asset.id]
          : null,
    }))
    .filter(({ asset }) => asset.enabled);

  if (eligible.length === 0) {
    return { status: "no_eligible_video", eligibleVideoIds: [] };
  }

  const neverUsed = eligible.find((candidate) => candidate.previousSuccessAt === null);
  if (neverUsed) {
    return {
      status: "selected",
      asset: neverUsed.asset,
      hasEverBeenUsed: false,
      previousSuccessAt: null,
      cooldownUntil: null,
    };
  }

  const outsideCooldown = eligible
    .filter(
      (candidate) =>
        candidate.previousSuccessAt !== null &&
        candidate.previousSuccessAt + options.cooldownMs <= options.nowMs
    )
    .sort((left, right) => {
      const timestampDifference =
        left.previousSuccessAt! - right.previousSuccessAt!;
      return timestampDifference || left.manifestIndex - right.manifestIndex;
    });

  const selected = outsideCooldown[0];
  if (selected) {
    return {
      status: "selected",
      asset: selected.asset,
      hasEverBeenUsed: true,
      previousSuccessAt: selected.previousSuccessAt,
      cooldownUntil: selected.previousSuccessAt! + options.cooldownMs,
    };
  }

  const earliestEligibleAt = Math.min(
    ...eligible.map(
      (candidate) => candidate.previousSuccessAt! + options.cooldownMs
    )
  );

  return {
    status: "cooldown_blocked",
    eligibleVideoIds: eligible.map(({ asset }) => asset.id),
    earliestEligibleAt,
  };
}
