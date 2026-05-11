"use client";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { Icon } from "@/components";
import { Button } from "@/components/ui";
import {
  useFinishExamMutation,
  useGetExamDetailQuery,
  useGetExamScoreQuery,
  useStartExamMutation,
  useSubmitExamAnswerMutation,
} from "@/lib/redux/api/examsApi";
import type {
  ExamApiErrorResponse,
  FinishExamResponseData,
} from "@/lib/redux/api/types/exams";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const numericId = /^\d+$/.test(id) ? Number(id) : null;
  const isResumeFlow = searchParams.get("resume") === "1";
  const wantsReview = searchParams.get("review") === "1";

  const { isLoading, isError, error, refetch } = useGetExamDetailQuery(
    numericId ?? skipToken,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const examSession = useSelector((state: RootState) => state.examSession);
  const [startExam, { isLoading: isStartingExam }] = useStartExamMutation();
  const [submitExamAnswer] = useSubmitExamAnswerMutation();
  const [finishExam] = useFinishExamMutation();

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [examAnswers, setExamAnswers] = useState<ExamAnswers>({});
  const [resultHighlightQuestion, setResultHighlightQuestion] = useState(0);
  const [finishExamData, setFinishExamData] =
    useState<FinishExamResponseData | null>(null);
  const [finishExamMessage, setFinishExamMessage] = useState<string | null>(
    null,
  );

  const storageKey = useMemo(
    () => `tryout-exam-deadline-${category}-${id}`,
    [category, id],
  );

  const getPreviewHref = useCallback(() => {
    return examSession.packageId !== null
      ? `/tryout/${category}/${examSession.packageId}/preview`
      : `/tryout/${category}`;
  }, [category, examSession.packageId]);

  const handleMulai = useCallback(async () => {
    if (numericId === null) {
      return;
    }
    try {
      const response = await startExam(numericId).unwrap();
      const endAt = new Date(response.endTime).getTime();
      if (!Number.isFinite(endAt) || endAt <= Date.now()) {
        throw new Error("Waktu ujian tidak valid.");
      }
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, String(endAt));
      }
      setStarted(true);
    } catch (err) {
      const apiError = err as FetchBaseQueryError;
      const statusCode =
        typeof apiError?.status === "number" ? apiError.status : null;
      const errorMessage =
        statusCode === 403 &&
        apiError &&
        "data" in apiError &&
        apiError.data &&
        typeof apiError.data === "object" &&
        "message" in apiError.data
          ? String((apiError.data as ExamApiErrorResponse).message)
          : "Gagal memulai ujian. Silakan coba lagi.";

      if (statusCode === 403) {
        const redirectUrl = new URL(getPreviewHref(), window.location.origin);
        redirectUrl.searchParams.set("error", errorMessage);
        router.push(`${redirectUrl.pathname}${redirectUrl.search}`);
      }
    }
  }, [getPreviewHref, numericId, router, startExam, storageKey]);

  useEffect(() => {
    if (!started || typeof window === "undefined") {
      return;
    }
    const raw = window.localStorage.getItem(storageKey);
    const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
    if (!Number.isFinite(parsed) || parsed <= Date.now()) {
      window.localStorage.removeItem(storageKey);
      setStarted(false);
    }
  }, [started, storageKey]);

  useEffect(() => {
    if (!isResumeFlow || started || examSession.examId !== numericId) {
      return;
    }
    setStarted(true);
  }, [examSession.examId, isResumeFlow, numericId, started]);

  useEffect(() => {
    if (
      started ||
      examSession.examId !== numericId ||
      typeof window === "undefined"
    ) {
      return;
    }
    const raw = window.localStorage.getItem(storageKey);
    const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
    if (Number.isFinite(parsed) && parsed > Date.now()) {
      setStarted(true);
      return;
    }
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(storageKey);
    }
  }, [examSession.examId, numericId, started, storageKey]);

  const submitAnswerOrThrow = useCallback(
    async (payload: {
      userExamId: number;
      questionId: number;
      answerId: number;
    }) => {
      try {
        await submitExamAnswer(payload).unwrap();
      } catch (err) {
        const apiError = err as FetchBaseQueryError;
        const defaultMessage =
          "Sesi ujian berakhir karena jawaban gagal disimpan.";
        const message =
          apiError &&
          typeof apiError === "object" &&
          "data" in apiError &&
          apiError.data &&
          typeof apiError.data === "object" &&
          "message" in apiError.data
            ? String((apiError.data as ExamApiErrorResponse).message)
            : defaultMessage;
        throw new Error(message || defaultMessage);
      }
    },
    [submitExamAnswer],
  );

  const handleFinishExam = useCallback(
    async ({
      answers,
      lastQuestionIndex,
    }: {
      answers: ExamAnswers;
      lastQuestionIndex: number;
    }) => {
      const uid = examSession.userExamId;
      if (uid === null) {
        throw new Error("Sesi ujian tidak valid.");
      }
      const response = await finishExam({ userExamId: uid }).unwrap();
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(storageKey);
      }
      setExamAnswers(answers);
      setResultHighlightQuestion(lastQuestionIndex);
      setFinishExamData(response.data);
      setFinishExamMessage(response.message);
      setFinished(true);
    },
    [examSession.userExamId, finishExam, storageKey],
  );

  const goToReviewSoal = useCallback(() => {
    router.push(`/tryout/${category}/${id}/exam?review=1`);
  }, [router, category, id]);

  const isExamAlreadyFinishedError =
    isError &&
    error &&
    typeof error === "object" &&
    "status" in error &&
    (error as FetchBaseQueryError).status === 409 &&
    "data" in error &&
    typeof (error as FetchBaseQueryError).data === "object" &&
    (error as FetchBaseQueryError).data !== null &&
    "message" in
      ((error as FetchBaseQueryError).data as Record<string, unknown>) &&
    String(
      ((error as FetchBaseQueryError).data as Record<string, unknown>).message,
    ) === "Ujian telah selesai dikerjakan.";

  const shouldFetchExamScore =
    numericId !== null && (finished || isExamAlreadyFinishedError);
  const {
    data: examScoreResponse,
    isLoading: isLoadingExamScore,
    isFetching: isFetchingExamScore,
    isError: isExamScoreError,
    error: examScoreError,
    refetch: refetchExamScore,
  } = useGetExamScoreQuery(shouldFetchExamScore ? numericId : skipToken, {
    refetchOnMountOrArgChange: true,
  });

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
    if (isExamAlreadyFinishedError) {
      if (wantsReview) {
        return <ReviewSection category={category} id={id} />;
      }
      return (
        <ResultSection
          category={category}
          id={id}
          totalQuestions={examSession.totalQuestions}
          answers={examAnswers}
          highlightQuestionNumber={resultHighlightQuestion}
          getScoreResult={examScoreResponse?.data ?? null}
          isLoadingScore={isLoadingExamScore || isFetchingExamScore}
          scoreError={
            isExamScoreError ? (examScoreError as FetchBaseQueryError) : null
          }
          onRetryLoadScore={() => void refetchExamScore()}
          finishResult={finishExamData}
          onReviewSoal={goToReviewSoal}
        />
      );
    }

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
          disabled={isStartingExam}
          className="w-full rounded-full px-6 py-3 text-s1 text-neutral-1 sm:w-41 sm:justify-between"
        >
          {isStartingExam ? "Memulai..." : "Mulai"}
          <Icon name="arrow-left-circle" size={24} className="rotate-180" />
        </Button>
      </div>
    </section>
  ) : finished && wantsReview ? (
    <ReviewSection category={category} id={id} />
  ) : finished ? (
    <ResultSection
      category={category}
      id={id}
      totalQuestions={totalQuestions}
      answers={examAnswers}
      highlightQuestionNumber={resultHighlightQuestion || totalQuestions}
      getScoreResult={examScoreResponse?.data ?? null}
      isLoadingScore={isLoadingExamScore || isFetchingExamScore}
      scoreError={
        isExamScoreError ? (examScoreError as FetchBaseQueryError) : null
      }
      onRetryLoadScore={() => void refetchExamScore()}
      finishResult={finishExamData}
      finishMessage={finishExamMessage}
      onReviewSoal={goToReviewSoal}
    />
  ) : (
    <ExamSection
      storageKey={storageKey}
      userExamId={examSession.userExamId}
      totalQuestions={totalQuestions}
      initialAnswers={examAnswers}
      onAnswersChange={setExamAnswers}
      onSubmitAnswer={submitAnswerOrThrow}
      onFinishExam={handleFinishExam}
    />
  );
}
