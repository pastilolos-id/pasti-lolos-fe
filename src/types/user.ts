export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  profileImg: string;
  role: string;
}

// Response from login/check-token includes token field
export interface AuthUser extends User {
  token: string;
}

export interface UserState {
  user: User;
  isAuthenticated: boolean;
}
