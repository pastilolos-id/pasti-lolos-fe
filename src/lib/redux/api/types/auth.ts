/**
 * Client ↔ POST /auth/Register
 */

export type RegisterRequest = {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  isAgreed: boolean;
};

/** Form values match API payload for register. */
export type RegisterFormValues = RegisterRequest;

export type RegisterFieldErrors = Partial<
  Record<keyof RegisterRequest, string[]>
>;

export type RegisterErrorResponse = {
  statusCode: number;
  message: string;
  errors?: RegisterFieldErrors;
};

/**
 * Success body may vary per backend; keep flexible until contract is fixed.
 */
export type RegisterSuccessResponse = {
  statusCode?: number;
  message?: string;
  data?: unknown;
};
