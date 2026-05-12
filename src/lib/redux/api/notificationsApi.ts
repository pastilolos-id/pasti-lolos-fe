import { baseApi } from "./baseApi";
import type {
  NotificationApiItem,
  NotificationsApiRawResponse,
  NotificationsListQueryArg,
  NotificationsMeta,
  NotificationsSuccessResponse,
  NotificationsUnreadCountResponse,
} from "./types/notifications";

const notificationsListTag = { type: "Notifications" as const };

function coerceFiniteInt(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.trunc(value);
  }
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number.parseInt(value, 10);
    if (Number.isFinite(n)) {
      return n;
    }
  }
  return null;
}

/** Normalizes one row from BE; drops only rows without a usable id. */
function coerceNotificationApiItem(value: unknown): NotificationApiItem | null {
  if (!value || typeof value !== "object") {
    return null;
  }
  const o = value as Record<string, unknown>;
  const id = coerceFiniteInt(o.id);
  if (id == null) {
    return null;
  }
  const userId = coerceFiniteInt(o.userId) ?? 0;
  const title = typeof o.title === "string" ? o.title : String(o.title ?? "");
  const message =
    typeof o.message === "string" ? o.message : String(o.message ?? "");
  const type = typeof o.type === "string" ? o.type : String(o.type ?? "");
  const link =
    o.link === null || o.link === undefined
      ? null
      : typeof o.link === "string"
        ? o.link
        : null;
  const isRead = Boolean(o.isRead);
  let createdAt = "";
  if (typeof o.createdAt === "string" && o.createdAt.length > 0) {
    createdAt = o.createdAt;
  } else if (typeof o.createdAt === "number" && Number.isFinite(o.createdAt)) {
    createdAt = new Date(o.createdAt).toISOString();
  } else {
    createdAt = new Date(0).toISOString();
  }

  return {
    id,
    userId,
    title,
    message,
    type,
    link,
    isRead,
    createdAt,
  };
}

function mapAndFilterNotifications(rows: unknown[]): NotificationApiItem[] {
  const out: NotificationApiItem[] = [];
  for (const row of rows) {
    const item = coerceNotificationApiItem(row);
    if (item) {
      out.push(item);
    }
  }
  return out;
}

function normalizeMeta(
  dataLength: number,
  partial?: Partial<NotificationsMeta> | null,
): NotificationsMeta {
  const limit =
    typeof partial?.limit === "number" && partial.limit > 0
      ? partial.limit
      : 20;
  const total =
    typeof partial?.total === "number" && partial.total >= 0
      ? partial.total
      : dataLength;
  const page =
    typeof partial?.page === "number" && partial.page > 0 ? partial.page : 1;
  const lastPageFromMeta =
    typeof partial?.lastPage === "number" && partial.lastPage > 0
      ? partial.lastPage
      : undefined;
  const lastPage =
    lastPageFromMeta ?? Math.max(1, Math.ceil(total / limit) || 1);

  return { total, page, lastPage, limit };
}

function normalizeNotificationsResponse(
  raw: NotificationsApiRawResponse | null | undefined,
): NotificationsSuccessResponse {
  if (Array.isArray(raw)) {
    const data = mapAndFilterNotifications(raw);
    return {
      data,
      meta: normalizeMeta(data.length, {
        total: data.length,
        page: 1,
        lastPage: 1,
        limit: data.length || 20,
      }),
    };
  }

  if (!raw || typeof raw !== "object") {
    return {
      data: [],
      meta: normalizeMeta(0, {}),
    };
  }

  if (!Array.isArray(raw.data)) {
    return {
      data: [],
      meta: normalizeMeta(0, "meta" in raw && raw.meta ? raw.meta : {}),
    };
  }

  const data = mapAndFilterNotifications(raw.data);
  const metaSource =
    "meta" in raw && raw.meta && typeof raw.meta === "object"
      ? (raw.meta as Partial<NotificationsMeta>)
      : undefined;

  return {
    data,
    meta: normalizeMeta(data.length, metaSource),
    message:
      "message" in raw && typeof raw.message === "string"
        ? raw.message
        : undefined,
  };
}

function unwrapApiResponse(response: unknown): NotificationsApiRawResponse {
  if (response == null) {
    return { data: [] };
  }
  if (Array.isArray(response)) {
    return response;
  }
  if (typeof response !== "object") {
    return { data: [] };
  }

  const root = response as Record<string, unknown>;

  if (Array.isArray(root.data)) {
    return {
      data: root.data,
      meta:
        root.meta && typeof root.meta === "object"
          ? (root.meta as Partial<NotificationsMeta>)
          : undefined,
      message: typeof root.message === "string" ? root.message : undefined,
    };
  }

  return { data: [] };
}

