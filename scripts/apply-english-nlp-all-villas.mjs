/**
 * apply-english-nlp-all-villas.mjs
 * Script resmi untuk memperbarui copywriting seluruh 35 villa Bali Stay Collection
 * ke dalam BAHASA INGGRIS kelas dunia (Refined Luxury English).
 * Menggunakan teknik Hypnotic Language Patterns (NLP - VAK Sensory, Pacing & Leading)
 * dan Persuasive Mental Triggers tanpa format ulasan canggung ("X (5.0★) mengungkapkan:...").
 */

import fs from 'fs';
import path from 'path';

export const ENGLISH_NLP_VILLAS = {
  'st-lau-ubud': {
    headline: "St. Lau – Timeless Jungle Sanctuary Where Ubud's Peace Restores Your Soul",
    shortDesc: "Close your eyes for a moment and listen to the gentle rustle of Ubud's tropical forest. As you step onto your private pool deck, cool emerald waters and lush jungle foliage effortlessly wash away the noise of the world, welcoming you into profound stillness.",
    description: `Surrender your senses to the timeless peace of Ubud's highland rainforest. Stepping through the hand-carved doors of St. Lau, the earthy scent of morning dew and the cool touch of natural stone beneath your feet instantly set a rhythm of deep, unhurried relaxation.

Each of the three bedrooms is conceived as a serene pavilion with soft cotton linens, expansive glass doors, and ambient lighting that invites the tranquil jungle in. Mornings unfold on the private sundeck with birdsong drifting through the valley, while the sparkling private pool offers a refreshing respite throughout the sunny afternoon.

Tucked away in quiet seclusion yet just minutes from Ubud’s famed art markets and artisan cafés, St. Lau is your personal sanctuary. Backed by dedicated daily housekeeping and Bali Stay Collection’s on-the-ground concierge, every detail of your highland escape is effortless.`,
    why: 'Guest Highlight: "The villa looked exactly like the photos—clean, beautifully presented, and a perfect escape from reality with its quiet atmosphere." — Verified by Bali Stay Collection for authentic rainforest seclusion.'
  },

  'iconic-cliff-top-villa': {
    headline: "Balangan Cliff Villa – Iconic Cliff-Edge Oceanfront Estate with Endless Indian Ocean Sunsets",
    shortDesc: "Gaze across the boundless horizon of the Indian Ocean stretching endlessly before you. Perched majestically on Balangan’s limestone cliffs, feel the revitalizing sea breeze and watch the sunset ignite the sky in gold and crimson from your private infinity pool.",
    description: `Stand on the edge of Balangan's dramatic limestone clifftop and feel the sheer magnitude of the endless ocean before you. As the distant rhythm of rolling surf echoes up the cliffside, you realize you have arrived at one of Bali's most coveted private vantage points.

This five-bedroom architectural estate blends crisp modern lines with rugged coastal splendor. Expansive floor-to-ceiling glass pavilions frame unobstructed panoramic seascapes, seamlessly opening to sun-drenched sun loungers and a sparkling cliffside swimming pool where every evening presents a front-row seat to the sunset.

Offering exclusive seclusion, private beach pathway access, and attentive on-site butler service, Balangan Cliff Villa delivers the pinnacle of luxury coastal living, fully verified by Bali Stay Collection.`,
    why: 'Guest Highlight: "Perched right on the cliff edge like an exclusive resort, it was even more breathtaking than in the photos." — Hand-picked by Bali Stay Collection for iconic clifftop panoramas and unmatched ocean sunsets.'
  },

  'angkasa-ubud': {
    headline: "Villa Angkasa – Majestic 5BR Rainforest Infinity Villa Suspended Over Ayung Valley",
    shortDesc: "Experience the exhilarating sensation of floating above the Ayung River valley. From the crystalline infinity pool to the crisp highland air of Ubud, every breath here restores your body and calms your soul.",
    description: `Imagine stepping out onto a breathtaking infinity pool deck that appears suspended high above the lush rainforest canopy of Ubud's Ayung River. Crisp mountain air fills your lungs as morning mist gently clears to reveal endless palms and the soothing murmur of the sacred river below.

Villa Angkasa is an expansive five-bedroom haven crafted with warm ironwood beams, soaring vaulted ceilings, and airy open-plan living areas. Designed for multi-generational families and celebratory gatherings, it harmoniously balances grand communal entertaining spaces with deeply private en-suite bedroom suites.

Just moments from Ubud's vibrant culinary and cultural center, this rainforest retreat offers the ultimate balance of pristine wilderness and bespoke luxury, managed with heartfelt hospitality by Bali Stay Collection.`,
    why: 'Guest Highlight: "Absolutely stunning and surrounded by the peaceful atmosphere that makes Ubud so special. The pool and outdoor spaces made our stay unforgettable." — Verified by Bali Stay Collection for premier group escapes.'
  },

  'villa-habitas': {
    headline: "Villa Habitas – Serene 4BR Lagoon Pool Sanctuary Tucked in Quiet Pererenan",
    shortDesc: "Step into a private lagoon oasis tucked away in peaceful Pererenan. Framed by lush tropical gardens and glistening turquoise waters, immerse yourself in coastal calm just a gentle stroll from artisan cafés.",
    description: `Discover the art of slow living at Villa Habitas, where Pererenan's tranquil coastal vibe meets contemporary residential luxury. Behind discreet gates, the outside world fades into serenity, replaced by the gentle lap of water in a curvaceous lagoon-style private pool framed by flowering frangipanis.

This four-bedroom sanctuary is thoughtfully designed with effortless indoor-outdoor flow. Cool terrazzo floors, plush oversized daybeds, and sunlit tropical bathrooms ensure every moment feels like an unhurried retreat from the ordinary.

Located on a peaceful lane within walking distance to beloved artisan eateries, surf spots, and boutique wellness spas, Villa Habitas offers total peace of mind with attentive daily care from Bali Stay Collection.`,
    why: 'Guest Highlight: "Incredible location close to restaurants and spas, walkable with a toddler, and staffed with warm, helpful hospitality." — Selected by Bali Stay Collection for family-friendly coastal tranquility.'
  },

  'tranquil-sanctuary-pererenan': {
    headline: "Tranquil Sanctuary – Romantic 1BR Private Haven Where Intimacy Meets Coastal Calm",
    shortDesc: "Wake to soft sunlight filtering through sheer drapes and step directly into your private sunlit pool. A chic one-bedroom mezzanine retreat where romance, privacy, and serene coastal charm intertwine.",
    description: `Crafted as an intimate hideaway for couples, Tranquil Sanctuary Pererenan captures the essence of romantic seclusion. Natural timber textures, soaring mezzanine ceilings, and bohemian design elements create a cozy, sunlit atmosphere that immediately feels like home.

Upstairs, a plush king-size bed wrapped in crisp white linens promises restorative sleep. Downstairs, full-width glass doors slide open completely to your private courtyard pool, inviting refreshing morning dips accompanied only by the soft whisper of tropical breeze.

Peacefully tucked away on a quiet residential lane yet just minutes from Pererenan's best beachside restaurants, this retreat is accompanied by dedicated daily housekeeping and attentive concierge support.`,
    why: 'Guest Highlight: "Private yet convenient, beautifully maintained, and the perfect romantic size for two." — Bali Stay Collection’s top recommendation for honeymoons and intimate romantic escapes.'
  },

  'tropical-canggu-villa': {
    headline: "Casa Kameeyla – Sun-Drenched 4BR Tropical Villa in Central Canggu",
    shortDesc: "Bask in the golden sunlight of Canggu across breezy open-concept living spaces and a crystalline private pool. A vibrant family sanctuary where modern tropical design meets prime beachside lifestyle.",
    description: `Welcome to Casa Kameeyla, a sun-kissed four-bedroom villa conceived for effortless family living and relaxed group gatherings. Wide-open architectural lines, soaring pitched ceilings, and seamless flow between the interior lounge and the poolside garden create an inviting atmosphere bathed in natural light.

Four air-conditioned bedrooms with private en-suite bathrooms offer quiet sanctuaries after sun-soaked days at the beach. The chef-ready kitchen and long solid timber dining table provide the ultimate setting for relaxed home-cooked dinners and evening laughter.

While blissfully quiet and private inside, the villa places you just minutes from Canggu’s world-famous surf breaks, organic cafés, and beach clubs, supported by attentive daily housekeeping from Bali Stay Collection.`,
    why: 'Guest Highlight: "Light, airy, and beautifully designed with great indoor-outdoor flow and a private pool our family loved." — Curated by Bali Stay Collection for premier family living in central Canggu.'
  },

  'luxe-beach-villa-seminyak': {
    headline: "Luxe Beach Villa – Architectural 3BR Coastal Hideaway Steps from Seminyak Beach",
    shortDesc: "Experience the luxury of soaring architectural ceilings and sunken poolside lounging just moments from Seminyak Beach. An oasis of calm where chic boutique shopping meets pure private seclusion.",
    description: `Make an unforgettable entrance into a realm of sophisticated coastal design. Luxe Beach Villa captivates at first sight with dramatic vaulted timber ceilings, expansive floor-to-ceiling glass, and a luminous interior that flows directly into a lush walled tropical garden.

Sink into the custom sunken lounge sofa overlooking the sparkling private pool, cocktail in hand, as warm sea breezes filter through swaying palms. Three stylish bedroom suites feature minimalist aesthetic finishes, luxury mattresses, and spa-inspired en-suite bathrooms.

Positioned on an exclusive private cul-de-sac within effortless walking distance to Seminyak's world-class dining, beach clubs, and ocean waves, this villa guarantees complete privacy with daily BSC concierge care.`,
    why: 'Guest Highlight: "Stunning aesthetics with high sloping roofs, clear pool water, and a cozy sunken sofa perfect for slow-paced holiday living." — Verified by Bali Stay Collection for design lovers and beach lovers alike.'
  },

  'tropical-elegance-seseh': {
    headline: "Tropical Elegance – Breezy 2BR Ocean-Air Haven Soothing with Gentle Water Sounds",
    shortDesc: "Inhale the invigorating ocean air of Seseh Beach. Featuring a soothing pool water feature, warm evening ambient illumination, and authentic village calm, this two-bedroom haven is pure balm for the soul.",
    description: `Experience the untouched magic of coastal Bali at Villa Halle in Seseh. Located in an authentic coastal village free from traffic and bustling crowds, this newly completed two-bedroom haven combines understated luxury with deep, grounding serenity.

A custom pool water fountain creates gentle ripples and the calming acoustics of running water, instantly dissolving daily stress. As dusk falls, artfully curated ambient lighting transforms the entire estate into a warm, romantic wonderland beneath the stars.

With two spacious en-suite bedrooms, high-speed connectivity, and the black sands of Seseh Beach just a leisurely stroll away, enjoy slow, restorative coastal living with seamless Bali Stay Collection hosting.`,
    why: 'Guest Highlight: "We loved the cozy, luxurious feel from the moment we walked in. The soothing sound of running water in the pool created an unforgettable ambiance." — Hand-picked by Bali Stay Collection for authentic coastal serenity.'
  },

  'yellow-moon-uluwatu': {
    headline: "Yellow Moon – Sun-Kissed 3BR Clifftop Oasis Designed for Effortless Family Moments",
    shortDesc: "Relax in a sunken lounge bathed in Uluwatu’s golden sunshine. Featuring an expansive swimming pool with a child-friendly shallow area, private fitness gear, and a gourmet kitchen, every holiday wish is catered for.",
    description: `Embrace sun-drenched coastal living at Villa Yellow Moon in Uluwatu. Thoughtfully curated for family harmony and relaxed luxury, this three-bedroom retreat balances child-friendly safety with refined architectural elegance.

The centerpiece is an exceptionally large private swimming pool featuring a shallow wading section perfect for younger swimmers. While the kids splash under the sun, parents can maintain wellness goals with in-villa workout gear or prepare fresh meals in the chef-grade kitchen.

Situated in a quiet, upscale Bukit enclave just 10 minutes from world-class surf beaches and sunset beach clubs, Yellow Moon offers a pristine base for an unforgettable family getaway.`,
    why: 'Guest Highlight: "Absolutely gorgeous for a family getaway! Spacious, spotless, with a large child-friendly pool, great workout gear, and luxurious master suites." — The top family recommendation in Uluwatu by Bali Stay Collection.'
  },

  'casa-kaya-bingin': {
    headline: "CASA KĀYA – Bohemian 1BR Sunlight Retreat Crafted for Soulful Bingin Living",
    shortDesc: "Find your romantic coastal sanctuary in Bingin. Expansive glass doors slide wide open to invite all-day sunlight into your private pool deck, creating an effortless haven for sunbathing and unwinding.",
    description: `CASA KĀYA is a bohemian design poem set in the heart of Bingin. Blending Mediterranean curves, raw natural textures, and warm tropical sunshine, this one-bedroom villa captures the quintessential spirit of coastal Bali.

Full-height glass panels slide back completely, dissolving the boundary between the stylish indoor living area and the sun-soaked private pool courtyard. Positioned to capture golden sun throughout the day, the outdoor deck is tailored for sunbathing, reading, and savoring tropical cocktails.

Just a short ride to Bingin's famous surf cliff and thriving artisan café culture, CASA KĀYA offers an intimate, highly photogenic escape managed with discreet, attentive care.`,
    why: 'Guest Highlight: "Even more beautiful in person! The layout catches all-day sunlight, perfect for tanning, and the villa was lit up so warmly on arrival." — Curated by Bali Stay Collection for romantic escapes in Bingin.'
  },

  'luxury-tropical-bingin': {
    headline: "Luxury Tropical Bingin – Elegant 3BR Palm Villa with Sunken Lounge & Golden Sun",
    shortDesc: "Unwind in a sunken poolside lounge shaded by swaying tropical palms. Three stylish bedrooms, pristine minimalist interiors, and blissful serenity just moments from Bingin’s iconic surf coast.",
    description: `Discover refined island luxury at Luxury Tropical Bingin. Enclosed by towering ornamental palms and whitewashed limestone walls, this three-bedroom sanctuary combines breezy open-concept architecture with soothing designer comforts.

The sunken outdoor lounge alongside the sparkling private pool is the villa’s natural gathering spot—ideal for afternoon drinks, casual conversation, and soaking up the warm ocean breeze. Inside, three spacious bedrooms feature premium plush bedding and sleek en-suite bathrooms.

Close to Bingin Beach, coastal boutiques, and organic cafés yet insulated in complete tranquility, this villa is meticulously looked after by Bali Stay Collection’s dedicated team.`,
    why: 'Guest Highlight: "Clean, spacious, stylish, and very well maintained. The tropical vibe combined with the peaceful atmosphere made our stay truly relaxing." — Recommended by Bali Stay Collection for friends and families in Bingin.'
  },

  'chic-tropical-bingin': {
    headline: "Chic Tropical Bingin – Polished 2BR Concrete Oasis Radiating Coastal Sophistication",
    shortDesc: "Experience the tactile beauty of cool polished concrete softened by warm natural timber. A contemporary two-bedroom haven in Bingin created for lovers of sleek architectural design and calm privacy.",
    description: `For admirers of minimalist and industrial-tropical architecture, Chic Tropical Bingin is an aesthetic triumph. Smooth concrete surfaces meet rich teak wood accents and vibrant monstera foliage, creating an uncluttered oasis of cool, visual tranquility.

Two generous en-suite bedrooms boast whisper-quiet air conditioning, high-pressure rainfall showers with stone accents, and premium orthopedic mattresses. The sleek kitchen and dining bar provide everything needed for slow morning coffees before heading out to the surf.

Offering the perfect blend of modern sophistication and coastal convenience, this villa provides peace, privacy, and impeccable hospitality under the Bali Stay Collection standard.`,
    why: 'Guest Highlight: "Very new, modern, clean, and well-appointed with thoughtful hosts and top-tier amenities." — Chosen by Bali Stay Collection for discerning design travelers in Bingin.'
  },

  'five-bedroom-designer-umalas': {
    headline: "Umalas Estate – Grand 5BR Architectural Sanctuary Bordering Rice Fields & Berawa",
    shortDesc: "When space, elegance, and absolute privacy matter most. This five-bedroom designer estate in Umalas features an 18-meter lap pool, soaring living pavilions, and serene rice paddy borders just five minutes from Berawa.",
    description: `Welcome to the commanding luxury of Umalas Estate, an expansive private property situated at the quiet nexus of Umalas and Berawa. Conceived by acclaimed Bali architects, this five-bedroom residence boasts an impressive 18-meter swimming pool flanked by manicured lawns and towering palms.

The soaring open-air living pavilion welcomes cool breezes from surrounding green fields, offering grand spaces for celebratory dinners and relaxed afternoon lounging. Each bedroom suite stands as an independent private retreat with king beds, walk-in closets, and stone garden bathrooms.

Offering private butler service and complete isolation from street bustle while remaining minutes from premier beach clubs, this estate is verified 100% by Bali Stay Collection for large groups.`,
    why: 'BSC Signature Choice: "Private resort scale featuring an 18-meter lap pool, soaring architectural pavilions, and complete privacy on the Umalas border." — The premier large-group estate in Bali Stay Collection\'s portfolio.'
  },

  'villa-imala': {
    headline: "Villa Imala – Ultra-Luxury 6BR Clifftop Palace with Glass Gym & Sunset Ocean Panoramas",
    shortDesc: "Uncompromising luxury awaits at this six-bedroom Uluwatu clifftop estate. Featuring an 80m² pool, panoramic ocean-facing glass gym, private spa room, and magical sunset terrace vistas over the Indian Ocean.",
    description: `Elevate your island getaway to palatial heights at Villa Imala in Uluwatu. Perched high on the Bukit peninsula, this brand-new six-bedroom luxury estate redefines Bali hospitality with amenities worthy of a world-class private boutique resort.

Start your morning working out in the climate-controlled glass gym overlooking panoramic blue ocean waters, followed by a swim in the sprawling 80-square-meter swimming pool. In the afternoon, indulge in restorative treatments in your private in-villa spa before gathering on the sky terrace for unforgettable sunset vistas.

Accompanied by a dedicated villa manager, private chef capability, and discreet housekeeping, Villa Imala represents the pinnacle of luxury clifftop living in Bali.`,
    why: 'Guest Highlight: "Sitting on the terrace enjoying the ocean sunset view was simply magical! The manager organized massages and special dinners seamlessly." — The ultimate clifftop luxury estate in Bali Stay Collection\'s Uluwatu collection.'
  },

  'villa-mahina': {
    headline: "Villa Mahina – Contemporary 3BR Luxury Villa with Crystal Pool 400m from Berawa Beach",
    shortDesc: "Enjoy the ultimate privilege: prime central Berawa living without the noise. Just 400 meters from Berawa Beach and Finns Beach Club, this modern three-bedroom villa features double-glazed acoustics and a sparkling pool.",
    description: `Find your private haven where the vibrant energy of coastal Berawa meets quiet residential sanctuary. Villa Mahina is positioned on a discreet private lane, just 400 meters on foot from the sands of Berawa Beach and world-renowned coastal lifestyle venues.

The three-bedroom villa is engineered with premium acoustic double-glazing, ensuring your nights are peaceful and quiet. The clear private swimming pool is bordered by ironwood decking and lush tropical palms, creating a refreshing setting for leisurely afternoons.

Complete with high-speed fiber internet, full air conditioning, and daily housekeeping, Villa Mahina offers an unbeatable base for savoring the best of Canggu and Berawa.`,
    why: 'Guest Highlight: "Unbeatable location in Canggu & Berawa, pristine private pool and living space, and surprisingly quiet and private inside." — Top-rated walk-to-beach villa by Bali Stay Collection.'
  },

  'khaleela-villas': {
    headline: "Khaleela Villas – Desert-Chic 2BR Sunlit Oasis with Dreamy Curved Architecture",
    shortDesc: "Immerse yourself in desert-modernist aesthetics and sweeping curved architecture in central Canggu. Two sun-filled bedrooms, a deep private pool, and photogenic indoor-outdoor bathrooms crafted to enchant.",
    description: `Khaleela Villas is a visual celebration for lovers of unique, sculptural architecture. Warm textured plaster, gentle arches, and exotic desert botanicals create an alluring ambiance reminiscent of a Mediterranean-Moroccan oasis right in the heart of Canggu.

Both bedrooms feature sweeping curved picture windows overlooking the deep, crystal-clear swimming pool. The signature open-air bathrooms let you shower under open tropical skies while wrapped in absolute privacy behind artisan curved walls.

Within walking distance to beloved cafes and boutiques yet peaceful within, enjoy warm hospitality and personalized service with Bali Stay Collection.`,
    why: 'Guest Highlight: "Even more stunning in real life than the photos! The architecture took our breath away, and the house manager was exceptionally kind and attentive." — Bali Stay Collection\'s most photogenic architectural oasis in Canggu.'
  },

  'beyond-the-palms': {
    headline: "Beyond the Palms – Smart 4BR High-Tech Villa with Rooftop Sunset Jacuzzi & Cinema",
    shortDesc: "Step into the future of luxury holiday living where smart home tech meets tropical elegance. Featuring a rooftop sunset jacuzzi, whole-home Sonos sound system, and outdoor cinema under the Canggu stars.",
    description: `Beyond the Palms elevates the Bali luxury villa concept into a cutting-edge technological dream. This four-bedroom architectural home is equipped with intelligent home automation, multi-zone Sonos sound systems, and automated smart bathroom amenities for effortless comfort.

The crown jewel is the private rooftop terrace, where you can unwind in the heated jacuzzi with drinks in hand as the Bali sky transforms into a sunset masterpiece. On the ground level, a 45-square-meter pool and open-air lounge host unforgettable gatherings.

Offering luxury finishes, indoor-outdoor shower gardens, and daily housekeeping, Beyond the Palms delivers an extraordinary stay fully verified by Bali Stay Collection.`,
    why: 'Guest Highlight: "Extremely modern and beautifully designed. The indoor-outdoor bathrooms, smart technology, and rooftop jacuzzi made it feel like pure luxury." — Curated by Bali Stay Collection for high-tech luxury living in Canggu.'
  },

  'villa-akar': {
    headline: "Villa Akar – Guest Favorite 4BR Architectural Gem Where Modern Luxury Embraces Nature",
    shortDesc: "Enter a 5.0-star Guest Favorite retreat in Berawa. Boasting flexible enclosed air-conditioned living, a tranquil zen pool, and warm teak wood finishes that make you feel instantly at home.",
    description: `Recognized as an Airbnb Guest Favorite with a flawless 5.0-star rating, Villa Akar is the epitome of thoughtful residential design. Contemporary concrete and black lava stone pair harmoniously with warm teak woodwork, radiating a grounded, zen-like tranquility.

The versatile living pavilion can be fully enclosed with crisp air conditioning during warm afternoons or slid open to let gentle cross-breezes drift across the private pool. Four expansive bedrooms offer plush mattresses, premium linens, and spa-inspired bathrooms.

Nestled in a quiet residential corner of Berawa close to premier dining and beaches, this villa guarantees 5-star comfort with daily BSC housekeeping.`,
    why: 'Guest Highlight: "Exceeded our expectations in every way. The interiors felt warm, comfortable, and distinctly premium—we felt at home the second we arrived." — Perfect 5.0 Guest Favorite rating in Berawa by Bali Stay Collection.'
  },

  'villa-golden': {
    headline: "Villa Golden – Chic 2BR Private Sanctuary with Lush Palms Opposite FINNS Club",
    shortDesc: "Unbeatable convenience meets secluded privacy in Berawa. Located directly opposite FINNS Recreation Club, this chic two-bedroom villa offers a sparkling pool, lush perimeter palms, and quiet comfort.",
    description: `Enjoy the best of both worlds at Villa Golden: immediate access to Berawa’s premier sports and leisure epicenter, paired with complete residential seclusion. Positioned opposite FINNS Recreation Club, tennis courts, water parks, and beach shuttles are literally at your doorstep.

Inside, the two-bedroom villa remains deeply quiet and restful. Mature tropical palms encircle the pool courtyard, providing privacy for lounging in the sun or relaxing on the upstairs balcony. Spotless interiors and cozy beds ensure deep, undisturbed nights.

With daily housekeeping, pristine amenities, and walk-to-everything convenience, Villa Golden is the ideal Berawa base for friends and couples.`,
    why: 'Guest Highlight: "Exactly as pictured, if not more beautiful! We loved the privacy from the lush palms, spotless cleanliness, and being steps from great cafes." — Prime Berawa location verified by Bali Stay Collection.'
  },

  'villa-surga': {
    headline: "Villa Surga – Serene 4BR Valley-View Hideaway Whispering Ubud's Purest Magic",
    shortDesc: "True to its name meaning 'Paradise', uncover a hidden sanctuary in serene Ubud. A private infinity pool overlooking lush tropical valley jungle brings deep, restorative relaxation.",
    description: `Let your spirit rest in the untouched beauty of Ubud at Villa Surga. Tucked away along a quiet natural trail on the verdant outskirts of Ubud, this four-bedroom haven showcases expansive views across an emerald river valley.

The private infinity pool is the villa’s soul: swim beneath the tropical sun, watch valley mist rise through the canopy, and listen to the birdsong and whispering palms. Open-air living pavilions invite the natural world right into your daily moments.

Close to Ubud's cultural heart while remaining blissfully serene, Villa Surga is supported by warm, attentive local staff dedicated to making your stay magical.`,
    why: 'Guest Highlight: "A wonderful stay surrounded by Ubud\'s tranquil valley. The house and pool were perfect for swimming, sunbathing, and recharging." — Selected by Bali Stay Collection for genuine rainforest tranquility.'
  },

  'house-terra': {
    headline: "House Terra – Biombo Architectural Masterpiece: Grand 5BR Pool Estate in Pererenan",
    shortDesc: "Step inside a striking architectural masterpiece by Biombo where modern design merges with tropical Pererenan. Featuring five grand bedrooms, a classic piano, an expansive pool, and in-house chef dining.",
    description: `House Terra is a tour de force of tropical modernist architecture, crafted by the renowned Biombo Architects. Every corner of this five-bedroom estate in Pererenan reflects geometric precision: dramatic concrete curves, cool stone flooring, and lush indoor courtyards.

The sprawling living pavilion features a grand classical piano, designer seating, and dramatic lighting that transforms the space into a regal entertaining hall by dusk. The expansive private pool is bordered by bespoke loungers inviting peaceful relaxation.

With private in-house dining options, five palatial bedroom suites, and a quiet village setting, House Terra offers an unforgettable setting for luxury group retreats.`,
    why: 'Guest Highlight: "Nicely built, very spacious, and super comfy for large groups. Having private chefs cook dinner in the villa was one of our best Bali memories." — Premier Biombo architectural estate in Pererenan by Bali Stay Collection.'
  },

  'magnificent-canggu-estate': {
    headline: "Magnificent Canggu Estate – Prestigious 5BR Haven of Peaceful Luxury Amidst Lively Canggu",
    shortDesc: "Discover a rare luxury: a grand five-bedroom estate providing peaceful seclusion right in the heart of Canggu. A crystal-blue pool, expansive open living areas, and attentive staff who cater to every detail.",
    description: `Amidst the magnetic vibrancy of Canggu, Magnificent Canggu Estate stands as a peaceful private sanctuary. Set on generous private grounds shielded from street noise, this five-bedroom residence provides generous space and pure tranquility.

Each bedroom suite boasts high ceilings, generous wardrobe space, and en-suite bathrooms. The breezy open-concept living pavilion flows onto a private pool deck framed by tropical greenery, offering a cool haven after days exploring beaches and cafes.

Attended by dedicated housekeeping and breakfast staff who ensure effortless comfort, this estate delivers five-star private group living in Canggu.`,
    why: 'Guest Highlight: "Impeccable, clean, and comfortable. After a busy day in Canggu, we were so relieved to come home to this peaceful haven. The staff was incredible!" — Verified by Bali Stay Collection for prestigious group holidays.'
  },

  'designer-beachside-canggu': {
    headline: "Designer Beachside Villa – Ultra-Chic 4BR Coastal Retreat with Seamless Indoor-Outdoor Flow",
    shortDesc: "Feel the refreshing coastal breeze through the ultra-chic interiors of this four-bedroom Canggu villa. Seamless indoor-outdoor flow, a crystal swimming pool, and thoughtful daily hospitality.",
    description: `Designer Beachside Villa was created for travelers who appreciate the harmony of coastal chic aesthetics and effortless comfort. Situated just moments from Canggu’s beaches, the villa presents a calming neutral palette and airy open-plan spaces.

Massive glass sliding walls allow you to integrate the interior lounge with the sunny pool deck, maximizing natural cross-ventilation. Four bedroom suites feature plush hotel-grade king beds and refined marble-accented bathrooms.

With attentive daily housekeeping keeping everything spotless and on-call concierge assistance, enjoy a relaxed, worry-free island holiday with Bali Stay Collection.`,
    why: 'Guest Highlight: "Stunning, spacious, and kept spotless daily. The team made our stay feel super relaxing and effortless—couldn\'t recommend it enough!" — Bali Stay Collection\'s top coastal pick in Canggu.'
  },

  'villa-daun-by-teduh': {
    headline: "Villa Daun by Teduh – 5-Star Hotel Caliber 3BR Architectural Oasis in Berawa",
    shortDesc: "Experience the comfort of a private villa paired with five-star hotel housekeeping standards. A tranquil three-bedroom architectural haven in Berawa with zero street noise and pristine attention to detail.",
    description: `Villa Daun by Teduh proves that private villa living can match the exacting standards of a luxury five-star hotel. Located in a quiet, secluded pocket of Berawa with zero street noise, this architectural residence welcomes you with instant calm.

Crisp contemporary lines are complemented by manicured tropical gardens surrounding the private pool. The open dining and kitchen area gleams with cleanliness, while three en-suite bedrooms feature premium mattresses for restful sleep.

With world-class hospitality, complimentary luggage handling, and spotless daily maintenance, Villa Daun is a standout choice in Berawa.`,
    why: 'Guest Highlight: "Staying at Villa Daun genuinely felt like staying at a 5-star hotel. Beautiful, extremely clean, in a peaceful area with zero noise, and wonderful staff." — 5-star hotel standards verified by Bali Stay Collection.'
  },

  'cala-blanca': {
    headline: "Cala Blanca – Mediterranean-Inspired 4BR Sunlit Villa with 24-Hour Peace in Pererenan",
    shortDesc: "Enjoy the pristine charm of sunlit tropical Mediterranean design in Pererenan. Whitewashed walls, a clear private pool, 24-hour gated security, and friendly staff for absolute peace of mind.",
    description: `Drawing inspiration from the whitewashed coastal villas of the Mediterranean, Cala Blanca brings crisp coastal elegance to peaceful Pererenan. Bright white plaster walls, soft curved archways, and natural timber accents capture Bali’s golden sunlight.

The central private pool is the heart of the home, framed by sun loungers and tropical foliage. Situated within an exclusive enclave with 24-hour security, enjoy the freedom of island holidaying with total privacy and security.

Minutes from Pererenan’s coastline and dining scene, Cala Blanca is maintained to the highest standards by Bali Stay Collection.`,
    why: 'Guest Highlight: "Beautiful Mediterranean interior with a sunlit private pool, warm and friendly staff, and 24-hour security peace of mind." — Curated by Bali Stay Collection for Mediterranean living in Pererenan.'
  },

  'the-bull-house': {
    headline: "The Bull House – Iconic 6BR Temple of Leisure with In-House Chef & Grand Spaces in Seminyak",
    shortDesc: "Welcome to Seminyak's legendary 'Temple of Leisure'. A grand six-bedroom estate with a spectacular pool, in-house private chef service, and palatial social spaces made for celebration.",
    description: `The Bull House is more than a luxury residence; it is an iconic lifestyle estate in prime Seminyak. Renowned as the 'Temple of Leisure', this six-bedroom private compound is crafted for unforgettable gatherings among large families and groups of friends.

A magnificent swimming pool anchors the central courtyard, flanked by open-air entertaining pavilions, a bespoke bar, and long banquet dining tables. In-house private chef service turns every meal into a culinary celebration, from gourmet breakfasts to sunset feasts.

Offering complete privacy just moments from Seminyak's boutique streets, The Bull House provides grand living with full BSC concierge support.`,
    why: 'Guest Highlight: "Incredibly clean, well-maintained, and having an in-house chef made the food simply incredible. Our true home away from home in Bali!" — Premier large-group celebration estate in Seminyak by Bali Stay Collection.'
  },

  'berawa-breeze': {
    headline: "Berawa Breeze – Chic 4BR Wellness Sanctuary with Private Sauna & Sprawling Garden in Berawa",
    shortDesc: "Recharge body and mind in this four-bedroom wellness sanctuary in Berawa. Boasting a private Finnish sauna, expansive grassy garden, clear pool, and caring daily staff for the ultimate family holiday.",
    description: `Find your personal wellness retreat at Berawa Breeze, a four-bedroom villa combining contemporary tropical design with private rejuvenation amenities. Situated on a generous plot, the estate features a rare, sprawling green lawn where children can play freely while adults unwind.

Step into your private in-villa sauna to detoxify after an active day, followed by a cooling dip in the pristine swimming pool. Generous living and dining layouts ensure effortless comfort for multi-generational families to gather.

With attentive daily care from housekeeping and concierge staff, enjoy a healthy, rejuvenating coastal vacation in Berawa.`,
    why: 'Guest Highlight: "Easily one of the best villas in Bali! Private sauna, expansive garden, clean pool, and warm daily care made our family stay an easy 5 stars." — The top private wellness and family estate in Berawa by Bali Stay Collection.'
  },

  'coco-bay': {
    headline: "Coco Bay – Legendary 8BR Beachside Resort Estate with Private Buggy & Personal Chef",
    shortDesc: "Five-star resort luxury reserved exclusively for you. A grand eight-bedroom estate in Berawa hosting up to 16 guests, complete with private buggy service, daily in-house chef, and 24/7 security.",
    description: `Imagine enjoying an entire luxury five-star resort exclusively with your circle of friends and family. Coco Bay is a grand eight-bedroom private estate in prime Berawa, just minutes from the beach and renowned dining hubs.

Every amenity is crafted to the highest standard: whole-villa filtered drinking water, a dedicated private buggy service to escort your group around the neighborhood, a massive resort pool, and a talented in-house chef preparing fresh breakfasts and dinners.

With around-the-clock security and meticulous daily housekeeping, Coco Bay delivers an unforgettable private luxury hotel experience for large groups.`,
    why: 'Guest Highlight: "Truly felt like our own private luxury hotel for 15 guests! The buggy service, daily chef, and incredible staff made it an unforgettable 1000/10 stay." — Bali Stay Collection\'s premier 8-bedroom estate in Berawa.'
  },

  'villa-milana': {
    headline: "Villa Milana – Sunlit 5BR Mediterranean Haven Creating Memories That Last Forever",
    shortDesc: "Fall in love with this sunlit five-bedroom Mediterranean haven in Canggu. A peaceful tropical garden, sparkling swimming pool, cloud-soft beds, and genuine heartfelt hospitality.",
    description: `Welcome to your own slice of Mediterranean tranquility at Villa Milana Canggu. Melding the clean lines of southern European coastal architecture with lush tropical Bali palms, this five-bedroom retreat is where calm and family connection flourish.

The private pool and garden are the highlights of the estate—secluded and peaceful, creating a private oasis in the middle of Canggu. Inside, warm wooden accents, exceptionally comfortable beds, and open-plan dining ensure restful moments.

Tucked away on a quiet street yet moments from Canggu's best cafes, Villa Milana offers an effortless family holiday with Bali Stay Collection.`,
    why: 'Guest Highlight: "The pool and garden were a true highlight—creating a peaceful oasis of our own. Spotless, cozy beds, and genuine hospitality in a quiet central location." — Hand-picked by Bali Stay Collection for family gatherings in Canggu.'
  },

  'beachside-haven-canggu': {
    headline: "Beachside Haven – 10/10 Rated 4BR Coastal Sanctuary with Resort Pool Steps from the Beach",
    shortDesc: "Rated 'Better than 10/10' by guests. A four-bedroom coastal sanctuary featuring walk-in robe en-suites, a large resort pool wrapped in lush greenery, surround sound, and beach access just steps away.",
    description: `If holiday perfection had an address, it would be Beachside Haven in Canggu. Located just moments from the beach, this four-bedroom property delivers the refined feel of a private boutique resort tailored exclusively for your party.

All bedrooms feature private en-suite bathrooms and generous walk-in robes. The enclosed, air-conditioned living lounge includes an integrated surround-sound audio system for chilled evenings. Outside, the large pool is framed by tropical foliage kept comfortably insect-free with natural citronella care.

With warm staff on hand to prepare bespoke breakfasts and handle every request, Beachside Haven guarantees an extraordinary beachside stay.`,
    why: 'Guest Highlight: "Better in real life than photos! Felt like a private luxury resort with a huge pool and surround sound. PERFECT and better than 10/10!" — Top-rated coastal villa by Bali Stay Collection in Canggu.'
  },

  'wellness-estate-canggu': {
    headline: "Wellness Estate Canggu – High-End 4BR Health Haven with Sauna, Ice Bath & Private Gym",
    shortDesc: "The pinnacle of private wellness and vitality in Canggu. A four-bedroom residence equipped with a private sauna, ice bath, personal gym, and 24/7 security just one minute from premier beach clubs.",
    description: `Energize your body and reset your mind at Wellness Estate Canggu, a unique private retreat designed specifically for health, vitality, and recovery. Positioned just one minute from vibrant beach clubs and organic eateries, you enjoy both prime convenience and complete wellness privacy.

After working out in your private gym or sunbathing by the sparkling pool, enjoy contrast therapy with sessions in the cedar sauna followed by an invigorating plunge into the ice bath. A fully equipped kitchen with filtered water ensures wholesome nourishment throughout your stay.

Attended by caring local staff and private driver options, this estate offers the ultimate wellness escape in Canggu.`,
    why: 'Guest Highlight: "Private sauna, ice bath, clean pool, and one minute walk to beach clubs. The staff took amazing care of us—the ultimate wellness escape!" — The premier private health and recovery villa in Canggu by Bali Stay Collection.'
  },

  'villa-aless': {
    headline: "Villa Aless – Serene 3BR Tropical Pool Hideaway Tucked in Peaceful Umalas",
    shortDesc: "Discover the peaceful charm of Umalas. A spacious, sparkling-clean three-bedroom hideaway thoughtfully designed for calm comfort, offering a quiet retreat after exploring Bali.",
    description: `Find true peace of mind at Villa Aless in Umalas. Tucked into an upscale residential neighborhood known for leafy tranquility, this three-bedroom sanctuary allows you to escape the rush and unwind in tropical comfort.

The private swimming pool is bordered by sun loungers and green palms, inviting refreshing swims in the cool morning air. The open-plan living lounge features comfortable timber furniture and warm natural light, providing an inviting space for family conversations.

Spotlessly clean and cared for by warm, attentive staff, Villa Aless is a serene home away from home in Umalas.`,
    why: 'Guest Highlight: "Even better than we expected! Beautiful, clean, spacious, and the staff were incredibly friendly and welcoming—a tranquil paradise in Umalas." — Chosen by Bali Stay Collection for restful residential calm.'
  },

  'alua-loft': {
    headline: "Alua Loft – Bohemian 1BR Designer Sanctuary with Sun-Drenched Private Plunge Pool",
    shortDesc: "An artistic one-bedroom bohemian mezzanine loft in quiet Pererenan. A sun-drenched private plunge pool, soaring ceilings, and coastal village peace perfect for creative rejuvenation.",
    description: `Alua Loft is an inspiring private retreat designed for couples and solo travelers who appreciate bohemian aesthetics and architectural character. Located in serene Pererenan, this one-bedroom loft combines natural rattan, linen textures, and modern industrial lines.

The mezzanine bedroom overlooks the airy living space below, leading out to a sun-drenched plunge pool that catches warm sunlight throughout the day. High privacy walls ensure undisturbed sunbathing and tranquil afternoons.

With fast, responsive communication and daily care, enjoy a quiet, creative getaway near Pererenan Beach with Bali Stay Collection.`,
    why: 'Guest Highlight: "The reality truly matches the pictures! Sun-drenched private plunge pool, bohemian vibes, and very responsive hospitality." — Bali Stay Collection\'s top designer loft for couples in Pererenan.'
  },

  'villa-satiya': {
    headline: "Villa Satiya – 5.0 Star 4BR Tropical Dream Oasis in Prime Scenic Pererenan",
    shortDesc: "Wake each morning to tranquil nature sounds and lush emerald garden views. Rated a perfect 5.0 stars, this four-bedroom oasis blends modern luxury with authentic Balinese warmth.",
    description: `A dream tropical holiday comes to life at Villa Satiya in Pererenan. Surrounded by mature palms and lush garden walls ensuring absolute privacy, this 5.0-star rated four-bedroom residence is the quintessential tropical retreat.

The pristine swimming pool mirrors blue Bali skies, forming the centerpiece for lazy family days from sunrise to dusk. Soaring vaulted ceilings keep the open-concept living area naturally cool, while four en-suite bedrooms feature plush beds for deep, restful sleep.

Combining tranquil village scenery with swift access to coastal dining, Villa Satiya delivers an unforgettable stay with Bali Stay Collection.`,
    why: 'Guest Highlight: "A dream come true. Waking up to stunning views and soothing nature sounds. Lush gardens, pristine pool, and dedicated staff—five stars without a doubt!" — Flawless 5.0 star rated tropical oasis in Pererenan by Bali Stay Collection.'
  },

  'villa-infinity-umalas': {
    headline: "Villa Infinity – Grand 5BR Estate with Olympic 20m Pool & Absolute Seclusion in Umalas",
    shortDesc: "Swim freely in an extraordinary 20-meter private swimming pool framed by lush tropical gardens. A grand five-bedroom Umalas estate designed for milestone celebrations and ultimate privacy.",
    description: `When size, scale, and true seclusion define your ideal holiday, Villa Infinity in Umalas stands in a league of its own. Set across sprawling tropical grounds, this five-bedroom estate boasts a spectacular 20-meter lap pool—a rare luxury among private Bali villas.

Expansive lawn and deck spaces provide ample room for sunbathing, evening drinks, or in-villa massage sessions under frangipani trees. The massive open living pavilion comfortably accommodates large groups in relaxed elegance.

Whether hosting a milestone birthday, family reunion, or group retreat, Villa Infinity offers an unforgettable private venue backed by Bali Stay Collection hosting.`,
    why: 'Guest Highlight: "The 20-meter pool was a real highlight—large enough to properly swim! Spacious, comfortable, and private with wonderful staff assistance." — The premier 20-meter pool estate in Umalas by Bali Stay Collection.'
  }
};

