import type { Lang } from "@/app/lib/i18n";

export const LEGAL_SLUGS = [
  "privacy-policy",
  "cookie-policy",
  "terms-of-use",
  "affiliate-disclosure",
  "responsible-gambling",
  "ai-disclaimer",
  "earnings-disclaimer",
  "legal-notice",
] as const;

export type LegalSlug = (typeof LEGAL_SLUGS)[number];

export type LegalTable = {
  headers: string[];
  rows: string[][];
};

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: LegalTable;
};

export type LegalDocument = {
  title: string;
  description: string;
  intro: string[];
  sections: LegalSection[];
  showOperator?: boolean;
  showCookieSettings?: boolean;
  updated: string;
};

export type LegalLocaleContent = Record<LegalSlug, LegalDocument>;

export type OperatorLabels = {
  heading: string;
  name: string;
  status: string;
  statusValue: string;
  address: string;
  tax: string;
  registration: string;
  registry: string;
  registryValue: string;
  roles: string;
  rolesValue: string;
  contact: string;
};

export type LegalContentBundle = {
  documents: Record<Lang, LegalLocaleContent>;
  operatorLabels: Record<Lang, OperatorLabels>;
  cookieSettingsLabel: Record<Lang, string>;
};
