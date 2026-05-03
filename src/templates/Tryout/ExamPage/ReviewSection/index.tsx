"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components";
import { Button } from "@/components/ui";
import { cn, delay } from "@/lib/utils";
import type { TryoutCategory } from "../../data";
import type { ExamAnswers } from "../ExamSection";

const REVIEW_QUESTION =
  '"Kami percaya kelulusan bukan hasil kebetulan. Dengan latihan yang terarah, evaluasi yang tepat, dan konsistensi, peluangmu untuk lolos jadi lebih besar."';

const LETTERS = ["A", "B", "C", "D"] as const;

function correctAnswerForQuestion(n: number): (typeof LETTERS)[number] {
  return LETTERS[(n - 1) % 4];
}

function buildAnswersPayload(totalQuestions: number, answers: ExamAnswers) {
  return Object.fromEntries(
    Array.from({ length: totalQuestions }, (_, i) => {
      const num = i + 1;
      const raw = answers[num];
      return [String(num), raw ?? ""];
    }),
  );
}

interface ReviewSectionProps {
  category: TryoutCategory;
  id: string;
  totalQuestions: number;
  answers: ExamAnswers;
}

export default function ReviewSection({
  category: _category,
  id: _id,
  totalQuestions,
  answers,
}: ReviewSectionProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [viewMode, setViewMode] = useState<"review" | "answer">("review");

  const goNext = () => {
    if (currentIndex < totalQuestions) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const isFirst = currentIndex === 1;
  const isLast = currentIndex === totalQuestions;

  const handleSubmit = () => {
    console.log(buildAnswersPayload(totalQuestions, answers));

    setIsLoading(true);
    delay(2).then(() => {
      router.push(`/activities`);
      setIsLoading(false);
    });
  };

  return (
    <section className="flex flex-col gap-6 xl:flex-row xl:items-start">
      <div className="flex min-h-[calc(100vh-75px)] min-w-0 flex-1 flex-col justify-between rounded-3xl border border-neutral-3 bg-neutral-1 p-4 sm:p-11">
        <div>
          <div className="flex gap-2 rounded-full border border-neutral-3 p-1">
            <button
              type="button"
              onClick={() => setViewMode("answer")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setViewMode("answer");
                }
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setViewMode("answer");
                }
              }}
              className={cn(
                "flex-1 rounded-full py-3 text-center text-s1 font-semibold text-primary-4 cursor-pointer",
                viewMode === "answer"
                  ? "bg-primary-4 text-neutral-1"
                  : "bg-neutral-1 text-primary-4 border border-primary-4",
              )}
            >
              Soal
            </button>
            <button
              type="button"
              onClick={() => setViewMode("review")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setViewMode("review");
                }
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setViewMode("review");
                }
              }}
              className={cn(
                "flex-1 rounded-full bg-primary-4 py-3 text-center text-s1 font-semibold text-neutral-1 cursor-pointer",
                viewMode === "review"
                  ? "bg-primary-4 text-neutral-1"
                  : "bg-neutral-1 text-primary-4 border border-primary-4",
              )}
            >
              Review
            </button>
          </div>

          <p className="mt-8 text-h4 font-semibold text-neutral-6">
            {viewMode === "answer" ? "Soal Ke-" : "Review Soal Ke-"}
            {currentIndex} dari {totalQuestions} soal
          </p>
          <p className="mt-6 text-b1 text-neutral-5">{REVIEW_QUESTION}</p>
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
              onClick={() => setCurrentIndex((i) => Math.max(1, i - 1))}
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
                className={cn(isLoading ? "animate-spin" : "hidden")}
                viewBox="0 0 26 26"
                pathClassName="fill-primary-5"
              />
              <Icon
                name="arrow-left-circle-bg-blue"
                size={24}
                className={cn("rotate-180", isLoading && "hidden")}
              />
            </Button>
          )}
        </div>
      </div>

      <aside className="w-full max-h-[calc(100vh-75px)] shrink-0 overflow-auto rounded-3xl border border-neutral-3 bg-neutral-1 p-4 sm:p-6 xl:w-80">
        <h2 className="mb-4 text-h4 font-semibold text-neutral-6">Soal TKD</h2>
        <div className="mb-4 flex flex-wrap items-center gap-4 text-c1 text-neutral-6">
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
        </div>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((n) => {
            const user = answers[n];
            const correct = correctAnswerForQuestion(n);
            const isCurrent = n === currentIndex;
            const hasAnswer = user != null;

            const isCorrect = hasAnswer && user === correct;

            return (
              <button
                key={n}
                type="button"
                onClick={() => setCurrentIndex(n)}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-full border text-c1 font-semibold transition-colors cursor-pointer",
                  isCurrent
                    ? "border-primary-4 bg-primary-5 text-neutral-1"
                    : !hasAnswer
                      ? "border-neutral-3 bg-neutral-1 text-neutral-6"
                      : isCorrect
                        ? "border-green bg-green text-neutral-1"
                        : "border-red bg-red text-neutral-1",
                )}
              >
                {n}
              </button>
            );
          })}
        </div>
      </aside>
    </section>
  );
}
