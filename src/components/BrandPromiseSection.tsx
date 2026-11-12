import React from 'react';

interface BrandPromiseSectionProps {
  onLearnMore?: () => void;
  brandImages?: { id: string; title: string; image: string }[];
}

export const BrandPromiseSection: React.FC<BrandPromiseSectionProps> = ({
  onLearnMore,
  brandImages,
}) => {
  const img0 = (brandImages && brandImages[0]?.image) || '/assets/images/hero_body_wave_1793714596666.jpg';
  const img1 = (brandImages && brandImages[1]?.image) || '/assets/images/hd_lace_frontal_1793713503183.jpg';
  const img2 = (brandImages && brandImages[2]?.image) || '/assets/images/hero_right_bodywave_1793716394579.jpg';
  const img3 = (brandImages && brandImages[3]?.image) || '/assets/images/luxury_hair_elixir_1793713502926.jpg';

  return (
    <section className="w-full bg-[#0b0608] py-14 sm:py-20 border-b border-[#200d14] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT: 4-Quadrant Seamless Visual Collage (Images joined together with zero gap) */}
          <div className="lg:col-span-7 relative">
            
            {/* Seamless 2x2 Collage Container - Flush with NO GAPS */}
            <div className="relative rounded-2xl overflow-hidden border border-[#2e131b] shadow-2xl">
              <div className="grid grid-cols-2 grid-rows-2 gap-0">
                
                {/* 1. Top-Left: Raw Hair Waves & Cuticle Luster */}
                <div className="relative aspect-square overflow-hidden bg-[#160a0e] group">
                  <img
                    src={img0}
                    alt="Raw Hair Waves & Luster"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* 2. Top-Right: Hands Inspecting Invisible HD Swiss Lace */}
                <div className="relative aspect-square overflow-hidden bg-[#160a0e] group">
                  <img
                    src={img1}
                    alt="Invisible HD Swiss Lace on Silk"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* 3. Bottom-Left: Glowing High-Fashion Model Portrait */}
                <div className="relative aspect-square overflow-hidden bg-[#160a0e] group">
                  <img
                    src={img2}
                    alt="Oliviabytee Muse"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* 4. Bottom-Right: Pure Raw Hair Elixir / Water Luster */}
                <div className="relative aspect-square overflow-hidden bg-[#160a0e] group">
                  <img
                    src={img3}
                    alt="Botanical Hair Elixir"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

              </div>

              {/* Overlapping Circular Seal / Stamp - Centered at the 4-image intersection */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#f2ede4] text-[#12070a] shadow-2xl shadow-black/80 p-1.5 flex items-center justify-center border-2 border-[#d9cfbe] transform rotate-[-4deg]">
                  <div className="w-full h-full rounded-full border border-dashed border-[#a69882] flex flex-col items-center justify-center p-2 text-center bg-[#f7f3ec]">
                    <span className="text-[8px] sm:text-[9px] font-serif tracking-[0.25em] uppercase text-[#695d4b]">
                      ROOTED IN
                    </span>
                    <div className="my-0.5 flex items-center gap-1">
                      <span className="text-[#8c785c] text-[8px]">✦</span>
                      <span className="font-serif-luxury font-bold text-xs sm:text-sm tracking-tight text-[#16080d] uppercase leading-none">
                        OLIVIABYTEE
                      </span>
                      <span className="text-[#8c785c] text-[8px]">✦</span>
                    </div>
                    <span className="font-serif font-bold italic text-xs sm:text-sm text-[#735d40] tracking-wide -mt-0.5">
                      promise
                    </span>
                    <div className="w-8 h-px bg-[#b5a38a]/60 my-0.5" />
                    <span className="text-[7px] sm:text-[8px] font-serif tracking-[0.2em] uppercase text-[#695d4b]">
                      TRUST
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT: Minimal, High-Impact Editorial Story (Matching reference layout: No icons, simple text) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-4">
            
            {/* Title matching reference: "The Oliviabytee promise" */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-medium text-[#f5ede3] leading-[1.05] tracking-tight">
              The Oliviabytee <span className="font-serif italic font-normal text-[#f3e5ab]">promise</span>
            </h2>

            {/* Simple, Clean 2-Sentence Text (Exact style of reference) */}
            <p className="text-sm sm:text-base text-[#b5a5a8] leading-relaxed font-sans-luxury max-w-md">
              In a world of options, trust is everything. Discover the details that set Oliviabytee strands apart.
            </p>

            {/* Clean Minimal Button (No icons, solid dark styling like reference) */}
            <div className="pt-2">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#14080c] hover:bg-[#d4af37] text-[#f5ede3] hover:text-[#0b0507] border border-[#3b1722] hover:border-[#d4af37] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-black/60 transform active:scale-95 cursor-pointer"
              >
                THE OLIVIABYTEE DIFFERENCE
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
