import type { Activity, MaterialActivity, TryoutActivity } from "./types";

const tryoutsData: TryoutActivity[] = [
  {
    id: "1",
    type: "tryout",
    title: "Bahasa Indonesia",
    status: "selesai",
    date: "Kamis, 29/01/2026",
    score: 334,
    maxScore: 100,
    color: "green",
  },
  {
    id: "2",
    type: "tryout",
    title: "Bahasa Indonesia",
    status: "belum_dimulai",
    date: "Kamis, 29/01/2026",
    score: 100,
    maxScore: 100,
    color: "red",
  },
  {
    id: "3",
    type: "tryout",
    title: "Bahasa Indonesia",
    status: "selesai",
    date: "Kamis, 29/01/2026",
    score: 247,
    maxScore: 100,
    color: "yellow",
  },
  {
    id: "4",
    type: "tryout",
    title: "Bahasa Indonesia",
    status: "kadaluarsa",
    date: "Kamis, 29/01/2026",
    maxScore: 100,
    color: "gray",
  },
];

const materialsData: MaterialActivity[] = [
  {
    id: "5",
    type: "materi",
    title: "Bahasa Indonesia",
    status: "selesai",
    date: "Kamis, 29/01/2026",
    progress: 100,
    color: "blue",
  },
  {
    id: "6",
    type: "materi",
    title: "Bahasa Indonesia",
    status: "belum_dimulai",
    date: "Kamis, 29/01/2026",
    progress: 78,
    color: "blue",
  },
  {
    id: "7",
    type: "materi",
    title: "Bahasa Indonesia",
    status: "belum_dimulai",
    date: "Kamis, 29/01/2026",
    progress: 0,
    color: "blue",
  },
  {
    id: "8",
    type: "materi",
    title: "Bahasa Indonesia",
    status: "kadaluarsa",
    date: "Kamis, 29/01/2026",
    progress: 0,
    color: "gray",
  },
];

const mockActivities: Activity[] = [...tryoutsData, ...materialsData];

export { mockActivities };
