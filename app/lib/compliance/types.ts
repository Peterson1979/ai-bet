// app/lib/compliance/types.ts

export type AffiliateComplianceStatus =
  | "verified"
  | "unverified"
  | "needs_review"
  | "blocked"
  | "disabled";

export type AffiliateKind =
  | "sportsbook_operator"
  | "betting_information_service";

export type AffiliateComplianceSourceType =
  | "operator_service_restriction"
  | "operator_terms"
  | "affiliate_program_geo"
  | "regulator_license"
  | "regulator_block"
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
  checkedAt: string; // ISO 8601 YYYY-MM-DD
};

export type AffiliateCompliance = {
  affiliateId: string;
  affiliateKind?: AffiliateKind;
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
  affiliateKind?: AffiliateKind;
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
