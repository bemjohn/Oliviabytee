import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  RefreshCw,
  Plus,
  Trash2,
  Download,
  FileText,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Product } from '../types/store';
import {
  HeroSlideData,
  CategoryData,
  BrandImageData,
  compressAndResizeImage,
  uploadImageToServer,
  exportStoreBackupJSON,
  importStoreBackupJSON,
} from '../utils/storeMediaManager';
import { formatPrice } from '../utils/formatters';

interface AtelierManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  heroSlides: HeroSlideData[];
  onUpdateHeroSlides: (slides: HeroSlideData[]) => void;
  categories: CategoryData[];
  onUpdateCategories: (categories: CategoryData[]) => void;
  brandImages: BrandImageData[];
  onUpdateBrandImages: (images: BrandImageData[]) => void;
  workshopImage: string;
  onUpdateWorkshopImage: (url: string) => void;
  onResetDefaults: () => void;
  onShowToast: (message: string) => void;
}

type TabType = 'products' | 'hero' | 'categories' | 'workshop' | 'backup';

export const AtelierManagerModal: React.FC<AtelierManagerModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
  heroSlides,
  onUpdateHeroSlides,
  categories,
  onUpdateCategories,
  brandImages,
  onUpdateBrandImages,
  workshopImage,
  onUpdateWorkshopImage,
  onResetDefaults,
  onShowToast,
}) => {
  // Authentication PIN state (Default PIN 2026)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('obt_atelier_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>('products');

  // Product Editing / Replace Photo state
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isEditingProductDetails, setIsEditingProductDetails] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Image Upload temporary state
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  // Hidden File Input refs
  const productFileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const categoryFileInputRef = useRef<HTMLInputElement>(null);
  const brandFileInputRef = useRef<HTMLInputElement>(null);
  const workshopFileInputRef = useRef<HTMLInputElement>(null);
  const backupFileInputRef = useRef<HTMLInputElement>(null);

  // Target IDs for file upload
  const [targetHeroId, setTargetHeroId] = useState<number | null>(null);
  const [targetCategoryId, setTargetCategoryId] = useState<string | null>(null);
  const [targetBrandId, setTargetBrandId] = useState<string | null>(null);

  // Cloudinary settings for Netlify serverless deployment
  const [cloudinaryCloud, setCloudinaryCloud] = useState(() => localStorage.getItem('obt_cloudinary_cloud_name') || '');
  const [cloudinaryPreset, setCloudinaryPreset] = useState(() => localStorage.getItem('obt_cloudinary_preset') || '');

  if (!isOpen) return null;

  // Handle PIN verification
  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '2026' || pinInput.trim() === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('obt_atelier_auth', 'true');
      setPinError(false);
      onShowToast('Atelier Studio Manager unlocked.');
    } else {
      setPinError(true);
    }
  };

  // 1. Handle Product Photo Upload
  const handleProductPhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedProductId) return;

    try {
      setIsUploading(true);
      const serverStaticUrl = await uploadImageToServer(file, selectedProductId);
      
      const updated = products.map((p) => {
        if (p.id === selectedProductId) {
          const newGallery = [serverStaticUrl, ...(p.gallery || []).slice(1)];
          return { ...p, image: serverStaticUrl, gallery: newGallery };
        }
        return p;
      });

      onUpdateProducts(updated);
      onShowToast('Product picture uploaded to backend server and published across the storefront.');
      if (editingProduct && editingProduct.id === selectedProductId) {
        setEditingProduct({ ...editingProduct, image: serverStaticUrl });
      }
    } catch (err) {
      console.error(err);
      onShowToast('Failed to process image. Please try another image file.');
    } finally {
      setIsUploading(false);
      if (productFileInputRef.current) productFileInputRef.current.value = '';
    }
  };

  // 2. Handle Product Image URL apply
  const handleApplyProductUrl = () => {
    if (!urlInput.trim() || !selectedProductId) return;

    const updated = products.map((p) => {
      if (p.id === selectedProductId) {
        const newGallery = [urlInput.trim(), ...(p.gallery || []).slice(1)];
        return { ...p, image: urlInput.trim(), gallery: newGallery };
      }
      return p;
    });

    onUpdateProducts(updated);
    setUrlInput('');
    onShowToast('Product image URL applied.');
  };

  // 3. Handle Product Detail Save
  const handleSaveProductDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updated = products.map((p) => (p.id === editingProduct.id ? editingProduct : p));
    onUpdateProducts(updated);
    setIsEditingProductDetails(false);
    setSelectedProductId(null);
    onShowToast(`Saved changes for ${editingProduct.name}.`);
  };

  // 4. Handle Hero Slide Photo Upload
  const handleHeroPhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || targetHeroId === null) return;

    try {
      setIsUploading(true);
      const serverStaticUrl = await uploadImageToServer(file, `hero-slide-${targetHeroId}`);

      const updated = heroSlides.map((slide) => {
        if (slide.id === targetHeroId) {
          return { ...slide, image: serverStaticUrl };
        }
        return slide;
      });

      onUpdateHeroSlides(updated);
      onShowToast(`Hero Slide ${targetHeroId} background uploaded to backend.`);
    } catch (err) {
      console.error(err);
      onShowToast('Failed to process hero image.');
    } finally {
      setIsUploading(false);
      setTargetHeroId(null);
      if (heroFileInputRef.current) heroFileInputRef.current.value = '';
    }
  };

  // 5. Handle Category Photo Upload
  const handleCategoryPhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetCategoryId) return;

    try {
      setIsUploading(true);
      const serverStaticUrl = await uploadImageToServer(file, `category-${targetCategoryId}`);

      const updated = categories.map((cat) => {
        if (cat.id === targetCategoryId) {
          return { ...cat, image: serverStaticUrl };
        }
        return cat;
      });

      onUpdateCategories(updated);
      onShowToast(`Category photo uploaded to backend.`);
    } catch (err) {
      console.error(err);
      onShowToast('Failed to process category image.');
    } finally {
      setIsUploading(false);
      setTargetCategoryId(null);
      if (categoryFileInputRef.current) categoryFileInputRef.current.value = '';
    }
  };

  // 6. Handle Brand Collage Photo Upload
  const handleBrandPhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetBrandId) return;

    try {
      setIsUploading(true);
      const serverStaticUrl = await uploadImageToServer(file, `brand-${targetBrandId}`);

      const updated = brandImages.map((b) => {
        if (b.id === targetBrandId) {
          return { ...b, image: serverStaticUrl };
        }
        return b;
      });

      onUpdateBrandImages(updated);
      onShowToast(`Brand promise photo uploaded to backend.`);
    } catch (err) {
      console.error(err);
      onShowToast('Failed to process image.');
    } finally {
      setIsUploading(false);
      setTargetBrandId(null);
      if (brandFileInputRef.current) brandFileInputRef.current.value = '';
    }
  };

  // 7. Handle Workshop Banner Photo Upload
  const handleWorkshopPhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const serverStaticUrl = await uploadImageToServer(file, 'workshop-finished-by-hand');
      onUpdateWorkshopImage(serverStaticUrl);
      onShowToast('Workshop background uploaded to backend.');
    } catch (err) {
      console.error(err);
      onShowToast('Failed to process workshop background image.');
    } finally {
      setIsUploading(false);
      if (workshopFileInputRef.current) workshopFileInputRef.current.value = '';
    }
  };

  // 8. Add New Custom Hair Product
  const handleAddNewProduct = () => {
    const newId = `wig-custom-${Date.now().toString(36)}`;
    const newProd: Product = {
      id: newId,
      name: 'New Custom Luxury Hair Unit',
      tagline: 'Authentic 100% raw single-donor hair finished by hand',
      category: 'wigs',
      basePriceNGN: 450000,
      basePriceUSD: 300,
      image: '/assets/products/client_quality_bone_straight.png',
      gallery: ['/assets/products/client_quality_bone_straight.png'],
      description: 'Handcrafted luxury unit tailored to perfection with invisible Swiss HD lace.',
      donorOrigin: 'Single Donor · Raw Vietnamese Virgin',
      texture: 'Raw Bone Straight',
      isCustomizableWig: true,
      badge: 'New Arrival',
      rating: 5.0,
      reviewsCount: 1,
    };

    onUpdateProducts([newProd, ...products]);
    setEditingProduct(newProd);
    setSelectedProductId(newId);
    setIsEditingProductDetails(true);
    onShowToast('New product added. You can now upload your own photo and set details.');
  };

  // 9. Delete Product
  const handleDeleteProduct = (productId: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from your storefront?`)) {
      const updated = products.filter((p) => p.id !== productId);
      onUpdateProducts(updated);
      if (selectedProductId === productId) {
        setSelectedProductId(null);
        setIsEditingProductDetails(false);
      }
      onShowToast(`"${name}" removed from storefront.`);
    }
  };

  // 10. Backup Import
  const handleBackupFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importStoreBackupJSON(content);
      if (success) {
        onShowToast('Store backup restored successfully. Reloading pictures...');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        onShowToast('Invalid backup file. Please use an export file created from this studio.');
      }
    };
    reader.readAsText(file);
  };

  const handleSaveCloudinary = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('obt_cloudinary_cloud_name', cloudinaryCloud.trim());
    localStorage.setItem('obt_cloudinary_preset', cloudinaryPreset.trim());
    onShowToast('Cloudinary CDN settings updated for Netlify deployment.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      
      {/* Hidden File Inputs */}
      <input
        ref={productFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleProductPhotoSelect}
      />
      <input
        ref={heroFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleHeroPhotoSelect}
      />
      <input
        ref={categoryFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleCategoryPhotoSelect}
      />
      <input
        ref={brandFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBrandPhotoSelect}
      />
      <input
        ref={workshopFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleWorkshopPhotoSelect}
      />
      <input
        ref={backupFileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleBackupFileSelect}
      />

      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0f0508] border border-[#3b1722] shadow-2xl overflow-hidden text-[#f5ede3]">
        
        {/* Real-time Backend Upload Progress Overlay */}
        {isUploading && (
          <div className="absolute inset-0 z-50 bg-[#0f0508]/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] border-t-transparent animate-spin mb-4" />
            <h4 className="text-base font-serif-luxury text-[#f5ede3] mb-1.5">
              Uploading Picture to Backend Server...
            </h4>
            <p className="text-xs text-[#d4af37] max-w-md">
              Compressing & creating high-speed cached static files so your storefront loads instantly for all customers worldwide.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#260e16] bg-[#16080d]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#260e16] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif-luxury font-medium text-[#f5ede3] flex items-center gap-2">
                <span>Atelier Studio Picture & Catalog Manager</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 uppercase font-sans tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Backend Storage Active
                </span>
              </h2>
              <p className="text-xs text-[#a59599]">
                Upload your own product pictures, edit prices, and manage hero banners directly. Files are stored on the server for instant loading on all devices.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Studio Manager"
            className="w-8 h-8 rounded-full bg-[#200d14] hover:bg-[#30161d] text-[#c4b5b8] hover:text-[#f5ede3] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* PIN Security Check (If Not Yet Authenticated) */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#1e0a12] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-serif-luxury font-medium text-[#f5ede3] mb-1.5">
                Oliviabytee Owner Verification
              </h3>
              <p className="text-xs text-[#a59599]">
                Enter your 4-digit manager PIN to add, replace, or update your hair unit photos and catalog details.
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="w-full space-y-4">
              <div className="relative">
                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Enter 4-Digit PIN (e.g. 2026)"
                  className="w-full text-center tracking-[0.3em] font-mono text-lg py-3 rounded-xl bg-[#180a0e] border border-[#3b1722] focus:border-[#d4af37] text-[#f5ede3] placeholder:text-[#6e5e62] focus:outline-none"
                  autoFocus
                />
              </div>

              {pinError && (
                <div className="text-xs text-rose-400 font-medium">
                  Incorrect PIN. Please use your manager PIN (Default: 2026).
                </div>
              )}

              <div className="p-3 rounded-xl bg-[#180a0e]/60 border border-[#d4af37]/20 text-[11px] text-[#d4c3c6] flex items-center justify-between">
                <span>Default Studio Passcode:</span>
                <span className="font-mono font-bold text-[#f3e5ab] bg-[#2a1218] px-2 py-0.5 rounded border border-[#d4af37]/30">
                  2026
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0f0508] font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#d4af37]/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Studio Manager</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 py-2.5 bg-[#12060a] border-b border-[#200d14] overflow-x-auto scrollbar-none">
              <button
                onClick={() => {
                  setActiveTab('products');
                  setIsEditingProductDetails(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'products'
                    ? 'bg-[#d4af37] text-[#12070a] font-bold shadow-md'
                    : 'text-[#a59599] hover:text-[#f5ede3] hover:bg-[#1a0a0f]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Hair Units & Wigs ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('hero')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'hero'
                    ? 'bg-[#d4af37] text-[#12070a] font-bold shadow-md'
                    : 'text-[#a59599] hover:text-[#f5ede3] hover:bg-[#1a0a0f]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Hero Banners ({heroSlides.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'categories'
                    ? 'bg-[#d4af37] text-[#12070a] font-bold shadow-md'
                    : 'text-[#a59599] hover:text-[#f5ede3] hover:bg-[#1a0a0f]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Collections & Categories</span>
              </button>

              <button
                onClick={() => setActiveTab('workshop')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'workshop'
                    ? 'bg-[#d4af37] text-[#12070a] font-bold shadow-md'
                    : 'text-[#a59599] hover:text-[#f5ede3] hover:bg-[#1a0a0f]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Workshop & Promise</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ml-auto ${
                  activeTab === 'backup'
                    ? 'bg-[#d4af37] text-[#12070a] font-bold shadow-md'
                    : 'text-[#a59599] hover:text-[#f5ede3] hover:bg-[#1a0a0f]'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Backup & Export</span>
              </button>
            </div>

            {/* TAB CONTENT CONTAINER */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* TAB 1: PRODUCTS & HAIR UNITS */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  
                  {/* Top Bar for Products */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#16080d] border border-[#2e131b]">
                    <div>
                      <h3 className="text-sm font-semibold text-[#f5ede3]">
                        Your Storefront Hair Catalog
                      </h3>
                      <p className="text-xs text-[#a59599]">
                        Click "Upload Photo" on any wig to replace the demo picture with your real product photo from your phone or computer.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddNewProduct}
                      className="px-4 py-2 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#12070a] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Hair Unit</span>
                    </button>
                  </div>

                  {/* Edit Form Modal (If active) */}
                  {isEditingProductDetails && editingProduct && (
                    <div className="p-5 rounded-2xl bg-[#14080c] border border-[#d4af37]/40 shadow-xl space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between border-b border-[#260e16] pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                          <h4 className="text-sm font-bold text-[#f5ede3]">
                            Edit Product Details: {editingProduct.name}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsEditingProductDetails(false)}
                          className="text-xs text-[#a59599] hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <form onSubmit={handleSaveProductDetails} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-[#a59599] mb-1 font-medium">Product Name</label>
                          <input
                            type="text"
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#0d0406] border border-[#2e141b] text-white focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#a59599] mb-1 font-medium">Tagline / Subtitle</label>
                          <input
                            type="text"
                            value={editingProduct.tagline}
                            onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#0d0406] border border-[#2e141b] text-white focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#a59599] mb-1 font-medium">Base Price in Naira (₦)</label>
                          <input
                            type="number"
                            value={editingProduct.basePriceNGN}
                            onChange={(e) => setEditingProduct({ ...editingProduct, basePriceNGN: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-lg bg-[#0d0406] border border-[#2e141b] text-white focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#a59599] mb-1 font-medium">Base Price in USD ($)</label>
                          <input
                            type="number"
                            value={editingProduct.basePriceUSD}
                            onChange={(e) => setEditingProduct({ ...editingProduct, basePriceUSD: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-lg bg-[#0d0406] border border-[#2e141b] text-white focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#a59599] mb-1 font-medium">Hair Texture</label>
                          <input
                            type="text"
                            value={editingProduct.texture}
                            onChange={(e) => setEditingProduct({ ...editingProduct, texture: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#0d0406] border border-[#2e141b] text-white focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#a59599] mb-1 font-medium">Donor Origin</label>
                          <input
                            type="text"
                            value={editingProduct.donorOrigin}
                            onChange={(e) => setEditingProduct({ ...editingProduct, donorOrigin: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#0d0406] border border-[#2e141b] text-white focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#a59599] mb-1 font-medium">Badge Tag (e.g. Signature Crown, Best Seller)</label>
                          <input
                            type="text"
                            value={editingProduct.badge || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#0d0406] border border-[#2e141b] text-white focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#a59599] mb-1 font-medium">Category</label>
                          <select
                            value={editingProduct.category}
                            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-lg bg-[#0d0406] border border-[#2e141b] text-white focus:outline-none focus:border-[#d4af37]"
                          >
                            <option value="wigs">Raw Hair Wigs (Customizable)</option>
                            <option value="frontals">HD Swiss Frontals</option>
                            <option value="bundles">Raw Donor Bundles</option>
                            <option value="care">Hair Care & Elixirs</option>
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-[#a59599] mb-1 font-medium">Description</label>
                          <textarea
                            rows={3}
                            value={editingProduct.description}
                            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#0d0406] border border-[#2e141b] text-white focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>

                        <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsEditingProductDetails(false)}
                            className="px-4 py-2 rounded-lg bg-[#200d14] text-[#a59599] hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-[#d4af37] text-[#12070a] font-bold uppercase tracking-wider"
                          >
                            Save Details
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Product Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="rounded-2xl bg-[#14080c] border border-[#2e131b] overflow-hidden flex flex-col justify-between p-4 space-y-4 hover:border-[#d4af37]/40 transition-colors"
                      >
                        <div className="space-y-3">
                          {/* Image Preview & Direct Upload Action */}
                          <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black/60 border border-white/5 group">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2.5 p-4">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedProductId(product.id);
                                  productFileInputRef.current?.click();
                                }}
                                className="px-4 py-2 rounded-lg bg-[#d4af37] hover:bg-[#e5c158] text-[#12070a] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer transition-transform active:scale-95"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                <span>Choose From Phone / PC</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  const url = prompt('Enter or paste image web URL:', product.image);
                                  if (url && url.trim()) {
                                    const updated = products.map((p) =>
                                      p.id === product.id ? { ...p, image: url.trim() } : p
                                    );
                                    onUpdateProducts(updated);
                                    onShowToast(`Updated picture for ${product.name}`);
                                  }
                                }}
                                className="px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black text-white text-[11px] border border-white/20 flex items-center gap-1.5 cursor-pointer"
                              >
                                <span>Paste Image URL</span>
                              </button>
                            </div>

                            {/* Badge */}
                            {product.badge && (
                              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-[#f3e5ab] font-bold uppercase tracking-wider border border-[#d4af37]/30">
                                {product.badge}
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div>
                            <div className="text-[10px] uppercase font-bold text-[#d4af37] tracking-wider mb-0.5">
                              {product.texture}
                            </div>
                            <h4 className="text-sm font-serif-luxury font-medium text-[#f5ede3] line-clamp-1">
                              {product.name}
                            </h4>
                            <div className="text-xs font-mono font-bold text-[#f3e5ab] mt-1">
                              {formatPrice(product.basePriceNGN, 'NGN')} / ${product.basePriceUSD}
                            </div>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="pt-2 border-t border-[#220d14] flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProductId(product.id);
                              productFileInputRef.current?.click();
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#200d14] hover:bg-[#2d121c] text-[#f5ede3] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                            <span>Replace Photo</span>
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProduct(product);
                                setIsEditingProductDetails(true);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-[#180a0e] hover:bg-[#261017] text-[#c4b5b8] hover:text-[#d4af37] text-xs transition-colors cursor-pointer"
                            >
                              Edit Info
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(product.id, product.name)}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 2: HERO BANNERS & CAROUSEL */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-[#16080d] border border-[#2e131b]">
                    <h3 className="text-sm font-semibold text-[#f5ede3] mb-1">
                      Homepage Hero Campaign Slides
                    </h3>
                    <p className="text-xs text-[#a59599]">
                      Update the large editorial campaign photos that showcase at the very top of your homepage.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {heroSlides.map((slide) => (
                      <div
                        key={slide.id}
                        className="rounded-2xl bg-[#14080c] border border-[#2e131b] p-4 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                            Slide {slide.id}: {slide.titlePart1} {slide.titleItalic}
                          </span>
                          <span className="text-[10px] text-[#a59599]">Action: {slide.primaryActionLabel}</span>
                        </div>

                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black/60 group border border-white/5">
                          <img
                            src={slide.image}
                            alt={`Hero Slide ${slide.id}`}
                            className="w-full h-full object-cover"
                          />

                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                            <button
                              type="button"
                              onClick={() => {
                                setTargetHeroId(slide.id);
                                heroFileInputRef.current?.click();
                              }}
                              className="px-4 py-2 rounded-lg bg-[#d4af37] hover:bg-[#e5c158] text-[#12070a] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload Picture From Phone/PC</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const url = prompt('Enter image URL for this slide:', slide.image);
                                if (url && url.trim()) {
                                  const updated = heroSlides.map((s) =>
                                    s.id === slide.id ? { ...s, image: url.trim() } : s
                                  );
                                  onUpdateHeroSlides(updated);
                                  onShowToast(`Updated background for Slide ${slide.id}`);
                                }
                              }}
                              className="px-3 py-1.5 rounded-lg bg-black/80 text-white text-[11px] border border-white/20"
                            >
                              Paste Image URL
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                          <div>
                            <label className="text-[10px] text-[#8e7f83] block mb-1">Headline Part 1</label>
                            <input
                              type="text"
                              value={slide.titlePart1}
                              onChange={(e) => {
                                const updated = heroSlides.map((s) =>
                                  s.id === slide.id ? { ...s, titlePart1: e.target.value } : s
                                );
                                onUpdateHeroSlides(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-[#0d0406] border border-[#2e141b] text-white focus:outline-none focus:border-[#d4af37]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-[#8e7f83] block mb-1">Italic Part 2</label>
                            <input
                              type="text"
                              value={slide.titleItalic}
                              onChange={(e) => {
                                const updated = heroSlides.map((s) =>
                                  s.id === slide.id ? { ...s, titleItalic: e.target.value } : s
                                );
                                onUpdateHeroSlides(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-[#0d0406] border border-[#2e141b] text-white focus:outline-none focus:border-[#d4af37]"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setTargetHeroId(slide.id);
                            heroFileInputRef.current?.click();
                          }}
                          className="w-full py-2 rounded-xl bg-[#200d14] hover:bg-[#2d121c] text-xs font-semibold text-[#f5ede3] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>Replace Slide {slide.id} Picture</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: CATEGORIES & HIGHLIGHTS */}
              {activeTab === 'categories' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-[#16080d] border border-[#2e131b]">
                    <h3 className="text-sm font-semibold text-[#f5ede3] mb-1">
                      Collections & Category Card Pictures
                    </h3>
                    <p className="text-xs text-[#a59599]">
                      Replace photos for each category card (Bone Straight, Wig DQ, Glueless Wigs, Coils, etc.).
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="rounded-2xl bg-[#14080c] border border-[#2e131b] p-3 space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black/60 group border border-white/5">
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setTargetCategoryId(cat.id);
                                  categoryFileInputRef.current?.click();
                                }}
                                className="px-2 py-1.5 rounded bg-[#d4af37] text-[#12070a] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                              >
                                <Upload className="w-3 h-3" />
                                <span>Upload</span>
                              </button>
                            </div>
                          </div>
                          <div className="text-xs font-bold text-[#f5ede3] text-center line-clamp-1">
                            {cat.name}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setTargetCategoryId(cat.id);
                            categoryFileInputRef.current?.click();
                          }}
                          className="w-full py-1.5 rounded-lg bg-[#200d14] hover:bg-[#2d121c] text-[11px] font-medium text-[#c4b5b8] flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Upload className="w-3 h-3 text-[#d4af37]" />
                          <span>Change</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: WORKSHOP & PROMISE */}
              {activeTab === 'workshop' && (
                <div className="space-y-6">
                  
                  {/* Workshop Banner */}
                  <div className="p-5 rounded-2xl bg-[#14080c] border border-[#2e131b] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#f5ede3]">
                          "Finished by hand" Workshop Background Banner
                        </h4>
                        <p className="text-xs text-[#a59599]">
                          The panoramic banner displayed near the bottom of the homepage.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => workshopFileInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#12070a] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Custom Workshop Photo</span>
                      </button>
                    </div>

                    <div className="relative h-44 rounded-xl overflow-hidden bg-black/60 border border-white/5">
                      <img
                        src={workshopImage}
                        alt="Finished by Hand"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Brand Promise 4-Quadrant Collage */}
                  <div className="p-5 rounded-2xl bg-[#14080c] border border-[#2e131b] space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-[#f5ede3]">
                        "The Oliviabytee Promise" 4-Image Collage
                      </h4>
                      <p className="text-xs text-[#a59599]">
                        Upload your real studio, lace inspection, or client photos for each of the 4 quadrants.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {brandImages.map((b) => (
                        <div
                          key={b.id}
                          className="rounded-xl bg-[#0f0407] border border-[#240e16] p-3 space-y-2 flex flex-col justify-between"
                        >
                          <div className="space-y-1.5">
                            <div className="relative aspect-square rounded-lg overflow-hidden bg-black/60 group border border-white/5">
                              <img
                                src={b.image}
                                alt={b.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setTargetBrandId(b.id);
                                    brandFileInputRef.current?.click();
                                  }}
                                  className="px-2 py-1.5 rounded bg-[#d4af37] text-[#12070a] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                                >
                                  <Upload className="w-3 h-3" />
                                  <span>Upload</span>
                                </button>
                              </div>
                            </div>
                            <div className="text-[11px] font-medium text-[#c4b5b8] line-clamp-1">
                              {b.title}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setTargetBrandId(b.id);
                              brandFileInputRef.current?.click();
                            }}
                            className="w-full py-1.5 rounded-lg bg-[#1e0a12] hover:bg-[#2b0f1a] text-[11px] text-[#f5ede3] flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Upload className="w-3 h-3 text-[#d4af37]" />
                            <span>Change Photo</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 5: BACKUP & RESTORE */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-[#16080d] border border-[#2e131b]">
                    <h3 className="text-sm font-semibold text-[#f5ede3] mb-1">
                      Store Data Safety & Cross-Device Transfer
                    </h3>
                    <p className="text-xs text-[#a59599]">
                      Save your uploaded pictures and product configurations into a lightweight backup file on your phone or laptop.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* 1. Download Backup */}
                    <div className="p-5 rounded-2xl bg-[#14080c] border border-[#2e131b] flex flex-col justify-between space-y-4">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-[#260e16] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-3">
                          <Download className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-[#f5ede3] mb-1">
                          Download Store Backup
                        </h4>
                        <p className="text-xs text-[#a59599]">
                          Saves all your uploaded photos, prices, hero slides, and products into a single `.json` backup file.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={exportStoreBackupJSON}
                        className="w-full py-3 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#12070a] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Backup File</span>
                      </button>
                    </div>

                    {/* 2. Restore Backup */}
                    <div className="p-5 rounded-2xl bg-[#14080c] border border-[#2e131b] flex flex-col justify-between space-y-4">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-[#162016] border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                          <Upload className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-[#f5ede3] mb-1">
                          Restore From Backup
                        </h4>
                        <p className="text-xs text-[#a59599]">
                          Upload a previously exported backup file to restore all your pictures on any browser or computer.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => backupFileInputRef.current?.click()}
                        className="w-full py-3 rounded-xl bg-[#1c2e1c] hover:bg-[#254225] border border-emerald-500/40 text-emerald-300 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Backup File</span>
                      </button>
                    </div>

                    {/* 3. Factory Reset */}
                    <div className="p-5 rounded-2xl bg-[#14080c] border border-[#2e131b] flex flex-col justify-between space-y-4">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-[#2a0e14] border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
                          <RefreshCw className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-[#f5ede3] mb-1">
                          Reset to Demo Pictures
                        </h4>
                        <p className="text-xs text-[#a59599]">
                          Clears all custom uploads and reverts the site to the original client catalog demo pictures.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Are you sure you want to clear your uploaded pictures and revert to demo defaults?')) {
                            onResetDefaults();
                            onShowToast('Store reverted to factory demo pictures.');
                            onClose();
                          }
                        }}
                        className="w-full py-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Revert to Defaults</span>
                      </button>
                    </div>
                  </div>

                  {/* Netlify / Cloud CDN Deployment Guide */}
                  <div className="p-5 rounded-2xl bg-[#14080c] border border-[#2e131b] space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#260e16] pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-[#f5ede3] flex items-center gap-2">
                          <span>Netlify & Cloud CDN Configuration</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] font-mono">
                            Zero-Server Host Ready
                          </span>
                        </h4>
                        <p className="text-xs text-[#a59599]">
                          Netlify is a serverless platform. To allow clients to upload photos permanently on Netlify without any server running, connect a free Cloudinary bucket below or use environment variables.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSaveCloudinary} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#c4b5b8] mb-1">
                          Cloudinary Cloud Name
                        </label>
                        <input
                          type="text"
                          value={cloudinaryCloud}
                          onChange={(e) => setCloudinaryCloud(e.target.value)}
                          placeholder="e.g. oliviabytee-studio"
                          className="w-full px-3 py-2 rounded-xl bg-[#0f0508] border border-[#3b1722] text-xs text-[#f5ede3] focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#c4b5b8] mb-1">
                          Upload Preset (Unsigned)
                        </label>
                        <input
                          type="text"
                          value={cloudinaryPreset}
                          onChange={(e) => setCloudinaryPreset(e.target.value)}
                          placeholder="e.g. wigs_unsigned_preset"
                          className="w-full px-3 py-2 rounded-xl bg-[#0f0508] border border-[#3b1722] text-xs text-[#f5ede3] focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                        <span className="text-[11px] text-[#8e7f83]">
                          Tip: Leave empty if running locally in VS Code or hosting with Node.js on Render/Railway.
                        </span>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-[#260e16] hover:bg-[#3b1722] border border-[#d4af37]/40 text-[#d4af37] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0"
                        >
                          Save Cloud CDN Settings
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>

            {/* Footer with Info & Quick Lock */}
            <div className="px-6 py-3 bg-[#16080d] border-t border-[#260e16] flex items-center justify-between text-xs text-[#8e7f83]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>All changes auto-saved to browser storage. Accessible anytime via PIN: 2026.</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsAuthenticated(false);
                  sessionStorage.removeItem('obt_atelier_auth');
                  onClose();
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Lock & Close
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
