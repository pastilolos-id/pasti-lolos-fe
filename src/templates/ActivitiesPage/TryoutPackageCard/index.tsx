"use client";

import Link from "next/link";
import { useState } from "react";

import { Icon } from "@/components";
import { Button } from "@/components/ui";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

import type { TryoutPackageActivity, TryoutPackageChildRow } from "../types";
import { useSubExamRouteExamId } from "../useSubExamRouteExamId";

interface TryoutPackageCardProps {
  activity: TryoutPackageActivity;
}

function statusBadgeClasses(status: TryoutPackageChildRow["status"]): string {
  if (status === "selesai") return "bg-green text-white";
  if (status === "sebagian_selesai") return "bg-yellow text-neutral-6";
  if (status === "kadaluarsa") return "bg-neutral-3 text-neutral-6";
  return "bg-neutral-3 text-neutral-6";
}

function statusLabel(
  status: TryoutPackageChildRow["status"],
): string | undefined {
  if (status === "selesai") return "Selesai";
  if (status === "sebagian_selesai") return "Sebagian selesai";
  if (status === "kadaluarsa") return "Kadaluarsa";
  if (status === "belum_dimulai") return "Belum dimulai";
  return undefined;
}

function subRowStatusBadgeClasses(child: TryoutPackageChildRow): string {
  const raw = child.rawStatus.trim().toLowerCase();
  if (raw === "in_progress" || raw === "in progress") {
    return "bg-yellow text-neutral-6";
  }
  return statusBadgeClasses(child.status);
}

function subRowStatusLabel(child: TryoutPackageChildRow): string | undefined {
  const raw = child.rawStatus.trim().toLowerCase();
  if (raw === "in_progress" || raw === "in progress") return "Berlangsung";
  return statusLabel(child.status);
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

function TryoutPackageSubExamRow({
  activity,
  child,
}: {
  activity: TryoutPackageActivity;
  child: TryoutPackageChildRow;
}) {
  const { examId, isResolving, resolveFailed, isError } = useSubExamRouteExamId(
    activity.packageId,
    child,
  );

  const raw = child.rawStatus.trim().toLowerCase();
  const inProgress = raw === "in_progress" || raw === "in progress";
  const isChildCompleted = child.status === "selesai";
  const isChildExpired = child.status === "kadaluarsa";
  const parentExpired = activity.status === "kadaluarsa";

  const label = subRowStatusLabel(child);
  const isChildPending = child.status === "belum_dimulai" && !inProgress;

  const base = `/tryout/${activity.tryoutCategory}`;

  const canShowAttempt =
    !isChildCompleted && !isChildExpired && !parentExpired && examId != null;

  const examHref =
    examId != null
      ? inProgress
        ? `${base}/${examId}/exam?resume=1`
        : `${base}/${examId}/exam`
      : null;

  const reviewHref = examId != null ? `${base}/${examId}/exam?review=1` : null;

  const rightColumn = (() => {
    if (isChildCompleted) {
      return (
        <div className="flex w-full flex-col gap-2 sm:w-27">
          <ScorePill score={child.score} color={child.color} />
          {reviewHref ? (
            <Button className="rounded-full px-6" asChild>
              <Link href={reviewHref}>Review</Link>
            </Button>
          ) : isResolving ? (
            <p className="text-center text-c1 text-neutral-5">Memuat…</p>
          ) : null}
        </div>
      );
    }

    if (isChildExpired || parentExpired) {
      return (
        <div className="flex w-full flex-col gap-2 sm:w-27">
          <ScorePill score="-" color="gray" />
        </div>
      );
    }

    if (isResolving) {
      return (
        <div className="flex w-full items-center justify-center sm:w-27 sm:min-h-27">
          <p className="text-c1 text-neutral-5">Memuat…</p>
        </div>
      );
    }

    if (canShowAttempt && examHref) {
      return (
        <div className="flex w-full flex-col gap-2 sm:w-27">
          <Button className="rounded-full px-6" asChild>
            <Link href={examHref}>Kerjakan</Link>
          </Button>
        </div>
      );
    }

    if (resolveFailed || isError) {
      return (
        <div className="flex w-full items-center justify-center sm:w-27 sm:min-h-27">
          <p className="text-center text-c1 text-neutral-5">—</p>
        </div>
      );
    }

    return (
      <div className="flex w-full flex-col gap-2 sm:w-27">
        <ScorePill score="-" color="gray" />
      </div>
    );
  })();

  return (
    <div className="flex flex-row flex-wrap sm:flex-nowrap gap-4 rounded-2xl border border-neutral-3 bg-[#F6F6F6] p-4 sm:items-center">
      <div className="min-w-0 sm:flex-1">
        <h4 className="text-h4 font-semibold text-neutral-6">
          {child.examName}
        </h4>
        <div className="mt-3 flex w-22 flex-wrap items-center gap-2">
          {label ? (
            <p
              className={cn(
                "w-full rounded-full px-3 py-1 text-center text-c1 font-semibold",
                subRowStatusBadgeClasses(child),
              )}
            >
              {label}
            </p>
          ) : null}
        </div>
        <div className="mt-1 space-y-1">
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
      {rightColumn}
    </div>
  );
}

export default function TryoutPackageCard({
  activity,
}: TryoutPackageCardProps) {
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
    <div className="flex w-full flex-row flex-wrap gap-6 sm:flex-nowrap sm:items-center">
      <div className="flex h-27 w-27 shrink-0 items-center justify-center rounded-3xl border border-neutral-3">
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

      <div className="min-w-0 sm:flex-1">
        <p className="text-c1 font-semibold text-neutral-6">Paket Tryout</p>
        <div className="mt-1 flex items-start gap-2">
          <h3 className="min-w-0 flex-1 text-h4 font-semibold text-neutral-6">
            {activity.title}
          </h3>
          {hasSubExams ? (
            <Icon
              name="chevron-down-fill"
              size={20}
              viewBox="0 0 16 16"
              className={cn(
                "mt-1 shrink-0 text-neutral-6 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          ) : null}
        </div>

        <div className="mt-4 flex w-22 flex-wrap items-center gap-2">
          {headerStatusLabel ? (
            <p
              className={cn(
                "w-full rounded-full px-3 py-1 text-center text-c1 font-semibold",
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

        <div className="mt-1 space-y-1">
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
      {activity.children.map((child) => (
        <TryoutPackageSubExamRow
          key={child.id}
          activity={activity}
          child={child}
        />
      ))}
    </div>
  );

  return (
    <Card className="overflow-hidden rounded-3xl border border-neutral-3 bg-white p-0 shadow-none">
      {hasSubExams ? (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger
            type="button"
            className="w-full rounded-3xl p-6 text-left outline-none transition-colors hover:bg-neutral-2/40 focus-visible:ring-2 focus-visible:ring-primary-5 focus-visible:ring-offset-2"
          >
            {headerInner}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="border-t border-neutral-3 px-6 pb-6 pt-2">
              <p className="mb-3 text-c1 font-semibold text-neutral-5">
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
