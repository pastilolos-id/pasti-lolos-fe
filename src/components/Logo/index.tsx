import BrandMark from "@/components/BrandMark";
import { cn } from "@/lib/utils";

export default function Logo(props: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("flex w-full items-center justify-center", props.className)}
    >
      <div className="flex items-center gap-2 text-2xl font-bold -tracking-widest sm:text-[2rem] group-data-[collapsible=icon]:contents">
        <BrandMark variant="putih" className="shrink-0" />
        <span className="whitespace-nowrap transition-all duration-300 group-data-[collapsible=icon]:hidden">
          <span>P</span>astilolos
        </span>
      </div>
    </div>
  );
}
