"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components";
import { cn } from "@/lib/utils";
import { notifications } from "@/mock-data/notifications";

export default function NotificationsPage() {
  const [selectedId, setSelectedId] = useState<number>(
    notifications[0]?.id ?? 0,
  );

  const selectedNotification = useMemo(
    () =>
      notifications.find((notification) => notification.id === selectedId) ??
      notifications[0],
    [selectedId],
  );

  return (
    <section className="rounded-card-medium border border-neutral-3 bg-neutral-1 p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-h4 font-semibold text-neutral-6">Notifikasi</h1>
        <Icon
          name="notification"
          viewBox="0 0 24 24"
          pathClassName="fill-red"
          size={24}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
        <div className="rounded-3xl bg-neutral-2/30 p-2 sm:p-3">
          <div className="h-[calc(100vh-195px)] overflow-auto">
            {notifications.map((notification) => {
              const isSelected = notification.id === selectedId;
              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => setSelectedId(notification.id)}
                  className={cn(
                    "w-full border-b border-neutral-3 px-3 py-3 text-left transition-colors last:border-b-0 sm:px-4 cursor-pointer hover:font-medium",
                    isSelected && "rounded-2xl border-b-0 bg-neutral-2",
                  )}
                >
                  <p
                    className={cn(
                      "line-clamp-2 text-s1 text-neutral-6",
                      isSelected && "font-semibold",
                    )}
                  >
                    {notification.title}
                  </p>
                  <p className="mt-1 text-c1 text-neutral-4">
                    {notification.time}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="hidden rounded-3xl bg-neutral-2/30 p-4 md:block">
          {selectedNotification ? (
            <>
              <p className="text-s1 font-semibold text-neutral-6 cursor-pointer">
                {selectedNotification.title}
              </p>
              <p className="mt-2 text-c1 text-neutral-4">
                {selectedNotification.time}
              </p>
              <p className="mt-6 text-b3 text-neutral-5">
                {selectedNotification.message}
              </p>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
