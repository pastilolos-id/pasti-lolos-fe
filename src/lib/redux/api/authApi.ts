import { baseApi } from "./baseApi";
import type { RegisterRequest, RegisterSuccessResponse } from "./types/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<RegisterSuccessResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/Register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
