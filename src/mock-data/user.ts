import type { AuthUser } from "@/types/user";

const user: AuthUser = {
  id: 1,
  username: "student123",
  fullName: "Student User",
  email: "user@gmail.com",
  roleId: 1,
  profilePictureUrl: "/img/user/student-mock.jpg",
  token: "mocked-jwt-token",
};

export default user;
