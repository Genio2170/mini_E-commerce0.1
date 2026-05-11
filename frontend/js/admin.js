// ═══════════════════════════════════════════════
// admin.js — Painel Administrativo ETNV-ELECTRONICS
// Usa a API PHP real quando disponível (XAMPP).
// Fallback automático para MOCK quando offline.
// ═══════════════════════════════════════════════

// ─── FLAG: modo API vs MOCK ─────────────────────
let API_MODE = false;

async function detectApiMode() {
  try {
    const res = await fetch('../../backend/api/admin/dashboard.php', {
      credentials: 'include',
      signal: AbortSignal.timeout(2000),
    });
    // 200 = ok, 403 = api existe mas nao autenticado — ambos confirmam que a API está ativa
    API_MODE = (res.status < 500);
    console.log('[ADMIN] Modo API:', API_MODE ? 'PHP (XAMPP)' : 'MOCK');
  } catch(e) {
    API_MODE = false;
    console.log('[ADMIN] Modo API: MOCK (backend nao detetado)');
  }
}


// ─── MOCK DATA (substitui chamadas API enquanto não há backend admin)
const MOCK = {
  produtos: [
    { id:1,  nome:'Pro X Elite ANC',     categoria:'audio',      preco:89.99,  stock:14, imagem:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
    { id:2,  nome:'BassCore 500',        categoria:'audio',      preco:59.99,  stock:8,  imagem:'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=100&h=100&fit=crop' },
    { id:3,  nome:'MechBoard TKL Pro',   categoria:'teclado',    preco:149.99, stock:3,  imagem:'https://tse3.mm.bing.net/th/id/OIP.1xG_8dC3wTP4yqC7upuX8QHaF6?w=100&h=100&fit=crop' },
    { id:4,  nome:'TypeMaster 65%',      categoria:'teclado',    preco:119.99, stock:11, imagem:'' },
    { id:5,  nome:'Precision Air X',     categoria:'mouse',      preco:59.99,  stock:0,  imagem:'https://images.unsplash.com/photo-1527814050087-3793815479db?w=100&h=100&fit=crop' },
    { id:6,  nome:'GlideMax Pro',        categoria:'mouse',      preco:79.99,  stock:7,  imagem:'' },
    { id:7,  nome:'TurboCharge 65W',     categoria:'carregador', preco:34.99,  stock:20, imagem:'' },
    { id:8,  nome:'SpeedDrive 256GB',    categoria:'storage',    preco:29.99,  stock:15, imagem:'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=100&h=100&fit=crop' },
    { id:9,  nome:'FusionCable Pro 2m',  categoria:'cabo',       preco:19.99,  stock:30, imagem:'' },
    { id:10, nome:'SmartHub 7-in-1',     categoria:'gadget',     preco:49.99,  stock:6,  imagem:'' },
  ],
  utilizadores: [
    { id:1,  nome:'Carlos Mendes',   email:'carlos@email.com',   data_criacao:'2026-01-12', estado:'ativo',     tipo_user:'cliente' },
    { id:2,  nome:'Ana Ferreira',    email:'ana@email.com',      data_criacao:'2026-02-05', estado:'ativo',     tipo_user:'cliente' },
    { id:3,  nome:'João Neto',       email:'joao@email.com',     data_criacao:'2026-03-20', estado:'bloqueado', tipo_user:'cliente' },
    { id:4,  nome:'Maria Costa',     email:'maria@email.com',    data_criacao:'2026-04-01', estado:'ativo',     tipo_user:'cliente' },
    { id:5,  nome:'Admin ETNV',      email:'admin@etnv.com',     data_criacao:'2026-01-01', estado:'ativo',     tipo_user:'admin' },
  ],
  pedidos: [
    { id:1001, utilizador_id:1, cliente:'Carlos Mendes', produtos:[{nome:'Pro X Elite ANC',qty:1,preco:89.99},{nome:'FusionCable Pro 2m',qty:2,preco:19.99}], total:129.97, data:'2026-05-10 09:14', estado:'pendente' },
    { id:1002, utilizador_id:2, cliente:'Ana Ferreira',  produtos:[{nome:'MechBoard TKL Pro',qty:1,preco:149.99}], total:149.99, data:'2026-05-09 15:42', estado:'confirmado' },
    { id:1003, utilizador_id:4, cliente:'Maria Costa',   produtos:[{nome:'Precision Air X',qty:1,preco:59.99},{nome:'SmartHub 7-in-1',qty:1,preco:49.99}], total:109.98, data:'2026-05-08 11:30', estado:'preparacao' },
    { id:1004, utilizador_id:1, cliente:'Carlos Mendes', produtos:[{nome:'TurboCharge 65W',qty:2,preco:34.99}], total:69.98, data:'2026-05-07 08:20', estado:'enviado' },
    { id:1005, utilizador_id:2, cliente:'Ana Ferreira',  produtos:[{nome:'BassCore 500',qty:1,preco:59.99}], total:59.99, data:'2026-05-06 17:55', estado:'entregue' },
    { id:1006, utilizador_id:3, cliente:'João Neto',     produtos:[{nome:'SpeedDrive 256GB',qty:3,preco:29.99}], total:89.97, data:'2026-05-05 14:10', estado:'cancelado' },
  ],
};

// ─── NOTIFICAÇÕES (armazenadas localmente)
function loadAdminNotifs() {
  try { return JSON.parse(localStorage.getItem('etnv-admin-notifs') || '[]'); }
  catch(e) { return []; }
}
function saveAdminNotifs(notifs) {
  localStorage.setItem('etnv-admin-notifs', JSON.stringify(notifs));
}

function pushAdminNotif(msg, icon = '🔔') {
  const notifs = loadAdminNotifs();
  notifs.unshift({ id: Date.now(), icon, msg, data: new Date().toLocaleString('pt-PT'), lida: false });
  saveAdminNotifs(notifs);
  updateAdminNotifBadge();
}

function updateAdminNotifBadge() {
  const notifs = loadAdminNotifs();
  const unread = notifs.filter(n => !n.lida).length;
  const badge = document.getElementById('badge-notifs');
  if (!badge) return;
  if (unread > 0) {
    badge.textContent = unread;
    badge.style.display = '';
  } else {
    badge.style.display = 'none';
  }
}

function markAllNotifsRead() {
  const notifs = loadAdminNotifs().map(n => ({ ...n, lida: true }));
  saveAdminNotifs(notifs);
  updateAdminNotifBadge();
  renderAdminNotifs();
  showToast('Todas as notificações marcadas como lidas.', 'success');
}

// ─── NOTIFICAÇÕES UTILIZADOR
function loadUserNotifs(userId) {
  try { return JSON.parse(localStorage.getItem(`etnv-user-notifs-${userId}`) || '[]'); }
  catch(e) { return []; }
}
function saveUserNotifs(userId, notifs) {
  localStorage.setItem(`etnv-user-notifs-${userId}`, JSON.stringify(notifs));
}
function pushUserNotif(userId, msg, icon = '�', pedidoId = null, estado = '') {
  const notifs = loadUserNotifs(userId);
  notifs.unshift({ id: Date.now(), icon, msg, pedidoId, estado, data: new Date().toLocaleString('pt-PT'), lida: false });
  saveUserNotifs(userId, notifs);
}

// ─── ORDEM DE ESTADOS
const ESTADOS_ORDER = ['pendente','confirmado','preparacao','enviado','entregue','cancelado'];
const ESTADO_META = {
  pendente:   { label: 'Pendente',       cls: 'os-pendente',   icon: '' },
  confirmado: { label: 'Confirmado',      cls: 'os-confirmado', icon: '' },
  preparacao: { label: 'Em Preparação',   cls: 'os-preparacao', icon: '' },
  enviado:    { label: 'Enviado',          cls: 'os-enviado',    icon: '' },
  entregue:   { label: 'Entregue',         cls: 'os-entregue',   icon: '' },
  cancelado:  { label: 'Cancelado',        cls: 'os-cancelado',  icon: '' },
};

const ESTADO_NOTIF_MSG = {
  confirmado: 'O teu pedido foi confirmado',
  preparacao: 'O teu pedido está em preparação',
  enviado:    'O teu pedido foi enviado — está a caminho!',
  entregue:   'O teu pedido foi entregue — aprecia a compra!',
  cancelado:  'O teu pedido foi cancelado',
};

// ─── STATE
let currentFilter = 'all';
let currentProdutos = [...MOCK.produtos];
let currentUsers = [...MOCK.utilizadores];
let currentPedidos = [...MOCK.pedidos];

// ═══════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════
function updateThemeIcons() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const sunSVG = `<svg viewBox="0 0 24 24" style="width:17px;height:17px;fill:currentColor"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/></svg>`;
  const moonSVG = `<svg viewBox="0 0 24 24" style="width:17px;height:17px;fill:currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  document.querySelectorAll('.theme-toggle').forEach(btn => btn.innerHTML = isDark ? sunSVG : moonSVG);
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('etnv-theme', isDark ? 'light' : 'dark');
  updateThemeIcons();
}

// ═══════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════
function adminNav(section, btnEl) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));

  const sec = document.getElementById('section-' + section);
  if (sec) sec.classList.add('active');
  if (btnEl) btnEl.classList.add('active');

  const titles = {
    dashboard: 'Dashboard',
    produtos: 'Produtos',
    'add-produto': 'Adicionar Produto',
    utilizadores: 'Utilizadores',
    pedidos: 'Pedidos',
    notificacoes: 'Notificações',
    config: 'Configurações',
  };
  const title = document.getElementById('topbar-title');
  if (title) title.textContent = titles[section] || section;

  // Render data per section
  if (section === 'dashboard') renderDashboard();
  if (section === 'produtos') renderProdutos();
  if (section === 'utilizadores') renderUsers();
  if (section === 'pedidos') renderPedidos('all');
  if (section === 'notificacoes') renderAdminNotifs();
  if (section === 'config') renderConfig();

  // Close sidebar on mobile
  if (window.innerWidth <= 860) {
    document.getElementById('admin-sidebar').classList.remove('open');
  }
}

function toggleSidebar() {
  document.getElementById('admin-sidebar').classList.toggle('open');
}

// ═══════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════
let toastTimer;
function showToast(msg, type = 'info') {
  const t = document.getElementById('admin-toast');
  if (!t) return;
  clearTimeout(toastTimer);
  t.textContent = msg;
  t.className = `admin-toast ${type} show`;
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

// ═══════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}

function confirmAction(msg, onConfirm) {
  document.getElementById('modal-confirm-msg').textContent = msg;
  const btn = document.getElementById('modal-confirm-ok');
  btn.onclick = () => { closeModal('modal-confirm'); onConfirm(); };
  openModal('modal-confirm');
}

// ═══════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════
function renderDashboard() {
  // Stats
  document.getElementById('stat-produtos').textContent = currentProdutos.length;
  document.getElementById('stat-users').textContent = currentUsers.filter(u => u.tipo_user !== 'admin').length;
  document.getElementById('stat-pedidos').textContent = currentPedidos.length;
  const receita = currentPedidos
    .filter(p => p.estado !== 'cancelado')
    .reduce((s, p) => s + p.total, 0);
  document.getElementById('stat-receita').textContent = '€' + receita.toFixed(2);

  // Pedidos recentes
  const recentEl = document.getElementById('dash-recent-orders');
  const recent = [...currentPedidos].sort((a,b) => b.id - a.id).slice(0, 5);
  recentEl.innerHTML = recent.length ? recent.map(p => `
    <div class="dash-order-row">
      <span class="dash-order-id">#${p.id}</span>
      <span class="dash-order-client">${p.cliente}</span>
      <span class="${ESTADO_META[p.estado]?.cls || ''} order-status" style="font-size:0.7rem">${ESTADO_META[p.estado]?.label || p.estado}</span>
      <span class="dash-order-total">€${p.total.toFixed(2)}</span>
    </div>
  `).join('') : '<div class="admin-empty">Sem pedidos</div>';

  // Estados breakdown
  const estadosEl = document.getElementById('dash-estados');
  const estadoCounts = {};
  ESTADOS_ORDER.forEach(e => estadoCounts[e] = 0);
  currentPedidos.forEach(p => { if (estadoCounts[p.estado] !== undefined) estadoCounts[p.estado]++; });
  estadosEl.innerHTML = ESTADOS_ORDER.map(e => `
    <div class="dash-estado-row">
      <span class="dash-estado-label">${ESTADO_META[e]?.label}</span>
      <span class="dash-estado-count">${estadoCounts[e]}</span>
    </div>
  `).join('');

  // Pedidos badge sidebar
  const pending = currentPedidos.filter(p => p.estado === 'pendente').length;
  const badgePedidos = document.getElementById('badge-pedidos');
  if (badgePedidos) {
    badgePedidos.textContent = pending;
    badgePedidos.style.display = pending ? '' : 'none';
  }

  updateAdminNotifBadge();
}

// ═══════════════════════════════════════════════
// PRODUTOS
// ═══════════════════════════════════════════════
function renderProdutos(list) {
  const rows = (list || currentProdutos).map(p => {
    const stockClass = p.stock === 0 ? 'stock-out' : p.stock < 5 ? 'stock-low' : 'stock-ok';
    const imgEl = p.imagem
      ? `<img class="table-prod-img" src="${p.imagem}" alt="${p.nome}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : '';
    return `<tr>
      <td>
        ${imgEl}
        <div class="table-prod-img-placeholder" ${p.imagem ? 'style="display:none"' : ''}>—</div>
      </td>
      <td style="font-weight:600">${p.nome}</td>
      <td style="text-transform:capitalize;color:var(--text2)">${p.categoria}</td>
      <td style="color:var(--green);font-weight:700">€${p.preco.toFixed(2)}</td>
      <td class="${stockClass}">${p.stock === 0 ? 'Esgotado' : p.stock}</td>
      <td>
        <div class="admin-actions">
          <button class="btn-icon" title="Editar" onclick="editProduto(${p.id})">✎</button>
          <button class="btn-icon danger" title="Apagar" onclick="deleteProduto(${p.id})">🗑</button>
        </div>
      </td>
    </tr>`;
  }).join('');

  document.getElementById('tbody-produtos').innerHTML = rows || `<tr><td colspan="6" class="admin-empty">Nenhum produto encontrado.</td></tr>`;
}

