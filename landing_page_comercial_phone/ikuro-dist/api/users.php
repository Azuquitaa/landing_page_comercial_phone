<?php
/**
 * API de Gestión de Usuarios (solo admin)
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$usersFile = __DIR__ . '/users.json';
$sessionsFile = __DIR__ . '/../data/sessions.json';

// // ✅ Verificar token
// $token = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
// $token = str_replace('Bearer ', '', $token);

// Al inicio del archivo, después de los headers
function getBearerToken() {
    $token = '';
    if (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $token = str_replace('Bearer ', '', $_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
    } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $token = str_replace('Bearer ', '', $_SERVER['HTTP_AUTHORIZATION']);
    } elseif (function_exists('getallheaders')) {
        $headers = getallheaders();
        $token = str_replace('Bearer ', '', $headers['Authorization'] ?? '');
    } elseif (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        $token = str_replace('Bearer ', '', $headers['Authorization'] ?? '');
    }
    return $token;
}

// Usar la función
$token = getBearerToken();

if (empty($token) || !file_exists($sessionsFile)) {
    http_response_code(401);
    echo json_encode(['error' => 'No autorizado']);
    exit;
}

$sessions = json_decode(file_get_contents($sessionsFile), true) ?: [];

if (!isset($sessions[$token])) {
    http_response_code(401);
    echo json_encode(['error' => 'Token inválido']);
    exit;
}

$session = $sessions[$token];

// Solo admin puede gestionar usuarios
if ($session['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'Solo administradores']);
    exit;
}

// GET: Listar usuarios
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $usersData = json_decode(file_get_contents($usersFile), true);
    $safeUsers = array_map(function($user) {
        unset($user['passwordHash']);
        return $user;
    }, $usersData['users']);
    
    echo json_encode(['users' => $safeUsers]);
    exit;
}

// POST: Crear usuario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['username']) || !isset($input['password']) || !isset($input['role'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Faltan datos']);
        exit;
    }
    
    $usersData = json_decode(file_get_contents($usersFile), true);
    
    foreach ($usersData['users'] as $user) {
        if ($user['username'] === $input['username']) {
            http_response_code(409);
            echo json_encode(['error' => 'Usuario ya existe']);
            exit;
        }
    }
    
    $salt = 'comercial-phone-secret-salt-2024';
    $newUser = [
        'id' => 'user-' . uniqid(),
        'username' => $input['username'],
        'passwordHash' => hash('sha256', $salt . $input['password']),
        'role' => $input['role'],
        'createdAt' => date('c')
    ];
    
    $usersData['users'][] = $newUser;
    file_put_contents($usersFile, json_encode($usersData, JSON_PRETTY_PRINT));
    
    echo json_encode(['success' => true, 'message' => 'Usuario creado']);
    exit;
}

// DELETE: Eliminar usuario
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $userId = $_GET['id'] ?? '';
    
    if (empty($userId)) {
        http_response_code(400);
        echo json_encode(['error' => 'ID requerido']);
        exit;
    }
    
    $usersData = json_decode(file_get_contents($usersFile), true);
    $usersData['users'] = array_values(array_filter($usersData['users'], function($user) use ($userId) {
        return $user['id'] !== $userId;
    }));
    
    file_put_contents($usersFile, json_encode($usersData, JSON_PRETTY_PRINT));
    
    echo json_encode(['success' => true, 'message' => 'Usuario eliminado']);
    exit;
}
?>