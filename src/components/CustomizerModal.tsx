import React, { useState } from 'react';
import { X, Check, ShieldCheck, Ruler, Scissors, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product, WigCustomization, WigLength, WigDensity, LaceType, CapSize, Currency } from '../types/store';
import {
  calculateCustomWigPriceNGN,
  convertNGNToUSD,
  LENGTH_PRICE_DELTAS_NGN,
  DENSITY_PRICE_DELTAS_NGN,
  LACE_PRICE_DELTAS_NGN,
} from '../data/catalog';
import { formatPrice } from '../utils/formatters';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  currency: Currency;
  onAddToCart: (product: Product, customization: WigCustomization, quantity: number) => void;
  onDirectCheckout: (product: Product, customization: WigCustomization) => void;
}

const LENGTHS: { value: WigLength; label: string; desc: string }[] = [
  { value: 10, label: '10 Inch', desc: 'Sleek blunt collarbone bob' },
  { value: 12, label: '12 Inch', desc: 'Shoulder-grazing Parisian bob' },
  { value: 14, label: '14 Inch', desc: 'Collarbone chic drop' },
  { value: 18, label: '18 Inch', desc: 'Mid-back flattering drop' },
  { value: 22, label: '22 Inch', desc: 'Classic waist-skimming length (Signature)' },
  { value: 26, label: '26 Inch', desc: 'Dramatic lower waist flow' },
  { value: 30, label: '30 Inch', desc: 'Hip-length mermaid glam' },
  { value: 32, label: '32 Inch', desc: 'Floor-turning red carpet length' },
];

const DENSITIES: { value: WigDensity; label: string; desc: string }[] = [
  { value: 150, label: '150% Density', desc: 'Natural light density (everyday scalp match)' },
  { value: 180, label: '180% Density', desc: 'Full standard studio volume (Most Popular)' },
  { value: 200, label: '200% Density', desc: 'Glamour red-carpet thickness & fullness' },
  { value: 250, label: '250% Density', desc: 'Ultra-luxurious heavyweight strands' },
  { value: 300, label: '300% Density', desc: 'Maximum show-stopping volume' },
];

const LACE_TYPES: { value: LaceType; title: string; subtitle: string; meltRating: string }[] = [
  {
    value: 'hd_swiss',
    title: 'Invisible HD Swiss Melt Lace',
    subtitle: '0.04mm ultra-thin European lace that disappears completely into all skin tones.',
    meltRating: '10/10 Seamless Melt',
  },
  {
    value: 'frontal_13x6',
    title: '13x6 Deep Ear-to-Ear Frontal',
    subtitle: 'Deep 6-inch parting space for high ponytails, half-up styles, and dramatic side parts.',
    meltRating: 'Maximum Styling Freedom',
  },
  {
    value: 'frontal_13x4',
    title: '13x4 Classic Lace Frontal',
    subtitle: 'Standard temple-to-temple natural hairline with versatile front styling.',
    meltRating: 'Classic Ear-to-Ear',
  },
  {
    value: 'closure_5x5',
    title: '5x5 Glueless HD Swiss Closure',
    subtitle: '100% glueless beginner-friendly unit. Slip on and off in under 2 minutes.',
    meltRating: '100% Glueless Friendly',
  },
];

const CAP_SIZES: { value: CapSize; label: string; circumference: string }[] = [
  { value: 'small', label: 'Small', circumference: '21.0" - 21.5" Circumference' },
  { value: 'medium', label: 'Medium (Standard)', circumference: '22.0" - 22.5" Circumference (Fits 90%)' },
  { value: 'large', label: 'Large', circumference: '23.0" - 23.5" Circumference' },
];

