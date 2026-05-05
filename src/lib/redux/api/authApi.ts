import { baseApi } from "./baseApi";
import type {
  LoginRequest,
  LoginSuccessResponse,
  LogoutSuccessResponse,
  MyProfileResponse,
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
    logout: build.mutation<LogoutSuccessResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),
    getMyProfile: build.query<MyProfileResponse, void>({
      query: () => ({
        url: "/auth/myProfile",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useLazyGetMyProfileQuery,
} = authApi;
