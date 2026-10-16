/*
 * DATA TOKO DECANTKANS (pengganti database MySQL + admin.php)
 *
 * Cara ubah harga / produk:
 *   1. Edit file ini.
 *   2. Simpan, lalu deploy ulang ke Vercel (kalau pakai GitHub: commit + push, otomatis ter-deploy).
 *
 * Aturan:
 *   - harga 0           -> ukuran itu disembunyikan.
 *   - aktif: false      -> produk tidak tampil di website.
 *   - tags              -> dipakai kuis: fresh, bold, elegant (vibe) / day, night, date (momen).
 *   - foto              -> path gambar di folder assets/img (kosongkan '' untuk memakai ikon botol).
 *   - urutan produk     -> sesuai urutan di daftar ini.
 */
window.DK_DATA = {
  config: {
    tiktokShop: 'https://vt.tiktok.com/ZSbrr4x3W/?page=Mall',
    tiktokProfil: 'https://www.tiktok.com/@decantkans',
    waNumber: '6287871023730',
    waTampil: '0878-7102-3730',
    email: 'decantkans@gmail.com',
    alamat: 'JL Sirtu Nomor 214, Semanan, Kalideres, Jakarta Barat',
    hargaVipBotol: 5000
  },

  // Harga di bawah masih ESTIMASI awal dari schema.sql. Samakan dengan harga di TikTok Shop.
  products: [
    { slug: 'myego', brand: 'Mykonos', nama: 'MyEgo', aktif: true,
      teaser: 'Untuk kamu yang masuk ruangan dan langsung jadi pusat obrolan.',
      c1: '#D7263D', c2: '#2B0A10', foto: 'assets/img/myego.jpg', tags: ['bold', 'night'],
      harga: { 1: 14000, 2: 25000, 5: 55000, 10: 100000 } },

    { slug: 'crimson', brand: 'Mykonos', nama: 'Crimson', aktif: true,
      teaser: 'Merah anggur, kemasan emas, dan tassel hitam. Dia pasti nanya kamu pakai apa.',
      c1: '#E0479E', c2: '#6B1240', foto: 'assets/img/crimson.jpg', tags: ['elegant', 'date'],
      harga: { 1: 14000, 2: 25000, 5: 55000, 10: 100000 } },

    { slug: 'glitch', brand: 'Mykonos', nama: 'Glitch', aktif: true,
      teaser: 'Segar ala kota futuristik. Cocok kalau harimu panjang dan macet.',
      c1: '#2FE0C8', c2: '#0E6E7A', foto: 'assets/img/glitch.jpg', tags: ['fresh', 'day'],
      harga: { 1: 14000, 2: 25000, 5: 55000, 10: 100000 } },

    { slug: 'inception', brand: 'Mykonos', nama: 'Inception', aktif: true,
      teaser: 'Biru royal dengan sentuhan emas. Kesan pertama yang susah dilupakan.',
      c1: '#2E5BFF', c2: '#0B1B66', foto: 'assets/img/inception.jpg', tags: ['elegant', 'night'],
      harga: { 1: 14000, 2: 25000, 5: 55000, 10: 100000 } },

    { slug: 'dreamscape', brand: 'Mykonos', nama: 'Dreamscape', aktif: true,
      teaser: 'Seperti mimpi siang hari yang tidak mau kamu akhiri.',
      c1: '#5FD6E8', c2: '#1E8FB0', foto: 'assets/img/dreamscape.jpg', tags: ['fresh', 'date'],
      harga: { 1: 14000, 2: 25000, 5: 55000, 10: 100000 } },

    { slug: 'paladin', brand: 'Velixir', nama: 'Paladin', aktif: true,
      teaser: 'Kesatria yang tenang, tapi semua orang tahu dia sudah datang.',
      c1: '#8E3FD1', c2: '#2A0F45', foto: 'assets/img/paladin.jpg', tags: ['bold', 'date'],
      harga: { 1: 18000, 2: 32000, 5: 70000, 10: 130000 } },

    { slug: 'asteria', brand: 'Velixir', nama: 'Asteria', aktif: true,
      teaser: 'Gradasi senja dari koral ke ungu. Lembut, tapi meninggalkan jejak.',
      c1: '#FF7A6B', c2: '#7B2CBF', foto: 'assets/img/asteria.jpg', tags: ['elegant', 'date'],
      harga: { 1: 18000, 2: 32000, 5: 70000, 10: 130000 } },

    { slug: 'apollo', brand: 'Velixir', nama: 'Apollo', aktif: true,
      teaser: 'Dewa matahari, tapi wanginya justru betah dipakai sampai malam.',
      c1: '#3B8CFF', c2: '#0A2A5E', foto: 'assets/img/apollo.jpg', tags: ['fresh', 'night'],
      harga: { 1: 18000, 2: 32000, 5: 70000, 10: 130000 } },

    { slug: 'icarus', brand: 'Velixir', nama: 'Icarus', aktif: true,
      teaser: 'Terbang terlalu dekat dengan matahari? Kamu berani coba?',
      c1: '#1F5FA8', c2: '#07182F', foto: 'assets/img/icarus.jpg', tags: ['bold', 'day'],
      harga: { 1: 18000, 2: 32000, 5: 70000, 10: 130000 } }
  ]
};
