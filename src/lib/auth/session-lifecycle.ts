import { LOGIN_PATH } from "@/constants/routes";
import { removeToken } from "@/lib/cookies/tokenCookies";
import { baseApi } from "@/lib/redux/api/baseApi";
import {
  closeSessionExpiredModal,
  openSessionExpiredModal,
  setHandlingSessionExpiry,
} from "@/lib/redux/slices/sessionSlice";
import { clearUser } from "@/lib/redux/slices/userSlice";
import { store } from "@/lib/redux/store";

export const SESSION_EXPIRED_MESSAGE =
  "Sesi anda telah habis, silakan logout kembali";

export const SESSION_EXPIRED_REDIRECT_MS = 2500;

const apiBaseUrl =
  typeof process.env.NEXT_PUBLIC_API_URL === "string"
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
    : "";

let sessionExpiredRedirect: (() => void) | null = null;

async function callLogoutBestEffort(): Promise<void> {
  if (!apiBaseUrl) {
    return;
  }
  try {
    await fetch(`${apiBaseUrl}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });
  } catch {
    // best-effort
  }
}

export function setSessionExpiredRedirect(redirect: () => void): void {
  sessionExpiredRedirect = redirect;
}

function redirectToLogin(): void {
  if (sessionExpiredRedirect) {
    sessionExpiredRedirect();
    return;
  }
  if (typeof window !== "undefined") {
    window.location.assign(LOGIN_PATH);
  }
}

export { shouldTriggerSessionExpired } from "@/lib/auth/session-guards";

export async function handleSessionExpired(): Promise<void> {
  const { session } = store.getState();
  if (session.isHandlingSessionExpiry) {
    return;
  }

  store.dispatch(setHandlingSessionExpiry(true));
  store.dispatch(openSessionExpiredModal());

  await callLogoutBestEffort();

  store.dispatch(clearUser());
  removeToken();
  store.dispatch(baseApi.util.resetApiState());

  window.setTimeout(() => {
    store.dispatch(closeSessionExpiredModal());
    store.dispatch(setHandlingSessionExpiry(false));
    redirectToLogin();
  }, SESSION_EXPIRED_REDIRECT_MS);
}
