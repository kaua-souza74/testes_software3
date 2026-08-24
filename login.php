<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>ACME Digital - Login</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Lucide Icons (Ícones vazados e minimalistas) -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <div class="card">
        <h2>ACME Digital</h2>
        <form id="form-login" novalidate>
            <div class="form-group">
                <label for="email">E-mail</label>
                <div class="input-container">
                    <i data-lucide="mail"></i>
                    <input type="text" id="email" name="email" placeholder="seu@email.com">
                </div>
            </div>
            <div class="form-group">
                <label for="senha">Senha</label>
                <div class="input-container">
                    <i data-lucide="lock"></i>
                    <input type="password" id="senha" name="senha" placeholder="••••••••">
                </div>
            </div>
            <button type="submit" id="btn-login">Acessar</button>
            <p>Ainda não tem conta? <a href="cadastro.php">Cadastre-se</a></p>
        </form>
        <div id="mensagem" style="display:none;"></div>
    </div>
    <script>lucide.createIcons();</script>
    <script src="assets/js/main.js"></script>
</body>
</html>