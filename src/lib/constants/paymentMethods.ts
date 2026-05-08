export interface PaymentMethodConfig {
  id: string;
  type: "qris" | "bank";
  label: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
}

export const paymentMethodsConfig: PaymentMethodConfig[] = [
  { id: "qris", type: "qris", label: "QRIS" },
  {
    id: "bank-bni",
    type: "bank",
    label: "Bank BNI",
    accountName: "ACEP AWALUDIN",
    accountNumber: "12000xxxxxx",
    bankName: "Bank BNI",
  },
  {
    id: "bank-mandiri",
    type: "bank",
    label: "Bank Mandiri",
    accountName: "ACEP AWALUDIN",
    accountNumber: "1200012784174",
    bankName: "Bank Mandiri",
  },
  {
    id: "bank-bri",
    type: "bank",
    label: "Bank BRI",
    accountName: "ACEP AWALUDIN",
    accountNumber: "12000127xxxxxxx",
    bankName: "Bank BRI",
  },
  {
    id: "bank-bca",
    type: "bank",
    label: "Bank BCA",
    accountName: "ACEP AWALUDIN",
    accountNumber: "120001xxxxxx",
    bankName: "Bank BCA",
  },
];

export function getPaymentMethodConfigByLabel(label: string) {
  return paymentMethodsConfig.find(
    (method) => method.label.toLowerCase() === label.toLowerCase(),
  );
}
