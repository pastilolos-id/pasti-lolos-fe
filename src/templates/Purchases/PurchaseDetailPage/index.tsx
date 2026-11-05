"use client";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components";
import { useGetOrderHistoryDetailQuery } from "@/lib/redux/api/ordersApi";
import type { OrdersHistoryErrorResponse } from "@/lib/redux/api/types/orders";
import { cn } from "@/lib/utils";
import formatToCurrency from "@/lib/utils/formatToCurrency";
import { mapOrderHistoryDetailToUi } from "../mapOrderHistoryToUi";

const statusConfig = {
  berhasil: { label: "Berhasil", className: "bg-green text-neutral-1" },
  gagal: { label: "Gagal", className: "bg-red text-neutral-1" },
  menunggu: { label: "Menunggu", className: "bg-yellow text-neutral-6" },
} as const;

const providerStyles: Record<string, string> = {
  QRIS: "text-neutral-6",
  BNI: "text-orange-500",
  Mandiri: "text-yellow",
  BRI: "text-blue-700",
  BCA: "text-blue-500",
};

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in error
  );
}

function getBackendErrorMessage(error: unknown): string {
  if (
    isFetchBaseQueryError(error) &&
    typeof error.data === "object" &&
    error.data !== null
  ) {
    const data = error.data as Partial<OrdersHistoryErrorResponse>;
    if (typeof data.message === "string" && data.message.length > 0) {
      return data.message;
    }
  }

  return "Gagal memuat detail pesanan. Silakan coba lagi.";
}

