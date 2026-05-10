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
  { id:1,  name:'Pro X Elite ANC',     cat:'audio',      price:89.99,  old:119.99, badge:'sale', desc:'Cancelamento de ruído ativo, 40h bateria, drivers 40mm premium.', img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  { id:2,  name:'BassCore 500',        cat:'audio',      price:59.99,  old:null,   badge:null,   desc:'Graves profundos, design over-ear confortável, Bluetooth 5.3.', img:'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop' },
  { id:3,  name:'MechBoard TKL Pro',   cat:'teclado',    price:149.99, old:189.99, badge:'sale', desc:'Switches Red linear, RGB per-key, alumínio anodizado CNC.', img:'https://tse3.mm.bing.net/th/id/OIP.1xG_8dC3wTP4yqC7upuX8QHaF6?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id:4,  name:'TypeMaster 65%',      cat:'teclado',    price:119.99, old:null,   badge:'new',  desc:'Layout compacto 65%, switches Brown táteis, hot-swap.', img:'https://tse4.mm.bing.net/th/id/OIP.O9cOb8nGpboGijIwSnquYQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id:5,  name:'Precision Air X',     cat:'mouse',      price:59.99,  old:null,   badge:null,   desc:'Sensor PixArt 3395, 26000 DPI, peso 52g, sem fio 2.4GHz.', img:'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop' },
  { id:6,  name:'GlideMax Pro',        cat:'mouse',      price:79.99,  old:99.99,  badge:'sale', desc:'Sensor óptico top, 8 botões programáveis, RGB lateral.', img:'https://unnotekno.com/wp-content/uploads/2025/10/MS6529BK-GlidePro-2.4G-BT-Mouse-9-scaled.jpg' },
  { id:7,  name:'TurboCharge 65W',     cat:'carregador', price:34.99,  old:null,   badge:null,   desc:'GaN III compacto, USB-C + USB-A, carga rápida PD 3.0.', img:'https://i5.walmartimages.com/seo/YUEVE-65W-Quick-Charge-Mobile-Phone-Charger-Turbocharge-Devices-Device-Fast-Charging-Power-Bank-4A-Type-C-PD-5-USB-Multiport-Charger-US-UK-EU_541dcd5a-66dd-4637-b798-d277655f8ed4.8d6f9ddef6e3144d764af0e047faf448.jpeg' },
  { id:8,  name:'PowerGaN 100W',       cat:'carregador', price:54.99,  old:69.99,  badge:'sale', desc:'3 portas simultâneas, 100W total, indicador LED inteligente.', img:'https://tse1.mm.bing.net/th/id/OIP.o2_1ZkFR8gQsVv8d8K86qgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id:9,  name:'SpeedDrive 256GB',    cat:'storage',    price:29.99,  old:null,   badge:null,   desc:'USB 3.2 Gen 2, leitura 400MB/s, design metal compacto.', img:'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop' },
  { id:10, name:'NanoSSD 1TB',         cat:'storage',    price:89.99,  old:null,   badge:'new',  desc:'M.2 NVMe externo, 1000MB/s leitura, caixa alumínio.', img:'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=400&fit=crop' },
  { id:11, name:'FusionCable Pro 2m',  cat:'cabo',       price:19.99,  old:null,   badge:null,   desc:'USB-C 240W, nylon trançado 2m, carga + dados 40Gbps.', img:'https://tse3.mm.bing.net/th/id/OIP.atk9GNeX9CUT07LM3h8UkAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id:12, name:'MagLink 1m',          cat:'cabo',       price:24.99,  old:null,   badge:'new',  desc:'Magnético USB-C, conexão automática 360°, LED de carga.', img:'https://tse3.mm.bing.net/th/id/OIP.YE7ybL2pP75Tw0vdlWXPGAHaHa?w=900&h=900&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id:13, name:'SmartHub 7-in-1',     cat:'gadget',     price:49.99,  old:64.99,  badge:'sale', desc:'USB-C hub: HDMI 4K, 3x USB-A, SD card, PD 100W pass-through.', img:'https://microless.com/cdn/products/9936c1189c0029df88630cf774249994-hi.jpg' },
  { id:14, name:'NeckBand Flow',       cat:'audio',      price:44.99,  old:null,   badge:null,   desc:'Design pescoço, IPX5 resistente, 20h bateria, voz AI.', img:'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop' },
  { id:15, name:'WristTracker X3',     cat:'gadget',     price:39.99,  old:null,   badge:'new',  desc:'Monitor cardíaco, SpO2, GPS assistido, bateria 7 dias.', img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
  { id:16, name:'WebCam 4K Ultra',     cat:'gadget',     price:99.99,  old:129.99, badge:'sale', desc:'4K 30fps, autofoco AI, microfone duplo com cancelamento de ruído.', img:'https://tse2.mm.bing.net/th/id/OIP.ZWqMZXXsAlhXS-FFgRjbrQHaHa?w=600&h=600&rs=1&pid=ImgDetMain&o=7&rm=3' },
];

// ─── STATE ───
let cart = [];
let user = null;
let discount = 0;
let currentProductFilter = 'all';
let userAvatar = null;

// ═══════════════════════════════════════════════
// STORAGE — LocalStorage helpers
// ═══════════════════════════════════════════════

function saveCart() {
  localStorage.setItem('etnv-cart', JSON.stringify(cart));
}

function loadCart() {
  try {
    const saved = localStorage.getItem('etnv-cart');
    if (saved) cart = JSON.parse(saved);
  } catch(e) { console.error('Erro ao carregar carrinho:', e); }
  updateCartBadge();
}

// FIX 1 & 3: Guardar e carregar utilizador no localStorage
function saveUser() {
  if (user) localStorage.setItem('etnv-user', JSON.stringify(user));
}

function loadUser() {
  try {
    const saved = localStorage.getItem('etnv-user');
    if (saved) user = JSON.parse(saved);
  } catch(e) { console.error('Erro ao carregar utilizador:', e); }
}

// FIX 4: Guardar e carregar avatar no localStorage
function saveAvatar() {
  if (userAvatar) {
    localStorage.setItem('etnv-avatar', userAvatar);
  } else {
    localStorage.removeItem('etnv-avatar');
  }
}

function loadAvatar() {
  userAvatar = localStorage.getItem('etnv-avatar') || null;
}

// Carregar tudo ao iniciar
loadCart();
loadUser();
loadAvatar();

// ═══════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════

function updateThemeIcons() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const sunSVG = `<svg viewBox="0 0 24 24" style="width:17px;height:17px;fill:currentColor"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"/></svg>`;
  const moonSVG = `<svg viewBox="0 0 24 24" style="width:17px;height:17px;fill:currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  document.querySelectorAll('.theme-toggle').forEach(btn => btn.innerHTML = isDark ? sunSVG : moonSVG);
}

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('etnv-theme', isDark ? 'light' : 'dark');
  updateThemeIcons();
}

(function() {
  const saved = localStorage.getItem('etnv-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();

// ═══════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════

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

// ═══════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════

function switchTab(tab, btn) {
  document.querySelectorAll('.auth-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
}

// ─── VALIDATION ───
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId + '-field');
  const error = document.getElementById(fieldId + '-error');
  if (field && error) {
    field.classList.add('error');
    error.textContent = message;
  }
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId + '-field');
  const error = document.getElementById(fieldId + '-error');
  if (field && error) {
    field.classList.remove('error');
    error.textContent = '';
  }
}

function clearAllErrors() {
  ['login-email', 'login-pass', 'reg-name', 'reg-email', 'reg-pass'].forEach(id => clearFieldError(id));
}

document.addEventListener('DOMContentLoaded', function() {
  ['login-email', 'login-pass', 'reg-name', 'reg-email', 'reg-pass'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.addEventListener('input', () => clearFieldError(id));
  });

  // FIX 3: Ao carregar a página do perfil, renderizar imediatamente
  if (document.getElementById('profile-av')) {
    renderProfile();
    updateAvatarBtn();
  }

  updateThemeIcons();
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function doLogin() {
  clearAllErrors();
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  let hasError = false;

  if (!email) {
    showFieldError('login-email', 'Email é obrigatório'); hasError = true;
  } else if (!validateEmail(email)) {
    showFieldError('login-email', 'Email inválido'); hasError = true;
  }

  if (!pass) {
    showFieldError('login-pass', 'Password é obrigatória'); hasError = true;
  } else if (!validatePassword(pass)) {
    showFieldError('login-pass', 'Password deve ter pelo menos 6 caracteres'); hasError = true;
  }

  if (!hasError) {
    // FIX 3: Guardar utilizador no localStorage antes de mudar de página
    // Se já existe utilizador guardado com este email, manter os seus dados
    const savedUser = localStorage.getItem('etnv-user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed.email === email) {
        user = parsed; // reutilizar dados já guardados
      } else {
        // email diferente — novo utilizador
        user = { name: email.split('@')[0], email, phone: '', city: '' };
      }
    } else {
      user = { name: email.split('@')[0], email, phone: '', city: '' };
    }
    saveUser();
    window.location.href = 'home.html';
  }
}

function doRegister() {
  clearAllErrors();
  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-pass').value;
  let hasError = false;

  if (!name)  { showFieldError('reg-name',  'Nome é obrigatório'); hasError = true; }
  if (!email) { showFieldError('reg-email', 'Email é obrigatório'); hasError = true; }
  else if (!validateEmail(email)) { showFieldError('reg-email', 'Email inválido'); hasError = true; }
  if (!pass)  { showFieldError('reg-pass',  'Password é obrigatória'); hasError = true; }
  else if (!validatePassword(pass)) { showFieldError('reg-pass', 'Password deve ter pelo menos 6 caracteres'); hasError = true; }

  if (!hasError) {
    // FIX 3: Guardar utilizador no localStorage
    user = { name, email, phone: '', city: '' };
    saveUser();
    window.location.href = 'home.html';
  }
}

function logout() {
  // Limpar tudo do localStorage
  localStorage.removeItem('etnv-user');
  localStorage.removeItem('etnv-avatar');
  localStorage.removeItem('etnv-cart');
  user = null; cart = []; discount = 0; userAvatar = null;
  updateCartBadge();
  window.location.href = 'index.html';
}

// ═══════════════════════════════════════════════
// AVATAR
// ═══════════════════════════════════════════════

function updateAvatarBtn() {
  const btn = document.getElementById('avatar-btn');
  if (!btn) return;

  if (userAvatar) {
    btn.innerHTML = `<img src="${userAvatar}" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;"/>`;
  } else if (user) {
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
    // FIX 4: Guardar avatar no localStorage
    saveAvatar();
    renderProfile();
    updateAvatarBtn();
    showToast('Foto de perfil atualizada!');
  };
  reader.readAsDataURL(file);
}

// ═══════════════════════════════════════════════
// PROFILE
// ═══════════════════════════════════════════════

function renderProfile() {
  if (!user) return;

  const initials = user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  // FIX 4: Mostrar avatar guardado
  const avEl = document.getElementById('profile-av');
  if (avEl) {
    if (userAvatar) {
      avEl.innerHTML = `<img src="${userAvatar}" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;"/>`;
    } else {
      avEl.textContent = initials;
    }
  }

  // FIX 3: Preencher todos os campos com dados do utilizador
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || '—';
  };

  set('profile-name-disp', user.name);
  set('profile-email-disp', user.email);
  set('pi-name',  user.name);
  set('pi-email', user.email);
  set('pi-phone', user.phone || '—');
  set('pi-city',  user.city  || '—');

  // Atualizar stats do carrinho
  const psCart = document.getElementById('ps-cart');
  if (psCart) psCart.textContent = cart.reduce((s, i) => s + i.qty, 0);
}

function toggleEditPanel() {
  const panel = document.getElementById('profile-edit-panel');
  const isOpen = panel.classList.contains('open');

  // Preencher campos ao abrir
  if (!isOpen && user) {
    document.getElementById('edit-name').value  = user.name  || '';
    document.getElementById('edit-email').value = user.email || '';
    document.getElementById('edit-phone').value = user.phone || '';
    document.getElementById('edit-city').value  = user.city  || '';
    // Limpar erros anteriores
    clearEditErrors();
  }
  panel.classList.toggle('open');
}

// FIX 2: Validação inline no painel de edição (sem alert)
function clearEditErrors() {
  ['edit-name', 'edit-email'].forEach(id => {
    const input = document.getElementById(id);
    const errEl = document.getElementById(id + '-error');
    if (input) input.style.borderColor = '';
    if (errEl) errEl.remove();
  });
}

function showEditError(inputId, message) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.style.borderColor = 'var(--red)';
  input.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.12)';

  // Remover erro anterior se existir
  const prev = document.getElementById(inputId + '-error');
  if (prev) prev.remove();

  const err = document.createElement('div');
  err.id = inputId + '-error';
  err.style.cssText = 'color:var(--red);font-size:0.72rem;margin-top:3px;font-weight:500;';
  err.textContent = message;
  input.parentNode.appendChild(err);
  input.focus();
}

