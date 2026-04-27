"use client";

import { useState } from "react";
import { FilterSelect, type FilterType } from "@/components";
import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import { purchasesData } from "../purchasesData";

const statusConfig = {
  berhasil: { label: "Berhasil", color: "bg-green text-white" },
  gagal: { label: "Gagal", color: "bg-red text-white" },
  menunggu: { label: "Menunggu", color: "bg-yellow text-neutral-6" },
};

const providerLogos: Record<string, React.ReactNode> = {
  BNI: (
    <div className="w-21.5 h-15 bg-orange-500 rounded flex items-center justify-center">
      <span className="font-bold text-xs text-white">BNI</span>
    </div>
  ),
  Dana: (
    <div className="w-21.5 h-15 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
      Dana
    </div>
  ),
  Mandiri: (
    <div className="w-21.5 h-15 bg-yellow rounded flex items-center justify-center text-white font-bold text-xs">
      Mandiri
    </div>
  ),
};

export default function PurchasesPage() {
  const [filterValue, setFilterValue] = useState<FilterType>("semua");

  const filteredData =
    filterValue === "semua"
      ? purchasesData
      : purchasesData.filter((item) => item.type === filterValue);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="py-6 px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-h2 font-semibold">Riwayat Pembelian</h1>
          <FilterSelect value={filterValue} onChange={setFilterValue} />
        </div>

        {/* Purchase List */}
        <div className="flex flex-col gap-4 p-4 bg-neutral-2 rounded-3xl">
          {filteredData.length > 0 ? (
            filteredData.map((purchase) => (
              <Card
                key={purchase.id}
                className={cn(
                  "p-4 md:p-6 flex items-center gap-4 md:gap-6",
                  "border border-card-border hover:shadow-md transition-all",
                )}
              >
                <div className="flex flex-1 w-full text-center justify-between">
                  {/* Date */}
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
                    <span>{purchase.date}</span>
                  </div>

                  {/* Status */}
                  <span
                    className={cn(
                      "px-3 py-1 rounded-card-medium text-xs font-semibold whitespace-nowrap",
                      statusConfig[purchase.status].color,
                    )}
                  >
                    {statusConfig[purchase.status].label}
                  </span>
                </div>

                <div className="flex items-center gap-6 w-full">
                  {/* Provider Logo */}
                  <div className="shrink-0 border border-neutral-3 w-27 aspect-square flex items-center justify-center rounded-xl">
                    {providerLogos[purchase.provider] || (
                      <div className="w-12 h-12 bg-muted rounded" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-b2 font-semibold">
                          {purchase.title}
                        </h3>
                        <p className="text-c1 text-muted-foreground">Harga</p>
                      </div>
                    </div>

                    {/* Price */}
                    <p className="text-b1 font-semibold text-red mb-2">
                      {formatPrice(purchase.price)}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                Tidak ada riwayat pembelian untuk filter ini
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