function listQueryKey(arg: NotificationsListQueryArg): string {
  const page = arg.page > 0 ? arg.page : 1;
  const limit = arg.limit > 0 ? arg.limit : 20;
  const unread = arg.unreadOnly ? "1" : "0";
  return `LIST_${page}_${limit}_${unread}`;
}

function unwrapSingleNotification(
  response: unknown,
): NotificationApiItem | null {
  if (response == null || typeof response !== "object") {
    return null;
  }
  const root = response as Record<string, unknown>;
  const direct = coerceNotificationApiItem(root);
  if (direct) {
    return direct;
  }
  if (root.data !== undefined) {
    const nested = coerceNotificationApiItem(root.data);
    if (nested) {
      return nested;
    }
    if (
      root.data &&
      typeof root.data === "object" &&
      !Array.isArray(root.data)
    ) {
      const inner = root.data as Record<string, unknown>;
      const fromInner = coerceNotificationApiItem(inner);
      if (fromInner) {
        return fromInner;
      }
      if (inner.data !== undefined) {
        return coerceNotificationApiItem(inner.data);
      }
    }
  }
  return null;
}

function normalizeUnreadCountResponse(
  raw: unknown,
): NotificationsUnreadCountResponse {
  if (raw == null || typeof raw !== "object") {
    return { count: 0 };
  }
  const o = raw as Record<string, unknown>;
  const asCount = (v: unknown): number | null => {
    if (typeof v === "number" && Number.isFinite(v)) {
      return Math.max(0, Math.floor(v));
    }
    if (typeof v === "string" && v.trim() !== "") {
      const n = Number.parseInt(v, 10);
      if (Number.isFinite(n)) {
        return Math.max(0, n);
      }
    }
    return null;
  };
  const c0 = asCount(o.count);
  if (c0 != null) {
    return { count: c0 };
  }
  if (o.data && typeof o.data === "object" && !Array.isArray(o.data)) {
    const c1 = asCount((o.data as Record<string, unknown>).count);
    if (c1 != null) {
      return { count: c1 };
    }
  }
  return { count: 0 };
}

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<
      NotificationsSuccessResponse,
      NotificationsListQueryArg
    >({
      query: (arg) => {
        const page = arg.page > 0 ? arg.page : 1;
        const limit = arg.limit > 0 ? arg.limit : 20;
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (arg.unreadOnly) {
          params.set("unreadOnly", "true");
        }
        const qs = params.toString();
        return {
          url: `/notifications${qs ? `?${qs}` : ""}`,
        };
      },
      providesTags: (_result, _error, arg) => [
        { ...notificationsListTag, id: listQueryKey(arg) },
      ],
      transformResponse: (response: unknown) =>
        normalizeNotificationsResponse(unwrapApiResponse(response)),
    }),

    getNotificationsUnreadCount: build.query<
      NotificationsUnreadCountResponse,
      void
    >({
      query: () => ({ url: "/notifications/unread-count" }),
      providesTags: [{ ...notificationsListTag, id: "UNREAD_COUNT" }],
      transformResponse: (response: unknown) =>
        normalizeUnreadCountResponse(response),
    }),

    getNotificationById: build.query<
      NotificationApiItem,
      { id: number; markRead?: boolean }
    >({
      query: ({ id, markRead }) => ({
        url: `/notifications/${id}`,
        params: markRead ? { markRead: "true" } : undefined,
      }),
      providesTags: (_result, _error, { id }) => [
        { ...notificationsListTag, id: `ITEM_${id}` },
      ],
      transformResponse: (response: unknown) => {
        const item = unwrapSingleNotification(response);
        if (!item) {
          throw new Error("Invalid notification response");
        }
        return item;
      },
    }),

    markNotificationRead: build.mutation<void, number>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: [notificationsListTag],
    }),

    markAllNotificationsRead: build.mutation<void, void>({
      query: () => ({
        url: "/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: [notificationsListTag],
    }),

    deleteNotification: build.mutation<void, number>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [notificationsListTag],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetNotificationsUnreadCountQuery,
  useGetNotificationByIdQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useDeleteNotificationMutation,
} = notificationsApi;

export {
  NOTIFICATIONS_PAGE_SIZE_DEFAULT,
  NOTIFICATIONS_PREVIEW_LIMIT,
} from "./types/notifications";