function filterProdutos() {
  const q = document.getElementById('search-produtos')?.value.toLowerCase() || '';
  const filtered = currentProdutos.filter(p =>
    p.nome.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q)
  );
  renderProdutos(filtered);
}

function editProduto(id) {
  const p = currentProdutos.find(x => x.id === id);
  if (!p) return;
  document.getElementById('edit-prod-id').value = p.id;
  document.getElementById('p-nome').value = p.nome;
  document.getElementById('p-preco').value = p.preco;
  document.getElementById('p-desc').value = p.descricao || '';
  document.getElementById('p-cat').value = p.categoria;
  document.getElementById('p-stock').value = p.stock;
  document.getElementById('p-img').value = p.imagem || '';
  previewImg();
  document.getElementById('add-prod-title').textContent = 'Editar Produto';
  document.getElementById('btn-save-prod').textContent = 'Guardar Alterações';
  adminNav('add-produto', null);
  document.querySelector('[onclick*="add-produto"]')?.classList.add('active');
}

function deleteProduto(id) {
  const p = currentProdutos.find(x => x.id === id);
  if (!p) return;
  confirmAction(`Tens a certeza que queres apagar "${p.nome}"? Esta ação não pode ser desfeita.`, () => {
    currentProdutos = currentProdutos.filter(x => x.id !== id);
    renderProdutos();
    showToast(`Produto "${p.nome}" apagado.`, 'success');
    document.getElementById('stat-produtos').textContent = currentProdutos.length;
  });
}

