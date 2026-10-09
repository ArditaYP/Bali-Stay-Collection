<?php
/**
 * Bali Stay Collection - Villas REST API Endpoint
 * 
 * GET  /api/villas.php         -> Mengambil semua data villa
 * GET  /api/villas.php?id=xxx  -> Mengambil 1 data villa berdasarkan ID
 * POST /api/villas.php         -> Menyimpan / memperbarui data villa (dari #editor)
 */

require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

/**
 * Format baris database menjadi objek villa yang siap dikonsumsi frontend
 */
function formatVillaRow($row) {
    if (!$row) return null;

    $rawData = !empty($row['raw_data']) ? json_decode($row['raw_data'], true) : [];
    if (!is_array($rawData)) $rawData = [];

    // Prioritaskan kolom spesifik di DB, fallback ke rawData
    $villa = array_merge($rawData, [
        'id' => $row['id'],
        'name' => $row['name'],
        'area' => $row['area'] ?: ($row['location'] ?: 'Bali'),
        'location' => $row['location'] ?: ($row['area'] ?: 'Bali'),
        'address' => $row['address'] ?: ($row['location'] ?: 'Bali'),
        'category' => $row['category'] ?: 'Premium',
        'tier' => $row['tier'] ?: 'Premium',
        'price' => $row['price'] !== null ? floatval($row['price']) : null,
        'beds' => intval($row['beds'] ?? 1),
        'baths' => intval($row['baths'] ?? 1),
        'bathrooms' => intval($row['bathrooms'] ?? ($row['baths'] ?? 1)),
        'guests' => intval($row['guests'] ?? 2),
        'rating' => floatval($row['rating'] ?? 4.90),
        'reviewsCount' => intval($row['reviews_count'] ?? 0),
        'shortDesc' => $row['short_desc'] ?: '',
        'desc' => $row['short_desc'] ?: ($row['description'] ?: ''),
        'description' => $row['description'] ?: '',
        'fullDesc' => $row['full_desc'] ?: ($row['description'] ?: ''),
        'why' => $row['why'] ?: '',
        'cancel' => $row['cancel'] ?: '',
        'verified' => (bool)$row['verified'],
        'updated' => $row['updated'] ?: 'Recent',
        'pick' => (bool)$row['pick'],
        'img' => $row['img'] ?: '',
        'tone' => !empty($row['tone']) ? json_decode($row['tone'], true) : ['#B9C7CF', '#E4EBEE'],
        'images' => !empty($row['images']) ? json_decode($row['images'], true) : ($row['img'] ? [$row['img']] : []),
        'photoCaptions' => !empty($rawData['photoCaptions']) ? $rawData['photoCaptions'] : [],
        'trips' => !empty($row['trips']) ? json_decode($row['trips'], true) : [],
        'setting' => !empty($row['setting']) ? json_decode($row['setting'], true) : [],
        'amenities' => !empty($row['amenities']) ? json_decode($row['amenities'], true) : [],
        'am' => !empty($row['am']) ? json_decode($row['am'], true) : [],
        'sc' => !empty($row['sc']) ? json_decode($row['sc'], true) : [2, 2, 2, 2, 2],
        'know' => !empty($row['know']) ? json_decode($row['know'], true) : [],
    ]);

    return $villa;
}

