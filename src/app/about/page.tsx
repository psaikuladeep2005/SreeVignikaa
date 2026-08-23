import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Award, HeartHandshake, Gem, Shirt } from "lucide-react";

export const metadata: Metadata = {
  title: "About SREEVIGNIKAA Sarees | Sarees & Ethnic Wear",
  description:
    "Learn about SREEVIGNIKAA Sarees — a curated fashion boutique in Kadapa, Andhra Pradesh offering silk sarees, designer sarees, lehengas, dresses, and kids ethnic wear with PAN-India delivery.",
};

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-slate-50 via-blue-50/20 to-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 uppercase tracking-widest border border-blue-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Our Story</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Celebrating the Beauty of the Saree &amp; Ethnic Wear
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Based in Kadapa, Andhra Pradesh, SREEVIGNIKAA Sarees is a curated fashion boutique bringing together handloom silks, contemporary designer wear, and festive ethnic outfits for women and kids.
          </p>
        </div>

        {/* Feature Story Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/60 shadow-[0_12px_36px_rgb(0,0,0,0.06)] bg-blue-50/50">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000"
                alt="Elegant silk saree collection at SREEVIGNIKAA Sarees"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <span className="block font-serif text-sm font-bold text-slate-900">
                  Handpicked Quality
                </span>
                <span className="text-xs text-slate-500">
                  Every piece personally checked
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              A Boutique Built Around You
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              At SREEVIGNIKAA Sarees, we believe every woman deserves to feel graceful and confident — whether she is draping a heritage Kanchipuram silk for a wedding, slipping into a shimmering georgette saree for a reception, or wearing a breezy kurti for a regular day out.
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              We travel through renowned weaving hubs and designer studios to handpick sarees, lehengas, gowns, and kids ethnic wear. Each outfit is inspected for fabric quality, colour accuracy, embroidery finish, and stitching before it reaches you.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="rounded-2xl border border-blue-100/60 bg-white/80 backdrop-blur-md p-4 shadow-sm">
                <Gem className="h-6 w-6 text-blue-600 mb-2" />
                <h4 className="font-serif font-bold text-slate-900">
                  Authentic Fabrics
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Pure Kanchipuram, Banarasi, Mysore silk, georgette, organza, and breathable cottons.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100/60 bg-white/80 backdrop-blur-md p-4 shadow-sm">
                <Shirt className="h-6 w-6 text-blue-600 mb-2" />
                <h4 className="font-serif font-bold text-slate-900">
                  Every Occasion
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Bridal silks, party wear, everyday kurtis, and adorable kids ethnic outfits.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Studio CTA Banner */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-10 sm:p-14 text-center text-white shadow-2xl border border-blue-500/20">
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Looking for the perfect outfit?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Browse our full collection online or message us on WhatsApp. Share the occasion, budget, and colour preference — we&apos;ll help you find the right saree or dress.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-blue-500 transition-all"
            >
              Browse Collection
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-blue-400/40 bg-transparent px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
