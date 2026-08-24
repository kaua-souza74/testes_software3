<?php
header('Content-Type: application/json');
require_once 'config/db.php';

$email = trim($_POST['email'] ?? '');
$senha = trim($_POST['senha'] ?? '');

if (empty($email) || empty($senha)) {
    echo json_encode(['status' => 'error', 'message' => 'Campos Vazios']);
    exit;
}

// Sanitização e prevenção contra XSS
$emailSanitizado = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');

// Prepared Statements para prevenir SQL Injection
$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = :email");
$stmt->execute(['email' => $emailSanitizado]);
$user = $stmt->fetch();

if ($user && password_verify($senha, $user['senha'])) {
    echo json_encode(['status' => 'success', 'message' => 'Login realizado com sucesso!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Credenciais inválidas']);
}