function clearEditError(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
  }
  const err = document.getElementById(inputId + '-error');
  if (err) err.remove();
}

// Limpar erro ao digitar nos campos de edição
document.addEventListener('DOMContentLoaded', function() {
  ['edit-name', 'edit-email', 'edit-phone', 'edit-city'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.addEventListener('input', () => clearEditError(id));
  });
});

function saveProfile() {
  if (!user) return;

  const name  = document.getElementById('edit-name').value.trim();
  const email = document.getElementById('edit-email').value.trim();
  const phone = document.getElementById('edit-phone').value.trim();
  const city  = document.getElementById('edit-city').value.trim();

  // FIX 2: Validação inline (sem alert)
  let hasError = false;
  clearEditErrors();

  if (!name) {
    showEditError('edit-name', 'Nome é obrigatório');
    hasError = true;
  }
  if (!email) {
    showEditError('edit-email', 'Email é obrigatório');
    hasError = true;
  } else if (!validateEmail(email)) {
    showEditError('edit-email', 'Email inválido');
    hasError = true;
  }

  if (hasError) return;

  // FIX 1: Guardar dados no localStorage
  user.name  = name;
  user.email = email;
  user.phone = phone;
  user.city  = city;
  saveUser(); // ← persiste entre páginas

  renderProfile();
  updateAvatarBtn();
  toggleEditPanel();
  showToast('Perfil atualizado com sucesso!');
}

