const CONSENT_FREE_POLICY_SUFFIXES = [
  "/legal/privacy-policy",
  "/legal/cookie-policy",
] as const;

export const CONSENT_PATH_HEADER = "x-matchsignal-pathname";

export function isConsentFreePolicyPath(pathname: string): boolean {
  const normalized = pathname.split("?", 1)[0].replace(/\/+$/, "");
  return CONSENT_FREE_POLICY_SUFFIXES.some((suffix) => normalized.endsWith(suffix));
}
