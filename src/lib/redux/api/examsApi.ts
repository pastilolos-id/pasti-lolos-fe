import { baseApi } from "./baseApi";
import type {
  ExamCategoryParam,
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
  }),
});

export const { useGetExamsQuery } = examsApi;
