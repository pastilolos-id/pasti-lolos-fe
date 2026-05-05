import { baseApi } from "./baseApi";
import type {
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
  }),
});

export const {
  useGetExamsQuery,
  useGetExamPackageDetailQuery,
  useGetExamCheckoutPreviewQuery,
} = examsApi;
