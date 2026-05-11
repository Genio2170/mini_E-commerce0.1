<?php
// ═══════════════════════════════════════════════
// API — Produtos
// Endpoints (público):
//   GET /api/produtos.php                          → lista todos
//   GET /api/produtos.php?id=1                     → produto por ID
//   GET /api/produtos.php?categoria_id=2           → por categoria
//   GET /api/produtos.php?search=teclado           → pesquisa
//   GET /api/produtos.php?badge=new|sale           → por badge
//
// Endpoints (admin):
//   POST   /api/produtos.php?action=criar
//   PUT    /api/produtos.php?action=editar&id=1
//   DELETE /api/produtos.php?action=apagar&id=1
// ═══════════════════════════════════════════════

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/helpers.php';

setCorsHeaders();
startSession();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// Rotas de escrita — apenas admin
if ($method !== 'GET') {
    match ($action) {
        'criar'  => handleCriar(),
        'editar' => handleEditar(),
        'apagar' => handleApagar(),
        default  => errorResponse("Ação '$action' não reconhecida.", 404),
    };
    exit; // impede de cair no handleListar() abaixo
}

// GET — leitura pública
handleListar();

// ─── LISTAR / FILTRAR / PESQUISAR ───────────────
function handleListar(): never {
    $db = getDB();

    $where  = [];
    $params = [];

    // Filtro por ID único
    if (!empty($_GET['id'])) {
        $stmt = $db->prepare(
            'SELECT p.*, c.nome AS categoria_nome
             FROM produtos p
             LEFT JOIN categorias c ON p.categoria_id = c.id
             WHERE p.id = ?'
        );
        $stmt->execute([(int) $_GET['id']]);
        $produto = $stmt->fetch();

        if (!$produto) errorResponse('Produto não encontrado.', 404);
        successResponse($produto);
    }

    // Filtros opcionais
    if (!empty($_GET['categoria_id'])) {
        $where[]  = 'p.categoria_id = ?';
        $params[] = (int) $_GET['categoria_id'];
    }

    // Aceitar também por nome da categoria (para compatibilidade com frontend)
    if (!empty($_GET['categoria']) && empty($_GET['categoria_id'])) {
        $where[]  = 'c.slug = ?';
        $params[] = $_GET['categoria'];
    }

    if (!empty($_GET['search'])) {
        $where[]  = '(p.nome LIKE ? OR p.descricao LIKE ?)';
        $term     = '%' . $_GET['search'] . '%';
        $params[] = $term;
        $params[] = $term;
    }

    if (!empty($_GET['badge'])) {
        // O campo badge não existe na BD — mapeamos:
        // badge=sale → preco < preco original (produtos com desconto)
        // Aqui usamos uma coluna virtual — adapte se adicionar coluna badge
        // Por agora filtramos por nome para manter compatibilidade com o JS
    }

    // Stock disponível (opcional)
    if (isset($_GET['em_stock'])) {
        $where[] = 'p.stock > 0';
    }

    $whereStr = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    // Ordenação
    $orderMap = [
        'preco_asc'  => 'p.preco ASC',
        'preco_desc' => 'p.preco DESC',
        'nome'       => 'p.nome ASC',
        'novo'       => 'p.data_criacao DESC',
    ];
    $order = $orderMap[$_GET['order'] ?? ''] ?? 'p.id ASC';

    // Paginação
    $limit  = min((int) ($_GET['limit']  ?? 100), 100);
    $offset = max((int) ($_GET['offset'] ?? 0),   0);

    $sql = "SELECT p.*, c.nome AS categoria_nome
            FROM produtos p
            LEFT JOIN categorias c ON p.categoria_id = c.id
            $whereStr
            ORDER BY $order
            LIMIT $limit OFFSET $offset";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $produtos = $stmt->fetchAll();

    // Total sem paginação (para o frontend poder mostrar "X resultados")
    $countSql  = "SELECT COUNT(*) FROM produtos p
                  LEFT JOIN categorias c ON p.categoria_id = c.id
                  $whereStr";
    $countStmt = $db->prepare($countSql);
    $countStmt->execute($params);
    $total = (int) $countStmt->fetchColumn();

    successResponse([
        'produtos' => $produtos,
        'total'    => $total,
        'limit'    => $limit,
        'offset'   => $offset,
    ]);
}

// ─── CRIAR PRODUTO (ADMIN) ──────────────────────
function handleCriar(): never {
    requireMethod('POST');
    requireAdmin();

    $body = getJsonBody();
    requireFields($body, ['nome', 'preco', 'stock']);

    $nome        = sanitize($body['nome']);
    $descricao   = sanitize($body['descricao']   ?? '');
    $preco       = (float)  $body['preco'];
    $stock       = (int)    $body['stock'];
    $imagem      = sanitize($body['imagem']       ?? '');
    $categoriaId = !empty($body['categoria_id']) ? (int) $body['categoria_id'] : null;

    if ($preco <= 0) errorResponse('Preço deve ser maior que zero.', 422);
    if ($stock < 0)  errorResponse('Stock não pode ser negativo.', 422);

    $db   = getDB();
    $stmt = $db->prepare(
        'INSERT INTO produtos (nome, descricao, preco, stock, imagem, categoria_id)
         VALUES (?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([$nome, $descricao, $preco, $stock, $imagem, $categoriaId]);

    successResponse(['id' => (int) $db->lastInsertId()], 'Produto criado com sucesso.', 201);
}

// ─── EDITAR PRODUTO (ADMIN) ─────────────────────
function handleEditar(): never {
    requireMethod('PUT');
    requireAdmin();

    $id = (int) ($_GET['id'] ?? 0);
    if (!$id) errorResponse('ID inválido.', 422);

    $body = getJsonBody();
    requireFields($body, ['nome', 'preco', 'stock']);

    $nome        = sanitize($body['nome']);
    $descricao   = sanitize($body['descricao']   ?? '');
    $preco       = (float)  $body['preco'];
    $stock       = (int)    $body['stock'];
    $imagem      = sanitize($body['imagem']       ?? '');
    $categoriaId = !empty($body['categoria_id']) ? (int) $body['categoria_id'] : null;

    $db   = getDB();
    $stmt = $db->prepare(
        'UPDATE produtos
         SET nome = ?, descricao = ?, preco = ?, stock = ?, imagem = ?, categoria_id = ?
         WHERE id = ?'
    );
    $stmt->execute([$nome, $descricao, $preco, $stock, $imagem, $categoriaId, $id]);

    if ($stmt->rowCount() === 0) errorResponse('Produto não encontrado.', 404);

    successResponse(null, 'Produto atualizado com sucesso.');
}

// ─── APAGAR PRODUTO (ADMIN) ─────────────────────
function handleApagar(): never {
    requireMethod('DELETE');
    requireAdmin();

    $id = (int) ($_GET['id'] ?? 0);
    if (!$id) errorResponse('ID inválido.', 422);

    $db   = getDB();
    $stmt = $db->prepare('DELETE FROM produtos WHERE id = ?');
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) errorResponse('Produto não encontrado.', 404);

    successResponse(null, 'Produto removido com sucesso.');
}
