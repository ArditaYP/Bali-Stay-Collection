<?php
/**
 * Bali Stay Collection - Photo Upload API Endpoint
 * Menerima upload file foto dari form #editor, melakukan validasi keamanan,
 * optimasi resolusi gambar (GD), dan menyimpannya di folder uploads/villas/.
 */

require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Metode HTTP tidak diizinkan. Gunakan POST.']);
    exit();
}

if (!isset($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
    $errCode = $_FILES['photo']['error'] ?? 'FILE_MISSING';
    $errMap = [
        UPLOAD_ERR_INI_SIZE => 'Ukuran file melebihi upload_max_filesize di php.ini.',
        UPLOAD_ERR_FORM_SIZE => 'Ukuran file melebihi MAX_FILE_SIZE formulir.',
        UPLOAD_ERR_PARTIAL => 'File hanya terunggah sebagian.',
        UPLOAD_ERR_NO_FILE => 'Tidak ada file yang dipilih untuk diunggah.',
        UPLOAD_ERR_NO_TMP_DIR => 'Folder sementara server hilang.',
        UPLOAD_ERR_CANT_WRITE => 'Gagal menulis file ke disk server.',
        UPLOAD_ERR_EXTENSION => 'Upload file dihentikan oleh ekstensi PHP.'
    ];
    $errMsg = $errMap[$errCode] ?? 'Gagal mengunggah file (Kode: ' . $errCode . ').';
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $errMsg]);
    exit();
}

$file = $_FILES['photo'];
$maxBytes = 20 * 1024 * 1024; // 20 MB

if ($file['size'] > $maxBytes) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Ukuran foto maksimal 20 MB.']);
    exit();
}

// Validasi tipe file
$allowedMimes = [
    'image/jpeg' => 'jpg',
    'image/jpg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
    'image/avif' => 'avif'
];

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!isset($allowedMimes[$mimeType])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Format file tidak didukung. Harap unggah format JPG, PNG, atau WebP. (MIME: ' . $mimeType . ')']);
    exit();
}

$ext = $allowedMimes[$mimeType];
$villaId = preg_replace('/[^a-zA-Z0-9_\-]/', '', $_POST['villa_id'] ?? 'villa');
if (empty($villaId)) $villaId = 'villa';

$uploadDir = dirname(__DIR__) . '/uploads/villas/';
if (!is_dir($uploadDir)) {
    @mkdir($uploadDir, 0755, true);
}

$uniqueName = $villaId . '_' . date('Ymd_His') . '_' . substr(bin2hex(random_bytes(4)), 0, 8);
$targetPath = $uploadDir . $uniqueName . '.' . $ext;
$publicUrl = '/uploads/villas/' . $uniqueName . '.' . $ext;

// Optimasi & Resize jika GD tersedia dan resolusi lebih besar dari 2000px
$processed = false;
if (extension_loaded('gd')) {
    try {
        list($origWidth, $origHeight) = @getimagesize($file['tmp_name']);
        if ($origWidth > 0 && $origHeight > 0) {
            $maxDim = 2000;
            if ($origWidth > $maxDim || $origHeight > $maxDim) {
                $ratio = min($maxDim / $origWidth, $maxDim / $origHeight);
                $newWidth = (int)round($origWidth * $ratio);
                $newHeight = (int)round($origHeight * $ratio);

                $srcImg = null;
                switch ($mimeType) {
                    case 'image/jpeg':
                    case 'image/jpg':
                        $srcImg = @imagecreatefromjpeg($file['tmp_name']);
                        break;
                    case 'image/png':
                        $srcImg = @imagecreatefrompng($file['tmp_name']);
                        break;
                    case 'image/webp':
                        if (function_exists('imagecreatefromwebp')) {
                            $srcImg = @imagecreatefromwebp($file['tmp_name']);
                        }
                        break;
                }

                if ($srcImg) {
                    $dstImg = imagecreatetruecolor($newWidth, $newHeight);
                    // Pertahankan transparansi PNG / WebP
                    if ($mimeType === 'image/png' || $mimeType === 'image/webp') {
                        imagealphablending($dstImg, false);
                        imagesavealpha($dstImg, true);
                    }

                    imagecopyresampled($dstImg, $srcImg, 0, 0, 0, 0, $newWidth, $newHeight, $origWidth, $origHeight);

                    if ($ext === 'jpg') {
                        imagejpeg($dstImg, $targetPath, 88);
                    } elseif ($ext === 'png') {
                        imagepng($dstImg, $targetPath, 8);
                    } elseif ($ext === 'webp' && function_exists('imagewebp')) {
                        imagewebp($dstImg, $targetPath, 88);
                    }

                    imagedestroy($srcImg);
                    imagedestroy($dstImg);
                    $processed = true;
                }
            }
        }
    } catch (Exception $e) {
        $processed = false;
    }
}

// Fallback jika tidak di-resize: pindahkan file asli
if (!$processed) {
    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Gagal memindahkan file ke folder uploads.']);
        exit();
    }
}

echo json_encode([
    'success' => true,
    'message' => 'Foto berhasil diunggah!',
    'url' => $publicUrl,
    'filename' => basename($targetPath),
    'size' => filesize($targetPath)
], JSON_UNESCAPED_SLASHES);
