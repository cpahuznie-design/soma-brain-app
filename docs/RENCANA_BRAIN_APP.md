# APLIKASI KESEHATAN OTAK PRIBADI
## Spesifikasi & Mapping untuk Pak Husni

---

## 1. 10 IDE NAMA APLIKASI

| No | Nama | Arti | Kenapa Cocok |
|---|---|---|---|
| 1 | **Neura** | Saraf / Neuro | Singkat, ilmiah, mudah diingat. Terdengar seperti app kesehatan otak modern |
| 2 | **Lumen** | Cahaya | Otak yang terang = jernih, fokus, tidak brain fog. Elegant |
| 3 | **Zense** | Zen + Sense | Ketenangan + indera yang tajam. Cocok untuk stress + focus |
| 4 | **Clario** | Clear / Jernih | Otak jernih, pikiran jelas. Mudah ucap, mudah ingat |
| 5 | **Vivo** | Hidup / Vital | Otak yang hidup kembali, aktif, berfungsi. Pendek, kuat |
| 6 | **Soma** | Tubuh (Yunani) | Tapi terdengar seperti "somatik" = kesadaran tubuh & pikiran |
| 7 | **Menti** | Mental / Mind | Pendek, manis, langsung jelas ini tentang otak/pikiran |
| 8 | **Brainy** | Pintar / Otak | Playful, mudah diingat, anak-anak sampai dewasa paham |
| 9 | **Focusly** | Fokus + -ly | Fokus adalah masalah utama, nama langsung menjawab |
| 10 | **Reset** | Reset otak | Reset dari stress, insomnia, brain fog. Kuat, actionable |

### REKOMENDASI:
- **Jika mau elegant & ilmiah:** Neura atau Lumen
- **Jika mau yang langsung jelas fungsinya:** Focusly atau Brainy
- **Jika mau yang pendek & kuat:** Reset atau Vivo
- **Jika mau yang unik:** Zense atau Clario

---

## 2. MAPPING APLIKASI

```
brain-app/
├── index.html                  → Landing page
├── login.html                  → Login personal (Bapak pakai sendiri)
├── dashboard.html              → Brain Health Dashboard (ringkasan harian)
│
├── sleep.html                  → Sleep Therapy (Terapi Tidur)
│   ├── Tracker jam tidur & bangun
│   ├── Skor kualitas tidur (1-10)
│   ├── Catatan: terbangun, mimpi, rasa bangun
│   ├── Tips tidur personal
│   ├── Suara relaksasi (white noise, rain)
│   ├── Pengingat jam tidur
│   └── Doa sebelum tidur
│
├── memory.html                 → Memory Trainer (Latihan Ingatan)
│   ├── Flashcard digital (Quran, vocab, angka)
│   ├── Mode game: hafal urutan, mencocokkan
│   ├── Spaced repetition (ulang 1/3/7/21 hari)
│   ├── Catatan "yang sering dilupa"
│   ├── Memory score harian
│   └── Progress tracking
│
├── focus.html                  → Focus Therapy (Terapi Konsentrasi)
│   ├── Pomodoro timer (upgrade dari Sage)
│   ├── Latihan fokus: countdown tanpa gangguan
│   ├── Tracking level fokus (1-10, sebelum & sesudah)
│   ├── Breathing exercise (4-7-8 technique)
│   ├── Noise generator (rain, ocean, forest)
│   └── Focus score harian
│
├── learn.html                  → Learning Assistant (Belajar & Hafal)
│   ├── Input materi yang mau dihafal
│   ├── Pecah jadi chunk kecil
│   ├── Jadwal ulang otomatis (spaced repetition)
│   ├── Quiz: tulis dari ingatan
│   ├── Progress: berapa persen hafal
│   └── Materi: Quran, vocab, nama, angka penting
│
├── relax.html                  → Stress Relief (Relaksasi & Anti-Stress)
│   ├── Breathing exercise (4-7-8, box breathing)
│   ├── Guided meditation (text-based, timer)
│   ├── Suara alam (rain, ocean, forest, birds)
│   ├── Stress level tracker (1-10 harian)
│   ├── Journal: tulis apa yang bikin stress
│   ├── Saran: aktivitas anti-stress
│   └── Doa & dzikir untuk ketenangan
│
├── analytics.html              → Brain Analytics (Analisa Otak)
│   ├── Ringkasan: tidur, memory, focus, stress
│   ├── Tren mingguan & bulanan
│   ├── Korelasi: tidur vs memory, stress vs focus
│   ├── Saran personal berdasarkan pola
│   ├── Target: jam tidur ideal, latihan per hari
│   └── Achievement badge
│
├── settings.html               → Pengaturan
│   ├── Profil
│   ├── Pengingat notifikasi
│   ├── Target personal
│   └── Preferensi
│
├── notifications.js            → Sistem notifikasi
├── docs/
│   └── RENCANA_BRAIN_APP.md    → Dokumen ini
└── assets/
    └── sounds/                 → File suara (generate via Web Audio API)
```

---

## 3. CORE APLIKASI

### MASALAH YANG DIJAWAB:

| Masalah | Solusi di App | Halaman |
|---|---|---|
| **Stress** | Breathing exercise, suara alam, journal, dzikir | relax.html |
| **Gangguan Tidur** | Sleep tracker, tips, white noise, pengingat, doa | sleep.html |
| **Sulit Fokus** | Pomodoro, latihan countdown, noise generator | focus.html |
| **Otak Tidak Belajar** | Memory game, flashcard, spaced repetition, quiz | memory.html + learn.html |

### FILOSOFI CORE:

```
Tidur Baik → Otak Istirahat → Bisa Fokus → Bisa Belajar → Memory Meningkat
    ↑                                                                    |
    └──────────── Stress Turun ← Otak Aktif ← Memory Meningkat ←────────┘
```

SEMUA TERHUBUNG. Tidur buruk = stress naik = fokus turun = tidak bisa belajar = memory menurun = otak malas = stress naik = tidur buruk lagi.

Aplikasi ini MEMUTUS SIKLUS BURUK itu:
1. Fix tidur dulu → otak bisa istirahat
2. Latih fokus → otak mulai aktif
3. Mulai belajar → otak terangsang
4. Latih memory → otak makin kuat
5. Stress turun → tidur makin baik
6. SIKLUS BAIK terbentuk

### PRIORITAS PENGEMBANGAN:

Phase 1 — Fondasi (yang paling urgent):
1. Sleep Therapy (fix tidur dulu)
2. Stress Relief (tenangkan pikiran)
3. Brain Dashboard (lihat progress)

Phase 2 — Latihan Otak:
4. Focus Therapy (latih konsentrasi)
5. Memory Trainer (latih ingatan)

Phase 3 — Belajar Aktif:
6. Learning Assistant (hafal materi)
7. Brain Analytics (analisa pola)

---

## 4. TEKNOLOGI

- HTML5, CSS3, JavaScript (Vanilla)
- localStorage untuk data pribadi
- Web Audio API untuk suara relaksasi
- Browser Notification API untuk pengingat
- SVG untuk grafik & visual
- Responsive mobile-first
- No backend, no external library
- Bisa dibuka di HP/laptop browser

---

## 5. TEMA DESIGN

- Tema: CALM & FOCUS (beda dari Sage yang fresh nature)
- Warna utama: Deep blue (#1e3a5f) + Teal (#0d9488) + Soft lavender (#a5b4fc)
- Background: Dark calm (#0f172a) atau light calm (#f0f4f8)
- Font: Clean, rounded, mudah dibaca
- Suasana: Menenangkan, tidak terlalu cerah, fokus
- Animasi: Slow, gentle, tidak distracting