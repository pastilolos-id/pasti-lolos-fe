import type { FilterType } from "@/components";
import type {
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

export function formatOrderDate(dateIso: string): string {
  const date = new Date(dateIso);
  if (Number.isNaN(date.getTime())) {
    return dateIso;
  }
  return dateFormatter.format(date);
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
