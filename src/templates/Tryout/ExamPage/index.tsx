"use client";

import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { Icon } from "@/components";
import { Button } from "@/components/ui";
import { useGetExamDetailQuery } from "@/lib/redux/api/examsApi";
import type { RootState } from "@/lib/redux/store";
import type { TryoutCategory } from "../data";
import ExamSection, { type ExamAnswers } from "./ExamSection";
import ResultSection from "./ResultSection";
import ReviewSection from "./ReviewSection";
import RulesSection from "./RulesSection";

interface ExamPageProps {
  category: TryoutCategory;
  id: string;
}

function getShortExamLabel(examName: string): string {
  const trimmed = examName.trim();
  if (!trimmed) return "Nilai";
  const openParen = trimmed.indexOf("(");
  return openParen > 0 ? trimmed.slice(0, openParen).trim() : trimmed;
}

export default function ExamPage({ category, id }: ExamPageProps) {
  const numericId = /^\d+$/.test(id) ? Number(id) : null;

  const { isLoading, isError, error, refetch } = useGetExamDetailQuery(
    numericId ?? skipToken,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const examSession = useSelector((state: RootState) => state.examSession);

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [examAnswers, setExamAnswers] = useState<ExamAnswers>({});
  const [resultHighlightQuestion, setResultHighlightQuestion] = useState(0);

  const storageKey = useMemo(
    () => `tryout-exam-deadline-${category}-${id}`,
    [category, id],
  );

  const handleMulai = useCallback(() => {
    const endAt =
      Date.now() + Math.max(examSession.durationMinutes, 1) * 60 * 1000;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, String(endAt));
    }
    setStarted(true);
  }, [storageKey, examSession.durationMinutes]);

  if (numericId === null) {
    return (
      <section className="min-h-[calc(100vh-75px)] rounded-card-medium border border-neutral-3 p-4 sm:p-10">
        <p className="text-b2 text-neutral-6">ID ujian tidak valid.</p>
        <Link href={`/tryout/${category}`} className="mt-4 inline-block">
          <Button
            variant="outline"
            size="default"
            className="rounded-full border-primary-4/50 px-6 py-3 text-s1"
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
      </section>
    );
  }

  if (isLoading || (!isError && examSession.examId !== numericId)) {
    return (
      <section className="min-h-[calc(100vh-75px)] rounded-card-medium border border-neutral-3 p-4 sm:p-10">
        <p className="text-b2 text-neutral-5" aria-live="polite">
          Memuat ujian...
        </p>
      </section>
    );
  }

  if (isError) {
    const errorMessage =
      error && typeof error === "object" && "data" in error
        ? ((error as { data?: { message?: string } }).data?.message ??
          "Gagal memuat ujian. Silakan coba lagi.")
        : "Gagal memuat ujian. Silakan coba lagi.";

    return (
      <section className="min-h-[calc(100vh-75px)] rounded-card-medium border border-neutral-3 p-4 sm:p-10">
        <p className="text-b2 text-neutral-6">{errorMessage}</p>
        <div className="mt-4 flex gap-3">
          <Button
            type="button"
            variant="outline"
            size="default"
            onClick={() => void refetch()}
            className="rounded-full border-primary-4/50 px-6 py-3 text-s1"
          >
            Coba Lagi
          </Button>
          <Link href={`/tryout/${category}`}>
            <Button
              variant="outline"
              size="default"
              className="rounded-full border-primary-4/50 px-6 py-3 text-s1"
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
        </div>
      </section>
    );
  }

  const totalQuestions = examSession.totalQuestions;
  const standardScores = [
    {
      key: getShortExamLabel(examSession.examName),
      value: examSession.passingScore,
    },
  ];
  const previewHref =
    examSession.packageId !== null
      ? `/tryout/${category}/${examSession.packageId}/preview`
      : `/tryout/${category}`;

  return !started ? (
    <section className="min-h-[calc(100vh-75px)] rounded-card-medium border border-neutral-3 p-4 sm:p-10">
      <RulesSection
        title={examSession.examName}
        totalQuestions={totalQuestions}
        durationMinutes={examSession.durationMinutes}
        standardScores={standardScores}
      />

      <div className="mt-15 flex flex-col gap-3 sm:mt-24 sm:flex-row sm:justify-between">
        <Link href={previewHref}>
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
  ) : finished && reviewing ? (
    <ReviewSection
      category={category}
      id={id}
      totalQuestions={totalQuestions}
      answers={examAnswers}
    />
  ) : finished ? (
    <ResultSection
      category={category}
      id={id}
      totalQuestions={totalQuestions}
      answers={examAnswers}
      highlightQuestionNumber={resultHighlightQuestion || totalQuestions}
      onReviewSoal={() => setReviewing(true)}
    />
  ) : (
    <ExamSection
      storageKey={storageKey}
      totalQuestions={totalQuestions}
      initialAnswers={examAnswers}
      onAnswersChange={setExamAnswers}
      onFinish={(answers, lastQuestionIndex) => {
        setExamAnswers(answers);
        setResultHighlightQuestion(lastQuestionIndex);
        setFinished(true);
      }}
    />
  );
}
