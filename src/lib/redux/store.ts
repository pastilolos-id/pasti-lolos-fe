import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./api/baseApi";
import "@/lib/redux/api/courseApi";
import "@/lib/redux/api/examsApi";
import "@/lib/redux/api/homeApi";
import "@/lib/redux/api/notificationsApi";
import "@/lib/redux/api/ordersApi";
import "@/lib/redux/api/profileApi";
import "@/lib/redux/api/studentsActivityApi";
import examSessionReducer from "./slices/examSessionSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    examSession: examSessionReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
