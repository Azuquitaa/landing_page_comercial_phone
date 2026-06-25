<?php
/**
 * API de Backup y Restauración
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$contentFile = __DIR__ . '/../data/content.json';
$backupFile = __DIR__ . '/../data/backup.json';
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

if (strtotime($session['expires_at']) < time()) {
    http_response_code(401);
    echo json_encode(['error' => 'Token expirado']);
    exit;
}

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'backup':
        if (!file_exists($contentFile)) {
            echo json_encode(['error' => 'No hay datos para respaldar']);
            exit;
        }
        
        copy($contentFile, $backupFile);
        echo json_encode([
            'success' => true,
            'message' => 'Backup creado exitosamente',
            'timestamp' => date('c')
        ]);
        break;
        
    case 'restore':
        if (!file_exists($backupFile)) {
            echo json_encode(['error' => 'No hay backup disponible']);
            exit;
        }
        
        copy($backupFile, $contentFile);
        echo json_encode([
            'success' => true,
            'message' => 'Datos restaurados desde backup',
            'timestamp' => date('c')
        ]);
        break;
        
    case 'reset':
        // Solo admin puede resetear
        if ($session['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['error' => 'Solo administradores pueden resetear']);
            exit;
        }
        
        $initialData = [
            'plansHogar' => [],
            'plansMovil' => [],
            'slides' => [],
            'faqs' => [],
            'lastUpdated' => date('c'),
            'resetBy' => $session['username']
        ];
        
        file_put_contents($contentFile, json_encode($initialData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        
        echo json_encode([
            'success' => true,
            'message' => 'Datos reseteados a valores iniciales',
            'timestamp' => date('c')
        ]);
        break;
        
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Acción no válida']);
}
?>