"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { delay } from "@/lib/utils";

export default function TokenValidator() {
  const pathname = usePathname();
  const router = useRouter();

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

    // Tidak mengisi mock user: session OAuth/Google hanya menyetel cookie;
    // data profil akan di-hydrate lewat endpoint terpisah nanti.
  }, [pathname, refetch]);

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
