/**
 * Single source of truth for Oliviabytee's public business contact details.
 *
 * Update these values only. The WhatsApp number must use international
 * format with digits only (no "+", spaces, or dashes) so wa.me links resolve.
 */
export const BRAND = {
  whatsappNumber: '2348123456789',
  instagramUrl: 'https://instagram.com/oliviabytee',
  tiktokUrl: 'https://tiktok.com/@oliviabytee',
  email: 'info@oliviabytee.com',
} as const;

/** Build a wa.me link, optionally prefilled with a message. */
export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${BRAND.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Build a mailto link, optionally prefilled with a subject. */
export function getMailtoUrl(subject?: string): string {
  const base = `mailto:${BRAND.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
