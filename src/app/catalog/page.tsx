import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/api";
import { CatalogClient } from "./catalog-client";

export const revalidate = 0; // Dynamic catalog fetching

export const metadata: Metadata = {
  title: "Saree & Ethnic Wear Collection | SREEVIGNIKAA Sarees",
  description:
    "Browse SREEVIGNIKAA Sarees' collection of silk sarees, designer sarees, lehengas, Anarkali gowns, salwar suits, kurtis, and kids ethnic wear. Inquire and order directly on WhatsApp.",
};

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <div className="h-12 w-12 border-4 border-gold-400 border-t-maroon-900 rounded-full animate-spin mx-auto mb-4" />
          <p className="font-serif text-lg text-maroon-900">
            Loading collection...
          </p>
        </div>
      }
    >
      <CatalogClient
        initialProducts={products}
        initialCategories={categories}
      />
    </Suspense>
  );
}
