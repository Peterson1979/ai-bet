import { NextRequest, NextResponse } from "next/server";

const LANGS = ["en", "hu", "de", "fr", "es", "it", "pt", "ar", "zh", "ja", "hi"];

function detectLang(req: NextRequest): string {
  const acceptLang = req.headers.get("accept-language");
  if (!acceptLang) return "en";
  const preferred = acceptLang
    .split(",")
    .map((l) => l.split(";")[0].trim().slice(0, 2).toLowerCase());
  return preferred.find((l) => LANGS.includes(l)) ?? "en";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ha már van nyelv az URL-ben, ne csinálj semmit
  if (LANGS.some((l) => pathname.startsWith(`/${l}`))) {
    return NextResponse.next();
  }

  // Csak a gyökér "/" route-ot irányítsuk át
  if (pathname === "/") {
    const lang = detectLang(req);
    return NextResponse.redirect(new URL(`/${lang}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};