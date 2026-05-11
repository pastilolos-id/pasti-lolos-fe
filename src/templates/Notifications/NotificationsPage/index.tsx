"use client";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components";
import { Card } from "@/components/ui/card";
import { useGetNotificationsQuery } from "@/lib/redux/api/notificationsApi";
import { cn } from "@/lib/utils";
import { mapNotificationsToViewModel } from "../mapNotificationFromApi";

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

export default function NotificationsPage() {
  const searchParams = useSearchParams();
  const selectedIdFromQuery = Number(searchParams.get("id"));
  const { data, isLoading, isFetching, isError, error } =
    useGetNotificationsQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  const notifications = useMemo(
    () => mapNotificationsToViewModel(data?.data ?? []),
    [data],
  );
  const [selectedId, setSelectedId] = useState<number>(0);

  useEffect(() => {
    if (!notifications.length) {
      if (selectedId !== 0) setSelectedId(0);
      return;
    }

    if (
      Number.isFinite(selectedIdFromQuery) &&
      notifications.some((item) => item.id === selectedIdFromQuery)
    ) {
      setSelectedId(selectedIdFromQuery);
      return;
    }

    const hasSelected = notifications.some((item) => item.id === selectedId);
    if (!hasSelected) {
      setSelectedId(notifications[0].id);
    }
  }, [notifications, selectedId, selectedIdFromQuery]);

  const selectedNotification = useMemo(
    () =>
      notifications.find((notification) => notification.id === selectedId) ??
      notifications[0],
    [notifications, selectedId],
  );

  const isInitialLoading = isLoading || (isFetching && !data);
  const is404Error =
    isError && isFetchBaseQueryError(error) && error.status === 404;
  const isOtherError = isError && !is404Error;

  const renderContent = () => {
    if (isInitialLoading) {
      return (
        <Card className="rounded-3xl border border-neutral-3 bg-white p-8 text-center shadow-none">
          <p className="text-neutral-5">Memuat notifikasi...</p>
        </Card>
      );
    }

    if (isOtherError) {
      return (
        <Card className="rounded-3xl border border-neutral-3 bg-white p-8 text-center shadow-none">
          <p className="text-neutral-5">
            Gagal memuat notifikasi. Coba lagi nanti.
          </p>
        </Card>
      );
    }

    if (is404Error || notifications.length === 0) {
      return (
        <Card className="rounded-3xl border border-neutral-3 bg-white p-8 text-center shadow-none">
          <p className="text-neutral-5">Belum ada notifikasi.</p>
        </Card>
      );
    }

    return (
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
                    "w-full cursor-pointer border-b border-neutral-3 px-3 py-3 text-left transition-colors last:border-b-0 hover:font-medium sm:px-4",
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
                    {notification.timeLabel}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="hidden rounded-3xl bg-neutral-2/30 p-4 md:block">
          {selectedNotification ? (
            <>
              <p className="cursor-pointer text-s1 font-semibold text-neutral-6">
                {selectedNotification.title}
              </p>
              <p className="mt-2 text-c1 text-neutral-4">
                {selectedNotification.timeLabel}
              </p>
              <p className="mt-6 text-b3 text-neutral-5">
                {selectedNotification.message}
              </p>
            </>
          ) : null}
        </div>
      </div>
    );
  };

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
      {renderContent()}
    </section>
  );
}
