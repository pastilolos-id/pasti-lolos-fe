"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Icon } from "@/components";
import { Button } from "@/components/ui";
import type { ExamAnswerOption } from "@/lib/redux/api/types/exams";
import type { RootState } from "@/lib/redux/store";
import { cn, useCountdown } from "@/lib/utils";

const FALLBACK_LABELS = ["A", "B", "C", "D", "E", "F"];

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function getDeadlineMs(storageKey: string): number | null {
  if (typeof window === "undefined") {
    return null;
  }
  const raw = window.localStorage.getItem(storageKey);
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  if (Number.isFinite(parsed) && parsed > Date.now()) {
    return parsed;
  }
  if (raw) {
    window.localStorage.removeItem(storageKey);
  }
  return null;
}

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

export type ExamAnswers = Record<number, number | null>;

type CompleteReason = "manual" | "timer" | "submit_error";

interface SubmitAnswerOptions {
  throwOnError?: boolean;
  triggerFinishOnError?: boolean;
}

interface ExamSectionProps {
  storageKey: string;
  userExamId: number | null;
  totalQuestions: number;
  initialAnswers?: ExamAnswers;
  onAnswersChange?: (answers: ExamAnswers) => void;
  onSubmitAnswer: (payload: {
    userExamId: number;
    questionId: number;
    answerId: number;
  }) => Promise<void>;
  onFinishExam: (params: {
    answers: ExamAnswers;
    lastQuestionIndex: number;
  }) => Promise<void>;
}

