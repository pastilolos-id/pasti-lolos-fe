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

/**
 * Client ↔ POST /auth/login
 */

export type ApiUser = {
  id: number;
  email: string;
  username: string;
  userRoleId: number;
  fullName: string | null;
  profilePictureUrl: string | null;
  firstName?: string | null;
  lastName?: string | null;
  status?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  city?: string | null;
  province?: string | null;
  country?: string | null;
  postalCode?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  roleName?: string | null;
  userRoles?: { roleName?: string | null } | null;
};

/**
 * Client ↔ GET /auth/myProfile
 */
export type MyProfileResponse = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  address?: string | null;
  city?: string | null;
  province?: string | null;
  country?: string | null;
  postalCode?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  profilePictureUrl: string | null;
  userRoleId: number;
  userRoles?: { roleName?: string | null } | null;
  status: string;
  roleName?: string | null;
  fullName: string | null;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginFormValues = LoginRequest;

export type LoginFieldErrors = Partial<Record<keyof LoginRequest, string[]>>;

export type LoginErrorResponse = {
  statusCode: number;
  message: string;
  errors?: LoginFieldErrors;
};

export type LoginSuccessResponse = {
  message: string;
  user: ApiUser;
};

/**
 * Client ↔ GET /auth/logout
 */

export type LogoutSuccessResponse = {
  message: string;
};
