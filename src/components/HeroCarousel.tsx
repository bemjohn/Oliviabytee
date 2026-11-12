import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: number;
  titlePart1: string;
  titleItalic: string;
  image: string;
  primaryActionLabel: string;
}

interface HeroCarouselProps {
  onShopCollection: () => void;
  onOpenCustomizer: () => void;
  slides?: HeroSlide[];
}

const SLIDES: HeroSlide[] = [
  {
    id: 1,
    titlePart1: 'Buy once.',
    titleItalic: 'Wear forever.',
    image: '/assets/images/hero_right_straight_1793716394170.jpg',
    primaryActionLabel: 'SHOP NOW',
  },
  {
    id: 2,
    titlePart1: 'Waves that',
    titleItalic: 'last forever.',
    image: '/assets/images/hero_right_bodywave_1793716394579.jpg',
    primaryActionLabel: 'SHOP WAVES',
  },
  {
    id: 3,
    titlePart1: 'Pure coils.',
    titleItalic: 'Seamless blend.',
    image: '/assets/images/hero_right_curly_1793716394156.jpg',
    primaryActionLabel: 'SHOP COILS',
  },
  {
    id: 4,
    titlePart1: 'Invisible lace.',
    titleItalic: 'Melted finish.',
    image: '/assets/images/hd_lace_frontal_1793713503183.jpg',
    primaryActionLabel: 'SHOP FRONTALS',
  },
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onShopCollection,
  onOpenCustomizer,
  slides,
}) => {
  const activeSlides = slides && slides.length > 0 ? slides : SLIDES;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused, activeSlides.length]);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      nextSlide();
    } else if (distance < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = activeSlides[currentSlideIndex] || activeSlides[0];

  return (
    <section
      className="relative w-full min-h-[540px] sm:min-h-[660px] lg:min-h-[760px] bg-[#0b0608] flex items-center overflow-hidden border-b border-[#200d14]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full-Bleed Background Media */}
      {activeSlides.map((slide, index) => {
        const isActive = index === currentSlideIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Slide Background Image with Silky Slow Cinematic Zoom */}
            <img
              key={`${slide.id}-${isActive ? 'active' : 'inactive'}`}
              src={slide.image}
              alt={slide.titlePart1}
              className={`w-full h-full object-cover object-right sm:object-right ${
                isActive ? 'animate-kenburns' : 'scale-100'
              }`}
              referrerPolicy="no-referrer"
            />

            {/* Left Edge Soft Scrim ensuring high text contrast while keeping model visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0608] via-[#0b0608]/85 via-35% lg:via-45% to-transparent pointer-events-none" />

            {/* Mobile bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0608] via-[#0b0608]/80 via-50% to-transparent sm:hidden pointer-events-none" />
          </div>
        );
      })}

      {/* Floating Left Arrow: Hidden on mobile, shown on tablet/desktop */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="hidden sm:flex absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 hover:border-white/30 text-white/80 hover:text-white items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg group"
      >
        <ChevronLeft className="w-5 h-5 text-stone-300 group-hover:text-white group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Floating Right Arrow: Hidden on mobile, shown on tablet/desktop */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="hidden sm:flex absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 hover:border-white/30 text-white/80 hover:text-white items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg group"
      >
        <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Left-Aligned Foreground Content: Balanced px-5 on mobile, generous padding on desktop */}
      <div className="relative z-20 mx-auto max-w-7xl px-5 sm:px-16 md:px-24 lg:px-28 py-14 sm:py-20 lg:py-24 w-full flex items-center">
        <div className="w-full sm:max-w-md lg:max-w-xl">
          
          {/* Keyed slide content prevents overlapping or ghosting */}
          <div key={currentSlide.id} className="transition-all duration-500 ease-out animate-fade-in">
            
            {/* Catchy 3-4 Word Editorial Headline aligned smoothly on mobile & desktop */}
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-sans font-medium text-white leading-[1.12] sm:leading-[1.08] mb-6 sm:mb-8 tracking-tight drop-shadow-xl">
              {currentSlide.titlePart1}{' '}
              <span className="italic font-serif text-[#f3e5ab] font-normal">
                {currentSlide.titleItalic}
              </span>
            </h1>

            {/* Action Buttons styled cleanly for mobile & desktop */}
            <div className="flex flex-row flex-wrap items-center gap-3">
              <button
                onClick={onShopCollection}
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#966f2c] hover:bg-[#ad8339] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-xl shadow-[#966f2c]/30 hover:scale-[1.02] cursor-pointer flex items-center justify-center"
              >
                <span>{currentSlide.primaryActionLabel}</span>
              </button>

              <button
                onClick={onOpenCustomizer}
                className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-black/40 hover:bg-black/60 text-stone-300 hover:text-white border border-white/10 font-semibold text-xs tracking-wider uppercase backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center"
              >
                <span>Bespoke Studio</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Slide Progress Indicator Bar & Dots Centered at Bottom: Visible on all devices */}
      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {activeSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlideIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 cursor-pointer ${
              index === currentSlideIndex
                ? 'w-6 h-1 bg-[#d4af37] rounded-full'
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70 rounded-full'
            }`}
          />
        ))}
      </div>

    </section>
  );
};
