import React, { useState } from 'react';
import { Product, Currency, WigCustomization, WigLength, LaceType } from '../types/store';
import {
  DEFAULT_CUSTOMIZATION,
  calculateCustomWigPriceNGN,
} from '../data/catalog';
import { formatPrice } from '../utils/formatters';
import {
  SlidersHorizontal,
  Check,
  ShoppingBag,
  Zap,
  Info,
  ShieldCheck,
  Ruler,
  HelpCircle,
} from 'lucide-react';

interface CustomizerPageProps {
  products: Product[];
  currency: Currency;
  onAddToCart: (product: Product, customization: WigCustomization, quantity: number) => void;
  onDirectCheckout: (product: Product, customization: WigCustomization) => void;
}

export const CustomizerPage: React.FC<CustomizerPageProps> = ({
  products,
  currency,
  onAddToCart,
  onDirectCheckout,
}) => {
  // Customizable products
  const wigProducts = products.filter((p) => p.isCustomizableWig);
  const [selectedProduct, setSelectedProduct] = useState<Product>(wigProducts[0] || products[0]);
  const [customization, setCustomization] = useState<WigCustomization>({
    ...DEFAULT_CUSTOMIZATION,
    length: 26,
    density: 200,
    laceType: 'hd_swiss',
  });

  // Dynamic calculated price in NGN
  const priceNGN = calculateCustomWigPriceNGN(selectedProduct.basePriceNGN, customization);

  const lengthOptions: WigLength[] = [10, 12, 14, 18, 22, 26, 30, 32];
  const densityOptions = [
    { value: 150, label: '150% Natural Density', note: 'Subtle daily look' },
    { value: 180, label: '180% Full Volume', note: 'Standard salon density' },
    { value: 200, label: '200% Glamour Density', note: 'Most requested luxury weight' },
    { value: 250, label: '250% Heavy Glamour', note: 'Red carpet thickness' },
    { value: 300, label: '300% Maximum Studio Density', note: 'Double-drawn full bundle weight' },
  ];

  const laceOptions: { id: LaceType; name: string; desc: string }[] = [
    { id: 'hd_swiss', name: '0.04mm Invisible HD Swiss Lace', desc: 'Ultra-thin, zero-detectable melt for all skin tones' },
    { id: 'frontal_13x6', name: '13x6 Ear-to-Ear Full Frontal', desc: 'Deep side parting & versatile high updos' },
    { id: 'frontal_13x4', name: '13x4 HD Swiss Frontal', desc: 'Full ear-to-ear natural hairline styling' },
    { id: 'closure_5x5', name: '5x5 HD Swiss Closure', desc: 'Glueless ready-to-wear with contoured edge' },
  ];

  const capSizes = [
    { id: 'small', label: 'Small (21.5")', note: 'Petite head circumference' },
    { id: 'medium', label: 'Medium (22.5")', note: 'Fits 85% of clients comfortably' },
    { id: 'large', label: 'Large (23.5")', note: 'Extended cap room for thick braids' },
  ];

  const laceTints = [
    { id: 'transparent', label: 'Transparent Clear', color: '#f3e8df' },
    { id: 'light_brown', label: 'Light Brown', color: '#c79d7e' },
    { id: 'medium_brown', label: 'Medium Brown', color: '#8d5538' },
    { id: 'dark_brown', label: 'Dark Espresso Brown', color: '#44261d' },
  ];

  return (
    <div className="py-10 sm:py-14 bg-[#0b0608] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-[#d4af37] text-xs font-semibold tracking-[0.25em] uppercase mb-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>BESPOKE ATELIER STUDIO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury text-[#f5ede3] font-medium tracking-tight">
            Design Your Custom Crown
          </h1>
          <p className="text-xs sm:text-sm text-[#a59599] mt-2 font-sans-luxury">
            Engineered to your exact measurements: choose donor hair length, cuticle density, lace melt, and tailored cap size.
          </p>
        </div>

        {/* Base Texture Product Switcher */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {wigProducts.map((p) => {
            const isSelected = p.id === selectedProduct.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className={`px-4 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#d4af37] text-[#12070a] font-bold shadow-lg shadow-[#d4af37]/25'
                    : 'bg-[#180a0e] text-[#c4b5b8] border border-[#2e141b] hover:text-white'
                }`}
              >
                <span>{p.name.replace(' Atelier Wig', '').replace(' Raw Hair Wig', '')}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Bespoke Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Live Visualizer & Atelier Specs (Sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-[#120609] border border-[#2e131b] rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              
              {/* Product Photo with Badge Overlays */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#180a0e] mb-6 border border-white/5">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Floating Live Spec Quiet Tags */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-[#d4af37]/40 text-[#f3e5ab] text-[11px] font-mono-tabular font-bold">
                    {customization.length}" RAW LENGTH
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/20 text-[#f5ede3] text-[11px] font-mono-tabular">
                    {customization.density}% DENSITY
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#d4af37] font-semibold block">
                    {selectedProduct.texture} · {selectedProduct.donorOrigin}
                  </span>
                  <h3 className="text-xl font-serif-luxury text-[#f5ede3] font-medium">
                    {selectedProduct.name}
                  </h3>
                </div>
              </div>

              {/* Price & Atelier Summary */}
              <div className="p-4 rounded-xl bg-[#1c0b11] border border-[#30161d] mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-[#a59599]">Calculated Investment</span>
                  <span className="text-2xl font-serif-luxury font-bold text-[#f3e5ab]">
                    {formatPrice(priceNGN, currency)}
                  </span>
                </div>
                <div className="text-[11px] text-[#8e7f83] flex items-center justify-between border-t border-white/5 pt-2">
                  <span>Base Unit (22")</span>
                  <span>{formatPrice(selectedProduct.basePriceNGN, currency)}</span>
                </div>
                {customization.length > 22 && (
                  <div className="text-[11px] text-[#d4af37] flex items-center justify-between pt-1">
                    <span>+{customization.length - 22}" Raw Length Addition</span>
                    <span>+{formatPrice((customization.length - 22) * 20000, currency)}</span>
                  </div>
                )}
                {customization.density > 180 && (
                  <div className="text-[11px] text-[#d4af37] flex items-center justify-between pt-1">
                    <span>Double-Drawn {customization.density}% Volume</span>
                    <span>+{formatPrice(customization.density === 200 ? 45000 : customization.density === 250 ? 90000 : 135000, currency)}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => onAddToCart(selectedProduct, customization, 1)}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#ba8d1d] hover:from-[#e5c158] hover:to-[#c89924] text-[#12070a] font-bold text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-lg shadow-[#d4af37]/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                  <span>Add Bespoke Unit to Cart</span>
                </button>

                <button
                  onClick={() => onDirectCheckout(selectedProduct, customization)}
                  className="w-full py-3.5 rounded-lg bg-[#1c0b11] hover:bg-[#250e16] text-[#f5ede3] hover:text-[#d4af37] border border-[#d4af37]/40 font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-[#d4af37]" />
                  <span>Instant Checkout Now</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Customizer Controls */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Hair Length (14" to 32") */}
            <div className="bg-[#14080c] border border-[#2b1218] rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5ede3] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#d4af37] text-[#12070a] text-xs font-bold flex items-center justify-center">1</span>
                    Raw Hair Length (Inches)
                  </h3>
                  <p className="text-xs text-[#a59599] mt-0.5">
                    True raw length measured stretched from crown to tips.
                  </p>
                </div>
                <span className="text-sm font-bold font-mono-tabular text-[#d4af37] bg-[#1f0c13] px-3 py-1 rounded-full border border-[#d4af37]/30">
                  {customization.length}" Selected
                </span>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {lengthOptions.map((len) => {
                  const isSelected = customization.length === len;
                  return (
                    <button
                      key={len}
                      onClick={() => setCustomization({ ...customization, length: len })}
                      className={`py-2.5 rounded-xl text-xs font-mono-tabular font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#d4af37] text-[#12070a] shadow-md shadow-[#d4af37]/20 scale-105'
                          : 'bg-[#1c0b11] text-[#c4b5b8] border border-[#30161d] hover:border-[#d4af37]/40'
                      }`}
                    >
                      {len}"
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Density Selection */}
            <div className="bg-[#14080c] border border-[#2b1218] rounded-2xl p-6 shadow-xl">
              <div className="mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5ede3] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#d4af37] text-[#12070a] text-xs font-bold flex items-center justify-center">2</span>
                  Cuticle Volume & Density
                </h3>
                <p className="text-xs text-[#a59599] mt-0.5">
                  Hand-ventilated single-donor cuticles with double-drawn thickness.
                </p>
              </div>

              <div className="space-y-2.5">
                {densityOptions.map((opt) => {
                  const isSelected = customization.density === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setCustomization({ ...customization, density: opt.value as any })}
                      className={`w-full p-3.5 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer border ${
                        isSelected
                          ? 'bg-[#220d14] border-[#d4af37] text-[#f5ede3] shadow-md'
                          : 'bg-[#180a0e] border-[#2e141b] text-[#b5a5a8] hover:border-[#d4af37]/30'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold text-[#f5ede3] flex items-center gap-2">
                          <span>{opt.label}</span>
                          {opt.value === 200 && (
                            <span className="text-[10px] uppercase font-bold text-[#d4af37] bg-[#d4af37]/15 px-2 py-0.5 rounded-full border border-[#d4af37]/30">
                              Most Popular
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#8e7f83] mt-0.5">{opt.note}</div>
                      </div>

                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        isSelected ? 'border-[#d4af37] bg-[#d4af37] text-[#12070a]' : 'border-white/20'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: HD Swiss Lace Type */}
            <div className="bg-[#14080c] border border-[#2b1218] rounded-2xl p-6 shadow-xl">
              <div className="mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5ede3] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#d4af37] text-[#12070a] text-xs font-bold flex items-center justify-center">3</span>
                  HD Swiss Lace Craftsmanship
                </h3>
                <p className="text-xs text-[#a59599] mt-0.5">
                  Ultra-thin 0.04mm European lace designed for an undetectable scalp melt.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {laceOptions.map((opt) => {
                  const isSelected = customization.laceType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setCustomization({ ...customization, laceType: opt.id as any })}
                      className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#220d14] border-[#d4af37] text-[#f5ede3] shadow-md'
                          : 'bg-[#180a0e] border-[#2e141b] text-[#b5a5a8] hover:border-[#d4af37]/30'
                      }`}
                    >
                      <div className="text-xs font-semibold text-[#f5ede3] mb-1">{opt.name}</div>
                      <div className="text-[11px] text-[#8e7f83] leading-relaxed">{opt.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Cap Size & Measurement Guide */}
            <div className="bg-[#14080c] border border-[#2b1218] rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5ede3] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#d4af37] text-[#12070a] text-xs font-bold flex items-center justify-center">4</span>
                    Cap Size Circumference
                  </h3>
                  <p className="text-xs text-[#a59599] mt-0.5">
                    Tailored breathability with 4 internal security combs & adjustable strap.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {capSizes.map((cap) => {
                  const isSelected = customization.capSize === cap.id;
                  return (
                    <button
                      key={cap.id}
                      onClick={() => setCustomization({ ...customization, capSize: cap.id as any })}
                      className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#220d14] border-[#d4af37] text-[#f5ede3]'
                          : 'bg-[#180a0e] border-[#2e141b] text-[#b5a5a8] hover:border-[#d4af37]/30'
                      }`}
                    >
                      <div className="text-xs font-semibold text-[#f5ede3]">{cap.label}</div>
                      <div className="text-[11px] text-[#8e7f83] mt-1">{cap.note}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Finishing Touches & Lace Tint */}
            <div className="bg-[#14080c] border border-[#2b1218] rounded-2xl p-6 shadow-xl">
              <div className="mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5ede3] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#d4af37] text-[#12070a] text-xs font-bold flex items-center justify-center">5</span>
                  Lace Tint & Studio Finishing (Complimentary)
                </h3>
              </div>

              {/* Lace Tint Swatches */}
              <div className="mb-5">
                <label className="text-xs text-[#a59599] block mb-2 font-medium">Select Scalp Tone Tint:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {laceTints.map((tint) => {
                    const isSelected = customization.laceTint === tint.id;
                    return (
                      <button
                        key={tint.id}
                        onClick={() => setCustomization({ ...customization, laceTint: tint.id as any })}
                        className={`p-2.5 rounded-xl text-xs flex items-center gap-2 border transition-all cursor-pointer ${
                          isSelected ? 'bg-[#220d14] border-[#d4af37]' : 'bg-[#180a0e] border-[#2e141b]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/40 shrink-0"
                          style={{ backgroundColor: tint.color }}
                        />
                        <span className="text-[11px] text-[#e0d4d7] truncate">{tint.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-3 border-t border-[#2e141b]">
                <label className="flex items-center justify-between text-xs cursor-pointer p-2 rounded-lg hover:bg-white/5">
                  <span className="text-[#f5ede3]">Micro-Bleached Knots (Clean Invisible Parting)</span>
                  <input
                    type="checkbox"
                    checked={customization.bleachedKnots}
                    onChange={(e) => setCustomization({ ...customization, bleachedKnots: e.target.checked })}
                    className="accent-[#d4af37] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between text-xs cursor-pointer p-2 rounded-lg hover:bg-white/5">
                  <span className="text-[#f5ede3]">Pre-Plucked Scalp-Graduated Baby Hairs</span>
                  <input
                    type="checkbox"
                    checked={customization.prePluckedBabyHairs}
                    onChange={(e) => setCustomization({ ...customization, prePluckedBabyHairs: e.target.checked })}
                    className="accent-[#d4af37] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between text-xs cursor-pointer p-2 rounded-lg hover:bg-white/5">
                  <span className="text-[#f5ede3]">Pre-Sewn Glueless Adjustable Elastic Band</span>
                  <input
                    type="checkbox"
                    checked={customization.elasticBandAttached}
                    onChange={(e) => setCustomization({ ...customization, elasticBandAttached: e.target.checked })}
                    className="accent-[#d4af37] w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
