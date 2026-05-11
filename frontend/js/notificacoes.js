// ═══════════════════════════════════════════════
// notificacoes.js — Página de Notificações do Utilizador
// ═══════════════════════════════════════════════

const NOTIF_ESTADO_META = {
  confirmado: { label: 'Confirmado',    cls: 'nb-confirmado', icon: '' },
  preparacao: { label: 'Em Preparação', cls: 'nb-preparacao', icon: '' },
  enviado:    { label: 'Enviado',        cls: 'nb-enviado',    icon: '' },
  entregue:   { label: 'Entregue',       cls: 'nb-entregue',   icon: '' },
  cancelado:  { label: 'Cancelado',      cls: 'nb-cancelado',  icon: '' },
  pendente:   { label: 'Pendente',       cls: 'nb-pendente',   icon: '' },
};

let notifFilter = 'all';

// ─── GET USER ID
function getCurrentUserId() {
  try {
    const u = JSON.parse(localStorage.getItem('etnv-user') || '{}');
    return u.id || u.userId || 1; // fallback to 1 for demo
  } catch(e) { return 1; }
}

// ─── LOAD / SAVE
function loadMyNotifs() {
  const uid = getCurrentUserId();
  try { return JSON.parse(localStorage.getItem(`etnv-user-notifs-${uid}`) || '[]'); }
  catch(e) { return []; }
}

function saveMyNotifs(notifs) {
  const uid = getCurrentUserId();
  localStorage.setItem(`etnv-user-notifs-${uid}`, JSON.stringify(notifs));
}

