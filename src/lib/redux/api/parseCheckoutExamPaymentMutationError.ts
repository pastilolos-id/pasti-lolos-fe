import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { CheckoutExamPaymentErrorResponse } from "./types/exams";

export type CheckoutExamPaymentErrorCategory =
  | "coupon-related"
  | "file-related"
  | "general";

function isCheckoutExamPaymentErrorBody(
  value: unknown,
): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  const hasMessage = typeof v.message === "string";
  const hasError = typeof v.error === "string";
  const hasStatusCode = typeof v.statusCode === "number";
  return hasMessage || hasError || hasStatusCode;
}

export function parseCheckoutExamPaymentMutationError(
  error: unknown,
): CheckoutExamPaymentErrorResponse | null {
  if (!error || typeof error !== "object") return null;
  const err = error as Record<string, unknown>;
  const data = err.data;

  if (isCheckoutExamPaymentErrorBody(data)) {
    const statusFromFetch =
      typeof err.status === "number" ? err.status : undefined;
    return {
      statusCode:
        typeof data.statusCode === "number"
          ? data.statusCode
          : (statusFromFetch ?? 500),
      error: typeof data.error === "string" ? data.error : "Request Error",
      message:
        typeof data.message === "string" && data.message.trim().length > 0
          ? data.message
          : "Terjadi kesalahan saat memproses pembayaran.",
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

export function getCheckoutExamPaymentErrorMessage(error: unknown): string {
  const parsed = parseCheckoutExamPaymentMutationError(error);
  if (parsed?.message?.trim()) {
    return parsed.message.trim();
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as FetchBaseQueryError).data === "string"
  ) {
    return String((error as FetchBaseQueryError).data);
  }

  return "Gagal memproses pembayaran. Silakan coba lagi.";
}

export function getCheckoutExamPaymentErrorCategory(
  error: unknown,
): CheckoutExamPaymentErrorCategory {
  const normalized = getCheckoutExamPaymentErrorMessage(error).toLowerCase();

  if (
    normalized.includes("coupon") ||
    normalized.includes("kupon") ||
    normalized.includes("voucher")
  ) {
    return "coupon-related";
  }

  if (normalized.includes("file") || normalized.includes("upload")) {
    return "file-related";
  }

  return "general";
}
