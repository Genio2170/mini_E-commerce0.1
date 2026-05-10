<?php
// ═══════════════════════════════════════════════
// API — Pedidos
// Endpoints (autenticado):
//   GET  /api/pedidos.php                          → meus pedidos
//   GET  /api/pedidos.php?id=1                     → detalhe de pedido
//   POST /api/pedidos.php?action=criar             → finalizar compra
//   PUT  /api/pedidos.php?action=cancelar&id=1     → cancelar pedido
//
// Endpoints (admin):
//   GET  /api/pedidos.php?action=todos             → todos os pedidos
//   PUT  /api/pedidos.php?action=estado&id=1       → atualizar estado
// ═══════════════════════════════════════════════

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/helpers.php';

setCorsHeaders();
startSession();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

if ($method === 'GET') {
    if ($action === 'todos') handleTodos();
    elseif (!empty($_GET['id'])) handleDetalhe();
    else handleListar();
}

match ($action) {
    'criar'    => handleCriar(),
    'cancelar' => handleCancelar(),
    'estado'   => handleEstado(),
    default    => errorResponse("Ação '$action' não reconhecida.", 404),
};

// ─── LISTAR MEUS PEDIDOS ────────────────────────
function handleListar(): never {
    requireMethod('GET');
    $userId = requireAuth();
    $db     = getDB();

    $stmt = $db->prepare(
        'SELECT p.id, p.total, p.estado, p.data_pedido,
                COUNT(ip.id) AS total_itens
         FROM pedidos p
         LEFT JOIN itens_pedido ip ON ip.pedido_id = p.id
         WHERE p.utilizador_id = ?
         GROUP BY p.id
         ORDER BY p.data_pedido DESC'
    );
    $stmt->execute([$userId]);

    successResponse($stmt->fetchAll());
}

// ─── DETALHE DE UM PEDIDO ───────────────────────
function handleDetalhe(): never {
    requireMethod('GET');
    $userId   = requireAuth();
    $pedidoId = (int) $_GET['id'];

    $db   = getDB();
    $stmt = $db->prepare('SELECT * FROM pedidos WHERE id = ? AND utilizador_id = ?');
    $stmt->execute([$pedidoId, $userId]);
    $pedido = $stmt->fetch();

    if (!$pedido) errorResponse('Pedido não encontrado.', 404);

    // Itens do pedido
    $iStmt = $db->prepare(
        'SELECT ip.*, p.nome, p.imagem
         FROM itens_pedido ip
         JOIN produtos p ON ip.produto_id = p.id
         WHERE ip.pedido_id = ?'
    );
    $iStmt->execute([$pedidoId]);
    $pedido['itens'] = $iStmt->fetchAll();

    successResponse($pedido);
}

// ─── CRIAR PEDIDO (CHECKOUT) ────────────────────
// Converte o carrinho do utilizador num pedido real.
// Desconta o stock. Limpa o carrinho.
function handleCriar(): never {
    requireMethod('POST');
    $userId = requireAuth();
    $body   = getJsonBody();

    // Código promocional opcional
    $codigoPromo = strtoupper(trim($body['codigo_promo'] ?? ''));

    $db = getDB();

    // Buscar itens do carrinho
    $stmt = $db->prepare(
        'SELECT c.id AS carrinho_id, c.quantidade,
                p.id AS produto_id, p.nome, p.preco, p.stock
         FROM carrinho c
         JOIN produtos p ON c.produto_id = p.id
         WHERE c.utilizador_id = ?'
    );
    $stmt->execute([$userId]);
    $itens = $stmt->fetchAll();

    if (!$itens) errorResponse('O carrinho está vazio.', 400);

    // Verificar stock de cada item
    foreach ($itens as $item) {
        if ($item['quantidade'] > $item['stock']) {
            errorResponse("Stock insuficiente para \"{$item['nome']}\". Disponível: {$item['stock']}.", 409);
        }
    }

    // Calcular total
    $subtotal = array_reduce($itens, fn($s, $i) => $s + ($i['preco'] * $i['quantidade']), 0);
    $envio    = 3.99;
    $desconto = match ($codigoPromo) {
        'ETNV10' => $subtotal * 0.10,
        'IPIL20' => $subtotal * 0.20,
        default  => 0,
    };
    $total = round($subtotal + $envio - $desconto, 2);

    // Tudo numa transação para garantir consistência
    $db->beginTransaction();

    try {
        // Criar pedido
        $pedidoStmt = $db->prepare(
            "INSERT INTO pedidos (utilizador_id, total, estado) VALUES (?, ?, 'pendente')"
        );
        $pedidoStmt->execute([$userId, $total]);
        $pedidoId = (int) $db->lastInsertId();

        // Inserir itens e reduzir stock
        $itemStmt  = $db->prepare(
            'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)'
        );
        $stockStmt = $db->prepare('UPDATE produtos SET stock = stock - ? WHERE id = ?');

        foreach ($itens as $item) {
            $itemStmt->execute([$pedidoId, $item['produto_id'], $item['quantidade'], $item['preco']]);
            $stockStmt->execute([$item['quantidade'], $item['produto_id']]);
        }

        // Limpar carrinho
        $db->prepare('DELETE FROM carrinho WHERE utilizador_id = ?')->execute([$userId]);

        $db->commit();

        successResponse([
            'pedido_id' => $pedidoId,
            'total'     => $total,
            'estado'    => 'pendente',
        ], 'Pedido criado com sucesso!', 201);

    } catch (\Throwable $e) {
        $db->rollBack();
        errorResponse('Erro ao processar pedido. Tente novamente.', 500);
    }
}

