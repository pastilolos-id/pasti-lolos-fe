import type { NotificationApiItem } from "@/lib/redux/api/types/notifications";

export interface NotificationViewModel {
  id: number;
  title: string;
  message: string;
  timeLabel: string;
  link: string | null;
  type: string;
  isRead: boolean;
}

/** Safe in-app path for Next.js `Link`: relative in-app paths only; blocks external and unsafe schemes. */
export function resolveNotificationHref(
  link: string | null,
  id: number,
): string {
  const fallback = `/notifications?id=${id}`;
  if (link == null || typeof link !== "string") {
    return fallback;
  }
  const trimmed = link.trim();
  if (!trimmed) {
    return fallback;
  }
  if (
    trimmed.startsWith("//") ||
    /^(https?:|javascript:|data:)/i.test(trimmed)
  ) {
    return fallback;
  }
  if (!trimmed.startsWith("/")) {
    return fallback;
  }
  return trimmed;
}

export function notificationTypeAccentClass(type: string): string {
  const t = type.toLowerCase();
  if (t === "warning") {
    return "border-l-[3px] border-amber-500 pl-2";
  }
  if (t === "error" || t === "danger") {
    return "border-l-[3px] border-red pl-2";
  }
  if (t === "success") {
    return "border-l-[3px] border-emerald-600 pl-2";
  }
  if (t === "info") {
    return "border-l-[3px] border-primary-4 pl-2";
  }
  return "border-l-[3px] border-transparent pl-2";
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
    link: item.link,
    type: item.type,
    isRead: item.isRead,
  };
}

export function mapNotificationsToViewModel(
  items: NotificationApiItem[],
): NotificationViewModel[] {
  return [...items]
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .map(mapNotificationApiItemToViewModel);
}
