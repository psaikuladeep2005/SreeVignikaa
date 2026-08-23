"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Save,
  Phone,
  Instagram,
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
  Building2,
  Upload,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BoutiqueSettings } from "@/lib/types";
import { getBoutiqueSettings, saveBoutiqueSettings, uploadProductImageFile } from "@/lib/api";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<BoutiqueSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getBoutiqueSettings();
      setSettings(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;
    setUploadingLogo(true);
    try {
      const url = await uploadProductImageFile(file);
      setSettings({ ...settings, logo_url: url });
    } catch (err) {
      console.error("Logo upload error:", err);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleRemoveLogo = () => {
    if (!settings) return;
    setSettings({ ...settings, logo_url: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSavedSuccess(false);
    const updated = await saveBoutiqueSettings(settings);
    setSettings(updated);
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (loading || !settings) {
    return <div className="h-64 rounded-2xl bg-white animate-pulse border border-slate-200" />;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-slate-900">
          Boutique Logo, WhatsApp &amp; Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Configure your website logo, WhatsApp contact number, Instagram profile, and homepage banners. Changes update live across the webpage immediately.
        </p>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 border border-emerald-200 shadow-sm animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Boutique branding &amp; settings saved successfully! Website header and footer updated.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* LOGO & BRANDING BOX */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-blue-600" />
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Website Logo &amp; Identity
              </h2>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Auto-Updates Webpage Header &amp; Footer
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Logo Preview */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center space-y-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Current Live Logo
              </span>

              {settings.logo_url && settings.logo_url.trim() !== "" ? (
                <div className="relative h-20 w-36 overflow-hidden rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shadow-sm">
                  <Image
                    src={settings.logo_url}
                    alt="Boutique Logo Preview"
                    fill
                    className="object-contain p-1"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 py-3 px-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-white font-serif font-bold text-lg shadow-sm">
                    S
                  </div>
                  <span className="font-serif font-bold text-slate-900 text-lg">
                    {settings.boutique_name || "SREEVIGNIKAA Sarees"}
                  </span>
                </div>
              )}

              {settings.logo_url ? (
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 pt-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Remove Logo (Use Default)</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-500">
                  Using default SREEVIGNIKAA Sarees icon
                </span>
              )}
            </div>

            {/* Upload & URL Input */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <Label className="text-xs font-semibold text-slate-900">
                  Upload New Logo Image (PNG, JPG, SVG, WebP)
                </Label>
                <div className="mt-1.5 flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer hover:bg-blue-500 transition-all shadow-sm">
                    <Upload className="h-4 w-4" />
                    <span>{uploadingLogo ? "Uploading Logo..." : "Upload Logo File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-slate-500">
                    Recommended: Transparent PNG or SVG (height ~120px)
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="logo-url" className="text-xs font-semibold text-slate-900">
                  Or Paste Logo Image URL directly
                </Label>
                <Input
                  id="logo-url"
                  value={settings.logo_url || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, logo_url: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/... or /logo.png"
                  className="bg-slate-50"
                />
                <p className="text-[11px] text-slate-500">
                  When a logo image is provided, it replaces the &quot;S&quot; badge in the navbar and footer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Configuration Box */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Building2 className="h-5 w-5 text-blue-600" />
            <h2 className="font-serif text-xl font-bold text-slate-900">
              Boutique Identity &amp; Contact
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <Label htmlFor="b-name" className="text-xs font-semibold text-slate-900">
                Boutique Name
              </Label>
              <Input
                id="b-name"
                value={settings.boutique_name}
                onChange={(e) =>
                  setSettings({ ...settings, boutique_name: e.target.value })
                }
                placeholder="SREEVIGNIKAA Sarees"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="w-num" className="text-xs font-semibold text-slate-900">
                WhatsApp Phone Number (with Country Code)
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="w-num"
                  value={settings.whatsapp_number}
                  onChange={(e) =>
                    setSettings({ ...settings, whatsapp_number: e.target.value })
                  }
                  placeholder="919876543210"
                  required
                  className="pl-9"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                e.g. 919876543210 (without + or spaces). This number receives all WhatsApp inquiries.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <Label htmlFor="ig-url" className="text-xs font-semibold text-slate-900">
                Official Instagram Profile URL
              </Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="ig-url"
                  value={settings.instagram_url}
                  onChange={(e) =>
                    setSettings({ ...settings, instagram_url: e.target.value })
                  }
                  placeholder="https://instagram.com/sreevignikaa_official"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-slate-900">
                Studio Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  value={settings.email}
                  onChange={(e) =>
                    setSettings({ ...settings, email: e.target.value })
                  }
                  placeholder="contact@sreevignikaa.com"
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address" className="text-xs font-semibold text-slate-900">
              Studio Location / Address
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="address"
                value={settings.address}
                onChange={(e) =>
                  setSettings({ ...settings, address: e.target.value })
                }
                placeholder="SREEVIGNIKAA Sarees Studio, Trunk Road, Kadapa, Andhra Pradesh, 516001"
                className="pl-9"
              />
            </div>
          </div>
        </div>

        {/* Homepage Hero Box */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <h2 className="font-serif text-xl font-bold text-slate-900">
              Homepage Hero &amp; Bio
            </h2>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="hero-title" className="text-xs font-semibold text-slate-900">
              Hero Banner Main Heading
            </Label>
            <Input
              id="hero-title"
              value={settings.hero_title}
              onChange={(e) =>
                setSettings({ ...settings, hero_title: e.target.value })
              }
              placeholder="Elegant Sarees, Designer Dresses & Festive Ethnic Wear"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="hero-sub" className="text-xs font-semibold text-slate-900">
              Hero Subheading
            </Label>
            <Textarea
              id="hero-sub"
              value={settings.hero_subtitle}
              onChange={(e) =>
                setSettings({ ...settings, hero_subtitle: e.target.value })
              }
              placeholder="Curated silk sarees, designer drapes, lehengas, and ethnic wear..."
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="about-text" className="text-xs font-semibold text-slate-900">
              Footer &amp; About Summary
            </Label>
            <Textarea
              id="about-text"
              value={settings.about_text}
              onChange={(e) =>
                setSettings({ ...settings, about_text: e.target.value })
              }
              placeholder="SREEVIGNIKAA Sarees is a curated boutique for sarees, designer dresses, and kids ethnic wear..."
              className="min-h-[100px]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-6 text-base shadow-lg"
          >
            <Save className="h-5 w-5" />
            <span>{saving ? "Saving Changes..." : "Save Boutique Settings"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
