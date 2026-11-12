import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Building2,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  Truck,
  ArrowRight,
  ExternalLink,
  Lock,
  Copy,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, CheckoutConfirmation, Currency } from '../types/store';
import { getWhatsAppUrl } from '../config/brand';
import { formatPrice, generateWhatsAppOrderURL } from '../utils/formatters';
import { WhatsAppIcon } from './WhatsAppIcon';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onOrderCompleted,
}) => {
  // Form State
  const [fullName, setFullName] = useState('Adaeze Nwosu');
  const [phone, setPhone] = useState('+234 803 219 8841');
  const [email, setEmail] = useState('adaeze.nwosu@gmail.com');
  const [address, setAddress] = useState('18 Glover Road, Ikoyi');
  const [city, setCity] = useState('Lagos');
  const [stateCountry, setStateCountry] = useState('Lagos State, Nigeria');
  const [deliveryNotes, setDeliveryNotes] = useState('Please call when approaching the gate.');

  // Payment Choice State
  const [paymentChoice, setPaymentChoice] = useState<'korapay' | 'whatsapp'>('korapay');
  const [korapayTab, setKorapayTab] = useState<'card' | 'transfer' | 'ussd'>('card');

  // Card Simulator inputs
  const [cardNumber, setCardNumber] = useState('5399 4100 8921 4419');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('812');
  const [cardPin, setCardPin] = useState('****');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CheckoutConfirmation | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  if (!isOpen) return null;

  const totalNGN = items.reduce((acc, item) => acc + item.unitPriceNGN * item.quantity, 0);
  const isFreeShipping = totalNGN >= 1000000;
  const shippingFee = isFreeShipping ? 0 : 15000;
  const finalTotal = totalNGN + shippingFee;

  const createOrderConfirmation = (
    method: 'korapay' | 'whatsapp'
  ): CheckoutConfirmation => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);

    return {
      orderId: `OBT-${randomSuffix}-LG`,
      customerName: fullName,
      paymentMethod: method,
      totalAmount: finalTotal,
      currency,
      destinationAddress: `${address}, ${city}`,
      conciergeWindow:
        method === 'korapay'
          ? 'Within 1 business hour (WAT)'
          : 'Continue in your WhatsApp chat',
    };
  };

  const handleProcessKorapay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const confirmation = createOrderConfirmation('korapay');
      setCompletedOrder(confirmation);
      onOrderCompleted();

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f3e5ab', '#ffffff', '#b8860b'],
        });
      } catch (err) {
        console.error(err);
      }
    }, 1800);
  };

  const handleProcessWhatsApp = () => {
    const confirmation = createOrderConfirmation('whatsapp');
    onOrderCompleted();

    const waURL = generateWhatsAppOrderURL(
      confirmation.orderId,
      items,
      finalTotal,
      currency,
      fullName,
      phone,
      address,
      city
    );

    // Open WhatsApp link in new tab
    window.open(waURL, '_blank');
    setCompletedOrder(confirmation);
  };

  const handleCopyVirtualAccount = () => {
    navigator.clipboard.writeText('8930219482');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const conciergeWhatsAppUrl = completedOrder
    ? getWhatsAppUrl(
        `Hello Oliviabytee concierge, I have just placed order #${completedOrder.orderId}. Please confirm my tailoring details and next steps.`
      )
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#14080c] border border-[#d4af37]/30 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#30161d] flex items-center justify-between bg-[#100508]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#d4af37]/40 overflow-hidden bg-black p-0.5">
              <img src="/assets/aistudio/image_5dc1b8ec.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif-luxury font-medium text-[#f5ede3]">
                {completedOrder ? 'Order Confirmed' : 'Checkout & Payment'}
              </h2>
              <span className="text-[11px] text-[#d4af37] tracking-wider uppercase">
                {completedOrder ? `Reference: ${completedOrder.orderId}` : 'Oliviabytee Bespoke Studio'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen after Order Placement */}
        {completedOrder ? (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] mb-2">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="max-w-md">
              <span className="text-xs font-semibold text-[#d4af37] tracking-[0.25em] uppercase block mb-1">
                {completedOrder.paymentMethod === 'korapay' ? 'PAYMENT VERIFIED VIA KORAPAY' : 'WHATSAPP CONCIERGE ORDER INITIATED'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury text-[#f5ede3] mb-2 font-medium">
                Thank You, {completedOrder.customerName}
              </h3>
              <p className="text-xs sm:text-sm text-[#c4b5b8] leading-relaxed">
                Your order <strong className="text-[#f3e5ab] font-mono-tabular">#{completedOrder.orderId}</strong> has been received by our concierge team in Lekki. We will confirm your tailoring details, payment, and delivery timing with you personally on WhatsApp.
              </p>
            </div>

            {/* Quick summary card */}
            <div className="w-full max-w-md p-4 rounded-xl bg-[#1c0c11] border border-[#30161d] text-left text-xs space-y-2">
              <div className="flex justify-between text-[#c4b5b8]">
                <span>Order Reference:</span>
                <span className="font-mono-tabular font-bold text-[#f5ede3]">{completedOrder.orderId}</span>
              </div>
              <div className="flex justify-between text-[#c4b5b8]">
                <span>Destination:</span>
                <span className="text-[#f5ede3] truncate max-w-[240px]">{completedOrder.destinationAddress}</span>
              </div>
              <div className="flex justify-between text-[#c4b5b8]">
                <span>Total Paid / Invoiced:</span>
                <span className="font-serif-luxury font-bold text-[#f3e5ab] font-mono-tabular">
                  {formatPrice(completedOrder.totalAmount, completedOrder.currency)}
                </span>
              </div>
              <div className="flex justify-between text-[#c4b5b8]">
                <span>Concierge Follow-Up:</span>
                <span className="text-[#d4af37] font-semibold">{completedOrder.conciergeWindow}</span>
              </div>
            </div>

            {/* Success Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-lg gap-3 pt-2">
              <a
                href={conciergeWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-black" />
                <span>Chat With Your Concierge</span>
              </a>
              <button
                onClick={onClose}
                className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#c89924] to-[#a37918] hover:from-[#e5c158] hover:to-[#ba8c22] text-[#12070a] font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#d4af37]/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Input & Payment Flow */
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 6 Columns: Delivery & Contact Information */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-1">
                <span>1. Client & Delivery Destination</span>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#c4b5b8] uppercase tracking-wider mb-1">
                  Full Name / Client Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.checked ? '' : e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c0c11] border border-[#30161d] focus:border-[#d4af37] text-xs text-[#f5ede3] focus:outline-none"
                  placeholder="e.g. Amina Adeleke"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#c4b5b8] uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c0c11] border border-[#30161d] focus:border-[#d4af37] text-xs text-[#f5ede3] focus:outline-none font-mono-tabular"
                    placeholder="+234 803 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#c4b5b8] uppercase tracking-wider mb-1">
                    Email for Receipts
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c0c11] border border-[#30161d] focus:border-[#d4af37] text-xs text-[#f5ede3] focus:outline-none"
                    placeholder="client@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#c4b5b8] uppercase tracking-wider mb-1">
                  Street Delivery Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c0c11] border border-[#30161d] focus:border-[#d4af37] text-xs text-[#f5ede3] focus:outline-none"
                  placeholder="Street name, estate, apartment/house number"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#c4b5b8] uppercase tracking-wider mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c0c11] border border-[#30161d] focus:border-[#d4af37] text-xs text-[#f5ede3] focus:outline-none"
                    placeholder="Lagos / Abuja / London / NY"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#c4b5b8] uppercase tracking-wider mb-1">
                    State / Country
                  </label>
                  <input
                    type="text"
                    value={stateCountry}
                    onChange={(e) => setStateCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c0c11] border border-[#30161d] focus:border-[#d4af37] text-xs text-[#f5ede3] focus:outline-none"
                    placeholder="Lagos, Nigeria"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#c4b5b8] uppercase tracking-wider mb-1">
                  Delivery Notes & Instructions
                </label>
                <textarea
                  rows={2}
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1c0c11] border border-[#30161d] focus:border-[#d4af37] text-xs text-[#f5ede3] focus:outline-none resize-none"
                  placeholder="Gate instructions, preferred delivery time..."
                />
              </div>

              {/* Order Items Snapshot */}
              <div className="p-3.5 rounded-xl bg-[#100508] border border-[#261016]">
                <div className="text-[11px] font-semibold text-[#a59599] uppercase tracking-wider mb-2">
                  Summary ({items.reduce((s, i) => s + i.quantity, 0)} pieces):
                </div>
                <div className="space-y-1.5 max-h-24 overflow-y-auto text-xs text-[#d1c4c7]">
                  {items.map((i) => (
                    <div key={i.cartItemId} className="flex justify-between">
                      <span className="truncate max-w-[200px]">{i.product.name} (x{i.quantity})</span>
                      <span className="font-mono-tabular text-[#f3e5ab]">
                        {formatPrice((currency === 'NGN' ? i.unitPriceNGN : i.unitPriceUSD) * i.quantity, currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 6 Columns: Choose Between Korapay & WhatsApp */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
                <span>2. Select Payment & Order Method</span>
              </div>

              {/* Payment Method Selector Cards */}
              <div className="grid grid-cols-2 gap-3">
                {/* Option A: Korapay */}
                <button
                  type="button"
                  onClick={() => setPaymentChoice('korapay')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                    paymentChoice === 'korapay'
                      ? 'border-[#d4af37] bg-[#d4af37]/15 ring-1 ring-[#d4af37]'
                      : 'border-[#30161d] bg-[#1a0a0f] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#f5ede3]">Korapay Gateway</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-[10px] text-[#b5a5a8] leading-tight">
                    Instant Card, Bank Transfer & USSD settlement.
                  </p>
                  <div className="mt-2 text-[9px] text-[#d4af37] font-semibold uppercase tracking-wider">
                    Instant Automated Order
                  </div>
                </button>

                {/* Option B: WhatsApp */}
                <button
                  type="button"
                  onClick={() => setPaymentChoice('whatsapp')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                    paymentChoice === 'whatsapp'
                      ? 'border-emerald-500 bg-emerald-500/15 ring-1 ring-emerald-500'
                      : 'border-[#30161d] bg-[#1a0a0f] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#f5ede3] flex items-center gap-1.5">
                      <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                      Order on WhatsApp
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-[10px] text-[#b5a5a8] leading-tight">
                    Chat with Oliviabytee concierge with prefilled order specs.
                  </p>
                  <div className="mt-2 text-[9px] text-emerald-400 font-semibold uppercase tracking-wider">
                    Direct Studio Chat
                  </div>
                </button>
              </div>

              {/* Dynamic Payment Body */}
              {paymentChoice === 'korapay' ? (
                <div className="p-4 rounded-xl bg-[#1c0c11] border border-[#d4af37]/25 space-y-4">
                  {/* Korapay Branding Banner */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold">
                        KORAPAY
                      </div>
                      <span className="text-xs font-medium text-[#f5ede3]">Secure Payment Checkout</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#a59599]">
                      <Lock className="w-3 h-3 text-[#d4af37]" />
                      <span>256-Bit Encrypted</span>
                    </div>
                  </div>

                  {/* Sub-tabs for Korapay */}
                  <div className="flex items-center gap-1 p-1 rounded-lg bg-[#14080c] border border-white/5 text-xs">
                    <button
                      type="button"
                      onClick={() => setKorapayTab('card')}
                      className={`flex-1 py-1.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                        korapayTab === 'card' ? 'bg-[#d4af37] text-[#12070a] font-bold' : 'text-[#c4b5b8] hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-3 h-3" />
                      <span>Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setKorapayTab('transfer')}
                      className={`flex-1 py-1.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                        korapayTab === 'transfer' ? 'bg-[#d4af37] text-[#12070a] font-bold' : 'text-[#c4b5b8] hover:text-white'
                      }`}
                    >
                      <Building2 className="w-3 h-3" />
                      <span>Bank Transfer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setKorapayTab('ussd')}
                      className={`flex-1 py-1.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                        korapayTab === 'ussd' ? 'bg-[#d4af37] text-[#12070a] font-bold' : 'text-[#c4b5b8] hover:text-white'
                      }`}
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>USSD</span>
                    </button>
                  </div>

                  {/* Tab 1: Card */}
                  {korapayTab === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-medium text-[#a59599] uppercase mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#120609] border border-white/10 text-xs text-[#f5ede3] font-mono-tabular focus:outline-none focus:border-[#d4af37]"
                          placeholder="5399 •••• •••• ••••"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] font-medium text-[#a59599] uppercase mb-1">
                            Expiry
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#120609] border border-white/10 text-xs text-[#f5ede3] font-mono-tabular focus:outline-none focus:border-[#d4af37]"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-medium text-[#a59599] uppercase mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#120609] border border-white/10 text-xs text-[#f5ede3] font-mono-tabular focus:outline-none focus:border-[#d4af37]"
                            placeholder="123"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-medium text-[#a59599] uppercase mb-1">
                            PIN
                          </label>
                          <input
                            type="password"
                            value={cardPin}
                            onChange={(e) => setCardPin(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#120609] border border-white/10 text-xs text-[#f5ede3] font-mono-tabular focus:outline-none focus:border-[#d4af37]"
                            placeholder="4 digits"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Bank Transfer */}
                  {korapayTab === 'transfer' && (
                    <div className="p-3 rounded-lg bg-[#120609] border border-white/10 space-y-2 text-xs">
                      <div className="text-[11px] text-[#a59599]">
                        Transfer exact amount to dynamic virtual account:
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-[#d4af37]/20">
                        <div>
                          <div className="text-[10px] text-[#a59599]">BANK NAME:</div>
                          <div className="font-bold text-[#f5ede3]">Wema Bank / Korapay</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-[#a59599]">ACCOUNT NUMBER:</div>
                          <div className="font-mono-tabular font-bold text-[#f3e5ab] text-sm">8930219482</div>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyVirtualAccount}
                          className="p-1.5 rounded hover:bg-white/10 text-[#d4af37] transition-colors cursor-pointer"
                          title="Copy account number"
                        >
                          {copiedAccount ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="text-[10px] text-[#e8c878]">
                        Account expires in 29:45 mins. Payment automatically detected upon credit.
                      </div>
                    </div>
                  )}

                  {/* Tab 3: USSD */}
                  {korapayTab === 'ussd' && (
                    <div className="p-3 rounded-lg bg-[#120609] border border-white/10 text-xs space-y-2">
                      <div className="text-[11px] text-[#a59599]">Dial this string from your registered bank phone:</div>
                      <div className="p-2.5 rounded bg-black/50 text-center font-mono-tabular font-bold text-sm text-[#f3e5ab] tracking-wider border border-[#d4af37]/30">
                        *737*000*8930219482#
                      </div>
                      <div className="text-[10px] text-[#a59599] text-center">
                        GTBank, Zenith, Access, UBA and First Bank supported.
                      </div>
                    </div>
                  )}

                  {/* Pay button */}
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleProcessKorapay}
                    className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#c89924] to-[#a37918] hover:from-[#e5c158] hover:to-[#ba8c22] text-[#12070a] font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#d4af37]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Verifying with Korapay Gateway...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Pay {formatPrice(finalTotal, currency)} With Korapay</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* WhatsApp Flow */
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
                  <div className="flex items-center gap-2.5 text-emerald-400">
                    <span className="p-2 rounded-lg bg-emerald-500/20 text-[#25D366]">
                      <WhatsAppIcon className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#f5ede3]">Direct WhatsApp</h4>
                      <p className="text-[11px] text-[#b5a5a8]">Fastest response for bespoke tailoring & payment</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#100508] border border-emerald-500/20 text-xs text-[#c4b5b8] space-y-1.5">
                    <div className="text-[11px] font-semibold text-[#f5ede3]">What happens when you click:</div>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-[#a59599]">
                      <li>A prefilled order message will load in your WhatsApp with exact specs.</li>
                      <li>Our Lekki studio representative confirms payment via manual transfer.</li>
                      <li>A luxury concierge will confirm your payment, tailoring details, and timeline in the chat.</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={handleProcessWhatsApp}
                    className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Send Order to WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Price Breakdown Footer in Modal */}
              <div className="p-3.5 rounded-xl bg-[#100508] border border-[#2a131b] space-y-1.5 text-xs text-[#c4b5b8]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono-tabular text-[#f5ede3]">{formatPrice(totalNGN, 'NGN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Priority Delivery:</span>
                  <span className="font-mono-tabular text-[#d4af37]">{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee, 'NGN')}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold pt-2 border-t border-[#261016] text-[#f5ede3]">
                  <span>Total Due:</span>
                  <span className="font-serif-luxury font-bold text-[#f3e5ab] font-mono-tabular text-base">
                    {formatPrice(finalTotal, 'NGN')}
                  </span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
