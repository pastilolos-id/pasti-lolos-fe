"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Icon } from "@/components";
import { Button } from "@/components/ui";
import type {
  ExamAnswerOption,
  ExamQuestionEntry,
} from "@/lib/redux/api/types/exams";
import type { RootState } from "@/lib/redux/store";
import { cn, delay } from "@/lib/utils";
import type { TryoutCategory } from "../../data";
import type { ExamAnswers } from "../ExamSection";

const FALLBACK_LABELS = ["A", "B", "C", "D", "E", "F"];

function getAnswerLabel(answer: ExamAnswerOption, fallbackIndex: number) {
  const label = answer.metadataJson?.label;
  if (typeof label === "string" && label.trim()) {
    return label.trim();
  }
  return FALLBACK_LABELS[fallbackIndex] ?? String(fallbackIndex + 1);
}

function sortAnswersByLabel(answers: ExamAnswerOption[]): ExamAnswerOption[] {
  return [...answers].sort((a, b) => {
    const labelA = a.metadataJson?.label ?? "";
    const labelB = b.metadataJson?.label ?? "";
    return labelA.localeCompare(labelB);
  });
}

function getCorrectAnswer(entry: ExamQuestionEntry | undefined) {
  if (!entry) return null;
  const ordered = sortAnswersByLabel(entry.question.answers);
  const idx = ordered.findIndex((a) => a.isCorrect);
  if (idx === -1) return null;
  return { id: ordered[idx].id, label: getAnswerLabel(ordered[idx], idx) };
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

  const examQuestions = useSelector(
    (state: RootState) => state.examSession.examQuestions,
  );
  const examName = useSelector(
    (state: RootState) => state.examSession.examName,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [viewMode, setViewMode] = useState<"review" | "answer">("answer");

  const goNext = () => {
    if (currentIndex < totalQuestions) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const isFirst = currentIndex === 1;
  const isLast = currentIndex === totalQuestions;

  const currentEntry = examQuestions[currentIndex - 1];
  const currentQuestion = currentEntry?.question;
  const orderedAnswers = useMemo(
    () => (currentQuestion ? sortAnswersByLabel(currentQuestion.answers) : []),
    [currentQuestion],
  );
  const userAnswerId = answers[currentIndex] ?? null;
  const correctAnswer = getCorrectAnswer(currentEntry);
  const userAnswer = orderedAnswers.find(
    (answer) => answer.id === userAnswerId,
  );
  const userLabel = userAnswer
    ? getAnswerLabel(userAnswer, orderedAnswers.indexOf(userAnswer))
    : null;

  const handleSubmit = () => {
    console.log(buildAnswersPayload(totalQuestions, answers));

    setIsLoading(true);
    delay(2).then(() => {
      router.push(`/activities`);
      setIsLoading(false);
    });
  };

  if (!currentQuestion) {
    return (
      <section className="rounded-3xl border border-neutral-3 bg-neutral-1 p-6 text-b2 text-neutral-5">
        Memuat ulasan...
      </section>
    );
  }

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
                "flex-1 rounded-full py-3 text-center text-s1 font-semibold cursor-pointer",
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
                "flex-1 rounded-full py-3 text-center text-s1 font-semibold cursor-pointer",
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
          <p className="mt-6 text-b1 text-neutral-5">
            {currentQuestion.questionText}
          </p>

          {currentQuestion.imageUrl ? (
            // biome-ignore lint/performance/noImgElement: question images come from arbitrary backend URLs
            <img
              src={currentQuestion.imageUrl}
              alt={`Ilustrasi soal nomor ${currentIndex}`}
              className="mt-6 max-h-80 w-auto rounded-2xl border border-neutral-3 object-contain"
            />
          ) : null}

          {viewMode === "answer" ? (
            <div className="mt-6 space-y-3">
              {orderedAnswers.map((answer, idx) => {
                const label = getAnswerLabel(answer, idx);
                const isUserChoice = userAnswerId === answer.id;
                const isCorrectChoice = answer.isCorrect;
                return (
                  <div
                    key={answer.id}
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
                      {label}. {answer.answerText}
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
                    userLabel == null
                      ? "text-neutral-5"
                      : userAnswerId === correctAnswer?.id
                        ? "text-green"
                        : "text-red",
                  )}
                >
                  {userLabel ?? "Tidak dijawab"}
                </p>
              </div>
              <div className="rounded-2xl border border-green bg-green/10 px-4 py-3 text-b2 text-neutral-6">
                <p className="text-c1 text-neutral-5">Jawaban Benar</p>
                <p className="mt-1 font-semibold text-green">
                  {correctAnswer?.label ?? "—"}
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-3 bg-neutral-1 px-4 py-3 text-b2 text-neutral-6">
                <p className="text-c1 text-neutral-5">Pembahasan</p>
                <p className="mt-1 text-neutral-6">
                  {currentQuestion.explanationText ??
                    "Pembahasan belum tersedia."}
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
        <h2 className="mb-4 text-h4 font-semibold text-neutral-6">
          {examName || "Daftar Soal"}
        </h2>
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
            const entry = examQuestions[n - 1];
            const user = answers[n];
            const correct = getCorrectAnswer(entry);
            const isCurrent = n === currentIndex;
            const hasAnswer = user != null;
            const isCorrect =
              hasAnswer && correct != null && user === correct.id;

            return (
              <button
                key={n}
                type="button"
                onClick={() => setCurrentIndex(n)}
                className={cn(
                  "max-w-14 flex aspect-square items-center justify-center rounded-full border text-c1 font-semibold transition-colors cursor-pointer",
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
