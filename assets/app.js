(() => {
  const { config: C, products: ALL } = window.DK_DATA;

  const rp = n => 'Rp ' + Number(n).toLocaleString('id-ID');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const wa = text => `https://wa.me/${C.waNumber}?text=${encodeURIComponent(text)}`;
  const sizesOf = p => Object.entries(p.harga).map(([ml, h]) => [+ml, +h]).filter(([, h]) => h > 0).sort((a, b) => a[0] - b[0]);
  const lowest = p => Math.min(...sizesOf(p).map(([, h]) => h));

  // Hanya produk aktif yang punya minimal satu harga (sama seperti versi PHP)
  const products = ALL.filter(p => p.aktif !== false && sizesOf(p).length);
  const mulai = products.length ? Math.min(...products.map(lowest)) : 0;

  // ---------- isi bagian umum (link, kontak, harga mulai, tahun) ----------
  const links = {
    tiktokShop: C.tiktokShop,
    tiktokProfil: C.tiktokProfil,
    wa: wa('Halo DecantKans, saya mau tanya parfum.'),
    email: 'mailto:' + C.email
  };
  document.querySelectorAll('[data-link]').forEach(a => { a.href = links[a.dataset.link]; });
  document.querySelectorAll('[data-mulai]').forEach(e => { e.textContent = rp(mulai); });
  document.querySelectorAll('[data-jumlah]').forEach(e => { e.textContent = products.length; });
  document.querySelectorAll('[data-tahun]').forEach(e => { e.textContent = new Date().getFullYear(); });
  document.querySelectorAll('[data-alamat]').forEach(e => { e.textContent = C.alamat; });
  document.querySelectorAll('a[data-link="wa"]').forEach(a => { if (a.classList.contains('float-wa') === false) a.textContent = C.waTampil; });
  document.querySelectorAll('a[data-link="email"]').forEach(a => { a.textContent = C.email; });
  if (products.length) {
    document.title = `DecantKans Parfume | Parfum Original Mulai ${rp(mulai)}`;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.content = `Decant parfum Mykonos & Velixir 100% original tanpa campuran. Coba 1 ml dulu, mulai ${rp(mulai)}. Beli 5 ml gratis 1 ml, beli 10 ml gratis 2 ml parfum random.`;
  }

  // ---------- botol di hero ----------
  const hero = document.getElementById('hero-vials');
  ['glitch', 'crimson', 'inception'].forEach((slug, i) => {
    const p = products.find(x => x.slug === slug);
    if (!p || !p.foto) return;
    hero.insertAdjacentHTML('beforeend',
      `<div class="hv v${i}"><img src="${esc(p.foto)}" alt="" loading="eager"><em>${esc(p.nama)}</em></div>`);
  });

  // ---------- kartu produk ----------
  const grid = document.getElementById('grid');
  grid.innerHTML = products.map(p => {
    const sizes = sizesOf(p);
    const nama = `${p.brand} ${p.nama}`;
    const media = p.foto
      ? `<img src="${esc(p.foto)}" alt="Parfum ${esc(nama)}" loading="lazy">`
      : `<div class="vial sm"><i class="cap"></i><i class="body"><i class="liq"></i></i></div>`;
    const radios = sizes.map(([ml, h], i) =>
      `<label><input type="radio" name="s-${esc(p.slug)}" value="${ml}" data-h="${h}"${i === 0 ? ' checked' : ''}><span>${ml} ml</span></label>`).join('');
    return `
    <article class="card" data-brand="${esc(p.brand)}" data-nama="${esc(nama)}" style="--c1:${esc(p.c1)};--c2:${esc(p.c2)}">
      <div class="card-top">${media}<span class="brand">${esc(p.brand)}</span></div>
      <h3>${esc(p.nama)}</h3>
      <p class="teaser">${esc(p.teaser)}</p>
      <div class="sizes">${radios}</div>
      <label class="vip"><input type="checkbox" data-vip="${C.hargaVipBotol}"> Botol VIP 10 ml (+${rp(C.hargaVipBotol)}, hanya ukuran 10 ml)</label>
      <div class="price-row"><span class="price">${rp(lowest(p))}</span><small class="bonus"></small></div>
      <a class="btn btn-block buy" href="${esc(C.tiktokShop)}" target="_blank" rel="noopener">Beli di TikTok Shop</a>
      <a class="ask" href="#" target="_blank" rel="noopener">Tanya dulu lewat WhatsApp</a>
    </article>`;
  }).join('');

  // harga & link WhatsApp per kartu
  document.querySelectorAll('.card').forEach(card => {
    const price = card.querySelector('.price'), bonus = card.querySelector('.bonus');
    const vip = card.querySelector('.vip input'), vipWrap = card.querySelector('.vip');
    const ask = card.querySelector('.ask');
    const update = () => {
      const r = card.querySelector('.sizes input:checked');
      const ml = +r.value; let total = +r.dataset.h;
      const vipOk = ml === 10; vipWrap.classList.toggle('off', !vipOk); vip.disabled = !vipOk;
      if (!vipOk) vip.checked = false;
      if (vip.checked) total += +vip.dataset.vip;
      price.textContent = rp(total);
      bonus.textContent = ml === 5 ? 'Gratis 1 ml random' : ml === 10 ? 'Gratis 2 ml random' : '';
      ask.href = wa(`Halo DecantKans, saya mau order ${card.dataset.nama} ${ml} ml${vip.checked ? ' (botol VIP)' : ''}. Masih ada?`);
    };
    card.addEventListener('change', update); update();
  });

  // ---------- filter merek (dibuat otomatis dari data) ----------
  const filters = document.getElementById('filters');
  const brands = [...new Set(products.map(p => p.brand))];
  filters.innerHTML = ['Semua', ...brands].map((b, i) =>
    `<button${i === 0 ? ' class="on"' : ''} data-f="${i === 0 ? 'all' : esc(b)}">${esc(b)}</button>`).join('');
  filters.querySelectorAll('button').forEach(b => b.onclick = () => {
    filters.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
    document.querySelectorAll('.card').forEach(c => c.hidden = b.dataset.f !== 'all' && c.dataset.brand !== b.dataset.f);
  });

  // ---------- wangi misterius ----------
  const hints = [
    'Salah satu dari koleksi Mykonos atau Velixir…',
    'Wanginya bisa jadi yang paling kamu hindari, lalu ternyata paling kamu suka.',
    'Tidak ada yang tahu isinya sampai paket dibuka, termasuk kamu.'
  ];
  let hi = 0;
  const gift = document.getElementById('reveal');
  gift.onclick = () => {
    gift.classList.remove('shake'); void gift.offsetWidth; gift.classList.add('shake');
    gift.querySelector('.t').textContent = hints[hi++ % hints.length];
  };

  // ---------- kuis ----------
  const ans = {};
  document.querySelectorAll('.q-block').forEach(block => {
    block.querySelectorAll('button').forEach(btn => btn.onclick = () => {
      ans[block.dataset.q] = btn.dataset.v;
      block.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === btn));
      if (ans.vibe && ans.moment) showResult();
    });
  });
  function showResult() {
    if (!products.length) return;
    const scored = products.map(p => ({ p, s: (p.tags.includes(ans.vibe) ? 2 : 0) + (p.tags.includes(ans.moment) ? 1 : 0) }))
      .sort((a, b) => b.s - a.s);
    const best = scored[0].p, res = document.getElementById('result');
    const nama = `${best.brand} ${best.nama}`;
    res.style.setProperty('--c1', best.c1); res.style.setProperty('--c2', best.c2);
    res.innerHTML = `<h3>${esc(nama)}</h3><p>${esc(best.teaser)}</p>
      <a class="btn" href="${esc(C.tiktokShop)}" target="_blank" rel="noopener">Beli di TikTok Shop</a>
      <a class="btn" href="${wa(`Halo DecantKans, hasil kuis saya ${nama}. Boleh coba 1 ml?`)}" target="_blank" rel="noopener">Tanya lewat WhatsApp</a>`;
    res.hidden = false;
  }
})();
