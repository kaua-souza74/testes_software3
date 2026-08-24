<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>ACME Digital - Criar Conta</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <div class="card">
        <h2>Criar Conta</h2>
        <form id="form-cadastro" novalidate>
            <div class="form-group">
                <label for="nome">Nome Completo</label>
                <div class="input-container">
                    <i data-lucide="user"></i>
                    <input type="text" id="nome" name="nome" placeholder="Seu nome">
                </div>
            </div>
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
            <button type="submit" id="btn-cadastro">Cadastrar</button>
            <p>Já possui conta? <a href="login.php">Faça Login</a></p>
        </form>
        <div id="mensagem" style="display:none;"></div>
    </div>
    <script>lucide.createIcons();</script>
    <script src="assets/js/main.js"></script>
</body>
</html>