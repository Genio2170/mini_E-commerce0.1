-- ═══════════════════════════════════════════════════════════
--  ETNV-ELECTRONICS — Base de Dados Completa v4
--  Para importar no phpMyAdmin (XAMPP):
--    1. Abre phpMyAdmin → http://localhost/phpmyadmin
--    2. Clica em "Importar" → escolhe este ficheiro .sql
--    3. Clica em "Executar"
-- ═══════════════════════════════════════════════════════════

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `mini_ecommerce`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `mini_ecommerce`;

-- ════════════════════════════════════════════════
-- TABELAS
-- ════════════════════════════════════════════════

DROP TABLE IF EXISTS `notificacoes`;
DROP TABLE IF EXISTS `itens_pedido`;
DROP TABLE IF EXISTS `pedidos`;
DROP TABLE IF EXISTS `carrinho`;
DROP TABLE IF EXISTS `produtos`;
DROP TABLE IF EXISTS `categorias`;
DROP TABLE IF EXISTS `users`;

-- ─── USERS ──────────────────────────────────────
CREATE TABLE `users` (
    `id`           INT          NOT NULL AUTO_INCREMENT,
    `nome`         VARCHAR(100) NOT NULL,
    `email`        VARCHAR(100) NOT NULL,
    `password`     VARCHAR(255) NOT NULL,
    `telefone`     VARCHAR(20)  NOT NULL DEFAULT '',
    `tipo_user`    ENUM('cliente','admin') NOT NULL DEFAULT 'cliente',
    `estado`       ENUM('ativo','bloqueado') NOT NULL DEFAULT 'ativo',
    `data_criacao` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── CATEGORIAS ─────────────────────────────────
CREATE TABLE `categorias` (
    `id`           INT          NOT NULL AUTO_INCREMENT,
    `nome`         VARCHAR(100) NOT NULL,
    `slug`         VARCHAR(100) NOT NULL DEFAULT '',
    `descricao`    TEXT,
    `data_criacao` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── PRODUTOS ───────────────────────────────────
CREATE TABLE `produtos` (
    `id`              INT           NOT NULL AUTO_INCREMENT,
    `nome`            VARCHAR(150)  NOT NULL,
    `descricao`       TEXT,
    `preco`           DECIMAL(10,2) NOT NULL,
    `preco_antigo`    DECIMAL(10,2) DEFAULT NULL,
    `stock`           INT           NOT NULL DEFAULT 0,
    `imagem`          VARCHAR(500)  NOT NULL DEFAULT '',
    `badge`           VARCHAR(20)   DEFAULT NULL,
    `categoria_id`    INT           DEFAULT NULL,
    `ativo`           TINYINT(1)    NOT NULL DEFAULT 1,
    `data_criacao`    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_categoria` (`categoria_id`),
    KEY `idx_ativo` (`ativo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── CARRINHO ───────────────────────────────────
CREATE TABLE `carrinho` (
    `id`            INT       NOT NULL AUTO_INCREMENT,
    `utilizador_id` INT       NOT NULL,
    `produto_id`    INT       NOT NULL,
    `quantidade`    INT       NOT NULL DEFAULT 1,
    `data_criacao`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_user_produto` (`utilizador_id`,`produto_id`),
    KEY `idx_utilizador` (`utilizador_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── PEDIDOS ────────────────────────────────────
CREATE TABLE `pedidos` (
    `id`              INT           NOT NULL AUTO_INCREMENT,
    `utilizador_id`   INT           NOT NULL,
    `total`           DECIMAL(10,2) NOT NULL,
    `estado`          ENUM('pendente','confirmado','preparacao','enviado','entregue','cancelado') NOT NULL DEFAULT 'pendente',
    `codigo_promo`    VARCHAR(30)   DEFAULT NULL,
    `data_pedido`     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_utilizador` (`utilizador_id`),
    KEY `idx_estado` (`estado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── ITENS_PEDIDO ───────────────────────────────
CREATE TABLE `itens_pedido` (
    `id`             INT           NOT NULL AUTO_INCREMENT,
    `pedido_id`      INT           NOT NULL,
    `produto_id`     INT           NOT NULL,
    `quantidade`     INT           NOT NULL,
    `preco_unitario` DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_pedido` (`pedido_id`),
    KEY `idx_produto` (`produto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── NOTIFICACOES ───────────────────────────────
CREATE TABLE `notificacoes` (
    `id`            INT          NOT NULL AUTO_INCREMENT,
    `utilizador_id` INT          NOT NULL,
    `pedido_id`     INT          DEFAULT NULL,
    `icone`         VARCHAR(10)  NOT NULL DEFAULT '🔔',
    `mensagem`      VARCHAR(255) NOT NULL,
    `estado_pedido` VARCHAR(30)  NOT NULL DEFAULT '',
    `lida`          TINYINT(1)   NOT NULL DEFAULT 0,
    `data_criacao`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_utilizador` (`utilizador_id`),
    KEY `idx_lida` (`lida`),
    KEY `idx_pedido` (`pedido_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ════════════════════════════════════════════════
-- FOREIGN KEYS
-- ════════════════════════════════════════════════

ALTER TABLE `produtos`
  ADD CONSTRAINT `fk_produtos_categorias`
  FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`)
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `carrinho`
  ADD CONSTRAINT `fk_carrinho_users`   FOREIGN KEY (`utilizador_id`) REFERENCES `users`(`id`)    ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_carrinho_produtos` FOREIGN KEY (`produto_id`)    REFERENCES `produtos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_pedidos_users`
  FOREIGN KEY (`utilizador_id`) REFERENCES `users`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `itens_pedido`
  ADD CONSTRAINT `fk_itens_pedidos`  FOREIGN KEY (`pedido_id`)  REFERENCES `pedidos`(`id`)  ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_itens_produtos` FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `notificacoes`
  ADD CONSTRAINT `fk_notif_users`   FOREIGN KEY (`utilizador_id`) REFERENCES `users`(`id`)    ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_notif_pedidos` FOREIGN KEY (`pedido_id`)     REFERENCES `pedidos`(`id`)  ON DELETE SET NULL ON UPDATE CASCADE;

SET FOREIGN_KEY_CHECKS = 1;

-- ════════════════════════════════════════════════
-- DADOS INICIAIS (SEED)
-- ════════════════════════════════════════════════

-- ─── CATEGORIAS ─────────────────────────────────
INSERT INTO `categorias` (`nome`, `slug`, `descricao`) VALUES
('Audio',        'audio',      'Auriculares, colunas e acessórios de áudio'),
('Teclados',     'teclado',    'Teclados mecânicos e de membrana'),
('Mouses',       'mouse',      'Mouses gaming e de escritório'),
('Carregadores', 'carregador', 'Carregadores rápidos GaN e acessórios'),
('Storage',      'storage',    'Discos externos, SSDs e pendrives'),
('Cabos',        'cabo',       'Cabos USB-C, HDMI e acessórios'),
('Gadgets',      'gadget',     'Hubs, webcams e outros gadgets');

-- ─── UTILIZADORES ───────────────────────────────
-- Credenciais de acesso:
--   admin@etnv.com   / Admin@1234   (tipo: admin)
--   carlos@email.com / Cliente123   (tipo: cliente)
--   ana@email.com    / Cliente123   (tipo: cliente)
--
-- Hashes gerados com password_hash($pass, PASSWORD_BCRYPT, ['cost'=>12])
-- Se precisares de regenerar, usa o script: backend/scripts/gerar_hash.php
INSERT INTO `users` (`nome`, `email`, `password`, `telefone`, `tipo_user`, `estado`) VALUES
('Admin ETNV',    'admin@etnv.com',   '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+244 900 000 001', 'admin',   'ativo'),
('Carlos Mendes', 'carlos@email.com', '$2y$12$0BbVgENRMSMY1kRFuJLmFOevIqpqgRfY1XiV7fjWC1JWpj.VVQGIG', '+244 912 345 678', 'cliente', 'ativo'),
('Ana Ferreira',  'ana@email.com',    '$2y$12$0BbVgENRMSMY1kRFuJLmFOevIqpqgRfY1XiV7fjWC1JWpj.VVQGIG', '+244 923 456 789', 'cliente', 'ativo'),
('Joao Neto',     'joao@email.com',   '$2y$12$0BbVgENRMSMY1kRFuJLmFOevIqpqgRfY1XiV7fjWC1JWpj.VVQGIG', '',                'cliente', 'bloqueado');

-- ─── PRODUTOS ───────────────────────────────────
INSERT INTO `produtos` (`nome`, `descricao`, `preco`, `preco_antigo`, `stock`, `imagem`, `badge`, `categoria_id`) VALUES
('Pro X Elite ANC',    'Cancelamento de ruido ativo, 40h bateria, drivers 40mm premium.',      89.99,  119.99, 14, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',  'sale', 1),
('BassCore 500',       'Graves profundos, design over-ear confortavel, Bluetooth 5.3.',        59.99,  NULL,   8,  'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop',  NULL,   1),
('MechBoard TKL Pro',  'Switches Red linear, RGB per-key, aluminio anodizado CNC.',            149.99, 189.99, 3,  'https://tse3.mm.bing.net/th/id/OIP.1xG_8dC3wTP4yqC7upuX8QHaF6?rs=1&pid=ImgDetMain', 'sale', 2),
('TypeMaster 65%',     'Layout compacto 65%, switches Brown tateis, hot-swap.',                119.99, NULL,   11, 'https://tse4.mm.bing.net/th/id/OIP.O9cOb8nGpboGijIwSnquYQHaHa?rs=1&pid=ImgDetMain',  'new',  2),
('Precision Air X',    'Sensor PixArt 3395, 26000 DPI, peso 52g, sem fio 2.4GHz.',             59.99,  NULL,   0,  'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',  NULL,   3),
('GlideMax Pro',       'Sensor optico, 8 botoes programaveis, RGB lateral.',                   79.99,  99.99,  7,  'https://unnotekno.com/wp-content/uploads/2025/10/MS6529BK-GlidePro-2.4G-BT-Mouse-9-scaled.jpg',  'sale', 3),
('TurboCharge 65W',    'GaN III compacto, USB-C + USB-A, carga rapida PD 3.0.',                34.99,  NULL,   20, 'https://i5.walmartimages.com/seo/YUEVE-65W-Quick-Charge-Mobile-Phone-Charger-Turbocharge-Devices-Device-Fast-Charging-Power-Bank-4A-Type-C-PD-5-USB-Multiport-Charger-US-UK-EU_541dcd5a-66dd-4637-b798-d277655f8ed4.8d6f9ddef6e3144d764af0e047faf448.jpeg',  NULL,   4),
('PowerGaN 100W',      '3 portas simultaneas, 100W total, indicador LED inteligente.',         54.99,  69.99,  9,  'https://tse1.mm.bing.net/th/id/OIP.o2_1ZkFR8gQsVv8d8K86qgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',  'sale', 4),
('SpeedDrive 256GB',   'USB 3.2 Gen 2, leitura 400MB/s, design metal compacto.',               29.99,  NULL,   15, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop',  NULL,   5),
('NanoSSD 1TB',        'M.2 NVMe externo, 1000MB/s leitura, caixa aluminio.',                  89.99,  NULL,   6,  'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=400&fit=crop',  'new',  5),
('FusionCable Pro 2m', 'USB-C 240W, nylon trancado 2m, carga + dados 40Gbps.',                 19.99,  NULL,   30, 'https://tse3.mm.bing.net/th/id/OIP.atk9GNeX9CUT07LM3h8UkAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',  NULL,   6),
('MagLink 1m',         'Magnetico USB-C, conexao automatica 360 graus, LED de carga.',         24.99,  NULL,   18, 'https://tse3.mm.bing.net/th/id/OIP.YE7ybL2pP75Tw0vdlWXPGAHaHa?w=900&h=900&rs=1&pid=ImgDetMain&o=7&rm=3',  'new',  6),
('SmartHub 7-in-1',    'USB-C hub: HDMI 4K, 3x USB-A, SD card, PD 100W pass-through.',        49.99,  64.99,  5,  'https://microless.com/cdn/products/9936c1189c0029df88630cf774249994-hi.jpg', 'sale', 7),
('NeckBand Flow',      'Design pescoco, IPX5 resistente, 20h bateria, voz AI.',                44.99,  NULL,   12, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',  NULL,   1),
('WristTracker X3',    'Monitor cardiaco, SpO2, GPS assistido, bateria 7 dias.',               39.99,  NULL,   8,  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',  'new',  7),
('WebCam 4K Ultra',    '4K 30fps, autofoco AI, microfone duplo com cancelamento de ruido.',    99.99,  129.99, 4,  'https://tse2.mm.bing.net/th/id/OIP.ZWqMZXXsAlhXS-FFgRjbrQHaHa?w=600&h=600&rs=1&pid=ImgDetMain&o=7&rm=3',  'sale', 7);

-- ─── PEDIDOS DE EXEMPLO ─────────────────────────
INSERT INTO `pedidos` (`utilizador_id`, `total`, `estado`, `data_pedido`) VALUES
(2, 129.97, 'pendente',   '2026-05-10 09:14:00'),
(3, 149.99, 'confirmado', '2026-05-09 15:42:00'),
(2, 109.98, 'preparacao', '2026-05-08 11:30:00'),
(2,  69.98, 'enviado',    '2026-05-07 08:20:00'),
(3,  59.99, 'entregue',   '2026-05-06 17:55:00'),
(4,  89.97, 'cancelado',  '2026-05-05 14:10:00');

-- ─── ITENS DOS PEDIDOS ──────────────────────────
INSERT INTO `itens_pedido` (`pedido_id`, `produto_id`, `quantidade`, `preco_unitario`) VALUES
(1, 1,  1, 89.99),
(1, 11, 2, 19.99),
(2, 3,  1, 149.99),
(3, 5,  1, 59.99),
(3, 13, 1, 49.99),
(4, 7,  2, 34.99),
(5, 2,  1, 59.99),
(6, 9,  3, 29.99);

-- ─── NOTIFICACOES DE EXEMPLO ────────────────────
INSERT INTO `notificacoes` (`utilizador_id`, `pedido_id`, `icone`, `mensagem`, `estado_pedido`, `lida`) VALUES
(2, 1, '🛒', 'O teu pedido #1 foi recebido com sucesso.',              'pendente',   1),
(3, 2, '✔',  'O teu pedido #2 foi confirmado.',                        'confirmado', 0),
(2, 3, '📦', 'O teu pedido #3 esta em preparacao.',                    'preparacao', 0),
(2, 4, '🚚', 'O teu pedido #4 foi enviado e esta a caminho!',          'enviado',    1),
(3, 5, '📬', 'O teu pedido #5 foi entregue. Aprecia a compra!',        'entregue',   1);
