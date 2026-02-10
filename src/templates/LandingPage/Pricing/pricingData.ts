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
    title: "Paket Tryout Basic",
    price: 250000,
    isRecommended: false,
    benefitList: [
      {
        order: 1,
        isInclude: true,
        name: "Soal-soal Tryout",
      },
      {
        order: 2,
        isInclude: true,
        name: "Lifetime acces",
      },
      {
        order: 3,
        isInclude: true,
        name: "Pembahasan soal",
      },
      {
        order: 4,
        isInclude: true,
        name: "Bisa diakses kapan saja, di mana saja",
      },
      {
        order: 5,
        isInclude: false,
        name: "Tidak termasuk materi",
      },
    ],
  },
  {
    id: 2,
    title: "Paket Tryout Intensif",
    price: 350000,
    isRecommended: true,
    benefitList: [
      {
        order: 1,
        isInclude: true,
        name: "Soal-soal Tryout",
      },
      {
        order: 2,
        isInclude: true,
        name: "Lifetime acces",
      },
      {
        order: 3,
        isInclude: true,
        name: "Pembahasan soal",
      },
      {
        order: 4,
        isInclude: true,
        name: "Bisa diakses kapan saja, di mana saja",
      },
      {
        order: 5,
        isInclude: true,
        name: "Termasuk materi",
      },
    ],
  },
];

export { planData };
