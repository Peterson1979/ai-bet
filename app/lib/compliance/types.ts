// app/lib/compliance/types.ts

export type AffiliateComplianceStatus =
  | "verified"
  | "unverified"
  | "needs_review"
  | "blocked"
  | "disabled";

export type AffiliateComplianceSourceType =
  | "regulator"
  | "operator"
  | "affiliate_program"
  | "partner_manager"
  | "legal_review";

export type VerificationScope =
  | "global"
  | "allowed_list"
  | "blocked_list"
  | "country_specific";

export type AffiliateEligibility =
  | "KNOWN_ELIGIBLE"
  | "KNOWN_INELIGIBLE"
  | "UNKNOWN";

export type AffiliateComplianceSource = {
  type: AffiliateComplianceSourceType;
  url?: string;
  reference?: string;
  checkedAt: string; // ISO 8601 YYYY-MM-DD or full timestamp
};

export type AffiliateCompliance = {
  affiliateId: string;
  status: AffiliateComplianceStatus;

  sportsbookVerified: boolean | null;
  verificationScope?: VerificationScope;

  allowedCountries?: string[]; // ISO 3166-1 alpha-2 uppercase country codes
  blockedCountries?: string[]; // ISO 3166-1 alpha-2 uppercase country codes

  sources: AffiliateComplianceSource[];

  verifiedAt?: string; // ISO 8601 YYYY-MM-DD
  reviewAfter?: string; // ISO 8601 YYYY-MM-DD

  notes?: string;
};

export type AffiliateComplianceOverride = {
  status: AffiliateComplianceStatus;
  sportsbookVerified?: boolean | null;
  verificationScope?: VerificationScope;
  allowedCountries?: string[];
  blockedCountries?: string[];
  sources?: AffiliateComplianceSource[];
  verifiedAt?: string;
  reviewAfter?: string;
  notes?: string;
};
