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

/**
 * PostgreSQL/Supabase UUID validation.
 * Any legacy/demo IDs such as "img-123" or "i-123-0" are not valid UUIDs.
 */
function isValidUUID(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
}

function generateUUID(): string {
  return crypto.randomUUID();
}


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
      if (error) throw error;
      return (data || []) as Category[];
    } catch (error) {
      console.error("Supabase fetch categories failed:", error);
      throw error;
    }
  }

  const localCategories = getLocalStore<Category[]>(STORAGE_KEYS.CATEGORIES, initialCategories);
  if (!includeInactive) {
    return localCategories.filter((c) => c.is_active);
  }
  return localCategories;
}

export async function saveCategory(categoryData: Partial<Category>): Promise<Category> {
  const isNew = !isValidUUID(categoryData.id);
  const now = new Date().toISOString();
  const categoryId = isNew ? generateUUID() : categoryData.id!;

  const categoryRecord = {
    ...(isNew ? { id: categoryId } : {}),
    name: categoryData.name || "Unnamed Category",
    slug: categoryData.slug || `cat-${Date.now()}`,
    description: categoryData.description || "",
    image_url:
      categoryData.image_url ||
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
    sort_order: categoryData.sort_order ?? 99,
    is_active: categoryData.is_active ?? true,
    created_at: categoryData.created_at || now,
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      if (isNew) {
        const { data, error } = await supabase
          .from("categories")
          .insert([categoryRecord])
          .select("*")
          .single();
        if (error) throw error;
        if (!data?.id) throw new Error("Supabase created the category but returned no category ID.");
        return data as Category;
      }

      const { data, error } = await supabase
        .from("categories")
        .update(categoryRecord)
        .eq("id", categoryId)
        .select("*")
        .single();
      if (error) throw error;
      if (!data?.id) throw new Error("Supabase updated the category but returned no category ID.");
      return data as Category;
    } catch (error) {
      console.error("Supabase save category failed:", error);
      throw error;
    }
  }

  const localCategories = getLocalStore<Category[]>(STORAGE_KEYS.CATEGORIES, initialCategories);
  const newCat: Category = {
    id: categoryId,
    name: categoryRecord.name,
    slug: categoryRecord.slug,
    description: categoryRecord.description,
    image_url: categoryRecord.image_url,
    sort_order: categoryRecord.sort_order,
    is_active: categoryRecord.is_active,
    created_at: categoryRecord.created_at,
  };
  const updated = isNew
    ? [...localCategories, newCat]
    : localCategories.map((c) => (c.id === categoryId ? { ...c, ...newCat } : c));
  setLocalStore(STORAGE_KEYS.CATEGORIES, updated);
  return newCat;
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    if (!isValidUUID(id)) throw new Error(`Invalid category ID: ${id}`);
    try {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Supabase delete category failed:", error);
      throw error;
    }
  }

  const categories = getLocalStore<Category[]>(STORAGE_KEYS.CATEGORIES, initialCategories);
  setLocalStore(STORAGE_KEYS.CATEGORIES, categories.filter((c) => c.id !== id));
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

      if (error) throw error;

      // An empty Supabase result is valid. Never replace it with demo products.
      products = (data || []).map((p) => ({
        ...p,
        images: Array.isArray(p.images)
          ? p.images.sort(
              (a: ProductImage, b: ProductImage) =>
                a.sort_order - b.sort_order
            )
          : [],
      }));
    } catch (error) {
      console.error("Supabase products query failed:", error);
      throw error;
    }
  } else {
    // Local/demo mode is used only when Supabase is not configured.
    products = getLocalStore<ProductWithImages[]>(
      STORAGE_KEYS.PRODUCTS,
      initialProducts
    );

    const categories = await getCategories(true);
    products = products.map((p) => ({
      ...p,
      category: categories.find((c) => c.id === p.category_id),
    }));
  }

  if (filters) {
    if (filters.onlyAvailable) {
      products = products.filter((p) => p.is_available);
    }
    if (filters.categorySlug && filters.categorySlug !== "all") {
      products = products.filter(
        (p) =>
          p.category?.slug === filters.categorySlug ||
          p.category_id === filters.categorySlug ||
          p.category?.id === filters.categorySlug
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
          products = [...products].sort(
            (a, b) =>
              (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0)
          );
          break;
        case "newest":
          products = [...products].sort(
            (a, b) =>
              new Date(b.created_at || "").getTime() -
              new Date(a.created_at || "").getTime()
          );
          break;
        case "price-asc":
          products = [...products].sort(
            (a, b) => (a.price || 0) - (b.price || 0)
          );
          break;
        case "price-desc":
          products = [...products].sort(
            (a, b) => (b.price || 0) - (a.price || 0)
          );
          break;
        case "name-asc":
          products = [...products].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
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
  const existingId = isValidUUID(productData.id) ? productData.id : null;
  const localId = existingId || generateUUID();
  const now = new Date().toISOString();

  const newProduct: ProductWithImages = {
    id: localId,
    product_code:
      productData.product_code || `BL-${Date.now().toString().slice(-4)}`,
    name: productData.name || "Ethnic Wear Product",
    slug: productData.slug || `creation-${Date.now()}`,
    description:
      productData.description ||
      "Handcrafted with precision and exquisite South Indian artistry.",
    price:
      productData.price === undefined ? null : Number(productData.price),
    is_price_visible: productData.is_price_visible ?? true,
    category_id:
      productData.category_id ||
      "c1111111-1111-1111-1111-111111111101",
    fabric: productData.fabric || "Pure Kanchipuram Silk",
    work_type: productData.work_type || "Zari Work",
    color: productData.color || "Royal Navy & Gold",
    care_instructions: productData.care_instructions || "Dry Clean Only",
    is_featured: productData.is_featured ?? false,
    is_available: productData.is_available ?? true,
    created_at: productData.created_at || now,
    updated_at: now,
    images: imagesData.map((img, idx) => ({
      id: isValidUUID(img.id) ? img.id : generateUUID(),
      product_id: localId,
      image_url:
        img.image_url ||
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000",
      is_primary: Boolean(img.is_primary),
      sort_order: idx + 1,
    })),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const pRecord = {
        ...(existingId ? { id: existingId } : {}),
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
        const { data: insertedProduct, error: productInsertError } =
          await supabase
            .from("products")
            .insert([pRecord])
            .select("*")
            .single();

        if (productInsertError) throw productInsertError;
        if (!insertedProduct?.id) {
          throw new Error(
            "Supabase created the product but returned no product ID."
          );
        }
        newProduct.id = insertedProduct.id;
      } else {
        const { data: updatedProduct, error: productUpdateError } =
          await supabase
            .from("products")
            .update(pRecord)
            .eq("id", existingId)
            .select("*")
            .single();

        if (productUpdateError) throw productUpdateError;
        if (!updatedProduct?.id) {
          throw new Error(
            "Supabase updated the product but returned no product ID."
          );
        }
        newProduct.id = updatedProduct.id;
      }

      const productId = newProduct.id;

      const { error: imageDeleteError } = await supabase
        .from("product_images")
        .delete()
        .eq("product_id", productId);

      if (imageDeleteError) throw imageDeleteError;

      const toInsert = newProduct.images.map((img) => ({
        id: generateUUID(),
        product_id: productId,
        image_url: img.image_url,
        is_primary: img.is_primary,
        sort_order: img.sort_order,
      }));

      if (toInsert.length > 0) {
        const { error: imageInsertError } = await supabase
          .from("product_images")
          .insert(toInsert);

        if (imageInsertError) throw imageInsertError;
      }

      const { data: savedImages, error: savedImagesError } = await supabase
        .from("product_images")
        .select("*")
        .eq("product_id", productId)
        .order("sort_order", { ascending: true });

      if (savedImagesError) throw savedImagesError;

      newProduct.images = (savedImages || []) as ProductImage[];

      // Supabase is the source of truth when configured.
      // Do not mirror product data into localStorage.
      return newProduct;
    } catch (error) {
      console.error("Supabase save product failed:", error);
      throw error;
    }
  }

  // Local/demo mode only.
  const existingProducts = getLocalStore<ProductWithImages[]>(
    STORAGE_KEYS.PRODUCTS,
    initialProducts
  );

  const updatedList = isNew
    ? [newProduct, ...existingProducts]
    : existingProducts.map((p) =>
        p.id === localId ? { ...p, ...newProduct } : p
      );

  setLocalStore(STORAGE_KEYS.PRODUCTS, updatedList);
  return newProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    try {
      if (!isValidUUID(id)) {
        throw new Error(`Invalid product ID: ${id}`);
      }

      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Supabase is the source of truth.
      return true;
    } catch (error) {
      console.error("Supabase delete product failed:", error);
      throw error;
    }
  }

  // Local/demo mode only.
  const existing = getLocalStore<ProductWithImages[]>(
    STORAGE_KEYS.PRODUCTS,
    initialProducts
  );
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

