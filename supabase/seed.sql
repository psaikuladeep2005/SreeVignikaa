-- ==============================================================================
-- SREEVIGNIKAA SAREES - SUPABASE SEED DATA (Sarees, Dresses & Ethnic Wear)
-- Valid Hexadecimal UUIDs (0-9, a-f)
-- ==============================================================================

-- Clean existing data for idempotency
TRUNCATE TABLE public.product_images CASCADE;
TRUNCATE TABLE public.products CASCADE;
TRUNCATE TABLE public.categories CASCADE;
TRUNCATE TABLE public.boutique_settings CASCADE;

-- ------------------------------------------------------------------------------
-- 1. SEED BOUTIQUE SETTINGS
-- ------------------------------------------------------------------------------
INSERT INTO public.boutique_settings (
  id,
  boutique_name,
  logo_url,
  whatsapp_number,
  instagram_url,
  email,
  address,
  hero_title,
  hero_subtitle,
  about_text
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'SREEVIGNIKAA Sarees',
  '',
  '919876543210',
  'https://instagram.com/sreevignikaa_official',
  'contact@sreevignikaa.com',
  'SREEVIGNIKAA Sarees Studio, Trunk Road, Kadapa, Andhra Pradesh, 516001',
  'Elegant Sarees, Designer Dresses & Festive Ethnic Wear',
  'Discover handpicked Kanchipuram & Banarasi silk sarees, ready-to-wear designer dresses, festive lehengas, and everyday ethnic wear — curated for every occasion, delivered across India.',
  'SREEVIGNIKAA Sarees is a curated fashion boutique celebrating the grace of the Indian drape and the charm of contemporary ethnic wear. From heritage Kanchipuram silks and Banarasi weaves to flowing designer dresses and festive lehengas, every piece is hand-selected for quality, finish, and timeless style.'
);

-- ------------------------------------------------------------------------------
-- 2. SEED CATEGORIES (Valid UUID prefix c111...)
-- ------------------------------------------------------------------------------
INSERT INTO public.categories (id, name, slug, description, image_url, sort_order, is_active) VALUES
(
  'c1111111-1111-1111-1111-111111111101',
  'Silk Sarees',
  'silk-sarees',
  'Pure Kanchipuram, Banarasi, Mysore and Uppada silk sarees with rich zari borders — perfect for weddings, Muhurtham, and grand festive occasions.',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
  1,
  true
),
(
  'c1111111-1111-1111-1111-111111111102',
  'Designer Sarees',
  'designer-sarees',
  'Contemporary organza, georgette, and sequin-embroidered designer sarees for receptions, parties, and modern festive celebrations.',
  'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800',
  2,
  true
),
(
  'c1111111-1111-1111-1111-111111111103',
  'Lehengas & Half Sarees',
  'lehengas-half-sarees',
  'Stunning bridal and festive lehengas, half sarees, and chaniya cholis with intricate zardozi, mirror, and thread work.',
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
  3,
  true
),
(
  'c1111111-1111-1111-1111-111111111104',
  'Designer Dresses & Gowns',
  'designer-dresses-gowns',
  'Floor-length gowns, Anarkali suits, Indowestern dresses, and co-ord sets blending traditional craftsmanship with modern silhouettes.',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
  4,
  true
),
(
  'c1111111-1111-1111-1111-111111111105',
  'Salwar Suits & Kurtis',
  'salwar-suits-kurtis',
  'Comfortable daily-wear and festive salwar suits, Anarkalis, palazzo sets, and stylish kurtis in cotton, rayon, and georgette.',
  'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=800',
  5,
  true
),
(
  'c1111111-1111-1111-1111-111111111106',
  'Kids Ethnic Wear',
  'kids-ethnic-wear',
  'Adorable silk pattu pavadai, kids lehengas, festive frocks, and kurta sets crafted with soft, skin-friendly fabrics.',
  'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800',
  6,
  true
);

