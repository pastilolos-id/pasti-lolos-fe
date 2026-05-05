import type { ExamListItem } from "@/lib/redux/api/types/exams";
import type { TryoutCategory } from "./data";
import type { TryoutCardData } from "./TryoutLayout/TryoutCard/types";

export function toExamCategoryParam(category: TryoutCategory): "CPNS" | "BUMN" {
  return category === "cpns" ? "CPNS" : "BUMN";
}

export function mapExamToTryoutCard(
  exam: ExamListItem,
  routeSegment: TryoutCategory,
): TryoutCardData {
  return {
    id: String(exam.id),
    title: exam.examName,
    totalQuestions: exam._count.examQuestions,
    durationMinutes: exam.durationMinutes,
    price: exam.price,
    detailHref: `/tryout/${routeSegment}/${exam.id}/preview`,
  };
}
