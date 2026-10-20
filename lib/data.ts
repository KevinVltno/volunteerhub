export type Category = "Lingkungan" | "Pendidikan" | "Kesehatan" | "Sosial" | "Bencana";
export type When = "weekend" | "weekday";

export type Activity = {
  id: string;
  title: string;
  organizer: string;
  category: Category;
  city: string;
  place: string;
  dateLabel: string;
  time: string;
  when: When;
  hours: number;
  quota: number;
  filled: number;
  image: string;
  summary: string;
  tasks: string[];
  requirements: string[];
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

export const heroImage = img("photo-1559027615-cd4628902d4a");
export const loginImage = img("photo-1509099836639-18ba1795216d");

export const categories: Category[] = ["Lingkungan", "Pendidikan", "Kesehatan", "Sosial", "Bencana"];

// Foto dokumentasi untuk landing page (halaman publik, tanpa login)
export const galleryPhotos = [
  { id: "g1", title: "Aksi Bersih Pantai Marina", image: img("photo-1618477461853-cf6ed80faba5") },
  { id: "g2", title: "Mengajar Literasi Anak Pinggiran", image: img("photo-1503676260728-1c00da094a0b") },
  { id: "g3", title: "Dapur Berbagi untuk Lansia", image: img("photo-1593113598332-cd288d649433") },
  { id: "g4", title: "Penanaman 500 Bibit Mangrove", image: img("photo-1542601906990-b4d3fb778b09") },
  { id: "g5", title: "Pemeriksaan Kesehatan Gratis Warga", image: img("photo-1576091160399-112ba8d25d1d") },
  { id: "g6", title: "Posko Logistik Korban Banjir", image: img("photo-1532629345422-7515f3d16bb6") },
  { id: "g7", title: "Bimbingan Belajar Online untuk SD", image: img("photo-1509099836639-18ba1795216d") },
  { id: "g8", title: "Donor Darah Komunitas", image: img("photo-1615461066841-6116e61058f4") },
];

export const demoAccount = { name: "Relawan Demo", email: "demo@volunteerhub.test", password: "password123" };

// Data dummy kegiatan (tanpa backend/API)
export const activities: Activity[] = [
  {
    id: "bersih-pantai-marina", title: "Aksi Bersih Pantai Marina", organizer: "Komunitas Pesisir Bersih",
    category: "Lingkungan", city: "Semarang", place: "Pantai Marina", dateLabel: "Sabtu, 17 Okt 2026", time: "07.00–11.00 WIB",
    when: "weekend", hours: 4, quota: 60, filled: 42, image: img("photo-1618477461853-cf6ed80faba5"),
    summary: "Bersama warga dan komunitas, kita membersihkan sampah plastik di sepanjang garis pantai dan memilahnya untuk didaur ulang.",
    tasks: ["Memungut dan memilah sampah di zona pantai", "Menimbang dan mencatat jenis sampah", "Membantu mengangkut karung ke titik pengumpulan"],
    requirements: ["Sarung tangan dan topi", "Membawa botol minum sendiri", "Usia minimal 15 tahun"],
  },
  {
    id: "literasi-anak", title: "Mengajar Literasi Anak Pinggiran", organizer: "Rumah Baca Cahaya",
    category: "Pendidikan", city: "Bandung", place: "Rumah Baca Cahaya, Cicadas", dateLabel: "Minggu, 18 Okt 2026", time: "09.00–12.00 WIB",
    when: "weekend", hours: 3, quota: 20, filled: 14, image: img("photo-1503676260728-1c00da094a0b"),
    summary: "Dampingi anak usia 6–12 tahun belajar membaca, menulis, dan berhitung lewat permainan dan cerita.",
    tasks: ["Mendampingi kelompok kecil membaca nyaring", "Memandu permainan kosakata", "Merapikan perpustakaan mini"],
    requirements: ["Sabar dan suka bercerita", "Mengikuti briefing 15 menit sebelum mulai"],
  },
  {
    id: "dapur-berbagi-lansia", title: "Dapur Berbagi untuk Lansia", organizer: "Yayasan Senja Bahagia",
    category: "Sosial", city: "Surakarta", place: "Balai RW 05, Laweyan", dateLabel: "Sabtu, 24 Okt 2026", time: "08.00–12.00 WIB",
    when: "weekend", hours: 4, quota: 30, filled: 22, image: img("photo-1593113598332-cd288d649433"),
    summary: "Memasak dan mengemas 150 porsi makanan sehat, lalu mengantarkannya ke lansia yang tinggal sendiri.",
    tasks: ["Menyiapkan bahan dan memasak", "Mengemas makanan higienis", "Mengantar paket ke rumah penerima"],
    requirements: ["Celemek dan masker", "Sehat dan tidak sedang flu", "Bisa mengendarai motor (untuk tim antar)"],
  },
  {
    id: "tanam-mangrove", title: "Penanaman 500 Bibit Mangrove", organizer: "Hijau Pesisir Nusantara",
    category: "Lingkungan", city: "Surabaya", place: "Pantai Timur Surabaya", dateLabel: "Minggu, 25 Okt 2026", time: "06.30–11.30 WIB",
    when: "weekend", hours: 5, quota: 100, filled: 76, image: img("photo-1542601906990-b4d3fb778b09"),
    summary: "Menanam bibit mangrove untuk menahan abrasi dan memulihkan habitat pesisir.",
    tasks: ["Menanam bibit di area yang sudah ditandai", "Memasang ajir penyangga", "Mencatat titik tanam"],
    requirements: ["Pakaian yang boleh kotor dan basah", "Sepatu karet atau sandal gunung", "Bisa berenang lebih baik"],
  },
  {
    id: "cek-kesehatan-warga", title: "Pemeriksaan Kesehatan Gratis Warga", organizer: "Klinik Sehat Bersama",
    category: "Kesehatan", city: "Yogyakarta", place: "Balai Kelurahan Umbulharjo", dateLabel: "Rabu, 21 Okt 2026", time: "08.00–13.00 WIB",
    when: "weekday", hours: 5, quota: 25, filled: 18, image: img("photo-1576091160399-112ba8d25d1d"),
    summary: "Membantu pendaftaran, pengukuran tekanan darah, dan edukasi pola hidup sehat bagi warga.",
    tasks: ["Registrasi dan antrean pasien", "Membantu pengukuran tinggi dan berat badan", "Membagikan materi edukasi"],
    requirements: ["Ramah dan komunikatif", "Mahasiswa kesehatan diutamakan, tetapi umum boleh ikut"],
  },
  {
    id: "posko-banjir", title: "Posko Logistik Korban Banjir", organizer: "Relawan Siaga Bencana",
    category: "Bencana", city: "Jakarta", place: "Gedung Serbaguna Kampung Melayu", dateLabel: "Selasa, 20 Okt 2026", time: "09.00–15.00 WIB",
    when: "weekday", hours: 6, quota: 40, filled: 40, image: img("photo-1532629345422-7515f3d16bb6"),
    summary: "Mengelola gudang bantuan: menerima, memilah, dan menyalurkan logistik ke titik pengungsian.",
    tasks: ["Menerima dan mencatat donasi barang", "Memilah dan mengemas paket bantuan", "Memuat paket ke kendaraan distribusi"],
    requirements: ["Fisik sehat untuk mengangkat barang", "Sepatu tertutup"],
  },
  {
    id: "bimbel-online-sd", title: "Bimbingan Belajar Online untuk SD", organizer: "Kelas Cerdas Indonesia",
    category: "Pendidikan", city: "Bengkulu", place: "Daring (Google Meet)", dateLabel: "Kamis, 22 Okt 2026", time: "19.00–21.00 WIB",
    when: "weekday", hours: 2, quota: 30, filled: 11, image: img("photo-1509099836639-18ba1795216d"),
    summary: "Mendampingi siswa SD mengerjakan PR matematika dan bahasa Indonesia lewat kelas daring kecil.",
    tasks: ["Memandu sesi belajar 45 menit", "Membantu siswa memahami soal", "Memberi umpan balik singkat ke orang tua"],
    requirements: ["Koneksi internet stabil", "Laptop atau HP dengan kamera", "Menguasai materi SD"],
  },
  {
    id: "donor-darah-komunitas", title: "Donor Darah Komunitas", organizer: "PMI Makassar & Komunitas Muda",
    category: "Kesehatan", city: "Makassar", place: "Gedung PMI Kota Makassar", dateLabel: "Jumat, 23 Okt 2026", time: "09.00–14.00 WIB",
    when: "weekday", hours: 3, quota: 50, filled: 33, image: img("photo-1615461066841-6116e61058f4"),
    summary: "Membantu kelancaran acara donor darah: pendaftaran, pendampingan pendonor, dan penyediaan konsumsi.",
    tasks: ["Memandu alur pendaftaran pendonor", "Mendampingi pendonor di area istirahat", "Membagikan makanan dan minuman"],
    requirements: ["Datang 30 menit sebelum acara", "Mengenakan kaus komunitas (disediakan)"],
  },
];

export const weeklyInsight = [
  { minggu: "Mg 1", jam: 120 },
  { minggu: "Mg 2", jam: 160 },
  { minggu: "Mg 3", jam: 140 },
  { minggu: "Mg 4", jam: 210 },
  { minggu: "Mg 5", jam: 190 },
  { minggu: "Mg 6", jam: 260 },
];
