"use client";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "@/components";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  NOTIFICATIONS_PAGE_SIZE_DEFAULT,
  useDeleteNotificationMutation,
  useGetNotificationByIdQuery,
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
} from "@/lib/redux/api/notificationsApi";
import { cn } from "@/lib/utils";
import {
  mapNotificationApiItemToViewModel,
  mapNotificationsToViewModel,
  notificationTypeAccentClass,
  resolveNotificationHref,
} from "../mapNotificationFromApi";

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

export default function NotificationsPage() {
  const searchParams = useSearchParams();
  const selectedIdFromQuery = Number(searchParams.get("id"));

  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);

  const listArg = useMemo(
    () => ({
      page,
      limit: NOTIFICATIONS_PAGE_SIZE_DEFAULT,
      unreadOnly,
    }),
    [page, unreadOnly],
  );

  const { data, isLoading, isFetching, isError, error } =
    useGetNotificationsQuery(listArg, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  const notifications = useMemo(
    () => mapNotificationsToViewModel(data?.data ?? []),
    [data],
  );

  const meta = data?.meta;
  const lastPage = meta?.lastPage ?? 1;
  const currentPage = meta?.page ?? page;

  const [selectedId, setSelectedId] = useState<number>(0);

  const rowInPage = data?.data.find((n) => n.id === selectedId);

  const skipMarkReadFetch = !selectedId || Boolean(rowInPage?.isRead);

  const {
    data: detailApiItem,
    isError: detailError,
    isFetching: detailFetching,
  } = useGetNotificationByIdQuery(
    { id: selectedId, markRead: true },
    { skip: skipMarkReadFetch },
  );

  const [markAllRead, { isLoading: isMarkingAll }] =
    useMarkAllNotificationsReadMutation();
  const [removeNotification, { isLoading: isDeleting }] =
    useDeleteNotificationMutation();

  useEffect(() => {
    if (!notifications.length) {
      if (Number.isFinite(selectedIdFromQuery) && selectedIdFromQuery > 0) {
        setSelectedId(selectedIdFromQuery);
        return;
      }
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

    if (
      Number.isFinite(selectedIdFromQuery) &&
      selectedIdFromQuery > 0 &&
      !notifications.some((item) => item.id === selectedIdFromQuery)
    ) {
      setSelectedId(selectedIdFromQuery);
      return;
    }

    const hasSelected = notifications.some((item) => item.id === selectedId);
    if (!hasSelected) {
      setSelectedId(notifications[0].id);
    }
  }, [notifications, selectedId, selectedIdFromQuery]);

  const selectedNotification = useMemo(() => {
    const fromDetail = detailApiItem
      ? mapNotificationApiItemToViewModel(detailApiItem)
      : null;
    const fromList = notifications.find((n) => n.id === selectedId);
    return fromDetail ?? fromList ?? notifications[0];
  }, [detailApiItem, notifications, selectedId]);

  const onUnreadTab = useCallback((next: boolean) => {
    setUnreadOnly(next);
    setPage(1);
  }, []);

  const isInitialLoading = isLoading || (isFetching && !data);
  const is404Error =
    isError && isFetchBaseQueryError(error) && error.status === 404;
  const isOtherError = isError && !is404Error;

  const handleMarkAllRead = async () => {
    try {
      await markAllRead().unwrap();
      setPage(1);
    } catch {
      /* toast optional */
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedId) return;
    try {
      await removeNotification(selectedId).unwrap();
    } catch {
      /* */
    }
  };

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

    if (is404Error) {
      return (
        <Card className="rounded-3xl border border-neutral-3 bg-white p-8 text-center shadow-none">
          <p className="text-neutral-5">Notifikasi tidak ditemukan.</p>
        </Card>
      );
    }

    if (
      notifications.length === 0 &&
      selectedId > 0 &&
      !skipMarkReadFetch &&
      detailFetching
    ) {
      return (
        <Card className="rounded-3xl border border-neutral-3 bg-white p-8 text-center shadow-none">
          <p className="text-neutral-5">Memuat notifikasi...</p>
        </Card>
      );
    }

    if (
      notifications.length === 0 &&
      selectedId > 0 &&
      !skipMarkReadFetch &&
      detailError
    ) {
      return (
        <Card className="rounded-3xl border border-neutral-3 bg-white p-8 text-center shadow-none">
          <p className="text-neutral-5">Notifikasi tidak ditemukan.</p>
        </Card>
      );
    }

    if (notifications.length === 0 && detailApiItem) {
      const only = mapNotificationApiItemToViewModel(detailApiItem);
      return (
        <Card className="rounded-3xl border border-neutral-3 bg-white p-6 shadow-none sm:p-8">
          <p className="text-s1 font-semibold text-neutral-6">{only.title}</p>
          <p className="mt-2 text-c1 text-neutral-4">{only.timeLabel}</p>
          <p className="mt-6 text-b3 text-neutral-5">{only.message}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={resolveNotificationHref(only.link, only.id)}
              className="text-s1 font-medium text-primary-4 hover:underline"
            >
              Buka tautan terkait
            </Link>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="text-xs"
              disabled={isDeleting}
              onClick={() => void handleDeleteSelected()}
            >
              Hapus
            </Button>
          </div>
        </Card>
      );
    }

    if (notifications.length === 0) {
      return (
        <Card className="rounded-3xl border border-neutral-3 bg-white p-8 text-center shadow-none">
          <p className="text-neutral-5">
            {unreadOnly
              ? "Tidak ada notifikasi belum dibaca."
              : "Belum ada notifikasi."}
          </p>
        </Card>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
        <div className="rounded-3xl bg-neutral-2/30 p-2 sm:p-3">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="flex gap-2">
              <Button
                type="button"
                variant={unreadOnly ? "outline" : "secondary"}
                size="sm"
                className="text-xs"
                onClick={() => onUnreadTab(false)}
              >
                Semua
              </Button>
              <Button
                type="button"
                variant={unreadOnly ? "secondary" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => onUnreadTab(true)}
              >
                Belum dibaca
              </Button>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs text-primary-4"
              disabled={isMarkingAll}
              onClick={() => void handleMarkAllRead()}
            >
              Tandai semua dibaca
            </Button>
          </div>
          <div className="flex items-center justify-between gap-2 border-b border-neutral-3 px-1 pb-2 text-c1 text-neutral-5">
            <span>
              Halaman {currentPage} dari {lastPage}
            </span>
            <div className="flex gap-1">
              <Button
                type="button"
                variant="outline"
                size="xs"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Sebelumnya
              </Button>
              <Button
                type="button"
                variant="outline"
                size="xs"
                disabled={currentPage >= lastPage}
                onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
              >
                Berikutnya
              </Button>
            </div>
          </div>
          <div className="h-[calc(100vh-280px)] overflow-auto">
            {notifications.map((notification) => {
              const isSelected = notification.id === selectedId;
              const unread = !notification.isRead;
              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => setSelectedId(notification.id)}
                  className={cn(
                    "w-full cursor-pointer border-b border-neutral-3 px-3 py-3 text-left transition-colors last:border-b-0 hover:font-medium sm:px-4",
                    notificationTypeAccentClass(notification.type),
                    isSelected && "rounded-2xl border-b-0 bg-neutral-2",
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
                          "line-clamp-2 text-s1 text-neutral-6",
                          unread && "font-semibold",
                          isSelected && "font-semibold",
                        )}
                      >
                        {notification.title}
                      </p>
                      <p className="mt-1 text-c1 text-neutral-4">
                        {notification.timeLabel}
                      </p>
                    </div>
                  </div>
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
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={resolveNotificationHref(
                    selectedNotification.link,
                    selectedNotification.id,
                  )}
                  className="text-s1 font-medium text-primary-4 hover:underline"
                >
                  Buka tautan terkait
                </Link>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="text-xs"
                  disabled={isDeleting}
                  onClick={() => void handleDeleteSelected()}
                >
                  Hapus
                </Button>
              </div>
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
