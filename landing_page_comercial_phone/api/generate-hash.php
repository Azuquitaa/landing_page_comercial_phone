<?php
// ⚠️ ARCHIVO TEMPORAL - ELIMINAR DESPUÉS DE USAR
// Este archivo genera hashes de contraseñas para guardar en users.json
// Accede a: https://tudominio.com/api/generate-hash.php?password=TU_CONTRASEÑA

header('Content-Type: application/json');

if (!isset($_GET['password']) || empty($_GET['password'])) {
    echo json_encode(['error' => 'Debes proporcionar ?password=TU_CONTRASEÑA']);
    exit;
}

$password = $_GET['password'];
$salt = 'comercial-phone-secret-salt-2024'; // MISMO SALT QUE EN EL FRONTEND
$hash = hash('sha256', $salt . $password);

echo json_encode([
    'password' => $password,
    'hash' => $hash,
    'instruction' => 'Copia este hash en api/users.json'
]);
?>