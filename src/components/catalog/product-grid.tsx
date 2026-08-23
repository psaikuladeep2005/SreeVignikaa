"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ShoppingBag } from "lucide-react";
import { ProductCard } from "./product-card";
import { ProductWithImages } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
  products: ProductWithImages[];
  onResetFilters?: () => void;
  isLoading?: boolean;
}

export function ProductGrid({
  products,
  onResetFilters,
  isLoading = false,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="h-96 w-full animate-pulse rounded-xl bg-champagne-200/60 border border-gold-300/20"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gold-400/40 bg-champagne-100/50 p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-400/20 text-maroon-900 mb-4">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h3 className="font-serif text-xl font-bold text-maroon-950">
          No products found
        </h3>
        <p className="mt-1.5 max-w-md text-sm text-maroon-800/80">
          We couldn&apos;t find any designs matching your selected filters. Try broadening your search or resetting the category tabs.
        </p>
        {onResetFilters && (
          <Button
            variant="outline"
            onClick={onResetFilters}
            className="mt-6 border-maroon-900 font-semibold"
          >
            Reset All Filters
          </Button>
        )}
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product, idx) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} priority={idx < 4} />
        </motion.div>
      ))}
    </motion.div>
  );
}
