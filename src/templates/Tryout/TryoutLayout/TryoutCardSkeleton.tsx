import { Skeleton } from "@/components/ui/skeleton";

export default function TryoutCardSkeleton() {
  return (
    <div className="flex min-h-64.25 flex-col gap-3 rounded-3xl border border-card-border-2 p-4 shadow-none">
      <div className="flex justify-between gap-3 border-b border-neutral-3 pb-3">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-full max-w-xs" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        <Skeleton className="size-12 shrink-0 rounded-xl" />
      </div>
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="mt-auto h-11 w-full rounded-full" />
    </div>
  );
}
