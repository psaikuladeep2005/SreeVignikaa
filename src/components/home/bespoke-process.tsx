"use client";

import React from "react";
import {
  Sparkles,
  MessageSquare,
  Ruler,
  Package,
  Truck,
  CheckCircle2,
} from "lucide-react";

export function ShoppingProcess() {
  const steps = [
    {
      step: "01",
      title: "Browse & Select",
      subtitle: "Digital Catalog",
      description:
        "Explore sarees, lehengas, dresses, and kids wear in our digital catalog. Filter by category, fabric, work, and price to find the perfect outfit.",
      icon: Sparkles,
      badge: "Easy Browsing",
    },
    {
      step: "02",
      title: "Confirm Details on WhatsApp",
      subtitle: "Size, Color & Availability",
      description:
        "Tap the WhatsApp button on any product. We'll confirm stock availability, color choices, blouse sizing, and delivery timeline for you.",
      icon: MessageSquare,
      badge: "Instant Chat",
    },
    {
      step: "03",
      title: "Quality Check & Packing",
      subtitle: "Hand-Inspected Pieces",
      description:
        "Every outfit is checked for fabric quality, embroidery finish, and measurements before being carefully folded and packed for shipping.",
      icon: Package,
      badge: "Quality Assured",
    },
    {
      step: "04",
      title: "Doorstep Delivery",
      subtitle: "PAN-India Shipping",
      description:
        "Your order is dispatched via insured courier with tracking shared on WhatsApp. Enjoy safe, secure delivery right to your doorstep.",
      icon: Truck,
      badge: "Insured Shipping",
    },
  ];

  return (
    <section
      id="process"
      className="py-20 sm:py-28 bg-gradient-to-b from-champagne-50 via-champagne-100/60 to-champagne-50 border-y border-gold-300/30 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-maroon-900/10 px-3.5 py-1 text-xs font-semibold text-maroon-950 uppercase tracking-widest border border-maroon-900/20">
            <Sparkles className="h-3.5 w-3.5 text-gold-600" />
            <span>How It Works</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon-950 tracking-tight">
            A Simple, Seamless Shopping Journey
          </h2>
          <p className="text-sm sm:text-base text-maroon-800/80 leading-relaxed">
            From browsing the collection to unboxing at home — here is how easy it is to shop with SREEVIGNIKAA Sarees.
          </p>
        </div>

        {/* 4 Steps Timeline */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.step}
                className="group relative flex flex-col justify-between rounded-2xl border border-gold-300/50 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-gold-500"
              >
                {/* Step number watermark */}
                <div className="absolute -top-4 -right-2 font-serif text-6xl font-bold text-gold-400/15 select-none pointer-events-none group-hover:text-gold-400/25 transition-colors">
                  {item.step}
                </div>

                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-maroon-900 text-gold-300 shadow-md group-hover:scale-110 transition-transform">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-champagne-200/80 px-2.5 py-1 text-[11px] font-semibold text-maroon-900">
                      <CheckCircle2 className="h-3 w-3 text-gold-600" />
                      {item.badge}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700 block mb-1">
                    Step {item.step} &bull; {item.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-maroon-950 mb-3 group-hover:text-maroon-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-maroon-900/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-gold-300/30 flex items-center justify-between text-xs font-medium text-gold-700">
                  <span>Transparent WhatsApp Updates</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
