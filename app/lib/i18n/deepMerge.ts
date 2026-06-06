export function deepMerge<T extends object>(base: T, override: Partial<T>): T {
  const result = { ...base };
  for (const key in override) {
    const val = override[key];
    if (val && typeof val === "object" && !Array.isArray(val)) {
      result[key] = deepMerge(result[key] as any, val as any);
    } else if (val !== undefined) {
      result[key] = val as any;
    }
  }
  return result;
}