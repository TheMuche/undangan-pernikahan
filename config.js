// ===================================================
// PUSAT PENGATURAN UNDANGAN DIGITAL (CONFIG.JS)
// Cukup ubah teks di dalam tanda kutip " " di bawah ini
// ===================================================

const CONFIG = {
  // 1. DATA MEMPELAI
  mempelaiPria: {
    namaLengkap: "Mempelai Pria, S.T.",
    namaPanggilan: "Dedy",
    namaOrangTua: "Putra dari Bapak [Nama Ayah] & Ibu [Nama Ibu]"
  },
  mempelaiWanita: {
    namaLengkap: "Mempelai Wanita, S.E.",
    namaPanggilan: "Aisyah",
    namaOrangTua: "Putri dari Bapak [Nama Ayah] & Ibu [Nama Ibu]"
  },

  // 2. WAKTU & TANGGAL
  tanggalPernikahan: "2026-12-13T13:00:00", 
  waktuTeks: "Minggu, 13 Desember 2026",
  jamTeks: "13.00 - 15.00 WIB",

  // 3. LOKASI
  lokasiNama: "Gedung / Tempat Pernikahan",
  lokasiAlamat: "Jl. Contoh Alamat Lengkap No. 123, Bantul, DIY",
  googleMapsUrl: "https://maps.google.com/?q=Bantul",

  // 4. MUSIK LATAR
  // Catatan: Anda bisa mengganti URL di bawah ini dengan URL file MP3 publik Anda 
  // atau taruh file 'lagu.mp3' di folder repo dan isi dengan "lagu.mp3"
  musikUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-114281.mp3",
  judulLagu: "Mutiara - Cover by Happy Asmara",

  // 5. GOOGLE APPS SCRIPT URL (Untuk RSVP ke Google Sheets)
  googleScriptUrl: "PASTE_WEB_APP_URL_DARI_GOOGLE_SCRIPT_DI_SINI",

  // 6. KISAH PERJALANAN (Bisa ditambah/dikurangi)
  kisahCinta: [
    { tahun: "2022", cerita: "Pertama kali saling mengenal dan menjalin komunikasi." },
    { tahun: "2024", cerita: "Memutuskan untuk mengikat janji komitmen bersama." },
    { tahun: "2026", cerita: "Sepakat melangkah ke jenjang pernikahan yang suci." }
  ],

  // 7. GALERI FOTO (Slide Otomatis - Ukuran Setengah Layar)
  fotoGaleri: [
    "https://picsum.photos/800/1000?random=21",
    "https://picsum.photos/800/1000?random=22",
    "https://picsum.photos/800/1000?random=23",
    "https://picsum.photos/800/1000?random=24",
    "https://picsum.photos/800/1000?random=25"
  ]
};
