<?php
/**
 * Bali Stay Collection - Homepage Media & Content API Endpoint
 * Menyediakan endpoint REST API untuk membaca dan memperbarui foto serta teks
 * pada seksi halaman utama (Destinations, Experiences, Hero).
 * 
 * Metode:
 *  - GET: Mengambil daftar media aktif halaman utama
 *  - POST: Menyimpan pembaruan foto & teks dari editor halaman utama
 */

require_once __DIR__ . '/config.php';

// $pdo sudah didefinisikan di config.php
global $pdo;

// Data default cadangan jika database belum terisi atau sedang offline
$defaultDestinations = [
    [
        'id' => 'dest_pererenan',
        'name' => 'Pererenan',
        'title' => 'Pererenan',
        'badge' => 'Chill & Surf',
        'description' => 'Quieter neighbour to Canggu with artisan cafés, local lanes, and easy beach breaks.',
        'image' => '/destinations/pererenan.jpg',
        'fallback_image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85'
    ],
    [
        'id' => 'dest_canggu',
        'name' => 'Canggu & Berawa',
        'title' => 'Canggu & Berawa',
        'badge' => '★ Most Popular Hub',
        'description' => 'Cafés, iconic beach clubs, and legendary surf breaks. The most vibrant epicenter of coastal Bali.',
        'image' => '/destinations/canggu.jpg?v=20261008',
        'fallback_image' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85'
    ],
    [
        'id' => 'dest_uluwatu',
        'name' => 'Uluwatu & Bukit',
        'title' => 'Uluwatu & Bukit',
        'badge' => 'Clifftops & Sunsets',
        'description' => 'Dramatic ocean limestone cliffs, world-class surf, and sunset beach clubs.',
        'image' => '/destinations/uluwatu.jpg?v=20261008',
        'fallback_image' => 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=85'
    ],
    [
        'id' => 'dest_ubud',
        'name' => 'Ubud & Gianyar',
        'title' => 'Ubud & Gianyar',
        'badge' => 'Quiet Jungle & Art',
        'description' => 'Lush ravines, rice-field walks, and holistic culture away from coastal rush.',
        'image' => '/destinations/ubud.jpg?v=20261008',
        'fallback_image' => 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85'
    ],
    [
        'id' => 'dest_seminyak',
        'name' => 'Umalas & Seminyak',
        'title' => 'Umalas & Seminyak',
        'badge' => 'Style & Dining',
        'description' => 'Fine dining, upscale boutiques, and peaceful residential lanes close to action.',
        'image' => '/destinations/seminyak.jpg?v=20261008',
        'fallback_image' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85'
    ],
    [
        'id' => 'dest_sanur',
        'name' => 'Sanur & East Bali',
        'title' => 'Sanur & East Bali',
        'badge' => 'Calm Waters & Sunrise',
        'description' => 'Paved beachfront promenade, tranquil shallow seas, and classic island warmth.',
        'image' => '/destinations/sanur.jpg?v=20261008',
        'fallback_image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85'
    ]
];

$defaultExperiences = [
    [
        'id' => 'exp_airport',
        'title' => 'Airport Transfer',
        'desc' => 'Private arrival and departure service.',
        'image' => 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=84'
    ],
    [
        'id' => 'exp_chef',
        'title' => 'Private Chef',
        'desc' => 'Breakfast, dinner and special occasions.',
        'image' => 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=84'
    ],
    [
        'id' => 'exp_wellness',
        'title' => 'Wellness',
        'desc' => 'In-villa massage, yoga and spa rituals.',
        'image' => 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=84'
    ],
    [
        'id' => 'exp_explore',
        'title' => 'Explore Bali',
        'desc' => 'Drivers, day trips and local experiences.',
        'image' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=84'
    ]
];

$defaultHero = [
    'headline' => 'The villa you’ve been looking for is already here.',
    'lead' => 'Hand-picked private villas. On-the-ground local support',
    'bgImage' => ''
];

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (!$pdo) {
        echo json_encode([
            'success' => true,
            'source' => 'fallback',
            'destinations' => $defaultDestinations,
            'experiences' => $defaultExperiences,
            'hero' => $defaultHero
        ]);
        exit();
    }

    try {
        $stmt = $pdo->query("SELECT * FROM homepage_media ORDER BY section ASC, display_order ASC");
        $rows = $stmt->fetchAll();

        $destinations = [];
        $experiences = [];
        $hero = $defaultHero;

        foreach ($rows as $r) {
            if ($r['section'] === 'destinations') {
                $destinations[] = [
                    'id' => $r['id'],
                    'name' => $r['title'],
                    'title' => $r['title'],
                    'badge' => $r['badge'] ?? '',
                    'description' => $r['description'] ?? '',
                    'image' => $r['image'],
                    'fallback_image' => $r['fallback_image'] ?? $r['image']
                ];
            } elseif ($r['section'] === 'experiences') {
                $experiences[] = [
                    'id' => $r['id'],
                    'title' => $r['title'],
                    'desc' => $r['description'] ?? '',
                    'image' => $r['image']
                ];
            } elseif ($r['section'] === 'hero') {
                $hero = [
                    'headline' => $r['title'] ?: $defaultHero['headline'],
                    'lead' => $r['description'] ?: $defaultHero['lead'],
                    'bgImage' => $r['image'] ?: ''
                ];
            }
        }

        echo json_encode([
            'success' => true,
            'source' => 'database',
            'destinations' => count($destinations) > 0 ? $destinations : $defaultDestinations,
            'experiences' => count($experiences) > 0 ? $experiences : $defaultExperiences,
            'hero' => $hero
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'success' => true,
            'source' => 'fallback',
            'destinations' => $defaultDestinations,
            'experiences' => $defaultExperiences,
            'hero' => $defaultHero,
            'error' => $e->getMessage()
        ]);
    }
    exit();
}

