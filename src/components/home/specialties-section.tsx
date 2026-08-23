"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Gem, Shirt, Crown, Heart, Star, Smile } from "lucide-react";
import { Category } from "@/lib/types";

interface SpecialtiesSectionProps {
  categories: Category[];
}

export function SpecialtiesSection({ categories }: SpecialtiesSectionProps) {
  // Fallback specialty cards (also used if categories load from Supabase without images)
  const specialties = [
    {
      title: "Silk Sarees",
      slug: "silk-sarees",
      subtitle: "Kanchipuram, Banarasi & Mysore",
      description:
        "Pure handloom silk sarees with rich zari borders and traditional motifs — perfect for weddings, Muhurtham, and grand festivals.",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
      icon: Crown,
      badge: "Bridal Heritage",
    },
    {
      title: "Designer Sarees",
      slug: "designer-sarees",
      subtitle: "Party, Reception & Festive",
      description:
        "Contemporary organza, georgette, and sequin-embroidered designer sarees crafted to make you shine at receptions and celebrations.",
      image:
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800",
      icon: Star,
      badge: "Modern Drape",
    },
    {
      title: "Lehengas & Half Sarees",
      slug: "lehengas-half-sarees",
      subtitle: "Bridal & Festive Sets",
      description:
        "Stunning lehengas, chaniya cholis, and traditional half saree (langa voni) sets with intricate zardozi, mirror, and thread work.",
      image:
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
      icon: Gem,
      badge: "Statement Sets",
    },
    {
      title: "Designer Dresses & Gowns",
      slug: "designer-dresses-gowns",
      subtitle: "Gowns, Anarkalis & Indowestern",
      description:
        "Floor-length gowns, flowing Anarkalis, and chic Indowestern co-ord sets blending ethnic craftsmanship with modern silhouettes.",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
      icon: Shirt,
      badge: "Ready-to-Wear",
    },
    {
      title: "Salwar Suits & Kurtis",
      slug: "salwar-suits-kurtis",
      subtitle: "Daily & Festive Comfort",
      description:
        "Breathable cotton kurtis, palazzo suits, and festive salwar sets in comfortable fabrics for everyday ethnic styling.",
      image:
        "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=800",
      icon: Heart,
      badge: "Everyday Ethnic",
    },
    {
      title: "Kids Ethnic Wear",
      slug: "kids-ethnic-wear",
      subtitle: "Pattu Pavadai & Frocks",
      description:
        "Adorable silk pattu pavadai, kids lehengas, festive frocks, and kurta sets made with soft, skin-friendly fabrics.",
      image:
        "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800",
      icon: Smile,
      badge: "Little Ones",
    },
  ];

  // Prefer live admin categories; map by slug when available
  const cards = specialties.map((s) => {
    const match = categories.find((c) => c.slug === s.slug);
    return match ? { ...s, title: match.name, description: match.description, image: match.image_url || s.image } : s;
  });

  return (
    <section id="specialties" className="py-20 sm:py-28 bg-champagne-50">
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
            From heritage bridal silks to breezy everyday kurtis, explore our curated collections across six signature categories.
          </p>
        </div>

        {/* 6 Specialty Cards Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.slug}
                href={`/catalog?category=${item.slug}`}
                className="group relative flex flex-col rounded-2xl border border-gold-300/40 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-gold-400 overflow-hidden"
              >
                {/* Image Aspect Box */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-champagne-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-75" />

                  {/* Badge & Icon Top */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-maroon-900/90 px-3 py-1 text-xs font-semibold text-gold-100 backdrop-blur-md shadow-sm">
                      <IconComponent className="h-3.5 w-3.5 text-gold-400" />
                      <span>{item.badge}</span>
                    </span>
                  </div>

                  {/* Subtitle bottom left */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-xs font-medium text-gold-200 uppercase tracking-wider block">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-gold-200 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 bg-gradient-to-b from-white to-champagne-50/40">
                  <p className="text-xs sm:text-sm text-maroon-900/80 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                  <div className="mt-5 pt-4 border-t border-gold-300/20 flex items-center justify-between font-semibold text-xs sm:text-sm text-maroon-900 group-hover:text-gold-700 transition-colors">
                    <span>Browse {item.title}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
