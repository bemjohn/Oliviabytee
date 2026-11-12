import React, { useState, useRef } from 'react';
import { ShoppingBag, Menu, X, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  cartCount: number;
  onOpenCart: () => void;
  onNavigatePage: (page: string, categoryFilter?: string) => void;
}

const COLLECTION_ITEMS = [
  { id: 'bone-straight', label: 'Bone Straight' },
  { id: 'hair-donor', label: 'Hair Donor' },
  { id: 'virgin-hair', label: 'Virgin Hair' },
  { id: 'wig-dq', label: 'Wig DQ' },
  { id: 'glueless-wigs', label: 'Glueless Wigs' },
  { id: 'coils', label: 'Coils' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  cartCount,
  onOpenCart,
  onNavigatePage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavClick = (page: string, filter?: string) => {
    onNavigatePage(page, filter);
    setMobileMenuOpen(false);
    setCollectionsDropdownOpen(false);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setCollectionsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setCollectionsDropdownOpen(false);
    }, 200);
  };

  const handleCollectionSelect = (filterId: string) => {
    handleNavClick('shop', filterId);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0608]/90 backdrop-blur-md border-b border-[#200d14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Wordmark & Emblem */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] rounded-lg cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#d4af37]/50 shadow-inner bg-[#150a0d] shrink-0 p-0.5">
              <img
                src="/assets/aistudio/image_5dc1b8ec.png"
                alt="Oliviabytee"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-serif-luxury text-lg tracking-[0.15em] font-semibold text-[#f5ede3] group-hover:text-[#d4af37] transition-colors whitespace-nowrap block">
                OLIVIABYTEE
              </span>
              <span className="text-[10px] text-[#d4af37] tracking-[0.2em] italic block -mt-0.5">
                ...Beauty In Every Strand
              </span>
            </div>
          </button>

          {/* Centered Capsule Nav: Home, Collections (with dropdown), Shop, Bespoke Studio */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#180a0e]/90 border border-[#2e141b] backdrop-blur-md shadow-inner">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-4 lg:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activePage === 'home'
                  ? 'bg-[#d4af37] text-[#12070a] shadow-md shadow-[#d4af37]/25'
                  : 'text-[#c4b5b8] hover:text-[#f3e5ab] hover:bg-[#200d14]'
              }`}
            >
              Home
            </button>

            {/* Collections with Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setCollectionsDropdownOpen((prev) => !prev)}
                className={`px-4 lg:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  collectionsDropdownOpen
                    ? 'text-[#f3e5ab] bg-[#200d14]'
                    : 'text-[#c4b5b8] hover:text-[#f3e5ab] hover:bg-[#200d14]'
                }`}
                aria-expanded={collectionsDropdownOpen}
              >
                <span>Collections</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    collectionsDropdownOpen ? 'rotate-180 text-[#d4af37]' : ''
                  }`}
                />
              </button>

              {/* Collections Dropdown Panel */}
              {collectionsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 rounded-2xl bg-[#14080c]/98 border border-[#30161d] backdrop-blur-2xl shadow-2xl p-1.5 z-50 flex flex-col gap-1 ring-1 ring-[#d4af37]/25 animate-fade-in">
                  {COLLECTION_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleCollectionSelect(item.id)}
                      className="w-full px-4 py-2.5 rounded-xl text-left text-xs font-medium text-[#f5ede3] hover:text-[#12070a] hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#ba8d1d] hover:font-bold transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <span>{item.label}</span>
                      <span className="text-[10px] text-[#d4af37] group-hover:text-[#12070a] opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('shop')}
              className={`px-4 lg:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activePage === 'shop'
                  ? 'bg-[#d4af37] text-[#12070a] shadow-md shadow-[#d4af37]/25'
                  : 'text-[#c4b5b8] hover:text-[#f3e5ab] hover:bg-[#200d14]'
              }`}
            >
              Shop
            </button>

            <button
              onClick={() => handleNavClick('customizer')}
              className={`px-4 lg:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activePage === 'customizer'
                  ? 'bg-[#d4af37] text-[#12070a] shadow-md shadow-[#d4af37]/25'
                  : 'text-[#c4b5b8] hover:text-[#f3e5ab] hover:bg-[#200d14]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Bespoke Studio</span>
            </button>
          </nav>

          {/* Right Action: Cart Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#ba8d1d] hover:from-[#e5c158] hover:to-[#c89924] text-[#12070a] font-semibold text-xs tracking-wider transition-all transform active:scale-95 shadow-md shadow-[#d4af37]/20 cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
              <span className="hidden sm:inline">CART</span>
              <span className="w-5 h-5 rounded-full bg-[#12070a] text-[#f3e5ab] text-[11px] font-mono-tabular font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-[#180a0e] border border-[#2e141b] text-[#f5ede3] hover:text-[#d4af37] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu with Expandable Collections */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-3 rounded-2xl bg-[#14080c] border border-[#2e141b] shadow-2xl flex flex-col gap-1.5 animate-fade-in">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full py-2.5 px-4 rounded-xl text-left text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activePage === 'home'
                  ? 'bg-[#d4af37] text-[#12070a]'
                  : 'text-[#c4b5b8] hover:bg-[#1f0c13]'
              }`}
            >
              Home
            </button>

            {/* Mobile Collections Expandable */}
            <div className="rounded-xl border border-[#261016] bg-[#100508]/60 overflow-hidden">
              <button
                onClick={() => setMobileCollectionsOpen((prev) => !prev)}
                className="w-full py-2.5 px-4 text-left text-xs font-semibold uppercase tracking-wider text-[#f5ede3] flex items-center justify-between cursor-pointer"
              >
                <span>Collections</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#d4af37] transition-transform duration-200 ${
                    mobileCollectionsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileCollectionsOpen && (
                <div className="px-2 pb-2 pt-1 flex flex-col gap-1 border-t border-[#261016] bg-[#14080c]">
                  {COLLECTION_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleCollectionSelect(item.id)}
                      className="w-full py-2 px-3 rounded-lg text-left text-xs text-[#c4b5b8] hover:text-[#12070a] hover:bg-[#d4af37] font-medium transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('shop')}
              className={`w-full py-2.5 px-4 rounded-xl text-left text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activePage === 'shop'
                  ? 'bg-[#d4af37] text-[#12070a]'
                  : 'text-[#c4b5b8] hover:bg-[#1f0c13]'
              }`}
            >
              Shop
            </button>

            <button
              onClick={() => handleNavClick('customizer')}
              className={`w-full py-2.5 px-4 rounded-xl text-left text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activePage === 'customizer'
                  ? 'bg-[#d4af37] text-[#12070a]'
                  : 'text-[#e2c77d] hover:bg-[#1f0c13]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Bespoke Studio</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
