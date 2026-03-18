import { cn } from "@/lib/utils";

export default function Logo(props: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "text-2xl sm:text-[2rem] font-bold -tracking-widest",
        props.className,
      )}
    >
      <span>p</span>
      <span className="transition-all duration-300 group-data-[collapsible=icon]:hidden">
        astilolos
      </span>
    </div>
  );
}
