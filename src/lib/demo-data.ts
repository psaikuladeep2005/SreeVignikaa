import { Category, ProductWithImages, BoutiqueSettings } from "./types";

export const initialBoutiqueSettings: BoutiqueSettings = {
  id: "11111111-1111-1111-1111-111111111111",
  boutique_name: "SREEVIGNIKAA Sarees",
  logo_url: "",
  whatsapp_number: "919876543210",
  instagram_url: "https://instagram.com/sreevignikaa_official",
  email: "contact@sreevignikaa.com",
  address: "SREEVIGNIKAA Sarees Studio, Trunk Road, Kadapa, Andhra Pradesh, 516001",
  hero_title: "Elegant Sarees, Designer Dresses & Festive Ethnic Wear",
  hero_subtitle:
    "Discover handpicked Kanchipuram & Banarasi silk sarees, ready-to-wear designer dresses, festive lehengas, and everyday ethnic wear — curated for every occasion, delivered across India.",
  about_text:
    "SREEVIGNIKAA Sarees is a curated fashion boutique celebrating the grace of the Indian drape and the charm of contemporary ethnic wear. From heritage Kanchipuram silks and Banarasi weaves to flowing designer dresses and festive lehengas, every piece is hand-selected for quality, finish, and timeless style.",
};

export const initialCategories: Category[] = [
  {
    id: "c1111111-1111-1111-1111-111111111101",
    name: "Silk Sarees",
    slug: "silk-sarees",
    description:
      "Pure Kanchipuram, Banarasi, Mysore and Uppada silk sarees with rich zari borders — perfect for weddings, Muhurtham, and grand festive occasions.",
    image_url:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "c1111111-1111-1111-1111-111111111102",
    name: "Designer Sarees",
    slug: "designer-sarees",
    description:
      "Contemporary organza, georgette, and sequin-embroidered designer sarees for receptions, parties, and modern festive celebrations.",
    image_url:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "c1111111-1111-1111-1111-111111111103",
    name: "Lehengas & Half Sarees",
    slug: "lehengas-half-sarees",
    description:
      "Stunning bridal and festive lehengas, half sarees, and chaniya cholis with intricate zardozi, mirror, and thread work.",
    image_url:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "c1111111-1111-1111-1111-111111111104",
    name: "Designer Dresses & Gowns",
    slug: "designer-dresses-gowns",
    description:
      "Floor-length gowns, Anarkali suits, Indowestern dresses, and co-ord sets blending traditional craftsmanship with modern silhouettes.",
    image_url:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    sort_order: 4,
    is_active: true,
  },
  {
    id: "c1111111-1111-1111-1111-111111111105",
    name: "Salwar Suits & Kurtis",
    slug: "salwar-suits-kurtis",
    description:
      "Comfortable daily-wear and festive salwar suits, Anarkalis, palazzo sets, and stylish kurtis in cotton, rayon, and georgette.",
    image_url:
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=800",
    sort_order: 5,
    is_active: true,
  },
  {
    id: "c1111111-1111-1111-1111-111111111106",
    name: "Kids' Ethnic Wear",
    slug: "kids-ethnic-wear",
    description:
      "Adorable silk pattu pavadai, kids lehengas, festive frocks, and kurta sets crafted with soft, skin-friendly fabrics.",
    image_url:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800",
    sort_order: 6,
    is_active: true,
  },
];

