"use client";

import { skipToken } from "@reduxjs/toolkit/query";
import { useMemo } from "react";

import { useGetExamPackageDetailQuery } from "@/lib/redux/api/examsApi";

import type { TryoutPackageChildRow } from "./types";

export function useSubExamRouteExamId(
  packageId: number,
  child: Pick<TryoutPackageChildRow, "userExamId" | "examName" | "examId">,
) {
  const directId =
    child.examId != null && Number.isFinite(child.examId) ? child.examId : null;

  const queryEnabled =
    directId == null && Number.isFinite(packageId) && packageId > 0;

  const { data, isLoading, isFetching, isError } = useGetExamPackageDetailQuery(
    queryEnabled ? packageId : skipToken,
  );

  const examId = useMemo(() => {
    if (directId != null) return directId;
    if (!data?.subExams?.length) return null;

    const subs = data.subExams;
    const byUe = subs.find(
      (s) => s.userExamId != null && s.userExamId === child.userExamId,
    );
    if (byUe) return byUe.id;

    const nameNorm = child.examName.trim().toLowerCase();
    const byName = subs.find((s) => s.name.trim().toLowerCase() === nameNorm);
    return byName?.id ?? null;
  }, [data, directId, child.userExamId, child.examName]);

  const isResolving =
    queryEnabled && (isLoading || isFetching) && examId == null;

  return {
    examId,
    isResolving,
    resolveFailed: queryEnabled && !isLoading && !isFetching && examId == null,
    isError: queryEnabled && isError,
  };
}
