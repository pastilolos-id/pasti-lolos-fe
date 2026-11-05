import {
  type BaseQueryFn,
  createApi,
  type FetchArgs,
  type FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { shouldTriggerSessionExpired } from "@/lib/auth/session-guards";

const baseUrl =
  typeof process.env.NEXT_PUBLIC_API_URL === "string"
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
    : "";

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { arg }) => {
    const requestArg =
      arg && typeof arg === "object" && !Array.isArray(arg)
        ? (arg as { body?: unknown })
        : undefined;
    const hasFormDataBody = requestArg?.body instanceof FormData;

    headers.set("Accept", "application/json");
    if (!hasFormDataBody && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});

function getRequestPath(args: string | FetchArgs): string {
  if (typeof args === "string") {
    return args;
  }
  return args.url;
}

const baseQueryWithSession: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const path = getRequestPath(args);
    if (shouldTriggerSessionExpired(path)) {
      void import("@/lib/auth/session-lifecycle").then((module) =>
        module.handleSessionExpired(),
      );
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ["Notifications"],
  baseQuery: baseQueryWithSession,
  endpoints: () => ({}),
});
