"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components";
import { Card } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetQuestionBanksAdminAllQuery } from "@/lib/redux/api/questionBankApi";
import {
  collectSubjectFilterOptions,
  mapQuestionBanksAdminResponseToListItems,
} from "./mapQuestionBankFromApi";
import QuestionBankSubjectFilter from "./QuestionBankSubjectFilter";

export default function QuestionBankPage() {
  const { data, isLoading, isError, isFetching, refetch } =
    useGetQuestionBanksAdminAllQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const [subjectFilter, setSubjectFilter] = useState<"all" | number>("all");

  const allItems = useMemo(
    () => mapQuestionBanksAdminResponseToListItems(data ?? []),
    [data],
  );

  const subjectOptions = useMemo(
    () => collectSubjectFilterOptions(allItems),
    [allItems],
  );

  const filteredItems = useMemo(() => {
    if (subjectFilter === "all") {
      return allItems;
    }
    return allItems.filter((row) => row.subjectId === subjectFilter);
  }, [allItems, subjectFilter]);

  const showInitialLoading = isLoading && !data;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h4 font-bold text-neutral-6 sm:text-h3">
          QuestionBank
        </h1>
        <p className="mt-2 text-b2 text-neutral-5">
          Latihan berbentuk file PDF. Pilih paket untuk membuka pratinjau.
        </p>
      </div>

      <QuestionBankSubjectFilter
        options={subjectOptions}
        value={subjectFilter}
        onChange={setSubjectFilter}
      />

      {showInitialLoading ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-24 w-full rounded-3xl" />
          <Skeleton className="h-24 w-full rounded-3xl" />
        </div>
      ) : null}

      {isError ? (
        <Card className="rounded-3xl border border-neutral-3 bg-neutral-2 p-6 text-center shadow-none">
          <p className="text-b2 text-neutral-6">
            Gagal memuat daftar question bank.
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-4 text-b2 font-semibold text-primary-5 underline"
          >
            Coba lagi
          </button>
        </Card>
      ) : null}

      {!showInitialLoading && !isError && filteredItems.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-neutral-3 bg-neutral-2 px-4 py-10 text-center text-b2 text-neutral-5">
          {allItems.length === 0
            ? "Belum ada bank soal dengan PDF yang tersedia."
            : "Tidak ada bank soal untuk subjek ini."}
        </p>
      ) : null}

      {!showInitialLoading && !isError && filteredItems.length > 0 ? (
        <ul className="flex flex-col gap-3 sm:gap-4">
          {filteredItems.map((item) => (
            <li key={item.id}>
              <Link href={`/question-bank/${item.id}`}>
                <Card className="rounded-3xl border border-neutral-3 p-4 shadow-none transition-colors hover:border-primary-4/50 hover:bg-neutral-2 sm:p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-5/15 text-primary-5">
                      <Icon
                        name="exam-multiple-choice"
                        size={28}
                        viewBox="0 0 24 24"
                        pathClassName="fill-primary-5"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-s1 font-bold text-neutral-6 sm:text-b1">
                          {item.bankName}
                        </p>
                        {item.subjectName ? (
                          <span className="rounded-full bg-primary-5/15 px-2.5 py-0.5 text-c1 font-semibold text-primary-5">
                            {item.subjectName}
                          </span>
                        ) : null}
                      </div>
                      {item.description ? (
                        <p className="mt-1 text-b3 text-neutral-5">
                          {item.description}
                        </p>
                      ) : null}
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-c1 text-neutral-5">
                        <span className="font-semibold text-neutral-6">
                          {item.priceFormatted}
                        </span>
                        {item.totalQuestions > 0 ? (
                          <span>{item.totalQuestions} soal</span>
                        ) : null}
                        {isFetching && !showInitialLoading ? (
                          <span className="text-primary-5">Memperbarui…</span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-c1 font-medium text-primary-5">
                        Buka PDF
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
