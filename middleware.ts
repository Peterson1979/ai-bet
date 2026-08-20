import { NextRequest, NextResponse } from "next/server";
import { CONSENT_PATH_HEADER } from "@/app/lib/consentRoutes";

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

  if (pathname === "/") {
    const lang = detectLang(req);
    return NextResponse.redirect(new URL(`/${lang}`, req.url));
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(CONSENT_PATH_HEADER, pathname);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
