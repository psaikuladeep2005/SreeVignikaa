"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Sparkles, X } from "lucide-react";
import { BoutiqueSettings } from "@/lib/types";
import { getBoutiqueSettings } from "@/lib/api";
import { generateGeneralWhatsAppLink } from "@/lib/whatsapp";

export function MobileFloatingWhatsApp() {
  const [settings, setSettings] = useState<BoutiqueSettings | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    getBoutiqueSettings().then((data) => setSettings(data));
  }, []);

  if (dismissed) return null;

  const waLink = settings
    ? generateGeneralWhatsAppLink(settings, "Quick Saree / Dress Inquiry")
    : "https://wa.me/919876543210";

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 sm:bottom-6 sm:right-6">
      {/* Floating CTA pill */}
      <div className="hidden sm:flex items-center gap-2 rounded-full bg-maroon-950/90 text-gold-100 px-3.5 py-2 text-xs font-semibold shadow-xl border border-gold-400/30 backdrop-blur-md animate-bounce">
        <Sparkles className="h-3.5 w-3.5 text-gold-400" />
        <span>Inquire for Sarees &amp; Dresses</span>
        <button
          onClick={() => setDismissed(true)}
          className="ml-1 text-gold-300/60 hover:text-gold-200"
          aria-label="Dismiss banner"
        >
          <X className="h-3 w-3" />
        </button>
      </div>

      {/* Direct WhatsApp Button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20bd5a] hover:scale-105 transition-all active:scale-95 ring-4 ring-white/20"
        title="Chat with Owner on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 fill-white" />
      </a>
    </div>
  );
}
