import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Tag, CreditCard, Smartphone, Banknote, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../lib/currency';

interface CheckoutModalProps {
  onNavigate: (path: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onNavigate }) => {
  const { isCheckoutOpen, closeCheckout, items, subtotal, clearCart } = useCart();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98765 43210',
    address: '42 Altamount Road, Cumballa Hill',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400026',
    notes: 'Please call before delivery to confirm gate access.',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal >= 15000 ? 0 : 750;
  const finalTotal = subtotal - discountAmount + shippingFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VELORA10') {
      setDiscountPercent(10);
      setPromoMessage('10% Atelier inaugural discount applied.');
    } else {
      setPromoMessage('Invalid promo code. Try "VELORA10"');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `VEL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(generatedId);
    setStep('success');
  };

  const handleFinish = () => {
    clearCart();
    closeCheckout();
    setStep('form');
    onNavigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#171717] border border-[#2D2D2D] shadow-2xl my-8 overflow-hidden">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-[#262626] flex items-center justify-between bg-[#141414]">
          <div className="flex items-center gap-3">
            <span className="font-editorial text-2xl tracking-widest text-[#F1EEE7] uppercase font-light">
              VELORA STUDIO
            </span>
            <span className="text-xs uppercase tracking-wider text-[#8E877E] px-2 py-0.5 border border-[#333333]">
              Private Atelier Checkout (Demo)
            </span>
          </div>
          <button
            onClick={closeCheckout}
            className="p-1.5 text-[#8E877E] hover:text-[#FFFFFF] cursor-pointer"
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>
        </div>

        {step === 'form' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
            {/* Left Column: Delivery & Payment Details */}
            <form onSubmit={handleCompleteOrder} className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              {/* Notice Banner */}
              <div className="bg-[#1F1D1B] border border-[#3D332A] p-3 text-xs text-[#C8C1B7] flex items-center gap-2.5">
                <ShieldCheck size={16} className="text-[#A3866A] shrink-0" />
                <span>
                  <strong>Interactive Demo Checkout:</strong> No real payment is charged. Enter sample details to preview our order fulfillment flow.
                </span>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-[#F1EEE7] font-semibold mb-4">
                  01. Delivery & White-Glove Courier Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-[#8E877E] mb-1">Full Legal Name</label>
                    <input
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#1F1F1F] border border-[#333333] px-3 py-2 text-[#F1EEE7] focus:outline-none focus:border-[#C8C1B7]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8E877E] mb-1">Email for Receipt</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#1F1F1F] border border-[#333333] px-3 py-2 text-[#F1EEE7] focus:outline-none focus:border-[#C8C1B7]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8E877E] mb-1">Mobile Contact</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#1F1F1F] border border-[#333333] px-3 py-2 text-[#F1EEE7] focus:outline-none focus:border-[#C8C1B7]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#8E877E] mb-1">Street Address / Apartment</label>
                    <input
                      required
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#1F1F1F] border border-[#333333] px-3 py-2 text-[#F1EEE7] focus:outline-none focus:border-[#C8C1B7]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8E877E] mb-1">City</label>
                    <input
                      required
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#1F1F1F] border border-[#333333] px-3 py-2 text-[#F1EEE7] focus:outline-none focus:border-[#C8C1B7]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8E877E] mb-1">Postal Code (PIN)</label>
                    <input
                      required
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-[#1F1F1F] border border-[#333333] px-3 py-2 text-[#F1EEE7] focus:outline-none focus:border-[#C8C1B7]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-4 border-t border-[#262626]">
                <h3 className="text-xs uppercase tracking-widest text-[#F1EEE7] font-semibold mb-4">
                  02. Preferred Payment Mode
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'card'
                        ? 'border-[#F1EEE7] bg-[#222222] text-[#F1EEE7]'
                        : 'border-[#333333] bg-[#1A1A1A] text-[#8E877E] hover:border-[#555555]'
                    }`}
                  >
                    <CreditCard size={18} className="mb-2 text-[#C8C1B7]" />
                    <span className="text-xs font-medium">Card / EMI</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'upi'
                        ? 'border-[#F1EEE7] bg-[#222222] text-[#F1EEE7]'
                        : 'border-[#333333] bg-[#1A1A1A] text-[#8E877E] hover:border-[#555555]'
                    }`}
                  >
                    <Smartphone size={18} className="mb-2 text-[#C8C1B7]" />
                    <span className="text-xs font-medium">UPI / NetBank</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'cod'
                        ? 'border-[#F1EEE7] bg-[#222222] text-[#F1EEE7]'
                        : 'border-[#333333] bg-[#1A1A1A] text-[#8E877E] hover:border-[#555555]'
                    }`}
                  >
                    <Banknote size={18} className="mb-2 text-[#C8C1B7]" />
                    <span className="text-xs font-medium">Cash on Delivery</span>
                  </button>
                </div>

                {paymentMethod === 'cod' && (
                  <p className="mt-2 text-[11px] text-[#A3866A]">
                    Cash / Card upon white-glove arrival. Verification code will be dispatched to your phone before dispatch.
                  </p>
                )}
              </div>

              {/* Order Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#F1EEE7] hover:bg-[#FFFFFF] text-[#151515] text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer shadow-xl"
                >
                  Confirm Atelier Order · {formatINR(finalTotal)}
                </button>
              </div>
            </form>

            {/* Right Column: Order Summary & Promo Code */}
            <div className="lg:col-span-5 bg-[#141414] border-t lg:border-t-0 lg:border-l border-[#262626] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-[#F1EEE7] font-semibold mb-4">
                  Bag Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
                </h3>

                <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 text-xs">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-16 object-cover bg-[#222222] shrink-0 border border-[#2D2D2D]"
                      />
                      <div className="flex-1">
                        <h4 className="text-[#F1EEE7] font-editorial text-sm line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-[#8E877E]">
                          Size: {item.selectedSize.split('/')[0]} · {item.selectedColor.name}
                        </p>
                        <p className="text-[11px] text-[#8E877E]">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-mono text-xs text-[#F1EEE7] tabular-nums">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="mt-6 pt-5 border-t border-[#262626]">
                  <label className="block text-[11px] uppercase tracking-wider text-[#8E877E] mb-1.5 flex items-center gap-1.5">
                    <Tag size={12} />
                    <span>Inaugural Atelier Voucher</span>
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="e.g. VELORA10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-[#1C1C1C] border border-[#333333] px-3 py-2 text-xs text-[#F1EEE7] uppercase tracking-wider focus:outline-none focus:border-[#C8C1B7]"
                    />
                    <button
                      type="submit"
                      className="bg-[#2B2B2B] hover:bg-[#612C35] text-[#F1EEE7] px-3.5 py-2 text-xs uppercase tracking-wider border-t border-b border-r border-[#333333] cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`mt-1.5 text-xs ${discountPercent > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {promoMessage}
                    </p>
                  )}
                </form>

                {/* Totals Breakdown */}
                <div className="mt-6 pt-5 border-t border-[#262626] space-y-2 text-xs">
                  <div className="flex justify-between text-[#8E877E]">
                    <span>Atelier Subtotal</span>
                    <span className="font-mono text-[#F1EEE7] tabular-nums">{formatINR(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Inaugural Privilege (10%)</span>
                      <span className="font-mono tabular-nums">- {formatINR(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#8E877E]">
                    <span>White-Glove Insured Delivery</span>
                    <span className="font-mono text-[#F1EEE7] tabular-nums">
                      {shippingFee === 0 ? 'Complimentary' : formatINR(shippingFee)}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-[#2A2A2A] flex justify-between items-baseline text-sm">
                    <span className="uppercase tracking-widest text-[#F1EEE7] font-medium text-xs">Final Total (INR)</span>
                    <span className="font-mono text-xl font-bold text-[#F1EEE7] tabular-nums">
                      {formatINR(finalTotal)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 text-[11px] text-[#706B64] flex items-center gap-2">
                <ShieldCheck size={14} className="shrink-0" />
                <span>Complimentary sizing adjustments in our Milan & Mumbai ateliers within 14 days.</span>
              </div>
            </div>
          </div>
        ) : (
          /* Order Confirmation Success State */
          <div className="p-8 sm:p-12 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 bg-[#1F2A21] border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#8E877E]">Confirmation Generated</span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F1EEE7] mt-2">
              Order Confirmed
            </h2>
            <p className="font-mono text-sm text-[#C8C1B7] mt-1">Receipt ID: {orderId}</p>

            <p className="mt-4 text-xs text-[#9E978E] leading-relaxed">
              Thank you, {formData.fullName}. Your order has been registered in our private atelier system. A formal digital consignment docket and tracking credentials have been dispatched to <span className="text-[#F1EEE7]">{formData.email}</span>.
            </p>

            <div className="my-8 p-4 bg-[#141414] border border-[#262626] text-left text-xs space-y-2">
              <div className="flex justify-between text-[#8E877E]">
                <span>Recipient:</span>
                <span className="text-[#F1EEE7]">{formData.fullName} ({formData.phone})</span>
              </div>
              <div className="flex justify-between text-[#8E877E]">
                <span>Destination:</span>
                <span className="text-[#F1EEE7]">{formData.city}, {formData.state} - {formData.postalCode}</span>
              </div>
              <div className="flex justify-between text-[#8E877E]">
                <span>Payment Mode:</span>
                <span className="text-[#F1EEE7] uppercase">{paymentMethod} (Simulated Demo)</span>
              </div>
              <div className="flex justify-between text-[#8E877E]">
                <span>Estimated Atelier Dispatch:</span>
                <span className="text-emerald-400 font-medium">Within 48 Hours via Insured Express</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="px-8 py-3.5 bg-[#F1EEE7] hover:bg-[#FFFFFF] text-[#151515] text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer"
            >
              Return to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
