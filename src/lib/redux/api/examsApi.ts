import { baseApi } from "./baseApi";
import type {
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
  }),
});

export const { useGetExamsQuery, useGetExamPackageDetailQuery } = examsApi;