export default function ExamSection({
  storageKey,
  userExamId,
  totalQuestions,
  initialAnswers,
  onAnswersChange,
  onSubmitAnswer,
  onFinishExam,
}: ExamSectionProps) {
  const examQuestions = useSelector(
    (state: RootState) => state.examSession.examQuestions,
  );
  const examName = useSelector(
    (state: RootState) => state.examSession.examName,
  );

  const effectiveTotal = useMemo(
    () => Math.max(totalQuestions, examQuestions.length),
    [totalQuestions, examQuestions.length],
  );

  const [deadlineMs, setDeadlineMs] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [answers, setAnswers] = useState<ExamAnswers>(
    () => initialAnswers ?? {},
  );
  const [isFinishing, setIsFinishing] = useState(false);
  const [showCompletionOverlay, setShowCompletionOverlay] = useState(false);
  const [finishErrorMessage, setFinishErrorMessage] = useState<string | null>(
    null,
  );

  const answersRef = useRef<ExamAnswers>(initialAnswers ?? {});
  const submittedRef = useRef<Record<number, number>>({});
  const pendingSubmitsRef = useRef<Promise<unknown>[]>([]);
  const examEndedRef = useRef(false);
  const completionInFlightRef = useRef(false);
  const timerFiredRef = useRef(false);
  const runCompleteExamFlowRef = useRef<
    (reason: CompleteReason) => Promise<void>
  >(async () => {});

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

  const currentEntry = examQuestions[currentIndex - 1];
  const currentQuestion = currentEntry?.question;
  const orderedAnswers = useMemo(
    () => (currentQuestion ? sortAnswersByLabel(currentQuestion.answers) : []),
    [currentQuestion],
  );

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    onAnswersChange?.(answers);
  }, [answers, onAnswersChange]);

  const selectedAnswerId = answers[currentIndex] ?? null;

  const setAnswer = (answerId: number) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: answerId }));
  };

  const isAnswered = (n: number) => answers[n] != null;

  const trackSubmit = useCallback((operation: () => Promise<void>) => {
    const p = operation();
    pendingSubmitsRef.current.push(p);
    return p.finally(() => {
      pendingSubmitsRef.current = pendingSubmitsRef.current.filter(
        (x) => x !== p,
      );
    });
  }, []);

  const waitForPendingSubmits = useCallback(async () => {
    const snapshot = [...pendingSubmitsRef.current];
    await Promise.allSettled(snapshot);
  }, []);

  const submitAnswerForIndex = useCallback(
    async (
      questionIndex: number,
      options: SubmitAnswerOptions = {},
    ): Promise<void> => {
      const throwOnError = options.throwOnError ?? false;
      const triggerFinishOnError = options.triggerFinishOnError ?? true;

      if (userExamId === null) {
        return;
      }
      const entry = examQuestions[questionIndex - 1];
      const questionId = entry?.question?.id;
      const answerId = answersRef.current[questionIndex];
      if (!questionId || !answerId) {
        return;
      }
      if (submittedRef.current[questionId] === answerId) {
        return;
      }

      try {
        await trackSubmit(async () => {
          await onSubmitAnswer({ userExamId, questionId, answerId });
          submittedRef.current[questionId] = answerId;
        });
      } catch (err) {
        if (triggerFinishOnError) {
          await runCompleteExamFlowRef.current("submit_error");
        }
        if (throwOnError) {
          throw err instanceof Error ? err : new Error(String(err));
        }
      }
    },
    [examQuestions, onSubmitAnswer, trackSubmit, userExamId],
  );

  const runCompleteExamFlow = useCallback(
    async (reason: CompleteReason) => {
      if (examEndedRef.current || completionInFlightRef.current) {
        return;
      }
      completionInFlightRef.current = true;
      setShowCompletionOverlay(true);
      setFinishErrorMessage(null);
      try {
        await waitForPendingSubmits();
        if (reason !== "submit_error") {
          await submitAnswerForIndex(currentIndex, {
            throwOnError: false,
            triggerFinishOnError: false,
          });
          await waitForPendingSubmits();
        }
        if (examEndedRef.current) {
          return;
        }
        await onFinishExam({
          answers: answersRef.current,
          lastQuestionIndex: currentIndex,
        });
        examEndedRef.current = true;
      } catch (err) {
        const message =
          err instanceof Error && err.message.trim()
            ? err.message
            : "Gagal menyelesaikan ujian. Silakan coba lagi.";
        setFinishErrorMessage(message);
      } finally {
        completionInFlightRef.current = false;
        setShowCompletionOverlay(false);
      }
    },
    [currentIndex, onFinishExam, submitAnswerForIndex, waitForPendingSubmits],
  );

  useEffect(() => {
    runCompleteExamFlowRef.current = runCompleteExamFlow;
  }, [runCompleteExamFlow]);

  const navigateTo = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 1 || targetIndex > effectiveTotal) {
        return;
      }
      if (targetIndex === currentIndex) {
        return;
      }
      const fromIndex = currentIndex;
      setCurrentIndex(targetIndex);
      void submitAnswerForIndex(fromIndex);
    },
    [currentIndex, submitAnswerForIndex, effectiveTotal],
  );

  const goNext = () => navigateTo(currentIndex + 1);

  const goPrev = () => navigateTo(currentIndex - 1);

  const isFirst = currentIndex === 1;
  const isLast = currentIndex === effectiveTotal;

  const handleFinish = async () => {
    if (isFinishing || examEndedRef.current) {
      return;
    }
    setIsFinishing(true);
    try {
      await runCompleteExamFlow("manual");
    } finally {
      setIsFinishing(false);
    }
  };

  const handleRetryFinish = async () => {
    if (examEndedRef.current || completionInFlightRef.current) {
      return;
    }
    completionInFlightRef.current = true;
    setShowCompletionOverlay(true);
    setFinishErrorMessage(null);
    try {
      await onFinishExam({
        answers: answersRef.current,
        lastQuestionIndex: currentIndex,
      });
      examEndedRef.current = true;
    } catch (err) {
      const message =
        err instanceof Error && err.message.trim()
          ? err.message
          : "Gagal menyelesaikan ujian. Silakan coba lagi.";
      setFinishErrorMessage(message);
    } finally {
      completionInFlightRef.current = false;
      setShowCompletionOverlay(false);
    }
  };

  useEffect(() => {
    if (deadlineMs === null || examEndedRef.current) {
      return;
    }
    const tick = () => {
      if (
        Date.now() >= deadlineMs &&
        !timerFiredRef.current &&
        !examEndedRef.current
      ) {
        timerFiredRef.current = true;
        void runCompleteExamFlow("timer");
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [deadlineMs, runCompleteExamFlow]);

  if (deadlineMs === null || !currentQuestion) {
    return (
      <div className="mt-8 text-b2 text-neutral-5" aria-live="polite">
        Memuat…
      </div>
    );
  }

  return (
    <section className="relative flex flex-col gap-6 xl:flex-row xl:items-start">
      {(showCompletionOverlay || isFinishing) && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-neutral-6/40 p-6 backdrop-blur-sm"
          role="alertdialog"
          aria-modal="true"
          aria-busy="true"
          aria-labelledby="exam-completion-status"
        >
          <Icon
            name="spinner"
            size={40}
            className="animate-spin text-primary-4"
            aria-hidden
          />
          <p
            id="exam-completion-status"
            className="max-w-md text-center text-b2 text-neutral-1"
          >
            Menyimpan jawaban yang masih diproses dan menyelesaikan ujian… Mohon
            tunggu sebentar.
          </p>
        </div>
      )}

      {finishErrorMessage ? (
        <div className="fixed bottom-6 left-1/2 z-[60] flex max-w-lg -translate-x-1/2 flex-col gap-3 rounded-2xl border border-red/30 bg-neutral-1 p-4 shadow-lg sm:flex-row sm:items-center">
          <p className="text-b2 text-neutral-6">{finishErrorMessage}</p>
          <Button
            type="button"
            variant="primary"
            size="default"
            className="shrink-0 rounded-full px-6 py-3 text-s1"
            onClick={() => void handleRetryFinish()}
          >
            Coba lagi
          </Button>
        </div>
      ) : null}

      <div className="min-w-0 min-h-[calc(100vh-75px)] flex-1 flex flex-col justify-between rounded-3xl border border-neutral-3 bg-neutral-1 p-4 sm:p-11">
        <div>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-h4 font-semibold text-neutral-6">
              Soal Ke-{currentIndex} dari {effectiveTotal} soal
            </p>
            <div className="inline-flex w-fit rounded-full bg-red/10 px-4 py-2">
              <span className="text-s1 font-semibold text-red">
                Berakhir Dalam {timerLabel}
              </span>
            </div>
          </div>

          <p className="mb-6 text-b1 text-neutral-5">
            {currentQuestion.questionText}
          </p>

          {currentQuestion.imageUrl ? (
            // biome-ignore lint/performance/noImgElement: question images come from arbitrary backend URLs
            <img
              src={currentQuestion.imageUrl}
              alt={`Ilustrasi soal nomor ${currentIndex}`}
              className="mb-8 max-h-80 w-auto rounded-2xl border border-neutral-3 object-contain"
            />
          ) : null}

          <div className="space-y-3">
            {orderedAnswers.map((answer, idx) => {
              const label = getAnswerLabel(answer, idx);
              const isSelected = selectedAnswerId === answer.id;
              return (
                <button
                  key={answer.id}
                  type="button"
                  onClick={() => setAnswer(answer.id)}
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
                  <span>
                    {label}. {answer.answerText}
                  </span>
                </button>
              );
            })}
          </div>
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
              onClick={goPrev}
              disabled={showCompletionOverlay || isFinishing}
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
              disabled={showCompletionOverlay || isFinishing}
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
              onClick={() => void handleFinish()}
              disabled={isFinishing || showCompletionOverlay}
              className={cn(
                "w-full rounded-full px-6 py-3 text-s1 text-neutral-1 sm:w-auto sm:min-w-41",
                !isFirst && "sm:ml-auto",
              )}
            >
              {isFinishing || showCompletionOverlay
                ? "Menyimpan..."
                : "Selesai"}
            </Button>
          )}
        </div>
      </div>

      <aside className="w-full max-h-[calc(100vh-75px)] overflow-auto shrink-0 rounded-3xl border border-neutral-3 bg-neutral-1 p-4 sm:p-6 xl:w-80">
        <h2 className="mb-4 text-h4 font-semibold text-neutral-6">
          {examName || "Daftar Soal"}
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: effectiveTotal }, (_, i) => i + 1).map((n) => {
            const isCurrent = n === currentIndex;
            const done = isAnswered(n) && !isCurrent;
            return (
              <button
                key={n}
                type="button"
                onClick={() => navigateTo(n)}
                aria-current={isCurrent ? "true" : undefined}
                disabled={showCompletionOverlay || isFinishing}
                className={cn(
                  "max-w-14 flex aspect-square items-center justify-center rounded-full border text-c1 font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
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
