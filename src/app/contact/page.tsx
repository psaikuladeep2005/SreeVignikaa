import React from "react";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Instagram,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact SREEVIGNIKAA Sarees | Sarees & Ethnic Wear",
  description:
    "Reach SREEVIGNIKAA Sarees in Kadapa, Andhra Pradesh for sarees, designer dresses, lehengas, and kids ethnic wear. Connect on WhatsApp for availability, sizing, and PAN-India delivery.",
};

export default function ContactPage() {
  const waUrl = "https://wa.me/919876543210?text=Hello%20SREEVIGNIKAA Sarees!%20I%20would%20like%20to%20know%20more%20about%20your%20sarees%20and%20dresses%20collection.";

  const faqs = [
    {
      q: "Do you offer PAN-India delivery?",
      a: "Yes! We ship across Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, and all over India through insured courier partners with tracking shared on WhatsApp.",
    },
    {
      q: "How do I check if a saree or dress is in stock?",
      a: "Simply tap the WhatsApp button on the product page or message us directly. We will confirm stock, available colours, and the exact delivery timeline for you.",
    },
    {
      q: "Can I get blouse stitching with a saree?",
      a: "Yes, for many sarees we can arrange matching blouse stitching or a custom-styled blouse. Mention it in your WhatsApp inquiry and we will share sizing details.",
    },
    {
      q: "What is your return / exchange policy?",
      a: "Please contact us on WhatsApp within 24–48 hours of delivery with photos. We'll guide you on eligible returns, size exchanges, or replacements based on the product.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 via-blue-50/20 to-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 uppercase tracking-widest border border-blue-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>We Are Here for You</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Connect With SREEVIGNIKAA Sarees
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            Whether you want to visit our store in Kadapa or shop online via WhatsApp, we&apos;re happy to help you find the perfect outfit.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900 p-8 sm:p-10 text-white shadow-2xl border border-blue-500/20 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Store &amp; Contact Details
            </h3>

            <div className="space-y-4 text-sm text-slate-300 pt-2">
              <div className="flex items-start gap-3.5">
                <MapPin className="h-5 w-5 text-sky-400 shrink-0 mt-1" />
                <div>
                  <span className="block font-semibold text-white">
                    Store Location
                  </span>
                  <span>
                    SREEVIGNIKAA Sarees Studio, Trunk Road, Kadapa, Andhra Pradesh, 516001, India
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="h-5 w-5 text-sky-400 shrink-0 mt-1" />
                <div>
                  <span className="block font-semibold text-white">
                    WhatsApp &amp; Phone
                  </span>
                  <span>+91 98765 43210</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="h-5 w-5 text-sky-400 shrink-0 mt-1" />
                <div>
                  <span className="block font-semibold text-white">
                    Email Inquiry
                  </span>
                  <span>contact@sreevignikaa.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="h-5 w-5 text-sky-400 shrink-0 mt-1" />
                <div>
                  <span className="block font-semibold text-white">
                    Store Hours
                  </span>
                  <span>Monday – Saturday: 10:00 AM – 8:30 PM (IST)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-blue-500/20 space-y-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] px-6 py-4 text-sm font-bold text-white shadow-lg hover:bg-[#20bd5a] transition-all duration-300"
              >
                <MessageCircle className="h-5 w-5 fill-white" />
                <span>Open Instant WhatsApp Chat</span>
              </a>

              <a
                href="https://instagram.com/sreevignikaa_official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl border border-blue-400/40 bg-slate-800 px-6 py-3.5 text-sm font-semibold text-white hover:bg-slate-700 transition-all duration-300"
              >
                <Instagram className="h-4 w-4 text-sky-400" />
                <span>Follow @sreevignikaa_official</span>
              </a>
            </div>
          </div>

          {/* Right Column: FAQ (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-blue-100/60 bg-white/80 backdrop-blur-xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2 font-serif text-2xl font-bold text-slate-900">
                <HelpCircle className="h-6 w-6 text-blue-600" />
                <h2>Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4 divide-y divide-blue-100/60">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="pt-4 first:pt-0 space-y-1.5">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900">
                      {faq.q}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
