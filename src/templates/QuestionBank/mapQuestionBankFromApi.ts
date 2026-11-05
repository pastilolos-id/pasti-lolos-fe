import type { QuestionBankAdminItemDto } from "@/lib/redux/api/types/questionBank";
import type {
  QuestionBankListItem,
  QuestionBankSubjectFilterOption,
} from "./types";

function formatIdrFromString(price: string): string {
  const n = Number(price);
  if (Number.isNaN(n)) {
    return price.startsWith("Rp") ? price : `Rp ${price}`;
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function mapQuestionBankAdminItemToListItem(
  row: QuestionBankAdminItemDto,
): QuestionBankListItem | null {
  const pdfUrl = row.pdfUrl?.trim();
  if (!pdfUrl) {
    return null;
  }

  return {
    id: row.id,
    bankName: row.bankName,
    description: row.description,
    pdfUrl,
    pdfName: row.pdfName,
    priceFormatted: formatIdrFromString(String(row.price ?? "0")),
    subjectId: row.subject?.id ?? row.subjectId ?? null,
    subjectName: row.subject?.subjectName ?? null,
    status: row.status,
    totalQuestions: row.totalQuestions ?? 0,
  };
}

export function mapQuestionBanksAdminResponseToListItems(
  rows: QuestionBankAdminItemDto[],
): QuestionBankListItem[] {
  return rows
    .map((row) => mapQuestionBankAdminItemToListItem(row))
    .filter((item): item is QuestionBankListItem => item !== null);
}

export function collectSubjectFilterOptions(
  items: QuestionBankListItem[],
): QuestionBankSubjectFilterOption[] {
  const byId = new Map<number, string>();
  for (const item of items) {
    if (item.subjectId != null && item.subjectName) {
      byId.set(item.subjectId, item.subjectName);
    }
  }
  return [...byId.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([id, label]) => ({ id, label }));
}
