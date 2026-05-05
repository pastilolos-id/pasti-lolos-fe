import Link from "next/link";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import TryoutCard from "./TryoutCard";
import TryoutCardSkeleton from "./TryoutCardSkeleton";
import type { TryoutLayoutProps } from "./types";

const tabs = [
  { key: "bumn", label: "BUMN", href: "/tryout/bumn" },
  { key: "cpns", label: "CPNS", href: "/tryout/cpns" },
] as const;

const cardSkeletonPlaceholders = ["s1", "s2", "s3", "s4", "s5", "s6"] as const;

export default function TryoutLayout({
  category,
  bannerTitle,
  bannerSubtitle,
  cards,
  gridStatus,
  onRetryLoadCards,
}: TryoutLayoutProps) {
  return (
    <section className="space-y-4">
      <article
        className={cn(
          "relative overflow-hidden rounded-card-medium p-4 sm:p-6",
          category === "cpns"
            ? "bg-gradient-root-layout"
            : "bg-gradient-problem-solution-card",
        )}
      >
        <div className="max-w-2xl">
          <p className="mb-2 text-s1 text-neutral-1/90">{bannerSubtitle}</p>
          <h1 className="text-h3 text-neutral-1 sm:text-h2">{bannerTitle}</h1>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-1 px-3 py-1">
            <span className="size-3 rounded-full bg-primary-4" />
            <span className="size-3 rounded-full bg-neutral-3" />
            <span className="size-3 rounded-full bg-neutral-3" />
            <span className="size-3 rounded-full bg-neutral-3" />
            <span className="size-3 rounded-full bg-neutral-3" />
          </div>
        </div>
      </article>

      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1 lg:hidden">
        {tabs.map((tab) => {
          const isActive = tab.key === category;

          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={cn(
                "rounded-full border px-6 py-2 text-s1 whitespace-nowrap transition-all",
                isActive
                  ? "border-primary-4 bg-primary-4 text-neutral-1"
                  : "border-primary-4/30 bg-neutral-1 text-primary-4",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-3xl border border-neutral-3 bg-neutral-2 p-4 md:grid-cols-2 xl:grid-cols-3">
        {gridStatus === "loading"
          ? cardSkeletonPlaceholders.map((placeholderKey) => (
              <TryoutCardSkeleton key={placeholderKey} />
            ))
          : null}
        {gridStatus === "error" ? (
          <div className="col-span-full flex flex-col items-center justify-center gap-4 py-12 text-center">
            <p className="text-b2 text-neutral-6">
              Gagal memuat daftar tryout. Silakan coba lagi.
            </p>
            {onRetryLoadCards ? (
              <Button
                type="button"
                variant="primary"
                text="Coba lagi"
                onClick={onRetryLoadCards}
              />
            ) : null}
          </div>
        ) : null}
        {gridStatus === "empty" ? (
          <div className="col-span-full py-12 text-center text-b2 text-neutral-6">
            Belum ada tryout.
          </div>
        ) : null}
        {gridStatus === "success"
          ? cards.map((card) => <TryoutCard key={card.id} data={card} />)
          : null}
      </div>
    </section>
  );
}
