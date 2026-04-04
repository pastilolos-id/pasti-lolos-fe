type FlashSaleItemType = {
  title: string;
  normalPrice: number;
  discountPrice: number;
};

const flashSaleItems: FlashSaleItemType[] = [
  {
    title: "Materi BUMN tahun 2026",
    normalPrice: 399000,
    discountPrice: 299000,
  },
  {
    title: "Soal Tryout baru CPNS & BUMN ",
    normalPrice: 499000,
    discountPrice: 399000,
  },
  {
    title: "Full Paket Persiapan CPNS",
    normalPrice: 599000,
    discountPrice: 499000,
  },
];

export { flashSaleItems, type FlashSaleItemType };
