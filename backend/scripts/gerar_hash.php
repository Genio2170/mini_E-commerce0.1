<?php
// ═══════════════════════════════════════════════
// gerar_hash.php — Gerador de hashes bcrypt
// Coloca este ficheiro em: htdocs/projeto_fix/backend/scripts/gerar_hash.php
// Acede em: http://localhost/projeto_fix/backend/scripts/gerar_hash.php
// APAGA ou protege este ficheiro em produção!
// ═══════════════════════════════════════════════

// Passwords para gerar (edita à tua vontade)
$passwords = [
    'Admin@1234',
    'Cliente123',
    'password123',
];

echo '<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<title>Gerador de Hashes</title>
<style>
  body { font-family: monospace; background: #0d1117; color: #c9d1d9; padding: 2rem; }
  h2   { color: #58a6ff; }
  .row { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 1rem; margin: 0.75rem 0; }
  .pw  { color: #ffa657; }
  .hash{ color: #3fb950; word-break: break-all; }
  .copy{ color: #8b949e; font-size: 0.8rem; margin-top: 0.5rem; }
</style>
</head>
<body>
<h2>🔐 Hashes bcrypt gerados</h2>
<p style="color:#8b949e">Copia o hash desejado e insere no SQL ou directamente na BD.</p>';

foreach ($passwords as $pass) {
    $hash = password_hash($pass, PASSWORD_BCRYPT, ['cost' => 12]);
    echo '<div class="row">';
    echo '<div>Password: <span class="pw">' . htmlspecialchars($pass) . '</span></div>';
    echo '<div style="margin-top:0.5rem">Hash: <span class="hash">' . $hash . '</span></div>';
    echo '<div class="copy">✓ Verifica: ' . (password_verify($pass, $hash) ? '✅ Válido' : '❌ Inválido') . '</div>';
    echo '</div>';
}

echo '</body></html>';
