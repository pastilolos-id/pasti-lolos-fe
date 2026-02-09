import type { IconProps } from "@/components/Icon";

type featuresType = {
  title: string;
  icon: IconProps["name"];
  desc: string;
};

const featuresData: featuresType[] = [
  {
    title: "Pembahasan Mudah Dipahami",
    icon: "sun",
    desc: "Rasakan pengalaman ujian seperti kondisi sebenarnya.",
  },
  {
    title: "Analisis Nilai & Performa",
    icon: "analysis-fill",
    desc: "Ketahui kelemahan dan fokuskan latihanmu.",
  },
  {
    title: "Akses Fleksibel",
    icon: "phone-fill",
    desc: "Bisa latihan dari HP atau laptop kapan pun.",
  },
  {
    title: "Simulasi Ujian Realistis",
    icon: "exam-multiple-choice",
    desc: "Rasakan pengalaman ujian seperti kondisi sebenarnya.",
  },
];

export { featuresData, type featuresType };
