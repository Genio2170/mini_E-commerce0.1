// ═══════════════════════════════════════════════
// i18n.js — Sistema de traduções PT / EN
// ═══════════════════════════════════════════════

const TRANSLATIONS = {
  pt: {
    // NAV
    nav_home: 'Home',
    nav_products: 'Produtos',
    nav_profile: 'Perfil',
    nav_cart: 'Carrinho',

    // INDEX
    landing_badge: 'Loja Aberta — Angola',
    landing_sub: 'Equipamentos premium para quem leva a tecnologia a sério. Curado, testado, entregue em 24h.',
    btn_enter: 'Entrar na Loja',
    btn_create: 'Criar Conta',
    stat_products: 'Produtos',
    stat_clients: 'Clientes',
    stat_rating: 'Avaliação',
    stat_delivery: 'Entrega',

    // AUTH
    auth_welcome: 'Bem-vindo',
    auth_sub: 'Acede à tua conta ou cria uma nova.',
    tab_login: 'Login',
    tab_register: 'Registar',
    label_email: 'Email',
    label_password: 'Password',
    label_fullname: 'Nome Completo',
    placeholder_name: 'O teu nome',
    placeholder_email: 'email@exemplo.com',
    placeholder_password: '••••••••',
    placeholder_password_min: 'Mínimo 6 caracteres',
    btn_login: 'entrar →',
    btn_register: 'Criar Conta →',
    btn_back: '← Voltar',
    err_email_required: 'Email é obrigatório',
    err_email_invalid: 'Email inválido',
    err_pass_required: 'Password é obrigatória',
    err_pass_min: 'Password deve ter pelo menos 6 caracteres',
    err_name_required: 'Nome é obrigatório',
    err_api: 'Erro: API não carregada. Verifique a conexão com o servidor.',

    // HOME
    hero_eyebrow: 'Novidades disponíveis',
    hero_title1: 'A',
    hero_title2: 'melhor',
    hero_title3: 'tecnologia',
    hero_title4: 'ao teu alcance',
    hero_desc: 'Descobre a nossa seleção de eletrónicos premium — auriculares, teclados mecânicos, mouses gaming e muito mais.',
    btn_see_all_products: 'Ver Todos os Produtos →',
    cat_all: 'Todos',
    cat_audio: 'Audio',
    cat_keyboard: 'Teclados',
    cat_mouse: 'Mouses',
    cat_charger: 'Carregadores',
    cat_storage: 'Storage',
    cat_cable: 'Cabos',
    cat_gadget: 'Gadgets',
    section_featured: 'Em Destaque',
    see_all: 'Ver todos →',
    search_placeholder: 'Pesquisar produtos...',
    all_products: 'Todos os Produtos',

    // PRODUCT CARD
    badge_new: 'Novo',
    badge_sale: 'Sale',
    add_to_cart: 'Adicionar ao Carrinho',
    view_details: 'Ver Detalhes',
    product_details: 'Detalhes do Produto',
    close: 'Fechar',
    specifications: 'Especificações',
    category: 'Categoria',
    availability: 'Disponibilidade',
    in_stock: 'Em stock',

    // CART
    cart_title: 'Carrinho',
    cart_empty_title: 'Carrinho vazio',
    cart_empty_sub: 'Adiciona produtos para começar',
    btn_see_products: 'Ver Produtos',
    order_summary: 'Resumo do Pedido',
    subtotal: 'Subtotal',
    shipping: 'Envio',
    discount: 'Desconto',
    total: 'Total',
    promo_placeholder: 'Código promo...',
    btn_apply: 'Aplicar',
    btn_checkout: 'Finalizar Compra →',
    toast_added: 'adicionado ao carrinho',
    toast_cart_empty: 'Carrinho está vazio',
    toast_promo_10: 'Desconto de 10% aplicado!',
    toast_promo_20: 'Desconto de 20% aplicado!',
    toast_promo_invalid: 'Código inválido',
    toast_order_confirmed: 'Pedido de',
    toast_order_confirmed2: 'confirmado!',

    // PAYMENT METHODS
    payment_method_title: 'Método de Pagamento',
    payment_method_sub: 'Escolha como pretende pagar',
    pay_multicaixa: 'Multicaixa Express',
    pay_multicaixa_desc: 'Pagamento rápido via app Multicaixa Express',
    pay_referencia: 'Pagamento por Referência',
    pay_referencia_desc: 'Gere uma referência e paga no ATM ou balcão',
    pay_unitel: 'Unitel Money',
    pay_unitel_desc: 'Paga com a tua carteira Unitel Money',
    pay_africapay: 'AfricaPay',
    pay_africapay_desc: 'Plataforma de pagamentos digitais africana',
    pay_transferencia: 'Transferência Bancária',
    pay_transferencia_desc: 'Transfere directamente para a nossa conta BAI/BFA',
    pay_selected: 'Método seleccionado',
    pay_confirm: 'Confirmar Pagamento →',
    pay_none_selected: 'Por favor seleccione um método de pagamento',

    // PROFILE
    profile_member: 'Membro desde',
    btn_edit: 'Editar Perfil',
    ps_orders: 'Pedidos',
    ps_cart: 'Carrinho',
    ps_rating: 'Avaliação',
    edit_title: 'Editar Informações',
    label_name: 'Nome',
    label_phone: 'Telefone',
    label_city: 'Cidade',
    optional: '(opcional)',
    btn_save: 'Guardar',
    btn_cancel: 'Cancelar',
    account_info: 'Informações da Conta',
    info_member: 'Membro desde',
    info_status: 'Estado',
    info_active: 'Ativo',
    info_phone: 'Telefone',
    info_city: 'Cidade',
    btn_logout: 'Sair da Conta',
    toast_profile_saved: 'Perfil atualizado com sucesso!',
    toast_avatar_saved: 'Foto de perfil atualizada!',
    lang_toggle: 'EN',
  },

  en: {
    // NAV
    nav_home: 'Home',
    nav_products: 'Products',
    nav_profile: 'Profile',
    nav_cart: 'Cart',

    // INDEX
    landing_badge: 'Store Open — Angola',
    landing_sub: 'Premium equipment for those who take technology seriously. Curated, tested, delivered in 24h.',
    btn_enter: 'Enter Store',
    btn_create: 'Create Account',
    stat_products: 'Products',
    stat_clients: 'Customers',
    stat_rating: 'Rating',
    stat_delivery: 'Delivery',

    // AUTH
    auth_welcome: 'Welcome',
    auth_sub: 'Access your account or create a new one.',
    tab_login: 'Login',
    tab_register: 'Register',
    label_email: 'Email',
    label_password: 'Password',
    label_fullname: 'Full Name',
    placeholder_name: 'Your name',
    placeholder_email: 'email@example.com',
    placeholder_password: '••••••••',
    placeholder_password_min: 'Minimum 6 characters',
    btn_login: 'sign in →',
    btn_register: 'Create Account →',
    btn_back: '← Back',
    err_email_required: 'Email is required',
    err_email_invalid: 'Invalid email',
    err_pass_required: 'Password is required',
    err_pass_min: 'Password must be at least 6 characters',
    err_name_required: 'Name is required',
    err_api: 'Error: API not loaded. Check server connection.',

    // HOME
    hero_eyebrow: 'New arrivals available',
    hero_title1: 'The',
    hero_title2: 'best',
    hero_title3: 'technology',
    hero_title4: 'within your reach',
    hero_desc: 'Discover our selection of premium electronics — headphones, mechanical keyboards, gaming mice and much more.',
    btn_see_all_products: 'View All Products →',
    cat_all: 'All',
    cat_audio: 'Audio',
    cat_keyboard: 'Keyboards',
    cat_mouse: 'Mice',
    cat_charger: 'Chargers',
    cat_storage: 'Storage',
    cat_cable: 'Cables',
    cat_gadget: 'Gadgets',
    section_featured: 'Featured',
    see_all: 'See all →',
    search_placeholder: 'Search products...',
    all_products: 'All Products',

    // PRODUCT CARD
    badge_new: 'New',
    badge_sale: 'Sale',
    add_to_cart: 'Add to Cart',
    view_details: 'View Details',
    product_details: 'Product Details',
    close: 'Close',
    specifications: 'Specifications',
    category: 'Category',
    availability: 'Availability',
    in_stock: 'In stock',

    // CART
    cart_title: 'Cart',
    cart_empty_title: 'Cart is empty',
    cart_empty_sub: 'Add products to get started',
    btn_see_products: 'See Products',
    order_summary: 'Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    discount: 'Discount',
    total: 'Total',
    promo_placeholder: 'Promo code...',
    btn_apply: 'Apply',
    btn_checkout: 'Checkout →',
    toast_added: 'added to cart',
    toast_cart_empty: 'Cart is empty',
    toast_promo_10: '10% discount applied!',
    toast_promo_20: '20% discount applied!',
    toast_promo_invalid: 'Invalid code',
    toast_order_confirmed: 'Order of',
    toast_order_confirmed2: 'confirmed!',

    // PAYMENT METHODS
    payment_method_title: 'Payment Method',
    payment_method_sub: 'Choose how you want to pay',
    pay_multicaixa: 'Multicaixa Express',
    pay_multicaixa_desc: 'Quick payment via Multicaixa Express app',
    pay_referencia: 'Payment by Reference',
    pay_referencia_desc: 'Generate a reference and pay at ATM or branch',
    pay_unitel: 'Unitel Money',
    pay_unitel_desc: 'Pay with your Unitel Money wallet',
    pay_africapay: 'AfricaPay',
    pay_africapay_desc: 'African digital payments platform',
    pay_transferencia: 'Bank Transfer',
    pay_transferencia_desc: 'Transfer directly to our BAI/BFA account',
    pay_selected: 'Selected method',
    pay_confirm: 'Confirm Payment →',
    pay_none_selected: 'Please select a payment method',

    // PROFILE
    profile_member: 'Member since',
    btn_edit: 'Edit Profile',
    ps_orders: 'Orders',
    ps_cart: 'Cart',
    ps_rating: 'Rating',
    edit_title: 'Edit Information',
    label_name: 'Name',
    label_phone: 'Phone',
    label_city: 'City',
    optional: '(optional)',
    btn_save: 'Save',
    btn_cancel: 'Cancel',
    account_info: 'Account Information',
    info_member: 'Member since',
    info_status: 'Status',
    info_active: 'Active',
    info_phone: 'Phone',
    info_city: 'City',
    btn_logout: 'Sign Out',
    toast_profile_saved: 'Profile updated successfully!',
    toast_avatar_saved: 'Profile photo updated!',
    lang_toggle: 'PT',
  }
};

