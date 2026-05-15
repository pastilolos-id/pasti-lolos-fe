/**
 * WebSocket URL for notification pushes. Prefer explicit full URL in env.
 * Otherwise derives from `NEXT_PUBLIC_BACKEND_URL` + optional path.
 */
export function getNotificationsSocketUrl(): string | null {
  const full = process.env.NEXT_PUBLIC_NOTIFICATIONS_WS_URL?.trim();
  if (full) {
    return full;
  }

  const backend = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
  if (!backend) {
    return null;
  }

  try {
    const httpUrl = new URL(backend);
    const wsProto = httpUrl.protocol === "https:" ? "wss:" : "ws:";
    const pathRaw = process.env.NEXT_PUBLIC_NOTIFICATIONS_WS_PATH?.trim();
    const path = pathRaw?.startsWith("/")
      ? pathRaw
      : pathRaw
        ? `/${pathRaw}`
        : "/notifications";
    return `${wsProto}//${httpUrl.host}${path}`;
  } catch {
    return null;
  }
}
