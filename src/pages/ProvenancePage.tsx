import React from 'react';
import { Award, Eye, HeartHandshake, Check, ShieldCheck, Flame, Scissors, Droplets } from 'lucide-react';

interface ProvenancePageProps {
  onNavigatePage: (page: string) => void;
}

export const ProvenancePage: React.FC<ProvenancePageProps> = ({ onNavigatePage }) => {
  return (
    <div className="bg-[#0b0608] min-h-screen text-[#f5ede3] pb-20">
      
      {/* 1. Grand Editorial Hero Banner with Photographic Background */}
      <div className="relative w-full min-h-[440px] sm:min-h-[520px] lg:min-h-[580px] flex items-center justify-center overflow-hidden border-b border-[#2e141b] mb-16 sm:mb-20">
        <img
          src="/assets/images/raw_donor_waves_1793882680855.jpg"
          alt="The Oliviabytee Heritage"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
        />
        {/* Cinematic rich dark gradient overlays for luxury contrast and pristine legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0608] via-[#0b0608]/75 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0608]/80 via-transparent to-[#0b0608]/80 pointer-events-none" />

        {/* Hero Content Block */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-24">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-wider text-[#f5ede3] uppercase mb-6 drop-shadow-2xl">
            THE OLIVIABYTEE HERITAGE
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[#d4c3c6] font-sans leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            We reject mass-produced silicone-coated bundles. Every Oliviabytee creation begins with 100% single-donor raw hair, ethically procured and hand-ventilated to perfection.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="p-8 rounded-3xl bg-[#14080c] border border-[#2e141b] relative overflow-hidden group hover:border-[#d4af37]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#240e16] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif-luxury font-medium mb-3 text-[#f5ede3]">
              100% Single-Donor Integrity
            </h3>
            <p className="text-xs sm:text-sm text-[#a59599] leading-relaxed mb-4">
              Procured from individual donors in the highlands of Vietnam and Cambodia. All cuticles run strictly unidirectional from root to tip, preventing the friction that causes mats and tangles.
            </p>
            <ul className="text-xs text-[#d4af37] space-y-2 pt-4 border-t border-white/5">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" /> Zero synthetic fillers or animal hair
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" /> Lifts cleanly to 613 platinum blonde
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" /> 3+ years expected lifespan
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-[#14080c] border border-[#2e141b] relative overflow-hidden group hover:border-[#d4af37]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#240e16] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif-luxury font-medium mb-3 text-[#f5ede3]">
              0.04mm Real HD Swiss Lace
            </h3>
            <p className="text-xs sm:text-sm text-[#a59599] leading-relaxed mb-4">
              Authentic ultra-thin European HD lace that disappears into the scalp under natural daylight, flash photography, and 4K lenses. Pre-plucked for a graduated density hairline.
            </p>
            <ul className="text-xs text-[#d4af37] space-y-2 pt-4 border-t border-white/5">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" /> Dissolves against all melanin tones
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" /> Micro-bleached single knots
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" /> Completely glueless wearable fit
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-[#14080c] border border-[#2e141b] relative overflow-hidden group hover:border-[#d4af37]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#240e16] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-6">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif-luxury font-medium mb-3 text-[#f5ede3]">
              Master Atelier Craftsmanship
            </h3>
            <p className="text-xs sm:text-sm text-[#a59599] leading-relaxed mb-4">
              Every unit is finished by hand in our bespoke studio. Our wigmakers double-draw each bundle to eliminate short filler hairs, giving you thick, voluminous hair all the way to the ends.
            </p>
            <ul className="text-xs text-[#d4af37] space-y-2 pt-4 border-t border-white/5">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" /> Hand-ventilated perimeter
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" /> Steam-glazed organic textures
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" /> Rigorous 5-point quality check
              </li>
            </ul>
          </div>

        </div>

        {/* Comparison Table: Raw Hair vs Standard Factory Hair */}
        <div className="bg-[#14080c] border border-[#2e141b] rounded-3xl p-6 sm:p-10 mb-20 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] font-bold text-[#d4af37] tracking-[0.25em] uppercase block mb-1">
              THE RAW DIFFERENCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#f5ede3]">
              Oliviabytee Raw vs Mass Market Hair
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#2e141b] text-[11px] uppercase tracking-wider text-[#a59599]">
                  <th className="py-4 px-4 font-semibold">Quality Metric</th>
                  <th className="py-4 px-4 text-[#d4af37] font-bold">Oliviabytee Raw Single-Donor</th>
                  <th className="py-4 px-4 text-[#6e5e62]">Mass Factory Processed Hair</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#240e16] text-[#c4b5b8]">
                <tr>
                  <td className="py-4 px-4 font-medium text-[#f5ede3]">Cuticle Direction</td>
                  <td className="py-4 px-4 text-[#f3e5ab] font-semibold">100% Intact & Unidirectional</td>
                  <td className="py-4 px-4 text-[#7e6d71]">Stripped via Acid Baths</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-[#f5ede3]">Silicone Coating</td>
                  <td className="py-4 px-4 text-[#f3e5ab] font-semibold">Zero (Raw Natural Luster)</td>
                  <td className="py-4 px-4 text-[#7e6d71]">Heavy silicone (washes off in 2 weeks)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-[#f5ede3]">Bleach Potential</td>
                  <td className="py-4 px-4 text-[#f3e5ab] font-semibold">Lifts to #613 Blonde safely</td>
                  <td className="py-4 px-4 text-[#7e6d71]">Damages/melts beyond #27 Honey</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-[#f5ede3]">Longevity</td>
                  <td className="py-4 px-4 text-[#f3e5ab] font-semibold">3 to 5 Years with maintenance</td>
                  <td className="py-4 px-4 text-[#7e6d71]">3 to 6 Months maximum</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-[#f5ede3]">Lace Material</td>
                  <td className="py-4 px-4 text-[#f3e5ab] font-semibold">0.04mm Real HD Swiss Invisible</td>
                  <td className="py-4 px-4 text-[#7e6d71]">Thick Korean or synthetic lace</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Maintenance Guide Grid */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-bold text-[#d4af37] tracking-[0.25em] uppercase block mb-1">
              LONGEVITY PROTOCOL
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#f5ede3]">
              Oliviabytee Care & Preservation Guide
            </h2>
            <p className="text-xs text-[#a59599] mt-2">
              Protect your raw hair investment with these 4 essential studio care guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#14080c] border border-[#2b1218]">
              <Droplets className="w-6 h-6 text-[#d4af37] mb-3" />
              <h4 className="text-sm font-serif-luxury font-semibold text-[#f5ede3] mb-1.5">Sulfate-Free Hydration</h4>
              <p className="text-xs text-[#a59599] leading-relaxed">
                Co-wash fortnightly using lukewarm water and rich argan moisture conditioners. Never twist or rub wet raw hair.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#14080c] border border-[#2b1218]">
              <Flame className="w-6 h-6 text-[#d4af37] mb-3" />
              <h4 className="text-sm font-serif-luxury font-semibold text-[#f5ede3] mb-1.5">Thermal Shielding</h4>
              <p className="text-xs text-[#a59599] leading-relaxed">
                Always apply a high-grade heat protectant serum before flat ironing or wand curling up to 400°F (204°C).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#14080c] border border-[#2b1218]">
              <ShieldCheck className="w-6 h-6 text-[#d4af37] mb-3" />
              <h4 className="text-sm font-serif-luxury font-semibold text-[#f5ede3] mb-1.5">Nightly Silk Wrap</h4>
              <p className="text-xs text-[#a59599] leading-relaxed">
                Sleep with a pure mulberry silk bonnet or wrap your lace with our velvet grip band to avoid hairline friction.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#14080c] border border-[#2b1218]">
              <Scissors className="w-6 h-6 text-[#d4af37] mb-3" />
              <h4 className="text-sm font-serif-luxury font-semibold text-[#f5ede3] mb-1.5">Annual Studio Re-Vent</h4>
              <p className="text-xs text-[#a59599] leading-relaxed">
                Send your unit back to our bespoke studio after 18 months for complimentary lace deep-conditioning and restyling.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-[#1c0b11] via-[#240e16] to-[#16080d] border border-[#d4af37]/35 p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-serif-luxury text-[#f5ede3] mb-3">
            Experience the Oliviabytee Standard
          </h3>
          <p className="text-xs sm:text-sm text-[#b5a5a8] mb-6 max-w-lg mx-auto">
            Explore our ready-to-ship raw collections or customize your signature crown in our Bespoke Studio.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigatePage('shop')}
              className="px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#ba8d1d] text-[#12070a] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d4af37]/25 cursor-pointer hover:from-[#e5c158]"
            >
              Shop Raw Creations
            </button>
            <button
              onClick={() => onNavigatePage('customizer')}
              className="px-7 py-3.5 rounded-lg bg-[#180a0e] text-[#f5ede3] hover:text-[#d4af37] border border-[#d4af37]/40 font-semibold text-xs uppercase tracking-wider cursor-pointer"
            >
              Open Bespoke Studio
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
