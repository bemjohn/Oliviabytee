import { Product, WigCustomization } from '../types/store';

export const USD_TO_NGN_RATE = 1480;

export const DEFAULT_CUSTOMIZATION: WigCustomization = {
  length: 22,
  density: 180,
  laceType: 'hd_swiss',
  capSize: 'medium',
  bleachedKnots: true,
  prePluckedBabyHairs: true,
  elasticBandAttached: true,
  laceTint: 'light_brown',
};

export const LENGTH_PRICE_DELTAS_NGN: Record<number, number> = {
  10: -60000,
  12: -45000,
  14: -35000,
  18: -15000,
  22: 0,
  26: 45000,
  30: 85000,
  32: 120000,
};

export const DENSITY_PRICE_DELTAS_NGN: Record<number, number> = {
  150: -20000,
  180: 0,
  200: 30000,
  250: 65000,
  300: 105000,
};

export const LACE_PRICE_DELTAS_NGN: Record<string, number> = {
  hd_swiss: 0,
  frontal_13x4: 15000,
  frontal_13x6: 35000,
  closure_5x5: -25000,
};

export function calculateCustomWigPriceNGN(
  basePriceNGN: number,
  customization: WigCustomization
): number {
  const lengthDelta = LENGTH_PRICE_DELTAS_NGN[customization.length] || 0;
  const densityDelta = DENSITY_PRICE_DELTAS_NGN[customization.density] || 0;
  const laceDelta = LACE_PRICE_DELTAS_NGN[customization.laceType] || 0;
  return Math.max(150000, basePriceNGN + lengthDelta + densityDelta + laceDelta);
}

export function convertNGNToUSD(priceNGN: number): number {
  return Math.round(priceNGN / USD_TO_NGN_RATE);
}

