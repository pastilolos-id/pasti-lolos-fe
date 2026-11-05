import Image from "next/image";

import logoBiru from "@/assets/images/brand/logo-biru.png";
import logoPutih from "@/assets/images/brand/logo-putih.png";
import { cn } from "@/lib/utils";

const logos = {
  biru: logoBiru,
  putih: logoPutih,
} as const;

type BrandMarkProps = {
  variant: keyof typeof logos;
  size?: number;
  className?: string;
};

export default function BrandMark({
  variant,
  size = 40,
  className,
}: BrandMarkProps) {
  return (
    <Image
      src={logos[variant]}
      alt="Pasti Lolos"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
    />
  );
}
