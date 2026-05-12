import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  typeof process.env.NEXT_PUBLIC_API_URL === "string"
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
    : "";

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ["Notifications"],
  baseQuery: fetchBaseQuery({
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
  }),
  endpoints: () => ({}),
});
