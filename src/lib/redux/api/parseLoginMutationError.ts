import type { LoginErrorResponse, LoginFieldErrors } from "./types/auth";

function isLoginErrorJsonBody(
  value: unknown,
): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  const hasMessage = typeof v.message === "string";
  const hasErrors =
    v.errors !== null &&
    typeof v.errors === "object" &&
    !Array.isArray(v.errors);
  const hasStatusCode = typeof v.statusCode === "number";
  return hasMessage || hasErrors || hasStatusCode;
}

function normalizeErrors(raw: unknown): LoginFieldErrors | undefined {
  if (
    raw === null ||
    typeof raw !== "object" ||
    Array.isArray(raw) ||
    Object.keys(raw as object).length === 0
  ) {
    return undefined;
  }
  return raw as LoginFieldErrors;
}

export function parseLoginMutationError(
  error: unknown,
): LoginErrorResponse | null {
  if (!error || typeof error !== "object") return null;
  const err = error as Record<string, unknown>;
  const data = err.data;

  if (isLoginErrorJsonBody(data)) {
    const statusFromFetch =
      typeof err.status === "number" ? err.status : undefined;
    const messageFromBody =
      typeof data.message === "string" ? data.message.trim() : "";
    return {
      statusCode:
        typeof data.statusCode === "number"
          ? data.statusCode
          : (statusFromFetch ?? 500),
      message: messageFromBody,
      errors: normalizeErrors(data.errors),
    };
  }

  if (typeof data === "string") {
    return {
      statusCode: typeof err.status === "number" ? err.status : 500,
      message: data,
    };
  }

  if (typeof err.message === "string") {
    return {
      statusCode: typeof err.status === "number" ? err.status : 500,
      message: err.message,
    };
  }

  return null;
}
