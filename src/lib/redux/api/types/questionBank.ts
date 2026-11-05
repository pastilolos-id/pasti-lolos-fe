export type QuestionBankSubjectDto = {
  id: number;
  subjectName: string;
};

export type QuestionBankTopicDto = {
  id: number;
  /** nama topik bila ada di response */
  topicName?: string;
} | null;

/** Item dari `GET /bank-soal/admin/all` */
export type QuestionBankAdminItemDto = {
  id: number;
  bankName: string;
  description: string | null;
  subjectId: number | null;
  topicId: number | null;
  price: string;
  status: string;
  totalQuestions: number;
  pdfUrl: string | null;
  pdfName: string | null;
  subject: QuestionBankSubjectDto | null;
  topic: QuestionBankTopicDto;
};
