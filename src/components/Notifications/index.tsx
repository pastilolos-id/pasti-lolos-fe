"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { notifications } from "@/mock-data/notifications";
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
        {notifications.slice(0, 3).map((item, index) => (
          <Link
            key={item.id}
            href={`/notifications?id=${item.id}`}
            onClick={onItemClick}
            className={cn(
              "block py-3",
              index < 2 && "border-b border-neutral-3",
              index === 0 && "rounded-2xl bg-neutral-1 px-2",
            )}
          >
            <p
              className={cn(
                "line-clamp-2 text-b1 text-neutral-6",
                index === 0 && "font-semibold",
              )}
            >
              {item.title}
            </p>
            <p className="mt-1 text-c1 text-neutral-4">{item.time}</p>
          </Link>
        ))}
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
