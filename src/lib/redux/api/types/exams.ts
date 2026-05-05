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

export interface ExamPackageDetailSubExam {
  id: number;
  name: string;
  totalSoal: number;
  passingGrade: string;
  duration: number;
}

export interface ExamPackageDetailSuccessResponse {
  id: number;
  examName: string;
  description: string;
  price: number;
  totalDuration: number;
  totalQuestions: number;
  subject: string;
  subExams: ExamPackageDetailSubExam[];
}

export interface ExamApiErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

/** GET /exams/checkout-preview/:id & GET /course/checkout-preview/:id — course may mirror this shape until backend differs */
export interface CheckoutPreviewSuccessResponse {
  examId: number;
  examName: string;
  category: string;
  price: string;
  includedSubExams: string[];
  adminFee: number;
  totalPayment: string;
}
