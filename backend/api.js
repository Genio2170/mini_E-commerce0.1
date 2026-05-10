// ═══════════════════════════════════════════════
// api.js — Camada de integração Frontend ↔ Backend PHP
// Inclua este ficheiro ANTES de script.js nas páginas HTML
// ═══════════════════════════════════════════════

// Base URL da API — ajuste se o backend estiver noutro caminho
const API_BASE = '../backend/api';

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
      // Sessão expirada → redirecionar para login
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
  /**
   * Login — substitui doLogin() do script.js
   * Chama POST /api/auth.php?action=login
   */
  async login(email, password) {
    const user = await apiRequest('auth.php?action=login', 'POST', { email, password });
    // Guardar no localStorage para compatibilidade com o script.js existente
    localStorage.setItem('etnv-user', JSON.stringify(user));
    return user;
  },

  /**
   * Registo — substitui doRegister() do script.js
   * Chama POST /api/auth.php?action=register
   */
  async register(nome, email, password) {
    const user = await apiRequest('auth.php?action=register', 'POST', { nome, email, password });
    localStorage.setItem('etnv-user', JSON.stringify(user));
    return user;
  },

  /**
   * Logout — substitui logout() do script.js
   * Chama POST /api/auth.php?action=logout
   */
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

  /**
   * Verifica se existe sessão ativa no servidor
   * Chama GET /api/auth.php?action=me
   */
  async me() {
    return apiRequest('auth.php?action=me');
  },
};

// ═══════════════════════════════════════════════
// PERFIL
// ═══════════════════════════════════════════════

const Perfil = {
  /**
   * Atualizar dados do perfil
   * Chama PUT /api/users.php?action=atualizar
   */
  async atualizar(nome, email, telefone = '') {
    const updated = await apiRequest('users.php?action=atualizar', 'PUT', { nome, email, telefone });
    // Sincronizar com o localStorage
    const saved = JSON.parse(localStorage.getItem('etnv-user') || '{}');
    localStorage.setItem('etnv-user', JSON.stringify({ ...saved, ...updated }));
    return updated;
  },

  /**
   * Alterar password
   * Chama PUT /api/users.php?action=password
   */
  async alterarPassword(password_atual, password_nova) {
    return apiRequest('users.php?action=password', 'PUT', { password_atual, password_nova });
  },

  /**
   * Buscar perfil completo com estatísticas
   * Chama GET /api/users.php?action=perfil
   */
  async get() {
    return apiRequest('users.php?action=perfil');
  },
};

// ═══════════════════════════════════════════════
// PRODUTOS
// ═══════════════════════════════════════════════

const Produtos = {
  /**
   * Listar produtos com filtros opcionais
   * Chama GET /api/produtos.php
   * @param {object} filtros - { search, categoria_id, order, limit, offset }
   */
  async listar(filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    return apiRequest(`produtos.php${params ? '?' + params : ''}`);
  },

  /**
   * Buscar produto por ID
   * Chama GET /api/produtos.php?id=X
   */
  async get(id) {
    return apiRequest(`produtos.php?id=${id}`);
  },
};

// ═══════════════════════════════════════════════
// CARRINHO
// ═══════════════════════════════════════════════

const Carrinho = {
  /**
   * Listar itens do carrinho do utilizador logado
   * Chama GET /api/carrinho.php
   */
  async listar() {
    return apiRequest('carrinho.php');
  },

  /**
   * Adicionar produto ao carrinho
   * Chama POST /api/carrinho.php?action=adicionar
   */
  async adicionar(produto_id, quantidade = 1) {
    return apiRequest('carrinho.php?action=adicionar', 'POST', { produto_id, quantidade });
  },

  /**
   * Alterar quantidade de um item
   * Chama PUT /api/carrinho.php?action=atualizar&id=X
   */
  async atualizar(id, quantidade) {
    return apiRequest(`carrinho.php?action=atualizar&id=${id}`, 'PUT', { quantidade });
  },

  /**
   * Remover item do carrinho
   * Chama DELETE /api/carrinho.php?action=remover&id=X
   */
  async remover(id) {
    return apiRequest(`carrinho.php?action=remover&id=${id}`, 'DELETE');
  },

  /**
   * Limpar todo o carrinho
   * Chama DELETE /api/carrinho.php?action=limpar
   */
  async limpar() {
    return apiRequest('carrinho.php?action=limpar', 'DELETE');
  },

  // Sincronizar carrinho local com a BD após login
  async sincronizarDoLocalStorage() {
    try {
      const local = JSON.parse(localStorage.getItem('etnv-cart') || '[]');
      for (const item of local) {
        await this.adicionar(item.id, item.qty).catch(() => {});
      }
      localStorage.removeItem('etnv-cart');
    } catch (e) {
      console.warn('[Carrinho] Erro ao sincronizar:', e);
    }
  },
};

// ═══════════════════════════════════════════════
// PEDIDOS
// ═══════════════════════════════════════════════

const Pedidos = {
  /**
   * Listar meus pedidos
   * Chama GET /api/pedidos.php
   */
  async listar() {
    return apiRequest('pedidos.php');
  },

  /**
   * Detalhe de um pedido
   * Chama GET /api/pedidos.php?id=X
   */
  async get(id) {
    return apiRequest(`pedidos.php?id=${id}`);
  },

  /**
   * Finalizar compra (checkout)
   * Chama POST /api/pedidos.php?action=criar
   * @param {string} codigo_promo - opcional (ex: 'ETNV10')
   */
  async criar(codigo_promo = '') {
    return apiRequest('pedidos.php?action=criar', 'POST', { codigo_promo });
  },

  /**
   * Cancelar pedido
   * Chama PUT /api/pedidos.php?action=cancelar&id=X
   */
  async cancelar(id) {
    return apiRequest(`pedidos.php?action=cancelar&id=${id}`, 'PUT');
  },
};

