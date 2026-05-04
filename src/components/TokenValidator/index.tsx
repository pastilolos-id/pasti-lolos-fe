"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/lib/redux/slices/userSlice";
import type { RootState } from "@/lib/redux/store";
import { delay } from "@/lib/utils";
import mockUserData from "@/mock-data/user";

export default function TokenValidator() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const userData = useMemo(() => {
    const { token: _, ...rest } = mockUserData;
    return rest;
  }, []);

  const user = useSelector((state: RootState) => state.user.user);

  const refetch = useCallback(async () => {
    await delay(1000);
  }, []);

  // Simulasi: nantinya isError ini akan datang dari RTK Query
  const isError = false;

  useEffect(() => {
    // Kita panggil refetch() karena pathname berubah
    // Biome butuh 'melihat' pathname digunakan di sini
    if (pathname) {
      refetch();
    }

    if (user.id === 0) {
      dispatch(setUser(userData));
    }
  }, [pathname, refetch, user, dispatch, userData]);

  useEffect(() => {
    // Jika isError adalah konstanta statis (false), Biome melarangnya di deps.
    // Namun jika isError adalah variabel dinamis, ia wajib masuk.
    // Untuk saat ini, mari ikuti saran linter karena isError masih statis.
    if (isError) {
      router.push("/login");
    }
  }, [router]); // Hapus isError dari sini jika masih bernilai 'const isError = false'

  return null;
}
