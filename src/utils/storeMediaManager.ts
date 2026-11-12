import { Product } from '../types/store';
import { PRODUCTS } from '../data/catalog';

export interface HeroSlideData {
  id: number;
  titlePart1: string;
  titleItalic: string;
  image: string;
  primaryActionLabel: string;
}

export interface CategoryData {
  id: string;
  name: string;
  image: string;
  targetCategory?: string;
}

export interface BrandImageData {
  id: string;
  title: string;
  image: string;
}

export const DEFAULT_HERO_SLIDES: HeroSlideData[] = [
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

export const DEFAULT_CATEGORIES: CategoryData[] = [
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

export const DEFAULT_BRAND_PROMISE_IMAGES: BrandImageData[] = [
  {
    id: 'b1',
    title: 'Raw Hair Waves & Luster',
    image: '/assets/images/hero_body_wave_1793714596666.jpg',
  },
  {
    id: 'b2',
    title: 'Invisible HD Swiss Lace on Silk',
    image: '/assets/images/hd_lace_frontal_1793713503183.jpg',
  },
  {
    id: 'b3',
    title: 'Oliviabytee Muse',
    image: '/assets/images/hero_right_bodywave_1793716394579.jpg',
  },
  {
    id: 'b4',
    title: 'Botanical Hair Elixir',
    image: '/assets/images/luxury_hair_elixir_1793713502926.jpg',
  },
];

export const DEFAULT_WORKSHOP_IMAGE =
  '/assets/images/handcrafted_workshop_bg_1793994739332.jpg';

const STORAGE_KEYS = {
  PRODUCTS: 'oliviabytee_custom_products_v1',
  HERO_SLIDES: 'oliviabytee_custom_hero_slides_v1',
  CATEGORIES: 'oliviabytee_custom_categories_v1',
  BRAND_IMAGES: 'oliviabytee_custom_brand_images_v1',
  WORKSHOP_IMAGE: 'oliviabytee_custom_workshop_image_v1',
};

// Stable public asset paths. Existing browser/server data may still contain
// dev-only /src/assets URLs, so every stored image is normalized on load.
const LEGACY_ASSET_PREFIXES: Array<[string, string]> = [
  ['/src/assets/images/client_', '/assets/products/client_'],
  ['/src/assets/images/', '/assets/images/'],
  ['/src/assets/categories/', '/assets/categories/'],
  ['/src/assets/products/', '/assets/products/'],
];

export function normalizeAssetUrl(url: string | undefined): string {
  if (!url) return '';
  for (const [legacyPrefix, stablePrefix] of LEGACY_ASSET_PREFIXES) {
    if (url.startsWith(legacyPrefix)) {
      return `${stablePrefix}${url.slice(legacyPrefix.length)}`;
    }
  }
  return url;
}

function normalizeProducts(products: Product[]): Product[] {
  return products.map((product) => ({
    ...product,
    image: normalizeAssetUrl(product.image),
    gallery: Array.isArray(product.gallery)
      ? product.gallery.map((image) => normalizeAssetUrl(image))
      : [],
  }));
}

function normalizeImageItems<T extends { image: string }>(items: T[]): T[] {
  return items.map((item) => ({ ...item, image: normalizeAssetUrl(item.image) }));
}

// 1. Client-Side Image Resizer & Compressor (Keeps storage well under quotas)
export async function compressAndResizeImage(
  file: File,
  maxWidth = 1000,
  maxHeight = 1000,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image into memory'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Export as WebP or JPEG for superior compression
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

// 2. Loaders
export function getStoredProducts(): Product[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return normalizeProducts(parsed);
    }
  } catch (err) {
    console.warn('Failed to load stored products', err);
  }
  return PRODUCTS;
}

export function saveStoredProducts(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (err) {
    console.error('Failed to save products to localStorage', err);
  }
}

export function getStoredHeroSlides(): HeroSlideData[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.HERO_SLIDES);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return normalizeImageItems(parsed);
    }
  } catch (err) {
    console.warn('Failed to load stored hero slides', err);
  }
  return DEFAULT_HERO_SLIDES;
}

export function saveStoredHeroSlides(slides: HeroSlideData[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(slides));
  } catch (err) {
    console.error('Failed to save hero slides', err);
  }
}

export function getStoredCategories(): CategoryData[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return normalizeImageItems(parsed);
    }
  } catch (err) {
    console.warn('Failed to load stored categories', err);
  }
  return DEFAULT_CATEGORIES;
}

export function saveStoredCategories(categories: CategoryData[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (err) {
    console.error('Failed to save categories', err);
  }
}

export function getStoredBrandImages(): BrandImageData[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.BRAND_IMAGES);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return normalizeImageItems(parsed);
    }
  } catch (err) {
    console.warn('Failed to load brand images', err);
  }
  return DEFAULT_BRAND_PROMISE_IMAGES;
}

export function saveStoredBrandImages(images: BrandImageData[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BRAND_IMAGES, JSON.stringify(images));
  } catch (err) {
    console.error('Failed to save brand images', err);
  }
}

export function getStoredWorkshopImage(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.WORKSHOP_IMAGE);
    if (stored) return normalizeAssetUrl(stored);
  } catch (err) {
    console.warn('Failed to load workshop image', err);
  }
  return DEFAULT_WORKSHOP_IMAGE;
}

