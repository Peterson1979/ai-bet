import ToolsClient from "./ToolsClient";
import { translations, Lang, LANGS } from "@/app/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang] ?? translations.en;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.matchsignal.pro";

  const languages: Record<string, string> = {};
  LANGS.forEach((l) => {
    languages[l] = `${baseUrl}/${l}/tools`;
  });
  languages["x-default"] = `${baseUrl}/en/tools`;

  return {
    title: `${t.tools.title} | MatchSignal`,
    description: t.tools.oddsConverterDesc,
    alternates: {
      canonical: `${baseUrl}/${lang}/tools`,
      languages,
    },
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
