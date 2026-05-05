export type ExamCategoryParam = "CPNS" | "BUMN";

export interface ExamListItem {
  id: number;
  examName: string;
  description: string;
  examType: string;
  price: number;
  durationMinutes: number;
  subject: { subjectName: string };
  _count: { examQuestions: number };
}

export interface ExamsListMeta {
  total: number;
  page: number;
  lastPage: number;
  limit: number;
}

export interface ExamsListSuccessResponse {
  data: ExamListItem[];
  meta: ExamsListMeta;
}