-- ------------------------------------------------------------------------------
-- 3. SEED PRODUCTS (Valid UUID prefix d111...)
-- ------------------------------------------------------------------------------
INSERT INTO public.products (
  id, product_code, name, slug, description, price, is_price_visible, category_id,
  fabric, work_type, color, care_instructions, is_featured, is_available
) VALUES
-- Silk Sarees
(
  'd1111111-1111-1111-1111-111111111101',
  'SS-2026-101',
  'Royal Kanchipuram Temple Border Silk Saree',
  'royal-kanchipuram-temple-border-silk-saree',
  'A timeless Kanchipuram handloom silk saree in deep navy with a wide gold zari temple border, intricate butta motifs across the body, and a rich contrast pallu. A heritage bridal and Muhurtham favourite.',
  18500.00,
  true,
  'c1111111-1111-1111-1111-111111111101',
  'Pure Kanchipuram Silk',
  'Gold Zari Temple Border',
  'Deep Navy & Royal Gold',
  'Dry clean only. Store folded in a muslin cloth and re-fold every few months to protect zari.',
  true,
  true
),
(
  'd1111111-1111-1111-1111-111111111102',
  'SS-2026-102',
  'Banarasi Brocade Wedding Silk Saree',
  'banarasi-brocade-wedding-silk-saree',
  'Handwoven Banarasi silk saree with dense brocade jaal work, a floral paisley pallu, and a contrast satin border. Comes with an unstitched running blouse piece.',
  12800.00,
  true,
  'c1111111-1111-1111-1111-111111111101',
  'Pure Banarasi Silk',
  'Brocade Zari Jaal',
  'Royal Sapphire & Gold',
  'Dry clean only. Avoid direct folding pressure on brocade motifs.',
  true,
  true
),
(
  'd1111111-1111-1111-1111-111111111103',
  'SS-2026-103',
  'Mysore Crepe Silk Everyday Saree',
  'mysore-crepe-silk-everyday-saree',
  'A lightweight Mysore crepe silk saree with a minimal zari border, ideal for office wear, small poojas, and gifting. Soft drape and easy to maintain.',
  5400.00,
  true,
  'c1111111-1111-1111-1111-111111111101',
  'Mysore Crepe Silk',
  'Plain with Zari Border',
  'Royal Blue & Gold',
  'Dry clean recommended. Gentle steam iron on medium heat.',
  false,
  true
),

-- Designer Sarees
(
  'd1111111-1111-1111-1111-111111111104',
  'DS-2026-204',
  'Sequin Embroidered Georgette Party Saree',
  'sequin-embroidered-georgette-party-saree',
  'A shimmering georgette party-wear saree with all-over delicate sequin and cut-bead embroidery, finished with a lace border. Includes an unstitched embroidered blouse piece.',
  6800.00,
  true,
  'c1111111-1111-1111-1111-111111111102',
  'Pure Georgette',
  'Sequin & Cut-Bead Embroidery',
  'Midnight Blue & Silver',
  'Dry clean recommended. Iron on reverse only; avoid scrubbing embroidered areas.',
  true,
  true
),
(
  'd1111111-1111-1111-1111-111111111105',
  'DS-2026-205',
  'Floral Organza Printed Designer Saree',
  'floral-organza-printed-designer-saree',
  'A breezy organza saree with hand-screened floral prints, a satin hand-rolled border, and a matching printed blouse piece. Perfect for day events and brunch receptions.',
  4500.00,
  true,
  'c1111111-1111-1111-1111-111111111102',
  'Organza Silk',
  'Digital Floral Print',
  'Ice White & Sapphire',
  'Dry clean only. Store flat to protect sheer organza.',
  false,
  true
),
(
  'd1111111-1111-1111-1111-111111111106',
  'DS-2026-206',
  'Zardozi Embroidered Reception Saree',
  'zardozi-embroidered-reception-saree',
  'A statement reception saree in premium satin georgette with heavy zardozi and pearl embroidery on the pallu and border. Designed to sparkle under evening lights.',
  9200.00,
  true,
  'c1111111-1111-1111-1111-111111111102',
  'Satin Georgette',
  'Zardozi & Pearl Embroidery',
  'Navy Blue & Pearl White',
  'Dry clean only. Protect pearl work from perfumes and water.',
  true,
  true
),