export function saveStoredWorkshopImage(imageUrl: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.WORKSHOP_IMAGE, imageUrl);
  } catch (err) {
    console.error('Failed to save workshop image', err);
  }
}

// 3. Reset All Custom Pictures & Content to Factory Defaults
export function resetStoreDataToDefaults(): void {
  Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
}

// 4. Full Store Catalog Backup & Export (JSON Download)
export function exportStoreBackupJSON(): void {
  const data = {
    exportedAt: new Date().toISOString(),
    store: 'Oliviabytee Luxury Wigs',
    products: getStoredProducts(),
    heroSlides: getStoredHeroSlides(),
    categories: getStoredCategories(),
    brandImages: getStoredBrandImages(),
    workshopImage: getStoredWorkshopImage(),
  };

  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `oliviabytee_store_backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 5. Restore Store Catalog Backup from Uploaded JSON
export function importStoreBackupJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.products && Array.isArray(parsed.products)) {
      saveStoredProducts(normalizeProducts(parsed.products));
    }
    if (parsed.heroSlides && Array.isArray(parsed.heroSlides)) {
      saveStoredHeroSlides(normalizeImageItems(parsed.heroSlides));
    }
    if (parsed.categories && Array.isArray(parsed.categories)) {
      saveStoredCategories(normalizeImageItems(parsed.categories));
    }
    if (parsed.brandImages && Array.isArray(parsed.brandImages)) {
      saveStoredBrandImages(normalizeImageItems(parsed.brandImages));
    }
    if (parsed.workshopImage && typeof parsed.workshopImage === 'string') {
      saveStoredWorkshopImage(normalizeAssetUrl(parsed.workshopImage));
    }
    return true;
  } catch (err) {
    console.error('Invalid backup format', err);
    return false;
  }
}

export interface StoreFullData {
  products: Product[];
  heroSlides: HeroSlideData[];
  categories: CategoryData[];
  brandImages: BrandImageData[];
  workshopImage: string;
}

export function normalizeStoreData(data: StoreFullData): StoreFullData {
  return {
    products: Array.isArray(data.products) ? normalizeProducts(data.products) : [],
    heroSlides: Array.isArray(data.heroSlides) ? normalizeImageItems(data.heroSlides) : [],
    categories: Array.isArray(data.categories) ? normalizeImageItems(data.categories) : [],
    brandImages: Array.isArray(data.brandImages) ? normalizeImageItems(data.brandImages) : [],
    workshopImage: normalizeAssetUrl(data.workshopImage),
  };
}

// Optional Cloudinary direct upload (Perfect for serverless hosting like Netlify/Vercel)
export async function uploadImageToCloudinary(file: File): Promise<string | null> {
  try {
    const cloudName =
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDINARY_CLOUD_NAME) ||
      localStorage.getItem('obt_cloudinary_cloud_name');
    const uploadPreset =
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDINARY_UPLOAD_PRESET) ||
      localStorage.getItem('obt_cloudinary_preset');

    if (!cloudName || !uploadPreset) return null;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'oliviabytee_store');

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.secure_url) {
        return data.secure_url;
      }
    }
  } catch (err) {
    console.warn('Cloudinary upload attempt failed, falling back to server/local storage', err);
  }
  return null;
}

// 6. Full-Stack Backend Integration (Node.js/Express, Cloudinary, or Local Storage)
export async function uploadImageToServer(
  file: File,
  filenameHint = 'hair-unit'
): Promise<string> {
  // 1. If Cloudinary is configured (ideal for Netlify static/serverless), upload to cloud CDN
  const cloudUrl = await uploadImageToCloudinary(file);
  if (cloudUrl) {
    return cloudUrl;
  }

  // 2. Otherwise send to Node.js Express backend endpoint (/api/upload)
  try {
    const optimizedBase64 = await compressAndResizeImage(file, 1200, 1500, 0.88);

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageBase64: optimizedBase64,
        filename: filenameHint,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.url) {
        return data.url;
      }
    }
    return optimizedBase64;
  } catch (err) {
    console.warn('Backend image upload endpoint not reachable, fallback to data URL', err);
    return await compressAndResizeImage(file, 1000, 1250, 0.85);
  }
}

export async function fetchStoreDataFromServer(): Promise<StoreFullData | null> {
  try {
    const res = await fetch('/api/store-data');
    if (res.ok) {
      const data = await res.json();
      if (data && (data.products || data.heroSlides)) {
        return normalizeStoreData(data as StoreFullData);
      }
    }
  } catch (err) {
    console.warn('Could not fetch server store data:', err);
  }
  return null;
}

export async function syncStoreDataToServer(storeData: StoreFullData): Promise<boolean> {
  try {
    const res = await fetch('/api/store-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(normalizeStoreData(storeData)),
    });
    return res.ok;
  } catch (err) {
    console.warn('Failed to sync store data to server:', err);
    return false;
  }
}

export async function resetServerStoreData(): Promise<boolean> {
  try {
    const res = await fetch('/api/reset-demo', { method: 'POST' });
    return res.ok;
  } catch (err) {
    console.warn('Failed to reset server data:', err);
    return false;
  }
}