function saveProduto() {
  const id = document.getElementById('edit-prod-id').value;
  const nome = document.getElementById('p-nome').value.trim();
  const preco = parseFloat(document.getElementById('p-preco').value);
  const desc = document.getElementById('p-desc').value.trim();
  const cat = document.getElementById('p-cat').value;
  const stock = parseInt(document.getElementById('p-stock').value);
  const img = document.getElementById('p-img').value.trim();

  // Validation
  let valid = true;
  [['pnome', nome, 'Nome é obrigatório'], ['ppreco', !isNaN(preco) && preco >= 0, 'Preço inválido'], ['pcat', cat, 'Categoria é obrigatória'], ['pstock', !isNaN(stock) && stock >= 0, 'Stock inválido']].forEach(([fid, cond, msg]) => {
    const field = document.getElementById(fid + '-field');
    const err = document.getElementById(fid + '-error');
    if (!cond) { field?.classList.add('error'); if(err) err.textContent = msg; valid = false; }
    else { field?.classList.remove('error'); if(err) err.textContent = ''; }
  });
  if (!valid) return;

  if (id) {
    // Edit
    const idx = currentProdutos.findIndex(x => x.id == id);
    if (idx >= 0) currentProdutos[idx] = { ...currentProdutos[idx], nome, preco, descricao: desc, categoria: cat, stock, imagem: img };
    showToast('Produto atualizado com sucesso!', 'success');
  } else {
    // Add
    const newId = Math.max(...currentProdutos.map(p => p.id)) + 1;
    currentProdutos.push({ id: newId, nome, preco, descricao: desc, categoria: cat, stock, imagem: img });
    showToast('Produto adicionado com sucesso!', 'success');
  }

  resetProdutoForm();
  adminNav('produtos', document.querySelectorAll('.sidebar-item')[1]);
}

