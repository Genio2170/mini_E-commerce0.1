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
    if (saved) {
      user = JSON.parse(saved);
      // Normalizar: PHP usa "nome", JS usa "name"
      if (user && user.nome && !user.name) user.name = user.nome;
    }
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

// Verificar se API está disponível e tentar sincronizar sessão
if (typeof Auth !== 'undefined') {
  Auth.me().then(u => {
    user = u;
    saveUser();
    console.log('Sessão verificada:', u);
  }).catch(() => {
    // Sessão expirada ou não existe
    console.log('Nenhuma sessão ativa');
  });
}

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
    showFieldError('login-email', t('err_email_required')); hasError = true;
  } else if (!validateEmail(email)) {
    showFieldError('login-email', t('err_email_invalid')); hasError = true;
  }

  if (!pass) {
    showFieldError('login-pass', t('err_pass_required')); hasError = true;
  } else if (!validatePassword(pass)) {
    showFieldError('login-pass', t('err_pass_min')); hasError = true;
  }

  if (!hasError) {
    if (typeof Auth !== 'undefined') {
      Auth.login(email, pass)
        .then(u => {
          user = u;
          saveUser();
          // Admin vai para o painel de administração
          if (u.tipo_user === 'admin') {
            window.location.href = 'admin.html';
          } else {
            window.location.href = 'home.html';
          }
        })
        .catch(err => {
          const msg = err.message || 'Erro no login.';
          if (msg.toLowerCase().includes('email') || msg.toLowerCase().includes('password')) {
            showFieldError('login-email', msg);
          } else {
            alert(msg);
          }
        });
    } else {
      alert('Erro: API não carregada. Verifique a conexão com o servidor.');
    }
  }
}

function doRegister() {
  clearAllErrors();
  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-pass').value;
  let hasError = false;

  if (!name)  { showFieldError('reg-name',  t('err_name_required')); hasError = true; }
  if (!email) { showFieldError('reg-email', t('err_email_required')); hasError = true; }
  else if (!validateEmail(email)) { showFieldError('reg-email', t('err_email_invalid')); hasError = true; }
  if (!pass)  { showFieldError('reg-pass',  t('err_pass_required')); hasError = true; }
  else if (!validatePassword(pass)) { showFieldError('reg-pass', t('err_pass_min')); hasError = true; }

  if (!hasError) {
    if (typeof Auth !== 'undefined') {
      Auth.register(name, email, pass)
        .then(u => {
          user = u;
          saveUser();
          window.location.href = 'home.html';
        })
        .catch(err => {
          const msg = err.message || 'Erro no registo.';
          if (msg.toLowerCase().includes('email')) {
            showFieldError('reg-email', msg);
          } else if (msg.toLowerCase().includes('nome')) {
            showFieldError('reg-name', msg);
          } else if (msg.toLowerCase().includes('password')) {
            showFieldError('reg-pass', msg);
          } else {
            alert(msg);
          }
        });
    } else {
      alert('Erro: API não carregada. Verifique a conexão com o servidor.');
    }
  }
}

