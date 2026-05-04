import type { RegisterErrorResponse, RegisterFieldErrors } from "./types/auth";

/**
 * JSON body from API: may include `message`, `errors`, and/or `statusCode`.
 * Some backends omit `message` when only field-level `errors` are returned.
 */
function isRegisterErrorJsonBody(
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

function normalizeErrors(raw: unknown): RegisterFieldErrors | undefined {
  if (
    raw === null ||
    typeof raw !== "object" ||
    Array.isArray(raw) ||
    Object.keys(raw as object).length === 0
  ) {
    return undefined;
  }
  return raw as RegisterFieldErrors;
}

/**
 * Normalizes RTK Query mutation errors thrown by `.unwrap()` (usually `{ status, data }`)
 * and plain `SerializedError`-like shapes.
 */
export function parseRegisterMutationError(
  error: unknown,
): RegisterErrorResponse | null {
  if (!error || typeof error !== "object") return null;
  const err = error as Record<string, unknown>;
  const data = err.data;

  if (isRegisterErrorJsonBody(data)) {
    const statusFromFetch =
      typeof err.status === "number" ? err.status : undefined;
    const messageFromBody =
      typeof data.message === "string" ? data.message.trim() : "";
    return {
      statusCode:
        typeof data.statusCode === "number"
          ? data.statusCode
          : (statusFromFetch ?? 500),
      /** Empty when backend only sends `errors` — UI can rely on per-field messages + fallback alert logic */
      message: messageFromBody,
      errors: normalizeErrors(data.errors),
    };
  }

  /**
   * Plain-text error bodies (non-JSON or middleware returning a string `data`).
   * Your `{ statusCode, errors }` object is handled above, not here.
   */
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
