"use client";

import React, { useEffect, useState } from "react";
import {
  Instagram,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { BoutiqueSettings } from "@/lib/types";
import { getBoutiqueSettings } from "@/lib/api";

export function InstagramShowcase() {
  const [settings, setSettings] = useState<BoutiqueSettings | null>(null);

  useEffect(() => {
    getBoutiqueSettings()
      .then((data) => setSettings(data))
      .catch((error) => {
        console.error("Failed to load Instagram settings:", error);
      });
  }, []);

  const instagramUrl =
    settings?.instagram_url ||
    "https://instagram.com/sreevignikaa_official";

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-blue-50/30 to-white border-t border-blue-100/60">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-blue-100 bg-white/90 shadow-sm p-8 sm:p-12 text-center">
          {/* Instagram Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-600 uppercase tracking-widest border border-blue-500/20">
            <Instagram className="h-4 w-4" />
            <span>Instagram</span>
          </div>

          {/* Heading */}
          <h2 className="mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Follow SREEVIGNIKAA Sarees
          </h2>

          {/* Description */}
          <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
            Follow us on Instagram for our latest collections, new arrivals,
            saree designs, festive updates, and more.
          </p>

          {/* Button */}
          <div className="mt-8">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <Instagram className="h-4 w-4" />

              <span>Visit Our Instagram</span>

              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </a>
          </div>

          {/* Small Supporting Text */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
            <Sparkles className="h-3.5 w-3.5" />
            <span>See our latest updates on Instagram</span>
          </div>
        </div>
      </div>
    </section>
  );
}