function logout() {
  if (typeof Auth !== 'undefined') {
    Auth.logout().catch(() => {
      localStorage.removeItem('etnv-user');
      localStorage.removeItem('etnv-avatar');
      localStorage.removeItem('etnv-cart');
      user = null; cart = []; discount = 0; userAvatar = null;
      updateCartBadge();
      window.location.href = 'index.html';
    });
  } else {
    localStorage.removeItem('etnv-user');
    localStorage.removeItem('etnv-avatar');
    localStorage.removeItem('etnv-cart');
    user = null; cart = []; discount = 0; userAvatar = null;
    updateCartBadge();
    window.location.href = 'index.html';
  }
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

  const initials = (user.name || user.nome || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const avEl = document.getElementById('profile-av');
  if (avEl) {
    if (userAvatar) {
      avEl.innerHTML = `<img src="${userAvatar}" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;"/>`;
    } else {
      avEl.textContent = initials;
    }
  }

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || '—';
  };

  set('profile-name-disp', user.name || user.nome);
  set('profile-email-disp', user.email);
  set('pi-name',  user.name || user.nome);
  set('pi-email', user.email);
  set('pi-phone', user.phone || user.telefone || '—');
  set('pi-city',  user.city  || '—');

  // Data de registo
  if (user.data_criacao) {
    const d = new Date(user.data_criacao);
    const months = currentLang === 'en'
      ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      : ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    const dateStr = `${months[d.getMonth()]} ${d.getFullYear()}`;
    ['profile-member-date','pi-member-date'].forEach(id => set(id, dateStr));
  }

  // Stats carrinho
  const psCart = document.getElementById('ps-cart');
  if (psCart) psCart.textContent = cart.reduce((s, i) => s + i.qty, 0);

  // Stats pedidos — do localStorage (sincronizado após checkout)
  const psOrders = document.getElementById('ps-orders');
  if (psOrders) psOrders.textContent = user.orders || 0;

  // Tentar buscar número real de pedidos do backend
  if (typeof Perfil !== 'undefined') {
    Perfil.get().then(data => {
      if (data && typeof data.total_pedidos !== 'undefined') {
        // Atualizar com valor real da BD
        const realOrders = data.total_pedidos;
        if (psOrders) psOrders.textContent = realOrders;
        // Guardar localmente
        user.orders = realOrders;
        // Também preencher phone/city se vierem da BD e não estiverem no localStorage
        if (data.telefone && !user.phone) { user.phone = data.telefone; set('pi-phone', data.telefone); }
        saveUser();
      }
    }).catch(() => {/* backend opcional */});
  }
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

  let hasError = false;
  clearEditErrors();

  if (!name) {
    showEditError('edit-name', t('err_name_required'));
    hasError = true;
  }
  if (!email) {
    showEditError('edit-email', t('err_email_required'));
    hasError = true;
  } else if (!validateEmail(email)) {
    showEditError('edit-email', t('err_email_invalid'));
    hasError = true;
  }

  if (hasError) return;

  // Guardar localmente (funciona sem backend)
  user.name  = name;
  user.nome  = name; // manter consistência com PHP
  user.email = email;
  user.phone = phone;
  user.city  = city;
  saveUser();

  // Sincronizar com backend se disponível
  if (typeof Perfil !== 'undefined') {
    Perfil.atualizar(name, email, phone).catch(() => {
      // falha silenciosa — dados já guardados localmente
    });
  }

  renderProfile();
  updateAvatarBtn();
  toggleEditPanel();
  showToast(t('toast_profile_saved'));
}

// ═══════════════════════════════════════════════
// RENDER PRODUCTS
// ═══════════════════════════════════════════════

function kz(val) {
  return 'Kz ' + Math.round(val * 950).toLocaleString('pt-AO');
}

function createCardHTML(p, showFull = true) {
  const badgeLabel = p.badge === 'new' ? t('badge_new') : t('badge_sale');
  return `
    <div class="product-card" style="animation:fadeUp 0.35s ease both;animation-delay:${(Math.random()*0.12).toFixed(2)}s" onclick="openProductModal(${p.id})">
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
            ${p.old ? `<span class="old-price">${kz(p.old)}</span>` : ''}
            ${kz(p.price)}
          </div>
          <button class="add-btn" onclick="event.stopPropagation();addToCart(${p.id}, this)" title="${t('add_to_cart')}">+</button>
        </div>
      </div>
    </div>`;
}

function renderHomeGrid(filter) {
  const grid = document.getElementById('home-grid');
  if (!grid) return;

  // Tentar buscar da BD
  if (typeof Produtos !== 'undefined') {
    const params = filter !== 'all' ? { categoria: filter } : {};
    Produtos.listar(params).then(data => {
      const list = data && data.produtos && data.produtos.length > 0
        ? data.produtos.slice(0, 8).map(normalizeProduto)
        : (filter === 'all' ? products.slice(0, 8) : products.filter(p => p.cat === filter).slice(0, 8));
      grid.innerHTML = list.map(p => createCardHTML(p)).join('');
    }).catch(() => {
      // Fallback para dados locais
      const list = filter === 'all' ? products.slice(0, 8) : products.filter(p => p.cat === filter).slice(0, 8);
      grid.innerHTML = list.map(p => createCardHTML(p)).join('');
    });
  } else {
    const list = filter === 'all' ? products.slice(0, 8) : products.filter(p => p.cat === filter).slice(0, 8);
    grid.innerHTML = list.map(p => createCardHTML(p)).join('');
  }
}