-- Lehengas & Half Sarees
(
  'd1111111-1111-1111-1111-111111111107',
  'LH-2026-301',
  'Bridal Red Kundan Lehenga Choli Set',
  'bridal-red-kundan-lehenga-choli-set',
  'A grand bridal lehenga with a flared 3-metre kalidar skirt, heavy Kundan and dabka embroidery, a matching choli, and a netted dupatta with embroidered borders.',
  24900.00,
  true,
  'c1111111-1111-1111-1111-111111111103',
  'Raw Silk & Velvet',
  'Kundan & Zardozi Handwork',
  'Bridal Red & Antique Gold',
  'Dry clean only. Store flat in a padded garment bag.',
  true,
  true
),
(
  'd1111111-1111-1111-1111-111111111108',
  'LH-2026-302',
  'Mirror Work Half Saree (Langa Voni)',
  'mirror-work-half-saree-langa-voni',
  'A colourful traditional half saree set with real mirror and thread work on the skirt, a contrast choli, and a flowing dupatta. Ideal for festive and haldi functions.',
  8900.00,
  true,
  'c1111111-1111-1111-1111-111111111103',
  'Georgette & Cotton Silk',
  'Mirror & Resham Thread Work',
  'Sky Blue & Peach Gold',
  'Dry clean only. Handle mirror work with care while wearing.',
  false,
  true
),

-- Designer Dresses & Gowns
(
  'd1111111-1111-1111-1111-111111111110',
  'DG-2026-401',
  'Floor-Length Embroidered Anarkali Gown',
  'floor-length-embroidered-anarkali-gown',
  'A regal 16-kali floor-length Anarkali gown with delicate zari embroidery on the yoke and sleeve cuffs, paired with a sheer organza dupatta. Readymade in standard sizes.',
  7500.00,
  true,
  'c1111111-1111-1111-1111-111111111104',
  'Chanderi Silk & Organza',
  'Zari & Thread Embroidery',
  'Royal Blue & Champagne Gold',
  'Dry clean only. Hang dry in shade.',
  true,
  true
),
(
  'd1111111-1111-1111-1111-111111111111',
  'DG-2026-402',
  'Indowestern Co-ord Dress Set',
  'indowestern-coord-dress-set',
  'A chic Indowestern co-ord set featuring an embroidered crop jacket over a flowy draped dress. Modern silhouette with traditional detailing — perfect for sangeet and cocktail nights.',
  6200.00,
  true,
  'c1111111-1111-1111-1111-111111111104',
  'Italian Crepe & Net',
  'Machine Embroidery & Appliqué',
  'Soft Blue & Silver',
  'Dry clean or gentle cold-water hand wash.',
  false,
  true
),

-- Salwar Suits & Kurtis
(
  'd1111111-1111-1111-1111-111111111113',
  'SW-2026-501',
  'Cotton Printed Daily Wear Kurti',
  'cotton-printed-daily-wear-kurti',
  'A breathable cotton straight-cut kurti with block prints, a subtle mirror neckline, and side slits. Comfortable for college, office, and everyday ethnic styling.',
  1299.00,
  true,
  'c1111111-1111-1111-1111-111111111105',
  'Pure Cotton',
  'Block Print & Mirror Accents',
  'Indigo Blue & White',
  'Machine wash cold with like colours. Medium iron.',
  false,
  true
),
(
  'd1111111-1111-1111-1111-111111111114',
  'SW-2026-502',
  'Festive Palazzo Suit with Dupatta',
  'festive-palazzo-suit-with-dupatta',
  'A complete three-piece palazzo suit set — a straight kurta with gota patti detailing, wide palazzo pants, and a lightweight chiffon dupatta. Perfect for festive gatherings.',
  3400.00,
  true,
  'c1111111-1111-1111-1111-111111111105',
  'Georgette & Santoon',
  'Gota Patti & Lace Work',
  'Sapphire Blue & Gold',
  'Dry clean only.',
  false,
  true
),

