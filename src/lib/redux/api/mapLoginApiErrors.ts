import type { FieldValues, UseFormSetError } from "react-hook-form";
import type { User } from "@/types/user";
import type {
  ApiUser,
  LoginErrorResponse,
  LoginRequest,
  MyProfileResponse,
} from "./types/auth";

const LOGIN_FIELD_KEYS = [
  "email",
  "password",
] as const satisfies readonly (keyof LoginRequest)[];

export function applyLoginFieldErrors(
  setError: UseFormSetError<FieldValues>,
  errors: NonNullable<LoginErrorResponse["errors"]>,
): void {
  for (const key of LOGIN_FIELD_KEYS) {
    const messages = errors[key];
    if (messages?.length) {
      setError(key, {
        type: "server",
        message: messages[0],
      });
    }
  }
}

export function normalizeLoginPayload(
  data: Record<string, unknown>,
): LoginRequest {
  return {
    email: String(data.email ?? "").trim(),
    password: String(data.password ?? ""),
  };
}

export function mapApiUserToStateUser(apiUser: ApiUser): User {
  const roleNameFromNested =
    apiUser.userRoles && typeof apiUser.userRoles.roleName === "string"
      ? apiUser.userRoles.roleName
      : null;

  return {
    id: apiUser.id,
    email: apiUser.email,
    username: apiUser.username,
    roleId: apiUser.userRoleId,
    fullName: apiUser.fullName,
    profilePictureUrl: apiUser.profilePictureUrl,
    firstName: apiUser.firstName ?? null,
    lastName: apiUser.lastName ?? null,
    status: apiUser.status ?? null,
    phoneNumber: apiUser.phoneNumber ?? null,
    address: apiUser.address ?? null,
    city: apiUser.city ?? null,
    province: apiUser.province ?? null,
    country: apiUser.country ?? null,
    postalCode: apiUser.postalCode ?? null,
    dateOfBirth: apiUser.dateOfBirth ?? null,
    gender: apiUser.gender ?? null,
    roleName: apiUser.roleName ?? roleNameFromNested,
  };
}

export function mapMyProfileToStateUser(profile: MyProfileResponse): User {
  const roleNameFromNested =
    profile.userRoles && typeof profile.userRoles.roleName === "string"
      ? profile.userRoles.roleName
      : null;

  return {
    id: profile.id,
    email: profile.email,
    username: profile.username,
    roleId: profile.userRoleId,
    fullName: profile.fullName,
    profilePictureUrl: profile.profilePictureUrl,
    firstName: profile.firstName,
    lastName: profile.lastName,
    status: profile.status,
    phoneNumber: profile.phoneNumber ?? null,
    address: profile.address ?? null,
    city: profile.city ?? null,
    province: profile.province ?? null,
    country: profile.country ?? null,
    postalCode: profile.postalCode ?? null,
    dateOfBirth: profile.dateOfBirth ?? null,
    gender: profile.gender ?? null,
    roleName: profile.roleName ?? roleNameFromNested,
  };
}
