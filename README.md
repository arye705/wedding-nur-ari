# Wedding Invitation — Nur & Ari

Website undangan pernikahan satu halaman, dibuat dengan Next.js App Router, TypeScript, dan Tailwind CSS v4. Desain mengikuti konsep editorial floral ivory/blush/warm brown dan dibuat mobile-first.

## Menjalankan project

Gunakan Node.js 20.9 atau lebih baru.

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

Untuk memeriksa build produksi:

```bash
npm run build
npm start
```

## Sebelum publish — wajib dilakukan

1. Masukkan foto asli ke `public/images/` dengan nama:
   - `hero.jpg` (foto utama pilihan)
   - `bride.jpg` (potret Nur)
   - `groom.jpg` (potret Ari)
2. Masukkan foto galeri asli ke `public/images/gallery/` sesuai nama yang sudah terdaftar di `src/data/wedding.ts`, atau ubah daftar path di file tersebut.
3. Saat ini komponen gambar masih berupa placeholder visual agar project tetap bisa dijalankan sebelum file foto final dipilih. Ganti komponen `ImagePlaceholder` dengan elemen `Image`/`img` yang memakai path aset ketika foto siap.
4. Konfirmasi alamat lengkap venue, lalu isi `venueName`, `venueAddress`, dan `mapsUrl` di `src/data/wedding.ts`.
5. Tombol musik saat ini adalah kontrol UI demonstrasi; belum memainkan audio karena file musik belum disediakan. Tambahkan file audio yang memiliki izin penggunaan dan implementasikan pemutaran setelah aset tersedia.
6. Form ucapan saat ini menyimpan data sementara di state browser saja. Agar ucapan tersimpan lintas perangkat dan tidak hilang saat refresh, sambungkan ke database/backend sebelum website dipublikasikan.

## Interaksi yang sudah dibuat

- Cover pembuka dan transisi masuk undangan.
- Navigasi mobile yang bisa dibuka/tutup.
- Countdown menuju akad (berdasarkan waktu ISO WITA di data undangan).
- Animasi reveal saat section masuk viewport, hover pada kartu, dan animasi bar musik.
- Galeri dengan modal/lightbox, navigasi foto memakai tombol dan keyboard (Escape, panah kiri/kanan).
- Form ucapan interaktif sementara dengan validasi dasar dan penghitung karakter.
- Tombol template Google Calendar.
- Hormati `prefers-reduced-motion`.

## Catatan akurasi

Data tanggal dan waktu sesuai informasi: Senin, 7 Desember 2026; akad 10.00 WITA; resepsi 11.00 WITA. Lokasi lengkap belum dikonfirmasi dan sengaja tidak dibuat-buat.
