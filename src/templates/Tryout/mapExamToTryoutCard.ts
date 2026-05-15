import type { ExamListItem } from "@/lib/redux/api/types/exams";
import type { TryoutCategory } from "./data";
import type { TryoutCardData } from "./TryoutLayout/TryoutCard/types";

export function toExamCategoryParam(category: TryoutCategory): "CPNS" | "BUMN" {
  return category === "cpns" ? "CPNS" : "BUMN";
}

function resolveTotalQuestions(exam: ExamListItem): number {
  const fromTotal = exam.totalQuestions;
  const fromJumlah = exam.jumlahSoal;
  const fromCount = exam._count?.examQuestions;

  if (typeof fromTotal === "number" && fromTotal > 0) {
    return fromTotal;
  }
  if (typeof fromJumlah === "number" && fromJumlah > 0) {
    return fromJumlah;
  }
  if (typeof fromCount === "number" && fromCount > 0) {
    return fromCount;
  }
  if (typeof fromTotal === "number") {
    return fromTotal;
  }
  if (typeof fromJumlah === "number") {
    return fromJumlah;
  }
  if (typeof fromCount === "number") {
    return fromCount;
  }
  return 0;
}

export function mapExamToTryoutCard(
  exam: ExamListItem,
  routeSegment: TryoutCategory,
): TryoutCardData {
  return {
    id: String(exam.id),
    title: exam.examName,
    totalQuestions: resolveTotalQuestions(exam),
    durationMinutes: exam.durationMinutes,
    price: exam.price,
    detailHref: `/tryout/${routeSegment}/${exam.id}/preview`,
  };
}
