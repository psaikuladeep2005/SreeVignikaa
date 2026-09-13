"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Crown,
  Gem,
  Shirt,
  Heart,
  Star,
  Smile,
} from "lucide-react";
import { Category } from "@/lib/types";

interface SpecialtiesSectionProps {
  categories: Category[];
}

/*
 * These are ONLY visual defaults.
 *
 * IMPORTANT:
 * We are NOT creating categories here.
 * The actual categories MUST come from Supabase/Admin.
 *
 * These defaults only help us choose an icon and fallback text
 * for a category that exists in Supabase.
 */

const visualDefaults = [
  {
    icon: Crown,
    badge: "Bridal Heritage",
    subtitle: "Traditional & Elegant",
  },
  {
    icon: Star,
    badge: "Modern Collection",
    subtitle: "Party & Festive",
  },
  {
    icon: Gem,
    badge: "Statement Collection",
    subtitle: "Bridal & Festive",
  },
  {
    icon: Shirt,
    badge: "Ready-to-Wear",
    subtitle: "Elegant & Stylish",
  },
  {
    icon: Heart,
    badge: "Everyday Ethnic",
    subtitle: "Comfort & Style",
  },
  {
    icon: Smile,
    badge: "Special Collection",
    subtitle: "Beautiful & Traditional",
  },
];

const fallbackImage =
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800";

export function SpecialtiesSection({
  categories,
}: SpecialtiesSectionProps) {
  /*
   * IMPORTANT:
   * `categories` comes directly from Supabase through getCategories().
   *
   * We DO NOT add hardcoded categories here.
   *
   * Therefore:
   * - If Admin has 1 category → website shows 1 card
   * - If Admin has 3 categories → website shows 3 cards
   * - If Admin has 10 categories → website shows 10 cards
   * - If Admin has 0 active categories → website shows no category cards
   */

  const cards = categories.map((category, index) => {
    const visual = visualDefaults[index % visualDefaults.length];

    const IconComponent = visual.icon;

    return {
      ...category,
      icon: IconComponent,
      badge: visual.badge,
      subtitle: visual.subtitle,
      image: category.image_url || fallbackImage,
    };
  });

  return (
    <section
      id="specialties"
      className="py-20 sm:py-28 bg-champagne-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">

          <div className="inline-flex items-center gap-2 rounded-full bg-gold-400/20 px-3.5 py-1 text-xs font-semibold text-gold-700 uppercase tracking-widest border border-gold-400/30">
            <Sparkles className="h-3.5 w-3.5" />

            <span>Shop by Category</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon-950 tracking-tight">
            Sarees & Dresses for Every Occasion
          </h2>

          <p className="text-sm sm:text-base text-maroon-800/80 leading-relaxed">
            Explore our curated collections and discover something beautiful
            for every occasion.
          </p>

        </div>

        {/* Category Cards */}
        {cards.length > 0 ? (
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {cards.map((item) => {
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.id}
                  href={`/catalog?category=${encodeURIComponent(
                    item.slug
                  )}`}
                  className="group relative flex flex-col rounded-2xl border border-gold-300/40 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-gold-400 overflow-hidden"
                >

                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-champagne-100">

                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-75" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-maroon-900/90 px-3 py-1 text-xs font-semibold text-gold-100 backdrop-blur-md shadow-sm">

                        <IconComponent className="h-3.5 w-3.5 text-gold-400" />

                        <span>{item.badge}</span>

                      </span>

                    </div>

                    {/* Category Name */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">

                      <span className="text-xs font-medium text-gold-200 uppercase tracking-wider block">
                        {item.subtitle}
                      </span>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-gold-200 transition-colors">
                        {item.name}
                      </h3>

                    </div>

                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 bg-gradient-to-b from-white to-champagne-50/40">

                    <p className="text-xs sm:text-sm text-maroon-900/80 leading-relaxed line-clamp-3">
                      {item.description ||
                        `Explore our beautiful ${item.name} collection, carefully selected for quality, elegance, and style.`}
                    </p>

                    <div className="mt-5 pt-4 border-t border-gold-300/20 flex items-center justify-between font-semibold text-xs sm:text-sm text-maroon-900 group-hover:text-gold-700 transition-colors">

                      <span>
                        Browse {item.name}
                      </span>

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

                    </div>

                  </div>

                </Link>
              );
            })}

          </div>
        ) : (
          /*
           * No active categories in Supabase.
           *
           * We intentionally DO NOT display the old six
           * hardcoded categories here.
           */
          <div className="mt-12 rounded-2xl border border-gold-300/30 bg-white p-10 text-center shadow-sm">

            <Sparkles className="mx-auto h-8 w-8 text-gold-500 mb-3" />

            <h3 className="font-serif text-xl font-bold text-maroon-950">
              Collections Coming Soon
            </h3>

            <p className="mt-2 text-sm text-maroon-800/70">
              Our collections are being prepared. Please check back soon.
            </p>

          </div>
        )}

      </div>
    </section>
  );
}
