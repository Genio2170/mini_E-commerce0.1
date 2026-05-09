CREATE DATABASE IF NOT EXISTS mini_ecommerce;
USE mini_ecommerce;

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    telefone VARCHAR(20),
    tipo_user VARCHAR(20),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- CATEGORIAS
-- =========================
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- PRODUTOS
-- =========================
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150),
    descricao TEXT,
    preco DECIMAL(10,2),
    stock INT,
    imagem VARCHAR(255),
    categoria_id INT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- CARRINHO
-- =========================
CREATE TABLE carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilizador_id INT,
    produto_id INT,
    quantidade INT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- PEDIDOS
-- =========================
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilizador_id INT,
    total DECIMAL(10,2),
    estado VARCHAR(30),
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- ITENS_PEDIDO
-- =========================
CREATE TABLE itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    produto_id INT,
    quantidade INT,
    preco_unitario DECIMAL(10,2)
);

-- =========================
-- PRODUTOS → CATEGORIAS
-- =========================
ALTER TABLE produtos
ADD CONSTRAINT fk_produtos_categorias
FOREIGN KEY (categoria_id)
REFERENCES categorias(id);

-- =========================
-- CARRINHO → USERS
-- =========================
ALTER TABLE carrinho
ADD CONSTRAINT fk_carrinho_users
FOREIGN KEY (utilizador_id)
REFERENCES users(id);

-- =========================
-- CARRINHO → PRODUTOS
-- =========================
ALTER TABLE carrinho
ADD CONSTRAINT fk_carrinho_produtos
FOREIGN KEY (produto_id)
REFERENCES produtos(id);

-- =========================
-- PEDIDOS → USERS
-- =========================
ALTER TABLE pedidos
ADD CONSTRAINT fk_pedidos_users
FOREIGN KEY (utilizador_id)
REFERENCES users(id);

-- =========================
-- ITENS_PEDIDO → PEDIDOS
-- =========================
ALTER TABLE itens_pedido
ADD CONSTRAINT fk_itens_pedido_pedidos
FOREIGN KEY (pedido_id)
REFERENCES pedidos(id);

-- =========================
-- ITENS_PEDIDO → PRODUTOS
-- =========================
ALTER TABLE itens_pedido
ADD CONSTRAINT fk_itens_pedido_produtos
FOREIGN KEY (produto_id)
REFERENCES produtos(id);