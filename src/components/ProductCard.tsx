import React from 'react';
import { SlidersHorizontal, Plus, Star } from 'lucide-react';
import { Product, Currency } from '../types/store';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onOpenCustomizer: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onOpenCustomizer,
  onQuickAdd,
}) => {
  const price = currency === 'NGN' ? product.basePriceNGN : product.basePriceUSD;

  return (
    <div className="group relative flex flex-col justify-between bg-[#13070a] rounded-2xl border border-[#30161d] hover:border-[#d4af37]/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/60">
      
      {/* Top Image Showcase Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#180a0e]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Subtle Quiet Tag (Not a rounded candy pill) */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-[#d4af37]/30 text-[#f3e5ab] text-[10px] font-semibold tracking-wider uppercase">
            {product.badge}
          </div>
        )}

        {/* Donor Origin Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-[#f5ede3] bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2 rounded-md opacity-90 group-hover:opacity-100 transition-opacity">
          <span className="truncate">{product.donorOrigin}</span>
          <div className="flex items-center gap-1 text-[#d4af37] text-[10px] font-mono-tabular shrink-0">
            <Star className="w-3 h-3 fill-[#d4af37]" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Category kicker */}
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#d4af37]/80 mb-1">
            {product.category === 'wigs' ? 'Raw Single-Donor Wig' : product.category === 'frontals' ? 'HD Swiss Frontal' : product.category === 'bundles' ? 'Raw Donor Bundles' : 'Hair Care & Elixir'}
          </div>

          {/* Product Name */}
          <h3 className="text-base sm:text-lg font-serif-luxury font-medium text-[#f5ede3] group-hover:text-[#f3e5ab] transition-colors mb-1.5 leading-snug">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-[#b5a5a8] line-clamp-2 mb-4 leading-relaxed font-sans-luxury">
            {product.tagline}
          </p>
        </div>

        {/* Pricing and Action Strip */}
        <div className="pt-3 border-t border-[#261016] flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-[#a59599] uppercase tracking-wider">
              {product.isCustomizableWig ? 'From' : 'Price'}
            </div>
            <div className="text-base sm:text-lg font-serif-luxury font-bold text-[#f3e5ab] font-mono-tabular">
              {formatPrice(price, currency)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {product.isCustomizableWig ? (
              <button
                onClick={() => onOpenCustomizer(product)}
                className="px-3.5 py-2 rounded-lg bg-[#200d12] hover:bg-[#d4af37] text-[#f3e5ab] hover:text-[#12070a] border border-[#d4af37]/40 text-xs font-semibold tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>
            ) : (
              <button
                onClick={() => onQuickAdd(product)}
                className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#ba8d1d] hover:from-[#e5c158] hover:to-[#c89924] text-[#12070a] text-xs font-bold tracking-wider transition-all duration-200 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
