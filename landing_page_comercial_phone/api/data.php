<?php
/**
 * API de Datos - Lectura pública, escritura con token
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dataFile = __DIR__ . '/../data/content.json';
$sessionsFile = __DIR__ . '/../data/sessions.json';

// Crear archivo de datos si no existe
if (!file_exists($dataFile)) {
    $dir = dirname($dataFile);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    
    $initialData = [
        'plansHogar' => [],
        'plansMovil' => [],
        'slides' => [],
        'faqs' => [],
        'lastUpdated' => date('c')
    ];
    
    file_put_contents($dataFile, json_encode($initialData, JSON_PRETTY_PRINT));
}

// GET: Leer datos (público)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = json_decode(file_get_contents($dataFile), true);
    echo json_encode($data);
    exit;
}

// POST: Guardar datos (requiere token)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // ✅ Verificar token en archivo de sesiones
    $token = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    $token = str_replace('Bearer ', '', $token);
    
    if (empty($token)) {
        http_response_code(401);
        echo json_encode(['error' => 'Token no proporcionado']);
        exit;
    }
    
    if (!file_exists($sessionsFile)) {
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
    
    // Verificar expiración
    if (strtotime($session['expires_at']) < time()) {
        http_response_code(401);
        echo json_encode(['error' => 'Token expirado']);
        exit;
    }
    
    // Verificar permisos (admin o editor)
    if ($session['role'] !== 'admin' && $session['role'] !== 'editor') {
        http_response_code(403);
        echo json_encode(['error' => 'No tienes permisos para editar']);
        exit;
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos inválidos']);
        exit;
    }
    
    $input['lastUpdated'] = date('c');
    $input['updatedBy'] = $session['username'];
    
    $saved = file_put_contents($dataFile, json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    if ($saved === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al guardar']);
        exit;
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Datos guardados correctamente'
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Método no permitido']);
?>