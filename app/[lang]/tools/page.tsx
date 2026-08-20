import ToolsClient from "./ToolsClient";
import { translations, Lang } from "@/app/lib/i18n";
import { localizedAlternates } from "@/app/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang] ?? translations.en;
  return {
    title: `${t.tools.title} | MatchSignal`,
    description: t.tools.subtitle,
    alternates: localizedAlternates(lang, "/tools"),
  };
}

export default async function BettingToolsPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  return <ToolsClient lang={lang} />;
}
