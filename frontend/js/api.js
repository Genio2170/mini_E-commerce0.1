// ═══════════════════════════════════════════════
// api.js — Camada de integração Frontend ↔ Backend PHP
// Inclua este ficheiro ANTES de script.js nas páginas HTML
// ═══════════════════════════════════════════════

// Base URL da API — ajuste se o backend estiver noutro caminho
const API_BASE = '../../backend/api';

// ─── HELPER HTTP ────────────────────────────────

async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    credentials: 'include', // envia o cookie de sessão PHP
    headers: { 'Content-Type': 'application/json' },
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, options);
    const json = await res.json();

    if (!json.success) {
      if (res.status === 401) {
        // Só redireciona para login se NÃO estiver já na página de login ou index
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage !== 'login.html' && currentPage !== 'index.html') {
          window.location.href = 'login.html';
        }
      }
      throw new Error(json.message || 'Erro desconhecido');
    }

    return json.data;
  } catch (err) {
    console.error(`[API] ${method} ${endpoint}:`, err.message);
    throw err;
  }
}

// ═══════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════

const Auth = {
  async login(email, password) {
    const user = await apiRequest('auth.php?action=login', 'POST', { email, password });
    // PHP devolve "nome", JS usa "name" — normalizar aqui
    if (user.nome && !user.name) user.name = user.nome;
    localStorage.setItem('etnv-user', JSON.stringify(user));
    return user;
  },

  async register(nome, email, password) {
    const user = await apiRequest('auth.php?action=register', 'POST', { nome, email, password });
    // PHP devolve "nome", JS usa "name" — normalizar aqui
    if (user.nome && !user.name) user.name = user.nome;
    localStorage.setItem('etnv-user', JSON.stringify(user));
    return user;
  },

  async logout() {
    try {
      await apiRequest('auth.php?action=logout', 'POST');
    } finally {
      localStorage.removeItem('etnv-user');
      localStorage.removeItem('etnv-cart');
      localStorage.removeItem('etnv-avatar');
      window.location.href = 'index.html';
    }
  },

  async me() {
    const user = await apiRequest('auth.php?action=me');
    if (user && user.nome && !user.name) user.name = user.nome;
    return user;
  },
};

// ═══════════════════════════════════════════════
// PRODUTOS
// ═══════════════════════════════════════════════

const Produtos = {
  async listar(filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    return apiRequest(`produtos.php${params ? '?' + params : ''}`);
  },

  async get(id) {
    return apiRequest(`produtos.php?id=${id}`);
  },
};

// ═══════════════════════════════════════════════
// CARRINHO
// ═══════════════════════════════════════════════

const Carrinho = {
  async listar() {
    return apiRequest('carrinho.php');
  },

  async adicionar(produto_id, quantidade = 1) {
    return apiRequest('carrinho.php?action=adicionar', 'POST', { produto_id, quantidade });
  },

  async atualizar(id, quantidade) {
    return apiRequest(`carrinho.php?action=atualizar&id=${id}`, 'PUT', { quantidade });
  },

  async remover(id) {
    return apiRequest(`carrinho.php?action=remover&id=${id}`, 'DELETE');
  },

  async limpar() {
    return apiRequest('carrinho.php?action=limpar', 'DELETE');
  },
};

// ═══════════════════════════════════════════════
// PEDIDOS
// ═══════════════════════════════════════════════

const Pedidos = {
  async listar() {
    return apiRequest('pedidos.php');
  },

  async criar(codigo_promo = '') {
    return apiRequest('pedidos.php?action=criar', 'POST', { codigo_promo });
  },

  async detalhe(id) {
    return apiRequest(`pedidos.php?id=${id}`);
  },

  async cancelar(id) {
    return apiRequest(`pedidos.php?action=cancelar&id=${id}`, 'PUT');
  },
};

const Perfil = {
  async atualizar(nome, email, telefone = '') {
    const updated = await apiRequest('users.php?action=atualizar', 'PUT', { nome, email, telefone });
    // Normalizar nome→name para consistência com o resto do JS
    if (updated && updated.nome && !updated.name) updated.name = updated.nome;
    const saved = JSON.parse(localStorage.getItem('etnv-user') || '{}');
    localStorage.setItem('etnv-user', JSON.stringify({ ...saved, ...updated }));
    return updated;
  },

  async alterarPassword(password_atual, password_nova) {
    return apiRequest('users.php?action=password', 'PUT', { password_atual, password_nova });
  },

  async get() {
    return apiRequest('users.php?action=perfil');
  },
};


// ═══════════════════════════════════════════════
// NOTIFICAÇÕES (utilizador)
// ═══════════════════════════════════════════════

const Notificacoes = {
  async listar() {
    return apiRequest('notificacoes.php');
  },

  async marcarLida(id) {
    return apiRequest(`notificacoes.php?id=${id}`, 'PUT');
  },

  async marcarTodas() {
    return apiRequest('notificacoes.php?action=todas', 'PUT');
  },

  async apagar(id) {
    return apiRequest(`notificacoes.php?id=${id}`, 'DELETE');
  },

  async apagarTodas() {
    return apiRequest('notificacoes.php?action=todas', 'DELETE');
  },
};

// ═══════════════════════════════════════════════
// ADMIN — Dashboard
// ═══════════════════════════════════════════════

const AdminDashboard = {
  async stats() {
    return apiRequest('admin/dashboard.php');
  },
};

// ═══════════════════════════════════════════════
// ADMIN — Utilizadores
// ═══════════════════════════════════════════════

const AdminUsers = {
  async listar() {
    return apiRequest('admin/users.php');
  },

  async detalhe(id) {
    return apiRequest(`admin/users.php?id=${id}`);
  },

  async bloquear(id) {
    return apiRequest(`admin/users.php?action=bloquear&id=${id}`, 'PUT');
  },

  async desbloquear(id) {
    return apiRequest(`admin/users.php?action=desbloquear&id=${id}`, 'PUT');
  },

  async apagar(id) {
    return apiRequest(`admin/users.php?id=${id}`, 'DELETE');
  },
};

// ═══════════════════════════════════════════════
// ADMIN — Produtos
// ═══════════════════════════════════════════════

const AdminProdutos = {
  async listar() {
    return apiRequest('admin/produtos.php');
  },

  async criar(dados) {
    return apiRequest('admin/produtos.php', 'POST', dados);
  },

  async editar(id, dados) {
    return apiRequest(`admin/produtos.php?id=${id}`, 'PUT', dados);
  },

  async apagar(id) {
    return apiRequest(`admin/produtos.php?id=${id}`, 'DELETE');
  },
};

// ═══════════════════════════════════════════════
// ADMIN — Pedidos
// ═══════════════════════════════════════════════

const AdminPedidos = {
  async listar() {
    return apiRequest('admin/pedidos.php');
  },

  async detalhe(id) {
    return apiRequest(`admin/pedidos.php?id=${id}`);
  },

  async atualizarEstado(id, estado) {
    return apiRequest(`admin/pedidos.php?id=${id}`, 'PUT', { estado });
  },
};
