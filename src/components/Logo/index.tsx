import BrandMark from "@/components/BrandMark";
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
      <BrandMark variant="putih" className="shrink-0" />
      <div
        className={cn(
          "text-2xl font-bold tracking-widest sm:text-[2rem]",
          "transition-all duration-300 group-data-[collapsible=icon]:hidden",
        )}
      >
        <span>P</span>astilolos
      </div>
    </div>
  );
}
