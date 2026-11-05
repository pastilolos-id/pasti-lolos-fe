"use client";

import Image from "next/image";

/**
 * Placeholder layar penuh untuk halaman course yang belum tersedia (BUMN / CPNS).
 */
export default function CourseComingSoonPage() {
  return (
    <section
      className="flex min-h-[calc(100dvh-10rem)] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-linear-to-b from-[#63a4ff] to-[#1976d2] px-4 py-10 shadow-inner sm:py-14"
      aria-label="Segera hadir"
    >
      <div className="relative aspect-9/16 w-full max-w-sm sm:max-w-md">
        <Image
          src="/images/materi-coming-soon.png"
          alt="Pastiolos — Materi segera hadir"
          fill
          className="object-contain object-center drop-shadow-lg"
          priority
          sizes="(max-width: 640px) 100vw, 28rem"
          unoptimized
        />
      </div>
    </section>
  );
}
