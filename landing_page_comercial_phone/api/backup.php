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

// ✅ FUNCIÓN PARA OBTENER TOKEN (compatible Ubuntu y Windows)
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

$token = getBearerToken();

file_put_contents(__DIR__ . '/../data/debug_backup.log', 
    "=== BACKUP TOKEN CHECK ===\n" .
    "Fecha: " . date('c') . "\n" .
    "Acción: " . ($_GET['action'] ?? 'ninguna') . "\n" .
    "Token recibido: [" . $token . "]\n" .
    "REDIRECT: " . (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION']) ? 'SI' : 'NO') . "\n" .
    "HTTP_AUTH: " . (isset($_SERVER['HTTP_AUTHORIZATION']) ? 'SI' : 'NO') . "\n" .
    "==========================\n",
    FILE_APPEND
);

if (empty($token)) {
    http_response_code(401);
    echo json_encode(['error' => 'Token no proporcionado']);
    exit;
}

if (!file_exists($sessionsFile)) {
    http_response_code(401);
    echo json_encode(['error' => 'No autorizado (archivo sessions.json no existe)']);
    exit;
}

$sessions = json_decode(file_get_contents($sessionsFile), true) ?: [];

if (!isset($sessions[$token])) {
    http_response_code(401);
    echo json_encode(['error' => 'Token inválido (no está en sessions.json)']);
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
        
        $content = file_get_contents($contentFile);
        $result = file_put_contents($backupFile, $content);
        
        if ($result === false) {
            echo json_encode([
                'error' => 'No se pudo crear backup. Verifica permisos de escritura en /data/',
                'debug' => ['backupFile' => $backupFile]
            ]);
            exit;
        }
        
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

        // ✅ LEER el backup ANTES de validar
        $backupData = json_decode(file_get_contents($backupFile), true);

        if (!$backupData) {
            http_response_code(500);
            echo json_encode(['error' => 'Backup corrupto o ilegible']);
            exit;
        }

        // ✅ Validación: Evitar restaurar un backup viejo sin planes Pymes
        if (!isset($backupData['plansPymes'])) {
            http_response_code(400);
            echo json_encode(['error' => 'El backup es antiguo y no contiene planes Pymes. Restauración cancelada.']);
            exit;
        }

        // ✅ Rellenar contactInfo si el backup es viejo
        if (!isset($backupData['contactInfo'])) {
            $backupData['contactInfo'] = [
                'whatsappNumber'    => '541137888582',
                'whatsappMessage'   => 'Hola! Me interesa conocer los planes disponibles.',
                'phoneNumber'       => '+54 11 3788-8582',
                'email'             => 'contacto@comercialphone.com',
                'instagramCorp'     => 'comercialphone',
                'instagramPersonal' => 'comercialphone.personal',
            ];
            file_put_contents($backupFile, json_encode($backupData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        }

        copy($backupFile, $contentFile);
        echo json_encode([
            'success' => true,
            'message' => 'Datos restaurados desde backup',
            'timestamp' => date('c')
        ]);
        break;
        
    case 'reset':
        if ($session['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['error' => 'Solo administradores pueden resetear']);
            exit;
        }
        
        $initialData = [
            'plansHogar' => [],
            'plansMovil' => [],
            'plansPymes' => [],
            'slides' => [],
            'faqs' => [],
            'contactInfo' => [
                'whatsappNumber'    => '541137888582',
                'whatsappMessage'   => 'Hola! Me interesa conocer los planes disponibles.',
                'phoneNumber'       => '+54 11 3788-8582',
                'email'             => 'contacto@comercialphone.com',
                'instagramCorp'     => 'comercialphone',
                'instagramPersonal' => 'comercialphone.personal',
            ],
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