const LACE_TINTS = [
  { value: 'transparent', label: 'Transparent / HD Clear', color: '#f3e5d0' },
  { value: 'light_brown', label: 'Light Brown Caramel', color: '#b9885c' },
  { value: 'medium_brown', label: 'Medium Warm Brown', color: '#825432' },
  { value: 'dark_brown', label: 'Dark Deep Espresso', color: '#3f2518' },
] as const;

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  product,
  currency,
  onAddToCart,
  onDirectCheckout,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [length, setLength] = useState<WigLength>(22);
  const [density, setDensity] = useState<WigDensity>(180);
  const [laceType, setLaceType] = useState<LaceType>('hd_swiss');
  const [capSize, setCapSize] = useState<CapSize>('medium');
  const [bleachedKnots, setBleachedKnots] = useState(true);
  const [prePluckedBabyHairs, setPrePluckedBabyHairs] = useState(true);
  const [elasticBandAttached, setElasticBandAttached] = useState(true);
  const [laceTint, setLaceTint] = useState<'transparent' | 'light_brown' | 'medium_brown' | 'dark_brown'>('light_brown');

  if (!isOpen) return null;

  const currentCustomization: WigCustomization = {
    length,
    density,
    laceType,
    capSize,
    bleachedKnots,
    prePluckedBabyHairs,
    elasticBandAttached,
    laceTint,
  };

  const finalPriceNGN = calculateCustomWigPriceNGN(product.basePriceNGN, currentCustomization);
  const finalPriceUSD = convertNGNToUSD(finalPriceNGN);
  const displayPrice = currency === 'NGN' ? finalPriceNGN : finalPriceUSD;

  const handleAdd = () => {
    onAddToCart(product, currentCustomization, 1);
    onClose();
  };

  const handleFastCheckout = () => {
    onDirectCheckout(product, currentCustomization);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#14080c] border border-[#d4af37]/30 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col lg:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Gallery & Provenance Specs */}
        <div className="lg:w-5/12 bg-[#0e0508] p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#30161d]">
          <div>
            {/* Active Selected Preview Image */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#180a0e] border border-[#d4af37]/20 shadow-inner mb-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-[#d4af37]/40 text-[#f3e5ab] text-[11px] font-medium tracking-wider uppercase">
                {product.donorOrigin}
              </div>
            </div>

            {/* Thumbnail Gallery Row */}
            <div className="flex gap-2 mb-6">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    selectedImage === imgUrl
                      ? 'border-[#d4af37] ring-1 ring-[#d4af37]'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Craftsmanship Highlights */}
            <div className="space-y-3 pt-4 border-t border-[#30161d] text-xs text-[#d1c4c7]">
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#d4af37]" />
                <span>Single-donor raw hair · Zero synthetic fillers</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#d4af37]" />
                <span>Hand-ventilated micro knots in bespoke atelier</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>3+ Years Longevity with standard gentle care</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#30161d] text-[11px] text-[#a59599]">
            Includes complimentary Oliviabytee luxury satin dust bag & wide-tooth wooden comb.
          </div>
        </div>

        {/* Right Column: Interactive Customizer Controls */}
        <div className="lg:w-7/12 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between max-h-[85vh] lg:max-h-[92vh]">
          <div>
            {/* Header */}
            <div className="mb-6">
              <span className="text-[11px] font-bold text-[#d4af37] tracking-[0.25em] uppercase block mb-1">
                BESPOKE STUDIO BUILDER
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#f5ede3] mb-2 font-medium">
                {product.name}
              </h2>
              <p className="text-sm text-[#b5a5a8] leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Customizer Section 1: Hair Length */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-semibold text-[#f5ede3] uppercase tracking-wider flex items-center gap-1.5">
                  <span>1. Hair Length:</span>
                  <span className="text-[#d4af37] font-bold">{length} Inches</span>
                </label>
                <span className="text-[11px] text-[#a59599]">True to length raw bundles</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {LENGTHS.map((item) => {
                  const isSelected = length === item.value;
                  const deltaNGN = LENGTH_PRICE_DELTAS_NGN[item.value] || 0;
                  return (
                    <button
                      key={item.value}
                      onClick={() => setLength(item.value)}
                      className={`py-2 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#f5ede3] ring-1 ring-[#d4af37]'
                          : 'border-white/10 bg-[#1e0d13] text-[#c4b5b8] hover:border-white/30'
                      }`}
                    >
                      <div className="text-xs font-bold font-mono-tabular">{item.value}"</div>
                      <div className="text-[10px] text-[#d4af37]/90 mt-0.5">
                        {deltaNGN === 0 ? 'Base' : deltaNGN > 0 ? `+${formatPrice(currency === 'NGN' ? deltaNGN : convertNGNToUSD(deltaNGN), currency)}` : `${formatPrice(currency === 'NGN' ? deltaNGN : convertNGNToUSD(deltaNGN), currency)}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customizer Section 2: Density */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-semibold text-[#f5ede3] uppercase tracking-wider">
                  2. Hair Density: <span className="text-[#d4af37]">{density}%</span>
                </label>
                <span className="text-[11px] text-[#a59599]">Full cuticle thickness</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {DENSITIES.map((item) => {
                  const isSelected = density === item.value;
                  const deltaNGN = DENSITY_PRICE_DELTAS_NGN[item.value] || 0;
                  return (
                    <button
                      key={item.value}
                      onClick={() => setDensity(item.value)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#f5ede3] ring-1 ring-[#d4af37]'
                          : 'border-white/10 bg-[#1e0d13] text-[#c4b5b8] hover:border-white/30'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.value}%</div>
                      <div className="text-[10px] text-[#a59599] truncate">{item.label.split(' ')[1] || 'Full'}</div>
                      <div className="text-[10px] text-[#d4af37] mt-0.5 font-mono-tabular">
                        {deltaNGN === 0 ? 'Included' : `+${formatPrice(currency === 'NGN' ? deltaNGN : convertNGNToUSD(deltaNGN), currency)}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customizer Section 3: HD Lace Type */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-semibold text-[#f5ede3] uppercase tracking-wider">
                  3. Lace Construction & Frontal
                </label>
                <span className="text-[11px] text-[#d4af37]">0.04mm Thin Swiss Lace</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {LACE_TYPES.map((lace) => {
                  const isSelected = laceType === lace.value;
                  const deltaNGN = LACE_PRICE_DELTAS_NGN[lace.value] || 0;
                  return (
                    <button
                      key={lace.value}
                      onClick={() => setLaceType(lace.value)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#d4af37] bg-[#d4af37]/15 ring-1 ring-[#d4af37]'
                          : 'border-white/10 bg-[#1e0d13] hover:border-white/30'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#f5ede3]">{lace.title}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#d4af37]" />}
                        </div>
                        <p className="text-[11px] text-[#b5a5a8] mt-1 leading-snug">
                          {lace.subtitle}
                        </p>
                      </div>
                      <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                        <span className="text-[#e2c77d]">{lace.meltRating}</span>
                        <span className="font-mono-tabular text-[#d4af37]">
                          {deltaNGN === 0 ? 'Standard' : deltaNGN > 0 ? `+${formatPrice(currency === 'NGN' ? deltaNGN : convertNGNToUSD(deltaNGN), currency)}` : `${formatPrice(currency === 'NGN' ? deltaNGN : convertNGNToUSD(deltaNGN), currency)}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customizer Section 4: Cap Size & Lace Tint */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              
              {/* Cap Size */}
              <div>
                <label className="block text-xs font-semibold text-[#f5ede3] uppercase tracking-wider mb-2">
                  4. Cap Circumference
                </label>
                <div className="space-y-1.5">
                  {CAP_SIZES.map((cap) => (
                    <button
                      key={cap.value}
                      onClick={() => setCapSize(cap.value)}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs flex items-center justify-between transition-all cursor-pointer ${
                        capSize === cap.value
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#f5ede3]'
                          : 'border-white/10 bg-[#1e0d13] text-[#c4b5b8] hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="font-semibold">{cap.label}</span>
                        <span className="text-[10px] text-[#a59599] block">{cap.circumference}</span>
                      </div>
                      {capSize === cap.value && <Check className="w-4 h-4 text-[#d4af37]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lace Tint Shade */}
              <div>
                <label className="block text-xs font-semibold text-[#f5ede3] uppercase tracking-wider mb-2">
                  5. Skin Lace Tint
                </label>
                <div className="space-y-1.5">
                  {LACE_TINTS.map((tint) => (
                    <button
                      key={tint.value}
                      onClick={() => setLaceTint(tint.value)}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs flex items-center justify-between transition-all cursor-pointer ${
                        laceTint === tint.value
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#f5ede3]'
                          : 'border-white/10 bg-[#1e0d13] text-[#c4b5b8] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-4 h-4 rounded-full border border-black/40 shadow-sm shrink-0"
                          style={{ backgroundColor: tint.color }}
                        />
                        <span>{tint.label}</span>
                      </div>
                      {laceTint === tint.value && <Check className="w-4 h-4 text-[#d4af37]" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Atelier Complimentary Finishers */}
            <div className="p-3.5 rounded-xl bg-[#1e0d13] border border-[#d4af37]/20 mb-6">
              <span className="text-[11px] font-semibold text-[#d4af37] uppercase tracking-wider block mb-2">
                Studio Handcrafting Standards (Included at No Extra Cost):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#d1c4c7]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bleachedKnots}
                    onChange={(e) => setBleachedKnots(e.target.checked)}
                    className="accent-[#d4af37] rounded"
                  />
                  <span>Bleached Micro Knots</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prePluckedBabyHairs}
                    onChange={(e) => setPrePluckedBabyHairs(e.target.checked)}
                    className="accent-[#d4af37] rounded"
                  />
                  <span>Pre-Plucked Natural Hairline</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={elasticBandAttached}
                    onChange={(e) => setElasticBandAttached(e.target.checked)}
                    className="accent-[#d4af37] rounded"
                  />
                  <span>Adjustable Elastic Band</span>
                </label>
              </div>
            </div>

          </div>

          {/* Bottom Action Footer with Live Calculated Price */}
          <div className="pt-4 border-t border-[#30161d] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#14080c] sticky bottom-0">
            <div>
              <div className="text-[11px] text-[#a59599] uppercase tracking-wider">Total Custom Price:</div>
              <div className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#f3e5ab] font-mono-tabular">
                {formatPrice(displayPrice, currency)}
              </div>
              <div className="text-[10px] text-[#d4af37]/80">
                Single-donor raw hair · Handcrafted by Master Artisans
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleAdd}
                className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-[#2a131b] hover:bg-[#3d1b27] border border-[#d4af37]/40 text-[#f5ede3] text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                <span>Add To Cart</span>
              </button>

              <button
                onClick={handleFastCheckout}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b88c22] hover:from-[#e5c158] hover:to-[#c89924] text-[#12070a] text-xs font-bold tracking-wider uppercase transition-all shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
