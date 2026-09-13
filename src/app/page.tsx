import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { HeroBanner } from "@/components/home/hero-banner";
import { SpecialtiesSection } from "@/components/home/specialties-section";
import { ShoppingProcess } from "@/components/home/bespoke-process";
import { WorkTypeGuide } from "@/components/home/work-type-guide";
import { InstagramShowcase } from "@/components/home/instagram-showcase";
import { ProductCard } from "@/components/catalog/product-card";
import { getProducts, getCategories } from "@/lib/api";

export const revalidate = 0; // Fresh dynamic catalog on every visit

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts({ sortBy: "featured" }),
    getCategories(),
  ]);

  const featuredProducts = products.filter((p) => p.is_featured).slice(0, 8);
  const displayProducts =
    featuredProducts.length > 0 ? featuredProducts : products.slice(0, 8);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Banner Section */}
      <HeroBanner />

      {/* 2. Quick Category Navigation Bar */}
      <section className="bg-champagne-200/50 border-b border-gold-300/30 py-6 px-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <Link
            href="/catalog"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-maroon-900 px-5 py-2.5 text-xs font-bold text-gold-100 shadow-md hover:bg-maroon-800 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold-400" />
            <span>All Collection ({products.length})</span>
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.slug}`}
              className="shrink-0 rounded-full bg-white/80 border border-gold-300/40 px-5 py-2.5 text-xs font-semibold text-maroon-950 hover:bg-white hover:border-gold-500 hover:text-maroon-900 transition-all shadow-sm"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Collection Section */}
      <section className="py-20 sm:py-28 bg-white border-b border-gold-300/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="text-center md:text-left space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold-400/20 px-3.5 py-1 text-xs font-semibold text-gold-700 uppercase tracking-widest border border-gold-400/30">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Signature Collection</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon-950 tracking-tight">
                Featured Sarees & Dresses
              </h2>
              <p className="text-sm sm:text-base text-maroon-800/80 max-w-xl">
                Handpicked silk sarees, designer drapes, festive lehengas, and elegant ethnic dresses chosen for this season&apos;s weddings and celebrations.
              </p>
            </div>

            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 rounded-full border-2 border-maroon-900 bg-transparent px-7 py-3 text-sm font-semibold text-maroon-900 hover:bg-maroon-900 hover:text-gold-100 transition-colors"
            >
              <span>View Full Collection</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Grid of Featured Products */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 4}
              />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-maroon-900 px-9 py-4 text-base font-semibold text-gold-100 shadow-xl hover:bg-maroon-800 hover:scale-105 transition-all active:scale-95"
            >
              <span>Explore All {products.length}+ Designs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Specialties Showcase Section */}
      <SpecialtiesSection categories={categories} />

      {/* 5. Shopping / Order Process Section */}
      <ShoppingProcess />

      {/* 6. Saree & Fabric Guide Section */}
      <WorkTypeGuide categories={categories}/>

      {/* 7. Instagram Showcase */}
      <InstagramShowcase />
    </div>
  );
}
