document.addEventListener("DOMContentLoaded", () => {
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el && text !== undefined) el.textContent = text;
  };

  // 1. Ambil Nama Tamu dari URL (?to=Nama+Tamu)
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

    // 3. Audio Controller (Rotating Disc Effect)
    const audio = document.getElementById('bg-music');
    const btnMusic = document.getElementById('btn-music');
    if (audio && CONFIG.musikUrl) audio.src = CONFIG.musikUrl;
    let isPlaying = false;

    const toggleMusic = () => {
      if (!audio) return;
      if (isPlaying) {
        audio.pause();
        btnMusic.classList.remove('playing');
        isPlaying = false;
      } else {
        audio.play().then(() => {
          isPlaying = true;
          btnMusic.classList.add('playing');
        }).catch(() => {});
      }
    };

    if (btnMusic) btnMusic.addEventListener('click', toggleMusic);

    // 4. Buka Undangan
    const btnBuka = document.getElementById('btn-buka');
    if (btnBuka) {
      btnBuka.addEventListener('click', () => {
        const cover = document.getElementById('cover');
        const mainContent = document.getElementById('main-content');
        if (cover) cover.classList.add('hidden');
        if (mainContent) mainContent.classList.remove('hidden');
        if (audio && CONFIG.musikUrl) {
          audio.play().then(() => {
            isPlaying = true;
            if (btnMusic) btnMusic.classList.add('playing');
          }).catch(() => {});
        }
      });
    }

    // 5. Countdown Timer
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
        el.innerHTML = `<div class="timeline-year">${item.tahun}</div><p style="font-size: 0.85rem; color: var(--text-muted);">${item.cerita}</p>`;
        timelineContainer.appendChild(el);
      });
    }

    // 7. Carousel Foto
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

    // 8. Google Calendar Button
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

    // 9. Submit RSVP
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
              msgOutput.textContent = "✅ Terimakasih! Konfirmasi Anda telah tersimpan.";
              msgOutput.style.color = "green";
            }
            rsvpForm.reset();
          })
          .catch(() => {
            if (msgOutput) {
              msgOutput.textContent = "❌ Gagal mengunggah data. Coba lagi.";
              msgOutput.style.color = "red";
            }
          })
          .finally(() => {
            if (btnSubmit) {
              btnSubmit.disabled = false;
              btnSubmit.textContent = "Kirim RSVP";
            }
          });
        }
      });
    }
  }
});
