type NotificationItem = {
  id: number;
  title: string;
  message: string;
  time: string;
};

const notifications: NotificationItem[] = [
  {
    id: 1,
    title: "Akses Tryout Gratis Hari Ini 🎉",
    message:
      "Selamat! Kamu mendapatkan akses eksklusif untuk mencoba tryout CPNS secara gratis hari ini.\n\nManfaatkan kesempatan ini untuk mengukur kemampuanmu dan melihat sejauh mana kesiapanmu menghadapi ujian sebenarnya.",
    time: "1 menit lalu",
  },
  {
    id: 2,
    title: "Diskon Paket Premium BUMN 🔥",
    message:
      "Nikmati diskon hingga 50% untuk paket tryout BUMN premium.\n\nAkses ribuan soal, pembahasan lengkap, dan simulasi real test sebelum promo ini berakhir malam ini.",
    time: "10 menit lalu",
  },
  {
    id: 3,
    title: "Hasil Tryout Sudah Tersedia 📊",
    message:
      "Hasil tryout CPNS kamu sudah bisa dilihat sekarang.\n\nCek skor, analisis kelemahan, dan ranking nasional untuk mengetahui posisi kamu dibanding peserta lain.",
    time: "30 menit lalu",
  },
  {
    id: 4,
    title: "Waktu Tryout Hampir Habis ⏰",
    message:
      "Sisa waktu kamu untuk menyelesaikan tryout BUMN tinggal 1 jam lagi.\n\nPastikan semua soal sudah dijawab sebelum waktu habis agar hasilmu tetap tersimpan.",
    time: "1 jam lalu",
  },
  {
    id: 5,
    title: "Peringkat Temanmu Naik 🚀",
    message:
      "Salah satu temanmu baru saja meningkatkan peringkatnya di tryout CPNS.\n\nJangan sampai tertinggal, yuk lanjutkan latihan dan kejar posisi terbaikmu!",
    time: "2 jam lalu",
  },
  {
    id: 6,
    title: "Tryout CPNS Terbaru Dibuka 📢",
    message:
      "Batch tryout CPNS terbaru sudah tersedia dengan soal sesuai kisi-kisi terbaru.\n\nIkuti sekarang untuk mendapatkan pengalaman ujian yang lebih realistis.",
    time: "3 jam lalu",
  },
  {
    id: 7,
    title: "Upgrade ke Paket Pro 💡",
    message:
      "Tingkatkan persiapanmu dengan Paket Pro yang menyediakan pembahasan lengkap dan fitur ranking nasional.\n\nDapatkan insight mendalam untuk memperbaiki performa kamu di setiap tryout.",
    time: "5 jam lalu",
  },
  {
    id: 8,
    title: "Hampir Lulus Passing Grade 🎯",
    message:
      "Skor kamu sudah mendekati passing grade pada tryout terakhir.\n\nSedikit lagi! Ulangi latihan dan tingkatkan akurasi untuk memastikan kamu lolos.",
    time: "8 jam lalu",
  },
  {
    id: 9,
    title: "Masuk Top 10% 🏆",
    message:
      "Selamat! Kamu berhasil masuk ke dalam 10% peserta terbaik di tryout BUMN minggu ini.\n\nPertahankan performa ini dan terus tingkatkan agar bisa mencapai peringkat teratas.",
    time: "12 jam lalu",
  },
];

export { notifications };
