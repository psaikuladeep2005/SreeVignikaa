"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Gem, Award, ArrowRight } from "lucide-react";

export function WorkTypeGuide() {
  const guides = [
    {
      title: "Kanchipuram Silk Sarees",
      subtitle: "The Bridal Handloom Classic",
      description:
        "Woven in Tamil Nadu with pure mulberry silk and real gold-tipped zari, Kanchipuram sarees are known for their wide contrast borders, temple motifs, and heavy pallu — the bridal favourite for Muhurtham.",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
      link: "/catalog?category=silk-sarees",
      tag: "Pure Handloom Silk",
    },
    {
      title: "Banarasi Silk Sarees",
      subtitle: "Royal Brocade Heritage",
      description:
        "From Varanasi, Banarasi silks feature intricate brocade jaal work, paisley motifs, and dense gold zari. They are lightweight yet rich — ideal for weddings, receptions, and special gifting.",
      image:
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800",
      link: "/catalog?category=silk-sarees",
      tag: "Brocade Zari",
    },
    {
      title: "Designer & Embroidered Wear",
      subtitle: "Sequins, Zardozi & Appliqué",
      description:
        "Modern designer sarees, gowns, and lehengas use sequins, zardozi, mirror work, and machine embroidery to create a shimmering statement look for receptions, sangeet, and cocktail nights.",
      image:
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
      link: "/catalog?category=designer-sarees",
      tag: "Contemporary Style",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-gold-300/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-400/20 px-3.5 py-1 text-xs font-semibold text-gold-700 uppercase tracking-widest border border-gold-400/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Style Guide</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon-950 tracking-tight">
            Understanding Sarees & Fabrics
          </h2>
          <p className="text-sm sm:text-base text-maroon-800/80 leading-relaxed">
            Not sure which silk or style suits your occasion? Here is a quick look at the fabrics and weaves in our collection.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <div
              key={guide.title}
              className="group flex flex-col rounded-2xl border border-gold-300/40 bg-champagne-50/50 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-gold-400"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-champagne-200">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-maroon-900/90 px-3 py-1 text-xs font-semibold text-gold-100 shadow-sm">
                    <Gem className="h-3 w-3 text-gold-400" />
                    <span>{guide.tag}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold-700 block mb-1">
                    {guide.subtitle}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon-950 mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-maroon-900/80 leading-relaxed">
                    {guide.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold-300/30">
                  <Link
                    href={guide.link}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-maroon-900 hover:text-gold-700 transition-colors"
                  >
                    <span>Browse this Style</span>
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
