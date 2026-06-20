<?php
/**
 * API de Autenticación
 * Verifica credenciales y genera token de acceso
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['username']) || !isset($input['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Usuario y contraseña requeridos']);
    exit;
}

$username = $input['username'];
$password = $input['password'];

// Cargar usuarios
$usersFile = __DIR__ . '/users.json';
if (!file_exists($usersFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Archivo de usuarios no encontrado']);
    exit;
}

$usersData = json_decode(file_get_contents($usersFile), true);
$users = $usersData['users'] ?? [];

// Buscar usuario
$foundUser = null;
foreach ($users as $user) {
    if ($user['username'] === $username) {
        $foundUser = $user;
        break;
    }
}

// Verificar contraseña
$salt = 'comercial-phone-secret-salt-2024';
$inputHash = hash('sha256', $salt . $password);

if (!$foundUser || $foundUser['passwordHash'] !== $inputHash) {
    http_response_code(401);
    echo json_encode(['error' => 'Credenciales inválidas']);
    exit;
}

// ✅ Generar token y guardarlo en archivo (no en sesión PHP)
$token = bin2hex(random_bytes(32));

// Guardar token en archivo de sesiones
$sessionsFile = __DIR__ . '/../data/sessions.json';
$sessionsDir = dirname($sessionsFile);

if (!is_dir($sessionsDir)) {
    mkdir($sessionsDir, 0755, true);
}

$sessions = [];
if (file_exists($sessionsFile)) {
    $sessions = json_decode(file_get_contents($sessionsFile), true) ?: [];
}

// Guardar sesión con expiración (24 horas)
$sessions[$token] = [
    'user_id' => $foundUser['id'],
    'username' => $foundUser['username'],
    'role' => $foundUser['role'],
    'created_at' => date('c'),
    'expires_at' => date('c', strtotime('+24 hours'))
];

// Limpiar sesiones expiradas
foreach ($sessions as $key => $session) {
    if (strtotime($session['expires_at']) < time()) {
        unset($sessions[$key]);
    }
}

file_put_contents($sessionsFile, json_encode($sessions, JSON_PRETTY_PRINT));

// Devolver datos del usuario (SIN la contraseña)
echo json_encode([
    'success' => true,
    'token' => $token,
    'user' => [
        'id' => $foundUser['id'],
        'username' => $foundUser['username'],
        'role' => $foundUser['role'],
        'createdAt' => $foundUser['createdAt']
    ]
]);
?>