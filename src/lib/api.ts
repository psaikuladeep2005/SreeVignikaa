import {
  Category,
  ProductWithImages,
  BoutiqueSettings,
  FilterState,
  ProductImage,
} from "./types";
import {
  initialCategories,
  initialProducts,
  initialBoutiqueSettings,
} from "./demo-data";
import { supabase, isSupabaseConfigured } from "./supabase";

// LocalStorage Keys for persistent demo/fallback mode
const STORAGE_KEYS = {
  PRODUCTS: "sreevignikaa_products_v1",
  CATEGORIES: "sreevignikaa_categories_v1",
  SETTINGS: "sreevignikaa_settings_v1",
};

// Helper to get local data safely in browser or memory in SSR
function getLocalStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    const parsed = JSON.parse(data);
    // Migrate legacy name if present
    if (
      parsed &&
      typeof parsed === "object" &&
      "boutique_name" in parsed
    ) {
      if (parsed.boutique_name === "sreevignikaa") {
        parsed.boutique_name = "SREEVIGNIKAA Sarees";
      }
      if (typeof parsed.logo_url === "undefined") {
        parsed.logo_url = "";
      }
      localStorage.setItem(key, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return fallback;
  }
}

function setLocalStore<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Error writing to localStorage:", err);
  }
}

// ------------------------------------------------------------------------------
// CATEGORIES API
// ------------------------------------------------------------------------------
export async function getCategories(includeInactive: boolean = false): Promise<Category[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      let query = supabase.from("categories").select("*").order("sort_order", { ascending: true });
      if (!includeInactive) {
        query = query.eq("is_active", true);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    } catch (error) {
      console.warn("Supabase fetch categories failed, falling back to local demo store:", error);
    }
  }

  const localCategories = getLocalStore<Category[]>(STORAGE_KEYS.CATEGORIES, initialCategories);
  if (!includeInactive) {
    return localCategories.filter((c) => c.is_active);
  }
  return localCategories;
}

export async function saveCategory(categoryData: Partial<Category>): Promise<Category> {
  const isNew = !categoryData.id;
  const newCat: Category = {
    id: categoryData.id || `c-${Date.now()}`,
    name: categoryData.name || "Unnamed Category",
    slug: categoryData.slug || `cat-${Date.now()}`,
    description: categoryData.description || "",
    image_url: categoryData.image_url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
    sort_order: categoryData.sort_order ?? 99,
    is_active: categoryData.is_active ?? true,
    created_at: categoryData.created_at || new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      if (isNew) {
        await supabase.from("categories").insert([newCat]);
      } else {
        await supabase.from("categories").update(categoryData).eq("id", categoryData.id);
      }
    } catch (error) {
      console.warn("Supabase save category failed, falling back to local:", error);
    }
  }

  const categories = getLocalStore<Category[]>(STORAGE_KEYS.CATEGORIES, initialCategories);
  let updated: Category[];
  if (isNew) {
    updated = [...categories, newCat];
  } else {
    updated = categories.map((c) => (c.id === newCat.id ? { ...c, ...newCat } : c));
  }
  setLocalStore(STORAGE_KEYS.CATEGORIES, updated);
  return newCat;
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("categories").delete().eq("id", id);
    } catch (e) {
      console.warn("Supabase delete category failed, falling back to local:", e);
    }
  }

  const categories = getLocalStore<Category[]>(STORAGE_KEYS.CATEGORIES, initialCategories);
  const filtered = categories.filter((c) => c.id !== id);
  setLocalStore(STORAGE_KEYS.CATEGORIES, filtered);
  return true;
}

