"use client";

/**
 * Daftar tryout memuat data dari GET /exams. Kartu "Lihat Detail" mengarah ke
 * `/tryout/{category}/{id}/preview`. Halaman preview memuat detail dari
 * GET `/exams/package-detail/:id` agar konsisten dengan ID numerik dari list API.
 */

import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGetExamsQuery } from "@/lib/redux/api/examsApi";
import { getTryoutListBanners, type TryoutCategory } from "../data";
import {
  mapExamToTryoutCard,
  toExamCategoryParam,
} from "../mapExamToTryoutCard";
import TryoutLayout from "../TryoutLayout";
import type { TryoutListGridStatus } from "../TryoutLayout/types";

export interface TryoutListPageProps {
  category: TryoutCategory;
}

export default function TryoutListPage({ category }: TryoutListPageProps) {
  const searchParams = useSearchParams();
  const startError = searchParams.get("error");
  const banners = getTryoutListBanners(category);
  const apiCategory = toExamCategoryParam(category);

  const { data, isLoading, isError, refetch } = useGetExamsQuery(
    {
      category: apiCategory,
    },
    {
      // Selalu ambil data terbaru saat komponen mount/arg berubah,
      // serta saat tab kembali fokus/online (tanpa polling berkala).
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  const tryoutRows = (data?.data ?? []).filter(
    (row) => row.examType === "tryout",
  );
  const cards = tryoutRows.map((exam) => mapExamToTryoutCard(exam, category));

  let gridStatus: TryoutListGridStatus;
  if (isLoading) {
    gridStatus = "loading";
  } else if (isError) {
    gridStatus = "error";
  } else if (cards.length === 0) {
    gridStatus = "empty";
  } else {
    gridStatus = "success";
  }

  return (
    <div className="space-y-4">
      {startError ? (
        <Alert variant="destructive">
          <AlertDescription>{startError}</AlertDescription>
        </Alert>
      ) : null}
      <TryoutLayout
        category={category}
        bannerTitle={banners.bannerTitle}
        bannerSubtitle={banners.bannerSubtitle}
        cards={cards}
        gridStatus={gridStatus}
        onRetryLoadCards={isError ? () => void refetch() : undefined}
      />
    </div>
  );
}