export const initialProducts: ProductWithImages[] = [
  // Silk Sarees
  {
    id: "d1111111-1111-1111-1111-111111111101",
    product_code: "SS-2026-101",
    name: "Royal Kanchipuram Temple Border Silk Saree",
    slug: "royal-kanchipuram-temple-border-silk-saree",
    description:
      "A timeless Kanchipuram handloom silk saree in deep navy with a wide gold zari temple border, intricate butta motifs across the body, and a rich contrast pallu. A heritage bridal and Muhurtham favourite.",
    price: 18500,
    is_price_visible: true,
    category_id: "c1111111-1111-1111-1111-111111111101",
    fabric: "Pure Kanchipuram Silk",
    work_type: "Gold Zari Temple Border",
    color: "Deep Navy & Royal Gold",
    care_instructions:
      "Dry clean only. Store folded in a muslin cloth and re-fold every few months to protect zari.",
    is_featured: true,
    is_available: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "e1111111-1111-1111-1111-111111111101",
        product_id: "d1111111-1111-1111-1111-111111111101",
        image_url:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000",
        is_primary: true,
        sort_order: 1,
      },
      {
        id: "e1111111-1111-1111-1111-111111111102",
        product_id: "d1111111-1111-1111-1111-111111111101",
        image_url:
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000",
        is_primary: false,
        sort_order: 2,
      },
      {
        id: "e1111111-1111-1111-1111-111111111103",
        product_id: "d1111111-1111-1111-1111-111111111101",
        image_url:
          "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000",
        is_primary: false,
        sort_order: 3,
      },
    ],
  },
  {
    id: "d1111111-1111-1111-1111-111111111102",
    product_code: "SS-2026-102",
    name: "Banarasi Brocade Wedding Silk Saree",
    slug: "banarasi-brocade-wedding-silk-saree",
    description:
      "Handwoven Banarasi silk saree with dense brocade jaal work, a floral paisley pallu, and a contrast satin border. Comes with an unstitched running blouse piece.",
    price: 12800,
    is_price_visible: true,
    category_id: "c1111111-1111-1111-1111-111111111101",
    fabric: "Pure Banarasi Silk",
    work_type: "Brocade Zari Jaal",
    color: "Royal Sapphire & Gold",
    care_instructions: "Dry clean only. Avoid direct folding pressure on brocade motifs.",
    is_featured: true,
    is_available: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "e1111111-1111-1111-1111-111111111104",
        product_id: "d1111111-1111-1111-1111-111111111102",
        image_url:
          "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000",
        is_primary: true,
        sort_order: 1,
      },
      {
        id: "e1111111-1111-1111-1111-111111111105",
        product_id: "d1111111-1111-1111-1111-111111111102",
        image_url:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000",
        is_primary: false,
        sort_order: 2,
      },
    ],
  },
  {
    id: "d1111111-1111-1111-1111-111111111103",
    product_code: "SS-2026-103",
    name: "Mysore Crepe Silk Everyday Saree",
    slug: "mysore-crepe-silk-everyday-saree",
    description:
      "A lightweight Mysore crepe silk saree with a minimal zari border, ideal for office wear, small poojas, and gifting. Soft drape and easy to maintain.",
    price: 5400,
    is_price_visible: true,
    category_id: "c1111111-1111-1111-1111-111111111101",
    fabric: "Mysore Crepe Silk",
    work_type: "Plain with Zari Border",
    color: "Royal Blue & Gold",
    care_instructions: "Dry clean recommended. Gentle steam iron on medium heat.",
    is_featured: false,
    is_available: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "e1111111-1111-1111-1111-111111111106",
        product_id: "d1111111-1111-1111-1111-111111111103",
        image_url:
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },

  // Designer Sarees
  {
    id: "d1111111-1111-1111-1111-111111111104",
    product_code: "DS-2026-204",
    name: "Sequin Embroidered Georgette Party Saree",
    slug: "sequin-embroidered-georgette-party-saree",
    description:
      "A shimmering georgette party-wear saree with all-over delicate sequin and cut-bead embroidery, finished with a lace border. Includes an unstitched embroidered blouse piece.",
    price: 6800,
    is_price_visible: true,
    category_id: "c1111111-1111-1111-1111-111111111102",
    fabric: "Pure Georgette",
    work_type: "Sequin & Cut-Bead Embroidery",
    color: "Midnight Blue & Silver",
    care_instructions:
      "Dry clean recommended. Iron on reverse only; avoid scrubbing embroidered areas.",
    is_featured: true,
    is_available: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "e1111111-1111-1111-1111-111111111108",
        product_id: "d1111111-1111-1111-1111-111111111104",
        image_url:
          "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1000",
        is_primary: true,
        sort_order: 1,
      },
      {
        id: "e1111111-1111-1111-1111-111111111109",
        product_id: "d1111111-1111-1111-1111-111111111104",
        image_url:
          "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000",
        is_primary: false,
        sort_order: 2,
      },
    ],
  },
  {
    id: "d1111111-1111-1111-1111-111111111105",
    product_code: "DS-2026-205",
    name: "Floral Organza Printed Designer Saree",
    slug: "floral-organza-printed-designer-saree",
    description:
      "A breezy organza saree with hand-screened floral prints, a satin hand-rolled border, and a matching printed blouse piece. Perfect for day events and brunch receptions.",
    price: 4500,
    is_price_visible: true,
    category_id: "c1111111-1111-1111-1111-111111111102",
    fabric: "Organza Silk",
    work_type: "Digital Floral Print",
    color: "Ice White & Sapphire",
    care_instructions: "Dry clean only. Store flat to protect sheer organza.",
    is_featured: false,
    is_available: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "e1111111-1111-1111-1111-111111111111",
        product_id: "d1111111-1111-1111-1111-111111111105",
        image_url:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },
  {
    id: "d1111111-1111-1111-1111-111111111106",
    product_code: "DS-2026-206",
    name: "Zardozi Embroidered Reception Saree",
    slug: "zardozi-embroidered-reception-saree",
    description:
      "A statement reception saree in premium satin georgette with heavy zardozi and pearl embroidery on the pallu and border. Designed to sparkle under evening lights.",
    price: 9200,
    is_price_visible: true,
    category_id: "c1111111-1111-1111-1111-111111111102",
    fabric: "Satin Georgette",
    work_type: "Zardozi & Pearl Embroidery",
    color: "Navy Blue & Pearl White",
    care_instructions: "Dry clean only. Protect pearl work from perfumes and water.",
    is_featured: true,
    is_available: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "e1111111-1111-1111-1111-111111111112",
        product_id: "d1111111-1111-1111-1111-111111111106",
        image_url:
          "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },

  // Lehengas & Half Sarees
  {
    id: "d1111111-1111-1111-1111-111111111107",
    product_code: "LH-2026-301",
    name: "Bridal Red Kundan Lehenga Choli Set",
    slug: "bridal-red-kundan-lehenga-choli-set",
    description:
      "A grand bridal lehenga with a flared 3-metre kalidar skirt, heavy Kundan and dabka embroidery, a matching choli, and a netted dupatta with embroidered borders.",
    price: 24900,
    is_price_visible: true,
    category_id: "c1111111-1111-1111-1111-111111111103",
    fabric: "Raw Silk & Velvet",
    work_type: "Kundan & Zardozi Handwork",
    color: "Bridal Red & Antique Gold",
    care_instructions: "Dry clean only. Store flat in a padded garment bag.",
    is_featured: true,
    is_available: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "e1111111-1111-1111-1111-111111111114",
        product_id: "d1111111-1111-1111-1111-111111111107",
        image_url:
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },
  {
    id: "d1111111-1111-1111-1111-111111111108",
    product_code: "LH-2026-302",
    name: "Mirror Work Half Saree (Langa Voni)",
    slug: "mirror-work-half-saree-langa-voni",
    description:
      "A colourful traditional half saree set with real mirror and thread work on the skirt, a contrast choli, and a flowing dupatta. Ideal for festive and haldi functions.",
    price: 8900,
    is_price_visible: true,
    category_id: "c1111111-1111-1111-1111-111111111103",
    fabric: "Georgette & Cotton Silk",
    work_type: "Mirror & Resham Thread Work",
    color: "Sky Blue & Peach Gold",
    care_instructions: "Dry clean only. Handle mirror work with care while wearing.",
    is_featured: false,
    is_available: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "e1111111-1111-1111-1111-111111111116",
        product_id: "d1111111-1111-1111-1111-111111111108",
        image_url:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },

  // Designer Dresses & Gowns
  {
    id: "d1111111-1111-1111-1111-111111111110",
    product_code: "DG-2026-401",
    name: "Floor-Length Embroidered Anarkali Gown",
    slug: "floor-length-embroidered-anarkali-gown",
    description:
      "A regal 16-kali floor-length Anarkali gown with delicate zari embroidery on the yoke and sleeve cuffs, paired with a sheer organza dupatta. Readymade in standard sizes.",
    price: 7500,
    is_price_visible: true,
    category_id: "c1111111-1111-1111-1111-111111111104",
    fabric: "Chanderi Silk & Organza",
    work_type: "Zari & Thread Embroidery",
    color: "Royal Blue & Champagne Gold",
    care_instructions: "Dry clean only. Hang dry in shade.",
    is_featured: true,
    is_available: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "e1111111-1111-1111-1111-111111111118",
        product_id: "d1111111-1111-1111-1111-111111111110",
        image_url:
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },
  {
    id: "d1111111-1111-1111-1111-111111111111",
    product_code: "DG-2026-402",
    name: "Indowestern Co-ord Dress Set",
    slug: "indowestern-coord-dress-set",
    description:
      "A chic Indowestern co-ord set featuring an embroidered crop jacket over a flowy draped dress. Modern silhouette with traditional detailing — perfect for sangeet and cocktail nights.",
    price: 6200,
    is_price_visible: true,
    category_id: "c1111111-1111-1111-1111-111111111104",
    fabric: "Italian Crepe & Net",
    work_type: "Machine Embroidery & Appliqué",
    color: "Soft Blue & Silver",
    care_instructions: "Dry clean or gentle cold-water hand wash.",
    is_featured: false,
    is_available: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "e1111111-1111-1111-1111-111111111120",
        product_id: "d1111111-1111-1111-1111-111111111111",
        image_url:
          "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1000",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },

  // Salwar Suits & Kurtis
  {
    id: "d1111111-1111-1111-1111-111111111113",
    product_code: "SW-2026-501",
    name: "Cotton Printed Daily Wear Kurti",
    slug: "cotton-printed-daily-wear-kurti",
    description:
      "A breathable cotton straight-cut kurti with block prints, a subtle mirror neckline, and side slits. Comfortable for college, office, and everyday ethnic styling.",
    price: 1299,
    is_price_visible: true,
    category_id: "c1111111-1111-1111-1111-111111111105",
    fabric: "Pure Cotton",
    work_type: "Block Print & Mirror Accents",
    color: "Indigo Blue & White",
    care_instructions: "Machine wash cold with like colours. Medium iron.",
    is_featured: false,
    is_available: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "e1111111-1111-1111-1111-111111111122",
        product_id: "d1111111-1111-1111-1111-111111111113",
        image_url:
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },
  {
    id: "d1111111-1111-1111-1111-111111111114",
    product_code: "SW-2026-502",
    name: "Festive Palazzo Suit with Dupatta",
    slug: "festive-palazzo-suit-with-dupatta",
    description:
      "A complete three-piece palazzo suit set — a straight kurta with gota patti detailing, wide palazzo pants, and a lightweight chiffon dupatta. Perfect for festive gatherings.",
    price: 3400,
    is_price_visible: true,
    category_id: "c1111111-1111-1111-1111-111111111105",
    fabric: "Georgette & Santoon",
    work_type: "Gota Patti & Lace Work",
    color: "Sapphire Blue & Gold",
    care_instructions: "Dry clean only.",
    is_featured: false,
    is_available: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "e1111111-1111-1111-1111-111111111124",
        product_id: "d1111111-1111-1111-1111-111111111114",
        image_url:
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },

  // Kids' Ethnic Wear
  {
    id: "d1111111-1111-1111-1111-111111111115",
    product_code: "KD-2026-601",
    name: "Little Princess Silk Pattu Pavadai",
    slug: "little-princess-silk-pattu-pavadai",
    description:
      "A traditional South Indian pattu pavadai (silk skirt and blouse) for little girls, with a soft cotton lining and contrast gold zari border. Comfortable for all-day weddings and festivals.",
    price: 2800,
    is_price_visible: true,
    category_id: "c1111111-1111-1111-1111-111111111106",
    fabric: "Pure Silk & Cotton Lining",
    work_type: "Zari Border",
    color: "Sky Blue & Mango Gold",
    care_instructions:
      "Dry clean recommended or gentle cold-water hand wash.",
    is_featured: true,
    is_available: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "e1111111-1111-1111-1111-111111111125",
        product_id: "d1111111-1111-1111-1111-111111111115",
        image_url:
          "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=1000",
        is_primary: true,
        sort_order: 1,
      },
      {
        id: "e1111111-1111-1111-1111-111111111126",
        product_id: "d1111111-1111-1111-1111-111111111115",
        image_url:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000",
        is_primary: false,
        sort_order: 2,
      },
    ],
  },
  {
    id: "d1111111-1111-1111-1111-111111111116",
    product_code: "KD-2026-602",
    name: "Kids Festive Brocade Lehenga Choli",
    slug: "kids-festive-brocade-lehenga-choli",
    description:
      "An enchanting kids lehenga choli with a gold brocade flared skirt, embroidered silk choli, and adjustable side ties. Easy to wear for growing children.",
    price: 2400,
    is_price_visible: true,
    category_id: "c1111111-1111-1111-1111-111111111106",
    fabric: "Brocade Silk & Raw Silk",
    work_type: "Brocade Weave & Beadwork",
    color: "Royal Navy & Gold",
    care_instructions: "Dry clean only.",
    is_featured: false,
    is_available: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "e1111111-1111-1111-1111-111111111127",
        product_id: "d1111111-1111-1111-1111-111111111116",
        image_url:
          "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=1000",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },
];
