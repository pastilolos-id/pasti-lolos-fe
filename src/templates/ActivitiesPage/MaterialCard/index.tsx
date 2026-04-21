"use client";

import { Icon } from "@/components";
import { Card } from "@/components/ui/card";
import type { MaterialActivity } from "../types";
import ProgressIndicator from "./ProgressIndicator";

interface MaterialCardProps {
  activity: MaterialActivity;
}

export default function MaterialCard({ activity }: MaterialCardProps) {
  const isCompleted = activity.status === "selesai";
  const isExpired = activity.status === "kadaluarsa";
  const statusLabel = isCompleted
    ? "Selesai"
    : isExpired
      ? "Kadaluarsa"
      : undefined;

  return (
    <Card className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-6 rounded-3xl border border-neutral-3 bg-white p-6 shadow-none sm:items-center">
      <div className="shrink-0 h-27 w-27 rounded-3xl bg-neutral-2 flex items-center justify-center">
        {isExpired ? (
          <Icon
            name="fluent-textbox"
            size={108}
            viewBox="0 0 108 108"
            fill="#BEBEBE"
          />
        ) : (
          <Icon size={108} name="fluent-textbox-blue" />
        )}
      </div>

      <div className="sm:flex-1 min-w-0">
        <p className="text-c1 font-semibold text-neutral-6">Materi</p>
        <h3 className="text-h4 font-semibold text-neutral-6">
          {activity.title}
        </h3>

        <div className="w-22 mt-4 flex flex-wrap items-center gap-2">
          {statusLabel ? (
            <span
              className={`w-full text-center rounded-full px-3 py-1 text-c1 font-semibold ${
                isCompleted
                  ? "bg-green text-white"
                  : "bg-neutral-3 text-neutral-6"
              }`}
            >
              {statusLabel}
            </span>
          ) : null}
        </div>

        <div className="space-y-1">
          {isCompleted ? (
            <p className="text-s1 text-neutral-6">{activity.date}</p>
          ) : isExpired ? null : (
            <>
              <p className="text-c1 text-neutral-5">Tanggal Kadaluarsa</p>
              <p className="text-s1 text-neutral-6">{activity.date}</p>
            </>
          )}
        </div>
      </div>

      <div className="w-full sm:w-auto">
        <ProgressIndicator progress={activity.progress} isExpired={isExpired} />
      </div>
    </Card>
  );
}
