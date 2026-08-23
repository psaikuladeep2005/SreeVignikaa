"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Sparkles,
  SlidersHorizontal,
  CheckCircle,
  XCircle,
  MessageCircle,
} from "lucide-react";
import { Category, ProductWithImages, FilterState, BoutiqueSettings } from "@/lib/types";
import { ProductFilter } from "@/components/catalog/product-filter";
import { ProductSearch } from "@/components/catalog/product-search";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { generateGeneralWhatsAppLink } from "@/lib/whatsapp";
import { getBoutiqueSettings } from "@/lib/api";

interface CatalogClientProps {
  initialProducts: ProductWithImages[];
  initialCategories: Category[];
}

export function CatalogClient({
  initialProducts,
  initialCategories,
}: CatalogClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [settings, setSettings] = useState<BoutiqueSettings | null>(null);

  useEffect(() => {
    getBoutiqueSettings().then((data) => setSettings(data));
  }, []);

  const [filters, setFilters] = useState<FilterState>({
    categorySlug: searchParams.get("category") || "all",
    search: searchParams.get("search") || "",
    workType: searchParams.get("workType") || "all",
    fabric: searchParams.get("fabric") || "all",
    sortBy: "featured",
    onlyAvailable: false,
  });

  // Sync category param from URL if changed
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== filters.categorySlug) {
      setFilters((prev) => ({ ...prev, categorySlug: cat }));
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // 1. Availability
    if (filters.onlyAvailable) {
      result = result.filter((p) => p.is_available);
    }

    // 2. Category
    if (filters.categorySlug && filters.categorySlug !== "all") {
      result = result.filter(
        (p) =>
          p.category?.slug === filters.categorySlug ||
          p.category_id === filters.categorySlug ||
          p.category?.id === filters.categorySlug
      );
    }

    // 3. Work Type
    if (filters.workType && filters.workType !== "all") {
      const target = filters.workType.toLowerCase();
      result = result.filter((p) =>
        p.work_type.toLowerCase().includes(target)
      );
    }

    // 4. Fabric
    if (filters.fabric && filters.fabric !== "all") {
      const target = filters.fabric.toLowerCase();
      result = result.filter((p) => p.fabric.toLowerCase().includes(target));
    }

    // 5. Search query
    if (filters.search && filters.search.trim() !== "") {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.product_code.toLowerCase().includes(q) ||
          p.work_type.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q)
      );
    }

    // 6. Sort
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "featured":
          result.sort(
            (a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0)
          );
          break;
        case "newest":
          result.sort(
            (a, b) =>
              new Date(b.created_at || "").getTime() -
              new Date(a.created_at || "").getTime()
          );
          break;
        case "price-asc":
          result.sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
        case "price-desc":
          result.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
        case "name-asc":
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }

    return result;
  }, [initialProducts, filters]);

  const handleReset = () => {
    setFilters({
      categorySlug: "all",
      search: "",
      workType: "all",
      fabric: "all",
      sortBy: "featured",
      onlyAvailable: false,
    });
    router.replace("/catalog", { scroll: false });
  };

  const waLink = settings
    ? generateGeneralWhatsAppLink(settings, "Saree / Dress Collection Inquiry")
    : "https://wa.me/919876543210";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-maroon-950 via-maroon-900 to-[#501323] p-8 sm:p-12 text-gold-100 shadow-xl border border-gold-400/20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold-400/20 px-3.5 py-1 text-xs font-semibold text-gold-300 uppercase tracking-widest border border-gold-400/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Digital Collection</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-50">
              Explore Sarees &amp; Ethnic Dresses
            </h1>
            <p className="text-sm sm:text-base text-champagne-200/80 max-w-2xl">
              Browse detailed photography of silk sarees, designer drapes, lehengas, gowns, and festive wear. Tap any design to check availability and order on WhatsApp.
            </p>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-xl hover:bg-[#20bd5a] hover:scale-105 transition-all active:scale-95 shrink-0"
          >
            <MessageCircle className="h-5 w-5 fill-white" />
            <span>Can&apos;t Find a Design? WhatsApp Us</span>
          </a>
        </div>
      </div>

      {/* Search Bar & Availability Toggle */}
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-2/3 lg:w-3/4">
          <ProductSearch
            searchQuery={filters.search || ""}
            onSearchChange={(query) => setFilters({ ...filters, search: query })}
          />
        </div>

        <div className="flex items-center gap-2.5 rounded-full border border-gold-300/60 bg-white px-4 py-3 shadow-sm shrink-0">
          <Switch
            id="only-available"
            checked={filters.onlyAvailable || false}
            onCheckedChange={(checked) =>
              setFilters({ ...filters, onlyAvailable: checked })
            }
          />
          <Label
            htmlFor="only-available"
            className="cursor-pointer text-xs font-semibold text-maroon-950 select-none"
          >
            In Stock / Available Only
          </Label>
        </div>
      </div>

      {/* Category Pills & Filters */}
      <div className="mb-10">
        <ProductFilter
          categories={initialCategories}
          filters={filters}
          onFilterChange={(next) => {
            setFilters(next);
            if (next.categorySlug && next.categorySlug !== "all") {
              router.replace(`/catalog?category=${next.categorySlug}`, {
                scroll: false,
              });
            } else {
              router.replace("/catalog", { scroll: false });
            }
          }}
          onReset={handleReset}
          totalProductsCount={filteredProducts.length}
        />
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={filteredProducts}
        onResetFilters={handleReset}
      />
    </div>
  );
}
