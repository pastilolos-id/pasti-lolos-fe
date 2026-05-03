import { Button } from "@/components/ui";
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
  onReviewSoal,
}: ResultSectionProps) {
  const answeredIds = Object.values(answers).filter((v) => v != null).length;

  const score =
    scoreProp ??
    (answeredIds > 0
      ? Math.min(999, Math.round((answeredIds / totalQuestions) * 334))
      : 0);

  const meetsStandar = score >= 300;
  const standarLabel = category === "bumn" ? "BUMN" : "CPNS";
  const feedbackText =
    feedbackProp ??
    (meetsStandar
      ? `Nilai kamu sudah termasuk standar ${standarLabel}`
      : `Nilai kamu masih jauh dari standar ${standarLabel}`);

  const highlight = highlightQuestionNumber ?? totalQuestions;

  const isAnswered = (n: number) => answers[n] != null;

  return (
    <section className="flex flex-col gap-6 xl:flex-row xl:items-start">
      <div className="flex min-h-[calc(100vh-75px)] min-w-0 flex-1 flex-col justify-between rounded-3xl border border-neutral-3 bg-neutral-1 p-4 sm:p-11">
        <div className="flex flex-1 flex-col items-center text-center">
          <h1 className="text-h2 font-semibold text-neutral-6">Selamat</h1>
          <p className="mt-4 max-w-md text-b2 text-neutral-5">
            Kamu baru saja sudah menyelesaikan Tryout. Ini nilai yang kamu
            dapatkan
          </p>

          <div
            className={cn(
              "mt-8 inline-flex min-w-48 justify-center rounded-full px-10 py-5 sm:min-w-80",
              meetsStandar ? "bg-primary-4" : "bg-red",
            )}
          >
            <span className="text-h1 font-bold text-neutral-1">{score}</span>
          </div>

          <p className="mt-6 text-b2 text-neutral-6">{feedbackText}</p>
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
        <h2 className="mb-4 text-h4 font-semibold text-neutral-6">Soal TKD</h2>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((n) => {
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
