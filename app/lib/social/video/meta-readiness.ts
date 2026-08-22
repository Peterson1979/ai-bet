import {
  META_GRAPH_BASE,
  requestMetaJson,
  toSafeProviderError,
  type FetchLike,
  type SleepFunction,
} from "./meta-request";
import type { EnvironmentSource } from "./preflight";
import type { SafeProviderError, SocialTarget } from "./types";

type MetaIdentityResponse = {
  id?: string;
  instagram_business_account?: { id?: string };
};

type MetaPermissionsResponse = {
  data?: Array<{ permission?: string; status?: string }>;
};

export const META_VIDEO_REQUIRED_PERMISSIONS = {
  instagram: [
    "instagram_basic",
    "instagram_content_publish",
    "pages_read_engagement",
  ],
  facebook: ["pages_manage_posts", "pages_read_engagement"],
} as const;

export type MetaReadinessDiagnosticsResult = {
  targetId: string;
  platform: "instagram" | "facebook";
  targetEnabled: boolean;
  accountIdPresent: boolean;
  accessTokenPresent: boolean;
  identityAccessible: boolean;
  configuredIdentityMatches: boolean;
  permissionsAccessible: boolean;
  requiredPermissions: readonly string[];
  grantedRequiredPermissions: string[];
  missingRequiredPermissions: string[];
  pageInstagramRelationship:
    | "matches"
    | "mismatch"
    | "not_configured"
    | "not_applicable"
    | "unknown";
  valid: boolean;
  providerRequestsMade: number;
  requestMethods: "GET"[];
  errors: SafeProviderError[];
};

function isMetaTarget(
  target: SocialTarget
): target is SocialTarget & { platform: "instagram" | "facebook" } {
  return target.platform === "instagram" || target.platform === "facebook";
}

function graphUrl(id: string, fields: string): string {
  const encodedPath = id.split("/").map(encodeURIComponent).join("/");
  const url = new URL(`${META_GRAPH_BASE}/${encodedPath}`);
  url.searchParams.set("fields", fields);
  return url.toString();
}

/**
 * Executes GET-only Meta diagnostics when called by the explicit diagnostics
 * script. Normal dry-run and live-fail-closed routes do not import or call it.
 */
export async function diagnoseMetaVideoTarget(params: {
  target: SocialTarget;
  environment?: EnvironmentSource;
  expectedInstagramAccountIdEnv?: string;
  fetchFn?: FetchLike;
  sleep?: SleepFunction;
  requestTimeoutMs?: number;
}): Promise<MetaReadinessDiagnosticsResult> {
  if (!isMetaTarget(params.target)) {
    throw new TypeError("Meta readiness diagnostics support Instagram and Facebook");
  }

  const { target } = params;
  const environment = params.environment ?? process.env;
  const accountId = target.accountIdEnv
    ? environment[target.accountIdEnv]?.trim()
    : undefined;
  const accessToken = target.accessTokenEnv
    ? environment[target.accessTokenEnv]?.trim()
    : undefined;
  const expectedInstagramId = params.expectedInstagramAccountIdEnv
    ? environment[params.expectedInstagramAccountIdEnv]?.trim()
    : undefined;
  const requiredPermissions = META_VIDEO_REQUIRED_PERMISSIONS[target.platform];
  const errors: SafeProviderError[] = [];
  const requestMethods: "GET"[] = [];
  let providerRequestsMade = 0;
  let identity: MetaIdentityResponse | null = null;
  let permissions: MetaPermissionsResponse | null = null;

  const safeRequest = async <T>(operation: string, url: string): Promise<T | null> => {
    if (!accessToken) return null;
    providerRequestsMade += 1;
    requestMethods.push("GET");
    try {
      return await requestMetaJson<T>({
        fetchFn: params.fetchFn,
        sleep: params.sleep,
        provider: target.platform,
        operation,
        url,
        init: {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        },
        secrets: [accessToken],
        timeoutMs: Math.min(10_000, Math.max(1, params.requestTimeoutMs ?? 10_000)),
        maxAttempts: 1,
      });
    } catch (error) {
      errors.push(toSafeProviderError(error, target.platform, operation, [accessToken]));
      return null;
    }
  };

  if (accountId && accessToken) {
    identity = await safeRequest<MetaIdentityResponse>(
      "read_account_identity",
      graphUrl(
        accountId,
        target.platform === "instagram"
          ? "id,username,account_type"
          : "id,name,instagram_business_account{id,username}"
      )
    );
    permissions = await safeRequest<MetaPermissionsResponse>(
      "read_token_permissions",
      graphUrl("me/permissions", "permission,status")
    );
  }

  const granted = new Set(
    (permissions?.data ?? [])
      .filter((entry) => entry.status?.toLowerCase() === "granted")
      .flatMap((entry) => (entry.permission ? [entry.permission] : []))
  );
  const grantedRequiredPermissions = requiredPermissions.filter((permission) =>
    granted.has(permission)
  );
  const missingRequiredPermissions = requiredPermissions.filter(
    (permission) => !granted.has(permission)
  );
  const identityAccessible = Boolean(identity?.id);
  const configuredIdentityMatches = identity?.id === accountId;

  let pageInstagramRelationship: MetaReadinessDiagnosticsResult["pageInstagramRelationship"] =
    "not_applicable";
  if (target.platform === "facebook") {
    if (!expectedInstagramId) {
      pageInstagramRelationship = "not_configured";
    } else if (!identity) {
      pageInstagramRelationship = "unknown";
    } else {
      pageInstagramRelationship =
        identity.instagram_business_account?.id === expectedInstagramId
          ? "matches"
          : "mismatch";
    }
  }

  const accountIdPresent = Boolean(accountId);
  const accessTokenPresent = Boolean(accessToken);
  const permissionsAccessible = permissions !== null;
  const relationshipValid =
    pageInstagramRelationship === "not_applicable" ||
    pageInstagramRelationship === "not_configured" ||
    pageInstagramRelationship === "matches";

  return {
    targetId: target.id,
    platform: target.platform,
    targetEnabled: target.enabled,
    accountIdPresent,
    accessTokenPresent,
    identityAccessible,
    configuredIdentityMatches,
    permissionsAccessible,
    requiredPermissions,
    grantedRequiredPermissions,
    missingRequiredPermissions,
    pageInstagramRelationship,
    valid:
      target.enabled &&
      accountIdPresent &&
      accessTokenPresent &&
      identityAccessible &&
      configuredIdentityMatches &&
      permissionsAccessible &&
      missingRequiredPermissions.length === 0 &&
      relationshipValid,
    providerRequestsMade,
    requestMethods,
    errors,
  };
}
