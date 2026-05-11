export type ActivityType = "tryout" | "tryout_package" | "materi";
export type ActivityStatus =
  | "kadaluarsa"
  | "selesai"
  | "belum_dimulai"
  | "sebagian_selesai";

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

/** Satu sub-ujian di dalam paket (setelah pemetaan dari API). */
export interface TryoutPackageChildRow {
  id: string;
  examName: string;
  status: ActivityStatus;
  /** Teks tanggal untuk blok sub-ujian (mis. dari finishedAt). */
  date: string;
  score?: number;
  color: TryoutActivity["color"];
}

/** Paket tryout dengan satu atau lebih sub-ujian. */
export interface TryoutPackageActivity extends ActivityBase {
  type: "tryout_package";
  children: TryoutPackageChildRow[];
  maxScore: number;
  /** Nilai ringkasan baris induk (mis. myScore) untuk kolom "Nilai". */
  summaryScore?: number;
  /** Warna kolom nilai induk. */
  color: TryoutActivity["color"];
}

export interface MaterialActivity extends ActivityBase {
  type: "materi";
  progress: number; // 0-100
  color: "blue" | "gray";
}

export type Activity =
  | TryoutActivity
  | TryoutPackageActivity
  | MaterialActivity;
