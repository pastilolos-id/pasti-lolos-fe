import type {
  ApplyExamCouponErrorResponse,
  ApplyExamCouponFieldErrors,
} from "./types/exams";

function isApplyExamCouponErrorJsonBody(
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

function normalizeErrors(raw: unknown): ApplyExamCouponFieldErrors | undefined {
  if (
    raw === null ||
    typeof raw !== "object" ||
    Array.isArray(raw) ||
    Object.keys(raw as object).length === 0
  ) {
    return undefined;
  }
  return raw as ApplyExamCouponFieldErrors;
}

export function parseApplyExamCouponMutationError(
  error: unknown,
): ApplyExamCouponErrorResponse | null {
  if (!error || typeof error !== "object") return null;
  const err = error as Record<string, unknown>;
  const data = err.data;

  if (isApplyExamCouponErrorJsonBody(data)) {
    const statusFromFetch =
      typeof err.status === "number" ? err.status : undefined;
    const messageFromBody =
      typeof data.message === "string" ? data.message.trim() : "";

    return {
      statusCode:
        typeof data.statusCode === "number"
          ? data.statusCode
          : (statusFromFetch ?? 500),
      error: typeof data.error === "string" ? data.error : "Request Error",
      message: messageFromBody,
      errors: normalizeErrors(data.errors),
    };
  }

  if (typeof data === "string") {
    return {
      statusCode: typeof err.status === "number" ? err.status : 500,
      error: "Request Error",
      message: data,
    };
  }

  if (typeof err.message === "string") {
    return {
      statusCode: typeof err.status === "number" ? err.status : 500,
      error: "Request Error",
      message: err.message,
    };
  }

  return null;
}
