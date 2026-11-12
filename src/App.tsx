import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CustomizerPage } from './pages/CustomizerPage';
import { ProvenancePage } from './pages/ProvenancePage';

import { CustomizerModal } from './components/CustomizerModal';
import { BagDrawer } from './components/BagDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { AtelierManagerModal } from './components/AtelierManagerModal';
import {
  getStoredProducts,
  saveStoredProducts,
  getStoredHeroSlides,
  saveStoredHeroSlides,
  getStoredCategories,
  saveStoredCategories,
  getStoredBrandImages,
  saveStoredBrandImages,
  getStoredWorkshopImage,
  saveStoredWorkshopImage,
  resetStoreDataToDefaults,
  fetchStoreDataFromServer,
  syncStoreDataToServer,
  resetServerStoreData,
  HeroSlideData,
  CategoryData,
  BrandImageData,
} from './utils/storeMediaManager';

import { Currency, Product, CartItem, WigCustomization } from './types/store';
import {
  PRODUCTS,
  DEFAULT_CUSTOMIZATION,
  calculateCustomWigPriceNGN,
  convertNGNToUSD,
} from './data/catalog';
import { Check } from 'lucide-react';

export type AppPage = 'home' | 'shop' | 'customizer' | 'provenance';

export default function App() {
  // Navigation: Active Page State (Multi-page architecture)
  const [activePage, setActivePage] = useState<AppPage>('home');

  // Currency: Locked to Nigerian Naira (NGN) as requested
  const [currency] = useState<Currency>('NGN');

  // Persistent Store Media & Products
  const [products, setProducts] = useState<Product[]>(() => getStoredProducts());
  const [heroSlides, setHeroSlides] = useState<HeroSlideData[]>(() => getStoredHeroSlides());
  const [categories, setCategories] = useState<CategoryData[]>(() => getStoredCategories());
  const [brandImages, setBrandImages] = useState<BrandImageData[]>(() => getStoredBrandImages());
  const [workshopImage, setWorkshopImage] = useState<string>(() => getStoredWorkshopImage());

  // Atelier Manager Modal
  const [isAtelierOpen, setIsAtelierOpen] = useState(false);

  // Cart State (Initialized with 1 flagship piece so bag preview is ready)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartItemId: 'init-cart-item-1',
      product: PRODUCTS[1], // Quality Bone Straight Raw Hair Unit
      customization: {
        length: 26,
        density: 200,
        laceType: 'hd_swiss',
        capSize: 'medium',
        bleachedKnots: true,
        prePluckedBabyHairs: true,
        elasticBandAttached: true,
        laceTint: 'light_brown',
      },
      unitPriceNGN: 540000,
      unitPriceUSD: 365,
      quantity: 1,
    },
  ]);

  // Modals & Drawers State
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizerProduct, setCustomizerProduct] = useState<Product>(products[0] || PRODUCTS[0]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [shopCategoryFilter, setShopCategoryFilter] = useState<string>('all');

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync with full-stack backend on initial mount
  useEffect(() => {
    fetchStoreDataFromServer().then((data) => {
      if (data) {
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
          saveStoredProducts(data.products);
        }
        if (data.heroSlides && Array.isArray(data.heroSlides) && data.heroSlides.length > 0) {
          setHeroSlides(data.heroSlides);
          saveStoredHeroSlides(data.heroSlides);
        }
        if (data.categories && Array.isArray(data.categories) && data.categories.length > 0) {
          setCategories(data.categories);
          saveStoredCategories(data.categories);
        }
        if (data.brandImages && Array.isArray(data.brandImages) && data.brandImages.length > 0) {
          setBrandImages(data.brandImages);
          saveStoredBrandImages(data.brandImages);
        }
        if (data.workshopImage && typeof data.workshopImage === 'string') {
          setWorkshopImage(data.workshopImage);
          saveStoredWorkshopImage(data.workshopImage);
        }
      }
    });
  }, []);

  // Keyboard shortcut: Ctrl + Shift + A (or Cmd + Shift + A) to open Atelier Manager directly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAtelierOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper to sync all changes to the backend server
  const syncToBackend = (
    p = products,
    h = heroSlides,
    c = categories,
    b = brandImages,
    w = workshopImage
  ) => {
    syncStoreDataToServer({
      products: p,
      heroSlides: h,
      categories: c,
      brandImages: b,
      workshopImage: w,
    });
  };

  // Update handlers with persistent server + local storage sync
  const handleUpdateProducts = (updated: Product[]) => {
    setProducts(updated);
    saveStoredProducts(updated);
    syncToBackend(updated, heroSlides, categories, brandImages, workshopImage);
  };

  const handleUpdateHeroSlides = (updated: HeroSlideData[]) => {
    setHeroSlides(updated);
    saveStoredHeroSlides(updated);
    syncToBackend(products, updated, categories, brandImages, workshopImage);
  };

  const handleUpdateCategories = (updated: CategoryData[]) => {
    setCategories(updated);
    saveStoredCategories(updated);
    syncToBackend(products, heroSlides, updated, brandImages, workshopImage);
  };

  const handleUpdateBrandImages = (updated: BrandImageData[]) => {
    setBrandImages(updated);
    saveStoredBrandImages(updated);
    syncToBackend(products, heroSlides, categories, updated, workshopImage);
  };

  const handleUpdateWorkshopImage = (url: string) => {
    setWorkshopImage(url);
    saveStoredWorkshopImage(url);
    syncToBackend(products, heroSlides, categories, brandImages, url);
  };

  const handleResetDefaults = async () => {
    resetStoreDataToDefaults();
    await resetServerStoreData();
    setProducts(getStoredProducts());
    setHeroSlides(getStoredHeroSlides());
    setCategories(getStoredCategories());
    setBrandImages(getStoredBrandImages());
    setWorkshopImage(getStoredWorkshopImage());
    showToast('Factory demo catalog restored on backend server.');
  };

  const handleNavigatePage = (page: string, categoryFilter?: string) => {
    setActivePage(page as AppPage);
    if (categoryFilter) {
      setShopCategoryFilter(categoryFilter);
    } else if (page === 'shop' && !categoryFilter) {
      // keep current or reset to all
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Actions
  const handleAddToCart = (
    product: Product,
    customization: WigCustomization,
    quantity: number
  ) => {
    const unitPriceNGN = product.isCustomizableWig
      ? calculateCustomWigPriceNGN(product.basePriceNGN, customization)
      : product.basePriceNGN;
    const unitPriceUSD = convertNGNToUSD(unitPriceNGN);

    const newItem: CartItem = {
      cartItemId: `item-${Date.now()}-${Math.random()}`,
      product,
      customization: product.isCustomizableWig ? customization : undefined,
      unitPriceNGN,
      unitPriceUSD,
      quantity,
    };

    setCartItems((prev) => [newItem, ...prev]);
    showToast(`Added ${product.name} to your luxury cart.`);
    setIsBagOpen(true);
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart(product, DEFAULT_CUSTOMIZATION, 1);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Customizer trigger for specific products
  const handleOpenCustomizerModal = (product: Product) => {
    setCustomizerProduct(product);
    setIsCustomizerOpen(true);
  };

  // Fast Checkout direct from customizer
  const handleDirectCheckout = (product: Product, customization: WigCustomization) => {
    const unitPriceNGN = calculateCustomWigPriceNGN(product.basePriceNGN, customization);
    const unitPriceUSD = convertNGNToUSD(unitPriceNGN);

    const directItem: CartItem = {
      cartItemId: `direct-${Date.now()}`,
      product,
      customization,
      unitPriceNGN,
      unitPriceUSD,
      quantity: 1,
    };

    setCartItems([directItem]);
    setIsCheckoutOpen(true);
  };

  // Proceed from Bag Drawer to Checkout
  const handleProceedToCheckout = () => {
    setIsBagOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order confirmed via Korapay or WhatsApp
  const handleOrderCompleted = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0b0608] text-[#f5ede3] flex flex-col font-sans-luxury selection:bg-[#d4af37]/30 selection:text-[#f3e5ab]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-full bg-[#180a0e] border border-[#d4af37]/60 text-xs font-semibold text-[#f5ede3] shadow-2xl flex items-center gap-2 backdrop-blur-md transition-all">
          <Check className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        activePage={activePage}
        cartCount={totalCartCount}
        onOpenCart={() => setIsBagOpen(true)}
        onNavigatePage={handleNavigatePage}
      />

      {/* Main Multi-Page Routed View */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            products={products}
            currency={currency}
            heroSlides={heroSlides}
            categories={categories}
            brandImages={brandImages}
            workshopImage={workshopImage}
            onNavigatePage={handleNavigatePage}
            onOpenCustomizerWithProduct={handleOpenCustomizerModal}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activePage === 'shop' && (
          <ShopPage
            products={products}
            currency={currency}
            initialCategory={shopCategoryFilter}
            onOpenCustomizer={handleOpenCustomizerModal}
            onQuickAdd={handleQuickAdd}
            onOpenGlobalCustomizer={() => handleNavigatePage('customizer')}
          />
        )}

        {activePage === 'customizer' && (
          <CustomizerPage
            products={products}
            currency={currency}
            onAddToCart={handleAddToCart}
            onDirectCheckout={handleDirectCheckout}
          />
        )}

        {activePage === 'provenance' && (
          <ProvenancePage
            onNavigatePage={handleNavigatePage}
          />
        )}
      </main>

      {/* Luxury Footer with Atelier Manager Access */}
      <Footer
        onNavigatePage={handleNavigatePage}
        onOpenCustomizer={() => handleNavigatePage('customizer')}
        onOpenAtelier={() => setIsAtelierOpen(true)}
      />

      {/* Quick Customizer Modal (accessible from product cards across any page) */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        product={customizerProduct}
        currency={currency}
        onAddToCart={handleAddToCart}
        onDirectCheckout={handleDirectCheckout}
      />

      {/* Shopping Bag Drawer */}
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Dual Checkout Modal (Korapay + WhatsApp) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Atelier Manager Modal (Allows client to upload and update pictures & catalog directly) */}
      <AtelierManagerModal
        isOpen={isAtelierOpen}
        onClose={() => setIsAtelierOpen(false)}
        products={products}
        onUpdateProducts={handleUpdateProducts}
        heroSlides={heroSlides}
        onUpdateHeroSlides={handleUpdateHeroSlides}
        categories={categories}
        onUpdateCategories={handleUpdateCategories}
        brandImages={brandImages}
        onUpdateBrandImages={handleUpdateBrandImages}
        workshopImage={workshopImage}
        onUpdateWorkshopImage={handleUpdateWorkshopImage}
        onResetDefaults={handleResetDefaults}
        onShowToast={showToast}
      />

    </div>
  );
}
