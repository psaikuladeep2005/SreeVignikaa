export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
  created_at?: string;
}

export interface Product {
  id: string;
  product_code: string;
  name: string;
  slug: string;
  description: string;
  price: number | null;
  is_price_visible: boolean;
  category_id: string;
  fabric: string;
  work_type: string;
  color: string;
  care_instructions: string;
  is_featured: boolean;
  is_available: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductWithImages extends Product {
  images: ProductImage[];
  category?: Category;
}

export interface BoutiqueSettings {
  id: string;
  boutique_name: string;
  logo_url?: string;
  whatsapp_number: string;
  instagram_url: string;
  email: string;
  address: string;
  hero_title: string;
  hero_subtitle: string;
  about_text: string;
  created_at?: string;
  updated_at?: string;
}

export interface FilterState {
  categorySlug?: string;
  search?: string;
  workType?: string;
  fabric?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "featured" | "newest" | "price-asc" | "price-desc" | "name-asc";
  onlyAvailable?: boolean;
}

export interface CustomizationOptions {
  customNeckline?: boolean;
  colorChange?: boolean;
  sleeveChange?: boolean;
  urgentOrder?: boolean;
  customerNotes?: string;
}
