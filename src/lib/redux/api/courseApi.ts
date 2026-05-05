import { baseApi } from "./baseApi";
import type { CheckoutPreviewSuccessResponse } from "./types/exams";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCourseCheckoutPreview: build.query<
      CheckoutPreviewSuccessResponse,
      number
    >({
      query: (id) => ({
        url: `/course/checkout-preview/${id}`,
      }),
    }),
  }),
});

export const { useGetCourseCheckoutPreviewQuery } = courseApi;
