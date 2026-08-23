"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Eye, Share2, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductWithImages } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { ProductModal } from "./product-modal";

interface ProductCardProps {
  product: ProductWithImages;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const primaryImg =
    product.images && product.images.length > 0
      ? product.images.find((i) => i.is_primary)?.image_url || product.images[0].image_url
      : "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800";

  const secondaryImg =
    product.images && product.images.length > 1
      ? product.images.find((i) => !i.is_primary)?.image_url || product.images[1].image_url
      : primaryImg;

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/catalog/${product.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="group relative flex flex-col rounded-xl border border-gold-300/30 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gold-400/60 overflow-hidden">
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <div className="flex flex-col gap-1 items-start">
            {product.is_featured && (
              <Badge variant="featured" className="shadow-sm">
                <Sparkles className="w-3 h-3 mr-1 text-gold-600 animate-pulse" />
                Featured Design
              </Badge>
            )}
            <Badge variant="gold" className="shadow-sm">
              {product.work_type.split("&")[0].trim()}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={handleCopyLink}
              title="Copy Product Link"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-maroon-900 shadow-md backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Image Container with Hover Swap / Zoom */}
        <div
          onClick={() => setQuickViewOpen(true)}
          className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden bg-champagne-100"
        >
          <Image
            src={primaryImg}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-all duration-700 group-hover:scale-105"
          />
          {secondaryImg !== primaryImg && (
            <Image
              src={secondaryImg}
              alt={`${product.name} secondary view`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}

          {/* Quick View Overlay Button */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewOpen(true);
              }}
              className="gap-1.5 font-semibold text-xs shadow-md bg-white/95 text-maroon-950 hover:bg-gold-50"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View Gallery</span>
            </Button>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 bg-gradient-to-b from-white to-champagne-50/40">
          <div>
            <div className="flex items-center justify-between text-xs text-maroon-800/70 mb-1">
              <span className="font-mono font-semibold uppercase tracking-wider text-gold-700">
                {product.product_code}
              </span>
              <span>{product.fabric.split("&")[0].trim()}</span>
            </div>

            <Link
              href={`/catalog/${product.slug}`}
              className="font-serif text-base sm:text-lg font-bold text-maroon-950 hover:text-maroon-700 transition-colors line-clamp-2 leading-snug"
            >
              {product.name}
            </Link>

            <p className="mt-1.5 text-xs text-maroon-900/75 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gold-300/20 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-[10px] uppercase font-semibold text-maroon-800/60 tracking-wider">
                  Price
                </span>
                <span className="font-serif text-lg font-bold text-maroon-950">
                  {formatINR(product.price, product.is_price_visible)}
                </span>
              </div>
              <Link
                href={`/catalog/${product.slug}`}
                className="text-xs font-semibold text-gold-700 hover:text-gold-600 underline underline-offset-4"
              >
                Full Details &rarr;
              </Link>
            </div>

            <WhatsAppButton
              product={product}
              label="WhatsApp Inquire"
              className="w-full py-2.5 text-xs sm:text-sm font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <ProductModal
          product={product}
          open={quickViewOpen}
          onOpenChange={setQuickViewOpen}
        />
      )}
    </>
  );
}
