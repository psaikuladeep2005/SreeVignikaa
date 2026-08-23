"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Layers,
  Sparkles,
  ExternalLink,
  PlusCircle,
  MessageCircle,
  TrendingUp,
  Award,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";
import { getProducts, getCategories, getBoutiqueSettings } from "@/lib/api";
import { ProductWithImages, Category, BoutiqueSettings } from "@/lib/types";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<ProductWithImages[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<BoutiqueSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [p, c, s] = await Promise.all([
        getProducts(),
        getCategories(true),
        getBoutiqueSettings(),
      ]);
      setProducts(p);
      setCategories(c);
      setSettings(s);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 rounded-2xl bg-white border border-gold-300/30" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="h-32 rounded-2xl bg-white border border-gold-300/30" />
          <div className="h-32 rounded-2xl bg-white border border-gold-300/30" />
          <div className="h-32 rounded-2xl bg-white border border-gold-300/30" />
        </div>
      </div>
    );
  }

  const featuredCount = products.filter((p) => p.is_featured).length;
  const availableCount = products.filter((p) => p.is_available).length;
  const activeCategoriesCount = categories.filter((c) => c.is_active).length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-maroon-950 via-maroon-900 to-[#501323] p-6 sm:p-8 text-gold-100 shadow-xl border border-gold-400/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-gold-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Owner Control Center</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gold-50">
            Welcome, {settings?.boutique_name || "sreevignikaa"} Owner
          </h1>
          <p className="text-xs sm:text-sm text-champagne-200/80">
            Manage your digital catalog, add new sarees &amp; dresses, and configure WhatsApp contact settings without code.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 rounded-xl bg-gold-400 px-5 py-3 text-sm font-bold text-maroon-950 shadow-md hover:bg-gold-300 transition-all"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add New Design</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-gold-400/40 bg-white/10 px-5 py-3 text-sm font-semibold text-gold-100 hover:bg-white/20 transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View Live Website</span>
          </Link>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-2xl border border-gold-300/40 bg-white p-6 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-maroon-800/60 block">
              Total Designs
            </span>
            <span className="font-serif text-3xl font-bold text-maroon-950">
              {products.length}
            </span>
            <span className="block text-[11px] text-emerald-700 font-medium mt-1">
              {availableCount} available in stock
            </span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-maroon-900 text-gold-300">
            <ShoppingBag className="h-6 w-6" />
          </div>
        </div>

        <div className="rounded-2xl border border-gold-300/40 bg-white p-6 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-maroon-800/60 block">
              Categories
            </span>
            <span className="font-serif text-3xl font-bold text-maroon-950">
              {categories.length}
            </span>
            <span className="block text-[11px] text-maroon-900/70 font-medium mt-1">
              {activeCategoriesCount} active on website
            </span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/20 text-gold-700">
            <Layers className="h-6 w-6" />
          </div>
        </div>

        <div className="rounded-2xl border border-gold-300/40 bg-white p-6 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-maroon-800/60 block">
              Featured Items
            </span>
            <span className="font-serif text-3xl font-bold text-maroon-950">
              {featuredCount}
            </span>
            <span className="block text-[11px] text-gold-700 font-medium mt-1">
              Highlight on Home Page
            </span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
            <Award className="h-6 w-6" />
          </div>
        </div>

        <div className="rounded-2xl border border-gold-300/40 bg-white p-6 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-maroon-800/60 block">
              WhatsApp Line
            </span>
            <span className="font-mono text-sm font-bold text-maroon-950">
              +{settings?.whatsapp_number || "919876543210"}
            </span>
            <span className="block text-[11px] text-emerald-700 font-medium mt-1">
              Inquiries Active
            </span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/20 text-[#25D366]">
            <MessageCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="group rounded-2xl border border-gold-300/40 bg-white p-6 shadow-sm hover:shadow-xl hover:border-gold-500 transition-all flex flex-col justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-maroon-900/10 px-3 py-1 text-xs font-semibold text-maroon-950 mb-3">
              <ShoppingBag className="h-3.5 w-3.5 text-gold-700" />
              <span>Catalog Control</span>
            </span>
            <h3 className="font-serif text-xl font-bold text-maroon-950 group-hover:text-maroon-700">
              Manage Products &amp; Images
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-maroon-800/80">
              Add new sarees &amp; dresses, upload high-resolution photos, update pricing, or mark items as featured.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gold-300/20 text-xs font-semibold text-gold-700">
            Open Catalog Manager &rarr;
          </div>
        </Link>

        <Link
          href="/admin/categories"
          className="group rounded-2xl border border-gold-300/40 bg-white p-6 shadow-sm hover:shadow-xl hover:border-gold-500 transition-all flex flex-col justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/20 px-3 py-1 text-xs font-semibold text-gold-800 mb-3">
              <Layers className="h-3.5 w-3.5 text-gold-700" />
              <span>Organization</span>
            </span>
            <h3 className="font-serif text-xl font-bold text-maroon-950 group-hover:text-maroon-700">
              Manage Categories
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-maroon-800/80">
              Organize your collection into Silk Sarees, Designer Sarees, Lehengas, Dresses, Suits &amp; Kurtis, and Kids Wear.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gold-300/20 text-xs font-semibold text-gold-700">
            Open Category Manager &rarr;
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="group rounded-2xl border border-gold-300/40 bg-white p-6 shadow-sm hover:shadow-xl hover:border-gold-500 transition-all flex flex-col justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-champagne-200 px-3 py-1 text-xs font-semibold text-maroon-900 mb-3">
              <PhoneCall className="h-3.5 w-3.5 text-maroon-900" />
              <span>Contact Config</span>
            </span>
            <h3 className="font-serif text-xl font-bold text-maroon-950 group-hover:text-maroon-700">
              WhatsApp &amp; Boutique Settings
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-maroon-800/80">
              Update your WhatsApp phone number, Instagram handle, studio address, and home hero banners.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gold-300/20 text-xs font-semibold text-gold-700">
            Open Boutique Settings &rarr;
          </div>
        </Link>
      </div>

      {/* Recent Catalog Preview Table */}
      <div className="rounded-2xl border border-gold-300/40 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-maroon-950">
              Recent Additions
            </h3>
            <p className="text-xs text-maroon-800/70">
              Latest items listed in your digital catalog
            </p>
          </div>
          <Link
            href="/admin/products"
            className="text-xs font-semibold text-gold-700 hover:underline"
          >
            View All ({products.length}) &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gold-300/30 text-maroon-800/70">
                <th className="pb-3 font-semibold">SKU Code</th>
                <th className="pb-3 font-semibold">Creation Name</th>
                <th className="pb-3 font-semibold">Work Type</th>
                <th className="pb-3 font-semibold">Price</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-300/20">
              {products.slice(0, 5).map((p) => (
                <tr key={p.id} className="hover:bg-champagne-50/50">
                  <td className="py-3 font-mono font-bold text-gold-700">
                    {p.product_code}
                  </td>
                  <td className="py-3 font-serif font-bold text-maroon-950">
                    {p.name}
                  </td>
                  <td className="py-3 text-maroon-900/80">{p.work_type}</td>
                  <td className="py-3 font-semibold text-maroon-950">
                    {p.is_price_visible && p.price ? `₹${p.price.toLocaleString("en-IN")}` : "On Request"}
                  </td>
                  <td className="py-3">
                    {p.is_available ? (
                      <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-semibold text-red-800">
                        Unavailable
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
