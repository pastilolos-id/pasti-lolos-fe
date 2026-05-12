"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  NOTIFICATIONS_PREVIEW_LIMIT,
  useGetNotificationsQuery,
} from "@/lib/redux/api/notificationsApi";
import { cn } from "@/lib/utils";
import {
  mapNotificationsToViewModel,
  notificationTypeAccentClass,
  resolveNotificationHref,
} from "@/templates/Notifications/mapNotificationFromApi";
import Icon from "../Icon";

interface NotificationsProps {
  className?: string;
  onItemClick?: () => void;
  onSeeAllClick?: () => void;
}

export default function Notifications({
  className,
  onItemClick,
  onSeeAllClick,
}: NotificationsProps) {
  const { data, isLoading, isFetching, isError } = useGetNotificationsQuery(
    {
      page: 1,
      limit: NOTIFICATIONS_PREVIEW_LIMIT,
      unreadOnly: false,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  const notifications = useMemo(
    () => mapNotificationsToViewModel(data?.data ?? []),
    [data],
  );
  const isInitialLoading = isLoading || (isFetching && !data);

  return (
    <section
      className={cn(
        "rounded-4xl border-4 border-primary-5/50 bg-neutral-1 p-5 shadow-[0_10px_30px_rgba(34,87,160,0.16)]",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-s1 font-semibold text-neutral-6">Notifikasi</h2>
        <Icon
          viewBox="0 0 24 24"
          name="notification"
          size={24}
          pathClassName="fill-red"
        />
      </div>

      <div className="rounded-3xl bg-neutral-2/30 px-3 py-2">
        {isInitialLoading ? (
          <p className="py-3 text-c1 text-neutral-4">Memuat notifikasi...</p>
        ) : isError ? (
          <p className="py-3 text-c1 text-neutral-4">
            Gagal memuat notifikasi.
          </p>
        ) : notifications.length === 0 ? (
          <p className="py-3 text-c1 text-neutral-4">Belum ada notifikasi.</p>
        ) : (
          notifications.map((item, index) => {
            const href = resolveNotificationHref(item.link, item.id);
            const unread = !item.isRead;
            return (
              <Link
                key={item.id}
                href={href}
                onClick={onItemClick}
                className={cn(
                  "block py-3",
                  notificationTypeAccentClass(item.type),
                  index < notifications.length - 1 &&
                    "border-b border-neutral-3",
                  index === 0 && "rounded-2xl bg-neutral-1 px-2",
                )}
              >
                <div className="flex gap-2">
                  <span
                    className={cn(
                      "mt-1.5 size-2 shrink-0 rounded-full",
                      unread ? "bg-primary-4" : "invisible",
                    )}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "line-clamp-2 text-b1 text-neutral-6",
                        unread && "font-semibold",
                      )}
                    >
                      {item.title}
                    </p>
                    <p className="mt-1 text-c1 text-neutral-4">
                      {item.timeLabel}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      <div className="mt-4 flex items-center justify-center">
        <Link
          href="/notifications"
          onClick={onSeeAllClick}
          className="text-s1 font-medium text-primary-4"
        >
          Lihat Semua
        </Link>
      </div>
    </section>
  );
}
