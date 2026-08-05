export const BASE_URL = import.meta.env.BASE_URL;

/** Prefixes a site-relative path (no leading slash) with the configured base path. */
export function withBase(path: string): string {
  return `${BASE_URL}${path}`;
}
