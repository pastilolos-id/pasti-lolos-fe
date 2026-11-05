import { baseApi } from "./baseApi";
import type { QuestionBankAdminItemDto } from "./types/questionBank";

function normalizeQuestionBanksAdminAllResponse(
  raw: unknown,
): QuestionBankAdminItemDto[] {
  if (Array.isArray(raw)) {
    return raw as QuestionBankAdminItemDto[];
  }
  if (
    raw &&
    typeof raw === "object" &&
    "data" in raw &&
    Array.isArray((raw as { data: unknown }).data)
  ) {
    return (raw as { data: QuestionBankAdminItemDto[] }).data;
  }
  return [];
}

export const questionBankApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQuestionBanksAdminAll: build.query<QuestionBankAdminItemDto[], void>({
      query: () => ({
        url: "/bank-soal/admin/all",
      }),
      transformResponse: (raw: unknown) =>
        normalizeQuestionBanksAdminAllResponse(raw),
    }),
  }),
});

export const { useGetQuestionBanksAdminAllQuery } = questionBankApi;
