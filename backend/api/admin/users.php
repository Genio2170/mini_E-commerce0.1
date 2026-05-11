<?php
// ═══════════════════════════════════════════════
// API — Admin: Gestão de Utilizadores
// Endpoints (admin only):
//   GET    /api/admin/users.php            → lista todos
//   GET    /api/admin/users.php?id=1       → detalhe
//   PUT    /api/admin/users.php?action=bloquear&id=1
//   PUT    /api/admin/users.php?action=desbloquear&id=1
//   DELETE /api/admin/users.php?id=1
// ═══════════════════════════════════════════════

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../includes/helpers.php';

setCorsHeaders();
startSession();
$adminId = requireAdmin();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$id     = (int) ($_GET['id'] ?? 0);

if ($method === 'GET') {
    if ($id) handleDetalhe($id);
    else     handleListar();
}
if ($method === 'PUT') {
    if ($action === 'bloquear')        handleEstado($id, 'bloqueado');
    elseif ($action === 'desbloquear') handleEstado($id, 'ativo');
    else errorResponse('Acao invalida.', 400);
}
if ($method === 'DELETE') {
    handleApagar($id, $adminId);
}
errorResponse('Metodo nao suportado.', 405);

function handleListar(): never {
    $db = getDB();
    $stmt = $db->query(
        "SELECT u.id, u.nome, u.email, u.telefone, u.tipo_user, u.estado, u.data_criacao,
                COUNT(DISTINCT p.id) AS total_pedidos
         FROM users u
         LEFT JOIN pedidos p ON p.utilizador_id = u.id
         GROUP BY u.id
         ORDER BY u.data_criacao DESC"
    );
    successResponse($stmt->fetchAll());
}

function handleDetalhe(int $id): never {
    $db = getDB();
    $stmt = $db->prepare(
        "SELECT u.id, u.nome, u.email, u.telefone, u.tipo_user, u.estado, u.data_criacao,
                COUNT(DISTINCT p.id) AS total_pedidos,
                COALESCE(SUM(CASE WHEN p.estado != 'cancelado' THEN p.total ELSE 0 END),0) AS total_gasto
         FROM users u
         LEFT JOIN pedidos p ON p.utilizador_id = u.id
         WHERE u.id = ?
         GROUP BY u.id"
    );
    $stmt->execute([$id]);
    $user = $stmt->fetch();
    if (!$user) errorResponse('Utilizador nao encontrado.', 404);
    successResponse($user);
}

function handleEstado(int $id, string $novoEstado): never {
    if (!$id) errorResponse('ID invalido.', 422);
    $db = getDB();
    $check = $db->prepare("SELECT tipo_user FROM users WHERE id = ?");
    $check->execute([$id]);
    $user = $check->fetch();
    if (!$user) errorResponse('Utilizador nao encontrado.', 404);
    if ($user['tipo_user'] === 'admin') errorResponse('Nao e possivel bloquear um admin.', 403);
    $db->prepare("UPDATE users SET estado = ? WHERE id = ?")->execute([$novoEstado, $id]);
    successResponse(['estado' => $novoEstado], "Utilizador $novoEstado.");
}

function handleApagar(int $id, int $adminId): never {
    if (!$id) errorResponse('ID invalido.', 422);
    if ($id === $adminId) errorResponse('Nao te podes apagar a ti proprio.', 403);
    $db = getDB();
    $check = $db->prepare("SELECT tipo_user FROM users WHERE id = ?");
    $check->execute([$id]);
    $user = $check->fetch();
    if (!$user) errorResponse('Utilizador nao encontrado.', 404);
    if ($user['tipo_user'] === 'admin') errorResponse('Nao e possivel apagar um admin.', 403);
    $db->prepare("DELETE FROM users WHERE id = ?")->execute([$id]);
    successResponse(null, 'Utilizador removido.');
}
