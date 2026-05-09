const catIcons = {
  audio:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>`,
  teclado:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/></svg>`,
  mouse:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><rect x="6" y="3" width="12" height="18" rx="6"/><line x1="12" y1="3" x2="12" y2="9"/></svg>`,
  carregador: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M5 12H3l9-9 9 9h-2"/><path d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/><path d="M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6"/></svg>`,
  storage:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  cabo:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>`,
  gadget:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
};

// ─── DATA ───
const products = [
  { id:1,  name:'Pro X Elite ANC',     cat:'audio',      price:89.99,  old:119.99, badge:'sale', desc:'Cancelamento de ruído ativo, 40h bateria, drivers 40mm premium.' },
  { id:2,  name:'BassCore 500',        cat:'audio',      price:59.99,  old:null,   badge:null,   desc:'Graves profundos, design over-ear confortável, Bluetooth 5.3.' },
  { id:3,  name:'MechBoard TKL Pro',   cat:'teclado',    price:149.99, old:189.99, badge:'sale', desc:'Switches Red linear, RGB per-key, alumínio anodizado CNC.' },
  { id:4,  name:'TypeMaster 65%',      cat:'teclado',    price:119.99, old:null,   badge:'new',  desc:'Layout compacto 65%, switches Brown táteis, hot-swap.' },
  { id:5,  name:'Precision Air X',     cat:'mouse',      price:59.99,  old:null,   badge:null,   desc:'Sensor PixArt 3395, 26000 DPI, peso 52g, sem fio 2.4GHz.' },
  { id:6,  name:'GlideMax Pro',        cat:'mouse',      price:79.99,  old:99.99,  badge:'sale', desc:'Sensor óptico top, 8 botões programáveis, RGB lateral.' },
  { id:7,  name:'TurboCharge 65W',     cat:'carregador', price:34.99,  old:null,   badge:null,   desc:'GaN III compacto, USB-C + USB-A, carga rápida PD 3.0.' },
  { id:8,  name:'PowerGaN 100W',       cat:'carregador', price:54.99,  old:69.99,  badge:'sale', desc:'3 portas simultâneas, 100W total, indicador LED inteligente.' },
  { id:9,  name:'SpeedDrive 256GB',    cat:'storage',    price:29.99,  old:null,   badge:null,   desc:'USB 3.2 Gen 2, leitura 400MB/s, design metal compacto.' },
  { id:10, name:'NanoSSD 1TB',         cat:'storage',    price:89.99,  old:null,   badge:'new',  desc:'M.2 NVMe externo, 1000MB/s leitura, caixa alumínio.' },
  { id:11, name:'FusionCable Pro 2m',  cat:'cabo',       price:19.99,  old:null,   badge:null,   desc:'USB-C 240W, nylon trançado 2m, carga + dados 40Gbps.' },
  { id:12, name:'MagLink 1m',          cat:'cabo',       price:24.99,  old:null,   badge:'new',  desc:'Magnético USB-C, conexão automática 360°, LED de carga.' },
  { id:13, name:'SmartHub 7-in-1',     cat:'gadget',     price:49.99,  old:64.99,  badge:'sale', desc:'USB-C hub: HDMI 4K, 3x USB-A, SD card, PD 100W pass-through.' },
  { id:14, name:'NeckBand Flow',       cat:'audio',      price:44.99,  old:null,   badge:null,   desc:'Design pescoço, IPX5 resistente, 20h bateria, voz AI.' },
  { id:15, name:'WristTracker X3',     cat:'gadget',     price:39.99,  old:null,   badge:'new',  desc:'Monitor cardíaco, SpO2, GPS assistido, bateria 7 dias.' },
  { id:16, name:'WebCam 4K Ultra',     cat:'gadget',     price:99.99,  old:129.99, badge:'sale', desc:'4K 30fps, autofoco AI, microfone duplo com cancelamento de ruído.' },
];

// ─── STATE ───
let cart = [];
let user = null;
let discount = 0;
let currentProductFilter = 'all';
let userAvatar = null; // base64 image

// ─── THEME ───
function updateThemeIcons() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const sunSVG = `<svg viewBox="0 0 24 24" style="width:17px;height:17px;fill:currentColor"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"/></svg>`;
  const moonSVG = `<svg viewBox="0 0 24 24" style="width:17px;height:17px;fill:currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const icon = isDark ? sunSVG : moonSVG;
  ['theme-icon-landing','theme-icon-auth','theme-icon-main'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.parentElement.innerHTML = el.parentElement.innerHTML;
  });
  document.querySelectorAll('.theme-toggle').forEach(btn => btn.innerHTML = isDark ? sunSVG : moonSVG);
}

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('etnv-theme', isDark ? 'light' : 'dark');
  updateThemeIcons();
}

// Load saved theme
(function() {
  const saved = localStorage.getItem('etnv-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();

// ─── NAVIGATION ───
function goTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function setView(view, btnEl) {
  ['view-home','view-products','view-cart','view-profile'].forEach(v => {
    const el = document.getElementById(v);
    if (el) el.style.display = 'none';
  });
  const target = document.getElementById('view-' + view);
  if (target) target.style.display = view === 'cart' ? 'flex' : 'block';

  document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
  const nlMap = { home:'nl-home', products:'nl-products', profile:'nl-profile' };
  if (nlMap[view]) document.getElementById(nlMap[view])?.classList.add('active');

  if (view === 'cart') renderCart();
  if (view === 'products') renderProducts('all');
  if (view === 'home') renderHomeGrid('all');
  if (view === 'profile') renderProfile();
}

// ─── AUTH ───
function switchTab(tab, btn) {
  document.querySelectorAll('.auth-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
}

function doLogin() {
    // aqui validas login (exemplo simples)
    
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-pass").value;

    if (email && pass) {
        // login ok → vai para home
        window.location.href = ".html";
    } else {
        alert("Preenche os campos!");
    }
}

function doRegister() {
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const pass = document.getElementById('reg-pass').value;
  if (!name || !email || !pass) { showToast('Preenche todos os campos', 'warn'); return; }
  if (pass.length < 6) { showToast('Password mínimo 6 caracteres', 'warn'); return; }
  user = { name, email, phone: '', city: '' };
  enterApp();
}

function enterApp() {
  goTo('main');
  renderHomeGrid('all');
  renderProfile();
  updateAvatarBtn();
  updateThemeIcons();
  showToast('Bem-vindo, ' + user.name.split(' ')[0] + '!');
}

function logout() {
  user = null; cart = []; discount = 0; userAvatar = null;
  updateCartBadge();
  goTo('landing');
}

// ─── AVATAR ───
function updateAvatarBtn() {
  const btn = document.getElementById('avatar-btn');
  if (!btn || !user) return;
  if (userAvatar) {
    btn.innerHTML = `<img src="${userAvatar}" alt="avatar"/>`;
  } else {
    btn.textContent = user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }
}

function triggerAvatarUpload() {
  document.getElementById('avatar-file-input').click();
}

function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    userAvatar = e.target.result;
    renderProfile();
    updateAvatarBtn();
    showToast('Foto de perfil atualizada!');
  };
  reader.readAsDataURL(file);
}

// ─── PROFILE ───
function renderProfile() {
  if (!user) return;
  const initials = user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const avEl = document.getElementById('profile-av');
  if (avEl) {
    if (userAvatar) {
      avEl.innerHTML = `<img src="${userAvatar}" alt="avatar"/>`;
    } else {
      avEl.textContent = initials;
    }
  }
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || '—'; };
  set('profile-name-disp', user.name);
  set('profile-email-disp', user.email);
  set('pi-name', user.name);
  set('pi-email', user.email);
  set('pi-phone', user.phone || '—');
  set('pi-city', user.city || '—');
}

function toggleEditPanel() {
  const panel = document.getElementById('profile-edit-panel');
  const isOpen = panel.classList.contains('open');
  if (!isOpen && user) {
    document.getElementById('edit-name').value = user.name || '';
    document.getElementById('edit-email').value = user.email || '';
    document.getElementById('edit-phone').value = user.phone || '';
    document.getElementById('edit-city').value = user.city || '';
  }
  panel.classList.toggle('open');
}

function saveProfile() {
  if (!user) return;
  const name = document.getElementById('edit-name').value.trim();
  const email = document.getElementById('edit-email').value.trim();
  if (!name || !email) { showToast('Nome e email são obrigatórios', 'warn'); return; }
  user.name = name;
  user.email = email;
  user.phone = document.getElementById('edit-phone').value.trim();
  user.city = document.getElementById('edit-city').value.trim();
  renderProfile();
  updateAvatarBtn();
  toggleEditPanel();
  showToast('Perfil atualizado com sucesso!');
}

// ─── RENDER PRODUCTS ───
function createCardHTML(p, showFull = true) {
  const icon = catIcons[p.cat] || catIcons.gadget;
  const badgeLabel = p.badge === 'new' ? 'Novo' : 'Sale';
  return `
    <div class="product-card" style="animation:fadeUp 0.35s ease both;animation-delay:${(Math.random()*0.12).toFixed(2)}s">
      ${p.badge ? `<span class="card-badge ${p.badge}">${badgeLabel}</span>` : ''}
      <div class="card-img">
        <div class="card-img-inner" style="color:var(--text3);">${icon}</div>
      </div>
      <div class="card-body">
        <div class="card-cat">${p.cat}</div>
        <div class="card-name">${p.name}</div>
        ${showFull ? `<div class="card-desc">${p.desc}</div>` : ''}
        <div class="card-footer">
          <div class="card-price">
            ${p.old ? `<span class="old-price">€${p.old.toFixed(2)}</span>` : ''}
            €${p.price.toFixed(2)}
          </div>
          <button class="add-btn" onclick="addToCart(${p.id}, this)" title="Adicionar ao Carrinho">+</button>
        </div>
      </div>
    </div>`;
}

function renderHomeGrid(filter) {
  const grid = document.getElementById('home-grid');
  const list = filter === 'all' ? products.slice(0, 8) : products.filter(p => p.cat === filter).slice(0, 8);
  grid.innerHTML = list.map(p => createCardHTML(p)).join('');
}

function renderProducts(filter) {
  const grid = document.getElementById('products-grid');
  const search = (document.getElementById('search-input')?.value || '').toLowerCase();
  let list = filter === 'all' ? products : products.filter(p => p.cat === filter);
  if (search) list = list.filter(p => p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search));
  grid.innerHTML = list.map(p => createCardHTML(p)).join('');
}

function onSearch() {
  renderProducts(currentProductFilter);
}

function filterCat(cat, btn) {
  document.querySelectorAll('#view-home .cat-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderHomeGrid(cat);
}

function filterCatP(cat, btn) {
  currentProductFilter = cat;
  document.querySelectorAll('#view-products .cat-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
}

// ─── CART ───
function addToCart(id, btn) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(x => x.id === id);
  if (existing) { existing.qty++; } else { cart.push({ ...p, qty: 1 }); }
  updateCartBadge();
  btn.classList.add('added');
  btn.textContent = '✓';
  setTimeout(() => { btn.classList.remove('added'); btn.textContent = '+'; }, 1200);
  showToast(p.name + ' adicionado ao carrinho');
}

function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cart-count').textContent = total;
  document.getElementById('cart-header-count').textContent = `${total} ${total === 1 ? 'item' : 'itens'}`;
  const ps = document.getElementById('ps-cart');
  if (ps) ps.textContent = total;
}

function renderCart() {
  const list = document.getElementById('cart-items-list');
  if (cart.length === 0) {
    list.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">
          <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        </div>
        <h3>Carrinho vazio</h3>
        <p>Adiciona produtos para começar</p>
        <button class="btn-primary" style="margin-top:1.5rem;border-radius:var(--radius-sm);font-size:0.88rem;padding:11px 22px;" onclick="setView('products')">Ver Produtos</button>
      </div>`;
  } else {
    list.innerHTML = cart.map(item => {
      const icon = catIcons[item.cat] || catIcons.gadget;
      return `
        <div class="cart-item">
          <div class="ci-img">${icon}</div>
          <div class="ci-info">
            <div class="ci-cat">${item.cat}</div>
            <div class="ci-name">${item.name}</div>
            <div class="ci-price">€${(item.price * item.qty).toFixed(2)}</div>
          </div>
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="changeQty(${item.id},-1)">&#8722;</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeItem(${item.id})" title="Remover">
            <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>`;
    }).join('');
  }
  calcSummary();
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
  updateCartBadge();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(x => x.id !== id);
  updateCartBadge();
  renderCart();
}

