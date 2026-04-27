import type { FilterType } from "@/components";

export interface PurchaseItem {
  id: string;
  provider: string;
  providerLogo: string;
  title: string;
  price: number;
  date: string;
  status: "berhasil" | "gagal" | "menunggu";
  type: FilterType;
}

// export type FilterType = "semua" | "tryout" | "materi";

export const purchasesData: PurchaseItem[] = [
  {
    id: "1",
    provider: "BNI",
    providerLogo: "BNI",
    title: "Bahasa Indonesia",
    price: 299000,
    date: "28 Januari 2026",
    status: "berhasil",
    type: "tryout",
  },
  {
    id: "2",
    provider: "Dana",
    providerLogo: "Dana",
    title: "Bahasa Indonesia",
    price: 299000,
    date: "28 Januari 2026",
    status: "gagal",
    type: "materi",
  },
  {
    id: "3",
    provider: "Mandiri",
    providerLogo: "Mandiri",
    title: "Bahasa Indonesia",
    price: 299000,
    date: "28 Januari 2026",
    status: "menunggu",
    type: "tryout",
  },
  {
    id: "4",
    provider: "Dana",
    providerLogo: "Dana",
    title: "Bahasa Indonesia",
    price: 299000,
    date: "28 Januari 2026",
    status: "menunggu",
    type: "tryout",
  },
  {
    id: "5",
    provider: "BNI",
    providerLogo: "BNI",
    title: "Bahasa Indonesia",
    price: 299000,
    date: "27 Januari 2026",
    status: "berhasil",
    type: "materi",
  },
];
