import { baseApi } from "./baseApi";
import type {
  ApplyExamCouponRequest,
  ApplyExamCouponSuccessResponse,
  CheckoutPreviewSuccessResponse,
  ExamCategoryParam,
  ExamPackageDetailSuccessResponse,
  ExamsListSuccessResponse,
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
  }),
});

export const {
  useGetExamsQuery,
  useGetExamPackageDetailQuery,
  useGetExamCheckoutPreviewQuery,
  useApplyExamCouponMutation,
} = examsApi;
