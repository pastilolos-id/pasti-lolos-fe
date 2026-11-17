"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  beginVoluntaryLogout,
  endVoluntaryLogout,
} from "@/lib/auth/session-lifecycle";
import { removeToken } from "@/lib/cookies/tokenCookies";
import { useLogoutMutation } from "@/lib/redux/api/authApi";
import { baseApi } from "@/lib/redux/api/baseApi";
import { clearUser } from "@/lib/redux/slices/userSlice";
import type { AppDispatch } from "@/lib/redux/store";

export function useLogout() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [logout, { isLoading }] = useLogoutMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const performLogout = useCallback(async () => {
    setErrorMessage(null);
    beginVoluntaryLogout();
    try {
      await logout().unwrap();
      dispatch(clearUser());
      removeToken();
      dispatch(baseApi.util.resetApiState());
      router.replace("/");
    } catch {
      endVoluntaryLogout();
      setErrorMessage("Gagal keluar. Silakan coba lagi.");
    }
  }, [dispatch, logout, router]);

  return { performLogout, isLoading, errorMessage };
}
