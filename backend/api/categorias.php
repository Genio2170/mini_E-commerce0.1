<?php
// ═══════════════════════════════════════════════
// API — Categorias
// Endpoints (público):
//   GET /api/categorias.php             → lista todas
//   GET /api/categorias.php?id=1        → categoria por ID
//
// Endpoints (admin):
//   POST   /api/categorias.php?action=criar
//   PUT    /api/categorias.php?action=editar&id=1
//   DELETE /api/categorias.php?action=apagar&id=1
// ═══════════════════════════════════════════════

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/helpers.php';

setCorsHeaders();
startSession();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

if ($method === 'GET') {
    !empty($_GET['id']) ? handleDetalhe() : handleListar();
}

match ($action) {
    'criar'  => handleCriar(),
    'editar' => handleEditar(),
    'apagar' => handleApagar(),
    default  => errorResponse("Ação '$action' não reconhecida.", 404),
};

// ─── LISTAR ─────────────────────────────────────
function handleListar(): never {
    $db   = getDB();
    $stmt = $db->query(
        'SELECT c.*, COUNT(p.id) AS total_produtos
         FROM categorias c
         LEFT JOIN produtos p ON p.categoria_id = c.id
         GROUP BY c.id
         ORDER BY c.nome ASC'
    );
    successResponse($stmt->fetchAll());
}

// ─── DETALHE ────────────────────────────────────
function handleDetalhe(): never {
    $id   = (int) $_GET['id'];
    $db   = getDB();
    $stmt = $db->prepare('SELECT * FROM categorias WHERE id = ?');
    $stmt->execute([$id]);
    $cat = $stmt->fetch();
    if (!$cat) errorResponse('Categoria não encontrada.', 404);
    successResponse($cat);
}

// ─── CRIAR ──────────────────────────────────────
function handleCriar(): never {
    requireMethod('POST');
    requireAdmin();

    $body = getJsonBody();
    requireFields($body, ['nome']);

    $nome     = sanitize($body['nome']);
    $descricao = sanitize($body['descricao'] ?? '');

    $db   = getDB();
    $stmt = $db->prepare('INSERT INTO categorias (nome, descricao) VALUES (?, ?)');
    $stmt->execute([$nome, $descricao]);

    successResponse(['id' => (int) $db->lastInsertId()], 'Categoria criada.', 201);
}

// ─── EDITAR ─────────────────────────────────────
function handleEditar(): never {
    requireMethod('PUT');
    requireAdmin();

    $id   = (int) ($_GET['id'] ?? 0);
    $body = getJsonBody();
    requireFields($body, ['nome']);

    $nome      = sanitize($body['nome']);
    $descricao = sanitize($body['descricao'] ?? '');

    $db   = getDB();
    $stmt = $db->prepare('UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?');
    $stmt->execute([$nome, $descricao, $id]);

    if ($stmt->rowCount() === 0) errorResponse('Categoria não encontrada.', 404);

    successResponse(null, 'Categoria atualizada.');
}

// ─── APAGAR ─────────────────────────────────────
function handleApagar(): never {
    requireMethod('DELETE');
    requireAdmin();

    $id = (int) ($_GET['id'] ?? 0);
    $db = getDB();

    // Verificar se tem produtos associados
    $check = $db->prepare('SELECT COUNT(*) FROM produtos WHERE categoria_id = ?');
    $check->execute([$id]);
    if ((int) $check->fetchColumn() > 0) {
        errorResponse('Não é possível apagar uma categoria com produtos associados.', 409);
    }

    $stmt = $db->prepare('DELETE FROM categorias WHERE id = ?');
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) errorResponse('Categoria não encontrada.', 404);

    successResponse(null, 'Categoria removida.');
}
