"use client";

import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BrandWordmark, Icon, Notifications } from "@/components";
import NotificationIconBadge from "@/components/Notifications/NotificationIconBadge";
import { Card, CardContent } from "@/components/ui";
import { useGetNotificationsUnreadCountQuery } from "@/lib/redux/api/notificationsApi";
import type { RootState } from "@/lib/redux/store";

export default function TopBar({ ...props }: React.ComponentProps<"div">) {
  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState<boolean>(false);
  const isAuthenticated = useSelector((s: RootState) => s.user.isAuthenticated);
  const { data: unreadData } = useGetNotificationsUnreadCountQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const unreadCount = unreadData?.count ?? 0;

  return (
    <div
      className="fixed z-50 mx-auto lg:hidden w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)]"
      {...props}
    >
      <Card
        data-state={isNotificationsOpen ? "open" : "closed"}
        className="
          rounded-full
          p-2
          bg-white/15
          border border-white/25 backdrop-blur-2xl shadow-[0_4px_34.1px_0_rgba(0,0,0,0.15)]
        "
      >
        <CardContent
          data-state={isNotificationsOpen ? "open" : "closed"}
          className="p-3 rounded-full bg-white"
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex shrink-0 items-center">
              <BrandWordmark
                variant="biru"
                textClassName="text-[2rem] font-bold leading-none text-primary-4 -tracking-widest"
              />
            </Link>

            <button
              type="button"
              onClick={() => setIsNotificationsOpen((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsNotificationsOpen((prev) => !prev);
                }
              }}
              className="relative p-3 border border-primary-4/50 rounded-full cursor-pointer"
            >
              <Icon
                viewBox="0 0 24 24"
                name="notification"
                pathClassName="fill-primary-5"
                size={20}
              />
              <NotificationIconBadge count={unreadCount} />
            </button>
          </div>
        </CardContent>
      </Card>

      {isNotificationsOpen ? (
        <Notifications
          className="mt-3 w-full"
          onItemClick={() => setIsNotificationsOpen(false)}
          onSeeAllClick={() => setIsNotificationsOpen(false)}
        />
      ) : null}
    </div>
  );
}
