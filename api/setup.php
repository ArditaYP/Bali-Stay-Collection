<?php
/**
 * Bali Stay Collection - Database Migration & Seeder
 * Jalankan file ini melalui browser: http://localhost:8080/BaliStayCollection/api/setup.php
 * atau via CLI: php api/setup.php
 */

require_once __DIR__ . '/config.php';

header('Content-Type: application/json');

try {
    // 1. Buat Tabel `villas`
    $createTableSql = "
    CREATE TABLE IF NOT EXISTS `villas` (
      `id` VARCHAR(100) NOT NULL PRIMARY KEY,
      `name` VARCHAR(255) NOT NULL,
      `area` VARCHAR(100) DEFAULT NULL,
      `location` VARCHAR(255) DEFAULT NULL,
      `address` VARCHAR(255) DEFAULT NULL,
      `category` VARCHAR(100) DEFAULT 'Premium',
      `tier` VARCHAR(50) DEFAULT 'Premium',
      `price` DECIMAL(10,2) DEFAULT NULL,
      `beds` INT DEFAULT 1,
      `baths` INT DEFAULT 1,
      `bathrooms` INT DEFAULT 1,
      `guests` INT DEFAULT 2,
      `rating` DECIMAL(3,2) DEFAULT 4.90,
      `reviews_count` INT DEFAULT 0,
      `short_desc` TEXT DEFAULT NULL,
      `description` TEXT DEFAULT NULL,
      `full_desc` TEXT DEFAULT NULL,
      `why` TEXT DEFAULT NULL,
      `cancel` VARCHAR(100) DEFAULT '',
      `verified` TINYINT(1) DEFAULT 0,
      `updated` VARCHAR(100) DEFAULT '',
      `pick` TINYINT(1) DEFAULT 0,
      `tone` TEXT DEFAULT NULL,
      `img` VARCHAR(500) DEFAULT NULL,
      `images` LONGTEXT DEFAULT NULL,
      `trips` TEXT DEFAULT NULL,
      `setting` TEXT DEFAULT NULL,
      `amenities` TEXT DEFAULT NULL,
      `am` TEXT DEFAULT NULL,
      `sc` TEXT DEFAULT NULL,
      `know` TEXT DEFAULT NULL,
      `raw_data` LONGTEXT DEFAULT NULL,
      `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";

    $pdo->exec($createTableSql);

    // 2. Baca Data Seed dari seed_villas.json
    $seedFile = __DIR__ . '/seed_villas.json';
    if (!file_exists($seedFile)) {
        throw new Exception("File seed_villas.json tidak ditemukan!");
    }

    $villas = json_decode(file_get_contents($seedFile), true);
    if (!is_array($villas)) {
        throw new Exception("Gagal mem-parsing data seed_villas.json!");
    }

    $insertSql = "
    INSERT INTO `villas` (
      `id`, `name`, `area`, `location`, `address`, `category`, `tier`,
      `price`, `beds`, `baths`, `bathrooms`, `guests`, `rating`, `reviews_count`,
      `short_desc`, `description`, `full_desc`, `why`, `cancel`, `verified`,
      `updated`, `pick`, `tone`, `img`, `images`, `trips`, `setting`,
      `amenities`, `am`, `sc`, `know`, `raw_data`
    ) VALUES (
      :id, :name, :area, :location, :address, :category, :tier,
      :price, :beds, :baths, :bathrooms, :guests, :rating, :reviews_count,
      :short_desc, :description, :full_desc, :why, :cancel, :verified,
      :updated, :pick, :tone, :img, :images, :trips, :setting,
      :amenities, :am, :sc, :know, :raw_data
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
      `why` = VALUES(`why`),
      `cancel` = VALUES(`cancel`),
      `verified` = VALUES(`verified`),
      `updated` = VALUES(`updated`),
      `pick` = VALUES(`pick`),
      `tone` = VALUES(`tone`),
      `img` = VALUES(`img`),
      `images` = VALUES(`images`),
      `trips` = VALUES(`trips`),
      `setting` = VALUES(`setting`),
      `amenities` = VALUES(`amenities`),
      `am` = VALUES(`am`),
      `sc` = VALUES(`sc`),
      `know` = VALUES(`know`),
      `raw_data` = VALUES(`raw_data`);
    ";

    $stmt = $pdo->prepare($insertSql);

    $inserted = 0;
    foreach ($villas as $v) {
        $stmt->execute([
            ':id' => $v['id'],
            ':name' => $v['name'] ?? '',
            ':area' => $v['area'] ?? ($v['location'] ?? 'Bali'),
            ':location' => $v['location'] ?? ($v['area'] ?? 'Bali'),
            ':address' => $v['address'] ?? ($v['location'] ?? 'Bali'),
            ':category' => $v['category'] ?? ($v['tier'] ?? 'Premium'),
            ':tier' => $v['tier'] ?? ($v['category'] ?? 'Premium'),
            ':price' => isset($v['price']) && $v['price'] !== null ? floatval($v['price']) : null,
            ':beds' => intval($v['beds'] ?? 1),
            ':baths' => intval($v['baths'] ?? 1),
            ':bathrooms' => intval($v['bathrooms'] ?? ($v['baths'] ?? 1)),
            ':guests' => intval($v['guests'] ?? 2),
            ':rating' => floatval($v['rating'] ?? 4.90),
            ':reviews_count' => intval($v['reviewsCount'] ?? ($v['reviews_count'] ?? 0)),
            ':short_desc' => $v['shortDesc'] ?? ($v['desc'] ?? ''),
            ':description' => $v['description'] ?? ($v['desc'] ?? ''),
            ':full_desc' => $v['fullDesc'] ?? ($v['description'] ?? ''),
            ':why' => $v['why'] ?? '',
            ':cancel' => $v['cancel'] ?? '',
            ':verified' => !empty($v['verified']) ? 1 : 0,
            ':updated' => $v['updated'] ?? 'Recent',
            ':pick' => !empty($v['pick']) ? 1 : 0,
            ':tone' => json_encode($v['tone'] ?? ['#B9C7CF', '#E4EBEE']),
            ':img' => $v['img'] ?? '',
            ':images' => json_encode($v['images'] ?? ($v['img'] ? [$v['img']] : [])),
            ':trips' => json_encode($v['trips'] ?? []),
            ':setting' => json_encode($v['setting'] ?? []),
            ':amenities' => json_encode($v['amenities'] ?? ($v['am'] ?? [])),
            ':am' => json_encode($v['am'] ?? ($v['amenities'] ?? [])),
            ':sc' => json_encode($v['sc'] ?? [2, 2, 2, 2, 2]),
            ':know' => json_encode($v['know'] ?? []),
            ':raw_data' => json_encode($v)
        ]);
        $inserted++;
    }

    echo json_encode([
        'success' => true,
        'message' => "Tabel 'villas' berhasil dibuat & sebanyak {$inserted} data villa berhasil di-seed ke database MySQL 'balistay_db'!",
        'total_villas' => $inserted
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
