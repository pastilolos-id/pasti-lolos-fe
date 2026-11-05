/** Default destination after successful student auth. */
export const HOME_PATH = "/home";

export const LOGIN_PATH = "/login";

export const REGISTER_PATH = "/register";

/**
 * Route prefixes treated as public (unauthenticated entry).
 * Used by proxy and client guards; keep in sync when adding auth pages.
 */
export const PUBLIC_ROUTE_PREFIXES: readonly string[] = [
  LOGIN_PATH,
  REGISTER_PATH,
];

/**
 * Route prefixes for the private app shell. Keep aligned with
 * `src/app/(private-route)`. Also used by `proxy.ts` and `TokenValidator`.
 */
export const PRIVATE_ROUTE_PREFIXES: readonly string[] = [
  HOME_PATH,
  "/profile",
  "/activities",
  "/course",
  "/checkout",
  "/notifications",
  "/purchases",
  "/tryout",
];

export function pathnameMatchesAnyPrefix(
  pathname: string,
  prefixes: readonly string[],
): boolean {
  return prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
