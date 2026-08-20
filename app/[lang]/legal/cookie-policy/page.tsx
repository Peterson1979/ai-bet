import LegalPage from "@/app/components/legal/LegalPage";
import type { Lang } from "@/app/lib/i18n";
import { legalMetadata } from "@/app/lib/legal/metadata";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }) { return legalMetadata((await params).lang, "cookie-policy"); }
export default async function CookiePolicyPage({ params }: { params: Promise<{ lang: Lang }> }) { return <LegalPage lang={(await params).lang} slug="cookie-policy" />; }
