"use client";

import { useState } from "react";
import { Icon } from "@/components";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TryoutPackageActivity, TryoutPackageChildRow } from "../types";

interface TryoutPackageCardProps {
  activity: TryoutPackageActivity;
}

function statusBadgeClasses(status: TryoutPackageChildRow["status"]): string {
  if (status === "selesai") return "bg-green text-white";
  if (status === "sebagian_selesai") return "bg-yellow text-neutral-6";
  if (status === "kadaluarsa") return "bg-neutral-3 text-neutral-6";
  return "bg-neutral-3 text-neutral-6";
}

function statusLabel(status: TryoutPackageChildRow["status"]): string | undefined {
  if (status === "selesai") return "Selesai";
  if (status === "sebagian_selesai") return "Sebagian selesai";
  if (status === "kadaluarsa") return "Kadaluarsa";
  if (status === "belum_dimulai") return "Belum dimulai";
  return undefined;
}

function ScorePill({
  score,
  color,
}: {
  score: number | string | undefined;
  color: TryoutPackageActivity["color"];
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-full px-4 py-3",
        "sm:h-27 sm:flex-col sm:justify-center sm:px-0 sm:py-0",
        "text-white",
        "shadow-[inset_-11px_-6px_12.6px_0px_rgba(255,255,255,0.18)]",
        color === "green"
          ? "bg-green"
          : color === "red"
            ? "bg-red"
            : color === "yellow"
              ? "bg-yellow"
              : "bg-neutral-2 text-neutral-6",
      )}
    >
      <p className="text-s1 font-semibold order-2 sm:order-1">{score ?? "-"}</p>
      <p className="text-c1 order-1 sm:order-2">Nilai</p>
    </div>
  );
}

export default function TryoutPackageCard({ activity }: TryoutPackageCardProps) {
  const [open, setOpen] = useState(false);

  const isCompleted = activity.status === "selesai";
  const isExpired = activity.status === "kadaluarsa";
  const isPendingStart = activity.status === "belum_dimulai";
  const isPartial = activity.status === "sebagian_selesai";

  const headerStatusLabel = isCompleted
    ? "Selesai"
    : isExpired
      ? "Kadaluarsa"
      : isPartial
        ? "Sebagian selesai"
        : isPendingStart
          ? "Belum dimulai"
          : undefined;

  const showParentDateAsCompleted = isCompleted || isPartial;
  const hasSubExams = activity.children.length > 0;

  const headerInner = (
    <div className="flex w-full flex-row flex-wrap sm:flex-nowrap gap-6 sm:items-center">
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
        <p className="text-c1 font-semibold text-neutral-6">Paket Tryout</p>
        <div className="mt-1 flex items-start gap-2">
          <h3 className="text-h4 font-semibold text-neutral-6 flex-1 min-w-0">
            {activity.title}
          </h3>
          {hasSubExams ? (
            <Icon
              name="chevron-down-fill"
              size={20}
              viewBox="0 0 16 16"
              className={cn(
                "shrink-0 mt-1 text-neutral-6 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          ) : null}
        </div>

        <div className="w-22 mt-4 flex flex-wrap items-center gap-2">
          {headerStatusLabel ? (
            <p
              className={cn(
                "w-full text-center rounded-full px-3 py-1 text-c1 font-semibold",
                isCompleted
                  ? "bg-green text-white"
                  : isPartial
                    ? "bg-yellow text-neutral-6"
                    : "bg-neutral-3 text-neutral-6",
              )}
            >
              {headerStatusLabel}
            </p>
          ) : null}
        </div>

        <div className="space-y-1 mt-1">
          {showParentDateAsCompleted ? (
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
        <ScorePill
          score={activity.summaryScore ?? "-"}
          color={activity.color}
        />
      </div>
    </div>
  );

  const subExamList = (
    <div className="flex flex-col gap-3">
      {activity.children.map((child) => {
        const label = statusLabel(child.status);
        const isChildCompleted = child.status === "selesai";
        const isChildPending = child.status === "belum_dimulai";

        return (
          <div
            key={child.id}
            className="flex flex-row flex-wrap sm:flex-nowrap gap-4 rounded-2xl border border-neutral-3 bg-[#F6F6F6] p-4 sm:items-center"
          >
            <div className="sm:flex-1 min-w-0">
              <h4 className="text-h4 font-semibold text-neutral-6">
                {child.examName}
              </h4>
              <div className="w-22 mt-3 flex flex-wrap items-center gap-2">
                {label ? (
                  <p
                    className={cn(
                      "w-full text-center rounded-full px-3 py-1 text-c1 font-semibold",
                      statusBadgeClasses(child.status),
                    )}
                  >
                    {label}
                  </p>
                ) : null}
              </div>
              <div className="space-y-1 mt-1">
                {isChildCompleted ? (
                  <p className="text-s1 text-neutral-6">{child.date}</p>
                ) : (
                  <>
                    <p className="text-c1 text-neutral-5">
                      {isChildPending ? "Tanggal" : "Tanggal Kadaluarsa"}
                    </p>
                    <p className="text-s1 text-neutral-6">{child.date}</p>
                  </>
                )}
              </div>
            </div>
            <div className="w-full sm:w-27">
              <ScorePill score={child.score} color={child.color} />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Card className="rounded-3xl border border-neutral-3 bg-white p-0 shadow-none overflow-hidden">
      {hasSubExams ? (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger
            type="button"
            className="w-full p-6 text-left rounded-3xl outline-none transition-colors hover:bg-neutral-2/40 focus-visible:ring-2 focus-visible:ring-primary-5 focus-visible:ring-offset-2"
          >
            {headerInner}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="border-t border-neutral-3 px-6 pb-6 pt-2">
              <p className="text-c1 font-semibold text-neutral-5 mb-3">
                Sub-ujian
              </p>
              {subExamList}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <div className="p-6">{headerInner}</div>
      )}
    </Card>
  );
}
