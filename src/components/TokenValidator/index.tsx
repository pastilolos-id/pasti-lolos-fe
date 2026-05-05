"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetMyProfileQuery } from "@/lib/redux/api/authApi";
import { mapMyProfileToStateUser } from "@/lib/redux/api/mapLoginApiErrors";
import { clearUser, setUser } from "@/lib/redux/slices/userSlice";

export default function TokenValidator() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const hasValidatedOnce = useRef(false);
  const [getMyProfile, { isFetching }] = useLazyGetMyProfileQuery();

  useEffect(() => {
    async function validateSession() {
      if (!pathname) {
        return;
      }

      try {
        const profile = await getMyProfile().unwrap();
        dispatch(setUser(mapMyProfileToStateUser(profile)));
      } catch {
        dispatch(clearUser());
        router.replace("/login");
      } finally {
        hasValidatedOnce.current = true;
      }
    }

    validateSession();
  }, [pathname, getMyProfile, dispatch, router]);

  if (!hasValidatedOnce.current || isFetching) {
    return (
      <div className="fixed bottom-4 right-4 z-60 rounded-md bg-white/90 px-3 py-2 shadow-sm">
        <p className="text-xs text-primary-90">Memverifikasi sesi...</p>
      </div>
    );
  }

  return null;
}
