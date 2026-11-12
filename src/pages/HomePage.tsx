import React, { useState } from 'react';
import { HeroCarousel } from '../components/HeroCarousel';
import { PressAndCategoriesSection, CategoryItem } from '../components/PressAndCategoriesSection';
import { ProductCard } from '../components/ProductCard';
import { StylistAndQuizBanner } from '../components/StylistAndQuizBanner';
import { HairQuizModal } from '../components/HairQuizModal';
import { BrandPromiseSection } from '../components/BrandPromiseSection';
import { Product, Currency } from '../types/store';
import { getWhatsAppUrl } from '../config/brand';
import { ArrowRight } from 'lucide-react';

interface HomePageProps {
  products: Product[];
  currency: Currency;
  onNavigatePage: (page: string, categoryFilter?: string) => void;
  onOpenCustomizerWithProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  heroSlides?: any[];
  categories?: any[];
  brandImages?: any[];
  workshopImage?: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  currency,
  onNavigatePage,
  onOpenCustomizerWithProduct,
  onQuickAdd,
  heroSlides,
  categories,
  brandImages,
  workshopImage,
}) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Featured 4 client flagship wigs for the home page
  const featuredWigs = products.filter((p) => p.isCustomizableWig).slice(0, 4);

  const handleCategoryClick = (category: CategoryItem) => {
    if (category.targetCategory) {
      onNavigatePage('shop', category.targetCategory);
    } else {
      onNavigatePage('shop');
    }
  };


  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-20">
      
      {/* 1. Grand Full-Bleed Editorial Hero Carousel */}
      <HeroCarousel
        slides={heroSlides}
        onShopCollection={() => onNavigatePage('shop')}
        onOpenCustomizer={() => onNavigatePage('customizer')}
      />

      {/* 2. Moving Circular Pictures & 6 Rectangular Category Cards */}
      <PressAndCategoriesSection
        categories={categories}
        onSelectCategory={handleCategoryClick}
        onViewAllCategories={() => onNavigatePage('shop')}
        onSelectHighlight={(item) => {
          if (item.targetCategory) {
            onNavigatePage('shop', item.targetCategory);
          } else {
            onNavigatePage('shop');
          }
        }}
      />

      {/* 3. Curated Flagship Selection */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#200d14]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#f5ede3]">
              Curated Raw Hair Units
            </h2>
          </div>

          <button
            onClick={() => onNavigatePage('shop')}
            className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:text-[#f3e5ab] transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>Shop All Creations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Column Featured Grid for Client Units */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredWigs.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              onOpenCustomizer={onOpenCustomizerWithProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </section>

      {/* 4. "TEXT A STYLIST" & "TAKE OUR QUIZ" Split Editorial Banner (Below Curated Units) */}
      <StylistAndQuizBanner onOpenQuiz={() => setIsQuizOpen(true)} />

      {/* 5. "THE OLIVIABYTEE PROMISE" Section with 4-Quadrant Visual Collage */}
      <BrandPromiseSection
        brandImages={brandImages}
        onLearnMore={() => onNavigatePage('provenance')}
      />

      {/* 6. Bespoke Studio Editorial Workshop Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[430px] flex flex-col justify-end p-8 sm:p-12 lg:p-16 border border-[#3b1722]/80 shadow-2xl group">
          {/* Workshop Photographic Background */}
          <img
            src={workshopImage || "/assets/images/handcrafted_workshop_bg_1793994739332.jpg"}
            alt="Master Handcrafted Raw Hair Units"
            className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-105"
          />

          {/* Cinematic Dark Gradient Overlays for optimal contrast and text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0507]/95 via-[#0b0507]/80 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0507]/90 via-[#0b0507]/30 to-black/30 pointer-events-none" />

          {/* Content Block Aligned Bottom-Left */}
          <div className="relative z-10 max-w-lg">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#f5ede3] mb-3 tracking-tight">
              Finished by hand.
            </h3>
            <p className="text-xs sm:text-sm text-[#d4c3c6] leading-relaxed mb-6 font-sans max-w-md">
              Every unit is tailored to your exact measurements — from raw single-donor bundles to your perfect length, density, and invisible lace.
            </p>
            <div>
              <button
                onClick={() => onNavigatePage('customizer')}
                className="px-8 py-3.5 rounded-full bg-[#ecd5a0] hover:bg-[#e2c589] text-[#12070a] font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-black/50 cursor-pointer inline-flex items-center justify-center active:scale-95"
              >
                <span>Launch Bespoke Studio</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Start Your Luxury Hair Journey Editorial Section in Signature Brand Colors */}
      <section className="relative w-full bg-gradient-to-b from-[#14060a] via-[#0d0508] to-[#080305] text-[#f5ede3] py-16 sm:py-24 border-y border-[#261016] overflow-hidden">
        {/* Subtle ambient luxury gold/wine glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3d1521]/30 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-medium text-[#f5ede3] tracking-tight uppercase mb-6 leading-tight">
            Start Your Luxury Hair Journey Today
          </h2>
          
          <p className="text-sm sm:text-base text-[#e5d8db] leading-relaxed mb-4 max-w-2xl mx-auto font-sans-luxury">
            Experience the confidence that comes from a handcrafted raw hair unit designed specifically for you.
          </p>
          
          <p className="text-xs sm:text-sm text-[#a59599] leading-relaxed mb-10 max-w-2xl mx-auto font-sans">
            Whether you&apos;re located in Lagos, London, Dubai, New York, or anywhere around the world, Oliviabytee provides personalized consultations, master single-donor craftsmanship, and luxury hair solutions tailored to your unique style.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigatePage('shop')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b88c22] hover:from-[#e5c158] hover:to-[#c89924] text-[#12070a] font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#d4af37]/20 active:scale-95 cursor-pointer"
            >
              Shop Raw Hair Wigs
            </button>
            <a
              href={getWhatsAppUrl(
                'Hello Oliviabytee, I would like to book a private luxury hair consultation'
              )}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#180a0e]/90 hover:bg-[#261017] text-[#f5ede3] hover:text-[#d4af37] border border-[#d4af37]/40 hover:border-[#d4af37] font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-black/60 active:scale-95 text-center"
            >
              Book a Private Consultation
            </a>
          </div>
        </div>
      </section>


      {/* Interactive Hair Quiz Modal */}
      <HairQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={products}
        onOpenCustomizerWithProduct={onOpenCustomizerWithProduct}
        onNavigateToShop={(filter) => onNavigatePage('shop', filter)}
      />

    </div>
  );
};


