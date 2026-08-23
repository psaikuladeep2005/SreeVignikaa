"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  ArrowRight,
  Award,
  HeartHandshake,
} from "lucide-react";
import { BoutiqueSettings } from "@/lib/types";
import { getBoutiqueSettings } from "@/lib/api";
import { generateGeneralWhatsAppLink } from "@/lib/whatsapp";

export function HeroBanner() {
  const [settings, setSettings] = useState<BoutiqueSettings | null>(null);

  useEffect(() => {
    getBoutiqueSettings().then((data) => setSettings(data));
  }, []);

  const waLink = settings
    ? generateGeneralWhatsAppLink(settings, "Saree & Dress Collection Inquiry")
    : "https://wa.me/919876543210";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-champagne-100 via-champagne-50 to-champagne-100/50 pt-10 pb-20 sm:pt-16 sm:pb-28 border-b border-gold-300/30">
      {/* Subtle luxury background ornament */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-radial-gradient from-gold-400/10 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Value Props */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-maroon-900/10 border border-maroon-900/20 px-4 py-1.5 text-xs font-semibold text-maroon-950 uppercase tracking-widest shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold-600 animate-pulse" />
              <span>Curated Sarees &amp; Ethnic Wear</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-maroon-950 leading-[1.15]"
            >
              {settings?.hero_title ||
                "Elegant Sarees, Designer Dresses & Festive Ethnic Wear"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-maroon-900/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              {settings?.hero_subtitle ||
                "Discover handpicked Kanchipuram & Banarasi silk sarees, ready-to-wear designer dresses, festive lehengas, and everyday ethnic wear — curated for every occasion."}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href="/catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-maroon-900 px-8 py-4 text-base font-semibold text-gold-100 shadow-xl hover:bg-maroon-800 hover:scale-105 transition-all active:scale-95 border border-gold-400/30"
              >
                <span>Browse Collection</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-xl hover:bg-[#20bd5a] hover:scale-105 transition-all active:scale-95"
              >
                <MessageCircle className="h-5 w-5 fill-white" />
                <span>WhatsApp Inquiry</span>
              </a>
            </motion.div>

            {/* Micro Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-gold-300/30 text-center lg:text-left"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-2xl font-bold text-maroon-950">
                  100%
                </span>
                <span className="text-xs text-maroon-800/70">
                  Quality Checked
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-2xl font-bold text-maroon-950">
                  PAN India
                </span>
                <span className="text-xs text-maroon-800/70">
                  Doorstep Delivery
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-2xl font-bold text-maroon-950">
                  Easy
                </span>
                <span className="text-xs text-maroon-800/70">
                  Returns &amp; Support
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Collage Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Large Saree Card */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border-2 border-gold-400/40 bg-white shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000"
                  alt="Royal Kanchipuram Temple Border Silk Saree"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/30 px-3 py-1 text-[11px] font-semibold text-gold-200 backdrop-blur-sm border border-gold-300/30">
                    <Sparkles className="h-3 w-3 text-gold-300" /> Bridal &amp; Festive
                  </span>
                  <h3 className="mt-2 font-serif text-xl font-bold text-white">
                    Kanchipuram Temple Border Silk
                  </h3>
                  <p className="text-xs text-champagne-200/80">
                    Pure Handloom Silk &amp; Gold Zari
                  </p>
                </div>
              </div>

              {/* Floating Accent Card Bottom-Left */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 rounded-xl border border-gold-400/30 bg-white/95 p-4 shadow-xl backdrop-blur-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon-900 text-gold-300">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <span className="block font-serif text-sm font-bold text-maroon-950">
                    Handpicked Quality
                  </span>
                  <span className="text-xs text-maroon-800/70">
                    Authentic silks &amp; weaves
                  </span>
                </div>
              </div>

              {/* Floating Accent Card Top-Right */}
              <div className="absolute -top-5 -right-5 hidden sm:flex items-center gap-3 rounded-xl border border-gold-400/30 bg-white/95 p-4 shadow-xl backdrop-blur-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/20 text-gold-700">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <div>
                  <span className="block font-serif text-sm font-bold text-maroon-950">
                    Direct WhatsApp
                  </span>
                  <span className="text-xs text-maroon-800/70">
                    Inquire &amp; Order Instantly
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
