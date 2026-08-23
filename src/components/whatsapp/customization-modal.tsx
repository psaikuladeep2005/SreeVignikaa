"use client";

import React, { useState } from "react";
import { MessageCircle, Sparkles, Check, Palette, Ruler, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ProductWithImages, BoutiqueSettings, CustomizationOptions } from "@/lib/types";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { formatINR } from "@/lib/utils";

interface CustomizationModalProps {
  product: ProductWithImages;
  settings: BoutiqueSettings;
  triggerButton?: React.ReactNode;
}

export function CustomizationModal({
  product,
  settings,
  triggerButton,
}: CustomizationModalProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<CustomizationOptions>({
    customNeckline: false,
    colorChange: false,
    sleeveChange: false,
    urgentOrder: false,
    customerNotes: "",
  });

  const handleToggle = (key: keyof CustomizationOptions) => {
    if (key === "customerNotes") return;
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleOpenWhatsApp = () => {
    const link = generateWhatsAppLink(product, settings, options);
    window.open(link, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button
            variant="whatsapp"
            className="w-full gap-2 shadow-md py-6 text-base font-semibold"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Inquire &amp; Order on WhatsApp</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg p-6 bg-champagne-50 border-gold-400/30">
        <DialogHeader>
          <div className="flex items-center gap-2 text-gold-600 font-serif text-sm font-semibold uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>Order Preferences</span>
          </div>
          <DialogTitle className="text-xl font-serif font-bold text-maroon-950">
            Inquire about: {product.name}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-maroon-800/80">
            Select any options below and we&apos;ll pre-fill a WhatsApp message with the product code ({product.product_code}), price ({formatINR(product.price, product.is_price_visible)}), and link.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleToggle("customNeckline")}
              className={`flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all ${
                options.customNeckline
                  ? "border-maroon-900 bg-maroon-900/5 text-maroon-950 shadow-sm ring-1 ring-maroon-900"
                  : "border-maroon-900/15 bg-white/70 hover:bg-champagne-100/60"
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                  options.customNeckline
                    ? "border-maroon-900 bg-maroon-900 text-gold-100"
                    : "border-maroon-900/30 bg-white"
                }`}
              >
                {options.customNeckline && <Check className="h-3 w-3" />}
              </div>
              <div>
                <span className="block text-xs font-semibold text-maroon-950">
                  Need Blouse Stitching
                </span>
                <span className="text-[11px] text-maroon-800/70">
                  Add a matching / custom-styled blouse
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleToggle("colorChange")}
              className={`flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all ${
                options.colorChange
                  ? "border-maroon-900 bg-maroon-900/5 text-maroon-950 shadow-sm ring-1 ring-maroon-900"
                  : "border-maroon-900/15 bg-white/70 hover:bg-champagne-100/60"
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                  options.colorChange
                    ? "border-maroon-900 bg-maroon-900 text-gold-100"
                    : "border-maroon-900/30 bg-white"
                }`}
              >
                {options.colorChange && <Check className="h-3 w-3" />}
              </div>
              <div>
                <span className="block text-xs font-semibold text-maroon-950">
                  Check Other Colors
                </span>
                <span className="text-[11px] text-maroon-800/70">
                  Ask about available color options
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleToggle("sleeveChange")}
              className={`flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all ${
                options.sleeveChange
                  ? "border-maroon-900 bg-maroon-900/5 text-maroon-950 shadow-sm ring-1 ring-maroon-900"
                  : "border-maroon-900/15 bg-white/70 hover:bg-champagne-100/60"
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                  options.sleeveChange
                    ? "border-maroon-900 bg-maroon-900 text-gold-100"
                    : "border-maroon-900/30 bg-white"
                }`}
              >
                {options.sleeveChange && <Check className="h-3 w-3" />}
              </div>
              <div>
                <span className="block text-xs font-semibold text-maroon-950">
                  Size / Fitting Help
                </span>
                <span className="text-[11px] text-maroon-800/70">
                  Need sizing guidance or measurements
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleToggle("urgentOrder")}
              className={`flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all ${
                options.urgentOrder
                  ? "border-amber-600 bg-amber-50 text-amber-950 shadow-sm ring-1 ring-amber-600"
                  : "border-maroon-900/15 bg-white/70 hover:bg-champagne-100/60"
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                  options.urgentOrder
                    ? "border-amber-600 bg-amber-600 text-white"
                    : "border-maroon-900/30 bg-white"
                }`}
              >
                {options.urgentOrder && <Check className="h-3 w-3" />}
              </div>
              <div>
                <span className="block text-xs font-semibold text-amber-900">
                  Urgent / Function Date
                </span>
                <span className="text-[11px] text-maroon-800/70">
                  Need it quickly for an upcoming event
                </span>
              </div>
            </button>
          </div>

          <div className="space-y-1.5 pt-1">
            <Label htmlFor="customerNotes" className="text-xs font-semibold text-maroon-950">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="customerNotes"
              placeholder="e.g. Need this by next Saturday, looking for size M, or would like a matching blouse piece..."
              value={options.customerNotes}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, customerNotes: e.target.value }))
              }
              className="min-h-[70px] bg-white"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 border-t border-gold-300/30">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            variant="whatsapp"
            onClick={handleOpenWhatsApp}
            className="w-full sm:w-auto gap-2 py-5 font-semibold shadow-md"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Open in WhatsApp</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
