"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  PhoneCall,
  Menu,
  X,
  Instagram,
  Search,
  Shield,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BoutiqueSettings } from "@/lib/types";
import { getBoutiqueSettings } from "@/lib/api";
import { generateGeneralWhatsAppLink } from "@/lib/whatsapp";

export function Navbar() {
  const pathname = usePathname();
  const [settings, setSettings] = useState<BoutiqueSettings | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    getBoutiqueSettings().then((data) => setSettings(data));

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Catalog", href: "/catalog" },
    { name: "Categories", href: "/#specialties" },
    { name: "How It Works", href: "/#process" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const waLink = settings
    ? generateGeneralWhatsAppLink(settings, "Saree & Dress Inquiry")
    : "https://wa.me/919876543210";

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur-md border-b border-slate-200"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-sky-100 px-4 py-1.5 text-xs text-center flex items-center justify-center gap-2 tracking-wide font-medium">
        <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
        <span>
          Silk Sarees • Designer Dresses • Lehengas &amp; Ethnic Wear
        </span>
        <span className="hidden sm:inline opacity-75">| Doorstep Shipping Across India</span>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Brand Logo (Supports Custom Uploaded Logo from Admin Settings) */}
          <Link href="/" className="flex items-center gap-3 group">
            {settings?.logo_url && settings.logo_url.trim() !== "" ? (
              <div className="flex items-center gap-3">
                <img
                  src={settings.logo_url}
                  alt={settings.boutique_name || "SREEVIGNIKAA Sarees"}
                  className="max-h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                    {settings?.boutique_name || "SREEVIGNIKAA Sarees"}
                  </span>
                  <span className="text-[10px] sm:text-xs font-sans uppercase tracking-widest text-blue-600 font-semibold">
                    Sarees, Dresses &amp; Ethnic Wear
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-sky-500 text-white shadow-md ring-2 ring-blue-300/40 group-hover:scale-105 transition-transform duration-300">
                  <span className="font-serif text-xl font-bold">S</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                    {settings?.boutique_name || "SREEVIGNIKAA Sarees"}
                  </span>
                  <span className="text-[10px] sm:text-xs font-sans uppercase tracking-widest text-blue-600 font-semibold">
                    Sarees, Dresses &amp; Ethnic Wear
                  </span>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-blue-600 bg-blue-50/80 font-semibold shadow-sm border border-blue-200/50"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-100/70"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/catalog"
              className="p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </Link>

            {settings?.instagram_url && (
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="Follow on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#20bd5a] hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Inquire</span>
            </a>

            <Link
              href="/admin"
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/catalog"
              className="p-2 text-slate-700 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "text-slate-800 hover:bg-blue-50"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full rounded-xl bg-[#25D366] px-4 py-3 text-base font-semibold text-white shadow-md active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Chat on WhatsApp ({settings?.whatsapp_number || "919876543210"})</span>
              </a>

              <div className="flex items-center justify-between pt-2">
                {settings?.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-slate-700"
                  >
                    <Instagram className="w-4 h-4 text-blue-600" />
                    <span>@sreevignikaa_official</span>
                  </a>
                )}
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Owner Admin</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
