"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem, Sparkles } from "lucide-react";
import { Category } from "@/lib/types";

interface WorkTypeGuideProps {
  categories: Category[];
}

export function WorkTypeGuide({ categories }: WorkTypeGuideProps) {
  const activeCategories = categories.filter(
    (category) => category.is_active !== false
  );

  if (activeCategories.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-gold-300/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-400/20 px-3.5 py-1 text-xs font-semibold text-gold-700 uppercase tracking-widest border border-gold-400/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Our Collections</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon-950 tracking-tight">
            Explore Our Collections
          </h2>

          <p className="text-sm sm:text-base text-maroon-800/80 leading-relaxed">
            Explore our latest sarees, dresses, ethnic wear, and other
            collections.
          </p>
        </div>

        {/* Dynamic Categories */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeCategories.map((category) => (
            <div
              key={category.id}
              className="group flex flex-col rounded-2xl border border-gold-300/40 bg-champagne-50/50 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-gold-400"
            >
              {/* Category Image */}
              <Link
                href={`/catalog?category=${category.slug}`}
                className="relative aspect-[16/10] w-full overflow-hidden bg-champagne-200"
              >
                <Image
                  src={
                    category.image_url ||
                    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800"
                  }
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-maroon-900/90 px-3 py-1 text-xs font-semibold text-gold-100 shadow-sm">
                    <Gem className="h-3 w-3 text-gold-400" />
                    <span>Collection</span>
                  </span>
                </div>
              </Link>

              {/* Category Details */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon-950 mb-2">
                    {category.name}
                  </h3>

                  {category.description && (
                    <p className="text-xs sm:text-sm text-maroon-900/80 leading-relaxed">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Browse Button */}
                <div className="mt-6 pt-4 border-t border-gold-300/30">
                  <Link
                    href={`/catalog?category=${category.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-maroon-900 hover:text-gold-700 transition-colors"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
