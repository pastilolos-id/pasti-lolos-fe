// untuk Next.js 16 namanya adalah proxy.ts

import { type NextRequest, NextResponse } from "next/server";

import { AUTH_TOKEN_COOKIE_NAME } from "@/constants/auth";
import {
  HOME_PATH,
  LOGIN_PATH,
  PRIVATE_ROUTE_PREFIXES,
  PUBLIC_ROUTE_PREFIXES,
  pathnameMatchesAnyPrefix,
} from "@/constants/routes";
import { buildAdminAppRedirectUrl } from "@/lib/auth/admin-app-url";
import { parseSessionFromToken } from "@/lib/auth/jwt-cookie";

function redirectTo(request: NextRequest, target: string): NextResponse {
  if (target.startsWith("http://") || target.startsWith("https://")) {
    return NextResponse.redirect(target);
  }
  const url = request.nextUrl.clone();
  url.pathname = target;
  url.search = "";
  return NextResponse.redirect(url);
}

function redirectStaff(request: NextRequest): NextResponse {
  const adminAppUrl = buildAdminAppRedirectUrl();
  return redirectTo(request, adminAppUrl ?? LOGIN_PATH);
}

function shouldRedirectStaff(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname === "" ||
    pathnameMatchesAnyPrefix(pathname, PRIVATE_ROUTE_PREFIXES) ||
    pathnameMatchesAnyPrefix(pathname, PUBLIC_ROUTE_PREFIXES)
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const raw = request.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value;
  const session = parseSessionFromToken(raw);

  if (session.isValid && session.isStaff && shouldRedirectStaff(pathname)) {
    return redirectStaff(request);
  }

  const hasStudentSession = session.isValid && session.isStudent;

  if (
    pathnameMatchesAnyPrefix(pathname, PUBLIC_ROUTE_PREFIXES) &&
    hasStudentSession
  ) {
    return redirectTo(request, HOME_PATH);
  }

  if (
    pathnameMatchesAnyPrefix(pathname, PRIVATE_ROUTE_PREFIXES) &&
    !hasStudentSession
  ) {
    return redirectTo(request, LOGIN_PATH);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|static/).*)"],
};
