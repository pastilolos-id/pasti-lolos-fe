"use client";

import { Icon } from "@/components";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TryoutActivity } from "../types";

interface TryoutCardProps {
  activity: TryoutActivity;
}

export default function TryoutCard({ activity }: TryoutCardProps) {
  const isCompleted = activity.status === "selesai";
  const isExpired = activity.status === "kadaluarsa";
  const isPendingStart = activity.status === "belum_dimulai";
  const isPartial = activity.status === "sebagian_selesai";
  const statusLabel = isCompleted
    ? "Selesai"
    : isExpired
      ? "Kadaluarsa"
      : isPartial
        ? "Sebagian selesai"
        : isPendingStart
          ? "Belum dimulai"
          : undefined;

  const showDateAsCompletionLine = isCompleted || isPartial;

  return (
    <Card className="flex flex-row flex-wrap sm:flex-nowrap gap-6 rounded-3xl border border-neutral-3 bg-white p-6 shadow-none sm:items-center">
      <div className="shrink-0 h-27 w-27 rounded-3xl border border-neutral-3 flex items-center justify-center">
        {isExpired ? (
          <Icon
            name="text-box-edit"
            size={108}
            viewBox="0 0 108 108"
            fill="#BEBEBE"
          />
        ) : (
          <Icon size={108} name="text-box-edit-blue" />
        )}
      </div>

      <div className="sm:flex-1 min-w-0">
        <p className="text-c1 font-semibold text-neutral-6">Tryout</p>
        <h3 className="text-h4 font-semibold text-neutral-6">
          {activity.title}
        </h3>

        <div className="w-22 mt-4 flex flex-wrap items-center gap-2">
          {statusLabel ? (
            <p
              className={`w-full text-center rounded-full px-3 py-1 text-c1 font-semibold ${
                isCompleted
                  ? "bg-green text-white"
                  : isPartial
                    ? "bg-yellow text-neutral-6"
                    : "bg-neutral-3 text-neutral-6"
              }`}
            >
              {statusLabel}
            </p>
          ) : null}
        </div>

        <div className="space-y-1">
          {showDateAsCompletionLine ? (
            <p className="text-s1 text-neutral-6">{activity.date}</p>
          ) : isExpired ? null : (
            <>
              <p className="text-c1 text-neutral-5">
                {isPendingStart ? "Tanggal" : "Tanggal Kadaluarsa"}
              </p>
              <p className="text-s1 text-neutral-6">{activity.date}</p>
            </>
          )}
        </div>
      </div>

      <div className="w-full sm:w-27">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-4 py-3",
            "sm:h-27 sm:flex-col sm:justify-center sm:px-0 sm:py-0",
            "text-white",
            "shadow-[inset_-11px_-6px_12.6px_0px_rgba(255,255,255,0.18)]",
            activity.color === "green"
              ? "bg-green"
              : activity.color === "red"
                ? "bg-red"
                : activity.color === "yellow"
                  ? "bg-yellow"
                  : "bg-neutral-2 text-neutral-6",
          )}
        >
          <p className="text-s1 font-semibold order-2 sm:order-1">
            {activity.score ?? "-"}
          </p>
          <p className="text-c1 order-1 sm:order-2">Nilai</p>
        </div>
      </div>
    </Card>
  );
}