-- Kids Ethnic Wear
(
  'd1111111-1111-1111-1111-111111111115',
  'KD-2026-601',
  'Little Princess Silk Pattu Pavadai',
  'little-princess-silk-pattu-pavadai',
  'A traditional South Indian pattu pavadai (silk skirt and blouse) for little girls, with a soft cotton lining and contrast gold zari border. Comfortable for all-day weddings and festivals.',
  2800.00,
  true,
  'c1111111-1111-1111-1111-111111111106',
  'Pure Silk & Cotton Lining',
  'Zari Border',
  'Sky Blue & Mango Gold',
  'Dry clean recommended or gentle cold-water hand wash.',
  true,
  true
),
(
  'd1111111-1111-1111-1111-111111111116',
  'KD-2026-602',
  'Kids Festive Brocade Lehenga Choli',
  'kids-festive-brocade-lehenga-choli',
  'An enchanting kids lehenga choli with a gold brocade flared skirt, embroidered silk choli, and adjustable side ties. Easy to wear for growing children.',
  2400.00,
  true,
  'c1111111-1111-1111-1111-111111111106',
  'Brocade Silk & Raw Silk',
  'Brocade Weave & Beadwork',
  'Royal Navy & Gold',
  'Dry clean only.',
  false,
  true
);

-- ------------------------------------------------------------------------------
-- 4. SEED PRODUCT IMAGES (Valid UUID prefix e111...)
-- ------------------------------------------------------------------------------
INSERT INTO public.product_images (id, product_id, image_url, is_primary, sort_order) VALUES
-- 101: Royal Kanchipuram
('e1111111-1111-1111-1111-111111111101', 'd1111111-1111-1111-1111-111111111101', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000', true, 1),
('e1111111-1111-1111-1111-111111111102', 'd1111111-1111-1111-1111-111111111101', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000', false, 2),
('e1111111-1111-1111-1111-111111111103', 'd1111111-1111-1111-1111-111111111101', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000', false, 3),

-- 102: Banarasi Brocade
('e1111111-1111-1111-1111-111111111104', 'd1111111-1111-1111-1111-111111111102', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000', true, 1),
('e1111111-1111-1111-1111-111111111105', 'd1111111-1111-1111-1111-111111111102', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000', false, 2),

-- 103: Mysore Crepe
('e1111111-1111-1111-1111-111111111106', 'd1111111-1111-1111-1111-111111111103', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000', true, 1),

-- 104: Sequin Georgette
('e1111111-1111-1111-1111-111111111108', 'd1111111-1111-1111-1111-111111111104', 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1000', true, 1),
('e1111111-1111-1111-1111-111111111109', 'd1111111-1111-1111-1111-111111111104', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000', false, 2),

-- 105: Floral Organza
('e1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111105', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000', true, 1),

-- 106: Zardozi Reception
('e1111111-1111-1111-1111-111111111112', 'd1111111-1111-1111-1111-111111111106', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000', true, 1),

-- 107: Bridal Lehenga
('e1111111-1111-1111-1111-111111111114', 'd1111111-1111-1111-1111-111111111107', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000', true, 1),

-- 108: Mirror Half Saree
('e1111111-1111-1111-1111-111111111116', 'd1111111-1111-1111-1111-111111111108', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000', true, 1),

-- 110: Anarkali Gown
('e1111111-1111-1111-1111-111111111118', 'd1111111-1111-1111-1111-111111111110', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000', true, 1),

-- 111: Indowestern Co-ord
('e1111111-1111-1111-1111-111111111120', 'd1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1000', true, 1),

-- 113: Cotton Kurti
('e1111111-1111-1111-1111-111111111122', 'd1111111-1111-1111-1111-111111111113', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000', true, 1),

-- 114: Palazzo Suit
('e1111111-1111-1111-1111-111111111124', 'd1111111-1111-1111-1111-111111111114', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000', true, 1),

-- 115: Kids Pattu Pavadai
('e1111111-1111-1111-1111-111111111125', 'd1111111-1111-1111-1111-111111111115', 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=1000', true, 1),
('e1111111-1111-1111-1111-111111111126', 'd1111111-1111-1111-1111-111111111115', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000', false, 2),

-- 116: Kids Brocade Lehenga
('e1111111-1111-1111-1111-111111111127', 'd1111111-1111-1111-1111-111111111116', 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=1000', true, 1);
