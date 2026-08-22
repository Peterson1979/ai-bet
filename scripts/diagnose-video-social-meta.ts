import { diagnoseMetaVideoTarget } from "../app/lib/social/video/meta-readiness";
import { VIDEO_SOCIAL_TARGETS } from "../app/lib/social/video/targets";

const ACK_ENV = "META_VIDEO_READINESS_ACK";
const ACK_VALUE = "READ_ONLY_META_DIAGNOSTICS";

async function main() {
  if (process.env[ACK_ENV] !== ACK_VALUE) {
    throw new Error(
      `${ACK_ENV} must equal ${ACK_VALUE}; no Meta request was made`
    );
  }

  const requestedTargetIds = process.argv.slice(2);
  if (requestedTargetIds.length === 0) {
    throw new Error("provide at least one exact Meta target ID; no request was made");
  }

  const uniqueTargetIds = new Set(requestedTargetIds);
  if (uniqueTargetIds.size !== requestedTargetIds.length) {
    throw new Error("duplicate target IDs are not allowed; no request was made");
  }

  const targets = requestedTargetIds.map((targetId) => {
    const target = VIDEO_SOCIAL_TARGETS.find((candidate) => candidate.id === targetId);
    if (!target || (target.platform !== "instagram" && target.platform !== "facebook")) {
      throw new Error(`unknown or unsupported Meta target: ${targetId}`);
    }
    return target;
  });

  const results = [];
  for (const target of targets) {
    results.push(
      await diagnoseMetaVideoTarget({
        target,
        environment: process.env,
        expectedInstagramAccountIdEnv:
          target.platform === "facebook" ? "INSTAGRAM_BUSINESS_ID" : undefined,
      })
    );
  }

  console.log(JSON.stringify({ mode: "read-only-meta-diagnostics", results }, null, 2));
  if (results.some((result) => !result.valid)) process.exitCode = 2;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "diagnostics failed safely");
  process.exitCode = 1;
});
