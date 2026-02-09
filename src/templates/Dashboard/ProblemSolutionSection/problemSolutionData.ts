import type { StaticImageData } from "next/image";
import problemImageMobile from "@/assets/images/dashboard/problem-section-mobile.png";
import problemImageDesktop from "@/assets/images/dashboard/promblem-section-desktop.png";
import solutionImageDesktop from "@/assets/images/dashboard/solution-section-desktop.png";
import solutionImageMobile from "@/assets/images/dashboard/solution-section-mobile.png";
import type { IconProps } from "@/components/Icon";

type problemSolutionSectionType = {
  id: number;
  title: string;
  icon: IconProps["name"];
  image: {
    mobile: StaticImageData;
    desktop: StaticImageData;
  };
  itemList: string[];
};

type problemSolutionDataType = problemSolutionSectionType[];

const problemSolutionData: problemSolutionDataType = [
  {
    id: 1,
    title: "Kenapa Banyak Peserta Gagal di Seleksi?",
    icon: "cross-circle-fill",
    image: {
      mobile: problemImageMobile,
      desktop: problemImageDesktop,
    },
    itemList: [
      "Sudah belajar lama, tapi soal ujian terasa asing",
      "Tidak tahu sejauh mana kesiapan diri",
      "Kurang latihan dengan sistem yang mirip ujian asli",
      "Belajar sendiri tanpa evaluasi yang jelas",
    ],
  },
  {
    id: 2,
    title: "Kami Hadir untuk Membantumu Lebih Siap",
    icon: "checklist-circle-fill",
    image: {
      mobile: solutionImageMobile,
      desktop: solutionImageDesktop,
    },
    itemList: [
      "Tryout dengan sistem mirip ujian BUMN & CPNS",
      "Soal disusun sesuai tipe dan tingkat kesulitan seleksi",
      "Hasil langsung keluar + pembahasan jelas",
      "Bisa diakses kapan saja, di mana saja",
    ],
  },
];

export { problemSolutionData, type problemSolutionDataType };
