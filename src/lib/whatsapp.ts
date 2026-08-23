import { BoutiqueSettings, ProductWithImages, CustomizationOptions } from "./types";
import { formatINR } from "./utils";

/**
 * Clean up a WhatsApp phone number so it contains only digits.
 * Automatically adds '91' prefix if it's a 10-digit Indian number without country code.
 */
export function cleanWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `91${digits}`;
  }
  return digits;
}

/**
 * Generates the WhatsApp inquiry URL with a pre-filled message containing:
 * - Product Name
 * - Product Code
 * - Price (if available / visible)
 * - Product URL
 * - Optional preferences (blouse stitching, color, sizing, urgent date, notes)
 */
export function generateWhatsAppLink(
  product: ProductWithImages,
  settings: BoutiqueSettings,
  options?: CustomizationOptions,
  customSiteUrl?: string
): string {
  const phone = cleanWhatsAppNumber(settings.whatsapp_number);
  const baseUrl =
    customSiteUrl ||
    (typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || "https://sreevignikaasarees.com");
  const productUrl = `${baseUrl}/catalog/${product.slug}`;
  const formattedPrice = formatINR(product.price, product.is_price_visible);

  let message = `Hello *${settings.boutique_name}*! ✨\n`;
  message += `I would like to inquire about this item from your collection:\n\n`;
  message += `• *Product Name:* ${product.name}\n`;
  message += `• *Product Code:* ${product.product_code}\n`;
  message += `• *Price:* ${formattedPrice}\n`;
  message += `• *Catalog Link:* ${productUrl}\n`;

  if (options && Object.values(options).some(Boolean)) {
    message += `\n*My Preferences:*\n`;
    if (options.customNeckline) {
      message += `  ✓ I would like blouse stitching / matching blouse\n`;
    }
    if (options.colorChange) {
      message += `  ✓ Please share available color options\n`;
    }
    if (options.sleeveChange) {
      message += `  ✓ I need help with size / measurements\n`;
    }
    if (options.urgentOrder) {
      message += `  ⚡ I need this for an upcoming function / urgent date\n`;
    }
    if (options.customerNotes && options.customerNotes.trim() !== "") {
      message += `  📝 *Note:* "${options.customerNotes.trim()}"\n`;
    }
  }

  message += `\nCould you please share availability, delivery time, and ordering details?`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

/**
 * Generates a general WhatsApp consultation URL for the boutique
 */
export function generateGeneralWhatsAppLink(
  settings: BoutiqueSettings,
  inquiryType: string = "General Inquiry"
): string {
  const phone = cleanWhatsAppNumber(settings.whatsapp_number);
  const message = `Hello *${settings.boutique_name}*! ✨\nI am contacting you from your official website for a *${inquiryType}*. Could you please share more details about your sarees and dresses collection?`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}
