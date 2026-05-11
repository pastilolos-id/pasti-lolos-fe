export interface User {
  id: number;
  username: string;
  fullName: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  postalCode: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  profilePictureUrl: string | null;
  status: string | null;
  roleId: number;
  /** From GET /auth/myProfile when provided (e.g. roleName or userRoles.roleName) */
  roleName: string | null;
}

// Response from login/check-token may include token field (e.g. mock)
export interface AuthUser extends User {
  token: string;
}

export interface UserState {
  user: User;
  isAuthenticated: boolean;
}