if ($method === 'POST') {
    if (!$pdo) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Koneksi database MySQL tidak tersedia.']);
        exit();
    }

    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data || !is_array($data)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Payload JSON tidak valid.']);
        exit();
    }

    try {
        $pdo->beginTransaction();

        // 1. Simpan Destinasi
        if (!empty($data['destinations']) && is_array($data['destinations'])) {
            $order = 1;
            foreach ($data['destinations'] as $dest) {
                $id = $dest['id'] ?? ('dest_' . preg_replace('/[^a-z0-9]/', '', strtolower($dest['title'] ?? $dest['name'] ?? '')));
                $title = $dest['title'] ?? $dest['name'] ?? '';
                $badge = $dest['badge'] ?? '';
                $desc = $dest['description'] ?? '';
                $img = $dest['image'] ?? '';
                $fallback = $dest['fallback_image'] ?? $img;

                $stmt = $pdo->prepare("
                    INSERT INTO homepage_media 
                    (id, section, title, badge, description, image, fallback_image, display_order)
                    VALUES (:id, 'destinations', :title, :badge, :desc, :img, :fallback, :order)
                    ON DUPLICATE KEY UPDATE
                    title = VALUES(title), badge = VALUES(badge), description = VALUES(description), 
                    image = VALUES(image), fallback_image = VALUES(fallback_image), display_order = VALUES(display_order)
                ");
                $stmt->execute([
                    ':id' => $id,
                    ':title' => $title,
                    ':badge' => $badge,
                    ':desc' => $desc,
                    ':img' => $img,
                    ':fallback' => $fallback,
                    ':order' => $order++
                ]);
            }
        }

        // 2. Simpan Experiences
        if (!empty($data['experiences']) && is_array($data['experiences'])) {
            $order = 1;
            foreach ($data['experiences'] as $exp) {
                $id = $exp['id'] ?? ('exp_' . preg_replace('/[^a-z0-9]/', '', strtolower($exp['title'] ?? '')));
                $title = $exp['title'] ?? '';
                $desc = $exp['desc'] ?? $exp['description'] ?? '';
                $img = $exp['image'] ?? '';

                $stmt = $pdo->prepare("
                    INSERT INTO homepage_media 
                    (id, section, title, description, image, display_order)
                    VALUES (:id, 'experiences', :title, :desc, :img, :order)
                    ON DUPLICATE KEY UPDATE
                    title = VALUES(title), description = VALUES(description), 
                    image = VALUES(image), display_order = VALUES(display_order)
                ");
                $stmt->execute([
                    ':id' => $id,
                    ':title' => $title,
                    ':desc' => $desc,
                    ':img' => $img,
                    ':order' => $order++
                ]);
            }
        }

        // 3. Simpan Hero jika ada
        if (!empty($data['hero']) && is_array($data['hero'])) {
            $hero = $data['hero'];
            $headline = $hero['headline'] ?? $defaultHero['headline'];
            $lead = $hero['lead'] ?? $defaultHero['lead'];
            $bgImg = $hero['bgImage'] ?? '';

            $stmt = $pdo->prepare("
                INSERT INTO homepage_media 
                (id, section, title, description, image, display_order)
                VALUES ('hero_main', 'hero', :title, :desc, :img, 1)
                ON DUPLICATE KEY UPDATE
                title = VALUES(title), description = VALUES(description), image = VALUES(image)
            ");
            $stmt->execute([
                ':title' => $headline,
                ':desc' => $lead,
                ':img' => $bgImg
            ]);
        }

        $pdo->commit();

        echo json_encode([
            'success' => true,
            'message' => 'Konten dan foto halaman depan berhasil diperbarui di database.'
        ]);
    } catch (Exception $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Gagal menyimpan perubahan ke database: ' . $e->getMessage()
        ]);
    }
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Metode HTTP tidak didukung.']);
