<?php
header('Content-Type: application/json');

function getBearerToken() {
    $token = '';
    if (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $token = str_replace('Bearer ', '', $_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
    } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $token = str_replace('Bearer ', '', $_SERVER['HTTP_AUTHORIZATION']);
    } elseif (function_exists('getallheaders')) {
        $headers = getallheaders();
        $token = str_replace('Bearer ', '', $headers['Authorization'] ?? '');
    }
    return $token;
}

echo json_encode([
    'success' => true,
    'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown',
    'token_found' => !empty(getBearerToken()),
    'token_value' => getBearerToken(),
    'server_vars' => [
        'REDIRECT_HTTP_AUTHORIZATION' => $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? 'NO EXISTE',
        'HTTP_AUTHORIZATION' => $_SERVER['HTTP_AUTHORIZATION'] ?? 'NO EXISTE',
        'REQUEST_METHOD' => $_SERVER['REQUEST_METHOD'] ?? 'NO EXISTE',
    ],
    'php_version' => PHP_VERSION,
    'apache_modules' => function_exists('apache_get_modules') ? apache_get_modules() : 'no disponible'
]);
?>