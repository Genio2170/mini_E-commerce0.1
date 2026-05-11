<?php
// ═══════════════════════════════════════════════
// API — Admin: Dashboard
// Endpoints (admin only):
//   GET /api/admin/dashboard.php         → estatísticas gerais
// ═══════════════════════════════════════════════

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../includes/helpers.php';

setCorsHeaders();
startSession();
requireAdmin();

$db = getDB();

// ─── Total de produtos ─────────────────────────
$totalProdutos = (int) $db->query('SELECT COUNT(*) FROM produtos WHERE ativo = 1')->fetchColumn();

// ─── Total de utilizadores (excluindo admins) ──
$totalUsers = (int) $db->query("SELECT COUNT(*) FROM users WHERE tipo_user = 'cliente'")->fetchColumn();

// ─── Total de pedidos ──────────────────────────
$totalPedidos = (int) $db->query('SELECT COUNT(*) FROM pedidos')->fetchColumn();

// ─── Receita total (excluindo cancelados) ──────
$receita = (float) $db->query("SELECT COALESCE(SUM(total),0) FROM pedidos WHERE estado != 'cancelado'")->fetchColumn();

// ─── Pedidos por estado ────────────────────────
$estadoStmt = $db->query(
    "SELECT estado, COUNT(*) AS total FROM pedidos GROUP BY estado"
);
$porEstado = [];
foreach ($estadoStmt->fetchAll() as $row) {
    $porEstado[$row['estado']] = (int) $row['total'];
}

// ─── 5 pedidos mais recentes ───────────────────
$recentStmt = $db->query(
    "SELECT p.id, p.total, p.estado, p.data_pedido,
            u.nome AS cliente, u.email
     FROM pedidos p
     JOIN users u ON p.utilizador_id = u.id
     ORDER BY p.data_pedido DESC
     LIMIT 5"
);
$recentes = $recentStmt->fetchAll();

// ─── Stock crítico (stock ≤ 3) ─────────────────
$stockCriticoStmt = $db->query(
    "SELECT id, nome, stock FROM produtos WHERE stock <= 3 AND ativo = 1 ORDER BY stock ASC LIMIT 5"
);
$stockCritico = $stockCriticoStmt->fetchAll();

successResponse([
    'total_produtos'  => $totalProdutos,
    'total_users'     => $totalUsers,
    'total_pedidos'   => $totalPedidos,
    'receita_total'   => round($receita, 2),
    'pedidos_por_estado' => $porEstado,
    'pedidos_recentes'   => $recentes,
    'stock_critico'      => $stockCritico,
]);
