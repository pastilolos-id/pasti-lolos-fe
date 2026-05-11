import type { NotificationApiItem } from "@/lib/redux/api/types/notifications";

export interface NotificationViewModel {
  id: number;
  title: string;
  message: string;
  timeLabel: string;
}

const relativeTimeFormatter = new Intl.RelativeTimeFormat("id-ID", {
  numeric: "auto",
});

function getRelativeTimeLabel(iso: string): string {
  const createdAt = new Date(iso);
  if (Number.isNaN(createdAt.getTime())) {
    return iso;
  }

  const diffMs = createdAt.getTime() - Date.now();
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  const absMinutes = Math.abs(diffMinutes);

  if (absMinutes < 60) {
    return relativeTimeFormatter.format(diffMinutes, "minute");
  }

  const diffHours = Math.round(diffMinutes / 60);
  const absHours = Math.abs(diffHours);
  if (absHours < 24) {
    return relativeTimeFormatter.format(diffHours, "hour");
  }

  const diffDays = Math.round(diffHours / 24);
  if (Math.abs(diffDays) < 7) {
    return relativeTimeFormatter.format(diffDays, "day");
  }

  return createdAt.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function mapNotificationApiItemToViewModel(
  item: NotificationApiItem,
): NotificationViewModel {
  return {
    id: item.id,
    title: item.title,
    message: item.message,
    timeLabel: getRelativeTimeLabel(item.createdAt),
  };
}

export function mapNotificationsToViewModel(
  items: NotificationApiItem[],
): NotificationViewModel[] {
  return [...items]
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .map(mapNotificationApiItemToViewModel);
}
