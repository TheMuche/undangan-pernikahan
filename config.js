// ===================================================
// PUSAT PENGATURAN UNDANGAN DIGITAL (CONFIG.JS)
// Cukup ubah teks di dalam tanda kutip " " di bawah ini.
// ===================================================

const CONFIG = {
  // 1. DATA MEMPELAI
  mempelaiPria: {
    namaLengkap: "Arma Machfudz Sulaiman",
    namaPanggilan: "Arma",
    namaOrangTua: "Putra dari Bapak Suyanto & Ibu Anik Supiyah"
  },
  mempelaiWanita: {
    namaLengkap: "Tanjung Setyorini S.Tr",
    namaPanggilan: "Tanjung",
    namaOrangTua: "Putri dari Bapak Supriyanto & Ibu Jumiarsih"
  },

  // 2. WAKTU & TANGGAL
  // Format YYYY-MM-DDTHH:mm:ss untuk kalkulasi countdown otomatis
  tanggalPernikahan: "2026-12-13T13:00:00", 
  waktuTeks: "Minggu, 13 Desember 2026 | 13.00 - 15.00 WIB",

  // 3. LOKASI
  lokasiNama: "Gedung Dakwah Muhammadiyah Bantul",
  lokasiAlamat: "Jl. Contoh Alamat Lengkap No. 123, Bantul, DIY",
  googleMapsUrl: "https://maps.google.com/?q=Bantul",

  // 4. MUSIK LATAR (Ganti dengan link file MP3 publik Anda)
  musikUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",

  // 5. GOOGLE APPS SCRIPT URL (Untuk RSVP ke Google Sheets)
  googleScriptUrl: "https://script.google.com/macros/s/AKfycbwKotmSOOygGV64Xw5jnfWQfCpKphM9YI8xRv1myDbj9rrvMs2TWfXL-IbCVeY2J1_L/exec",

  // 6. KISAH PERJALANAN (Bisa ditambah atau dikurangi)
  kisahCinta: [
    { tahun: "2022", cerita: "Pertama kali saling mengenal di lingkungan Kwarcab Bantul." },
    { tahun: "2024", cerita: "Memutuskan untuk menjalin komitmen hubungan yang lebih serius." },
    { tahun: "2026", cerita: "Sepakat mengikat janji suci dan melangkah ke jenjang pernikahan." }
  ],

  // 7. GALERI FOTO (Ganti link foto dengan URL/path foto Anda)
  fotoGaleri: [
    "https://picsum.photos/800/600?random=1",
    "https://picsum.photos/800/600?random=2",
    "https://picsum.photos/800/600?random=3",
    "https://picsum.photos/800/600?random=4",
    "https://picsum.photos/800/600?random=5"
  ]
};