function resetProdutoForm() {
  document.getElementById('edit-prod-id').value = '';
  ['p-nome','p-preco','p-desc','p-stock','p-img'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('p-cat').value = '';
  document.getElementById('img-preview-wrap').style.display = 'none';
  document.getElementById('add-prod-title').textContent = '➕ Adicionar Produto';
  document.getElementById('btn-save-prod').textContent = 'Guardar Produto';
  ['pnome','ppreco','pdesc','pcat','pstock'].forEach(id => {
    document.getElementById(id + '-field')?.classList.remove('error');
    const err = document.getElementById(id + '-error');
    if (err) err.textContent = '';
  });
}

function previewImg() {
  const url = document.getElementById('p-img').value.trim();
  const wrap = document.getElementById('img-preview-wrap');
  const img = document.getElementById('img-preview');
  if (url) {
    img.src = url;
    wrap.style.display = 'block';
  } else {
    wrap.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const imgInput = document.getElementById('p-img');
  if (imgInput) imgInput.addEventListener('input', previewImg);
});

// ═══════════════════════════════════════════════
// UTILIZADORES
// ═══════════════════════════════════════════════
function renderUsers(list) {
  const rows = (list || currentUsers).map(u => {
    const isAdmin = u.tipo_user === 'admin';
    return `<tr>
      <td style="font-weight:600">${u.nome}</td>
      <td style="color:var(--text2)">${u.email}</td>
      <td style="color:var(--text2)">${formatDate(u.data_criacao)}</td>
      <td><span class="status-badge status-${u.estado}">${u.estado === 'ativo' ? 'Ativo' : 'Bloqueado'}</span></td>
      <td><span class="status-badge ${isAdmin ? 'status-admin' : 'status-ativo'}">${isAdmin ? 'Admin' : 'Cliente'}</span></td>
      <td>
        ${isAdmin ? '<span style="color:var(--text3);font-size:0.78rem">Protegido</span>' : `
        <div class="admin-actions">
          <button class="btn-icon" title="${u.estado === 'ativo' ? 'Bloquear' : 'Desbloquear'}" onclick="toggleBlockUser(${u.id})">${u.estado === 'ativo' ? '�' : '🔍'}</button>
          <button class="btn-icon danger" title="Remover" onclick="deleteUser(${u.id})">X</button>
        </div>`}
      </td>
    </tr>`;
  }).join('');

  document.getElementById('tbody-users').innerHTML = rows || `<tr><td colspan="6" class="admin-empty">Nenhum utilizador encontrado.</td></tr>`;
}

function filterUsers() {
  const q = document.getElementById('search-users')?.value.toLowerCase() || '';
  renderUsers(currentUsers.filter(u => u.nome.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)));
}

