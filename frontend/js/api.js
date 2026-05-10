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
        window.location.href = 'login.html';
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
    localStorage.setItem('etnv-user', JSON.stringify(user));
    return user;
  },

  async register(nome, email, password) {
    const user = await apiRequest('auth.php?action=register', 'POST', { nome, email, password });
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
    return apiRequest('auth.php?action=me');
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
// PERFIL
// ═══════════════════════════════════════════════

const Perfil = {
  async atualizar(nome, email, telefone = '') {
    const updated = await apiRequest('users.php?action=atualizar', 'PUT', { nome, email, telefone });
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