// Normaliza produto da BD para o formato do JS local
function normalizeProduto(p) {
  return {
    id:    p.id,
    name:  p.nome || p.name,
    cat:   p.categoria_nome || p.cat || 'gadget',
    price: parseFloat(p.preco || p.price || 0),
    old:   p.preco_antigo ? parseFloat(p.preco_antigo) : null,
    badge: p.badge || null,
    desc:  p.descricao || p.desc || '',
    img:   p.imagem || p.img || 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=400&fit=crop',
  };
}

function renderProducts(filter) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  const search = (document.getElementById('search-input')?.value || '').toLowerCase();

  if (typeof Produtos !== 'undefined') {
    const params = {};
    if (filter !== 'all') params.categoria = filter;
    if (search) params.search = search;

    Produtos.listar(params).then(data => {
      let list = data && data.produtos && data.produtos.length > 0
        ? data.produtos.map(normalizeProduto)
        : (filter === 'all' ? products : products.filter(p => p.cat === filter));
      if (search && (!data || !data.produtos || data.produtos.length === 0)) {
        list = list.filter(p => p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search));
      }
      grid.innerHTML = list.map(p => createCardHTML(p)).join('');
    }).catch(() => {
      let list = filter === 'all' ? products : products.filter(p => p.cat === filter);
      if (search) list = list.filter(p => p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search));
      grid.innerHTML = list.map(p => createCardHTML(p)).join('');
    });
  } else {
    let list = filter === 'all' ? products : products.filter(p => p.cat === filter);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search));
    grid.innerHTML = list.map(p => createCardHTML(p)).join('');
  }
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
  showToast(p.name + ' ' + t('toast_added'));
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
        <h3>${t('cart_empty_title')}</h3>
        <p>${t('cart_empty_sub')}</p>
        <button class="btn-primary" style="margin-top:1.5rem;border-radius:var(--radius-sm);font-size:0.88rem;padding:11px 22px;" onclick="window.location.href='home.html?view=products'">${t('btn_see_products')}</button>
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
  set('sum-sub',   kz(sub));
  set('sum-ship',  kz(ship));
  set('sum-disc',  disc > 0 ? '-'+kz(disc) : 'Kz 0');
  set('sum-total', kz(sub > 0 ? total : 0));
}

function applyPromo() {
  const code = document.getElementById('promo-code').value.trim().toUpperCase();
  if (code === 'ETNV10')      { discount = 0.1; showToast(t('toast_promo_10')); calcSummary(); }
  else if (code === 'IPIL20') { discount = 0.2; showToast(t('toast_promo_20')); calcSummary(); }
  else                         { showToast(t('toast_promo_invalid'), 'error'); }
}

function checkout() {
  if (cart.length === 0) { showToast(t('toast_cart_empty'), 'warn'); return; }
  const sub   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = (sub + 3.99 - sub * discount).toFixed(2);

  // Guardar contador de pedidos no utilizador (local)
  if (user) {
    user.orders = (user.orders || 0) + 1;
    saveUser();
    const psOrders = document.getElementById('ps-orders');
    if (psOrders) psOrders.textContent = user.orders;
  }

  // Tentar criar pedido no backend
  if (typeof Pedidos !== 'undefined') {
    const promoEl = document.getElementById('promo-code');
    const promo = promoEl ? promoEl.value.trim() : '';
    Pedidos.criar(promo).catch(() => {
      // fallback silencioso — pedido registado localmente
    });
  }

  cart = []; discount = 0;
  updateCartBadge();
  saveCart();
  renderCart();
  showToast(`${t('toast_order_confirmed')} ${kz(parseFloat(total))} ${t('toast_order_confirmed2')}`);
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
// ═══════════════════════════════════════════════
// PRODUCT MODAL
// ═══════════════════════════════════════════════

function openProductModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const badgeLabel = p.badge === 'new' ? t('badge_new') : t('badge_sale');
  const content = document.getElementById('modal-inner-content');
  if (!content) return;
  content.innerHTML = `
    <div class="modal-img-wrap">
      <img src="${p.img}" alt="${p.name}" class="modal-product-img">
      ${p.badge ? `<span class="card-badge ${p.badge}" style="position:absolute;top:16px;left:16px;">${badgeLabel}</span>` : ''}
    </div>
    <div class="modal-info">
      <div class="modal-cat">${p.cat}</div>
      <h2 class="modal-name">${p.name}</h2>
      <div class="modal-price-row">
        ${p.old ? `<span class="old-price" style="font-size:1rem;">${kz(p.old)}</span>` : ''}
        <span class="modal-price">${kz(p.price)}</span>
      </div>
      <p class="modal-desc">${p.desc}</p>
      <div class="modal-specs">
        <div class="modal-spec-row">
          <span class="modal-spec-label">${t('category')}</span>
          <span class="modal-spec-val">${p.cat}</span>
        </div>
        <div class="modal-spec-row">
          <span class="modal-spec-label">${t('availability')}</span>
          <span class="modal-spec-val" style="color:var(--green)">● ${t('in_stock')}</span>
        </div>
      </div>
      <button class="checkout-btn" style="margin-top:1.5rem;" onclick="addToCartFromModal(${p.id})">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;margin-right:8px"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        ${t('add_to_cart')}
      </button>
    </div>
  `;
  const modal = document.getElementById('product-modal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  setTimeout(() => modal.classList.add('active'), 10);
}

function closeProductModal(e) {
  if (e && e.target !== document.getElementById('product-modal')) return;
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  modal.classList.remove('active');
  setTimeout(() => { modal.style.display = 'none'; document.body.style.overflow = ''; }, 250);
}

function addToCartFromModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(x => x.id === id);
  if (existing) { existing.qty++; } else { cart.push({ ...p, qty: 1 }); }
  updateCartBadge();
  saveCart();
  showToast(p.name + ' ' + t('toast_added'));
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; document.body.style.overflow = ''; }, 250);
  }
}

