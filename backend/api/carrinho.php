<?php
// ═══════════════════════════════════════════════
// API — Carrinho
// Endpoints (autenticado):
//   GET    /api/carrinho.php                         → listar itens
//   POST   /api/carrinho.php?action=adicionar        → adicionar produto
//   PUT    /api/carrinho.php?action=atualizar&id=    → alterar quantidade
//   DELETE /api/carrinho.php?action=remover&id=      → remover item
//   DELETE /api/carrinho.php?action=limpar           → limpar carrinho
// ═══════════════════════════════════════════════

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/helpers.php';

setCorsHeaders();
startSession();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// GET — listar carrinho
if ($method === 'GET' && !$action) {
    handleListar();
}

match ($action) {
    'adicionar' => handleAdicionar(),
    'atualizar' => handleAtualizar(),
    'remover'   => handleRemover(),
    'limpar'    => handleLimpar(),
    default     => $action ? errorResponse("Ação '$action' não reconhecida.", 404) : handleListar(),
};

// ─── LISTAR CARRINHO ────────────────────────────
function handleListar(): never {
    requireMethod('GET');
    $userId = requireAuth();
    $db     = getDB();

    $stmt = $db->prepare(
        'SELECT c.id, c.quantidade, c.data_criacao,
                p.id AS produto_id, p.nome, p.preco, p.imagem, p.stock,
                cat.nome AS categoria
         FROM carrinho c
         JOIN produtos p ON c.produto_id = p.id
         LEFT JOIN categorias cat ON p.categoria_id = cat.id
         WHERE c.utilizador_id = ?
         ORDER BY c.data_criacao DESC'
    );
    $stmt->execute([$userId]);
    $itens = $stmt->fetchAll();

    // Calcular subtotal
    $subtotal = array_reduce($itens, fn($sum, $i) => $sum + ($i['preco'] * $i['quantidade']), 0);

    successResponse([
        'itens'    => $itens,
        'total_itens' => array_sum(array_column($itens, 'quantidade')),
        'subtotal' => round($subtotal, 2),
    ]);
}

// ─── ADICIONAR AO CARRINHO ──────────────────────
function handleAdicionar(): never {
    requireMethod('POST');
    $userId = requireAuth();
    $body   = getJsonBody();
    requireFields($body, ['produto_id', 'quantidade']);

    $produtoId  = (int) $body['produto_id'];
    $quantidade = (int) $body['quantidade'];

    if ($quantidade < 1) errorResponse('Quantidade mínima é 1.', 422);

    $db = getDB();

    // Verificar se produto existe e tem stock
    $pStmt = $db->prepare('SELECT id, stock FROM produtos WHERE id = ?');
    $pStmt->execute([$produtoId]);
    $produto = $pStmt->fetch();

    if (!$produto) errorResponse('Produto não encontrado.', 404);

    // Verificar se já está no carrinho deste utilizador
    $existing = $db->prepare('SELECT id, quantidade FROM carrinho WHERE utilizador_id = ? AND produto_id = ?');
    $existing->execute([$userId, $produtoId]);
    $item = $existing->fetch();

    $novaQtd = $item ? $item['quantidade'] + $quantidade : $quantidade;

    // Verificar stock
    if ($novaQtd > $produto['stock']) {
        errorResponse("Stock insuficiente. Disponível: {$produto['stock']}.", 409);
    }

    if ($item) {
        // Atualizar quantidade existente
        $db->prepare('UPDATE carrinho SET quantidade = ? WHERE id = ?')
           ->execute([$novaQtd, $item['id']]);
        successResponse(['quantidade' => $novaQtd], 'Quantidade atualizada no carrinho.');
    } else {
        // Inserir novo item
        $db->prepare('INSERT INTO carrinho (utilizador_id, produto_id, quantidade) VALUES (?, ?, ?)')
           ->execute([$userId, $produtoId, $quantidade]);
        successResponse(['id' => (int) $db->lastInsertId()], 'Produto adicionado ao carrinho.', 201);
    }
}

// ─── ATUALIZAR QUANTIDADE ───────────────────────
function handleAtualizar(): never {
    requireMethod('PUT');
    $userId = requireAuth();

    $id   = (int) ($_GET['id'] ?? 0);
    if (!$id) errorResponse('ID do item inválido.', 422);

    $body       = getJsonBody();
    $quantidade = (int) ($body['quantidade'] ?? 0);

    if ($quantidade < 1) errorResponse('Quantidade mínima é 1.', 422);

    $db = getDB();

    // Garantir que o item pertence ao utilizador
    $stmt = $db->prepare('SELECT c.id, c.produto_id FROM carrinho c WHERE c.id = ? AND c.utilizador_id = ?');
    $stmt->execute([$id, $userId]);
    $item = $stmt->fetch();

    if (!$item) errorResponse('Item não encontrado no seu carrinho.', 404);

    // Verificar stock
    $pStmt = $db->prepare('SELECT stock FROM produtos WHERE id = ?');
    $pStmt->execute([$item['produto_id']]);
    $produto = $pStmt->fetch();

    if ($quantidade > $produto['stock']) {
        errorResponse("Stock insuficiente. Disponível: {$produto['stock']}.", 409);
    }

    $db->prepare('UPDATE carrinho SET quantidade = ? WHERE id = ?')->execute([$quantidade, $id]);

    successResponse(['quantidade' => $quantidade], 'Quantidade atualizada.');
}

// ─── REMOVER ITEM ───────────────────────────────
function handleRemover(): never {
    requireMethod('DELETE');
    $userId = requireAuth();

    $id = (int) ($_GET['id'] ?? 0);
    if (!$id) errorResponse('ID do item inválido.', 422);

    $db   = getDB();
    $stmt = $db->prepare('DELETE FROM carrinho WHERE id = ? AND utilizador_id = ?');
    $stmt->execute([$id, $userId]);

    if ($stmt->rowCount() === 0) errorResponse('Item não encontrado no seu carrinho.', 404);

    successResponse(null, 'Item removido do carrinho.');
}

// ─── LIMPAR CARRINHO ────────────────────────────
function handleLimpar(): never {
    requireMethod('DELETE');
    $userId = requireAuth();

    $db = getDB();
    $db->prepare('DELETE FROM carrinho WHERE utilizador_id = ?')->execute([$userId]);

    successResponse(null, 'Carrinho limpo com sucesso.');
}
