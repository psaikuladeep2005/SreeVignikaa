"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Instagram, Sparkles, ExternalLink, Heart, MessageCircle } from "lucide-react";
import { BoutiqueSettings } from "@/lib/types";
import { getBoutiqueSettings } from "@/lib/api";

export function InstagramShowcase() {
  const [settings, setSettings] = useState<BoutiqueSettings | null>(null);

  useEffect(() => {
    getBoutiqueSettings().then((data) => setSettings(data));
  }, []);

  const instagramCards = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
      likes: "1,240",
      caption: "Royal Kanchipuram temple-border silk in deep navy & gold ✨ #sreevignikaa #SilkSarees",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800",
      likes: "980",
      caption: "Banarasi brocade bridal drape with intricate zari jaal 🪡 #BanarasiSaree #sreevignikaa",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
      likes: "1,520",
      caption: "Bridal red Kundan lehenga choli set for the modern bride 👑 #Lehenga #sreevignikaa",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
      likes: "865",
      caption: "Floor-length embroidered Anarkali gown in royal blue ✨ #Anarkali #EthnicWear #sreevignikaa",
    },
  ];

  const igUrl = settings?.instagram_url || "https://instagram.com/sreevignikaa_official";

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-blue-50/30 to-white border-t border-blue-100/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 uppercase tracking-widest border border-blue-500/20">
              <Instagram className="h-3.5 w-3.5 text-blue-600" />
              <span>@sreevignikaa_official</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              As Seen on Instagram
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Follow us for new arrivals, festive drapes, and customer styles. Screenshot any design and send it to us on WhatsApp to order!
            </p>
          </div>

          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <Instagram className="h-4 w-4" />
            <span>Follow Our Official Instagram</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-80" />
          </a>
        </div>

        {/* Grid of IG Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instagramCards.map((card) => (
            <a
              key={card.id}
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col rounded-3xl overflow-hidden border border-blue-100/60 bg-white/80 backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-blue-50">
                <Image
                  src={card.image}
                  alt={card.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                  <div className="flex items-center gap-1.5 font-semibold text-sm">
                    <Heart className="h-5 w-5 fill-white" />
                    <span>{card.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-sm">
                    <Instagram className="h-5 w-5" />
                    <span>View Post</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white/90 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-800 line-clamp-2 leading-relaxed">
                  {card.caption}
                </p>
                <div className="mt-3 pt-2 border-t border-blue-100 flex items-center justify-between text-[11px] text-blue-600 font-semibold">
                  <span>SREEVIGNIKAA Sarees Studio</span>
                  <span>Instagram</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
