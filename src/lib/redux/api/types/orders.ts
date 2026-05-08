import type { ExamCheckoutPaymentMethod } from "./exams";

export type OrderHistoryItemType = "exam" | (string & {});

export type OrderHistoryStatus = "completed" | "pending" | (string & {});

export type OrderHistoryPaymentMethod = ExamCheckoutPaymentMethod;

export interface OrderHistoryItem {
  itemName: string;
  itemType: OrderHistoryItemType;
  totalPrice: string;
  itemId: number;
}

export interface OrderHistoryPaymentInfo {
  paymentStatus: string;
  receiptUrl: string;
  createdAt: string;
  amount: string;
}

export interface OrderHistoryEntry {
  id: number;
  date: string;
  status: OrderHistoryStatus;
  paymentStatus: string;
  grandTotal: number | string;
  paymentMethod: OrderHistoryPaymentMethod;
  items: OrderHistoryItem[];
  paymentInfo: OrderHistoryPaymentInfo;
}

export type OrdersHistorySuccessResponse = OrderHistoryEntry[];

export interface OrdersHistoryErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
