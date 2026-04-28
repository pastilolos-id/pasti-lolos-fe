import type { FilterType } from "@/components";

export type PurchaseStatus = "berhasil" | "gagal" | "kadaluarsa" | "menunggu";

export interface PurchaseItem {
  id: string;
  provider: string;
  providerLogo: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  date: string;
  status: PurchaseStatus;
  type: FilterType;
  transactionCode: string;
  transactionTime: string;
  accountName: string;
  accountNumber: string;
  proofLabel: string;
}

// export type FilterType = "semua" | "tryout" | "materi";

export const purchasesData: PurchaseItem[] = [
  {
    id: "1",
    provider: "BNI",
    providerLogo: "BNI",
    title:
      "Curi Start Bimbel Persiapan Tes RBB 2026 (Tahap 1 dan Tahap 2) - Jenjang D3-S2 - Masa Aktif 1 Tahun",
    price: 299000,
    originalPrice: 600000,
    discount: 300000,
    date: "28 Januari 2026",
    status: "berhasil",
    type: "tryout",
    transactionCode: "TRANS040221",
    transactionTime: "Tgl : 28 Januari 2026, Jam 10:20",
    accountName: "an Iqbal EEE",
    accountNumber: "03123456789",
    proofLabel: "Upload",
  },
  {
    id: "2",
    provider: "Dana",
    providerLogo: "Dana",
    title:
      "Curi Start Bimbel Persiapan Tes RBB 2026 (Tahap 1 dan Tahap 2) - Jenjang D3-S2 - Masa Aktif 1 Tahun",
    price: 299000,
    originalPrice: 600000,
    discount: 300000,
    date: "28 Januari 2026",
    status: "gagal",
    type: "materi",
    transactionCode: "TRANS040222",
    transactionTime: "Tgl : 28 Januari 2026, Jam 11:45",
    accountName: "an Iqbal EEE",
    accountNumber: "08123456789",
    proofLabel: "Upload",
  },
  {
    id: "3",
    provider: "Mandiri",
    providerLogo: "Mandiri",
    title:
      "Curi Start Bimbel Persiapan Tes RBB 2026 (Tahap 1 dan Tahap 2) - Jenjang D3-S2 - Masa Aktif 1 Tahun",
    price: 299000,
    originalPrice: 600000,
    discount: 300000,
    date: "28 Januari 2026",
    status: "menunggu",
    type: "tryout",
    transactionCode: "TRANS040223",
    transactionTime: "Tgl : 28 Januari 2026, Jam 12:10",
    accountName: "an Iqbal EEE",
    accountNumber: "09123456789",
    proofLabel: "Upload",
  },
  {
    id: "4",
    provider: "BNI",
    providerLogo: "BNI",
    title:
      "Curi Start Bimbel Persiapan Tes RBB 2026 (Tahap 1 dan Tahap 2) - Jenjang D3-S2 - Masa Aktif 1 Tahun",
    price: 299000,
    originalPrice: 600000,
    discount: 300000,
    date: "28 Januari 2026",
    status: "kadaluarsa",
    type: "tryout",
    transactionCode: "TRANS040224",
    transactionTime: "Tgl : 04 Februari 2026, Jam 13:40",
    accountName: "an Iqbal EEE",
    accountNumber: "03123456789",
    proofLabel: "Upload",
  },
  {
    id: "5",
    provider: "BNI",
    providerLogo: "BNI",
    title:
      "Curi Start Bimbel Persiapan Tes RBB 2026 (Tahap 1 dan Tahap 2) - Jenjang D3-S2 - Masa Aktif 1 Tahun",
    price: 299000,
    originalPrice: 600000,
    discount: 300000,
    date: "27 Januari 2026",
    status: "berhasil",
    type: "materi",
    transactionCode: "TRANS040225",
    transactionTime: "Tgl : 27 Januari 2026, Jam 09:05",
    accountName: "an Iqbal EEE",
    accountNumber: "03123456789",
    proofLabel: "Upload",
  },
];

export function getPurchaseById(id: string) {
  return purchasesData.find((item) => item.id === id) ?? null;
}

const tryoutPurchaseMap = {
  cpns: {
    "cpns-1": "4",
    "cpns-2": "1",
    "cpns-3": "3",
    "cpns-4": "1",
  },
  bumn: {
    "bumn-1": "4",
    "bumn-2": "1",
    "bumn-3": "3",
    "bumn-4": "1",
  },
} as const;

export function getPurchaseIdFromTryout(
  category: keyof typeof tryoutPurchaseMap,
  tryoutId: string,
) {
  return (
    tryoutPurchaseMap[category][
      tryoutId as keyof (typeof tryoutPurchaseMap)[typeof category]
    ] ?? "4"
  );
}