function toggleBlockUser(id) {
  const u = currentUsers.find(x => x.id === id);
  if (!u) return;
  const action = u.estado === 'ativo' ? 'bloquear' : 'desbloquear';
  confirmAction(`Tens a certeza que queres ${action} o utilizador "${u.nome}"?`, () => {
    u.estado = u.estado === 'ativo' ? 'bloqueado' : 'ativo';
    renderUsers();
    showToast(`Utilizador ${action === 'bloquear' ? 'bloqueado' : 'desbloqueado'} com sucesso.`, 'success');
  });
}

function deleteUser(id) {
  const u = currentUsers.find(x => x.id === id);
  if (!u) return;
  confirmAction(`Tens a certeza que queres remover o utilizador "${u.nome}"? Todos os seus dados serão eliminados.`, () => {
    currentUsers = currentUsers.filter(x => x.id !== id);
    renderUsers();
    showToast(`Utilizador "${u.nome}" removido.`, 'success');
  });
}

// ═══════════════════════════════════════════════
// PEDIDOS
// ═══════════════════════════════════════════════
let pedidoEstadoFilter = 'all';

function filterPedidosByEstado(estado, btnEl) {
  pedidoEstadoFilter = estado;
  document.querySelectorAll('.estado-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderPedidos(estado);
}

function renderPedidos(estadoFilter) {
  estadoFilter = estadoFilter || pedidoEstadoFilter || 'all';
  const list = estadoFilter === 'all' ? currentPedidos : currentPedidos.filter(p => p.estado === estadoFilter);

  const rows = list.map(p => {
    const meta = ESTADO_META[p.estado] || { label: p.estado, cls: '' };
    const prodSummary = p.produtos.slice(0,2).map(x => x.nome).join(', ') + (p.produtos.length > 2 ? ` +${p.produtos.length - 2}` : '');
    return `<tr>
      <td style="font-weight:700;color:var(--accent)">#${p.id}</td>
      <td style="font-weight:600">${p.cliente}</td>
      <td style="color:var(--text2);font-size:0.8rem;max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${prodSummary}</td>
      <td style="color:var(--green);font-weight:700">€${p.total.toFixed(2)}</td>
      <td style="color:var(--text2);font-size:0.8rem">${p.data}</td>
      <td><span class="order-status ${meta.cls}">${meta.label}</span></td>
      <td>
        <div class="admin-actions">
          <button class="btn-icon" title="Ver Detalhes" onclick="openPedidoModal(${p.id})">👁</button>
        </div>
      </td>
    </tr>`;
  }).join('');

  document.getElementById('tbody-pedidos').innerHTML = rows || `<tr><td colspan="7" class="admin-empty">Nenhum pedido encontrado.</td></tr>`;
}

function openPedidoModal(id) {
  const p = currentPedidos.find(x => x.id === id);
  if (!p) return;

  document.getElementById('modal-pedido-title').textContent = `Pedido #${p.id}`;

  const body = document.getElementById('modal-pedido-body');
  body.innerHTML = `
    <div class="pedido-info-grid">
      <div class="pedido-info-item"><label>Cliente</label><span>${p.cliente}</span></div>
      <div class="pedido-info-item"><label>Data</label><span>${p.data}</span></div>
      <div class="pedido-info-item"><label>Total</label><span style="color:var(--green)">€${p.total.toFixed(2)}</span></div>
      <div class="pedido-info-item"><label>Estado Atual</label><span class="order-status ${ESTADO_META[p.estado]?.cls}">${ESTADO_META[p.estado]?.label}</span></div>
    </div>

    <div class="admin-card-title" style="margin-bottom:10px">Produtos do Pedido</div>
    <div class="pedido-products-list">
      ${p.produtos.map(x => `
        <div class="pedido-prod-row">
          <span class="pedido-prod-name">${x.nome}</span>
          <span class="pedido-prod-qty">× ${x.qty}</span>
          <span class="pedido-prod-price">€${(x.preco * x.qty).toFixed(2)}</span>
        </div>
      `).join('')}
    </div>

    <div style="margin-top:16px">
      <label style="font-size:0.78rem;font-weight:700;color:var(--text2);text-transform:uppercase;letter-spacing:0.06em;display:block;margin-bottom:8px">Atualizar Estado</label>
      <select class="estado-select" id="modal-estado-select" onchange="updatePedidoEstado(${p.id}, this.value)">
        ${ESTADOS_ORDER.map(e => `<option value="${e}" ${e === p.estado ? 'selected' : ''}>${ESTADO_META[e]?.label}</option>`).join('')}
      </select>
    </div>
  `;

  const actions = document.getElementById('modal-pedido-actions');
  actions.innerHTML = `
    ${p.estado === 'pendente' ? `<button class="btn-primary" onclick="quickAction(${p.id},'confirmado')">Confirmar Pedido</button>` : ''}
    ${p.estado === 'confirmado' ? `<button class="btn-primary" onclick="quickAction(${p.id},'preparacao')">Iniciar Preparação</button>` : ''}
    ${p.estado === 'preparacao' ? `<button class="btn-primary" onclick="quickAction(${p.id},'enviado')">Marcar Enviado</button>` : ''}
    ${p.estado === 'enviado' ? `<button class="btn-primary" onclick="quickAction(${p.id},'entregue')">Marcar Entregue</button>` : ''}
    ${!['cancelado','entregue'].includes(p.estado) ? `<button class="btn-danger" onclick="quickAction(${p.id},'cancelado')">Cancelar</button>` : ''}
    <button class="btn-ghost" onclick="closeModal('modal-pedido')">Fechar</button>
  `;

  openModal('modal-pedido');
}

function updatePedidoEstado(id, novoEstado) {
  const p = currentPedidos.find(x => x.id === id);
  if (!p) return;
  const oldEstado = p.estado;
  p.estado = novoEstado;
  renderPedidos();
  renderDashboard();

  // Notificação para utilizador
  const msg = ESTADO_NOTIF_MSG[novoEstado];
  if (msg) {
    pushUserNotif(p.utilizador_id, `Pedido #${p.id}: ${msg}`, ESTADO_META[novoEstado]?.icon, p.id, novoEstado);
    pushAdminNotif(`Estado do pedido #${p.id} atualizado: ${oldEstado} → ${novoEstado}`, '�');
  }

  showToast(`Estado do pedido #${p.id} atualizado para "${ESTADO_META[novoEstado]?.label}".`, 'success');
  // Refresh modal actions
  openPedidoModal(id);
}

function quickAction(id, estado) {
  updatePedidoEstado(id, estado);
}

// ═══════════════════════════════════════════════
// NOTIFICAÇÕES ADMIN
// ═══════════════════════════════════════════════
function renderAdminNotifs() {
  const notifs = loadAdminNotifs();
  const el = document.getElementById('admin-notifs-list');
  if (!el) return;

  if (!notifs.length) {
    el.innerHTML = '<div class="admin-empty">Sem notificações no sistema.</div>';
    return;
  }

  el.innerHTML = notifs.map(n => `
    <div class="notif-item ${n.lida ? '' : 'unread'}" onclick="markNotifRead(${n.id})">
      <div class="notif-icon">${n.icon}</div>
      <div class="notif-body">
        <div class="notif-msg">${n.msg}</div>
        <div class="notif-meta">${n.data}</div>
      </div>
      ${!n.lida ? '<div class="notif-unread-dot"></div>' : ''}
    </div>
  `).join('');
}

function markNotifRead(id) {
  const notifs = loadAdminNotifs().map(n => n.id === id ? { ...n, lida: true } : n);
  saveAdminNotifs(notifs);
  renderAdminNotifs();
  updateAdminNotifBadge();
}

// ═══════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════
function renderConfig() {
  const user = JSON.parse(localStorage.getItem('etnv-user') || '{}');
  const el = document.getElementById('config-admin-name');
  if (el) el.textContent = user.name || user.nome || 'Admin';
}

// ═══════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════
function adminLogout() {
  confirmAction('Tens a certeza que queres sair do painel de administração?', () => {
    localStorage.removeItem('etnv-user');
    window.location.href = 'login.html';
  });
}

function checkAdminAuth() {
  const user = JSON.parse(localStorage.getItem('etnv-user') || '{}');
  // For demo: allow access if user exists or if coming via login
  // In production this would verify tipo_user === 'admin'
  if (!user || Object.keys(user).length === 0) {
    // Set demo admin user
    const demoAdmin = { id: 5, name: 'Admin ETNV', nome: 'Admin ETNV', email: 'admin@etnv.com', tipo_user: 'admin' };
    localStorage.setItem('etnv-user', JSON.stringify(demoAdmin));
    updateAdminUI(demoAdmin);
  } else {
    updateAdminUI(user);
  }
}

function updateAdminUI(user) {
  const name = user.name || user.nome || 'Admin';
  const initial = name.charAt(0).toUpperCase();
  const chipName = document.getElementById('admin-name-chip');
  const chipAv = document.getElementById('admin-avatar-chip');
  const greeting = document.getElementById('admin-greeting');
  if (chipName) chipName.textContent = name;
  if (chipAv) chipAv.textContent = initial;
  if (greeting) greeting.textContent = `👋 Bem-vindo, ${name.split(' ')[0]}!`;
}

// ═══════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════
function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch(e) { return dateStr; }
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  checkAdminAuth();
  updateThemeIcons();
  renderDashboard();
  updateAdminNotifBadge();

  // Add some demo notifs if empty
  if (!loadAdminNotifs().length) {
    pushAdminNotif('Novo pedido #1001 recebido de Carlos Mendes', '�');
    pushAdminNotif('Utilizador João Neto foi bloqueado', '�');
    pushAdminNotif('Stock do produto "Precision Air X" esgotado!', '🔔');
    updateAdminNotifBadge();
  }
});

