"use client";

import { useEffect, useState } from "react";
import { cn, useCountdown } from "@/lib/utils";
import { flashSaleItems } from "./data";
import ItemCard from "./ItemCard";

export default function FlashSaleSection() {
  const [targetDate, setTargetDate] = useState<Date>(new Date());

  useEffect(() => {
    const storageKey = "flashSaleEndTime";
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const endTime = parseInt(stored, 10);
      if (endTime > Date.now()) {
        setTargetDate(new Date(endTime));
        return;
      }
    }
    // If not set or expired, set new 24h from now
    const newEndTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(storageKey, newEndTime.toString());
    setTargetDate(new Date(newEndTime));
  }, []);

  const { hours, minutes, seconds } = useCountdown(targetDate);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

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
          ⚡⚡⚡ Flash Sale
        </h2>
        <p className="w-full lg:w-fit py-2 px-4 rounded-full text-center text-sm font-bold text-red bg-white">
          Berakhir Dalam {formatTime(hours)}:{formatTime(minutes)}:
          {formatTime(seconds)}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 p-2 text-neutral-6 bg-neutral-2 rounded-3xl">
        {flashSaleItems.map((item) => (
          <ItemCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
