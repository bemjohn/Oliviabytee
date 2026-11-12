import { Currency, CartItem } from '../types/store';
import { getWhatsAppUrl } from '../config/brand';

export function formatPrice(amount: number, currency: Currency): string {
  if (currency === 'NGN') {
    return `₦${amount.toLocaleString('en-NG')}`;
  }
  return `$${amount.toLocaleString('en-US')}`;
}

export function formatCustomizationSummary(item: CartItem): string {
  if (!item.customization) return 'Standard Ready-to-Wear';
  const c = item.customization;
  const laceNames: Record<string, string> = {
    hd_swiss: 'Invisible HD Swiss',
    frontal_13x4: '13x4 Frontal',
    frontal_13x6: '13x6 Deep Parting',
    closure_5x5: '5x5 HD Closure',
  };
  return `${c.length}" · ${c.density}% Density · ${laceNames[c.laceType] || c.laceType} · Cap: ${c.capSize.toUpperCase()}`;
}

export function generateWhatsAppOrderURL(
  orderId: string,
  items: CartItem[],
  totalPrice: number,
  currency: Currency,
  customerName: string,
  phone: string,
  address: string,
  city: string
): string {
  let message = `*NEW BESPOKE ORDER — OLIVIABYTEE LUXURY WIGS*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Order Reference:* #${orderId}\n`;
  message += `*Client Name:* ${customerName}\n`;
  message += `*Phone:* ${phone}\n`;
  message += `*Delivery Address:* ${address}, ${city}\n\n`;

  message += `*ORDERED PIECES:*\n`;
  items.forEach((item, index) => {
    const itemPrice = currency === 'NGN' ? item.unitPriceNGN : item.unitPriceUSD;
    message += `\n*${index + 1}. ${item.product.name}* (x${item.quantity})\n`;
    if (item.customization) {
      const c = item.customization;
      message += `   • Length: ${c.length} inches\n`;
      message += `   • Density: ${c.density}%\n`;
      message += `   • Lace: ${c.laceType.replace('_', ' ').toUpperCase()}\n`;
      message += `   • Cap Size: ${c.capSize.toUpperCase()}\n`;
      message += `   • Knots: Bleached & Pre-plucked\n`;
      message += `   • Tint: ${c.laceTint.replace('_', ' ')}\n`;
    }
    message += `   • Price: ${formatPrice(itemPrice * item.quantity, currency)}\n`;
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*TOTAL AMOUNT:* ${formatPrice(totalPrice, currency)}\n`;
  message += `*Payment Method:* Direct WhatsApp Payment\n`;
  message += `*Delivery:* Express Priority Dispatch coordinated by our concierge\n\n`;
  message += `Hello Oliviabytee team, I would like to finalize my order above and confirm account details for payment.`;

  return getWhatsAppUrl(message);
}