// ═══════════════════════════════════════════════
// API-CONNECTED OVERRIDES
// Estas funções substituem as MOCK quando API_MODE=true
// ═══════════════════════════════════════════════

async function loadDashboardFromAPI() {
  if (!API_MODE || typeof AdminDashboard === 'undefined') return;
  try {
    const data = await AdminDashboard.stats();
    document.getElementById('stat-produtos').textContent = data.total_produtos ?? '—';
    document.getElementById('stat-users').textContent    = data.total_users    ?? '—';
    document.getElementById('stat-pedidos').textContent  = data.total_pedidos  ?? '—';
    document.getElementById('stat-receita').textContent  = data.receita_total != null ? '€' + parseFloat(data.receita_total).toFixed(2) : '—';

    // Pedidos recentes
    if (data.pedidos_recentes?.length) {
      const recentEl = document.getElementById('dash-recent-orders');
      recentEl.innerHTML = data.pedidos_recentes.map(p => `
        <div class="dash-order-row">
          <span class="dash-order-id">#${p.id}</span>
          <span class="dash-order-client">${p.cliente}</span>
          <span class="order-status ${ESTADO_META[p.estado]?.cls || ''}">${ESTADO_META[p.estado]?.label || p.estado}</span>
          <span class="dash-order-total">€${parseFloat(p.total).toFixed(2)}</span>
        </div>
      `).join('');
    }

    // Estados
    if (data.pedidos_por_estado) {
      const el = document.getElementById('dash-estados');
      el.innerHTML = ESTADOS_ORDER.map(e => `
        <div class="dash-estado-row">
          <span class="dash-estado-label">${ESTADO_META[e]?.label}</span>
          <span class="dash-estado-count">${data.pedidos_por_estado[e] || 0}</span>
        </div>
      `).join('');
    }

    // Badge pedidos pendentes
    const pending = data.pedidos_por_estado?.pendente || 0;
    const badge = document.getElementById('badge-pedidos');
    if (badge) { badge.textContent = pending; badge.style.display = pending ? '' : 'none'; }

    // Stock critico
    if (data.stock_critico?.length) {
      pushAdminNotif(`${data.stock_critico.length} produto(s) com stock critico!`, '🔔');
    }
  } catch(e) {
    console.warn('[Admin Dashboard API]', e.message);
  }
}

