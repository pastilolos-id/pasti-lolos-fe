"use client";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components";
import { Button } from "@/components/ui";
import { useGetExamReviewByExamQuery } from "@/lib/redux/api/examsApi";
import type { ExamReviewQuestion } from "@/lib/redux/api/types/exams";
import { cn, delay } from "@/lib/utils";
import type { TryoutCategory } from "../../data";

const FALLBACK_LABELS = ["A", "B", "C", "D", "E", "F"];

function formatSubmittedAt(iso: string): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function deriveOutcome(q: ExamReviewQuestion): "correct" | "wrong" | "empty" {
  if (q.selectedAnswerId == null) {
    return "empty";
  }
  if (typeof q.isCorrect === "boolean") {
    return q.isCorrect ? "correct" : "wrong";
  }
  const selected = q.options.find((o) => o.id === q.selectedAnswerId);
  if (!selected) {
    return "empty";
  }
  return selected.isCorrect ? "correct" : "wrong";
}

function getCorrectOptionText(q: ExamReviewQuestion): string {
  const correct = q.options.find((o) => o.isCorrect);
  return correct?.text ?? "—";
}

function getReviewFetchErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "Gagal memuat ulasan.";
  }
  const data = (error as FetchBaseQueryError).data;
  if (data && typeof data === "object" && data !== null && "message" in data) {
    const message = (data as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) {
      return message.trim();
    }
  }
  return "Gagal memuat ulasan.";
}

interface ReviewSectionProps {
  category: TryoutCategory;
  id: string;
}

