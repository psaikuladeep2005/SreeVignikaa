"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Share2,
  Check,
  Tag,
  Scissors,
  Sparkle,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductWithImages } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";

interface ProductModalProps {
  product: ProductWithImages;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const sortedImages =
    product.images && product.images.length > 0
      ? [...product.images].sort((a, b) => a.sort_order - b.sort_order)
      : [
          {
            id: "default-img",
            product_id: product.id,
            image_url:
              "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
            is_primary: true,
            sort_order: 1,
          },
        ];

  const [activeImage, setActiveImage] = useState(sortedImages[0].image_url);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = `${window.location.origin}/catalog/${product.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-champagne-50 border-gold-400/30">
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col bg-champagne-100/60 p-4 sm:p-6 border-b md:border-b-0 md:border-r border-gold-300/30">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-champagne-200 shadow-md">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-all duration-300"
              />
              {product.is_featured && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="featured" className="shadow-md">
                    <Sparkles className="w-3 h-3 mr-1 text-gold-600 animate-pulse" />
                    Featured Design
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {sortedImages.length > 1 && (
              <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
                {sortedImages.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setActiveImage(img.image_url)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      activeImage === img.image_url
                        ? "border-maroon-900 shadow-md scale-105"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.image_url}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Customization CTA */}
          <div className="flex flex-col justify-between p-6 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="gold" className="text-xs uppercase font-mono tracking-wider">
                  SKU: {product.product_code}
                </Badge>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-full border border-maroon-900/20 px-3 py-1 text-xs font-semibold text-maroon-900 hover:bg-champagne-200 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Copied Link</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-3.5 w-3.5" />
                        <span>Share Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold text-maroon-950">
                {product.name}
              </DialogTitle>

              <div className="flex items-baseline gap-3">
                <span className="font-serif text-2xl font-bold text-maroon-900">
                  {formatINR(product.price, product.is_price_visible)}
                </span>
                {product.is_available ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    In Stock & Ready to Ship
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full">
                    Currently Unavailable
                  </span>
                )}
              </div>

              <p className="text-sm text-maroon-900/85 leading-relaxed">
                {product.description}
              </p>

              {/* Specifications Table */}
              <div className="rounded-xl border border-gold-300/40 bg-champagne-100/50 p-4 space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between border-b border-gold-300/20 pb-2">
                  <span className="font-semibold text-maroon-900/70">Work Type:</span>
                  <span className="font-semibold text-maroon-950 text-right">{product.work_type}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gold-300/20 pb-2">
                  <span className="font-semibold text-maroon-900/70">Fabric Used:</span>
                  <span className="font-semibold text-maroon-950 text-right">{product.fabric}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gold-300/20 pb-2">
                  <span className="font-semibold text-maroon-900/70">Color Palette:</span>
                  <span className="font-semibold text-maroon-950 text-right">{product.color}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="font-semibold text-maroon-900/70">Care Instructions:</span>
                  <span className="text-maroon-900/80 text-right max-w-[200px]">{product.care_instructions}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gold-300/30 flex flex-col gap-3">
              <WhatsAppButton
                product={product}
                label="WhatsApp Inquire & Order"
                className="w-full py-6 text-base font-semibold shadow-lg"
              />

              <div className="flex items-center justify-between text-xs text-maroon-900/70">
                <Link
                  href={`/catalog/${product.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="inline-flex items-center gap-1 font-semibold text-maroon-900 hover:text-gold-700 underline underline-offset-4"
                >
                  <span>View Full Product Page</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
                <span>&bull; Quality-checked pieces</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