console.log("Applying refined English NLP copywriting & highlights to all 35 villas...");

// 1. Update airbnbVillas.json
const airbnbPath = path.resolve('src/data/airbnbVillas.json');
const airbnbData = JSON.parse(fs.readFileSync(airbnbPath, 'utf8'));

let updatedAirbnb = 0;
for (const villa of airbnbData) {
  const nlp = ENGLISH_NLP_VILLAS[villa.id];
  if (nlp) {
    villa.name = nlp.headline;
    villa.shortDesc = nlp.shortDesc;
    villa.description = nlp.description;
    villa.fullDesc = nlp.description;
    villa.why = nlp.why;
    updatedAirbnb++;
  }
}
fs.writeFileSync(airbnbPath, JSON.stringify(airbnbData, null, 2), 'utf8');
console.log(`Updated ${updatedAirbnb} villas in src/data/airbnbVillas.json.`);

// 2. Update villasData.js
const villasDataPath = path.resolve('src/data/villasData.js');
let villasContent = fs.readFileSync(villasDataPath, 'utf8');

for (const [id, nlp] of Object.entries(ENGLISH_NLP_VILLAS)) {
  const idRegex = new RegExp(`('${id}':\\s*\\{[\\s\\S]*?\\n  \\})`, 'm');
  const match = villasContent.match(idRegex);
  if (match) {
    let block = match[1];

    // Replace shortDesc
    if (/shortDesc:\s*'[^']*'/.test(block)) {
      block = block.replace(/shortDesc:\s*'[^']*'/, `shortDesc: '${nlp.shortDesc.replace(/'/g, "\\'")}'`);
    } else {
      block = block.replace(/(address:\s*'[^']*',)/, `$1\n    shortDesc: '${nlp.shortDesc.replace(/'/g, "\\'")}',`);
    }

    // Replace description
    if (/description:\s*`[^`]*`/.test(block)) {
      block = block.replace(/description:\s*`[^`]*`/, `description: \`${nlp.description.replace(/`/g, "\\`").replace(/\${/g, "\\${")}\``);
    } else if (/description:\s*'[^']*'/.test(block)) {
      block = block.replace(/description:\s*'[^']*'/, `description: \`${nlp.description.replace(/`/g, "\\`").replace(/\${/g, "\\${")}\``);
    }

    // Replace why
    if (/why:\s*'[^']*'/.test(block)) {
      block = block.replace(/why:\s*'[^']*'/, `why: '${nlp.why.replace(/'/g, "\\'")}'`);
    } else {
      block = block.replace(/(description:\s*`[^`]*`,)/, `$1\n    why: '${nlp.why.replace(/'/g, "\\'")}',`);
    }

    villasContent = villasContent.replace(match[1], block);
  }
}

fs.writeFileSync(villasDataPath, villasContent, 'utf8');
console.log(`Updated VILLA_DETAILS in src/data/villasData.js.`);

// 3. Update bscVillasData.js
const bscPath = path.resolve('src/data/bscVillasData.js');
let bscContent = fs.readFileSync(bscPath, 'utf8');

for (const [id, nlp] of Object.entries(ENGLISH_NLP_VILLAS)) {
  const blockRegex = new RegExp(`(\\{\\s*"id":\\s*"${id}",[\\s\\S]*?\\n  \\})`, 'm');
  const match = bscContent.match(blockRegex);
  if (match) {
    let block = match[1];

    block = block.replace(/"name":\s*"[^"]*",/, `"name": "${nlp.headline.replace(/"/g, '\\"')}",`);
    block = block.replace(/"desc":\s*"[^"]*",/, `"desc": "${nlp.shortDesc.replace(/"/g, '\\"')}",`);
    block = block.replace(/"why":\s*"[^"]*",/, `"why": "${nlp.why.replace(/"/g, '\\"')}",`);

    bscContent = bscContent.replace(match[1], block);
  }
}

fs.writeFileSync(bscPath, bscContent, 'utf8');
console.log(`Updated BSC_VILLAS in src/data/bscVillasData.js.`);

console.log("Successfully applied refined English NLP copywriting to all 35 villas!");
