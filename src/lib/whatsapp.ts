import { BoutiqueSettings, ProductWithImages } from "./types";
import { formatINR } from "./utils";

/**
 * Clean up a WhatsApp phone number so it contains only digits.
 * Automatically adds the 91 country code if it's a 10-digit
 * Indian mobile number.
 */
export function cleanWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10) {
    return `91${digits}`;
  }

  return digits;
}

/**
 * Generates a WhatsApp inquiry URL for a specific product.
 *
 * The message contains:
 * - Boutique name
 * - Product name
 * - Product code
 * - Price
 * - Product catalog link
 * - Availability/order enquiry request
 */
export function generateWhatsAppLink(
  product: ProductWithImages,
  settings: BoutiqueSettings,
  customSiteUrl?: string
): string {
  const phone = cleanWhatsAppNumber(settings.whatsapp_number);

  const baseUrl =
    customSiteUrl ||
    (typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL ||
        "https://sreevignikaasarees.com");

  const productUrl = `${baseUrl}/catalog/${product.slug}`;

  const formattedPrice = formatINR(
    product.price,
    product.is_price_visible
  );

  let message = `Hello *${settings.boutique_name}*! ✨\n\n`;

  message += `I would like to inquire about this item from your collection:\n\n`;

  message += `• *Product Name:* ${product.name}\n`;
  message += `• *Product Code:* ${product.product_code}\n`;
  message += `• *Price:* ${formattedPrice}\n`;
  message += `• *Catalog Link:* ${productUrl}\n`;

  message += `\nCould you please share availability, delivery time, and ordering details?`;

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

/**
 * Generates a general WhatsApp consultation URL for the boutique.
 */
export function generateGeneralWhatsAppLink(
  settings: BoutiqueSettings,
  inquiryType: string = "General Inquiry"
): string {
  const phone = cleanWhatsAppNumber(settings.whatsapp_number);

  const message =
    `Hello *${settings.boutique_name}*! ✨\n\n` +
    `I am contacting you from your official website for a *${inquiryType}*.\n\n` +
    `Could you please share more details about your sarees and dresses collection?`;

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phone}?text=${encodedMessage}`;
}
