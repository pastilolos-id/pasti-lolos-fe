import type {
  StudentActivityChild,
  StudentActivityItem,
  StudentSubExam,
} from "@/lib/redux/api/types/activity";
import type { TryoutCategory } from "@/templates/Tryout/data";
import type {
  Activity,
  ActivityStatus,
  MaterialActivity,
  TryoutActivity,
  TryoutPackageActivity,
  TryoutPackageChildRow,
} from "./types";

const DEFAULT_TRYOUT_MAX_SCORE = 100;

export function formatActivityDisplayDate(iso: string): string {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return iso;
  return new Date(ms).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

function getExamType(item: StudentActivityItem): string {
  const raw = item.examType ?? item.type;
  return raw != null ? String(raw).toLowerCase() : "";
}

function getTitle(item: StudentActivityItem): string {
  return item.examName ?? item.title ?? "";
}

function getStatusRaw(item: StudentActivityItem): string {
  return item.myStatus ?? item.status ?? "";
}

function getScoreRaw(item: StudentActivityItem): number | null | undefined {
  if (item.myScore !== undefined && item.myScore !== null) {
    return item.myScore;
  }
  return item.score;
}

function subExamToChild(sub: StudentSubExam): StudentActivityChild {
  return {
    userExamId: sub.userExamId,
    examName: sub.examName,
    score: sub.score,
    status: sub.status,
    finishedAt: sub.finishedAt,
    examId: sub.examId,
  };
}

function tryoutCategoryFromItem(item: StudentActivityItem): TryoutCategory {
  const parts: string[] = [];
  if (item.category) parts.push(item.category);
  if (item.examType) parts.push(item.examType);
  if (item.type) parts.push(String(item.type));
  if (item.subject?.subjectName) parts.push(item.subject.subjectName);

  for (const p of parts) {
    const u = p.trim().toUpperCase();
    if (u.includes("BUMN")) return "bumn";
    if (u.includes("CPNS")) return "cpns";
  }
  return "cpns";
}

function getChildrenList(item: StudentActivityItem): StudentActivityChild[] {
  if (item.subExams?.length) {
    return item.subExams.map(subExamToChild);
  }
  return item.children ?? [];
}

export function sortStudentActivitiesByDateDesc(
  items: StudentActivityItem[],
): StudentActivityItem[] {
  return [...items].sort((a, b) => {
    const tb = Date.parse(b.date);
    const ta = Date.parse(a.date);
    if (Number.isNaN(tb) || Number.isNaN(ta)) return 0;
    return tb - ta;
  });
}

function parseScore(raw: string | number | null | undefined): number | null {
  if (raw == null || raw === "") return null;
  const n = typeof raw === "number" ? raw : Number.parseFloat(String(raw));
  return Number.isFinite(n) ? n : null;
}

function mapApiStatusToUi(status: string): ActivityStatus {
  const n = status.trim().toLowerCase();
  if (n === "completed_partial" || n === "partial") {
    return "sebagian_selesai";
  }
  if (n === "in_progress" || n === "in progress") {
    return "sebagian_selesai";
  }
  if (n === "submitted" || n === "completed" || n === "selesai") {
    return "selesai";
  }
  if (
    n === "not_started" ||
    n === "pending" ||
    n === "belum_dimulai" ||
    n === "draft"
  ) {
    return "belum_dimulai";
  }
  if (n === "expired" || n === "kadaluarsa") {
    return "kadaluarsa";
  }
  return "belum_dimulai";
}

function tryoutColorFromScoreAndStatus(
  uiStatus: ActivityStatus,
  score: number | null | undefined,
): TryoutActivity["color"] {
  if (uiStatus === "kadaluarsa" || uiStatus === "belum_dimulai") {
    return "gray";
  }
  if (uiStatus === "sebagian_selesai") {
    return "yellow";
  }
  if (uiStatus !== "selesai") return "gray";
  if (score == null) return "yellow";
  const ratio = score / DEFAULT_TRYOUT_MAX_SCORE;
  if (ratio >= 0.7) return "green";
  if (ratio >= 0.4) return "yellow";
  return "red";
}

function packageHeaderColor(): TryoutActivity["color"] {
  return "gray";
}

function activityStableId(item: StudentActivityItem): string {
  if (item.userExamId != null) {
    return String(item.userExamId);
  }
  return String(item.id);
}

function shouldMapAsTryoutPackage(item: StudentActivityItem): boolean {
  const examT = getExamType(item);
  const childRows = getChildrenList(item);
  if (childRows.length > 0) {
    if (examT === "tryout" || examT === "") return true;
  }
  if (item.isPackage === true) return true;
  return (item.children?.length ?? 0) > 0;
}

function mapTryoutItem(item: StudentActivityItem): TryoutActivity {
  const uiStatus = mapApiStatusToUi(getStatusRaw(item));
  const scoreNum = parseScore(getScoreRaw(item));
  const displayScore =
    uiStatus === "selesai" && scoreNum != null ? scoreNum : undefined;

  return {
    id: activityStableId(item),
    type: "tryout",
    title: getTitle(item),
    status: uiStatus,
    date: item.formattedDate ?? formatActivityDisplayDate(item.date),
    score: displayScore,
    maxScore: DEFAULT_TRYOUT_MAX_SCORE,
    color: tryoutColorFromScoreAndStatus(uiStatus, scoreNum),
  };
}

function mapChildToPackageRow(
  child: StudentActivityChild,
): TryoutPackageChildRow {
  const uiStatus = mapApiStatusToUi(child.status);
  const scoreNum = parseScore(child.score);
  const displayScore =
    uiStatus === "selesai" && scoreNum != null ? scoreNum : undefined;
  const date =
    child.finishedAt != null && child.finishedAt !== ""
      ? formatActivityDisplayDate(child.finishedAt)
      : "—";

  return {
    id: String(child.userExamId),
    examName: child.examName,
    status: uiStatus,
    date,
    score: displayScore,
    color: tryoutColorFromScoreAndStatus(uiStatus, scoreNum),
    userExamId: child.userExamId,
    rawStatus: child.status,
    examId: child.examId,
  };
}

function mapTryoutPackageItem(
  item: StudentActivityItem,
): TryoutPackageActivity {
  const uiStatus = mapApiStatusToUi(getStatusRaw(item));
  const scoreNum = parseScore(getScoreRaw(item));
  const children = getChildrenList(item).map(mapChildToPackageRow);

  const summaryScore =
    uiStatus === "selesai" && scoreNum != null ? scoreNum : undefined;
  const summaryColor =
    uiStatus === "selesai" && scoreNum != null
      ? tryoutColorFromScoreAndStatus("selesai", scoreNum)
      : uiStatus === "sebagian_selesai"
        ? tryoutColorFromScoreAndStatus("sebagian_selesai", null)
        : packageHeaderColor();

  return {
    id: activityStableId(item),
    type: "tryout_package",
    title: getTitle(item),
    status: uiStatus,
    date: item.formattedDate ?? formatActivityDisplayDate(item.date),
    packageId: item.id,
    tryoutCategory: tryoutCategoryFromItem(item),
    maxScore: DEFAULT_TRYOUT_MAX_SCORE,
    summaryScore,
    color: summaryColor,
    children,
  };
}

function mapMaterialItem(item: StudentActivityItem): MaterialActivity {
  const uiStatus = mapApiStatusToUi(getStatusRaw(item));
  const raw = item.progress;
  const progress =
    typeof raw === "number" && Number.isFinite(raw)
      ? Math.min(100, Math.max(0, Math.round(raw)))
      : 0;

  return {
    id: activityStableId(item),
    type: "materi",
    title: getTitle(item),
    status: uiStatus,
    date: item.formattedDate ?? formatActivityDisplayDate(item.date),
    progress,
    color: uiStatus === "kadaluarsa" ? "gray" : "blue",
  };
}

export function mapStudentActivityItemToActivity(
  item: StudentActivityItem,
): Activity | null {
  const examT = getExamType(item);
  if (examT === "materi") {
    return mapMaterialItem(item);
  }
  if (examT === "tryout" || examT === "") {
    if (shouldMapAsTryoutPackage(item)) {
      return mapTryoutPackageItem(item);
    }
    return mapTryoutItem(item);
  }
  return null;
}

export function mapStudentActivitiesResponseToActivities(
  items: StudentActivityItem[],
): Activity[] {
  const sorted = sortStudentActivitiesByDateDesc(items);
  const out: Activity[] = [];
  for (const item of sorted) {
    const mapped = mapStudentActivityItemToActivity(item);
    if (mapped) out.push(mapped);
  }
  return out;
}
