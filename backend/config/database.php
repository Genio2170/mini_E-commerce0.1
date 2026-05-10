<?php
// ═══════════════════════════════════════════════
// CONFIG — Base de Dados
// Altere os valores abaixo para o seu ambiente
// ═══════════════════════════════════════════════

define('DB_HOST',     'localhost');
define('DB_NAME',     'mini_ecommerce');
define('DB_USER',     'root');       // ← altere para o seu utilizador MySQL
define('DB_PASS',     '');           // ← altere para a sua password MySQL
define('DB_CHARSET',  'utf8mb4');

/**
 * Retorna uma ligação PDO à base de dados.
 * Lança PDOException em caso de falha (apanhada nos endpoints).
 */
function getDB(): PDO {
    static $pdo = null;

    if ($pdo === null) {
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=%s',
            DB_HOST, DB_NAME, DB_CHARSET
        );

        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    }

    return $pdo;
}
