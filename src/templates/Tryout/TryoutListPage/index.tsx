"use client";

/**
 * Daftar tryout memuat data dari GET /exams. Kartu "Lihat Detail" mengarah ke
 * `/tryout/{category}/{id}/preview`. Halaman preview saat ini masih memakai mock
 * `getTryoutById` di `data.ts`, sehingga ID numerik dari API belum terdaftar di mock
 * dan dapat menghasilkan notFound(). Alur `getPurchaseIdFromTryout` juga masih
 * memetakan ID mock ke data pembelian statis.
 */

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
    <TryoutLayout
      category={category}
      bannerTitle={banners.bannerTitle}
      bannerSubtitle={banners.bannerSubtitle}
      cards={cards}
      gridStatus={gridStatus}
      onRetryLoadCards={isError ? () => void refetch() : undefined}
    />
  );
}