// ─── RENDER
function renderUserNotifs(filterType) {
  filterType = filterType || notifFilter;
  let notifs = loadMyNotifs();

  // Inject demo notifications if empty
  if (!notifs.length) {
    injectDemoNotifs();
    notifs = loadMyNotifs();
  }

  let filtered = notifs;
  if (filterType === 'unread') {
    filtered = notifs.filter(n => !n.lida);
  } else if (filterType !== 'all') {
    filtered = notifs.filter(n => n.estado === filterType);
  }

  const container = document.getElementById('notifs-container');
  const empty = document.getElementById('notif-empty');

  if (!filtered.length) {
    container.innerHTML = '';
    container.appendChild(empty || createEmptyState(filterType));
    return;
  }

  container.innerHTML = filtered.map(n => {
    const meta = NOTIF_ESTADO_META[n.estado] || { label: n.estado, cls: '', icon: '' };
    const iconSVG = n.icon || (meta.icon ? `<span style="font-size:1.2rem">${meta.icon}</span>` : '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:currentColor;stroke-width:1.5;fill:none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>');
    return `
      <div class="notif-card ${n.lida ? '' : 'unread'}" onclick="readNotif(${n.id})">
        <div class="notif-card-icon">${iconSVG}</div>
        <div class="notif-card-body">
          <div class="notif-card-msg">${n.msg}</div>
          <div class="notif-card-meta">
            <span class="notif-card-date">${n.data}</span>
            ${n.estado ? `<span class="notif-estado-badge ${meta.cls}">${meta.label}</span>` : ''}
            ${n.pedidoId ? `<span style="font-size:0.73rem;color:var(--text3)">Pedido #${n.pedidoId}</span>` : ''}
          </div>
        </div>
        <div class="notif-card-right">
          ${!n.lida ? '<div class="notif-unread-dot"></div>' : ''}
        </div>
      </div>
    `;
  }).join('');
}

function createEmptyState(filter) {
  const msgs = {
    unread: 'Não tens notificações por ler.',
    all: 'Ainda não tens notificações.',
  };
  const div = document.createElement('div');
  div.className = 'notif-empty-state';
  div.innerHTML = `
    <div class="notif-empty-icon"><svg viewBox="0 0 24 24" style="width:48px;height:48px;stroke:currentColor;stroke-width:1.5;fill:none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
    <div class="notif-empty-title">Sem notificações</div>
    <div class="notif-empty-sub">${msgs[filter] || `Sem notificações de estado "${filter}".`}</div>
    <button class="btn-primary-sm" onclick="window.location.href='home.html'">Ver Produtos</button>
  `;
  return div;
}

function readNotif(id) {
  const notifs = loadMyNotifs().map(n => n.id === id ? { ...n, lida: true } : n);
  saveMyNotifs(notifs);
  updateNavNotifBadge();
  renderUserNotifs();
}

function markAllRead() {
  const notifs = loadMyNotifs().map(n => ({ ...n, lida: true }));
  saveMyNotifs(notifs);
  updateNavNotifBadge();
  renderUserNotifs();
}

function clearAllNotifs() {
  if (!confirm('Tens a certeza que queres apagar todas as notificações?')) return;
  saveMyNotifs([]);
  updateNavNotifBadge();
  renderUserNotifs();
}

function filterNotifs(type, btnEl) {
  notifFilter = type;
  document.querySelectorAll('.notif-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderUserNotifs(type);
}

// ─── NAVBAR BADGE
function updateNavNotifBadge() {
  const notifs = loadMyNotifs();
  const unread = notifs.filter(n => !n.lida).length;
  document.querySelectorAll('.nav-notif-count').forEach(el => {
    el.textContent = unread;
    el.style.display = unread > 0 ? 'flex' : 'none';
  });
}

// ─── DEMO DATA
function injectDemoNotifs() {
  const uid = getCurrentUserId();
  const existing = loadMyNotifs();
  if (existing.length > 0) return;

  const demos = [
    { id: Date.now() + 1, icon: '', msg: 'Pedido #1001: O teu pedido foi confirmado', pedidoId: 1001, estado: 'confirmado', data: '10/05/2026 09:15', lida: true },
    { id: Date.now() + 2, icon: '', msg: 'Pedido #1001: O teu pedido está em preparação', pedidoId: 1001, estado: 'preparacao', data: '10/05/2026 11:30', lida: false },
    { id: Date.now() + 3, icon: '', msg: 'Pedido #999: O teu pedido foi enviado — está a caminho!', pedidoId: 999, estado: 'enviado', data: '08/05/2026 14:20', lida: false },
    { id: Date.now() + 4, icon: '', msg: 'Pedido #998: O teu pedido foi entregue — aprecia a compra!', pedidoId: 998, estado: 'entregue', data: '05/05/2026 16:00', lida: true },
  ];
  saveMyNotifs(demos);
}

// ─── INIT
document.addEventListener('DOMContentLoaded', () => {
  renderUserNotifs('all');
  updateNavNotifBadge();
});

// ═══════════════════════════════════════════════
// API-CONNECTED: carrega notificacoes da BD real
// ═══════════════════════════════════════════════

async function loadNotifsFromAPI() {
  if (typeof Notificacoes === 'undefined') return false;
  try {
    const data = await Notificacoes.listar();
    const notifs = (data.notificacoes || []).map(n => ({
      id: n.id,
      icon: n.icone,
      msg: n.mensagem,
      pedidoId: n.pedido_id,
      estado: n.estado_pedido,
      data: n.data_criacao,
      lida: !!n.lida,
    }));
    saveMyNotifs(notifs);
    return true;
  } catch(e) {
    return false; // usa dados locais
  }
}

// Override markAllRead para chamar API
const _markAllReadOrig = markAllRead;
markAllRead = async function() {
  if (typeof Notificacoes !== 'undefined') {
    try { await Notificacoes.marcarTodas(); } catch(e) {}
  }
  _markAllReadOrig();
};

// Override clearAllNotifs para chamar API
const _clearAllOrig = clearAllNotifs;
clearAllNotifs = async function() {
  if (!confirm('Tens a certeza que queres apagar todas as notificações?')) return;
  if (typeof Notificacoes !== 'undefined') {
    try { await Notificacoes.apagarTodas(); } catch(e) {}
  }
  saveMyNotifs([]);
  updateNavNotifBadge();
  renderUserNotifs();
};

// Init: tenta carregar da API, senão usa localStorage
document.addEventListener('DOMContentLoaded', async () => {
  const apiOk = await loadNotifsFromAPI();
  if (!apiOk) injectDemoNotifs();
  renderUserNotifs('all');
  updateNavNotifBadge();
});
