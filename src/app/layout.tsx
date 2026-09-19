import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileFloatingWhatsApp } from "@/components/layout/mobile-nav";

export const metadata: Metadata = {
  title: "SREEVIGNIKAA Sarees | Sarees, Designer Dresses & Ethnic Wear",
  description:
    "Shop curated Kanchipuram & Banarasi silk sarees, designer sarees, lehengas, Anarkali gowns, salwar suits, kurtis, and kids ethnic wear at SREEVIGNIKAA Sarees. Inquire and order instantly on WhatsApp.",
  keywords: [
    "Silk Sarees",
    "Kanchipuram Sarees",
    "Banarasi Sarees",
    "Designer Sarees",
    "Lehengas",
    "Half Sarees",
    "Designer Dresses",
    "Anarkali Gowns",
    "Salwar Suits",
    "Kurtis",
    "Kids Ethnic Wear",
    "Pattu Pavadai",
    "Ethnic Wear Kadapa",
    "SREEVIGNIKAA Sarees",
  ],
  authors: [{ name: "SREEVIGNIKAA Sarees" }],
  openGraph: {
    title: "SREEVIGNIKAA Sarees | Sarees, Designer Dresses & Ethnic Wear",
    description:
      "Curated silk sarees, designer sarees, lehengas, gowns, and kids ethnic wear. Inquire and order instantly on WhatsApp.",
    url: "https://sreevignikaasarees.com",
    siteName: "SREEVIGNIKAA Sarees",
    images: [
      {
        url: "https://sree-vignikaa.vercel.app/images/brand.png",
        width: 1200,
        height: 630,
        alt: "SREEVIGNIKAA Sarees & Ethnic Wear",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-blue-50/25 to-white text-slate-900 font-sans antialiased selection:bg-blue-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileFloatingWhatsApp />
      </body>
    </html>
  );

}
