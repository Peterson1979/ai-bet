import { notFound } from "next/navigation";
import type { ReactNode } from "react";

const LANGS = ["en","es","de","fr","pt","it","hi","ar","zh","ja"] as const;
type Lang = (typeof LANGS)[number];

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!LANGS.includes(lang as Lang)) {
    notFound();
  }

  return <>{children}</>;
}