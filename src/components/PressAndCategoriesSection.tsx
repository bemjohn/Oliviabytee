import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface CategoryItem {
  id: string;
  name: string;
  image: string;
  targetCategory?: string;
}

export interface CircularHighlight {
  id: string;
  title: string;
  image: string;
  targetCategory?: string;
}

interface PressAndCategoriesSectionProps {
  onSelectCategory?: (category: CategoryItem) => void;
  onSelectHighlight?: (highlight: CircularHighlight) => void;
  onViewAllCategories?: () => void;
  categories?: CategoryItem[];
}

// 1. Moving Circular Picture Highlights at the Top (Replaces moving text)
const CIRCULAR_HIGHLIGHTS: CircularHighlight[] = [
  {
    id: 'h-straight',
    title: 'Bone Straight',
    image: '/assets/products/client_quality_bone_straight.png',
    targetCategory: 'bone-straight',
  },
  {
    id: 'h-bodywave',
    title: 'Wig DQ Waves',
    image: '/assets/products/client_wig_dq_bodywave.png',
    targetCategory: 'wig-dq',
  },
  {
    id: 'h-short',
    title: 'Glueless Bob',
    image: '/assets/products/client_glueless_bob_4x4.png',
    targetCategory: 'glueless-wigs',
  },
  {
    id: 'h-color',
    title: 'Chestnut Brown',
    image: '/assets/products/client_chestnut_bone_straight.png',
    targetCategory: 'wigs',
  },
  {
    id: 'h-hdlace',
    title: '0.04mm HD Lace',
    image: '/assets/images/hd_lace_frontal_1793713503183.jpg',
    targetCategory: 'frontals',
  },
  {
    id: 'h-kinky',
    title: 'Heritage Coils',
    image: '/assets/images/hero_kinky_curly_1793714596835.jpg',
    targetCategory: 'wigs',
  },
  {
    id: 'h-bundles',
    title: 'Raw Bundles',
    image: '/assets/categories/cat_hair_extensions.jpg',
    targetCategory: 'bundles',
  },
];

// 2. The Collection Cards in Rectangular Frames (Expanded Grand Portrait Showcase)
const CATEGORIES: CategoryItem[] = [
  {
    id: 'bone-straight',
    name: 'Bone Straight',
    image: '/assets/products/client_quality_bone_straight.png',
    targetCategory: 'bone-straight',
  },
  {
    id: 'hair-donor',
    name: 'Chestnut Straight',
    image: '/assets/products/client_chestnut_bone_straight.png',
    targetCategory: 'wigs',
  },
  {
    id: 'virgin-hair',
    name: 'Virgin Hair',
    image: '/assets/images/virgin_raw_hair_1793882694919.jpg',
    targetCategory: 'virgin-hair',
  },
  {
    id: 'wig-dq',
    name: 'Wig DQ',
    image: '/assets/products/client_wig_dq_bodywave.png',
    targetCategory: 'wig-dq',
  },
  {
    id: 'glueless-wigs',
    name: 'Glueless Wigs',
    image: '/assets/products/client_glueless_bob_4x4.png',
    targetCategory: 'glueless-wigs',
  },
  {
    id: 'coils',
    name: 'Coils',
    image: '/assets/categories/collection_coils.jpg',
    targetCategory: 'coils',
  },
];

export const PressAndCategoriesSection: React.FC<PressAndCategoriesSectionProps> = ({
  onSelectCategory,
  onSelectHighlight,
  onViewAllCategories,
  categories,
}) => {
  const activeCategories = categories && categories.length > 0 ? categories : CATEGORIES;
  return (
    <section className="w-full bg-[#0b0608] border-b border-[#200d14] overflow-hidden pt-4 sm:pt-6 pb-14 sm:pb-20">
      
      {/* 1. Moving Circular Picture Ticker at the Top */}
      <div className="relative w-full py-4 sm:py-5 border-y border-[#200d14]/70 bg-[#12070a]/60 backdrop-blur-sm mb-8 sm:mb-12">
        {/* Soft edge gradient masks for smooth fade in/out */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#0b0608] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#0b0608] to-transparent z-10 pointer-events-none" />

        {/* Continuous moving circular pictures marquee from right to left */}
        <div className="overflow-hidden flex">
          <div className="animate-marquee flex items-center gap-6 sm:gap-9 px-6">
            {CIRCULAR_HIGHLIGHTS.map((item, i) => (
              <button
                key={`highlight-1-${i}`}
                onClick={() => onSelectHighlight?.(item)}
                className="flex flex-col items-center group cursor-pointer shrink-0 focus:outline-none transition-transform hover:scale-105 active:scale-95"
              >
                {/* Tiny picture in a circular frame with champagne gold border */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#8a6528] via-[#d4af37] to-[#f3e5ab] shadow-md shadow-[#d4af37]/20 group-hover:shadow-xl group-hover:shadow-[#d4af37]/40 transition-all duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#160a0e] relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/30 pointer-events-none" />
                  </div>
                </div>
                <span className="mt-1.5 text-[11px] sm:text-xs font-medium tracking-wide text-[#c4b5b8] group-hover:text-[#d4af37] transition-colors whitespace-nowrap text-center">
                  {item.title}
                </span>
              </button>
            ))}

            {/* Duplicated for smooth infinite loop */}
            {CIRCULAR_HIGHLIGHTS.map((item, i) => (
              <button
                key={`highlight-2-${i}`}
                onClick={() => onSelectHighlight?.(item)}
                className="flex flex-col items-center group cursor-pointer shrink-0 focus:outline-none transition-transform hover:scale-105 active:scale-95"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#8a6528] via-[#d4af37] to-[#f3e5ab] shadow-md shadow-[#d4af37]/20 group-hover:shadow-xl group-hover:shadow-[#d4af37]/40 transition-all duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#160a0e] relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/30 pointer-events-none" />
                  </div>
                </div>
                <span className="mt-1.5 text-[11px] sm:text-xs font-medium tracking-wide text-[#c4b5b8] group-hover:text-[#d4af37] transition-colors whitespace-nowrap text-center">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Grand Editorial Collection Showcase - 3-Column Grid Extending Downwards with Extra-Wide & Tall Portrait Pictures */}
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Header: Signature Collections */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-[#200d14]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#f5ede3]">
              Signature Collections
            </h2>
          </div>

          <button
            onClick={onViewAllCategories}
            className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:text-[#f3e5ab] transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Grand 3-column layout (2 rows of 3 on desktop) for maximum scale and presence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {activeCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory?.(cat)}
              className="flex flex-col items-center group cursor-pointer text-left w-full focus:outline-none"
            >
              {/* Grand Rectangular Card Frame - Substantially wider and longer (aspect-[3/4]) */}
              <div className="relative w-full aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#14080c] border border-[#2d141b] group-hover:border-[#d4af37]/75 shadow-2xl shadow-black/90 group-hover:shadow-[#d4af37]/25 transition-all duration-500 group-hover:-translate-y-2">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Subtle soft gradient scrim on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Bold Category Name Underneath */}
              <span className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl font-sans font-bold tracking-[0.16em] uppercase text-[#f5ede3] group-hover:text-[#d4af37] transition-colors text-center block w-full drop-shadow">
                {cat.name}
              </span>
            </button>
          ))}
        </div>

      </div>

    </section>
  );
};
