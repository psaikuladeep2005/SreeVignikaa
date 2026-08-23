-- ==============================================================================
-- SREEVIGNIKAA SAREES - SUPABASE POSTGRESQL SCHEMA & RLS POLICIES
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. CATEGORIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. PRODUCTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2),
  is_price_visible BOOLEAN DEFAULT true,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  fabric TEXT NOT NULL DEFAULT 'Kanchipuram Silk',
  work_type TEXT NOT NULL DEFAULT 'Zari Work',
  color TEXT NOT NULL DEFAULT 'Navy & Gold',
  care_instructions TEXT DEFAULT 'Dry clean only. Store folded in a muslin cloth.',
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. PRODUCT IMAGES TABLE (Support for multiple images per product)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. BOUTIQUE SETTINGS TABLE (Store Boutique contact & WhatsApp details)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.boutique_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  boutique_name TEXT NOT NULL DEFAULT 'SREEVIGNIKAA Sarees',
  logo_url TEXT DEFAULT '',
  whatsapp_number TEXT NOT NULL DEFAULT '919876543210',
  instagram_url TEXT DEFAULT 'https://instagram.com/sreevignikaa_official',
  email TEXT DEFAULT 'contact@sreevignikaa.com',
  address TEXT DEFAULT 'Couture Studio, Trunk Road, Kadapa, Andhra Pradesh, 516001',
  hero_title TEXT DEFAULT 'Handcrafted South Indian Bridal Couture & Bespoke Blouses',
  hero_subtitle TEXT DEFAULT 'Specializing in authentic Maggam work, intricate Aari hand embroidery, custom bridal blouses, women''s designer wear, and kids'' festive attire.',
  about_text TEXT DEFAULT 'Founded with a passion for traditional South Indian craftsmanship, SREEVIGNIKAA Sarees creates bespoke blouses and bridal wear that blend ancestral embroidery artistry with modern silhouettes.',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. UPDATED_AT TRIGGER FUNCTION
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE TRIGGER set_settings_updated_at
  BEFORE UPDATE ON public.boutique_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- ------------------------------------------------------------------------------
-- 6. INDEXES FOR PERFORMANCE
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_code ON public.products(product_code);
CREATE INDEX IF NOT EXISTS idx_products_work_type ON public.products(work_type);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON public.product_images(product_id);

-- ------------------------------------------------------------------------------
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boutique_settings ENABLE ROW LEVEL SECURITY;

-- CATEGORIES: Anyone can view active categories
CREATE POLICY "Public can view active categories"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (true)
  WITH CHECK (true);

-- PRODUCTS: Anyone can view available products, authenticated users can manage all
CREATE POLICY "Public can view products"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (true)
  WITH CHECK (true);

-- PRODUCT IMAGES: Anyone can view images
CREATE POLICY "Public can view product images"
  ON public.product_images FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage product images"
  ON public.product_images FOR ALL
  USING (true)
  WITH CHECK (true);

-- BOUTIQUE SETTINGS: Anyone can view settings
CREATE POLICY "Public can view boutique settings"
  ON public.boutique_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can update settings"
  ON public.boutique_settings FOR ALL
  USING (true)
  WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 8. SUPABASE STORAGE BUCKET CONFIGURATION (boutique-images)
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('boutique-images', 'boutique-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies for boutique-images bucket
CREATE POLICY "Public Read Access on boutique-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'boutique-images');

CREATE POLICY "Admin Upload on boutique-images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'boutique-images');

CREATE POLICY "Admin Update on boutique-images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'boutique-images');

CREATE POLICY "Admin Delete on boutique-images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'boutique-images');
