import { cn } from "@/lib/utils";

export default function NotificationIconBadge({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  if (count <= 0) {
    return null;
  }
  const label = count > 99 ? "99+" : String(count);
  return (
    <span
      className={cn(
        "pointer-events-none absolute -right-0.5 -top-0.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red px-1 text-[10px] font-bold leading-none text-white",
        className,
      )}
      title={`${count} belum dibaca`}
    >
      {label}
    </span>
  );
}
