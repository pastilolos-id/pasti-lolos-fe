import type { FilterType } from "@/components";
import { getPaymentMethodConfigByLabel } from "@/lib/constants/paymentMethods";
import type {
  OrderHistoryDetailSuccessResponse,
  OrderHistoryEntry,
  OrderHistoryPaymentMethod,
} from "@/lib/redux/api/types/orders";

export type PurchaseStatusKey =
  | "berhasil"
  | "menunggu"
  | "gagal"
  | "kadaluarsa";

export type ProviderKey = "QRIS" | "BNI" | "Mandiri" | "BRI" | "BCA";

export interface PurchaseListViewModel {
  id: string;
  title: string;
  dateLabel: string;
  statusKey: PurchaseStatusKey;
  grandTotal: number;
  providerKey: ProviderKey | null;
  paymentMethodLabel: string;
  filterType: Exclude<FilterType, "semua">;
}

export interface PurchaseDetailViewModel {
  id: string;
  title: string;
  transactionCode: string;
  transactionTime: string;
  statusKey: Exclude<PurchaseStatusKey, "kadaluarsa">;
  paymentMethodLabel: string;
  providerKey: ProviderKey | null;
  providerDisplayName: string;
  accountName: string;
  accountNumber: string;
  price: number;
  originalPrice: number;
  discount: number;
  receiptUrl: string | null;
}

const paymentMethodToProviderKey: Record<
  OrderHistoryPaymentMethod,
  ProviderKey
> = {
  QRIS: "QRIS",
  "Bank BNI": "BNI",
  "Bank Mandiri": "Mandiri",
  "Bank BRI": "BRI",
  "Bank BCA": "BCA",
};

export function getProviderKeyFromPaymentMethod(
  paymentMethod: string,
): ProviderKey | null {
  if (paymentMethod in paymentMethodToProviderKey) {
    return paymentMethodToProviderKey[
      paymentMethod as OrderHistoryPaymentMethod
    ];
  }
  return null;
}

export function mapOrderStatus(status: string): PurchaseStatusKey {
  if (status === "completed") {
    return "berhasil";
  }
  if (status === "pending") {
    return "menunggu";
  }
  return "gagal";
}

export function mapItemTypeToFilter(
  itemType: string,
): Exclude<FilterType, "semua"> {
  if (itemType === "exam") {
    return "tryout";
  }
  return "materi";
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function formatOrderDate(dateIso: string): string {
  const date = new Date(dateIso);
  if (Number.isNaN(date.getTime())) {
    return dateIso;
  }
  return dateFormatter.format(date);
}

export function formatOrderDateTimeLabel(dateIso: string): string {
  const date = new Date(dateIso);
  if (Number.isNaN(date.getTime())) {
    return dateIso;
  }

  const parts = dateTimeFormatter.formatToParts(date);
  const day = parts.find((part) => part.type === "day")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const year = parts.find((part) => part.type === "year")?.value ?? "";
  const hour = parts.find((part) => part.type === "hour")?.value ?? "";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "";

  return `Tgl : ${day} ${month} ${year}, Jam ${hour}:${minute}`;
}

export function parsePriceValue(value: string | number): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function mapOrderHistoryEntryToUi(
  entry: OrderHistoryEntry,
): PurchaseListViewModel {
  const firstItem = entry.items[0];
  return {
    id: String(entry.id),
    title: firstItem?.itemName ?? "-",
    dateLabel: formatOrderDate(entry.date),
    statusKey: mapOrderStatus(entry.status),
    grandTotal: parsePriceValue(entry.grandTotal),
    providerKey: getProviderKeyFromPaymentMethod(entry.paymentMethod),
    paymentMethodLabel: entry.paymentMethod,
    filterType: mapItemTypeToFilter(firstItem?.itemType ?? ""),
  };
}

export function mapOrderHistoryDetailToUi(
  response: OrderHistoryDetailSuccessResponse,
): PurchaseDetailViewModel {
  const entry = response.data;
  const firstItem = entry.items[0];
  const paymentMethodLabel = entry.paymentMethod ?? "-";
  const paymentMethodConfig = getPaymentMethodConfigByLabel(paymentMethodLabel);

  return {
    id: String(entry.orderId ?? entry.id ?? ""),
    title: firstItem?.itemName ?? "-",
    transactionCode: entry.transactionCode ?? "-",
    transactionTime: formatOrderDateTimeLabel(entry.createdAt ?? ""),
    statusKey: mapOrderStatus(entry.status),
    paymentMethodLabel,
    providerKey: getProviderKeyFromPaymentMethod(paymentMethodLabel),
    providerDisplayName: paymentMethodLabel.replace(/^Bank\s+/i, ""),
    accountName: paymentMethodConfig?.accountName ?? "-",
    accountNumber: paymentMethodConfig?.accountNumber ?? "-",
    price: parsePriceValue(entry.grandTotal),
    originalPrice: parsePriceValue(entry.totalAmount ?? 0),
    discount: parsePriceValue(entry.discount ?? 0),
    receiptUrl: entry.paymentInfo?.receiptUrl ?? null,
  };
}