export const PRODUCTS: Product[] = [
  {
    id: 'wig-glueless-bob',
    name: 'Glueless Bone Straight 4x4 Pre-Plucked Unit',
    tagline: 'Precision sleek bob, middle part, pre-cut 4x4 HD closure & zero-glue grip',
    category: 'wigs',
    basePriceNGN: 385000,
    basePriceUSD: 260,
    image: '/assets/products/client_glueless_bob_4x4.png',
    gallery: [
      '/assets/products/client_glueless_bob_4x4.png',
      '/assets/products/client_quality_bone_straight.png',
      '/assets/products/client_chestnut_bone_straight.png',
    ],
    description:
      'Engineered for instant 30-second glueless wear. Features a salon-precision blunt bob cut with double-drawn raw bone straight hair and a pre-cut 4x4 HD closure that melts invisibly against all skin tones. Zero glue, gel, or salon visit required.',
    donorOrigin: 'Single Donor · Raw Vietnamese Virgin',
    texture: 'Bone Straight Blunt Bob',
    isCustomizableWig: true,
    badge: 'Glueless Ready',
    rating: 4.98,
    reviewsCount: 184,
  },
  {
    id: 'wig-quality-straight',
    name: 'Quality Bone Straight Raw Hair Unit',
    tagline: 'Glass-shine double-drawn raw hair on invisible melted HD Swiss lace',
    category: 'wigs',
    basePriceNGN: 495000,
    basePriceUSD: 335,
    image: '/assets/products/client_quality_bone_straight.png',
    gallery: [
      '/assets/products/client_quality_bone_straight.png',
      '/assets/products/client_chestnut_bone_straight.png',
      '/assets/products/client_glueless_bob_4x4.png',
    ],
    description:
      'Our signature double-drawn raw bone straight crown. 100% single-donor cuticle-aligned raw hair with thick ends from root to tip. Features hand-ventilated micro-plucked baby hairs on 0.04mm HD Swiss lace with invisible micro-bleached knots.',
    donorOrigin: 'Single Donor · Raw Vietnamese Hair',
    texture: 'Raw Bone Straight (Double Drawn)',
    isCustomizableWig: true,
    badge: 'Signature Crown',
    rating: 5.0,
    reviewsCount: 246,
  },
  {
    id: 'wig-chestnut-straight',
    name: 'Signature Chestnut Bone Straight Unit',
    tagline: 'Rich warm chocolate chestnut tone, ultra-silky raw straight texture',
    category: 'wigs',
    basePriceNGN: 520000,
    basePriceUSD: 350,
    image: '/assets/products/client_chestnut_bone_straight.png',
    gallery: [
      '/assets/products/client_chestnut_bone_straight.png',
      '/assets/products/client_quality_bone_straight.png',
      '/assets/products/client_wig_dq_bodywave.png',
    ],
    description:
      'Flawlessly toned in an artisanal warm chocolate chestnut brown. Premium raw donor hair conditioned with natural luster and flat-iron memory that withstands humidity without frizzing. Finished with an undetectable melted hairline.',
    donorOrigin: 'Single Donor · Raw Cambodian / Vietnamese',
    texture: 'Chestnut Brown Bone Straight',
    isCustomizableWig: true,
    badge: 'Couture Color',
    rating: 4.96,
    reviewsCount: 132,
  },
  {
    id: 'wig-dq-bodywave',
    name: 'Wig DQ Hollywood Glamour Body Wave',
    tagline: 'Cascading high-volume S-waves on hand-ventilated HD frontal lace',
    category: 'wigs',
    basePriceNGN: 465000,
    basePriceUSD: 315,
    image: '/assets/products/client_wig_dq_bodywave.png',
    gallery: [
      '/assets/products/client_wig_dq_bodywave.png',
      '/assets/products/client_quality_bone_straight.png',
      '/assets/products/client_glueless_bob_4x4.png',
    ],
    description:
      'High-definition glamour body wave unit crafted with premium double-drawn raw bundles. The voluptuous S-wave pattern bounces back effortlessly after every wash without chemical processing. Complete with custom pre-plucked perimeter and melted ear-to-ear HD frontal.',
    donorOrigin: 'Single Donor · Cambodian Raw',
    texture: 'Glamour Body Wave',
    isCustomizableWig: true,
    badge: 'Best Seller DQ',
    rating: 4.99,
    reviewsCount: 218,
  },
  {
    id: 'frontal-invisible-hd',
    name: 'Invisible HD Swiss Lace Frontal',
    tagline: '13x6 Melt-On-Skin Swiss HD Lace with micro-bleached knots',
    category: 'frontals',
    basePriceNGN: 185000,
    basePriceUSD: 125,
    image: '/assets/images/hd_lace_frontal_1793713503183.jpg',
    gallery: [
      '/assets/images/hd_lace_frontal_1793713503183.jpg',
      '/assets/products/client_quality_bone_straight.png',
    ],
    description:
      'Ultra-thin 0.04mm Swiss HD lace that dissolves completely against every melanin tone without harsh glue lines. Ventilated hair by hair for undetectable parting.',
    donorOrigin: 'Raw Hair Hand-Knotted',
    texture: 'Natural Straight / Natural Wave',
    isCustomizableWig: false,
    badge: 'Invisible Melt',
    rating: 4.88,
    reviewsCount: 88,
  },
  {
    id: 'bundle-trio-raw',
    name: 'Triple Donor Raw Bundle Studio Set',
    tagline: '300g pure unprocessed single donor bundles for custom install',
    category: 'bundles',
    basePriceNGN: 380000,
    basePriceUSD: 258,
    image: '/assets/images/hero_body_wave_1793714596666.jpg',
    gallery: [
      '/assets/images/hero_body_wave_1793714596666.jpg',
      '/assets/products/client_quality_bone_straight.png',
    ],
    description:
      'Three full 100g bundles of raw donor hair with organic cuticles. Takes bleach up to 613 platinum blonde without losing elasticity.',
    donorOrigin: 'Vietnamese Raw Hair Bundles',
    texture: 'Natural Luster Wavy / Straight',
    isCustomizableWig: false,
    badge: 'Pure Raw',
    rating: 4.92,
    reviewsCount: 65,
  },
  {
    id: 'care-royal-elixir',
    name: 'Royal Botanical Raw Hair Elixir',
    tagline: '30ml cold-pressed argan & camellia oil for 3+ years raw wig longevity',
    category: 'care',
    basePriceNGN: 35000,
    basePriceUSD: 24,
    image: '/assets/images/luxury_hair_elixir_1793713502926.jpg',
    gallery: [
      '/assets/images/luxury_hair_elixir_1793713502926.jpg',
    ],
    description:
      'Weightless botanical blend that penetrates the raw hair cortex. Eliminates frizz in Lagos humidity without weighing down fine lace strands.',
    donorOrigin: 'Artisanal Organic Formulation',
    texture: 'Golden Serum Drops',
    isCustomizableWig: false,
    badge: 'Studio Essential',
    rating: 4.97,
    reviewsCount: 310,
  },
];