try {
    if ($method === 'GET') {
        // Ambil 1 villa berdasarkan ID
        if (isset($_GET['id']) && trim($_GET['id']) !== '') {
            $stmt = $pdo->prepare("SELECT * FROM `villas` WHERE `id` = :id LIMIT 1");
            $stmt->execute([':id' => trim($_GET['id'])]);
            $row = $stmt->fetch();

            if (!$row) {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'Villa tidak ditemukan']);
                exit();
            }

            echo json_encode(['success' => true, 'villa' => formatVillaRow($row)], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            exit();
        }

        // Ambil semua villa
        $stmt = $pdo->query("SELECT * FROM `villas` ORDER BY `id` ASC");
        $rows = $stmt->fetchAll();
        $villas = array_map('formatVillaRow', $rows);

        echo json_encode([
            'success' => true,
            'count' => count($villas),
            'villas' => $villas
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit();
    }

    if ($method === 'POST' || $method === 'PUT') {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        if (!$data) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Payload JSON tidak valid']);
            exit();
        }

        // Jika berupa array banyak villa (batch update)
        $itemsToSave = isset($data['villas']) ? $data['villas'] : (is_array($data) && isset($data[0]) ? $data : [$data]);

        $updateSql = "
        INSERT INTO `villas` (
          `id`, `name`, `area`, `location`, `address`, `category`, `tier`,
          `price`, `beds`, `baths`, `bathrooms`, `guests`,
          `short_desc`, `description`, `full_desc`, `img`, `images`, `amenities`, `am`, `raw_data`
        ) VALUES (
          :id, :name, :area, :location, :address, :category, :tier,
          :price, :beds, :baths, :bathrooms, :guests,
          :short_desc, :description, :full_desc, :img, :images, :amenities, :am, :raw_data
        ) ON DUPLICATE KEY UPDATE
          `name` = VALUES(`name`),
          `area` = VALUES(`area`),
          `location` = VALUES(`location`),
          `address` = VALUES(`address`),
          `category` = VALUES(`category`),
          `tier` = VALUES(`tier`),
          `price` = VALUES(`price`),
          `beds` = VALUES(`beds`),
          `baths` = VALUES(`baths`),
          `bathrooms` = VALUES(`bathrooms`),
          `guests` = VALUES(`guests`),
          `short_desc` = VALUES(`short_desc`),
          `description` = VALUES(`description`),
          `full_desc` = VALUES(`full_desc`),
          `img` = VALUES(`img`),
          `images` = VALUES(`images`),
          `amenities` = VALUES(`amenities`),
          `am` = VALUES(`am`),
          `raw_data` = VALUES(`raw_data`);
        ";

        $stmt = $pdo->prepare($updateSql);

        $savedCount = 0;
        foreach ($itemsToSave as $v) {
            if (empty($v['id'])) continue;

            $tier = $v['tier'] ?? ($v['category'] ?? 'Premium');
            $category = $v['category'] ?? ($v['tier'] ?? 'Premium');
            $amenities = isset($v['amenities']) ? (is_array($v['amenities']) ? $v['amenities'] : []) : [];
            $am = isset($v['am']) ? (is_array($v['am']) ? $v['am'] : []) : $amenities;

            $images = isset($v['images']) ? (is_array($v['images']) ? $v['images'] : json_decode($v['images'], true)) : [];
            if (!is_array($images)) $images = [];
            $img = !empty($v['img']) ? $v['img'] : (!empty($images[0]) ? $images[0] : '');
            $photoCaptions = isset($v['photoCaptions']) ? (is_array($v['photoCaptions']) ? $v['photoCaptions'] : json_decode($v['photoCaptions'], true)) : [];
            if (!is_array($photoCaptions)) $photoCaptions = [];

            // Sinkronkan ke raw_data agar metadata lengkap tetap terjaga
            $rawData = isset($v['raw_data']) && is_array($v['raw_data']) ? $v['raw_data'] : $v;
            $rawData['photoCaptions'] = $photoCaptions;
            $rawData['images'] = $images;
            $rawData['img'] = $img;

            $stmt->execute([
                ':id' => $v['id'],
                ':name' => $v['name'] ?? '',
                ':area' => $v['area'] ?? ($v['location'] ?? 'Bali'),
                ':location' => $v['location'] ?? ($v['area'] ?? 'Bali'),
                ':address' => $v['address'] ?? ($v['location'] ?? 'Bali'),
                ':category' => $category,
                ':tier' => $tier,
                ':price' => isset($v['price']) && $v['price'] !== null ? floatval($v['price']) : null,
                ':beds' => intval($v['beds'] ?? 1),
                ':baths' => intval($v['baths'] ?? ($v['bathrooms'] ?? 1)),
                ':bathrooms' => intval($v['bathrooms'] ?? ($v['baths'] ?? 1)),
                ':guests' => intval($v['guests'] ?? 2),
                ':short_desc' => $v['shortDesc'] ?? ($v['desc'] ?? ''),
                ':description' => $v['description'] ?? ($v['desc'] ?? ''),
                ':full_desc' => $v['fullDesc'] ?? ($v['description'] ?? ''),
                ':img' => $img,
                ':images' => json_encode($images, JSON_UNESCAPED_SLASHES),
                ':amenities' => json_encode($amenities),
                ':am' => json_encode($am),
                ':raw_data' => json_encode($rawData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
            ]);

            // Sinkronkan juga ke ID alias jika villa memiliki nama ID alternatif (st-lau <-> st-lau-ubud, dll)
            $aliasMap = [
                'st-lau' => 'st-lau-ubud',
                'st-lau-ubud' => 'st-lau',
                'balangan-cliff-villa' => 'iconic-cliff-top-villa',
                'iconic-cliff-top-villa' => 'balangan-cliff-villa',
                'villa-angkasa' => 'angkasa-ubud',
                'angkasa-ubud' => 'villa-angkasa',
                'the-palms-villa-canggu' => 'villa-habitas',
                'villa-habitas' => 'the-palms-villa-canggu'
            ];
            if (isset($aliasMap[$v['id']])) {
                $aliasId = $aliasMap[$v['id']];
                $stmt->execute([
                    ':id' => $aliasId,
                    ':name' => $v['name'] ?? '',
                    ':area' => $v['area'] ?? ($v['location'] ?? 'Bali'),
                    ':location' => $v['location'] ?? ($v['area'] ?? 'Bali'),
                    ':address' => $v['address'] ?? ($v['location'] ?? 'Bali'),
                    ':category' => $category,
                    ':tier' => $tier,
                    ':price' => isset($v['price']) && $v['price'] !== null ? floatval($v['price']) : null,
                    ':beds' => intval($v['beds'] ?? 1),
                    ':baths' => intval($v['baths'] ?? ($v['bathrooms'] ?? 1)),
                    ':bathrooms' => intval($v['bathrooms'] ?? ($v['baths'] ?? 1)),
                    ':guests' => intval($v['guests'] ?? 2),
                    ':short_desc' => $v['shortDesc'] ?? ($v['desc'] ?? ''),
                    ':description' => $v['description'] ?? ($v['desc'] ?? ''),
                    ':full_desc' => $v['fullDesc'] ?? ($v['description'] ?? ''),
                    ':img' => $img,
                    ':images' => json_encode($images, JSON_UNESCAPED_SLASHES),
                    ':amenities' => json_encode($amenities),
                    ':am' => json_encode($am),
                    ':raw_data' => json_encode($rawData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
                ]);
            }
            $savedCount++;
        }

        echo json_encode([
            'success' => true,
            'message' => "Berhasil menyimpan {$savedCount} villa ke database MySQL 'balistay_db'!",
            'saved_count' => $savedCount
        ]);
        exit();
    }

    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Metode HTTP tidak diizinkan']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
