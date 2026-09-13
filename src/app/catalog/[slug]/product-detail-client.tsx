"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Share2,
  Check,
  ShieldCheck,
  Heart,
  Ruler,
  Scissors,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductWithImages } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";

interface ProductDetailClientProps {
  product: ProductWithImages;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const sortedImages =
    product.images && product.images.length > 0
      ? [...product.images].sort((a, b) => a.sort_order - b.sort_order)
      : [
          {
            id: "default",
            product_id: product.id,
            image_url:
              "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000",
            is_primary: true,
            sort_order: 1,
          },
        ];

  const [activeImg, setActiveImg] = useState(sortedImages[0].image_url);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumbs & Back */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-maroon-900 hover:text-maroon-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Designs</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-maroon-900/20 bg-white px-3.5 py-1.5 text-xs font-semibold text-maroon-950 shadow-sm hover:bg-champagne-100 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span>Share Design</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white rounded-3xl border border-gold-300/40 p-6 sm:p-10 shadow-xl">
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-champagne-100 border border-gold-300/40 shadow-lg">
            <Image
              src={activeImg}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top transition-all duration-300"
            />

            {product.is_featured && (
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="featured" className="shadow-md py-1.5 px-3">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-gold-600 animate-pulse" />
                  Featured Design
                </Badge>
              </div>
            )}
          </div>

          {/* Thumbnail Carousel */}
          {sortedImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {sortedImages.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setActiveImg(img.image_url)}
                  className={`relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    activeImg === img.image_url
                      ? "border-maroon-900 shadow-md ring-2 ring-maroon-900/30 scale-105"
                      : "border-transparent opacity-65 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.image_url}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Customization (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge
                variant="gold"
                className="text-xs uppercase font-mono font-bold tracking-wider py-1 px-3"
              >
                SKU / CODE: {product.product_code}
              </Badge>
              {product.category && (
                <Link
                  href={`/catalog?category=${product.category.slug}`}
                  className="text-xs font-semibold text-gold-700 hover:underline"
                >
                  {product.category.name}
                </Link>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 pt-1">
              <span className="font-serif text-3xl font-bold text-maroon-900">
                {formatINR(product.price, product.is_price_visible)}
              </span>
              {product.is_available ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  In Stock & Ready to Ship
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-800 bg-red-100/80 px-3 py-1 rounded-full border border-red-300">
                  Temporarily Out of Stock
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base text-maroon-900/85 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>

            {/* Artisanal Specifications Table */}
            <div className="rounded-2xl border border-gold-300/40 bg-champagne-100/60 p-5 space-y-3 text-sm">
              <h3 className="font-serif text-base font-bold text-maroon-950 border-b border-gold-300/30 pb-2 flex items-center gap-2">
                <Scissors className="h-4 w-4 text-gold-700" />
                <span>Product Details</span>
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                <span className="font-semibold text-maroon-900/70">Work Type:</span>
                <span className="font-semibold text-maroon-950">{product.work_type}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                <span className="font-semibold text-maroon-900/70">Fabric Composition:</span>
                <span className="font-semibold text-maroon-950">{product.fabric}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                <span className="font-semibold text-maroon-900/70">Color Combination:</span>
                <span className="font-semibold text-maroon-950">{product.color}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm pt-2 border-t border-gold-300/20">
                <span className="font-semibold text-maroon-900/70">Care Instructions:</span>
                <span className="text-maroon-900/80">{product.care_instructions}</span>
              </div>
            </div>

            {/* Shopping Guarantee Callout */}
            <div className="rounded-xl bg-gradient-to-r from-maroon-900/5 via-gold-500/5 to-transparent p-4 border border-gold-400/20 text-xs text-maroon-900/80 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-maroon-950">
                <Ruler className="h-4 w-4 text-gold-600" />
                <span>Quality Checked &amp; Securely Packed</span>
              </div>
              <p>
                Every outfit is inspected for fabric quality, finish, and measurements before being carefully packed and dispatched with insured PAN-India shipping.
              </p>
            </div>
          </div>

          {/* WhatsApp Inquiry CTAs */}
          <div className="pt-6 border-t border-gold-300/30 space-y-3">
            <WhatsAppButton
              product={product}
              label="WhatsApp Inquire & Order"
              className="w-full py-7 text-base font-bold shadow-xl rounded-xl"
            />

            <div className="flex items-center justify-between text-xs text-maroon-800/70 pt-1">
              <span>&bull; Direct chat with owner</span>
              <span>&bull; PAN-India Doorstep Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