async function loadProdutosFromAPI() {
  if (!API_MODE || typeof AdminProdutos === 'undefined') return;
  try {
    const data = await AdminProdutos.listar();
    // Normaliza para formato usado pelo MOCK
    currentProdutos = data.map(p => ({
      id: p.id,
      nome: p.nome,
      descricao: p.descricao || '',
      preco: parseFloat(p.preco),
      stock: parseInt(p.stock),
      imagem: p.imagem || '',
      categoria: p.categoria_slug || p.categoria_nome || '',
      badge: p.badge || null,
    }));
    renderProdutos();
  } catch(e) {
    console.warn('[Admin Produtos API]', e.message);
    renderProdutos(); // fallback para mock
  }
}

async function loadUsersFromAPI() {
  if (!API_MODE || typeof AdminUsers === 'undefined') return;
  try {
    const data = await AdminUsers.listar();
    currentUsers = data;
    renderUsers();
  } catch(e) {
    console.warn('[Admin Users API]', e.message);
    renderUsers();
  }
}

async function loadPedidosFromAPI() {
  if (!API_MODE || typeof AdminPedidos === 'undefined') return;
  try {
    const data = await AdminPedidos.listar();
    currentPedidos = data.map(p => ({
      id: p.id,
      utilizador_id: p.utilizador_id,
      cliente: p.cliente,
      total: parseFloat(p.total),
      estado: p.estado,
      data: p.data_pedido,
      produtos: [], // carregados no detalhe
    }));
    renderPedidos();
  } catch(e) {
    console.warn('[Admin Pedidos API]', e.message);
    renderPedidos();
  }
}

