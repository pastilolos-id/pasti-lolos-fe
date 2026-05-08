import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Button } from "@/components/ui";
import type {
  FinishExamResponseData,
  GetExamScoreResponseData,
} from "@/lib/redux/api/types/exams";
import { cn } from "@/lib/utils";
import type { TryoutCategory } from "../../data";
import type { ExamAnswers } from "../ExamSection";

interface ResultSectionProps {
  category: TryoutCategory;
  id: string;
  totalQuestions: number;
  answers: ExamAnswers;
  /** Nomor soal yang ditampilkan sebagai highlight (biru), sama konsep “current” di ExamSection */
  highlightQuestionNumber?: number;
  score?: number;
  feedbackText?: string;
  /** Hasil dari GET /exams/{id}/get-score bila tersedia */
  getScoreResult?: GetExamScoreResponseData | null;
  isLoadingScore?: boolean;
  scoreError?: FetchBaseQueryError | null;
  onRetryLoadScore?: () => void;
  /** Hasil dari POST /exams/finish bila tersedia */
  finishResult?: FinishExamResponseData | null;
  finishMessage?: string | null;
  onReviewSoal: () => void;
}

export default function ResultSection({
  category,
  id: _id,
  totalQuestions,
  answers,
  highlightQuestionNumber,
  score: scoreProp,
  feedbackText: feedbackProp,
  getScoreResult,
  isLoadingScore = false,
  scoreError,
  onRetryLoadScore,
  finishResult,
  finishMessage,
  onReviewSoal,
}: ResultSectionProps) {
  const answeredIdsFromLocal = Object.values(answers).filter((v) => v != null).length;
  const scoreData = getScoreResult ?? finishResult ?? null;

  const answeredIdsFromScoreData =
    getScoreResult?.details.filter((detail) => detail.selectedAnswerId != null)
      .length ?? null;
  const answeredIds = answeredIdsFromScoreData ?? answeredIdsFromLocal;

  const totalQuestionsFromData =
    getScoreResult?.statistics.totalQuestions ?? totalQuestions;

  const fallbackScore =
    answeredIds > 0 && totalQuestionsFromData > 0
      ? Math.min(999, Math.round((answeredIds / totalQuestionsFromData) * 334))
      : 0;

  const score = scoreData ? scoreData.finalScore : (scoreProp ?? fallbackScore);

  const meetsStandar = scoreData
    ? scoreData.finalScore >= scoreData.passingScore
    : score >= 300;
  const standarLabel = category === "bumn" ? "BUMN" : "CPNS";
  const feedbackText = scoreData
    ? (finishMessage ??
      (meetsStandar
        ? `Nilai kamu sudah termasuk standar ${standarLabel}`
        : `Nilai kamu masih jauh dari standar ${standarLabel}`))
    : (feedbackProp ??
      (meetsStandar
        ? `Nilai kamu sudah termasuk standar ${standarLabel}`
        : `Nilai kamu masih jauh dari standar ${standarLabel}`));

  const sidebarTitle = scoreData?.examName?.trim()
    ? scoreData.examName
    : "Soal TKD";

  const highlight = highlightQuestionNumber ?? totalQuestionsFromData;

  const parsedScoreError =
    scoreError && "data" in scoreError && scoreError.data
      ? (scoreError.data as { message?: string })
      : null;
  const isNotFoundScoreError = scoreError?.status === 404;
  const scoreErrorMessage = isNotFoundScoreError
    ? (parsedScoreError?.message ??
      "Data hasil ujian tidak ditemukan. Mungkin Anda belum menyelesaikan ujian ini.")
    : (parsedScoreError?.message ??
      "Gagal memuat hasil ujian. Silakan coba lagi.");

  const answeredQuestionByNumber = new Set<number>();
  if (getScoreResult?.details) {
    getScoreResult.details.forEach((detail, index) => {
      if (detail.selectedAnswerId != null) {
        answeredQuestionByNumber.add(index + 1);
      }
    });
  }

  const isAnswered = (n: number) =>
    getScoreResult?.details ? answeredQuestionByNumber.has(n) : answers[n] != null;

  return (
    <section className="flex flex-col gap-6 xl:flex-row xl:items-start">
      <div className="flex min-h-[calc(100vh-75px)] min-w-0 flex-1 flex-col justify-between rounded-3xl border border-neutral-3 bg-neutral-1 p-4 sm:p-11">
        <div className="flex flex-1 flex-col items-center text-center">
          <h1 className="text-h2 font-semibold text-neutral-6">Selamat</h1>
          <p className="mt-4 max-w-md text-b2 text-neutral-5">
            Kamu baru saja sudah menyelesaikan Tryout. Ini nilai yang kamu
            dapatkan
          </p>

          {isLoadingScore ? (
            <p className="mt-8 text-b2 text-neutral-5" aria-live="polite">
              Memuat hasil ujian...
            </p>
          ) : scoreError ? (
            <div className="mt-8 flex max-w-md flex-col items-center gap-4">
              <p className="text-b2 text-neutral-6">{scoreErrorMessage}</p>
              {onRetryLoadScore ? (
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  onClick={onRetryLoadScore}
                  className="rounded-full border-primary-4/50 px-6 py-3 text-s1 font-semibold text-neutral-6"
                >
                  Coba Lagi
                </Button>
              ) : null}
            </div>
          ) : (
            <>
              <div
                className={cn(
                  "mt-8 inline-flex min-w-48 justify-center rounded-full px-10 py-5 sm:min-w-80",
                  meetsStandar ? "bg-primary-4" : "bg-red",
                )}
              >
                <span className="text-h1 font-bold text-neutral-1">{score}</span>
              </div>

              <p className="mt-6 text-b2 text-neutral-6">{feedbackText}</p>
            </>
          )}

        </div>

        <Button
          type="button"
          variant="outline"
          size="default"
          onClick={onReviewSoal}
          className="mt-10 w-full rounded-full border-primary-4/50 px-6 py-3 text-s1 font-semibold text-neutral-6 sm:mt-14"
        >
          Review Soal
        </Button>
      </div>

      <aside className="w-full max-h-[calc(100vh-75px)] shrink-0 overflow-auto rounded-3xl border border-neutral-3 bg-neutral-1 p-4 sm:p-6 xl:w-80">
        <h2 className="mb-4 text-h4 font-semibold text-neutral-6">
          {sidebarTitle}
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalQuestionsFromData }, (_, i) => i + 1).map((n) => {
            const isHighlight = n === highlight;
            const done = isAnswered(n) && !isHighlight;
            return (
              <div
                key={n}
                className={cn(
                  "max-w-14 flex aspect-square items-center justify-center rounded-full border text-c1 font-semibold",
                  isHighlight
                    ? "border-primary-4 bg-primary-5 text-neutral-1"
                    : done
                      ? "border-neutral-3 bg-neutral-4/50 text-neutral-6"
                      : "border-neutral-3 bg-neutral-1 text-neutral-6",
                )}
              >
                {n}
              </div>
            );
          })}
        </div>
      </aside>
    </section>
  );
}
