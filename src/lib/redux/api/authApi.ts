import { baseApi } from "./baseApi";
import type {
  LoginRequest,
  LoginSuccessResponse,
  RegisterRequest,
  RegisterSuccessResponse,
} from "./types/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<RegisterSuccessResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/Register",
        method: "POST",
        body,
      }),
    }),
    login: build.mutation<LoginSuccessResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
