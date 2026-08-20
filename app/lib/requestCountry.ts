import "server-only";

import { headers } from "next/headers";

export async function getRequestCountryCode(): Promise<string | undefined> {
  const raw = (await headers()).get("x-vercel-ip-country");
  const country = raw?.trim().toUpperCase();
  return country && /^[A-Z]{2}$/.test(country) ? country : undefined;
}