// ------------------------------------------------------------------------------
// PRODUCTS API
// ------------------------------------------------------------------------------
export async function getProducts(filters?: FilterState): Promise<ProductWithImages[]> {
  let products: ProductWithImages[] = [];

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          images:product_images(*),
          category:categories(*)
        `)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        products = (data as any[]).map((p) => ({
          ...p,
          images: Array.isArray(p.images)
            ? p.images.sort((a: ProductImage, b: ProductImage) => a.sort_order - b.sort_order)
            : [],
        }));
      }
    } catch (err) {
      console.warn("Supabase products query failed, using local demo store:", err);
    }
  }

  if (products.length === 0) {
    products = getLocalStore<ProductWithImages[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
    const categories = await getCategories(true);
    products = products.map((p) => ({
      ...p,
      category: categories.find((c) => c.id === p.category_id),
    }));
  }

  // Apply filters in code to support full search & filter behavior
  if (filters) {
    if (filters.onlyAvailable) {
      products = products.filter((p) => p.is_available);
    }
    if (filters.categorySlug && filters.categorySlug !== "all") {
      products = products.filter(
        (p) => p.category?.slug === filters.categorySlug || p.category_id === filters.categorySlug
      );
    }
    if (filters.workType && filters.workType !== "all") {
      products = products.filter((p) =>
        p.work_type.toLowerCase().includes(filters.workType!.toLowerCase())
      );
    }
    if (filters.fabric && filters.fabric !== "all") {
      products = products.filter((p) =>
        p.fabric.toLowerCase().includes(filters.fabric!.toLowerCase())
      );
    }
    if (filters.minPrice !== undefined) {
      products = products.filter((p) => (p.price || 0) >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      products = products.filter((p) => (p.price || 0) <= filters.maxPrice!);
    }
    if (filters.search && filters.search.trim() !== "") {
      const q = filters.search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.product_code.toLowerCase().includes(q) ||
          p.work_type.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q)
      );
    }
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "featured":
          products = [...products].sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
          break;
        case "newest":
          products = [...products].sort(
            (a, b) => new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime()
          );
          break;
        case "price-asc":
          products = [...products].sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
        case "price-desc":
          products = [...products].sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
        case "name-asc":
          products = [...products].sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }
  }

  return products;
}

export async function getProductBySlug(slug: string): Promise<ProductWithImages | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug || p.id === slug) || null;
}

export async function getProductById(id: string): Promise<ProductWithImages | null> {
  const all = await getProducts();
  return all.find((p) => p.id === id) || null;
}

export async function saveProduct(
  productData: Partial<ProductWithImages>,
  imagesData: Partial<ProductImage>[] = []
): Promise<ProductWithImages> {
  const isNew = !productData.id;
  const id = productData.id || `p-${Date.now()}`;
  const now = new Date().toISOString();

  const newProduct: ProductWithImages = {
    id,
    product_code: productData.product_code || `BL-${Date.now().toString().slice(-4)}`,
    name: productData.name || "Ethnic Wear Product",
    slug: productData.slug || `creation-${Date.now()}`,
    description: productData.description || "Handcrafted with precision and exquisite South Indian artistry.",
    price: productData.price === undefined ? null : Number(productData.price),
    is_price_visible: productData.is_price_visible ?? true,
    category_id: productData.category_id || "c1111111-1111-1111-1111-111111111101",
    fabric: productData.fabric || "Pure Kanchipuram Silk",
    work_type: productData.work_type || "Zari Work",
    color: productData.color || "Royal Navy & Gold",
    care_instructions: productData.care_instructions || "Dry Clean Only",
    is_featured: productData.is_featured ?? false,
    is_available: productData.is_available ?? true,
    created_at: productData.created_at || now,
    updated_at: now,
    images: imagesData.map((img, idx) => ({
      id: img.id || `i-${Date.now()}-${idx}`,
      product_id: id,
      image_url: img.image_url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000",
      is_primary: idx === 0 ? true : Boolean(img.is_primary),
      sort_order: idx + 1,
    })),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const pRecord = {
        id: newProduct.id,
        product_code: newProduct.product_code,
        name: newProduct.name,
        slug: newProduct.slug,
        description: newProduct.description,
        price: newProduct.price,
        is_price_visible: newProduct.is_price_visible,
        category_id: newProduct.category_id,
        fabric: newProduct.fabric,
        work_type: newProduct.work_type,
        color: newProduct.color,
        care_instructions: newProduct.care_instructions,
        is_featured: newProduct.is_featured,
        is_available: newProduct.is_available,
        updated_at: now,
      };

      if (isNew) {
        await supabase.from("products").insert([pRecord]);
      } else {
        await supabase.from("products").update(pRecord).eq("id", id);
      }

      // Update images
      await supabase.from("product_images").delete().eq("product_id", id);
      const toInsert = newProduct.images.map((img) => ({
        id: img.id,
        product_id: id,
        image_url: img.image_url,
        is_primary: img.is_primary,
        sort_order: img.sort_order,
      }));
      if (toInsert.length > 0) {
        await supabase.from("product_images").insert(toInsert);
      }
    } catch (error) {
      console.warn("Supabase save product error, using local demo store:", error);
    }
  }

  const existingProducts = getLocalStore<ProductWithImages[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
  let updatedList: ProductWithImages[];
  if (isNew) {
    updatedList = [newProduct, ...existingProducts];
  } else {
    updatedList = existingProducts.map((p) => (p.id === id ? { ...p, ...newProduct } : p));
  }
  setLocalStore(STORAGE_KEYS.PRODUCTS, updatedList);
  return newProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        console.warn("Supabase delete error:", error);
      }
    } catch (err) {
      console.warn("Supabase delete product error, falling back to local:", err);
    }
  }

  const existing = getLocalStore<ProductWithImages[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
  const filtered = existing.filter((p) => p.id !== id);
  setLocalStore(STORAGE_KEYS.PRODUCTS, filtered);
  return true;
}

// ------------------------------------------------------------------------------
// BOUTIQUE SETTINGS API
// ------------------------------------------------------------------------------
export async function getBoutiqueSettings(): Promise<BoutiqueSettings> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from("boutique_settings").select("*").limit(1).single();
      if (!error && data) {
        return data as BoutiqueSettings;
      }
    } catch (e) {
      console.warn("Supabase fetch settings failed, using local demo store:", e);
    }
  }

  return getLocalStore<BoutiqueSettings>(STORAGE_KEYS.SETTINGS, initialBoutiqueSettings);
}

export async function saveBoutiqueSettings(
  updatedSettings: Partial<BoutiqueSettings>
): Promise<BoutiqueSettings> {
  const current = await getBoutiqueSettings();
  const next: BoutiqueSettings = {
    ...current,
    ...updatedSettings,
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("boutique_settings").update(next).eq("id", current.id);
    } catch (err) {
      console.warn("Supabase save settings error, using local demo store:", err);
    }
  }

  setLocalStore(STORAGE_KEYS.SETTINGS, next);
  return next;
}

// ------------------------------------------------------------------------------
// IMAGE UPLOAD API (Supports Supabase Storage bucket 'boutique-images' + fallback data URI)
// ------------------------------------------------------------------------------
export async function uploadProductImageFile(file: File): Promise<string> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("boutique-images")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (!uploadError) {
        const { data } = supabase.storage.from("boutique-images").getPublicUrl(filePath);
        if (data?.publicUrl) {
          return data.publicUrl;
        }
      }
    } catch (err) {
      console.warn("Supabase storage upload error, falling back to local data URI:", err);
    }
  }

  // Fallback to Data URI for local preview testing without Supabase storage keys
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
