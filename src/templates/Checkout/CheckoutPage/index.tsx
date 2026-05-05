"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import qrisImage from "@/assets/images/QRIS.jpeg";
import { Form, type FormHandle, Icon } from "@/components";
import type { inputDataType } from "@/components/Form/InputElement/types";
import { buttonVariants } from "@/components/ui";
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

const validCouponCodes = new Set(["HEMAT50", "PASTILULUS"]);
const couponInputData: inputDataType[] = [
  {
    type: "text",
    name: "couponCode",
    label: "Kode Kupon",
    placeholder: "Contoh : DISKON2025%",
    className: "col-span-12 lg:col-span-8 [&_[data-slot=field-label]]:hidden",
    leftIcon: "fluent-textbox-blue",
  },
];

function getBackHref(productType: CheckoutProductType) {
  if (productType === "course") {
    return "/course";
  }

  return "/tryout";
}

export default function CheckoutPage({
  idProduk,
  productType,
}: CheckoutPageProps) {
  const couponFormRef = useRef<FormHandle>(null);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
    useState<PaymentMethod["id"]>("qris");
  const [copyLabel, setCopyLabel] = useState("Copy No. Rekening");

  const itemName =
    productType === "course"
      ? `Course Premium #${idProduk}`
      : `Tryout Premium #${idProduk}`;
  const originalPrice = 600_000;
  const discountPrice = 300_000;
  const totalPrice = originalPrice - discountPrice;

  const handleApplyCoupon = async (data: Record<string, unknown>) => {
    const couponCode = String(data.couponCode ?? "");
    const normalized = couponCode.trim().toUpperCase();

    if (!normalized || !validCouponCodes.has(normalized)) {
      couponFormRef.current?.setError("couponCode", {
        type: "manual",
        message: "Kode diskon yang kamu masukan tidak ada",
      });
      return;
    }

    couponFormRef.current?.clearErrors("couponCode");
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

  return (
    <section className="space-y-4">
      <div className="rounded-card-medium border border-neutral-3 bg-neutral-1 p-4 sm:p-6">
        <Link
          href={getBackHref(productType)}
          className="group inline-flex items-center gap-2 text-s1 text-neutral-6"
        >
          <div className="bg-primary-4 group-hover:bg-primary-5 rounded-full p-2.25 transition-colors">
            <Icon name="arrow-left-circle" size={15} />
          </div>
          <span>Kembali</span>
        </Link>

        <h1 className="mt-6 text-h3 text-neutral-6">Detail Pesanan</h1>

        <div className="mt-6 rounded-3xl border border-neutral-3 p-4 sm:p-6">
          <section>
            <h2 className="text-s1 text-neutral-6">Nama Item</h2>
            <p className="mt-2 text-b2 text-neutral-5">{itemName}</p>
          </section>

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
                className={cn(
                  buttonVariants({ size: "default" }),
                  "h-fit col-span-12 lg:col-span-4 rounded-full px-10 text-s1 text-neutral-1 lg:justify-self-end",
                )}
              >
                Gunakan
              </button>
            </Form>
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
                      onClick={() => setSelectedPaymentMethodId(method.id)}
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
                            <p className="text-s1 text-neutral-6">Kode QRIS</p>
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
                  {formatToCurrency(originalPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-neutral-5">Diskon</span>
                <span className="font-semibold text-neutral-6">
                  {formatToCurrency(discountPrice)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 py-4 border-b border-neutral-3">
              <span className="text-s1 text-neutral-6">Total Pembayaran</span>
              <span className="text-h4 text-red">
                {formatToCurrency(totalPrice)}
              </span>
            </div>
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
      </div>
    </section>
  );
}
