"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Icon } from "@/components";
import { Card } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetQuestionBanksAdminAllQuery } from "@/lib/redux/api/questionBankApi";
import { mapQuestionBanksAdminResponseToListItems } from "../mapQuestionBankFromApi";
import QuestionBankPdfViewer from "../QuestionBankPdfViewer";

type QuestionBankDetailPageProps = {
  bankId: string;
};

export default function QuestionBankDetailPage({
  bankId,
}: QuestionBankDetailPageProps) {
  const { data, isLoading, isError, refetch } =
    useGetQuestionBanksAdminAllQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const item = useMemo(() => {
    const items = mapQuestionBanksAdminResponseToListItems(data ?? []);
    return items.find((row) => String(row.id) === bankId);
  }, [data, bankId]);

  const showLoading = isLoading && !data;

  if (showLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-10 w-40 rounded-full" />
        <Skeleton className="h-10 w-full max-w-lg" />
        <Skeleton className="h-[min(85vh,800px)] w-full min-h-[320px] rounded-2xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="rounded-3xl border border-neutral-3 bg-neutral-2 p-6 text-center shadow-none">
        <p className="text-b2 text-neutral-6">
          Gagal memuat detail question bank.
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-4 text-b2 font-semibold text-primary-5 underline"
        >
          Coba lagi
        </button>
        <Link
          href="/question-bank"
          className="mt-4 block text-b2 font-semibold text-primary-5"
        >
          Kembali ke daftar
        </Link>
      </Card>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col gap-4">
        <Link
          href="/question-bank"
          className="inline-flex w-fit items-center gap-2 text-b2 font-semibold text-primary-5 hover:text-primary-4"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-5 text-white shadow-sm">
            <Icon
              name="arrow-left-circle"
              size={24}
              className="brightness-0 invert"
            />
          </span>
          Kembali
        </Link>
        <p className="text-b2 text-neutral-5">
          Bank soal tidak ditemukan atau belum memiliki file PDF.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/question-bank"
        className="inline-flex w-fit items-center gap-2 text-b2 font-semibold text-primary-5 hover:text-primary-4"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-5 text-white shadow-sm">
          <Icon
            name="arrow-left-circle"
            size={24}
            className="brightness-0 invert"
          />
        </span>
        Kembali
      </Link>
      <div>
        <div className="flex flex-wrap items-center gap-2 gap-y-1">
          <h1 className="text-h4 font-bold text-neutral-6 sm:text-h3">
            {item.bankName}
          </h1>
          {item.subjectName ? (
            <span className="rounded-full bg-primary-5/15 px-2.5 py-0.5 text-c1 font-semibold text-primary-5">
              {item.subjectName}
            </span>
          ) : null}
        </div>
        {item.description ? (
          <p className="mt-2 text-b2 text-neutral-5">{item.description}</p>
        ) : null}
        <p className="mt-2 text-s1 font-semibold text-neutral-6">
          {item.priceFormatted}
        </p>
        <p className="mt-2 text-b2 text-neutral-5">
          Dokumen soal (PDF). Gunakan kontrol browser atau PDF viewer untuk
          memperbesar dan menggulir.
        </p>
      </div>
      <QuestionBankPdfViewer pdfUrl={item.pdfUrl} title={item.bankName} />
      <p className="text-b3 text-neutral-5">
        Jika pratinjau tidak tampil,{" "}
        <a
          href={item.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary-5 underline underline-offset-2 hover:text-primary-4"
        >
          buka PDF di tab baru
        </a>
        .
      </p>
    </div>
  );
}
