<?php
/**
 * Verifica si un token es válido
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$token = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$token = str_replace('Bearer ', '', $token);

if (empty($token)) {
    http_response_code(401);
    echo json_encode(['authenticated' => false, 'error' => 'Token no proporcionado']);
    exit;
}

// ✅ Verificar token en archivo de sesiones
$sessionsFile = __DIR__ . '/../data/sessions.json';

if (!file_exists($sessionsFile)) {
    http_response_code(401);
    echo json_encode(['authenticated' => false, 'error' => 'No hay sesiones']);
    exit;
}

$sessions = json_decode(file_get_contents($sessionsFile), true) ?: [];

if (!isset($sessions[$token])) {
    http_response_code(401);
    echo json_encode(['authenticated' => false, 'error' => 'Token inválido']);
    exit;
}

$session = $sessions[$token];

// Verificar expiración
if (strtotime($session['expires_at']) < time()) {
    unset($sessions[$token]);
    file_put_contents($sessionsFile, json_encode($sessions, JSON_PRETTY_PRINT));
    http_response_code(401);
    echo json_encode(['authenticated' => false, 'error' => 'Token expirado']);
    exit;
}

echo json_encode([
    'authenticated' => true,
    'user' => [
        'id' => $session['user_id'],
        'username' => $session['username'],
        'role' => $session['role'],
        'createdAt' => $session['created_at']
    ]
]);
?>