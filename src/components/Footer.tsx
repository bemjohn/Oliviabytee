import React, { useState } from 'react';
import {
  Check,
  Lock,
  Instagram,
  Sparkles,
  ShieldCheck,
  Package,
  Clock,
  Mail,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { TikTokIcon } from './TikTokIcon';
import { CapSizingModal } from './CapSizingModal';
import { BRAND, getMailtoUrl, getWhatsAppUrl } from '../config/brand';

const WHATSAPP_INQUIRY_URL = getWhatsAppUrl(
  'Hello Oliviabytee, I have an inquiry regarding custom hair'
);
const WHATSAPP_FITTING_URL = getWhatsAppUrl(
  'Hello Oliviabytee, I would like to book a 1-on-1 virtual fitting and consultation'
);
const WHATSAPP_COLOR_MATCH_URL = getWhatsAppUrl(
  'Hello Oliviabytee, I need custom color and texture matching for a wig'
);

interface FooterProps {
  onNavigatePage: (page: string) => void;
  onOpenCustomizer: () => void;
  onOpenAtelier?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigatePage,
  onOpenCustomizer,
  onOpenAtelier,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCapSizingOpen, setIsCapSizingOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#070305] border-t border-[#1e0c12] text-[#9e8e92] text-xs pt-14 sm:pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 1. Luxury Trust & Craftsmanship Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-[#1c0b10]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#16080d] border border-[#d4af37]/35 flex items-center justify-center text-[#d4af37] shrink-0 shadow-lg shadow-black/40">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-[#f5ede3] tracking-wide uppercase">
                100% Single-Donor Raw Hair
              </h5>
              <p className="text-[11px] text-[#8c7d81]">
                Unidirectional cuticles, zero synthetic fillers, 3+ years expected wear.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#16080d] border border-[#d4af37]/35 flex items-center justify-center text-[#d4af37] shrink-0 shadow-lg shadow-black/40">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-[#f5ede3] tracking-wide uppercase">
                0.04mm Real Swiss HD Lace
              </h5>
              <p className="text-[11px] text-[#8c7d81]">
                Graduated hairline with micro-bleached knots for an undetectable melt.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#16080d] border border-[#d4af37]/35 flex items-center justify-center text-[#d4af37] shrink-0 shadow-lg shadow-black/40">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-[#f5ede3] tracking-wide uppercase">
                Signature Keepsake Box
              </h5>
              <p className="text-[11px] text-[#8c7d81]">
                Delivered in a magnetic box with a pure silk satin bag & velvet grip.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Main 4-Column Balanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#1c0b10]">
          
          {/* Col 1: Brand & Socials (5 columns on desktop) */}
          <div className="lg:col-span-5 space-y-4">
            <button
              onClick={() => onNavigatePage('home')}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-full overflow-hidden border border-[#d4af37]/40 p-0.5 bg-black shadow-lg">
                <img
                  src="/assets/aistudio/image_5dc1b8ec.png"
                  alt="Oliviabytee"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif-luxury text-xl font-medium tracking-wider text-[#f5ede3] group-hover:text-[#d4af37] transition-colors block">
                  OLIVIABYTEE
                </span>
                <span className="text-[10px] text-[#d4af37] tracking-[0.22em] uppercase block">
                  Beauty In Every Strand
                </span>
              </div>
            </button>

            <p className="text-xs text-[#8c7d81] leading-relaxed max-w-sm">
              Luxury single-donor raw hair and bespoke crowns handcrafted to order for discerning clients worldwide.
            </p>

            {/* Social Media Channels Strip */}
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold block mb-2.5">
                Connect With Our Atelier
              </span>
              <div className="flex items-center gap-2.5">
                {/* WhatsApp */}
                <a
                  href={WHATSAPP_INQUIRY_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Oliviabytee on WhatsApp"
                  className="w-9 h-9 rounded-xl bg-[#16080d] hover:bg-[#25D366]/20 border border-[#2d1219] hover:border-[#25D366]/60 text-[#c4b5b8] hover:text-[#25D366] flex items-center justify-center transition-all cursor-pointer shadow-md group"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                </a>

                {/* Instagram */}
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Oliviabytee on Instagram"
                  className="w-9 h-9 rounded-xl bg-[#16080d] hover:bg-[#E1306C]/20 border border-[#2d1219] hover:border-[#E1306C]/60 text-[#c4b5b8] hover:text-[#E1306C] flex items-center justify-center transition-all cursor-pointer shadow-md group"
                >
                  <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>

                {/* TikTok */}
                <a
                  href={BRAND.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Oliviabytee on TikTok"
                  className="w-9 h-9 rounded-xl bg-[#16080d] hover:bg-[#00f2fe]/15 border border-[#2d1219] hover:border-[#00f2fe]/60 text-[#c4b5b8] hover:text-[#f5ede3] flex items-center justify-center transition-all cursor-pointer shadow-md group"
                >
                  <TikTokIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>

            {/* Studio Hours & Email */}
            <div className="pt-2 text-[11px] text-[#7d6f73] space-y-1.5 border-t border-[#1a090e] max-w-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#d4af37]/80" />
                <span>Consultations: Mon – Sat, 9:00 AM – 7:00 PM (WAT)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#d4af37]/80" />
                <a href={getMailtoUrl()} className="hover:text-[#f5ede3] transition-colors">
                  {BRAND.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation & Collections (2 columns on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d4af37]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigatePage('shop')}
                  className="text-[#b5a5a8] hover:text-[#f3e5ab] transition-colors cursor-pointer"
                >
                  All Creations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('customizer')}
                  className="text-[#b5a5a8] hover:text-[#f3e5ab] transition-colors cursor-pointer"
                >
                  Bespoke Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('provenance')}
                  className="text-[#b5a5a8] hover:text-[#f3e5ab] transition-colors cursor-pointer"
                >
                  Raw Hair Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('shop')}
                  className="text-[#b5a5a8] hover:text-[#f3e5ab] transition-colors cursor-pointer"
                >
                  Bone Straight Wigs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('shop')}
                  className="text-[#b5a5a8] hover:text-[#f3e5ab] transition-colors cursor-pointer"
                >
                  Glueless Bob Units
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Client Care & Socials (2 columns on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d4af37]">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={WHATSAPP_INQUIRY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#b5a5a8] hover:text-[#f3e5ab] transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsCapSizingOpen(true)}
                  className="text-[#b5a5a8] hover:text-[#f3e5ab] transition-colors cursor-pointer text-left"
                >
                  Cap Measurement & Sizing Guide
                </button>
              </li>
              <li>
                <a
                  href={WHATSAPP_FITTING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#b5a5a8] hover:text-[#f3e5ab] transition-colors"
                >
                  Book Virtual Lace Fitting
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_COLOR_MATCH_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#b5a5a8] hover:text-[#f3e5ab] transition-colors"
                >
                  Custom Color & Shade Match
                </a>
              </li>
              <li className="pt-2 border-t border-[#220c13]">
                <button
                  type="button"
                  onClick={onOpenAtelier}
                  className="text-[#d4af37]/90 hover:text-[#f3e5ab] transition-colors cursor-pointer text-[11px] font-semibold"
                >
                  Atelier Manager (Upload Pictures)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Private Access / VIP Drops (3 columns on desktop) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d4af37]">
              Private Access
            </h4>
            <p className="text-xs text-[#8c7d81] leading-relaxed">
              Receive private invitations for limited single-donor imports, bespoke slots, and seasonal drops.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1">
              <div className="flex items-center rounded-xl bg-[#14080c] border border-[#2a1218] focus-within:border-[#d4af37] transition-colors p-1">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent px-3 py-1.5 text-xs text-[#f5ede3] placeholder:text-[#6e5e62] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3.5 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#e5c158] text-[#0f0508] font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer shrink-0"
                >
                  Join
                </button>
              </div>

              {isSubscribed && (
                <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Welcome to the Oliviabytee circle.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* 3. Bottom Bar: Minimal & Prestige */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#6e5e62]">
          <div>
            © {new Date().getFullYear()} Oliviabytee Luxury Wigs. All rights reserved.
          </div>

          {/* Accepted Payment Standards Indicator */}
          <div className="flex items-center gap-2 text-[10px] text-[#7d6f73]">
            <span>Secured Payments via:</span>
            <span className="px-2 py-0.5 rounded bg-[#16080d] border border-[#2d1219] text-[#c4b5b8] font-mono">
              Korapay · Cards · Bank Transfer · WhatsApp
            </span>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => onNavigatePage('provenance')}
              className="hover:text-[#a59599] transition-colors cursor-pointer"
            >
              Authenticity
            </button>
            <span>·</span>
            <a
              href={WHATSAPP_INQUIRY_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#a59599] transition-colors"
            >
              Contact
            </a>
            <span>·</span>
            <button
              onClick={onOpenAtelier}
              className="hover:text-[#d4af37] text-[#a59599] transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <Lock className="w-3 h-3 text-[#d4af37]" />
              <span>Studio Manager</span>
            </button>
          </div>
        </div>

      </div>

      {/* Cap Measurement & Sizing Interactive Modal */}
      <CapSizingModal
        isOpen={isCapSizingOpen}
        onClose={() => setIsCapSizingOpen(false)}
      />
    </footer>
  );
};
