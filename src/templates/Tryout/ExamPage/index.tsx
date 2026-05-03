"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import { Icon } from "@/components";
import { Button } from "@/components/ui";
import type { TryoutCategory } from "../data";
import ExamSection, { type ExamAnswers } from "./ExamSection";
import ResultSection from "./ResultSection";
import RulesSection from "./RulesSection";

interface ExamPageProps {
  category: TryoutCategory;
  id: string;
}

const standardScores: { key: string; value: string }[] = [
  { key: "TWK", value: "65" },
  { key: "TIU", value: "80" },
  { key: "TKP", value: "166" },
];

const TOTAL_QUESTIONS = 110;

export default function ExamPage({ category, id }: ExamPageProps) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [examAnswers, setExamAnswers] = useState<ExamAnswers>({});
  const [resultHighlightQuestion, setResultHighlightQuestion] =
    useState(TOTAL_QUESTIONS);

  const storageKey = useMemo(
    () => `tryout-exam-deadline-${category}-${id}`,
    [category, id],
  );

  const handleMulai = useCallback(() => {
    const endAt = Date.now() + 3 * 60 * 60 * 1000;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, String(endAt));
    }
    setStarted(true);
  }, [storageKey]);

  return (
    <>
      {!started ? (
        <section className="min-h-[calc(100vh-75px)] rounded-card-medium border border-neutral-3 p-4 sm:p-10">
          <RulesSection
            title="Tryout Pertama"
            totalQuestions={TOTAL_QUESTIONS}
            durationMinutes={150}
            standardScores={standardScores}
          />

          <div className="mt-15 flex flex-col gap-3 sm:mt-24 sm:flex-row sm:justify-between">
            <Link href={`/tryout/${category}/${id}/preview`}>
              <Button
                variant="outline"
                size="default"
                className="w-full rounded-full border-primary-4/50 px-6 py-3 text-s1 sm:w-41 sm:justify-between"
              >
                <Icon
                  name="arrow-left-circle-bg-blue"
                  size={24}
                  fill="#80B0FF"
                  stroke="#80B0FF"
                />
                Kembali
              </Button>
            </Link>

            <Button
              type="button"
              variant="primary"
              size="default"
              onClick={handleMulai}
              className="w-full rounded-full px-6 py-3 text-s1 text-neutral-1 sm:w-41 sm:justify-between"
            >
              Mulai
              <Icon name="arrow-left-circle" size={24} className="rotate-180" />
            </Button>
          </div>
        </section>
      ) : finished ? (
        <ResultSection
          category={category}
          id={id}
          totalQuestions={TOTAL_QUESTIONS}
          answers={examAnswers}
          highlightQuestionNumber={resultHighlightQuestion}
        />
      ) : (
        <ExamSection
          storageKey={storageKey}
          totalQuestions={TOTAL_QUESTIONS}
          initialAnswers={examAnswers}
          onAnswersChange={setExamAnswers}
          onFinish={(answers, lastQuestionIndex) => {
            setExamAnswers(answers);
            setResultHighlightQuestion(lastQuestionIndex);
            setFinished(true);
          }}
        />
      )}
    </>
  );
}
