# SREEVIGNIKAA Sarees — Sarees & Ethnic Wear Boutique Website

A complete, production-ready **digital product catalog** for a saree & ethnic wear boutique, built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Framer Motion**, and **Supabase (PostgreSQL, Storage, & Authentication)**.

Designed with a clean **White, Dark Blue, and Blue color palette**, smooth animations, and buttery scrolling.

---

## 👗 About The Boutique

**SREEVIGNIKAA Sarees** is a curated fashion boutique based in **Kadapa, Andhra Pradesh (India)**, offering:
- 🥻 **Silk Sarees** — Kanchipuram, Banarasi, Mysore, Uppada handloom silks
- ✨ **Designer Sarees** — organza, georgette, sequin & zardozi party wear
- 👑 **Lehengas & Half Sarees** — bridal lehengas, langa voni, chaniya cholis
- 👗 **Designer Dresses & Gowns** — Anarkalis, floor-length gowns, Indowestern co-ords
- 🧵 **Salwar Suits & Kurtis** — daily-wear cotton kurtis, palazzo suits, festive sets
- 👧 **Kids Ethnic Wear** — pattu pavadai, kids lehengas, festive frocks

> **Architecture:** This is a **Digital Product Catalog** (not a shopping-cart/checkout store). Customers browse multi-image galleries, filter by category/fabric/work/price, and contact the owner directly via **WhatsApp** with a pre-filled inquiry containing product name, SKU code, price, and exact URL.

---

## 🚀 Key Features

### 1. Digital Catalog & Search
- Responsive multi-image galleries with thumbnail selectors and zoom.
- Filter by **Category**, **Work Type**, **Fabric**, and **Price Range**.
- Keyword search across name, SKU (e.g. `SS-2026-101`), fabric, and work.
- Sort: Featured, Newest, Price (asc/desc), Name A-Z.
- In-stock / price-visibility badges (₹ vs Price on Request).

### 2. Direct WhatsApp Inquiry & Preferences
- One-tap WhatsApp button generates a URL-encoded message with product details.
- Optional preferences checklist: blouse stitching, other colours, sizing help, urgent date, and custom notes.

### 3. Admin Dashboard (`/admin`)
- Logo & identity manager (upload or paste URL — auto-updates navbar & footer).
- Product CRUD with multi-image upload (Supabase Storage or local fallback).
- Category CRUD with hide/show toggle.
- Boutique settings: WhatsApp number, Instagram, email, address, hero banners.

### 4. Dual-Mode Architecture
- **Demo mode:** localStorage-backed data layer works with zero configuration.
- **Production mode:** set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to connect to Supabase.

---

## 🛠️ Local Development

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🔐 Admin Login
- URL: `/admin/login`
- Demo: `admin@sreevignikaa.com` / `admin123`
- Or click **"Instant Demo Owner Login"**.
