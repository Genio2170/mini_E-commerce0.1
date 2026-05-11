# ETNV-ELECTRONICS — Guia de Instalação (XAMPP)

## 📋 Pré-requisitos

- XAMPP instalado (Apache + MySQL)
- PHP 8.1+
- Navegador moderno

---

## 🚀 Instalação Passo a Passo

### 1. Copiar os ficheiros

Copia a pasta `projeto_fix` para dentro da pasta `htdocs` do XAMPP:

**Windows:**
```
C:\xampp\htdocs\projeto_fix\
```

**Mac:**
```
/Applications/XAMPP/htdocs/projeto_fix/
```

**Linux:**
```
/opt/lampp/htdocs/projeto_fix/
```

---

### 2. Iniciar o XAMPP

Abre o XAMPP Control Panel e inicia:
- ✅ **Apache**
- ✅ **MySQL**

---

### 3. Importar a Base de Dados

1. Abre o browser: **http://localhost/phpmyadmin**
2. Clica em **"Importar"** (menu superior)
3. Clica em **"Escolher ficheiro"**
4. Seleciona: `projeto_fix/Database/E-commerce.sql`
5. Clica em **"Executar"** (botão no final da página)

A BD `mini_ecommerce` será criada automaticamente com todas as tabelas e dados de exemplo.

---

### 4. Configurar a Ligação à BD

Edita o ficheiro `backend/config/database.php` se necessário:

```php
define('DB_HOST', 'localhost');   // não alterar normalmente
define('DB_NAME', 'mini_ecommerce');
define('DB_USER', 'root');        // utilizador MySQL do XAMPP
define('DB_PASS', '');            // password (vazia por defeito no XAMPP)
```

---

### 5. Aceder à Aplicação

| Página                | URL                                                        |
|-----------------------|------------------------------------------------------------|
| Loja (index)          | http://localhost/projeto_fix/frontend/html/index.html      |
| Login                 | http://localhost/projeto_fix/frontend/html/login.html      |
| Loja (home)           | http://localhost/projeto_fix/frontend/html/home.html       |
| Perfil utilizador     | http://localhost/projeto_fix/frontend/html/perfil.html     |
| Notificações          | http://localhost/projeto_fix/frontend/html/notificacoes.html |
| **Painel Admin**      | http://localhost/projeto_fix/frontend/html/admin.html      |

---

## 🔑 Credenciais de Acesso

| Tipo      | Email                | Password     |
|-----------|----------------------|--------------|
| **Admin** | admin@etnv.com       | `Admin@1234` |
| Cliente   | carlos@email.com     | `Cliente123` |
| Cliente   | ana@email.com        | `Cliente123` |

> ⚠️ **Nota sobre as passwords no SQL:**
> As passwords no ficheiro `.sql` são hashes bcrypt pré-geradas.
> Se precisares de regenerar, acede a:
> http://localhost/projeto_fix/backend/scripts/gerar_hash.php

---

## 🗂️ Estrutura do Projeto

```
projeto_fix/
├── Database/
│   └── E-commerce.sql           ← Importa este ficheiro no phpMyAdmin
│
├── backend/
│   ├── config/
│   │   └── database.php         ← Configura aqui a ligação à BD
│   ├── includes/
│   │   └── helpers.php          ← Funções partilhadas (CORS, auth, JSON)
│   ├── api/
│   │   ├── auth.php             ← Login / Registo / Logout / Me
│   │   ├── produtos.php         ← Listagem e detalhe de produtos
│   │   ├── carrinho.php         ← Gestão do carrinho
│   │   ├── pedidos.php          ← Pedidos do utilizador
│   │   ├── users.php            ← Perfil do utilizador
│   │   ├── notificacoes.php     ← Notificações do utilizador ← NOVO
│   │   └── admin/               ← APIs exclusivas do admin ← NOVO
│   │       ├── dashboard.php    ← Estatísticas gerais
│   │       ├── produtos.php     ← CRUD produtos (admin)
│   │       ├── users.php        ← Gestão de utilizadores (admin)
│   │       └── pedidos.php      ← Gestão de pedidos + notif automática
│   └── scripts/
│       └── gerar_hash.php       ← Gerador de hashes bcrypt
│
└── frontend/
    ├── html/
    │   ├── index.html           ← Página inicial
    │   ├── login.html           ← Login / Registo
    │   ├── home.html            ← Loja
    │   ├── perfil.html          ← Perfil do utilizador
    │   ├── carrinho.html        ← Carrinho
    │   ├── notificacoes.html    ← Notificações do utilizador ← NOVO
    │   └── admin.html           ← Painel de administração ← NOVO
    ├── css/
    │   ├── style.css            ← Estilos globais
    │   ├── admin.css            ← Estilos do painel admin ← NOVO
    │   └── notificacoes.css     ← Estilos das notificações ← NOVO
    └── js/
        ├── api.js               ← Camada de integração frontend ↔ PHP
        ├── script.js            ← Lógica da loja
        ├── i18n.js              ← Traduções PT/EN
        ├── admin.js             ← Lógica do painel admin ← NOVO
        └── notificacoes.js      ← Lógica das notificações ← NOVO
```

---

## 🗄️ Estrutura da Base de Dados

| Tabela           | Descrição                              |
|------------------|----------------------------------------|
| `users`          | Utilizadores (clientes + admins)       |
| `categorias`     | Categorias de produtos                 |
| `produtos`       | Catálogo de produtos                   |
| `carrinho`       | Itens no carrinho por utilizador       |
| `pedidos`        | Pedidos realizados                     |
| `itens_pedido`   | Produtos de cada pedido                |
| `notificacoes`   | Notificações automáticas por pedido    |

---

## 🔁 Fluxo de Notificações

```
Admin atualiza estado do pedido
         ↓
  PUT /api/admin/pedidos.php?id=X
  body: { "estado": "enviado" }
         ↓
  Backend insere registo em `notificacoes`
         ↓
  Utilizador abre /notificacoes.html
         ↓
  GET /api/notificacoes.php
         ↓
  Vê a notificação "Pedido #X foi enviado 🚚"
```

---

## ❓ Resolução de Problemas

**A API retorna erro 500:**
→ Verifica se o Apache e MySQL estão iniciados no XAMPP
→ Confirma que a BD foi importada corretamente

**Login não funciona:**
→ Verifica as credenciais acima
→ Usa o script `gerar_hash.php` para regenerar passwords

**Admin não aparece após login:**
→ Confirma que o utilizador tem `tipo_user = 'admin'` na BD
→ Verifica a consola do browser (F12) por erros de rede
