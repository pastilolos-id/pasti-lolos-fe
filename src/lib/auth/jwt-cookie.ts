import {
  ADMIN_ROLE_ID,
  CONTRIBUTOR_ROLE_ID,
  STUDENT_ROLE_ID,
} from "@/lib/auth/types";

export type JwtPayload = {
  userId?: number;
  sub?: number;
  email?: string;
  roles?: string[];
  iat?: number;
  exp?: number;
};

export type SessionFromCookie = {
  isValid: boolean;
  roleId: number | null;
  isStudent: boolean;
  isStaff: boolean;
};

function base64UrlDecode(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "=",
  );
  if (typeof atob === "function") {
    return atob(padded);
  }
  return Buffer.from(padded, "base64").toString("utf-8");
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return null;
  }

  try {
    const json = base64UrlDecode(parts[1]);
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function getRoleIdFromJwtPayload(payload: JwtPayload): number | null {
  const raw = payload.roles?.[0];
  if (raw === undefined || raw === "") {
    return null;
  }
  const roleId = Number.parseInt(raw, 10);
  return Number.isFinite(roleId) ? roleId : null;
}

export function isJwtExpired(payload: JwtPayload): boolean {
  if (payload.exp === undefined) {
    return false;
  }
  return payload.exp * 1000 <= Date.now();
}

export function isStudentRoleId(roleId: number): boolean {
  return roleId === STUDENT_ROLE_ID;
}

export function isStaffRoleId(roleId: number): boolean {
  return roleId === ADMIN_ROLE_ID || roleId === CONTRIBUTOR_ROLE_ID;
}

export function parseSessionFromToken(
  token: string | null | undefined,
): SessionFromCookie {
  if (!token?.trim()) {
    return {
      isValid: false,
      roleId: null,
      isStudent: false,
      isStaff: false,
    };
  }

  const payload = decodeJwtPayload(token);
  if (!payload || isJwtExpired(payload)) {
    return {
      isValid: false,
      roleId: null,
      isStudent: false,
      isStaff: false,
    };
  }

  const roleId = getRoleIdFromJwtPayload(payload);
  if (roleId === null) {
    return {
      isValid: false,
      roleId: null,
      isStudent: false,
      isStaff: false,
    };
  }

  return {
    isValid: true,
    roleId,
    isStudent: isStudentRoleId(roleId),
    isStaff: isStaffRoleId(roleId),
  };
}
