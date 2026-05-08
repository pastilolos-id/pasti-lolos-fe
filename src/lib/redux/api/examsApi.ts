import {
  clearExamSession,
  setExamSession,
} from "@/lib/redux/slices/examSessionSlice";
import { baseApi } from "./baseApi";
import type {
  ApplyExamCouponRequest,
  ApplyExamCouponSuccessResponse,
  CheckoutExamPaymentRequest,
  CheckoutExamPaymentSuccessResponse,
  CheckoutPreviewSuccessResponse,
  ExamCategoryParam,
  ExamDetailSuccessResponse,
  ExamPackageDetailSuccessResponse,
  ExamsListSuccessResponse,
  StartExamSuccessResponse,
} from "./types/exams";

export const examsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getExams: build.query<
      ExamsListSuccessResponse,
      { category: ExamCategoryParam }
    >({
      query: ({ category }) => ({
        url: "/exams",
        params: { category },
      }),
    }),
    getExamPackageDetail: build.query<ExamPackageDetailSuccessResponse, number>(
      {
        query: (id) => ({
          url: `/exams/package-detail/${id}`,
        }),
      },
    ),
    getExamCheckoutPreview: build.query<CheckoutPreviewSuccessResponse, number>(
      {
        query: (id) => ({
          url: `/exams/checkout-preview/${id}`,
        }),
      },
    ),
    getExamDetail: build.query<ExamDetailSuccessResponse, number>({
      query: (id) => ({
        url: `/exams/${id}/get-exams`,
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        dispatch(clearExamSession());
        try {
          const { data } = await queryFulfilled;
          dispatch(setExamSession(data));
        } catch {
          dispatch(clearExamSession());
        }
      },
    }),
    applyExamCoupon: build.mutation<
      ApplyExamCouponSuccessResponse,
      ApplyExamCouponRequest
    >({
      query: (body) => ({
        url: "/payments/apply-coupon",
        method: "POST",
        body,
      }),
    }),
    checkoutExamPayment: build.mutation<
      CheckoutExamPaymentSuccessResponse,
      CheckoutExamPaymentRequest
    >({
      query: ({ examId, paymentMethod, file, discountCode }) => {
        const formData = new FormData();
        formData.append("examId", String(examId));
        formData.append("paymentMethod", paymentMethod);
        formData.append("file", file);
        if (discountCode) {
          formData.append("discountCode", discountCode);
        }

        return {
          url: "/payments/checkout/exam",
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        };
      },
    }),
    startExam: build.mutation<StartExamSuccessResponse, number>({
      query: (id) => ({
        url: `/exams/start/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetExamsQuery,
  useGetExamPackageDetailQuery,
  useGetExamCheckoutPreviewQuery,
  useGetExamDetailQuery,
  useApplyExamCouponMutation,
  useCheckoutExamPaymentMutation,
  useStartExamMutation,
} = examsApi;
