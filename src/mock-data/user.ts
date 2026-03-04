import type { AuthUser } from "@/types/user";

const user: AuthUser = {
  id: "1",
  username: "student123",
  name: "Student User",
  email: "user@gmail.com",
  role: "student",
  profileImg: "/img/user/student-mock.jpg",
  token: "mocked-jwt-token",
};

export default user;
