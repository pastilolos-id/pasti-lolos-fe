export interface User {
  id: number;
  username: string;
  fullName: string | null;
  email: string;
  profilePictureUrl: string | null;
  roleId: number;
}

// Response from login/check-token may include token field (e.g. mock)
export interface AuthUser extends User {
  token: string;
}

export interface UserState {
  user: User;
  isAuthenticated: boolean;
}
