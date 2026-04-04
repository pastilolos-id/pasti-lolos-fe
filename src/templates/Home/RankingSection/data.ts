import type { TableCoulmnType } from "@/components";

const bumnColumns: TableCoulmnType[] = [
  {
    accessorKey: "name",
    title: "Nama",
    textPosition: "left",
  },
  {
    accessorKey: "tkd",
    title: "TKD",
  },
  {
    accessorKey: "akhlak",
    title: "Akhlak",
  },
  {
    accessorKey: "english",
    title: "B. Ing",
  },
];

const bumnTableData = [
  {
    id: 1,
    name: "Iqbal",
    tkd: 85,
    akhlak: 90,
    english: 88,
  },
  {
    id: 2,
    name: "Acep",
    tkd: 98,
    akhlak: 98,
    english: 98,
  },
  {
    id: 3,
    name: "Rizky",
    tkd: 92,
    akhlak: 87,
    english: 89,
  },
  {
    id: 4,
    name: "Dewi",
    tkd: 88,
    akhlak: 91,
    english: 90,
  },
  {
    id: 5,
    name: "Agus",
    tkd: 80,
    akhlak: 83,
    english: 85,
  },
  {
    id: 6,
    name: "Siti",
    tkd: 95,
    akhlak: 94,
    english: 93,
  },
  {
    id: 7,
    name: "Budi",
    tkd: 78,
    akhlak: 82,
    english: 80,
  },
  {
    id: 8,
    name: "Fajar",
    tkd: 89,
    akhlak: 86,
    english: 88,
  },
  {
    id: 9,
    name: "Putri",
    tkd: 91,
    akhlak: 92,
    english: 94,
  },
  {
    id: 10,
    name: "Andi",
    tkd: 84,
    akhlak: 88,
    english: 87,
  },
];

const cpnsColumns: TableCoulmnType[] = [
  {
    accessorKey: "name",
    title: "Nama",
    textPosition: "left",
  },
  {
    accessorKey: "twk",
    title: "TWK",
  },
  {
    accessorKey: "tiu",
    title: "TIU",
  },
  {
    accessorKey: "tkp",
    title: "TKP",
  },
  {
    accessorKey: "total",
    title: "Total Skor",
  },
];

const cpnsTableData = [
  {
    id: 1,
    name: "Iqbal",
    twk: 110,
    tiu: 125,
    tkp: 185,
    total: 420,
  },
  {
    id: 2,
    name: "Acep",
    twk: 130,
    tiu: 150,
    tkp: 210,
    total: 490,
  },
  {
    id: 3,
    name: "Rizky",
    twk: 105,
    tiu: 140,
    tkp: 195,
    total: 440,
  },
  {
    id: 4,
    name: "Dewi",
    twk: 115,
    tiu: 130,
    tkp: 200,
    total: 445,
  },
  {
    id: 5,
    name: "Agus",
    twk: 85,
    tiu: 110,
    tkp: 175,
    total: 370,
  },
  {
    id: 6,
    name: "Siti",
    twk: 125,
    tiu: 145,
    tkp: 205,
    total: 475,
  },
  {
    id: 7,
    name: "Budi",
    twk: 90,
    tiu: 100,
    tkp: 165,
    total: 355,
  },
  {
    id: 8,
    name: "Fajar",
    twk: 100,
    tiu: 120,
    tkp: 190,
    total: 410,
  },
  {
    id: 9,
    name: "Putri",
    twk: 120,
    tiu: 135,
    tkp: 198,
    total: 453,
  },
  {
    id: 10,
    name: "Andi",
    twk: 95,
    tiu: 115,
    tkp: 180,
    total: 390,
  },
];

export { bumnColumns, bumnTableData, cpnsColumns, cpnsTableData };
