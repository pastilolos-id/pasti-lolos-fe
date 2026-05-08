"use client";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FilterSelect, type FilterType } from "@/components";
import { Card } from "@/components/ui";
import { useGetOrdersHistoryQuery } from "@/lib/redux/api/ordersApi";
import type { OrdersHistoryErrorResponse } from "@/lib/redux/api/types/orders";
import { cn, formatToCurrency } from "@/lib/utils";
import {
  mapOrderHistoryEntryToUi,
  type ProviderKey,
  type PurchaseStatusKey,
} from "../mapOrderHistoryToUi";

const statusConfig: Record<
  PurchaseStatusKey,
  { label: string; color: string }
> = {
  berhasil: { label: "Berhasil", color: "bg-green text-white" },
  gagal: { label: "Gagal", color: "bg-red text-white" },
  kadaluarsa: { label: "Kadaluarsa", color: "bg-neutral-4 text-neutral-1" },
  menunggu: { label: "Menunggu", color: "bg-yellow text-neutral-6" },
};

const providerLogos: Record<ProviderKey, React.ReactNode> = {
  QRIS: (
    <div className="w-21.5 h-15 bg-neutral-2 border border-neutral-3 rounded flex items-center justify-center">
      <span className="font-bold text-xs text-neutral-6">QRIS</span>
    </div>
  ),
  BNI: (
    <div className="w-21.5 h-15 bg-orange-500 rounded flex items-center justify-center">
      <span className="font-bold text-xs text-white">BNI</span>
    </div>
  ),
  Mandiri: (
    <div className="w-21.5 h-15 bg-yellow rounded flex items-center justify-center text-white font-bold text-xs">
      Mandiri
    </div>
  ),
  BRI: (
    <div className="w-21.5 h-15 bg-blue-700 rounded flex items-center justify-center text-white font-bold text-xs">
      BRI
    </div>
  ),
  BCA: (
    <div className="w-21.5 h-15 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
      BCA
    </div>
  ),
};

function renderProviderLogo(
  providerKey: ProviderKey | null,
  fallbackLabel: string,
) {
  if (providerKey && providerLogos[providerKey]) {
    return providerLogos[providerKey];
  }
  return (
    <div className="w-21.5 h-15 bg-neutral-2 border border-neutral-3 rounded flex items-center justify-center px-2">
      <span className="font-bold text-xs text-neutral-6 text-center truncate">
        {fallbackLabel}
      </span>
    </div>
  );
}

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in error
  );
}

function getBackendErrorMessage(error: unknown): string | null {
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
  return null;
}

export default function PurchasesPage() {
  const [filterValue, setFilterValue] = useState<FilterType>("semua");
  const { data, isLoading, isFetching, isError, error } =
    useGetOrdersHistoryQuery();

  const viewModels = useMemo(
    () => (data ? data.map(mapOrderHistoryEntryToUi) : []),
    [data],
  );

  const filteredData = useMemo(
    () =>
      filterValue === "semua"
        ? viewModels
        : viewModels.filter((item) => item.filterType === filterValue),
    [viewModels, filterValue],
  );

  const isInitialLoading = isLoading || (isFetching && !data);
  const is404Error =
    isError && isFetchBaseQueryError(error) && error.status === 404;
  const isOtherError = isError && !is404Error;

  const renderListContent = () => {
    if (isInitialLoading) {
      return (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Memuat riwayat pembelian...</p>
        </Card>
      );
    }

    if (is404Error) {
      const backendMessage = getBackendErrorMessage(error);
      return (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            {backendMessage ?? "Belum ada riwayat pembelian"}
          </p>
        </Card>
      );
    }

    if (isOtherError) {
      return (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            Gagal memuat riwayat pembelian. Coba lagi nanti.
          </p>
        </Card>
      );
    }

    if (filteredData.length === 0) {
      return (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            Tidak ada riwayat pembelian untuk filter ini
          </p>
        </Card>
      );
    }

    return filteredData.map((purchase) => (
      <Link
        key={purchase.id}
        href={`/purchases/${purchase.id}`}
        className="block"
      >
        <Card
          className={cn(
            "p-4 md:p-6 flex items-center gap-4 md:gap-6",
            "border border-card-border hover:shadow-md transition-all",
          )}
        >
          <div className="flex flex-1 w-full text-center justify-between">
            <div className="flex items-center gap-2 text-c1 text-muted-foreground">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Tanggal pembelian</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{purchase.dateLabel}</span>
            </div>

            <span
              className={cn(
                "px-3 py-1 rounded-card-medium text-xs font-semibold whitespace-nowrap",
                statusConfig[purchase.statusKey].color,
              )}
            >
              {statusConfig[purchase.statusKey].label}
            </span>
          </div>

          <div className="flex items-center gap-6 w-full">
            <div className="shrink-0 border border-neutral-3 w-27 aspect-square flex items-center justify-center rounded-xl">
              {renderProviderLogo(
                purchase.providerKey,
                purchase.paymentMethodLabel,
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-b2 font-semibold">{purchase.title}</h3>
                  <p className="text-c1 text-muted-foreground">Harga</p>
                </div>
              </div>

              <p className="text-b1 font-semibold text-red mb-2">
                {formatToCurrency(purchase.grandTotal)}
              </p>
            </div>
          </div>
        </Card>
      </Link>
    ));
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="py-6 px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-h2 font-semibold">Riwayat Pembelian</h1>
          <FilterSelect value={filterValue} onChange={setFilterValue} />
        </div>

        <div className="flex flex-col gap-4 p-4 bg-neutral-2 rounded-3xl">
          {renderListContent()}
        </div>
      </div>
    </div>
  );
}
