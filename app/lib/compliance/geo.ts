// app/lib/compliance/geo.ts

/**
 * Extracts and validates the visitor's ISO 3166-1 alpha-2 country code
 * from server request headers (e.g. Vercel's `x-vercel-ip-country`).
 *
 * CRITICAL COMPLIANCE RULES:
 * 1. This helper uses ONLY server-provided IP geolocation headers.
 * 2. It NEVER inspects `Accept-Language` or browser language preferences (language != country).
 * 3. It NEVER persists client IP addresses or tracks user locations across requests.
 * 4. In local development or when geolocation is unavailable, it returns `undefined`.
 */
export function getRequestCountry(
  headers: Headers | Record<string, string | string[] | undefined> | undefined
): string | undefined {
  if (!headers) return undefined;

  let rawCountry: string | null | undefined = null;

  if (typeof (headers as Headers).get === "function") {
    rawCountry = (headers as Headers).get("x-vercel-ip-country");
  } else {
    const headerObj = headers as Record<string, string | string[] | undefined>;
    const val =
      headerObj["x-vercel-ip-country"] || headerObj["X-Vercel-Ip-Country"];
    if (Array.isArray(val)) {
      rawCountry = val[0];
    } else if (typeof val === "string") {
      rawCountry = val;
    }
  }

  if (!rawCountry || typeof rawCountry !== "string") {
    return undefined;
  }

  const normalized = rawCountry.trim().toUpperCase();

  // Validate strict 2-letter ISO 3166-1 alpha-2 code
  if (/^[A-Z]{2}$/.test(normalized)) {
    return normalized;
  }

  return undefined;
}
