import { baseApi } from "./baseApi";
import type {
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "./types/profile";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateProfile: build.mutation<
      UpdateProfileResponse,
      Partial<UpdateProfileRequest>
    >({
      query: (body) => ({
        url: "/auth/profile",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = profileApi;
