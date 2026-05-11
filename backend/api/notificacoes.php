<?php
// ═══════════════════════════════════════════════
// API — Notificações do Utilizador
// Endpoints (autenticado):
//   GET  /api/notificacoes.php               → lista as minhas notificações
//   PUT  /api/notificacoes.php?id=1          → marcar como lida
//   PUT  /api/notificacoes.php?action=todas  → marcar todas como lidas
//   DELETE /api/notificacoes.php?id=1        → apagar notificação
//   DELETE /api/notificacoes.php?action=todas → apagar todas
// ═══════════════════════════════════════════════

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/helpers.php';

setCorsHeaders();
startSession();
$userId = requireAuth();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$id     = (int) ($_GET['id'] ?? 0);

if ($method === 'GET')    handleListar($userId);
if ($method === 'PUT') {
    if ($action === 'todas') handleMarcarTodas($userId);
    elseif ($id)             handleMarcarLida($userId, $id);
    else errorResponse('ID em falta.', 422);
}
if ($method === 'DELETE') {
    if ($action === 'todas') handleApagarTodas($userId);
    elseif ($id)             handleApagar($userId, $id);
    else errorResponse('ID em falta.', 422);
}
errorResponse('Metodo nao suportado.', 405);

function handleListar(int $userId): never {
    $db = getDB();
    $stmt = $db->prepare(
        "SELECT id, pedido_id, icone, mensagem, estado_pedido, lida, data_criacao
         FROM notificacoes
         WHERE utilizador_id = ?
         ORDER BY data_criacao DESC
         LIMIT 50"
    );
    $stmt->execute([$userId]);
    $notifs = $stmt->fetchAll();

    // Contar nao lidas
    $countStmt = $db->prepare("SELECT COUNT(*) FROM notificacoes WHERE utilizador_id = ? AND lida = 0");
    $countStmt->execute([$userId]);
    $naoLidas = (int) $countStmt->fetchColumn();

    successResponse(['notificacoes' => $notifs, 'nao_lidas' => $naoLidas]);
}

function handleMarcarLida(int $userId, int $id): never {
    $db = getDB();
    $db->prepare("UPDATE notificacoes SET lida = 1 WHERE id = ? AND utilizador_id = ?")
       ->execute([$id, $userId]);
    successResponse(null, 'Notificacao marcada como lida.');
}

function handleMarcarTodas(int $userId): never {
    $db = getDB();
    $db->prepare("UPDATE notificacoes SET lida = 1 WHERE utilizador_id = ? AND lida = 0")
       ->execute([$userId]);
    successResponse(null, 'Todas as notificacoes marcadas como lidas.');
}

function handleApagar(int $userId, int $id): never {
    $db = getDB();
    $db->prepare("DELETE FROM notificacoes WHERE id = ? AND utilizador_id = ?")
       ->execute([$id, $userId]);
    successResponse(null, 'Notificacao apagada.');
}

function handleApagarTodas(int $userId): never {
    $db = getDB();
    $db->prepare("DELETE FROM notificacoes WHERE utilizador_id = ?")->execute([$userId]);
    successResponse(null, 'Todas as notificacoes apagadas.');
}
