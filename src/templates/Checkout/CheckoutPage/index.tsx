"use client";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { skipToken } from "@reduxjs/toolkit/query";
import Image from "next/image";
import Link from "next/link";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import qrisImage from "@/assets/images/QRIS.jpeg";
import { Form, type FormHandle, Icon } from "@/components";
import type { inputDataType } from "@/components/Form/InputElement/types";
import { buttonVariants } from "@/components/ui";
import { useGetCourseCheckoutPreviewQuery } from "@/lib/redux/api/courseApi";
import {
  useApplyExamCouponMutation,
  useGetExamCheckoutPreviewQuery,
} from "@/lib/redux/api/examsApi";
import { applyExamCouponFieldErrors } from "@/lib/redux/api/mapApplyExamCouponApiErrors";
import { parseApplyExamCouponMutationError } from "@/lib/redux/api/parseApplyExamCouponMutationError";
import type {
  ApplyExamCouponSummary,
  ExamApiErrorResponse,
} from "@/lib/redux/api/types/exams";
import { cn, formatToCurrency } from "@/lib/utils";

export type CheckoutProductType = "tryout" | "course";

interface CheckoutPageProps {
  idProduk: string;
  productType: CheckoutProductType;
}

type PaymentMethod =
  | {
      id: "qris";
      type: "qris";
      label: "QRIS";
    }
  | {
      id: "bank-bni" | "bank-mandiri" | "bank-bri" | "bank-bca";
      type: "bank";
      label: string;
      accountName: string;
      accountNumber: string;
      bankName: string;
    };

const paymentMethods: PaymentMethod[] = [
  { id: "qris", type: "qris", label: "QRIS" },
  {
    id: "bank-bni",
    type: "bank",
    label: "Bank BNI",
    accountName: "ACEP AWALUDIN",
    accountNumber: "12000xxxxxx",
    bankName: "Bank BNI",
  },
  {
    id: "bank-mandiri",
    type: "bank",
    label: "Bank Mandiri",
    accountName: "ACEP AWALUDIN",
    accountNumber: "1200012784174",
    bankName: "Bank Mandiri",
  },
  {
    id: "bank-bri",
    type: "bank",
    label: "Bank BRI",
    accountName: "ACEP AWALUDIN",
    accountNumber: "12000127xxxxxxx",
    bankName: "Bank BRI",
  },
  {
    id: "bank-bca",
    type: "bank",
    label: "Bank BCA",
    accountName: "ACEP AWALUDIN",
    accountNumber: "120001xxxxxx",
    bankName: "Bank BCA",
  },
];

const couponInputData: inputDataType[] = [
  {
    type: "text",
    name: "couponCode",
    label: "Kode Kupon",
    placeholder: "Contoh : DISKON2025%",
    className:
      "col-span-12 lg:col-span-8 [&_[data-slot=field-label]]:hidden border border-primary-5 aria-invalid:border-0 rounded-full",
    leftIcon: "discount",
  },
];

function getBackHref(
  productType: CheckoutProductType,
  idProduk: string,
  category?: string,
) {
  if (productType === "course") {
    return "/course";
  }

  const normalizedCategory = category?.trim().toLowerCase();
  if (normalizedCategory === "bumn" || normalizedCategory === "cpns") {
    return `/tryout/${normalizedCategory}/${idProduk}/preview`;
  }

  return "/tryout";
}

function parseCheckoutAmount(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function getCheckoutPreviewErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as FetchBaseQueryError).data === "object" &&
    (error as FetchBaseQueryError).data !== null
  ) {
    const data = (error as FetchBaseQueryError)
      .data as Partial<ExamApiErrorResponse>;
    if (typeof data.message === "string" && data.message.length > 0) {
      return data.message;
    }
  }
  return "Gagal memuat detail pesanan. Silakan coba lagi.";
}

