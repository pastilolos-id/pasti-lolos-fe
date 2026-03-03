import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";

export function setToken(token: string) {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
}

export function getToken(): string | null {
  return Cookies.get(TOKEN_KEY) || null;
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY, { path: "/" });
}
