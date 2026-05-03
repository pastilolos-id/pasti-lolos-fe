"use client";

import { useEffect, useMemo, useState } from "react";

import { Icon } from "@/components";
import { Button } from "@/components/ui";
import { cn, useCountdown } from "@/lib/utils";

const DUMMY_QUESTION =
  "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.”";

const OPTIONS = ["A", "B", "C", "D"] as const;

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function getDeadlineMs(storageKey: string): number {
  if (typeof window === "undefined") {
    return Date.now() + 3 * 60 * 60 * 1000;
  }
  const raw = window.localStorage.getItem(storageKey);
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  if (Number.isFinite(parsed) && parsed > Date.now()) {
    return parsed;
  }
  const fallback = Date.now() + 3 * 60 * 60 * 1000;
  window.localStorage.setItem(storageKey, String(fallback));
  return fallback;
}

export type ExamAnswers = Record<number, "A" | "B" | "C" | "D" | null>;

interface ExamSectionProps {
  storageKey: string;
  totalQuestions: number;
  initialAnswers?: ExamAnswers;
  onAnswersChange?: (answers: ExamAnswers) => void;
  onFinish: (answers: ExamAnswers, lastQuestionIndex: number) => void;
}

export default function ExamSection({
  storageKey,
  totalQuestions,
  initialAnswers,
  onAnswersChange,
  onFinish,
}: ExamSectionProps) {
  const [deadlineMs, setDeadlineMs] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [answers, setAnswers] = useState<ExamAnswers>(
    () => initialAnswers ?? {},
  );

  useEffect(() => {
    setDeadlineMs(getDeadlineMs(storageKey));
  }, [storageKey]);

  const targetDate = useMemo(
    () => (deadlineMs !== null ? new Date(deadlineMs) : new Date(0)),
    [deadlineMs],
  );

  const { hours, minutes, seconds } = useCountdown(targetDate);
  const timerLabel =
    deadlineMs !== null
      ? `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`
      : "—";

  const selected = answers[currentIndex] ?? null;

  const setAnswer = (letter: (typeof OPTIONS)[number]) => {
    setAnswers((prev) => {
      const next = { ...prev, [currentIndex]: letter };
      onAnswersChange?.(next);
      return next;
    });
  };

  const isAnswered = (n: number) => answers[n] != null;

  const goNext = () => {
    if (currentIndex < totalQuestions) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 1) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const isFirst = currentIndex === 1;
  const isLast = currentIndex === totalQuestions;

  if (deadlineMs === null) {
    return (
      <div className="mt-8 text-b2 text-neutral-5" aria-live="polite">
        Memuat…
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-6 xl:flex-row xl:items-start">
      <div className="min-w-0 min-h-[calc(100vh-75px)] flex-1 flex flex-col justify-between rounded-3xl border border-neutral-3 bg-neutral-1 p-4 sm:p-11">
        <div>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-h4 font-semibold text-neutral-6">
              Soal Ke-{currentIndex} dari {totalQuestions} soal
            </p>
            <div className="inline-flex w-fit rounded-full bg-red/10 px-4 py-2">
              <span className="text-s1 font-semibold text-red">
                Berakhir Dalam {timerLabel}
              </span>
            </div>
          </div>

          {/* Question */}
          <p className="mb-8 text-b1 text-neutral-5">{DUMMY_QUESTION}</p>

          {/* ABCD Options */}
          <div className="space-y-3">
            {OPTIONS.map((letter) => {
              const isSelected = selected === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setAnswer(letter)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-b2 transition-all cursor-pointer",
                    isSelected
                      ? "border-primary-4 bg-primary-5 text-neutral-1"
                      : "border-neutral-3 bg-neutral-1 text-neutral-6 hover:border-primary-4/50",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border text-c1",
                      isSelected
                        ? "border-neutral-1 bg-neutral-1 text-primary-4"
                        : "border-neutral-4 bg-neutral-1 text-neutral-5",
                    )}
                  >
                    {isSelected ? "✓" : ""}
                  </span>
                  <span>{letter}. Lorem ipsum dolor sit amet</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Button Footer */}
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
              onClick={goPrev}
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
              variant="primary"
              size="default"
              onClick={() => onFinish(answers, currentIndex)}
              className={cn(
                "w-full rounded-full px-6 py-3 text-s1 text-neutral-1 sm:w-auto sm:min-w-41",
                !isFirst && "sm:ml-auto",
              )}
            >
              Selesai
            </Button>
          )}
        </div>
      </div>

      <aside className="w-full max-h-[calc(100vh-75px)] overflow-auto shrink-0 rounded-3xl border border-neutral-3 bg-neutral-1 p-4 sm:p-6 xl:w-80">
        <h2 className="mb-4 text-h4 font-semibold text-neutral-6">Soal TKD</h2>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((n) => {
            const isCurrent = n === currentIndex;
            const done = isAnswered(n) && !isCurrent;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setCurrentIndex(n)}
                aria-current={isCurrent ? "true" : undefined}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-full border text-c1 font-semibold transition-colors cursor-pointer",
                  isCurrent
                    ? "border-primary-4 bg-primary-5 text-neutral-1"
                    : done
                      ? "border-neutral-3 bg-neutral-4/50 text-neutral-6"
                      : "border-neutral-3 bg-neutral-1 text-neutral-6",
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
