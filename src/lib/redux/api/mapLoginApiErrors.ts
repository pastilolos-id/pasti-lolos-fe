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
  return {
    id: apiUser.id,
    email: apiUser.email,
    username: apiUser.username,
    roleId: apiUser.userRoleId,
    fullName: apiUser.fullName,
    profilePictureUrl: apiUser.profilePictureUrl,
  };
}

export function mapMyProfileToStateUser(profile: MyProfileResponse): User {
  return {
    id: profile.id,
    email: profile.email,
    username: profile.username,
    roleId: profile.userRoleId,
    fullName: profile.fullName,
    profilePictureUrl: profile.profilePictureUrl,
  };
}
