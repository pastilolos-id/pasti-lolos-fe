export interface NotificationApiItem {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsMeta {
  total: number;
  page: number;
  lastPage: number;
  limit: number;
}

export interface NotificationsSuccessResponse {
  data: NotificationApiItem[];
  meta?: NotificationsMeta;
  message?: string;
}

/** Optional Nest-style envelope before transform. */
export interface NotificationsWrappedResponse {
  success?: boolean;
  data: NotificationApiItem[];
  meta?: Partial<NotificationsMeta>;
  message?: string;
}

export type NotificationsApiRawResponse =
  | NotificationsSuccessResponse
  | NotificationApiItem[]
  | NotificationsWrappedResponse;

/** Query params for GET /notifications (pagination + unread filter). */
export interface NotificationsListQueryArg {
  page: number;
  limit: number;
  unreadOnly?: boolean;
}

export const NOTIFICATIONS_PAGE_SIZE_DEFAULT = 20;
export const NOTIFICATIONS_PREVIEW_LIMIT = 5;

/** GET /notifications/unread-count — adjust field names if BE differs. */
export interface NotificationsUnreadCountResponse {
  count: number;
}
