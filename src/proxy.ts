// untuk Next.js 16 namanya adalah proxy.ts

import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register"];
const PRIVATE_ROUTES = ["/home", "/profile"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  // If user is on a public route and has token, send to home
  if (PUBLIC_ROUTES.some((r) => pathname.startsWith(r)) && token) {
    const url = request.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  // If user tries private route without token, redirect to login
  if (PRIVATE_ROUTES.some((r) => pathname.startsWith(r)) && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // otherwise continue
  return NextResponse.next();
}

// Optionally define config to match all paths
export const config = {
  matcher: ["/((?!_next/|static/).*)"],
};
