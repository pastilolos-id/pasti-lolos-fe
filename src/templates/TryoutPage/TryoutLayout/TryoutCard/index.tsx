"use client";

import Link from "next/link";

import { Icon } from "@/components";
import { buttonVariants, Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import formatToCurrency from "@/lib/utils/formatToCurrency";
import type { TryoutCardProps } from "./types";

export default function TryoutCard({ data }: TryoutCardProps) {
  const hasSpecialPrice =
    typeof data.specialPrice === "number" &&
    typeof data.originalPrice === "number";

  return (
    <Card className="min-h-64.25 rounded-3xl border-card-border-2 p-4 gap-3 shadow-none">
      <div className="flex items-start justify-between gap-3 border-b border-neutral-3">
        <div>
          <h3 className="text-h4 text-neutral-6 mb-2">{data.title}</h3>
          <div className="mb-3 flex items-center gap-4 text-b3 text-neutral-5">
            <div className="flex items-center gap-1">
              <Icon name="exam-multiple-choice-outline" size={20} />
              <span>{data.totalQuestions} Soal</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="time-outlined" size={20} />
              <span>{data.durationMinutes} Menit</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-neutral-1 p-1 border border-neutral-3">
          <Icon name="text-box-edit-blue" size={40} />
        </div>
      </div>

      <div>
        <p className="text-b2 text-neutral-6">
          {hasSpecialPrice ? "Harga Spesial" : "Harga"}
        </p>
        <p
          className={
            hasSpecialPrice ? "text-h4 text-red" : "text-h4 text-neutral-6"
          }
        >
          {formatToCurrency(
            hasSpecialPrice ? (data.specialPrice ?? 0) : data.price,
          )}
        </p>
        {hasSpecialPrice && (
          <p className="text-b2 text-neutral-6 line-through">
            {formatToCurrency(data.originalPrice ?? 0)}
          </p>
        )}
      </div>

      <Link
        href={data.detailHref}
        className={cn(
          buttonVariants({ size: "default" }),
          "w-full text-s1 mt-auto text-white",
        )}
      >
        Lihat Detail
      </Link>
    </Card>
  );
}
