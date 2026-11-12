import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '../config/brand';

interface StylistAndQuizBannerProps {
  onOpenQuiz: () => void;
}

export const StylistAndQuizBanner: React.FC<StylistAndQuizBannerProps> = ({ onOpenQuiz }) => {
  const whatsappUrl = getWhatsAppUrl(
    'Hello Oliviabytee Stylist! I need help with hair texture matching, cap sizing, lace tint, and custom styling.'
  );

  return (
    <section className="w-full bg-[#0b0608] py-8 sm:py-12 border-y border-[#200d14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Split 2-Column Luxury Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          
          {/* LEFT PANEL: TEXT A STYLIST */}
          <div className="relative rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] flex flex-col justify-end p-8 sm:p-10 lg:p-12 border border-[#2e131b] group shadow-2xl transition-all duration-500 hover:border-[#d4af37]/50">
            {/* Background Image: High-Fashion Atelier Stylist in Tailored Suit */}
            <img
              src="/assets/images/hero_right_straight_1793716394170.jpg"
              alt="Oliviabytee Hair Stylist"
              className="absolute inset-0 w-full h-full object-cover object-top sm:object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Gradient Overlays for Perfect Contrast & Moody Champagne-Wine Vibe */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0507] via-[#0b0507]/75 to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0507]/90 via-[#18080d]/60 to-transparent pointer-events-none" />
            
            {/* Subtle Gold Edge Rim */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none" />

            {/* Content Area */}
            <div className="relative z-10 max-w-md">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#d4af37] tracking-[0.25em] uppercase mb-3">
                <MessageCircle className="w-3.5 h-3.5 text-[#25d366]" />
                <span>DIRECT CONCIERGE</span>
              </span>

              {/* Big Editorial Headline matching user reference layout */}
              <h3 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#f5ede3] leading-[0.95] tracking-tight mb-4">
                TEXT <span className="italic font-normal lowercase font-serif">a</span>
                <br />
                <span className="tracking-wide">STYLIST</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#d1c2c5] leading-relaxed mb-6 font-sans-luxury max-w-sm">
                Need help with texture matching, cap sizing, lace tinting, or bespoke unit styling?
              </p>

              {/* Chat Now Button -> Opens WhatsApp directly */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-none bg-[#f5ede3] hover:bg-[#d4af37] text-[#0b0507] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-black/50 hover:shadow-[#d4af37]/30 transform active:scale-95 cursor-pointer group/btn"
              >
                <span>CHAT NOW</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>

          {/* RIGHT PANEL: TAKE OUR QUIZ */}
          <div className="relative rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] flex flex-col justify-end p-8 sm:p-10 lg:p-12 border border-[#2e131b] group shadow-2xl transition-all duration-500 hover:border-[#d4af37]/50">
            {/* Background Image: Fingers holding raw hair & invisible HD lace on champagne silk */}
            <img
              src="/assets/images/hd_lace_frontal_1793713503183.jpg"
              alt="Luxury Hair Match"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Gradient Overlays for High-Contrast Luxury Feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0507] via-[#0b0507]/75 to-black/35 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0507]/90 via-[#18080d]/65 to-transparent pointer-events-none" />
            
            {/* Subtle Gold Edge Rim */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none" />

            {/* Content Area */}
            <div className="relative z-10 max-w-md">
              <span className="text-[11px] font-bold text-[#d4af37] tracking-[0.25em] uppercase mb-3 block">
                60-SECOND MATCH
              </span>

              {/* Big Editorial Headline matching user reference layout */}
              <h3 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#f5ede3] leading-[0.95] tracking-tight mb-4">
                TAKE
                <br />
                <span className="italic font-normal lowercase font-serif">our</span>{' '}
                <span className="tracking-wide">QUIZ</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#d1c2c5] leading-relaxed mb-6 font-sans-luxury max-w-sm">
                Want a quick match? Our 60-second quiz sorts out which raw hair texture, length, and lace cap is best for you.
              </p>

              {/* Get Matched Button -> Opens Interactive Hair Match Quiz */}
              <button
                onClick={onOpenQuiz}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-none bg-[#f5ede3] hover:bg-[#d4af37] text-[#0b0507] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-black/50 hover:shadow-[#d4af37]/30 transform active:scale-95 cursor-pointer group/btn"
              >
                <span>GET MATCHED</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
