"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { useGetExamPackageDetailQuery } from "@/lib/redux/api/examsApi";
import { formatToCurrency } from "@/lib/utils";
import type { HomeFlashSaleItemViewModel } from "../../mapHomeFromApi";

export default function ItemCard({
  id,
  checkoutHref,
  ctaText,
  title,
  originalPrice,
  salePrice,
}: HomeFlashSaleItemViewModel) {
  const { data: packageDetail } = useGetExamPackageDetailQuery(id);

  const purchased =
    packageDetail?.purchaseStatus === "completed" ||
    packageDetail?.purchaseStatus === "pending" ||
    packageDetail?.isPurchased === true;

  const category = (packageDetail?.subject ?? "cpns").toLowerCase();
  const href = purchased ? `/tryout/${category}/${id}/preview` : checkoutHref;
  const label = purchased ? "Lihat Paket" : ctaText;

  return (
    <div className="flex flex-col gap-6 flex-1 bg-white rounded-3xl p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{title}</h3>
        <p className="text-[40px]">⚡</p>
      </div>

      <div className="text-sm">
        <p>Harga Spesial</p>
        <p className="text-2xl font-bold text-red">
          {formatToCurrency(salePrice)}
        </p>
        <p className="line-through">{formatToCurrency(originalPrice)}</p>
      </div>

      <Button asChild className="bg-red hover:bg-red/80">
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
}