// Close modal on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeProductModal({ target: document.getElementById('product-modal') });
});

// ═══════════════════════════════════════════════
// PAYMENT METHODS
// ═══════════════════════════════════════════════

let selectedPayment = null;

const paymentMethods = [
  {
    id: 'multicaixa',
    icon: `<svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#E30613"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="10" font-weight="bold" font-family="sans-serif">MX</text></svg>`,
    nameKey: 'pay_multicaixa',
    descKey: 'pay_multicaixa_desc',
  },
  {
    id: 'referencia',
    icon: `<svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#0057A8"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="9" font-weight="bold" font-family="sans-serif">REF</text></svg>`,
    nameKey: 'pay_referencia',
    descKey: 'pay_referencia_desc',
  },
  {
    id: 'unitel',
    icon: `<svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#F7A800"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#000" font-size="8" font-weight="bold" font-family="sans-serif">UNI</text></svg>`,
    nameKey: 'pay_unitel',
    descKey: 'pay_unitel_desc',
  },
  {
    id: 'africapay',
    icon: `<svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#00A651"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="8" font-weight="bold" font-family="sans-serif">AFP</text></svg>`,
    nameKey: 'pay_africapay',
    descKey: 'pay_africapay_desc',
  },
  {
    id: 'transferencia',
    icon: `<svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#1C1C2E"/><svg x="8" y="8" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" width="24" height="24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></svg>`,
    nameKey: 'pay_transferencia',
    descKey: 'pay_transferencia_desc',
  },
];

function renderPaymentMethods() {
  const container = document.getElementById('payment-methods-list');
  if (!container) return;
  container.innerHTML = paymentMethods.map(pm => `
    <div class="payment-method-card ${selectedPayment === pm.id ? 'selected' : ''}" onclick="selectPayment('${pm.id}')">
      <div class="pm-icon">${pm.icon}</div>
      <div class="pm-info">
        <div class="pm-name">${t(pm.nameKey)}</div>
        <div class="pm-desc">${t(pm.descKey)}</div>
      </div>
      <div class="pm-radio">${selectedPayment === pm.id ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>' : ''}</div>
    </div>
  `).join('');
}

function selectPayment(id) {
  selectedPayment = id;
  renderPaymentMethods();
}

// Override checkout to require payment method
const _originalCheckout = checkout;
function checkout() {
  if (cart.length === 0) { showToast(t('toast_cart_empty'), 'warn'); return; }
  if (!selectedPayment) { showToast(t('pay_none_selected'), 'warn'); return; }
  _originalCheckout();
  selectedPayment = null;
  renderPaymentMethods();
}

// Render payment methods on cart page load
if (document.getElementById('payment-methods-list')) {
  renderPaymentMethods();
}
