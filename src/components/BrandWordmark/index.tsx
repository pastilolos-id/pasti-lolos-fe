import BrandMark from "@/components/BrandMark";
import { cn } from "@/lib/utils";

type BrandWordmarkProps = {
  variant: "biru" | "putih";
  className?: string;
  textClassName?: string;
  size?: number;
};

export default function BrandWordmark({
  variant,
  className,
  textClassName,
  size = 40,
}: BrandWordmarkProps) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-2", className)}>
      <BrandMark variant={variant} size={size} className="size-10 shrink-0" />
      <span className={cn("shrink-0 leading-none", textClassName)}>Pastilolos</span>
    </span>
  );
}