// ─── CANCELAR PEDIDO ────────────────────────────
function handleCancelar(): never {
    requireMethod('PUT');
    $userId   = requireAuth();
    $pedidoId = (int) ($_GET['id'] ?? 0);

    if (!$pedidoId) errorResponse('ID de pedido inválido.', 422);

    $db   = getDB();
    $stmt = $db->prepare("SELECT estado FROM pedidos WHERE id = ? AND utilizador_id = ?");
    $stmt->execute([$pedidoId, $userId]);
    $pedido = $stmt->fetch();

    if (!$pedido) errorResponse('Pedido não encontrado.', 404);
    if ($pedido['estado'] !== 'pendente') {
        errorResponse('Apenas pedidos pendentes podem ser cancelados.', 409);
    }

    // Repor stock
    $itens = $db->prepare('SELECT produto_id, quantidade FROM itens_pedido WHERE pedido_id = ?');
    $itens->execute([$pedidoId]);

    $db->beginTransaction();
    try {
        foreach ($itens->fetchAll() as $item) {
            $db->prepare('UPDATE produtos SET stock = stock + ? WHERE id = ?')
               ->execute([$item['quantidade'], $item['produto_id']]);
        }
        $db->prepare("UPDATE pedidos SET estado = 'cancelado' WHERE id = ?")->execute([$pedidoId]);
        $db->commit();
    } catch (\Throwable $e) {
        $db->rollBack();
        errorResponse('Erro ao cancelar pedido.', 500);
    }

    successResponse(null, 'Pedido cancelado com sucesso.');
}

// ─── LISTAR TODOS (ADMIN) ───────────────────────
function handleTodos(): never {
    requireMethod('GET');
    requireAdmin();

    $db   = getDB();
    $stmt = $db->query(
        'SELECT p.id, p.total, p.estado, p.data_pedido,
                u.nome AS utilizador_nome, u.email AS utilizador_email,
                COUNT(ip.id) AS total_itens
         FROM pedidos p
         JOIN users u ON p.utilizador_id = u.id
         LEFT JOIN itens_pedido ip ON ip.pedido_id = p.id
         GROUP BY p.id
         ORDER BY p.data_pedido DESC'
    );

    successResponse($stmt->fetchAll());
}

// ─── ATUALIZAR ESTADO (ADMIN) ───────────────────
function handleEstado(): never {
    requireMethod('PUT');
    requireAdmin();

    $pedidoId = (int) ($_GET['id'] ?? 0);
    if (!$pedidoId) errorResponse('ID inválido.', 422);

    $body   = getJsonBody();
    $estado = $body['estado'] ?? '';

    $estadosValidos = ['pendente', 'processando', 'enviado', 'entregue', 'cancelado'];
    if (!in_array($estado, $estadosValidos, true)) {
        errorResponse('Estado inválido. Valores aceites: ' . implode(', ', $estadosValidos), 422);
    }

    $db   = getDB();
    $stmt = $db->prepare('UPDATE pedidos SET estado = ? WHERE id = ?');
    $stmt->execute([$estado, $pedidoId]);

    if ($stmt->rowCount() === 0) errorResponse('Pedido não encontrado.', 404);

    successResponse(['estado' => $estado], 'Estado do pedido atualizado.');
}
