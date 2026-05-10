<?php
// ═══════════════════════════════════════════════
// API — Autenticação
// Endpoints:
//   POST /api/auth.php?action=login
//   POST /api/auth.php?action=register
//   POST /api/auth.php?action=logout
//   GET  /api/auth.php?action=me
// ═══════════════════════════════════════════════

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/helpers.php';

setCorsHeaders();
startSession();

$action = $_GET['action'] ?? '';

match ($action) {
    'login'    => handleLogin(),
    'register' => handleRegister(),
    'logout'   => handleLogout(),
    'me'       => handleMe(),
    default    => errorResponse("Ação '$action' não reconhecida.", 404),
};

// ─── LOGIN ──────────────────────────────────────
function handleLogin(): never {
    requireMethod('POST');
    $body = getJsonBody();
    requireFields($body, ['email', 'password']);

    $email = trim($body['email']);
    $pass  = $body['password'];

    if (!validateEmail($email)) {
        errorResponse('Email inválido.', 422);
    }
    if (strlen($pass) < 6) {
        errorResponse('Password deve ter pelo menos 6 caracteres.', 422);
    }

    $db   = getDB();
    $stmt = $db->prepare('SELECT id, nome, email, password, telefone, tipo_user FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($pass, $user['password'])) {
        errorResponse('Email ou password incorretos.', 401);
    }

    // Iniciar sessão
    $_SESSION['user_id']   = $user['id'];
    $_SESSION['tipo_user'] = $user['tipo_user'];
    session_regenerate_id(true);

    // Não enviar a hash da password ao frontend
    unset($user['password']);

    successResponse($user, 'Login efetuado com sucesso.');
}

// ─── REGISTO ────────────────────────────────────
function handleRegister(): never {
    requireMethod('POST');
    $body = getJsonBody();
    requireFields($body, ['nome', 'email', 'password']);

    $nome     = sanitize($body['nome']);
    $email    = trim($body['email']);
    $pass     = $body['password'];
    $telefone = sanitize($body['telefone'] ?? '');

    if (!validateEmail($email)) {
        errorResponse('Email inválido.', 422);
    }
    if (strlen($pass) < 6) {
        errorResponse('Password deve ter pelo menos 6 caracteres.', 422);
    }
    if (strlen($nome) < 2) {
        errorResponse('Nome deve ter pelo menos 2 caracteres.', 422);
    }

    $db = getDB();

    // Verificar se email já existe
    $check = $db->prepare('SELECT id FROM users WHERE email = ?');
    $check->execute([$email]);
    if ($check->fetch()) {
        errorResponse('Este email já está registado.', 409);
    }

    $hash = password_hash($pass, PASSWORD_BCRYPT, ['cost' => 12]);

    $stmt = $db->prepare(
        'INSERT INTO users (nome, email, password, telefone, tipo_user)
         VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->execute([$nome, $email, $hash, $telefone, 'cliente']);

    $userId = (int) $db->lastInsertId();

    // Iniciar sessão automaticamente após registo
    $_SESSION['user_id']   = $userId;
    $_SESSION['tipo_user'] = 'cliente';
    session_regenerate_id(true);

    successResponse([
        'id'        => $userId,
        'nome'      => $nome,
        'email'     => $email,
        'telefone'  => $telefone,
        'tipo_user' => 'cliente',
    ], 'Conta criada com sucesso.', 201);
}

// ─── LOGOUT ─────────────────────────────────────
function handleLogout(): never {
    requireMethod('POST');
    $_SESSION = [];
    session_destroy();
    successResponse(null, 'Sessão terminada.');
}

// ─── ME (utilizador atual) ───────────────────────
function handleMe(): never {
    requireMethod('GET');

    if (empty($_SESSION['user_id'])) {
        errorResponse('Não autenticado.', 401);
    }

    $db   = getDB();
    $stmt = $db->prepare('SELECT id, nome, email, telefone, tipo_user, data_criacao FROM users WHERE id = ?');
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch();

    if (!$user) {
        errorResponse('Utilizador não encontrado.', 404);
    }

    successResponse($user);
}
