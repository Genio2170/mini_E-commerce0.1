<?php
// ═══════════════════════════════════════════════
// HELPERS — Funções reutilizáveis em todos os endpoints
// ═══════════════════════════════════════════════

// ─── CORS ───────────────────────────────────────
// Permite que o frontend (mesmo domínio ou localhost)
// chame a API sem bloqueios do browser.
function setCorsHeaders(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    // Preflight OPTIONS — o browser envia isto antes do pedido real
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

// ─── RESPOSTA JSON ───────────────────────────────
function jsonResponse(mixed $data, int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function successResponse(mixed $data = null, string $message = 'OK', int $status = 200): never {
    jsonResponse([
        'success' => true,
        'message' => $message,
        'data'    => $data,
    ], $status);
}

function errorResponse(string $message, int $status = 400, mixed $errors = null): never {
    jsonResponse([
        'success' => false,
        'message' => $message,
        'errors'  => $errors,
    ], $status);
}

// ─── BODY JSON ──────────────────────────────────
// Lê e valida o corpo JSON do pedido POST/PUT
function getJsonBody(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        errorResponse('JSON inválido no corpo do pedido.', 400);
    }

    return $data ?? [];
}

// ─── SESSÃO ─────────────────────────────────────
function startSession(): void {
    if (session_status() === PHP_SESSION_NONE) {
        session_set_cookie_params([
            'lifetime' => 86400 * 7, // 7 dias
            'path'     => '/',
            'secure'   => false,     // true em produção com HTTPS
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
        session_start();
    }
}

function requireAuth(): int {
    startSession();
    if (empty($_SESSION['user_id'])) {
        errorResponse('Não autenticado. Faça login primeiro.', 401);
    }
    return (int) $_SESSION['user_id'];
}

function requireAdmin(): int {
    $userId = requireAuth();
    startSession();
    if (($_SESSION['tipo_user'] ?? '') !== 'admin') {
        errorResponse('Acesso negado. Apenas administradores.', 403);
    }
    return $userId;
}

// ─── VALIDAÇÃO ──────────────────────────────────
function validateEmail(string $email): bool {
    return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
}

function sanitize(string $value): string {
    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

function requireFields(array $body, array $fields): void {
    $missing = [];
    foreach ($fields as $f) {
        if (!isset($body[$f]) || $body[$f] === '') {
            $missing[] = $f;
        }
    }
    if ($missing) {
        errorResponse('Campos obrigatórios em falta: ' . implode(', ', $missing), 422);
    }
}

// ─── MÉTODO HTTP ────────────────────────────────
function requireMethod(string ...$methods): void {
    if (!in_array($_SERVER['REQUEST_METHOD'], $methods, true)) {
        errorResponse('Método não permitido.', 405);
    }
}