export default function ReviewSection({
  category: _category,
  id,
}: ReviewSectionProps) {
  const router = useRouter();
  const numericId = /^\d+$/.test(id) ? Number(id) : null;

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetExamReviewByExamQuery(numericId ?? skipToken, {
      refetchOnMountOrArgChange: true,
    });

  const sortedQuestions = useMemo(
    () => [...(data?.questions ?? [])].sort((a, b) => a.order - b.order),
    [data?.questions],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"review" | "answer">("answer");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const totalQuestions = sortedQuestions.length;

  useEffect(() => {
    setCurrentIndex((i) =>
      totalQuestions === 0 ? 0 : Math.min(i, totalQuestions - 1),
    );
  }, [totalQuestions]);

  const current = sortedQuestions[currentIndex];
  const currentOrder = current?.order ?? currentIndex + 1;

  const goNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex >= totalQuestions - 1;

  const handleSubmit = () => {
    setIsLoadingSubmit(true);
    delay(2).then(() => {
      router.push(`/activities`);
      setIsLoadingSubmit(false);
    });
  };

  const errorMessage = isError ? getReviewFetchErrorMessage(error) : "";

  if (numericId === null) {
    return (
      <section className="rounded-3xl border border-neutral-3 bg-neutral-1 p-6 text-b2 text-neutral-5">
        ID ujian tidak valid.
      </section>
    );
  }

  const showInitialLoader = isLoading || (isFetching && !data);

  if (showInitialLoader) {
    return (
      <section className="rounded-3xl border border-neutral-3 bg-neutral-1 p-6 text-b2 text-neutral-5">
        Memuat ulasan...
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="rounded-3xl border border-neutral-3 bg-neutral-1 p-6">
        <p className="text-b2 text-neutral-6">{errorMessage}</p>
        <Button
          type="button"
          variant="outline"
          size="default"
          className="mt-4 rounded-full border-primary-4/50 px-6 py-3 text-s1"
          onClick={() => void refetch()}
        >
          Coba Lagi
        </Button>
      </section>
    );
  }

  if (!current) {
    return (
      <section className="rounded-3xl border border-neutral-3 bg-neutral-1 p-6 text-b2 text-neutral-5">
        Belum ada soal untuk ditampilkan.
      </section>
    );
  }

  const outcome = deriveOutcome(current);
  const selectedId = current.selectedAnswerId;

  return (
    <section className="flex flex-col gap-6 xl:flex-row xl:items-start">
      <div className="flex min-h-[calc(100vh-75px)] min-w-0 flex-1 flex-col justify-between rounded-3xl border border-neutral-3 bg-neutral-1 p-4 sm:p-11">
        <div>
          <p className="text-c1 text-neutral-5">
            Nilai:{" "}
            <span className="font-semibold text-neutral-6">{data.score}</span>
            {" · "}
            Selesai:{" "}
            <span className="font-semibold text-neutral-6">
              {formatSubmittedAt(data.submittedAt)}
            </span>
          </p>

          <div className="mt-4 flex gap-2 rounded-full border border-neutral-3 p-1">
            <button
              type="button"
              onClick={() => setViewMode("answer")}
              className={cn(
                "flex-1 cursor-pointer rounded-full py-3 text-center text-s1 font-semibold",
                viewMode === "answer"
                  ? "bg-primary-4 text-neutral-1"
                  : "border border-primary-4 bg-neutral-1 text-primary-4",
              )}
            >
              Soal
            </button>
            <button
              type="button"
              onClick={() => setViewMode("review")}
              className={cn(
                "flex-1 cursor-pointer rounded-full py-3 text-center text-s1 font-semibold",
                viewMode === "review"
                  ? "bg-primary-4 text-neutral-1"
                  : "border border-primary-4 bg-neutral-1 text-primary-4",
              )}
            >
              Review
            </button>
          </div>

          <p className="mt-8 text-h4 font-semibold text-neutral-6">
            {viewMode === "answer" ? "Soal Ke-" : "Review Soal Ke-"}
            {currentOrder} dari {totalQuestions} soal
          </p>
          <p className="mt-6 text-b1 text-neutral-5">{current.questionText}</p>

          {viewMode === "answer" ? (
            <div className="mt-6 space-y-3">
              {current.options.map((option, idx) => {
                const label = FALLBACK_LABELS[idx] ?? String(idx + 1);
                const isUserChoice = selectedId === option.id;
                const isCorrectChoice = option.isCorrect;
                return (
                  <div
                    key={option.id}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-b2",
                      isCorrectChoice
                        ? "border-green bg-green/10 text-neutral-6"
                        : isUserChoice
                          ? "border-red bg-red/10 text-neutral-6"
                          : "border-neutral-3 bg-neutral-1 text-neutral-6",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full border text-c1",
                        isCorrectChoice
                          ? "border-green bg-green text-neutral-1"
                          : isUserChoice
                            ? "border-red bg-red text-neutral-1"
                            : "border-neutral-4 bg-neutral-1 text-neutral-5",
                      )}
                    >
                      {isCorrectChoice ? "✓" : isUserChoice ? "✕" : ""}
                    </span>
                    <span>
                      {label}. {option.text}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-neutral-3 bg-neutral-1 px-4 py-3 text-b2 text-neutral-6">
                <p className="text-c1 text-neutral-5">Jawaban Kamu</p>
                <p
                  className={cn(
                    "mt-1 font-semibold",
                    outcome === "empty"
                      ? "text-neutral-5"
                      : outcome === "correct"
                        ? "text-green"
                        : "text-red",
                  )}
                >
                  {current.userAnswerText?.trim() ||
                    (selectedId == null
                      ? "Tidak dijawab"
                      : (current.options.find((o) => o.id === selectedId)
                          ?.text ?? "—"))}
                </p>
              </div>
              <div className="rounded-2xl border border-green bg-green/10 px-4 py-3 text-b2 text-neutral-6">
                <p className="text-c1 text-neutral-5">Jawaban Benar</p>
                <p className="mt-1 font-semibold text-green">
                  {getCorrectOptionText(current)}
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-3 bg-neutral-1 px-4 py-3 text-b2 text-neutral-6">
                <p className="text-c1 text-neutral-5">Pembahasan</p>
                <p className="mt-1 text-neutral-6">
                  {current.explanation?.trim() || "Pembahasan belum tersedia."}
                </p>
              </div>
            </div>
          )}
        </div>

        <div
          className={cn(
            "mt-10 flex flex-col gap-3 sm:flex-row sm:items-center",
            isFirst ? "sm:justify-end" : "sm:justify-between",
          )}
        >
          {!isFirst ? (
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              className="w-full rounded-full border-primary-4/50 px-6 py-3 text-s1 sm:w-auto sm:min-w-41"
            >
              <Icon
                name="arrow-left-circle-bg-blue"
                size={24}
                fill="#80B0FF"
                stroke="#80B0FF"
              />
              Sebelumnya
            </Button>
          ) : null}

          {!isLast ? (
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={goNext}
              className={cn(
                "w-full rounded-full border-primary-4/50 px-6 py-3 text-s1 sm:w-auto sm:min-w-41",
                !isFirst && "sm:ml-auto",
                isFirst && "sm:ml-0",
              )}
            >
              Selanjutnya
              <Icon
                name="arrow-left-circle-bg-blue"
                size={24}
                className="rotate-180"
              />
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={handleSubmit}
              className="w-full rounded-full border-primary-4/50 px-6 py-3 text-s1 sm:w-auto sm:min-w-41"
            >
              Submit
              <Icon
                name="spinner"
                className={cn(isLoadingSubmit ? "animate-spin" : "hidden")}
                viewBox="0 0 26 26"
                pathClassName="fill-primary-5"
              />
              <Icon
                name="arrow-left-circle-bg-blue"
                size={24}
                className={cn("rotate-180", isLoadingSubmit && "hidden")}
              />
            </Button>
          )}
        </div>
      </div>

      <aside className="w-full max-h-[calc(100vh-75px)] shrink-0 overflow-auto xl:w-80">
        <div className="rounded-3xl border border-neutral-3 bg-white p-5 shadow-sm">
          <h2 className="text-b1 font-semibold text-neutral-6">
            {data.examName}
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {sortedQuestions.map((q, idx) => {
              const o = deriveOutcome(q);
              const isActive = idx === currentIndex;
              return (
                <button
                  key={q.questionId}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-full border text-c1 font-semibold transition-all cursor-pointer sm:size-12",
                    isActive &&
                      "border-primary-4 bg-primary-5 text-neutral-1 ring-2 ring-primary-4/40 ring-offset-2 ring-offset-white",
                    !isActive &&
                      o === "empty" &&
                      "border-neutral-3 bg-neutral-2 text-neutral-6 hover:bg-neutral-3/80",
                    !isActive &&
                      o === "correct" &&
                      "border-green bg-green text-neutral-1 hover:opacity-90",
                    !isActive &&
                      o === "wrong" &&
                      "border-red bg-red text-neutral-1 hover:opacity-90",
                  )}
                >
                  {q.order}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-neutral-3 bg-neutral-1 p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-4 text-c1 text-neutral-6">
            <span className="inline-flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-green text-neutral-1">
                B
              </span>
              Benar
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-red text-neutral-1">
                S
              </span>
              Salah
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full border border-neutral-3 bg-neutral-2 text-neutral-6">
                —
              </span>
              Kosong
            </span>
          </div>
        </div>
      </aside>
    </section>
  );
}
