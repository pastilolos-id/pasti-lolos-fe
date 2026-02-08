type problemSolutionSectionType = {
  id: number;
  title: string;
  itemList: string[];
};

type problemSolutionDataType = problemSolutionSectionType[];

const problemSolutionData: problemSolutionDataType = [
  {
    id: 1,
    title: "Kesulitan mencari materi belajar yang terstruktur",
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
    itemList: [
      "Tryout dengan sistem mirip ujian BUMN & CPNS",
      "Soal disusun sesuai tipe dan tingkat kesulitan seleksi",
      "Hasil langsung keluar + pembahasan jelas",
      "Bisa diakses kapan saja, di mana saja",
    ],
  },
];

export { problemSolutionData, type problemSolutionDataType };
