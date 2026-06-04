import { redirect } from "next/navigation";
import { headers } from "next/headers";

const LANGS = ["en", "hu", "es", "de", "fr", "pt", "it", "hi", "ar", "zh", "ja"];

function detectLang(acceptLanguage: string | null): string {
  if (!acceptLanguage) return "en";
  const preferred = acceptLanguage.split(",").map((l) => l.split(";")[0].trim().slice(0, 2).toLowerCase());
  return preferred.find((l) => LANGS.includes(l)) ?? "en";
}

export default async function Home() {
  const headersList = await headers();
  const acceptLang = headersList.get("accept-language");
  const lang = detectLang(acceptLang);
  redirect(`/${lang}`);
}