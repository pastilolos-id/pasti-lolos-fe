import type { FieldValues, UseFormSetError } from "react-hook-form";
import type { RegisterErrorResponse, RegisterRequest } from "./types/auth";

const REGISTER_FIELD_KEYS = [
  "email",
  "fullName",
  "password",
  "confirmPassword",
  "phoneNumber",
  "isAgreed",
] as const satisfies readonly (keyof RegisterRequest)[];

export function applyRegisterFieldErrors(
  setError: UseFormSetError<FieldValues>,
  errors: NonNullable<RegisterErrorResponse["errors"]>,
): void {
  for (const key of REGISTER_FIELD_KEYS) {
    const messages = errors[key];
    if (messages?.length) {
      setError(key, {
        type: "server",
        message: messages[0],
      });
    }
  }
}

export function normalizeRegisterPayload(
  data: Record<string, unknown>,
): RegisterRequest {
  return {
    email: String(data.email ?? "").trim(),
    fullName: String(data.fullName ?? "").trim(),
    password: String(data.password ?? ""),
    confirmPassword: String(data.confirmPassword ?? ""),
    phoneNumber: String(data.phoneNumber ?? "").trim(),
    isAgreed: Boolean(data.isAgreed),
  };
}
