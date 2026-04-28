import Link from "next/link";

import { Icon } from "@/components";
import { cn } from "@/lib/utils";
import formatToCurrency from "@/lib/utils/formatToCurrency";
import type { PurchaseItem, PurchaseStatus } from "../purchasesData";

interface PurchaseDetailPageProps {
  purchase: PurchaseItem;
}

const statusConfig: Record<
  PurchaseStatus,
  { label: string; className: string }
> = {
  berhasil: { label: "Berhasil", className: "bg-green text-neutral-1" },
  gagal: { label: "Gagal", className: "bg-red text-neutral-1" },
  kadaluarsa: { label: "Kadaluarsa", className: "bg-neutral-4 text-neutral-1" },
  menunggu: { label: "Menunggu", className: "bg-yellow text-neutral-6" },
};

const providerStyles: Record<string, string> = {
  BNI: "text-orange-500",
  Dana: "text-blue-500",
  Mandiri: "text-yellow",
};

export default function PurchaseDetailPage({
  purchase,
}: PurchaseDetailPageProps) {
  const status = statusConfig[purchase.status];

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
                      providerStyles[purchase.provider] ?? "text-neutral-6",
                    )}
                  >
                    {purchase.providerLogo}
                  </div>
                  <div className="flex-1">
                    <p className="text-b2 font-semibold text-neutral-6">
                      Bank {purchase.provider}
                    </p>
                    <p className="text-b2 font-semibold text-neutral-6">
                      {purchase.accountNumber}
                    </p>
                    <p className="text-b2 text-neutral-5">
                      {purchase.accountName}
                    </p>
                  </div>
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary-4 text-neutral-1 text-c1">
                    i
                  </span>
                </div>
              </section>

              <section>
                <h2 className="mb-3 text-s1 text-neutral-6">Waktu Transaksi</h2>
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
                <div className="flex min-h-28 items-center gap-4">
                  <div className="flex h-24 w-22 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-4 bg-neutral-2 text-neutral-4">
                    <span className="text-h2 leading-none">+</span>
                    <span className="mt-2 text-c1">{purchase.proofLabel}</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="pb-4">
              <h2 className="mb-3 text-s1 text-neutral-6">Ringkasan Pesanan</h2>
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
                <span className="text-s1 text-neutral-6">Total Pembayaran</span>
                <span className="text-h4 text-red">
                  {formatToCurrency(purchase.price)}
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
