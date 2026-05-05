import type { FieldValues, UseFormSetError } from "react-hook-form";
import type {
  ApplyExamCouponErrorResponse,
  ApplyExamCouponRequest,
} from "./types/exams";

const APPLY_EXAM_COUPON_FIELD_KEYS = [
  "couponCode",
  "examId",
] as const satisfies readonly (keyof ApplyExamCouponRequest)[];

export function applyExamCouponFieldErrors(
  setError: UseFormSetError<FieldValues>,
  errors: NonNullable<ApplyExamCouponErrorResponse["errors"]>,
): void {
  for (const key of APPLY_EXAM_COUPON_FIELD_KEYS) {
    const messages = errors[key];
    if (messages?.length) {
      setError(key, {
        type: "server",
        message: messages[0],
      });
    }
  }
}
