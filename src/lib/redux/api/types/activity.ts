/** GET /students/activity — item aktivitas dalam array `data`. */
export type StudentActivityApiType = "tryout" | "materi" | (string & {});

/** Status dari backend; UI memetakan ke ActivityStatus di template. */
export type StudentActivityApiStatus = string;

/** Sub-ujian (bentuk baru API). */
export interface StudentSubExam {
  userExamId: number;
  examName: string;
  score: number | null;
  status: string;
  finishedAt: string | null;
}

/** Sub-ujian / bentuk lama `children`. */
export interface StudentActivityChild {
  userExamId: number;
  examName: string;
  score: string | number | null;
  status: string;
  finishedAt: string | null;
}

/**
 * Satu baris aktivitas — mendukung payload baru (`examName`, `subExams`, `myStatus`, …)
 * dan bentuk lama (`title`, `children`, …).
 */
export interface StudentActivityItem {
  id: number;
  userExamId?: number;
  examName?: string;
  description?: string;
  examType?: string;
  price?: number;
  durationMinutes?: number;
  subject?: { subjectName?: string };
  myStatus?: string;
  myScore?: number | null;
  date: string;
  subExams?: StudentSubExam[];
  _count?: { examQuestions?: number };
  /** Bentuk lama */
  title?: string;
  type?: StudentActivityApiType;
  status?: StudentActivityApiStatus;
  formattedDate?: string;
  score?: number | null;
  isPackage?: boolean;
  children?: StudentActivityChild[];
  progress?: number | null;
}

export interface StudentActivitiesMeta {
  total: number;
  page: number;
  lastPage: number;
  limit: number;
}

export interface StudentActivitiesSuccessResponse {
  message?: string;
  data: StudentActivityItem[];
  meta?: StudentActivitiesMeta;
}
