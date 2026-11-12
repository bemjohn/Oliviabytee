import React, { useState } from 'react';
import { X, ArrowRight, RotateCcw, Check, MessageCircle, SlidersHorizontal } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Product } from '../types/store';
import { getWhatsAppUrl } from '../config/brand';

interface HairQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onOpenCustomizerWithProduct: (product: Product) => void;
  onNavigateToShop: (filter?: string) => void;
}

interface QuizAnswers {
  texture: string;
  length: string;
  lace: string;
}

export const HairQuizModal: React.FC<HairQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onOpenCustomizerWithProduct,
  onNavigateToShop,
}) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    texture: '',
    length: '',
    lace: '',
  });

  if (!isOpen) return null;

  const handleSelectTexture = (val: string) => {
    setAnswers((prev) => ({ ...prev, texture: val }));
    setStep(2);
  };

  const handleSelectLength = (val: string) => {
    setAnswers((prev) => ({ ...prev, length: val }));
    setStep(3);
  };

  const handleSelectLace = (val: string) => {
    setAnswers((prev) => ({ ...prev, lace: val }));
    setStep(4); // Results step
  };

  const handleReset = () => {
    setAnswers({ texture: '', length: '', lace: '' });
    setStep(1);
  };

  // Determine matched product based on texture choice
  const getMatchedProduct = (): Product => {
    if (answers.texture === 'straight') {
      return products.find((p) => p.id === 'wig-empress-straight') || products[0];
    }
    if (answers.texture === 'bodywave') {
      return products.find((p) => p.id === 'wig-lekki-bodywave') || products[1];
    }
    if (answers.texture === 'coils') {
      return products.find((p) => p.id === 'wig-heritage-kinky') || products[2];
    }
    if (answers.texture === 'glueless') {
      return products.find((p) => p.id === 'wig-glueless-couture') || products[0];
    }
    return products[0];
  };

  const matchedProduct = getMatchedProduct();

  const handleWhatsAppConsultation = () => {
    const text = `Hello Oliviabytee Stylist! I took your Hair Match Quiz:
• Desired Texture: ${answers.texture.toUpperCase()}
• Desired Length: ${answers.length.toUpperCase()}
• Preferred Lace: ${answers.lace.toUpperCase()}
• Suggested Match: ${matchedProduct.name}

Can you help me confirm the best specifications and place my order?`;
    const url = getWhatsAppUrl(text);
    window.open ? window.open(url, '_blank') : (window.location.href = url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#12070a] border border-[#3b1722] p-6 sm:p-8 shadow-2xl text-[#f5ede3] overflow-hidden">
        
        {/* Subtle gold halo decoration */}
        <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-[#961c3c]/15 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#281119] relative z-10">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37]">
              Oliviabytee Crown Match Quiz
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#1e0a10] text-[#a59599] hover:text-[#f5ede3] hover:bg-[#2e121a] transition-colors cursor-pointer"
            aria-label="Close Quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step <= 3 && (
          <div className="my-5 relative z-10">
            <div className="flex items-center justify-between text-xs text-[#a59599] mb-2 font-mono-tabular">
              <span>Step {step} of 3</span>
              <span className="text-[#d4af37] font-semibold">
                {step === 1 && 'Signature Texture'}
                {step === 2 && 'Desired Length'}
                {step === 3 && 'Lace & Cap Preference'}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#200c14] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Texture */}
        {step === 1 && (
          <div className="space-y-4 my-6 relative z-10">
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-medium">
              Which hair texture defines your dream look?
            </h3>
            <p className="text-xs text-[#c4b5b8]">
              Select the movement and pattern you want for your everyday or special-occasion crown.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { id: 'straight', label: 'Bone Straight', desc: 'Silky glass press, sleek & flawless' },
                { id: 'bodywave', label: 'Natural S-Waves', desc: 'Lekki luxe waves that bounce back' },
                { id: 'coils', label: 'Heritage Coils (3C-4A)', desc: 'Regal crown volume & tight curls' },
                { id: 'glueless', label: 'Glueless Ready-to-Wear', desc: '30-second wear, zero glue or gel' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectTexture(opt.id)}
                  className="p-4 rounded-xl text-left bg-[#1a0b10] border border-[#2d121b] hover:border-[#d4af37] hover:bg-[#250f17] transition-all cursor-pointer group"
                >
                  <span className="text-sm font-semibold text-[#f5ede3] group-hover:text-[#d4af37] block">
                    {opt.label}
                  </span>
                  <span className="text-xs text-[#9a898d] block mt-1">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Length */}
        {step === 2 && (
          <div className="space-y-4 my-6 relative z-10">
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-medium">
              What hair length do you prefer?
            </h3>
            <p className="text-xs text-[#c4b5b8]">
              All units are crafted from 100% thick, single-donor raw bundles root-to-tip.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { id: 'chic', label: '14" – 18"', title: 'Everyday Chic', desc: 'Collarbone to shoulder blade' },
                { id: 'glam', label: '20" – 24"', title: 'Signature Glam', desc: 'Mid-back statement fullness' },
                { id: 'empress', label: '26" – 32"', title: 'Empress Length', desc: 'Waist-grazing luxury raw hair' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectLength(opt.id)}
                  className="p-4 rounded-xl text-left bg-[#1a0b10] border border-[#2d121b] hover:border-[#d4af37] hover:bg-[#250f17] transition-all cursor-pointer group"
                >
                  <span className="text-base font-bold font-mono-tabular text-[#d4af37] block">
                    {opt.label}
                  </span>
                  <span className="text-xs font-semibold text-[#f5ede3] block mt-1">
                    {opt.title}
                  </span>
                  <span className="text-[11px] text-[#9a898d] block mt-0.5">{opt.desc}</span>
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-[#a59599] hover:text-[#d4af37] transition-colors"
              >
                ← Back to Texture
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Lace System */}
        {step === 3 && (
          <div className="space-y-4 my-6 relative z-10">
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-medium">
              How do you like to install your hair?
            </h3>
            <p className="text-xs text-[#c4b5b8]">
              Choose the lace type that matches your styling lifestyle.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { id: 'hd_swiss', label: '0.04mm HD Lace', desc: 'Melts undetectable into any melanin shade' },
                { id: 'frontal_13x6', label: '13x6 Ear-to-Ear', desc: 'Maximum parting space & high ponytails' },
                { id: 'glueless_strap', label: 'Piano Elastic Band', desc: '100% glueless, beginner-friendly wear' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectLace(opt.id)}
                  className="p-4 rounded-xl text-left bg-[#1a0b10] border border-[#2d121b] hover:border-[#d4af37] hover:bg-[#250f17] transition-all cursor-pointer group"
                >
                  <span className="text-xs font-bold text-[#f5ede3] group-hover:text-[#d4af37] block">
                    {opt.label}
                  </span>
                  <span className="text-[11px] text-[#9a898d] block mt-1.5">{opt.desc}</span>
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-[#a59599] hover:text-[#d4af37] transition-colors"
              >
                ← Back to Length
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div className="space-y-5 my-4 relative z-10">
            <div className="text-center max-w-md mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#f3e5ab] text-[11px] font-bold tracking-wider uppercase mb-2">
                <Check className="w-3 h-3 text-[#d4af37]" />
                Your Tailored Match
              </span>
              <h3 className="text-2xl font-serif-luxury font-medium text-[#f5ede3]">
                {matchedProduct.name}
              </h3>
              <p className="text-xs text-[#c4b5b8] mt-1">{matchedProduct.tagline}</p>
            </div>

            {/* Matched Product Card Preview */}
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-[#1b0b11] border border-[#3b1722]">
              <div className="w-24 h-28 rounded-lg overflow-hidden shrink-0 border border-[#2b1016]">
                <img
                  src={matchedProduct.image}
                  alt={matchedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[11px] text-[#d4af37] font-semibold uppercase tracking-wider block">
                  {matchedProduct.donorOrigin}
                </span>
                <h4 className="text-sm font-bold text-[#f5ede3] mt-0.5">{matchedProduct.name}</h4>
                <p className="text-xs text-[#a59599] line-clamp-2 mt-1">
                  {matchedProduct.description}
                </p>
                <div className="mt-2 text-xs font-mono-tabular font-bold text-[#f3e5ab]">
                  Base Price: ₦{matchedProduct.basePriceNGN.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenCustomizerWithProduct(matchedProduct);
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b88c22] hover:from-[#e5c158] hover:to-[#c89924] text-[#12070a] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Customize This Unit</span>
              </button>

              <button
                onClick={handleWhatsAppConsultation}
                className="w-full py-3 px-4 rounded-xl bg-[#1f0b12] hover:bg-[#2d101a] border border-[#25d366]/50 text-[#f5ede3] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer hover:border-[#25d366]"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Confirm on WhatsApp</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={handleReset}
                className="text-xs text-[#a59599] hover:text-[#d4af37] transition-colors inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
