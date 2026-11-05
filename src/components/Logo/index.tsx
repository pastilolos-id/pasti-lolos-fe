import { cn } from "@/lib/utils";

export default function Logo(props: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "flex items-center justify-center gap-2 text-white",
        props.className,
      )}
    >
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg font-bold leading-none text-white"
        aria-hidden
      >
        P
      </span>
      <div
        className={cn(
          "text-2xl font-bold -tracking-widest sm:text-[2rem]",
          "transition-all duration-300 group-data-[collapsible=icon]:hidden",
        )}
      >
        astilolos
      </div>
    </div>
  );
}
