<?php
/**
 * Bali Stay Collection - Database Configuration & PDO Helper
 * Otomatis mendeteksi lingkungan Lokal (XAMPP) atau Produksi (Hostinger).
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

// CORS headers agar frontend React dapat berkomunikasi lancar
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$httpHost = $_SERVER['HTTP_HOST'] ?? 'localhost';
$hostParts = explode(':', $httpHost);
$isLocal = in_array($hostParts[0], ['localhost', '127.0.0.1', '::1']);

if ($isLocal) {
    // Pengaturan XAMPP Lokal
    $db_host = '127.0.0.1';
    $db_port = '3306';
    $db_name = 'balistay_db';
    $db_user = 'root';
    $db_pass = '';
} else {
    // Pengaturan Hostinger (dapat menggunakan env var atau diisi nanti saat migrasi)
    $db_host = getenv('DB_HOST') ?: 'localhost';
    $db_port = getenv('DB_PORT') ?: '3306';
    $db_name = getenv('DB_NAME') ?: 'u123456789_balistay';
    $db_user = getenv('DB_USER') ?: 'u123456789_admin';
    $db_pass = getenv('DB_PASS') ?: 'YourPasswordHere';
}

try {
    $pdo = new PDO(
        "mysql:host={$db_host};port={$db_port};dbname={$db_name};charset=utf8mb4",
        $db_user,
        $db_pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit();
}
