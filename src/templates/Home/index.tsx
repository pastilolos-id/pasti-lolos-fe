"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { useGetHomeDashboardQuery } from "@/lib/redux/api/homeApi";
import CarouselSection from "./CarouselSection";
import FlashSaleSection from "./FlashSaleSection";
import { mapHomeDashboardToViewModel } from "./mapHomeFromApi";
import RankingSection from "./RankingSection";

export default function HomePage() {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetHomeDashboardQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  const home = mapHomeDashboardToViewModel(data);
  const isInitialLoading = isLoading || (isFetching && !data);

  if (isInitialLoading) {
    return (
      <main className="flex flex-col md:flex-row gap-4">
        <div className="order-1 md:order-2 rounded-3xl bg-neutral-2 h-120 w-full md:max-w-[360px] animate-pulse" />
        <div className="order-2 md:order-1 flex flex-col gap-6 w-full">
          <div className="rounded-[38px] bg-neutral-2 h-91 sm:h-101 animate-pulse" />
          <div className="rounded-3xl bg-neutral-2 h-80 animate-pulse" />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="rounded-3xl border border-red/30 bg-white p-6 text-center">
        <AlertCircle className="mx-auto mb-3 text-red" />
        <p className="text-b2 text-neutral-6">
          Gagal memuat data Home. Silakan coba lagi.
        </p>
        <Button
          onClick={() => void refetch()}
          className="mt-4 bg-red hover:bg-red/80"
        >
          Coba Lagi
        </Button>
      </main>
    );
  }

  return (
    <main className="flex flex-col md:flex-row gap-4">
      <RankingSection ranking={home.rankingTryout} />
      <div className="flex flex-col gap-6 order-2 md:order-1 w-full">
        <CarouselSection heroBanner={home.heroBanner} banners={home.banners} />
        <FlashSaleSection flashSale={home.flashSale} />
      </div>
    </main>
  );
}
