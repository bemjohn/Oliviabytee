export type Currency = 'NGN' | 'USD';

export type WigLength = 10 | 12 | 14 | 18 | 22 | 26 | 30 | 32;
export type WigDensity = 150 | 180 | 200 | 250 | 300;
export type LaceType = 'hd_swiss' | 'frontal_13x4' | 'frontal_13x6' | 'closure_5x5';
export type CapSize = 'small' | 'medium' | 'large';

export interface WigCustomization {
  length: WigLength;
  density: WigDensity;
  laceType: LaceType;
  capSize: CapSize;
  bleachedKnots: boolean;
  prePluckedBabyHairs: boolean;
  elasticBandAttached: boolean;
  laceTint: 'transparent' | 'light_brown' | 'medium_brown' | 'dark_brown';
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'wigs' | 'frontals' | 'bundles' | 'care';
  basePriceNGN: number;
  basePriceUSD: number;
  image: string;
  gallery: string[];
  description: string;
  donorOrigin: string;
  texture: string;
  isCustomizableWig: boolean;
  badge?: string;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  customization?: WigCustomization;
  unitPriceNGN: number;
  unitPriceUSD: number;
  quantity: number;
}

export interface CheckoutConfirmation {
  orderId: string;
  customerName: string;
  paymentMethod: 'korapay' | 'whatsapp';
  totalAmount: number;
  currency: Currency;
  destinationAddress: string;
  conciergeWindow: string;
}