export default function PurchaseDetailPage() {
  const params = useParams<{ id: string }>();
  const [isProofPreviewOpen, setIsProofPreviewOpen] = useState(false);
  const id = params?.id ?? "";
  const numericId = Number(id);
  const isValidId = Number.isInteger(numericId) && numericId > 0;

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetOrderHistoryDetailQuery(numericId, {
      skip: !isValidId,
    });

  const isInitialLoading = isLoading || (isFetching && !data);
  const purchase = data ? mapOrderHistoryDetailToUi(data) : null;
  const status = purchase ? statusConfig[purchase.statusKey] : null;
  const isQrisMethod = purchase?.paymentMethodLabel === "QRIS";

  return (
    <section className="space-y-4">
      <div className="rounded-card-medium border border-neutral-3 bg-neutral-1 space-y-6 p-4 sm:p-6">
        <Link
          href={`/purchases`}
          className="group inline-flex items-center gap-2 text-s1 text-neutral-6"
        >
          <div className="bg-primary-4 group-hover:bg-primary-5 rounded-full p-2.25 transition-colors">
            <Icon name="arrow-left-circle" size={15} />
          </div>
          <span>Kembali</span>
        </Link>

        <h1 className="text-h4 text-neutral-6">Detail Pesanan</h1>

        {!isValidId ? (
          <div className="rounded-3xl border border-neutral-3 p-6">
            <p className="text-b2 text-neutral-6">ID pesanan tidak valid.</p>
          </div>
        ) : isInitialLoading ? (
          <div className="rounded-3xl border border-neutral-3 p-6 text-b2 text-neutral-6">
            Memuat detail pesanan...
          </div>
        ) : isError || !purchase || !status ? (
          <div className="rounded-3xl border border-neutral-3 p-6">
            <p className="text-b2 text-neutral-6">
              {getBackendErrorMessage(error)}
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-full bg-red px-6 py-2 text-s1 text-white hover:bg-red/85"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <div className="rounded-3xl border border-neutral-3 p-4 sm:p-6">
            <div className="space-y-6">
              <section>
                <h2 className="mb-2 text-s1 text-neutral-6">Nama Item</h2>
                <p className="max-w-4xl text-b3 text-neutral-5">
                  {purchase.title}
                </p>
              </section>

              <section>
                <h2 className="mb-2 text-s1 text-neutral-6">Kode Transaksi</h2>
                <div className="flex items-center gap-2">
                  <p className="text-b2 font-semibold text-neutral-6">
                    {purchase.transactionCode}
                  </p>
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary-4 text-neutral-1 text-c1">
                    i
                  </span>
                </div>
              </section>

              <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                <section>
                  <h2 className="mb-3 text-s1 text-neutral-6">
                    Metode Pembayaran
                  </h2>
                  <div className="flex max-w-sm items-center gap-4 rounded-2xl border border-neutral-3 p-4">
                    <div
                      className={cn(
                        "text-s1 font-semibold",
                        providerStyles[purchase.providerDisplayName] ??
                          "text-neutral-6",
                      )}
                    >
                      {purchase.providerDisplayName}
                    </div>
                    <div className="flex-1">
                      <p className="text-b2 font-semibold text-neutral-6">
                        {purchase.paymentMethodLabel}
                      </p>
                      {isQrisMethod ? (
                        <p className="text-b2 text-neutral-5">
                          Pembayaran via QRIS
                        </p>
                      ) : (
                        <>
                          <p className="text-b2 font-semibold text-neutral-6">
                            {purchase.accountNumber}
                          </p>
                          <p className="text-b2 text-neutral-5">
                            {purchase.accountName}
                          </p>
                        </>
                      )}
                    </div>
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary-4 text-neutral-1 text-c1">
                      i
                    </span>
                  </div>
                </section>

                <section>
                  <h2 className="mb-3 text-s1 text-neutral-6">
                    Waktu Transaksi
                  </h2>
                  <p className="text-b2 text-neutral-5">
                    {purchase.transactionTime}
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-s1 text-neutral-6">Status</h2>
                  <span
                    className={cn(
                      "inline-flex rounded-full px-4 py-1 text-c1",
                      status.className,
                    )}
                  >
                    {status.label}
                  </span>
                </section>
              </div>

              <section>
                <h2 className="mb-3 text-s1 text-neutral-6">Bukti Transaksi</h2>
                <div className="rounded-2xl border border-dashed border-neutral-4 bg-neutral-3 p-3">
                  {purchase.receiptUrl ? (
                    <button
                      type="button"
                      onClick={() => setIsProofPreviewOpen(true)}
                      className="rounded-xl border border-neutral-3 bg-white p-1.5"
                    >
                      <div className="relative h-25 w-19.5 overflow-hidden rounded-md bg-neutral-2">
                        <Image
                          src={purchase.receiptUrl}
                          alt="Bukti pembayaran"
                          fill
                          className="object-contain"
                          sizes="78px"
                          unoptimized
                        />
                      </div>
                    </button>
                  ) : (
                    <div className="flex min-h-28 items-center gap-4">
                      <div className="flex h-24 w-40 items-center justify-center rounded-2xl border border-dashed border-neutral-4 bg-neutral-2 text-neutral-4">
                        <span className="text-c1">
                          Bukti pembayaran tidak tersedia
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section className="pb-4">
                <h2 className="mb-3 text-s1 text-neutral-6">
                  Ringkasan Pesanan
                </h2>
                <div className="space-y-2 border-b border-neutral-3 pb-4 text-b2">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-neutral-5">Harga Paket</span>
                    <span className="font-semibold text-neutral-6">
                      {formatToCurrency(purchase.originalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-neutral-5">Diskon</span>
                    <span className="font-semibold text-neutral-6">
                      {formatToCurrency(purchase.discount)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 py-4 border-b border-neutral-3">
                  <span className="text-s1 text-neutral-6">
                    Total Pembayaran
                  </span>
                  <span className="text-h4 text-red">
                    {formatToCurrency(purchase.price)}
                  </span>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
      {isProofPreviewOpen && purchase?.receiptUrl ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-3xl rounded-2xl bg-neutral-1 p-3 sm:p-4">
            <button
              type="button"
              onClick={() => setIsProofPreviewOpen(false)}
              className="mb-3 ml-auto block rounded-full bg-primary-4 px-4 py-2 text-s1 text-neutral-1"
            >
              Tutup
            </button>
            <div className="overflow-hidden rounded-xl border border-neutral-3 bg-neutral-2 p-2">
              <Image
                src={purchase.receiptUrl}
                alt="Bukti pembayaran fullscreen"
                width={1200}
                height={1200}
                className="h-auto max-h-[75vh] w-full rounded-lg object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
