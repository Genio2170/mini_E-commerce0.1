<?php
// ═══════════════════════════════════════════════
// API — Utilizadores
// Endpoints:
//   GET    /api/users.php?action=perfil
//   PUT    /api/users.php?action=atualizar
//   PUT    /api/users.php?action=password
//   GET    /api/users.php?action=todos      (admin)
//   DELETE /api/users.php?action=apagar&id= (admin)
// ═══════════════════════════════════════════════

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/helpers.php';

setCorsHeaders();
startSession();

$action = $_GET['action'] ?? '';

match ($action) {
    'perfil'   => handlePerfil(),
    'atualizar'=> handleAtualizar(),
    'password' => handlePassword(),
    'todos'    => handleTodos(),
    'apagar'   => handleApagar(),
    default    => errorResponse("Ação '$action' não reconhecida.", 404),
};

// ─── PERFIL DO UTILIZADOR LOGADO ────────────────
function handlePerfil(): never {
    requireMethod('GET');
    $userId = requireAuth();
    $db     = getDB();

    $stmt = $db->prepare(
        'SELECT id, nome, email, telefone, tipo_user, data_criacao FROM users WHERE id = ?'
    );
    $stmt->execute([$userId]);
    $user = $stmt->fetch();

    if (!$user) errorResponse('Utilizador não encontrado.', 404);

    // Total de pedidos do utilizador
    $pStmt = $db->prepare('SELECT COUNT(*) as total FROM pedidos WHERE utilizador_id = ?');
    $pStmt->execute([$userId]);
    $user['total_pedidos'] = (int) $pStmt->fetch()['total'];

    // Total de itens no carrinho
    $cStmt = $db->prepare('SELECT COALESCE(SUM(quantidade), 0) as total FROM carrinho WHERE utilizador_id = ?');
    $cStmt->execute([$userId]);
    $user['total_carrinho'] = (int) $cStmt->fetch()['total'];

    successResponse($user);
}

// ─── ATUALIZAR PERFIL ───────────────────────────
function handleAtualizar(): never {
    requireMethod('PUT');
    $userId = requireAuth();
    $body   = getJsonBody();
    requireFields($body, ['nome', 'email']);

    $nome     = sanitize($body['nome']);
    $email    = trim($body['email']);
    $telefone = sanitize($body['telefone'] ?? '');

    if (!validateEmail($email)) {
        errorResponse('Email inválido.', 422);
    }
    if (strlen($nome) < 2) {
        errorResponse('Nome deve ter pelo menos 2 caracteres.', 422);
    }

    $db = getDB();

    // Verificar se o email já pertence a outro utilizador
    $check = $db->prepare('SELECT id FROM users WHERE email = ? AND id != ?');
    $check->execute([$email, $userId]);
    if ($check->fetch()) {
        errorResponse('Este email já está em uso por outra conta.', 409);
    }

    $stmt = $db->prepare(
        'UPDATE users SET nome = ?, email = ?, telefone = ? WHERE id = ?'
    );
    $stmt->execute([$nome, $email, $telefone, $userId]);

    successResponse([
        'id'       => $userId,
        'nome'     => $nome,
        'email'    => $email,
        'telefone' => $telefone,
    ], 'Perfil atualizado com sucesso.');
}

// ─── ALTERAR PASSWORD ───────────────────────────
function handlePassword(): never {
    requireMethod('PUT');
    $userId = requireAuth();
    $body   = getJsonBody();
    requireFields($body, ['password_atual', 'password_nova']);

    $passAtual = $body['password_atual'];
    $passNova  = $body['password_nova'];

    if (strlen($passNova) < 6) {
        errorResponse('Nova password deve ter pelo menos 6 caracteres.', 422);
    }

    $db   = getDB();
    $stmt = $db->prepare('SELECT password FROM users WHERE id = ?');
    $stmt->execute([$userId]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($passAtual, $user['password'])) {
        errorResponse('Password atual incorreta.', 401);
    }

    $novaHash = password_hash($passNova, PASSWORD_BCRYPT, ['cost' => 12]);
    $db->prepare('UPDATE users SET password = ? WHERE id = ?')->execute([$novaHash, $userId]);

    successResponse(null, 'Password alterada com sucesso.');
}

// ─── LISTAR TODOS OS UTILIZADORES (ADMIN) ───────
function handleTodos(): never {
    requireMethod('GET');
    requireAdmin();

    $db   = getDB();
    $stmt = $db->query(
        'SELECT id, nome, email, telefone, tipo_user, data_criacao FROM users ORDER BY data_criacao DESC'
    );
    $users = $stmt->fetchAll();

    successResponse($users);
}

// ─── APAGAR UTILIZADOR (ADMIN) ──────────────────
function handleApagar(): never {
    requireMethod('DELETE');
    requireAdmin();

    $id = (int) ($_GET['id'] ?? 0);
    if (!$id) errorResponse('ID de utilizador inválido.', 422);

    $db   = getDB();
    $stmt = $db->prepare('DELETE FROM users WHERE id = ?');
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        errorResponse('Utilizador não encontrado.', 404);
    }

    successResponse(null, 'Utilizador removido com sucesso.');
}
