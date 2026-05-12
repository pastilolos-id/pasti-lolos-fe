"use client";

import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Icon } from "@/components";
import { Button, buttonVariants } from "@/components/ui";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGetExamPackageDetailQuery } from "@/lib/redux/api/examsApi";
import type { ExamPackageDetailSuccessResponse } from "@/lib/redux/api/types/exams";
import { cn, formatToCurrency } from "@/lib/utils";
import type { TryoutCategory, TryoutSubExam } from "../data";

interface TryoutDetailPageProps {
  category: TryoutCategory;
  tryoutId: string;
}

type PreviewSubExam = TryoutSubExam & {
  status: "submitted" | "not_started" | "in_progress";
  score?: number; // Tambahkan score per sub-exam
};

function mapSubExams(
  payload: ExamPackageDetailSuccessResponse,
): PreviewSubExam[] {
  return payload.subExams.map((subExam) => ({
    id: String(subExam.id),
    title: subExam.name,
    totalQuestions: subExam.totalSoal,
    passingGrade: subExam.passingGrade,
    status: subExam.status as any,
    score: subExam.score, // Ambil score per satuan sub-ujian
  }));
}

export default function TryoutPreviewPage({
  category,
  tryoutId,
}: TryoutDetailPageProps) {
  const searchParams = useSearchParams();
  const startError = searchParams.get("error");
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

  // ... (Keep loading and error states the same)

  if (!numericId) return null; // Logic returning section handled above
  if (isLoading) return null; // Logic returning section handled above
  if (isError || !tryout) return null; // Logic returning section handled above

  const subExams = mapSubExams(tryout);
  const totalPackagePoints =
    tryout.totalPassingScore ??
    subExams.reduce((sum, s) => sum + (s.score ?? 0), 0);
  const purchaseStatus =
    tryout.purchaseStatus ?? (tryout.isPurchased ? "completed" : "available");
  const showBuyButton = purchaseStatus === "available";
  const showPendingInfo = purchaseStatus === "pending";
  const showSubExamAction = purchaseStatus === "completed";

  return (
    <section className="space-y-4">
      {startError ? (
        <Alert variant="destructive">
          <AlertDescription>{startError}</AlertDescription>
        </Alert>
      ) : null}

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
        <div className="mb-4 flex flex-col sm:flex-row gap-6 sm:items-start">
          <div className="flex justify-center sm:block">
            <Icon name="text-box-edit-blue" size={150} />
          </div>

          <div className="flex-1">
            <h1 className="text-h4 text-neutral-6 mb-2">{tryout.examName}</h1>
            {tryout.description ? (
              <p className="mb-3 text-b2 text-neutral-5">
                {tryout.description}
              </p>
            ) : null}

            <div className="mb-5 flex items-center gap-4 text-c1 text-neutral-5">
              <div className="flex items-center gap-1">
                <Icon name="exam-multiple-choice-outline" size={20} />
                <span>{tryout.totalQuestions} Soal</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="time-outlined" size={20} />
                <span>{tryout.totalDuration} Menit</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-8">
              {/* Info Harga */}
              <div className="space-y-1">
                <p className="text-b2 text-neutral-6">Harga</p>
                <p className="text-h4 text-neutral-6">
                  {formatToCurrency(tryout.price)}
                </p>
              </div>

              {/* Info Skor Keseluruhan - Tampil hanya jika sudah lunas */}
              {showSubExamAction && (
                <div className="space-y-1 border-l pl-8 border-neutral-3">
                  <p className="text-b2 text-neutral-5">Total_Skor Paket</p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-h3 text-primary-500 font-bold">
                      {totalPackagePoints}
                    </p>
                    <span className="text-c1 text-neutral-5">Poin</span>
                  </div>
                </div>
              )}
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h2 className="text-h4">{section.title}</h2>
              {section.status === "submitted" && (
                <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-c1 border border-green-200">
                  Skor:{" "}
                  <span className="font-bold text-s1">{section.score}</span>
                </div>
              )}
            </div>

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
                  <Link
                    href={
                      section.status === "submitted"
                        ? `/tryout/${category}/${section.id}/exam?review=1`
                        : section.status === "in_progress"
                          ? `/tryout/${category}/${section.id}/exam?resume=1`
                          : `/tryout/${category}/${section.id}/exam`
                    }
                  >
                    {section.status === "submitted" ? "Review" : "Kerjakan"}
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
