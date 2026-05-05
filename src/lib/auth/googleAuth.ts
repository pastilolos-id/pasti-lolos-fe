/**
 * Google OAuth entrypoint on the backend.
 *
 * - RTK Query uses `NEXT_PUBLIC_API_URL` (e.g. `/api/backend` → Next rewrite).
 * - Full-page redirect can use the same proxy path, **or** a direct backend origin via
 *   `NEXT_PUBLIC_BACKEND_URL` (must match a URL the browser can reach, often same as
 *   `BACKEND_PROXY_TARGET`). The latter is not available in the client without `NEXT_PUBLIC_`.
 */
function getApiBaseUrl(): string {
  if (typeof process.env.NEXT_PUBLIC_API_URL !== "string") {
    return "";
  }
  return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
}

/**
 * Optional: same origin the app should use for *browser* navigation to the API host
 * (e.g. `http://192.168.x.x:4000`). If unset, falls back to `NEXT_PUBLIC_API_URL`
 * (same-origin proxy like `/api/backend/auth/google`).
 */
function getPublicBackendOrigin(): string {
  if (typeof process.env.NEXT_PUBLIC_BACKEND_URL !== "string") {
    return "";
  }
  return process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "");
}

/**
 * URL for `GET /auth/google` (full-page redirect, same tab).
 */
export function getGoogleAuthRedirectUrl(): string {
  const direct = getPublicBackendOrigin();
  if (direct) {
    return `${direct}/auth/google`;
  }

  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    return "/auth/google";
  }
  return `${baseUrl}/auth/google`;
}

/**
 * Full-page redirect to start Google sign-in on the backend (same tab).
 */
export function startGoogleOAuthRedirect(): void {
  if (typeof window === "undefined") {
    return;
  }
  window.location.assign(getGoogleAuthRedirectUrl());
}
