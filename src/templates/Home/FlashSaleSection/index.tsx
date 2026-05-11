"use client";

import { useMemo } from "react";
import { cn, useCountdown } from "@/lib/utils";
import type { HomeFlashSaleViewModel } from "../mapHomeFromApi";
import ItemCard from "./ItemCard";

interface FlashSaleSectionProps {
  flashSale: HomeFlashSaleViewModel | null;
}

export default function FlashSaleSection({ flashSale }: FlashSaleSectionProps) {
  const targetDate = useMemo(
    () => new Date(flashSale?.endsAtMs ?? Date.now()),
    [flashSale?.endsAtMs],
  );
  const { hours, minutes, seconds } = useCountdown(targetDate);

  const formatTime = (num: number) => num.toString().padStart(2, "0");
  const isExpired = (flashSale?.endsAtMs ?? 0) <= Date.now();
  const items = flashSale?.items ?? [];

  return (
    <section
      className={cn(
        "flex flex-col md:flex-wrap",
        "py-6 px-3 rounded-3xl",
        "bg-[linear-gradient(97.16deg,#448AFF_-9.6%,#A070A5_15.59%,#FF5649_41.49%,#A37572_65.69%,#25A0AB_98.83%)]",
      )}
    >
      <div className="flex flex-wrap gap-6 justify-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-white text-center">
          ⚡⚡⚡ {flashSale?.title ?? "Flash Sale"}
        </h2>
        <p className="w-full lg:w-fit py-2 px-4 rounded-full text-center text-sm font-bold text-red bg-white">
          {isExpired
            ? "Promo berakhir"
            : `Berakhir Dalam ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 p-2 text-neutral-6 bg-neutral-2 rounded-3xl">
        {items.length > 0 ? (
          items.map((item) => <ItemCard key={item.id} {...item} />)
        ) : (
          <p className="w-full rounded-2xl bg-white p-4 text-center text-b2 text-neutral-5">
            Belum ada penawaran flash sale saat ini.
          </p>
        )}
      </div>
    </section>
  );
}