function calcSummary() {
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const ship = sub > 0 ? 3.99 : 0;
  const disc = sub * discount;
  const total = sub + ship - disc;
  document.getElementById('sum-sub').textContent = `€${sub.toFixed(2)}`;
  document.getElementById('sum-ship').textContent = `€${ship.toFixed(2)}`;
  document.getElementById('sum-disc').textContent = disc > 0 ? `-€${disc.toFixed(2)}` : `€0.00`;
  document.getElementById('sum-total').textContent = `€${(sub > 0 ? total : 0).toFixed(2)}`;
}

function applyPromo() {
  const code = document.getElementById('promo-code').value.trim().toUpperCase();
  if (code === 'ETNV10') { discount = 0.1; showToast('Desconto de 10% aplicado!'); calcSummary(); }
  else if (code === 'IPIL20') { discount = 0.2; showToast('Desconto de 20% aplicado!'); calcSummary(); }
  else { showToast('Código inválido', 'error'); }
}

function checkout() {
  if (cart.length === 0) { showToast('Carrinho está vazio', 'warn'); return; }
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = (sub + 3.99 - sub * discount).toFixed(2);
  cart = []; discount = 0;
  updateCartBadge();
  renderCart();
  showToast(`Pedido de €${total} confirmado!`);
  const psOrders = document.getElementById('ps-orders');
  if (psOrders) psOrders.textContent = parseInt(psOrders.textContent || '0') + 1;
}

// ─── TOAST ───
function showToast(msg, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  if (type === 'error') t.style.borderLeftColor = 'var(--red)';
  if (type === 'warn') t.style.borderLeftColor = 'var(--amber)';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ─── INIT ───
updateThemeIcons();
renderHomeGrid('all');