import crypto from "crypto";
import { redis } from "./redis";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const DEFAULT_MODEL = "openai/gpt-oss-120b";
const MAX_DAILY_TRANSLATION_TOKENS = 100_000;
const BATCH_SIZE = 4;
const REQUEST_TIMEOUT_MS = 30_000;
const MAX_TPM_ROLLING_SAFETY_TARGET = 7_000; // Safe threshold against 8,000 TPM limit
const MAX_RETRIES_ON_RATE_LIMIT = 1;

export const TARGET_LOCALES = [
  "hu",
  "de",
  "fr",
  "es",
  "it",
  "pt",
  "ar",
  "zh",
  "ja",
  "hi",
] as const;

export type TargetLocale = (typeof TARGET_LOCALES)[number];
export type TranslationMap = Record<string, string>;

export type TranslationResult = {
  translations: Map<string, TranslationMap>;
  usage: {
    requests: number;
    tokens: number;
    cachedHits: number;
    skippedByBudget: number;
    skippedByRedis: number;
    rateLimitRetries: number;
  };
};

const TRANSLATION_JSON_SCHEMA = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          index: { type: "integer" },
          translations: {
            type: "object",
            properties: {
              hu: { type: "string" },
              de: { type: "string" },
              fr: { type: "string" },
              es: { type: "string" },
              it: { type: "string" },
              pt: { type: "string" },
              ar: { type: "string" },
              zh: { type: "string" },
              ja: { type: "string" },
              hi: { type: "string" },
            },
            required: [
              "hu",
              "de",
              "fr",
              "es",
              "it",
              "pt",
              "ar",
              "zh",
              "ja",
              "hi",
            ],
            additionalProperties: false,
          },
        },
        required: ["index", "translations"],
        additionalProperties: false,
      },
    },
  },
  required: ["items"],
  additionalProperties: false,
};

