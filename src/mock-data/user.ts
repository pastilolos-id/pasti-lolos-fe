import type { AuthUser } from "@/types/user";

const user: AuthUser = {
  id: 1,
  username: "student123",
  fullName: "Student User",
  firstName: "Student",
  lastName: "User",
  email: "user@gmail.com",
  phoneNumber: null,
  address: null,
  city: null,
  province: null,
  country: null,
  postalCode: null,
  dateOfBirth: null,
  gender: null,
  roleId: 1,
  profilePictureUrl: "/img/user/student-mock.jpg",
  status: "active",
  roleName: "student",
  token: "mocked-jwt-token",
};

export default user;
