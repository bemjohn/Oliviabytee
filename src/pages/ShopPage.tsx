import React, { useState, useEffect } from 'react';
import { Product, Currency } from '../types/store';
import { ProductCard } from '../components/ProductCard';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { getWhatsAppUrl } from '../config/brand';
import { SlidersHorizontal, Search, Filter, MessageCircle, ArrowRight } from 'lucide-react';

const SHOP_CATEGORIES = [
  { id: 'all', label: 'All Creations' },
  { id: 'bone-straight', label: 'Bone Straight' },
  { id: 'hair-donor', label: 'Hair Donor' },
  { id: 'virgin-hair', label: 'Virgin Hair' },
  { id: 'wig-dq', label: 'Wig DQ' },
  { id: 'glueless-wigs', label: 'Glueless Wigs' },
  { id: 'coils', label: 'Coils' },
  { id: 'wigs', label: 'Raw Hair Wigs' },
  { id: 'frontals', label: 'HD Swiss Frontals' },
  { id: 'bundles', label: 'Raw Bundles' },
  { id: 'care', label: 'Hair Care & Elixirs' },
];

function productMatchesCategory(product: Product, categoryId: string): boolean {
  if (categoryId === 'all') return true;
  if (categoryId === 'bone-straight') {
    return (
      product.texture.toLowerCase().includes('straight') ||
      product.name.toLowerCase().includes('straight')
    );
  }
  if (categoryId === 'hair-donor') {
    return (
      product.donorOrigin.toLowerCase().includes('donor') ||
      product.name.toLowerCase().includes('donor')
    );
  }
  if (categoryId === 'virgin-hair') {
    return (
      product.donorOrigin.toLowerCase().includes('virgin') ||
      product.description.toLowerCase().includes('virgin') ||
      product.category === 'bundles' ||
      product.category === 'wigs'
    );
  }
  if (categoryId === 'wig-dq') {
    return (
      product.isCustomizableWig ||
      product.texture.toLowerCase().includes('drawn') ||
      (product.badge ? product.badge.toLowerCase().includes('signature') : false)
    );
  }
  if (categoryId === 'glueless-wigs') {
    return (
      product.name.toLowerCase().includes('glueless') ||
      product.tagline.toLowerCase().includes('glueless') ||
      product.description.toLowerCase().includes('glueless') ||
      product.texture.toLowerCase().includes('glueless') ||
      product.isCustomizableWig
    );
  }
  if (categoryId === 'coils') {
    return (
      product.texture.toLowerCase().includes('curly') ||
      product.texture.toLowerCase().includes('coils') ||
      product.texture.toLowerCase().includes('coily') ||
      product.texture.toLowerCase().includes('kinky') ||
      product.name.toLowerCase().includes('curly') ||
      product.name.toLowerCase().includes('coils') ||
      product.name.toLowerCase().includes('kinky') ||
      product.description.toLowerCase().includes('coils')
    );
  }
  return product.category === categoryId;
}

interface ShopPageProps {
  products: Product[];
  currency: Currency;
  onOpenCustomizer: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onOpenGlobalCustomizer: () => void;
  initialCategory?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  currency,
  onOpenCustomizer,
  onQuickAdd,
  onOpenGlobalCustomizer,
  initialCategory = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Only render collection filters that have at least one matching piece.
  // This prevents empty collections such as Coils from becoming dead ends.
  const availableCategories = SHOP_CATEGORIES.filter(
    (category) =>
      category.id === 'all' || products.some((p) => productMatchesCategory(p, category.id))
  );

  const effectiveCategory =
    selectedCategory === 'all' ||
    availableCategories.some((category) => category.id === selectedCategory)
      ? selectedCategory
      : 'all';

  // Filter products by category/collection and search
  const filteredProducts = products.filter((p) => {
    const matchesCategory = productMatchesCategory(p, effectiveCategory);
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.texture.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.donorOrigin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.basePriceNGN - b.basePriceNGN;
    if (sortBy === 'price-desc') return b.basePriceNGN - a.basePriceNGN;
    return 0; // 'featured' keeps original catalog order
  });

  return (
    <div className="py-10 sm:py-16 bg-[#0b0608] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Luxury Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#d4af37] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 block">
            OLIVIABYTEE SIGNATURE COLLECTION
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury text-[#f5ede3] font-medium tracking-tight">
            The Oliviabytee Shop
          </h1>
          <p className="text-xs sm:text-sm text-[#b5a5a8] mt-3 font-sans-luxury leading-relaxed max-w-xl mx-auto">
            100% single-donor raw hair units, Cambodian waves, invisible 0.04mm HD Swiss lace frontals, and handcrafted bundles finished by hand in our bespoke atelier.
          </p>
        </div>

        {/* Filter, Search & Sort Bar */}
        <div className="bg-[#14080c] border border-[#2b1218] rounded-2xl p-4 sm:p-5 mb-10 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Filter Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {availableCategories.map((cat) => {
              const isActive = effectiveCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#d4af37] text-[#12070a] font-bold shadow-md shadow-[#d4af37]/20'
                      : 'text-[#c4b5b8] hover:text-white bg-[#1c0b11] border border-[#30161d]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 text-[#a59599] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search texture, origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#1c0b11] border border-[#30161d] text-xs text-[#f5ede3] placeholder-[#7d6c70] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-lg bg-[#1c0b11] border border-[#30161d] text-xs text-[#d1c4c7] focus:outline-none focus:border-[#d4af37] cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Product Count & Active Filters Indicator */}
        <div className="flex items-center justify-between text-xs text-[#a59599] mb-6 px-1">
          <span>
            Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'piece' : 'pieces'}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#d4af37] hover:underline"
            >
              Clear search "{searchQuery}"
            </button>
          )}
        </div>

        {/* 3-Column Luxury Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                onOpenCustomizer={onOpenCustomizer}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#14080c] rounded-2xl border border-[#2b1218]">
            <p className="text-sm text-[#b5a5a8] mb-3">No creations found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-full bg-[#d4af37] text-[#12070a] text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Custom Wig Banner Callout */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#1c0b11] via-[#240e16] to-[#16080d] border border-[#d4af37]/35 p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold text-[#d4af37] tracking-[0.25em] uppercase block mb-1.5">
              BESPOKE STUDIO SERVICE
            </span>
            <h3 className="text-xl sm:text-2xl font-serif-luxury text-[#f5ede3] mb-2">
              Need a Custom Density or Specialized Length?
            </h3>
            <p className="text-xs sm:text-sm text-[#c4b5b8] font-sans-luxury leading-relaxed">
              Open our interactive Bespoke Studio to choose custom length (14"–32"), 300% double-drawn volume, and personalized cap sizing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenGlobalCustomizer}
              className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b88c22] hover:from-[#e5c158] hover:to-[#c89924] text-[#12070a] font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#d4af37]/25 flex items-center gap-2 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 stroke-[2.5]" />
              <span>Launch Studio</span>
            </button>

            <a
              href={getWhatsAppUrl(
                'Hello Oliviabytee, I need a consultation for a custom wig unit'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-lg bg-[#180a0e] hover:bg-[#200d14] text-[#25D366] border border-[#25D366]/40 font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