// ═══════════════════════════════════════════════
// CATEGORIAS
// ═══════════════════════════════════════════════

const Categorias = {
  async listar() {
    return apiRequest('categorias.php');
  },
};

// ═══════════════════════════════════════════════
// SUBSTITUIÇÕES DO SCRIPT.JS
// Redefine as funções que antes usavam só localStorage
// para agora chamarem a API PHP.
// ═══════════════════════════════════════════════

// Interceptar doLogin
window._doLogin_original = window.doLogin;
window.doLogin = async function () {
  // Reutilizar a validação do script.js
  const email = document.getElementById('login-email')?.value.trim();
  const pass  = document.getElementById('login-pass')?.value;

  // Limpar erros visuais (função do script.js)
  if (typeof clearAllErrors === 'function') clearAllErrors();

  let hasError = false;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (typeof showFieldError === 'function') showFieldError('login-email', 'Email inválido');
    hasError = true;
  }
  if (!pass || pass.length < 6) {
    if (typeof showFieldError === 'function') showFieldError('login-pass', 'Password deve ter pelo menos 6 caracteres');
    hasError = true;
  }
  if (hasError) return;

  try {
    await Auth.login(email, pass);
    // Sincronizar carrinho local que possa existir antes do login
    await Carrinho.sincronizarDoLocalStorage();
    window.location.href = 'home.html';
  } catch (err) {
    if (typeof showFieldError === 'function') {
      showFieldError('login-email', err.message || 'Credenciais inválidas');
    }
  }
};

// Interceptar doRegister
window._doRegister_original = window.doRegister;
window.doRegister = async function () {
  const nome  = document.getElementById('reg-name')?.value.trim();
  const email = document.getElementById('reg-email')?.value.trim();
  const pass  = document.getElementById('reg-pass')?.value;

  if (typeof clearAllErrors === 'function') clearAllErrors();

  let hasError = false;
  if (!nome || nome.length < 2) {
    if (typeof showFieldError === 'function') showFieldError('reg-name', 'Nome obrigatório');
    hasError = true;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (typeof showFieldError === 'function') showFieldError('reg-email', 'Email inválido');
    hasError = true;
  }
  if (!pass || pass.length < 6) {
    if (typeof showFieldError === 'function') showFieldError('reg-pass', 'Mínimo 6 caracteres');
    hasError = true;
  }
  if (hasError) return;

  try {
    await Auth.register(nome, email, pass);
    window.location.href = 'home.html';
  } catch (err) {
    if (typeof showFieldError === 'function') {
      showFieldError('reg-email', err.message || 'Erro ao criar conta');
    }
  }
};

// Interceptar logout
window._logout_original = window.logout;
window.logout = async function () {
  await Auth.logout();
};

// Interceptar saveProfile (atualização de perfil)
window._saveProfile_original = window.saveProfile;
window.saveProfile = async function () {
  const nome  = document.getElementById('edit-name')?.value.trim();
  const email = document.getElementById('edit-email')?.value.trim();
  const phone = document.getElementById('edit-phone')?.value.trim();

  if (typeof clearEditErrors === 'function') clearEditErrors();

  let hasError = false;
  if (!nome) { if (typeof showEditError === 'function') showEditError('edit-name', 'Nome obrigatório'); hasError = true; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (typeof showEditError === 'function') showEditError('edit-email', 'Email inválido'); hasError = true;
  }
  if (hasError) return;

  try {
    await Perfil.atualizar(nome, email, phone);
    // Atualizar objeto user local
    if (window.user) {
      window.user.name  = nome;
      window.user.email = email;
      window.user.phone = phone;
    }
    if (typeof renderProfile   === 'function') renderProfile();
    if (typeof updateAvatarBtn === 'function') updateAvatarBtn();
    if (typeof toggleEditPanel === 'function') toggleEditPanel();
    if (typeof showToast       === 'function') showToast('Perfil atualizado com sucesso!');
  } catch (err) {
    if (typeof showToast === 'function') showToast(err.message || 'Erro ao guardar perfil', 'error');
  }
};

// Interceptar checkout para usar a API PHP
window._checkout_original = window.checkout;
window.checkout = async function () {
  if (typeof cart !== 'undefined' && cart.length === 0) {
    if (typeof showToast === 'function') showToast('Carrinho está vazio', 'warn');
    return;
  }

  const promoCode = document.getElementById('promo-code')?.value.trim() || '';

  try {
    const resultado = await Pedidos.criar(promoCode);

    // Limpar estado local
    if (typeof cart !== 'undefined') window.cart = [];
    if (typeof discount !== 'undefined') window.discount = 0;
    if (typeof updateCartBadge === 'function') updateCartBadge();
    if (typeof saveCart        === 'function') saveCart();
    if (typeof renderCart      === 'function') renderCart();

    if (typeof showToast === 'function') {
      showToast(`Pedido #${resultado.pedido_id} confirmado! Total: €${resultado.total}`);
    }
  } catch (err) {
    if (typeof showToast === 'function') showToast(err.message || 'Erro ao finalizar compra', 'error');
  }
};

console.log('[ETNV] api.js carregado — Backend PHP ativo');
