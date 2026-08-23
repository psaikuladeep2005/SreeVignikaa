"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductWithImages, BoutiqueSettings } from "@/lib/types";
import { getBoutiqueSettings } from "@/lib/api";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { CustomizationModal } from "./customization-modal";

interface WhatsAppButtonProps {
  product: ProductWithImages;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "whatsapp" | "gold";
  label?: string;
  showCustomizationModal?: boolean;
}

export function WhatsAppButton({
  product,
  className = "",
  size = "default",
  variant = "whatsapp",
  label = "WhatsApp Inquire",
  showCustomizationModal = true,
}: WhatsAppButtonProps) {
  const [settings, setSettings] = useState<BoutiqueSettings | null>(null);

  useEffect(() => {
    getBoutiqueSettings().then((data) => setSettings(data));
  }, []);

  const handleDirectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!settings) return;
    const link = generateWhatsAppLink(product, settings);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  if (showCustomizationModal && settings) {
    return (
      <CustomizationModal
        product={product}
        settings={settings}
        triggerButton={
          <Button
            variant={variant}
            size={size}
            onClick={(e) => e.stopPropagation()}
            className={`gap-2 font-semibold shadow-md ${className}`}
          >
            <MessageCircle className="w-4 h-4 fill-white shrink-0" />
            <span>{label}</span>
          </Button>
        }
      />
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDirectClick}
      className={`gap-2 font-semibold shadow-md ${className}`}
    >
      <MessageCircle className="w-4 h-4 fill-white shrink-0" />
      <span>{label}</span>
    </Button>
  );
}
