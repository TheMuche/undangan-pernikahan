document.addEventListener("DOMContentLoaded", () => {
  // Fungsi pembantu untuk mengisi teks secara aman
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el && text !== undefined) el.textContent = text;
  };

  // 1. Dapatkan Nama Tamu dari URL Parameter (?to=Nama+Tamu)
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to');
  if (guestName) {
    setText('nama-tamu', guestName);
    const rsvpInput = document.getElementById('rsvp-nama');
    if (rsvpInput) rsvpInput.value = guestName;
  }

  // 2. Load data dari config.js
  if (typeof CONFIG !== 'undefined') {
    const namaPasangan = `${CONFIG.mempelaiPria?.namaPanggilan || 'Pria'} & ${CONFIG.mempelaiWanita?.namaPanggilan || 'Wanita'}`;
    setText('cover-mempelai', namaPasangan);
    setText('hero-mempelai', namaPasangan);
    setText('footer-mempelai', namaPasangan);
    setText('hero-waktu', CONFIG.waktuTeks || '');
    setText('pria-nama', CONFIG.mempelaiPria?.namaLengkap || '');
    setText('pria-ortu', CONFIG.mempelaiPria?.namaOrangTua || '');
    setText('wanita-nama', CONFIG.mempelaiWanita?.namaLengkap || '');
    setText('wanita-ortu', CONFIG.mempelaiWanita?.namaOrangTua || '');
    setText('event-waktu', CONFIG.waktuTeks || '');
    setText('lokasi-nama', CONFIG.lokasiNama || '');
    setText('lokasi-alamat', CONFIG.lokasiAlamat || '');

    const btnMaps = document.getElementById('btn-maps');
    if (btnMaps && CONFIG.googleMapsUrl) btnMaps.href = CONFIG.googleMapsUrl;

    // 3. Pengontrol Musik
    const audio = document.getElementById('bg-music');
    if (audio && CONFIG.musikUrl) audio.src = CONFIG.musikUrl;
    let isPlaying = false;

    const toggleMusic = () => {
      if (!audio) return;
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
      } else {
        audio.play().then(() => { isPlaying = true; }).catch(() => {});
      }
    };

    const btnMusic = document.getElementById('btn-music');
    if (btnMusic) btnMusic.addEventListener('click', toggleMusic);

    // 4. Tombol Buka Undangan
    const btnBuka = document.getElementById('btn-buka');
    if (btnBuka) {
      btnBuka.addEventListener('click', () => {
        const cover = document.getElementById('cover');
        const mainContent = document.getElementById('main-content');
        if (cover) cover.classList.add('hidden');
        if (mainContent) mainContent.classList.remove('hidden');
        if (audio && CONFIG.musikUrl) {
          audio.play().then(() => { isPlaying = true; }).catch(() => {});
        }
      });
    }

    // 5. Hitung Mundur (Countdown)
    if (CONFIG.tanggalPernikahan) {
      const targetDate = new Date(CONFIG.tanggalPernikahan).getTime();
      setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff > 0) {
          setText('days', Math.floor(diff / (1000 * 60 * 60 * 24)));
          setText('hours', Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
          setText('minutes', Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
          setText('seconds', Math.floor((diff % (1000 * 60)) / 1000));
        }
      }, 1000);
    }

    // 6. Timeline Kisah Cinta
    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer && Array.isArray(CONFIG.kisahCinta)) {
      timelineContainer.innerHTML = '';
      CONFIG.kisahCinta.forEach(item => {
        const el = document.createElement('div');
        el.className = 'timeline-item';
        el.innerHTML = `<div class="timeline-year">${item.tahun}</div><p>${item.cerita}</p>`;
        timelineContainer.appendChild(el);
      });
    }

    // 7. Carousel Galeri Foto
    let currentImgIndex = 0;
    const carouselImg = document.getElementById('carousel-img');
    const updateCarousel = () => {
      if (carouselImg && Array.isArray(CONFIG.fotoGaleri) && CONFIG.fotoGaleri.length > 0) {
        carouselImg.src = CONFIG.fotoGaleri[currentImgIndex];
      }
    };
    updateCarousel();

    const btnNext = document.getElementById('next-slide');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (CONFIG.fotoGaleri && CONFIG.fotoGaleri.length > 0) {
          currentImgIndex = (currentImgIndex + 1) % CONFIG.fotoGaleri.length;
          updateCarousel();
        }
      });
    }

    const btnPrev = document.getElementById('prev-slide');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (CONFIG.fotoGaleri && CONFIG.fotoGaleri.length > 0) {
          currentImgIndex = (currentImgIndex - 1 + CONFIG.fotoGaleri.length) % CONFIG.fotoGaleri.length;
          updateCarousel();
        }
      });
    }

    // 8. Tambah ke Google Calendar
    const btnCalendar = document.getElementById('btn-calendar');
    if (btnCalendar) {
      btnCalendar.addEventListener('click', () => {
        const title = encodeURIComponent(`Pernikahan ${CONFIG.mempelaiPria?.namaPanggilan || ''} & ${CONFIG.mempelaiWanita?.namaPanggilan || ''}`);
        const details = encodeURIComponent(`Acara Pernikahan ${CONFIG.mempelaiPria?.namaLengkap || ''} & ${CONFIG.mempelaiWanita?.namaLengkap || ''}`);
        const location = encodeURIComponent(`${CONFIG.lokasiNama || ''}, ${CONFIG.lokasiAlamat || ''}`);
        const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261213T060000Z/20261213T080000Z&details=${details}&location=${location}`;
        window.open(calUrl, '_blank');
      });
    }

    // 9. Kirim RSVP ke Google Sheets
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
      rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btnSubmit = document.getElementById('btn-submit-rsvp');
        const msgOutput = document.getElementById('rsvp-response-message');

        if (btnSubmit) {
          btnSubmit.disabled = true;
          btnSubmit.textContent = "Mengirim...";
        }

        const payload = {
          nama: document.getElementById('rsvp-nama')?.value || '',
          kehadiran: document.getElementById('rsvp-status')?.value || '',
          jumlahTamu: document.getElementById('rsvp-jumlah')?.value || '',
          pesan: document.getElementById('rsvp-pesan')?.value || ''
        };

        if (CONFIG.googleScriptUrl && CONFIG.googleScriptUrl.startsWith('http')) {
          fetch(CONFIG.googleScriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
          .then(() => {
            if (msgOutput) {
              msgOutput.textContent = "✅ Terima kasih! Konfirmasi Anda telah berhasil disimpan.";
              msgOutput.style.color = "#2e7d32";
            }
            rsvpForm.reset();
          })
          .catch(() => {
            if (msgOutput) {
              msgOutput.textContent = "❌ Terjadi kesalahan. Silakan coba lagi.";
              msgOutput.style.color = "#d32f2f";
            }
          })
          .finally(() => {
            if (btnSubmit) {
              btnSubmit.disabled = false;
              btnSubmit.textContent = "Kirim Konfirmasi";
            }
          });
        } else {
          if (msgOutput) {
            msgOutput.textContent = "⚠️ Link Google Script belum diisi di config.js";
            msgOutput.style.color = "#b71c1c";
          }
          if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.textContent = "Kirim Konfirmasi";
          }
        }
      });
    }
  }

  // 10. Efek Partikel Melayang 3D
  try {
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
  } catch(e) {}

  // 11. Efek 3D Tilt Kartu Kaca
  try {
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
  } catch(e) {}
});