// ─── OVERRIDE: saveProduto com API ────────────────
const _saveProdutoOriginal = saveProduto;
saveProduto = async function() {
  if (!API_MODE || typeof AdminProdutos === 'undefined') {
    _saveProdutoOriginal();
    return;
  }

  const editId = document.getElementById('edit-prod-id').value;
  const nome   = document.getElementById('p-nome').value.trim();
  const preco  = parseFloat(document.getElementById('p-preco').value);
  const desc   = document.getElementById('p-desc').value.trim();
  const cat    = document.getElementById('p-cat').value;
  const stock  = parseInt(document.getElementById('p-stock').value);
  const img    = document.getElementById('p-img').value.trim();

  if (!nome || isNaN(preco) || !cat || isNaN(stock)) {
    _saveProdutoOriginal(); // deixa a validação correr
    return;
  }

  const payload = { nome, descricao: desc, preco, stock, imagem: img, categoria_id: getCatId(cat) };

  try {
    if (editId) {
      await AdminProdutos.editar(editId, payload);
      showToast('Produto atualizado!', 'success');
    } else {
      await AdminProdutos.criar(payload);
      showToast('Produto adicionado!', 'success');
    }
    resetProdutoForm();
    await loadProdutosFromAPI();
    adminNav('produtos', document.querySelectorAll('.sidebar-item')[1]);
  } catch(e) {
    showToast('Erro: ' + e.message, 'error');
  }
};

// ─── OVERRIDE: updatePedidoEstado com API ─────────
const _updateEstadoOriginal = updatePedidoEstado;
updatePedidoEstado = async function(id, novoEstado) {
  if (!API_MODE || typeof AdminPedidos === 'undefined') {
    _updateEstadoOriginal(id, novoEstado);
    return;
  }
  try {
    await AdminPedidos.atualizarEstado(id, novoEstado);
    const p = currentPedidos.find(x => x.id === id);
    if (p) p.estado = novoEstado;
    renderPedidos();
    renderDashboard();
    showToast(`Estado do pedido #${id} atualizado para "${ESTADO_META[novoEstado]?.label}".`, 'success');
    openPedidoModal(id);
  } catch(e) {
    showToast('Erro: ' + e.message, 'error');
  }
};

function getCatId(slug) {
  const map = { audio:1, teclado:2, mouse:3, carregador:4, storage:5, cabo:6, gadget:7 };
  return map[slug] || null;
}

// ─── OVERRIDE: renderDashboard com API ─────────────
const _renderDashboardOriginal = renderDashboard;
renderDashboard = function() {
  _renderDashboardOriginal();
  loadDashboardFromAPI(); // enriquece com dados reais
};

// ─── OVERRIDE: renderProdutos load ─────────────────
const _adminNavOriginal = adminNav;
adminNav = function(section, btnEl) {
  _adminNavOriginal(section, btnEl);
  if (API_MODE) {
    if (section === 'produtos')      loadProdutosFromAPI();
    if (section === 'utilizadores')  loadUsersFromAPI();
    if (section === 'pedidos')       loadPedidosFromAPI();
  }
};

// ─── INIT com deteção de API ──────────────────────
const _initOriginal = document.addEventListener;
document.addEventListener('DOMContentLoaded', async () => {
  await detectApiMode();
  if (API_MODE) {
    console.log('[Admin] Backend PHP detetado — a usar API real.');
  }
});
