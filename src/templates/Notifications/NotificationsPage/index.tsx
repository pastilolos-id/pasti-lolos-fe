"use client";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "@/components";
import { Button } from "@/components/ui/button";
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

function parsePositiveId(value: string | null): number {
  const id = Number(value);
  return Number.isFinite(id) && id > 0 ? id : 0;
}

export default function NotificationsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedIdFromQuery = parsePositiveId(searchParams.get("id"));

  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(selectedIdFromQuery);

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

  const syncSelectedIdToUrl = useCallback(
    (id: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id > 0) {
        params.set("id", String(id));
      } else {
        params.delete("id");
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const selectNotification = useCallback(
    (id: number) => {
      setSelectedId(id);
      syncSelectedIdToUrl(id);
    },
    [syncSelectedIdToUrl],
  );

  // Deep-link / browser back-forward: follow ?id= only when the URL changes.
  useEffect(() => {
    if (selectedIdFromQuery > 0) {
      setSelectedId(selectedIdFromQuery);
    }
  }, [selectedIdFromQuery]);

  // When the current selection is not in the active list/filter, pick the first item.
  useEffect(() => {
    if (!notifications.length) {
      return;
    }

    const hasSelectedInList = notifications.some(
      (item) => item.id === selectedId,
    );
    if (!hasSelectedInList) {
      selectNotification(notifications[0].id);
    }
  }, [notifications, selectNotification, selectedId]);

  const selectedNotification = useMemo(() => {
    const fromDetail =
      detailApiItem && detailApiItem.id === selectedId
        ? mapNotificationApiItemToViewModel(detailApiItem)
        : null;
    const fromList = notifications.find((n) => n.id === selectedId);
    return fromDetail ?? fromList ?? null;
  }, [detailApiItem, notifications, selectedId]);

  const onUnreadTab = useCallback((next: boolean) => {
    setUnreadOnly(next);
    setPage(1);
  }, []);

  const isListLoading = isLoading || (isFetching && !data);
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

  const listEmptyMessage = unreadOnly
    ? "Tidak ada notifikasi yang belum dibaca."
    : "Belum ada notifikasi.";

  const renderListBody = () => {
    if (isListLoading) {
      return (
        <p className="px-3 py-8 text-center text-neutral-5">
          Memuat notifikasi...
        </p>
      );
    }

    if (isOtherError) {
      return (
        <p className="px-3 py-8 text-center text-neutral-5">
          Gagal memuat notifikasi. Coba lagi nanti.
        </p>
      );
    }

    if (is404Error) {
      return (
        <p className="px-3 py-8 text-center text-neutral-5">
          Notifikasi tidak ditemukan.
        </p>
      );
    }

    if (notifications.length === 0) {
      return (
        <p className="px-3 py-8 text-center text-neutral-5">
          {listEmptyMessage}
        </p>
      );
    }

    return notifications.map((notification) => {
      const isSelected = notification.id === selectedId;
      const unread = !notification.isRead;
      return (
        <button
          key={notification.id}
          type="button"
          onClick={() => selectNotification(notification.id)}
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
    });
  };

  const renderDetailBody = () => {
    if (isListLoading && !selectedNotification) {
      return <p className="text-neutral-5">Memuat notifikasi...</p>;
    }

    if (
      !selectedNotification &&
      selectedId > 0 &&
      !skipMarkReadFetch &&
      detailFetching
    ) {
      return <p className="text-neutral-5">Memuat notifikasi...</p>;
    }

    if (
      !selectedNotification &&
      selectedId > 0 &&
      !skipMarkReadFetch &&
      detailError
    ) {
      return <p className="text-neutral-5">Notifikasi tidak ditemukan.</p>;
    }

    if (!selectedNotification) {
      return <p className="text-neutral-5">{listEmptyMessage}</p>;
    }

    return (
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
    );
  };

  const renderContent = () => (
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
              disabled={currentPage <= 1 || isListLoading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Sebelumnya
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              disabled={currentPage >= lastPage || isListLoading}
              onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
            >
              Berikutnya
            </Button>
          </div>
        </div>
        <div className="h-[calc(100vh-280px)] overflow-auto">
          {renderListBody()}
        </div>
      </div>

      <div className="hidden rounded-3xl bg-neutral-2/30 p-4 md:block">
        {renderDetailBody()}
      </div>
    </div>
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
      {renderContent()}
    </section>
  );
}
