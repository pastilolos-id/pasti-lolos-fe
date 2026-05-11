import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { User, UserState } from "@/types/user";

const initialState: UserState = {
  user: {
    id: 0,
    username: "",
    fullName: null,
    firstName: null,
    lastName: null,
    email: "",
    phoneNumber: null,
    address: null,
    city: null,
    province: null,
    country: null,
    postalCode: null,
    dateOfBirth: null,
    gender: null,
    profilePictureUrl: null,
    status: null,
    roleId: 0,
    roleName: null,
  },
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = action.payload.id !== 0;
    },
    clearUser(state) {
      state.user = initialState.user;
      state.isAuthenticated = false;
    },
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUser, clearUser, setAuthenticated } = userSlice.actions;
export default userSlice.reducer;
