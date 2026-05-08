"use client";

import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";

import { Icon } from "@/components";
import { Button, buttonVariants } from "@/components/ui";
import { useGetExamPackageDetailQuery } from "@/lib/redux/api/examsApi";
import type { ExamPackageDetailSuccessResponse } from "@/lib/redux/api/types/exams";
import { cn, formatToCurrency } from "@/lib/utils";
import type { TryoutCategory, TryoutSubExam } from "../data";

interface TryoutDetailPageProps {
  category: TryoutCategory;
  tryoutId: string;
}

function mapSubExams(
  payload: ExamPackageDetailSuccessResponse,
): TryoutSubExam[] {
  return payload.subExams.map((subExam) => ({
    id: String(subExam.id),
    title: subExam.name,
    totalQuestions: subExam.totalSoal,
    passingGrade: subExam.passingGrade,
  }));
}

export default function TryoutPreviewPage({
  category,
  tryoutId,
}: TryoutDetailPageProps) {
  const numericId = /^\d+$/.test(tryoutId) ? Number(tryoutId) : null;
  const {
    data: tryout,
    isLoading,
    isError,
    refetch,
  } = useGetExamPackageDetailQuery(numericId ?? skipToken, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (!numericId) {
    return (
      <section className="space-y-4">
        <Link
          href={`/tryout/${category}`}
          className="group inline-flex items-center gap-2 mt-3 ml-3 text-s1 text-neutral-6"
        >
          <div className="bg-primary-4 group-hover:bg-primary-5 rounded-full p-2.25 transition-colors">
            <Icon name="arrow-left-circle" size={15} />
          </div>
          <span>Kembali</span>
        </Link>
        <div className="rounded-3xl border border-neutral-3 p-6">
          <p className="text-b2 text-neutral-6">ID tryout tidak valid.</p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="space-y-4">
        <Link
          href={`/tryout/${category}`}
          className="group inline-flex items-center gap-2 mt-3 ml-3 text-s1 text-neutral-6"
        >
          <div className="bg-primary-4 group-hover:bg-primary-5 rounded-full p-2.25 transition-colors">
            <Icon name="arrow-left-circle" size={15} />
          </div>
          <span>Kembali</span>
        </Link>
        <div className="rounded-3xl border border-neutral-3 p-6 text-b2 text-neutral-6">
          Memuat detail tryout...
        </div>
      </section>
    );
  }

  if (isError || !tryout) {
    return (
      <section className="space-y-4">
        <Link
          href={`/tryout/${category}`}
          className="group inline-flex items-center gap-2 mt-3 ml-3 text-s1 text-neutral-6"
        >
          <div className="bg-primary-4 group-hover:bg-primary-5 rounded-full p-2.25 transition-colors">
            <Icon name="arrow-left-circle" size={15} />
          </div>
          <span>Kembali</span>
        </Link>
        <div className="rounded-3xl border border-neutral-3 p-6">
          <p className="text-b2 text-neutral-6">
            Gagal memuat detail tryout. Silakan coba lagi.
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            className={cn(
              buttonVariants({ size: "default" }),
              "mt-4 rounded-full text-s1 text-white bg-red hover:bg-red/75",
            )}
          >
            Coba Lagi
          </button>
        </div>
      </section>
    );
  }

  const subExams = mapSubExams(tryout);
  const purchaseStatus =
    tryout.purchaseStatus ?? (tryout.isPurchased ? "completed" : "available");
  const showBuyButton = purchaseStatus === "available";
  const showPendingInfo = purchaseStatus === "pending";
  const showSubExamAction = purchaseStatus === "completed";

  return (
    <section className="space-y-4">
      <Link
        href={`/tryout/${category}`}
        className="group inline-flex items-center gap-2 mt-3 ml-3 text-s1 text-neutral-6"
      >
        <div className="bg-primary-4 group-hover:bg-primary-5 rounded-full p-2.25 transition-colors">
          <Icon name="arrow-left-circle" size={15} />
        </div>
        <span>Kembali</span>
      </Link>

      <div className="mb-6 rounded-3xl border border-neutral-3 p-4">
        <div className="mb-4 flex gap-4 sm:items-center">
          <Icon name="text-box-edit-blue" size={150} />

          <div>
            <h1 className="text-h4 text-neutral-6 mb-2">{tryout.examName}</h1>
            {tryout.description ? (
              <p className="mb-3 text-b2 text-neutral-5">
                {tryout.description}
              </p>
            ) : null}
            <div className="mb-3 flex items-center gap-4 text-c1 text-neutral-5">
              <div className="flex items-center gap-1">
                <Icon name="exam-multiple-choice-outline" size={20} />
                <span>{tryout.totalQuestions} Soal</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="time-outlined" size={20} />
                <span>{tryout.totalDuration} Menit</span>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <p className="text-b2 text-neutral-6">Harga</p>
              <p className="text-h4 text-neutral-6">
                {formatToCurrency(tryout.price)}
              </p>
            </div>
          </div>
        </div>

        {showBuyButton ? (
          <Link
            href={`/checkout/${tryout.id}?productType=tryout`}
            className={cn(
              buttonVariants({ size: "default" }),
              "w-full rounded-full text-s1 text-white bg-red hover:bg-red/75",
            )}
          >
            Beli Sekarang
          </Link>
        ) : null}

        {showPendingInfo ? (
          <div
            className={cn(
              buttonVariants({ size: "default", variant: "secondary" }),
              "w-full rounded-full text-center cursor-default",
            )}
          >
            Menunggu konfirmasi admin
          </div>
        ) : null}
      </div>

      <div className="rounded-3xl border-6 border-primary-4 p-6 space-y-3">
        {subExams.map((section) => (
          <article
            key={section.id}
            className="rounded-3xl border border-neutral-3 p-6"
          >
            <h2 className="mb-4 text-h4">{section.title}</h2>
            <div className="flex flex-col gap-4 text-b2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Icon
                    name="exam-multiple-choice-outline"
                    size={32}
                    fill="white"
                  />
                  {section.totalQuestions} Soal
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-yellow text-3xl">★</span>
                  <span>Passing Grade {section.passingGrade}</span>
                </span>
              </div>

              {showSubExamAction ? (
                <Button className="rounded-full px-10" asChild>
                  <Link href={`/tryout/${category}/${section.id}/exam`}>
                    Kerjakan
                  </Link>
                </Button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
