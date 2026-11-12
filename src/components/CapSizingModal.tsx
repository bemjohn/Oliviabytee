import React from 'react';
import { X, Ruler, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getWhatsAppUrl } from '../config/brand';

interface CapSizingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CapSizingModal: React.FC<CapSizingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0f0508] border border-[#3b1722] rounded-3xl shadow-2xl overflow-hidden text-[#f5ede3]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#260e16] bg-[#16080d]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#260e16] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif-luxury font-medium text-[#f5ede3] flex items-center gap-2">
                <span>Oliviabytee Cap Measurement & Fitting Guide</span>
              </h3>
              <p className="text-xs text-[#a59599]">
                Find your exact tailored cap size for a secure, comfortable, and glueless fit.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Cap Sizing Guide"
            className="w-8 h-8 rounded-full bg-[#200d14] hover:bg-[#30161d] text-[#c4b5b8] hover:text-[#f5ede3] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh] space-y-6">
          
          {/* Sizing Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Small */}
            <div className="p-4 rounded-2xl bg-[#14080c] border border-[#2e131b] hover:border-[#d4af37]/40 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] block mb-1">
                Size S (Petite)
              </span>
              <h4 className="text-lg font-bold text-[#f5ede3] font-serif-luxury mb-1">
                21.5 inches
              </h4>
              <p className="text-xs text-[#8e7f83] leading-relaxed mb-3">
                Ideal for petite head sizes or sleek cornrow foundations with minimal bulk.
              </p>
              <ul className="text-[11px] text-[#c4b5b8] space-y-1">
                <li>• Front-to-Nape: 13.5"</li>
                <li>• Ear-to-Ear: 11.5"</li>
              </ul>
            </div>

            {/* Medium (Most Common) */}
            <div className="p-4 rounded-2xl bg-[#1c0c12] border border-[#d4af37]/50 relative shadow-lg shadow-[#d4af37]/10">
              <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-[#d4af37] text-[#0f0508] text-[9px] font-bold uppercase tracking-wider">
                Most Popular (92%)
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] block mb-1">
                Size M (Standard)
              </span>
              <h4 className="text-lg font-bold text-[#f3e5ab] font-serif-luxury mb-1">
                22.5 inches
              </h4>
              <p className="text-xs text-[#d4c3c6] leading-relaxed mb-3">
                Fits 9 out of 10 clients comfortably. Features our adjustable luxury elastic band.
              </p>
              <ul className="text-[11px] text-[#e8dadc] space-y-1">
                <li>• Front-to-Nape: 14.5"</li>
                <li>• Ear-to-Ear: 12.5"</li>
              </ul>
            </div>

            {/* Large */}
            <div className="p-4 rounded-2xl bg-[#14080c] border border-[#2e131b] hover:border-[#d4af37]/40 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] block mb-1">
                Size L (Comfort)
              </span>
              <h4 className="text-lg font-bold text-[#f5ede3] font-serif-luxury mb-1">
                23.5 inches
              </h4>
              <p className="text-xs text-[#8e7f83] leading-relaxed mb-3">
                Designed for fuller natural hair, thick braids underneath, or larger crown contours.
              </p>
              <ul className="text-[11px] text-[#c4b5b8] space-y-1">
                <li>• Front-to-Nape: 15.5"</li>
                <li>• Ear-to-Ear: 13.0"</li>
              </ul>
            </div>

          </div>

          {/* 3 Steps to Measure at Home */}
          <div className="p-5 rounded-2xl bg-[#14080c] border border-[#2d1219] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>How to Measure in 3 Easy Steps</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#a59599]">
              <div className="space-y-1">
                <span className="font-bold text-[#f5ede3] block">1. Head Circumference</span>
                <p className="text-[11px] leading-relaxed">
                  Wrap a flexible tape measure around the perimeter of your hairline, starting at the center of your forehead, passing behind the ears, and around the nape.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[#f5ede3] block">2. Front to Nape</span>
                <p className="text-[11px] leading-relaxed">
                  Place the tape measure at the center of your front hairline and measure straight over the crown down to the center nape of your neck.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[#f5ede3] block">3. Ear to Ear</span>
                <p className="text-[11px] leading-relaxed">
                  Measure from the top of one ear over the crown of your head to the top of your opposite ear.
                </p>
              </div>
            </div>
          </div>

          {/* Custom Fitting Assurance */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#180a0e] to-[#200d14] border border-[#d4af37]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#c4b5b8] space-y-0.5">
              <span className="font-semibold text-[#f5ede3] block">Need help with custom measurements?</span>
              <p className="text-[11px] text-[#8e7f83]">
                Our master wigmaker will guide you through taking your measurements via WhatsApp video or photos.
              </p>
            </div>

            <a
              href={getWhatsAppUrl(
                'Hello Oliviabytee, I would like assistance confirming my exact wig cap size'
              )}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-[#25D366]/20"
            >
              <WhatsAppIcon className="w-4 h-4 text-black" />
              <span>Ask a Stylist</span>
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#14080c] border-t border-[#260e16] flex items-center justify-between text-xs text-[#8e7f83]">
          <span className="flex items-center gap-1.5 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>All Oliviabytee wigs include adjustable inner elastic security bands</span>
          </span>
          <button
            onClick={onClose}
            className="hover:text-white transition-colors cursor-pointer text-xs font-semibold"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
