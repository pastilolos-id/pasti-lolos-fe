import { baseApi } from "./baseApi";
import type { HomeDashboardSuccessResponse } from "./types/home";

function normalizeHomeDashboardResponse(
  raw: HomeDashboardSuccessResponse | null | undefined,
): HomeDashboardSuccessResponse {
  if (!raw || typeof raw !== "object") {
    return {};
  }

  return {
    heroBanner: raw.heroBanner ?? null,
    banners: Array.isArray(raw.banners) ? raw.banners : [],
    flashSale: raw.flashSale ?? null,
    rankingTryout: raw.rankingTryout ?? null,
  };
}

export const homeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getHomeDashboard: build.query<HomeDashboardSuccessResponse, void>({
      query: () => ({
        url: "/students/dashboard",
      }),
      transformResponse: (response: HomeDashboardSuccessResponse | null) =>
        normalizeHomeDashboardResponse(response),
    }),
  }),
});

export const { useGetHomeDashboardQuery } = homeApi;
