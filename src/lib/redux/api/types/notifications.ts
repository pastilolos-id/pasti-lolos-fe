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

export type NotificationsApiRawResponse =
  | NotificationsSuccessResponse
  | NotificationApiItem[];
