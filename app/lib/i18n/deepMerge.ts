import type { DeepPartial } from "./types";

export function deepMerge<T extends object>(
  base: T,
  override: DeepPartial<T>
): T {
  const result = { ...base };
  for (const key in override) {
    const val = override[key];
    if (val && typeof val === "object" && !Array.isArray(val)) {
      result[key as keyof T] = deepMerge(
        result[key as keyof T] as object,
        val as DeepPartial<object>
      ) as T[keyof T];
    } else if (val !== undefined) {
      result[key as keyof T] = val as T[keyof T];
    }
  }
  return result;
}