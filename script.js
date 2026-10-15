document.addEventListener("DOMContentLoaded", () => {
  // 1. Dapatkan Nama Tamu dari URL Parameter (?to=Nama+Tamu)
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to');
  if (guestName) {
    document.getElementById('nama-tamu').textContent = guestName;
    document.getElementById('rsvp-nama').value = guestName;
  }

  // 2. Isi Data dari CONFIG
  document.getElementById('cover-mempelai').textContent = `${CONFIG.mempelaiPria.namaPanggilan} & ${CONFIG.mempelaiWanita.namaPanggilan}`;
  document.getElementById('hero-mempelai').textContent = `${CONFIG.mempelaiPria.namaPanggilan} & ${CONFIG.mempelaiWanita.namaPanggilan}`;
  document.getElementById('hero-waktu').textContent = CONFIG.waktuTeks;
  document.getElementById('pria-nama').textContent = CONFIG.mempelaiPria.namaLengkap;
  document.getElementById('pria-ortu').textContent = CONFIG.mempelaiPria.namaOrangTua;
  document.getElementById('wanita-nama').textContent = CONFIG.mempelaiWanita.namaLengkap;
  document.getElementById('wanita-ortu').textContent = CONFIG.mempelaiWanita.namaOrangTua;
  document.getElementById('event-waktu').textContent = CONFIG.waktuTeks;
  document.getElementById('lokasi-nama').textContent = CONFIG.lokasiNama;
  document.getElementById('lokasi-alamat').textContent = CONFIG.lokasiAlamat;
  document.getElementById('btn-maps').href = CONFIG.googleMapsUrl;
  document.getElementById('footer-mempelai').textContent = `${CONFIG.mempelaiPria.namaPanggilan} & ${CONFIG.mempelaiWanita.namaPanggilan}`;

  // 3. Audio Controller
  const audio = document.getElementById('bg-music');
  audio.src = CONFIG.musikUrl;
  let isPlaying = false;

  const toggleMusic = () => {
    if (isPlaying) { audio.pause(); } else { audio.play(); }
    isPlaying = !isPlaying;
  };

  document.getElementById('btn-music').addEventListener('click', toggleMusic);

  // 4. Buka Undangan
  document.getElementById('btn-buka').addEventListener('click', () => {
    document.getElementById('cover').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    audio.play().then(() => { isPlaying = true; }).catch(() => {});
  });

  // 5. Countdown Timer
  const targetDate = new Date(CONFIG.tanggalPernikahan).getTime();
  setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff > 0) {
      document.getElementById('days').textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
      document.getElementById('hours').textContent = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      document.getElementById('minutes').textContent = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      document.getElementById('seconds').textContent = Math.floor((diff % (1000 * 60)) / 1000);
    }
  }, 1000);

  // 6. Timeline Kisah Cinta
  const timelineContainer = document.getElementById('timeline-container');
  CONFIG.kisahCinta.forEach(item => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.innerHTML = `<div class="timeline-year">${item.tahun}</div><p>${item.cerita}</p>`;
    timelineContainer.appendChild(el);
  });

  // 7. Carousel Foto
  let currentImgIndex = 0;
  const carouselImg = document.getElementById('carousel-img');
  
  const updateCarousel = () => {
    if (CONFIG.fotoGaleri.length > 0) {
      carouselImg.src = CONFIG.fotoGaleri[currentImgIndex];
    }
  };
  
  updateCarousel();

  document.getElementById('next-slide').addEventListener('click', () => {
    currentImgIndex = (currentImgIndex + 1) % CONFIG.fotoGaleri.length;
    updateCarousel();
  });

  document.getElementById('prev-slide').addEventListener('click', () => {
    currentImgIndex = (currentImgIndex - 1 + CONFIG.fotoGaleri.length) % CONFIG.fotoGaleri.length;
    updateCarousel();
  });

  // 8. Tambah ke Google Calendar
  document.getElementById('btn-calendar').addEventListener('click', () => {
    const title = encodeURIComponent(`Pernikahan ${CONFIG.mempelaiPria.namaPanggilan} & ${CONFIG.mempelaiWanita.namaPanggilan}`);
    const details = encodeURIComponent(`Acara Pernikahan ${CONFIG.mempelaiPria.namaLengkap} & ${CONFIG.mempelaiWanita.namaLengkap}`);
    const location = encodeURIComponent(`${CONFIG.lokasiNama}, ${CONFIG.lokasiAlamat}`);
    // Start: 20261213T130000Z / End: 20261213T150000Z (Set ke UTC +7 offset)
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261213T060000Z/20261213T080000Z&details=${details}&location=${location}`;
    window.open(calUrl, '_blank');
  });

  // 9. Kirim RSVP ke Google Sheets
  document.getElementById('rsvp-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btnSubmit = document.getElementById('btn-submit-rsvp');
    const msgOutput = document.getElementById('rsvp-response-message');

    btnSubmit.disabled = true;
    btnSubmit.textContent = "Sending...";

    const payload = {
      nama: document.getElementById('rsvp-nama').value,
      kehadiran: document.getElementById('rsvp-status').value,
      jumlahTamu: document.getElementById('rsvp-jumlah').value,
      pesan: document.getElementById('rsvp-pesan').value
    };

    fetch(CONFIG.googleScriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(() => {
      msgOutput.textContent = "✅ Terimakasih! Konfirmasi Anda telah berhasil disimpan.";
      msgOutput.style.color = "green";
      document.getElementById('rsvp-form').reset();
    })
    .catch(() => {
      msgOutput.textContent = "❌ Terjadi kesalahan. Silakan coba lagi.";
      msgOutput.style.color = "red";
    })
    .finally(() => {
      btnSubmit.disabled = false;
      btnSubmit.textContent = "Kirim Konfirmasi";
    });
  });
});

// Tambahkan kode ini di dalam document.addEventListener("DOMContentLoaded", () => { ... })

  // 10. EFEK PARTIKEL 3D MELAYANG DI BACKGROUND
  const bgParticles = document.createElement('div');
  bgParticles.className = 'bg-particles';
  document.body.appendChild(bgParticles);

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 12 + 6;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${Math.random() * 10 + 8}s`;
    bgParticles.appendChild(particle);
  }

  // 11. EFEK 3D TILT PADA KARTU GLASSMORPHISM
  const cards = document.querySelectorAll('.glass-card, .cover-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `perspective(1000px) rotateX(${-y / 25}deg) rotateY(${x / 25}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
