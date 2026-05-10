# ETNV Electronics — Backend PHP

## Estrutura do Projeto

```
projecto/
├── frontend/
│   ├── html/
│   │   ├── index.html       ← Landing page
│   │   ├── login.html       ← Autenticação
│   │   ├── home.html        ← Loja principal
│   │   ├── carrinho.html    ← Carrinho
│   │   └── perfil.html      ← Perfil do utilizador
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
│
├── backend/
│   ├── config/
│   │   └── database.php     ← Configuração da BD (editar aqui)
│   ├── includes/
│   │   └── helpers.php      ← Funções reutilizáveis
│   ├── api/
│   │   ├── auth.php         ← Login, registo, logout
│   │   ├── users.php        ← Perfil e gestão de utilizadores
│   │   ├── produtos.php     ← Catálogo de produtos
│   │   ├── carrinho.php     ← Carrinho de compras
│   │   ├── pedidos.php      ← Pedidos e checkout
│   │   └── categorias.php   ← Categorias de produtos
│   ├── api.js               ← Integração JS ↔ PHP (copiar para /frontend/js/)
│   └── .htaccess            ← Segurança e configuração Apache
│
└── BD/
    └── E-commerce.sql       ← Schema da base de dados
```

---

## Instalação

### 1. Requisitos
- PHP 8.1 ou superior
- MySQL 5.7 / MariaDB 10.4 ou superior
- Apache com mod_rewrite ativado (XAMPP, WAMP, Laragon, etc.)

### 2. Base de Dados
```sql
-- No phpMyAdmin ou MySQL CLI:
source /caminho/para/E-commerce.sql

-- Ou manualmente:
mysql -u root -p < BD/E-commerce.sql
```

### 3. Configurar credenciais da BD
Editar `backend/config/database.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'mini_ecommerce');
define('DB_USER', 'root');      // ← o seu utilizador
define('DB_PASS', '');          // ← a sua password
```

### 4. Integrar api.js nas páginas HTML
Copiar `backend/api.js` para `frontend/js/` e adicionar em **cada página HTML**, ANTES do script.js:
```html
<script src="../js/api.js"></script>
<script src="../js/script.js"></script>
```

### 5. Criar utilizador admin (opcional)
```sql
INSERT INTO users (nome, email, password, tipo_user)
VALUES (
  'Admin',
  'admin@etnv.com',
  '$2y$12$HASH_AQUI',   -- gerar com: php -r "echo password_hash('suapassword', PASSWORD_BCRYPT);"
  'admin'
);
```

Ou via PHP CLI:
```bash
php -r "echo password_hash('password123', PASSWORD_BCRYPT, ['cost'=>12]);"
```

---

## Endpoints da API

### Autenticação
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth.php?action=login` | Login |
| POST | `/api/auth.php?action=register` | Registo |
| POST | `/api/auth.php?action=logout` | Logout |
| GET | `/api/auth.php?action=me` | Utilizador atual |

### Produtos (público)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/produtos.php` | Listar todos |
| GET | `/api/produtos.php?id=1` | Por ID |
| GET | `/api/produtos.php?search=teclado` | Pesquisa |
| GET | `/api/produtos.php?categoria_id=2` | Por categoria |

### Carrinho (autenticado)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/carrinho.php` | Ver carrinho |
| POST | `/api/carrinho.php?action=adicionar` | Adicionar produto |
| PUT | `/api/carrinho.php?action=atualizar&id=X` | Alterar quantidade |
| DELETE | `/api/carrinho.php?action=remover&id=X` | Remover item |
| DELETE | `/api/carrinho.php?action=limpar` | Limpar carrinho |

### Pedidos (autenticado)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/pedidos.php` | Meus pedidos |
| GET | `/api/pedidos.php?id=X` | Detalhe |
| POST | `/api/pedidos.php?action=criar` | Finalizar compra |
| PUT | `/api/pedidos.php?action=cancelar&id=X` | Cancelar |

---

## Formato das Respostas

Todas as respostas seguem o padrão:
```json
{
  "success": true,
  "message": "OK",
  "data": { ... }
}
```

Em caso de erro:
```json
{
  "success": false,
  "message": "Descrição do erro",
  "errors": null
}
```

---

## Códigos Promocionais
| Código | Desconto |
|--------|---------|
| `ETNV10` | 10% |
| `IPIL20` | 20% |

---

## Segurança implementada
- Passwords com bcrypt (cost 12)
- Sessões PHP com regeneração de ID após login
- Prepared statements PDO (proteção contra SQL Injection)
- Validação de entrada em todos os endpoints
- Headers de segurança via .htaccess
- Proteção de pastas `config/` e `includes/`
- Verificação de propriedade nos itens do carrinho
- Transações SQL no checkout para garantir consistência