// ─── Estado do idioma ───────────────────────────
let currentLang = localStorage.getItem('etnv-lang') || 'pt';

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS['pt'][key] || key;
}

function toggleLang() {
  currentLang = currentLang === 'pt' ? 'en' : 'pt';
  localStorage.setItem('etnv-lang', currentLang);
  applyTranslations();
  // Re-renderizar conteúdo dinâmico
  if (typeof renderHomeGrid === 'function' && document.getElementById('home-grid')) renderHomeGrid('all');
  if (typeof renderProducts === 'function' && document.getElementById('products-grid')) renderProducts('all');
  if (typeof renderCart === 'function' && document.getElementById('cart-items-list')) renderCart();
  if (typeof renderProfile === 'function' && document.getElementById('profile-av')) renderProfile();
  if (typeof renderPaymentMethods === 'function') renderPaymentMethods();
  // Update page title
  updatePageTitle();
}

function updatePageTitle() {
  const titles = {
    'home.html':          { pt: 'ETNV - Loja',        en: 'ETNV - Store' },
    'carrinho.html':      { pt: 'ETNV - Carrinho',     en: 'ETNV - Cart' },
    'login.html':         { pt: 'ETNV - Login',        en: 'ETNV - Login' },
    'index.html':         { pt: 'ETNV - Electronics',  en: 'ETNV - Electronics' },
    'perfil.html':        { pt: 'ETNV - Perfil',       en: 'ETNV - Profile' },
    'notificacoes.html':  { pt: 'ETNV - Notificações', en: 'ETNV - Notifications' },
    'admin.html':         { pt: 'ETNV - Admin',        en: 'ETNV - Admin' },
  };
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const map = titles[page];
  if (map) document.title = map[currentLang] || map['pt'];
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const attr = el.getAttribute('data-i18n-attr');
    if (attr) {
      el.setAttribute(attr, t(key));
    } else {
      el.textContent = t(key);
    }
  });
  // Atualizar botão de idioma
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.textContent = t('lang_toggle');
  });
  // Update html lang attribute
  document.documentElement.setAttribute('lang', currentLang);
  updatePageTitle();
}

// Aplicar ao carregar
document.addEventListener('DOMContentLoaded', applyTranslations);
// Também aplicar imediatamente (para elementos já presentes)
applyTranslations();
