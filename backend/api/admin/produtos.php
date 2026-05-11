<?php
// ═══════════════════════════════════════════════
// API — Admin: Gestão de Produtos
// Endpoints (admin only):
//   GET    /api/admin/produtos.php           → lista todos (incl. sem stock)
//   POST   /api/admin/produtos.php           → criar produto
//   PUT    /api/admin/produtos.php?id=1      → editar produto
//   DELETE /api/admin/produtos.php?id=1      → apagar produto
// ═══════════════════════════════════════════════

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../includes/helpers.php';

setCorsHeaders();
startSession();
requireAdmin();

$method = $_SERVER['REQUEST_METHOD'];
$id     = (int) ($_GET['id'] ?? 0);

if ($method === 'GET')    handleListar();
if ($method === 'POST')   handleCriar();
if ($method === 'PUT')    handleEditar($id);
if ($method === 'DELETE') handleApagar($id);
errorResponse('Metodo nao suportado.', 405);

function handleListar(): never {
    $db = getDB();
    $stmt = $db->query(
        "SELECT p.*, c.nome AS categoria_nome, c.slug AS categoria_slug
         FROM produtos p
         LEFT JOIN categorias c ON p.categoria_id = c.id
         ORDER BY p.id ASC"
    );
    successResponse($stmt->fetchAll());
}

function handleCriar(): never {
    $body = getJsonBody();
    requireFields($body, ['nome', 'preco', 'stock']);

    $nome        = sanitize($body['nome']);
    $descricao   = sanitize($body['descricao']   ?? '');
    $preco       = (float) $body['preco'];
    $precoAntigo = !empty($body['preco_antigo']) ? (float) $body['preco_antigo'] : null;
    $stock       = (int)   $body['stock'];
    $imagem      = sanitize($body['imagem']       ?? '');
    $badge       = in_array($body['badge'] ?? '', ['new','sale','']) ? ($body['badge'] ?: null) : null;
    $catId       = !empty($body['categoria_id'])  ? (int) $body['categoria_id'] : null;

    if ($preco <= 0) errorResponse('Preco deve ser maior que zero.', 422);
    if ($stock < 0)  errorResponse('Stock nao pode ser negativo.', 422);

    $db   = getDB();
    $stmt = $db->prepare(
        "INSERT INTO produtos (nome, descricao, preco, preco_antigo, stock, imagem, badge, categoria_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $stmt->execute([$nome, $descricao, $preco, $precoAntigo, $stock, $imagem, $badge, $catId]);
    $newId = (int) $db->lastInsertId();

    $novo = $db->prepare("SELECT p.*, c.nome AS categoria_nome FROM produtos p LEFT JOIN categorias c ON p.categoria_id = c.id WHERE p.id = ?");
    $novo->execute([$newId]);
    successResponse($novo->fetch(), 'Produto criado com sucesso.', 201);
}

function handleEditar(int $id): never {
    if (!$id) errorResponse('ID invalido.', 422);
    $body = getJsonBody();
    requireFields($body, ['nome', 'preco', 'stock']);

    $nome        = sanitize($body['nome']);
    $descricao   = sanitize($body['descricao']   ?? '');
    $preco       = (float) $body['preco'];
    $precoAntigo = !empty($body['preco_antigo']) ? (float) $body['preco_antigo'] : null;
    $stock       = (int)   $body['stock'];
    $imagem      = sanitize($body['imagem']       ?? '');
    $badge       = in_array($body['badge'] ?? '', ['new','sale','']) ? ($body['badge'] ?: null) : null;
    $catId       = !empty($body['categoria_id'])  ? (int) $body['categoria_id'] : null;

    $db   = getDB();
    $stmt = $db->prepare(
        "UPDATE produtos
         SET nome=?, descricao=?, preco=?, preco_antigo=?, stock=?, imagem=?, badge=?, categoria_id=?
         WHERE id=?"
    );
    $stmt->execute([$nome, $descricao, $preco, $precoAntigo, $stock, $imagem, $badge, $catId, $id]);
    if ($stmt->rowCount() === 0) errorResponse('Produto nao encontrado.', 404);
    successResponse(null, 'Produto atualizado com sucesso.');
}

function handleApagar(int $id): never {
    if (!$id) errorResponse('ID invalido.', 422);
    $db   = getDB();
    $stmt = $db->prepare("DELETE FROM produtos WHERE id = ?");
    $stmt->execute([$id]);
    if ($stmt->rowCount() === 0) errorResponse('Produto nao encontrado.', 404);
    successResponse(null, 'Produto removido com sucesso.');
}