export default function CheckoutPage({
  idProduk,
  productType,
}: CheckoutPageProps) {
  const couponFormRef = useRef<FormHandle>(null);
  const transferProofInputRef = useRef<HTMLInputElement>(null);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<
    PaymentMethod["id"] | null
  >(null);
  const [copyLabel, setCopyLabel] = useState("Copy No. Rekening");
  const [transferProofUrl, setTransferProofUrl] = useState<string | null>(null);
  const [isProofPreviewOpen, setIsProofPreviewOpen] = useState(false);
  const [couponSummary, setCouponSummary] =
    useState<ApplyExamCouponSummary | null>(null);
  const [applyExamCoupon, { isLoading: isApplyingCoupon }] =
    useApplyExamCouponMutation();

  const numericId = /^\d+$/.test(idProduk) ? Number(idProduk) : null;
  const idArg = numericId !== null && numericId > 0 ? numericId : null;

  const tryoutQuery = useGetExamCheckoutPreviewQuery(
    productType === "tryout" && idArg !== null ? idArg : skipToken,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  const courseQuery = useGetCourseCheckoutPreviewQuery(
    productType === "course" && idArg !== null ? idArg : skipToken,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  const activeQuery = productType === "tryout" ? tryoutQuery : courseQuery;
  const preview = activeQuery.data;
  const isLoading = activeQuery.isLoading;
  const isError = activeQuery.isError;
  const refetch = activeQuery.refetch;

  const handleApplyCoupon = async (data: Record<string, unknown>) => {
    const couponCode = String(data.couponCode ?? "").trim();

    if (!couponCode) {
      couponFormRef.current?.setError("couponCode", {
        type: "manual",
        message: "Kode kupon wajib diisi.",
      });
      return;
    }

    if (productType !== "tryout" || idArg === null) {
      couponFormRef.current?.setError("couponCode", {
        type: "manual",
        message: "Voucher hanya tersedia untuk checkout tryout.",
      });
      return;
    }

    try {
      const response = await applyExamCoupon({
        couponCode,
        examId: idArg,
      }).unwrap();

      couponFormRef.current?.clearErrors("couponCode");
      setCouponSummary(response.summary);
    } catch (error) {
      const parsed = parseApplyExamCouponMutationError(error);

      if (parsed?.errors && couponFormRef.current) {
        applyExamCouponFieldErrors(
          couponFormRef.current.setError,
          parsed.errors,
        );
        return;
      }

      couponFormRef.current?.setError("couponCode", {
        type: "server",
        message:
          parsed?.message || "Gagal menerapkan voucher. Silakan coba lagi.",
      });
    }
  };

  const handleCopyAccountNumber = async (accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopyLabel("Berhasil Dicopy");
    } catch {
      setCopyLabel("Gagal Copy");
    }

    window.setTimeout(() => {
      setCopyLabel("Copy No. Rekening");
    }, 1400);
  };

  const handleTogglePaymentMethod = (methodId: PaymentMethod["id"]) => {
    setSelectedPaymentMethodId((currentMethodId) =>
      currentMethodId === methodId ? null : methodId,
    );
  };

  useEffect(() => {
    return () => {
      if (transferProofUrl) {
        URL.revokeObjectURL(transferProofUrl);
      }
    };
  }, [transferProofUrl]);

  const handleTransferProofChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    if (transferProofUrl) {
      URL.revokeObjectURL(transferProofUrl);
    }

    const localPreviewUrl = URL.createObjectURL(selectedFile);
    setTransferProofUrl(localPreviewUrl);
    setIsProofPreviewOpen(false);
  };

  const basePriceAmount = preview ? parseCheckoutAmount(preview.price) : 0;
  const baseTotalAmount = preview
    ? parseCheckoutAmount(preview.totalPayment)
    : 0;
  const priceAmount = couponSummary?.originalPrice ?? basePriceAmount;
  const discountAmount = couponSummary?.discount ?? 0;
  const totalAmount = couponSummary?.totalPay ?? baseTotalAmount;

  const invalidId = idArg === null;

  return (
    <section className="space-y-4">
      <div className="rounded-card-medium border border-neutral-3 bg-neutral-1 p-4 sm:p-6">
        <Link
          href={getBackHref(productType, idProduk, preview?.category)}
          className="group inline-flex items-center gap-2 text-s1 text-neutral-6"
        >
          <div className="bg-primary-4 group-hover:bg-primary-5 rounded-full p-2.25 transition-colors">
            <Icon name="arrow-left-circle" size={15} />
          </div>
          <span>Kembali</span>
        </Link>

        <h1 className="mt-6 text-h3 text-neutral-6">Detail Pesanan</h1>

        {invalidId ? (
          <div className="mt-6 rounded-3xl border border-neutral-3 p-6">
            <p className="text-b2 text-neutral-6">ID produk tidak valid.</p>
          </div>
        ) : isLoading ? (
          <div className="mt-6 rounded-3xl border border-neutral-3 p-6 text-b2 text-neutral-6">
            Memuat detail pesanan...
          </div>
        ) : isError || !preview ? (
          <div className="mt-6 rounded-3xl border border-neutral-3 p-6">
            <p className="text-b2 text-neutral-6">
              {isError
                ? getCheckoutPreviewErrorMessage(activeQuery.error)
                : "Data pesanan tidak tersedia."}
            </p>
            {isError ? (
              <button
                type="button"
                onClick={() => void refetch()}
                className={cn(
                  buttonVariants({ size: "default" }),
                  "mt-4 rounded-full text-s1 text-white bg-red hover:bg-red/75",
                )}
              >
                Coba Lagi
              </button>
            ) : null}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-neutral-3 p-4 sm:p-6">
            <section>
              <h2 className="text-s1 text-neutral-6">Nama Item</h2>
              <p className="mt-2 text-b2 text-neutral-5">{preview.examName}</p>
              {preview.category ? (
                <p className="mt-1 text-c1 text-neutral-5">
                  {preview.category}
                </p>
              ) : null}
            </section>

            {preview.includedSubExams.length > 0 ? (
              <section className="mt-6">
                <h2 className="text-s1 text-neutral-6">Termasuk</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-b2 text-neutral-5">
                  {preview.includedSubExams.map((label) => (
                    <li key={label}>{label}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="mt-6">
              <h2 className="text-s1 text-neutral-6">Diskon Tambahan</h2>
              <Form
                ref={couponFormRef}
                inputData={couponInputData}
                onSubmitForm={handleApplyCoupon}
                className="mt-3 gap-3"
              >
                <button
                  type="submit"
                  disabled={
                    isApplyingCoupon ||
                    productType !== "tryout" ||
                    idArg === null
                  }
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "h-fit col-span-12 lg:col-span-4 rounded-full px-10 text-s1 text-neutral-1 lg:justify-self-end disabled:cursor-not-allowed disabled:opacity-60",
                  )}
                >
                  {isApplyingCoupon ? "Memproses..." : "Gunakan"}
                </button>
              </Form>
              {couponSummary?.couponUsed ? (
                <p className="mt-2 text-c1 text-primary-5">
                  Voucher aktif: {couponSummary.couponUsed}
                </p>
              ) : null}
            </section>

            <section className="mt-6">
              <h2 className="text-s1 text-neutral-6">Metode Pembayaran</h2>

              <div className="mt-4 space-y-1">
                {paymentMethods.map((method) => {
                  const isSelected = method.id === selectedPaymentMethodId;

                  return (
                    <div key={method.id}>
                      <button
                        type="button"
                        onClick={() => handleTogglePaymentMethod(method.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-full border border-transparent px-3 py-3 text-left transition-colors cursor-pointer",
                          isSelected
                            ? "bg-primary-4 text-neutral-1"
                            : "text-neutral-6",
                        )}
                      >
                        <span
                          className={cn(
                            "size-5 rounded-full border",
                            isSelected
                              ? "border-neutral-1 bg-primary-5"
                              : "border-neutral-4 bg-neutral-1",
                          )}
                        />
                        <span className="rounded-lg border border-neutral-3 bg-white px-2 py-1 text-c1 text-neutral-6">
                          {method.type === "qris"
                            ? "QRIS"
                            : method.bankName.replace("Bank ", "")}
                        </span>
                        <span className="text-s1">{method.label}</span>
                      </button>
                      {isSelected ? (
                        <div className="mt-3 rounded-2xl border border-neutral-3 bg-neutral-2 p-4">
                          {method.type === "qris" ? (
                            <div>
                              <p className="text-s1 text-neutral-6">
                                Kode QRIS
                              </p>
                              <div className="mt-3 overflow-hidden rounded-xl border border-neutral-3 bg-white p-3">
                                <Image
                                  src={qrisImage}
                                  alt="Kode QRIS"
                                  className="mx-auto h-auto w-full max-w-xs rounded-lg"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <p className="text-s1 text-neutral-6">
                                {method.bankName} - {method.accountName}
                              </p>
                              <p className="text-h4 text-neutral-6">
                                {method.accountNumber}
                              </p>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyAccountNumber(method.accountNumber)
                                }
                                className={cn(
                                  buttonVariants({
                                    variant: "outline",
                                    size: "sm",
                                  }),
                                  "rounded-full text-s1 px-8 py-5",
                                )}
                              >
                                {copyLabel}
                              </button>
                            </div>
                          )}
                        </div>
                      ) : null}
                      <div className="my-1 h-px bg-neutral-3" />
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mt-6">
              <h2 className="text-s1 text-neutral-6">Ringkasan Pesanan</h2>

              <div className="mt-3 space-y-2 border-b border-neutral-3 pb-4 text-b2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-5">Harga Paket</span>
                  <span className="font-semibold text-neutral-6">
                    {formatToCurrency(priceAmount)}
                  </span>
                </div>
                {preview.adminFee > 0 ? (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-neutral-5">Biaya Admin</span>
                    <span className="font-semibold text-neutral-6">
                      {formatToCurrency(preview.adminFee)}
                    </span>
                  </div>
                ) : null}
                {discountAmount > 0 ? (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-neutral-5">Diskon</span>
                    <span className="font-semibold text-primary-5">
                      -{formatToCurrency(discountAmount)}
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="flex items-center justify-between gap-4 py-4 border-b border-neutral-3">
                <span className="text-s1 text-neutral-6">Total Pembayaran</span>
                <span className="text-h4 text-red">
                  {formatToCurrency(totalAmount)}
                </span>
              </div>
            </section>

            <section className="mt-6">
              <h2 className="text-s1 text-neutral-6">Bukti Transfer</h2>
              <p className="mt-1 text-c1 text-neutral-5">
                Upload gambar bukti transfer (JPG, JPEG, PNG).
              </p>

              <input
                ref={transferProofInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleTransferProofChange}
                className="hidden"
              />

              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => transferProofInputRef.current?.click()}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "rounded-full text-s1 px-6 py-5",
                  )}
                >
                  {transferProofUrl
                    ? "Ganti Bukti Transfer"
                    : "Upload Bukti Transfer"}
                </button>
              </div>

              {transferProofUrl ? (
                <button
                  type="button"
                  onClick={() => setIsProofPreviewOpen(true)}
                  className="mt-3 block w-fit rounded-2xl border border-neutral-3 bg-neutral-2 p-2 transition hover:border-primary-5"
                >
                  <Image
                    src={transferProofUrl}
                    alt="Preview bukti transfer"
                    width={200}
                    height={200}
                    className="h-32 w-32 rounded-xl object-cover"
                    unoptimized
                  />
                </button>
              ) : null}
            </section>

            <button
              type="button"
              className={cn(
                buttonVariants({ size: "default" }),
                "mt-8 w-full rounded-full text-s1",
              )}
            >
              Bayar Sekarang
            </button>
          </div>
        )}
      </div>

      {isProofPreviewOpen && transferProofUrl ? (
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
                src={transferProofUrl}
                alt="Bukti transfer fullscreen"
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
