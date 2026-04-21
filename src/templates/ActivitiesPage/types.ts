export type ActivityType = "tryout" | "materi";
export type ActivityStatus = "kadaluarsa" | "selesai" | "belum_dimulai";
export type FilterType = "semua" | "tryout" | "materi";

export interface ActivityBase {
  id: string;
  type: ActivityType;
  title: string;
  status: ActivityStatus;
  date: string;
  icon?: string;
}

export interface TryoutActivity extends ActivityBase {
  type: "tryout";
  score?: number;
  maxScore: number;
  color: "green" | "red" | "yellow" | "gray";
}

export interface MaterialActivity extends ActivityBase {
  type: "materi";
  progress: number; // 0-100
  color: "blue" | "gray";
}

export type Activity = TryoutActivity | MaterialActivity;

export interface ActivityListResponse {
  tryouts: TryoutActivity[];
  materials: MaterialActivity[];
}
