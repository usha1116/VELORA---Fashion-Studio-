import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../lib/currency';

interface CartDrawerProps {
  onNavigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    items,
    removeItem,
    updateQuantity,
    isCartOpen,
    closeCart,
    subtotal,
    freeShippingThreshold,
    openCheckout,
  } = useCart();

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleProductClick = (slug: string) => {
    closeCart();
    onNavigate(`/products/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0F1118] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-[#C49774]" />
            <h2 className="font-syne text-xl font-bold uppercase text-[#F5F2EB]">Shopping Bag</h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-white/10 text-[#9C9EAE] hover:text-[#FFFFFF] transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3.5 bg-[#141620] border-b border-white/[0.06] font-tech text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-[#9C9EAE]">
              Add <span className="text-[#F5F2EB] font-bold tabular-nums">{formatINR(remainingForFreeShipping)}</span> more for complimentary white-glove courier.
            </p>
          ) : (
            <p className="text-emerald-400 flex items-center gap-1.5 font-medium">
              <span>✓ Complimentary white-glove atelier courier unlocked.</span>
            </p>
          )}
          <div className="w-full bg-[#1C1F2B] h-1.5 mt-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#853744] to-[#C49774] h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-[#9C9EAE] mb-4">
                <ShoppingBag size={22} className="text-[#C49774]" />
              </div>
              <h3 className="font-syne text-xl font-bold text-[#F5F2EB] uppercase">Your Bag is Empty</h3>
              <p className="font-tech text-xs text-[#9C9EAE] mt-2 max-w-xs leading-relaxed font-light">
                Explore our Spring/Summer 26 runway silhouettes or permanent atelier editions.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  onNavigate('/collections/architectural-silhouettes');
                }}
                className="mt-6 px-6 py-3 bg-[#F5F2EB] hover:bg-white text-[#0B0C10] font-tech text-xs uppercase tracking-[0.2em] font-semibold rounded-full transition-colors cursor-pointer"
              >
                Explore SS26
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-5 border-b border-white/[0.06] last:border-b-0"
              >
                {/* Thumbnail */}
                <div
                  onClick={() => handleProductClick(item.product.slug)}
                  className="w-20 h-24 rounded-2xl bg-[#161822] border border-white/10 shrink-0 overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4
                      onClick={() => handleProductClick(item.product.slug)}
                      className="font-syne text-sm font-semibold text-[#F5F2EB] hover:text-white cursor-pointer leading-snug line-clamp-1"
                    >
                      {item.product.name}
                    </h4>

                    <div className="mt-1 flex items-center gap-2 font-tech text-xs text-[#9C9EAE]">
                      <span>{item.selectedSize.split('/')[0]}</span>
                      <span aria-hidden="true" className="text-white/20">·</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full border border-white/20"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span>{item.selectedColor.name}</span>
                      </div>
                    </div>

                    <div className="mt-2 font-tech text-sm font-bold text-[#F5F2EB] tabular-nums">
                      {formatINR(item.product.price)}
                    </div>
                  </div>

                  {/* Quantity Steppers & Trash */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-white/10 rounded-full bg-[#13151D] px-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-[#9C9EAE] hover:text-[#FFFFFF] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="font-tech text-xs px-2 text-[#F5F2EB] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-[#9C9EAE] hover:text-[#FFFFFF] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#777777] hover:text-rose-400 p-1 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/[0.08] bg-[#12141D] space-y-4 font-tech">
            <div className="space-y-1.5 text-xs text-[#9C9EAE]">
              <div className="flex justify-between">
                <span>Atelier Subtotal</span>
                <span className="text-[#F5F2EB] font-bold tabular-nums">
                  {formatINR(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Insured Courier</span>
                <span className="tabular-nums text-[#C49774]">
                  {remainingForFreeShipping === 0 ? 'Complimentary' : 'Calculated at checkout'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-widest text-[#F5F2EB] font-semibold">Estimated Total</span>
              <span className="font-tech text-xl font-bold text-[#F5F2EB] tabular-nums">
                {formatINR(subtotal)}
              </span>
            </div>

            <button
              onClick={openCheckout}
              className="w-full py-4 px-6 bg-[#F5F2EB] hover:bg-white text-[#0B0C10] font-tech text-xs uppercase tracking-[0.2em] font-semibold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:scale-[1.02]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={14} />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#706B64]">
              <ShieldCheck size={12} className="text-[#C49774]" />
              <span>Encrypted atelier checkout · Authenticity guaranteed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
