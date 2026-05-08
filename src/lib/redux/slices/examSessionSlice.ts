import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type {
  ExamDetailSuccessResponse,
  ExamQuestionEntry,
} from "@/lib/redux/api/types/exams";

export interface ExamSessionState {
  examId: number | null;
  examName: string;
  durationMinutes: number;
  passingScore: string;
  packageId: number | null;
  totalQuestions: number;
  examQuestions: ExamQuestionEntry[];
}

const initialState: ExamSessionState = {
  examId: null,
  examName: "",
  durationMinutes: 0,
  passingScore: "",
  packageId: null,
  totalQuestions: 0,
  examQuestions: [],
};

export const examSessionSlice = createSlice({
  name: "examSession",
  initialState,
  reducers: {
    setExamSession(state, action: PayloadAction<ExamDetailSuccessResponse>) {
      const payload = action.payload;
      const sortedQuestions = [...payload.examQuestions].sort(
        (a, b) => a.orderInExam - b.orderInExam,
      );
      state.examId = payload.id;
      state.examName = payload.examName;
      state.durationMinutes = payload.durationMinutes;
      state.passingScore = payload.passingScore;
      state.packageId = payload.packageId;
      state.totalQuestions =
        payload._count?.examQuestions ?? sortedQuestions.length;
      state.examQuestions = sortedQuestions;
    },
    clearExamSession() {
      return initialState;
    },
  },
});

export const { setExamSession, clearExamSession } = examSessionSlice.actions;
export default examSessionSlice.reducer;
