<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>ACME Digital - Dashboard</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <div class="card" style="max-width: 500px; text-align: center;">
        <div style="margin-bottom: 1rem; display: flex; justify-content: center;">
            <i data-lucide="shield-check" style="width: 48px; height: 48px; color: #5c6275;"></i>
        </div>
        <h2>Painel Principal</h2>
        <p style="margin-bottom: 2rem;">Bem-vindo ao portal seguro da <strong>ACME Digital</strong>.</p>
        
        <div style="background: #0d0e12; border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; text-align: left;">
            <p style="color: var(--text-primary); font-size: 0.9rem; margin-bottom: 0.5rem;"><strong>Status da Sessão:</strong> Autenticado</p>
            <p style="color: var(--text-muted); font-size: 0.85rem;">Sua conexão está protegida com sanitização contra XSS e consultas preparadas (PDO) contra SQL Injection.</p>
        </div>

        <a href="login.php" style="display: inline-block; width: 100%; text-decoration: none;">
            <button type="button" style="background: transparent; border: 1px solid var(--border-color);">Sair da Conta</button>
        </a>
    </div>
    <script>lucide.createIcons();</script>
</body>
</html>