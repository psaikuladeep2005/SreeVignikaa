"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductWithImages, BoutiqueSettings } from "@/lib/types";
import { getBoutiqueSettings } from "@/lib/api";
import { generateWhatsAppLink } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  product: ProductWithImages;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "whatsapp" | "gold";
  label?: string;
}

export function WhatsAppButton({
  product,
  className = "",
  size = "default",
  variant = "whatsapp",
  label = "WhatsApp Inquire",
}: WhatsAppButtonProps) {
  const [settings, setSettings] = useState<BoutiqueSettings | null>(null);

  useEffect(() => {
    let mounted = true;

    getBoutiqueSettings()
      .then((data) => {
        if (mounted) {
          setSettings(data);
        }
      })
      .catch((error) => {
        console.error("Failed to load boutique settings:", error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!settings) {
      console.warn("Boutique settings are still loading.");
      return;
    }

    const link = generateWhatsAppLink(product, settings);

    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={!settings}
      className={`gap-2 font-semibold shadow-md ${className}`}
    >
      <MessageCircle className="w-4 h-4 fill-white shrink-0" />
      <span>{settings ? label : "Loading WhatsApp..."}</span>
    </Button>
  );
}
