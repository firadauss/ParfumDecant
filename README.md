# DecantKans Parfume (versi statis)

HTML + CSS + JavaScript murni, tanpa PHP dan tanpa database.

## Struktur
- `index.html`      : halaman utama
- `assets/style.css`: tampilan
- `assets/app.js`   : logika (render produk, harga, filter, kuis)
- `assets/data.js`  : DATA TOKO (produk, harga, kontak, link TikTok). Ubah harga di sini.
- `assets/img/`     : foto produk

## Ubah harga / produk
Edit `assets/data.js`, lalu deploy ulang. Harga 0 = ukuran disembunyikan; `aktif: false` = produk disembunyikan.

## Deploy ke Vercel
Cara 1 (GitHub): upload folder ini ke repo GitHub, lalu di vercel.com pilih Add New > Project > import repo.
Framework Preset: Other, Build Command dan Output Directory dikosongkan, lalu Deploy.
Cara 2 (CLI): `npm i -g vercel` lalu jalankan `vercel` di dalam folder ini.

## Tes lokal
Buka `index.html` langsung di browser, atau jalankan `npx serve`.
