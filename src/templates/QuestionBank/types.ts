/** Model tampilan daftar / detail (setelah mapping dari API) */
export type QuestionBankListItem = {
  id: number;
  bankName: string;
  description: string | null;
  pdfUrl: string;
  pdfName: string | null;
  priceFormatted: string;
  subjectId: number | null;
  subjectName: string | null;
  status: string;
  totalQuestions: number;
};

export type QuestionBankSubjectFilterOption = {
  id: number;
  label: string;
};
