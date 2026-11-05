import { LOGIN_PATH } from "@/constants/routes";

export function getAdminAppUrl(): string {
  return process.env.NEXT_PUBLIC_ADMIN_APP_URL?.trim() ?? "";
}

/** Absolute URL for redirecting staff users to the admin app. */
export function buildAdminAppRedirectUrl(): string | null {
  const base = getAdminAppUrl();
  if (!base) {
    return null;
  }
  try {
    return new URL(base).toString();
  } catch {
    return null;
  }
}

/** Client-side full navigation to the admin app (preserves session). */
export function redirectStaffToAdminApp(): void {
  const url = buildAdminAppRedirectUrl();
  if (url) {
    window.location.href = url;
    return;
  }
  window.location.assign(LOGIN_PATH);
}
