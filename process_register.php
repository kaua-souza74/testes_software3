<?php
header('Content-Type: application/json');
require_once 'config/db.php';

$nome  = trim($_POST['nome'] ?? '');
$email = trim($_POST['email'] ?? '');
$senha = trim($_POST['senha'] ?? '');

if (empty($nome) || empty($email) || empty($senha)) {
    echo json_encode(['status' => 'error', 'message' => 'Campos Vazios']);
    exit;
}

// Sanitização XSS
$nomeSanitizado  = htmlspecialchars($nome, ENT_QUOTES, 'UTF-8');
$emailSanitizado = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');

// Prevenção de duplicidade
$stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = :email");
$stmt->execute(['email' => $emailSanitizado]);

if ($stmt->fetch()) {
    echo json_encode(['status' => 'error', 'message' => 'E-mail já cadastrado']);
    exit;
}

// Criptografia segura da senha
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

$stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (:nome, :email, :senha)");
$sucesso = $stmt->execute([
    'nome'  => $nomeSanitizado,
    'email' => $emailSanitizado,
    'senha' => $senhaHash
]);

if ($sucesso) {
    echo json_encode(['status' => 'success', 'message' => 'Cadastro realizado com sucesso!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao realizar cadastro']);
}