import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CartItem, Currency } from '../types/store';
import { formatPrice, formatCustomizationSummary } from '../utils/formatters';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totalNGN = items.reduce((acc, item) => acc + item.unitPriceNGN * item.quantity, 0);
  const totalPrice = totalNGN;

  // Free shipping threshold: ₦1,000,000
  const freeShippingThreshold = 1000000;
  const progressPercent = Math.min(100, (totalPrice / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#13070a] border-l border-[#d4af37]/30 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#30161d] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <h2 className="text-lg font-serif-luxury font-medium text-[#f5ede3] tracking-wide">
                Your Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#1a0a0f] border-b border-[#30161d] text-xs">
            <div className="flex items-center justify-between text-[#c4b5b8] mb-1.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-[#e2c77d] font-bold">You unlocked FREE Lagos Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-[#f3e5ab]">{formatPrice(remainingForFreeShipping, currency)}</strong> for Free Delivery
                  </span>
                )}
              </span>
              <span className="font-mono-tabular text-[#a59599]">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#2a131b] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#d4af37] to-[#e8c878] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#a59599]">
                <ShoppingBag className="w-12 h-12 stroke-[1.2] text-[#d4af37]/40 mb-3" />
                <p className="text-base font-serif-luxury text-[#f5ede3] mb-1">Your cart is currently empty</p>
                <p className="text-xs max-w-xs mb-6 text-[#b5a5a8]">
                  Explore our single-donor raw hair shop or craft a bespoke wig unit in the studio.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-[#d4af37] hover:bg-[#e5c158] text-[#12070a] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Explore Shop
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice = currency === 'NGN' ? item.unitPriceNGN : item.unitPriceUSD;
                return (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 rounded-xl bg-[#1c0c11] border border-[#30161d] flex gap-3.5 items-start"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#100508] border border-white/10 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-serif-luxury font-medium text-[#f5ede3] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-[#a59599] hover:text-rose-400 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Specs summary */}
                      <p className="text-[11px] text-[#d4af37] mt-0.5 leading-snug">
                        {formatCustomizationSummary(item)}
                      </p>

                      <div className="text-[10px] text-[#a59599] mt-0.5">
                        {item.product.donorOrigin}
                      </div>

                      {/* Price and Stepper */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-white/10 rounded-lg bg-[#14080c] overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                            className="px-2 py-1 text-xs text-[#c4b5b8] hover:bg-white/10 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-1 text-xs font-mono-tabular font-bold text-[#f5ede3]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="px-2 py-1 text-xs text-[#c4b5b8] hover:bg-white/10 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-serif-luxury font-bold text-[#f3e5ab] font-mono-tabular">
                            {formatPrice(itemPrice * item.quantity, currency)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-[#0e0508] border-t border-[#30161d] space-y-4">
              
              <div className="space-y-1.5 text-xs text-[#c4b5b8]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono-tabular font-bold text-[#f5ede3]">
                    {formatPrice(totalPrice, currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Priority Delivery</span>
                  <span className="font-mono-tabular text-[#d4af37]">
                    {remainingForFreeShipping === 0 ? 'FREE' : formatPrice(15000, 'NGN')}
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#2a131b] font-medium text-[#f5ede3]">
                  <span>Total Due</span>
                  <span className="font-serif-luxury text-base font-bold text-[#f3e5ab] font-mono-tabular">
                    {formatPrice(totalPrice + (remainingForFreeShipping === 0 ? 0 : 15000), 'NGN')}
                  </span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#c89924] to-[#a37918] hover:from-[#e5c158] hover:to-[#ba8c22] text-[#12070a] font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Choose Payment & Place Order</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-[#a59599] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                  Korapay Secure Gateway
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-[#25D366]">
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  WhatsApp
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
