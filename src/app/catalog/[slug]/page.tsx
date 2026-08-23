import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/api";
import { ProductDetailClient } from "./product-detail-client";
import { ProductCard } from "@/components/catalog/product-card";
import { Sparkles } from "lucide-react";

export const revalidate = 0; // Always fresh

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Design Not Found | SREEVIGNIKAA Sarees",
    };
  }

  const primaryImg =
    product.images && product.images.length > 0
      ? product.images.find((i) => i.is_primary)?.image_url || product.images[0].image_url
      : "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200";

  return {
    title: `${product.name} (${product.product_code}) | SREEVIGNIKAA Sarees`,
    description: `${product.description} Fabric: ${product.fabric}. Work: ${product.work_type}. Inquire and order on WhatsApp.`,
    openGraph: {
      title: `${product.name} | SREEVIGNIKAA Sarees`,
      description: product.description,
      url: `https://sreevignikaasarees.com/catalog/${product.slug}`,
      images: [
        {
          url: primaryImg,
          width: 1000,
          height: 1000,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch related products in the same category
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category_id === product.category_id ||
          p.work_type === product.work_type)
    )
    .slice(0, 4);

  return (
    <div className="pb-20">
      <ProductDetailClient product={product} />

      {/* Related Creations Section */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 mt-16 pt-16 border-t border-gold-300/30 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-700 mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Complementary Styles</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-950">
                You May Also Like
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