// ═══════════════════════════════════════════════
// RENDER PRODUCTS
// ═══════════════════════════════════════════════

function createCardHTML(p, showFull = true) {
  const badgeLabel = p.badge === 'new' ? 'Novo' : 'Sale';
  return `
    <div class="product-card" style="animation:fadeUp 0.35s ease both;animation-delay:${(Math.random()*0.12).toFixed(2)}s">
      ${p.badge ? `<span class="card-badge ${p.badge}">${badgeLabel}</span>` : ''}
      <div class="card-img">
        <div class="card-img-inner">
          <img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;">
        </div>
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
  if (!grid) return;
  const list = filter === 'all' ? products.slice(0, 8) : products.filter(p => p.cat === filter).slice(0, 8);
  grid.innerHTML = list.map(p => createCardHTML(p)).join('');
}

function renderProducts(filter) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
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

// ═══════════════════════════════════════════════
// CART
// ═══════════════════════════════════════════════

function addToCart(id, btn) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(x => x.id === id);
  if (existing) { existing.qty++; } else { cart.push({ ...p, qty: 1 }); }
  updateCartBadge();
  saveCart();
  btn.classList.add('added');
  btn.textContent = '✓';
  setTimeout(() => { btn.classList.remove('added'); btn.textContent = '+'; }, 1200);
  showToast(p.name + ' adicionado ao carrinho');
}

function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = total;
  const headerCount = document.getElementById('cart-header-count');
  if (headerCount) headerCount.textContent = `${total} ${total === 1 ? 'item' : 'itens'}`;
  const ps = document.getElementById('ps-cart');
  if (ps) ps.textContent = total;
}

function renderCart() {
  const list = document.getElementById('cart-items-list');
  if (!list) return;
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
  saveCart();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(x => x.id !== id);
  updateCartBadge();
  saveCart();
  renderCart();
}

function calcSummary() {
  const sub   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const ship  = sub > 0 ? 3.99 : 0;
  const disc  = sub * discount;
  const total = sub + ship - disc;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('sum-sub',   `€${sub.toFixed(2)}`);
  set('sum-ship',  `€${ship.toFixed(2)}`);
  set('sum-disc',  disc > 0 ? `-€${disc.toFixed(2)}` : `€0.00`);
  set('sum-total', `€${(sub > 0 ? total : 0).toFixed(2)}`);
}

function applyPromo() {
  const code = document.getElementById('promo-code').value.trim().toUpperCase();
  if (code === 'ETNV10')      { discount = 0.1; showToast('Desconto de 10% aplicado!'); calcSummary(); }
  else if (code === 'IPIL20') { discount = 0.2; showToast('Desconto de 20% aplicado!'); calcSummary(); }
  else                         { showToast('Código inválido', 'error'); }
}

function checkout() {
  if (cart.length === 0) { showToast('Carrinho está vazio', 'warn'); return; }
  const sub   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = (sub + 3.99 - sub * discount).toFixed(2);

  // Guardar contador de pedidos no utilizador
  if (user) {
    user.orders = (user.orders || 0) + 1;
    saveUser();
    const psOrders = document.getElementById('ps-orders');
    if (psOrders) psOrders.textContent = user.orders;
  }

  cart = []; discount = 0;
  updateCartBadge();
  saveCart();
  renderCart();
  showToast(`Pedido de €${total} confirmado!`);
}

// ═══════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════

function showToast(msg, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  if (type === 'error') t.style.borderLeftColor = 'var(--red)';
  if (type === 'warn')  t.style.borderLeftColor = 'var(--amber)';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════

updateThemeIcons();

// Renderizar grids se existirem na página atual
if (document.getElementById('home-grid'))     renderHomeGrid('all');
if (document.getElementById('products-grid')) renderProducts('all');

// FIX 3 & 4: Se estamos na página de perfil, renderizar imediatamente
if (document.getElementById('profile-av')) {
  renderProfile();
  updateAvatarBtn();
  // Mostrar pedidos guardados
  if (user && document.getElementById('ps-orders')) {
    document.getElementById('ps-orders').textContent = user.orders || 0;
  }
}

// Atualizar avatar na navbar se existir
updateAvatarBtn();

// Verificar se deve mostrar produtos automaticamente
(function() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('view') === 'products') {
    setView('products');
  }
})();