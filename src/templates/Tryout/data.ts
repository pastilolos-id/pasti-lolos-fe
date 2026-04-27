export type TryoutCategory = "cpns" | "bumn";

export interface TryoutSection {
  id: string;
  title: string;
  totalQuestions: number;
  passingGrade: number;
}

export interface TryoutItem {
  id: string;
  title: string;
  totalQuestions: number;
  durationMinutes: number;
  price: number;
  specialPrice?: number;
  originalPrice?: number;
  sections: TryoutSection[];
}

export interface TryoutListContent {
  bannerSubtitle: string;
  bannerTitle: string;
  items: TryoutItem[];
}

const cpnsTryouts: TryoutItem[] = [
  {
    id: "cpns-1",
    title: "TryOut Challenge 12",
    totalQuestions: 110,
    durationMinutes: 100,
    price: 299000,
    sections: [
      {
        id: "cpns-2-a",
        title: "Tes Wawasan Kebangsaan",
        totalQuestions: 30,
        passingGrade: 65,
      },
      {
        id: "cpns-2-b",
        title: "Tes Intelegensia Umum",
        totalQuestions: 35,
        passingGrade: 80,
      },
      {
        id: "cpns-2-c",
        title: "Tes Karakteristik Pribadi",
        totalQuestions: 45,
        passingGrade: 166,
      },
    ],
  },
  {
    id: "cpns-2",
    title: "Tes Verbal",
    totalQuestions: 110,
    durationMinutes: 100,
    price: 299000,
    specialPrice: 299000,
    originalPrice: 399000,
    sections: [
      {
        id: "cpns-1-a",
        title: "Tes Wawasan Kebangsaan",
        totalQuestions: 30,
        passingGrade: 65,
      },
      {
        id: "cpns-1-b",
        title: "Tes Intelegensia Umum",
        totalQuestions: 35,
        passingGrade: 80,
      },
      {
        id: "cpns-1-c",
        title: "Tes Karakteristik Pribadi",
        totalQuestions: 45,
        passingGrade: 166,
      },
    ],
  },
  {
    id: "cpns-3",
    title: "TryOut Challenge 12",
    totalQuestions: 110,
    durationMinutes: 100,
    price: 299000,
    sections: [
      {
        id: "cpns-3-a",
        title: "Tes Wawasan Kebangsaan",
        totalQuestions: 30,
        passingGrade: 65,
      },
      {
        id: "cpns-3-b",
        title: "Tes Intelegensia Umum",
        totalQuestions: 35,
        passingGrade: 80,
      },
      {
        id: "cpns-3-c",
        title: "Tes Karakteristik Pribadi",
        totalQuestions: 45,
        passingGrade: 166,
      },
    ],
  },
  {
    id: "cpns-4",
    title: "TryOut Challenge 12",
    totalQuestions: 110,
    durationMinutes: 100,
    price: 299000,
    sections: [
      {
        id: "cpns-4-a",
        title: "Tes Wawasan Kebangsaan",
        totalQuestions: 30,
        passingGrade: 65,
      },
      {
        id: "cpns-4-b",
        title: "Tes Intelegensia Umum",
        totalQuestions: 35,
        passingGrade: 80,
      },
      {
        id: "cpns-4-c",
        title: "Tes Karakteristik Pribadi",
        totalQuestions: 45,
        passingGrade: 166,
      },
    ],
  },
];

const bumnTryouts: TryoutItem[] = [
  {
    id: "bumn-1",
    title: "TryOut Challenge 12",
    totalQuestions: 110,
    durationMinutes: 100,
    price: 299000,
    sections: [
      {
        id: "bumn-2-a",
        title: "Tes Wawasan Kebangsaan",
        totalQuestions: 30,
        passingGrade: 65,
      },
      {
        id: "bumn-2-b",
        title: "Tes Intelegensia Umum",
        totalQuestions: 35,
        passingGrade: 80,
      },
      {
        id: "bumn-2-c",
        title: "Tes Karakteristik Pribadi",
        totalQuestions: 45,
        passingGrade: 166,
      },
    ],
  },
  {
    id: "bumn-2",
    title: "TryOut Challenge 12",
    totalQuestions: 110,
    durationMinutes: 100,
    price: 299000,
    sections: [
      {
        id: "bumn-3-a",
        title: "Tes Wawasan Kebangsaan",
        totalQuestions: 30,
        passingGrade: 65,
      },
      {
        id: "bumn-3-b",
        title: "Tes Intelegensia Umum",
        totalQuestions: 35,
        passingGrade: 80,
      },
      {
        id: "bumn-3-c",
        title: "Tes Karakteristik Pribadi",
        totalQuestions: 45,
        passingGrade: 166,
      },
    ],
  },
  {
    id: "bumn-3",
    title: "Tes Verbal",
    totalQuestions: 110,
    durationMinutes: 100,
    price: 299000,
    specialPrice: 299000,
    originalPrice: 399000,
    sections: [
      {
        id: "bumn-1-a",
        title: "Tes Wawasan Kebangsaan",
        totalQuestions: 30,
        passingGrade: 65,
      },
      {
        id: "bumn-1-b",
        title: "Tes Intelegensia Umum",
        totalQuestions: 35,
        passingGrade: 80,
      },
      {
        id: "bumn-1-c",
        title: "Tes Karakteristik Pribadi",
        totalQuestions: 45,
        passingGrade: 166,
      },
    ],
  },
  {
    id: "bumn-4",
    title: "TryOut Challenge 12",
    totalQuestions: 110,
    durationMinutes: 100,
    price: 299000,
    sections: [
      {
        id: "bumn-4-a",
        title: "Tes Wawasan Kebangsaan",
        totalQuestions: 30,
        passingGrade: 65,
      },
      {
        id: "bumn-4-b",
        title: "Tes Intelegensia Umum",
        totalQuestions: 35,
        passingGrade: 80,
      },
      {
        id: "bumn-4-c",
        title: "Tes Karakteristik Pribadi",
        totalQuestions: 45,
        passingGrade: 166,
      },
    ],
  },
];

const tryoutContentByCategory: Record<TryoutCategory, TryoutListContent> = {
  cpns: {
    bannerSubtitle: "Siap hadapi tes CPNS",
    bannerTitle: "Gass mulai latihan Tryout buat CPNS tahun ini",
    items: cpnsTryouts,
  },
  bumn: {
    bannerSubtitle: "Siap hadapi tes BUMN",
    bannerTitle: "Gass mulai latihan Tryout buat BUMN tahun ini",
    items: bumnTryouts,
  },
};

export function getTryoutListContent(
  category: TryoutCategory,
): TryoutListContent {
  return tryoutContentByCategory[category];
}

export function getTryoutById(
  category: TryoutCategory,
  id: string,
): TryoutItem | null {
  return (
    tryoutContentByCategory[category].items.find((item) => item.id === id) ??
    null
  );
}
