"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Heart,
  MessageCircle,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { BoutiqueSettings } from "@/lib/types";
import { getBoutiqueSettings } from "@/lib/api";
import { generateGeneralWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  const [settings, setSettings] = useState<BoutiqueSettings | null>(null);

  useEffect(() => {
    getBoutiqueSettings().then((data) => setSettings(data));
  }, []);

  const waLink = settings
    ? generateGeneralWhatsAppLink(settings, "Saree & Dress Order Inquiry")
    : "https://wa.me/919876543210";

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-100 border-t border-blue-500/20">
      {/* Upper Luxury Callout */}
      <div className="border-b border-blue-400/15 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-3.5 py-1 text-xs font-semibold text-sky-400 uppercase tracking-widest border border-blue-400/25">
              <Sparkles className="h-3 w-3" /> Curated Collection
            </span>
            <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-white">
              Looking for the perfect saree or ethnic dress?
            </h3>
            <p className="mt-1 text-sm text-slate-300 max-w-xl">
              Explore silk sarees, designer drapes, lehengas, gowns, salwar suits, and kids&apos; ethnic wear. Message us on WhatsApp for availability, sizing, and offers.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#20bd5a] transition-all duration-300 active:scale-95"
            >
              <MessageCircle className="h-5 w-5 fill-white" />
              <span>WhatsApp Consultation</span>
            </a>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-slate-800/80 px-6 py-3 text-sm font-semibold text-sky-100 hover:bg-slate-800 transition-colors"
            >
              <span>Explore Catalog</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand Info & Custom Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {settings?.logo_url && settings.logo_url.trim() !== "" ? (
                <img
                  src={settings.logo_url}
                  alt={settings.boutique_name || "SREEVIGNIKAA Sarees"}
                  className="max-h-12 w-auto object-contain"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-white font-serif font-bold text-xl shadow-md">
                  S
                </div>
              )}
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                {settings?.boutique_name || "SREEVIGNIKAA Sarees"}
              </span>
            </div>
            <p className="text-sm text-slate-300/90 leading-relaxed">
              {settings?.about_text ||
                "SREEVIGNIKAA Sarees brings you curated silk sarees, designer drapes, lehengas, ethnic gowns, and kids wear — handpicked for quality and delivered across India."}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {settings?.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sky-400 hover:bg-blue-600 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
              </a>
            </div>
          </div>

          {/* Column 2: Our Specialties */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-sky-300 tracking-wide">
              Boutique Specialities
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link
                  href="/catalog?category=silk-sarees"
                  className="hover:text-sky-300 transition-colors flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Silk Sarees
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=designer-sarees"
                  className="hover:text-sky-300 transition-colors flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Designer Sarees
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=lehengas-half-sarees"
                  className="hover:text-sky-300 transition-colors flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Lehengas &amp; Half Sarees
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=designer-dresses-gowns"
                  className="hover:text-sky-300 transition-colors flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Dresses &amp; Gowns
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=salwar-suits-kurtis"
                  className="hover:text-sky-300 transition-colors flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Salwar Suits &amp; Kurtis
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=kids-ethnic-wear"
                  className="hover:text-sky-300 transition-colors flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Kids&apos; Ethnic Wear
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-sky-300 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-sky-300 transition-colors">
                  Home &amp; Specialties
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-sky-300 transition-colors">
                  Full Digital Catalog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sky-300 transition-colors">
                  About SREEVIGNIKAA Sarees
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-sky-300 transition-colors">
                  How to Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-300 transition-colors">
                  Studio Location &amp; FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-sky-300 transition-colors inline-flex items-center gap-1.5 text-sky-400 font-medium"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Owner Admin Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Studio Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-sky-300 tracking-wide">
              Studio Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  {settings?.address ||
                    "SREEVIGNIKAA Sarees Studio, Trunk Road, Kadapa, Andhra Pradesh, 516001"}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-sky-400 shrink-0" />
                <span>WhatsApp: +{settings?.whatsapp_number || "919876543210"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-sky-400 shrink-0" />
                <span>{settings?.email || "contact@sreevignikaa.com"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 pt-1">
                <Clock className="h-4 w-4 text-sky-400 shrink-0" />
                <span>Mon – Sat: 10:00 AM – 8:30 PM (IST)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-blue-500/20 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {settings?.boutique_name || "SREEVIGNIKAA Sarees"}. All rights reserved. Curated sarees &amp; ethnic wear with love.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/catalog" className="hover:text-sky-300">
              Browse Catalog
            </Link>
            <Link href="/admin" className="hover:text-sky-300 text-sky-400/90 font-medium">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
