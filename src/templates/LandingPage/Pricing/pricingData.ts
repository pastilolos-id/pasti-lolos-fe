type planBenefit = {
  order: number;
  isInclude: boolean;
  name: string;
};

type planDataType = {
  id: number;
  title: string;
  price: number;
  isRecommended: boolean;
  benefitList: planBenefit[];
};

const planData: planDataType[] = [
  {
    id: 1,
    title: "Tryout CPNS 2026 - Paket 1",
    price: 13000,
    isRecommended: false,
    benefitList: [
      {
        order: 1,
        isInclude: true,
        name: "TWK: Tes Wawasan Kebangsaan",
      },
      {
        order: 2,
        isInclude: true,
        name: "TKP: Tes Karakteristik Pribadi",
      },
      {
        order: 3,
        isInclude: true,
        name: "TIU: Tes Intelegensi Umum",
      },
      // {
      //   order: 4,
      //   isInclude: true,
      //   name: "Bisa diakses kapan saja, di mana saja",
      // },
      // {
      //   order: 5,
      //   isInclude: false,
      //   name: "Tidak termasuk materi",
      // },
    ],
  },
  {
    id: 2,
    title: "Tryout CPNS 2026 - Paket 2",
    price: 13000,
    isRecommended: true,
    benefitList: [
      {
        order: 1,
        isInclude: true,
        name: "TWK: Tes Wawasan Kebangsaan",
      },
      {
        order: 2,
        isInclude: true,
        name: "TKP: Tes Karakteristik Pribadi",
      },
      {
        order: 3,
        isInclude: true,
        name: "TIU: Tes Intelegensi Umum",
      },
      // {
      //   order: 4,
      //   isInclude: true,
      //   name: "Bisa diakses kapan saja, di mana saja",
      // },
      // {
      //   order: 5,
      //   isInclude: true,
      //   name: "Termasuk materi",
      // },
    ],
  },
];

export { planData };
