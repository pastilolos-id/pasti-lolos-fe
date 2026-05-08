import type { ExamCheckoutPaymentMethod } from "./exams";

export type OrderHistoryItemType = "exam" | (string & {});

export type OrderHistoryStatus = "completed" | "pending" | (string & {});

export type OrderHistoryPaymentMethod = ExamCheckoutPaymentMethod;

export interface OrderHistoryItem {
  id?: number;
  orderId?: number;
  courseId?: number;
  itemName: string;
  itemType: OrderHistoryItemType;
  totalPrice: string | number;
  itemId: number;
  quantity?: number;
  pricePerItem?: string | number;
  notes?: string | null;
  accessGranted?: boolean;
  accessStartDate?: string | null;
  accessEndDate?: string | null;
  licenseKey?: string | null;
  downloadLink?: string | null;
  refundStatus?: string;
  refundAmount?: string | number;
  metadataJson?: Record<string, unknown> | null;
  internalComments?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderHistoryPaymentInfo {
  paymentDate?: string;
  paymentMethod?: string;
  amountPaid?: string | number;
  receiptUrl?: string;
  status?: string;
  transactionId?: string;
  paymentStatus?: string;
  createdAt?: string;
  amount?: string | number;
}

export interface OrderHistoryEntry {
  id?: number;
  orderId?: number;
  date?: string;
  createdAt?: string;
  transactionCode?: string;
  status: OrderHistoryStatus;
  paymentStatus: string;
  grandTotal: number | string;
  paymentMethod: OrderHistoryPaymentMethod;
  discount?: number | string;
  totalAmount?: number | string;
  items: OrderHistoryItem[];
  paymentInfo: OrderHistoryPaymentInfo;
  instructions?: string | null;
}

export type OrdersHistorySuccessResponse = OrderHistoryEntry[];

export interface OrderHistoryDetailSuccessResponse {
  success: true;
  message: string;
  data: OrderHistoryEntry;
}

export interface OrdersHistoryErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