function getUtcDateKey(): string {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

function getContentHash(text: string): string {
  return crypto
    .createHash("sha256")
    .update(`v1:${text.trim()}`)
    .digest("hex");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Calculate conservative token reservation upper bound for a batch
function calculateBatchReservation(batchCount: number): number {
  const estimatedPromptTokens = 350 + batchCount * 120;
  const maxOutputTokens = 2048;
  return estimatedPromptTokens + maxOutputTokens;
}

// Atomic Redis Lua script to pre-reserve budget before sending a request
const RESERVE_BUDGET_SCRIPT = `
  local current = tonumber(redis.call('GET', KEYS[1]) or '0')
  local reserve = tonumber(ARGV[1])
  local limit = tonumber(ARGV[2])
  if current + reserve <= limit then
    local new_val = redis.call('INCRBY', KEYS[1], reserve)
    redis.call('EXPIRE', KEYS[1], 129600)
    return new_val
  else
    return -1
  end
`;

// Atomic Redis Lua script to reconcile/refund unused reserved tokens
const RECONCILE_BUDGET_SCRIPT = `
  local current = tonumber(redis.call('GET', KEYS[1]) or '0')
  local refund = tonumber(ARGV[1])
  if current >= refund then
    return redis.call('DECRBY', KEYS[1], refund)
  else
    redis.call('SET', KEYS[1], 0)
    return 0
  end
`;

async function reserveBudgetAtomic(
  budgetKey: string,
  amount: number,
  limit: number
): Promise<{ success: boolean; reason?: "budget_exhausted" | "redis_unavailable" }> {
  try {
    const res = (await redis.eval(
      RESERVE_BUDGET_SCRIPT,
      [budgetKey],
      [amount.toString(), limit.toString()]
    )) as number;

    if (res === -1) {
      return { success: false, reason: "budget_exhausted" };
    }
    return { success: true };
  } catch (error) {
    console.warn(
      "[translation] Redis budget reservation unavailable; failing closed to protect budget.",
      error instanceof Error ? error.message : String(error)
    );
    return { success: false, reason: "redis_unavailable" };
  }
}

async function reconcileBudgetAtomic(
  budgetKey: string,
  reserved: number,
  actual: number
): Promise<void> {
  try {
    const diff = reserved - actual;
    if (diff > 0) {
      // Reserved more than actual -> refund unused
      await redis.eval(
        RECONCILE_BUDGET_SCRIPT,
        [budgetKey],
        [diff.toString()]
      );
    } else if (diff < 0) {
      // Actual exceeded reservation (unexpected edge case)
      await redis.incrby(budgetKey, Math.abs(diff));
      console.warn(
        `[translation] Actual usage (${actual}) exceeded reservation (${reserved}) by ${Math.abs(diff)} tokens.`
      );
    }
  } catch {
    // Ignore reconciliation network errors
  }
}

// Local rolling 60-second window limiter for translation requests
class RollingTokenLimiter {
  private history: Array<{ timestamp: number; tokens: number }> = [];

  public async acquire(nextTokens: number): Promise<void> {
    while (true) {
      const now = Date.now();
      this.history = this.history.filter((entry) => now - entry.timestamp < 60_000);

      const currentRollingTokens = this.history.reduce(
        (sum, entry) => sum + entry.tokens,
        0
      );

      if (currentRollingTokens + nextTokens <= MAX_TPM_ROLLING_SAFETY_TARGET) {
        this.history.push({ timestamp: now, tokens: nextTokens });
        return;
      }

      // Need to wait until the oldest entry leaves the 60s window
      const oldest = this.history[0];
      const waitMs = oldest ? Math.max(100, 60_000 - (now - oldest.timestamp) + 100) : 1000;
      await sleep(Math.min(waitMs, 60_000));
    }
  }
}

function extractRetryAfterMs(response: Response, errText: string): number {
  const retryHeader = response.headers.get("retry-after");
  if (retryHeader) {
    const parsed = Number(retryHeader);
    if (Number.isFinite(parsed) && parsed > 0) {
      return Math.ceil(parsed * 1000);
    }
  }

  const secondsMatch = errText.match(/Please try again in\s+([\d.]+)s/i);
  if (secondsMatch) {
    const seconds = Number(secondsMatch[1]);
    if (Number.isFinite(seconds) && seconds > 0) {
      return Math.ceil(seconds * 1000);
    }
  }

  return 2000;
}

export async function translateReasonings(
  items: Array<{ id: string; reasoning: string }>
): Promise<TranslationResult> {
  const result: TranslationResult = {
    translations: new Map(),
    usage: {
      requests: 0,
      tokens: 0,
      cachedHits: 0,
      skippedByBudget: 0,
      skippedByRedis: 0,
      rateLimitRetries: 0,
    },
  };

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.warn("[translation] No GROQ_API_KEY available; skipping translations.");
    return result;
  }

  const validItems = items.filter(
    (item) => typeof item.reasoning === "string" && item.reasoning.trim().length > 0
  );

  if (validItems.length === 0) return result;

  // 1. Check Redis Cache for deduplicated translations
  const uncachedItems: Array<{ id: string; reasoning: string; hash: string }> = [];

  for (const item of validItems) {
    const hash = getContentHash(item.reasoning);
    try {
      const cached = await redis.get<TranslationMap>(`groq:tr:cache:${hash}`);
      if (cached && typeof cached === "object") {
        result.translations.set(item.id, cached);
        result.usage.cachedHits += 1;
        continue;
      }
    } catch {
      // Ignore Redis cache read errors and proceed to uncached queue
    }
    uncachedItems.push({ id: item.id, reasoning: item.reasoning, hash });
  }

  if (uncachedItems.length === 0) {
    return result;
  }

  const budgetKey = `groq:tr:budget:${getUtcDateKey()}`;
  const model = process.env.GROQ_TRANSLATION_MODEL || DEFAULT_MODEL;
  const limiter = new RollingTokenLimiter();

  // 2. Sequential batch translation with atomic budget reservation and TPM pacing
  for (let i = 0; i < uncachedItems.length; i += BATCH_SIZE) {
    const batch = uncachedItems.slice(i, i + BATCH_SIZE);
    const reservationAmount = calculateBatchReservation(batch.length);

    // Atomic Pre-Reservation
    const reservation = await reserveBudgetAtomic(
      budgetKey,
      reservationAmount,
      MAX_DAILY_TRANSLATION_TOKENS
    );

    if (!reservation.success) {
      if (reservation.reason === "budget_exhausted") {
        result.usage.skippedByBudget += batch.length;
        console.warn(
          `[translation] Daily translation token budget limit reached (${MAX_DAILY_TRANSLATION_TOKENS}). Preserving canonical English.`
        );
        break;
      } else {
        result.usage.skippedByRedis += batch.length;
        console.warn(
          `[translation] Redis budget reservation failed. Skipping translation batch to fail closed.`
        );
        continue;
      }
    }

    // TPM Window Limiter
    await limiter.acquire(reservationAmount);

    const promptItems = batch
      .map((item, idx) => `[ITEM ${idx}]: "${item.reasoning.replace(/"/g, '\\"')}"`)
      .join("\n\n");

    const prompt = `Translate each sports betting analysis below faithfully into 10 target languages:
hu (Hungarian), de (German), fr (French), es (Spanish), it (Italian), pt (Portuguese), ar (Arabic), zh (Simplified Chinese), ja (Japanese), hi (Hindi).

STRICT TRANSLATION RULES:
1. Translate ONLY. Do not add, remove, or alter betting claims, predictions, or matchup context.
2. Preserve all team and player names accurately.
3. Preserve all numbers, percentages, and market terms.
4. Preserve uncertainty; never strengthen confidence or make claims of guaranteed profits.
5. No promotional or CTA wording.

ITEMS TO TRANSLATE:
${promptItems}`;

    let attempt = 0;
    let actualTokensObserved = 0;
    let batchSucceeded = false;

    while (attempt <= MAX_RETRIES_ON_RATE_LIMIT) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      try {
        const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            temperature: 0.1,
            max_tokens: 2048,
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "sports_translations",
                strict: true,
                schema: TRANSLATION_JSON_SCHEMA,
              },
            },
            messages: [
              {
                role: "system",
                content:
                  "You are a structured translation engine. Return strictly valid structured JSON matching the schema.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        });

        // Inspect rate-limit headers if available
        const remainingTokensHeader = response.headers.get("x-ratelimit-remaining-tokens");
        const resetTokensHeader = response.headers.get("x-ratelimit-reset-tokens");
        if (remainingTokensHeader && Number(remainingTokensHeader) < reservationAmount && resetTokensHeader) {
          const resetSeconds = parseFloat(resetTokensHeader) || 1;
          await sleep(Math.ceil(resetSeconds * 1000));
        }

        if (!response.ok) {
          const errText = await response.text().catch(() => "");

          if (response.status === 429 && attempt < MAX_RETRIES_ON_RATE_LIMIT) {
            const retryDelayMs = extractRetryAfterMs(response, errText) + 500;
            console.warn(
              `[translation] 429 Rate limit encountered. Retrying batch once after ${retryDelayMs}ms.`
            );
            result.usage.rateLimitRetries += 1;
            attempt += 1;
            await sleep(retryDelayMs);
            continue;
          }

          console.warn(
            `[translation] Groq translation request failed (status ${response.status}). Skipping batch.`
          );
          break;
        }

        const data = await response.json();
        actualTokensObserved = data.usage?.total_tokens ?? reservationAmount;
        result.usage.requests += 1;
        result.usage.tokens += actualTokensObserved;

        const content = data.choices?.[0]?.message?.content;
        if (!content || typeof content !== "string") break;

        let parsed: { items?: Array<{ index: number; translations: Record<string, string> }> };
        try {
          parsed = JSON.parse(content);
        } catch {
          console.warn("[translation] Failed to parse structured JSON response. Skipping batch.");
          break;
        }

        if (!parsed || !Array.isArray(parsed.items)) break;

        for (const entry of parsed.items) {
          if (
            entry &&
            typeof entry.index === "number" &&
            entry.translations &&
            typeof entry.translations === "object"
          ) {
            const item = batch[entry.index];
            if (!item) continue;

            const translations: TranslationMap = {};
            for (const loc of TARGET_LOCALES) {
              const tr = entry.translations[loc];
              if (typeof tr === "string" && tr.trim().length > 0) {
                translations[loc] = tr.trim();
              }
            }

            // Guarantee all 10 locales are present
            const hasAllLocales = TARGET_LOCALES.every((loc) => Boolean(translations[loc]));
            if (hasAllLocales) {
              result.translations.set(item.id, translations);
              try {
                // Cache in Redis for 7 days
                await redis.set(`groq:tr:cache:${item.hash}`, translations, {
                  ex: 60 * 60 * 24 * 7,
                });
              } catch {
                // Ignore cache write error
              }
            }
          }
        }

        batchSucceeded = true;
        break;
      } catch (error) {
        console.warn(
          "[translation] Exception during batch translation:",
          error instanceof Error ? error.message : String(error)
        );
        break;
      } finally {
        clearTimeout(timeout);
      }
    }

    // Reconcile pre-reservation with actual observed usage or refund if failed
    if (batchSucceeded && actualTokensObserved > 0) {
      await reconcileBudgetAtomic(budgetKey, reservationAmount, actualTokensObserved);
    } else {
      // Full refund of reserved tokens for failed batch
      await reconcileBudgetAtomic(budgetKey, reservationAmount, 0);
    }
  }

  return result;
}
