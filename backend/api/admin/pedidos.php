<?php
// ═══════════════════════════════════════════════
// API — Admin: Gestão de Pedidos
// Endpoints (admin only):
//   GET /api/admin/pedidos.php              → lista todos com itens e cliente
//   GET /api/admin/pedidos.php?id=1         → detalhe completo
//   PUT /api/admin/pedidos.php?id=1         → atualizar estado
//                                             body: { "estado": "confirmado" }
// Ao mudar o estado, gera automaticamente uma
// notificação na tabela `notificacoes` para o utilizador.
// ═══════════════════════════════════════════════

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../includes/helpers.php';

setCorsHeaders();
startSession();
requireAdmin();

$method = $_SERVER['REQUEST_METHOD'];
$id     = (int) ($_GET['id'] ?? 0);

if ($method === 'GET') {
    if ($id) handleDetalhe($id);
    else     handleListar();
}
if ($method === 'PUT') {
    handleAtualizarEstado($id);
}
errorResponse('Metodo nao suportado.', 405);

// ─── LISTAR TODOS ────────────────────────────────
function handleListar(): never {
    $db = getDB();
    $stmt = $db->query(
        "SELECT p.id, p.total, p.estado, p.data_pedido, p.data_atualizacao,
                u.id AS utilizador_id, u.nome AS cliente, u.email,
                COUNT(ip.id) AS total_itens,
                GROUP_CONCAT(pr.nome SEPARATOR ' | ') AS nomes_produtos
         FROM pedidos p
         JOIN users u        ON p.utilizador_id = u.id
         LEFT JOIN itens_pedido ip ON ip.pedido_id = p.id
         LEFT JOIN produtos pr ON ip.produto_id = pr.id
         GROUP BY p.id
         ORDER BY p.data_pedido DESC"
    );
    successResponse($stmt->fetchAll());
}

// ─── DETALHE ────────────────────────────────────
function handleDetalhe(int $id): never {
    $db = getDB();

    $pedidoStmt = $db->prepare(
        "SELECT p.*, u.nome AS cliente, u.email, u.telefone
         FROM pedidos p
         JOIN users u ON p.utilizador_id = u.id
         WHERE p.id = ?"
    );
    $pedidoStmt->execute([$id]);
    $pedido = $pedidoStmt->fetch();
    if (!$pedido) errorResponse('Pedido nao encontrado.', 404);

    $itensStmt = $db->prepare(
        "SELECT ip.quantidade, ip.preco_unitario,
                pr.id AS produto_id, pr.nome, pr.imagem
         FROM itens_pedido ip
         JOIN produtos pr ON ip.produto_id = pr.id
         WHERE ip.pedido_id = ?"
    );
    $itensStmt->execute([$id]);
    $pedido['itens'] = $itensStmt->fetchAll();

    successResponse($pedido);
}

// ─── ATUALIZAR ESTADO ───────────────────────────
function handleAtualizarEstado(int $id): never {
    if (!$id) errorResponse('ID invalido.', 422);

    $body = getJsonBody();
    $novoEstado = $body['estado'] ?? '';

    $estadosValidos = ['pendente','confirmado','preparacao','enviado','entregue','cancelado'];
    if (!in_array($novoEstado, $estadosValidos, true)) {
        errorResponse('Estado invalido. Valores aceites: ' . implode(', ', $estadosValidos), 422);
    }

    $db = getDB();

    // Buscar pedido actual
    $pedidoStmt = $db->prepare("SELECT utilizador_id, estado FROM pedidos WHERE id = ?");
    $pedidoStmt->execute([$id]);
    $pedido = $pedidoStmt->fetch();
    if (!$pedido) errorResponse('Pedido nao encontrado.', 404);

    $estadoAnterior = $pedido['estado'];
    if ($estadoAnterior === $novoEstado) {
        successResponse(['estado' => $novoEstado], 'Estado ja e o mesmo, sem alteracoes.');
    }

    $db->beginTransaction();
    try {
        // Atualizar estado do pedido
        $db->prepare("UPDATE pedidos SET estado = ? WHERE id = ?")
           ->execute([$novoEstado, $id]);

        // Repor stock se cancelado (e ainda nao estava cancelado)
        if ($novoEstado === 'cancelado' && $estadoAnterior !== 'cancelado') {
            $itens = $db->prepare("SELECT produto_id, quantidade FROM itens_pedido WHERE pedido_id = ?");
            $itens->execute([$id]);
            foreach ($itens->fetchAll() as $item) {
                $db->prepare("UPDATE produtos SET stock = stock + ? WHERE id = ?")
                   ->execute([$item['quantidade'], $item['produto_id']]);
            }
        }

        // Gerar notificacao automatica para o utilizador
        $mensagens = [
            'confirmado' => "O teu pedido #$id foi confirmado.",
            'preparacao' => "O teu pedido #$id esta em preparacao.",
            'enviado'    => "O teu pedido #$id foi enviado e esta a caminho!",
            'entregue'   => "O teu pedido #$id foi entregue. Aprecia a compra!",
            'cancelado'  => "O teu pedido #$id foi cancelado.",
        ];
        $icones = [
            'confirmado' => '✔',
            'preparacao' => '📦',
            'enviado'    => '🚚',
            'entregue'   => '📬',
            'cancelado'  => '❌',
        ];

        if (isset($mensagens[$novoEstado])) {
            $db->prepare(
                "INSERT INTO notificacoes (utilizador_id, pedido_id, icone, mensagem, estado_pedido, lida)
                 VALUES (?, ?, ?, ?, ?, 0)"
            )->execute([
                $pedido['utilizador_id'],
                $id,
                $icones[$novoEstado],
                $mensagens[$novoEstado],
                $novoEstado,
            ]);
        }

        $db->commit();
    } catch (\Throwable $e) {
        $db->rollBack();
        errorResponse('Erro ao atualizar estado: ' . $e->getMessage(), 500);
    }

    successResponse(['estado' => $novoEstado], "Estado atualizado para '$novoEstado'.");
}
