export type ExamCategoryParam = "CPNS" | "BUMN";

export interface ExamListItem {
  id: number;
  examName: string;
  description: string;
  examType: string;
  price: number;
  durationMinutes: number;
  /** Total soal paket (backend); prefer over _count saat aggregate */
  totalQuestions?: number;
  jumlahSoal?: number;
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
  userExamId: number | null;
  status: "submitted" | "not_started" | "in_progress";
  score?: number;
}

export interface ExamPackageDetailSuccessResponse {
  id: number;
  examName: string;
  description: string;
  price: number;
  isPurchased: boolean;
  purchaseStatus: "available" | "pending" | "completed";
  pendingOrderId: number | null;
  totalDuration: number;
  totalQuestions: number;
  subject: string;
  subExams: ExamPackageDetailSubExam[];
  totalPassingScore?: number;
}

export interface ExamApiErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export interface ApplyExamCouponRequest {
  couponCode: string;
  examId: number;
}

export interface ApplyExamCouponSummary {
  examName: string;
  originalPrice: number;
  discount: number;
  totalPay: number;
  couponUsed: string;
}

export interface ApplyExamCouponSuccessResponse {
  message: string;
  summary: ApplyExamCouponSummary;
}

export type ApplyExamCouponFieldErrors = Partial<
  Record<keyof ApplyExamCouponRequest, string[]>
>;

export interface ApplyExamCouponErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  errors?: ApplyExamCouponFieldErrors;
}

export type ExamCheckoutPaymentMethod =
  | "QRIS"
  | "Bank BNI"
  | "Bank Mandiri"
  | "Bank BRI"
  | "Bank BCA";

export interface CheckoutExamPaymentRequest {
  examId: number;
  paymentMethod: ExamCheckoutPaymentMethod;
  file: File;
  discountCode?: string;
}

export interface CheckoutExamPaymentSuccessResponse {
  message: string;
  orderId: number;
  grandTotal: string;
}

export interface CheckoutExamPaymentErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export interface StartExamInitialSuccessResponse {
  startTime: string;
  endTime: string;
  durationMinutes: number;
}

export interface StartExamExistingSessionSuccessResponse {
  id: number;
  userId: number;
  examId: number;
  startTime: string;
  endTime: string;
  score: number | null;
  isCompleted: boolean;
  submissionTime: string | null;
  attemptsCount: number;
  status: string;
  notes: string | null;
  ipAddress: string | null;
  deviceInfo: string | null;
  timeTakenSeconds: number | null;
  passingStatus: string | null;
  certificateIssued: boolean;
  proctoringStatus: string | null;
  finalGrade: string | null;
  examVersionTaken: string | null;
  externalSessionId: string | null;
  metadataJson: Record<string, unknown> | null;
  internalRemarks: string | null;
  createdAt: string;
  updatedAt: string;
  durationMinutes: number;
}

export type StartExamSuccessResponse =
  | StartExamInitialSuccessResponse
  | StartExamExistingSessionSuccessResponse;

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

export type ExamQuestionType = "multiple_choice" | (string & {});

export interface ExamAnswerOptionMetadata {
  label?: string;
  [key: string]: unknown;
}

export interface ExamAnswerOption {
  id: number;
  answerText: string;
  isCorrect: boolean;
  pointsIfSelected: number;
  metadataJson: ExamAnswerOptionMetadata | null;
}

export interface ExamQuestion {
  id: number;
  questionText: string;
  questionType: ExamQuestionType;
  explanationText: string | null;
  imageUrl: string | null;
  answers: ExamAnswerOption[];
}

export interface ExamQuestionEntry {
  orderInExam: number;
  pointsForQuestion: string;
  question: ExamQuestion;
}

/** GET /exams/:id/get-exams */
export interface ExamDetailSuccessResponse {
  id: number;
  examName: string;
  durationMinutes: number;
  passingScore: string;
  packageId: number;
  userExamId: number | null;
  _count: { examQuestions: number };
  examQuestions: ExamQuestionEntry[];
}

export interface SubmitExamAnswerRequest {
  userExamId: number;
  questionId: number;
  answerId: number;
}

export interface SubmitExamAnswerResponseData {
  id: number;
  questionId: number;
  selectedAnswerId: number;
  updatedAt: string;
}

export interface SubmitExamAnswerSuccessResponse {
  success: true;
  message: string;
  data: SubmitExamAnswerResponseData;
}

/** POST /exams/finish */
export interface FinishExamRequest {
  userExamId: number;
}

export interface FinishExamSummary {
  totalQuestions: number;
  correct: number;
  wrong: number;
  empty: number;
}

export interface FinishExamResponseData {
  userExamId: number;
  examName: string;
  finalScore: number;
  passingScore: number;
  status: string;
  summary: FinishExamSummary;
  submittedAt: string;
}

export interface FinishExamSuccessResponse {
  success: true;
  message: string;
  data: FinishExamResponseData;
}

/** GET /exams/:id/get-score */
export interface GetExamScoreStatistics {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
}

export interface GetExamScoreDetail {
  isCorrect: boolean;
  questionId: number;
  selectedAnswerId: number | null;
}

export interface GetExamScoreResponseData {
  userExamId: number;
  examName: string;
  finalScore: number;
  passingScore: number;
  status: string;
  statistics: GetExamScoreStatistics;
  submittedAt: string;
  details: GetExamScoreDetail[];
}

export interface GetExamScoreSuccessResponse {
  success: true;
  message: string;
  data: GetExamScoreResponseData;
}

/** GET /exams/review/by-exam/:examId */
export interface ExamReviewOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface ExamReviewQuestion {
  order: number;
  questionId: number;
  questionText: string;
  explanation: string;
  pointsForQuestion: number;
  pointsEarned: number | null;
  isCorrect: boolean | null;
  selectedAnswerId: number | null;
  userAnswerText: string | null;
  options: ExamReviewOption[];
}

export interface ExamReviewSuccessResponse {
  examId: number;
  examName: string;
  userExamId: number;
  score: number;
  isCompleted: boolean;
  submittedAt: string;
  questions: ExamReviewQuestion[];
}
