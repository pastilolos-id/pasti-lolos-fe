import { baseApi } from "./baseApi";
import type {
  NotificationsApiRawResponse,
  NotificationsSuccessResponse,
} from "./types/notifications";

function normalizeNotificationsResponse(
  raw: NotificationsApiRawResponse | null | undefined,
): NotificationsSuccessResponse {
  if (Array.isArray(raw)) {
    return {
      data: raw,
      meta: {
        total: raw.length,
        page: 1,
        lastPage: 1,
        limit: raw.length,
      },
    };
  }

  if (!raw || !Array.isArray(raw.data)) {
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        lastPage: 1,
        limit: 20,
      },
    };
  }

  return {
    ...raw,
    data: raw.data,
  };
}

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<NotificationsSuccessResponse, void>({
      query: () => ({
        url: "/notifications",
      }),
      transformResponse: (response: NotificationsApiRawResponse) =>
        normalizeNotificationsResponse(response),
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationsApi;
