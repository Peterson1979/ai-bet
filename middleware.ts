import { NextResponse } from "next/server";

const LANGS = ["en","es","de","fr","pt","it","hi","ar","zh","ja"];

export function middleware(req: Request) {
  const url = new URL(req.url);
  const { pathname } = url;

  // ❌ ne nyúlj static assetekhez
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/hero.jpg") ||
    pathname.includes(".") // minden file: .jpg .png .svg stb.
  ) {
    return NextResponse.next();
  }

  const hasLang = LANGS.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (hasLang) return NextResponse.next();

  return NextResponse.redirect(new URL(`/en${pathname}`, req.url));
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};